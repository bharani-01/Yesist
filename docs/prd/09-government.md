# EcoSure — SPCB (Government) PRD

**Role:** `spcb_officer`  
**Phase:** 1 (verification and flags), 2 (monitoring and inspection)  
**Last updated:** 2026-09-27 (v2)

---

## 1. Summary

The SPCB sponsors EcoSure and uses it to monitor the formal e-waste chain. SPCB users see honest aggregates, compliance flags, and attestations, and can add inspection notes. They cannot change operational records. Every view states that it covers the formal EcoSure network only.

What changed from v1: SPCB moves from an optional phase-4 viewer to a core stakeholder; the revenue and profitability view is removed; offline inspection packs, state-language reports, and inspection notes are added; platform approval is separated from Board authorization.

---

## 2. Features

### G1 Onboarding — Phase 1
SPCB nominates officers. Accounts are scoped to the SPCB's state and regional office.

### G2 Formal-network aggregates — Phase 2
**Acceptance criteria**
- Tonnes collected, received at hubs, and attested at recyclers, by corridor, district, and month.
- Organization counts by type and status.
- Every chart and export carries the label "Formal EcoSure network only. Excludes informal channels."
- Shows the share of weight that is self-reported versus received-and-weighed by a second party.

### G3 Compliance flags — Phase 1
**Acceptance criteria**
- Flags: dwell exceeded, attestation missing past SLA, weight anomaly, capacity exceeded, registration expired, duplicate hash.
- Each flag shows severity, age, and the organization's public name.
- Read-only.

### G4 Registration check — Phase 1
**Acceptance criteria**
- For each organization, shows statutory registrations (CPCB/SPCB) and platform status side by side, with clear labels.
- SPCB can mark a statutory registration as verified or disputed; this raises a flag for the operator.

### G5 Inspection notes — Phase 2
**Acceptance criteria**
- Append-only notes on an organization or flag, with the SPCB reference number.
- Visible to operator and the SPCB; not to the organization unless the SPCB chooses to share.

### G6 Offline inspection pack — Phase 2
**Acceptance criteria**
- Download for a district: organization list, open flags, recent attestations.
- PDF and CSV in English and the state language.
- Stamped with generation time and data cut-off.

### G7 Public verification — Phase 1
Same public page as [07-professional-recycler.md](./07-professional-recycler.md) R5.

### G8 Feedback — Phase 1
Structured feedback to the programme operator with category and priority.

### G9 Lawful data requests — Phase 2
**Acceptance criteria**
- Requests for data beyond aggregates (for example, RTI or an investigation) are logged with legal basis and handled by the operator.
- Released data is redacted according to the documented policy.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, stale data warning (data older than 24 hours).

---

## 4. Out of scope
- Editing pickups, lots, settlements, or attestations
- Formal notices and orders (future, only with legal process defined)
- Organization bank details and individual settlement amounts
