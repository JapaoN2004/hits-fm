"use client";

import { Menu, Radio, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav, secondaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Fecha o menu ao trocar de página.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="border-border sticky top-0 z-40 border-b bg-(--glass) backdrop-blur-xl">
        <a
          href="#conteudo"
          className="focus:bg-accent focus:text-accent-fg sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:px-5 focus:py-3"
        >
          Pular para o conteúdo
        </a>
        <Container className="flex h-20 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="text-muted hover:text-text aria-[current=page]:text-text aria-[current=page]:after:bg-accent aria-[current=page]:after:shadow-glow-orange relative rounded-full px-4 py-3 text-base font-medium transition-colors aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-4 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <ButtonLink href="/ao-vivo" variant="accent" className="hidden sm:inline-flex">
              <Radio /> Ouvir ao vivo
            </ButtonLink>
            <button
              type="button"
              className="hover:bg-surface-2 grid size-12 place-items-center rounded-full xl:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => {
                setOpenedAt(pathname);
                setOpen((v) => !v);
              }}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Fora do <header>: o backdrop-blur dele prenderia o position:fixed. */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="bg-bg/95 fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto backdrop-blur-xl xl:hidden"
      >
        <Container className="py-8">
          <nav aria-label="Menu">
            <ul className="space-y-1">
              {[...mainNav, ...secondaryNav].map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className={cn(
                      "font-display hover:bg-surface-2 flex min-h-14 items-center rounded-2xl px-4 text-2xl font-semibold transition-colors",
                      "aria-[current=page]:text-accent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="/ao-vivo" variant="accent" size="lg" className="mt-8 w-full">
            <Radio /> Ouvir ao vivo
          </ButtonLink>
        </Container>
      </div>
    </>
  );
}
