# EcoSure — Authorized Recycler PRD

**Role:** `pro_recycler`  
**Phase:** 1  
**Last updated:** 2026-09-27 (v2)

---

## 1. Summary

Authorized recyclers are the root of trust. They receive lots from hubs under offtake agreements, grade and accept or reject material, and issue custody attestations tied to their CPCB authorization. EcoSure does not charge recyclers a commission on scrap value.

What changed from v1: moved from phase 3 to phase 1; "certificates" renamed to custody attestations with a mandatory disclaimer; reject and partial-accept rights added; capacity and weight caps enforced; public verification added.

---

## 2. Features

### R1 Onboarding — Phase 1
**Acceptance criteria**
- CPCB authorization number, validity dates, authorized capacity, and document upload.
- Operator verifies against the CPCB list before approval.
- Expired authorization automatically blocks new attestations and raises a flag.

### R2 Offtake agreements — Phase 1
Same record as the hub side ([06-regional-hub.md](./06-regional-hub.md) H2). The recycler signs and can propose changes.

### R3 Inbound and grading — Phase 1
**Acceptance criteria**
- Inbound trips and lots listed with sender weights.
- Receiver weight and grade per lot.
- Decisions: accept, partial accept (with accepted and rejected weight), reject (with reason and photos).

### R4 Custody attestations — Phase 1
**Story:** As a recycler, I want to record that a lot was processed so that producers and the SPCB can trust the chain.

**Acceptance criteria**
- Issued per lot after processing.
- Checks before issue: valid CPCB authorization; processed weight ≤ accepted weight; period total ≤ authorized capacity.
- Unique public number and SHA-256 hash of the document.
- Mandatory disclaimer on every attestation: "This is a custody attestation recorded on EcoSure. It is not an EPR certificate. EPR certificates are generated only on the CPCB EPR portal."
- Optional field for the CPCB portal reference once an EPR certificate exists.
- Corrections issue a new attestation that supersedes the old one; the old one stays visible as superseded.

### R5 Public verification — Phase 1
**Acceptance criteria**
- Anyone can enter an attestation number and see issuer, issue date, weight, categories, status, and superseded status.
- No personal data, no prices.
- Duplicate hashes raise a flag.

### R6 Payables to hubs — Phase 1
Settlements to hubs within agreement payment days; rejection costs per agreement.

### R7 Evidence packs for producers — Phase 2
**Acceptance criteria**
- Recycler can share a pack of attestations with a producer that has attributed weight in those lots.
- Pack lists attestation numbers, lot weights, categories, period, and CPCB portal references where available.
- Every share and download is logged.

### R8 Capacity view — Phase 1
Attested tonnes against authorized capacity for the period, with warning at 80%.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, authorization expired, capacity limit reached.

---

## 4. Out of scope
- Issuing EPR certificates
- Commission on scrap value
- Seeing other recyclers' agreements or rates
