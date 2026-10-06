"use client";

import { Clock, ListMusic, Smartphone } from "lucide-react";
import { useGrid } from "@/components/schedule/schedule-provider";
import { WhatsappIcon } from "@/components/icons/social";
import { LiveBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { formatHour, onAirNow } from "@/lib/schedule";
import { site, whatsappLink } from "@/lib/site";
import { usePalmasNow } from "@/lib/use-palmas-now";
import { Equalizer } from "./equalizer";
import { PlayButton } from "./play-button";
import { usePlayer } from "./player-provider";
import { ShareButton } from "./share-button";

function clock(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Versão grande do player (página Ao Vivo). Usa o mesmo áudio do player do rodapé.
export function LiveStudio() {
  const { status, nowPlaying, programName } = usePlayer();
  const grid = useGrid();
  const now = usePalmasNow();
  const next = now ? onAirNow(grid, now).next : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="bg-primary flex flex-col items-center gap-6 rounded-md px-6 py-12 text-center text-white sm:py-16">
        <LiveBadge />
        <p className="font-display text-5xl font-black italic sm:text-6xl">
          HITS <span className="text-accent">FM</span> 93.5
        </p>
        <PlayButton size="xl" />
        <Equalizer active={status === "playing"} className="h-14 gap-1.5" barClassName="w-2" />
        <div aria-live="polite">
          <p className="text-sm font-semibold tracking-widest text-white/75 uppercase">
            No ar agora
          </p>
          <p className="font-display mt-1 text-2xl font-extrabold sm:text-3xl">{programName}</p>
          <p className="mt-2 text-lg text-white/85">
            {status === "loading"
              ? "Conectando…"
              : status === "reconnecting"
                ? "A conexão caiu, reconectando…"
                : (nowPlaying?.title ?? site.tagline)}
          </p>
        </div>
        <ShareButton className="text-white hover:bg-white/15" />
      </div>

      <aside className="space-y-6">
        <div className="border-border rounded-md border bg-white p-6 shadow-sm">
          <p className="text-muted flex items-center gap-2 font-semibold">
            <Clock className="size-5" aria-hidden /> Agora em Palmas
          </p>
          <p className="font-display text-primary mt-1 text-5xl font-black tabular-nums">
            {now ? clock(now.minutes) : "--:--"}
          </p>
          {next && (
            <p className="text-muted mt-4">
              A seguir: <strong className="text-text">{next.program?.name}</strong> às{" "}
              {formatHour(next.slot.start)}
            </p>
          )}
        </div>

        {nowPlaying && nowPlaying.history.length > 0 && (
          <div className="border-border rounded-md border bg-white p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold uppercase">
              <ListMusic className="text-accent size-5" aria-hidden /> Tocou na Hits
            </h2>
            <ol className="divide-border divide-y">
              {nowPlaying.history.slice(0, 6).map((t, i) => (
                <li key={`${t}-${i}`} className="py-2">
                  {t}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="bg-surface-2 space-y-3 rounded-md p-6">
          <ButtonLink
            href={whatsappLink("Oi, Hits! Quero pedir uma música:")}
            variant="accent"
            className="w-full"
          >
            <WhatsappIcon /> Pedir música
          </ButtonLink>
          <ButtonLink href={site.apps.android} variant="outline" className="w-full">
            <Smartphone /> App Android
          </ButtonLink>
          <ButtonLink href={site.apps.ios} variant="outline" className="w-full">
            <Smartphone /> App iPhone
          </ButtonLink>
        </div>
      </aside>
    </div>
  );
}
