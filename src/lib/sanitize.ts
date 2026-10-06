import sanitizeHtml from "sanitize-html";

// Allowlist do corpo das notícias. Vale para o que vem do painel e da importação do
// WordPress antigo (que foi invadido): sem scripts, iframes, estilos ou atributos de evento.
const newsOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "a",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "h4",
    "blockquote",
    "figure",
    "figcaption",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "width", "height"],
  },
  allowedSchemes: ["https", "http", "mailto"],
  allowedSchemesByTag: { img: ["https"] },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer nofollow",
      target: "_blank",
    }),
  },
};

export function sanitizeNewsHtml(html: string) {
  return sanitizeHtml(html, newsOptions);
}

export function htmlToText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
}
