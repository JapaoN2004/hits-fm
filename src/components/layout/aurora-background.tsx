// Fundo "aurora" animado: só CSS, sem JS, e parado com prefers-reduced-motion.
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-blue/25 animate-aurora in-data-[theme=light]:bg-brand-blue/10 absolute -top-1/3 -left-1/4 size-[80vmax] rounded-full blur-[120px]" />
      <div className="bg-brand-orange/15 animate-aurora in-data-[theme=light]:bg-brand-orange/10 absolute -right-1/4 -bottom-1/3 size-[70vmax] rounded-full blur-[120px] [animation-delay:-11s]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,var(--bg)_85%)]" />
    </div>
  );
}
