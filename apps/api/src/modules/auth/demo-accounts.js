import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '../../config/env.js';

const onboardingFile = resolve(dirname(fileURLToPath(import.meta.url)), '../../../scripts/pilot-onboarding.example.json');

const ORG_ROLE_DESCRIPTIONS = {
  owner: 'Accepts, collects, seals, and dispatches pickups',
  operator: 'Receives lots and drafts attestations',
  approver: 'Approves and issues attestations',
  finance: 'Views payouts',
  viewer: 'Read-only',
};
const OFFICER_DESCRIPTIONS = {
  spcb_officer: 'Programme overview and flag triage',
  cpcb_officer: 'Programme overview and flag triage',
  programme_operator: 'Programme overview and flag triage',
  ulb_officer: 'Programme overview, read-only flags',
};

function load() {
  const config = JSON.parse(readFileSync(onboardingFile, 'utf8'));
  return [
    ...(config.citizens ?? []).map((c) => ({ email: c.email, workspace: 'citizen', label: 'Citizen', description: 'Books pickups and shares the handover code' })),
    ...config.agents.flatMap((a) => a.members.map((m) => ({ email: m.email, workspace: 'agent', label: 'Collection agent', description: ORG_ROLE_DESCRIPTIONS[m.orgRole] }))),
    ...config.recycler.members.map((m) => ({
      email: m.email,
      workspace: 'recycler',
      label: m.orgRole === 'approver' ? 'Recycler checker' : 'Recycler maker',
      description: ORG_ROLE_DESCRIPTIONS[m.orgRole],
    })),
    ...(config.producers ?? []).flatMap((p) => p.members.map((m) => ({
      email: m.email,
      workspace: 'producer',
      label: m.orgRole === 'approver' ? 'Manufacturer approver' : 'Manufacturer',
      description: m.orgRole === 'approver' ? 'Places batches on the market' : 'Registers models, batches, and unit QR labels',
    }))),
    ...config.officers.map((o) => ({
      email: o.email,
      workspace: 'oversight',
      label: o.role === 'ulb_officer' ? 'City officer' : 'Pollution control board officer',
      description: OFFICER_DESCRIPTIONS[o.role],
    })),
  ];
}

const accounts = env.demoLogin ? Object.freeze(load()) : null;

/** Local test accounts; null unless demo login is explicitly enabled outside production. */
export function demoAccounts() {
  return accounts && { password: env.demoPassword, accounts };
}
