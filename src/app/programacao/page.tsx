import type { Metadata } from "next";
import { ScheduleTabs } from "@/components/home/schedule-tabs";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Programação",
  description: "Grade de programação da Hits FM 93.5, de segunda a domingo.",
};

export default function ProgramacaoPage() {
  return (
    <>
      <PageHeader
        title="Programação"
        description="Confira o que toca na Hits em cada dia da semana. O programa que está no ar aparece destacado."
      />
      <Section>
        <ScheduleTabs />
        <p className="text-muted mt-6">
          Nos horários sem programa, a Hits segue com a melhor seleção musical.
        </p>
      </Section>
    </>
  );
}
