import Link from "next/link";
import { cn } from "@/lib/utils";

// TODO(cliente): trocar pelo arquivo oficial do logo (PNG/SVG em alta).
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Hits FM 93.5 – página inicial"
      className={cn("font-display inline-flex items-baseline gap-1.5 leading-none", className)}
    >
      <span
        className={cn(
          "text-4xl font-black tracking-tight italic",
          light ? "text-white" : "text-primary",
        )}
      >
        HITS
      </span>
      <span className="text-accent text-2xl font-extrabold italic">FM</span>
      <span className={cn("text-xl font-bold", light ? "text-white/80" : "text-muted")}>93.5</span>
    </Link>
  );
}
