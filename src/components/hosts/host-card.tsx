import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Host } from "@/data/types";

export function HostCard({ host }: { host: Host }) {
  return (
    <Link
      href={`/locutores/${host.slug}`}
      className="group border-border block h-full overflow-hidden rounded-md border bg-white text-center shadow-sm hover:shadow-md"
    >
      {/* TODO(cliente): fotos dos locutores (enviadas pelo painel). */}
      <div className="bg-primary relative grid aspect-square place-items-center text-white/70">
        {host.photo ? (
          <Image
            src={host.photo}
            alt={`Foto de ${host.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <User className="size-20" aria-hidden />
        )}
      </div>
      <div className="p-5">
        <h3 className="group-hover:text-primary text-xl font-extrabold uppercase">{host.name}</h3>
        <p className="text-muted mt-2">{host.bio}</p>
      </div>
    </Link>
  );
}
