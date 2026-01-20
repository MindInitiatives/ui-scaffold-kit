import { create } from "zustand";

export type AIProvider = "gemini" | "chatgpt";

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

interface SettingsStore {
  // AI
  aiProvider: AIProvider;
  apiKey: string;

  // Redis
  redisConfig: RedisConfig;

  // Rate limiting config (optional for UI, can be exposed later)
  rateLimitPost: number; // max POST per window
  rateLimitGet: number;  // max GET per window
  rateLimitWindowSec: number;

  // Actions
  setAiProvider: (provider: AIProvider) => void;
  setApiKey: (key: string) => void;
  setRedisConfig: (cfg: RedisConfig) => void;
  setRateLimits: (limits: Partial<{ post: number; get: number; windowSec: number }>) => void;
  reset: () => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  // Defaults
  aiProvider: "gemini",
  apiKey: "",
  redisConfig: { host: "localhost", port: 6379, password: "" },

  rateLimitPost: 5,       // default 5 requests per minute
  rateLimitGet: 10,       // default 10 downloads per minute
  rateLimitWindowSec: 60, // default 60 seconds

  // Actions
  setAiProvider: (aiProvider) => set({ aiProvider }),
  setApiKey: (apiKey) => set({ apiKey }),
  setRedisConfig: (redisConfig) => set({ redisConfig }),
  setRateLimits: ({ post, get, windowSec }) =>
    set((state) => ({
      rateLimitPost: post ?? state.rateLimitPost,
      rateLimitGet: get ?? state.rateLimitGet,
      rateLimitWindowSec: windowSec ?? state.rateLimitWindowSec,
    })),
  reset: () =>
    set({
      aiProvider: "gemini",
      apiKey: "",
      redisConfig: { host: "localhost", port: 6379, password: "" },
      rateLimitPost: 5,
      rateLimitGet: 10,
      rateLimitWindowSec: 60,
    }),
}));
