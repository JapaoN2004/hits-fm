"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/icons/social";
import { HeaderListenButton } from "@/components/player/header-listen-button";
import { Container } from "@/components/ui/container";
import { mainNav, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const socialClass = "grid size-10 place-items-center rounded-full hover:bg-white/15";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Fecha o menu ao trocar de página.
  if (open && openedAt !== pathname) setOpen(false);

  return (
    <header className="bg-white shadow-sm">
      <a
        href="#conteudo"
        className="focus:bg-accent focus:text-accent-fg sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>

      {/* Barra superior */}
      <div className="bg-primary-dark text-white">
        <Container className="flex h-11 items-center justify-between text-sm">
          <p className="hidden sm:block">{site.tagline}</p>
          <p className="sm:hidden">93.5 · Palmas</p>
          <div className="flex items-center">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={socialClass}
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={socialClass}
            >
              <WhatsappIcon className="size-4" />
            </a>
          </div>
        </Container>
      </div>

      {/* Logo */}
      <Container className="flex h-24 items-center justify-between xl:relative xl:justify-center">
        <Logo />
        <HeaderListenButton className="absolute right-8 hidden xl:inline-flex" />
        <button
          type="button"
          className="text-primary hover:bg-surface-2 grid size-12 place-items-center rounded-md xl:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((v) => !v);
          }}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </Container>

      {/* Menu */}
      <nav
        id="menu-principal"
        aria-label="Principal"
        className={cn("bg-primary text-white xl:block", open ? "block" : "hidden")}
      >
        <Container className="px-0 sm:px-0 xl:px-8">
          <ul className="flex flex-col xl:flex-row xl:justify-center">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="font-display hover:bg-primary-dark aria-[current=page]:bg-primary-dark aria-[current=page]:text-accent flex min-h-13 items-center border-b border-white/10 px-6 text-[0.95rem] font-bold tracking-wide uppercase xl:border-b-0 xl:px-4 xl:aria-[current=page]:text-white xl:aria-[current=page]:shadow-[inset_0_-4px_0_var(--accent)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 xl:hidden">
            <HeaderListenButton size="lg" className="w-full" />
          </div>
        </Container>
      </nav>
    </header>
  );
}
