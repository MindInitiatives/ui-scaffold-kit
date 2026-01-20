"use client";

import { useGeneratorStore } from "@/store/generator.store";
import FrameworkOptions from "./FrameworkOptions";

export default function ProjectForm() {
  const { config, updateConfig, generatePreview, status } = useGeneratorStore();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 space-y-6">
      <h3 className="text-lg font-semibold">Project Details</h3>

      <textarea
        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        rows={4}
        placeholder="Describe what this project is for..."
        value={config.description}
        onChange={(e) => updateConfig({ description: e.target.value })}
      />

      <input
        type="text"
        placeholder="Target user base, team, domain"
        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={config.target || ""}
        onChange={(e) => updateConfig({ target: e.target.value })}
      />

      <select
        value={config.style || "enterprise"}
        onChange={(e) => updateConfig({ style: e.target.value })}
        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="enterprise">Enterprise</option>
        <option value="startup">Startup</option>
        <option value="personal">Personal Project</option>
      </select>

      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        min={1}
        placeholder="Estimated components/modules"
        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 no-spinner"
        value={config.estimatedModules || ""}
        onChange={(e) => updateConfig({ estimatedModules: Number(e.target.value) })}
      />

      {/* Framework-specific options */}
      <FrameworkOptions />

      <button
        onClick={generatePreview}
        disabled={status === "generating"}
        className="w-full rounded-xl bg-indigo-600 py-3 mt-8 text-sm font-medium hover:bg-indigo-500 transition disabled:opacity-50 cursor-pointer"
      >
        {status === "generating" ? "Generating..." : "Generate Architecture"}
      </button>
    </section>
  );
}