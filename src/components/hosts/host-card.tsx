import { User } from "lucide-react";
import Link from "next/link";
import type { Host } from "@/data/types";

export function HostCard({ host }: { host: Host }) {
  return (
    <Link
      href={`/locutores/${host.slug}`}
      className="group border-border block h-full overflow-hidden rounded-md border bg-white text-center shadow-sm hover:shadow-md"
    >
      {/* TODO(cliente): foto do locutor. */}
      <div className="bg-primary grid aspect-square place-items-center text-white/70">
        <User className="size-20" aria-hidden />
      </div>
      <div className="p-5">
        <h3 className="group-hover:text-primary text-xl font-extrabold uppercase">{host.name}</h3>
        <p className="text-muted mt-2">{host.bio}</p>
      </div>
    </Link>
  );
}
