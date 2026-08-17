-- F-Smoke: Level, Reward & Inventory Schema
-- Jalankan di Supabase Dashboard > SQL Editor

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 2. USER PROGRESS (state utama: waktu berhenti, pengaturan, XP check-in)
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  quit_at timestamptz,
  price_per_pack int not null default 20000,
  cigs_per_day int not null default 15,
  check_in_xp int not null default 0,
  last_check_in timestamptz,
  last_rewarded_level int not null default 1,
  streak int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- upgrade DB lama: tambahkan kolom streak
alter table public.user_progress add column if not exists streak int not null default 0;

alter table public.user_progress enable row level security;

create policy "user_progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "user_progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "user_progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id);

-- 3. ITEMS (katalog reward, dibaca semua user login)
create table if not exists public.items (
  id text primary key,
  name text not null,
  rarity text not null check (rarity in ('common', 'uncommon', 'rare', 'epic', 'legendary')),
  description text not null
);

alter table public.items enable row level security;

create policy "items_select_auth" on public.items
  for select using (auth.role() = 'authenticated');

-- 4. INVENTORY (item yang dikumpulkan user)
create table if not exists public.inventory (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id text not null references public.items (id) on delete cascade,
  quantity int not null default 1,
  acquired_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

alter table public.inventory enable row level security;

create policy "inventory_select_own" on public.inventory
  for select using (auth.uid() = user_id);

create policy "inventory_insert_own" on public.inventory
  for insert with check (auth.uid() = user_id);

create policy "inventory_update_own" on public.inventory
  for update using (auth.uid() = user_id);

-- 5. SEED ITEMS
insert into public.items (id, name, rarity, description) values
  ('coin', 'Koin Emas', 'common', 'Koin kuno dari negeri jamur. Simbol dari setiap hari bebas rokok.'),
  ('fire_flower', 'Bunga Api', 'common', 'Beri kamu semangat membara melawan craving.'),
  ('mushroom_1up', 'Jamur 1UP', 'uncommon', 'Hidup sehat adalah nyawa kedua. Lanjutkan!'),
  ('pipe', 'Pipa Hijau', 'uncommon', 'Jalan pintas ke gaya hidup bebas asap.'),
  ('question_block', '? Block', 'rare', 'Kejutan selalu datang bagi yang bertahan.'),
  ('star', 'Bintang Ajaib', 'rare', 'Tak terkalahkan hari ini. Kuatkan tekadmu!'),
  ('golden_key', 'Kunci Emas', 'epic', 'Membuka pintu menuju versi dirimu yang lebih sehat.'),
  ('heart', 'Hati Kesehatan', 'epic', 'Jantungmu berterima kasih atas setiap napas bersih.'),
  ('super_mushroom', 'Jamur Super', 'legendary', 'Legenda para pemenang perjuangan melawan rokok.'),
  ('crown', 'Mahkota Emas', 'legendary', 'Hanya dimiliki oleh Raja & Ratu yang bebas rokok.')
on conflict (id) do nothing;

-- 6. FUNGSI TAMBAH ITEM (increment quantity dengan aman, user_id dari sesi)
create or replace function public.add_item(p_item_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.inventory (user_id, item_id, quantity)
  values (auth.uid(), p_item_id, 1)
  on conflict (user_id, item_id)
  do update set quantity = public.inventory.quantity + 1,
                acquired_at = now();
end;
$$;

revoke execute on function public.add_item(text) from anon, authenticated;
grant execute on function public.add_item(text) to authenticated;