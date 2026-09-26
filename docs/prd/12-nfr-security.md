# EcoSure — Non-Functional Requirements and Security

**Last updated:** 2026-09-26

---

## 1. Architecture constraints (future build)

| Layer | Choice |
|-------|--------|
| Database | Local PostgreSQL |
| API | Node.js, validated requests, structured errors |
| Auth | Custom sessions or JWT; password hashing (argon2/bcrypt) |
| Authorization | Server-side RBAC per [02-roles-rbac.md](./02-roles-rbac.md) |
| Schema | Single idempotent `schema.sql` |
| Client | No privileged credentials or service secrets |

---

## 2. Security requirements

1. **Authentication** — Secure password storage; session expiry; logout; lockout after repeated failures.
2. **Authorization** — Enforce on every mutating and sensitive read endpoint.
3. **Transport** — TLS in deployed environments; secure cookies if cookie sessions.
4. **Input validation** — Schema validation (e.g., Zod) on all writes.
5. **Injection safety** — Parameterized SQL only.
6. **Audit** — Mutations on pickups, lots, settlements, certificates, points, org approvals logged.
7. **Secrets** — Env-based; never committed.
8. **File uploads** — Type/size limits; malware scanning later; private storage.
9. **Admin access** — Invite-only; elevated actions double-logged.

---

## 3. Privacy (DPDP-aligned principles)

- Collect only data needed for e-waste operations and compliance.
- Purpose limitation: marketing WhatsApp separate from transactional opt-in.
- Access control on PII (phone, address, email).
- Retention: operational vs compliance artifacts (default 7 years for compliance — OQ-32).
- Consumer data export/delete request process (Phase 5); anonymize custody records where legally required rather than breaking chain integrity.

---

## 4. Reliability and performance

| Requirement | Target |
|-------------|--------|
| API availability (deployed) | 99.5% monthly (initial) |
| Pickup list p95 | < 500 ms local network |
| Report generation | Async for large periods; status polling |
| Backup | Daily Postgres backup (ops runbook Phase 0) |
| Idempotency | Required for payments-like and messaging side effects |

---

## 5. Auditability for compliance

- Certificates immutable; corrections = new certificate linked to previous.
- Compliance report generation parameters stored for reproducibility.
- Chain of custody reconstructible for any `material_lot_id`.
- Government views prefer aggregates; drill-down only within policy.

---

## 6. Accessibility and UX quality

- Light-theme, premium SaaS UI (implementation phase).
- WCAG 2.1 AA aspirational for interactive flows.
- Responsive: desktop, tablet, mobile for consumer and field collection.
- Every important screen: loading / empty / success / error / unauthorized / forbidden.

---

## 7. Observability

- Structured API logs with request id.
- Metrics: error rate, latency, notification success, pickup completion.
- Alerting on webhook failures and settlement job failures.

---

## 8. Compliance documentation disclaimer

EcoSure provides workflows and structured exports to **support** EPR / CPCB / SPCB obligations. Final legal sufficiency of filings is the responsibility of the obligated entity and their advisors. Platform does not replace statutory portals unless an approved integration exists.
