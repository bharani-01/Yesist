# EcoSure — Tier-2 / Tier-3 India Field Issues

**Type:** Simulated field research (persona agents grounded in PRD)  
**Date:** 2026-09-27  
**Method:** Six parallel persona agents role-playing real users in Indian Tier-2/3 cities against [`docs/prd/`](../prd/)  
**Status:** Product input — not live user interviews (validate with real pilots next)

---

## Personas deployed

| Persona | City | Tier | Role |
|---------|------|------|------|
| Priya Sharma, 28, teacher | Nashik, MH | 2 | Consumer |
| Aditya Singh, 21, student | Gwalior, MP | 3 | Consumer |
| Ramesh Patel, 45, shop owner | Bhagalpur, BR | 3 | Local Recycle Shop |
| Meera Iyer, 36, hub ops | Coimbatore, TN | 2 | Regional Hub |
| Neha Gupta, 34, EPR exec | Indore, MP | 2 | Manufacturer |
| Officer Suresh Kulkarni, 48 | Kolhapur–Sangli, MH | 2 | Government / SPCB |

---

## Cross-cutting verdict

EcoSure’s chain-of-custody model is right. **Tier-2/3 India will not adopt a metro, English-first, app-dashboard, points-later, monthly-settlement product** without redesigning for:

1. **WhatsApp-first** (not Phase-2 outbound-only)  
2. **Cash / UPI liquidity** (shops + often consumers)  
3. **Hindi + regional languages early** (Marathi, Tamil — not Hindi-only in Phase 5)  
4. **Offline / weak-network ops** (godown tin roofs, gali signal)  
5. **Trust rituals** (data wipe, landmark addresses, society/PG gates)  
6. **Honest coverage** (empty nearby shops, informal kabadi invisible to government)

---

## Theme heatmap

| Theme | Priya | Aditya | Ramesh | Meera | Neha | Suresh |
|-------|:-----:|:------:|:------:|:-----:|:----:|:------:|
| Language (local / Hindi) | X | X | X | X | X | X |
| WhatsApp as primary channel | X | X | X | partial | — | — |
| Cash/UPI vs delayed points/settlement | X | X | X | X | — | — |
| Address / gate / PG / landmark | X | X | X | — | — | — |
| Data wipe / privacy fear | X | X | — | — | — | PII/RTI |
| Network / power / offline | X | X | X | X | — | X |
| KYC / GST / approval friction | — | OTP | X | — | — | Platform≠statutory |
| Weight dispute / scale politics | — | — | X | X | — | Self-report distrust |
| Hub distance / freight | — | — | X | X | MP/CG partners | — |
| CPCB/SPCB / cert legal validity | — | — | — | — | X | X |
| Phase timing too late | WhatsApp P2 | Points P2 | Settle P3 | Offline P5 | Mfr P4 | Gov P4 |

---

## Top blockers to fix before / during Phase 1

### B1 — Language
English-first + Hindi in Phase 5 fails Nashik (Marathi), Coimbatore (Tamil), Bhagalpur/Gwalior (Hindi).  
**Ask:** Phase 1 UI strings + WhatsApp templates in **Hindi + English**; add Marathi/Tamil for MH/TN pilots.

### B2 — WhatsApp timing and direction
Consumers and shops live on WhatsApp. Outbound-only in Phase 2 + no inbound reply = missed reschedules (“gate locked”, “light gaya”).  
**Ask:** WhatsApp OTP + status in Phase 1 pilot cities; allow simple keyword replies or callback CTA.

### B3 — Money timing
Scrap wala = cash today. EcoPoints later + monthly shop settlement = abandon.  
**Ask:** Optional small UPI for consumers in pilot; **weekly** shop settlement or hub advances; don’t lead with points-only.

### B4 — Empty supply density
Manual org approval + geo nearby = empty map in Tier-2/3 at launch.  
**Ask:** City launch checklist (min N approved shops); honest “not in your city” state; provisional shop operate with caps.

### B5 — Landmark / society / PG pickup
Lat-lng fails galis; societies and PG hosts block strangers.  
**Ask:** Landmark + wing/flat + gate-pass fields; “drop at shop” option; fuzzy address until accept + call/WhatsApp.

### B6 — Offline hub / shop collect
Power cuts and 1-bar signal break multi-step forms.  
**Ask:** Offline weigh/receive queue for hub (and shop collect) before Phase 5.

### B7 — Multi-shop one truck
Coimbatore reality: one tempo, three shops.  
**Ask:** Trip/manifest entity in domain model (Phase 1 transfer design).

### B8 — Manufacturer & government too late
EPR filings and Board needs don’t wait for Phase 4.  
**Ask:** Producer certificate list + export as soon as Phase 3 certs exist; Board pilot read-export earlier with coverage disclaimers.

---

## Ticket index (selected)

Full persona narratives live with the agents that produced them; key IDs:

### Consumer — Nashik (Priya)
- ESC-NASHIK-01 Marathi missing  
- ESC-NASHIK-02 WhatsApp MVP gap  
- ESC-NASHIK-03 Cash vs points  
- ESC-NASHIK-06 Empty nearby shops  
- ESC-NASHIK-07 Society gate / landmark  
- ESC-NASHIK-08 Data wipe gate  

### Consumer — Gwalior (Aditya)
- T-01 OTP/Jio fails  
- T-02 Address distrust  
- T-03 PG pickup ban  
- T-05 Delayed points = scam feel  
- T-07 Cash now vs points later  

### Local shop — Bhagalpur (Ramesh)
- LS-01 Pending approval zero earning  
- LS-02 GSTIN hard for micro shops  
- LS-03 Hindi UI Phase 5 too late  
- LS-04 Monthly settlement kills capital  
- LS-06 Hub distance / freight  

### Regional hub — Coimbatore (Meera)
- HUB-CBE-01 Tamil UI/templates  
- HUB-CBE-02 Offline weigh/receive  
- HUB-CBE-03 Multi-shop vehicle manifest  
- HUB-CBE-04 Seasonal weight tolerance  
- HUB-CBE-05 Vehicle/trip tracking  
- HUB-CBE-06 Shop cash advances  

### Manufacturer — Indore (Neha)
- EPR-IND-01 Export earlier than Phase 4  
- EPR-IND-02 CPCB/SPCB mapper versions  
- EPR-IND-03 Attribution for mixed lots  
- EPR-IND-05 MP/CG partner discovery  
- EPR-IND-07 Bilingual compliance artifacts  
- EPR-IND-08 Approval before download  

### Government — Kolhapur/Sangli (Suresh)
- GOV-MPCB-01 Phase 4 too late for Board  
- GOV-MPCB-02 Marathi reports  
- GOV-MPCB-03 Offline field pack  
- GOV-MPCB-05 Platform approved ≠ MPCB authorised  
- GOV-MPCB-06 Informal kabadi invisible  
- GOV-MPCB-07 Fake certificate verification  

---

## Recommended PRD / roadmap deltas

| Change | Target doc / phase |
|--------|-------------------|
| Hindi (+ pilot Marathi/Tamil) in Phase 1 | OQ-53, roadmap Phase 1 |
| WhatsApp OTP + status in Phase 1 pilots | Integrations, Phase 1–2 merge for pilot |
| Consumer UPI micro-incentive option | OQ-03, consumer PRD |
| Weekly settlement / advances for shops | OQ-02, hub + shop PRD |
| Landmark, society, drop-at-shop flows | Workflows, consumer, shop |
| Offline collect/receive | NFR, hub/shop Phase 1 |
| Trip multi-lot manifest | Domain model |
| Manufacturer export with Phase 3 certs | Roadmap Phase 3–4 |
| Gov coverage disclaimer + cert verify-by-number | Government PRD |
| Mandatory wipe checklist before collected | Consumer + workflows |

---

## Next validation (real, not simulated)

1. 5 consumer interviews each in Nashik + Gwalior  
2. 3 shop ride-alongs in one Tier-3 town  
3. 1 hub day observation (Coimbatore or similar)  
4. 1 EPR manager worksheet review (Indore/Pithampur)  
5. Soft briefing with one SPCB regional officer (no sales pitch)

Until then, treat this file as **high-signal hypothesis**, not statistical truth.
