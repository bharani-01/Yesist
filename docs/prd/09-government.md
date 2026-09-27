# EcoSure — Government PRD (SPCB, CPCB, City)

**Roles:** `spcb_officer`, `cpcb_officer`, `ulb_officer`, `public_information_officer`  
**Phase:** 1a (flags, verification, city flow), 1b (state analytics), 2 (CPCB national view, open data)  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

Regulators and the city use EcoSure for near real-time evidence about the formal e-waste chain. MPPCB is understaffed and already uses the CPCB portal, XGN, and its Central Inspection System, so EcoSure adds prioritised flags, digests, and links into those systems rather than another place to work. CPCB gets a national read view from phase 2. IMC logs its own collection and runs ward drives. No government user can change operational records.

Changes from v2: CPCB and IMC roles; near real-time analytics (15-minute refresh); Central Inspection System links replace separate inspection notes; weekly digests; CPCB action-plan export; CM Dashboard feed; public information officer decides RTI; open data.

---

## 2. Features

### G1 Onboarding — Phase 1a
Departments nominate officers. Accounts are scoped to CPCB (national), MPPCB (state and regional office), or IMC (city and wards).

### G2 Compliance flags — Phase 1a
**Acceptance criteria**
- Flags: storage deadline breached, attestation missing past SLA, weight anomaly, broken seal, capacity exceeded, registration expired, duplicate hash, duplicate device, mass-balance variance, unbacked certificate, payout anomaly.
- Ranked by risk score (severity × weight × age). Each flag shows the organization's public name and evidence.
- Read-only. An SPCB officer can link a flag to a Central Inspection System record.

### G3 Registration check — Phase 1a
Statutory registrations and platform status shown side by side with clear labels. An SPCB officer can mark a registration as verified or disputed, which alerts the operator.

### G4 State analytics — Phase 1b
**Acceptance criteria**
- Refresh at most every 15 minutes.
- Tonnes collected, received, attested, and recovered by district, ward, category, and month.
- Problem statement KPIs (see [00-overview.md](./00-overview.md) section 7): formal collection above baseline, traceable share, device-level traceability, informal-to-formal volume, participation, material recovery efficiency, reporting accuracy.
- Share of weight confirmed by a second party or connected scale vs self-reported.
- Every chart carries: "Formal EcoSure network only. Excludes informal channels."

### G5 Weekly digest — Phase 1b
Email and WhatsApp summary to each MPPCB regional officer: top flags, tonnes, new agents, expiring registrations.

### G6 Reports and feeds — Phase 1b
**Acceptance criteria**
- Quarterly export in the format of the CPCB state e-waste action plan report.
- District inspection pack (organizations, open flags, recent attestations) as PDF and CSV in Hindi and English, stamped with generation time and data cut-off.
- KPI feed to the CM Dashboard through MPSEDC.

### G7 City view — Phase 1a
**Acceptance criteria**
- IMC logs vehicle and ward-point collections as a drop point flow.
- Ward drive calendar and results.
- Ward-level tonnes for Swachh Survekshan reporting.

### G8 CPCB national view — Phase 2
**Acceptance criteria**
- Aggregates by state from every federated state instance.
- Recycler inflow compared with portal filings (reporting accuracy KPI).
- Unbacked certificate flags across states.

### G9 Public verification and open data — Phase 1a (verification), Phase 2 (open data)
- Public attestation check (same as recycler R8).
- Monthly aggregates published on data.gov.in with small cells (fewer than 10 households or 3 organizations) suppressed.

### G10 Lawful data requests and RTI — Phase 1a
**Acceptance criteria**
- RTI and investigation requests are logged with legal basis.
- The designated public information officer decides; the operator only prepares data.
- Disclosure follows the published policy, including the DPDP Act's change to RTI section 8(1)(j) for personal information.
- Proactive disclosure: operator contract, SLAs, and aggregate performance.

### G11 Feedback — Phase 1a
Structured feedback to the programme operator with category and priority.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, stale data warning (older than 15 minutes for live views, 24 hours for reports).

---

## 4. Out of scope
- Editing any operational record
- Issuing notices or orders from EcoSure (these stay in official systems)
- Bank details and individual settlement amounts
