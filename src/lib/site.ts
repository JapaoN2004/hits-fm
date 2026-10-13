// Configuração estática do site. Na fase 4 estes valores passam a vir da tabela
// de configurações do Supabase (editável no painel); o formato se mantém.

export const site = {
  name: "Hits FM 93.5",
  shortName: "Hits FM",
  city: "Palmas – TO",
  tagline: "A vida é feita de Hits!",
  description:
    "Hits FM 93.5, Palmas – Tocantins. Flashbacks, MPB e os maiores hits, ao vivo 24 horas.",
  timeZone: "America/Araguaina",
  // Endereço público do site (links compartilhados, Open Graph, sitemap).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.hitsfmto.com.br",
  // NEXT_PUBLIC_STREAM_URL permite apontar para outro stream (ex.: testes locais).
  streamUrl:
    process.env.NEXT_PUBLIC_STREAM_URL || "https://sonicpanel.oficialserver.com/8200/stream",
  // TODO(cliente): link de incorporação (embed) da TV Cristal ao vivo, ex.: YouTube.
  tvCristalEmbedUrl: null as string | null,
  contact: {
    phone: "(63) 98150-0935",
    whatsapp: "5563981500935",
    email: "comercial@hitsfmto.com.br",
    hours: "Segunda a sexta, das 8h às 18h",
  },
  social: {
    instagram: "https://www.instagram.com/hitsfmpalmasto/",
    facebook: "https://www.facebook.com/hitsfmpalmas",
  },
  // Com null, o botão daquela loja não aparece.
  apps: {
    // TODO(cliente): link do app na Play Store. O do site antigo
    // (com.br.sunshineapps.radiohits) hoje abre um jogo que não é da rádio.
    android: null as string | null,
    ios: "https://apps.apple.com/br/app/hits-fm-to/id1518911745" as string | null,
  },
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/ao-vivo", label: "Ao vivo" },
  { href: "/programacao", label: "Programação" },
  { href: "/sobre", label: "A Hits" },
  { href: "/noticias", label: "Hits News" },
  { href: "/promocoes", label: "Promoção" },
  { href: "/locutores", label: "Locutores" },
  { href: "/tv-cristal", label: "TV Cristal" },
  { href: "/contato", label: "Contato" },
];

export const secondaryNav: NavItem[] = [
  { href: "/pedir-musica", label: "Pedir música" },
  { href: "/anuncie", label: "Anuncie" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
