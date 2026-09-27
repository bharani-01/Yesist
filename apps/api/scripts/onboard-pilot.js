// Onboards organisations, members, agreements, and rate cards from an operator-supplied JSON file.
// Idempotent: re-running updates existing records instead of duplicating them.
// Usage: npm run onboard:pilot -- path/to/onboarding.json
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { z } from 'zod';
import { hashPassword } from '../src/core/security/password.js';

const here = dirname(fileURLToPath(import.meta.url));
const file = resolve(process.argv[2] ?? resolve(here, 'pilot-onboarding.example.json'));
const password = process.env.PILOT_ACCOUNT_PASSWORD;
if (!process.env.DATABASE_ADMIN_URL || !password || password.length < 10) {
  console.error('DATABASE_ADMIN_URL and PILOT_ACCOUNT_PASSWORD (10+ characters) must be set.');
  process.exit(1);
}

const member = z.object({
  email: z.email().toLowerCase(),
  fullName: z.string().min(2),
  orgRole: z.enum(['owner', 'operator', 'finance', 'approver', 'viewer']),
});
const schema = z.object({
  recycler: z.object({
    name: z.string().min(2),
    registrationNo: z.string().min(3),
    registrationValidUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    capacityTonnesPerMonth: z.number().positive(),
    members: z.array(member).min(2),
    rateCard: z.array(z.object({
      categoryCode: z.string(),
      pricePerUnit: z.number().min(0).optional(),
      pricePerKg: z.number().min(0).optional(),
    })),
  }),
  agents: z.array(z.object({
    name: z.string().min(2),
    orgType: z.enum(['local_shop', 'informal_collector', 'drop_point']),
    tier: z.enum(['micro', 'standard']),
    wardNumbers: z.array(z.number().int().positive()).min(1),
    maxStorageDays: z.number().int().min(1).max(180),
    directionRef: z.string().optional(),
    members: z.array(member).min(1),
  })),
  officers: z.array(z.object({
    email: z.email().toLowerCase(),
    fullName: z.string().min(2),
    role: z.enum(['ulb_officer', 'spcb_officer', 'cpcb_officer', 'programme_operator']),
  })),
  // Recycler-owned regional hubs: custody only, working for the recycler above.
  hubs: z.array(z.object({
    name: z.string().min(2),
    maxStorageDays: z.number().int().min(1).max(180),
    members: z.array(member).min(1),
  })).default([]),
  // Manufacturers and importers: registry only, never part of the custody chain.
  producers: z.array(z.object({
    name: z.string().min(2),
    registrationNo: z.string().min(3),
    members: z.array(member).min(1),
  })).default([]),
  citizens: z.array(z.object({
    email: z.email().toLowerCase(),
    fullName: z.string().min(2),
    phone: z.string().regex(/^[6-9]\d{9}$/),
  })).default([]),
});

const config = schema.parse(JSON.parse(await readFile(file, 'utf8')));
const passwordHash = await hashPassword(password);
const client = new pg.Client({ connectionString: process.env.DATABASE_ADMIN_URL });
await client.connect();

async function upsertUser({ email, fullName }, role) {
  const { rows } = await client.query(
    `insert into users (email, full_name, password_hash, platform_role) values ($1,$2,$3,$4)
     on conflict (email) do update set full_name = excluded.full_name, platform_role = excluded.platform_role
     returning id`,
    [email, fullName, passwordHash, role],
  );
  return rows[0].id;
}

async function upsertOrg(o) {
  const { rows } = await client.query(
    `insert into organizations (org_type, name, registration_no, registration_valid_until, capacity_tonnes_per_month, tier)
     values ($1,$2,$3,$4,$5,$6)
     on conflict (org_type, lower(name)) do update set
       registration_no = excluded.registration_no, registration_valid_until = excluded.registration_valid_until,
       capacity_tonnes_per_month = excluded.capacity_tonnes_per_month, tier = excluded.tier
     returning id`,
    [o.orgType, o.name, o.registrationNo ?? null, o.registrationValidUntil ?? null, o.capacity ?? null, o.tier ?? 'standard'],
  );
  return rows[0].id;
}

async function addMembers(orgId, members) {
  for (const m of members) {
    const userId = await upsertUser(m, 'org_member');
    await client.query(
      `insert into organization_members (org_id, user_id, org_role) values ($1,$2,$3)
       on conflict (org_id, user_id) do update set org_role = excluded.org_role`,
      [orgId, userId, m.orgRole],
    );
  }
}

try {
  await client.query('begin');
  const r = config.recycler;
  const recyclerId = await upsertOrg({
    orgType: 'pro_recycler', name: r.name, registrationNo: r.registrationNo,
    registrationValidUntil: r.registrationValidUntil, capacity: r.capacityTonnesPerMonth,
  });
  await addMembers(recyclerId, r.members);
  for (const rate of r.rateCard) {
    await client.query(
      `insert into rate_cards (recycler_org_id, category_code, price_per_unit, price_per_kg, effective_from)
       values ($1,$2,$3,$4,current_date)
       on conflict (recycler_org_id, category_code, effective_from) do update
         set price_per_unit = excluded.price_per_unit, price_per_kg = excluded.price_per_kg`,
      [recyclerId, rate.categoryCode, rate.pricePerUnit ?? null, rate.pricePerKg ?? null],
    );
  }

  const { rows: categories } = await client.query('select code from waste_categories where active');
  for (const a of config.agents) {
    const agentId = await upsertOrg({ orgType: a.orgType, name: a.name, tier: a.tier });
    await addMembers(agentId, a.members);
    await client.query(
      `insert into agent_service_wards (agent_org_id, ward_id)
       select $1, id from wards where city = 'Indore' and number = any($2)
       on conflict do nothing`,
      [agentId, a.wardNumbers],
    );
    await client.query(
      `insert into agent_agreements (principal_org_id, agent_org_id, categories, max_storage_days, valid_from, valid_until, direction_ref)
       values ($1,$2,$3,$4, date_trunc('year', current_date)::date, (date_trunc('year', current_date) + interval '2 years')::date, $5)
       on conflict (principal_org_id, agent_org_id, valid_from) do update
         set categories = excluded.categories, max_storage_days = excluded.max_storage_days,
             direction_ref = excluded.direction_ref, status = 'active'`,
      [recyclerId, agentId, categories.map((c) => c.code), a.maxStorageDays, a.directionRef ?? null],
    );
  }

  for (const h of config.hubs) {
    const hubId = await upsertOrg({ orgType: 'regional_hub', name: h.name });
    await addMembers(hubId, h.members);
    await client.query(
      `insert into agent_agreements (principal_org_id, agent_org_id, categories, max_storage_days, valid_from, valid_until)
       values ($1,$2,$3,$4, date_trunc('year', current_date)::date, (date_trunc('year', current_date) + interval '2 years')::date)
       on conflict (principal_org_id, agent_org_id, valid_from) do update
         set categories = excluded.categories, max_storage_days = excluded.max_storage_days, status = 'active'`,
      [recyclerId, hubId, categories.map((c) => c.code), h.maxStorageDays],
    );
  }

  for (const p of config.producers) {
    const producerId = await upsertOrg({ orgType: 'producer', name: p.name, registrationNo: p.registrationNo });
    await addMembers(producerId, p.members);
  }

  for (const o of config.officers) await upsertUser(o, o.role);
  for (const c of config.citizens) {
    await client.query(
      `insert into users (email, phone, full_name, password_hash, platform_role) values ($1,$2,$3,$4,'citizen')
       on conflict (email) do update set phone = excluded.phone, full_name = excluded.full_name`,
      [c.email, c.phone, c.fullName, passwordHash],
    );
  }
  await client.query('commit');
  console.log(`Onboarded from ${file}`);
  console.log('Accounts:', [
    ...config.citizens, ...r.members, ...config.agents.flatMap((a) => a.members), ...config.hubs.flatMap((h) => h.members),
    ...config.producers.flatMap((p) => p.members), ...config.officers,
  ].map((m) => m.email).join(', '));
} catch (err) {
  await client.query('rollback');
  console.error('Onboarding failed:', err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
