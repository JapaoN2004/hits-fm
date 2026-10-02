import type { Metadata } from "next";
import { LiveStudio } from "@/components/player/live-studio";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Ao vivo",
  description: "Ouça a Hits FM 93.5 de Palmas ao vivo, 24 horas por dia.",
};

export default function AoVivoPage() {
  return (
    <>
      <PageHeader title="Ao vivo" />
      <Section>
        <LiveStudio />
      </Section>
    </>
  );
}
