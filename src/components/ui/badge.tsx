import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "live";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted border-border",
  primary: "bg-primary/15 text-text border-primary/40",
  accent: "bg-accent/15 text-text border-accent/50",
  live: "bg-live/15 text-text border-live/50",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <Badge tone="live" className={cn("tracking-wider uppercase", className)}>
      <span aria-hidden className="bg-live animate-live-pulse size-2.5 rounded-full" />
      Ao vivo
    </Badge>
  );
}
