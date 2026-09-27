# 24 — Regional hub economics in Indore under PRD v2

**Agent:** 24 of 36, v2 deep research swarm
**Date:** 2026-09-27
**Angle:** Monthly P&L for a legally compliant EcoSure hub in Indore. The hub is treated as the recycler's collection centre, which brings consent, fire safety, a separate battery store, and the 180-day (e-waste) and 90-day (battery) storage limits. The report works out break-even tonnage, asks who should own the hub (the recycler, an IMC material recovery facility, or a third party), and asks whether the pilot needs a separate hub at all.
**Inputs read:** `docs/prd/06-regional-hub.md`, `docs/prd/10-workflows.md`, `docs/research/unit-economics-illustrative.md`, and v2-deep files `03`, `07`, `10`, `12`, `13`. No PRD files were edited.
**Convention:** Every rupee figure is **ILLUSTRATIVE**. Figures from listing sites, aggregators, or vendor blogs are marked **UNVERIFIED**. No phone quotes or site visits were made.

---

## 1. Sources

| # | Source | Used for | Status |
|---|--------|----------|--------|
| W1 | Leasewarehouse.in, city rent guide 2026 — https://leasewarehouse.in/blog/post_detailsbyslug/warehouse-rental-rates-india-by-city | Indore warehouse rent ₹6–15/sq ft/month | UNVERIFIED (aggregator) |
| W2 | OmPropertyDealer, Indore warehouse rent 2026 — https://www.ompropertydealer.com/warehouse-for-rent-in-indore | Small warehouse ₹12–20/sq ft; large ₹18–30 | UNVERIFIED (broker) |
| W3 | Magicbricks, Sanwer Road listings (5,000 sq ft at ₹35,000 = ₹7/sq ft; 11,000 sq ft at ₹77,000) — https://www.magicbricks.com/propertyDetails/5000-Sq-ft-Warehouse-Godown-FOR-Rent-Sanwer-Road-in-Indore&id=4d423630353038323137 ; https://www.magicbricks.com/propertyDetails/11000-Sq-ft-Warehouse-Godown-FOR-Rent-Sanwer-Road-in-Indore&id=4d423630333031393239 ; https://www.magicbricks.com/warehouse-godown-for-rent-in-sanwer-road-indore-pppfr | Large-unit rent floor; deposits | UNVERIFIED (listings, Apr–Jul 2026) |
| W4 | BookMyTempo, Tata Ace Indore — https://www.bookmytempo.in/indore/tata-ace-chota-hathi | Ace base ₹250–300, ₹25–30/km | UNVERIFIED |
| W5 | MovingSolutions, Indore mini-truck table — https://www.movingsolutions.in/tata-ace-chota-hathi-for-shifting-in-indore.html | Ace 750 kg, 7.2×4.9×4.9 ft; 407 2.5 t at ₹50/km | UNVERIFIED |
| W6 | Porter, Tata Ace Indore — https://porter.in/trucks/tata-ace-in-indore | Ace from ₹230 | UNVERIFIED |
| W7 | ShiftingApp, Indore trucks — https://shiftingapp.in/trucks-lorries/indore | 407 ₹3,280–6,150; 14 ft ₹5,740–9,840; Indore→Bhopal 14 ft ₹5,740–11,480; 5% GST on freight | UNVERIFIED |
| W8 | TruckGuru, Indore FTL rate card — https://truckguru.co.in/hire-truck-indore ; https://truckguru.co.in/chota-hathi-on-rent-indore | 14 ft (3.5 t) to Bhopal ₹9,145–9,925 plus tolls; ₹31–35/km | UNVERIFIED |
| W9 | MP minimum wages, 1 Apr–30 Sep 2026 — https://www.sgcms.com/regulatory-updates/minimum-rate-of-wages-madhya-pradesh-april-2026/ ; notification PDF mirror https://unitedconsultancy.com/wp-content/uploads/2026/04/Madhya-Pradesh-Minimum-Wages-VDA-Notification-Apr-2026.pdf | Unskilled ₹12,425/month; skilled ₹15,144 | Secondary mirror of Labour Commissioner notification (likely accurate) |
| W10 | ScrapRates, Indore e-waste — https://scraprates.in/indore/e-waste-scrap-price ; https://scraprates.in/indore | Indore mixed e-waste wholesale ₹40.34/kg (Aug 2026); household pickup ₹5–7 lower; Li-ion ₹79/kg | UNVERIFIED (aggregator) |
| W11 | Scrap.trade India index (25 Jul 2026) — https://scrap.trade/scrap-prices/india/ | Low-grade boards ₹374/kg; whole laptops ₹315/kg; whole phones ₹640/kg; flat-screen TVs and monitors ₹54/kg | UNVERIFIED |
| W12 | TodayPriceRates, e-waste 2026 — https://resale.todaypricerates.com/ewaste-scrap-rate | Mixed e-waste ₹30–100/kg; CRT/LED TV ₹40–150/kg; PCB ₹400–800/kg | UNVERIFIED |
| W13 | Urban Eco Recyclers (Bengaluru) — https://urbanecorecyclers.com/laptop-scrap-buyer-in-bangalore/ | Broken LCD panels ₹20–60/kg; Li-ion ₹80–150/kg | UNVERIFIED (vendor, other city) |
| W14 | The Kabadiwala, Indore — https://www.thekabadiwala.com/scrap-rates/Indore | Household e-waste ₹15/kg (consumer pickup) | UNVERIFIED |
| W15 | Zerodha Daily Brief on EPR — https://thedailybrief.zerodha.com/p/how-indias-e-waste-rules-found-their ; GreenSutra — https://greensutra.in/news/e-waste-epr-explained-2026/ ; CalcGuru — https://calcguru.in/how-to-start-an-e-waste-recycling-business-in-india/ | EPR certificates ₹10–50/kg; ₹22 floor under Delhi High Court challenge; GST on e-waste 18% (CalcGuru claim) | UNVERIFIED (secondary) |
| W16 | Newslaundry, Delhi HC stay (Jan 2026) — https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration | Certificates trading below floor | Secondary press |
| W17 | Knocksense, IMC EPR credit via PPP MRF — https://www.knocksense.com/indore/indore-municipal-corporation-becomes-first-urban-body-to-receive-epr-credit/ ; Free Press Journal on Indore waste system — https://www.freepressjournal.in/indore/indore-grit-that-deals-with-1200-tonnes-of-daily-waste | IMC six-way segregation (includes e-waste); garbage transfer stations; Nepra MRF (PPP) | News |
| W18 | Indian Masterminds, Swachhotsav e-waste drive — https://indianmasterminds.com/news/swachhotsav-indore-mohan-yadav-e-waste-drive-145675/ | IMC e-waste drop boxes and vehicles | News |
| W19 | Unique Eco Recycle — https://www.uerindia.com/ | In-city recycler at R.D. Udyog Nagar / Palda, Indore; says it runs "collection centres" and logistics | Company site |
| R03, R07, R10, R12, R13 | v2-deep files 03, 07, 10, 12, 13 | Legal status of the hub, storage limits, fire rules, battery rules, payment rails, MP facts | Swarm research (see their own sources) |

Key facts carried over from the swarm research:
- **Legal status (R03).** A hub is in effect the recycler's collection centre and should be listed in the recycler's MPPCB consent to operate (CTO), or hold its own. Only producers, recyclers, and refurbishers may set up battery collection centres. Storage limits are 180 days for e-waste and 90 days for batteries. IMC requires a Fire NOC above 500 m².
- **Local recyclers (R12).** Indore has three MPPCB-listed recyclers inside the city (Unique Eco Recycle, Samyak, Primero), with about 10,800 TPA of permitted capacity against roughly 450 t actually processed by Unique Eco Recycle in FY24. IMC already collects 2–2.5 t/day of e-waste.
- **Payments (R07).** Scheme money cannot fund advances or float held by a private operator. Advances need private money.
- **Batteries and fire (R13).** Batteries need a separate bay with fire partitions, detectors, a quarantine bin, and personal protective equipment (PPE). Battery consignments need Form 10 and prior intimation to the SPCB.

---

## 2. Assumptions (ILLUSTRATIVE)

### 2.1 Site and legal baseline for a compliant standalone hub

| # | Item | Value | Basis |
|---|------|-------|-------|
| A1 | Throughput design point | 20 t/month | Memo "green" band starts at 16 t/month |
| A2 | Stock on hand | ~20 t (30-day average dwell) | Normal dwell is well inside the 180-day limit |
| A3 | Space norm | ~5 m³/t blended (IT equipment 4, CRT 5, large appliances 6.5–10) | CPCB 2016 collection-centre guidelines (R03, R13) |
| A4 | Floor area | ~2,000 sq ft (~186 m²): stacks at 2 m height plus aisles, weighing area, loading, a separate battery bay, and a quarantine corner | Derived from A2 × A3 |
| A5 | Fire NOC | **Not required** below 500 m² under IMC's 2019 notice. A below-threshold declaration plus a full fire kit is still needed (CPCB norms) | R03 F8. The MP Fire Act 2026 is not yet in force (**UNVERIFIED**) |
| A6 | Consent | Hub listed in the recycler's CTO. If MPPCB instead requires its own consent (Green category), fees and consultant cost are about ₹25k/yr (**UNVERIFIED**) | R03 F7 |
| A7 | Batteries | **Excluded from hub storage in the pilot.** Loose batteries go from the shop drop point directly to a battery-registered recycler | R03 F5, R13 F3 |
| A8 | GST | Hub is GST-registered and charges GST on top of the recycler price. The recycler takes input credit. **If recycler quotes are GST-inclusive, 18% of the price (~₹6–7/kg) comes out of the spread** | W15. Rate conflicts between 5% and 18% (R07 F5), **UNVERIFIED** |

### 2.2 Fixed costs per month (standalone third-party hub, Sanwer Road / Palda belt)

| Line | ₹/month | Basis |
|------|--------:|-------|
| Godown rent, 2,000 sq ft at ₹12.5/sq ft | 25,000 | W1–W3. ₹7/sq ft is only available on units of 5,000 sq ft or more; small units run ₹12–20 |
| Hub lead (skilled, above minimum wage) | 25,000 | W9, plus market premium |
| 2 loaders (unskilled ₹12,425 plus ~13% PF/ESI) | 28,000 | W9 |
| Night security (unskilled plus statutory costs) | 14,000 | W9 |
| Part-time finance clerk (weekly settlements, GST) | 10,000 | Assumption |
| Power, water, internet, phones | 6,000 | Assumption |
| Fire and safety kit amortised (extinguishers, detector, battery-bay partition, metal quarantine bin, spill and mercury kits, PPE; ~₹2 lakh over 24 months) plus annual maintenance | 9,500 | R13 F3, F5 |
| Platform scale (1 t, calibrated) amortised, plus stamping | 2,500 | Assumption |
| Stock, fire, and public-liability insurance | 3,000 | Assumption, **UNVERIFIED** |
| Consent, legal, and agreement upkeep | 4,000 | A6 |
| Rent deposit financing cost (10 months' deposit at 18%/yr) | 3,750 | W3 (deposits of about 10× monthly rent seen) |
| **Total fixed (F)** | **≈ ₹1,30,750** | |

A **lean hub** (1,000 sq ft, lead plus one loader, shared security, no finance clerk) costs about **₹85,000/month**.

### 2.3 Variable costs per tonne

| # | Line | Base | Range | Basis |
|---|------|-----:|------:|-------|
| V1 | Recycler pays hub (household mixed, intact) | ₹42,000 | 35–50k | W10 Indore wholesale ₹40/kg. W11–W12 category spread. The recycler also earns ₹10–22/kg in EPR credits (W15), which gives it room to pay more |
| V2 | Hub pays shops (weekly) | ₹33,000 | 28–36k | Must sit near street wholesale less ₹5–7 (W10) to avoid multi-homing. The memo's ₹28k is below what the Indore street pays |
| V3 | Inbound multi-shop tempo (Ace, ~30 km route, ~500 kg because loads fill by volume first) | ₹3,000 | 2.4–4.5k | W4–W6: ₹250 base + ₹25/km + waiting ≈ ₹1,500/trip |
| V4 | Outbound hub → recycler | ₹1,150 (in-city 14 ft, ~₹4k per 3.5 t) | 1.1k–3.0k (Bhopal/Sehore: ~₹10.5k per 3.5 t incl. tolls) | W7, W8 |
| V5 | Grade loss, rejects, return freight | ₹1,000 | 0.5–2k | Memo H6 (scaled) |
| V6 | Bags, labels, battery tape and containers | ₹300 | | Assumption |
| V7 | Advance working capital plus default reserve | ₹500 | 500–2,100 | Memo |
| V8 | **Settlement float**: shops paid within 7 days, recycler pays on "payment days" (assume 30). About 4–5 weeks of payouts outstanding at 18%/yr | ₹550 | 0–900 | Derived. At 20 t/month about ₹8 lakh is outstanding |

**Contribution per tonne (base)** = 42,000 − 33,000 − 3,000 − 1,150 − 1,000 − 300 − 500 − 550 = **₹2,500/t**

---

## 3. P&L and break-even

### 3.1 Break-even throughput (standalone compliant hub, F = ₹1.31 lakh)

| Scenario | Spread (V1 − V2) | Contribution/t | Break-even t/month (full hub) | Break-even t/month (lean hub, ₹85k) |
|----------|-----------------:|---------------:|------------------------------:|------------------------------------:|
| Memo pricing (₹45k / ₹28k) | ₹17,000 | ₹10,500 | **12.5** | 8.1 |
| Moderate (₹44k / ₹32k) | ₹12,000 | ₹5,500 | **23.8** | 15.5 |
| **Indore street-anchored base (₹42k / ₹33k)** | ₹9,000 | ₹2,500 | **52** | 34 |
| Outbound to Bhopal/Sehore at base prices | ₹9,000 | ₹650 | **~200 (not viable)** | ~130 |
| Tight (₹40k / ₹34k) | ₹6,000 | −₹500 | **never** | never |

### 3.2 Monthly P&L at pilot-realistic volumes (base prices, full hub)

Pilot volume check: the v2 launch gate is 8 active shops, and the micro-tier cap is 500 kg/month per shop (R03). That gives **4 t/month** at the cap. Twenty well-run shops at about 1 t/month each give **20 t/month**.

| Throughput | Gross contribution | Fixed | **Hub EBITDA / month** | Loss per tonne |
|-----------:|-------------------:|------:|-----------------------:|---------------:|
| 4 t | ₹10,000 | ₹1,30,750 | **−₹1,20,750** | −₹30,200 |
| 10 t | ₹25,000 | ₹1,30,750 | **−₹1,05,750** | −₹10,600 |
| 20 t | ₹50,000 | ₹1,30,750 | **−₹80,750** | −₹4,000 |
| 52 t | ₹1,30,000 | ₹1,30,750 | **≈ 0** | 0 |
| 75 t (≈ IMC's current e-waste stream) | ₹1,87,500 | ₹1,30,750 | **+₹56,750** | +₹760 |

**Read:** a separate, compliant, third-party hub in Indore loses about **₹10–14.5 lakh a year** at pilot volumes (4–20 t/month). That is **₹4,000–30,000 of subsidy per tonne**, roughly 10–70% of the material's value. It breaks even only if the recycler pays well above street wholesale, or if it inherits a municipal-scale stream of about 50 t/month or more.

### 3.3 The same volume without a separate hub (shop → Indore recycler gate directly)

- The shop-to-hub leg is replaced by a longer shop-to-recycler multi-stop tempo run (Ace, ~40 km including the Palda leg): about **₹3,600/t** instead of ₹3,000 + ₹1,150.
- Incremental fixed cost to the recycler: roughly **₹15–25k/month** for one receiving clerk and a settlement desk. Consent, fire systems, weighbridge, security, and insurance already exist under its CTO.
- The recycler keeps ₹42k minus ₹33k minus ₹3.6k, which is about **₹5,400/t** before its own processing and EPR revenue (₹10–22k/t). That leaves it room to **raise shop rates to ₹35–37/kg**, beating street pickup and weakening multi-homing (memo Econ 2).
- Dwell: material enters a CTO-listed premises on the day of collection. The 180-day clock is then owned by a party that already reports to MPPCB. Truck-fill no longer drives dwell.

### 3.4 Dwell and legal limits: do they bind?

- **E-waste, 180 days.** At 4 t/month, a hub waiting to fill a 3.5 t truck holds stock for about 26 days. The limit does not bind. What does bind is holding cost and price risk (a ₹5/kg swing on 20 t is ₹1 lakh), not the law.
- **Batteries, 90 days.** Pilot battery flow is perhaps 50–200 kg/month (**ILLUSTRATIVE**). That is never a full truck, and it needs Form 10 plus SPCB intimation per consignment (R13 F4). **A battery bay at a third-party hub makes no economic sense.** Route batteries from shop drop points to a battery-registered recycler on a monthly milk run.
- **Fire.** Keeping the hub below 500 m² avoids an IMC Fire NOC but not the CPCB fire-kit requirements (~₹2 lakh capex). A recycler's plant already carries these costs.

---

## 4. Findings

**F1. A standalone compliant hub loses money at pilot scale in Indore.** With Indore street-anchored prices (recycler ~₹42/kg; shops must get ~₹33/kg to beat kabadi wholesale, W10), contribution is about ₹2,500/t against about ₹1.3 lakh/month of fixed cost. Break-even is about **52 t/month** (34 t for a lean hub). Pilot volume is 4–20 t/month, so the hub loses about ₹0.8–1.2 lakh every month. The illustrative memo's 12 t break-even depends on a ₹17/kg spread that the Indore street does not leave (the memo's ₹28k shop rate is below local wholesale).

**F2. Indore does not need a separate hub for the pilot.** Three MPPCB-listed recyclers sit inside the city (R12, W19), and the city is about 20–30 km across. A separate hub adds a handling step, a second freight leg, a second consent question, a second fire liability, and ~₹1.3 lakh/month. It solves nothing that multi-shop tempo trips straight to the recycler gate cannot. The PRD's consolidation logic (full trucks) only pays when the recycler is **more than ~150 km away**, and at Bhopal/Sehore distances the base spread still fails (~200 t/month to break even).

**F3. If there is a hub, the recycler should own or operate it.** The recycler:
- already holds CTO, hazardous-waste authorisation, fire systems, a weighbridge, and CPCB portal registration;
- is the only party legally allowed to run a battery collection centre (R03 F5);
- carries the 180-day storage clock;
- has private capital for advances and float (R07 F3–F4);
- earns EPR revenue that can fund better shop rates.

A **third-party hub** has no legal standing of its own, a thin spread, stock and price risk, a float gap caused by the recycler's payment days, and it needs the recycler's CTO listing anyway. It is the worst option.

An **IMC site** (garbage transfer station or MRF land) is attractive only as a *location* licensed to the recycler, which gives political cover and access to IMC's ~60–75 t/month e-waste stream (R12). As an *operator*, IMC cannot run weekly settlements or advances on public money (R07). The IMC stream is also the only visible path to hub-scale volume in Indore.

**F4. The payment-days mismatch is an unpriced cost in v2.** H7 requires shops to be paid within 7 days, while H8 lets the recycler pay "per agreement payment days" (typically 30–45). At 20 t/month that is about ₹8 lakh of float plus advances. It costs about ₹550/t in capital and needs a balance sheet a third-party hub lacks. Either the recycler pays within the settlement cycle, or the recycler (not the hub) pays shops directly.

**F5. The legal constraints mostly add fixed cost rather than bind operations.** At pilot volumes, the 180-day e-waste limit does not bind. The 90-day battery limit plus Form 10 and SPCB intimation make hub battery storage uneconomic, so batteries should bypass hubs. Fire compliance (~₹2 lakh capex, plus a NOC above 500 m²) and consent are sunk costs at a recycler but new costs at a third-party hub. That strengthens F3.

**F6. The PRD has no economic gate or telemetry for hubs.** H10 tracks cost per tonne but not fixed cost, break-even throughput, float outstanding, or days-to-fill versus remaining dwell. The launch checklist requires "1 hub" as if it were free. There is no "direct to recycler" corridor mode, and trips assume kg capacity, while e-waste tempos fill by volume first (Ace ≈ 4.9 m³ ≈ 500 kg of mixed e-waste).

**F7. Sensitivities, largest first:**
1. Recycler price versus street wholesale: each ₹1/kg changes break-even by about 10–20 t.
2. Whether GST is quoted inclusive or exclusive: potentially ₹6–7/kg (A8).
3. Distance to the recycler.
4. Rent size tier: small units cost ₹12–20/sq ft against ₹7 for big sheds.

EPR floor litigation (W15, W16) mainly affects the recycler's ability to pay above scrap value, and so it affects the hub indirectly.

---

## 5. Recommended PRD changes (not applied)

| # | File | Change |
|---|------|--------|
| 1 | `06-regional-hub.md` §1 and H1 | Add **hub operating models**: (a) **Recycler gate**, the default when an eligible recycler is within ~50 km. The `regional_hub` role is held by recycler staff at the recycler's own premises and no separate site exists. (b) **Recycler satellite**, a collection centre run by the recycler and listed in its CTO, possibly on IMC-licensed land. (c) **Third-party hub**, allowed only when the recycler is more than 150 km away. It must be listed in the recycler's CTO, and the recycler must commit a price floor and minimum offtake. Record the model on the hub record. |
| 2 | `00-overview.md` §8 and `13-roadmap.md` pilot | Replace "1 hub" with "**1 receiving point** (recycler gate or hub)". For Indore, the pilot runs **direct to the recycler gate**, with no separate hub. Add an economic gate: a separate hub launches only when forecast throughput is at least 1.3× its computed break-even for 3 consecutive months. |
| 3 | `06-regional-hub.md` H7/H8 and `10-workflows.md` §7 | Recycler payment days to the hub must be **no longer than the shop settlement cycle (7 days)**, or the recycler pays shops directly through the platform ledger. Advances are funded by the recycler or the operator's private capital, never by the scheme head. Show a float-versus-limit warning. |
| 4 | `06-regional-hub.md` H3/H6 and `10-workflows.md` §4–5 | Allow a **shop → recycler direct multi-stop trip** that skips the hub. Vehicle capacity is recorded in both kg and m³. The load planner uses category m³/t norms. |
| 5 | `06-regional-hub.md` H5 | Measure dwell from **first custody**. Add a truck-fill planner that warns when days-to-fill exceed the remaining dwell. **Batteries are never stored at non-recycler hubs in phase 1**; they go shop drop point → battery-registered recycler by milk run. |
| 6 | `06-regional-hub.md` H10 | Add P&L telemetry: fixed cost per month (entered by the hub), contribution per tonne, **break-even t/month**, float outstanding, advance exposure, load factor by m³, and outbound distance. |
| 7 | `03-domain-model.md` | Organisation or site: `hub_operating_model` (`recycler_gate` \| `recycler_satellite` \| `third_party` \| `ulb_site`), `site_owner_org_id`, `principal_recycler_id`, `floor_area_m2`, `fire_noc_required` (derived from area > 500 m²). Vehicle: `capacity_kg`, `capacity_m3`. Rate card: `gst_inclusive` flag. |
| 8 | `14-open-questions.md` | Add sponsor and operator questions: (a) Will IMC license a transfer-station or MRF corner to the corridor recycler as a satellite, and route its ~2 t/day e-waste stream through EcoSure custody? (b) Are recycler rate cards GST-inclusive? (c) Will the corridor recycler commit to 7-day payment or pay shops directly? (d) What minimum offtake price does the recycler commit to, relative to Indore street wholesale? |
| 9 | `docs/research/unit-economics-illustrative.md` (research, not PRD) | Re-base the hub economy on Indore street-anchored prices (~₹42k / ₹33k), add a fixed-cost line and a float line, and show the direct-to-recycler alternative. |

---

## 6. Score

**4 / 10** for the economic soundness of the v2 hub design in the Indore pilot.

- **Credit:** requiring an offtake agreement, multi-shop trips, weekly settlement, capped advances, and dwell caps is the right structure. These are exactly the levers that decide the economics.
- **Deductions:** v2 treats a separate hub as mandatory infrastructure. It has no ownership or operating model, no economic gate, and no direct-to-recycler mode. It ignores the gap between the 7-day shop payout and the recycler's payment days, and it has no fixed-cost or break-even telemetry. In Indore, where recyclers are inside the city, a compliant third-party hub needs about 50 t/month to break even, 3–12× the pilot's likely volume.
- **With changes 1–3 and 5:** a direct-to-recycler pilot with recycler-funded float and batteries bypassing hubs would score about **7–8**.
