"use client";

import { Loader2, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayer } from "./player-provider";

export function PlayButton({ size = "md", className }: { size?: "md" | "xl"; className?: string }) {
  const { status, isPlaying, toggle } = usePlayer();
  const busy = status === "loading" || status === "reconnecting";
  const Icon = busy ? Loader2 : isPlaying ? Pause : Play;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Pausar a Hits FM" : "Ouvir a Hits FM ao vivo"}
      aria-pressed={isPlaying}
      className={cn(
        "bg-accent text-accent-fg hover:bg-accent-dark grid shrink-0 place-items-center rounded-full transition-colors",
        size === "xl" ? "size-28" : "size-14",
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          size === "xl" ? "size-12" : "size-6",
          busy && "animate-spin",
          !busy && "fill-current",
          !busy && !isPlaying && "translate-x-[2px]",
        )}
      />
    </button>
  );
}
