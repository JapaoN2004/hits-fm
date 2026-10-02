import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("border-border bg-surface-1 rounded-md border p-6 shadow-sm", className)}
      {...props}
    />
  );
}
