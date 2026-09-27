# EcoSure — Roadmap

**Last updated:** 2026-09-27 (v2)  
**Stack:** PostgreSQL + Node.js, government-hosted  
**Rule:** No phase starts until the previous stage gate passes.

---

## Overview

```mermaid
flowchart LR
  pilot[Pilot: manual operations] --> p0[Phase 0: Foundations]
  p0 --> p1[Phase 1: Custody chain live]
  p1 --> p2[Phase 2: Producers and monitoring]
  p2 --> p3[Phase 3: Second corridor and federation]
```

| Stage | Duration | Goal |
|-------|----------|------|
| Pilot | 12 weeks | Prove the corridor works with WhatsApp, spreadsheets, and UPI before writing software |
| Phase 0 | 6–8 weeks | Foundations: auth, organizations, corridor, audit |
| Phase 1 | 12–16 weeks | Citizen → shop → hub → recycler with attestations, weekly settlement, offline |
| Phase 2 | 10–12 weeks | Producer evidence, SPCB monitoring and inspection packs |
| Phase 3 | Ongoing | Second corridor, national standards, CPCB integration |

---

## Pilot — manual operations (Indore + Pithampur)

Detailed plan: [`../research/pilot-design.md`](../research/pilot-design.md).

**What runs:** WhatsApp for booking and status, shared spreadsheets as the custody log, UPI for citizen incentives and weekly shop payments, paper weigh slips with photos, recycler-issued custody notes.

**What is not built:** any app, dashboard, or schema.

**Gates**

| Week | Must be true to continue |
|------|--------------------------|
| 4 | ≥ 8 active shops; 1 hub; signed recycler offtake agreement; first lots received |
| 8 | Median shop payment ≤ 7 days; pickup completion ≥ 70%; weight disputes ≤ 15%; no sign that shops send only low-value material |
| 12 | Steady weekly tonnes; ≥ 5 producers say they would use the evidence exports; SPCB confirms the flags and reports are useful |

If a gate fails, fix and repeat that stage once. If it fails again, stop and report to the sponsor.

---

## Phase 0 — Foundations

- Repository, CI, government hosting environment
- `schema.sql` (idempotent): users, organizations, members, statutory registrations, corridors, locations, audit log, reference data
- Phone OTP auth, sessions, org roles, authorization middleware
- Operator console: onboarding (micro / standard tiers), registration verification, corridor checklist
- WhatsApp + SMS channel service
- Security baseline, backups, logging

**Exit:** operator can onboard a provisional shop, an approved hub, and a verified recycler; access rules tested.

---

## Phase 1 — Custody chain live

- Citizen: phone sign-in, category-and-count pickup, doorstep / drop / society drive, wipe checklist, reschedule keywords, status, UPI incentive
- Shop: queue, offline collect and weigh, lots, trips, weekly settlement, advances, rate card
- Hub: offtake agreements, trip planning, offline receive, tolerance and disputes, dwell flags, shop settlements
- Recycler: grading, accept / partial / reject, custody attestations, capacity checks
- Public attestation verification
- SPCB: registration check, compliance flags
- Operator: rate cards, dispute queue, float view, incentive reconciliation
- Hindi + English everywhere

**Exit:** the pilot corridor runs on the software with the same or better gate metrics than the manual pilot.

---

## Phase 2 — Producers and monitoring

- Producer onboarding, attestation library, attribution with review queue
- Target-gap view, approval before download, bilingual CPCB/SPCB worksheets
- Recycler evidence packs
- Producer take-back programme funding for citizen incentives
- SPCB aggregates with coverage labels, inspection notes, offline inspection pack, lawful data request log
- Hub surge mode; optional citizen device list

**Exit:** ≥ 10 producers exporting; SPCB using flags and packs in inspections.

---

## Phase 3 — Scale and federation

- Second corridor (only after corridor checklist passes), adding its state language
- Automated statutory registry lookups where available
- CPCB portal reference linking on attestations
- Publish data standards for national federation
- Recognition badges for citizens

---

## Cross-cutting rules

1. Update `schema.sql` on every database change; keep it idempotent.
2. No mock operational data in production features.
3. Every screen handles loading, empty, success, error, 401, 403, and offline.
4. Commit meaningful milestones with descriptive messages.

---

## Removed from v1

| Item | Reason |
|------|--------|
| EcoPoints ledger and catalog | Loses to cash; fraud and audit risk |
| Monthly settlement | Shops divert material to informal buyers |
| Hindi in phase 5 | Blocks adoption from day one |
| Recycler and attestations in phase 3 | Chain is not verifiable without them |
| Producer tools in phase 4 | Evidence is needed as soon as attestations exist |
| Government "revenue" view | Not a government need; removed |
