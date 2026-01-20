"use client";

import { useSettingsStore } from "@/store/settings.store";

export default function AIProviderForm() {
  const { aiProvider, setAiProvider } = useSettingsStore();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 mb-6 space-y-4">
      <h3 className="text-lg font-semibold">AI Provider</h3>
      <select
        value={aiProvider}
        onChange={(e) => setAiProvider(e.target.value as "gemini" | "chatgpt")}
        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="gemini">Gemini AI (default)</option>
        <option value="chatgpt">ChatGPT</option>
      </select>
    </section>
  );
}
