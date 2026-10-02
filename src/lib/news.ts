import { news } from "@/data/news";
import { site } from "./site";

export const PAGE_SIZE = 9;

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: site.timeZone,
});

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function listNews({
  q,
  category,
  page = 1,
}: {
  q?: string;
  category?: string;
  page?: number;
}) {
  const term = q ? normalize(q) : "";
  const filtered = news
    .filter((p) => !category || p.category === category)
    .filter((p) => !term || normalize(`${p.title} ${p.excerpt}`).includes(term))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  return {
    items: filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    page: current,
    pages,
    total: filtered.length,
  };
}

export function categories() {
  return [...new Set(news.map((p) => p.category))].sort();
}

export function getNews(slug: string) {
  return news.find((p) => p.slug === slug);
}

export function relatedNews(slug: string, limit = 3) {
  const post = getNews(slug);
  return news.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, limit);
}

// Tempo de leitura estimado (200 palavras por minuto).
export function readingTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
