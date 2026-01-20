import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function chatgptGenerate(prompt: string, apiKey?: string) {
  try {
    // Use provided API key or fallback to environment variable
    const client = apiKey 
      ? new OpenAI({ apiKey })
      : openai;
    
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4", "gpt-4-turbo"
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}
