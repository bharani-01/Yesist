import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '../../config/env.js';

const onboardingFile = resolve(dirname(fileURLToPath(import.meta.url)), '../../../scripts/pilot-onboarding.example.json');

const ROLE_LABELS = { owner: 'Owner', operator: 'Operator', approver: 'Approver', finance: 'Finance', viewer: 'Viewer' };
const READ_ONLY = 'Read-only access to the organisation';
const STAFF_DESCRIPTIONS = {
  agent: { owner: 'Accepts, collects, seals, and dispatches pickups', operator: 'Accepts, collects, seals, and dispatches pickups', finance: 'Material payments, read-only', viewer: READ_ONLY },
  recycler: { owner: 'Receives lots and signs off attestations', operator: 'Receives lots and drafts attestations', approver: 'Issues attestations as the checker', finance: 'Rate cards and payments, read-only', viewer: READ_ONLY },
  hub: { owner: 'Records arrivals and ships consolidated loads', operator: 'Records arrivals and ships consolidated loads', viewer: READ_ONLY },
  producer: { owner: 'Registers models, batches, and unit QR labels', operator: 'Registers models, batches, and unit QR labels', approver: 'Places batches on the market', viewer: READ_ONLY },
};
const WORKSPACE_LABELS = { agent: 'Collection agent', recycler: 'Recycler', hub: 'Regional hub', producer: 'Manufacturer' };
const OFFICER_DESCRIPTIONS = {
  spcb_officer: 'Programme overview and flag triage',
  cpcb_officer: 'Programme overview and flag triage',
  programme_operator: 'Programme overview and flag triage',
  ulb_officer: 'Programme overview, read-only flags',
};

const staff = (workspace, members) => members
  .filter((m) => m.orgRole !== 'finance' && m.orgRole !== 'viewer')
  .map((m) => ({
    email: m.email,
    workspace,
    label: `${WORKSPACE_LABELS[workspace]} · ${ROLE_LABELS[m.orgRole]}`,
    description: STAFF_DESCRIPTIONS[workspace][m.orgRole] ?? READ_ONLY,
  }));

function load() {
  const config = JSON.parse(readFileSync(onboardingFile, 'utf8'));
  return [
    ...(config.citizens ?? []).map((c) => ({ email: c.email, workspace: 'citizen', label: 'Citizen', description: 'Books pickups and shares the handover code' })),
    ...config.agents.flatMap((a) => staff('agent', a.members)),
    ...staff('recycler', config.recycler.members),
    ...(config.hubs ?? []).flatMap((h) => staff('hub', h.members)),
    ...(config.producers ?? []).flatMap((p) => staff('producer', p.members)),
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
