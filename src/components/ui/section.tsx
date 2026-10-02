import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function Section({
  eyebrow,
  title,
  description,
  action,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      <Container>
        {(title || eyebrow) && (
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="text-accent mb-3 text-sm font-bold tracking-[0.2em] uppercase">
                  {eyebrow}
                </p>
              )}
              {title && <h2 className="text-3xl font-bold sm:text-5xl">{title}</h2>}
              {description && <p className="text-muted mt-4 text-lg">{description}</p>}
            </div>
            {action}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
