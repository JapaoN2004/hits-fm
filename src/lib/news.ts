import { site } from "./site";

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

// Tempo de leitura estimado (200 palavras por minuto).
export function readingTime(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
