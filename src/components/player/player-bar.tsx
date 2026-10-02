"use client";

import { Maximize2, Volume1, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiveBadge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Equalizer } from "./equalizer";
import { PlayButton } from "./play-button";
import { usePlayer } from "./player-provider";
import { ShareButton } from "./share-button";

const statusText: Partial<Record<string, string>> = {
  loading: "Conectando…",
  reconnecting: "Reconectando…",
  error: "Não foi possível conectar",
};

export function PlayerBar() {
  const { status, isPlaying, volume, muted, nowPlaying, programName, setVolume, toggleMute } =
    usePlayer();
  const pathname = usePathname();
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const subtitle = statusText[status] ?? nowPlaying?.title ?? "Hits FM 93.5 · Palmas";

  return (
    <section
      aria-label="Player da rádio"
      className="border-border fixed inset-x-0 bottom-0 z-40 border-t bg-white shadow-[0_-4px_16px_rgb(0_0_0/0.08)]"
    >
      <div aria-hidden className="bg-accent h-1" />
      <Container className="flex h-20 items-center gap-3 sm:gap-4">
        <PlayButton />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <LiveBadge className="shrink-0" />
            <p className="font-display truncate font-extrabold">{programName}</p>
          </div>
          <p className="text-muted truncate text-base" aria-live="polite">
            {subtitle}
          </p>
        </div>

        <Equalizer active={status === "playing"} className="hidden sm:flex" />

        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="hover:bg-surface-2 grid size-12 place-items-center rounded-full"
          >
            <VolumeIcon className="size-5" aria-hidden />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="accent-primary h-2 w-28 cursor-pointer"
          />
        </div>

        <ShareButton className="hidden sm:grid" />
        {pathname !== "/ao-vivo" && (
          <Link
            href="/ao-vivo"
            aria-label="Abrir o player em tela cheia"
            className="hover:bg-surface-2 text-primary grid size-12 shrink-0 place-items-center rounded-full"
          >
            <Maximize2 className="size-5" aria-hidden />
          </Link>
        )}
        <span className="sr-only" aria-live="polite">
          {isPlaying ? "Tocando" : ""}
        </span>
      </Container>
    </section>
  );
}
