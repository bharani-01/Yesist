export const API_PREFIX = '/api/v1';

export const SESSION = Object.freeze({
  ttlHours: 12,
});

export const AGENT_ORG_TYPES = Object.freeze(['local_shop', 'informal_collector', 'drop_point']);
export const RECYCLER_ORG_TYPES = Object.freeze(['pro_recycler']);
export const PRODUCER_ORG_TYPES = Object.freeze(['producer']);
export const HUB_ORG_TYPES = Object.freeze(['regional_hub']);

// Staff permission matrix inside an organisation. Every member can read; writes need one of these.
//   work    day-to-day custody and registry work (accept, collect, seal, dispatch, receive, register)
//   draft   prepare an attestation for the checker
//   approve maker-checker sign-off (issue attestations, place batches on the market)
//   money   rate cards, material payments, incentive status
//   manage  the team page (invite, change roles, remove staff)
export const ORG_ROLES = Object.freeze(['owner', 'operator', 'approver', 'finance', 'viewer']);
export const STAFF = Object.freeze({
  work: Object.freeze(['owner', 'operator', 'approver']),
  draft: Object.freeze(['owner', 'operator', 'approver']),
  approve: Object.freeze(['owner', 'operator', 'approver']),
  money: Object.freeze(['owner', 'finance', 'operator']),
  manage: Object.freeze(['owner']),
  read: ORG_ROLES,
});

export const UNITS_PER_REQUEST = 2000;
export const OVERSIGHT_ROLES = Object.freeze(['ulb_officer', 'spcb_officer', 'cpcb_officer', 'programme_operator']);

// Maker-checker for attestations (PRD v3 §8.2, §8.6 rule 6).
export const ATTESTATION_MAKER_ROLES = STAFF.draft;
export const ATTESTATION_CHECKER_ROLES = STAFF.approve;

export const FLAG_UPDATE_ROLES = Object.freeze(['spcb_officer', 'cpcb_officer', 'programme_operator']);

export const IMEI_CATEGORIES = Object.freeze(['mobile_phone', 'tablet']);

export const JOBS = Object.freeze({
  storageDeadlineScanMs: 10 * 60 * 1000,
});
