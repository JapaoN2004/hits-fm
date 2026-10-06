# Hits FM 93.5 – site

Novo site da rádio Hits FM 93.5, Palmas – Tocantins.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. A página `/style-guide` mostra todos os componentes base.

## Scripts

- `npm run dev` – servidor de desenvolvimento
- `npm run build` – build de produção
- `npm run lint` / `npm run typecheck` / `npm run format`

## Banco de dados (Supabase)

Sem as variáveis do Supabase o site roda com os dados de exemplo de `src/data/`.

1. Crie um projeto no Supabase (região São Paulo).
2. Rode `supabase/migrations/*.sql` e depois `supabase/seed.sql` no SQL Editor (ou `supabase db push` com a CLI).
3. Copie `.env.example` para `.env.local` e preencha URL, chave anon e `IP_HASH_SALT`. Na Vercel, cadastre as mesmas variáveis.

Tabelas: `news`, `hosts`, `programs`, `program_hosts`, `schedule_slots`, `promotions`, `banners`, `settings`, `song_requests`, `redirects` e `profiles` (perfis `admin`/`editor` da equipe). Imagens no bucket público `media`.

Guia do painel e deploy chegam nas próximas fases.
