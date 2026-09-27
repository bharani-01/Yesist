export const API_PREFIX = '/api/v1';

export const SESSION = Object.freeze({
  cookieName: 'ecosure_session',
  ttlHours: 12,
});

export const AGENT_ORG_TYPES = Object.freeze(['local_shop', 'informal_collector', 'drop_point']);
export const RECYCLER_ORG_TYPES = Object.freeze(['pro_recycler']);
export const PRODUCER_ORG_TYPES = Object.freeze(['producer']);
export const HUB_ORG_TYPES = Object.freeze(['regional_hub']);

// Staff permission matrix inside an organisation (owner, operator, approver, finance, viewer).
export const STAFF = Object.freeze({
  work: Object.freeze(['owner', 'operator']),
  approve: Object.freeze(['owner', 'approver']),
  read: Object.freeze(['owner', 'operator', 'approver', 'finance', 'viewer']),
});

export const UNITS_PER_REQUEST = 2000;
export const OVERSIGHT_ROLES = Object.freeze(['ulb_officer', 'spcb_officer', 'cpcb_officer', 'programme_operator']);

// Maker-checker for attestations (PRD v3 §8.2, §8.6 rule 6).
export const ATTESTATION_MAKER_ROLES = Object.freeze(['owner', 'operator', 'approver']);
export const ATTESTATION_CHECKER_ROLES = Object.freeze(['owner', 'approver']);

export const FLAG_UPDATE_ROLES = Object.freeze(['spcb_officer', 'cpcb_officer', 'programme_operator']);

export const IMEI_CATEGORIES = Object.freeze(['mobile_phone', 'tablet']);

export const JOBS = Object.freeze({
  storageDeadlineScanMs: 10 * 60 * 1000,
});
