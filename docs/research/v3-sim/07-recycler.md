# 07 — Recycler simulation: Arjun runs an Indore recycler inside EcoSure v3 for six months

**Simulator:** v3 real-life simulation, recycler lens
**Date:** 2026-09-27
**PRD reviewed:** [`../../prd/v3-PRD.md`](../../prd/v3-PRD.md) (whole document; recycler-relevant sections 5.2, 7, 8, 9.5, 11, 12, 13.3, 14.3, 16, 17, 18, 19, 24, 26, 27)
**Prior research used:** [`../v2-deep/25-recycler-adoption.md`](../v2-deep/25-recycler-adoption.md), [`../v2-deep/18-fake-certificates.md`](../v2-deep/18-fake-certificates.md), [`../v2-deep/02-cpcb-epr-portal.md`](../v2-deep/02-cpcb-epr-portal.md)
**Status:** Simulation. Arjun, his competitors, and every rupee figure below are invented to stress-test the design. Market numbers come from desk research and are marked.

**Legend:** **[V]** checked against an official or primary source (mostly via the v2-deep reports). **[S]** secondary source (press, consultant, company filings as reported by press). **UNVERIFIED** means a single weak source, a marketing page, or my own assumption. Every rupee model in this file is **illustrative**.

---

## 0. Bottom line

EcoSure v3 is a good deal for the *idea* of an honest recycler and a poor deal for a real one in the first six months.

- The feedstock is real but small (about 4–10 tonnes a month for one recycler during the pilot, against Arjun's 100 tonnes a month), lower in value per kg than his corporate and auction material, and it **loses roughly ₹0.3–0.9 lakh a month** at pilot volume once scanning, agent management, and escrow are counted.
- The escrow is not the killer. About **₹3–8 lakh** sits in escrow, and **₹9–18 lakh** in total is tied up once unsold pipeline stock is included. That is manageable for a 3,000 TPA plant.
- The killers are **exposure asymmetries**:
  - certificate provenance labels 90% of an honest participant's certificates "unbacked" simply because most of his material did not come through EcoSure;
  - a self-reported 5% mass balance flags honest messy plants and passes fraudsters who type neat numbers;
  - the recycler carries principal liability for agents' battery fires and illegal storage, with no template, no insurance, and no safe harbour.
- A competitor who refuses to join carries none of this risk. A "paper recycler" can use a small, real EcoSure flow as a legitimacy badge.

**Score: 4.5 / 10** for how well v3 works for recyclers in real life. With the fixes in section 8, about 7.

---

## 1. Market facts the simulation rests on

| Fact | Value | Status |
|------|-------|--------|
| EPR certificate floor price (per kg of equipment) | ₹34 ITEW, ₹22 CEEW, ₹23 LSEEW (30% of environmental compensation) | [V] CPCB EC guidelines Sep 2024, via `02` F7 |
| Floor price litigation | Delhi High Court challenge by LG, Samsung, Havells, Voltas, Blue Star and others. No final judgment as of Sep 2026. A price-declaration requirement was stayed for Blue Star (Dec 2025 / Jan 2026) | [S] [GreenSutra 2026](https://greensutra.in/news/e-waste-epr-explained-2026/), [Newslaundry Jan 2026](https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration) |
| Real certificate trades | ₹6–8/kg from ghost plants; a ₹5.9/kg reverse-auction bid; consultants tell clients to model ₹10–22/kg | [S] Newslaundry 2025, via `25` F2; [calcguru 2026](https://calcguru.in/how-to-start-an-e-waste-recycling-business-in-india/) UNVERIFIED |
| Certificates are counted in kg of recovered Au / Cu / Al / Fe, pooled, and not traceable to a lot | — | [V] `02` F2–F4 |
| Recycler operating cost | ₹12–16/kg (recycler quote); ₹4–6/kg bare processing (project-report benchmark) | [S] `25` S12; [KAMRIT](https://kamrit.com/business-plans/ewaste-recycling-plant) UNVERIFIED |
| Mixed e-waste wholesale price, Sep 2026 | About ₹43/kg national average; household sellers get ₹5–7/kg less | [ScrapRates](https://scraprates.in/scrap-materials/e-waste) UNVERIFIED (aggregator) |
| Mixed household stream realisable metal value | About ₹20/kg | [S] Earth5R via `25` S16, UNVERIFIED |
| Margins: buy-and-recycle vs sell-compliance | Attero EBITDA 3.2% (FY25); Namo eWaste ~12%; Eco Recycling 22% (FY23) rising to ~70% (FY25) on certificate fees and producer-supplied material | [S] [The India Forum, Sep 2026](https://www.theindiaforum.in/sites/default/files/article_pdf/2026/09/24/2107-1790225056.pdf), citing company filings |
| GST disadvantage at the first mile | 18% on recycled scrap and a broken input-credit chain at the kabadiwala: roughly ₹9/kg, about an 18% bidding handicap for formal buyers | [S] The India Forum, Sep 2026 (practitioner estimate) |
| National capacity vs use | 322 registered recyclers, 22.08 lakh TPA capacity, widespread "feedstock starvation" | [S] MoEFCC reply Feb 2025 via The India Forum |
| MP utilisation | MP processed 13,014 t in FY25 against about 58,880 TPA registered capacity | [V] PIB, via `25` F1 |
| CPCB direction of 07-07-2026 | GST e-invoices mandatory for recovered-metal sales used to generate certificates | UNVERIFIED (consultant posts only; primary PDF not found), via `18` F3 |

**The one-line economics:** a formal recycler earns 3–12% buying waste at market price and much more selling paper. Arjun's profit lives in the certificate layer. EcoSure asks him to make that layer transparent.

---

## 2. Cast

| Character | Who | Position on EcoSure |
|-----------|-----|---------------------|
| **Arjun Malviya** | Owner, "Malwa E-Cycle", Sanwer Road industrial area near Indore. CPCB-registered, MPPCB consent for 3,000 TPA, runs at about 40% (about 100 t/month). 34 staff. Turnover about ₹6 crore a year (illustrative) | Joins, cautiously |
| **Deepak (Arjun's plant manager)** | Runs the floor, weighbridge, and portal data entry with one accountant | Carries the workload |
| **Mehta-ji (broker)** | Mumbai-based EPR "consultant" who buys most of Arjun's certificates and resells them to producers, blending sources | Hostile to provenance |
| **Rathore Recyclers** | Competitor, 5,000 TPA, runs at 55%, feedstock mostly from two PROs and government auctions | Refuses to join |
| **Shree Balaji Enviro Solutions** | "Paper recycler", 6,000 TPA on paper, runs at under 5%. Sells certificates at ₹7/kg | Joins to game it |
| **Neha** | EPR compliance executive at a Mumbai appliance brand (the PRD's producer persona, §7.2) | Enters certificate numbers into EcoSure |
| **Suresh** | MPPCB regional officer (PRD persona, §7.2) | Reads the flags |
| **Kallu and cousins** | Kabadiwalas who become Arjun's agents (PRD persona, §7.2) | Want same-day cash |

**Arjun's business before EcoSure (illustrative, per month, 100 t):**

| Line | ₹/kg | ₹ lakh / month |
|------|-----:|---------------:|
| Feedstock bought (corporate ITAD, government auctions, dealers), incl. freight | 28 | 28.0 |
| Processing, labour, power, compliance overhead | 12 | 12.0 |
| Metal and fraction sales | 35 | 35.0 |
| Certificates sold through Mehta-ji (about ₹12/kg-equivalent after his cut) | 12 | 12.0 |
| **Operating profit** | **7** | **7.0** |

Without certificates, the plant makes about ₹5/kg loss. The certificate line **is** the business.

---

## 3. The decision to join (Month 0)

**What the MPPCB and IMC pitch meeting says:** free platform, no commission (§12.1), more legal household feedstock, defence against fake-paper accusations (§7.1), an agent network of kabadiwalas (§5.2), attestations that "prove" his recycling.

**What Arjun hears:**

1. *"More feedstock."* Good, but the pilot gate is **8 tonnes a month for the whole corridor** at week 12 (§25.3), and 25 t at phase 1b exit (§25.6). Split across two recyclers (the PRD wants a backup recycler, §27.2), he gets 4–12 t. That is 4–12% of his throughput.
2. *"Defence against fake-paper accusations."* He has never been accused. The ones who should fear accusations are the ghost plants, and they will not be the ones exposed first.
3. *"You fund the escrow."* His own cash, in a tripartite account the department co-controls (§17.2).
4. *"Your agents are your responsibility."* (§5.2: "It also makes the recycler accountable for its agents, which is the strongest fraud control available.")
5. *"Monthly mass balance within 5%"* (§12.2 R6) and *"certificate provenance"* (§13.3 P4) visible to MPPCB.

**Why he still says yes:**

- An informal signal from the MPPCB regional office that "participating recyclers will be looked on favourably". Nothing in the PRD makes this real. There is no preference in government-office disposal and no GeM or MSTC tie-in beyond logging references (§10.2 C10).
- Fear of being the one recycler in Indore *not* on the government's list.
- A hope that "EcoSure-backed" certificates can be sold directly to nervous producers at or above the ₹22 floor, cutting out Mehta-ji.

**What he negotiates privately (none of it is in the PRD):**

- He shortens agent storage to **21 days** and caps on-hand stock at **300 kg** per agent, because the PRD allows up to 180 days (§11.2 S4, §19.3). He would carry the liability for that stock.
- He refuses to accept lots with *any* loose battery and adds a clause letting him terminate agents in 24 hours.
- He asks MPPCB in writing whether the agent's storage counts as *his* storage under Rule 11 (the 180-day limit for registered entities). The answer is "the direction is being drafted" (SP-02, §29.1).

---

## 4. Six months of operation

The PRD phases mass balance, recovery, and provenance into phase 1b (§25.6). To stress the whole design, this simulation assumes the pilot runs with manual versions of those features from Month 3. The real timeline would delay the provenance and mass-balance shocks by about 6–9 months, not remove them.

### Month 1 — Setup (October, Swachhata Hi Seva launch)

- **Escrow:** the bank takes five weeks to paper the tripartite agreement. Arjun deposits **₹5 lakh**. The PRD gives no sizing formula, no rule on withdrawals, and no rule on who earns the interest (§12.2 R3, §17.4).
- **Agents:** 7 signed (Kallu, two cousins, three repair shops, one IMC ward point). Arjun's agent-relations executive spends most of the month on KYC, training, and seal kits.
- **Inflow:** 1.9 t. The rate card pays ₹20/kg for mixed small appliances, ₹60 per phone, ₹150 per laptop (illustrative), plus the agent's handling margin.
- **Scanning:** the first 11 lots have 380 phones. 100% scan applies because every lot is under 200 units (§9.5 PP4). About a third are dead feature phones with the IMEI on a faded sticker under the battery. Deepak's team takes **about 50 seconds per phone** and marks 64 as unreadable. The PRD has no "unreadable" status, so each one opens a *missing unit* flag.

### Month 2 — Diwali surge (November)

- **Inflow jumps to 8.6 t** (§23 expects the surge). Agents deliver in bursts after Dhanteras.
- **Escrow alert:** weekly reimbursements spike to about ₹1.8 lakh. The balance falls below "2 weeks of expected reimbursements" on a Saturday; by Monday it hits zero and **new pickups pause for Arjun's agents** (§12.2 R3). Two days of paused pickups in Diwali week. Kallu sells that week's material to his old buyer in cash. Arjun wires **₹8 lakh more**.
- **Agent poaching:** Shree Balaji Enviro posts a rate card ₹8/kg higher and offers agents a ₹5,000 joining bonus. Two of Arjun's shops switch. The PRD says nothing about notice periods, lots in flight, or advances outstanding when an agent changes principal (§11.2, §19.3).
- **Disputes:** 6 weight disputes, mostly wet cartons (monsoon tail). The 8% monsoon tolerance ended in September (§16.4).

### Month 3 — The godown fire (December)

- One of Kallu's cousins has been holding 700 kg in a rented room in a residential lane, well over the 300 kg cap. It includes three swollen power banks he took "to be helpful", against the rules (§11.2 S3). One ignites overnight. No injuries. The local paper runs *"Fire at government e-waste scheme godown."*
- **MPPCB notice goes to Arjun** as principal. The agent agreement carries an "MPPCB direction reference" (§19.3), so the recycler is the only registered entity in the chain.
- **Arjun's exposure (illustrative):**
  - Environmental compensation for storage breach and handling loose batteries outside the battery regime. Regime 2 starts at ₹15,000 and doubles on repeat [V `02` F8]. Small in money, big in record.
  - Neighbour's damage claim of about ₹2 lakh. His plant insurance does not cover a third-party premises.
  - An inspection of his own plant, triggered by the press.
- The PRD's tripwire says "Loose batteries in lots: Any = amber, repeated = red" (§18.3). There is no rule about what happens to the *principal*. There is no insurance, no safe harbour for a recycler who enforced the rules, and no public statement template.
- Arjun suspends the cousin in an hour. He seriously considers quitting.

### Month 4 — Mass balance, first run (January)

- The PRD formula: *opening stock + attested input = output + residue + closing stock, within 5%* (§12.2 R6).
- **First question: balance of what?** The PRD does not say whether this is EcoSure input only or the whole plant. Arjun's EcoSure material is pooled with 90 t of other feedstock on the same dismantling line. An EcoSure-only balance is fiction. A whole-plant balance means EcoSure, and so MPPCB, now sees his **entire** business.
- **His honest whole-plant numbers for January (illustrative):**

| Item | Tonnes |
|------|-------:|
| Opening stock (estimated by eye, CRT glass pile included) | 62 |
| Input (all sources, weighbridge) | 104 |
| Metal and fraction sales (invoiced) | 71 |
| Plastics sold to a local granulator (half without invoice, as is common) | 14 recorded of about 19 real |
| Residue to TSDF (manifests lag one month) | 3 recorded of about 6 real |
| Moisture and dust loss | not measured, about 2–3 |
| Closing stock (estimated) | 64 |
| **Variance** | **about 14 t = 8.5% of input** |

- **8.5% is over the 5% line.** A flag reaches Suresh "within 1 minute" (§14.3 G2, §16.8) as *mass-balance variance*. There is no private window for Arjun to reconcile first. The prior research recommended a 7-day dispute window (`25` change 7); v3 did not adopt it.
- **What he would have to do to pass:** invoice the plastics buyer (costs him the informal price premium), fix TSDF paperwork timing, and do a monthly physical stock-take. All are good practice. All cost money, and none are funded or phased in.
- **The perverse part:** Shree Balaji Enviro types a variance of 1.2% every month (section 6). Nothing checks outputs against GST e-invoices or TSDF manifests. The PRD has no output-evidence field (§19.3 MassBalance: opening, input, output, residue, closing, variance).

### Month 5 — Provenance meets the broker (February, just before the Q3 return)

- Neha's brand bought 60 t-equivalent of certificates generated by Arjun, via Mehta-ji. Her company now uses EcoSure evidence packs (§13.3 P5). She types the certificate numbers into P4.
- EcoSure can link only Arjun's EcoSure attestations: about 25 t over five months. The certificates are **"partially backed" (about 40%)**. For certificates Mehta-ji sold to two other producers who also enter them, the result is **"unbacked"**, because those kg came from Arjun's corporate feedstock, not EcoSure.
- The PRD rule: *"Unbacked certificates from participating recyclers raise a flag for the producer and SPCB"* (§13.3 P4). So **Arjun, the participant, now has "unbacked certificate" flags**. Rathore and every non-participant have none, because their certificates cannot be checked at all.
- Neha's compliance head asks why 60% of her certificates are "not backed". Mehta-ji, who blends Arjun's certificates with cheaper ones from elsewhere, is furious that producers can now see which recycler issued what and ask awkward questions. He cuts his offer to Arjun by ₹2/kg and routes volume to non-participants.
- Arjun's one hope, selling "EcoSure-backed" certificates direct at a premium, has no product feature behind it. Only the producer can create packs (§8.3: recycler has "R (share)" on evidence packs). There is no recycler-initiated evidence share, which `25` change 5 asked for.

### Month 6 — The decision (March, state budget season)

- **Inflow:** 6.8 t/month average over months 4–6 (down from the Diwali peak; two agents lost to poaching).
- **Losses on EcoSure material:** about ₹0.85 lakh a month (section 5).
- **Record:** one fire notice, one mass-balance flag, several "unbacked certificate" flags, about 200 "missing unit" flags that are really unreadable stickers.
- **Gains:** a real informal-to-formal channel he did not have, seven trained agents, government recognition, and some audit-defence evidence for the EcoSure share.

**Arjun's choice:** he tells the steering committee he will stay **for one more quarter** only if (1) provenance stops calling non-EcoSure certificates "unbacked", (2) mass balance gets a calibration period and a private reconciliation window, and (3) MPPCB puts principal liability for agents in writing with a safe harbour. Otherwise he gives 30 days' notice and runs down his agents.

---

## 5. Rupee math

All figures are **illustrative**. The per-kg assumptions for EcoSure household material:

| Assumption | ₹/kg | Basis |
|------------|-----:|-------|
| Citizen material price (blended rate card) | 20 | Defensive pricing; phones and laptops priced per unit, the rest per kg. UNVERIFIED |
| Agent handling margin | 5 | Must beat informal resale to stop cherry-picking (§18.2). UNVERIFIED |
| Inbound freight (recycler-planned trips, §11.2 S4) | 2 | UNVERIFIED |
| Processing | 5 | KAMRIT benchmark ₹4–6/kg, UNVERIFIED |
| Metal and fraction value, household mix | 22 | Earth5R ~₹20, UNVERIFIED; household has more plastic and CRT than corporate IT |
| Certificate value via broker | 12 | Market ₹6–22/kg, UNVERIFIED |
| Certificate value sold direct as "clean" | 20 | Assumes a producer pays near the ₹22 CEEW floor for evidence. UNVERIFIED and currently not supported by any PRD feature |

### 5.1 EcoSure-specific fixed costs (monthly)

| Cost | ₹ / month | Why |
|------|----------:|-----|
| Agent-relations executive (KYC, training, disputes, visits) | 35,000 | R2 agent network (§12.2) |
| Travel and field checks of agent premises | 10,000 | Needed after the fire; not in the PRD |
| Receiving, seal checks, re-weighing, grading (about 15 min per lot × ~100 lots) | 12,000 | R4 (§12.2); matches `25` F4 estimate of 10–20 min per lot |
| Unit scanning (about 3,000 phones and laptops × 50 s ≈ 42 h) | 7,000 | PP4 100% rule (§9.5) |
| Maker-checker attestations, CPCB-ready exports, mass balance (accountant 3–4 days) | 15,000 | R5, R6, R7 |
| Agent-premises insurance top-up (after the fire) | 8,000 | Not in the PRD |
| Cost of capital on escrow and pipeline stock (₹12 lakh × 12% ÷ 12) | 12,000 | Section 5.3 |
| **Total** | **about ₹99,000** | |

### 5.2 Monthly profit and loss on EcoSure material

| Volume to Arjun | Revenue at broker price (₹34/kg) | Revenue at "clean" price (₹42/kg) | Variable cost (₹32/kg) | Fixed cost | **Net at broker price** | **Net at clean price** |
|-----------------|-------:|-------:|-------:|-------:|-------:|-------:|
| 5 t (months 1, 4–6 low) | 1.70 L | 2.10 L | 1.60 L | 0.99 L | **−0.89 L** | **−0.49 L** |
| 7 t (months 4–6 average) | 2.38 L | 2.94 L | 2.24 L | 0.99 L | **−0.85 L** | **−0.29 L** |
| 10 t | 3.40 L | 4.20 L | 3.20 L | 1.05 L | **−0.85 L** | **−0.05 L** |
| 25 t (phase 1b exit, one recycler) | 8.50 L | 10.50 L | 8.00 L | 1.30 L | **−0.80 L** | **+1.20 L** |
| 50 t (phase 2 exit, one recycler) | 17.00 L | 21.00 L | 16.00 L | 1.60 L | **−0.60 L** | **+3.40 L** |

**Reading the table:**

- At broker certificate prices, **EcoSure material never pays**, at any volume. The margin per kg is ₹2 before fixed costs.
- At a "clean certificate" price close to the floor, it breaks even around **10 t/month** and pays well from **25 t/month**.
- So the recycler's business case depends on **one thing the PRD does not build: a way to turn EcoSure evidence into a higher certificate price.** Volume alone does not rescue it.
- Arjun could cut the citizen price from ₹20 to ₹12/kg and make money, but then the kabadiwala wins and the state incentive (§17.3) does all the work. The PRD's claim that citizens get "the recycler's material price" becomes a small number.

### 5.3 Escrow: how much cash is locked?

The PRD says: alert below 2 weeks of expected reimbursements; pickups pause at zero; advances up to 40% of average weekly accepted value (20% for new agents) (§17.4).

| Component | Pilot (7 t/month) | Diwali peak (3× for 3 weeks) | Phase 1b (25 t/month) |
|-----------|------------------:|-----------------------------:|----------------------:|
| Weekly reimbursement (₹25/kg citizen + agent) | 0.40 L | 1.21 L | 1.44 L |
| Two-week alert floor | 0.80 L | 2.42 L | 2.88 L |
| Advances outstanding (up to 40% of weekly) | 0.16 L | 0.48 L | 0.58 L |
| Practical buffer so pickups never pause (4 weeks + advances) | 1.78 L | 5.32 L | 6.34 L |
| **Cash in escrow (recommended, rounded up for bursty deliveries)** | **about ₹3 lakh** | **about ₹8 lakh** | **about ₹7 lakh** |
| Pipeline stock: material bought but certificate not yet sold (3–4 months) | about ₹6 lakh | about ₹10 lakh | about ₹25 lakh |
| **Total cash tied up** | **about ₹9 lakh** | **about ₹18 lakh** | **about ₹32 lakh** |

**Verdict on escrow:** the escrow cash itself is small (₹3–8 lakh). The real cost is **the gap between paying agents within 7 days and receiving certificate revenue 3–6 months later**. That gap is not new to Arjun (he has it with all feedstock) but EcoSure's fast-pay rule makes it sharper. The design flaw is the **hard pause at zero** (§12.2 R3). It punishes agents and citizens for a recycler's treasury timing, and in a surge week it pushes material straight back to the informal buyer.

---

## 6. The competitor who refuses: Rathore Recyclers

**Why Rathore says no:**

1. His feedstock comes from two PROs and government auctions at nominal or low cost. Household material is worse per kg. He does not need 5 t/month of low-grade inflow.
2. **Joining creates exposure; not joining creates none.** His certificates can never be marked "unbacked" because EcoSure cannot see them. His mass balance is never computed. His brokers keep blending.
3. The PRD gives him nothing to lose by staying out: no government-disposal preference, no producer rule favouring EcoSure-backed certificates, no MPPCB inspection weighting (§14.3 G2 flags only cover participants).

**What Rathore does to Arjun:**

- Tells brokers "Malwa E-Cycle has SPCB flags on EcoSure". It is true, and it sounds bad.
- Pays Arjun's agents cash for high-value items (laptops, phones) with no paperwork. The *cherry-picking* control (§18.2) will show falling high-value share in Arjun's lots, which the PRD treats as an agent-fraud signal, not a competitor signal.

**Outcome after six months:** Rathore's business is unchanged. Arjun's is slightly worse. **The design rewards non-participation.** This is the most important lesson of the simulation: in a voluntary programme, any feature that creates risk only for participants must be balanced by a benefit only participants get.

---

## 7. The paper recycler: Shree Balaji Enviro Solutions

**Profile:** 6,000 TPA consent on paper, under 5% real use. Sells about 300 t-equivalent of certificates a month at ₹7/kg via brokers. Joins EcoSure on day one.

**Game plan and how v3 holds up:**

| # | Move | PRD control | Holds? |
|---|------|-------------|--------|
| 1 | **Legitimacy badge.** Runs a small, genuine EcoSure flow (3–5 t/month) and puts "Participating recycler, Government of MP EcoSure" and live attestation numbers in its sales deck. Sells 300 t-equivalent of certificates on the halo | Public verification shows real attestations (§12.2 R8); P7 directory lists participants (§13.3) | **No.** The directory and verification page *help* him. Provenance flags only fire if producers enter certificate numbers, and producers buying at ₹7/kg do not want to know |
| 2 | **Outbid honest recyclers for agents.** Posts a rate card ₹8/kg higher; the EcoSure feedstock is a marketing cost, not a profit centre for him | Rate cards private between recyclers (§8.4) | **No.** Nothing limits agent switching or flags uneconomic rate cards |
| 3 | **Fabricated mass balance.** Types output, residue, and closing stock so the variance is 1–2% every month | 5% variance flag (§12.2 R6) | **No.** Outputs are self-reported. No GST e-invoice (IRN), TSDF manifest, or power-use cross-check. "Too perfect" balances are not flagged |
| 4 | **Inflated capacity.** His 6,000 TPA is on paper | "State-verified capacity" from consent (§12.2 R1) | **Weak.** The PRD uses the consent figure; no site verification, headcount, or machinery check (`18` C2 not adopted) |
| 5 | **Friendly maker-checker.** Maker is his brother, checker his cousin | Two different users (§8.6, §19.4) | **No.** Two users, one family |
| 6 | **Incentive farming.** Buys dead phones in bulk (₹10–20 each) from informal markets anywhere in India, creates legacy passports through "pickups" booked on 60 SIM cards he controls. Caps are 4 paid pickups per payee per month, **not per device** (§17.4). 60 SIMs × 4 pickups × 8 phones × ₹50 incentive ≈ **₹96,000 a month of public money**, less the phones' cost | Handover code to the requester's phone; caps per payee, device, address; concentration monitoring (§18.2, §18.3) | **Partly.** Device IDs stop re-use of the same phone, but legacy passports accept any never-seen IMEI from anywhere. Concentration monitoring catches it in weeks, not days |
| 7 | **Stripped devices.** Feeds phones with boards removed (boards sold separately for ₹250–450/kg) as whole units | Weight check, seals | **No.** No weight-per-unit anomaly check (`02` change 7 not adopted) |

**What catches him eventually:** device-count leakage and incentive concentration (§18.3), plus unit scans. These are the strongest v3 controls, and they work on the *incentive* fraud. They do not touch the *certificate* fraud, which is where his real money is. **v3 makes it slightly harder to farm incentives and slightly easier to launder reputation.**

---

## 8. Join and quit triggers

### 8.1 What makes a real recycler join

1. **A certificate premium they can capture:** a recycler-initiated "evidence share" to a named producer, and producers (or CPCB guidance) preferring evidenced certificates. At least ₹5–8/kg above broker price.
2. **Participation becomes a positive signal, never a negative one:** provenance shows "EcoSure-evidenced share" instead of "unbacked" for honest participants, and non-participants show "no evidence available".
3. **A government-side benefit:** preference in government and PSU e-waste disposal (GeM / MSTC), or lighter routine inspection for recyclers with clean EcoSure records.
4. **At least 15 t/month** of feedstock per recycler, or a fixed-cost subsidy until then.
5. **Agent liability in writing:** MPPCB direction with a principal safe harbour, a standard agreement, and scheme-funded insurance.

### 8.2 What makes a recycler quit

1. An SPCB flag from provenance or mass balance **before** a private chance to reconcile.
2. A fire, injury, or press story at an agent's premises that lands on the recycler with no safe harbour.
3. Losses above about ₹1 lakh a month for three months with volume under 10 t.
4. A broker boycott, or a producer questioning "partially backed" certificates.
5. Competitors poaching agents with rate cards they cannot sustain.
6. Pickups paused by an escrow zero in a surge week, breaking agent trust.

---

## 9. PRD gaps (with sections)

| # | Gap | Where in v3 | Effect on a real recycler |
|---|-----|-------------|---------------------------|
| G1 | **"Unbacked" conflates "not seen by EcoSure" with "fake".** Participants' non-EcoSure certificates get flags; non-participants get none | §13.3 P4, §14.3 G2, §18.2 | Punishes joining; adverse selection toward non-participation |
| G2 | **Mass-balance scope undefined** (EcoSure-only or whole plant); self-reported outputs; single 5% line; no calibration; no output evidence; no "too perfect" check | §12.2 R6, §16.5, §19.3 MassBalance | Honest messy plants flagged; fabricators pass |
| G3 | **No private reconciliation window** before flags reach SPCB ("flags within 1 minute") | §14.3 G2, §16.8, §21.4 | First-month data errors become permanent regulatory records |
| G4 | **Principal liability for agents is asserted but not designed**: no agreement template, on-hand quantity limit, inspection right, insurance, indemnity, or safe harbour; storage default up to 180 days | §5.2, §11.2 S4, §12.2 R2, §19.3 AgentAgreement, §18.3 | One agent's fire can end a recycler's participation |
| G5 | **No commercial benefit beyond feedstock.** No recycler-initiated evidence share; no government disposal preference; OQ-83 routes any evidence fee to the state | §7.1, §8.3, §13.3 P5, §26.4, OQ-83 | The only proven value is a loss-making stream |
| G6 | **Escrow has no sizing rule, withdrawal rule, interest rule, or grace period**; hard pause at zero | §12.2 R3, §17.2, §17.4 | Surge-week pauses send material back to informal buyers |
| G7 | **No split settlement or certificate-timing support** (7-day agent pay vs 3–6-month certificate revenue) | §11.2 S5, §17.4 | Working-capital strain; carried over from `25` F9, not fixed |
| G8 | **Agent switching unregulated**: no notice period, no rule for lots in flight or advances outstanding | §11.2, §12.2 R2, §19.3 | Poaching by paper recyclers with subsidised rate cards |
| G9 | **100% unit scan with no "unreadable" status**; leakage tripwire fires on dead-phone stickers | §9.5 PP4, §16.4, §18.3 | False flags; about 40+ hours a month of scanning at pilot volume |
| G10 | **Per-lot attestation** while plants process in pooled batches | §12.2 R5, §19.2 (Lot 1─0..1 CustodyAttestation) | False precision; carried over from `25` F4 |
| G11 | **Public verification shows exact weight** per attestation; enumerable throughput | §8.4, §12.2 R8 | Leaks volume to competitors and price-negotiating producers; `25` change 6 not adopted |
| G12 | **Capacity from consent, no site verification**; maker-checker can be two relatives | §12.2 R1, §8.6 | Paper recyclers pass onboarding; `18` C2, C7 not adopted |
| G13 | **Incentive caps per pickup, not per device**; legacy passports accept any IMEI from anywhere | §17.4, §9.5 PP3 | Bulk dead-phone farming with public money |
| G14 | **No weight-per-unit check for stripped devices** | §18.2 | Stripped phones counted as whole; `02` change 7 not adopted |
| G15 | **Tax treatment of the agent model undefined** (is the agent buying and reselling, or buying on the recycler's behalf? GST and reverse charge on reimbursements?) | §5.2, §17 | The 18% GST handicap (about ₹9/kg) may fall on the chain; UNVERIFIED legal question |
| G16 | **Floor-price litigation not linked to rate cards.** A Delhi High Court ruling could halve certificate value overnight | §29.3 lists it as a fact to verify only | Recyclers price defensively low from day one |

---

## 10. Fixes

Ordered by leverage.

| # | Fix | Closes | PRD change |
|---|-----|--------|------------|
| F1 | **Reframe provenance as "evidenced share", never "unbacked", for participants.** Show producers: "EcoSure-evidenced X%", "Other recycler records Y%" (participants), "No evidence available" (non-participants). Raise an SPCB flag only when a recycler's **total** certificate generation exceeds its evidenced whole-plant physical throughput plus declared non-EcoSure procurement, not the EcoSure share alone | G1 | §13.3 P4, §14.3 G2 |
| F2 | **Give recyclers a way to earn from evidence.** (a) Recycler-initiated evidence share to a named producer in phase 1a, single-attribution rule, clearly "not an EPR certificate". (b) Steering committee asks MPPCB, IMC, and state departments to prefer participating recyclers in government e-waste disposal. (c) Any producer evidence-pack fee (OQ-83) is shared with the recycler whose material backs it | G5 | §12.2 new R11, §13.3 P5, §26.4, OQ-83 |
| F3 | **Evidence-based mass balance with calibration.** Whole-plant, opt-in at phase 1b with a **90-day private calibration period**. Outputs must cite GST e-invoice numbers (IRN) and TSDF manifests. Category-specific tolerances (moisture, CRT). A monthly physical stock-take declaration. Flag both variance above tolerance **and** suspiciously perfect variance (for example under 1% for three months running) | G2, paper recycler move 3 | §12.2 R6, §19.3 MassBalance |
| F4 | **Seven-day private reconciliation window** before discrepancy flags reach SPCB, and an `attributed_party` field (agent, transport, recycler, undetermined) on each flag. Critical safety flags (fire, loose batteries) stay immediate | G3 | §14.3 G2, §16.8 |
| F5 | **Agent liability package.** A standard agent agreement published with the MPPCB direction: default storage **30 days** (not 180), on-hand cap by category, no battery-bearing items overnight in residential premises, principal inspection right, and a **safe harbour**: a principal who suspends an agent within 24 hours of a breach and reports it is not charged for that agent's breach. A **scheme-funded group insurance policy** for agent premises during the pilot | G4 | §5.2, §11.2 S4, §19.3, §29.1 SP-02 |
| F6 | **Escrow rules.** Sizing formula (4 weeks of expected reimbursements + advances); allow a bank guarantee or overdraft line instead of cash; interest accrues to the recycler; **48-hour grace period** with automatic top-up request before any pause; surge pre-funding notice two weeks before Diwali | G6, G7 | §12.2 R3, §17.4 |
| F7 | **Right-size recycler workload.** Agents scan at the door (they already do, §11.2 S3); the recycler samples 10–20% of lots. Add an `unreadable` identifier status excluded from leakage. Set a UX target of **≤ 5 minutes recycler effort per lot**. Batch attestations monthly (receipt per lot, attestation per processing batch) | G9, G10 | §9.5 PP4, §12.2 R4–R5, §18.3 |
| F8 | **Agent switching rules.** 30-day notice; lots sealed under a principal belong to that principal; advances settle before the switch; flag rate cards far above the corridor median for operator review | G8, paper recycler move 2 | §11.2, §12.2 R2–R3 |
| F9 | **Close paper-recycler routes.** Site verification before approval and every 6 months (`18` C2); maker and checker must include the authorised signatory named in the CPCB registration; weight-per-unit anomaly flag; per-device incentive cap per payee; share of legacy passports per agent monitored; the P7 directory states "Participation is not an endorsement of certificates" | G12, G13, G14, paper recycler moves 1, 4–7 | §12.2 R1, §13.3 P7, §17.4, §18.2 |
| F10 | **Public verification shows weight bands** and uses non-sequential numbers (`25` change 6) | G11 | §12.2 R8 |
| F11 | **Price-shock clause.** Rate cards carry a reopener if a court ruling or CPCB change moves the certificate floor; the state incentive per kg can be adjusted in the same review | G16 | §12.2 R3, §17.3, §29.2 |
| F12 | **Tax opinion before the pilot** on GST and reverse charge in the agent model, so the chain is structured to avoid the first-mile credit break | G15 | §29.3 facts to verify |

**If only three are done:** F1 (provenance reframe), F2 (evidence share plus government disposal preference), and F3 plus F4 together (evidence-based mass balance with a calibration period and a private window).

---

## 11. Score

**4.5 / 10** for how well v3 works for recyclers in real life.

**In v3's favour:**

- No commission on scrap value (§12.1).
- Reject and partial-accept rights (§12.2 R4).
- The agent model gives kabadiwalas a lawful route to a registered recycler (§5.2), which is a real channel Arjun could not build alone.
- Recycler escrow keeps public money out of commercial payments (§17.2), and the escrow amount itself is affordable.
- Handover codes, device IDs, and leakage tripwires are strong against incentive fraud (§18).

**Against v3:**

- EcoSure household feedstock loses money at broker certificate prices at every volume, and the PRD offers no way to capture a "clean certificate" premium.
- Certificate provenance and mass balance create risk only for participants. The competitor who refuses is better off, and the paper recycler can use participation as a badge.
- Agent liability is loaded onto the recycler with no template, insurance, or safe harbour.
- Several fixes recommended by the v2 recycler, fake-certificate, and portal reviews (`25` changes 5–7, `18` C2/C4/C7, `02` change 7) were not carried into v3.

**With fixes F1–F5:** about **6.5**. **With all twelve:** about **7.5**. The remaining risk is outside the platform: the floor-price ruling, whether producers will pay more for evidenced certificates, and whether any Indore recycler agrees in a real Week 0 interview (`25` change 9).

**One-line verdict:** v3 asks honest recyclers to fund, staff, and insure the programme's trust layer, then flags them for being visible, while non-participants and paper recyclers pay nothing. Reward participation before you audit it.
