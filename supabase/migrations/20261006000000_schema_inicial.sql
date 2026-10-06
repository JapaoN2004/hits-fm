-- Hits FM 93.5: schema inicial.
-- Leitura pública só do que está publicado; escrita só da equipe (admin/editor),
-- conforme o perfil. Pedidos de música entram por uma função com limite de envio.

-- ---------------------------------------------------------------------------
-- Perfis da equipe
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  -- null = conta sem acesso ao painel até um admin definir o perfil.
  role text check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- Cria o perfil vazio quando alguém é convidado/cadastrado no Auth.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Funções de perfil usadas nas políticas. security definer evita recursão no RLS de profiles.
create function public.current_role_name()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid());
$$;

create function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(public.current_role_name() = 'admin', false);
$$;

create function public.is_staff()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(public.current_role_name() in ('admin', 'editor'), false);
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- updated_at automático.
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Configurações (contatos, redes, apps, stream, TV Cristal)
-- ---------------------------------------------------------------------------

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Locutores, programas e grade
-- ---------------------------------------------------------------------------

create table public.hosts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  bio text not null default '',
  photo_url text,
  instagram_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.program_hosts (
  program_id uuid not null references public.programs (id) on delete cascade,
  host_id uuid not null references public.hosts (id) on delete cascade,
  primary key (program_id, host_id)
);

create index program_hosts_host_idx on public.program_hosts (host_id);

-- Horários de Palmas (America/Araguaina). end_time '24:00' = meia-noite.
create table public.schedule_slots (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  day smallint not null check (day between 0 and 6), -- 0 = domingo
  start_time time not null,
  end_time time not null,
  check (end_time > start_time)
);

create index schedule_slots_day_idx on public.schedule_slots (day, start_time);
create index schedule_slots_program_idx on public.schedule_slots (program_id);

-- ---------------------------------------------------------------------------
-- Notícias (Hits News)
-- ---------------------------------------------------------------------------

create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  -- HTML já sanitizado no servidor (allowlist de tags) antes de gravar.
  content_html text not null default '',
  cover_url text,
  category text not null default 'Geral',
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  author_id uuid references public.profiles (id) on delete set null,
  -- Endereço no WordPress antigo, para os redirects da importação.
  legacy_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status = 'draft' or published_at is not null)
);

create index news_public_idx on public.news (published_at desc) where status <> 'draft';
create index news_category_idx on public.news (category);

-- ---------------------------------------------------------------------------
-- Promoções
-- ---------------------------------------------------------------------------

create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  how_to text[] not null default '{}',
  rules text[] not null default '{}',
  cover_url text,
  ends_at timestamptz not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Banners do topo e anunciantes
-- ---------------------------------------------------------------------------

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'hero' check (kind in ('hero', 'advertiser')),
  title text not null,
  subtitle text not null default '',
  image_url text,
  link_url text,
  link_label text,
  sort_order int not null default 0,
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Pedidos de música
-- ---------------------------------------------------------------------------

create table public.song_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  song text not null check (char_length(song) between 1 and 120),
  artist text not null default '' check (char_length(artist) <= 120),
  message text not null default '' check (char_length(message) <= 500),
  city text not null default '' check (char_length(city) <= 80),
  status text not null default 'pending' check (status in ('pending', 'played', 'rejected')),
  -- Hash do IP (nunca o IP puro), usado só para o limite de envios.
  ip_hash text,
  created_at timestamptz not null default now()
);

create index song_requests_created_idx on public.song_requests (created_at desc);
create index song_requests_ip_idx on public.song_requests (ip_hash, created_at desc);

-- Única porta de entrada pública: limita a 3 pedidos por IP a cada 10 minutos.
create function public.submit_song_request(
  p_name text,
  p_song text,
  p_artist text,
  p_message text,
  p_city text,
  p_ip_hash text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent int;
begin
  if p_ip_hash is not null then
    select count(*) into recent
    from public.song_requests
    where ip_hash = p_ip_hash and created_at > now() - interval '10 minutes';
    if recent >= 3 then
      return false;
    end if;
  end if;

  insert into public.song_requests (name, song, artist, message, city, ip_hash)
  values (
    trim(p_name), trim(p_song), trim(coalesce(p_artist, '')),
    trim(coalesce(p_message, '')), trim(coalesce(p_city, '')), p_ip_hash
  );
  return true;
end;
$$;

revoke execute on function public.submit_song_request(text, text, text, text, text, text) from public;
grant execute on function public.submit_song_request(text, text, text, text, text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Redirects 301 (URLs do site antigo)
-- ---------------------------------------------------------------------------

create table public.redirects (
  from_path text primary key check (from_path like '/%'),
  to_path text not null check (to_path like '/%'),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at
-- ---------------------------------------------------------------------------

create trigger hosts_updated_at before update on public.hosts
  for each row execute function public.set_updated_at();
create trigger programs_updated_at before update on public.programs
  for each row execute function public.set_updated_at();
create trigger news_updated_at before update on public.news
  for each row execute function public.set_updated_at();
create trigger promotions_updated_at before update on public.promotions
  for each row execute function public.set_updated_at();
create trigger banners_updated_at before update on public.banners
  for each row execute function public.set_updated_at();
create trigger settings_updated_at before update on public.settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Permissões da API (o RLS abaixo decide quais linhas cada perfil alcança)
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;
grant select on
  public.settings, public.hosts, public.programs, public.program_hosts,
  public.schedule_slots, public.news, public.promotions, public.banners, public.redirects
  to anon, authenticated;
grant insert, update, delete on
  public.settings, public.hosts, public.programs, public.program_hosts,
  public.schedule_slots, public.news, public.promotions, public.banners, public.redirects
  to authenticated;
grant select, update, delete on public.profiles, public.song_requests to authenticated;
revoke all on public.profiles, public.song_requests from anon;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.hosts enable row level security;
alter table public.programs enable row level security;
alter table public.program_hosts enable row level security;
alter table public.schedule_slots enable row level security;
alter table public.news enable row level security;
alter table public.promotions enable row level security;
alter table public.banners enable row level security;
alter table public.song_requests enable row level security;
alter table public.redirects enable row level security;

-- profiles: cada um lê o próprio; admin lê e altera todos (é quem define perfis).
create policy "profiles: ler o próprio ou admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));
create policy "profiles: admin altera" on public.profiles
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
create policy "profiles: admin remove" on public.profiles
  for delete to authenticated
  using ((select public.is_admin()));

-- settings: leitura pública; só admin altera.
create policy "settings: leitura pública" on public.settings
  for select to anon, authenticated using (true);
create policy "settings: admin escreve" on public.settings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- hosts: público vê os publicados; equipe vê todos; admin escreve.
create policy "hosts: leitura" on public.hosts
  for select to anon, authenticated
  using (published or (select public.is_staff()));
create policy "hosts: admin escreve" on public.hosts
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- programs, program_hosts, schedule_slots: leitura pública; admin escreve.
create policy "programs: leitura pública" on public.programs
  for select to anon, authenticated using (true);
create policy "programs: admin escreve" on public.programs
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "program_hosts: leitura pública" on public.program_hosts
  for select to anon, authenticated using (true);
create policy "program_hosts: admin escreve" on public.program_hosts
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "schedule_slots: leitura pública" on public.schedule_slots
  for select to anon, authenticated using (true);
create policy "schedule_slots: admin escreve" on public.schedule_slots
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- news: público vê publicadas e agendadas cuja data já chegou; equipe vê e escreve tudo.
create policy "news: leitura" on public.news
  for select to anon, authenticated
  using (
    (status <> 'draft' and published_at <= now())
    or (select public.is_staff())
  );
create policy "news: equipe escreve" on public.news
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

-- promotions: público vê as publicadas; equipe vê e escreve tudo.
create policy "promotions: leitura" on public.promotions
  for select to anon, authenticated
  using (published or (select public.is_staff()));
create policy "promotions: equipe escreve" on public.promotions
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

-- banners: público vê os ativos dentro do período; admin escreve.
create policy "banners: leitura" on public.banners
  for select to anon, authenticated
  using (
    (active and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at > now()))
    or (select public.is_staff())
  );
create policy "banners: admin escreve" on public.banners
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- song_requests: sem leitura nem escrita direta do público (só pela função acima).
create policy "song_requests: equipe lê" on public.song_requests
  for select to authenticated using ((select public.is_staff()));
create policy "song_requests: equipe modera" on public.song_requests
  for update to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));
create policy "song_requests: equipe remove" on public.song_requests
  for delete to authenticated using ((select public.is_staff()));

-- redirects: leitura pública (o proxy consulta); admin escreve.
create policy "redirects: leitura pública" on public.redirects
  for select to anon, authenticated using (true);
create policy "redirects: admin escreve" on public.redirects
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Storage: bucket público "media" (capas, fotos de locutores, banners)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

create policy "media: equipe envia" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_staff()));
create policy "media: equipe altera" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_staff()));
create policy "media: equipe remove" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_staff()));
