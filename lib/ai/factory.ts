import { geminiGenerate } from "./providers/gemini";
import { chatgptGenerate } from "./providers/chatgpt";

export async function generateWithAI({
  provider,
  apiKey,
  prompt,
}: {
  provider: "gemini" | "chatgpt";
  apiKey: string;
  prompt: string;
}) {
  if (provider === "chatgpt") {
    return chatgptGenerate(prompt, apiKey);
  }
  return geminiGenerate(prompt, apiKey);
}
