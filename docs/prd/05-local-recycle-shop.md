# EcoSure — Local Recycle Shop Dashboard PRD

**Role:** `local_shop`  
**Organization type:** `local_shop`  
**Phase focus:** Phase 1 (ops), Phase 3 (settlements depth)  
**Last updated:** 2026-09-26

---

## 1. Summary

Local recycle shops onboard, manage inbound consumer/business pickups, record collection, transfer lots to regional hubs, view operational stats, access training, and see their own payout/settlement data.

---

## 2. Features

### F-S1 Org registration and profile — Phase 0–1

**Description:** Apply as a Local Recycle Shop; showcase services/capabilities; await approval.

**User story:** As a shop owner, I want a verified profile so consumers and hubs can find me.

**Acceptance criteria:**
- Registration captures name, GSTIN (if applicable), address/location, capabilities, docs.
- Status `pending` until Platform Admin approves → `approved`.
- Pending orgs cannot accept pickups.
- Profile editable; critical identity changes may re-trigger review.

**Data:** `Organization`, `Location`, `OrganizationMember`  
**Permissions:** Org members; approval by `platform_admin`

---

### F-S2 Nearby pickup demand — Phase 1

**Description:** View pickup requests in service radius (and assigned to this shop).

**User story:** As a shop operator, I want to see nearby pickup requests so I can grow volume.

**Acceptance criteria:**
- List `requested` pickups within radius + all assigned to this org.
- Show category summary, preferred window, approximate locality (not full address until accepted — preferred privacy default).
- After accept, full address visible to assigned shop.
- Empty state when none available.

**Data:** `PickupRequest`  
**Permissions:** Radius + assigned only; never other shops’ accepted jobs

---

### F-S3 Manage pickups and schedule — Phase 1

**Description:** Accept, schedule, collect, cancel (with rules), record weight.

**User story:** As a shop operator, I want to manage my pickup board so routes stay efficient.

**Acceptance criteria:**
- Transitions per [10-workflows.md](./10-workflows.md).
- Record `net_weight_kg` (or item weights) on `collected`.
- Create `CollectionEvent` for each transition.
- Cannot modify another org’s pickups (403).

**Data:** `PickupRequest`, `CollectionEvent`, `PickupItem`  
**Permissions:** Assigned org operators

---

### F-S4 Collection and processing stats + recommendations — Phase 1

**Description:** Own-org KPIs: pickups completed, kg collected, completion rate; rule-based tips.

**User story:** As a shop owner, I want operational stats so I can improve.

**Acceptance criteria:**
- Metrics computed from this org’s data only.
- Recommendations e.g. “High cancel rate — tighten scheduling windows”.
- Loading/empty/error states; no other-org leakage.

**Data:** Aggregates scoped to `organization_id`  
**Permissions:** Org members

---

### F-S5 Educational / training materials — Phase 1

**Description:** Access content tagged for `local_shop`.

**Acceptance criteria:**
- List/detail published training content.
- Empty state handled.

**Data:** `EducationalContent`  
**Permissions:** Read

---

### F-S6 Platform aggregate impact (safe) — Phase 1

**Description:** High-level anonymized platform impact (total kg, total users) — **not** other orgs’ financials.

**User story:** As a shop, I want to see collective impact so I feel part of the network.

**Acceptance criteria:**
- Only aggregate metrics approved for partner visibility.
- Explicitly excludes payouts/revenues of other parties.
- Clarifies the draft PRD “overall statistics” ambiguity.

**Data:** Platform aggregates  
**Permissions:** Approved partner orgs

---

### F-S7 Payout and financial statistics — Phase 1 stub / Phase 3 full

**Description:** View settlements where this shop is payee (from hub).

**User story:** As a shop owner, I want clear payout visibility so I trust the platform.

**Acceptance criteria:**
- Phase 1: placeholder module listing “Settlements available after hub transfers” if none.
- Phase 3: list settlements, lines, statuses, amounts; export CSV.
- Disputes openable within window.
- Cannot see hub↔recycler settlements except shop’s lines.

**Data:** `Settlement`, `SettlementLine`  
**Permissions:** Party only

---

### F-S8 Transfer to Regional Hub — Phase 1

**Description:** Batch collected pickups into lots and transfer to hub.

**Acceptance criteria:**
- Create `MaterialLot`; initiate `Transfer` to linked/approved hub.
- Weight variance handling on receive (hub side).
- Timeline visible on lot.

**Data:** `MaterialLot`, `Transfer`  
**Permissions:** Owning shop

---

## 3. Screen checklist

| Screen | States |
|--------|--------|
| Onboarding / profile | L/S/Err/pending gate |
| Pickup board | L/E/S/Err/403 |
| Pickup detail | L/S/Err |
| Stats | L/E/S/Err |
| Education | L/E/S |
| Impact aggregates | L/S/Err |
| Settlements | L/E/S/Err |
| Lots / transfers | L/E/S/Err |

---

## 4. Clarifications vs original draft

- “Overall waste collection statistics of the platform” = **aggregate impact only**.
- “Payout and financial statistics of the platform” = **this shop’s settlements**, not platform-wide P&L.
