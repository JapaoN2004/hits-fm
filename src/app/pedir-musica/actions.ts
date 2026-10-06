"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { anonWriteClient } from "@/lib/supabase/public";

const schema = z.object({
  nome: z.string().trim().min(2).max(80),
  musica: z.string().trim().min(1).max(120),
  artista: z.string().trim().max(120),
  cidade: z.string().trim().max(80),
  recado: z.string().trim().max(500),
  site: z.string().max(0), // honeypot: só robôs preenchem
});

export type SongRequestResult = "ok" | "invalid" | "rate-limited" | "error";

// Grava o pedido para a equipe ver no painel. O limite de envios por IP fica no banco.
export async function saveSongRequest(input: unknown): Promise<SongRequestResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return "invalid";

  const db = anonWriteClient();
  if (!db) return "ok"; // sem banco configurado (prévia): só o WhatsApp

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
  // Guarda só um hash do IP, nunca o endereço em si.
  const ipHash = ip
    ? createHash("sha256")
        .update(`${process.env.IP_HASH_SALT ?? ""}:${ip}`)
        .digest("hex")
    : null;

  const f = parsed.data;
  const { data, error } = await db.rpc("submit_song_request", {
    p_name: f.nome,
    p_song: f.musica,
    p_artist: f.artista,
    p_message: f.recado,
    p_city: f.cidade,
    p_ip_hash: ipHash,
  });
  if (error) {
    console.error("[pedir-musica] erro ao gravar:", error);
    return "error";
  }
  return data === false ? "rate-limited" : "ok";
}
