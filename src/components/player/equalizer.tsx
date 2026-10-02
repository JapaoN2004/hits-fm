import { cn } from "@/lib/utils";

// Visualização simulada: o stream não libera CORS para análise de áudio real,
// então as barras só acompanham o estado tocando/pausado.
const bars = [0.9, 0.55, 1.1, 0.7, 1, 0.6, 0.85];

export function Equalizer({
  active,
  className,
  barClassName,
}: {
  active: boolean;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span aria-hidden className={cn("flex h-6 items-end gap-[3px]", className)}>
      {bars.map((d, i) => (
        <span
          key={i}
          className={cn("bg-accent h-full w-[3px] origin-bottom rounded-full", barClassName)}
          style={{
            transform: "scaleY(0.25)",
            animation: active ? `eq ${d}s ease-in-out ${i * -0.13}s infinite` : undefined,
          }}
        />
      ))}
    </span>
  );
}
