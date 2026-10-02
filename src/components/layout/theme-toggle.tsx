"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "hits-theme";

// Script que roda antes da primeira pintura para aplicar o tema salvo sem "piscar".
export const themeInitScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar tema claro/escuro"
      className={cn(
        "text-muted hover:bg-surface-2 hover:text-text grid size-12 place-items-center rounded-full transition-colors",
        className,
      )}
    >
      {/* O ícone visível é decidido só por CSS, então não há divergência de hidratação. */}
      <Sun className="hidden size-5 in-data-[theme=light]:block" aria-hidden />
      <Moon className="size-5 in-data-[theme=light]:hidden" aria-hidden />
    </button>
  );
}
