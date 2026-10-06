"use client";

import { PlayButton } from "@/components/player/play-button";
import { useGrid } from "@/components/schedule/schedule-provider";
import { LiveBadge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { formatHour, onAirNow } from "@/lib/schedule";
import { usePalmasNow } from "@/lib/use-palmas-now";

// Calculado no navegador para refletir a hora real de Palmas.
export function OnAirBar() {
  const grid = useGrid();
  const now = usePalmasNow();
  const onAir = now && onAirNow(grid, now);

  return (
    <div className="border-border bg-surface-2 border-b">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
        <div className="flex items-center gap-3">
          <PlayButton size="md" />
          <span className="font-display font-extrabold uppercase">Ouça agora</span>
        </div>
        <div className="flex items-center gap-3">
          <LiveBadge />
          <span className="font-semibold">
            {onAir === null ? " " : (onAir.current?.program?.name ?? "Programação musical")}
          </span>
        </div>
        {onAir?.next && (
          <p className="text-muted">
            A seguir: <strong className="text-text">{onAir.next.program?.name}</strong> às{" "}
            {formatHour(onAir.next.slot.start)}
          </p>
        )}
      </Container>
    </div>
  );
}
