-- User Dashboard Essentials: Bookmarks, Reading History, Comments
-- Assumes you already have a 'posts' and 'users' table

-- 1. Bookmarks Table
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- 2. Reading History Table
create table if not exists public.reading_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  viewed_at timestamp with time zone default now()
);

-- 3. Comments Table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- 4. Enable RLS
alter table public.bookmarks enable row level security;
alter table public.reading_history enable row level security;
alter table public.comments enable row level security;

-- 5. RLS Policies (users can only manage their own data)
create policy "Users can manage their own bookmarks" on public.bookmarks
  for all using (user_id = auth.uid());

create policy "Users can manage their own reading history" on public.reading_history
  for all using (user_id = auth.uid());

create policy "Users can manage their own comments" on public.comments
  for all using (user_id = auth.uid());

-- 6. Allow select on posts for joins
create policy "Allow select on posts for all" on public.posts
  for select using (true);

-- 7. (Optional) Add indexes for performance
create index if not exists idx_bookmarks_user on public.bookmarks(user_id);
create index if not exists idx_history_user on public.reading_history(user_id);
create index if not exists idx_comments_user on public.comments(user_id);
