# EcoSure — Unit Economics Memo (ILLUSTRATIVE)

**Date:** 2026-09-27  
**Audience:** Product / ops / fundraising decisioning  
**Currency:** India INR  
**Status:** Decision aid — **all figures labeled ILLUSTRATIVE**; not audited cost sheets or pilot measured data  
**Grounding:** [`idea-feasibility-no-ui.md`](./idea-feasibility-no-ui.md), [`tier2-tier3-field-issues.md`](./tier2-tier3-field-issues.md), hub/shop feasibility angles therein, [`manufacturer-feasibility-02-indore-vs-oem.md`](./manufacturer-feasibility-02-indore-vs-oem.md)

---

## How to read this memo

1. Numbers are **scenario math under explicit assumptions**, not forecasts.  
2. “Contribution margin” here = revenue attributable to the unit **minus** variable cash costs of that unit (labour, incentives, freight, payouts, variable ops). Fixed city overhead (hub rent, platform eng) is **excluded** unless noted.  
3. Four economies are **coupled**: consumer incentive burns cash that shop/hub must eventually fund via scrap spread, brand subsidy, or manufacturer SaaS — not magic EcoPoints.  
4. Kill variables are ordered by how fast they flip a green scenario red.

---

## Shared city baseline (ILLUSTRATIVE)

| Parameter | Base case | Notes |
|-----------|----------:|-------|
| Pilot city | Mid Tier-2 (e.g. Indore / Coimbatore-class) | Density better than Tier-3 gali |
| Mix | Mixed consumer e-waste (phones, small ICT, appliances fragments) | Not pure copper/board lots |
| Formal “platform landed value” at recycler gate | **₹45 / kg** | Blended ILLUSTRATIVE offtake |
| Informal street kabadi cash to household | **₹25–60 / kg** by category | Cash today beats points |
| Shop→hub freight (tempo, multi-stop capable) | **₹2,400 / trip** | Shared vs not is the lever |
| Typical shop lot size to hub | **180 kg** | One shop alone vs shared trip |
| Hub→recycler truck capacity (useful payload) | **4.0 t** full / **2.0 t** half | Half-empty = kill mode |
| Hub→recycler freight (FTL corridor) | **₹12,000 / trip** | Distance-sensitive |
| Shop settlement cycle (PRD default) | Monthly | Feasibility: kills vs kabadi |
| Shop settlement cycle (WORKS-IF) | Weekly or advance | Liquidity gate |

---

# Economy 1 — Consumer pickup contribution margin

**Question:** Does a completed pickup contribute cash, or is it a funded acquisition cost?

**Unit:** One completed consumer pickup (door / society gate → shop collect).

### Assumptions table (ILLUSTRATIVE)

| # | Assumption | Points-only | UPI micro-incentive |
|---|------------|------------:|--------------------:|
| C1 | Avg net weight credited | 2.5 kg | 2.5 kg |
| C2 | Platform / brand take attributable to pickup (optional EPR brand fund) | ₹0 | ₹0 |
| C3 | EcoPoints earn (face value if redeemable) | ₹40 | ₹15 (bonus only) |
| C4 | EcoPoints redemption rate (actual cash burn) | 35% | 25% |
| C5 | UPI paid at collect | ₹0 | **₹50** |
| C6 | Shop variable collect labour (allocated) | ₹35 | ₹35 |
| C7 | Rider / last-mile if shop-dispatched (50% of pickups) | ₹60 × 0.5 = ₹30 | ₹30 |
| C8 | WhatsApp / SMS / OTP variable | ₹3 | ₹3 |
| C9 | Dispute / no-show rework load (amortized) | ₹12 | ₹8 |
| C10 | Material value accruing to shop (not platform) | Street-competitive pay later | Same |

**Platform cash contribution** (platform as payer of incentives + messaging; shop pays own labour):

```text
CM_platform = − (C4×C3) − C5 − C8 − C9
# Points-only:  −(0.35×40) −0 −3 −12 = −₹29
# UPI path:     −(0.25×15) −50 −3 −8  = −₹64.75
```

**Shop cash contribution** on the same pickup (before hub settlement):

```text
# Assume shop later receives hub settle ₹28/kg blended (ILLUSTRATIVE) on 2.5 kg
Shop_rev   = 2.5 × 28 = ₹70
Shop_cost  = C6 + C7 = ₹65
CM_shop    = ₹5   (thin; negative if weight under-declared or freight clawback)
```

### Scenario matrix (ILLUSTRATIVE)

| Scenario | Platform CM / pickup | Shop CM / pickup | Adoption reality (feasibility) |
|----------|---------------------:|-----------------:|--------------------------------|
| **A. Points-only** | **−₹29** | ~₹5 if settled | Household prefers kabadi cash → **low volume** |
| **B. UPI ₹50 + thin points** | **−₹65** | ~₹5 | Higher completion; **funded burn** |
| **C. Brand-funded UPI** (EPR / OEM take-back budget pays C5) | **−₹15** (points+comms only) | ~₹5 | Best; platform not the wallet |
| **D. Walk-in drop at shop** (no rider half) | A: −₹29; B: −₹65 | **+₹35** (drop C7) | Better shop CM; worse consumer convenience |

### Verdict (Economy 1)

- Points-only is **cheap on the P&L and expensive on volume** — contribution looks “less negative” because few rational households show up.  
- UPI micro-incentive is **correct ops** and **worse unit CM** unless **brand/EPR budget** pays it (Scenario C).  
- Platform should treat consumer pickup CM as **CAC / funnel cost**, not profit centre.

**Kills first:** (1) **No subsidy wallet** for UPI while insisting on door pickup density; (2) **redemption spikes** if points become real gift cards without brand funding; (3) **avg kg < 1.5** (labour + UPI dominate).

---

# Economy 2 — Shop per-kg economics

**Question:** When does a Tier-2/3 shop prefer EcoSure over street kabadi?

**Unit:** 1 kg net accepted at hub (after dual-weigh / grade).

### Assumptions table (ILLUSTRATIVE)

| # | Assumption | Street (kabadi) | Platform — freight **not** shared | Platform — freight **shared** (3 shops / trip) |
|---|------------|----------------:|----------------------------------:|-----------------------------------------------:|
| S1 | Cash / settle timing | Same day | Monthly (PRD) or Weekly (WORKS-IF) | Weekly |
| S2 | Price received by shop | **₹32 / kg** | **₹28 / kg** (formal invoiceable) | **₹28 / kg** |
| S3 | Freight to hub | ₹0 (buyer collects) | ₹2,400 / 180 kg = **₹13.3 / kg** | ₹2,400 / (3×180) = **₹4.4 / kg** |
| S4 | GST / paperwork friction (soft cost, cash-equivalent) | ₹0 | ₹2 / kg | ₹2 / kg |
| S5 | Weight haircut / dispute reserve | ₹1 / kg | ₹2 / kg | ₹2 / kg |
| S6 | Working-capital cost (delay) | ₹0 | Monthly settle ≈ **₹1.2 / kg***; Weekly ≈ **₹0.3 / kg** | Weekly **₹0.3 / kg** |
| S7 | Adverse-selection: high-value skimmed elsewhere | High value stays street | Platform gets residual mix | Residual mix |

\*ILLUSTRATIVE: ₹28/kg × 30 days delay × ~1.5%/month informal cost of capital ≈ ₹1.3/kg; rounded.

### Net to shop per kg (ILLUSTRATIVE)

```text
Net = S2 − S3 − S4 − S5 − S6
```

| Path | Net ₹/kg | vs street ₹32 |
|------|--------:|--------------:|
| Street kabadi | **32.0** | — |
| Platform, freight alone, **monthly** settle | 28 − 13.3 − 2 − 2 − 1.2 = **₹9.5** | **−₹22.5** |
| Platform, freight alone, **weekly** settle | 28 − 13.3 − 2 − 2 − 0.3 = **₹10.4** | **−₹21.6** |
| Platform, **shared freight**, weekly | 28 − 4.4 − 2 − 2 − 0.3 = **₹19.3** | **−₹12.7** |
| Platform, shared freight, weekly, **rate match street ₹32** | 32 − 4.4 − 2 − 2 − 0.3 = **₹23.3** | **−₹8.7** |
| Platform + **hub advance** (WC ≈ 0) + shared + rate ₹32 | 32 − 4.4 − 2 − 2 − 0 = **₹23.6** | Still below street on pure ₹; wins on **offtake certainty / volume days** |

### How shop can still join (feasibility WORKS-IF)

Street wins on **spot price + cash today**. EcoSure wins only if at least two of:

1. **Shared freight** (multi-shop trip / hub pickup),  
2. **≤7–14 day money** (weekly or advance),  
3. **Rate within ~₹3–5/kg of street** on grades the shop actually sends,  
4. Steady offtake when street buyers ghost monsoon / junk categories.

Otherwise: **multi-home** — boards/copper → street; junk residual → EcoSure (recycler feedstock death).

### Verdict (Economy 2)

| Condition | Shop net | Join behaviour |
|-----------|----------|----------------|
| Monthly + own freight | ~₹9–10/kg | **No / residual only** |
| Weekly + shared freight + near-street rate | ~₹23/kg | **Conditional yes** |
| Advances + shared + street-competitive | Best formal path | **WORKS-IF** |

**Kills first:** (1) **Freight not shared** (₹13+/kg tax alone); (2) **monthly settlement**; (3) **platform rate ≪ street by >₹8/kg** on sortable fractions.

---

# Economy 3 — Hub per-tonne economics

**Question:** Is the regional hub a consolidator with positive spread, or a margin leak?

**Unit:** 1 tonne outbound to authorized recycler (hub gate → recycler gate).

### Assumptions table (ILLUSTRATIVE)

| # | Assumption | Full truck (4.0 t) | Half truck (2.0 t) |
|---|------------|------------------:|-------------------:|
| H1 | Recycler pays hub (blended) | **₹45,000 / t** | **₹45,000 / t** |
| H2 | Hub pays shops (blended) | **₹28,000 / t** | **₹28,000 / t** |
| H3 | Hub→recycler freight | ₹12,000 / 4 t = **₹3,000 / t** | ₹12,000 / 2 t = **₹6,000 / t** |
| H4 | Hub inbound collection freight (shared tempos amortized) | **₹4,500 / t** | **₹4,500 / t** |
| H5 | Hub ops labour + handling + bags | **₹2,500 / t** | **₹2,500 / t** |
| H6 | Grade loss / reject / moisture (net) | **₹1,500 / t** | **₹1,500 / t** |
| H7 | Godown + utilities allocated | **₹1,200 / t** @ ≥10 t/mo | **₹2,400 / t** @ thin volume* |
| H8 | Advance book to shops (float) | See below | See below |
| H9 | Offtake SLA | Assumed held | Assumed held |

\*Feasibility: hub collapses below ~**8–12 t/month**; fixed costs thicken per tonne when half-empty and sparse.

### Gross spread before advances (ILLUSTRATIVE)

```text
Spread/t = H1 − H2 − H3 − H4 − H5 − H6 − H7
```

| Case | Calc | CM ₹/t |
|------|------|-------:|
| **Full truck, dense month** | 45k − 28k − 3k − 4.5k − 2.5k − 1.5k − 1.2k | **+₹4,300 / t** |
| **Half truck, dense month** | 45k − 28k − 6k − 4.5k − 2.5k − 1.5k − 1.2k | **+₹1,300 / t** |
| **Half truck, thin month** (H7 = 2.4k) | … − 2.4k | **+₹100 / t** |
| **Half truck + shop rate forced to ₹32/t-eq** (H2 = 32k) | 45 − 32 − 6 − 4.5 − 2.5 − 1.5 − 2.4 | **−₹3,900 / t** |

### Advances: with vs without (ILLUSTRATIVE)

Hub advances shops **40% of expected settle** for 14 days to stop multi-homing (field HUB-CBE-06).

| Parameter | Value |
|-----------|------:|
| Advance intensity | ₹11,200 / t shop-side (40% × ₹28k) |
| Cost of capital | 1.8%/month informal / WC line |
| Days outstanding | 14 → factor ≈ 0.9% of advance |
| **WC cost** | ≈ **₹100 / t** |
| Default / dispute on advances | Base **₹400 / t** reserve; stress **₹2,000 / t** |

| Case | CM ₹/t after WC |
|------|----------------:|
| Full truck + advances (base reserve) | 4,300 − 100 − 400 = **+₹3,800** |
| Full truck + advances (stress defaults) | 4,300 − 100 − 2,000 = **+₹2,200** |
| Half truck + advances (base) | 1,300 − 100 − 400 = **+₹800** |
| Half truck + advances (stress) | 1,300 − 100 − 2,000 = **−₹800** |
| Half truck, thin, stress, rate war | Deeply **negative** |

### Volume gate (from feasibility)

| Monthly hub throughput | Implied FTL pattern | Hub P&L |
|-----------------------:|---------------------|---------|
| < 8 t | Chronic half loads | **Red** |
| 8–12 t | Mix full/half | Fragile |
| ≥ 16 t (~4 FTL) | Mostly full | **Green if offtake SLA** |

### Verdict (Economy 3)

- Hub is **viable as recycler-backed consolidator** on **full trucks + shared inbound + modest advances**.  
- Hub is a **tax** on half trucks, unpaid float, or rate wars to match street without recycler paying up.  
- Advances are **cheap insurance** (~₹100–500/t) vs **adverse selection** — until default reserve blows out.

**Kills first:** (1) **Half-empty trucks** (freight ₹/t doubles); (2) **no offtake SLA** (dwell + price risk not in table — instant red); (3) **advance defaults** under thin KYC; (4) throughput **< ~8–12 t/month**.

---

# Economy 4 — Manufacturer SaaS LTV / CAC (mid-size Indore brand)

**Question:** Can mid-size EPR-obligated brands fund a wedge of ARR?

**Unit:** One mid-size Indore / Pithampur-class producer seat (annual).

### Assumptions table (ILLUSTRATIVE)

| # | Assumption | Conservative | Base | Upside |
|---|------------|-------------:|-----:|-------:|
| M1 | Annual contract value (ACV) | ₹36,000 | **₹72,000** | ₹1,20,000 |
| M2 | Add-on packs / filing periods | ₹8,000 | **₹15,000** | ₹30,000 |
| M3 | Year-1 revenue (ACV + packs) | ₹44,000 | **₹87,000** | ₹1,50,000 |
| M4 | Gross margin (SaaS + packs) | 70% | **78%** | 85% |
| M5 | Logo churn / year | 35% | **22%** | 12% |
| M6 | Expected life (1 / churn) | 2.9 yr | **4.5 yr** | 8.3 yr |
| M7 | Expansion (net revenue retention) | 0.95 | **1.05** | 1.15 |
| M8 | Fully loaded CAC (AE + demos + legal review + pilot support) | ₹55,000 | **₹85,000** | ₹1,20,000 |
| M9 | Sales cycle | 90 days | **120 days** | 180 days |
| M10 | Prerequisite | ≥1–2 authorized recyclers live in MP/CG corridor issuing attestations | Same | Same |

### LTV / CAC math (ILLUSTRATIVE)

Simplified:

```text
LTV ≈ (Year-1 revenue × GM × life × NRR_adj)
# Base: 87,000 × 0.78 × 4.5 × 1.05 ≈ ₹3,20,000
LTV:CAC (base) ≈ 3,20,000 / 85,000 ≈ 3.8×
```

| Scenario | LTV (ILLUSTRATIVE) | CAC | LTV:CAC | Payback (GM basis) |
|----------|-------------------:|----:|--------:|--------------------|
| Conservative | ₹44k × 0.70 × 2.9 × 0.95 ≈ **₹85k** | ₹55k | **1.5×** | ~22 months |
| **Base** | ≈ **₹3.2L** | ₹85k | **~3.8×** | ~15 months |
| Upside | ₹1.5L × 0.85 × 8.3 × 1.15 ≈ **₹12.2L** | ₹1.2L | **~10×** | ~11 months |

*Payback ≈ CAC / (Year-1 revenue × GM / 12).*

### What this money is *not*

- Not large-OEM enterprise (PRO-locked; CAC blows up; ACV may be ₹0 as unpaid data pipe).  
- Not per-tonne scrap take-rate (collides with credit markets / recycler refusal).  
- Not payable before **Phase-3-class custody attestations** exist — empty shelf → churn spike → LTV collapse.

### Verdict (Economy 4)

- Mid-size Indore wedge is **commercially plausible** at base **~3–4× LTV:CAC** if recyclers are live and cert naming stays non-statutory.  
- Manufacturer ARR is a **secondary** wedge (feasibility: ~10–25% of company revenue early), not the network’s working-capital engine.

**Kills first:** (1) **Empty recycler network** (churn → life < 2 yr); (2) **cert overclaim** (legal block, infinite CAC); (3) **CAC > ₹1.2L** with ACV stuck at ₹36k; (4) selling **Phase-4 vanity charts** without gap/export.

---

# Cross-economy cash stack (one city, ILLUSTRATIVE)

Monthly sketch assuming WORKS-IF ops (not PRD defaults):

| Flow | Direction | ILLUSTRATIVE |
|------|-----------|--------------|
| 25 t formalised / month through hub | Recycler → Hub | +₹11.25L @ ₹45/kg |
| Shop payouts | Hub → Shops | −₹7.0L @ ₹28/kg |
| Freight + hub ops + loss | Hub costs | −₹~2.7L (full-truck mix) |
| Hub CM before advances | | **~₹1.5L / month** on 25 t |
| Consumer UPI (2,000 pickups × ₹50), brand-funded 70% | Platform / brand | Platform residual burn **~₹30k** |
| Manufacturer seats (8 logos × ₹6k/mo equivalent) | Brands → Platform | **~₹48k ARR/mo** |

**Read:** Network spread at hub/recycler layer carries ops; manufacturer SaaS is **margin icing**; consumer UPI must be **brand-subsidised** or kept walk-in-heavy.

---

# Sensitivity — which variable kills the model first?

Ranked by **speed to red** across the four economies (highest severity first):

| Rank | Variable | Where it hits | Flip condition (ILLUSTRATIVE) |
|-----:|----------|---------------|-------------------------------|
| **1** | **Shop money timing** (monthly vs ≤14 days) | Econ 2 → 3 feedstock quality | Monthly settle → multi-home → residual junk → recycler reject → hub CM gone |
| **2** | **Freight sharing / truck fill** | Econ 2 & 3 | Own-freight ₹13/kg or half truck ₹6k/t freight → shop and hub both red |
| **3** | **Hub throughput < 8–12 t/mo** | Econ 3 | Fixed cost + half loads; advances default |
| **4** | **Recycler offtake SLA / price** | Econ 3 | −₹5/kg offtake (~₹5k/t) erases full-truck CM |
| **5** | **Consumer incentive without subsidy wallet** | Econ 1 | Door-pickup UPI at scale with no brand fund → platform cash hole before SaaS scales |
| **6** | **Platform vs street rate gap** | Econ 2 | Gap > ~₹8/kg on good fractions → adverse selection |
| **7** | **Manufacturer supply-side empty** | Econ 4 | No recyclers/certs → churn > 35% → LTV:CAC < 2× |
| **8** | **Advance default rate** | Econ 3 | Stress ₹2k/t reserve on half trucks → negative |
| **9** | **EcoPoints redemption without funding** | Econ 1 | Face-value burn if gift cards “feel real” |
| **10** | **Sales CAC creep on mid-size** | Econ 4 | CAC ₹1.2L+ on ₹36k ACV |

### One-variable stress (base hub full-truck +₹4,300/t)

| Shock | New hub CM / t |
|-------|---------------:|
| Offtake −₹5/kg | **−₹700** |
| Half truck only | **+₹1,300** |
| Shop rate +₹4/kg (street match) | **+₹300** |
| Inbound freight not shared (+₹9/kg shop-equivalent pushed to hub) | **≈ −₹4,700** if hub eats it |
| Advances stress default | Still green on full truck; **red on half** |

**First domino in practice (feasibility + this math):**  
**Liquidity (settlement/advances) → freight fill → offtake price.** Consumer points and manufacturer charts die later; they do not save a red hub.

---

# Decision rules (ops)

1. **Do not** launch a city without: min shop density + 1 hub + 1 authorized recycler offtake SLA + weekly/advance path.  
2. **Do not** put consumer UPI on platform balance sheet at scale; attach to **brand/EPR budget** or restrict to high-intent categories.  
3. **Price shop settlements** within striking distance of street **after** shared freight — not before.  
4. **Hub KPI:** % FTL, t/month, advance default %, dispute rate — not “shops onboarded.”  
5. **Manufacturer sell** only where certs already exist; ACV band **₹30k–1.2L/yr** (research); kill deal if legal wants “guaranteed EPR.”

---

# Label reminder

**Every rupee in this memo is ILLUSTRATIVE.** Replace with pilot weighbridge tickets, tempo invoices, settlement ledgers, and 3 Indore EPR-manager price tests before board-level planning.

**Related:** [`idea-feasibility-no-ui.md`](./idea-feasibility-no-ui.md) · [`tier2-tier3-field-issues.md`](./tier2-tier3-field-issues.md) · [`manufacturer-feasibility-02-indore-vs-oem.md`](./manufacturer-feasibility-02-indore-vs-oem.md)
