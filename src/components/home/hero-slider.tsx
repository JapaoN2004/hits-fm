"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoreBadges } from "@/components/app/store-badges";
import { HeaderListenButton } from "@/components/player/header-listen-button";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/icons/social";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

// Foto de fundo do banner (arquivo em /public). Com null, o banner fica só no azul.
// TODO(cliente): foto de pessoas ouvindo música (licença livre) em public/images/banner-ouvintes.jpg.
const heroPhoto: string | null = null;

const slides = [
  {
    title: "A vida é feita de Hits!",
    text: "Flashbacks, MPB e os maiores sucessos dos anos 70 até hoje. Ao vivo de Palmas, 24 horas por dia.",
    cta: <HeaderListenButton size="lg" />,
  },
  {
    title: "Novo app da Hits FM!",
    text: "Ouça a Hits FM no celular, onde estiver: no carro, no trabalho ou na academia.",
    cta: <StoreBadges />,
  },
  {
    title: "Peça sua música",
    text: "Mande seu pedido e seu recado pelo WhatsApp da Hits. A gente toca pra você!",
    cta: (
      <ButtonLink
        href={whatsappLink("Oi, Hits! Quero pedir uma música:")}
        variant="accent"
        size="lg"
      >
        <WhatsappIcon /> Pedir pelo WhatsApp
      </ButtonLink>
    ),
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Parallax: as faixas laranja e azul descem mais devagar que a página ao rolar.
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bandsY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 160]);
  const textY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -60]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearTimeout(t);
  }, [index, paused]);

  const go = (d: number) => setIndex((i) => (i + d + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="bg-primary relative overflow-hidden text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {heroPhoto ? (
        <>
          <Image
            src={heroPhoto}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div
            aria-hidden
            className="from-primary-dark via-primary/90 to-primary/20 absolute inset-0 bg-linear-to-r"
          />
        </>
      ) : (
        <motion.div
          aria-hidden
          style={{ y: bandsY }}
          className="absolute -inset-y-24 right-0 w-full"
        >
          <div className="bg-accent absolute inset-y-0 right-0 hidden w-1/3 translate-x-24 skew-x-[-12deg] md:block" />
          <div className="bg-primary-dark absolute inset-y-0 right-0 hidden w-1/3 translate-x-40 skew-x-[-12deg] md:block" />
          <div className="bg-accent absolute inset-y-0 right-0 w-10 translate-x-4 skew-x-[-12deg] md:hidden" />
        </motion.div>
      )}

      <Container className="relative">
        <motion.div style={{ y: textY }}>
          {slides.map((s, i) => (
            <div
              key={s.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}`}
              hidden={i !== index}
              className="animate-fade-up flex min-h-[420px] max-w-2xl flex-col items-start justify-center gap-6 pt-14 pb-28 sm:min-h-[460px]"
            >
              <h2 className="text-3xl font-black uppercase italic sm:text-5xl lg:text-6xl">
                {s.title}
              </h2>
              <p className="text-lg text-white/90 sm:text-xl">{s.text}</p>
              {s.cta}
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-6 left-4 flex items-center gap-3 sm:left-6 lg:left-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Destaque anterior"
            className="grid size-12 place-items-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <ChevronLeft className="size-6" />
          </button>
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir para o destaque ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-3 rounded-full transition-all",
                i === index ? "bg-accent w-8" : "w-3 bg-white/50",
              )}
            />
          ))}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo destaque"
            className="grid size-12 place-items-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </Container>
    </section>
  );
}
