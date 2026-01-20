// lib/prompts/fileContent.ts
export function fileContentPrompt(
  frameworkName: string,
  projectDescription: string,
  files: string[]
): string {
  return `
You are a senior frontend engineer with deep expertise in ${frameworkName}.
Generate MINIMAL starter content for the files listed below.

========================
RULES (CRITICAL)
========================
- Generate ALL files in ONE response
- Output ONLY valid JSON (no markdown, no explanations)
- JSON object format:
  {
    "relative/path/file.ts": "file content",
    ...
  }
- File content MUST be minimal scaffolding only
- Use TODO comments where appropriate
- Ensure valid TypeScript / JSON syntax
- Escape newlines as \\n
- Escape double quotes as \\\"

========================
PROJECT CONTEXT
========================
${projectDescription}

========================
FILES
========================
${files.join("\n")}
`;
}