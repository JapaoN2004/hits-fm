import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/icons/social";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Hits FM 93.5 pelo WhatsApp, e-mail ou redes sociais.",
};

const item = "border-border flex items-start gap-4 rounded-md border bg-white p-6 shadow-sm";

export default function ContatoPage() {
  return (
    <>
      <PageHeader title="Contato" description="Fale com a Hits. A gente responde!" />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={item}>
            <WhatsappIcon className="text-whatsapp size-8 shrink-0" />
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold uppercase">WhatsApp</h2>
              <p className="text-muted">Pedidos de música, recados e atendimento comercial.</p>
              <ButtonLink href={whatsappLink()} variant="accent">
                {site.contact.phone}
              </ButtonLink>
            </div>
          </div>
          <div className={item}>
            <Mail className="text-primary size-8 shrink-0" aria-hidden />
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold uppercase">E-mail</h2>
              <p className="text-muted">Para propostas comerciais e parcerias.</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-primary font-semibold break-all hover:underline"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
          <div className={item}>
            <Clock className="text-primary size-8 shrink-0" aria-hidden />
            <div>
              <h2 className="text-xl font-extrabold uppercase">Atendimento</h2>
              <p className="text-muted mt-2">{site.contact.hours}</p>
              <p className="text-muted inline-flex items-center gap-2">
                <Phone className="size-4" aria-hidden /> {site.contact.phone}
              </p>
            </div>
          </div>
          <div className={item}>
            <InstagramIcon className="text-primary size-8 shrink-0" />
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold uppercase">Redes sociais</h2>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={site.social.instagram} variant="outline">
                  <InstagramIcon /> Instagram
                </ButtonLink>
                <ButtonLink href={site.social.facebook} variant="outline">
                  <FacebookIcon /> Facebook
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
