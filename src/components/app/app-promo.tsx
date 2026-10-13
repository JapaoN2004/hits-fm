import { Pause, Radio, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import logo from "../../../public/brand/logo-hits.png";
import { StoreBadges } from "./store-badges";

// Celular desenhado em CSS com a tela do app tocando a Hits (sem foto de terceiros).
function PhoneMockup() {
  return (
    <div
      aria-hidden
      className="bg-ink relative mx-auto w-60 rotate-3 rounded-[2.5rem] p-2.5 shadow-2xl sm:w-64"
    >
      <div className="bg-ink absolute top-2.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl" />
      <div className="flex aspect-[9/19] flex-col overflow-hidden rounded-[2rem] bg-white">
        <div className="bg-primary flex items-center justify-between px-5 pt-8 pb-3 text-white">
          <span className="font-display text-xs font-bold uppercase">Hits FM 93.5</span>
          <Radio className="size-4" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
          <div className="border-surface-3 grid size-36 place-items-center rounded-full border-4 bg-white p-4 shadow-md">
            <Image src={logo} alt="" sizes="120px" className="h-auto w-full" />
          </div>
          <span className="bg-live inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white uppercase">
            <span className="size-1.5 rounded-full bg-white" /> Ao vivo
          </span>
          <p className="font-display text-primary text-center text-sm font-extrabold uppercase">
            A vida é feita de Hits!
          </p>
          <div className="bg-surface-3 h-1 w-full rounded-full">
            <div className="bg-accent h-full w-2/3 rounded-full" />
          </div>
          <div className="text-primary flex items-center gap-6">
            <SkipBack className="size-5" />
            <span className="bg-accent text-accent-fg grid size-14 place-items-center rounded-full">
              <Pause className="size-6" fill="currentColor" />
            </span>
            <SkipForward className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Anúncio do app, como o banner do site atual: pontos azuis, curva azul e o celular.
export function AppPromo() {
  return (
    <section aria-labelledby="novo-app" className="bg-dots relative overflow-hidden">
      {/* Curva azul chapada à direita, atrás do celular. */}
      <div
        aria-hidden
        className="bg-primary absolute inset-y-0 right-0 hidden w-[36%] rounded-l-[50%_100%] lg:block"
      />
      <div
        aria-hidden
        className="bg-primary absolute inset-x-0 bottom-0 h-56 rounded-t-[50%_100%] lg:hidden"
      />
      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_auto] lg:gap-24 lg:py-24">
        <Reveal>
          <div className="border-accent border-l-8 pl-5">
            <p className="font-display bg-accent text-accent-fg inline-block rounded px-2 py-0.5 text-sm font-bold tracking-widest uppercase">
              Baixe grátis
            </p>
            <h2
              id="novo-app"
              className="text-primary mt-3 text-4xl font-black uppercase sm:text-5xl xl:text-6xl"
            >
              Novo app da Hits FM!
            </h2>
          </div>
          <p className="text-muted mt-6 max-w-lg text-lg">
            A Hits no seu celular, 24 horas por dia: no carro, no trabalho ou em casa. É só baixar e
            ouvir ao vivo com um toque.
          </p>
          <StoreBadges className="mt-8" />
        </Reveal>
        <Reveal delay={0.15} className="lg:pr-16">
          <PhoneMockup />
        </Reveal>
      </Container>
    </section>
  );
}
