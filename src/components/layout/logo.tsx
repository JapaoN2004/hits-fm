import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logo from "../../../public/brand/logo-hits-compacto.png";

// Logo oficial da Hits FM 93.5 (arquivos enviados pela rádio). A versão compacta, sem
// "Palmas/TO", fica legível em tamanhos pequenos; a completa é usada nas áreas grandes.
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={logo}
        alt="Hits FM 93.5 – página inicial"
        priority={priority}
        sizes="128px"
        className="h-full w-auto"
      />
    </Link>
  );
}
