import { filePlanPrompt } from "@/lib/prompts/filePlan";
import { generateWithAI } from "@/lib/ai/factory";
import { frameworkRegistry } from "./registry";
import type { GeneratedFile } from "@/types/file";
import type { ProjectConfig } from "@/types/project";

interface GenerateOptions {
  onProgress?: (value: number) => void;
}

export async function generateArchitecture(
  config: ProjectConfig & {
    apiKey: string;
    aiProvider: "gemini" | "chatgpt";
  },
  options: GenerateOptions = {}
): Promise<GeneratedFile[]> {
  const { onProgress } = options;

  const framework = frameworkRegistry[config.framework.id];
  if (!framework) throw new Error("Unsupported framework");

  const files: GeneratedFile[] = [];

  /* ---------------------------
   * Step 1: Static files
   * --------------------------- */
  onProgress?.(5);
  files.push(
    ...framework.staticFiles().map(f => ({
      ...f,
      status: "done",
    }))
  );

  /* ---------------------------
   * Step 2: File plan (AI)
   * --------------------------- */
  onProgress?.(20);

  const planResponse = await generateWithAI({
    provider: config.aiProvider,
    apiKey: config.apiKey,
    prompt: filePlanPrompt(config),
  });

  if (!planResponse) {
    throw new Error("AI did not return a file plan");
  }

  let filePaths: string[];
  try {
    filePaths = parseAIJsonArray<string[]>(planResponse);
  } catch {
    throw new Error("AI file plan is invalid JSON");
  }

  onProgress?.(40);

  /* ---------------------------
   * Step 3: Placeholder files
   * --------------------------- */
  for (const path of filePaths) {
    files.push({
      path,
      content: `// TODO: Generate ${path}\n`
    });
  }

  onProgress?.(100);
  return files;
}


function cleanAIResponse(response: string): string {
  return response
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");
}

function parseAIJsonArray<T>(response: string): T {
  return JSON.parse(cleanAIResponse(response));
}