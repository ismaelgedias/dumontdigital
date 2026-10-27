-- Execute no SQL Editor do mesmo projeto Supabase.
create table if not exists public.teacher_accounts (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
alter table public.teacher_accounts enable row level security;
-- Apenas a propria conta consegue ler sua permissao. Nao ha politicas de insert/update/delete.
drop policy if exists "Teacher can read own role" on public.teacher_accounts;
create policy "Teacher can read own role" on public.teacher_accounts
 for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_teacher() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.teacher_accounts t where t.user_id = (select auth.uid())); $$;
revoke all on function public.is_teacher() from public;
grant execute on function public.is_teacher() to authenticated;

create table if not exists public.course_lessons (
 id integer primary key check(id between 1 and 16),
 title text not null check(char_length(title) between 1 and 160),
 description text not null default '',
 video_url text not null default '',
 material_url text not null default '',
 is_published boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.course_lessons enable row level security;
drop policy if exists "Published lessons or teacher read" on public.course_lessons;
create policy "Published lessons or teacher read" on public.course_lessons
 for select to authenticated using (is_published or (select public.is_teacher()));
drop policy if exists "Teachers create lessons" on public.course_lessons;
create policy "Teachers create lessons" on public.course_lessons
 for insert to authenticated with check ((select public.is_teacher()));
drop policy if exists "Teachers edit lessons" on public.course_lessons;
create policy "Teachers edit lessons" on public.course_lessons
 for update to authenticated using ((select public.is_teacher())) with check ((select public.is_teacher()));
-- Nao permitir exclusao nesta versao.

-- SUBSTITUA o email pelo email EXATO da conta de professor ja cadastrada no Authentication > Users.
-- A linha abaixo deve ser executada separadamente, apos trocar o endereco:
-- insert into public.teacher_accounts(user_id)
-- select id from auth.users where email = 'professor@exemplo.com'
-- on conflict (user_id) do nothing;
