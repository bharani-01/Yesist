# EcoSure — Regional Hub Dashboard PRD

**Role:** `regional_hub`  
**Organization type:** `regional_hub`  
**Phase focus:** Phase 1  
**Last updated:** 2026-09-26

---

## 1. Summary

Regional hubs aggregate e-waste from local shops (and eligible businesses), manage inbound transfers and pickups, settle with shops, and view regional/own operational and financial stats.

---

## 2. Features

### F-H1 Registration and profile — Phase 0–1

**Description:** Register hub capabilities, coverage region, locations; admin approval required.

**Acceptance criteria:**
- Same approval gate as other commercial orgs.
- Profile shows coverage states/cities and capacity notes.
- Pending hubs cannot receive transfers or accept pickups.

**Data:** `Organization`, `Location`  
**Permissions:** Org + platform_admin approve

---

### F-H2 Nearby shops and inbound demand — Phase 1

**Description:** View linked/nearby approved shops and pickup/transfer requests involving the hub.

**User story:** As a hub lead, I want visibility of inbound supply so I plan capacity.

**Acceptance criteria:**
- List shops in region + transfers `initiated`/`in_transit` to this hub.
- Business pickup requests assigned to hub (if any) visible.
- No access to unrelated regions’ detailed ops.

**Data:** `Organization`, `Transfer`, `PickupRequest`  
**Permissions:** Scoped to hub region / parties

---

### F-H3 Manage pickups and schedules — Phase 1

**Description:** Accept/schedule hub-level pickups (bulk/business) and coordinate shop transfers.

**Acceptance criteria:**
- Hub can be `assigned_org` on eligible pickups.
- State machine enforced; events logged.
- Shop-originated transfers received via receive action.

**Data:** `PickupRequest`, `Transfer`, `CollectionEvent`  
**Permissions:** Hub org

---

### F-H4 Ops stats and recommendations — Phase 1

**Description:** Kg inbound/outbound, dwell time, variance disputes rate; tips for ops improvement.

**Acceptance criteria:**
- Metrics from hub-scoped lots/transfers only.
- Empty/loading/error handled.

**Data:** Aggregates on `MaterialLot`, `Transfer`  
**Permissions:** Hub members

---

### F-H5 Payout / financial statistics — Phase 3 (UI shell Phase 1)

**Description:** Settlements where hub is payer (to shops) or payee (from recycler).

**Acceptance criteria:**
- Dual views: payables vs receivables.
- Draft → posted → paid lifecycle.
- No platform-wide P&L.

**Data:** `Settlement`  
**Permissions:** Hub party only

---

### F-H6 Settlements with local shops and businesses — Phase 3

**Description:** Create/post settlements for collected/transferred material.

**User story:** As a hub, I want fair shop compensation so partners stay.

**Acceptance criteria:**
- Generate draft from eligible lots/rate card.
- Shop sees corresponding payee settlement.
- Dispute path available; audit all posts.
- Defaults OQ-01–05.

**Data:** `Settlement`, `SettlementLine`, rate card config  
**Permissions:** Hub finance/admin members (Phase 5 sub-roles; until then all hub members with write)

---

### F-H7 Overall / regional statistics — Phase 1

**Description:** Hub region impact + safe platform aggregates.

**Acceptance criteria:**
- Regional: kg through hub, shop count connected, open disputes.
- Platform aggregates anonymized.
- Government-style PII not exposed.

**Data:** Aggregates  
**Permissions:** Hub + approved aggregate APIs

---

### F-H8 Outbound transfer to Professional Recycler — Phase 3

**Description:** Transfer lots downstream to recyclers.

**Acceptance criteria:**
- Select approved recycler; initiate transfer with manifest.
- Track receive/process status once recycler updates.
- Phase 1 may allow “hold inventory” without recycler if Phase 3 not live.

**Data:** `Transfer`, `MaterialLot`  
**Permissions:** Hub

---

## 3. Screen checklist

Onboarding, inbound board, transfer receive, lot inventory, stats, settlements payables/receivables, partner shop list, education (shared), aggregates — each with L/E/S/Err/401/403 as applicable.

---

## 4. Clarifications vs original draft

- Hub “payout and financial statistics of the platform” means **hub’s own financials**, not EcoSure corporate finance.
- Settlements with shops are a first-class hub responsibility in Phase 3.
