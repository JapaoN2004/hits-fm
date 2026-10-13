import { ArrowRight, Gift, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HostCard } from "@/components/hosts/host-card";
import { NewsCard } from "@/components/news/news-card";
import { HeroSlider } from "@/components/home/hero-slider";
import { OnAirBar } from "@/components/home/on-air-bar";
import { ScheduleTabs } from "@/components/home/schedule-tabs";
import { WhyHits } from "@/components/home/why-hits";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getHosts, latestNews } from "@/lib/content";
import { site } from "@/lib/site";
import logo from "../../public/brand/logo-hits.png";

export default async function Home() {
  const [hosts, news] = await Promise.all([getHosts(), latestNews(6)]);

  return (
    <>
      <HeroSlider />
      <OnAirBar />

      <Section title="A Hits">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          <Reveal className="text-muted space-y-4 text-lg">
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
          </Reveal>
          <Reveal
            delay={0.15}
            className="bg-dots flex aspect-square flex-col items-center justify-center gap-4 rounded-md p-10 text-center"
          >
            <Image src={logo} alt="Logo da Hits FM 93.5" sizes="300px" className="w-3/4" />
            <span className="font-display text-primary text-xl font-extrabold uppercase">
              {site.tagline}
            </span>
          </Reveal>
        </div>
      </Section>

      <WhyHits />

      <Section
        title="Programação"
        tone="blue"
        action={
          <ButtonLink href="/programacao" variant="light">
            Ver grade completa
          </ButtonLink>
        }
      >
        <Reveal className="text-text rounded-md bg-white p-4 shadow-lg sm:p-6">
          <ScheduleTabs />
        </Reveal>
      </Section>

      <Section title="Promoção">
        {/* TODO(cliente): promoção atual (arte e regulamento). */}
        <Reveal>
          <Link
            href="/promocoes"
            className="bg-accent text-accent-fg group relative flex flex-col items-start gap-4 overflow-hidden rounded-md p-8 sm:flex-row sm:items-center sm:p-12"
          >
            <Gift
              className="absolute -right-8 -bottom-10 size-56 opacity-10 transition-transform duration-500 group-hover:-rotate-12"
              aria-hidden
            />
            <Gift
              className="size-16 shrink-0 transition-transform group-hover:scale-110"
              aria-hidden
            />
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
        </Reveal>
      </Section>

      <Section
        title="Hits News"
        tone="dots"
        action={
          <ButtonLink href="/noticias" variant="outline">
            Mais notícias
          </ButtonLink>
        }
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((post, i) => (
            <Reveal as="li" key={post.id} delay={(i % 3) * 0.1}>
              <NewsCard post={post} />
            </Reveal>
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
          {hosts.slice(0, 4).map((h, i) => (
            <Reveal as="li" key={h.id} delay={i * 0.1}>
              <HostCard host={h} />
            </Reveal>
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
