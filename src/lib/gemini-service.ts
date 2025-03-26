import axios from 'axios';

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

  async generateContent(prompt: string): Promise<string> {
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
}
