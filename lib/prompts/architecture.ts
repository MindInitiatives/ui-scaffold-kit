import { Framework } from "../frameworks";

interface ArchitectureConfig {
  framework: Framework;
  description: string;
  includeTests?: boolean;
  includeStyles?: boolean;
  includeDocs?: boolean;
}

export function architecturePrompt(config: ArchitectureConfig): string {
  const { framework, description, includeTests, includeStyles, includeDocs } = config;

  return `
You are a senior frontend architect with deep expertise in ${framework.name}.
Your task is to generate a complete, production-ready project structure.

========================
PROJECT REQUIREMENTS
========================
Framework: ${framework.name}
Project Description: ${description}
Architecture Style: Feature-based (group by domain or feature, not by file type)
Language: TypeScript
Best Practices: Follow official ${framework.name} recommendations

${includeTests ? "Testing: Include unit tests (Jest or Vitest) and basic integration tests.\n" : ""}
${includeStyles ? "Styling: Use Tailwind CSS with responsive design conventions.\n" : ""}
${includeDocs ? "Documentation: Include a README.md and basic inline documentation.\n" : ""}

========================
OUTPUT CONTRACT (CRITICAL)
========================
You MUST return ONLY a valid JSON array.
NO markdown.
NO explanations.
NO comments.
NO trailing commas.

The JSON array must contain objects with EXACTLY these properties:
- "path": string  (relative file path)
- "content": string (complete file content)

Example:
[
  {
    "path": "src/main.tsx",
    "content": "import React from \\"react\\";\\nimport App from \\"./App\\";"
  }
]

========================
STRING SAFETY RULES (MANDATORY)
========================
- Escape ALL newlines as \\n
- Escape ALL double quotes as \\\"
- Do NOT use \`\`\`json or any markdown code blocks
- Do NOT add any text outside the JSON array
- Do NOT use template literals
- Do NOT leave strings unterminated
- package.json, tsconfig.json, etc. MUST be valid JSON

========================
FILE GENERATION RULES
========================
1. Include essential config files (package.json, tsconfig.json, vite.config.ts or equivalent)
2. Create a valid ${framework.name} application entry point
3. Use a feature-based folder structure (e.g., features/, modules/, domains/)
4. Include shared utilities and reusable components
5. Define proper TypeScript interfaces and types
6. Add environment configuration files if applicable
7. Ensure all imports and exports are correct and consistent

========================
FINAL REMINDER
========================
Your entire response must be parsable by JSON.parse() with no errors.

Now generate the project structure for:
"${description}"
using ${framework.name}.
`;
}
