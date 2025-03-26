import axios from 'axios';
import { AIEditResponse, AIEditRequest, DocumentType } from './types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY environment variable is not set');
}

export interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export class GeminiService {
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  private readonly model = 'gemini-2.0-flash';

  private async makeRequest(prompt: string): Promise<string> {
    try {
      const request: GeminiRequest = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      const response = await axios.post<GeminiResponse>(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${GEMINI_API_KEY}`,
        request,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response from Gemini API');
      }

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  async generateContent(prompt: string): Promise<string> {
    return this.makeRequest(prompt);
  }

  async generateEditResponse(request: AIEditRequest): Promise<AIEditResponse> {
    const { documentContent, userRequest, documentType } = request;
    
    const contextPrompt = documentType 
      ? `You are editing a ${documentType} document. `
      : '';

    const editPrompt = `${contextPrompt}Given this medical document:
---
${documentContent}
---

User request: ${userRequest}

Analyze the request and respond with ONLY a JSON object in this exact format, with no additional text or explanation:
{
  "type": "edit",
  "message": "A brief description of the changes you're suggesting",
  "editContent": {
    "content": "The complete updated document content",
    "changes": ["List each major change made"]
  }
}

If the request doesn't require document edits, respond with:
{
  "type": "chat",
  "message": "Your helpful response"
}

Important:
1. Always maintain the document's original structure and formatting
2. For edit responses, include the COMPLETE document content, not just the changes
3. Make precise, focused edits that address the user's request
4. Return ONLY the JSON response with no other text
5. If making edits, list each significant change in the changes array`;

    try {
      const response = await this.makeRequest(editPrompt);
      try {
        // Try to extract JSON if it's wrapped in other text
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : response;
        
        const parsedResponse = JSON.parse(jsonStr) as AIEditResponse;
        if (!this.isValidAIEditResponse(parsedResponse)) {
          throw new Error('Invalid response format');
        }
        return parsedResponse;
      } catch (error) {
        // If parsing fails, return as chat response
        return {
          type: 'chat',
          message: response
        };
      }
    } catch (error) {
      console.error('Error generating edit response:', error);
      throw error;
    }
  }

  private isValidAIEditResponse(response: unknown): response is AIEditResponse {
    if (typeof response !== 'object' || !response) {
      return false;
    }

    const typedResponse = response as Record<string, unknown>;
    
    if (typedResponse.type !== 'chat' && typedResponse.type !== 'edit') {
      return false;
    }
    
    if (typeof typedResponse.message !== 'string') {
      return false;
    }

    if (typedResponse.type === 'edit') {
      const editContent = typedResponse.editContent as Record<string, unknown>;
      if (!editContent ||
          typeof editContent.content !== 'string' ||
          !Array.isArray(editContent.changes)) {
        return false;
      }
    }

    return true;
  }
}
