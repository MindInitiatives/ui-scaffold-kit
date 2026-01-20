// lib/prompts/filePlan.ts
import type { ProjectConfig } from "@/types/project";

export function filePlanPrompt(config: ProjectConfig): string {
  return `
You are designing a ${config.framework.name} project.

Return ONLY a JSON array of file paths that should be generated dynamically.
NO markdown. NO explanations.

Example:
[
  "src/features/auth/Login.tsx",
  "src/features/auth/useAuth.ts",
  "src/app/providers.tsx"
]
`;
}
