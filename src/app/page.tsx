import { CalendarDays, Radio } from "lucide-react";
import { LiveBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

// Home provisória da fase 0. A home completa chega na fase 2.
export default function Home() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-8 py-20">
      <LiveBadge />
      <h1 className="max-w-4xl text-5xl font-extrabold sm:text-7xl">
        {site.tagline.replace("Hits!", "")}
        <span className="from-brand-blue to-brand-orange bg-linear-90 bg-clip-text text-transparent">
          Hits!
        </span>
      </h1>
      <p className="text-muted max-w-2xl text-xl">{site.description}</p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/ao-vivo" variant="accent" size="xl">
          <Radio /> Ouvir ao vivo
        </ButtonLink>
        <ButtonLink href="/style-guide" variant="outline" size="xl">
          <CalendarDays /> Ver style guide
        </ButtonLink>
      </div>
    </Container>
  );
}
