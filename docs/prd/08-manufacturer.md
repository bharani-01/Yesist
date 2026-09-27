# EcoSure — Producer (Manufacturer and Importer) PRD

**Roles:** `producer`, `producer_delegate`  
**Phase:** 1b (moved up from 2)  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

Producers use EcoSure to register products they place on the Indian market, see what happened to them at end of life, prove that the CPCB portal certificates they hold are backed by real physical material, and report take-back results. EcoSure supports EPR compliance; the CPCB portal remains the only place targets, filings, and certificates exist.

Changes from v2: target-gap view and portal worksheets removed (EPR targets and certificates use units that only the CPCB portal can compute); product registry, certificate provenance, audit defence and BRSR packs added; PRO and consultant delegates; moved to phase 1b.

---

## 2. Features

### P1 Onboarding — Phase 1b
**Acceptance criteria**
- CPCB EPR registration number verified by the operator.
- Brands and categories recorded.
- Org roles: owner, approver, operator, viewer.
- Delegates (PROs, consultants) added per producer with a signed mandate; delegates see only mandated producers.

### P2 Product registry — Phase 1b
Register models, units, and placed-on-market batches. See [16-product-passport.md](./16-product-passport.md) PP1 and PP6.

### P3 End-of-life view — Phase 1b
**Acceptance criteria**
- Own units by lifecycle state, category, and state of India.
- Units collected, received, and processed through EcoSure by month, with attestation numbers.
- No citizen identities; ward-level geography only.

### P4 Certificate provenance — Phase 1b
**Story:** As an EPR manager, I want to know that the certificates I bought are backed by real material, before an auditor asks.

**Acceptance criteria**
- Enter certificate references from the CPCB portal (number, quantity, and unit exactly as the portal shows, issuing recycler).
- EcoSure links each certificate to attestations and inflow from that recycler and marks it fully backed, partially backed, or unbacked.
- Unbacked certificates from EcoSure-participating recyclers raise a flag for the producer and the SPCB.
- EcoSure never recalculates certificate quantities or targets.

### P5 Evidence packs — Phase 1b
**Acceptance criteria**
- Pack types:
  - **Audit defence:** certificate provenance with attestation, weigh, seal, GPS, and mass-balance evidence.
  - **BRSR take-back:** take-back volumes and devices for the annual Business Responsibility and Sustainability Report.
  - **Take-back programme:** results of producer-funded programmes.
- English, Hindi, or bilingual.
- Each pack stores inputs and template version so it can be reproduced.
- Download needs approval by a different producer user.
- Every file states: "Supports EPR compliance evidence. EcoSure does not issue EPR certificates. The producer is responsible for filings on the CPCB EPR portal."
- Retained for 7 years.

### P6 Take-back programmes — Phase 1b
**Acceptance criteria**
- Producer funds citizen top-ups for its brand or category in a corridor from its own escrow.
- Rules: budget, per-unit amount, eligible categories, dates.
- Programme dashboard: units, weight, cost per unit, passports linked.
- Gated on a signed letter of intent before the programme can go live.

### P7 Recycler directory — Phase 1b
Participating recyclers by state and category, with CPCB registration shown separately from platform approval.

### P8 Bulk collection — Phase 1a
Producers' offices, service centres, and warehouses request collection as bulk consumers.

---

## 3. Screen states
Loading, empty (no registered units yet), success, error, 401, 403, awaiting approval, template outdated, upload validation errors.

---

## 4. Out of scope
- EPR target calculation or gap views
- Automatic CPCB portal submission
- EPR certificate trading or brokering
- Viewing citizen identities
