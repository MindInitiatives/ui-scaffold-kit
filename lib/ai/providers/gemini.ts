// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function geminiGenerate(prompt: string, apiKey?: string) {
  try {
    // Use provided API key or fallback to environment variable
    const keyToUse = apiKey || process.env.GEMINI_API_KEY;
    
    if (!keyToUse) {
      throw new Error("No Gemini API key provided");
    }
    
    // Re-initialize with the provided API key if needed
    const genAIInstance = apiKey ? new GoogleGenerativeAI(apiKey) : genAI;
    const modelInstance = genAIInstance.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
    
    const result = await modelInstance.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}