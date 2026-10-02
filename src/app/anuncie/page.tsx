import type { Metadata } from "next";
import { Car, Megaphone, Users } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Anuncie",
  description: "Anuncie na Hits FM 93.5 e fale com o público adulto de Palmas.",
};

// TODO(cliente): números de alcance e audiência, se quiserem divulgar.
const reasons = [
  {
    icon: Users,
    title: "Público 40+",
    text: "Adultos com poder de decisão de compra, fiéis à rádio.",
  },
  {
    icon: Car,
    title: "No carro e no trabalho",
    text: "A Hits acompanha o ouvinte durante o dia, em Palmas e região.",
  },
  {
    icon: Megaphone,
    title: "Formatos sob medida",
    text: "Spots, patrocínio de programas, ações ao vivo e promoções.",
  },
];

export default function AnunciePage() {
  return (
    <>
      <PageHeader
        title="Anuncie na Hits"
        description="Sua marca na rádio que acompanha o público adulto de Palmas."
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="border-border rounded-md border bg-white p-6 shadow-sm">
              <Icon className="text-accent size-10" aria-hidden />
              <h2 className="mt-4 text-xl font-extrabold uppercase">{title}</h2>
              <p className="text-muted mt-2">{text}</p>
            </li>
          ))}
        </ul>
        <div className="bg-primary mt-10 flex flex-col items-start gap-4 rounded-md p-8 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl font-black uppercase">Fale com o comercial</p>
            <p className="text-white/85">
              {site.contact.hours} · {site.contact.email}
            </p>
          </div>
          <ButtonLink
            href={whatsappLink("Olá! Quero anunciar na Hits FM.")}
            variant="accent"
            size="lg"
          >
            <WhatsappIcon /> {site.contact.phone}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
