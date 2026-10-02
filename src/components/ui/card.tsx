import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & { glass?: boolean; interactive?: boolean };

export function Card({ className, glass, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-border rounded-3xl border p-6",
        glass ? "bg-(--glass) backdrop-blur-xl" : "bg-surface-1",
        interactive &&
          "hover:border-border-strong hover:shadow-glow-blue transition-all duration-300 hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  );
}
