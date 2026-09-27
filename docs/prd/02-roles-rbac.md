# EcoSure — Roles and Access

**Last updated:** 2026-09-27 (v3)  
**Principle:** Least privilege. Personal data and money stay with the owning party unless a rule below says otherwise. Regulators see evidence and aggregates, not people.

---

## 1. Roles

| Role | Description |
|------|-------------|
| `citizen` | Individual handing over e-waste |
| `bulk_consumer` | Member of a society, office, school, or government office (Rule 8 bulk consumer) |
| `local_shop` | Member of a collection shop acting as a recycler's agent |
| `informal_collector` | Individual kabadiwala or waste picker registered as an agent (micro tier) |
| `drop_point` | Member of an IMC, retailer, or PRO drop point |
| `regional_hub` | Member of a recycler-owned or contracted hub (phase 2) |
| `pro_recycler` | Member of a CPCB-registered recycler |
| `refurbisher` | Member of a CPCB-registered refurbisher (phase 2) |
| `producer` | Member of a producer, manufacturer, or importer |
| `producer_delegate` | PRO or compliance consultant acting for a producer under a recorded mandate |
| `ulb_officer` | Indore Municipal Corporation staff |
| `spcb_officer` | MPPCB staff |
| `cpcb_officer` | CPCB staff (national read view, phase 2) |
| `programme_operator` | Department or contracted operator staff |
| `public_information_officer` | Designated officer who decides RTI requests |
| `public` | Unauthenticated (verification page, open data) |

Organization members also have an org role: `owner`, `operator`, `finance`, `approver`, or `viewer`.

---

## 2. Capability matrix

Legend: **F** full for own scope · **R** read · **W** write · **A** approve · **Agg** aggregate only · **—** none

| Capability | Citizen / bulk | Shop / collector / drop point | Recycler | Producer / delegate | ULB | SPCB / CPCB | Operator | Public |
|------------|----------------|-------------------------------|----------|---------------------|-----|-------------|----------|--------|
| Own profile | F | F | F | F | F | F | F | — |
| Approve organizations and agent agreements | — | — | A (own agents) | — | — | R | A | — |
| Register models and units | — | — | — | F | — | Agg | R | — |
| Claim a device | W | — | — | — | — | — | — | — |
| Legacy registration at collection | — | W | W | — | W (IMC vehicles) | — | — | — |
| Create pickup or drive | W | W (assisted) | — | W (bulk) | W (ward drive) | — | W | — |
| Accept / collect / weigh | — | F | — | — | F (IMC flow) | — | F | — |
| Lots, seals, trips | — | W | R (inbound) | — | W (IMC flow) | R | F | — |
| Accept / reject transfers | — | — | W | — | — | — | A (disputes) | — |
| Issue attestations (maker-checker) | — | — | W | — | — | R | R | — |
| Material recovery and mass balance | — | — | W | R (attributed) | — | R | R | — |
| Verify attestation by number | R | R | R | R | R | R | R | R |
| Rate cards | — | R | W | — | — | R | R | — |
| Settlements and advances | — | R (own) | F | — | — | — | R | — |
| Citizen incentives | R (own) | — | — | Fund (programme) | — | Agg | F | — |
| Certificate provenance | — | — | W | W | — | R | R | — |
| Evidence packs (maker-checker) | — | — | R (share) | F | — | — | R | — |
| Compliance flags | — | own | own | own | own ward | R | F | — |
| Inspection links | — | — | — | — | — | W (SPCB) | R | — |
| Analytics | — | own | own | own | ward | Agg (state / national) | F | Open data |
| Data requests (RTI) | W | W | W | W | W | W | R | W |
| RTI decisions | — | — | — | — | — | — | — | — (PIO only) |
| Audit logs | own | own org | own org | own org | own | Agg | F | — |
| Feedback | W | W | W | W | W | W | R | — |

---

## 3. What each role must not see

| Role | Must not access |
|------|-----------------|
| Citizen / bulk consumer | Other people's pickups or claims; organization finances |
| Shop / collector / drop point | Full address before accepting; other agents' jobs or payouts; raw device identifiers |
| Recycler | Other recyclers' rates, agents, or agreements; citizen identities |
| Producer / delegate | Citizen identities; other producers' units, packs, or programmes; raw identifiers of other producers' units |
| ULB officer | Citizen identities outside IMC's own collection flow; money data |
| SPCB / CPCB officer | Citizen personal data; bank details; individual settlements. Evidence, aggregates, and flags only unless a lawful request is decided |
| Programme operator | Personal data outside a logged support or audit purpose; RTI decisions |
| Public | Anything except attestation number, issuer, date, weight, category, and status; open aggregates with small cells suppressed |

---

## 4. Onboarding tiers

| Organization | Tier | Can operate | Requirement |
|--------------|------|-------------|-------------|
| Shop / informal collector | `micro`, `provisional` | Up to 500 kg / month | Any-of ID check (DigiLocker, Aadhaar offline QR, in-person ID, NAMASTE or e-Shram ID), photo, payout account, signed agent agreement. No GSTIN |
| Shop | `standard`, `approved` | No cap within agreement | Documents reviewed; GSTIN if registered |
| Drop point | `approved` | Yes | Host organization letter, agent agreement |
| Hub | `approved` | Phase 2, recycler-owned or contracted | Storage and fire check, agent agreement |
| Recycler | `approved` | After CPCB registration and state-verified capacity checked | Registration number, validity, capacity from MPPCB consent |
| Producer | `approved` | Yes | CPCB EPR registration |
| Producer delegate | `approved` | For named producers | Signed mandate per producer |
| ULB, SPCB, CPCB | `approved` | Yes | Nominated by the department |

Aadhaar is never mandatory. EcoSure never stores Aadhaar numbers or documents; it stores only the check result and method.

---

## 5. Enforcement rules

1. Every request authenticates the user and resolves role, organization, org role, and agent agreement.
2. Pickup visibility: requester, assigned agent, and the principal recycler once in a lot.
3. Passport visibility: registering producer (own units), claimant (own claims), handling agents (units in their lots, last 4 characters only).
4. Unauthenticated requests get 401. Authenticated requests without permission get 403 with a stable error code and no data.
5. All operator, SPCB, and CPCB access to personal data is logged with a reason.
6. Maker-checker actions (attestations, evidence packs, chargebacks, incentive reversals) require two different users.
