"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/ao-vivo`;
    const text = `Estou ouvindo a ${site.name} ao vivo!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: site.name, text, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
        "_blank",
        "noopener",
      );
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Compartilhar a rádio"
      className={cn("hover:bg-surface-2 grid size-12 place-items-center rounded-full", className)}
    >
      <Share2 className="size-5" aria-hidden />
      <span role="status" className="sr-only">
        {copied ? "Link copiado" : ""}
      </span>
    </button>
  );
}
