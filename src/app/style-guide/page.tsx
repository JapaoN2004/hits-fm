import type { Metadata } from "next";
import { Play, Radio, Send } from "lucide-react";
import { Badge, LiveBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/field";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Style guide", robots: { index: false } };

const colors = [
  { name: "Azul Hits", token: "--brand-blue", className: "bg-primary" },
  { name: "Azul escuro", token: "--brand-blue-dark", className: "bg-primary-dark" },
  { name: "Laranja Hits", token: "--brand-orange", className: "bg-accent" },
  { name: "Ao vivo", token: "--live", className: "bg-live" },
  { name: "Cinza claro", token: "--surface-2", className: "bg-surface-2" },
  { name: "Texto", token: "--text", className: "bg-text" },
];

export default function StyleGuidePage() {
  return (
    <>
      <Section title="Cores">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map((c) => (
            <div key={c.token} className="border-border overflow-hidden rounded-md border">
              <div className={`h-20 ${c.className}`} />
              <div className="p-3">
                <p className="font-semibold">{c.name}</p>
                <code className="text-subtle text-sm">{c.token}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Tipografia" className="bg-surface-2">
        <p className="font-display text-primary text-5xl font-black uppercase italic">
          A vida é feita de Hits!
        </p>
        <p className="font-display mt-4 text-2xl font-extrabold uppercase">
          Título de card · Montserrat
        </p>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          Texto corrido em Open Sans, 18px, pensado para leitura confortável no celular e no
          computador.
        </p>
      </Section>
      <Section title="Botões e selos">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" size="lg">
            <Radio /> Ouvir ao vivo
          </Button>
          <Button size="lg">
            <Play /> Primário
          </Button>
          <Button variant="outline" size="lg">
            Contorno
          </Button>
          <Button disabled>Desativado</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <LiveBadge />
          <Badge tone="accent">Promoção</Badge>
          <Badge tone="primary">Tocantins</Badge>
          <Badge>Notícia</Badge>
        </div>
      </Section>
      <Section title="Card e formulário" className="bg-surface-2">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <h3 className="text-xl font-extrabold uppercase">Card</h3>
            <p className="text-muted mt-2">Superfície branca com borda e sombra leve.</p>
          </Card>
          <form className="grid gap-5 rounded-md bg-white p-6 shadow-sm">
            <Input label="Seu nome" placeholder="Maria" autoComplete="name" />
            <Textarea label="Recado" placeholder="Manda um alô pra..." hint="Opcional" />
            <Button type="button" variant="accent" className="justify-self-start">
              <Send /> Enviar pedido
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}
