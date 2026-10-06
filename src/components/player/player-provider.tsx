"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { NowPlaying } from "@/lib/now-playing";
import { useGrid } from "@/components/schedule/schedule-provider";
import { onAirNow } from "@/lib/schedule";
import { site } from "@/lib/site";
import { usePalmasNow } from "@/lib/use-palmas-now";

export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "reconnecting" | "error";

type PlayerContextValue = {
  status: PlayerStatus;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  nowPlaying: NowPlaying | null;
  programName: string;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

const VOLUME_KEY = "hits-volume";
const MAX_BACKOFF = 30_000;

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantPlay = useRef(false);
  const retries = useRef(0);
  const wasPlaying = useRef(false); // já tocou nesta sessão de escuta
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  const grid = useGrid();
  const now = usePalmasNow();
  const programName = (now && onAirNow(grid, now).current?.program?.name) || "Programação musical";

  // Conecta (ou reconecta) ao stream. O parâmetro evita reaproveitar um buffer velho.
  const connect = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (retryTimer.current) clearTimeout(retryTimer.current);
    audio.src = `${site.streamUrl}?t=${Date.now()}`;
    audio.play().catch((err: unknown) => {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        wantPlay.current = false;
        setStatus("paused");
      }
      // Outros erros chegam pelo evento "error", que agenda a reconexão.
    });
  }, []);

  const scheduleReconnect = useCallback(() => {
    if (!wantPlay.current) return;
    const delay = Math.min(1000 * 2 ** retries.current, MAX_BACKOFF);
    retries.current += 1;
    setStatus("reconnecting");
    if (retryTimer.current) clearTimeout(retryTimer.current);
    retryTimer.current = setTimeout(connect, delay);
  }, [connect]);

  // Cria o elemento de áudio uma única vez; ele vive no layout raiz e
  // por isso continua tocando ao navegar entre páginas.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    try {
      const saved = Number(localStorage.getItem(VOLUME_KEY));
      if (saved > 0 && saved <= 1) audio.volume = saved;
    } catch {}

    const on = (type: string, fn: () => void) => audio.addEventListener(type, fn);
    on("playing", () => {
      retries.current = 0;
      wasPlaying.current = true;
      setStatus("playing");
    });
    on(
      "waiting",
      () =>
        wantPlay.current &&
        setStatus(wasPlaying.current || retries.current > 0 ? "reconnecting" : "loading"),
    );
    on("volumechange", () => {
      setVolumeState(audio.volume);
      setMuted(audio.muted);
    });
    on("error", scheduleReconnect);
    on("ended", scheduleReconnect);
    on("stalled", () => {
      // Dá um tempo ao navegador antes de forçar a reconexão.
      if (retryTimer.current) clearTimeout(retryTimer.current);
      retryTimer.current = setTimeout(() => {
        if (wantPlay.current && audio.paused) scheduleReconnect();
      }, 8000);
    });

    const onOnline = () => {
      if (wantPlay.current) {
        retries.current = 0;
        connect();
      }
    };
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("online", onOnline);
      if (retryTimer.current) clearTimeout(retryTimer.current);
      audio.pause();
      audio.removeAttribute("src");
    };
  }, [connect, scheduleReconnect]);

  const play = useCallback(() => {
    wantPlay.current = true;
    wasPlaying.current = false;
    retries.current = 0;
    setStatus("loading");
    connect();
  }, [connect]);

  const pause = useCallback(() => {
    wantPlay.current = false;
    if (retryTimer.current) clearTimeout(retryTimer.current);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      // Em transmissão ao vivo, pausar = desconectar (não acumula atraso nem consome dados).
      audio.removeAttribute("src");
      audio.load();
    }
    setStatus("paused");
  }, []);

  const isPlaying = status === "playing" || status === "loading" || status === "reconnecting";
  const toggle = useCallback(() => (wantPlay.current ? pause() : play()), [pause, play]);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    audio.muted = v === 0;
    try {
      localStorage.setItem(VOLUME_KEY, String(v));
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = !audio.muted;
  }, []);

  // "Tocando agora": consulta o proxy enquanto a aba está visível.
  useEffect(() => {
    let stop = false;
    async function load() {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/now-playing");
        if (res.ok && !stop) setNowPlaying((await res.json()) as NowPlaying);
      } catch {}
    }
    load();
    const t = setInterval(load, 20_000);
    document.addEventListener("visibilitychange", load);
    return () => {
      stop = true;
      clearInterval(t);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);

  // Controles na tela de bloqueio / central de mídia do celular.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: nowPlaying?.title ?? programName,
      artist: `${site.name} · Ao vivo`,
      album: site.city,
      // TODO(cliente): capa com o logo oficial (512x512).
      artwork: [{ src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }],
    });
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("stop", pause);
  }, [nowPlaying?.title, programName, play, pause]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying
        ? "playing"
        : status === "idle"
          ? "none"
          : "paused";
    }
  }, [isPlaying, status]);

  return (
    <PlayerContext.Provider
      value={{
        status,
        isPlaying,
        volume,
        muted,
        nowPlaying,
        programName,
        play,
        pause,
        toggle,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer precisa estar dentro de <PlayerProvider>");
  return ctx;
}
