import Link from "next/link";
import { cn } from "@/lib/utils";

// TODO(cliente): trocar pelo logo oficial em SVG/PNG de alta resolução.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Hits FM 93.5 – página inicial"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className="from-brand-blue to-brand-orange font-display shadow-glow-blue group-hover:shadow-glow-orange grid size-11 place-items-center rounded-2xl bg-linear-135 text-lg font-extrabold text-white transition-shadow"
      >
        H
      </span>
      <span className="font-display leading-none">
        <span className="block text-xl font-extrabold tracking-tight">
          HITS <span className="text-accent">FM</span>
        </span>
        <span className="text-muted block text-xs font-semibold tracking-[0.2em] whitespace-nowrap sm:tracking-[0.3em]">
          93.5 · PALMAS
        </span>
      </span>
    </Link>
  );
}
