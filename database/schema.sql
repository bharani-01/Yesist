-- =============================================================================
-- EcoSure — complete intended production database state (PostgreSQL 16+)
-- Scope: Indore pilot custody chain (PRD v3 §8, §9, §16, §17.4, §18, §19).
--
-- Idempotent: safe to run repeatedly. Uses IF NOT EXISTS, CREATE OR REPLACE,
-- DROP ... IF EXISTS before CREATE for policies/triggers, and ON CONFLICT for
-- reference data. Run as the database owner (see apps/api/scripts/db-setup.js).
--
-- The application connects as role `ecosure_app`, which is NOT the table owner
-- and does NOT bypass row-level security. Every request sets `app.user_id`
-- inside its transaction; policies read it through app.uid().
-- =============================================================================

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'ecosure_app') then
    create role ecosure_app nologin;
  end if;
end $$;

create schema if not exists app;
grant usage on schema app to ecosure_app;
grant usage on schema public to ecosure_app;
do $$
begin
  if exists (select 1 from pg_namespace where nspname = 'extensions') then
    grant usage on schema extensions to ecosure_app;
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- Reference data
-- -----------------------------------------------------------------------------

create table if not exists waste_categories (
  code             text primary key check (code ~ '^[a-z_]{2,40}$'),
  name             text not null,
  data_bearing     boolean not null,
  has_battery      boolean not null,
  typical_unit_kg  numeric(12,3) not null check (typical_unit_kg > 0),
  sort_order       int not null default 100,
  active           boolean not null default true
);

create table if not exists wards (
  id        serial primary key,
  city      text not null,
  number    int not null check (number > 0),
  name      text not null,
  active    boolean not null default true,
  unique (city, number)
);

create table if not exists scheme_settings (
  key         text primary key,
  value_num   numeric(12,2) not null,
  description text not null
);

-- -----------------------------------------------------------------------------
-- Identity and organizations
-- -----------------------------------------------------------------------------

create table if not exists users (
  id             uuid primary key default gen_random_uuid(),
  email          text not null check (email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone          text check (phone is null or phone ~ '^[0-9]{10,16}$'),
  full_name      text not null check (length(full_name) between 2 and 120),
  password_hash  text not null,
  platform_role  text not null default 'citizen'
                 check (platform_role in ('citizen','org_member','ulb_officer','spcb_officer','cpcb_officer','programme_operator')),
  status         text not null default 'active' check (status in ('active','suspended')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create unique index if not exists users_email_uq on users (email);
create unique index if not exists users_phone_uq on users (phone) where phone is not null;

create table if not exists sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  token_hash  text not null unique,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null,
  revoked_at  timestamptz
);
create index if not exists sessions_user_idx on sessions (user_id);

create table if not exists organizations (
  id                          uuid primary key default gen_random_uuid(),
  org_type                    text not null check (org_type in
                                ('local_shop','informal_collector','drop_point','regional_hub','pro_recycler','producer','ulb','spcb_office','cpcb_office','programme_operator')),
  name                        text not null check (length(name) between 2 and 160),
  registration_no             text,
  registration_valid_until    date,
  capacity_tonnes_per_month   numeric(12,3) check (capacity_tonnes_per_month is null or capacity_tonnes_per_month > 0),
  tier                        text not null default 'standard' check (tier in ('micro','standard')),
  status                      text not null default 'active' check (status in ('pending','active','suspended')),
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  constraint recycler_needs_registration check (
    org_type <> 'pro_recycler' or (registration_no is not null and registration_valid_until is not null)
  ),
  constraint producer_needs_registration check (org_type <> 'producer' or registration_no is not null)
);
create unique index if not exists organizations_name_type_uq on organizations (org_type, lower(name));

-- Existing databases: bring constraints to the definitions above.
alter table organizations drop constraint if exists organizations_org_type_check;
alter table organizations add constraint organizations_org_type_check check (org_type in
  ('local_shop','informal_collector','drop_point','regional_hub','pro_recycler','producer','ulb','spcb_office','cpcb_office','programme_operator'));
alter table organizations drop constraint if exists producer_needs_registration;
alter table organizations add constraint producer_needs_registration check (org_type <> 'producer' or registration_no is not null);

create table if not exists organization_members (
  org_id      uuid not null references organizations(id) on delete cascade,
  user_id     uuid not null references users(id) on delete cascade,
  org_role    text not null check (org_role in ('owner','operator','finance','approver','viewer')),
  created_at  timestamptz not null default now(),
  primary key (org_id, user_id)
);
create index if not exists organization_members_user_idx on organization_members (user_id);

-- Agent-of-recycler agreement (PRD v3 §5.2, §19.3).
create table if not exists agent_agreements (
  id                 uuid primary key default gen_random_uuid(),
  principal_org_id   uuid not null references organizations(id),
  agent_org_id       uuid not null references organizations(id),
  categories         text[] not null check (cardinality(categories) > 0),
  max_storage_days   int not null check (max_storage_days between 1 and 180),
  intact_only        boolean not null default true check (intact_only),
  valid_from         date not null,
  valid_until        date not null,
  direction_ref      text,
  status             text not null default 'active' check (status in ('active','suspended','ended')),
  created_at         timestamptz not null default now(),
  check (valid_until > valid_from),
  check (principal_org_id <> agent_org_id)
);
create unique index if not exists agent_agreements_pair_uq
  on agent_agreements (principal_org_id, agent_org_id, valid_from);

create table if not exists agent_service_wards (
  agent_org_id  uuid not null references organizations(id) on delete cascade,
  ward_id       int not null references wards(id),
  primary key (agent_org_id, ward_id)
);

-- Recycler-owned material price (Rail A, PRD v3 §17.2).
create table if not exists rate_cards (
  id                uuid primary key default gen_random_uuid(),
  recycler_org_id   uuid not null references organizations(id),
  category_code     text not null references waste_categories(code),
  price_per_unit    numeric(12,2) check (price_per_unit is null or price_per_unit >= 0),
  price_per_kg      numeric(12,2) check (price_per_kg is null or price_per_kg >= 0),
  effective_from    date not null,
  created_at        timestamptz not null default now(),
  check (price_per_unit is not null or price_per_kg is not null),
  unique (recycler_org_id, category_code, effective_from)
);

-- -----------------------------------------------------------------------------
-- Product registry (manufacturers and importers; data only, PRD v3 §9.5 PP1, §13)
-- Producers never appear in the custody chain: they register what they place on
-- the market and read outcomes for their own units.
-- -----------------------------------------------------------------------------

create table if not exists product_models (
  id               uuid primary key default gen_random_uuid(),
  producer_org_id  uuid not null references organizations(id),
  brand            text not null check (length(brand) between 1 and 80),
  model_name       text not null check (length(model_name) between 1 and 120),
  model_code       text check (model_code is null or model_code ~ '^[A-Za-z0-9._/-]{1,40}$'),
  category_code    text not null references waste_categories(code),
  typical_unit_kg  numeric(12,3) not null check (typical_unit_kg > 0 and typical_unit_kg <= 1000),
  battery_type     text not null check (battery_type in ('none','li_ion','li_polymer','nimh','lead_acid','other')),
  data_bearing     boolean not null,
  created_by       uuid not null references users(id),
  created_at       timestamptz not null default now()
);
create unique index if not exists product_models_name_uq on product_models (producer_org_id, lower(brand), lower(model_name));

create table if not exists market_batches (
  id               uuid primary key default gen_random_uuid(),
  producer_org_id  uuid not null references organizations(id),
  model_id         uuid not null references product_models(id),
  batch_ref        text not null check (batch_ref ~ '^[A-Za-z0-9._/-]{2,40}$'),
  market_month     date not null check (market_month = date_trunc('month', market_month)::date),
  state_code       text not null check (state_code ~ '^[A-Z]{2}$'),
  quantity         int not null check (quantity between 1 and 1000000),
  status           text not null default 'draft' check (status in ('draft','placed')),
  created_by       uuid not null references users(id),
  placed_by        uuid references users(id),
  placed_at        timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (producer_org_id, batch_ref),
  check (status = 'draft' or (placed_by is not null and placed_at is not null))
);
create index if not exists market_batches_model_idx on market_batches (model_id);

-- -----------------------------------------------------------------------------
-- Collection and custody
-- -----------------------------------------------------------------------------

create sequence if not exists lot_number_seq;
create sequence if not exists attestation_number_seq;

-- Consolidated load from a recycler-owned regional hub to that recycler (Track B only).
create table if not exists hub_shipments (
  id               uuid primary key default gen_random_uuid(),
  reference        text not null unique check (reference ~ '^[A-Z0-9-]{6,30}$'),
  hub_org_id       uuid not null references organizations(id),
  recycler_org_id  uuid not null references organizations(id),
  status           text not null default 'loading' check (status in ('loading','in_transit','received')),
  vehicle_ref      text check (vehicle_ref is null or length(vehicle_ref) <= 40),
  created_by       uuid not null references users(id),
  dispatched_by    uuid references users(id),
  dispatched_at    timestamptz,
  received_at      timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  check (status = 'loading' or (dispatched_by is not null and dispatched_at is not null))
);
create index if not exists hub_shipments_hub_idx on hub_shipments (hub_org_id, status);
create index if not exists hub_shipments_recycler_idx on hub_shipments (recycler_org_id, status);

create table if not exists lots (
  id                    uuid primary key default gen_random_uuid(),
  agent_org_id          uuid not null references organizations(id),
  principal_org_id      uuid not null references organizations(id),
  agreement_id          uuid not null references agent_agreements(id),
  seal_tag              text not null unique check (seal_tag ~ '^[A-Z0-9-]{6,30}$'),
  status                text not null default 'sealed'
                        check (status in ('sealed','in_transit','at_hub','received','disputed','attested')),
  storage_deadline      timestamptz not null,
  unit_count_sent       int not null check (unit_count_sent >= 0),
  unit_count_received   int check (unit_count_received >= 0),
  sender_net_kg         numeric(12,3) check (sender_net_kg > 0),
  receiver_net_kg       numeric(12,3) check (receiver_net_kg > 0),
  accepted_net_kg       numeric(12,3) check (accepted_net_kg > 0),
  seal_intact           boolean,
  vehicle_ref           text,
  created_by            uuid not null references users(id),
  dispatched_at         timestamptz,
  received_at           timestamptz,
  -- Optional stop at a recycler-owned hub; null means the lot goes straight to the recycler.
  hub_org_id            uuid references organizations(id),
  hub_received_at       timestamptz,
  hub_net_kg            numeric(12,3) check (hub_net_kg > 0),
  hub_seal_intact       boolean,
  hub_unit_count        int check (hub_unit_count >= 0),
  shipment_id           uuid references hub_shipments(id),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint lots_hub_consistency check (
    (hub_org_id is not null or (hub_received_at is null and shipment_id is null))
    and (hub_received_at is null) = (hub_net_kg is null)
  )
);
alter table lots add column if not exists hub_org_id uuid references organizations(id);
alter table lots add column if not exists hub_received_at timestamptz;
alter table lots add column if not exists hub_net_kg numeric(12,3) check (hub_net_kg > 0);
alter table lots add column if not exists hub_seal_intact boolean;
alter table lots add column if not exists hub_unit_count int check (hub_unit_count >= 0);
alter table lots add column if not exists shipment_id uuid references hub_shipments(id);
alter table lots drop constraint if exists lots_status_check;
alter table lots add constraint lots_status_check
  check (status in ('sealed','in_transit','at_hub','received','disputed','attested'));
alter table lots drop constraint if exists lots_hub_consistency;
alter table lots add constraint lots_hub_consistency check (
  (hub_org_id is not null or (hub_received_at is null and shipment_id is null))
  and (hub_received_at is null) = (hub_net_kg is null)
);
create index if not exists lots_agent_idx on lots (agent_org_id, status);
create index if not exists lots_principal_idx on lots (principal_org_id, status);
create index if not exists lots_hub_idx on lots (hub_org_id, status) where hub_org_id is not null;
create index if not exists lots_shipment_idx on lots (shipment_id) where shipment_id is not null;

create table if not exists pickup_requests (
  id                      uuid primary key default gen_random_uuid(),
  reference               text not null unique default ('PU-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  requester_id            uuid not null references users(id),
  ward_id                 int not null references wards(id),
  status                  text not null default 'requested'
                          check (status in ('requested','scheduled','collected','in_lot','received','closed','cancelled','refused_item')),
  preferred_date          date not null,
  preferred_window        text not null check (preferred_window in ('morning','afternoon','evening')),
  assigned_agent_org_id   uuid references organizations(id),
  principal_org_id        uuid references organizations(id),
  scheduled_for           date,
  scheduled_window        text check (scheduled_window in ('morning','afternoon','evening')),
  collected_net_kg        numeric(12,3) check (collected_net_kg > 0),
  material_paid_amount    numeric(12,2) check (material_paid_amount >= 0),
  lot_id                  uuid references lots(id),
  cancel_reason           text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  check (status in ('requested','cancelled') or assigned_agent_org_id is not null)
);
create index if not exists pickup_requests_requester_idx on pickup_requests (requester_id, created_at desc);
create index if not exists pickup_requests_open_idx on pickup_requests (ward_id) where status = 'requested';
create index if not exists pickup_requests_agent_idx on pickup_requests (assigned_agent_org_id, status);
create index if not exists pickup_requests_lot_idx on pickup_requests (lot_id);

-- Personal data kept apart so oversight roles never read it (PRD v3 §8.4).
create table if not exists pickup_addresses (
  pickup_id      uuid primary key references pickup_requests(id) on delete cascade,
  contact_name   text not null check (length(contact_name) between 2 and 120),
  contact_phone  text not null check (contact_phone ~ '^[0-9]{10,16}$'),
  address_line   text not null check (length(address_line) between 5 and 300),
  landmark       text check (landmark is null or length(landmark) <= 160)
);

create table if not exists product_units (
  id               uuid primary key default gen_random_uuid(),
  category_code    text not null references waste_categories(code),
  identifier_type  text not null check (identifier_type in ('imei','serial','qr')),
  identifier_hash  text not null,
  last4            text not null check (length(last4) = 4),
  qr_public_id     text not null unique default encode(gen_random_bytes(9), 'hex'),
  state            text not null default 'collected'
                   check (state in ('registered','placed_on_market','claimed','handed_over','collected','in_lot','at_hub',
                                    'received_at_recycler','processed','materials_recovered','refurbished','lost','disputed')),
  legacy           boolean not null default true,
  producer_org_id  uuid references organizations(id),
  model_id         uuid references product_models(id),
  batch_id         uuid references market_batches(id),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (identifier_type, identifier_hash),
  check (legacy or (producer_org_id is not null and model_id is not null and batch_id is not null))
);
alter table product_units add column if not exists producer_org_id uuid references organizations(id);
alter table product_units add column if not exists model_id uuid references product_models(id);
alter table product_units add column if not exists batch_id uuid references market_batches(id);
alter table product_units drop constraint if exists product_units_identifier_type_check;
alter table product_units add constraint product_units_identifier_type_check check (identifier_type in ('imei','serial','qr'));
alter table product_units drop constraint if exists product_units_state_check;
alter table product_units add constraint product_units_state_check
  check (state in ('registered','placed_on_market','claimed','handed_over','collected','in_lot','at_hub',
                   'received_at_recycler','processed','materials_recovered','refurbished','lost','disputed'));
alter table product_units drop constraint if exists product_units_check;
alter table product_units add constraint product_units_check
  check (legacy or (producer_org_id is not null and model_id is not null and batch_id is not null));
create index if not exists product_units_producer_idx on product_units (producer_org_id, state) where producer_org_id is not null;
create index if not exists product_units_batch_idx on product_units (batch_id) where batch_id is not null;

create table if not exists pickup_items (
  id                  uuid primary key default gen_random_uuid(),
  pickup_id           uuid not null references pickup_requests(id) on delete cascade,
  category_code       text not null references waste_categories(code),
  quantity            int not null check (quantity between 1 and 50),
  collected_quantity  int check (collected_quantity >= 0),
  battery_check       text check (battery_check in ('no_battery','intact_embedded','swollen_or_damaged_refused')),
  refused_reason      text,
  created_at          timestamptz not null default now(),
  unique (pickup_id, category_code),
  check (collected_quantity is null or collected_quantity <= quantity)
);

create table if not exists pickup_item_units (
  pickup_item_id  uuid not null references pickup_items(id) on delete cascade,
  unit_id         uuid not null references product_units(id),
  duplicate       boolean not null default false,
  primary key (pickup_item_id, unit_id)
);
create index if not exists pickup_item_units_unit_idx on pickup_item_units (unit_id);

create table if not exists lifecycle_events (
  id             bigserial primary key,
  unit_id        uuid not null references product_units(id),
  state          text not null,
  actor_user_id  uuid references users(id),
  org_id         uuid references organizations(id),
  pickup_id      uuid references pickup_requests(id),
  lot_id         uuid references lots(id),
  created_at     timestamptz not null default now()
);
create index if not exists lifecycle_events_unit_idx on lifecycle_events (unit_id, created_at);

-- A citizen who scanned a unit's QR and claimed it as theirs, to follow its journey.
-- One owner per unit; claiming never changes custody or incentives.
create table if not exists unit_claims (
  unit_id     uuid primary key references product_units(id),
  user_id     uuid not null references users(id),
  claimed_at  timestamptz not null default now()
);
create index if not exists unit_claims_user_idx on unit_claims (user_id, claimed_at desc);

-- Self-registered devices (no EcoSure QR label). Citizens track these alongside claimed units.
create table if not exists manual_devices (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references users(id),
  category        text not null check (length(category) between 1 and 80),
  brand           text check (brand is null or length(brand) <= 80),
  model           text check (model is null or length(model) <= 120),
  serial_number   text check (serial_number is null or length(serial_number) <= 80),
  year_of_purchase int check (year_of_purchase is null or year_of_purchase between 1990 and 2100),
  condition       text not null default 'working'
                  check (condition in ('working','partially_working','not_working')),
  status          text not null default 'active' check (status in ('active','recycled')),
  recycled_at     timestamptz,
  notes           text check (notes is null or length(notes) <= 500),
  photo_url       text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists manual_devices_user_idx on manual_devices (user_id, created_at desc);
alter table manual_devices enable row level security;
drop policy if exists manual_devices_owner on manual_devices;
create policy manual_devices_owner on manual_devices
  for all to ecosure_app using (user_id = app.uid()) with check (user_id = app.uid());
grant all on manual_devices to ecosure_app;

create table if not exists handover_codes (
  pickup_id   uuid primary key references pickup_requests(id) on delete cascade,
  code_hash   text not null,
  expires_at  timestamptz not null,
  used_at     timestamptz,
  attempts    int not null default 0 check (attempts >= 0),
  created_at  timestamptz not null default now()
);

create table if not exists custody_events (
  id             bigserial primary key,
  pickup_id      uuid references pickup_requests(id),
  lot_id         uuid references lots(id),
  event_type     text not null,
  actor_user_id  uuid not null references users(id),
  org_id         uuid references organizations(id),
  detail         jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  check (pickup_id is not null or lot_id is not null)
);
create index if not exists custody_events_pickup_idx on custody_events (pickup_id, created_at);
create index if not exists custody_events_lot_idx on custody_events (lot_id, created_at);

create table if not exists weigh_records (
  id            bigserial primary key,
  side          text not null check (side in ('doorstep','sender','hub','receiver')),
  pickup_id     uuid references pickup_requests(id),
  lot_id        uuid references lots(id),
  net_kg        numeric(12,3) not null check (net_kg > 0),
  entry_method  text not null default 'manual' check (entry_method in ('manual','connected_scale')),
  recorded_by   uuid not null references users(id),
  created_at    timestamptz not null default now(),
  check ((side = 'doorstep' and pickup_id is not null) or (side <> 'doorstep' and lot_id is not null))
);
alter table weigh_records drop constraint if exists weigh_records_side_check;
alter table weigh_records add constraint weigh_records_side_check check (side in ('doorstep','sender','hub','receiver'));

create table if not exists attestations (
  id                   uuid primary key default gen_random_uuid(),
  public_number        text unique,
  lot_id               uuid not null unique references lots(id),
  issuer_org_id        uuid not null references organizations(id),
  registration_no      text not null,
  processed_kg         numeric(12,3) not null check (processed_kg > 0),
  battery_kg           numeric(12,3) not null default 0 check (battery_kg >= 0),
  unit_count           int not null check (unit_count >= 0),
  status               text not null default 'draft' check (status in ('draft','issued')),
  maker_id             uuid not null references users(id),
  checker_id           uuid references users(id),
  sha256               text unique,
  disclaimer_version   text not null default 'D-2026-01',
  drafted_at           timestamptz not null default now(),
  issued_at            timestamptz,
  check (checker_id is null or checker_id <> maker_id),
  check (status = 'draft' or (checker_id is not null and public_number is not null and sha256 is not null and issued_at is not null))
);

-- -----------------------------------------------------------------------------
-- Per-device citizen recycling certificates (citizen-facing, ECS-CERT-YYYY-NNNNNN)
-- One row per product_unit, auto-created when the lot's attestation is issued.
-- The attestation's public_number (ECS-ATT-...) is NEVER exposed here.
-- -----------------------------------------------------------------------------

create sequence if not exists certificate_number_seq;

create table if not exists recycling_certificates (
  id              uuid primary key default gen_random_uuid(),
  unit_id         uuid not null unique references product_units(id),
  attestation_id  uuid not null references attestations(id),
  cert_number     text not null unique,           -- ECS-CERT-YYYY-NNNNNN
  issued_at       timestamptz not null,
  created_at      timestamptz not null default now()
);
create index if not exists recycling_certificates_attestation_idx on recycling_certificates (attestation_id);

-- Auto-generate one certificate per unit when attestation transitions draft → issued.
create or replace function app.generate_unit_certificates()
returns trigger language plpgsql security definer as $$
declare
  _year text := extract(year from new.issued_at)::text;
  _unit record;
begin
  if new.status = 'issued' and old.status = 'draft' then
    for _unit in
      select pu.id as unit_id
        from lots l
        join pickup_requests pr   on pr.lot_id = l.id
        join pickup_items    pi   on pi.pickup_id = pr.id
        join pickup_item_units piu on piu.pickup_item_id = pi.id
        join product_units   pu   on pu.id = piu.unit_id
       where l.id = new.lot_id
    loop
      insert into recycling_certificates (unit_id, attestation_id, cert_number, issued_at)
      values (
        _unit.unit_id,
        new.id,
        'ECS-CERT-' || _year || '-' || lpad(nextval('certificate_number_seq')::text, 6, '0'),
        new.issued_at
      )
      on conflict (unit_id) do nothing;
      update product_units set state = 'processed', updated_at = now() where id = _unit.unit_id;
    end loop;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_generate_certificates on attestations;
create trigger trg_generate_certificates
  after update on attestations
  for each row execute function app.generate_unit_certificates();

-- RLS: citizens can only read their own device's certificate.
alter table recycling_certificates enable row level security;
drop policy if exists recycling_certificates_owner on recycling_certificates;
create policy recycling_certificates_owner on recycling_certificates
  for select to ecosure_app
  using (unit_id in (select unit_id from unit_claims where user_id = app.uid()));
grant select on recycling_certificates to ecosure_app;

create table if not exists citizen_incentives (
  id               uuid primary key default gen_random_uuid(),
  pickup_id        uuid not null unique references pickup_requests(id),
  payee_user_id    uuid not null references users(id),
  eligible_units   int not null check (eligible_units >= 0),
  amount           numeric(12,2) not null check (amount >= 0),
  funding_source   text not null default 'state_scheme' check (funding_source in ('state_scheme','producer_takeback')),
  status           text not null default 'eligible' check (status in ('eligible','batched','paid','failed','held','reversed')),
  hold_reason      text,
  idempotency_key  text not null unique,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists citizen_incentives_payee_idx on citizen_incentives (payee_user_id, created_at);

create table if not exists compliance_flags (
  id               uuid primary key default gen_random_uuid(),
  flag_type        text not null check (flag_type in
                     ('weight_variance','seal_broken','unit_count_leakage','duplicate_device','storage_deadline','incentive_cap',
                      'unit_missing_at_scan','hub_weight_variance')),
  severity         text not null check (severity in ('low','medium','high')),
  status           text not null default 'open' check (status in ('open','under_review','escalated','closed')),
  org_id           uuid references organizations(id),
  lot_id           uuid references lots(id),
  pickup_id        uuid references pickup_requests(id),
  summary          text not null,
  evidence         jsonb not null default '{}'::jsonb,
  dedupe_key       text unique,
  resolution_note  text,
  updated_by       uuid references users(id),
  opened_at        timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists compliance_flags_status_idx on compliance_flags (status, opened_at desc);
alter table compliance_flags drop constraint if exists compliance_flags_flag_type_check;
alter table compliance_flags add constraint compliance_flags_flag_type_check check (flag_type in
  ('weight_variance','seal_broken','unit_count_leakage','duplicate_device','storage_deadline','incentive_cap',
   'unit_missing_at_scan','hub_weight_variance'));

create table if not exists audit_log (
  id             bigserial primary key,
  actor_user_id  uuid references users(id),
  action         text not null,
  entity         text not null,
  entity_id      text,
  detail         jsonb not null default '{}'::jsonb,
  ip             text,
  created_at     timestamptz not null default now()
);
create index if not exists audit_log_entity_idx on audit_log (entity, entity_id);

-- -----------------------------------------------------------------------------
-- Helper functions (SECURITY DEFINER; fixed search_path)
-- -----------------------------------------------------------------------------

create or replace function app.uid() returns uuid
language sql stable as $$
  select nullif(current_setting('app.user_id', true), '')::uuid
$$;

create or replace function app.user_role() returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select platform_role from users where id = app.uid() and status = 'active'
$$;

create or replace function app.my_org_ids() returns setof uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select m.org_id from organization_members m
  join organizations o on o.id = m.org_id and o.status = 'active'
  where m.user_id = app.uid()
$$;

-- True when the caller is an active member of the org with one of the given staff roles.
create or replace function app.has_org_role(p_org uuid, p_roles text[]) returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (
    select 1 from organization_members m
    join organizations o on o.id = m.org_id and o.status = 'active'
    join users u on u.id = m.user_id and u.status = 'active'
    where m.user_id = app.uid() and m.org_id = p_org and m.org_role = any(p_roles)
  )
$$;

-- Active organisations where the caller holds one of the given staff roles (write policies).
create or replace function app.my_org_ids_with(p_roles text[]) returns setof uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select m.org_id from organization_members m
  join organizations o on o.id = m.org_id and o.status = 'active'
  join users u on u.id = m.user_id and u.status = 'active'
  where m.user_id = app.uid() and m.org_role = any(p_roles)
$$;

create or replace function app.my_producer_org_ids() returns setof uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select m.org_id from organization_members m
  join organizations o on o.id = m.org_id and o.status = 'active' and o.org_type = 'producer'
  where m.user_id = app.uid()
$$;

create or replace function app.is_oversight() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce(app.user_role() in ('ulb_officer','spcb_officer','cpcb_officer','programme_operator'), false)
$$;

-- True when the caller belongs to an agent org that serves the ward under an active agreement.
create or replace function app.serves_ward(p_ward int) returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (
    select 1
    from organization_members m
    join organizations o on o.id = m.org_id and o.status = 'active'
      and o.org_type in ('local_shop','informal_collector','drop_point')
    join agent_service_wards w on w.agent_org_id = o.id and w.ward_id = p_ward
    join agent_agreements a on a.agent_org_id = o.id and a.status = 'active'
      and current_date between a.valid_from and a.valid_until
    join organizations p on p.id = a.principal_org_id and p.status = 'active'
      and p.registration_valid_until >= current_date
    where m.user_id = app.uid()
  )
$$;

-- Active agreement for an agent whose principal holds a valid registration (PRD v3 §19.4 rule 4).
create or replace function app.active_agreement(p_agent uuid) returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select a.id
  from agent_agreements a
  join organizations p on p.id = a.principal_org_id and p.status = 'active'
    and p.org_type = 'pro_recycler' and p.registration_valid_until >= current_date
  where a.agent_org_id = p_agent and a.status = 'active'
    and current_date between a.valid_from and a.valid_until
  order by a.valid_from desc
  limit 1
$$;

-- Recycler a regional hub works for, through its own active agreement; null when it has none.
create or replace function app.hub_principal(p_hub uuid) returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select a.principal_org_id
  from organizations h
  join agent_agreements a on a.id = app.active_agreement(h.id)
  where h.id = p_hub and h.org_type = 'regional_hub' and h.status = 'active'
$$;

-- Hubs an agent may route a lot through: active hubs working for the lot's recycler.
create or replace function app.hubs_of_recycler(p_recycler uuid)
returns table (id uuid, name text)
language sql stable security definer set search_path = public, pg_temp as $$
  select h.id, h.name from organizations h
  where h.org_type = 'regional_hub' and h.status = 'active' and app.hub_principal(h.id) = p_recycler
    and app.uid() is not null
  order by h.name
$$;

-- --- Authentication (callable before a user context exists) -----------------

create or replace function app.auth_register_citizen(p_email text, p_phone text, p_name text, p_hash text)
returns uuid
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_id uuid;
begin
  insert into users (email, phone, full_name, password_hash, platform_role)
  values (lower(p_email), p_phone, p_name, p_hash, 'citizen')
  on conflict do nothing
  returning id into v_id;
  return v_id; -- null when email or phone already exists
end $$;

create or replace function app.auth_lookup_by_phone(p_phone text)
returns table (id uuid, full_name text, email text, phone text)
language sql stable security definer set search_path = public, pg_temp as $
  select id, full_name, email, phone from users where phone = p_phone and status = 'active';
$;

create or replace function app.auth_credentials(p_email text)
returns table (user_id uuid, password_hash text, status text)
language sql stable security definer set search_path = public, pg_temp as $$
  select id, password_hash, status from users where email = lower(p_email)
$$;

create or replace function app.auth_create_session(p_user uuid, p_token_hash text, p_ttl_hours int)
returns void
language sql security definer set search_path = public, pg_temp as $$
  insert into sessions (user_id, token_hash, expires_at)
  values (p_user, p_token_hash, now() + make_interval(hours => p_ttl_hours))
$$;

create or replace function app.auth_resolve_session(p_token_hash text)
returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select s.user_id from sessions s join users u on u.id = s.user_id
  where s.token_hash = p_token_hash and s.revoked_at is null and s.expires_at > now() and u.status = 'active'
$$;

create or replace function app.auth_revoke_session(p_token_hash text)
returns void
language sql security definer set search_path = public, pg_temp as $$
  update sessions set revoked_at = now() where token_hash = p_token_hash and revoked_at is null
$$;

-- --- Handover codes: never readable, only issued and checked ---------------

create or replace function app.issue_handover_code(p_pickup uuid, p_code_hash text, p_ttl_minutes int)
returns timestamptz
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_exp timestamptz := now() + make_interval(mins => p_ttl_minutes);
begin
  if not exists (select 1 from pickup_requests where id = p_pickup and requester_id = app.uid() and status = 'scheduled') then
    raise exception 'handover code not allowed' using errcode = '42501';
  end if;
  insert into handover_codes (pickup_id, code_hash, expires_at)
  values (p_pickup, p_code_hash, v_exp)
  on conflict (pickup_id) do update
    set code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0, created_at = now()
    where handover_codes.used_at is null;
  if not found then
    raise exception 'handover code already used' using errcode = '42501';
  end if;
  return v_exp;
end $$;

-- Returns ok | missing | expired | locked | used | invalid. Locks after 5 wrong attempts.
create or replace function app.consume_handover_code(p_pickup uuid, p_code_hash text)
returns text
language plpgsql security definer set search_path = public, pg_temp as $$
declare r handover_codes%rowtype;
begin
  if not exists (
    select 1 from pickup_requests p
    where p.id = p_pickup and p.status = 'scheduled'
      and p.assigned_agent_org_id in (select app.my_org_ids())
  ) then
    raise exception 'not assigned' using errcode = '42501';
  end if;
  select * into r from handover_codes where pickup_id = p_pickup for update;
  if not found then return 'missing'; end if;
  if r.used_at is not null then return 'used'; end if;
  if r.attempts >= 5 then return 'locked'; end if;
  if r.expires_at <= now() then return 'expired'; end if;
  if r.code_hash <> p_code_hash then
    update handover_codes set attempts = attempts + 1 where pickup_id = p_pickup;
    return case when r.attempts + 1 >= 5 then 'locked' else 'invalid' end;
  end if;
  update handover_codes set used_at = now() where pickup_id = p_pickup;
  return 'ok';
end $$;

-- --- Product passport operations -------------------------------------------

-- Registers (or finds) a unit at collection and links it to the pickup item.
-- Returns the unit id, its state before this call, and whether it is a duplicate.
create or replace function app.link_unit_at_collection(
  p_item uuid, p_category text, p_type text, p_hash text, p_last4 text)
returns table (unit_id uuid, prior_state text, duplicate boolean)
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_pickup uuid; v_org uuid; v_unit uuid; v_prior text; v_dup boolean := false;
begin
  select i.pickup_id, p.assigned_agent_org_id into v_pickup, v_org
  from pickup_items i join pickup_requests p on p.id = i.pickup_id
  where i.id = p_item and p.status = 'scheduled'
    and p.assigned_agent_org_id in (select app.my_org_ids());
  if v_pickup is null then
    raise exception 'not assigned' using errcode = '42501';
  end if;

  select id, state into v_unit, v_prior from product_units
  where identifier_type = p_type and identifier_hash = p_hash for update;

  if v_unit is null then
    insert into product_units (category_code, identifier_type, identifier_hash, last4, state, legacy)
    values (p_category, p_type, p_hash, p_last4, 'collected', true)
    returning id into v_unit;
    v_prior := null;
  else
    v_dup := v_prior in ('collected','in_lot','received_at_recycler','processed','materials_recovered');
    if not v_dup then
      update product_units set state = 'collected', updated_at = now() where id = v_unit;
    end if;
  end if;

  insert into pickup_item_units (pickup_item_id, unit_id, duplicate) values (p_item, v_unit, v_dup)
  on conflict do nothing;

  if not v_dup then
    insert into lifecycle_events (unit_id, state, actor_user_id, org_id, pickup_id)
    values (v_unit, 'handed_over', app.uid(), v_org, v_pickup),
           (v_unit, 'collected',   app.uid(), v_org, v_pickup);
  end if;

  return query select v_unit, v_prior, v_dup;
end $$;

-- Moves every non-duplicate unit of the given pickups to a new lifecycle state.
-- Caller must belong to the agent or principal org of each pickup.
create or replace function app.advance_units(p_pickups uuid[], p_state text, p_lot uuid)
returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_count int;
begin
  if p_state not in ('in_lot','at_hub','received_at_recycler','processed') then
    raise exception 'invalid state' using errcode = '22023';
  end if;
  if exists (
    select 1 from pickup_requests p
    where p.id = any(p_pickups)
      and not (p.assigned_agent_org_id in (select app.my_org_ids())
               or p.principal_org_id in (select app.my_org_ids())
               or exists (select 1 from lots l where l.id = p.lot_id and l.hub_org_id in (select app.my_org_ids())))
  ) then
    raise exception 'not permitted' using errcode = '42501';
  end if;

  with targets as (
    select distinct u.id, p.id as pickup_id, coalesce(p.principal_org_id, p.assigned_agent_org_id) as org_id
    from pickup_requests p
    join pickup_items i on i.pickup_id = p.id
    join pickup_item_units piu on piu.pickup_item_id = i.id and not piu.duplicate
    join product_units u on u.id = piu.unit_id and u.state <> 'disputed'
    where p.id = any(p_pickups)
  ), upd as (
    update product_units u set state = p_state, updated_at = now()
    from targets t where u.id = t.id
    returning u.id
  )
  insert into lifecycle_events (unit_id, state, actor_user_id, org_id, pickup_id, lot_id)
  select t.id, p_state, app.uid(), t.org_id, t.pickup_id, p_lot from targets t;
  get diagnostics v_count = row_count;
  return v_count;
end $$;

-- --- Product registry (producers only) --------------------------------------

-- Registers units into a draft batch. p_rows: [{ "type": "imei|serial|qr", "hash": "...",
-- "last4": "....", "qr": "<optional public id>" }]. Returns one row per input row with
-- either the unit's QR id or an error code; rejected rows never abort the others.
create or replace function app.register_units(p_batch uuid, p_rows jsonb)
returns table (row_index int, qr_public_id text, error text)
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare
  b market_batches%rowtype; v_category text; v_existing int; v_row jsonb; v_idx int := 0;
  v_unit uuid; v_qr text;
begin
  select * into b from market_batches where id = p_batch for update;
  if not found or not app.has_org_role(b.producer_org_id, array['owner','operator'])
     or not exists (select 1 from organizations where id = b.producer_org_id and org_type = 'producer') then
    raise exception 'not permitted' using errcode = '42501';
  end if;
  if b.status <> 'draft' then
    raise exception 'batch already placed on the market' using errcode = '23514';
  end if;
  select category_code into v_category from product_models where id = b.model_id;
  select count(*) into v_existing from product_units where batch_id = p_batch;
  if v_existing + jsonb_array_length(p_rows) > b.quantity then
    raise exception 'more units than the batch quantity' using errcode = '23514';
  end if;

  for v_row in select * from jsonb_array_elements(p_rows) loop
    v_idx := v_idx + 1;
    if (v_row->>'type') not in ('imei','serial','qr') or coalesce(v_row->>'hash','') !~ '^[0-9a-f]{64}$'
       or length(coalesce(v_row->>'last4','')) <> 4 then
      row_index := v_idx; qr_public_id := null; error := 'invalid'; return next; continue;
    end if;
    v_unit := null;
    insert into product_units (category_code, identifier_type, identifier_hash, last4, qr_public_id, state, legacy,
                               producer_org_id, model_id, batch_id)
    values (v_category, v_row->>'type', v_row->>'hash', v_row->>'last4',
            coalesce(v_row->>'qr', encode(gen_random_bytes(9), 'hex')), 'registered', false,
            b.producer_org_id, b.model_id, b.id)
    on conflict do nothing
    returning id, product_units.qr_public_id into v_unit, v_qr;
    if v_unit is null then
      row_index := v_idx; qr_public_id := null; error := 'duplicate'; return next; continue;
    end if;
    insert into lifecycle_events (unit_id, state, actor_user_id, org_id) values (v_unit, 'registered', app.uid(), b.producer_org_id);
    row_index := v_idx; qr_public_id := v_qr; error := null; return next;
  end loop;
end $$;

-- Places a draft batch on the market; its units move to placed_on_market. Approver step.
create or replace function app.place_batch(p_batch uuid)
returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare b market_batches%rowtype; v_count int;
begin
  select * into b from market_batches where id = p_batch for update;
  if not found or not app.has_org_role(b.producer_org_id, array['owner','approver']) then
    raise exception 'not permitted' using errcode = '42501';
  end if;
  if b.status <> 'draft' then
    raise exception 'batch already placed on the market' using errcode = '23514';
  end if;
  update market_batches set status = 'placed', placed_by = app.uid(), placed_at = now() where id = p_batch;
  with upd as (
    update product_units set state = 'placed_on_market', updated_at = now()
     where batch_id = p_batch and state = 'registered' returning id
  )
  insert into lifecycle_events (unit_id, state, actor_user_id, org_id)
  select id, 'placed_on_market', app.uid(), b.producer_org_id from upd;
  get diagnostics v_count = row_count;
  return v_count;
end $$;

-- Producer outcome view: own units with state and attestation number only.
-- Never exposes pickups, lots, agents, hubs, wards, or people.
create or replace function app.producer_unit_outcomes(p_state text, p_batch uuid, p_limit int)
returns table (unit_id uuid, qr_public_id text, identifier_type text, last4 text, state text,
               model_id uuid, brand text, model_name text, batch_id uuid, batch_ref text,
               updated_at timestamptz, attestation_number text)
language sql stable security definer set search_path = public, pg_temp as $$
  select u.id, u.qr_public_id, u.identifier_type, u.last4, u.state, m.id, m.brand, m.model_name, b.id, b.batch_ref,
         u.updated_at,
         (select a.public_number from pickup_item_units piu
            join pickup_items i on i.id = piu.pickup_item_id
            join pickup_requests p on p.id = i.pickup_id
            join attestations a on a.lot_id = p.lot_id and a.status = 'issued'
           where piu.unit_id = u.id and not piu.duplicate limit 1)
    from product_units u
    join product_models m on m.id = u.model_id
    join market_batches b on b.id = u.batch_id
   where u.producer_org_id in (select app.my_producer_org_ids())
     and (p_state is null or u.state = p_state)
     and (p_batch is null or u.batch_id = p_batch)
   order by u.updated_at desc
   limit least(greatest(coalesce(p_limit, 100), 1), 500)
$$;

-- Monthly end-of-life counts for the caller's producer units (from the append-only lifecycle).
create or replace function app.producer_monthly_outcomes(p_months int)
returns table (month date, collected int, received int, processed int)
language sql stable security definer set search_path = public, pg_temp as $$
  select d.month::date,
         count(*) filter (where e.state = 'collected')::int,
         count(*) filter (where e.state = 'received_at_recycler')::int,
         count(*) filter (where e.state = 'processed')::int
    from generate_series(date_trunc('month', now()) - make_interval(months => greatest(coalesce(p_months, 6), 1) - 1),
                         date_trunc('month', now()), interval '1 month') as d(month)
    left join lifecycle_events e on date_trunc('month', e.created_at) = d.month
     and e.unit_id in (select id from product_units where producer_org_id in (select app.my_producer_org_ids()))
   group by d.month order by d.month
$$;

-- --- QR bridge: the only place Track A units meet the custody chain ----------

-- Links a labelled unit to a pickup item by its QR id at collection. Same duplicate rules as
-- app.link_unit_at_collection. problem: not_found | category_mismatch (nothing is written).
create or replace function app.link_unit_by_qr(p_item uuid, p_qr text)
returns table (unit_id uuid, prior_state text, duplicate boolean, problem text)
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_pickup uuid; v_org uuid; v_category text; u product_units%rowtype; v_dup boolean := false;
begin
  select i.pickup_id, p.assigned_agent_org_id, i.category_code into v_pickup, v_org, v_category
  from pickup_items i join pickup_requests p on p.id = i.pickup_id
  where i.id = p_item and p.status = 'scheduled'
    and p.assigned_agent_org_id in (select app.my_org_ids());
  if v_pickup is null then
    raise exception 'not assigned' using errcode = '42501';
  end if;

  select * into u from product_units where qr_public_id = lower(p_qr) for update;
  if not found then
    return query select null::uuid, null::text, false, 'not_found'::text; return;
  end if;
  if u.category_code <> v_category then
    return query select u.id, u.state, false, 'category_mismatch'::text; return;
  end if;

  v_dup := u.state in ('collected','in_lot','at_hub','received_at_recycler','processed','materials_recovered');
  if not v_dup then
    update product_units set state = 'collected', updated_at = now() where id = u.id;
  end if;
  insert into pickup_item_units (pickup_item_id, unit_id, duplicate) values (p_item, u.id, v_dup)
  on conflict do nothing;
  if not v_dup then
    insert into lifecycle_events (unit_id, state, actor_user_id, org_id, pickup_id)
    values (u.id, 'handed_over', app.uid(), v_org, v_pickup),
           (u.id, 'collected',   app.uid(), v_org, v_pickup);
  end if;
  return query select u.id, u.state, v_dup, null::text;
end $$;

-- Citizen claims a unit on the market. Returns ok | already_yours | claimed | not_claimable | not_found.
create or replace function app.claim_unit(p_qr text)
returns text
language plpgsql security definer set search_path = public, pg_temp as $$
declare u product_units%rowtype; v_owner uuid;
begin
  if app.user_role() is distinct from 'citizen' then
    raise exception 'citizens only' using errcode = '42501';
  end if;
  select * into u from product_units where qr_public_id = lower(p_qr) for update;
  if not found then return 'not_found'; end if;
  select user_id into v_owner from unit_claims where unit_id = u.id;
  if v_owner = app.uid() then return 'already_yours'; end if;
  if v_owner is not null then return 'claimed'; end if;
  if u.state <> 'placed_on_market' then return 'not_claimable'; end if;
  insert into unit_claims (unit_id, user_id) values (u.id, app.uid());
  update product_units set state = 'claimed', updated_at = now() where id = u.id;
  insert into lifecycle_events (unit_id, state, actor_user_id) values (u.id, 'claimed', app.uid());
  return 'ok';
end $$;

-- Public product page (no login): model, category, stage dates, and the attestation number.
-- Never returns people, organisations, places, pickups, or lots.
create or replace function app.public_product_journey(p_qr text)
returns table (qr_public_id text, brand text, model_name text, category_name text, registered boolean,
               state text, claimed boolean, attestation_number text, events jsonb)
language sql stable security definer set search_path = public, pg_temp as $$
  select u.qr_public_id, m.brand, m.model_name, wc.name, not u.legacy, u.state,
         exists (select 1 from unit_claims c where c.unit_id = u.id),
         (select a.public_number from pickup_item_units piu
            join pickup_items i on i.id = piu.pickup_item_id
            join pickup_requests p on p.id = i.pickup_id
            join attestations a on a.lot_id = p.lot_id and a.status = 'issued'
           where piu.unit_id = u.id and not piu.duplicate limit 1),
         coalesce((select jsonb_agg(jsonb_build_object('state', s.state, 'on', s.first_on) order by s.first_id)
                     from (select e.state, min(e.id) as first_id, min(e.created_at)::date as first_on from lifecycle_events e
                            where e.unit_id = u.id and e.state <> 'handed_over' group by e.state) s), '[]'::jsonb)
    from product_units u
    join waste_categories wc on wc.code = u.category_code
    left join product_models m on m.id = u.model_id
   where u.qr_public_id = lower(p_qr)
$$;

-- Recycler marks labelled units that were not scanned on arrival. They leave the chain as
-- disputed and are never advanced to processed.
create or replace function app.mark_units_missing(p_lot uuid, p_units uuid[])
returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_org uuid; v_count int;
begin
  select principal_org_id into v_org from lots where id = p_lot and principal_org_id in (select app.my_org_ids());
  if v_org is null then
    raise exception 'not permitted' using errcode = '42501';
  end if;
  with targets as (
    select distinct u.id, p.id as pickup_id from product_units u
      join pickup_item_units piu on piu.unit_id = u.id and not piu.duplicate
      join pickup_items i on i.id = piu.pickup_item_id
      join pickup_requests p on p.id = i.pickup_id and p.lot_id = p_lot
     where u.id = any(p_units)
  ), upd as (
    update product_units u set state = 'disputed', updated_at = now() from targets t where u.id = t.id returning u.id
  )
  insert into lifecycle_events (unit_id, state, actor_user_id, org_id, pickup_id, lot_id)
  select t.id, 'disputed', app.uid(), v_org, t.pickup_id, p_lot from targets t;
  get diagnostics v_count = row_count;
  return v_count;
end $$;

-- --- Compliance flags: raised only through this function (deduplicated) -----

create or replace function app.raise_flag(
  p_type text, p_severity text, p_org uuid, p_lot uuid, p_pickup uuid,
  p_summary text, p_evidence jsonb, p_dedupe_key text)
returns void
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if app.uid() is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;
  insert into compliance_flags (flag_type, severity, org_id, lot_id, pickup_id, summary, evidence, dedupe_key)
  values (p_type, p_severity, p_org, p_lot, p_pickup, p_summary, coalesce(p_evidence, '{}'::jsonb), p_dedupe_key)
  on conflict (dedupe_key) do nothing;
end $$;

-- --- Public verification (no login; non-personal fields only, PRD v3 §8.4) --

create or replace function app.verify_attestation(p_number text)
returns table (public_number text, issuer_name text, registration_no text, issued_at timestamptz,
               processed_kg numeric, battery_kg numeric, unit_count int, sha256 text,
               disclaimer_version text, categories text[])
language sql stable security definer set search_path = public, pg_temp as $$
  select a.public_number, o.name, a.registration_no, a.issued_at, a.processed_kg, a.battery_kg,
         a.unit_count, a.sha256, a.disclaimer_version,
         array(select distinct c.name from pickup_requests p
               join pickup_items i on i.pickup_id = p.id and coalesce(i.collected_quantity,0) > 0
               join waste_categories c on c.code = i.category_code
               where p.lot_id = a.lot_id order by 1)
  from attestations a join organizations o on o.id = a.issuer_org_id
  where a.public_number = upper(p_number) and a.status = 'issued'
$$;

-- --- Storage deadline scan (PRD v3 §16.4 step 8: flag at 75%) ---------------

create or replace function app.scan_storage_deadlines(p_flag_pct numeric)
returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_count int;
begin
  insert into compliance_flags (flag_type, severity, org_id, lot_id, summary, evidence, dedupe_key)
  select 'storage_deadline',
         case when l.storage_deadline <= now() then 'high' else 'medium' end,
         case when l.status = 'at_hub' then l.hub_org_id else l.agent_org_id end, l.id,
         'Lot ' || l.seal_tag || ' has used ' ||
           round(100 * extract(epoch from now() - l.created_at) / nullif(extract(epoch from l.storage_deadline - l.created_at), 0)) ||
           '% of its storage period and has not reached the recycler',
         jsonb_build_object('storage_deadline', l.storage_deadline, 'created_at', l.created_at),
         'storage:' || l.id
  from lots l
  where l.status in ('sealed','in_transit','at_hub')
    and now() >= l.created_at + (l.storage_deadline - l.created_at) * (p_flag_pct / 100)
  on conflict (dedupe_key) do nothing;
  get diagnostics v_count = row_count;
  return v_count;
end $$;

-- -----------------------------------------------------------------------------
-- Triggers
-- -----------------------------------------------------------------------------

create or replace function app.tg_append_only() returns trigger
language plpgsql as $$
begin
  raise exception '% is append-only', tg_table_name using errcode = '42501';
end $$;

create or replace function app.tg_touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- Assigning an agent requires an active agreement; principal comes from it.
create or replace function app.tg_pickup_assignment() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_agreement uuid;
begin
  if new.assigned_agent_org_id is not null
     and (tg_op = 'INSERT' or new.assigned_agent_org_id is distinct from old.assigned_agent_org_id) then
    v_agreement := app.active_agreement(new.assigned_agent_org_id);
    if v_agreement is null then
      raise exception 'agent has no active agreement with a registered recycler' using errcode = '23514';
    end if;
    select principal_org_id into new.principal_org_id from agent_agreements where id = v_agreement;
  end if;
  return new;
end $$;

-- Attestation integrity (PRD v3 §19.4 rules 6 and 7).
create or replace function app.tg_attestation_rules() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_lot lots%rowtype;
begin
  select * into v_lot from lots where id = new.lot_id;
  if v_lot.status not in ('received','attested') or v_lot.accepted_net_kg is null then
    raise exception 'lot is not received' using errcode = '23514';
  end if;
  if new.issuer_org_id <> v_lot.principal_org_id then
    raise exception 'issuer must be the lot principal' using errcode = '23514';
  end if;
  if new.processed_kg + new.battery_kg > v_lot.accepted_net_kg then
    raise exception 'processed plus battery weight exceeds accepted weight' using errcode = '23514';
  end if;
  if tg_op = 'UPDATE' and old.status = 'issued' then
    raise exception 'issued attestations are immutable' using errcode = '42501';
  end if;
  return new;
end $$;

-- A lot may stop only at a hub that works for the lot's own recycler, and its route is fixed once
-- the hub has received it.
create or replace function app.tg_lot_hub() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if tg_op = 'UPDATE' and old.hub_received_at is not null and new.hub_org_id is distinct from old.hub_org_id then
    raise exception 'hub route is fixed after hub receipt' using errcode = '23514';
  end if;
  if new.hub_org_id is not null and (tg_op = 'INSERT' or new.hub_org_id is distinct from old.hub_org_id)
     and app.hub_principal(new.hub_org_id) is distinct from new.principal_org_id then
    raise exception 'hub does not work for this recycler' using errcode = '23514';
  end if;
  return new;
end $$;

-- Manufacturers only register data; custody organisations only handle material. No user may belong
-- to both sides, so every account resolves to exactly one workspace.
create or replace function app.is_custody_org_type(p_type text) returns boolean
language sql immutable set search_path = public, pg_temp as $$
  select p_type in ('local_shop','informal_collector','drop_point','regional_hub','pro_recycler')
$$;

create or replace function app.tg_member_separation() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_type text;
begin
  -- Serialise membership changes per user so two concurrent inserts cannot both pass the check.
  perform 1 from users where id = new.user_id for update;
  select org_type into v_type from organizations where id = new.org_id;
  if v_type = 'producer' and exists (
       select 1 from organization_members m join organizations o on o.id = m.org_id
       where m.user_id = new.user_id and m.org_id <> new.org_id and app.is_custody_org_type(o.org_type))
  or app.is_custody_org_type(v_type) and exists (
       select 1 from organization_members m join organizations o on o.id = m.org_id
       where m.user_id = new.user_id and m.org_id <> new.org_id and o.org_type = 'producer') then
    raise exception 'a user cannot belong to both a manufacturer and a custody organisation'
      using errcode = '23514', constraint = 'member_track_separation';
  end if;
  return new;
end $$;

create or replace function app.tg_org_type_fixed() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  if new.org_type is distinct from old.org_type then
    raise exception 'organisation type cannot change' using errcode = '23514', constraint = 'org_type_fixed';
  end if;
  return new;
end $$;

-- Only an authorised recycler can be a principal, and only custody organisations can act for it.
create or replace function app.tg_agreement_parties() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if (select org_type from organizations where id = new.principal_org_id) is distinct from 'pro_recycler' then
    raise exception 'agreement principal must be a recycler' using errcode = '23514', constraint = 'agreement_parties';
  end if;
  if (select org_type from organizations where id = new.agent_org_id)
       not in ('local_shop','informal_collector','drop_point','regional_hub') then
    raise exception 'agreement agent must be a collection or hub organisation' using errcode = '23514', constraint = 'agreement_parties';
  end if;
  return new;
end $$;

create or replace function app.tg_flag_notify() returns trigger
language plpgsql as $$
begin
  perform pg_notify('ecosure_flags', json_build_object('id', new.id, 'op', lower(tg_op))::text);
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['lifecycle_events','custody_events','weigh_records','audit_log'] loop
    execute format('drop trigger if exists %I_append_only on %I', t, t);
    execute format('create trigger %I_append_only before update or delete on %I for each row execute function app.tg_append_only()', t, t);
  end loop;
  foreach t in array array['users','organizations','lots','pickup_requests','product_units','citizen_incentives','compliance_flags','market_batches','hub_shipments'] loop
    execute format('drop trigger if exists %I_touch on %I', t, t);
    execute format('create trigger %I_touch before update on %I for each row execute function app.tg_touch_updated_at()', t, t);
  end loop;
end $$;

drop trigger if exists pickup_requests_assignment on pickup_requests;
create trigger pickup_requests_assignment before insert or update of assigned_agent_org_id on pickup_requests
  for each row execute function app.tg_pickup_assignment();

drop trigger if exists attestations_rules on attestations;
create trigger attestations_rules before insert or update on attestations
  for each row execute function app.tg_attestation_rules();

drop trigger if exists lots_hub on lots;
create trigger lots_hub before insert or update of hub_org_id on lots
  for each row execute function app.tg_lot_hub();

drop trigger if exists organization_members_separation on organization_members;
create trigger organization_members_separation before insert or update on organization_members
  for each row execute function app.tg_member_separation();

drop trigger if exists organizations_type_fixed on organizations;
create trigger organizations_type_fixed before update of org_type on organizations
  for each row execute function app.tg_org_type_fixed();

drop trigger if exists agent_agreements_parties on agent_agreements;
create trigger agent_agreements_parties before insert or update on agent_agreements
  for each row execute function app.tg_agreement_parties();

drop trigger if exists compliance_flags_notify on compliance_flags;
create trigger compliance_flags_notify after insert or update on compliance_flags
  for each row execute function app.tg_flag_notify();

-- -----------------------------------------------------------------------------
-- Privileges (least privilege; no DELETE anywhere)
-- -----------------------------------------------------------------------------

revoke all on all tables in schema public from ecosure_app;
grant select on waste_categories, wards, scheme_settings to ecosure_app;
grant select on organizations, organization_members, agent_agreements, agent_service_wards, rate_cards to ecosure_app;
grant select, update (full_name, phone) on users to ecosure_app;
grant select, insert, update on pickup_requests, pickup_items, lots, attestations, citizen_incentives, hub_shipments to ecosure_app;
grant select, insert on pickup_addresses to ecosure_app;
grant select on product_units, pickup_item_units, lifecycle_events, unit_claims to ecosure_app;
grant select, insert on product_models, market_batches to ecosure_app;
grant select, insert on custody_events, weigh_records, audit_log to ecosure_app;
grant select, update (status, resolution_note, updated_by) on compliance_flags to ecosure_app;
grant usage on all sequences in schema public to ecosure_app;
revoke all on sessions, handover_codes from ecosure_app;

revoke all on all functions in schema app from public;
grant execute on all functions in schema app to ecosure_app;

-- Hosted PostgreSQL (Supabase) grants its API roles every new table in public and serves them over
-- its REST API. EcoSure never uses that API: all access goes through the Node.js API as ecosure_app.
do $$
declare r text;
begin
  foreach r in array array['anon','authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      execute format('revoke all on all tables in schema public from %I', r);
      execute format('revoke all on all sequences in schema public from %I', r);
      execute format('revoke all on all functions in schema public from %I', r);
      execute format('revoke all on schema app from %I', r);
      execute format('alter default privileges in schema public revoke all on tables from %I', r);
      execute format('alter default privileges in schema public revoke all on sequences from %I', r);
      execute format('alter default privileges in schema public revoke all on functions from %I', r);
    end if;
  end loop;
end $$;

-- -----------------------------------------------------------------------------
-- Row-level security
-- -----------------------------------------------------------------------------

do $$
declare t text;
begin
  foreach t in array array[
    'waste_categories','wards','scheme_settings','users','sessions','organizations','organization_members',
    'agent_agreements','agent_service_wards','rate_cards','lots','pickup_requests','pickup_addresses',
    'product_units','pickup_items','pickup_item_units','lifecycle_events','handover_codes','custody_events',
    'weigh_records','attestations','citizen_incentives','compliance_flags','audit_log',
    'product_models','market_batches','unit_claims','hub_shipments'] loop
    execute format('alter table %I enable row level security', t);
    execute format('alter table %I force row level security', t);
  end loop;
end $$;

-- Reference data: readable by everyone connected through the app.
drop policy if exists ref_read on waste_categories;
create policy ref_read on waste_categories for select using (true);
drop policy if exists ref_read on wards;
create policy ref_read on wards for select using (true);
drop policy if exists ref_read on scheme_settings;
create policy ref_read on scheme_settings for select using (true);

-- Users: own row; operator for support.
drop policy if exists users_self on users;
create policy users_self on users for select using (id = app.uid() or app.user_role() = 'programme_operator');
drop policy if exists users_self_update on users;
create policy users_self_update on users for update using (id = app.uid()) with check (id = app.uid());

-- Organizations are public-facing names; members visible within the org.
drop policy if exists orgs_read on organizations;
create policy orgs_read on organizations for select using (app.uid() is not null);
drop policy if exists members_read on organization_members;
create policy members_read on organization_members for select
  using (user_id = app.uid() or org_id in (select app.my_org_ids()) or app.is_oversight());

drop policy if exists agreements_read on agent_agreements;
create policy agreements_read on agent_agreements for select
  using (principal_org_id in (select app.my_org_ids()) or agent_org_id in (select app.my_org_ids()) or app.is_oversight());

drop policy if exists service_wards_read on agent_service_wards;
create policy service_wards_read on agent_service_wards for select using (app.uid() is not null);

drop policy if exists rate_cards_read on rate_cards;
create policy rate_cards_read on rate_cards for select using (app.uid() is not null);

-- Pickups (PRD v3 §8.6 rule 2).
drop policy if exists pickups_read on pickup_requests;
create policy pickups_read on pickup_requests for select using (
  requester_id = app.uid()
  or assigned_agent_org_id in (select app.my_org_ids())
  or (principal_org_id in (select app.my_org_ids()) and lot_id is not null)
  or (lot_id is not null and exists (select 1 from lots l where l.id = lot_id and l.hub_org_id in (select app.my_org_ids())))
  or (status = 'requested' and assigned_agent_org_id is null and app.serves_ward(ward_id))
  or app.is_oversight()
);
drop policy if exists pickups_insert on pickup_requests;
create policy pickups_insert on pickup_requests for insert with check (
  requester_id = app.uid() and status = 'requested' and assigned_agent_org_id is null and app.user_role() = 'citizen'
);
drop policy if exists pickups_update on pickup_requests;
create policy pickups_update on pickup_requests for update using (
  requester_id = app.uid()
  or assigned_agent_org_id in (select app.my_org_ids_with(array['owner','operator']))
  or (principal_org_id in (select app.my_org_ids_with(array['owner','operator','approver'])) and lot_id is not null)
  or (status = 'requested' and assigned_agent_org_id is null and app.serves_ward(ward_id)
      and exists (select 1 from app.my_org_ids_with(array['owner','operator'])))
) with check (
  requester_id = app.uid()
  or assigned_agent_org_id in (select app.my_org_ids_with(array['owner','operator']))
  or principal_org_id in (select app.my_org_ids_with(array['owner','operator','approver']))
);

-- Addresses: requester and the accepted agent only; never oversight.
drop policy if exists addresses_read on pickup_addresses;
create policy addresses_read on pickup_addresses for select using (
  exists (select 1 from pickup_requests p where p.id = pickup_id
          and (p.requester_id = app.uid() or p.assigned_agent_org_id in (select app.my_org_ids())))
);
drop policy if exists addresses_insert on pickup_addresses;
create policy addresses_insert on pickup_addresses for insert with check (
  exists (select 1 from pickup_requests p where p.id = pickup_id and p.requester_id = app.uid() and p.status = 'requested')
);

drop policy if exists items_read on pickup_items;
create policy items_read on pickup_items for select using (
  exists (select 1 from pickup_requests p where p.id = pickup_id)
);
drop policy if exists items_insert on pickup_items;
create policy items_insert on pickup_items for insert with check (
  exists (select 1 from pickup_requests p where p.id = pickup_id and p.requester_id = app.uid() and p.status = 'requested')
);
drop policy if exists items_update on pickup_items;
create policy items_update on pickup_items for update using (
  exists (select 1 from pickup_requests p where p.id = pickup_id and p.assigned_agent_org_id in (select app.my_org_ids()) and p.status = 'scheduled')
);

-- Passport rows: visible when linked to a visible pickup, to the registering producer, or to oversight.
drop policy if exists units_read on product_units;
create policy units_read on product_units for select using (
  app.is_oversight()
  or producer_org_id in (select app.my_producer_org_ids())
  or exists (select 1 from unit_claims c where c.unit_id = product_units.id and c.user_id = app.uid())
  or exists (select 1 from pickup_item_units piu join pickup_items i on i.id = piu.pickup_item_id where piu.unit_id = product_units.id)
);
-- Claims are written only through app.claim_unit().
drop policy if exists claims_read on unit_claims;
create policy claims_read on unit_claims for select using (user_id = app.uid() or app.is_oversight());
drop policy if exists item_units_read on pickup_item_units;
create policy item_units_read on pickup_item_units for select using (
  exists (select 1 from pickup_items i where i.id = pickup_item_id)
);
-- Lifecycle rows carry custody org ids, so producers read outcomes only through
-- app.producer_unit_outcomes(); direct access follows the custody chain.
drop policy if exists lifecycle_read on lifecycle_events;
create policy lifecycle_read on lifecycle_events for select using (
  app.is_oversight()
  or exists (select 1 from pickup_item_units piu join pickup_items i on i.id = piu.pickup_item_id where piu.unit_id = lifecycle_events.unit_id)
);

-- Product registry: the producer's own records (plus read-only oversight).
drop policy if exists models_read on product_models;
create policy models_read on product_models for select using (
  producer_org_id in (select app.my_producer_org_ids()) or app.is_oversight()
  -- The claimant of a unit, and the recycler receiving it, may see its model (already public on /p/).
  -- Agents and hubs never read the registry.
  or exists (select 1 from product_units u join unit_claims c on c.unit_id = u.id
              where u.model_id = product_models.id and c.user_id = app.uid())
  or exists (select 1 from product_units u
               join pickup_item_units piu on piu.unit_id = u.id
               join pickup_items i on i.id = piu.pickup_item_id
               join pickup_requests p on p.id = i.pickup_id
              where u.model_id = product_models.id and p.lot_id is not null
                and p.principal_org_id in (select app.my_org_ids()))
);
drop policy if exists models_insert on product_models;
create policy models_insert on product_models for insert with check (
  producer_org_id in (select app.my_producer_org_ids())
  and app.has_org_role(producer_org_id, array['owner','operator']) and created_by = app.uid()
);
drop policy if exists batches_read on market_batches;
create policy batches_read on market_batches for select using (
  producer_org_id in (select app.my_producer_org_ids()) or app.is_oversight()
);
drop policy if exists batches_insert on market_batches;
create policy batches_insert on market_batches for insert with check (
  producer_org_id in (select app.my_producer_org_ids())
  and app.has_org_role(producer_org_id, array['owner','operator'])
  and created_by = app.uid() and status = 'draft'
  and exists (select 1 from product_models m where m.id = model_id and m.producer_org_id = market_batches.producer_org_id)
);

-- Lots.
drop policy if exists lots_read on lots;
create policy lots_read on lots for select using (
  agent_org_id in (select app.my_org_ids()) or principal_org_id in (select app.my_org_ids())
  or hub_org_id in (select app.my_org_ids()) or app.is_oversight()
);
drop policy if exists lots_insert on lots;
create policy lots_insert on lots for insert with check (
  agent_org_id in (select app.my_org_ids_with(array['owner','operator'])) and created_by = app.uid()
);
-- The recycler's approver marks a lot attested when issuing its attestation.
drop policy if exists lots_update on lots;
create policy lots_update on lots for update using (
  agent_org_id in (select app.my_org_ids_with(array['owner','operator']))
  or principal_org_id in (select app.my_org_ids_with(array['owner','operator','approver']))
  or hub_org_id in (select app.my_org_ids_with(array['owner','operator']))
);

-- Hub shipments: the hub that loads them, the recycler they go to, and oversight.
drop policy if exists shipments_read on hub_shipments;
create policy shipments_read on hub_shipments for select using (
  hub_org_id in (select app.my_org_ids()) or recycler_org_id in (select app.my_org_ids()) or app.is_oversight()
);
drop policy if exists shipments_insert on hub_shipments;
create policy shipments_insert on hub_shipments for insert with check (
  hub_org_id in (select app.my_org_ids_with(array['owner','operator'])) and created_by = app.uid() and status = 'loading'
  and recycler_org_id = app.hub_principal(hub_org_id)
);
drop policy if exists shipments_update on hub_shipments;
create policy shipments_update on hub_shipments for update using (
  hub_org_id in (select app.my_org_ids_with(array['owner','operator']))
  or recycler_org_id in (select app.my_org_ids_with(array['owner','operator']))
);

-- Custody events and weights: readable with the pickup or lot they belong to.
drop policy if exists custody_read on custody_events;
create policy custody_read on custody_events for select using (
  app.is_oversight()
  or (pickup_id is not null and exists (select 1 from pickup_requests p where p.id = pickup_id))
  or (lot_id is not null and exists (select 1 from lots l where l.id = lot_id))
  or (lot_id is not null and exists (select 1 from pickup_requests p where p.lot_id = custody_events.lot_id and p.requester_id = app.uid()))
);
drop policy if exists custody_insert on custody_events;
create policy custody_insert on custody_events for insert with check (actor_user_id = app.uid());

drop policy if exists weigh_read on weigh_records;
create policy weigh_read on weigh_records for select using (
  app.is_oversight()
  or (pickup_id is not null and exists (select 1 from pickup_requests p where p.id = pickup_id))
  or (lot_id is not null and exists (select 1 from lots l where l.id = lot_id))
);
drop policy if exists weigh_insert on weigh_records;
create policy weigh_insert on weigh_records for insert with check (
  recorded_by = app.uid() and exists (select 1 from app.my_org_ids_with(array['owner','operator']))
);

-- Attestations: issuer, oversight, the lot's agent, and citizens whose pickup was in the lot.
drop policy if exists attestations_read on attestations;
create policy attestations_read on attestations for select using (
  issuer_org_id in (select app.my_org_ids())
  or app.is_oversight()
  or exists (select 1 from lots l where l.id = lot_id and l.agent_org_id in (select app.my_org_ids()))
  or (status = 'issued' and exists (select 1 from pickup_requests p where p.lot_id = attestations.lot_id and p.requester_id = app.uid()))
);
drop policy if exists attestations_insert on attestations;
create policy attestations_insert on attestations for insert with check (
  app.has_org_role(issuer_org_id, array['owner','operator','approver']) and maker_id = app.uid() and status = 'draft'
);
drop policy if exists attestations_update on attestations;
create policy attestations_update on attestations for update using (
  app.has_org_role(issuer_org_id, array['owner','approver']) and status = 'draft'
) with check (checker_id = app.uid());

-- Incentives: payee and oversight read; created by the collecting agent.
drop policy if exists incentives_read on citizen_incentives;
create policy incentives_read on citizen_incentives for select using (
  payee_user_id = app.uid() or app.is_oversight()
);
drop policy if exists incentives_insert on citizen_incentives;
create policy incentives_insert on citizen_incentives for insert with check (
  exists (select 1 from pickup_requests p where p.id = pickup_id
          and p.requester_id = payee_user_id
          and p.assigned_agent_org_id in (select app.my_org_ids_with(array['owner','operator'])))
);

-- Flags: oversight reads all and updates status; organizations read their own.
drop policy if exists flags_read on compliance_flags;
create policy flags_read on compliance_flags for select using (
  app.is_oversight() or org_id in (select app.my_org_ids())
);
drop policy if exists flags_insert on compliance_flags; -- inserts go through app.raise_flag()
drop policy if exists flags_update on compliance_flags;
create policy flags_update on compliance_flags for update
  using (app.is_oversight()) with check (updated_by = app.uid());

drop policy if exists audit_insert on audit_log;
create policy audit_insert on audit_log for insert with check (actor_user_id is null or actor_user_id = app.uid());
drop policy if exists audit_read on audit_log;
create policy audit_read on audit_log for select using (app.user_role() = 'programme_operator');

-- sessions and handover_codes: no policies for ecosure_app (access only via functions).

-- -----------------------------------------------------------------------------
-- Reference data
-- -----------------------------------------------------------------------------

insert into waste_categories (code, name, data_bearing, has_battery, typical_unit_kg, sort_order) values
  ('mobile_phone',     'Mobile phone',                    true,  true,  0.180, 10),
  ('laptop',           'Laptop',                          true,  true,  2.200, 20),
  ('tablet',           'Tablet',                          true,  true,  0.500, 30),
  ('desktop_cpu',      'Desktop computer (CPU)',          true,  false, 8.000, 40),
  ('monitor_tv',       'Monitor or television',           false, false, 6.000, 50),
  ('printer',          'Printer or scanner',              false, false, 6.000, 60),
  ('small_appliance',  'Small appliance (mixer, iron, fan)', false, false, 2.000, 70),
  ('cables_accessories','Cables, chargers, accessories',  false, false, 0.300, 80)
on conflict (code) do update set
  name = excluded.name, data_bearing = excluded.data_bearing, has_battery = excluded.has_battery,
  typical_unit_kg = excluded.typical_unit_kg, sort_order = excluded.sort_order;

-- Indore Municipal Corporation: 85 wards (names to be loaded from the IMC ward register).
insert into wards (city, number, name)
select 'Indore', n, 'Ward ' || lpad(n::text, 2, '0') from generate_series(1, 85) as n
on conflict (city, number) do nothing;

insert into scheme_settings (key, value_num, description) values
  ('incentive_per_data_bearing_device', 50,  'State scheme incentive (INR) per intact data-bearing device, PRD v3 §17.3'),
  ('max_paid_pickups_per_month',        4,   'Paid pickups per payee per calendar month before incentives are held, PRD v3 §17.4'),
  ('handover_code_ttl_minutes',         720, 'Validity of a citizen handover code'),
  ('weight_tolerance_pct',              5,   'Sender/receiver weight tolerance outside monsoon, PRD v3 §16.4'),
  ('weight_tolerance_monsoon_pct',      8,   'Sender/receiver weight tolerance June–September'),
  ('unit_leakage_min_pct',              97,  'Minimum received/sent unit ratio before a leakage flag, PRD v3 §18.3'),
  ('storage_flag_pct',                  75,  'Share of storage period after which an undelivered lot is flagged')
on conflict (key) do update set value_num = excluded.value_num, description = excluded.description;

-- -----------------------------------------------------------------------------
-- WhatsApp Integration
-- -----------------------------------------------------------------------------

create table if not exists whatsapp_settings (
  id          int primary key default 1 check (id = 1),
  test_mode   boolean not null default true,
  test_numbers text[] not null default '{}'
);

-- Insert default row
insert into whatsapp_settings (id, test_mode, test_numbers) 
values (1, true, array['919876543210']) 
on conflict (id) do nothing;

create table if not exists whatsapp_messages (
  id          serial primary key,
  phone       text not null,
  role        text not null check (role in ('system', 'user', 'assistant', 'tool')),
  content     text not null,
  tool_call_id text,
  name        text,
  created_at  timestamptz not null default now()
);
create index if not exists whatsapp_messages_phone_idx on whatsapp_messages(phone);

-- RLS Policies
alter table whatsapp_settings enable row level security;
alter table whatsapp_messages enable row level security;

drop policy if exists whatsapp_settings_read on whatsapp_settings;
create policy whatsapp_settings_read on whatsapp_settings for select using (true);
drop policy if exists whatsapp_settings_update on whatsapp_settings;
create policy whatsapp_settings_update on whatsapp_settings for update using (app.user_role() = 'programme_operator');

drop policy if exists whatsapp_messages_read on whatsapp_messages;
create policy whatsapp_messages_read on whatsapp_messages for select using (app.user_role() = 'programme_operator');
-- Allow insertion without role check to let the webhook insert messages
drop policy if exists whatsapp_messages_insert on whatsapp_messages;
create policy whatsapp_messages_insert on whatsapp_messages for insert with check (true);

-- -----------------------------------------------------------------------------
-- Green Points and Rewards System
-- -----------------------------------------------------------------------------

create table if not exists reward_catalogue (
  key           text primary key check (key ~ '^[a-z_]{2,40}$'),
  label         text not null,
  description   text not null,
  points_cost   int not null check (points_cost > 0),
  reward_type   text not null check (reward_type in ('partner_voucher','social_impact','platform_benefit')),
  icon_emoji    text not null default 'gift',
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
  ('coffee_voucher',    'CCD Coffee Voucher',    'One regular hot or cold coffee at Café Coffee Day', 200,  'partner_voucher',   'coffee', true, 10),
  ('amazon_coupon',     'Amazon ₹50 Voucher',    '₹50 off on your next Amazon shopping order',        500,  'partner_voucher',   'shopping_bag', true, 20),
  ('plant_tree',        'Plant a Tree',          'One native sapling planted & tagged via SankalpTaru', 100, 'social_impact',    'tree', true, 30),
  ('school_donation',   'School E-Learning Kit', 'Donate to digital literacy for underprivileged kids',150, 'social_impact',    'education', true, 40),
  ('priority_slot',     'Priority Pickup Slot',  'Jump to immediate priority on your next booking',    75,  'platform_benefit', 'zap', true, 50),
  ('ecosure_pro_badge', 'EcoSure Pro Badge',     'Verified eco-champion badge on your profile',        1000,'platform_benefit', 'award', true, 60)
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


