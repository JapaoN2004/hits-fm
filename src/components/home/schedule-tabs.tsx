"use client";

import { useState } from "react";
import { useGrid } from "@/components/schedule/schedule-provider";
import type { Weekday } from "@/data/types";
import { dayNames, formatHour, isLive, programById, slotsForDay } from "@/lib/schedule";
import { usePalmasNow } from "@/lib/use-palmas-now";
import { cn } from "@/lib/utils";

const order: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export function ScheduleTabs() {
  const grid = useGrid();
  const now = usePalmasNow();
  const [selected, setDay] = useState<Weekday | null>(null);
  const day = selected ?? now?.day ?? 1;

  const slots = slotsForDay(grid, day);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Dia da semana"
        className="mb-6 flex gap-2 overflow-x-auto pb-2"
      >
        {order.map((d) => (
          <button
            key={d}
            role="tab"
            type="button"
            aria-selected={d === day}
            onClick={() => setDay(d)}
            className={cn(
              "font-display relative min-h-12 shrink-0 rounded-md px-5 font-bold uppercase",
              d === day
                ? "bg-primary text-primary-fg"
                : "bg-surface-2 text-muted hover:bg-surface-3",
            )}
          >
            {dayNames[d]}
            {now?.day === d && <span className="sr-only"> (hoje)</span>}
          </button>
        ))}
      </div>
      <ul role="tabpanel" className="border-border divide-border divide-y rounded-md border">
        {slots.length === 0 && <li className="text-muted p-5">Programação musical o dia todo.</li>}
        {slots.map((s) => {
          const live = now !== null && isLive(s, now);
          return (
            <li
              key={`${s.programId}-${s.start}`}
              className={cn(
                "flex flex-wrap items-center gap-x-6 gap-y-1 p-5",
                live && "bg-accent/10",
              )}
            >
              <span className="font-display text-primary w-36 font-extrabold">
                {formatHour(s.start)} – {formatHour(s.end)}
              </span>
              <span className="text-lg font-semibold">{programById(grid, s.programId)?.name}</span>
              {live && (
                <span className="bg-live rounded px-2 py-0.5 text-xs font-bold text-white uppercase">
                  No ar
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
