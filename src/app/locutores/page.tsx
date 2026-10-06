import type { Metadata } from "next";
import { HostCard } from "@/components/hosts/host-card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getHosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Locutores",
  description: "Conheça as vozes da Hits FM 93.5.",
};

export default async function LocutoresPage() {
  const hosts = await getHosts();

  return (
    <>
      <PageHeader title="Locutores" description="As vozes que fazem a Hits FM todos os dias." />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hosts.map((h) => (
            <li key={h.id}>
              <HostCard host={h} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
