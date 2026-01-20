"use client";

import { useGeneratorStore } from "@/store/generator.store";

export default function DownloadButton() {
  const { download, files } = useGeneratorStore();

  return (
    <button
      disabled={files.length === 0}
      onClick={download}
      className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-medium disabled:opacity-50"
    >
      Download as ZIP
    </button>
  );
}
