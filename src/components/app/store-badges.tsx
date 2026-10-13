import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0">
      <path
        fill="#00d7fe"
        d="M3.6 2.2 13.4 12l-9.8 9.8a1.5 1.5 0 0 1-.6-1.2V3.4c0-.5.2-.9.6-1.2Z"
      />
      <path fill="#ffce00" d="m16.8 8.6 3.6 2.1c1 .6 1 2 0 2.6l-3.6 2.1L13.4 12l3.4-3.4Z" />
      <path fill="#ff3a44" d="M13.4 12 3.6 21.8c.4.3 1 .4 1.6.1l11.6-6.5L13.4 12Z" />
      <path fill="#00f076" d="M13.4 12 16.8 8.6 5.2 2.1c-.6-.3-1.2-.2-1.6.1L13.4 12Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0" fill="currentColor">
      <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2.1-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4 1-1.4 1.4-2.7 1.4-2.8 0 0-2.6-1-2.6-4.2ZM13.9 5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z" />
    </svg>
  );
}

const badge =
  "bg-ink inline-flex min-h-14 items-center gap-3 rounded-lg border border-white/25 px-5 text-left text-white transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

// Selos das lojas, no estilo dos oficiais. Loja sem link configurado não aparece.
export function StoreBadges({ className }: { className?: string }) {
  const { android, ios } = site.apps;
  if (!android && !ios) return null;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {android && (
        <a href={android} target="_blank" rel="noopener noreferrer" className={badge}>
          <GooglePlayIcon />
          <span className="leading-tight">
            <span className="block text-xs">Disponível no</span>
            <span className="font-display block text-lg font-bold">Google Play</span>
          </span>
        </a>
      )}
      {ios && (
        <a href={ios} target="_blank" rel="noopener noreferrer" className={badge}>
          <AppleIcon />
          <span className="leading-tight">
            <span className="block text-xs">Baixar na</span>
            <span className="font-display block text-lg font-bold">App Store</span>
          </span>
        </a>
      )}
    </div>
  );
}
