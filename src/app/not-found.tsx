import { Home, Radio } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-6 py-20 sm:py-28">
      <p className="font-display text-accent text-7xl font-black italic sm:text-8xl">404</p>
      <h1 className="text-primary text-3xl font-black uppercase sm:text-4xl">
        Essa página saiu do ar
      </h1>
      <p className="text-muted max-w-xl text-lg">
        Não encontramos o que você procurava. Mas a Hits continua no ar: dá o play no player aqui
        embaixo!
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary" size="lg">
          <Home /> Página inicial
        </ButtonLink>
        <ButtonLink href="/ao-vivo" variant="accent" size="lg">
          <Radio /> Ouvir ao vivo
        </ButtonLink>
      </div>
    </Container>
  );
}
