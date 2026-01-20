import { Framework } from "@/lib/frameworks";
import { SiReact } from "react-icons/si";
import { toast } from "sonner";
import { create } from "zustand";

export interface GeneratedFile {
  path: string;
  content?: string;
  status: "idle" | "generating" | "done" | "failed";
  error?: string;
}

interface GeneratorConfig {
  framework: Framework;
  frameworkOptions: string[];
  description: string;
  target?: string;
  style?: string; //"enterprise" | "startup" | "personal"
  estimatedModules?: number;
}

interface GeneratorState {
  config: GeneratorConfig;
  files: GeneratedFile[];
  jobId: string;
  status: "idle" | "generating" | "done";
  progress: number;
  updateConfig: (partial: Partial<GeneratorConfig>) => void;

  generatePreview: () => Promise<void>; // architecture preview only
  generateFile: (path: string) => Promise<void>; // per-file content
  download: () => void;
}

export const useGeneratorStore = create<GeneratorState>((set, get) => ({
  config: {
    framework: {
      id: "react",
      name: "React",
      icon: SiReact,
      options: [
        { id: "tailwind", label: "Tailwind CSS", type: "checkbox" },
        { id: "mui", label: "MUI", type: "checkbox" },
      ],
    },
    frameworkOptions: [],
    description: "",
    target: "",
    style: "enterprise",
    estimatedModules: 1,
  },
  files: [],
  jobId: "",
  status: "idle",
  progress: 0,

  updateConfig: (partial: Partial<GeneratorConfig>) =>
    set((state) => ({ config: { ...state.config, ...partial } })),

  /**
   * Generate architecture preview only (file paths, no content)
   */
  generatePreview: async () => {
    set({ status: "generating", progress: 0 });

    let prog = 0;
    const interval = setInterval(
      () => set({ progress: Math.min((prog += 10), 80) }),
      100
    );

    try {
      const config = get().config;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok || !Array.isArray(data?.files) || !data?.jobId) {
        
        const msg = data?.message || data?.error || `Preview generation failed (${res.status})`;
        toast.error(msg);
        set({ status: "idle", progress: 0 });
        return;
      }

      // Initialize files with empty content & idle status
      const files: GeneratedFile[] = data.files.map((file: GeneratedFile) => ({
        path: file.path,
        status: "idle",
      }));

      set({ files, jobId: data.jobId, status: "done", progress: 100 });
      toast.success("Architecture preview generated");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to generate preview");
      set({ status: "idle", progress: 0 });
    } finally {
      clearInterval(interval);
    }
  },

  /**
   * Generate content for a single file on-demand
   */
  generateFile: async (path: string) => {
    const { config } = get();

    // update status to generating
    set((state) => ({
      files: state.files.map((f) =>
        f.path === path ? { ...f, status: "generating", error: undefined } : f
      ),
    }));

    try {
      const res = await fetch("/api/generate/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          framework: config.framework,
          description: config.description,
      }),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok || !data?.content) {
        throw new Error(data?.message || `Failed to generate file ${path}`);
      }

      set((state) => ({
        files: state.files.map((f) =>
          f.path === path ? { ...f, content: data.content, status: "done" } : f
        ),
      }));
      toast.success(`Generated ${path}`);
    } catch (err: any) {
      console.error(err);
      set((state) => ({
        files: state.files.map((f) =>
          f.path === path
            ? { ...f, status: "failed", error: err?.message || "Generation failed" }
            : f
        ),
      }));
      toast.error(`Failed to generate ${path}: ${err?.message}`);
    }
  },

  /**
   * Download all files as ZIP
   */
  download: async () => {
    const jobId = get().jobId;

    if (!jobId) {
      toast.error("Missing job ID");
      return;
    }

    try {
      const res = await fetch(`/api/generate?id=${jobId}`);

      // Job still running → JSON
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await res.json();

        toast.info(
          data.status === "generating"
            ? `Still generating (${data.progress}%)`
            : "Generation not complete yet"
        );
        return;
      }

      // ZIP stream
      if (!res.ok) {
        throw new Error(`Download failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `ui-scaffold-${jobId}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to download ZIP");
    }
  },

}));

/**
 * Safely parse JSON from fetch
 */
export const parseJsonSafe = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};
