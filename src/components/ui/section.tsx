import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  // Fundo da seção: branco, pontinhos azuis ou azul chapado com corte diagonal.
  tone?: "white" | "dots" | "blue";
};

const tones = {
  white: "bg-white",
  dots: "bg-dots",
  blue: "bg-primary edge-diagonal py-24 text-white sm:py-28",
};

// Seção com o título no estilo do site atual: caixa alta e um traço laranja embaixo.
export function Section({
  title,
  description,
  action,
  tone = "white",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-14 sm:py-20", tones[tone], className)} {...props}>
      <Container>
        {title && (
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                className={cn(
                  "text-2xl font-extrabold uppercase sm:text-3xl",
                  tone === "blue" ? "text-white" : "text-primary",
                )}
              >
                {title}
              </h2>
              <span aria-hidden className="bg-accent mt-3 block h-1 w-16" />
              {description && (
                <p
                  className={cn(
                    "mt-4 max-w-2xl text-lg",
                    tone === "blue" ? "text-white/85" : "text-muted",
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            {action}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
