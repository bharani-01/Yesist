# EcoSure — Non-Functional Requirements and Security

**Last updated:** 2026-09-27 (v2)

---

## 1. Architecture

| Layer | Choice |
|-------|--------|
| Database | PostgreSQL, single idempotent `schema.sql` |
| API | Node.js, validated requests, structured errors |
| Auth | Phone OTP; server-side sessions; org roles |
| Authorization | Server-side, per [02-roles-rbac.md](./02-roles-rbac.md) |
| Hosting | State data centre or government-empanelled cloud; data in India |
| Clients | Mobile-first web (installable), works offline for field roles |

---

## 2. Security

1. Least-privilege authorization on every endpoint.
2. Parameterised SQL only; schema validation on all input.
3. TLS everywhere; secure, HTTP-only session cookies.
4. Secrets in server environment only; rotated.
5. Rate limits on OTP, verification lookups, and exports.
6. File uploads: type and size limits, malware scan, private storage.
7. Append-only audit log for custody, money, attestations, approvals, and all access to personal data by SPCB and operator users.
8. Security audit by a CERT-In empanelled auditor before go-live, as expected for government applications.

---

## 3. Offline operation

- Field roles (shop, hub, recycler receiving) can collect, weigh, receive, and photograph without signal.
- Records are queued locally with capture time and device ID and synced when online.
- Conflicts (for example, the same lot received twice) are shown to the receiving party and logged.
- The app shows the number of records waiting to sync.

---

## 4. Language and accessibility

- Hindi and English at launch; each new corridor adds its state language before going live.
- All citizen and shop messages, templates, and screens are translated; compliance exports offer bilingual output.
- Plain language; icons plus text for staff with limited reading.
- WCAG 2.1 AA target for web screens.
- Works on low-end Android phones and 2G/3G connections.

---

## 5. Privacy (DPDP Act)

- Data fiduciary: the sponsoring department. The contracted operator is a data processor under contract.
- Collect only what operations need. Citizen address is shared only with the assigned shop.
- Consent recorded for WhatsApp messages; separate from transactional notices.
- Retention: operational personal data 3 years after last activity; custody and compliance records 7 years. Personal fields are anonymised at the end of retention without breaking the custody chain.
- Citizens can request access, correction, and deletion; deletion anonymises rather than removes custody events.

---

## 6. Transparency and RTI

- Published aggregates always carry the coverage label "Formal EcoSure network only".
- A documented disclosure policy defines what can be released under RTI and how it is redacted.
- Public verification exposes no personal data or prices.

---

## 7. Integrity and fraud controls

- Attestations only from organizations with verified CPCB authorization.
- Attested weight ≤ accepted weight; period total ≤ authorized capacity.
- Duplicate document hashes raise flags.
- Citizen incentive limits per person per month; anomaly detection on repeated addresses, devices, or UPI IDs.
- Dual weighing with photos at every hand-off.

---

## 8. Reliability and performance

| Requirement | Target |
|-------------|--------|
| Availability | 99.5% monthly |
| Pickup list p95 | < 800 ms on 3G |
| Offline sync | Within 5 minutes of signal returning |
| Backups | Daily, with a tested restore each quarter |
| Payout reconciliation | Daily |

---

## 9. Observability

Structured logs with request IDs; metrics for payout success, message delivery, sync backlog, dispute rate, and dwell breaches; alerts to the operator.

---

## 10. Legal statement

EcoSure records custody and supports EPR filing. It does not issue EPR certificates and does not replace the CPCB EPR portal. Producers remain responsible for their statutory filings.
