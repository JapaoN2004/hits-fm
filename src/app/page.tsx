import { ArrowRight, Gift, Newspaper, Smartphone, User } from "lucide-react";
import Link from "next/link";
import { HeroSlider } from "@/components/home/hero-slider";
import { OnAirBar } from "@/components/home/on-air-bar";
import { ScheduleTabs } from "@/components/home/schedule-tabs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { hosts } from "@/data/hosts";
import { news } from "@/data/news";
import { site } from "@/lib/site";

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  timeZone: site.timeZone,
});

export default function Home() {
  return (
    <>
      <HeroSlider />
      <OnAirBar />

      <Section title="A Hits">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          <div className="text-muted space-y-4 text-lg">
            <p>
              A <strong className="text-text">Hits FM</strong> é um projeto ousado, irreverente e
              desafiador. A programação foi pensada para o público adulto contemporâneo (40+), com
              um mix de sucessos do passado e do presente, dos anos 70 até hoje, nacionais (MPB) e
              internacionais (flashbacks).
            </p>
            <p>
              Músicas de qualidade, escolhidas a dedo, junto com um jornalismo independente e
              verdadeiro. No carro, no trabalho, na academia ou em casa, a Hits está com você.
            </p>
            <ButtonLink href="/sobre" variant="outline">
              Conheça a Hits <ArrowRight />
            </ButtonLink>
          </div>
          <div className="bg-primary flex aspect-square flex-col items-center justify-center gap-2 rounded-md text-center text-white">
            <span className="font-display text-7xl font-black italic">HITS</span>
            <span className="font-display text-accent text-4xl font-extrabold italic">FM 93.5</span>
            <span className="mt-2 text-white/80">{site.tagline}</span>
          </div>
        </div>
      </Section>

      <Section
        title="Programação"
        className="bg-surface-2"
        action={
          <ButtonLink href="/programacao" variant="outline">
            Ver grade completa
          </ButtonLink>
        }
      >
        <div className="rounded-md bg-white p-4 shadow-sm sm:p-6">
          <ScheduleTabs />
        </div>
      </Section>

      <Section title="Promoção">
        {/* TODO(cliente): promoção atual (arte e regulamento). */}
        <Link
          href="/promocoes"
          className="bg-accent text-accent-fg group flex flex-col items-start gap-4 rounded-md p-8 sm:flex-row sm:items-center sm:p-12"
        >
          <Gift className="size-16 shrink-0" aria-hidden />
          <div className="flex-1">
            <p className="font-display text-2xl font-black uppercase sm:text-3xl">
              Promoção da Hits
            </p>
            <p className="mt-1 text-lg">Participe e concorra a prêmios ouvindo a Hits FM 93.5.</p>
          </div>
          <span className="font-display inline-flex items-center gap-2 font-bold uppercase group-hover:underline">
            Saiba como participar <ArrowRight className="size-5" aria-hidden />
          </span>
        </Link>
      </Section>

      <Section
        title="Hits News"
        className="bg-surface-2"
        action={
          <ButtonLink href="/noticias" variant="outline">
            Mais notícias
          </ButtonLink>
        }
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((post) => (
            <li key={post.id}>
              <Link
                href={`/noticias/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm hover:shadow-md"
              >
                {/* Capa real chega com a importação do WordPress (fase 6). */}
                <div className="bg-surface-3 text-subtle grid aspect-video place-items-center">
                  <Newspaper className="size-10" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-3 text-sm">
                    <Badge tone="primary">{post.category}</Badge>
                    <time dateTime={post.publishedAt} className="text-subtle">
                      {dateFmt.format(new Date(post.publishedAt))}
                    </time>
                  </div>
                  <h3 className="group-hover:text-primary text-lg leading-snug font-bold">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Locutores"
        action={
          <ButtonLink href="/locutores" variant="outline">
            Conheça a equipe
          </ButtonLink>
        }
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hosts.map((h) => (
            <li key={h.id}>
              <Link
                href={`/locutores/${h.slug}`}
                className="group border-border block overflow-hidden rounded-md border bg-white text-center shadow-sm hover:shadow-md"
              >
                <div className="bg-primary grid aspect-square place-items-center text-white/70">
                  <User className="size-20" aria-hidden />
                </div>
                <div className="p-5">
                  <h3 className="group-hover:text-primary text-xl font-extrabold uppercase">
                    {h.name}
                  </h3>
                  <p className="text-muted mt-2">{h.bio}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-primary text-white">
        <Container className="flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Smartphone className="text-accent size-12 shrink-0" aria-hidden />
            <div>
              <p className="font-display text-2xl font-black uppercase">Baixe o app da Hits</p>
              <p className="text-white/85">A Hits FM no seu celular, onde você estiver.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.apps.android} variant="light">
              Google Play
            </ButtonLink>
            <ButtonLink href={site.apps.ios} variant="light">
              App Store
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
