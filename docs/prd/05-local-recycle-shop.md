# EcoSure — Local Collection Shop PRD

**Role:** `local_shop`  
**Phase:** 1  
**Last updated:** 2026-09-27 (v2)

---

## 1. Summary

Shops collect from citizens and societies, weigh and group material into lots, send lots to the hub on shared trips, and get paid weekly. They can start working before full document review under a capped provisional tier.

What changed from v1: micro KYC with provisional operation, weekly settlement and advances in phase 1, Hindi and offline support in phase 1, hub-paid or shared freight, and impact stats moved below money.

---

## 2. Features

### S1 Onboarding with micro tier — Phase 1
**Story:** As a small shop owner without GST registration, I want to start collecting this week.

**Acceptance criteria**
- Micro tier needs: Aadhaar-verified owner phone, shop photo with signboard, address with landmark, UPI ID.
- GSTIN optional; required only for the standard tier.
- Provisional status allows operation up to 500 kg per month while documents are reviewed.
- Operator decides within 3 working days; the shop gets a WhatsApp message with the outcome and any missing items in plain Hindi.

### S2 Pickup queue — Phase 1
**Acceptance criteria**
- Shows requests in range with locality, categories, counts, and window. Full address appears after accepting.
- Accept, schedule, mark on the way, mark failed visit with reason.
- Queue caches for offline use and syncs actions when signal returns.

### S3 Collect and weigh — Phase 1
**Acceptance criteria**
- Records weight per pickup with a photo of the sealed bag.
- Blocks collection of data-bearing items without a wipe confirmation (citizen or collector assisted).
- Works fully offline; records keep their capture time.
- Large buttons and icons with Hindi labels for staff with limited reading.

### S4 Lots and trips — Phase 1
**Acceptance criteria**
- Groups collected pickups into a lot.
- Joins a hub-planned trip, including trips shared with other shops.
- Records sender weight with a photo when loading.
- Sees the hub's receipt weight and any dispute.

### S5 Money — Phase 1
**Story:** As a shop owner, I want to see what I'm owed and get it within a week.

**Acceptance criteria**
- Home screen leads with: amount due, next payment date, advance outstanding.
- Weekly settlement paid within 7 days of hub receipt, to UPI or bank.
- Undisputed weight paid even when part of a lot is disputed.
- No minimum amount; small balances carry forward.
- Advance request up to 40% of average weekly received value over 4 weeks (smaller cap for new shops); recovered automatically.
- Downloadable statement per week.

### S6 Rates — Phase 1
**Acceptance criteria**
- Current rate card for the corridor visible, with version and effective date.
- Rate card reviewed weekly by the operator.
- Morning WhatsApp message when rates change.

### S7 Freight — Phase 1
**Acceptance criteria**
- Shops do not pay freight for hub trips by default. Freight payer (hub or shared) is shown on each trip.
- If a shop is outside the hub's route, it can request a pickup trip or use a nearby collection point set by the operator.

### S8 Disputes — Phase 1
**Acceptance criteria**
- Weight disputes raised within 72 hours of hub receipt, with photos.
- Operator resolves within 5 working days.
- Status shown on the lot and in WhatsApp.

### S9 Stats — Phase 1
Own pickups completed, kilograms collected, completion rate, failed-visit reasons. Shown below the money section.

### S10 Training — Phase 1
Short Hindi (and corridor language) videos and guides: weighing, wipe help, handling batteries.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, offline with sync status, provisional-cap reached.

---

## 4. Out of scope
- Seeing other shops' jobs or payments
- Setting their own platform rates
- Issuing attestations
