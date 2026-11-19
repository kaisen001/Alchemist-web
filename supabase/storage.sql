-- Supabase Storage for EMS Academy PDFs (and later videos).
-- Run in the SQL editor after schema.sql.

insert into storage.buckets (id, name, public)
values ('learning', 'learning', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read learning files" on storage.objects;
create policy "Public read learning files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'learning');

-- Optional: allow authenticated uploads from an admin session later.
-- drop policy if exists "Auth upload learning files" on storage.objects;
-- create policy "Auth upload learning files"
--   on storage.objects
--   for insert
--   to authenticated
--   with check (bucket_id = 'learning');
