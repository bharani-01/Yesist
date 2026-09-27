# EcoSure — Stakeholders and Personas

**Last updated:** 2026-09-27 (v2)  
Personas are grounded in the Tier-2/3 field research in [`../research/tier2-tier3-field-issues.md`](../research/tier2-tier3-field-issues.md).

---

## 1. Stakeholder map

| Stakeholder | Role code | Programme role | Pilot phase |
|-------------|-----------|----------------|-------------|
| Citizen / household | `citizen` | Supplies material; receives UPI incentive | 1 |
| Society (RWA) / small office | `citizen` or `producer`-style bulk requester | Density wedge for collection drives | 1 |
| Local collection shop | `local_shop` | First custody point | 1 |
| Regional hub | `regional_hub` | Consolidates trips to the recycler | 1 |
| Authorized recycler | `pro_recycler` | Root of trust; issues custody attestations | 1 |
| Producer (manufacturer) | `producer` | Uses evidence for EPR filing | 2 |
| SPCB office | `spcb_officer` | Monitors the formal chain | 1 (verification), 2 (monitoring) |
| Programme operator | `programme_operator` | Runs onboarding, float, disputes | 0 |

Change from v1: the recycler moves into phase 1 because nothing is verifiable without it, and the SPCB is a core stakeholder because this is a government programme.

---

## 2. Personas

### Priya — teacher, Nashik (citizen)
- **Wants:** get two old phones, a laptop, and a broken mixer out safely on a Saturday.
- **Blocks her today:** fear of data on phones, society gate rules, English-only forms, "points later" instead of money.
- **Needs from EcoSure:** Marathi/Hindi WhatsApp flow, category-and-count booking, wipe checklist, UPI on collection, reschedule by message.

### Aditya — student, Gwalior (citizen)
- **Wants:** clear chargers and an old phone for cash before moving out.
- **Blocks him:** OTP failures on Jio, PG owner bans pickup staff, distrust of giving an address.
- **Needs:** WhatsApp OTP with SMS fallback, drop-at-shop mode, instant UPI.

### Ramesh — shop owner, Bhagalpur (local shop)
- **Wants:** steady volume and money within days.
- **Blocks him:** GSTIN demands, waiting weeks for approval, monthly settlement, English screens, hub freight costs.
- **Needs:** micro KYC tier with provisional operation, weekly payment, advances, Hindi, hub-paid or shared freight.

### Meera — hub operations lead, Coimbatore (regional hub)
- **Wants:** full trucks, low dwell time, and fewer weighing fights.
- **Blocks her:** power cuts, one truck carrying several shops' lots, fixed 5% tolerance in monsoon, no guaranteed buyer.
- **Needs:** offline receipt, multi-shop trips, seasonal tolerance, offtake agreement with the recycler.

### Arjun — authorized recycler operations (pro recycler)
- **Wants:** more compliant feedstock that is sorted and honestly weighed.
- **Blocks him:** mixed-quality lots, being blamed for fake paperwork, slow upstream settlements.
- **Needs:** grade and reject rights, attestation issuing tied to his CPCB authorization, capacity checks.

### Neha — EPR compliance executive, Indore (producer)
- **Wants:** evidence she can defend in an audit, without rebuilding spreadsheets every quarter.
- **Blocks her:** unclear attribution of mixed lots, templates that do not match portal fields, juniors downloading the wrong file.
- **Needs:** attestation library, conservative attribution with review, approval before download, bilingual exports, target-gap view.

### Suresh — SPCB officer, Kolhapur–Sangli (SPCB)
- **Wants:** honest numbers and a way to check paperwork.
- **Blocks him:** self-reported totals, platform approval confused with Board authorization, English-only reports, no offline field pack.
- **Needs:** "formal network only" labels, public verification, compliance flags, inspection notes, state-language offline pack.

### Programme operator — department ops team
- **Wants:** a corridor that runs without constant firefighting.
- **Needs:** launch checklist, rate card control, dispute queue, float dashboard, audit access.

---

## 3. Shared needs

- Money that arrives on time
- Proof that material went where it was meant to go
- WhatsApp and local-language access
- Works with poor signal
- Clear separation between platform approval and statutory authorization
