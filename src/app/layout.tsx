import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PlayerBar } from "@/components/player/player-bar";
import { PlayerProvider } from "@/components/player/player-provider";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} · ${site.city}`, template: `%s · ${site.shortName}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#0b4ea2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable}`}>
      {/* pb-24: espaço para o player fixo no rodapé. */}
      <body className="flex min-h-dvh flex-col pb-24 antialiased">
        <PlayerProvider>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
