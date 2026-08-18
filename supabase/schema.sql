-- F-Smoke: Level, Reward & Inventory Schema
-- Jalankan di Supabase Dashboard > SQL Editor
-- AMAN DIJALANKAN ULANG: semua perintah idempoten (drop jika ada, lalu buat)

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_item_id text,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists avatar_item_id text;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
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

-- upgrade DB lama: tambahkan kolom koin (untuk TOKO & jual duplikat)
alter table public.user_progress add column if not exists coins int not null default 0;

alter table public.user_progress enable row level security;

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id);

-- 2b. CHECK-INS (riwayat check-in untuk statistik & grafik)
create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists check_ins_user_created_idx
  on public.check_ins (user_id, created_at desc);

alter table public.check_ins enable row level security;

drop policy if exists "check_ins_select_own" on public.check_ins;
create policy "check_ins_select_own" on public.check_ins
  for select using (auth.uid() = user_id);

drop policy if exists "check_ins_insert_own" on public.check_ins;
create policy "check_ins_insert_own" on public.check_ins
  for insert with check (auth.uid() = user_id);

-- 2c. CRAVINGS (jurnal keinginan merokok)
create table if not exists public.cravings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists cravings_user_created_idx
  on public.cravings (user_id, created_at desc);

alter table public.cravings enable row level security;

drop policy if exists "cravings_select_own" on public.cravings;
create policy "cravings_select_own" on public.cravings
  for select using (auth.uid() = user_id);

drop policy if exists "cravings_insert_own" on public.cravings;
create policy "cravings_insert_own" on public.cravings
  for insert with check (auth.uid() = user_id);

-- 3. ITEMS (katalog reward, dibaca semua user login)
create table if not exists public.items (
  id text primary key,
  name text not null,
  rarity text not null check (rarity in ('common', 'uncommon', 'rare', 'epic', 'legendary')),
  description text not null
);

alter table public.items enable row level security;

drop policy if exists "items_select_auth" on public.items;
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

drop policy if exists "inventory_select_own" on public.inventory;
create policy "inventory_select_own" on public.inventory
  for select using (auth.uid() = user_id);

drop policy if exists "inventory_insert_own" on public.inventory;
create policy "inventory_insert_own" on public.inventory
  for insert with check (auth.uid() = user_id);

drop policy if exists "inventory_update_own" on public.inventory;
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

-- 7. TOKO: beli item misterius dengan koin (potong koin otomatis)
create or replace function public.buy_item(p_cost int)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_coin int;
  v_rarity text;
  v_item_id text;
begin
  select coins into v_coin from public.user_progress where user_id = auth.uid();
  if v_coin is null then
    v_coin := 0;
  end if;
  if v_coin < p_cost then
    raise exception 'Koin tidak cukup';
  end if;

  with weights(rarity, w) as (
    values ('common', 45), ('uncommon', 28), ('rare', 16), ('epic', 8), ('legendary', 3)
  )
  select t.rarity into v_rarity
  from (select rarity, sum(w) over (order by w) as cum from weights) t
  cross join (select sum(w) as total from weights) s
  where s.total * random() <= t.cum
  order by t.cum
  limit 1;

  select id into v_item_id
  from public.items
  where rarity = v_rarity
  order by random()
  limit 1;

  if v_item_id is null then
    select id into v_item_id from public.items order by random() limit 1;
  end if;

  insert into public.inventory (user_id, item_id, quantity)
  values (auth.uid(), v_item_id, 1)
  on conflict (user_id, item_id)
  do update set quantity = public.inventory.quantity + 1,
                acquired_at = now();

  update public.user_progress set coins = coins - p_cost
  where user_id = auth.uid();

  return v_item_id;
end;
$$;

revoke execute on function public.buy_item(int) from anon, authenticated;
grant execute on function public.buy_item(int) to authenticated;

-- 8. TOKO: jual item (kurangi quantity, tambah koin)
create or replace function public.sell_item(p_item_id text, p_price int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_qty int;
begin
  select quantity into v_qty
  from public.inventory
  where user_id = auth.uid() and item_id = p_item_id;

  if v_qty is null or v_qty < 1 then
    raise exception 'Item tidak dimiliki';
  end if;

  if v_qty = 1 then
    delete from public.inventory
    where user_id = auth.uid() and item_id = p_item_id;
  else
    update public.inventory set quantity = quantity - 1
    where user_id = auth.uid() and item_id = p_item_id;
  end if;

  update public.user_progress set coins = coins + p_price
  where user_id = auth.uid();
end;
$$;

revoke execute on function public.sell_item(text, int) from anon, authenticated;
grant execute on function public.sell_item(text, int) to authenticated;

-- 9. PAPAN PERINGKAT (top N berdasarkan total XP, nama dari profil)
create or replace function public.get_leaderboard(p_limit int default 5)
returns table (name text, check_in_xp int, quit_at timestamptz, streak int, coins int)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select
    coalesce(pr.display_name, 'Player') as name,
    up.check_in_xp,
    up.quit_at,
    up.streak,
    up.coins
  from public.user_progress up
  left join public.profiles pr on pr.id = up.user_id
  order by (
    up.check_in_xp +
    case when up.quit_at is not null
      then floor(extract(epoch from (now() - up.quit_at)) / 60 / 15)
      else 0
    end
  ) desc
  limit p_limit;
end;
$$;

revoke execute on function public.get_leaderboard(int) from anon, authenticated;
grant execute on function public.get_leaderboard(int) to authenticated;