"use client";
import { useState } from "react";
import { useGeneratorStore, GeneratedFile } from "@/store/generator.store";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiCheckCircle, FiXCircle } from "react-icons/fi";
import DownloadButton from "./DownloadButton";

interface TreeNodeType {
  name: string;
  file?: GeneratedFile;
  children: TreeNodeType[] | null;
}

function TreeNode({ node }: { node: TreeNodeType }) {
  const [open, setOpen] = useState(true);
  const generateFile = useGeneratorStore((s) => s.generateFile);

  const isFile = !!node.file;
  const status = node.file?.status;

  return (
    <div className="ml-4">
      <div
        className="flex items-center gap-2 cursor-pointer text-sm hover:text-indigo-400"
        onClick={() => !isFile && setOpen(!open)}
      >
        <span>{node.children ? (open ? "📂" : "📁") : "📄"}</span>
        <span>{node.name}</span>

        {isFile && (
          <span className="ml-auto flex items-center gap-2">
            {status === "done" && <FiCheckCircle className="text-green-400" />}
            {status === "failed" && (
              <button
                className="text-red-400 hover:text-red-300"
                title="Retry generation"
                onClick={(e) => {
                  e.stopPropagation();
                  generateFile(node.file!.path);
                }}
              >
                <FiRefreshCw />
              </button>
            )}
            {status === "generating" && (
              <span className="text-yellow-400 animate-pulse">Generating…</span>
            )}
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open &&
          node.children?.map((child) => (
            <motion.div
              key={child.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <TreeNode node={child} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default function ArchitecturePreview() {
  const files = useGeneratorStore((s) => s.files);

  const tree = buildTree(files);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 overflow-auto">
      <h3 className="mb-4 font-semibold text-lg">Project Structure</h3>
      {tree.length ? (
        tree.map((node) => <TreeNode key={node.name} node={node} />)
      ) : (
        <p className="text-sm text-slate-400">No architecture generated yet.</p>
      )}
      {tree.length && <div className="mt-8"><DownloadButton /></div>}
    </section>
  );
}

/**
 * Build a nested tree structure from file paths
 */
function buildTree(files: GeneratedFile[]): TreeNodeType[] {
  const root: Record<string, any> = {};

  files.forEach((file) => {
    const parts = file.path?.split("/");
    parts.reduce((acc, part, idx) => {
      if (!acc[part]) acc[part] = { __file: idx === parts.length - 1 ? file : undefined };
      return acc[part];
    }, root);
  });

  const walk = (obj: Record<string, any>): TreeNodeType[] =>
    Object.entries(obj).map(([name, val]) => ({
      name,
      file: val.__file,
      children: Object.keys(val).filter((k) => k !== "__file").length
        ? walk(
            Object.fromEntries(
              Object.entries(val).filter(([k]) => k !== "__file")
            )
          )
        : null,
    }));

  return walk(root);
}
