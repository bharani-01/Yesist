# EcoSure — Manufacturer Dashboard PRD

**Role:** `manufacturer`  
**Organization type:** `manufacturer`  
**Phase focus:** Phase 4  
**Last updated:** 2026-09-26

---

## 1. Summary

Manufacturers track e-waste attributed to their products, discover recycling partners, obtain EPR support documentation, view impact analytics, and export CPCB/SPCB-oriented compliance reports.

---

## 2. Features

### F-M1 Registration and profile — Phase 0 / enable Phase 4

**Description:** Register manufacturer profile, brands/product categories, EPR registration identifiers (as available).

**Acceptance criteria:**
- Admin approval before compliance modules unlock.
- Profile can list product categories/SKUs for attribution (metadata).

**Data:** `Organization` (+ product catalog table in implementation)  
**Permissions:** Org + admin approve

---

### F-M2 Product e-waste footprint and disposal patterns — Phase 4

**Description:** View kg and counts of e-waste attributed to manufacturer products over time.

**User story:** As an EPR manager, I want product-level disposal visibility so I can plan take-back.

**Acceptance criteria:**
- Charts/tables by category, period, geography (state) from attributed lots/certificates.
- Attribution rules documented (device brand match, bulk declaration, or explicit link).
- No raw consumer PII.
- Empty state when no attributed volume.

**Data:** Attributed `MaterialLot`, `Certificate`, aggregates  
**Permissions:** Own manufacturer org

---

### F-M3 Nearby professional recyclers and hubs — Phase 4

**Description:** Discover approved recyclers/hubs for responsible management.

**Acceptance criteria:**
- Search by location/capability.
- Public profile fields only.
- CTA to request partnership / bulk pickup (creates business pickup or partnership request record).

**Data:** `Organization`, `Location`  
**Permissions:** Read approved orgs

---

### F-M4 EPR compliance and documentation — Phase 4

**Description:** Access certificates and recycler-provided EPR support packs for the manufacturer’s attributed volume.

**Acceptance criteria:**
- List certificates linked to attributed lots.
- Download support packs when shared by recycler.
- Audit downloads of compliance artifacts.

**Data:** `Certificate`, `ComplianceReport`  
**Permissions:** Owner org

---

### F-M5 Platform impact insights — Phase 4

**Description:** Safe platform aggregates + manufacturer’s own contribution share.

**Acceptance criteria:**
- Own vs platform aggregate clearly labeled.
- No competitor confidential data.

---

### F-M6 CPCB and SPCB report downloads — Phase 4

**Description:** Generate structured exports to support CPCB/SPCB filings.

**User story:** As a compliance manager, I want exportable reports so I can file faster.

**Acceptance criteria:**
- Select report type (`cpcb_export`|`spcb_export`|`epr_summary`), period, state (for SPCB).
- Job generates file; status visible; download when ready.
- Store generation params for reproducibility.
- Field set includes at minimum: period, org identifiers, category-wise quantities, certificate references, recycler partners.
- Exact official template mapping tracked in OQ-30; expert review required before claiming portal parity.
- Error if insufficient attributed data.

**Data:** `ComplianceReport`  
**Permissions:** Manufacturer org members

---

### F-M7 Business pickup requests — Phase 1–4 (available when org approved)

**Description:** Request bulk pickup via hub/shop/recycler network.

**Acceptance criteria:**
- Creates `PickupRequest` with `requester_org_id`.
- Track status like consumer pickups.
- Phase 1 may route to Local Shop / Hub only.

**Data:** `PickupRequest`  
**Permissions:** Manufacturer org

---

## 3. Screen checklist

Profile, footprint analytics, partner discovery, certificates/packs, report generator, report history, pickups — L/E/S/Err/401/403.

---

## 4. Clarifications vs original draft

- Manufacturer does **not** see unrelated consumers’ device inventories.
- CPCB/SPCB “make all reports” means **platform-supported exports**, not guaranteed automated statutory submission.
