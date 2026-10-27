-- Execute no SQL Editor do Supabase
create table if not exists public.lesson_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id integer not null check (lesson_id between 1 and 16),
 completed_at timestamptz not null default now(),
 primary key(user_id,lesson_id)
);
alter table public.lesson_progress enable row level security;
drop policy if exists "Students can read their own progress" on public.lesson_progress;
create policy "Students can read their own progress" on public.lesson_progress for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Students can save their own progress" on public.lesson_progress;
create policy "Students can save their own progress" on public.lesson_progress for insert to authenticated with check ((select auth.uid()) = user_id);
-- Sem update/delete: conclusão é permanente nesta versão.
