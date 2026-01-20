export function singleFileContentPrompt(
  frameworkName: string,
  projectDescription: string,
  path: string
): string {
  return `
You are a senior frontend engineer with deep expertise in ${frameworkName}.

Generate MINIMAL starter content for the following file.

========================
RULES (CRITICAL)
========================
- Generate ONLY the content of THIS file
- Do NOT include markdown
- Do NOT include explanations
- Output RAW file content only
- Keep it minimal
- Use TODO comments where implementation is unclear
- Ensure valid syntax for the file type

========================
PROJECT CONTEXT
========================
${projectDescription}

========================
FILE PATH
========================
${path}
`;
}
