"use client";

import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import SettingsPage from "@/app/settings/page";
import { useSettingsStore } from "@/store/settings.store";
import { toast } from "sonner";
import Image from "next/image";
import logoImg from "../../public/assets/icons/logo.svg";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { reset } = useSettingsStore();

  const saveSettings = async () => {
    const { apiKey, aiProvider } = useSettingsStore.getState();

    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey, aiProvider }),
    });

    if (!res.ok) {
      toast.error("Failed to save settings");
      return;
    }

    // setModalOpen(false)
    toast.success("Settings saved securely");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={logoImg} alt={"logo"} width={40} height={40} />
            <span className="font-sans font-bold text-xl">UI Scaffold</span>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm text-slate-200 transition transform hover:scale-105 cursor-pointer"
          >
            <FiSettings className="h-5 w-5" />
            Settings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">{children}</main>

      {/* Settings Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-auto rounded-2xl bg-slate-900 p-8 shadow-2xl mx-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            {/* Settings content */}
            <SettingsPage />

            {/* Persist / Reset Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  reset();
                  setModalOpen(false);
                }}
                className="rounded-xl border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800 transition"
              >
                Reset
              </button>
              <button
                onClick={() => saveSettings()}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
