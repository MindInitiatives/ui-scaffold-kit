import { useState } from "react";
import ArchitecturePreview from "./ArchitecturePreview";
import DownloadButton from "./DownloadButton";

export default function PreviewOrDownload() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500"
        >
          {showPreview ? "Hide Preview" : "Preview"}
        </button>
        <DownloadButton />
      </div>

      {showPreview && <ArchitecturePreview />}
    </section>
  );
}