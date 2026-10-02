import type { Metadata } from "next";
import { Tv } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "TV Cristal",
  description: "Assista à TV Cristal ao vivo.",
};

export default function TvCristalPage() {
  return (
    <>
      <PageHeader title="TV Cristal" description="Assista à TV Cristal ao vivo." />
      <Section>
        <div className="mx-auto max-w-5xl">
          {site.tvCristalEmbedUrl ? (
            <div className="aspect-video overflow-hidden rounded-md bg-black shadow-sm">
              <iframe
                src={site.tvCristalEmbedUrl}
                title="TV Cristal ao vivo"
                className="size-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="bg-primary-dark flex aspect-video flex-col items-center justify-center gap-4 rounded-md p-6 text-center text-white">
              <Tv className="text-accent size-16" aria-hidden />
              <p className="font-display text-2xl font-extrabold uppercase">Transmissão em breve</p>
              <p className="text-white/80">A TV Cristal ao vivo vai aparecer aqui.</p>
            </div>
          )}
          <p className="text-muted mt-4">
            Dica: pause o player da rádio antes de assistir para não misturar os sons.
          </p>
        </div>
      </Section>
    </>
  );
}
