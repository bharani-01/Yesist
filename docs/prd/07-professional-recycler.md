# EcoSure — Professional Recycler Dashboard PRD

**Role:** `pro_recycler`  
**Organization type:** `pro_recycler`  
**Phase focus:** Phase 3 (core), Phase 4 (EPR support packs)  
**Last updated:** 2026-09-26

---

## 1. Summary

Professional recyclers receive lots from regional hubs (and eligible businesses), process e-waste, issue certificates, settle with upstream partners, and supply EPR compliance documentation support for manufacturers and shops.

---

## 2. Features

### F-R1 Registration and profile — Phase 0 / enable Phase 3

**Description:** Register recycler profile, authorizations, capabilities (precious metal recovery, etc.), locations.

**Acceptance criteria:**
- Requires Platform Admin approval and authorization document references.
- Profile searchable by hubs/manufacturers when approved.
- Pending cannot receive transfers.

**Data:** `Organization`, `Location`, docs  
**Permissions:** Org + admin approve

---

### F-R2 Nearby hubs / business intake — Phase 3

**Description:** View inbound transfer requests and eligible business pickup assignments.

**Acceptance criteria:**
- List transfers targeting this recycler.
- Accept/receive flow with weight verification.
- Variance beyond tolerance → dispute.

**Data:** `Transfer`, `PickupRequest`  
**Permissions:** Party only

---

### F-R3 Manage pickups / schedules — Phase 3

**Description:** Schedule direct bulk collections where assigned; manage processing queue.

**Acceptance criteria:**
- State transitions logged.
- Processing queue by lot status.

**Data:** `PickupRequest`, `MaterialLot`  
**Permissions:** Recycler org

---

### F-R4 Ops stats and recommendations — Phase 3

**Description:** Throughput, certificate lag, recovery metrics (if entered), dispute rate.

**Acceptance criteria:**
- Own-org metrics only + safe platform aggregates.
- Recommendations rule-based.

**Data:** Aggregates  
**Permissions:** Org

---

### F-R5 Financial statistics — Phase 3

**Description:** Settlements where recycler is payer (to hubs/businesses).

**Acceptance criteria:**
- Payables list; post/pay statuses.
- No visibility into unrelated hubs’ shop settlements.

**Data:** `Settlement`  
**Permissions:** Party

---

### F-R6 Settlements with hubs and businesses — Phase 3

**Description:** Create settlements for processed lots.

**Acceptance criteria:**
- Lines reference lots/certificates where applicable.
- Idempotent posting; audit trail.
- Counterparties see matching payee records.

**Data:** `Settlement`, `SettlementLine`  
**Permissions:** Recycler finance-capable users

---

### F-R7 Platform overall statistics (safe) — Phase 3

**Description:** Anonymized platform impact metrics for partners.

**Acceptance criteria:**
- Same aggregate policy as shops/hubs.
- No cross-org financials.

---

### F-R8 Certificates and documentation — Phase 3

**Description:** Issue immutable certificates for processed lots.

**User story:** As a recycler, I want to certify processing so manufacturers and regulators trust the chain.

**Acceptance criteria:**
- Unique `certificate_number`; document stored; content hash saved.
- Immutable; corrections via new cert linked to previous.
- Visible to lot parties and attributed manufacturer; government aggregate counts.
- Download requires authZ.

**Data:** `Certificate`  
**Permissions:** Issuer write; authorized parties read

---

### F-R9 EPR compliance support packs — Phase 4

**Description:** Provide documentation packages for manufacturers and local shops to meet EPR obligations.

**User story:** As a recycler, I want to share EPR evidence packs so obligated parties can file confidently.

**Acceptance criteria:**
- Generate pack linking certificates, lot weights, period summary for a requesting manufacturer/shop.
- Access only if relationship/attribution exists.
- Actions audited.
- Disclaimer: support ≠ legal filing completion ([12-nfr-security.md](./12-nfr-security.md)).

**Data:** `ComplianceReport` (type support pack), `Certificate`  
**Permissions:** Issuer + authorized recipient org

---

## 3. Screen checklist

Profile, inbound transfers, lot processing, certificate issue/history, settlements, EPR packs, stats, education — with full UI states.

---

## 4. Clarifications vs original draft

- “Overall statistics” and “payout statistics of the platform” scoped to **own financials + safe aggregates**.
- EPR for businesses/shops is a **documentation support** feature, not a substitute for statutory portals.
