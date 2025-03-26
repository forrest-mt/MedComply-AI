import { GeminiService } from './gemini-service';

async function testGeminiAPI() {
  const geminiService = new GeminiService();
  
  try {
    console.log('Testing Gemini API...');
    const response = await geminiService.generateContent('What is artificial intelligence?');
    console.log('Response from Gemini:');
    console.log(response);
  } catch (error) {
    console.error('Error testing Gemini API:', error);
  }
}

testGeminiAPI();
