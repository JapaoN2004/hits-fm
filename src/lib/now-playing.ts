// Busca a música tocando agora no painel do stream (SonicPanel/SHOUTcast).
// Os formatos variam entre versões do painel, então tentamos alguns endpoints
// conhecidos e ficamos com o primeiro que responder algo útil.
// TODO: confirmar qual endpoint o painel da Hits expõe (o ambiente de
// desenvolvimento não alcança o servidor do stream).

export type NowPlaying = {
  title: string | null; // "Artista - Música"
  history: string[];
  listeners: number | null;
};

const PANEL = "https://sonicpanel.oficialserver.com";
const PORT = "8200";

type Source = { url: string; parse: (body: string) => NowPlaying | null };

function clean(s: unknown) {
  if (typeof s !== "string") return null;
  const t = s.trim();
  return t && !/^(unknown|-)$/i.test(t) ? t : null;
}

const sources: Source[] = [
  {
    // SonicPanel: JSON com title, history (array) e listeners.
    url: `${PANEL}/cp/get_info.php?p=${PORT}`,
    parse(body) {
      const j = JSON.parse(body) as { title?: string; history?: unknown; listeners?: unknown };
      const title = clean(j.title);
      if (!title) return null;
      const history = Array.isArray(j.history)
        ? j.history
            .map((h) => clean(typeof h === "string" ? h.replace(/<[^>]*>/g, "") : null))
            .filter((h): h is string => !!h)
        : [];
      return { title, history: history.slice(0, 10), listeners: Number(j.listeners) || null };
    },
  },
  {
    // SHOUTcast v2: /stats?json=1
    url: `${PANEL}/${PORT}/stats?sid=1&json=1`,
    parse(body) {
      const j = JSON.parse(body) as { songtitle?: string; currentlisteners?: number };
      const title = clean(j.songtitle);
      return title ? { title, history: [], listeners: j.currentlisteners ?? null } : null;
    },
  },
  {
    // SHOUTcast v2: texto puro com a música atual.
    url: `${PANEL}/${PORT}/currentsong?sid=1`,
    parse(body) {
      const title = clean(body.slice(0, 300));
      return title && !title.startsWith("<") ? { title, history: [], listeners: null } : null;
    },
  },
];

export async function fetchNowPlaying(): Promise<NowPlaying> {
  for (const s of sources) {
    try {
      const res = await fetch(s.url, {
        next: { revalidate: 15 },
        signal: AbortSignal.timeout(4000),
        headers: { "user-agent": "Mozilla/5.0 (HitsFM site)" },
      });
      if (!res.ok) continue;
      const parsed = s.parse(await res.text());
      if (parsed) return parsed;
    } catch {
      // tenta o próximo
    }
  }
  return { title: null, history: [], listeners: null };
}
