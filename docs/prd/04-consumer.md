# EcoSure — Citizen PRD

**Role:** `citizen` (households, and societies / small offices making bulk requests)  
**Phase:** 1  
**Last updated:** 2026-09-27 (v2)

---

## 1. Summary

Citizens hand over e-waste through doorstep pickup, drop-off at a shop, or a society drive. They get paid by UPI when the material is collected, and they get WhatsApp updates in their language until the material is attested at a recycler.

What changed from v1: UPI incentive replaces EcoPoints as the main reward, device inventory is optional, WhatsApp moves to phase 1, and wipe confirmation and gate details are required.

---

## 2. Features

### C1 Phone-first sign-in — Phase 1
**Story:** As a citizen, I want to sign in with my phone number so I don't need an email or password.

**Acceptance criteria**
- OTP by WhatsApp first; SMS fallback if not delivered within 30 seconds.
- OTP valid for 10 minutes; resend allowed after 30 seconds; 5 attempts per hour, then a clear message with the retry time.
- Language chosen at first use (Hindi, English, corridor language) and saved.

### C2 Simple pickup request — Phase 1
**Story:** As a citizen, I want to say "2 phones, 1 laptop, 1 mixer" and book, without listing brands and models.

**Acceptance criteria**
- Items entered as category + count. Brand, model, and photo are optional.
- Categories include small household appliances (mixers, irons, fans) as listed in the e-waste schedule, with plain-language examples.
- Modes: doorstep, drop at shop, society drive.
- Doorstep requires society, wing/flat, landmark, pincode, and optional gate instructions and gate contact.
- If no shop serves the location, show "EcoSure is not live in your area yet" and offer a waitlist. Never show an empty map.

### C3 Wipe checklist — Phase 1
**Story:** As a citizen, I want to be sure my personal data is gone before I hand over my phone.

**Acceptance criteria**
- Shown automatically when any item is data-bearing (phone, tablet, laptop, storage).
- Steps in the citizen's language: back up, sign out of accounts, factory reset, remove SIM and memory card.
- Citizen confirms, or asks the collector for help (recorded as "collector assisted").
- A pickup with data-bearing items cannot be marked collected without a confirmation.
- Collector photos show the sealed bag only, never a device screen.

### C4 Scheduling and reschedule — Phase 1
**Acceptance criteria**
- Preferred window chosen from the shop's slots, including weekend mornings.
- Up to 3 reschedules, by app or WhatsApp keyword `RESCHEDULE`.
- `GATE` keyword notifies the collector that gate access is a problem.
- Failed visits record a reason; the first failed visit carries no penalty.

### C5 Status and receipt — Phase 1
**Acceptance criteria**
- WhatsApp messages at accepted, scheduled, collector on the way, collected, and sent for recycling.
- Collected message shows weight, categories, shop name, and incentive amount.
- Sent-for-recycling message shows the custody attestation number and a verification link.
- Same timeline visible on the web page. The citizen sees no data about other users.

### C6 UPI incentive — Phase 1
**Story:** As a citizen, I want a small payment when I hand over my e-waste so it is worth my time.

**Acceptance criteria**
- Paid to the citizen's UPI ID when the pickup is marked collected.
- Amount set per category by the programme operator; funded by the scheme budget or producer take-back pool.
- Paid once per pickup (idempotent). Failures retry and are visible to the operator.
- Reversible only by the operator with a recorded reason, for example proven fraud.
- Limit: 4 paid pickups per citizen per month (configurable) to deter abuse.

### C7 Nearby drop-off points — Phase 1
**Acceptance criteria**
- Lists approved and provisional shops within range, with address, hours, and categories accepted.
- Works as a text list on low bandwidth; map is optional.

### C8 Society drive — Phase 1
**Story:** As a society secretary, I want to organise one collection day for the whole building.

**Acceptance criteria**
- Secretary creates a drive with date, time, and expected volume.
- Residents register items against the drive by WhatsApp link.
- One gate pass for the collection team.
- Each resident still gets their own receipt and incentive.
- Society receives a summary with total weight and attestation numbers once processed.

### C9 Education — Phase 1
**Acceptance criteria**
- Short guides in each corridor language: what counts as e-waste, how to wipe devices, why formal recycling matters.
- Content managed by the programme operator.

### C10 Optional device list — Phase 2
Citizens can keep a list of devices they plan to dispose of. Not required for any pickup.

### C11 Recognition badges — Phase 3
Optional civic badges, for example "Recycled 10 kg". No points balance, no redemption catalog.

---

## 3. States each screen must handle

Loading, empty, success, error, unauthorized (401 → sign in), forbidden (403 with message), offline (show last known status and queue actions).

---

## 4. Out of scope
- EcoPoints balance or catalog
- Cash payment by the collector
- Viewing organization finances
