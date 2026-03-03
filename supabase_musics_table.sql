-- Supabase SQL Schema for Music Generation

-- 1. Create the 'musics' table
create table public.musics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  prompt text not null,
  audio_url text, -- This will hold the URL or path to the generated music file
  status text default 'processing' not null, -- Expected values: 'processing', 'completed', 'failed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) for the musics table
alter table public.musics enable row level security;

-- Policies for musics table: Users can only select and insert their own records
create policy "Users can view their own musics"
  on public.musics for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Users can insert their own musics"
  on public.musics for insert
  to authenticated
  with check ( auth.uid() = user_id );

-- 2. Create the 'musics' storage bucket
-- (Set public to false if you want the audio files to be private to the user)
insert into storage.buckets (id, name, public)
values ('musics', 'musics', false)
on conflict (id) do nothing;

-- Ensure RLS is enabled on storage.objects (it is by default, but just in case)
alter table storage.objects enable row level security;

-- Policies for the musics storage bucket: Users can only upload and read their own files.
-- Supabase Storage maps the 'owner' column to auth.uid()
create policy "Users can view their own music files"
  on storage.objects for select
  to authenticated
  using ( bucket_id = 'musics' and auth.uid() = owner );

create policy "Users can upload their own music files"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'musics' and auth.uid() = owner );
