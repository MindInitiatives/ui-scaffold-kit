import { NextRequest, NextResponse } from "next/server";
import { generateWithAI } from "@/lib/ai/factory";
import { singleFileContentPrompt } from "@/lib/prompts/singleFileContent";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { path, framework, description } = body;

  if (!path || typeof path !== "string") {
    return NextResponse.json(
      { message: "Invalid file path" },
      { status: 400 }
    );
  }

  if (!framework?.name) {
    return NextResponse.json(
      { message: "Framework is required" },
      { status: 400 }
    );
  }

  if (!description) {
    return NextResponse.json(
      { message: "Project description is required" },
      { status: 400 }
    );
  }

  const { apiKey, aiProvider } = await getSession();

  if (!apiKey || !aiProvider) {
    return NextResponse.json(
      { message: "Missing AI configuration" },
      { status: 400 }
    );
  }

  try {
    const content = await generateWithAI({
      provider: aiProvider,
      apiKey,
      prompt: singleFileContentPrompt(
        framework.name,
        description,
        path
      ),
    });

    if (!content || typeof content !== "string") {
      throw new Error("AI returned empty content");
    }

    return NextResponse.json({ content });
  } catch (err: any) {
    return NextResponse.json(
      {
        message:
          err?.message ||
          "Failed to generate file. Please retry.",
      },
      { status: 500 }
    );
  }
}
