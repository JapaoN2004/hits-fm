import "server-only";
import { hosts as mockHosts } from "@/data/hosts";
import { news as mockNews } from "@/data/news";
import { promotions as mockPromotions } from "@/data/promotions";
import { programs as mockPrograms, schedule as mockSchedule } from "@/data/schedule";
import type { Grid, Host, NewsPost, Promotion, Weekday } from "@/data/types";
import { normalize } from "./news";
import { sanitizeNewsHtml } from "./sanitize";
import { publicClient } from "./supabase/public";

// Leitura do conteúdo público. Com o Supabase configurado lê do banco (RLS: só o publicado);
// sem ele, usa os dados de exemplo de src/data, no mesmo formato.

export const PAGE_SIZE = 9;

// Registra e interrompe a renderização: com ISR o Next mantém no ar a última versão boa da página.
function fail(what: string, error: unknown): never {
  console.error(`[conteúdo] erro ao ler ${what}:`, error);
  throw new Error(`Não foi possível carregar ${what}.`);
}

// ---------------------------------------------------------------------------
// Locutores
// ---------------------------------------------------------------------------

type HostRow = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  photo_url: string | null;
  instagram_url: string | null;
};

const HOST_COLUMNS = "id, slug, name, bio, photo_url, instagram_url";

function toHost(r: HostRow): Host {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    bio: r.bio,
    photo: r.photo_url ?? undefined,
    instagram: r.instagram_url ?? undefined,
  };
}

export async function getHosts(): Promise<Host[]> {
  const db = publicClient(["hosts"]);
  if (!db) return mockHosts;
  const { data, error } = await db
    .from("hosts")
    .select(HOST_COLUMNS)
    .order("sort_order")
    .order("name")
    .returns<HostRow[]>();
  if (error) fail("os locutores", error);
  return data.map(toHost);
}

export async function getHost(slug: string): Promise<Host | undefined> {
  return (await getHosts()).find((h) => h.slug === slug);
}

// ---------------------------------------------------------------------------
// Programas e grade
// ---------------------------------------------------------------------------

type ProgramRow = {
  id: string;
  name: string;
  description: string;
  program_hosts: { host_id: string }[];
};
type SlotRow = { program_id: string; day: number; start_time: string; end_time: string };

// "19:00:00" -> "19:00"; o Postgres grava meia-noite de fim como "24:00:00".
const hhmm = (t: string) => t.slice(0, 5);

export async function getGrid(): Promise<Grid> {
  const db = publicClient(["schedule"]);
  if (!db) return { programs: mockPrograms, slots: mockSchedule };
  const [programs, slots] = await Promise.all([
    db
      .from("programs")
      .select("id, name, description, program_hosts(host_id)")
      .returns<ProgramRow[]>(),
    db
      .from("schedule_slots")
      .select("program_id, day, start_time, end_time")
      .order("day")
      .order("start_time")
      .returns<SlotRow[]>(),
  ]);
  if (programs.error) fail("os programas", programs.error);
  if (slots.error) fail("a grade", slots.error);
  return {
    programs: programs.data.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description || undefined,
      hostIds: p.program_hosts.map((ph) => ph.host_id),
    })),
    slots: slots.data.map((s) => ({
      programId: s.program_id,
      day: s.day as Weekday,
      start: hhmm(s.start_time),
      end: hhmm(s.end_time),
    })),
  };
}

// ---------------------------------------------------------------------------
// Notícias
// ---------------------------------------------------------------------------

type NewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  cover_url: string | null;
  content_html?: string;
};

const NEWS_LIST_COLUMNS = "id, slug, title, excerpt, category, published_at, cover_url";

function toNews(r: NewsRow): NewsPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    publishedAt: r.published_at,
    cover: r.cover_url ?? undefined,
    // Sanitiza de novo na saída: defesa extra caso algo tenha entrado sem passar pelo painel.
    contentHtml: sanitizeNewsHtml(r.content_html ?? ""),
  };
}

const byDateDesc = (a: NewsPost, b: NewsPost) => b.publishedAt.localeCompare(a.publishedAt);

// Termo de busca seguro para o filtro .or() do PostgREST (vírgulas e parênteses são sintaxe).
function searchTerm(q: string) {
  return q.replace(/[%_,()*\\"']/g, " ").trim();
}

export async function listNews({
  q,
  category,
  page = 1,
}: {
  q?: string;
  category?: string;
  page?: number;
}) {
  const db = publicClient(["news"]);
  if (!db) {
    const term = q ? normalize(q) : "";
    const filtered = mockNews
      .filter((p) => !category || p.category === category)
      .filter((p) => !term || normalize(`${p.title} ${p.excerpt}`).includes(term))
      .sort(byDateDesc);
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const current = Math.min(Math.max(1, page), pages);
    return {
      items: filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
      page: current,
      pages,
      total: filtered.length,
    };
  }

  const current = Math.max(1, page);
  let query = db
    .from("news")
    .select(NEWS_LIST_COLUMNS, { count: "exact" })
    .order("published_at", { ascending: false })
    .range((current - 1) * PAGE_SIZE, current * PAGE_SIZE - 1);
  if (category) query = query.eq("category", category);
  const term = q ? searchTerm(q) : "";
  if (term) query = query.or(`title.ilike.*${term}*,excerpt.ilike.*${term}*`);

  const { data, count, error } = await query.returns<NewsRow[]>();
  // Página além do fim: o PostgREST responde erro de intervalo; tratamos como lista vazia.
  if (error && error.code !== "PGRST103") fail("as notícias", error);
  const total = count ?? 0;
  return {
    items: (data ?? []).map(toNews),
    page: current,
    pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    total,
  };
}

export async function latestNews(limit: number): Promise<NewsPost[]> {
  const db = publicClient(["news"]);
  if (!db) return [...mockNews].sort(byDateDesc).slice(0, limit);
  const { data, error } = await db
    .from("news")
    .select(NEWS_LIST_COLUMNS)
    .order("published_at", { ascending: false })
    .limit(limit)
    .returns<NewsRow[]>();
  if (error) fail("as notícias", error);
  return data.map(toNews);
}

export async function newsCategories(): Promise<string[]> {
  const db = publicClient(["news"]);
  if (!db) return [...new Set(mockNews.map((p) => p.category))].sort();
  const { data, error } = await db
    .from("news")
    .select("category")
    .returns<{ category: string }[]>();
  if (error) fail("as categorias", error);
  return [...new Set(data.map((r) => r.category))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export async function getNews(slug: string): Promise<NewsPost | undefined> {
  const db = publicClient(["news"]);
  if (!db) return mockNews.find((p) => p.slug === slug);
  const { data, error } = await db
    .from("news")
    .select(`${NEWS_LIST_COLUMNS}, content_html`)
    .eq("slug", slug)
    .maybeSingle<NewsRow>();
  if (error) fail("a notícia", error);
  return data ? toNews(data) : undefined;
}

export async function relatedNews(post: NewsPost, limit = 3): Promise<NewsPost[]> {
  const db = publicClient(["news"]);
  if (!db) {
    return mockNews
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .sort(byDateDesc)
      .slice(0, limit);
  }
  const { data, error } = await db
    .from("news")
    .select(NEWS_LIST_COLUMNS)
    .eq("category", post.category)
    .neq("slug", post.slug)
    .order("published_at", { ascending: false })
    .limit(limit)
    .returns<NewsRow[]>();
  if (error) fail("as notícias relacionadas", error);
  return data.map(toNews);
}

// ---------------------------------------------------------------------------
// Promoções
// ---------------------------------------------------------------------------

type PromotionRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  how_to: string[];
  rules: string[];
  cover_url: string | null;
  ends_at: string;
};

export async function getPromotions(): Promise<Promotion[]> {
  const db = publicClient(["promotions"]);
  if (!db) return mockPromotions;
  const { data, error } = await db
    .from("promotions")
    .select("id, slug, title, summary, how_to, rules, cover_url, ends_at")
    .order("ends_at", { ascending: false })
    .returns<PromotionRow[]>();
  if (error) fail("as promoções", error);
  return data.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    howTo: r.how_to,
    rules: r.rules,
    cover: r.cover_url ?? undefined,
    endsAt: r.ends_at,
  }));
}
