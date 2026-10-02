import type { NewsPost } from "./types";

// Dados de exemplo. Na fase 6 as notícias reais vêm do WordPress antigo.
// Texto de exemplo até a importação das notícias reais.
const sample = [
  "Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.",
  "A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.",
  "No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.",
];

export const news: NewsPost[] = [
  {
    id: "1",
    slug: "concurso-saude-tocantins",
    title:
      "Concurso da Saúde do Tocantins com salários de até R$ 17,7 mil encerra inscrições nesta quinta",
    excerpt: "Candidatos ainda podem se inscrever pelo site da banca organizadora.",
    category: "Tocantins",
    content: sample,
    publishedAt: "2026-10-02T10:00:00-03:00",
  },
  {
    id: "2",
    slug: "acidente-aviao-zona-rural",
    title:
      "Empresário goiano morre em acidente de avião de pequeno porte na zona rural do Tocantins",
    excerpt: "A aeronave caiu logo após a decolagem, segundo a polícia.",
    category: "Tocantins",
    content: sample,
    publishedAt: "2026-10-01T15:30:00-03:00",
  },
  {
    id: "3",
    slug: "colisao-to-373",
    title: "Colisão entre caminhonete e caminhão deixa homem morto na TO-373, em Araguaçu",
    excerpt: "O acidente aconteceu no início da manhã.",
    category: "Trânsito",
    content: sample,
    publishedAt: "2026-10-01T09:10:00-03:00",
  },
  {
    id: "4",
    slug: "laudo-familia-aguarda",
    title: "Família aguarda há mais de quatro meses por laudo de identificação no TO",
    excerpt: "Parentes cobram resposta do Instituto Médico Legal.",
    category: "Tocantins",
    content: sample,
    publishedAt: "2026-09-30T18:00:00-03:00",
  },
  {
    id: "5",
    slug: "motorista-eletrocutado",
    title: "Motorista tenta retirar fiação presa a carro em cegonha e morre eletrocutado no TO",
    excerpt: "A concessionária de energia foi acionada.",
    category: "Tocantins",
    content: sample,
    publishedAt: "2026-09-30T11:00:00-03:00",
  },
  {
    id: "6",
    slug: "palmas-agenda-cultural",
    title: "Palmas tem agenda cultural movimentada neste fim de semana",
    excerpt: "Shows, feiras e atividades gratuitas na capital.",
    category: "Palmas",
    content: sample,
    publishedAt: "2026-09-29T08:00:00-03:00",
  },
];
