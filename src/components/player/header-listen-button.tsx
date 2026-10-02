"use client";

import { Pause, Radio } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { usePlayer } from "./player-provider";

export function HeaderListenButton({
  size,
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { isPlaying, toggle } = usePlayer();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      className={buttonClasses({ variant: "accent", size, className })}
    >
      {isPlaying ? <Pause aria-hidden /> : <Radio aria-hidden />}
      {isPlaying ? "Pausar" : "Ouvir ao vivo"}
    </button>
  );
}
