import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Sem as variáveis o site usa os dados de exemplo de src/data (desenvolvimento e prévia).
export const hasSupabase = Boolean(url && anonKey);

// Conteúdo publicado fica em cache por 5 minutos; o painel revalida as tags na hora.
export const CONTENT_REVALIDATE = 300;

export type ContentTag = "news" | "hosts" | "schedule" | "promotions" | "settings";

// Cliente de leitura com a chave pública: o RLS garante que só sai o que está publicado.
// As respostas ficam no cache do Next com as tags informadas.
export function publicClient(tags: ContentTag[]) {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: CONTENT_REVALIDATE, tags } }),
    },
  });
}

// Cliente sem cache, para envios do público (ex.: pedidos de música). Também usa só a chave
// pública: o que o anônimo pode gravar é decidido no banco.
export function anonWriteClient() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}
