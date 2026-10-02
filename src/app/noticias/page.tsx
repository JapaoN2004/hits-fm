import type { Metadata } from "next";
import { Search } from "lucide-react";
import Link from "next/link";
import { NewsCard } from "@/components/news/news-card";
import { buttonClasses } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { categories, listNews } from "@/lib/news";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hits News",
  description: "Notícias de Palmas, do Tocantins e do Brasil na Hits FM 93.5.",
};

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function NoticiasPage({ searchParams }: PageProps<"/noticias">) {
  const sp = await searchParams;
  const q = first(sp.q)?.trim() || undefined;
  const category = first(sp.categoria) || undefined;
  const { items, page, pages, total } = listNews({
    q,
    category,
    page: Number(first(sp.pagina)) || 1,
  });

  const href = (p: { categoria?: string; pagina?: number }) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p.categoria) params.set("categoria", p.categoria);
    if (p.pagina && p.pagina > 1) params.set("pagina", String(p.pagina));
    const s = params.toString();
    return s ? `/noticias?${s}` : "/noticias";
  };

  const chip = (active: boolean) =>
    cn(
      "font-display inline-flex min-h-12 items-center rounded-md px-4 font-bold uppercase",
      active ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted hover:bg-surface-3",
    );

  return (
    <>
      <PageHeader title="Hits News" description="Notícias de Palmas, do Tocantins e do Brasil." />
      <Section>
        <form role="search" action="/noticias" className="mb-6 flex max-w-2xl gap-3">
          {category && <input type="hidden" name="categoria" value={category} />}
          <label htmlFor="busca" className="sr-only">
            Buscar notícias
          </label>
          <input
            id="busca"
            name="q"
            defaultValue={q}
            placeholder="Buscar notícias"
            className="border-border-strong focus:border-primary focus:ring-primary/20 min-h-13 flex-1 rounded-md border bg-white px-4 text-lg focus:ring-3 focus:outline-none"
          />
          <button type="submit" className={buttonClasses({ variant: "primary" })}>
            <Search aria-hidden /> <span className="hidden sm:inline">Buscar</span>
            <span className="sr-only sm:hidden">Buscar</span>
          </button>
        </form>

        <nav aria-label="Categorias" className="mb-10 flex flex-wrap gap-2">
          <Link
            href={href({})}
            className={chip(!category)}
            aria-current={!category ? "page" : undefined}
          >
            Todas
          </Link>
          {categories().map((c) => (
            <Link
              key={c}
              href={href({ categoria: c })}
              className={chip(category === c)}
              aria-current={category === c ? "page" : undefined}
            >
              {c}
            </Link>
          ))}
        </nav>

        {q && (
          <p className="text-muted mb-6" role="status">
            {total} {total === 1 ? "resultado" : "resultados"} para “{q}”
          </p>
        )}

        {items.length === 0 ? (
          <p className="bg-surface-2 rounded-md p-8 text-center text-lg">
            Nenhuma notícia encontrada.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <li key={post.id}>
                <NewsCard post={post} />
              </li>
            ))}
          </ul>
        )}

        {pages > 1 && (
          <nav aria-label="Paginação" className="mt-10 flex flex-wrap justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={href({ categoria: category, pagina: p })}
                aria-current={p === page ? "page" : undefined}
                className={cn(chip(p === page), "min-w-12 justify-center")}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </Section>
    </>
  );
}
