-- Remove avatar_url from profiles table if it exists
alter table if exists public.profiles drop column if exists avatar_url;

-- Remove avatar_url from handle_new_user function if present
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'author')
  on conflict (id) do update
  set email = excluded.email,
      full_name = excluded.full_name,
      updated_at = now();
  return new;
end;
$$ language plpgsql security definer;
