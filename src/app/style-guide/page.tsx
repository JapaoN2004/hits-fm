import type { Metadata } from "next";
import { Headphones, Mic2, Play, Radio, Send } from "lucide-react";
import { Badge, LiveBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input, Textarea } from "@/components/ui/field";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false },
};

const colors = [
  { name: "Azul da marca", token: "--brand-blue", className: "bg-brand-blue" },
  { name: "Laranja neon", token: "--brand-orange", className: "bg-brand-orange" },
  { name: "Ao vivo", token: "--live", className: "bg-live" },
  { name: "Fundo", token: "--bg", className: "bg-bg" },
  { name: "Superfície 1", token: "--surface-1", className: "bg-surface-1" },
  { name: "Superfície 2", token: "--surface-2", className: "bg-surface-2" },
  { name: "Superfície 3", token: "--surface-3", className: "bg-surface-3" },
  { name: "Texto", token: "--text", className: "bg-text" },
  { name: "Texto suave", token: "--text-muted", className: "bg-muted" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-border space-y-5 border-t pt-10">
      <h3 className="text-2xl font-bold">{title}</h3>
      {children}
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <>
      <Container className="pt-16">
        <p className="text-accent mb-3 text-sm font-bold tracking-[0.2em] uppercase">Fase 0</p>
        <h1 className="text-4xl font-extrabold sm:text-6xl">Style guide</h1>
        <p className="text-muted mt-4 max-w-2xl text-xl">
          Todos os componentes base do novo site da Hits FM. Use o botão de sol/lua no topo para
          conferir o tema claro.
        </p>
      </Container>

      <Container className="space-y-16 py-16">
        <Block title="Cores">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((c) => (
              <div
                key={c.token}
                className="border-border bg-surface-1 overflow-hidden rounded-2xl border"
              >
                <div className={`h-20 ${c.className}`} />
                <div className="p-3">
                  <p className="font-semibold">{c.name}</p>
                  <code className="text-subtle text-sm">{c.token}</code>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Tipografia">
          <div className="space-y-4">
            <p className="text-subtle text-sm">Títulos: Sora · Texto: Inter, corpo de 18px</p>
            <p className="font-display text-6xl font-extrabold">A vida é feita de Hits!</p>
            <p className="font-display text-4xl font-bold">Título de seção</p>
            <p className="font-display text-2xl font-semibold">Título de card</p>
            <p className="max-w-2xl text-lg">
              Texto corrido em 18px com boa altura de linha, pensado para leitura confortável no
              celular e no computador. Flashbacks, MPB e os maiores hits, ao vivo de Palmas.
            </p>
            <p className="text-muted">Texto secundário para legendas e descrições.</p>
          </div>
        </Block>

        <Block title="Botões">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="accent" size="xl">
              <Radio /> Ouvir ao vivo
            </Button>
            <Button size="lg">
              <Play /> Primário
            </Button>
            <Button variant="outline" size="lg">
              Contorno
            </Button>
            <Button variant="ghost" size="lg">
              Discreto
            </Button>
            <Button disabled>Desativado</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button variant="accent" size="lg">
                <Headphones /> Botão magnético (desktop)
              </Button>
            </Magnetic>
          </div>
        </Block>

        <Block title="Badges">
          <div className="flex flex-wrap gap-3">
            <LiveBadge />
            <Badge tone="accent">No ar agora</Badge>
            <Badge tone="primary">A seguir</Badge>
            <Badge>Notícia</Badge>
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <h4 className="text-xl font-bold">Card simples</h4>
              <p className="text-muted mt-2">Superfície sólida para listas e conteúdo.</p>
            </Card>
            <Card glass>
              <h4 className="text-xl font-bold">Card de vidro</h4>
              <p className="text-muted mt-2">Glassmorphism sutil sobre o fundo aurora.</p>
            </Card>
            <TiltCard>
              <Mic2 className="text-accent mb-3 size-8" aria-hidden />
              <h4 className="text-xl font-bold">Card com inclinação 3D</h4>
              <p className="text-muted mt-2">Passe o mouse para ver o efeito.</p>
            </TiltCard>
          </div>
        </Block>

        <Block title="Formulário">
          <form className="grid max-w-2xl gap-5 sm:grid-cols-2">
            <Input label="Seu nome" placeholder="Maria" autoComplete="name" />
            <Input label="Cidade" placeholder="Palmas" />
            <div className="sm:col-span-2">
              <Textarea label="Recado" placeholder="Manda um alô pra..." hint="Opcional" />
            </div>
            <Button
              type="button"
              variant="accent"
              size="lg"
              className="sm:col-span-2 sm:justify-self-start"
            >
              <Send /> Enviar pedido
            </Button>
          </form>
        </Block>

        <Block title="Revelar ao rolar">
          <div className="grid gap-6 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card interactive className="h-full">
                  <p className="text-xl font-bold">Item {i + 1}</p>
                  <p className="text-muted mt-2">Aparece suavemente ao rolar a página.</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Block>
      </Container>

      <Section
        eyebrow="Exemplo de seção"
        title="Hits News"
        description="Cabeçalho padrão de seção com sobretítulo, título, descrição e ação."
        action={<Button variant="outline">Ver todas</Button>}
        className="border-border border-t"
      />
    </>
  );
}
