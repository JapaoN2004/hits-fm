import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "live";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted",
  primary: "bg-primary text-primary-fg",
  accent: "bg-accent text-accent-fg",
  live: "bg-live text-white",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-bold tracking-wider uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <Badge tone="live" className={className}>
      <span aria-hidden className="animate-live-pulse size-2 rounded-full bg-white" />
      Ao vivo
    </Badge>
  );
}
