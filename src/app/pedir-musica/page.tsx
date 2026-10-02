import type { Metadata } from "next";
import { SongRequestForm } from "@/components/forms/song-request-form";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Pedir música",
  description: "Peça sua música na Hits FM 93.5 e mande um recado.",
};

export default function PedirMusicaPage() {
  return (
    <>
      <PageHeader
        title="Pedir música"
        description="Peça a sua música e mande um alô. A gente toca pra você!"
      />
      <Section>
        <div className="relative max-w-3xl rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <SongRequestForm />
        </div>
      </Section>
    </>
  );
}
