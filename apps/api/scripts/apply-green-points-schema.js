import pg from 'pg';

const adminUrl = process.env.DATABASE_ADMIN_URL;
if (!adminUrl) {
  console.error('DATABASE_ADMIN_URL missing in process.env');
  process.exit(1);
}

const sql = `
-- Green Points and Rewards System

create table if not exists reward_catalogue (
  key           text primary key check (key ~ '^[a-z_]{2,40}$'),
  label         text not null,
  description   text not null,
  points_cost   int not null check (points_cost > 0),
  reward_type   text not null check (reward_type in ('partner_voucher','social_impact','platform_benefit')),
  icon_emoji    text not null default '🎁',
  active        boolean not null default true,
  sort_order    int not null default 100
);

create table if not exists green_point_redemptions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references users(id) on delete cascade,
  reward_key       text not null references reward_catalogue(key),
  points_spent     int not null check (points_spent > 0),
  status           text not null default 'pending'
                   check (status in ('pending','fulfilled','failed','cancelled')),
  voucher_code     text,
  idempotency_key  text not null unique,
  created_at       timestamptz not null default now(),
  fulfilled_at     timestamptz,
  check (status = 'pending' or fulfilled_at is not null or status = 'failed')
);
create index if not exists green_point_redemptions_user_idx on green_point_redemptions (user_id, created_at desc);

create table if not exists green_point_ledger (
  id              bigserial primary key,
  user_id         uuid not null references users(id) on delete cascade,
  delta           int not null check (delta <> 0),
  balance_after   int not null check (balance_after >= 0),
  event_type      text not null check (event_type in (
                    'pickup_collected',
                    'device_collected',
                    'data_bearing_bonus',
                    'attestation_issued',
                    'device_added',
                    'referral_bonus',
                    'profile_complete',
                    'redemption'
                  )),
  ref_pickup_id   uuid references pickup_requests(id) on delete set null,
  ref_device_id   uuid references manual_devices(id) on delete set null,
  ref_redemption_id uuid references green_point_redemptions(id) on delete set null,
  note            text,
  created_at      timestamptz not null default now()
);
create index if not exists green_point_ledger_user_id_desc on green_point_ledger (user_id, id desc);
create index if not exists green_point_ledger_user_event_idx on green_point_ledger (user_id, event_type, created_at);

create table if not exists referral_links (
  id                   uuid primary key default gen_random_uuid(),
  referrer_id          uuid not null references users(id) on delete cascade,
  code                 text not null unique
                       check (code ~ '^ECO-[A-Z0-9]{5}$'),
  referee_id           uuid references users(id) on delete set null,
  used_at              timestamptz,
  bonus_credited_at    timestamptz,
  created_at           timestamptz not null default now(),
  unique (referrer_id),
  check (referee_id is null or used_at is not null)
);
create index if not exists referral_links_code_idx on referral_links (code);
create index if not exists referral_links_referee_idx on referral_links (referee_id) where referee_id is not null;

create table if not exists voucher_pool (
  id            bigserial primary key,
  reward_key    text not null references reward_catalogue(key) on delete cascade,
  code          text not null unique,
  assigned_to   uuid references green_point_redemptions(id) on delete set null,
  created_at    timestamptz not null default now()
);
create index if not exists voucher_pool_avail_idx on voucher_pool (reward_key) where assigned_to is null;

-- Append-only trigger for green_point_ledger
drop trigger if exists green_point_ledger_append_only on green_point_ledger;
create trigger green_point_ledger_append_only
  before update or delete on green_point_ledger
  for each row execute function app.tg_append_only();

-- Seed initial reward catalogue
insert into reward_catalogue (key, label, description, points_cost, reward_type, icon_emoji, active, sort_order) values
  ('coffee_voucher',    'CCD Coffee Voucher',    'One regular hot or cold coffee at Café Coffee Day', 200,  'partner_voucher',   '☕', true, 10),
  ('amazon_coupon',     'Amazon ₹50 Voucher',    '₹50 off on your next Amazon shopping order',        500,  'partner_voucher',   '🛒', true, 20),
  ('plant_tree',        'Plant a Tree',          'One native sapling planted & tagged via SankalpTaru', 100, 'social_impact',    '🌳', true, 30),
  ('school_donation',   'School E-Learning Kit', 'Donate to digital literacy for underprivileged kids',150, 'social_impact',    '📚', true, 40),
  ('priority_slot',     'Priority Pickup Slot',  'Jump to immediate priority on your next booking',    75,  'platform_benefit', '⚡', true, 50),
  ('ecosure_pro_badge', 'EcoSure Pro Badge',     'Verified eco-champion badge on your profile',        1000,'platform_benefit', '🏆', true, 60)
on conflict (key) do update set
  label = excluded.label,
  description = excluded.description,
  points_cost = excluded.points_cost,
  reward_type = excluded.reward_type,
  icon_emoji = excluded.icon_emoji,
  active = excluded.active,
  sort_order = excluded.sort_order;

-- Seed test voucher pool
insert into voucher_pool (reward_key, code) values
  ('coffee_voucher', 'CCD-ECO-1001'),
  ('coffee_voucher', 'CCD-ECO-1002'),
  ('coffee_voucher', 'CCD-ECO-1003'),
  ('coffee_voucher', 'CCD-ECO-1004'),
  ('coffee_voucher', 'CCD-ECO-1005'),
  ('amazon_coupon',  'AMZ-ECO-2001'),
  ('amazon_coupon',  'AMZ-ECO-2002'),
  ('amazon_coupon',  'AMZ-ECO-2003'),
  ('amazon_coupon',  'AMZ-ECO-2004'),
  ('amazon_coupon',  'AMZ-ECO-2005'),
  ('plant_tree',     'TREE-NGO-3001'),
  ('plant_tree',     'TREE-NGO-3002'),
  ('plant_tree',     'TREE-NGO-3003'),
  ('school_donation','SCH-EDU-4001'),
  ('school_donation','SCH-EDU-4002'),
  ('priority_slot',  'PRIO-PASS-5001'),
  ('priority_slot',  'PRIO-PASS-5002'),
  ('ecosure_pro_badge', 'PRO-BADGE-6001')
on conflict (code) do nothing;

-- Function: app.credit_green_points
create or replace function app.credit_green_points(
  p_user uuid,
  p_delta int,
  p_event text,
  p_pickup uuid default null,
  p_device uuid default null,
  p_redemption uuid default null,
  p_note text default null
)
returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_prev   int;
  v_after  int;
begin
  -- Lock user row to serialize balance calculations
  perform 1 from users where id = p_user for update;

  select coalesce(balance_after, 0) into v_prev
  from green_point_ledger
  where user_id = p_user
  order by id desc limit 1;

  if v_prev is null then
    v_prev := 0;
  end if;

  v_after := v_prev + p_delta;
  if v_after < 0 then
    raise exception 'insufficient green points' using errcode = '23514';
  end if;

  insert into green_point_ledger
    (user_id, delta, balance_after, event_type, ref_pickup_id, ref_device_id, ref_redemption_id, note)
  values
    (p_user, p_delta, v_after, p_event, p_pickup, p_device, p_redemption, p_note);

  return v_after;
end $$;

-- Attestation trigger for +30 certificate bonus
create or replace function app.tg_attestation_green_points() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare _row record;
begin
  if new.status = 'issued' and old.status = 'draft' then
    for _row in
      select distinct pr.requester_id, pr.id as pickup_id
      from lots l
      join pickup_requests pr on pr.lot_id = l.id
      where l.id = new.lot_id
        and not exists (
          select 1 from green_point_ledger
          where user_id = pr.requester_id
            and event_type = 'attestation_issued'
            and ref_pickup_id = pr.id
        )
    loop
      perform app.credit_green_points(
        _row.requester_id, 30, 'attestation_issued',
        _row.pickup_id, null, null, 'Recycling certificate issued for your pickup');
    end loop;
  end if;
  return new;
end $$;

drop trigger if exists trg_attestation_green_points on attestations;
create trigger trg_attestation_green_points
  after update on attestations for each row
  execute function app.tg_attestation_green_points();

-- RLS
alter table reward_catalogue enable row level security;
drop policy if exists catalogue_read on reward_catalogue;
create policy catalogue_read on reward_catalogue for select using (true);

alter table green_point_ledger enable row level security;
drop policy if exists ledger_read on green_point_ledger;
create policy ledger_read on green_point_ledger for select using (
  user_id = app.uid() or app.is_oversight()
);

alter table green_point_redemptions enable row level security;
drop policy if exists redemptions_read on green_point_redemptions;
create policy redemptions_read on green_point_redemptions for select using (
  user_id = app.uid() or app.is_oversight()
);
drop policy if exists redemptions_insert on green_point_redemptions;
create policy redemptions_insert on green_point_redemptions for insert with check (
  user_id = app.uid()
);
drop policy if exists redemptions_update on green_point_redemptions;
create policy redemptions_update on green_point_redemptions for update using (
  user_id = app.uid() or app.is_oversight()
);

alter table referral_links enable row level security;
drop policy if exists referral_read on referral_links;
create policy referral_read on referral_links for select using (
  referrer_id = app.uid() or referee_id = app.uid() or app.is_oversight()
);
drop policy if exists referral_insert on referral_links;
create policy referral_insert on referral_links for insert with check (
  referrer_id = app.uid()
);
drop policy if exists referral_update on referral_links;
create policy referral_update on referral_links for update using (
  referrer_id = app.uid() or referee_id = app.uid() or app.is_oversight()
);

alter table voucher_pool enable row level security;
drop policy if exists voucher_pool_select on voucher_pool;
create policy voucher_pool_select on voucher_pool for select using (
  assigned_to is null or exists (
    select 1 from green_point_redemptions r
    where r.id = voucher_pool.assigned_to and r.user_id = app.uid()
  ) or app.is_oversight()
);
drop policy if exists voucher_pool_update on voucher_pool;
create policy voucher_pool_update on voucher_pool for update using (
  assigned_to is null or exists (
    select 1 from green_point_redemptions r
    where r.id = voucher_pool.assigned_to and r.user_id = app.uid()
  ) or app.is_oversight()
);

-- Grants to ecosure_app
grant select on reward_catalogue to ecosure_app;
grant select on green_point_ledger to ecosure_app;
grant select, insert, update on green_point_redemptions to ecosure_app;
grant select, insert, update on referral_links to ecosure_app;
grant select, insert, update on voucher_pool to ecosure_app;
grant usage on sequence green_point_ledger_id_seq to ecosure_app;
grant usage on sequence voucher_pool_id_seq to ecosure_app;
grant execute on function app.credit_green_points to ecosure_app;
`;

const client = new pg.Client({ connectionString: adminUrl });
await client.connect();
try {
  await client.query(sql);
  console.log('Successfully applied Green Points schema migration to DB!');
} catch (err) {
  console.error('Error applying schema migration:', err);
  process.exit(1);
} finally {
  await client.end();
}
