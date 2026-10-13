"use client";

import { Music, Newspaper, Radio } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const chapters = [
  {
    icon: Music,
    kicker: "Música",
    title: "Dos anos 70 até hoje",
    text: "Flashbacks internacionais e o melhor da MPB, escolhidos a dedo para quem gosta de música boa.",
    tone: "bg-primary text-white",
  },
  {
    icon: Newspaper,
    kicker: "Jornalismo",
    title: "Informação de verdade",
    text: "O Direto da Redação e o Hits News trazem as notícias de Palmas, do Tocantins e do Brasil.",
    tone: "bg-accent text-accent-fg",
  },
  {
    icon: Radio,
    kicker: "Onde você estiver",
    title: "No carro, no trabalho ou em casa",
    text: "No rádio em 93.5 FM, aqui no site ou no aplicativo da Hits, 24 horas por dia.",
    tone: "bg-primary-dark text-white",
  },
];

// Faixa "landing page": fica presa na tela enquanto a pessoa rola e troca de assunto
// a cada terço da rolagem. Com movimento reduzido, a troca acontece sem animação.
export function WhyHits() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(chapters.length - 1, Math.floor(v * chapters.length)));
  });

  const chapter = chapters[active];
  const Icon = chapter.icon;

  return (
    <section ref={ref} aria-labelledby="por-que-ouvir" className="bg-dots relative h-[260vh]">
      <div className="sticky top-0 flex h-dvh items-center pb-24">
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="por-que-ouvir"
              className="text-primary text-2xl font-extrabold uppercase sm:text-3xl"
            >
              Por que ouvir a Hits
            </h2>
            <span aria-hidden className="bg-accent mt-3 block h-1 w-16" />
            <ol aria-hidden className="mt-8 space-y-2">
              {chapters.map((c, i) => (
                <li key={c.kicker}>
                  <span
                    className={cn(
                      "font-display flex items-center gap-4 rounded-md px-4 py-3 text-lg font-bold transition-colors sm:text-xl",
                      i === active ? "text-primary bg-white shadow-sm" : "text-subtle",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full text-base",
                        i === active ? "bg-accent text-accent-fg" : "bg-surface-3",
                      )}
                    >
                      {i + 1}
                    </span>
                    {c.kicker}
                  </span>
                </li>
              ))}
            </ol>
            {/* Barra de progresso da rolagem dentro da faixa. */}
            <div aria-hidden className="bg-surface-3 mt-6 h-1.5 overflow-hidden rounded-full">
              <motion.div
                className="bg-accent h-full origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>

          {/* Leitores de tela recebem os três assuntos de uma vez; o cartão animado é visual. */}
          <ul className="sr-only">
            {chapters.map((c) => (
              <li key={c.kicker}>
                {c.kicker}: {c.title}. {c.text}
              </li>
            ))}
          </ul>
          <div aria-hidden className="relative min-h-80 sm:min-h-96">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter.kicker}
                initial={reduce ? false : { opacity: 0, y: 40, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -40, rotate: 1.5 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-end gap-4 overflow-hidden rounded-md p-8 sm:p-10",
                  chapter.tone,
                )}
              >
                <Icon
                  className="absolute -top-6 -right-6 size-48 opacity-15 sm:size-64"
                  strokeWidth={1.5}
                />
                <p className="font-display text-sm font-bold tracking-widest uppercase opacity-80">
                  {chapter.kicker}
                </p>
                <p className="font-display text-3xl font-black uppercase italic sm:text-4xl">
                  {chapter.title}
                </p>
                <p className="max-w-md text-lg opacity-90">{chapter.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}
