# EcoSure — Roles and RBAC

**Last updated:** 2026-09-26  
**Principle:** Least privilege. Financial and PII data are scoped to the owning organization unless an explicit share or regulator aggregate view applies.

---

## 1. Roles

| Role code | Description |
|-----------|-------------|
| `consumer` | Individual user |
| `local_shop` | Staff of a Local Recycle Shop org |
| `regional_hub` | Staff of a Regional Hub org |
| `pro_recycler` | Staff of a Professional Recycler org |
| `manufacturer` | Staff of a Manufacturer org |
| `government` | Staff of a Government Agency org |
| `platform_admin` | EcoSure internal operator |

Users belong to at most one primary role for MVP. Org staff may have org-level sub-roles later (`org_admin`, `org_operator`, `org_finance`) — Phase 5.

---

## 2. Capability matrix

Legend: **F** = full for own scope · **R** = read · **W** = write/create · **A** = approve/admin · **—** = none · **Agg** = anonymized/aggregate only

| Capability | Consumer | Local Shop | Regional Hub | Pro Recycler | Manufacturer | Government | Platform Admin |
|------------|----------|------------|--------------|--------------|--------------|------------|----------------|
| Own profile | F | F | F | F | F | F | F |
| Org profile | — | F | F | F | F | F | A |
| Approve organizations | — | — | — | — | — | — | A |
| Device inventory | F | — | — | — | R* | — | A |
| Create pickup request | W | W† | W† | — | W† | — | A |
| Accept / schedule pickup | — | F | F | F | — | — | A |
| Record collection / weight | — | W | W | W | — | — | A |
| Create material lot | — | W | W | W | — | — | A |
| Transfer outbound | — | W→Hub | W→Recycler | — | — | — | A |
| Receive transfer | — | — | W | W | — | — | A |
| Process lot | — | — | — | W | — | — | A |
| Issue certificate | — | — | — | W | R | R | A |
| Settlements (own) | — | R/W‡ | F | F | R‡ | — | A |
| Platform-wide financials | — | — | — | — | — | — | F |
| EcoPoints ledger (own) | F | — | — | — | — | — | A |
| Education content (consume) | R | R | R | R | R | R | A |
| Education content (publish) | — | — | — | — | — | — | A |
| Nearby discovery | R | R | R | R | R | — | A |
| Own org stats | F | F | F | F | F | Agg | F |
| Platform aggregate stats | — | Agg§ | Agg§ | Agg§ | Agg§ | Agg | F |
| EPR / CPCB / SPCB reports | — | R limited | — | W support | F | R | A |
| Compliance monitoring | — | — | — | — | — | R | A |
| Feedback to platform | W | W | W | W | W | W | A |
| Audit log access | own | own org | own org | own org | own org | Agg | F |
| WhatsApp notification prefs | F | F | F | F | F | F | A |

\* Manufacturer sees product-category disposal aggregates linked to their brand/SKU where attributed — not arbitrary consumer PII.  
† Commercial pickup requests from business orgs.  
‡ Shop/manufacturer see settlements where they are a party.  
§ Draft PRD “overall platform stats” for shops/hubs/recyclers is **aggregate impact only** (e.g., total kg processed platform-wide), never other orgs’ payouts.

---

## 3. Explicit denials (must not see)

| Role | Must not access |
|------|-----------------|
| Consumer | Other users’ devices/pickups; any org financials; certificates of unrelated parties |
| Local Shop | Other shops’ pickups/financials; recycler internal processing notes; manufacturer confidential EPR filings |
| Regional Hub | Other hubs’ settlements; consumer PII beyond pickup necessity; platform admin tools |
| Pro Recycler | Unrelated manufacturers’ full product catalogs; other recyclers’ rates |
| Manufacturer | Consumer identities except anonymized aggregates; other manufacturers’ reports |
| Government | Individual consumer PII; org bank details; detailed private settlements (aggregate + compliance flags only unless lawful process) |
| Platform Admin | Must still log access to PII; no use of data outside support/ops purpose |

---

## 4. Authorization rules (future implementation)

1. Every API request authenticates a user and resolves `role` + `organization_id` (nullable for consumers).
2. Resource access checks: ownership OR org membership OR platform admin OR aggregate-safe view.
3. Pickup visibility: requester + assigned collecting org + upstream/downstream orgs once transferred.
4. Certificate visibility: issuing recycler, lot parties, attributed manufacturer, authorized government aggregate.
5. Forbidden → HTTP 403 with stable error code; Unauthorized → 401.

---

## 5. Onboarding gates

| Role | Can register | Can operate pickups | Gate |
|------|--------------|---------------------|------|
| Consumer | Yes | Yes (request) | Email/phone verify |
| Local Shop / Hub / Recycler / Manufacturer / Government | Yes (apply) | After approval | Platform Admin approval + required docs |
| Platform Admin | Invite-only | N/A | Internal provisioning |

---

## 6. UI state requirements

Every protected view defines:

- **Loading** — skeleton / spinner
- **Empty** — no records yet + CTA
- **Success** — data rendered
- **Error** — retry + support reference
- **Unauthorized** — redirect to login
- **Forbidden** — explained denial, no data leakage
