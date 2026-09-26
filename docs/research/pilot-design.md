# EcoSure — 12-Week Pilot / Test Design

**Type:** Learning plan (not a build plan)  
**Date:** 2026-09-27  
**Audience:** Founders, PM, GTM  
**Grounding:** [`idea-feasibility-no-ui.md`](./idea-feasibility-no-ui.md), [`tier2-tier3-field-issues.md`](./tier2-tier3-field-issues.md), manufacturer / recycler / government feasibility notes, [`../prd/13-roadmap.md`](../prd/13-roadmap.md)  
**Status:** Executable pilot design — validate with real humans; treat prior research as hypothesis, not truth

---

## 0. One-line charter

Prove whether EcoSure can become a **formal Tier-2 collection → custody → recycler attestation → mid-size manufacturer evidence** business — **without building product software** for the first 8 weeks, and with **only scrap tooling** (WhatsApp, Sheets, UPI, paper logs) for weeks 9–12 if gates pass.

**Not a charter to:** ship Phase 0–5, EcoPoints, consumer app, government dashboard, or “CPCB certificate” product.

---

## 1. What we are testing (and what we are not)

### In scope (learning)

| # | Learning question | Why it matters |
|---|-------------------|----------------|
| L1 | Do Tier-2 households / societies give **data-sensitive or kabadi-refused** devices to a *formal* pickup when UPI/voucher is same-week and wipe is ritualized? | Consumer wedge exists or not |
| L2 | Will **micro / GST-thin shops** join and route *good* material if settlement is **≤7–14 days** and freight is shared? | Supply density + adverse selection |
| L3 | Can one **hub + one CPCB-registered recycler** run weekly multi-shop trips with dual weigh, grade, reject rights? | Ops backbone |
| L4 | Will **Indore/Pithampur-class mid-size producers** pay for evidence packs + shortfall cockpit *once real attestations exist*? | Only scarce ARR wedge |
| L5 | Does the market tolerate EcoSure as **software + ops facilitator**, not statutory cert issuer / PRO / scrap marketplace? | Legal survivability |

### Explicitly OUT of scope for this pilot (do NOT build)

| Do NOT build | Why wait |
|--------------|----------|
| Phase 0–5 product (Postgres app, RBAC, dashboards) | Learning ≠ engineering; WoZ answers L1–L5 cheaper |
| Consumer EcoPoints ledger / redemption catalog | Points lose to cash; test UPI/voucher first (OQ-03 challenge) |
| Full WhatsApp chatbot / Meta Cloud productization | Manual WA ops in pilot; productize only if reply patterns clear |
| Nearby-shop geo product with empty map | Density first; map without N shops is a death spiral |
| Manufacturer “CPCB auto-file” / portal submission | Human-in-loop exports only; OQ-30 open |
| Government agency seats / regulator dashboard | SKIP v1 (gov feasibility); public verify later |
| GMV take-rate on scrap settlements | Recycler kill path; SaaS / pack fee only |
| Large OEM enterprise sales motion | Wrong ICP; PRO-locked |
| Carbon credits, MSW, IoT device telemetry | Explicit PRD out-of-scope |
| Soft KYC → full GSTIN-gated shop marketplace | Soft KYC path in pilot; don’t encode GST walls yet |
| Fancy cert PDF mill branded as EPR | Attestation naming is a kill criterion |

**Engineering allowed (weeks 9–12 only, IF stage-gates pass):** one shared Google Sheet + Notion/Drive folder schema, WhatsApp Business *manual* templates, printed custody slips, UPI payouts from a company account, optional public Google Form for pickup request. **No custom web app.**

---

## 2. Hypothesis tree

```text
PROBLEM HYPOTHESES
├── P1  Mid-size EPR producers lack audit-ready, partner-linked evidence
│       (Excel + WhatsApp PDFs → shortfall panic). SEVERITY HIGH.
├── P2  Formal recyclers need incremental, gradeable Tier-2/3 feedstock
│       with reject rights — not another dashboard.
├── P3  Shops will not stay formal without ≤14-day cash/UPI liquidity.
├── P4  Consumers will use formal channel only for niche jobs
│       (data wipe, society drives, kabadi-refused) — not mass replace kabadi.
└── P5  Government does not need a SaaS seat for EcoSure to work.
        (Thin verify + honesty later; not a pilot KPI.)

SOLUTION HYPOTHESES
├── S1  Concierge pickup + wipe ritual + same-week UPI beats points-only.
├── S2  Soft-KYC shops + weekly settlement + shared freight beat monthly settle.
├── S3  Hub as recycler-backed consolidator (not a fake statutory class) works
│       at ≥~8–12 t/month corridor volume.
├── S4  Recycler-authored processing attestations + portal-ref hygiene are
│       acceptable as *filing aids* (not EPR substitutes).
└── S5  Manufacturer value = cert library + gap view + export — not footprint charts.

REVENUE HYPOTHESES
├── R1  Mid-size producers will pay ₹30k–1.2L/yr for compliance seat + packs
│       IF supply-side attestations are real (Indore-class ICP).
├── R2  Recyclers pay SaaS / per-pack later; will NOT accept scrap GMV tax in pilot.
├── R3  Network take-rate / hub fees secondary; do not fund pilot on consumer ARPU.
└── R4  Government ARR = ₹0. Correct.

GROWTH HYPOTHESES
├── G1  Density-before-demand: min N live shops + hub + recycler before consumer ads.
├── G2  Manufacturer attach pulls volume awareness after Phase-3-like attestations exist.
├── G3  Society / college / brand take-back campaigns outperform broad consumer UA.
└── G4  WhatsApp + Hindi (pilot Marathi if MH) > English app for Tier-2 ops.
```

**Primary falsifiable bet for 12 weeks:**  
*If we seed Indore corridor shops + one hub + one authorized recycler with weekly money and honest naming, then (a) ≥X kg formal tonnes move with ≤Y% dispute/reject, and (b) ≥3 mid-size EPR managers state a WTP in the ₹30k–1.2L band for evidence packs — without a product build.*

---

## 3. City choice (Tier-2) — Indore (MP) primary

### Recommendation

| Role | City | Rationale |
|------|------|-----------|
| **Primary pilot geography** | **Indore + Pithampur belt (MP)** | Tier-2; Hindi; dense mid-size EPR ICP (appliances / electronics / auto-electronics); industrial offtake adjacency; matches manufacturer research wedge |
| Ops corridor | Indore urban shops → one consolidator godown → 1 CPCB-registered recycler within ~150–250 km or in-state partner | Tests hub freight + multi-shop tempo without metro logistics fantasy |
| Optional contrast interviews (not full ops) | Nashik (MH) consumers / Coimbatore hub language notes | Only if budget allows; **do not split ops across two cities in 12 weeks** |

### Why Indore over other Tier-2 candidates

| City | Pros | Cons for *this* pilot |
|------|------|------------------------|
| **Indore** | Manufacturer ICP on doorstep; Hindi; EPR shortfall urgency; Pithampur partners | Consumer density vs metros lower — acceptable (niche consumer is fine) |
| Nashik | Strong consumer/society signal (Priya persona) | Weaker local manufacturer cluster for WTP tests |
| Coimbatore | Excellent hub ops learning | Tamil ops + weaker Indore-class buyer density for R1 |
| Gwalior / Bhagalpur | Pure Tier-3 friction | Too thin for density + manufacturer learning in 12 weeks |

**Rule:** One city for physical ops. Interview remotely for recyclers/PROs outside corridor if needed. Do not “pilot India.”

**Launch checklist before Week 1 ops (hard):**

1. ≥1 CPCB-registered recycler LOI (reject rights + attestation naming agreed in writing)  
2. ≥1 hub/godown operator with float for shop advances OR EcoSure float budget  
3. ≥8 shops soft-committed (target 12 live by Week 4)  
4. Counsel one-pager on attestation ≠ CPCB EPR certificate  
5. Hindi WhatsApp scripts + custody slip template  

If (1)–(3) fail → **do not start consumer demand generation.**

---

## 4. Concierge / Wizard-of-Oz tests (Weeks 1–8 — no software)

### 4.1 Test matrix

| ID | Name | Method | Fake product | Real humans | Learning |
|----|------|--------|--------------|-------------|----------|
| WZ-1 | **Concierge consumer pickup** | WA / phone intake → scheduled pickup by shop or EcoSure runner | “EcoSure app” never shown; Form or WA only | Households, PG/society contacts | L1, S1 |
| WZ-2 | **Wipe ritual** | Printed checklist + photo of wipe screen / factory reset witness | Product “data wipe guarantee” | Phone/laptop givers | Trust vs kabadi |
| WZ-3 | **Shop desk ops** | Paper + Sheet lot log; dual weigh; weekly UPI | Shop dashboard | Shop owners | L2, P3 |
| WZ-4 | **Hub day** | One tempo, 3–5 shops, manifest clipboard, hub grade A/B/C/reject | Hub dashboard / trip entity | Hub ops + shops | L3, S3 |
| WZ-5 | **Recycler receive** | Same lot IDs; reject/partial; attestation PDF from *recycler letterhead* hosted in Drive | Platform certificate | Recycler | L3, S4 |
| WZ-6 | **Manufacturer evidence pack** | Manual pack: lot list, weights, recycler attestation, disclaimer, gap vs their Excel targets | Manufacturer Phase 4 UI | EPR managers | L4, S5, R1 |

### 4.2 How WoZ is staffed

| Role | Who | Time |
|------|-----|------|
| Pilot PM / researcher | Founder or hire | 100% |
| Ops runner | 1 field associate | Full-time Weeks 2–12 |
| Shop liaison | Same ops + PM | Part of field |
| Finance desk | Part-time (UPI, Sheet reconcile) | 0.3 FTE |
| Legal review | External counsel (fixed fee) | Week 0–2 + Week 8 |

**Experimenter bias control:** Separate “sales to manufacturer” from “shop settlement truth.” Do not let WTP interviews see inflated volume claims.

---

## 5. Sample sizes & interview guide themes

### 5.1 Sample sizes (directional power, not academic)

| Segment | n (min) | n (stretch) | Method | When |
|---------|--------:|------------:|--------|------|
| Consumers (Indore) | 15 | 25 | 30–40 min interviews + 20–40 WoZ pickups attempted | W1–6 |
| Society / RWAs / college hosts | 5 | 8 | Gatekeeper interviews | W2–5 |
| Local recycle / scrap-adjacent shops | 12 | 20 | Interview + 8–12 seeded into ops | W1–4 seed; W4–12 ops |
| Hub / godown operators | 2 | 4 | Deep interview + 1 active | W1–3 |
| CPCB-registered recyclers | 3 | 5 | Structured; ≥1 LOI | W1–4 |
| Mid-size manufacturer EPR managers (Indore/Pithampur) | 8 | 12 | Interview + WTP (Van Westendorp / GG) | W4–10 |
| PRO / large OEM EPR (contrast only) | 2 | 3 | Interview — expect “no” to primary SaaS | W6–8 |
| Soft SPCB regional briefing | 1 | 1 | 30–45 min, **no sales pitch** | W8–10 |
| Environmental counsel | 1 | 1 | Memo on naming + liability | W0–2 |

**Rule of thumb:** Stop a segment early if the same three blockers repeat ≥5 times with no workable mitigation (e.g. “cash today or nothing” with zero UPI acceptance).

### 5.2 Interview guide themes (not scripts)

**Consumers**

- Last disposal path (kabadi / throw / store in cupboard) and why  
- Devices they *won’t* give kabadi (data fear, brand stigma)  
- Same-week UPI vs points vs “good karma” — forced ranking  
- Society/PG gate realities; landmark vs pin  
- Wipe ritual: what would they need to see/hear  
- Willingness to drop at shop vs home pickup  
- Language channel: WA vs app vs call  

**Shops**

- Current buyers, payment cycle, skim of high-value fractions  
- GSTIN / KYC friction; what docs they already have  
- Weekly vs monthly settle; advance appetite  
- Hub distance / freight share; multi-home behavior  
- Weight dispute history; trust in dual weigh  
- What would make them route *good* boards/cables formal  

**Hub**

- Float for advances; monsoon storage; tempo routing  
- Grade standards; reject politics with shops  
- Offtake SLA with recycler  

**Recycler**

- Feedstock grade requirements; reject economics  
- Attestation naming (“processing attestation” vs “certificate”)  
- Portal ref linkage willingness  
- SaaS fee vs GMV take-rate (expect reject take-rate)  
- Dual-channel (EcoSure + offline) insistence  

**Manufacturer (Indore-class)**

- Current stack (Excel, consultant, PRO?)  
- Shortfall pattern last 12–24 months  
- What “audit-ready” means to them  
- Reaction to sample attestation + disclaimer  
- Gap view vs pretty footprint charts  
- WTP protocol (Section 7)  
- Must-have: library + export + partners in MP/CG  

**SPCB soft briefing**

- Fake-cert complaint workflow today  
- Appetite for public verify-by-number vs SaaS login  
- Non-endorsement posture  

---

## 6. Fake-door / demand tests

Run **before** paid consumer UA. Goal: signal intent, not vanity clicks.

| ID | Test | Placement | Offer shown | Success signal | Kill / pivot signal |
|----|------|-----------|-------------|----------------|---------------------|
| FD-1 | **Pickup waitlist** | WA status + RWA WhatsApp groups + 2 society notice boards | “Formal e-waste pickup + data wipe + UPI within 7 days — Indore only” | ≥80 waitlist signups / 4 weeks; ≥25% convert to real WoZ booking when invited | <30 signups or <10% book |
| FD-2 | **Shop partner interest** | Visits + WA blast to 40 shops | “Weekly UPI settle + shared tempo to authorized recycler — soft KYC” | ≥12 shops soft-yes; ≥8 complete first lot | <5 soft-yes |
| FD-3 | **Manufacturer “evidence pack” page** | 1-page PDF + Calendly (or WA) to 30 Indore/Pithampur compliance emails | “₹X/yr — cert vault + shortfall view + export (pilot pricing TBD)” | ≥8 meetings booked; ≥5 complete WTP | <3 meetings |
| FD-4 | **Price-anchored fake door (mfr)** | Same PDF, two price anchors rotated (₹49k vs ₹99k/yr) | Seat + 2 packs/year | Meeting rate not collapsing at higher anchor; qualitative “expensive but…” | Universal “we already have PRO / free from recycler” |
| FD-5 | **Points-only control (do once)** | Small split: half see “EcoPoints,” half see “UPI ₹50–200” | Same wipe story | UPI arm books ≥2× points arm | If points wins, revisit P4 — unlikely |

**Ethics:** Fake-door must disclose Indore-only / waitlist; never charge card. Manufacturer PDFs must carry “not a CPCB filing product / not statutory EPR certificate” footer.

---

## 7. Supply seeding tests with shops

### 7.1 Seeding protocol (Weeks 1–4)

1. **Map** 40 candidate shops (formal recyclers’ informal feeders, mobile repair clusters, scrap yards open to formalization).  
2. **Pitch A (liquidity):** Weekly UPI within 7 days of hub accept; rate card printed; freight shared on multi-shop tempo.  
3. **Pitch B (legitimacy):** Authorized recycler offtake + written reject rules (no surprise unpaid full lots).  
4. **Soft KYC:** Phone + shop photo + address + owner ID; **GSTIN optional** for pilot (caps on volume if no GSTIN).  
5. **Live bar:** Shop is “seeded” only after **first dual-weighed lot** accepted at hub — not after WhatsApp “interested.”  

### 7.2 Supply experiments

| ID | Experiment | Design | Metric |
|----|------------|--------|--------|
| SS-1 | Settlement speed | Cohort A: pay in 7 days; Cohort B: promise 30 days (small n, ethical — prefer A unless testing refusal) | Retention of good fractions; multi-home rate |
| SS-2 | Advance float | ₹2–5k advance to 4 shops vs none | Volume offered Week 1–2; default risk |
| SS-3 | Rate card transparency | Posted category rates vs “call for price” | Dispute rate; trust NPS |
| SS-4 | Adverse selection check | Assayed category mix vs shop declaration | % high-value skim inferred |
| SS-5 | Density gate | Do not advertise consumers until **8 shops live** in 5 km clusters or city-wide honest “coverage map” by locality | Empty-map avoidance |

### 7.3 Shop success metrics (Week 8 / 12)

| Metric | Week 4 gate | Week 8 | Week 12 |
|--------|-------------|--------|---------|
| Live shops (≥1 lot) | 8 | 10 | 12 |
| Median days shop→paid | ≤14 | ≤10 | ≤7 |
| Lots rejected / downgraded | Track baseline | <25% reject | <20% |
| Shops multi-homing good scrap away | Interview | ≤50% admit | ≤40% |

---

## 8. Manufacturer WTP — Van Westendorp + Gabor-Granger lite

### 8.1 Who

- **ICP:** Mid-size obligated producers, Indore/Pithampur-class (one compliance person, Excel today).  
- **Exclude from primary WTP:** Fortune-100 OEMs as “will they buy SaaS” — use only as contrast (expect low).  
- **Stimulus:** Physical/PDF sample pack — recycler-letterhead attestation, lot table, disclaimer, mock “target vs attributed kg” sheet. **No live product UI.**

### 8.2 Van Westendorp (n ≥ 8 completers)

Ask four prices for: *“Annual EcoSure compliance seat: attestation library + 2 filing-period exports + shortfall gap sheet + partner list in MP/CG. Human filing still yours / consultant’s. Not a CPCB certificate.”*

1. Too expensive to consider  
2. Expensive but still consider  
3. Bargain / good value  
4. Too cheap to trust quality  

**Analysis (lite):** Plot cumulative; read PMC / PPE intersection band. Hypothesized acceptable band from research: **₹30k–1.2L**. Pilot success if **≥50% of completers** have “expensive but consider” ≤ ₹1.2L and “too cheap” ≥ ₹15k (trust floor).

### 8.3 Gabor-Granger lite (same respondents, after VW)

Present descending accept/reject:

`₹1,50,000 → ₹99,000 → ₹74,000 → ₹49,000 → ₹29,000` per year  

At first “yes,” stop. Record also: *Would you buy if recycler already gives free PDFs?* (expect many yes-only-if gap view + audit trail).

**Success (Week 12):**

- ≥3 verbal LOIs or “would put in next FY budget” at ≥ ₹30k  
- Median GG accept ≥ ₹49k **or** clear pack-fee alternative (≥ ₹10k/pack × 2)  
- Zero LOIs that require EcoSure to “guarantee EPR target closure” (those are poison)

**Kill:** 0/8 would pay anything; universal “recycler/PRO already covers”; or demand for statutory guarantee.

---

## 9. Stage-gate kill criteria (Week 4 / 8 / 12)

Philosophy: **kill the GTM or the hypothesis, not “try harder with an app.”** Building software does not fix empty density, cash timing, or cert overclaim.

### Week 4 — “Density & honesty gate”

| # | Kill if… | Pivot if… | Pass if… |
|---|----------|-----------|----------|
| K4.1 | <1 authorized recycler LOI with reject + naming terms | Remote recycler + local hub only | ≥1 LOI signed |
| K4.2 | <6 shops live (first lot) | Soften KYC further; add advances | ≥8 shops live |
| K4.3 | Counsel refuses attestation naming / claims risk | Rename + shrink claims; delay mfr | Memo signed off |
| K4.4 | Team marketing “CPCB certificate / SPCB can see you” | Immediate halt sales copy | Copy audit clean |
| K4.5 | Consumer WoZ: <5 completed pickups **and** FD-1 <30 waitlist | Drop mass consumer; society-only | ≥5 pickups or strong waitlist |
| K4.6 | Shop median pay promise slips to “next month” in practice | Inject float or pause shops | Pay ≤14 days on ≥80% lots |

**If ≥2 hard kills → STOP physical expansion; do not start FD-3 manufacturer push.**

### Week 8 — “Ops & adverse selection gate”

| # | Kill if… | Pivot if… | Pass if… |
|---|----------|-----------|----------|
| K8.1 | Formal corridor volume < **2 t** cumulative OR on track < **8 t/month** run-rate | Narrow categories (phones/IT only); society drives | ≥2 t done; path to 8 t/mo |
| K8.2 | Reject + major dispute > **35%** of lots | Stricter intake; drop worst shops | ≤25% |
| K8.3 | ≥70% shops admit best fractions still go informal cash | Rate card + advance redesign | ≤50% |
| K8.4 | Recycler threatens exit over feedstock quality / cert wording | Fix QA; counsel reword | Recycler renews LOI |
| K8.5 | <4 manufacturer interviews completed | Extend 2 weeks; cut consumer spend | ≥6 interviews; WTP started |
| K8.6 | Hub float broke / unpaid shops >14 days | Pause intake | Settlement SLA held |

**If K8.1 + K8.2 both fail → kill hub-heavy model; reconsider shop→recycler direct only or exit.**

### Week 12 — “Revenue & scale gate”

| # | Kill if… | Pivot if… | Pass if… |
|---|----------|-----------|----------|
| K12.1 | <2 manufacturer WTP “yes” ≥ ₹30k/yr (or equiv packs) | Become recycler ops tool only (SaaS later); no mfr ARR story | ≥3 yes / LOI-budget |
| K12.2 | No path to **8–12 t/month** without burning incentive > revenue thesis | City change or B2B take-back only | Run-rate credible |
| K12.3 | Business plan still depends on scrap GMV take-rate or gov ARR | Force SaaS/pack model | Model matches research |
| K12.4 | Attestation→portal-ref linkage rate = 0% and recycler refuses | Stay internal custody only; delay mfr sales | ≥ partial portal-ref on sample |
| K12.5 | Pressure to build full PRD Phase 1–4 to “save” weak ops | Refuse; WoZ was the product | Decision: thin ops OS next **or** stop |

**GO to thin software only if:** Week 12 pass on K12.1 **or** strong recycler SaaS WTP, plus settlement SLA, plus legal naming — then build **smallest** custody + attestation store, not EcoPoints + gov dashboard.

---

## 10. 12-week calendar (learning sprints)

| Weeks | Focus | Outputs |
|-------|--------|---------|
| **0** | Counsel memo, city setup, recycler LOI chase, Sheet schema, Hindi WA scripts | Go / no-go for Indore |
| **1–2** | Shop seeding SS-\*; consumer interviews; WZ-1 start; FD-1/2 | 8 shop pipeline |
| **3–4** | First multi-shop hub days; wipe ritual; Week 4 gate | Gate memo |
| **5–6** | Scale WoZ pickups; society pilots; recycler attestations | Volume + dispute baseline |
| **7–8** | Manufacturer interviews + VW/GG start; SPCB soft briefing; Week 8 gate | WTP dataset begun |
| **9–10** | Evidence packs to mfr; FD-3/4; settle SLA stress test | Pack feedback |
| **11–12** | Finish WTP; write Kill/GO decision; **optional** Sheet automation only | Pilot Decision Record |

---

## 11. Budget ballpark (INR) — 12 weeks, no fancy tech

Assumes Indore primary, lean team, WoZ ops. Ranges = frugal → adequate.

| Line item | Frugal (₹) | Adequate (₹) | Notes |
|-----------|------------:|-------------:|-------|
| Pilot PM / researcher (3 mo) | 2,25,000 | 3,75,000 | Founder salary opportunity or hire |
| Field ops associate (3 mo) | 90,000 | 1,50,000 | Pickups, shop runs, hub days |
| Part-time ops/finance desk | 45,000 | 75,000 | UPI reconcile, Sheet hygiene |
| Shop / hub settlement float (working capital) | 1,50,000 | 3,00,000 | Revolving; not “spend” if recovered |
| Consumer incentives (UPI/vouchers) | 40,000 | 80,000 | ~₹50–200 × pickups + society |
| Shop joining / pilot goodwill | 30,000 | 60,000 | Small advances / rate top-ups |
| Hub tempo / freight / labour | 60,000 | 1,20,000 | Multi-shop trips |
| Interview incentives (all segments) | 40,000 | 70,000 | ₹300–1,000 consumer; higher for pros as gift |
| Manufacturer meeting hospitality / travel Pithampur | 25,000 | 50,000 | |
| Counsel memo + cert wording | 50,000 | 1,00,000 | Non-negotiable |
| WhatsApp Business + SIM + prints + scales hire | 20,000 | 40,000 | Dual weigh tools |
| Local travel / stay contingencies | 40,000 | 80,000 | |
| Misc (society permissions, storage, misc) | 25,000 | 50,000 | |
| **Opex subtotal (excl. recoverable float)** | **~6.9L** | **~12.5L** | |
| **+ Working capital float** | **+1.5L** | **+3.0L** | Separately tracked |
| **Total cash to stage** | **~8.5–9L** | **~15–16L** | |

**Do not budget:** custom app build, Meta BSP enterprise, agency creative, CPCB “integration,” multi-city ops, gov relations retainers.

**Burn discipline:** Cap consumer incentives until Week 4 density gate passes. Manufacturer WTP work is interview time, not ads.

---

## 12. Metrics dashboard (Sheet only)

Track weekly — nothing else:

1. Live shops / live localities  
2. Pickups requested → completed  
3. Kg collected → hub accepted → recycler accepted  
4. Reject % / dispute %  
5. Median days to shop UPI  
6. Waitlist size (FD-1)  
7. Manufacturer interviews / VW-GG completes / LOIs  
8. Incidents: cert wording slips, unpaid shops, safety  

**Non-metrics (ignore vanity):** app downloads, EcoPoints earned, “agencies onboarded,” LinkedIn reach.

---

## 13. Decision record template (end of Week 12)

```text
PILOT DECISION — EcoSure Indore 12-week
Date:
Problem hypotheses validated / falsified:
Solution hypotheses validated / falsified:
Revenue: WTP band = ₹____ ; n LOIs = __
Growth: density model works? Y/N
KILL / PIVOT / GO-THIN-SOFTWARE
If GO: next build = ________________ (max 1 vertical slice)
If KILL: what we learned worth keeping = ________________
```

---

## 14. Alignment to PRD roadmap (deliberate disobedience)

| PRD default | Pilot stance |
|-------------|--------------|
| Phase 1 Collection MVP software | **Defer** — WoZ custody first |
| Phase 2 EcoPoints | **Challenge** — UPI/voucher test; points only as FD-5 control |
| OQ-02 monthly settlement | **Override for pilot** — weekly (research must-fix) |
| OQ-03 consumer EcoPoints not cash | **Override for pilot** — small UPI |
| OQ-53 English first / Hindi Phase 5 | **Override** — Hindi WA from Week 0 |
| Phase 4 Manufacturer + Government together | **Split** — manufacturer WTP yes; gov dashboard SKIP |
| Certificate as compliance evidence | **Rename** — processing attestation + disclaimer |
| Regulator coverage success metric | **Drop** for pilot |

This pilot succeeds if it **kills a wrong company** early or **earns the right to build a thin custody/evidence OS**. It fails if it becomes a 12-week excuse to code Phase 0–5.

---

## Related docs

- [Idea feasibility (no UI)](./idea-feasibility-no-ui.md)  
- [Tier-2/3 field issues](./tier2-tier3-field-issues.md)  
- [Manufacturer feasibility — Indore vs OEM](./manufacturer-feasibility-02-indore-vs-oem.md)  
- [Recycler feasibility Analyst 2](./recycler-feasibility-analyst-2.md)  
- [Government feasibility Analyst 2](./government-feasibility-analyst-2.md)  
- [PRD roadmap](../prd/13-roadmap.md)  
- [Open questions](../prd/14-open-questions.md)
