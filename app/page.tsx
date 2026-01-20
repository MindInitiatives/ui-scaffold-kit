"use client";

import { useGeneratorStore } from "@/store/generator.store";
import FrameworkSelector from "@/components/generator/FrameworkSelector";
import ProjectForm from "@/components/generator/ProjectForm";
import PreviewOrDownload from "@/components/generator/PreviewOrDownload";
import ProgressBar from "@/components/generator/ProgressBar";
import ArchitecturePreview from "@/components/generator/ArchitecturePreview";

export default function HomePage() {
  const { status, progress, files } = useGeneratorStore();

  const generated = status === "done" && files.length > 0;

  return (
    <div>
      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-16 space-y-16">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-4 animate-fadeIn">
          <h1 className="text-5xl font-bold tracking-tight text-white">
            UI Scaffold
          </h1>
          <p className="text-lg text-slate-400">
            Generate scalable frontend project architectures tailored to your
            framework, use case, and team. Supports React, Angular, and more.
          </p>
        </section>

        {/* Framework Selector */}
        <FrameworkSelector />

        <div className="flex flex-col gap-x-4 gap-y-8 lg:flex-row min-h-screen relative">
          {/* Project Form */}
          <div className={`flex-1 ${generated ? 'max-w-4xl lg:mx-0' : 'max-w-7xl'}`}>
          <ProjectForm />

          {/* Progress Bar */}
          {status === "generating" && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="space-y-4 text-center">
                <ProgressBar progress={progress} />
                <p className="text-white font-medium">Generating architecture...</p>
              </div>
            </div>
          )}

          {/* Preview / Download */}
          {/* {generated && <PreviewOrDownload />} */}
          </div>

          {/* Sidebar: Live Folder Tree Preview */}
          {generated && (
            <aside className="block bg-slate-800 p-6 overflow-auto border-l border-slate-700 animate-slideIn">
              <h3 className="text-lg font-semibold mb-4 text-white">Folder Preview</h3>
              <ArchitecturePreview />
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
