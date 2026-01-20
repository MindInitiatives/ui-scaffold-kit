"use client";

import { useGeneratorStore } from "@/store/generator.store";
import { frameworks } from "@/lib/frameworks";

export default function FrameworkSelector() {
  const { config, updateConfig } = useGeneratorStore();

  return (
    <section className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-center">Choose a Framework</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {frameworks.map((fw) => {
          const active = config.framework.id === fw.id;

          return (
            <button
              key={fw.id}
              onClick={() => updateConfig({ framework: fw })}
              className={`group rounded-xl border p-6 transition-transform duration-200 ease-out transform cursor-pointer
                ${active
                  ? "border-indigo-500 bg-indigo-500/10 scale-105 shadow-lg"
                  : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:scale-105 hover:shadow-md"
                }`}
            >
              <div className="flex flex-col items-center gap-4">
                <fw.icon className="h-12 w-12 text-slate-200 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">{fw.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
