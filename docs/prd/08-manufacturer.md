# EcoSure — Producer (Manufacturer) PRD

**Role:** `producer`  
**Phase:** 2 (moved up from phase 4, available as soon as attestations exist)  
**Last updated:** 2026-09-27 (v2)

---

## 1. Summary

Producers use EcoSure to collect custody evidence for their EPR obligations: attestation library, target-gap view, and exports that help them file on the CPCB / SPCB portal. EcoSure supports filing; it does not file and does not issue EPR certificates.

What changed from v1: moved to phase 2; attribution is conservative with a review queue; exports need internal approval; bilingual exports; target-gap view added; footprint charts deprioritised.

---

## 2. Features

### P1 Onboarding — Phase 2
**Acceptance criteria**
- CPCB EPR registration number verified by the operator.
- Brands and product categories recorded for attribution.
- Org roles: owner, compliance approver, operator, viewer.

### P2 Attestation library — Phase 2
**Acceptance criteria**
- Lists attestations for lots with weight attributed to the producer.
- Filters: period, state, category, recycler.
- Each item links to public verification.

### P3 Attribution with review — Phase 2
**Story:** As an EPR manager, I want only defensible weight counted toward my evidence.

**Acceptance criteria**
- Each attribution records method (brand match, bulk declaration, take-back programme, manual review), confidence, evidence, and ruleset version.
- Low-confidence attributions go to a review queue and are excluded from exports until reviewed.
- Producer can dispute an attribution with evidence.

### P4 Target-gap view — Phase 2
**Acceptance criteria**
- Producer enters its EPR target per category for the period.
- Shows attested and attributed weight against target, and the gap.
- Early warnings: lots attributed to the producer that are past dwell or missing attestation.

### P5 Exports — Phase 2
**Acceptance criteria**
- Types: evidence summary, CPCB portal worksheet, SPCB portal worksheet (per state).
- Languages: English, Hindi, or bilingual.
- Each export stores template version, attribution ruleset version, and inputs, so it can be reproduced.
- Template versions are reviewed by a compliance expert before release. Outdated templates block generation with a clear message.
- Download requires approval by the producer's compliance approver.
- Every file states: "Supports filing on the CPCB / SPCB portal. The producer is responsible for submission. EcoSure does not issue EPR certificates."
- Retained for 7 years.

### P6 Recycler and hub directory — Phase 2
Approved recyclers and hubs filtered by state and category, with statutory registration shown separately from platform approval.

### P7 Take-back programme — Phase 2
**Acceptance criteria**
- Producer can fund citizen incentives for its brand or category in a corridor (producer take-back pool).
- Lots from funded pickups are attributed with the `take_back_programme` method.

### P8 Bulk pickup requests — Phase 1
Producers and offices can request bulk collection through shops and hubs.

---

## 3. Screen states
Loading, empty (no attributed weight yet), success, error, 401, 403, awaiting approval, template outdated.

---

## 4. Out of scope
- Automatic portal submission
- EPR certificate trading
- Viewing citizen identities
