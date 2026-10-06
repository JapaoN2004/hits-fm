import type { Metadata } from "next";
import { ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsappIcon } from "@/components/icons/social";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getHost, getHosts } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  return (await getHosts()).map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/locutores/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const host = await getHost(slug);
  return host ? { title: host.name, description: host.bio } : {};
}

export default async function LocutorPage({ params }: PageProps<"/locutores/[slug]">) {
  const { slug } = await params;
  const host = await getHost(slug);
  if (!host) notFound();

  return (
    <>
      <PageHeader title={host.name} />
      <Section>
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          {/* TODO(cliente): foto do locutor. */}
          <div className="bg-primary relative grid aspect-square place-items-center overflow-hidden rounded-md text-white/70">
            {host.photo ? (
              <Image
                src={host.photo}
                alt={`Foto de ${host.name}`}
                fill
                priority
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            ) : (
              <User className="size-28" aria-hidden />
            )}
          </div>
          <div className="space-y-6">
            <p className="text-xl">{host.bio}</p>
            <ButtonLink
              href={whatsappLink(`Oi, ${host.name}! Quero mandar um alô:`)}
              variant="accent"
            >
              <WhatsappIcon /> Mandar um alô
            </ButtonLink>
            <p>
              <Link
                href="/locutores"
                className="text-primary inline-flex items-center gap-2 font-semibold hover:underline"
              >
                <ArrowLeft className="size-5" aria-hidden /> Todos os locutores
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
