import type { Metadata } from "next";
import { CalendarClock, Gift } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getPromotions } from "@/lib/content";
import { formatDate } from "@/lib/news";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Promoções",
  description: "Promoções da Hits FM 93.5: participe e concorra a prêmios.",
};

// Recalcula a cada hora para mover promoções vencidas para "encerradas".
export const revalidate = 3600;

export default async function PromocoesPage() {
  const promotions = await getPromotions();
  const now = new Date().toISOString();
  const active = promotions.filter((p) => p.endsAt >= now);
  const ended = promotions.filter((p) => p.endsAt < now);

  return (
    <>
      <PageHeader title="Promoções" description="Ouça a Hits, participe e concorra a prêmios." />
      <Section>
        {active.length === 0 && (
          <p className="bg-surface-2 rounded-md p-8 text-center text-lg">
            Nenhuma promoção no ar agora. Fique ligado na programação!
          </p>
        )}
        <div className="space-y-8">
          {active.map((p) => (
            <article
              key={p.id}
              id={p.slug}
              className="border-border overflow-hidden rounded-md border bg-white shadow-sm"
            >
              {/* TODO(cliente): arte da promoção. */}
              <div className="bg-accent text-accent-fg flex items-center gap-4 p-6 sm:p-8">
                <Gift className="size-12 shrink-0" aria-hidden />
                <div>
                  <h2 className="text-2xl font-black uppercase sm:text-3xl">{p.title}</h2>
                  <p className="mt-1 text-lg">{p.summary}</p>
                </div>
              </div>
              <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
                <div>
                  <h3 className="text-primary mb-3 text-lg font-extrabold uppercase">
                    Como participar
                  </h3>
                  <ol className="list-decimal space-y-2 pl-6">
                    {p.howTo.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="text-primary mb-3 text-lg font-extrabold uppercase">
                    Regulamento
                  </h3>
                  <ul className="text-muted list-disc space-y-2 pl-6">
                    {p.rules.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-surface-2 flex flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8">
                <p className="inline-flex items-center gap-2 font-semibold">
                  <CalendarClock className="size-5" aria-hidden /> Até {formatDate(p.endsAt)}
                </p>
                <ButtonLink href={whatsappLink(`Quero participar da ${p.title}!`)} variant="accent">
                  <WhatsappIcon /> Participar
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {ended.length > 0 && (
        <Section title="Encerradas" className="bg-surface-2">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ended.map((p) => (
              <li key={p.id} className="rounded-md bg-white p-6 shadow-sm">
                <Badge>Encerrada</Badge>
                <h3 className="mt-3 text-lg font-extrabold uppercase">{p.title}</h3>
                <p className="text-muted mt-1">{p.summary}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
