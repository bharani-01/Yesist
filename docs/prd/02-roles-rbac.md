# EcoSure — Roles and Access

**Last updated:** 2026-09-27 (v2)  
**Principle:** Least privilege. Financial data and personal data stay with the owning party unless a rule below says otherwise.

---

## 1. Roles

| Role | Description |
|------|-------------|
| `citizen` | Individual requesting pickups |
| `local_shop` | Member of a collection shop |
| `regional_hub` | Member of a hub |
| `pro_recycler` | Member of an authorized recycler |
| `producer` | Member of a producer / manufacturer |
| `spcb_officer` | SPCB staff |
| `programme_operator` | Department or contracted operator staff |
| `public` | Unauthenticated (verification page only) |

Organization members also have an org role: `owner`, `operator`, `finance`, or `viewer`. These are available from phase 1 because producers need approval before export and hubs need a separate finance role.

---

## 2. Capability matrix

Legend: **F** full for own scope · **R** read · **W** write · **A** approve · **Agg** aggregate only · **—** none

| Capability | Citizen | Shop | Hub | Recycler | Producer | SPCB | Operator | Public |
|------------|---------|------|-----|----------|----------|------|----------|--------|
| Own profile | F | F | F | F | F | F | F | — |
| Approve organizations | — | — | — | — | — | — | A | — |
| Verify statutory registrations | — | — | — | — | — | R | A | — |
| Create pickup | W | W* | W* | — | W* | — | W | — |
| Accept / schedule / collect | — | F | F | — | — | — | F | — |
| Wipe confirmation | W | W (assisted) | — | — | — | — | — | — |
| Lots and trips | — | W | F | R (inbound) | — | R | F | — |
| Weigh records | — | W | W | W | — | R | R | — |
| Accept / reject transfers | — | — | W | W | — | — | A | — |
| Offtake agreements | — | — | R/W | R/W | — | R | A | — |
| Issue custody attestations | — | — | — | W | — | R | R | — |
| Verify attestation by number | R | R | R | R | R | R | R | R |
| Settlements (own) | — | R | F | F | — | — | F | — |
| Advances | — | request | issue | — | — | — | A | — |
| Citizen incentive | R (own) | — | — | — | — | — | F | — |
| Rate cards | — | R | R | R | — | R | W | — |
| Attribution review | — | — | — | — | R | — | W | — |
| Producer exports | — | — | — | — | F (with approval) | — | R | — |
| Compliance flags | — | own | own | own | own attributed | R | F | — |
| Inspection notes | — | — | — | — | — | W | R | — |
| Corridor aggregates | — | Agg | Agg | Agg | Agg | Agg | F | — |
| Audit logs | own | own org | own org | own org | own org | Agg | F | — |
| Education content | R | R | R | R | R | R | W | — |
| Feedback | W | W | W | W | W | W | R | — |

\* Bulk / business pickups.

---

## 3. What each role must not see

| Role | Must not access |
|------|-----------------|
| Citizen | Other citizens' pickups; any organization's finances |
| Shop | Full address of a pickup before accepting it; other shops' jobs or payouts |
| Hub | Settlements of other hubs; citizen personal data beyond pickup need |
| Recycler | Other recyclers' rates or agreements |
| Producer | Citizen identities; other producers' exports or attribution |
| SPCB officer | Citizen personal data; bank details; individual settlement amounts. Aggregates and flags only, unless a lawful request is processed by the operator |
| Programme operator | Personal data outside a logged support or audit purpose |
| Public | Anything except attestation number, issuer, date, weight, and status |

---

## 4. Onboarding tiers

| Organization | Tier | Can operate | Requirement |
|--------------|------|-------------|-------------|
| Shop | `micro`, `provisional` | Yes, up to 500 kg / month | Aadhaar-verified owner, shop photo, UPI ID. No GSTIN required |
| Shop | `standard`, `approved` | Yes, no cap | Documents reviewed; GSTIN if registered |
| Hub | `approved` only | After offtake agreement signed | Storage check, documents |
| Recycler | `approved` only | After CPCB authorization verified | Authorization number, validity, capacity |
| Producer | `approved` | Yes | Registration on CPCB EPR portal |
| SPCB office | `approved` | Yes | Nominated by SPCB |

Provisional shops are reviewed within 3 working days. Platform approval is always shown separately from statutory authorization.

---

## 5. Enforcement rules

1. Every request authenticates the user and resolves role, organization, and org role.
2. Pickup visibility: requester, assigned shop, and downstream organizations once in a lot.
3. Attestation visibility: public fields for everyone; full record for issuer, lot parties, attributed producers, SPCB, and operator.
4. Unauthenticated requests get 401. Authenticated requests without permission get 403 with a stable error code and no data.
5. All SPCB and operator access to personal data is logged with a reason.
