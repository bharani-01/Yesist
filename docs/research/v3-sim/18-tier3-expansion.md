# v3 real-life simulation 18 — Expanding EcoSure beyond Indore (Tier-2/3 and a second state)

**Simulation type:** Programme expansion war-game at month 18, run against the v3 PRD exactly as written  
**PRD reviewed:** [`../../prd/v3-PRD.md`](../../prd/v3-PRD.md) (all sections), plus the corridor launch checklist in [`../../prd/00-overview.md`](../../prd/00-overview.md) §8 (the v3 PRD refers to a "launch checklist" but does not restate it)  
**Prior research used:** [`../v2-deep/20-citizen-tier3.md`](../v2-deep/20-citizen-tier3.md), [`../v2-deep/15-india-precedents.md`](../v2-deep/15-india-precedents.md), [`../v2-deep/24-hub-economics.md`](../v2-deep/24-hub-economics.md)  
**Date:** 2026-09-27  
**Question:** When the state tries to copy EcoSure from Indore to a small town next door (Dewas), to a far-off Tier-2/3 city (Sagar or Rewa), and to another state (Odisha or Bihar), what actually happens?

> **How to read this.** This is a simulation. Places, recyclers, and municipal facilities are real and sourced. Volumes, costs, and behaviour are modelled. Every figure is marked **verified** (from an official or primary source), **secondary** (press, aggregator, or academic paper), **UNVERIFIED** (could not be confirmed), or **model** (my own calculation from stated assumptions). All rupee figures are illustrative.

---

## 1. Short answer

- **Dewas works — but only as a suburb of Indore, not as a copy of it.** It is 35–40 km from three Indore recyclers, has a municipal dry-waste recovery facility and door-to-door dry-waste collection, and speaks the same language. Run as a "spoke" of the Indore corridor, it can reach 1.5–3 tonnes a month at a sensible cost. Run as its own corridor, it fails the PRD's own volume gate (8 t/month) on day one.
- **Sagar passes the launch checklist on paper and fails in practice.** Recyclers exist 160–180 km away (Bhopal, Mandideep). The checklist counts supply (recycler, 8 collection points, templates), not whether material can be moved at a sane cost per kg or whether anyone will hand anything over. Municipal waste is run by a private concessionaire, not by the city, so "connect the IMC flow" has no direct equivalent.
- **Rewa is the "300+ km" case.** The only MP recycler within ~250 km is a Jabalpur unit whose current CPCB registration could not be confirmed. Otherwise material travels ~430 km to Bhopal, or crosses into Uttar Pradesh. Freight, storage-clock pressure, and recycler indifference make it the hardest MP case.
- **The "open standard" does not make another state easy.** Odisha has **zero** CPCB-registered e-waste recyclers on record; Bihar has **one** (150 tonnes a year). What blocks a new state is not the data schema — it is the legal direction from its pollution board, its own treasury system, its language, its operator contract, and where the material physically goes. The PRD's open standard (PP8) covers none of these.
- **Score: 4 / 10** for how well v3, as written, scales to real Tier-2/3 life. The core model (agents of recyclers, cash at the door, custody evidence, drives, voice channels) travels well. The expansion machinery (checklist, gates, hubs, freight, KPIs, state onboarding) was designed for Indore and silently assumes Indore everywhere.

---

## 2. Simulation set-up

### 2.1 Where Indore is at month 18 (assumption)

Using the PRD's own timeline (§25.1: 52–66 weeks from sanction to end of phase 2), month 18 is roughly the end of phase 2. For this simulation I assume the Indore corridor is **healthy but below its top gate**:

| Indore state at month 18 | Value | Status |
|--------------------------|-------|--------|
| Monthly formal tonnes through EcoSure | ~30 t (phase 1b gate of 25 t passed; phase 2 gate of 50 t not yet) | model |
| Recyclers active | 2 of the 3 Indore recyclers (Unique Eco Recycle, Primero Waste Solution) | assumption |
| IMC flow connected | Yes, vehicles and ward points logging | assumption |
| Software | Phases 0–1b live; phase 2 items (hubs, open standard, CPCB view) just shipped | assumption |
| Budget | On track with §26.1 base scenario | assumption |

The steering committee (§5.1) asks: "Replicate to Dewas, then to one far Tier-2/3 city (Sagar or Rewa), and prepare a second state using the open standard."

### 2.2 The three MP cities

| Item | Dewas | Sagar | Rewa | Status |
|------|-------|-------|------|--------|
| Population | 2.9 lakh (2011); ~4.3 lakh 2026 projection | 2.7 lakh (2011); ~3.5–4 lakh 2026 | ~2.4 lakh (2011); ~3 lakh 2026 | 2011 verified; projections UNVERIFIED |
| Wards | 45 | ~48 | ~45 | Dewas verified (LGD list); others UNVERIFIED |
| Distance to Indore | 35–40 km | ~370 km | ~650 km | secondary (road-distance estimates) |
| Nearest CPCB-registered recycler | 3 in Indore (35–40 km) | Bhopal (Optima, 18,000 TPA) ~180 km; Mandideep/Raisen (Lalit, 1,000 TPA) ~160 km | Jabalpur E-Waste Cleaners ~250 km (on MPPCB list, **not** found on CPCB register summary); else Bhopal ~430 km | MPPCB list verified; CPCB register via secondary summary; distances UNVERIFIED |
| Municipal solid waste set-up | Dewas Municipal Corporation with a trust-run material recovery facility (40 t/day dry waste) and online door-to-door dry-waste tracking (DWASte.in) | Ramky Enviro PPP (since 2020) for a 10-town cluster, ~350 t/day | Re Sustainability PPP (20–21 year concession) for 28 towns, ~350 t/day, 6 MW waste-to-energy plant | secondary (company and trust sites, press) |
| Any e-waste flow today | None found; MRF handles dry waste | None found | Hazardous electronics are "separated at hubs and sent to authorised recyclers" — which recyclers and how much is unknown | secondary (IJTER 2026 field study of Rewa) |
| Local language | Hindi, Malvi | Hindi, Bundeli | Hindi, Bagheli | general knowledge |

Key sources: MPPCB recycler list (https://www.mppcb.mp.gov.in/Recycler.aspx, **verified**), CPCB register summary by Adhāra Viveka (https://adhara-viveka.com/industrial-areas/e-waste-recycling/madhya-pradesh, **secondary**: 9 registered MP recyclers, 58,880 TPA, 92% of capacity in Sehore, Bhopal, Indore), DWASte (https://dwaste.in/about, **secondary**), Ramky Sagar project (The Hindu BusinessLine, 2020, **secondary**), Re Sustainability Rewa (company press release, **secondary**), Rewa e-waste field study (https://www.ijter.org/download/212606165736, **secondary**).

### 2.3 Volume model used throughout

Tier-3 household e-waste is assumed at ~0.5 kg per person per year (the same planning assumption as v2 report 20; Indore is ~1.2 kg). Formal capture in year 1 is assumed at 5–10% for households, plus bulk and government-office stock.

| City (~3.5 lakh people) | Generated per year | Household capture yr 1 (5–10%) | Bulk + government offices | **Total formal per month** |
|------|------|------|------|------|
| Dewas | ~175 t (plus industrial generation — Dewas is an industrial town) | 9–18 t | 6–12 t | **~1.5–2.5 t** |
| Sagar | ~175 t | 9–18 t | 5–10 t (university, cantonment, district offices) | **~1.2–2.3 t** |
| Rewa | ~150 t | 7–15 t | 5–10 t (divisional HQ offices) | **~1–2 t** |

All **model**; must be replaced by a local inventory before launch. For reference, the PRD's first volume gate is **8 t/month** (§26.3).

---

## 3. Simulation A — Dewas (Tier-3, 35 km from Indore)

### 3.1 Month 18–19: running the launch checklist

| Checklist item (00-overview §8) | Dewas result | Why |
|------|------|------|
| Government order + MPPCB agent direction in force | **Needs amendment** | The order and SP-10 say "Indore city only". A one-line amendment is enough if the MPPCB direction was written state-wide; if it named Indore, MPPCB must reissue |
| ≥1 recycler with agreements for every agent | **Pass** | Indore recyclers can reach Dewas agents on existing routes |
| "IMC collection flow connected" | **Pass with rewording** | The item literally says IMC. Dewas has its own corporation plus a trust-run MRF and door-to-door dry-waste collection — a smaller but real equivalent. Needs an MoU with Dewas Municipal Corporation *and* the trust |
| ≥8 active collection points | **Pass on count, weak on coverage** | 8 points for 45 wards ≈ 1 per 5–6 wards |
| Recycler escrow + treasury scheme code | **Pass** | Same recycler escrow; same state scheme code if the scheme's geography is widened |
| Hindi/English messages, IVR | **Pass** | Same language |
| 12-month baseline agreed | **Passes trivially, which is a problem** | Formal e-waste baseline is ~0 t. "30% above baseline" (§24.1) is meaningless when baseline is zero |
| Operator team trained | **Needs change order** | Operator contract is Indore-scoped (§5.4) |
| Election check | **Flag** | MP urban body elections were last held in 2022, so the next round falls due around mid-2027 (UNVERIFIED). A launch near month 18–20 may fall inside a code period (§23) |

**Result: passes** after a geography amendment and an operator change order. Real work: ~6–10 weeks, mostly paperwork.

### 3.2 Months 19–24: what happens on the ground

- **Collection:** Four agents sign up (two repair shops, one kabadi, one MRF drop point). The MRF is the star: its door-to-door dry-waste crews already visit every household, and handing them a bag of e-waste is the easiest possible habit. This is the Kerala Haritha Karma Sena pattern (v2 report 15) and it works.
- **Doorstep bookings:** thin — perhaps 60–100 a month. Most people prefer the monthly ward camp or handing items to the dry-waste crew.
- **Freight:** a Tata Ace round trip Dewas–Indore is ~₹1,800–2,500 (₹25–30/km, ~80 km, plus base; **secondary** Indore tempo rates). Filled by volume at ~500 kg a trip, that is **₹4–5/kg**. Cheap.
- **Hub:** none needed. Material goes straight to the Indore recycler gate, exactly as in the pilot (§16.1).
- **Month 24 volume:** ~2 t/month (**model**).

### 3.3 Dewas economics (model, per month at 2 t)

| Line | ₹/month | ₹/kg |
|------|--------:|-----:|
| Local coordinator (part-time, shared with Indore operator) | 35,000 | 17.5 |
| Outreach, camps, printing | 20,000 | 10 |
| Freight to Indore (4 trips) | 9,000 | 4.5 |
| Incentives (see §7) | 20,000–30,000 | 10–15 |
| Platform (marginal; shared instance) | ~5,000 | 2.5 |
| **Total public + recycler cost** | **~₹90,000–1,00,000** | **~₹45–50** |

Against a blended recycler value of ~₹45/kg (§26.2), Dewas runs at roughly break-even on a marginal basis because it rides Indore's fixed costs. **If Dewas were costed as a stand-alone corridor, the §26.2 table puts it well beyond ₹224/kg**, and the §26.3 volume gate (8 t/month) would kill it at the first review.

### 3.4 What breaks in Dewas

1. **The volume gate.** Dewas will never hit 8 t/month alone. Unless its tonnes are counted inside the Indore corridor, the PRD's own rule shuts it down.
2. **The KPI.** "≥30% above baseline" is undefined when baseline is zero. Dewas needs absolute targets (kg per person, households reached).
3. **The trust-run MRF is not a recycler agent yet.** It must sign an agent agreement with an Indore recycler (§5.2) and store intact items only. The trust also advertises "EPR solutions" on its website (**secondary**), so it may already sell plastic EPR paper — a conflict-of-interest check is needed before it becomes a custody point.

**Dewas verdict: 7/10.** It works because it is effectively part of Indore.

---

## 4. Simulation B — Sagar (Tier-2/3, ~180 km from the nearest recycler)

### 4.1 Launch checklist

| Checklist item | Sagar result | Why |
|------|------|------|
| Order + agent direction | Needs amendment | As Dewas |
| ≥1 recycler with agreements | **Pass on paper** | Optima (Bhopal, 18,000 TPA) or Lalit Industries (Raisen, 1,000 TPA) can legally appoint Sagar agents. But will they? At 1.2–2.3 t/month from 180 km away, Sagar is a rounding error for an 18,000 TPA plant |
| "IMC flow connected" | **Fails as written** | Door-to-door collection and transfer stations are run by Ramky under a PPP concession for 10 towns. The city does not drive the vehicles; the concessionaire does. Logging e-waste needs a contract variation or a side agreement with Ramky, which the PRD never mentions |
| ≥8 collection points | Pass on count | Each sees ~150–250 kg/month → ₹750–2,500/month margin at ₹5–10/kg. Most go dormant within 3 months (v2 report 20 F1) |
| Escrow + scheme code | **Weak** | A Bhopal recycler must fund a Sagar escrow for a trickle of material. Likely answer: "we'll pay when the truck arrives" — which breaks the 7-day agent reimbursement promise (§11 S5) |
| Hindi messages, IVR | Pass on text | Bundeli voice prompts and collector scripts not covered |
| Baseline | Trivially ~0 | Same KPI problem |
| Operator team | **Fails in practice** | Operator is ~370 km away in Indore. Every field visit is an overnight trip (~₹6,000–8,000 per person-visit including travel, stay, and allowance; **model**) |

**Result: passes "hollow"** — exactly the failure v2 report 20 predicted. The v3 PRD adopted report 20's channel fixes (IVR, missed call, assisted booking, nominee payout, voice clips) but **not** its checklist fix (supply + viability + access gates).

### 4.2 Months 19–24 on the ground

- **Collection:** citizens respond to monthly ward camps at markets and school grounds (GHMC and Kerala pattern). Doorstep bookings are rare and uneconomic: a collector riding 6 km for a 3 kg mixer earns less than the petrol.
- **Consolidation:** with no hub, each agent holds sealed lots. The PRD's 180-day cap (§5.2) is not the binding constraint — **summer battery storage** is (§23: "shorter storage for battery-bearing items"). An agent's back room in May, with lithium in phones and laptops, is a fire risk.
- **Freight:** a 14-ft truck Sagar–Bhopal costs ~₹9,000–10,000 one way (**secondary**, based on Indore–Bhopal quotes of similar distance) and fills by volume at ~1.5–2 t of mixed e-waste (**UNVERIFIED**). At Sagar's volume that is one truck roughly every month: **₹5–7/kg** if full. A half-full truck doubles it. A tempo instead costs ~₹20/kg.
- **Who pays freight?** The PRD answers this only for phase-2 hubs (§15.2 H2: "freight payer never the shop by default"). For a direct agent-to-recycler run from 180 km, nobody is named. In the simulation the recycler refuses, the operator has no money (§17.2), and the scheme has no freight line in the budget (§26.1). **Lots sit.**
- **Month 24 volume:** ~1–1.5 t/month, with lots delivered in irregular batches (**model**).

### 4.3 Hub economics at Sagar's volume

The PRD moves hubs to phase 2 and requires them to be recycler-owned (§15.1). v2 report 24 found a compliant stand-alone hub costs ~₹85,000 (lean) to ~₹1.3 lakh (standard) a month in fixed costs and breaks even around **52 t/month**. At 1.5 t/month:

| Option | Fixed cost/month | Cost per kg at 1.5 t |
|------|------:|------:|
| Standard recycler hub (report 24) | ~₹1,30,000 | **~₹87** |
| Lean hub | ~₹85,000 | **~₹57** |
| Corner of the ULB/concessionaire transfer station or MRF, under the recycler's agent agreement, shared staff | ~₹10,000–15,000 (fire kit, seals, a part-time handler) | **~₹7–10** |

A hub is not viable. A **consolidation corner inside existing municipal infrastructure** is — and SWM Rules 2026 already allow MRFs to act as e-waste deposition points (v2 report 15). The PRD has no such option.

**Sagar verdict: 4/10.** The citizen side mostly works thanks to v3's inclusion fixes; the logistics and money side has no owner.

---

## 5. Simulation C — Rewa (Tier-2/3, 250–430 km from a recycler)

### 5.1 Is there a local recycler, or must material travel 300+ km?

| Option | Distance | Problem | Status |
|------|------|------|------|
| Jabalpur E-Waste Cleaners (Jabalpur) | ~250 km | On the MPPCB authorisation list, but **not** in the secondary summary of the CPCB EPR register (9 MP recyclers). Under the 2022 Rules only CPCB-registered recyclers count; R1 (§12.2) would block it until registration is confirmed | MPPCB list verified; CPCB status UNVERIFIED |
| Optima (Bhopal) or Sehore cluster | ~430–480 km | Freight roughly doubles; one truck needs 1.5–2 months of Rewa volume | distances UNVERIFIED |
| A recycler across the border in Uttar Pradesh (Prayagraj is ~130 km) | ~130–300 km | UP holds the largest share of national capacity (114 recyclers per the same secondary register summary). But it is interstate: an MP-sponsored programme sending MP citizen material to a UP recycler under MPPCB's direction, with capacity data from UPPCB. The PRD's R1 check reads capacity "from the MPPCB consent" only | secondary; specific UP recycler near Rewa UNVERIFIED |

**Answer: without a confirmed Jabalpur registration, Rewa material must travel 300+ km inside MP, or cross state lines.** The PRD does not consider interstate offtake at all.

### 5.2 What else happens

- **Existing informal system is organised and efficient.** The 2026 Rewa field study (**secondary**) found a tiered network: itinerant collectors → one dominant scrap dealer (Dhobiya Tanki) → consolidators; repair shops at Shilpi Plaza harvest parts and sell damaged batteries and displays to Delhi agents; brand service centres (e.g. Lenovo) send e-waste to their own warehouses in Jabalpur or Lucknow. To compete, EcoSure must **recruit the dominant dealer as an agent**, not open 8 new points. The micro tier caps him at 500 kg/month (§8.5), which is far below his volume; he needs the standard tier from day one.
- **Municipal flow:** Re Sustainability's PPP already separates hazardous electronics at transfer hubs. This is either Rewa's best feedstock or a flow that already goes somewhere unknown. The baseline exercise (§24.1) may uncover leakage — a political risk the PRD should anticipate.
- **Freight at 430 km:** ~₹18,000–22,000 per truck (**model**, ~₹35–45/km plus tolls), ₹10–15/kg at full load, ₹20–30/kg part-loaded. That exceeds the kabadi price for mixed e-waste (~₹15/kg in Indore listings).
- **Storage clock:** at ~1 t/month, filling a 2 t truck takes 2 months — inside 180 days, but combined with battery heat rules in April–June, a Rewa agent may be forced to ship half-empty.
- **Language and trust:** Bagheli voice prompts; MP has India's lowest share of women owning a phone they use (38.5%, NFHS-5, **verified** via v2 report 20). v3's nominee payout (C7) and assisted booking (C1) help; the collection camp through SHG didis and ward offices is the real channel.

### 5.3 Rewa economics (model, per month at 1.2 t)

| Line | ₹/month | ₹/kg |
|------|--------:|-----:|
| Local coordinator (full-time; too far to share) | 45,000 | 37.5 |
| Operator travel from Indore (1 visit/month) | 8,000 | 6.7 |
| Outreach and camps | 20,000 | 16.7 |
| Freight to Bhopal (0.6 trucks) | 12,000 | 10 |
| Consolidation corner | 12,000 | 10 |
| Incentives | 15,000–20,000 | 12.5–17 |
| **Total** | **~₹1.1–1.2 lakh** | **~₹93–98** |

That is about **₹95,000 per tonne**, twice the material's value. Defensible as public spending (~₹14 lakh a year to formalise ~15 t in a whole division headquarters) only if the steering committee is told in advance and producers share the bill. Under §26.3 it is simply killed.

**Rewa verdict: 3/10.**

---

## 6. Simulation D — A second state using the "open standard" (Odisha, then Bihar)

### 6.1 What the PRD promises

- §5.7: "an open data model and event API (phase 2), a CPCB national read view, and one instance per state that federates aggregates."
- §9.5 PP8: the passport model and event API published as an open JSON schema.
- §25.7 phase 2 exit: "a second state or city can run an instance from the published standard."
- §22: "Each state adds its language before launch."

### 6.2 Odisha — month 18 onward

| Step | What actually happens | Blocker? |
|------|------|------|
| Read the open standard | Odisha's IT team (OCAC, **assumption**) reads the JSON schema. It describes passports and events. It says nothing about agents, treasury, or messaging | No |
| Get code | The PRD never says whether EcoSure's code is open-source, licensed, or MP-owned. MPSEDC's vendor contract decides. Odisha may have to procure a vendor and rebuild (~₹1.4 crore, §26.1) | **Yes** |
| Legal model | Needs an **OSPCB direction** recognising collection agents of registered recyclers. v3 relies entirely on "MPPCB direction" (§5.2, SP-02) | **Yes** (months) |
| Recycler | **Zero CPCB-registered e-waste recyclers in Odisha** (Adhāra Viveka register summary, **secondary**; CEEW report citing OSPCB's 2022-23 annual return confirms none, **secondary**). Every tonne goes to West Bengal, Andhra Pradesh, Jharkhand, or Chhattisgarh | **Yes — structural** |
| Recycler capacity check (R1) | Must read consent data from *another* state's pollution board. Not designed | Yes |
| Treasury | Odisha runs its own treasury system (IFMS). v3's rail B is MP-IFMIS/PFMS-specific | Adapter needed |
| Language | Odia script, Odia IVR, Odia DLT templates, Odia WhatsApp templates approved by Meta — none budgeted or timed | Yes (8–12 weeks, **model**) |
| Municipal integration | Odisha's urban SHG-run wealth centres/MRFs (Mission Shakti, **UNVERIFIED**) are an excellent Haritha-Karma-Sena-style channel — better than anything in Indore. v3 has no role or process for an SHG federation as a collection partner | Opportunity missed |
| Launch checklist | Fails items 1 (order/direction), 2 (recycler — none in state), 3 (IMC flow — no equivalent named), 5 (scheme code) | **Fails** |

**Odisha verdict: 2.5/10.** The schema is the easiest 5% of the job.

### 6.3 Bihar — quick contrast

- **Recycler:** one CPCB-registered recycler, Shreeram E Waste Recyclers and Traders, Samastipur, **150 TPA** (**secondary**, Adhāra Viveka and SimplyESG). In 2022 BSPCB told the NGT there were none (**verified**, CPCB status report in OA 08/2022). 150 TPA is ~12 t/month for the whole state; a single Patna corridor could saturate it. Most material would go to UP or West Bengal.
- **Language:** Hindi works for text — a real advantage over Odisha. Voice needs Bhojpuri, Maithili, Magahi, Angika.
- **Channels:** Bihar's JEEViKA women's SHG network (**UNVERIFIED** scale) is the natural collection-camp partner.
- **Phones:** Bihar has the lowest women's internet use in India (20.6%, NFHS-5, **verified** via report 20). Voice and assisted channels become the primary path, not the fallback.
- **Politics:** Bihar's assembly election was in late 2025; next Model Code of Conduct periods are municipal and panchayat polls (**UNVERIFIED** dates).

**Bihar verdict: 3.5/10.** Language is easier; recyclers and money are harder.

### 6.4 What "federation" really requires

The PRD's model — one instance per state, federating aggregates to CPCB — means every state procures hosting, a vendor, an operator, STQC and CERT-In audits, DLT registration, and WhatsApp onboarding on its own. That is ~₹3.9–6 crore and 52–66 weeks per state (§25.1, §26.1). §26.4 claims spreading the platform across 3–5 cities brings build cost to "₹7–12 lakh per city-year", but that only holds with a **shared** platform, which contradicts "one instance per state". The PRD needs to choose.

---

## 7. Cross-cutting numbers

### 7.1 Incentive cost per tonne

The PRD's worked example (§17.3) pays ₹50 per data-bearing device. Priya's 1.4 kg earned ₹100 of state incentive — **₹71/kg**, or ₹71,000 per tonne. That works in Indore because phone-heavy households are a minority of tonnes. In Tier-3, two opposite things happen:

| Scenario (per tonne of household e-waste) | Incentive cost | Notes |
|------|------:|------|
| Phone-rich mix: 200 phones + 20 laptops + 780 kg appliances; ₹50/device, ₹5/kg other | ~₹15,000/t (₹15/kg) | **model** |
| Appliance-heavy Tier-3 mix (CRT TVs, fans, mixers); phones lost to informal traders paying chip-shortage prices | ~₹6,000–8,000/t | **model**; phone bidding UNVERIFIED in MP (v2 report 20 F4) |
| Per-kg flat rate (Kerala-style ~₹8/kg, UNVERIFIED) | ~₹8,000/t | Simpler, fraud-resistant |
| Indore budget benchmark: ₹39 lakh ÷ ~400–600 t over 24 months | ~₹6,500–10,000/t | **model** from §26.1 |

Incentives are **not** the cost problem in Tier-3 (₹6–15/kg). **Fixed field presence and freight are** (₹30–60/kg at 1–2 t/month).

### 7.2 Agent density

| City | PRD default | Reality |
|------|------|------|
| Indore (~30 lakh) | ≥8 agents at week 4 (§25.3) | 1 agent per ~3.7 lakh people; volume from IMC carries the corridor |
| Tier-3 (~3.5 lakh) | "≥8 active collection points" (checklist) | 1 per ~44,000 people, each seeing ~150–250 kg/month → ₹750–2,500/month margin. Most go dormant. Better: 2–4 committed agents (including the dominant local scrap dealer at standard tier), 1 municipal consolidation corner, and a monthly camp calendar |

### 7.3 Household adoption

§24.1 targets ≥5% of households in covered wards in 12 months. In a ~75,000-household Tier-3 city that is ~3,750 households. At 3–5 kg each that is 11–19 t a year — consistent with the volume model. The 5% target is achievable **only through camps and municipal crews**, not doorstep booking.

### 7.4 Municipal capacity

| City | Who actually runs collection | What EcoSure needs from them | PRD coverage |
|------|------|------|------|
| Indore | IMC directly, plus vendors | Vehicle logging, ward drives | Designed for this (§14 G7, persona Rakesh) |
| Dewas | Corporation + charitable trust running the MRF | MoU with both; MRF as agent | Partly (drop point role exists) |
| Sagar | Ramky concessionaire (10-town cluster) | Contract variation or side agreement | **Not covered** |
| Rewa | Re Sustainability concessionaire (28-town cluster, 20+ years) | Same, plus disclosure of where separated e-waste goes today | **Not covered** |
| Odisha / Bihar towns | Varies; SHG federations | SHG-federation partner role | **Not covered** |

Most Tier-2/3 MP cities outside Indore run solid waste through **long regional PPP concessions**. The PRD's "layer over existing municipal flow" principle (§5.3) is right, but its mechanism assumes a city that drives its own trucks.

---

## 8. What breaks outside Indore — summary

1. **The launch checklist is Indore-shaped and supply-only.** It names IMC, counts 8 points, ignores freight distance, volume, recycler willingness, concessionaires, and dialect voice. It is also not in the v3 PRD itself (only in 00-overview §8).
2. **Volume gates and KPIs kill small cities.** 8/25/50 t/month (§26.3) and "≥30% above baseline" (§24.1) cannot be met or even computed in a Tier-3 town with a ~0 baseline.
3. **Nobody owns freight before phase 2.** §15.2 names a freight payer only for hubs. Direct agent-to-recycler runs over 150–450 km have no funder.
4. **Hubs are the wrong tool.** Break-even ~52 t/month (§15.1). Tier-3 needs a low-cost consolidation point inside existing municipal infrastructure.
5. **Recycler escrow assumes a keen local recycler.** A distant recycler has little reason to pre-fund escrow or advances (§17.2, §12.2 R3) for 1–2 t/month.
6. **Municipal integration assumes the city runs the trucks.** Sagar and Rewa run on private concessions.
7. **The micro tier caps the people who matter.** The dominant local scrap dealer is the real Tier-3 volume and exceeds 500 kg/month (§8.5).
8. **The field operator is centralised.** An Indore operator cannot support cities 370–650 km away without local staff (§5.4, §26.1).
9. **Interstate reality is missing.** Rewa may be closest to UP; Odisha has no recyclers; Bihar has 150 TPA. R1 reads capacity only from MPPCB consent.
10. **The open standard is a schema, not a replication kit.** No code licence, no treasury adapter, no SPCB-direction template, no language-pack process, no shared-hosting model.

---

## 9. PRD gaps (with sections)

| # | Gap | PRD section | Severity |
|---|-----|-------------|----------|
| G1 | Phase 3 expansion is one sentence: "New cities and states, each with its language and baseline." No playbook, no city archetypes, no entry gates | §25.8, §5.7 | High |
| G2 | Launch checklist not restated in v3; hardcodes IMC; supply-only; v2 report 20's supply/viability/access fix was not adopted | 00-overview §8; referenced in §7.2, §25.4, §28.1 #5 | High |
| G3 | Volume gates are per corridor with no Tier-3 archetype, pooling, or per-capita variant | §26.3 | High |
| G4 | Headline KPI relative to a baseline that is ~0 outside Indore | §24.1, §4.4 | Medium |
| G5 | No freight owner or freight budget line for direct long-haul agent-to-recycler movement | §15.2 H2, §16.4, §17, §26.1 | High |
| G6 | Hub is the only consolidation option; break-even 52 t; no MRF/transfer-station consolidation corner | §15, §6.3 principle 2 | High |
| G7 | Municipal integration assumes direct ULB control; PPP concessionaires not modelled | §5.1, §5.3, §14 G7, §7.2 (Rakesh) | High |
| G8 | Recycler escrow and advances assume recycler appetite; no fallback when the nearest recycler is distant or indifferent | §12.2 R3, §17.2, §27.2 ("backup recycler before phase 1b" only) | Medium |
| G9 | Micro tier 500 kg cap and 3-day decision fit small shops, not the dominant Tier-3 dealer | §8.5, §11.2 S1 | Medium |
| G10 | Operator is one Indore contract; no local coordinator model or travel budget | §5.4, §26.1 | Medium |
| G11 | Recycler verification reads MPPCB consent only; no interstate offtake, no other-SPCB consent, no interstate transport documents | §12.2 R1, §20.7, §21.1 | High for other states |
| G12 | Open standard covers passports and events only; no code licensing, treasury adapters, SPCB direction template, language-pack process, or hosting model; "one instance per state" contradicts the §26.4 shared-cost claim | §5.7, §9.5 PP8, §25.7, §26.4 | High |
| G13 | "Each state adds its language" with no budget, lead time, or dialect voice plan | §22 | Medium |
| G14 | No SHG federation / waste-picker cooperative partner role, although these are the strongest Tier-3 channels (Kerala, Pune, Odisha, Bihar) | §7.1, §8.2 | Medium |
| G15 | Tripwires and fraud ratios (device-count leakage, concentration) become statistical noise at 1–2 t/month | §18.3 | Low |
| G16 | Personas: Kamla (Mhow) is the only non-Indore persona; no Tier-3 dealer, no concessionaire, no distant-recycler operations persona | §7.2 | Low |

---

## 10. Fixes

### 10.1 The three highest-leverage fixes

**F1. Add a "Tier-3 spoke" archetype with municipal consolidation and a funded milk run.** (Fixes G3, G5, G6, G8, G10.)
- Every Tier-2/3 town joins as a **spoke of a parent corridor** (Dewas → Indore; Sagar → Bhopal; Rewa → Jabalpur or Bhopal, or a UP recycler once interstate rules are settled). Its tonnes count toward the parent corridor's volume gate.
- Consolidation happens in a **fenced, fire-kitted corner of the municipal MRF or transfer station**, run under the recycler's agent agreement (SWM Rules 2026 already allow MRFs as e-waste deposition points). No new hub.
- A **scheduled monthly milk run** (one truck, several towns on a route) with a named freight funder: first the recycler (who also earns EPR certificate value on every kg — reported ₹10–50/kg, UNVERIFIED), topped up by a scheme freight line capped per tonne-km, or by producer take-back escrow (§13.3 P6).
- One **local coordinator** per spoke (or per cluster of 2–3 spokes), contracted through the operator.
- Doorstep only above a minimum (e.g. 5 kg) or for elderly and disabled households; **monthly ward camps** and municipal crews are the default channel.

**F2. Rewrite the launch checklist as a three-part gate and move it into the v3 PRD.** (Fixes G2, G4, G7, G9, G14.)
- **Supply:** registered recycler willing to sign (written offtake with freight terms); municipal or concessionaire agreement (contract variation where collection is a PPP); ≥1 consolidation point; agents scaled to population and ward count; the dominant local dealer approached at standard tier.
- **Viability:** modelled volume fills one outbound trip within 60 days; freight cost per kg below a sponsor-set ceiling; marginal cost per kg reported to the steering committee in advance.
- **Access:** IVR in the local dialect; SHG, ward office, or common service centre assisted-booking partner signed; camp calendar published; local e-waste inventory done.
- Replace "≥30% above baseline" with **absolute targets** for new cities: kg per 1,000 residents per month and households reached.

**F3. Turn the open standard into a "state onboarding kit" on a shared national platform.** (Fixes G11, G12, G13.)
- Publish the code as **open source** (or license it royalty-free to other governments) and offer a **multi-tenant shared service** hosted by MPSEDC or NIC, with each state as a tenant owning its data. Drop "one instance per state" as the default.
- Kit contents: SPCB direction template; treasury adapters (MP IFMIS, Odisha IFMS, Bihar CFMS, PFMS); language pack process (script, IVR, DLT and WhatsApp templates) with an 8–12 week lead time; **interstate offtake module** (recycler verified against its home SPCB and the CPCB register, transport documents, capacity check); SHG federation partner role; checklist and archetypes from F1–F2.
- Change the phase 2 exit (§25.7) from "a second state *can* run an instance" to "**a second state has signed an onboarding MoU and passed the supply gate**", which is testable.

### 10.2 Other fixes

| # | Fix | Gap |
|---|-----|-----|
| F4 | Add a **standard-fast tier** for established scrap dealers (volume above 500 kg, decision in 5 working days, GST help) | G9 |
| F5 | Add personas: Rewa scrap dealer, Sagar concessionaire supervisor, Bhopal recycler logistics manager, Odisha SHG federation coordinator | G16 |
| F6 | Scale fraud tripwires by volume (minimum sample sizes before ratios alert) | G15 |
| F7 | Add a **per-city marginal cost line** to §26 (coordinator, camps, freight, consolidation, incentive) with the ~₹45–100/kg range shown here | G10 |
| F8 | Before any Rewa launch, confirm Jabalpur E-Waste Cleaners' CPCB registration or settle interstate offtake with UPPCB; add both to §29.3 facts to verify | G11 |
| F9 | Add the MP urban body election date (due ~2027, UNVERIFIED) to the expansion calendar | §23 |

---

## 11. Scores

| Expansion | Score /10 | One-line reason |
|------|:------:|------|
| Dewas (Tier-3, 35 km) | 7 | Works as an Indore spoke; fails only if treated as its own corridor |
| Sagar (Tier-2/3, ~180 km) | 4 | Citizen side fine; freight, escrow, and concessionaire have no owner |
| Rewa (Tier-2/3, 250–430 km) | 3 | Recycler uncertain, 300+ km or interstate, ~₹95/kg |
| Odisha (new state, 0 recyclers) | 2.5 | Schema is the easy 5%; legal, recycler, treasury, language all missing |
| Bihar (new state, 1 small recycler) | 3.5 | Hindi helps; recycler capacity and money do not |
| **Overall: how well v3 scales to real Tier-2/3 life** | **4** | Good citizen and custody core; expansion machinery built only for Indore |

**What would lift it to ~7:** F1 (spoke archetype with municipal consolidation and funded milk run), F2 (three-part checklist with absolute KPIs), and F3 (state onboarding kit on a shared platform). None changes the core custody model; all three change how the programme *leaves* Indore.

---

## 12. Sources

| # | Source | URL | Status |
|---|--------|-----|--------|
| 1 | MPPCB authorised recycler list (11 entries incl. Jabalpur E-Waste Cleaners, Optima Bhopal, Lalit Mandideep) | https://www.mppcb.mp.gov.in/Recycler.aspx | verified (as fetched Sep 2026) |
| 2 | CPCB EPR register summary for MP: 9 recyclers, 58,880 TPA; Bhopal 18,000, Sehore 25,080, Indore 10,800, Gwalior 4,000, Raisen 1,000 | https://adhara-viveka.com/industrial-areas/e-waste-recycling/madhya-pradesh | secondary |
| 3 | Same source, Odisha: 0 registered recyclers, 66 producers | https://adhara-viveka.com/industrial-areas/e-waste-recycling/odisha | secondary |
| 4 | Same source, Bihar: 1 recycler (Samastipur, 150 TPA), 27 producers | https://adhara-viveka.com/industrial-areas/e-waste-recycling/bihar | secondary |
| 5 | Shreeram E Waste Recyclers and Traders, Samastipur — CPCB status "Authorized" | https://simplyesg.com/epr-directory/ewaste/registration/shreeram-e-waste-recyclers-and-traders-145551 | secondary |
| 6 | CPCB status report to NGT, OA 08/2022: BSPCB reported no e-waste units in Bihar | https://www.greentribunal.gov.in/sites/default/files/news_updates/Status%20Report%20by%20CPCB%20in%20OA%20No.%2008%20of%202022%20(Varun%20Sheokand%20Vs.%20CPCB%20&%20Ors.).pdf | verified (dated 2022) |
| 7 | CEEW, Odisha EEE waste recycling: no authorised recycler per OSPCB 2022-23 annual report | https://www.ceew.in/sites/default/files/electrical-and-electronic-equipment-waste-recycling.pdf | secondary |
| 8 | DWASte / Dewas MRF, 40 t/day dry waste, door-to-door segregated collection, 45 wards | https://dwaste.in/about | secondary |
| 9 | Dewas census and ward list (2.9 lakh in 2011; 45 wards) | https://www.census2011.co.in/data/town/802248-dewas-madhya-pradesh.html | verified (2011); projection UNVERIFIED |
| 10 | Ramky Enviro Sagar MSW project, 10 ULBs, ~350 t/day | https://www.thehindubusinessline.com/companies/sagar-msw-ramky-enviro-inaugurates-integrated-waste-management-project/article32368481.ece | secondary |
| 11 | Re Sustainability Rewa integrated MSW + 6 MW WtE, 28 ULBs, ~350 t/day | https://resustainability.com/blog/press-release/re-sustainability-unveils-new-waste-to-energy-facility-in-rewa-further-strengthening-its-position-as-a-global-sustainable-solutions-leader/ | secondary |
| 12 | Rewa e-waste field study (informal tiers, repair shops, brand returns to Jabalpur/Lucknow, e-waste separated at hubs) | https://www.ijter.org/download/212606165736 | secondary (academic, 2026) |
| 13 | Rewa household e-waste paper (Pahadia plant has no e-waste line) | https://www.jetir.org/papers/JETIR2606363.pdf | secondary |
| 14 | Indore freight and hub cost benchmarks | [`../v2-deep/24-hub-economics.md`](../v2-deep/24-hub-economics.md) | secondary (listing sites) |
| 15 | NFHS-5 women's phone ownership and literacy (MP, Sagar, Bihar) | [`../v2-deep/20-citizen-tier3.md`](../v2-deep/20-citizen-tier3.md) | verified via report 20 |
| 16 | Kerala HKS, GHMC, Pune SWaCH precedents; SWM Rules 2026 MRF deposition points | [`../v2-deep/15-india-precedents.md`](../v2-deep/15-india-precedents.md) | mixed, per report 15 |

**Not verified:** road distances, 2026 populations, ward counts for Sagar and Rewa, freight quotes outside Indore, Jabalpur E-Waste Cleaners' CPCB registration, UP recyclers near Rewa, Odisha Mission Shakti and Bihar JEEViKA partner fit, EPR certificate price, MP urban body election dates, interstate e-waste transport document requirements.
