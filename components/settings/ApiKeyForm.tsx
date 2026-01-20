"use client";

import { useSettingsStore } from "@/store/settings.store";
import { useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ApiKeyForm() {
  const { apiKey, setApiKey } = useSettingsStore();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  
  const passwordType = useMemo(() => {
    return showPassword ? "text" : "password";
  }, [showPassword]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-6">
      <h3 className="text-lg font-semibold">API Key</h3>

      <p className="text-sm text-slate-400">
        Your API key is used only for generation and is never stored in plain text.
      </p>

      <div>
        <div className="relative flex items-center">
          <input
            type={passwordType}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Enter your AI API key"
          />
          <span 
            onClick={toggleShowPassword} 
            className="cursor-pointer absolute top-5 right-5 w-4.5 h-4.5"
          >
            {showPassword ? (
              <EyeIcon />
            ) : (
              <EyeSlashIcon />
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
