# EcoSure — Non-Functional Requirements, Security, and Compliance

**Last updated:** 2026-09-27 (v3)

---

## 1. Architecture

| Layer | Choice |
|-------|--------|
| Database | PostgreSQL, single idempotent `schema.sql`; row-level security as a second line of defence |
| API | Node.js, validated requests, structured errors, versioned public API |
| Auth | Phone OTP; server-side sessions; org roles |
| Authorization | Server-side, per [02-roles-rbac.md](./02-roles-rbac.md) |
| Hosting | MeitY-empanelled government cloud or state data centre; all data and backups in India |
| Clients | Mobile-first installable web app (offline for field roles), IVR, WhatsApp |
| Live updates | Flags and dashboards pushed over authenticated server-sent events; clients re-fetch on reconnect and ignore duplicate events |
| Scale target | Built for national federation: 10 million units registered and 1 million pickups a year per state instance without redesign |

---

## 2. Regulatory compliance baseline

| Norm | Requirement in EcoSure |
|------|------------------------|
| E-Waste (Management) Rules 2022 and amendments | Agent-of-recycler model; intact items only for agents; 180-day storage cap; Schedule I categories; attestations never called certificates |
| Battery Waste Management Rules 2022 | Loose and damaged batteries out of scope and referred; embedded battery weight reported separately |
| DPDP Act 2023 and Rules 2025 | See section 4 |
| CERT-In Directions 2022 | Report incidents to CERT-In within 6 hours; keep logs for 180 days in India; synchronise clocks with NIC or NPL time servers; named point of contact |
| GIGW 3.0 and STQC | STQC certification before public launch; gov.in domain; accessibility statement; content policy |
| IS 17802 / WCAG 2.1 AA | Accessibility for web screens |
| Aadhaar Act | Aadhaar never mandatory; no storage of Aadhaar numbers or documents |
| TRAI DLT | Registered sender ID and templates |
| RTI Act 2005 | Public information officer decides requests; proactive disclosure (section 7) |
| MP procurement rules | Operator and software vendor contracted separately through the sponsor's procurement |
| Election Model Code of Conduct | No new or increased incentives during a code period |

---

## 3. Security

1. Least-privilege authorization on every endpoint; row-level security in the database.
2. Parameterised SQL; schema validation on all input.
3. TLS everywhere; secure, HTTP-only session cookies.
4. Secrets in a server-side secrets store only; rotated. The identifier hashing key is in a hardware-backed key store.
5. Rate limits on OTP, handover codes, verification lookups, and exports.
6. File uploads: type and size limits, malware scan, private storage.
7. Append-only audit log for custody, money, attestations, approvals, and all access to personal data.
8. Security audit by a CERT-In empanelled auditor before go-live and every year after, plus after major releases.
9. Maker-checker for attestations, evidence packs, chargebacks, and incentive reversals.
10. Incident runbook: detection, containment, CERT-In report within 6 hours, Data Protection Board and affected users as the DPDP Rules require.

---

## 4. Privacy (DPDP Act 2023 and Rules 2025)

- **Data fiduciary:** the sponsoring department. The operator, software vendor, messaging, payment, and hosting providers are data processors under written contracts.
- **Notice and consent:** plain-language notice in Hindi and English before first use; separate consent for WhatsApp messages; consent records stored with version.
- **Minimisation:** citizen address shared only with the assigned agent; IMEIs and serials stored only as keyed hashes; passports hold no personal data.
- **Children:** users must confirm they are 18 or over; minors can hand over only through a parent's account.
- **Rights:** access, correction, deletion (anonymises personal fields, keeps custody events), grievance handling within the DPDP Rules timelines, and a published grievance officer.
- **Retention:** operational personal data 3 years after last activity; custody and compliance records 7 years; logs as CERT-In requires.
- **Informal worker protection:** agent data is not shared with enforcement agencies except through the lawful request process.
- Main obligations apply from 13 May 2027 (reported commencement date; verify), which falls around the phase 1a launch. EcoSure complies from day one.

---

## 5. Offline operation

- Field roles can collect, scan, weigh, seal, and receive without signal.
- Records are queued locally with capture time and device ID and synced when online.
- Conflicts (for example, the same lot received twice) go to the receiving party and are logged.
- The app shows how many records are waiting to sync.

---

## 6. Language and inclusion

- Hindi default, English available; each new state adds its language before launch.
- Voice (IVR, missed call) and assisted booking for people without smartphones.
- Icons plus text for people with limited reading.
- Works on low-end Android phones and 2G/3G connections.
- Collector ID cards, masked calling, and a safety report path.

---

## 7. Transparency

- Every published aggregate carries "Formal EcoSure network only" and shows additional tonnes above the baseline.
- Open data on data.gov.in with small cells suppressed.
- Proactive disclosure of the operator contract, SLAs, and performance.
- Public verification exposes no personal data or prices.

---

## 8. Integrity and fraud controls

| Threat | Control |
|--------|---------|
| Fake pickups for incentives | Handover code; incentive only after code + weigh record; caps per payee account, device, and address |
| Recycled devices re-entered | Device identifier earns once; duplicate device flag |
| Weight inflation | Dual weighing, connected scales, calibration checks, seals |
| Lot tampering in transit | Numbered seals, GPS routes, seal check at receipt |
| Ghost recycler inflow | Unit scans, mass balance, capacity from state consent |
| Unbacked EPR certificates | Certificate provenance flags |
| Collusion in attestations | Maker-checker with different users; digital signature |
| Agent fraud | Chargebacks; suspension; per-agent anomaly scores |

---

## 9. Reliability and performance

| Requirement | Target |
|-------------|--------|
| Availability | 99.5% monthly |
| Field list p95 | < 800 ms on 3G |
| Analytics freshness | ≤ 15 minutes; flags within 1 minute |
| Offline sync | Within 5 minutes of signal returning |
| Backups | Daily, in India, with a tested restore each quarter |
| Payout reconciliation | Daily |
| Support SLA | Citizen and agent queries answered within 1 working day; payment issues within 2 |

---

## 10. Observability

Structured logs with request IDs; metrics for payout success, message delivery, sync backlog, dispute rate, storage deadline breaches, flag counts, and IoT device health; alerts to the operator.

---

## 11. Legal statement

EcoSure tracks products and custody and supports EPR compliance evidence. It does not issue EPR certificates and does not replace the CPCB EPR portal. Producers and recyclers remain responsible for their statutory filings.
