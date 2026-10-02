import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-2xl border border-border-strong bg-surface-1 px-4 text-lg text-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-accent/20";

type FieldProps = { label: string; hint?: ReactNode };

export function Input({ label, hint, className, ...props }: FieldProps & ComponentProps<"input">) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <input id={id} className={cn(control, "min-h-14", className)} {...props} />
      {hint && <p className="text-subtle text-sm">{hint}</p>}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  className,
  ...props
}: FieldProps & ComponentProps<"textarea">) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <textarea id={id} className={cn(control, "min-h-32 py-3", className)} {...props} />
      {hint && <p className="text-subtle text-sm">{hint}</p>}
    </div>
  );
}
