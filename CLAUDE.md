@AGENTS.md

# Hits FM 93.5 – convenções do projeto

Site novo da rádio Hits FM 93.5 (Palmas/TO). Especificação completa em `PROMPT-HITS-FM.md` (pasta do projeto). Trabalho em fases; cada fase termina com build + lint verdes, commit e aprovação do Gabriel.

## Stack
- Next.js 16 (App Router) + TypeScript estrito. Antes de usar uma API do Next, confira `node_modules/next/dist/docs/`.
- Tailwind CSS v4 (tokens em `src/app/globals.css`, sem `tailwind.config`).
- `motion` (Framer Motion) para animações; Supabase a partir da fase 4; deploy na Vercel.

## Design
- Conceito "estúdio de rádio à noite": tema escuro padrão, claro via `<html data-theme="light">`.
- Use só os tokens (`bg-surface-1`, `text-muted`, `text-accent`, `shadow-glow-blue`...), nunca cores soltas.
- Público 40+: corpo mínimo 18px (o `html` já está em 112.5%), contraste AA, alvos de toque ≥ 48px (`min-h-12`).
- Todo efeito respeita `prefers-reduced-motion` (`useReducedMotion` no client; CSS global já corta animações).
- Títulos em Sora (`font-display`), texto em Inter (`font-sans`).

## Código
- Componentes base em `src/components/ui`, estrutura do site em `src/components/layout`.
- Server Components por padrão; `"use client"` só onde há estado/efeito.
- Textos da interface em português do Brasil.
- Dados configuráveis (contatos, redes, apps, stream) em `src/lib/site.ts` até a fase 4 levar isso ao banco.
- Placeholders aguardando o cliente marcados com `TODO(cliente):`.
- Rode `npm run lint`, `npm run typecheck` e `npm run build` antes de cada commit; `npm run format` para Prettier.

## Segurança
- O site antigo (WordPress) foi invadido e tem links de spam. Nunca copie HTML, scripts ou links dele; sanitize qualquer conteúdo importado.
- Nunca exponha a service role key do Supabase no cliente.
