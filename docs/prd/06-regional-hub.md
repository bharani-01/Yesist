# EcoSure — Regional Hub PRD

**Role:** `regional_hub`  
**Phase:** 2 (not in the Indore pilot)  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

In the Indore pilot, agents deliver straight to the recycler's gate, so there is no separate hub. The 36-agent review found a standalone hub breaks even only around 52 tonnes a month, far above pilot volumes. A hub is added in phase 2 when a corridor is far from its recycler, and it is owned or contracted by the recycler, so it holds material as the recycler's agent.

Changes from v2: moved from phase 1 to phase 2; recycler-owned or contracted only; same agent, seal, storage, and battery rules as other agents; offtake agreement replaced by the agent agreement.

---

## 2. Features

### H1 Onboarding — Phase 2
**Acceptance criteria**
- Agent agreement with the recycler; storage, fire safety, and monsoon-readiness checks (covered, raised, drained, with extinguishers suitable for lithium batteries).
- Cannot receive lots without an active agreement.

### H2 Trip planning — Phase 2
**Acceptance criteria**
- Multi-agent trips with vehicle, driver, route, freight payer (hub or recycler; never the shop by default), and freight cost.
- Vehicle GPS where available; otherwise location notes by WhatsApp.
- Status: planned, loading, in transit, arrived, closed.

### H3 Receive and weigh — Phase 2
**Acceptance criteria**
- Receiver weight per lot on a connected scale or with photo; seal check. Works offline.
- Tolerance: 5% default, 8% monsoon. Outside tolerance: dispute opens; undisputed weight proceeds.
- Lots stay sealed; the hub does not open or dismantle them except to inspect a dispute, with photos.

### H4 Inventory and storage deadline — Phase 2
**Acceptance criteria**
- Inventory by lot, category, age, and storage deadline (the original lot deadline still applies, never over 180 days in total).
- Warning at 75%, flag at 100%.

### H5 Outbound to recycler — Phase 2
Consolidated trips to the recycler; recycler accept / partial / reject shown per lot.

### H6 Surge mode — Phase 2
Festival periods (Diwali, Dussehra): extended hours, overflow storage, temporary labour, pause of non-urgent outbound.

### H7 Stats — Phase 2
Tonnes in and out, dwell, load factor per trip, dispute rate, cost per tonne.

---

## 3. Screen states
Loading, empty, success, error, 401, 403, offline with sync count, agreement expired, storage deadline near.

---

## 4. Out of scope
- Independent hubs without a recycler principal
- Dismantling
- Paying agents directly (agents are paid from recycler escrow)
- Issuing attestations
