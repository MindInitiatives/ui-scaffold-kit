import { filePlanPrompt } from "@/lib/prompts/filePlan";
import { generateWithAI } from "@/lib/ai/factory";
import { frameworkRegistry } from "./registry";
import type { GeneratedFile } from "@/types/file";
import type { ProjectConfig } from "@/types/project";
import { fileContentPrompt } from "../prompts/fileContent";

interface GenerateOptions {
  onProgress?: (value: number) => void;
}

// export async function generateArchitecture(
//   config: ProjectConfig & {
//     apiKey: string;
//     aiProvider: "gemini" | "chatgpt";
//   },
//   options: GenerateOptions = {}
// ): Promise<GeneratedFile[]> {
//   const { onProgress } = options;
  
//   const framework = frameworkRegistry[config.framework.id];
//   if (!framework) throw new Error("Unsupported framework");
//   if (!config.apiKey) throw new Error("API key is required");

//   const files: GeneratedFile[] = [];

//   /* ---------------------------
//    * Step 1: Static files
//    * --------------------------- */
//   onProgress?.(5);
//   files.push(...framework.staticFiles());

//   /* ---------------------------
//    * Step 2: File plan (AI)
//    * --------------------------- */
//   onProgress?.(15);

//   const planResponse = await generateWithAI({
//     provider: config.aiProvider,
//     apiKey: config.apiKey,
//     prompt: filePlanPrompt(config),
//   });

//   if (!planResponse) {
//     throw new Error("AI did not return a file plan");
//   }

//   let filePaths: string[];

//   try {
//     filePaths = parseAIJsonArray<string[]>(planResponse);
//   } catch {
//     throw new Error("AI file plan is invalid JSON");
//   }

//   if (!Array.isArray(filePaths) || filePaths.some(p => typeof p !== "string")) {
//     throw new Error("AI file plan must be an array of strings");
//   }

//   onProgress?.(30);

//   /* ---------------------------
//    * Step 3: Batched file generation (AI)
//    * --------------------------- */
//   let generatedMap: Record<string, string> = {};

//   try {
//     const batchedResponse = await generateWithAI({
//       provider: config.aiProvider,
//       apiKey: config.apiKey,
//       prompt: fileContentPrompt(
//         config.framework.name,
//         config.description,
//         filePaths,
//       ),
//     });

//     if (batchedResponse) {
//       generatedMap = parseAIJsonObject<Record<string, string>>(batchedResponse);
//     }
//   } catch {
//     // 🔥 Hard failure avoided — fallback happens below
//     generatedMap = {};
//   }

//   /* ---------------------------
//    * Step 4: Partial recovery + fallback
//    * --------------------------- */
//   const total = filePaths.length;
//   let completed = 0;

//   for (const path of filePaths) {
//     const content =
//       typeof generatedMap[path] === "string"
//         ? generatedMap[path]
//         : `// TODO: Implement ${path}\n`;

//     files.push({ path, content });

//     completed++;
//     const progress = 30 + Math.floor((completed / total) * 65);
//     onProgress?.(progress);
//   }

//   onProgress?.(100);
//   return files;
// }


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

function parseAIJsonObject<T>(response: string): T {
  return JSON.parse(cleanAIResponse(response));
}
