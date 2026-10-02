"use client";

import { useSyncExternalStore } from "react";
import { palmasNow } from "./schedule";

type Now = ReturnType<typeof palmasNow>;
let cache: (Now & { key: number }) | null = null;

function getSnapshot() {
  const n = palmasNow();
  const key = n.day * 10_000 + n.minutes;
  if (cache?.key !== key) cache = { ...n, key };
  return cache;
}

function subscribe(onChange: () => void) {
  const t = setInterval(onChange, 30_000);
  return () => clearInterval(t);
}

// Hora atual de Palmas no navegador; null no servidor (evita divergência de hidratação).
export function usePalmasNow(): Now | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
