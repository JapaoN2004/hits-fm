@AGENTS.md

# Hits FM 93.5 – convenções do projeto

Site novo da rádio Hits FM 93.5 (Palmas/TO). Especificação completa em `PROMPT-HITS-FM.md` (pasta do projeto). Trabalho em fases; cada fase termina com build + lint verdes, commit e aprovação do Gabriel.

## Stack

- Next.js 16 (App Router) + TypeScript estrito. Antes de usar uma API do Next, confira `node_modules/next/dist/docs/`.
- Tailwind CSS v4 (tokens em `src/app/globals.css`, sem `tailwind.config`).
- `motion` (Framer Motion) para animações; Supabase a partir da fase 4; deploy na Vercel.

## Design

- O Gabriel rejeitou um visual "futurista/IA" (fundo escuro, aurora, vidro, 3D). Seguir a identidade do site atual: fundo claro, azul e laranja chapados, barra de menu azul, títulos em caixa alta com traço laranja. Nada de gradientes, brilhos neon ou glassmorphism.
- Use só os tokens de `globals.css` (`bg-primary`, `bg-primary-dark`, `bg-accent`, `bg-surface-2`, `text-muted`...), nunca cores soltas.
- Público 40+: corpo mínimo 18px (o `html` já está em 112.5%), contraste AA, alvos de toque ≥ 48px (`min-h-12`).
- Respeite `prefers-reduced-motion`.
- Títulos em Montserrat (`font-display`), texto em Open Sans (`font-sans`).
- Dados de exemplo tipados em `src/data/` (mesmo formato do banco).

## Código

- Componentes base em `src/components/ui`, estrutura do site em `src/components/layout`.
- Server Components por padrão; `"use client"` só onde há estado/efeito.
- Textos da interface em português do Brasil.
- Dados configuráveis (contatos, redes, apps, stream) em `src/lib/site.ts` até o painel (fase 5) ler a tabela `settings`.
- Conteúdo público só via `src/lib/content.ts`: lê do Supabase com a chave anon (cache do Next com tags `news`, `hosts`, `schedule`, `promotions`) e cai nos mocks de `src/data/` quando as variáveis do Supabase não existem.
- Schema em `supabase/migrations/` (nunca edite uma migration já aplicada; crie outra). RLS em todas as tabelas; teste políticas novas como anon, editor e admin.
- HTML de notícia sempre passa por `sanitizeNewsHtml` (`src/lib/sanitize.ts`).
- Placeholders aguardando o cliente marcados com `TODO(cliente):`.
- Rode `npm run lint`, `npm run typecheck` e `npm run build` antes de cada commit; `npm run format` para Prettier.

## Segurança

- O site antigo (WordPress) foi invadido e tem links de spam. Nunca copie HTML, scripts ou links dele; sanitize qualquer conteúdo importado.
- Nunca exponha a service role key do Supabase no cliente.
