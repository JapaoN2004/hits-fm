import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "A Hits",
  description: "Conheça a Hits FM 93.5, a rádio adulto contemporâneo de Palmas – TO.",
};

export default function SobrePage() {
  return (
    <>
      <PageHeader title="A Hits" description={site.tagline} />
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div className="text-muted max-w-3xl space-y-5 text-lg">
            <p>
              A <strong className="text-text">Hits FM</strong> é um projeto ousado, irreverente e
              desafiador. A programação musical foi pensada estrategicamente para o público adulto
              contemporâneo (40+) e traz um mix de sucessos do passado e do presente, dos anos 70
              até a atualidade, nacionais (MPB) e internacionais (flashbacks).
            </p>
            <p>
              Ela foi pensada para acompanhar o ouvinte em todas as situações: no carro, na
              academia, nas práticas esportivas, no trabalho, nas reuniões familiares e no lazer.
            </p>
            <p>
              A Hits segue os padrões de mercado desse perfil, em que músicas de qualidade,
              escolhidas a dedo, se associam a um jornalismo independente e verdadeiro. Onde houver
              um ouvinte com mais de 40 anos, ou que se identifique com a emissora, a Hits estará
              presente levando informação e boa música.
            </p>
            <p className="font-display text-primary text-2xl font-black uppercase italic">
              Sejam bem-vindos. Essa é a Hits FM – a vida é feita de Hits!
            </p>
          </div>
          <div className="bg-primary space-y-4 rounded-md p-8 text-white">
            <p className="font-display text-xl font-extrabold uppercase">Anuncie na Hits</p>
            <p className="text-white/90">
              Fale com o público que mais consome em Palmas. Conheça nossos formatos comerciais.
            </p>
            <ButtonLink href="/anuncie" variant="accent">
              Quero anunciar
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
