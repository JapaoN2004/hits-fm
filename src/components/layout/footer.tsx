import { Mail, Phone, Smartphone } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { mainNav, secondaryNav, site, whatsappLink } from "@/lib/site";
import { Logo } from "./logo";

const linkClass = "text-muted transition-colors hover:text-accent";

export function Footer() {
  return (
    <footer className="border-border bg-surface-1/60 mt-auto border-t">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-muted">{site.tagline}</p>
          <div className="flex gap-2">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Hits FM"
              className="border-border hover:border-accent hover:text-accent grid size-12 place-items-center rounded-full border"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Hits FM"
              className="border-border hover:border-accent hover:text-accent grid size-12 place-items-center rounded-full border"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Hits FM"
              className="border-border hover:border-accent hover:text-accent grid size-12 place-items-center rounded-full border"
            >
              <WhatsappIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="mb-4 text-lg font-bold tracking-normal">A rádio</h2>
          <ul className="space-y-2.5">
            {[...mainNav.slice(1), ...secondaryNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-lg font-bold tracking-normal">Comercial</h2>
          <ul className="space-y-3">
            <li>
              <a
                href={whatsappLink("Olá! Quero anunciar na Hits FM.")}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <Phone className="size-5" /> {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className={`${linkClass} inline-flex items-center gap-2 break-all`}
              >
                <Mail className="size-5 shrink-0" /> {site.contact.email}
              </a>
            </li>
            <li className="text-subtle">{site.contact.hours}</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold tracking-normal">Baixe o app</h2>
          <ul className="space-y-3">
            <li>
              <a
                href={site.apps.android}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <Smartphone className="size-5" /> Google Play
              </a>
            </li>
            <li>
              <a
                href={site.apps.ios}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <Smartphone className="size-5" /> App Store
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-border border-t">
        <Container className="text-subtle flex flex-wrap justify-between gap-2 py-6 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.city}
          </p>
          <p>Ouça ao vivo, 24 horas por dia.</p>
        </Container>
      </div>
    </footer>
  );
}
