# EcoSure — Stakeholders and Personas

**Last updated:** 2026-09-26

---

## 1. Stakeholder map

| # | Stakeholder | Org type | Dashboard | Phase |
|---|-------------|----------|-----------|-------|
| 1 | Consumer | Individual | Consumer | 1 |
| 2 | Local Recycle Shop | Organization | Local Shop | 1 |
| 3 | Regional Hub | Organization | Regional Hub | 1 |
| 4 | Professional Recycler | Organization | Professional Recycler | 3 |
| 5 | Manufacturer (Business) | Organization | Manufacturer | 4 |
| 6 | Government Agency | Organization | Government | 4 |
| 7 | Platform Admin | Internal | Admin | 0 |

---

## 2. Personas

### 2.1 Consumer — “Priya, urban household”

- **Goals:** Dispose of old phones/laptops safely; earn rewards; learn correct segregation.
- **Pains:** Doesn’t know where to drop e-waste; distrusts informal scrap; no proof of recycling.
- **Jobs:** Register devices, schedule pickup, track status, redeem EcoPoints, read tips.
- **Success:** Pickup completed; EcoPoints credited; WhatsApp update received.

### 2.2 Local Recycle Shop — “Ramesh, neighbourhood collector”

- **Goals:** Steady inbound volume; fair payout from hub; simple schedule management.
- **Pains:** Paper-based requests; no visibility into settlements; limited training.
- **Jobs:** Accept pickups, collect, weigh, transfer to hub, view payouts/education.
- **Success:** High completion rate; transparent settlements; trained staff.

### 2.3 Regional Hub — “Meera, hub operations lead”

- **Goals:** Aggregate from shops; efficient outbound to recyclers; accurate regional stats.
- **Pains:** Fragmented shop partners; settlement disputes; weak inventory visibility.
- **Jobs:** Manage inbound from shops/businesses; create lots/transfers; settle with shops.
- **Success:** Low dwell time of inventory; settled books; clean chain-of-custody.

### 2.4 Professional Recycler — “Arjun, authorized recycler ops”

- **Goals:** Compliant processing; issue certificates; support EPR documentation.
- **Pains:** Incomplete inbound manifests; manual cert generation; regulator audit stress.
- **Jobs:** Receive hub lots; process; certify; settle; supply EPR packs to manufacturers/shops.
- **Success:** Certified lots; audit-ready trail; timely settlements.

### 2.5 Manufacturer — “Neha, EPR compliance manager”

- **Goals:** Meet EPR targets; produce CPCB/SPCB-ready reports; prove responsible recycling.
- **Pains:** Scattered recycler data; report assembly is manual; product-level visibility missing.
- **Jobs:** Track product e-waste footprint; find recyclers/hubs; download compliance reports.
- **Success:** Exportable reports; linked certificates; clear product disposal patterns.

### 2.6 Government Agency — “Officer Patel, SPCB analyst”

- **Goals:** Monitor regional e-waste flows; spot non-compliance; improve awareness.
- **Pains:** Incomplete informal sector data; delayed reports; no live platform view.
- **Jobs:** View aggregates; access education; submit platform feedback; monitor compliance signals.
- **Success:** Trusted aggregate dashboards; actionable non-compliance flags (read-only Phase 4).

### 2.7 Platform Admin — “EcoSure ops”

- **Goals:** Approve orgs; configure rate cards; resolve disputes; keep system healthy.
- **Pains:** Fake shops; settlement conflicts; integration failures.
- **Jobs:** KYC review, role assignment, config, audit inspection, support.
- **Success:** Only verified orgs operate; disputes closed within SLA.

---

## 3. Relationships

```text
Consumer ──pickup──► Local Shop ──transfer──► Regional Hub ──transfer──► Professional Recycler
                                                                              │
Manufacturer ───────────────────────────────────────── bulk / EPR ───────────┘
                                                                              │
Certificates / reports ──────────────────────────────────────► Manufacturer + Government
```

---

## 4. Shared needs across personas

- Clear status of material and money
- Trust via audit trail and certificates
- Education appropriate to role
- Mobile-friendly access for field collection
- Transparent permissions (no surprise data exposure)
