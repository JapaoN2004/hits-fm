import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "ghost" | "outline";
type Size = "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg hover:shadow-glow-blue hover:brightness-110",
  accent: "bg-accent text-accent-fg hover:shadow-glow-orange hover:brightness-105",
  ghost: "text-text hover:bg-surface-2",
  outline: "border border-border-strong text-text hover:border-accent hover:text-accent",
};

// Altura mínima de 48px em todos os tamanhos (público 40+).
const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-7 text-lg",
  xl: "min-h-16 px-9 text-xl",
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0";

type Common = { variant?: Variant; size?: Size; children: ReactNode };

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...props
}: Common & ComponentProps<typeof Link>) {
  const external = typeof href === "string" && /^https?:/.test(href);
  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
