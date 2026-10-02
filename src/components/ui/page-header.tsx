import type { ReactNode } from "react";
import { Container } from "./container";

// Faixa azul no topo das páginas internas, com o título (h1) da página.
export function PageHeader({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <div className="bg-primary text-white">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-black uppercase italic sm:text-5xl">{title}</h1>
        <span aria-hidden className="bg-accent mt-4 block h-1 w-16" />
        {description && <p className="mt-4 max-w-2xl text-lg text-white/90">{description}</p>}
      </Container>
    </div>
  );
}
