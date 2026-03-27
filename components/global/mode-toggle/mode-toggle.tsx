"use client";

import { Switch } from "@/components/ui/switch";
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme === "light";

  return (
    <div
      className="flex items-center gap-2 bg-secondary p-1.5 rounded-xl"
      role="group"
      aria-label="Theme toggle"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`w-7 h-7 rounded-xl flex items-center justify-center text-muted-foreground transition-colors ${
          isLight
            ? "bg-card text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
            : ""
        }`}
        aria-pressed={isLight}
      >
        <HugeiconsIcon icon={Sun01Icon} size={16} />
        <span className="sr-only">Light</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`w-7 h-7 rounded-xl flex items-center justify-center text-muted-foreground transition-colors ${
          !isLight
            ? "bg-card text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
            : ""
        }`}
        aria-pressed={!isLight}
      >
        <HugeiconsIcon icon={Moon01Icon} size={16} />
        <span className="sr-only">Dark</span>
      </button>
    </div>
  );
}
