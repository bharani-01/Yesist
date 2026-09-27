# EcoSure — Authorized Recycler PRD

**Role:** `pro_recycler`  
**Phase:** 1a  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

Authorized recyclers are the root of trust. They appoint and manage collection agents, fund escrow for material payments, receive sealed lots, scan units, accept or reject material, issue maker-checker custody attestations, and report material recovery and monthly mass balance. EcoSure charges no commission on scrap value.

Changes from v2: agent network management, escrow and rate cards owned by the recycler, seal and unit checks, maker-checker signed attestations, material recovery and mass balance, state-verified capacity, certificate provenance, CPCB-ready inflow records.

---

## 2. Features

### R1 Onboarding — Phase 1a
**Acceptance criteria**
- CPCB registration number, validity, and capacity from the MPPCB consent to operate, verified by the operator against official lists.
- Expired registration or consent blocks new attestations and agent collections and raises a flag.

### R2 Agent network — Phase 1a
**Acceptance criteria**
- Invite and approve agents (shops, informal collectors, drop points, IMC flow) with agent agreements: categories, intact-only rule, maximum storage days (≤ 180).
- Suspend an agent with a reason; suspended agents cannot collect.
- View each agent's volume, disputes, fraud flags, and storage deadlines.

### R3 Rate cards and escrow — Phase 1a
**Acceptance criteria**
- Publish material prices per category, versioned, reviewed at least weekly.
- Link a bank escrow account; see balance, upcoming reimbursements, and advances.
- Low-balance alert when escrow falls below 2 weeks of expected reimbursements; new pickups for the recycler's agents pause at zero.

### R4 Inbound and grading — Phase 1a
**Acceptance criteria**
- Inbound trips and lots with sender weights and GPS route where available.
- Seal check (intact, broken, missing); broken seals open a custody dispute.
- Receiver weight on a connected scale or with photo.
- Unit scans: 100% for phones and laptops in lots under 200 units; at least a 10% random sample otherwise. Missing units open a flag.
- Decisions: accept, partial accept, reject (reason and photos).

### R5 Custody attestations — Phase 1a
**Acceptance criteria**
- Drafted by a maker, approved by a different checker, digitally signed.
- Checks: valid registration; processed weight ≤ accepted weight; period total ≤ state-verified capacity; battery weight reported separately and not counted.
- Unique public number and SHA-256 hash.
- Mandatory disclaimer: "This is a custody attestation recorded on EcoSure. It is not an EPR certificate. EPR certificates are generated only on the CPCB EPR portal."
- Corrections supersede; the old attestation stays visible as superseded.

### R6 Material recovery and mass balance — Phase 1b
**Acceptance criteria**
- Record output fractions per lot or month: metals, plastics, boards, glass, residue, hazardous residue, and where each was sent (downstream recycler or treatment facility reference).
- Monthly mass balance with opening and closing stock. Variance above 5% opens a flag.
- Material recovery efficiency shown per category.

### R7 CPCB-ready inflow records — Phase 1b
**Acceptance criteria**
- Monthly export of inflow and processing records in the fields the recycler files on the CPCB portal, so filings and EcoSure data match.
- Enter CPCB certificate references generated from EcoSure inflow (certificate provenance).

### R8 Public verification — Phase 1a
Anyone can check an attestation by number: issuer, date, weight, categories, status, superseded status. No personal data or prices. Duplicate hashes raise a flag.

### R9 Agent reimbursements and advances — Phase 1a
Reimburse agents for accepted weight within 7 days of receipt from escrow; approve advances within caps; chargebacks with maker-checker.

### R10 Capacity view — Phase 1a
Attested tonnes against state-verified capacity with warning at 80%.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, registration expired, capacity limit reached, escrow low, mass balance variance.

---

## 4. Out of scope
- Issuing or trading EPR certificates
- Commission on scrap value
- Seeing other recyclers' agents, rates, or agreements
