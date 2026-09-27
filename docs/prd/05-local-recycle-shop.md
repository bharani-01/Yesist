# EcoSure — Collection Agents PRD (Shops, Informal Collectors, Drop Points)

**Roles:** `local_shop`, `informal_collector`, `drop_point`  
**Phase:** 1a  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

Collection agents are the first custody point. Each one acts as the documented agent of a named CPCB-registered recycler or producer, under an MPPCB direction. Agents collect intact items only, never dismantle, pay citizens the recycler's price, seal lots, and deliver to the recycler's gate before the storage deadline. Informal collectors join as micro-tier agents so they can work formally without losing their cash business. Drop points (IMC ward points, retailers, PRO bins) log what they already collect.

Changes from v2: agent-of-recycler legal model, informal collector and drop point roles, any-of ID instead of Aadhaar-only, material price paid on the spot, reimbursement from recycler escrow, seals, storage deadlines, battery triage, connected scales, device ID scanning.

---

## 2. Features

### S1 Onboarding — Phase 1a
**Story:** As a small shop owner or kabadiwala without GST, I want to start collecting this week without risk.

**Acceptance criteria**
- Micro tier: any one of DigiLocker, Aadhaar offline QR, in-person ID check, NAMASTE ID, or e-Shram card; photo of the person and premises (if any); payout account.
- Signed agent agreement with a recycler (e-sign or paper upload) naming categories, intact-only handling, and maximum storage days.
- Provisional operation up to 500 kg per month while documents are reviewed; decision within 3 working days, communicated in plain Hindi.
- Standard tier for shops with full documents and GSTIN where registered.
- Plain-language notice: data is used to run the programme and is not shared with enforcement except through the lawful request process.

### S2 Pickup queue — Phase 1a
**Acceptance criteria**
- Requests in range with locality, categories, counts, and window. Full address after accepting.
- Accept, schedule, mark on the way, mark failed visit with reason.
- Works offline; syncs when signal returns.

### S3 Collect — Phase 1a
**Acceptance criteria**
- Battery check per item: no battery, intact embedded battery (accepted), swollen or damaged (refused, referral message sent).
- Data-wipe confirmation required for data-bearing items.
- Scan IMEI or serial barcodes where possible (creates or links passports). Works offline.
- Weigh on a connected scale where available; otherwise enter weight with a photo of the scale display.
- Pay the recycler's material price (UPI or cash) and record it.
- Enter the citizen's handover code to complete. Wrong codes are limited to 5 attempts.
- Large buttons, icons, and Hindi labels.

### S4 Lots and delivery — Phase 1a
**Acceptance criteria**
- Group collected pickups into a lot sealed with a numbered tag.
- Storage deadline shown on each lot (agreement maximum, never over 180 days). Warning at 75%.
- Record sender weight at loading; join a recycler-planned trip or deliver to the recycler gate.
- See receiver weight, seal check result, and any dispute.

### S5 Money — Phase 1a
**Acceptance criteria**
- Home screen leads with: amount due from recycler escrow, next payment date, advance outstanding.
- Reimbursement for accepted weight within 7 days of recycler receipt, to UPI or bank.
- Undisputed weight is paid even if part of a lot is disputed.
- Advance up to 40% of average weekly accepted value over 4 weeks (20% for new agents), funded from recycler escrow; recovered automatically.
- Chargebacks after proven fraud shown with reason and evidence.
- Weekly statement download.

### S6 Rates — Phase 1a
Current recycler rate card with version and effective date; WhatsApp message when rates change.

### S7 Drop point mode — Phase 1a
**Story:** As an IMC ward point or retailer, I want to log items people drop off, without doorstep features.

**Acceptance criteria**
- Walk-in logging: category, count, optional device scan, optional phone number of the person dropping off (for their incentive and handover code).
- Bin sensor fill alerts (phase 2) trigger a collection trip.
- Same lot, seal, and storage rules as shops.

### S8 Disputes — Phase 1a
Weight or seal disputes raised within 72 hours of recycler receipt with photos; operator resolves within 5 working days.

### S9 Stats — Phase 1a
Own pickups, kilograms, devices with passports, completion rate, failed-visit reasons. Shown below money.

### S10 Training — Phase 1a
Hindi videos and guides: battery safety, data-wipe help, weighing and sealing, storage limits, collector conduct and safety.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, offline with sync count, provisional cap reached, agreement expired, lot near storage deadline.

---

## 4. Out of scope
- Dismantling or breaking devices
- Collecting loose or damaged batteries
- Seeing other agents' jobs or payments
- Setting rates
- Issuing attestations
