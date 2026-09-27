# EcoSure — Citizen and Bulk Consumer PRD

**Roles:** `citizen`, `bulk_consumer`  
**Phase:** 1a  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

Citizens and bulk consumers hand over e-waste by doorstep pickup, drop point, or collection drive. They get the recycler's material price on the spot, a scheme incentive on top after they confirm the handover, and a message when their material is recycled. Devices can be claimed so their full history is visible.

Changes from v2: product passport claims, handover code, material price plus incentive, non-smartphone channels, non-UPI payouts, drives as the main channel, bulk consumer role.

---

## 2. Features

### C1 Sign-in and channels — Phase 1a
**Acceptance criteria**
- Phone OTP by SMS, with WhatsApp as an alternative. OTP valid 10 minutes; resend after 30 seconds; 5 attempts per hour.
- Hindi is the default language; English available; more languages per corridor.
- Booking channels: WhatsApp, web, missed call (operator calls back within 4 working hours), IVR (reusing CM Helpline 181 infrastructure where the sponsor agrees), and assisted booking at shops and ward offices.
- Consent notice shown in the chosen language before first use (see [12-nfr-security.md](./12-nfr-security.md)).

### C2 Pickup request — Phase 1a
**Acceptance criteria**
- Items entered as category + count, with plain-language examples. Brand, model, and photo are optional.
- Modes: doorstep, drop point, drive.
- Doorstep requires society, wing/flat, landmark, pincode; gate instructions optional.
- If no agent serves the area, show the nearest drop point and the next ward drive, with a waitlist. Never show an empty map.

### C3 Device claim — Phase 1a
**Acceptance criteria**
- Optional: scan an EcoSure QR or IMEI barcode, or type IMEI or serial. See [16-product-passport.md](./16-product-passport.md) PP2.
- Claimed devices appear in "My devices" with their history.

### C4 Data-wipe help — Phase 1a
**Acceptance criteria**
- Shown for data-bearing items: back up, sign out of accounts, factory reset, remove SIM and memory card, in the user's language.
- Citizen confirms or asks the collector for help (recorded as "collector assisted").
- A data-bearing item cannot be marked collected without a confirmation.
- Photos show the sealed bag only, never a device screen.

### C5 Scheduling — Phase 1a
**Acceptance criteria**
- Window chosen from the agent's slots, including weekend mornings.
- Up to 3 reschedules by app, WhatsApp keyword `RESCHEDULE`, or IVR.
- `GATE` keyword alerts the collector to gate trouble.
- The first failed visit carries no penalty.

### C6 Safe handover — Phase 1a
**Acceptance criteria**
- Citizen receives the collector's name, photo, ID number, and a masked contact number before the visit.
- Citizen receives a 4-digit handover code and gives it only after the items are weighed and the price is paid.
- `SAFETY` keyword or a button reports a problem to the operator at once.
- Swollen or damaged batteries are refused with a message explaining where to take them.

### C7 Price and incentive — Phase 1a
**Story:** As a citizen, I want at least what the kabadiwala pays, plus something for doing it properly.

**Acceptance criteria**
- The collector pays the recycler's published material price on the spot (UPI or cash). The receipt names the recycler and the agent.
- The scheme incentive is paid in the next daily treasury batch (1–4 working days) after a valid handover code. Amounts are set per category by the sponsor.
- Payout methods: UPI, bank account, voucher at a partner outlet, or a nominee's account.
- Caps: 4 paid pickups per payee account per month; a device identifier earns only once; per-address limits. Held payments are explained in plain language.
- Incentives are not launched or increased while an election Model Code of Conduct is in force.

### C8 Status and receipt — Phase 1a
**Acceptance criteria**
- Messages at accepted, scheduled (with handover code), collector on the way, collected (weight, price paid), incentive paid, and recycled (attestation number and verification link).
- Same timeline on the web. The citizen sees no data about other users.

### C9 Drives — Phase 1a
**Story:** As a society secretary, I want one collection day for the whole building.

**Acceptance criteria**
- A drive has host (society, office, school, or IMC ward), date, time, expected volume, and assigned agent.
- Dispatch rule: the drive is confirmed when expected volume passes the corridor threshold (default 150 kg) or the operator overrides.
- Residents register items by WhatsApp link or at the drive desk.
- Batch weighing at the drive; each resident still gets a receipt, a handover code, and their incentive.
- Option: residents can pool incentives for the society fund.
- Host receives a certificate of participation (not an EPR certificate) with total weight and, later, attestation numbers.

### C10 Bulk consumer disposal — Phase 1a
**Story:** As an office admin, I need a disposal record that satisfies Rule 8.

**Acceptance criteria**
- Bulk consumers register as an organization and request collection.
- Receipts name the registered recycler receiving the material, with weight and category.
- Government offices get an assisted mode that records the GeM or MSTC disposal reference where e-auction rules apply.

### C11 Education — Phase 1a
Short Hindi guides, voice clips, and posters: what counts as e-waste, how to wipe devices, battery safety, why formal recycling matters.

### C12 Recognition — Phase 2
Optional civic badges (for example, "Recycled 10 kg"). No points balance or redemption catalog.

---

## 3. States each screen must handle

Loading, empty, success, error, unauthorized (401 → sign in), forbidden (403 with message), offline (show last known status and queue actions), payout held.

---

## 4. Out of scope
- Points balance or catalog
- Viewing organization finances
- Collection of loose or damaged batteries
