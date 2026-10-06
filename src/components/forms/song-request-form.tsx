"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { WhatsappIcon } from "@/components/icons/social";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { saveSongRequest } from "@/app/pedir-musica/actions";
import { whatsappLink } from "@/lib/site";

type Fields = { nome: string; musica: string; artista: string; cidade: string; recado: string };

// Abre o WhatsApp na hora (precisa ser no clique, senão o navegador bloqueia a janela) e grava
// o pedido no banco em paralelo, para a equipe ver no painel.
export function SongRequestForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Campo escondido: só robôs preenchem.
    if (data.get("site")) return;
    const f = Object.fromEntries(
      ["nome", "musica", "artista", "cidade", "recado"].map((k) => [
        k,
        String(data.get(k) ?? "").trim(),
      ]),
    ) as Fields;
    if (f.nome.length < 2 || !f.musica) {
      setError("Preencha seu nome e a música.");
      return;
    }
    setError(null);
    const msg = [
      "🎵 *Pedido de música – site Hits FM*",
      `Nome: ${f.nome}`,
      `Música: ${f.musica}${f.artista ? ` – ${f.artista}` : ""}`,
      f.cidade && `Cidade: ${f.cidade}`,
      f.recado && `Recado: ${f.recado}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener");
    // Falha ao gravar não impede o pedido: ele já seguiu pelo WhatsApp.
    saveSongRequest({ ...f, site: "" }).catch(() => {});
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Input label="Seu nome *" name="nome" autoComplete="name" required maxLength={80} />
      <Input
        label="Cidade"
        name="cidade"
        autoComplete="address-level2"
        maxLength={60}
        placeholder="Palmas"
      />
      <Input label="Música *" name="musica" required maxLength={120} />
      <Input label="Artista" name="artista" maxLength={120} />
      <div className="sm:col-span-2">
        <Textarea
          label="Recado"
          name="recado"
          maxLength={500}
          hint="Manda um alô pra alguém especial (opcional)."
        />
      </div>
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Não preencha este campo
          <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col items-start gap-3 sm:col-span-2">
        {error && (
          <p role="alert" className="text-live font-semibold">
            {error}
          </p>
        )}
        {sent && (
          <p role="status" className="text-primary font-semibold">
            Pedido pronto! Confirme o envio no WhatsApp que abriu.
          </p>
        )}
        <Button type="submit" variant="accent" size="lg">
          <WhatsappIcon /> Enviar pedido pelo WhatsApp
        </Button>
        <p className="text-subtle inline-flex items-center gap-2 text-sm">
          <Send className="size-4" aria-hidden /> O pedido abre no WhatsApp da rádio com a mensagem
          pronta.
        </p>
      </div>
    </form>
  );
}
