-- Liquidity Alchemist — EMS Academy learning library
-- Run this in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.learning_pdfs (
  id text primary key,
  title text not null,
  description text not null default '',
  url text not null default '',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_videos (
  id text primary key,
  title text not null,
  description text not null default '',
  url text not null default '',
  duration text not null default '',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists learning_pdfs_created_at_idx
  on public.learning_pdfs (created_at desc);

create index if not exists learning_videos_created_at_idx
  on public.learning_videos (created_at desc);

alter table public.learning_pdfs enable row level security;
alter table public.learning_videos enable row level security;

drop policy if exists "Public read learning pdfs" on public.learning_pdfs;
create policy "Public read learning pdfs"
  on public.learning_pdfs
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read learning videos" on public.learning_videos;
create policy "Public read learning videos"
  on public.learning_videos
  for select
  to anon, authenticated
  using (true);
