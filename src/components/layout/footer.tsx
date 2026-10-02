import { Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { mainNav, secondaryNav, site, whatsappLink } from "@/lib/site";
import { Logo } from "./logo";

const linkClass = "text-white/80 hover:text-accent";
const headingClass =
  "font-display mb-4 text-base font-extrabold uppercase tracking-wide text-white";
const socialClass =
  "grid size-12 place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-fg";

export function Footer() {
  return (
    <footer className="bg-primary-dark mt-auto text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo light />
          <p className="text-white/80">{site.tagline}</p>
          <div className="flex gap-2">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Hits FM"
              className={socialClass}
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Hits FM"
              className={socialClass}
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Hits FM"
              className={socialClass}
            >
              <WhatsappIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h2 className={headingClass}>Navegue</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
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
          <h2 className={headingClass}>Comercial</h2>
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
            <li className="inline-flex items-center gap-2 text-white/80">
              <Clock className="size-5" /> {site.contact.hours}
            </li>
          </ul>
        </div>
      </Container>
      <div className="bg-black/20">
        <Container className="py-5 text-center text-sm text-white/70">
          © {new Date().getFullYear()} {site.name} · {site.city}. Todos os direitos reservados.
        </Container>
      </div>
    </footer>
  );
}
