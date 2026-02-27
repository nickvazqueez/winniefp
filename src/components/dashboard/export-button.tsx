"use client";


import { motion } from "framer-motion";
import { DailyEntry } from "@/lib/types";

interface ExportButtonProps {
  entries: DailyEntry[];
}

export function ExportButton({ entries }: ExportButtonProps) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `winnie-entries-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      type="button"
      onClick={handleExport}
      disabled={entries.length === 0}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      whileHover={{ scale: entries.length > 0 ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      Export data
    </motion.button>
  );
}
