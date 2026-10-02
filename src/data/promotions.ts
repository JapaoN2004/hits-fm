import type { Promotion } from "./types";

// TODO(cliente): promoção atual (arte, regulamento e datas).
export const promotions: Promotion[] = [
  {
    id: "1",
    slug: "promocao-da-hits",
    title: "Promoção da Hits",
    summary: "Ouça a Hits FM 93.5, participe e concorra a prêmios.",
    howTo: [
      "Siga a Hits FM no Instagram.",
      "Fique ligado na programação: a palavra-chave é anunciada ao vivo.",
      "Mande a palavra-chave pelo WhatsApp da rádio com seu nome e bairro.",
    ],
    rules: [
      "Promoção válida para maiores de 18 anos residentes em Palmas – TO.",
      "O ganhador será anunciado ao vivo e contatado pelo WhatsApp.",
      "Regulamento completo disponível na rádio.",
    ],
    endsAt: "2026-12-20T23:59:00-03:00",
  },
  {
    id: "2",
    slug: "dia-das-maes-hits",
    title: "Dia das Mães Hits",
    summary: "Homenagem às mães ouvintes da Hits, com prêmios especiais.",
    howTo: ["Envie uma mensagem para sua mãe pelo WhatsApp da rádio."],
    rules: ["Promoção encerrada."],
    endsAt: "2026-05-10T23:59:00-03:00",
  },
];
