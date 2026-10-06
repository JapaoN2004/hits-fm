import type { Metadata } from "next";
import { ArrowLeft, Clock, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsappIcon } from "@/components/icons/social";
import { NewsCard } from "@/components/news/news-card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getNews, latestNews, relatedNews } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/news";
import { site } from "@/lib/site";

// Pré-gera as mais recentes; as outras são geradas no primeiro acesso.
export async function generateStaticParams() {
  return (await latestNews(30)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const post = await getNews((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function NoticiaPage({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const post = await getNews(slug);
  if (!post) notFound();
  const related = await relatedNews(post);
  const shareText = encodeURIComponent(`${post.title} – ${site.shortName}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.excerpt,
    publisher: { "@type": "RadioStation", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article>
        <Container className="max-w-3xl py-10 sm:py-14">
          <Link
            href="/noticias"
            className="text-primary mb-6 inline-flex items-center gap-2 font-semibold hover:underline"
          >
            <ArrowLeft className="size-5" aria-hidden /> Hits News
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge tone="primary">{post.category}</Badge>
            <time dateTime={post.publishedAt} className="text-subtle">
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-subtle inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden /> {readingTime(post.contentHtml)} min de
              leitura
            </span>
          </div>
          <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl">{post.title}</h1>
          <p className="text-muted mt-4 text-xl">{post.excerpt}</p>

          <div className="bg-surface-3 text-subtle relative my-8 grid aspect-video place-items-center overflow-hidden rounded-md">
            {post.cover ? (
              <Image
                src={post.cover}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            ) : (
              <Newspaper className="size-14" aria-hidden />
            )}
          </div>

          {/* contentHtml já sai sanitizado de src/lib/content.ts (allowlist de tags). */}
          <div
            className="news-body text-[1.1rem] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <a
            href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(`${site.url}/noticias/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp mt-10 inline-flex min-h-12 items-center gap-2 rounded-md px-6 font-bold text-white hover:brightness-90"
          >
            <WhatsappIcon className="size-5" /> Compartilhar no WhatsApp
          </a>
        </Container>
      </article>

      {related.length > 0 && (
        <Section title="Leia também" className="bg-surface-2">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.id}>
                <NewsCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
