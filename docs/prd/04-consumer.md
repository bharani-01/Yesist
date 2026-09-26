# EcoSure — Consumer Dashboard PRD

**Role:** `consumer`  
**Phase focus:** Phase 1 (core), Phase 2 (EcoPoints + WhatsApp)  
**Last updated:** 2026-09-26

---

## 1. Summary

Consumers manage electronic devices, schedule and track e-waste pickups, learn proper disposal, find nearby shops, earn EcoPoints, and receive WhatsApp updates.

---

## 2. Features

### F-C1 Device inventory — Phase 1

**Description:** Add and manage personal electronic devices; track status through disposal.

**User story:** As a consumer, I want to list my devices so I can plan responsible disposal.

**Acceptance criteria:**
- Create/edit/archive device with category, brand, model, optional year, status.
- Status transitions: `in_use` → `idle` → `ready_to_dispose` → `scheduled` → `collected` → `recycled`.
- Linking a device to a pickup sets status `scheduled`; on collection → `collected`.
- Forbidden: cannot view another user’s devices.
- Empty state: CTA “Add your first device”.

**Data:** `Device`  
**Permissions:** Owner only

---

### F-C2 Waste generation stats and recommendations — Phase 1

**Description:** Personal stats (devices by status, kg collected if known, pickups completed) and rule-based tips.

**User story:** As a consumer, I want to see my impact so I stay motivated.

**Acceptance criteria:**
- Dashboard shows counts and last-90-day pickup summary from real data.
- Recommendations are deterministic rules (e.g., “3 idle devices — schedule a pickup”).
- Loading and empty states defined; error shows retry.
- No fake/demo numbers in production builds.

**Data:** Aggregates from `Device`, `PickupRequest`, `CollectionEvent`  
**Permissions:** Own data only

---

### F-C3 Educational resources — Phase 1

**Description:** Browse published tips for segregation and e-waste safety.

**User story:** As a consumer, I want clear guidance so I dispose correctly.

**Acceptance criteria:**
- List/filter published `EducationalContent` with audience including `consumer`.
- Detail view with title/body; empty if none published.
- Content managed by Platform Admin.

**Data:** `EducationalContent`  
**Permissions:** Read published

---

### F-C4 Nearby recycling centers / shops — Phase 1

**Description:** Discover approved Local Shops (and later hubs) near the user.

**User story:** As a consumer, I want nearby drop-off options so I can act quickly.

**Acceptance criteria:**
- Results based on user location/pincode and org `Location.geo` + service radius.
- Only `approved` orgs; show name, distance, capabilities, address (public).
- Empty state with expand-radius action.
- Does not leak other consumers’ addresses.

**Data:** `Organization`, `Location`  
**Permissions:** Public org profile fields only

---

### F-C5 Schedule and track pickup — Phase 1

**Description:** Request pickup, select items/devices, track status timeline.

**User story:** As a consumer, I want doorstep pickup and live status so I trust the process.

**Acceptance criteria:**
- Create pickup with ≥1 item and address; status starts `requested`.
- Timeline of `CollectionEvent`s visible.
- Cancel allowed before `collected`.
- Unauthorized redirect; forbidden for non-owners.
- Matches state machine in [10-workflows.md](./10-workflows.md).

**Data:** `PickupRequest`, `PickupItem`, `CollectionEvent`  
**Permissions:** Owner; assigned org can update operational fields

---

### F-C6 EcoPoints — Phase 2

**Description:** Earn points for verified recycling actions; redeem or donate per catalog.

**User story:** As a consumer, I want rewards for recycling so I keep using EcoSure.

**Acceptance criteria:**
- Points credited once per pickup via idempotent ledger entry after verified `collected`.
- Balance and history visible; redeem reduces balance atomically.
- Insufficient balance blocked with clear error.
- Expiry/clawback per policy; all entries audited.
- Defaults from [14-open-questions.md](./14-open-questions.md) OQ-10–14.

**Data:** `EcoPointsAccount`, `EcoPointsLedgerEntry`  
**Permissions:** Own account; admin adjust only

---

### F-C7 WhatsApp notifications — Phase 2

**Description:** Opt-in WhatsApp updates for pickup, tips (optional), EcoPoints.

**User story:** As a consumer, I want WhatsApp updates so I don’t miss pickup steps.

**Acceptance criteria:**
- Explicit opt-in/out; consent timestamp stored.
- Status and EcoPoints templates only when opted in.
- Failed sends logged; no crash of pickup flow.
- See [11-integrations.md](./11-integrations.md).

**Data:** `User.whatsapp_opt_in`, `Notification`  
**Permissions:** Own prefs

---

## 3. Screen checklist

| Screen | States required |
|--------|-----------------|
| Device list | L/E/S/Err/401/403 |
| Device form | validation errors |
| Stats home | L/E/S/Err |
| Education list/detail | L/E/S/Err |
| Nearby map/list | L/E/S/Err |
| Pickup create | validation |
| Pickup detail/timeline | L/E/S/Err/401/403 |
| EcoPoints | L/E/S/Err |
| Notification prefs | S/Err |

---

## 4. Out of scope for consumer

- Viewing settlements or certificates of commercial orgs (except personal confirmation that recycling completed when certificate exists on their lot — optional Phase 3 read of “recycled” badge).
- Creating organizations.
- IoT usage telemetry.
