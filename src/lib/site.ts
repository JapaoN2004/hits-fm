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
  streamUrl: "https://sonicpanel.oficialserver.com/8200/stream",
  contact: {
    phone: "(63) 98150-0935",
    whatsapp: "5563981500935",
    email: "comercial@hitsfmto.com.br",
    hours: "Segunda a sexta, das 8h às 18h",
  },
  social: {
    instagram: "https://www.instagram.com/", // TODO(cliente): perfil oficial do Instagram
    facebook: "https://www.facebook.com/", // TODO(cliente): página oficial do Facebook
  },
  apps: {
    android: "https://play.google.com/store", // TODO(cliente): link do app na Play Store
    ios: "https://apps.apple.com/", // TODO(cliente): link do app na App Store
  },
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/ao-vivo", label: "Ao vivo" },
  { href: "/programacao", label: "Programação" },
  { href: "/locutores", label: "Locutores" },
  { href: "/noticias", label: "Hits News" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/tv-cristal", label: "TV Cristal" },
];

export const secondaryNav: NavItem[] = [
  { href: "/pedir-musica", label: "Pedir música" },
  { href: "/sobre", label: "A Hits" },
  { href: "/anuncie", label: "Anuncie" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
