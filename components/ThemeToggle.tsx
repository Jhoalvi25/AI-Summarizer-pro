"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        p-2 rounded-full 
        border border-neutral-300 dark:border-white
        bg-white/60 dark:bg-neutral-900/60
        backdrop-blur-sm
        flex items-center justify-center
        transition-all duration-300

        hover:scale-105
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        hover:border-neutral-400 dark:hover:border-neutral-600
      "
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400 transition-all duration-300 rotate-0" />
      ) : (
        <Moon className="h-5 w-5 text-white transition-all duration-300 rotate-0" />
      )}
    </button>
  );
}


