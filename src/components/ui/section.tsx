import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

// Seção com o título no estilo do site atual: caixa alta e um traço laranja embaixo.
export function Section({
  title,
  description,
  action,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-14 sm:py-20", className)} {...props}>
      <Container>
        {title && (
          <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-primary text-2xl font-extrabold uppercase sm:text-3xl">
                {title}
              </h2>
              <span aria-hidden className="bg-accent mt-3 block h-1 w-16" />
              {description && <p className="text-muted mt-4 max-w-2xl">{description}</p>}
            </div>
            {action}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
