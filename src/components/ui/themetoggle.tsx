"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-xs text-white backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme (dark/light)"
    >
      {isDark ? "☾" : "☀︎"}
    </motion.button>
  );
}