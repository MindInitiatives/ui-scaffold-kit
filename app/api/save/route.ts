import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
    const { apiKey, aiProvider } = await req.json();
    
    if (!apiKey || !aiProvider) {
        return NextResponse.json(
            { message: "Missing API key or provider" },
            { status: 400 }
        );
    }
    
    const session = await getSession();

    session.apiKey = apiKey;
    session.aiProvider = aiProvider;
    await session.save();

    return NextResponse.json({ success: true });
}
