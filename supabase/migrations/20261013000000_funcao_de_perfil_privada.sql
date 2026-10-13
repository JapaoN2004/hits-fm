-- current_role_name() é auxiliar das políticas e não precisa ficar exposta na API
-- (/rest/v1/rpc). Vai para um schema privado; is_admin()/is_staff() passam a usá-la de lá.

create schema if not exists private;
grant usage on schema private to anon, authenticated;

alter function public.current_role_name() set schema private;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(private.current_role_name() = 'admin', false);
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(private.current_role_name() in ('admin', 'editor'), false);
$$;
