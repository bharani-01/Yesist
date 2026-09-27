# EcoSure — Regional Hub PRD

**Role:** `regional_hub`  
**Phase:** 1  
**Last updated:** 2026-09-27 (v2)

---

## 1. Summary

Hubs consolidate lots from shops into full trucks for an authorized recycler. A hub operates only under a signed offtake agreement with a recycler. Hubs plan multi-shop trips, receive and weigh offline, pay shops weekly, and manage advances.

What changed from v1: offtake agreement required before operation, trips as a first-class record, offline receipt, seasonal tolerance, advances, dwell caps, and settlements moved to phase 1.

---

## 2. Features

### H1 Onboarding — Phase 1
**Acceptance criteria**
- Documents, storage photos, and a monsoon-readiness check (covered, raised, drained storage).
- Cannot receive lots until at least one offtake agreement with an authorized recycler is active.

### H2 Offtake agreement — Phase 1
**Acceptance criteria**
- Records recycler, maximum dwell days (normal and monsoon), weight tolerance (normal and monsoon), reject rules, payment days, and return-freight payer.
- Signed copy stored. Operator approves.
- Expiry reminders 30 days ahead; lots cannot be sent under an expired agreement.

### H3 Trip planning — Phase 1
**Story:** As a hub lead, I want one vehicle to collect from three shops on one route.

**Acceptance criteria**
- Trip holds vehicle number, driver name and phone, route (list of shops), freight payer, and freight cost.
- Driver or hub can post a location note ("near Avinashi") by WhatsApp.
- Trip status: planned, loading, in transit, arrived, closed.

### H4 Receive and weigh — Phase 1
**Acceptance criteria**
- Receiver weigh per lot with photo and scale ID. Works offline and syncs later.
- Tolerance uses corridor settings (default 5%, 8% in monsoon months).
- Outside tolerance: dispute opens; undisputed weight proceeds to settlement.

### H5 Inventory and dwell — Phase 1
**Acceptance criteria**
- Inventory by lot, category, age, and destination recycler.
- Warning at 75% of max dwell; compliance flag at 100%.
- Monsoon mode uses monsoon dwell limits.

### H6 Outbound to recycler — Phase 1
**Acceptance criteria**
- Outbound trip to a recycler under an active agreement.
- Recycler's accept / partial accept / reject decision shown per lot.
- Rejection costs recorded as settlement lines per agreement terms.

### H7 Shop settlements and advances — Phase 1
**Acceptance criteria**
- Weekly settlement drafts for each shop from accepted weight and the corridor rate card.
- Hub finance role posts and marks paid; payment within 7 days of receipt.
- Issues advances within the cap; recovery is automatic.
- Float view: advances outstanding against expected recycler receipts.

### H8 Recycler receivables — Phase 1
Payables and receivables with the recycler, against agreement payment days.

### H9 Surge mode — Phase 2
Festival periods: extended receiving hours, overflow storage location, temporary labour slots, pause of non-urgent outbound.

### H10 Stats — Phase 1
Tonnes in and out, dwell time, load factor per trip, dispute rate, cost per tonne.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, offline with pending-sync count, agreement expired.

---

## 4. Out of scope
- Operating without a recycler agreement
- Seeing other hubs' finances
- Issuing attestations
