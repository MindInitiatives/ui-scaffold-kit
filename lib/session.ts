import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  apiKey?: string;
  aiProvider?: "gemini" | "chatgpt";
  [key: string]: any;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "my-app-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "lax" as const,
    httpOnly: true,
    path: "/",
  },
};

// Helper to get session in server components
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

// Helper to destroy session
export async function destroySession() {
  const session = await getSession();
  session.destroy();
  return session;
}
