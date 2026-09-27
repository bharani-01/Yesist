# 16 — International Precedents for EcoSure PRD v2

**Agent:** 16 of 36 (research swarm)  
**Angle:** International e-waste take-back precedents (EU WEEE, Switzerland SENS/Swico, Japan, South Korea, China, Ghana/Nigeria/Kenya, US states). Which mechanisms actually drove formal diversion, and what should v2 learn from them?  
**Inputs read:** `docs/prd/00-overview.md`, `docs/prd/10-workflows.md` (plus targeted greps of `14-open-questions.md` and `12-nfr-security.md`)  
**Date:** 2026-09-26  
**Status:** Research only. No PRD files were edited.

Convention: claims taken from a primary source I opened, or from a search snippet quoting one, carry a URL. Claims I could not confirm directly against a primary document are marked **UNVERIFIED**.

---

## 1. Sources

| # | Source | Used for |
|---|--------|----------|
| S1 | Japan MoE, *Home Appliance Recycling Law* (English summary) — https://www.env.go.jp/en/laws/recycle/08.pdf | Manifest (recycling ticket) design, role split |
| S2 | RKC (AEHA Recycling Ticket Center), retailer collection method — https://www.rkc.aeha.or.jp/recycleticket/retailer_recovery/ | Ticket copies, 3-year retention, citizen right to inspect |
| S3 | RKC discharger lookup — https://rkc-bu-in3.rkc.aeha.or.jp/rkc_ref_web/KT330080/init | Public 13-digit ticket lookup (date, maker, item) |
| S4 | METI FAQ — https://www.meti.go.jp/policy/it_policy/kaden_recycle/faq/faq.html | Confirms public lookup; "yellow ticket" managed-collection mode for e-commerce sellers (2021) |
| S5 | MoE council paper on implementation status — https://www.env.go.jp/council/content/03recycle03/000376524.pdf | Collection rate 64.1% (FY2019), target 70.9% by FY2030; monitoring indicators |
| S6 | Arimura et al., *Recycling Laws and Their Evaluation in Japan* (Springer, 2024) — https://link.springer.com/chapter/10.1007/978-981-97-2187-0_7 | Pay-at-discharge fee drives illegal dumping; deposit-refund recommended |
| S7 | Shimada & Van Wassenhove, Kobe Univ. working paper 2010-9 — https://b.kobe-u.ac.jp/papers_files/2010_09.pdf | Logistics firms paid fees but illegally exported units instead of delivering |
| S8 | Japan MoE, ANWS 2019 slides — https://www.env.go.jp/en/recycle/asian_net/Annual_Workshops/2019_PDF/Session2/S2_07_Japan_ANWS2019.pdf | Flows to scrappers/exporters (~1.6M appliances) |
| S9 | ERIA, *Circular Value Chains of EEE in ASEAN* — https://www.eria.org/uploads/Circular-Value-Chains-of-Electrical-and-Electronic-Equipment-ASEAN.pdf | ~26% of four-appliance flows to scrappers in 2020 (from search synthesis; **UNVERIFIED** exact figure) |
| S10 | SENS eRecycling 2024 facts & figures — https://www.erecycling.ch/en/ueber-sens/medien-und-publikationen/geschaeftsbericht/overview-2024/facts-figures.html | ARF funding, free return at any outlet, 442 collection points, collection-rate caveats |
| S11 | Swico, manufacturers & importers — https://www.swico.ch/en/recycling/recycling-and-disposal/manufacturers-and-importers/ | ARC/ARF mechanics |
| S12 | Swico, auditor page — https://www.swico.ch/en/recycling/basics/auditor-for-swico-recycling/ | Annual recycler audits, biennial dismantler audits, 3–6 yr downstream; SN EN 50625; cantons recognise audits as delegated enforcement |
| S13 | SENS/Swico technical report 2024, recycler audits — https://www.fachbericht.ch/en/fachbericht-2024/recycler-audits.html | Audit + batch test method |
| S14 | SENS/Swico technical report 2025, material-flow transparency — https://www.fachbericht.ch/en/fachbericht-2025/Stofffluss-Transparenz.html | Annual material-flow tally incl. downstream fraction recipients; "WEEE flow" software |
| S15 | China MoF et al., *Home Appliance Trade-in Implementation Measures* (2009) — http://www.mof.gov.cn/gkml/caizhengwengao/2009niancaizhengbuwengao/caizhengwengao200907/200911/t20091118_233410.htm | 10% consumer subsidy with caps; 7-working-day treasury payment; anti-fraud duty |
| S16 | China MoF/MEP, *Trade-in Dismantling Subsidy Measures* (2010) — https://www.mof.gov.cn/gkml/caizhengwengao/2010nianwengao/wgd5q/201007/t20100722_329285.htm | Per-unit dismantling subsidy (TV ¥15, fridge ¥20, washer ¥5, PC ¥15); EPB checks on output flows; clawback + disqualification |
| S17 | China MOFCOM/MoF/MEP notice 商商贸函[2011]210号 — https://dcj.mofcom.gov.cn/article/gztz/201104/20110407501849.shtml | 45-day handover deadline; removal of dual collector+dismantler qualification; one-to-one voucher/unit matching |
| S18 | Revised Trade-in Measures (2010) — http://jsz.mof.gov.cn/zhengcefagui/201006/t20100629_324748.htm | Penalties; ban on re-circulating collected units; on-site regulator presence |
| S19 | CNTV, vouchers sold online (2011) — http://jingji.cntv.cn/20110821/102256.shtml | Trade-in voucher black market; weak matching at dismantlers |
| S20 | Report on Hunan Suning (2011) — https://chengshousi.com/html/2011/itjiadian_0930/13989.html | Retailer staff resold good units to second-hand market while vouchers were still claimed (media report; **UNVERIFIED** outcome) |
| S21 | ADB Development Asia case study — https://development.asia/case-study/subsidizing-ecofriendly-practices-e-waste-recycling-peoples-republic-china | Three policy stages; immediate volume drop at formal plants in the 2011–12 subsidy gap |
| S22 | Liu et al., *Sustainability* 10(9):2979 (2018) — https://www.mdpi.com/2071-1050/10/9/2979 | Fund mechanics; "green recovery rate" ~34% (2012) → ~60% (2015) (secondary citation; **UNVERIFIED** against primary) |
| S23 | PMC8701818, WEEE fund evaluation — https://pmc.ncbi.nlm.nih.gov/articles/PMC8701818/ | Fund stages; informal profitability persists |
| S24 | MEE, *WEEE Dismantling Audit Guide (2019)* — https://www.gov.cn/zhengce/zhengceku/2019-12/23/content_5463220.htm and text at http://www.gepresearch.com/uploads/soft/190701/9_1722178881.pdf | Self-check → provincial audit → MoF payment; sampling; penalties for colluding auditors |
| S25 | MEP, *Standard Dismantling Operations Guide (2015)* — http://mee.gov.cn/gkml/hbb/bgg/201412/W020141219495065654495.pdf | Continuous CCTV, ≥640×360, key-point footage kept ≥3 years, no editing; subsidised and non-subsidised material kept separate |
| S26 | MoF et al., *WEEE Fund Collection & Use Measures (2012)* — http://www.mof.gov.cn/gkml/caizhengwengao/2012wg/wg201207/201210/t20121022_689163.htm | Data-system cross-checks; national real-time monitoring system linking dismantler systems |
| S27 | Öko-Institut, Ghana incentive pilot slides — https://www.oeko.de/fileadmin/oekodoc/incentive-based-collection-ewaste-ghana-accra-agbogbloshie.pdf | 10 months, 27.3 t cables, 1,389 transactions; system outages from liquidity |
| S28 | Öko-Institut blog — https://www.oeko.de/en/blog/using-incentives-to-put-out-fires-de-eng/ | Payment above material value; initial scepticism, then regular flow |
| S29 | Green Ad Ghana (June 2026) — https://greenadghana.com/2026/06/10/ghana-marks-a-decade-of-pioneering-e-waste-management-with-publication-launch-and-recognition-of-sector-champions/ | MEST-KfW incentive payment system 2020–22 (~457k lb cables, 69k lb batteries, 232k lb plastics); National E-Waste Fund plans digital traceability (news source; **UNVERIFIED** figures) |
| S30 | EPRON consumer report — https://epron.org.ng/report-cover-page/ | 48% used informal collectors for cash; most unaware of collection centres |
| S31 | UNEP/SAICM case study (Nigeria database) — https://saicmknowledge.org/sites/default/files/resources/Case%20Study%202.pdf | Blackbox: producer registry, consumer pickup requests, collector/recycler reporting |
| S32 | GEF good-practice brief (Nigeria) — https://saicmknowledge.org/sites/default/files/resources/GEF_GoodPracticesBriefs_Nigeria_CRA_bl1.pdf | Informal collector feedback: visibility and street security |
| S33 | Kenya EPR Regulations 2024 (L.N. 176) — https://kpp.or.ke/wp-content/uploads/2025/02/Extended-Producer-Responsibility-Regulations-EPR-Regulations.pdf | PRO traceability system; annual reporting |
| S34 | NEMA Kenya EPR FAQ — https://nema.go.ke/knowledge-base/frequently-asked-questions-on-epr-implementation/ | Producers publish per-product payment to waste pickers, paid at collection point/MRF |
| S35 | EEA WEEE collection-rate indicator — https://www.eea.europa.eu/en/european-zero-pollution-dashboards/indicators/waste-electrical-and-electronic-equipment-weee-collection-rate-indicator | EU 40.6% in 2022 vs 65% target; peaked 48.6% in 2019 |
| S36 | EC infringement notice, July 2024 — https://ireland.representation.ec.europa.eu/news-and-events/news/european-commission-opens-5-infringement-procedures-against-ireland-2024-07-25_en | All 27 member states notified for missed waste targets |
| S37 | UNITAR, *In-depth review of WEEE collection rates and targets* (2020) — https://unitar.org/sites/default/files/media/file/In-depth-review_WEEE%20Collection-Targets-and-Rates_UNITAR_2020_Final.pdf | 55% reported, ≥20% complementary flows, 25% unknown; all-actors / clearing house / mandatory handover up to +1.4 kg/inh |
| S38 | WEEE Forum, *EPR and the role of all actors* (2020) — https://weee-forum.org/wp-content/uploads/2020/11/EPR-and-the-role-of-all-actors_final.pdf | Mandatory handover in France/Ireland/NL/BE/RO; France +2.9 kg/inh attributed |
| S39 | Global E-waste Monitor 2024 — https://ewastemonitor.info/wp-content/uploads/2024/12/GEM_2024_EN_11_NOV-web.pdf | Europe documented rate 42.8%; Africa <1% |
| S40 | Korea E-Circle Governance free pickup — https://www.15990903.or.kr/portal/cnts/information.do and https://15990903.or.kr/portal/reserve/reserve.do | Free door-to-door pickup, web/phone/KakaoTalk, rules |
| S41 | Sejong City notice — https://www.sejong.go.kr/bbs/R0126/view.do?nttId=B000000031274Mr6mZ3o | Large items singly; small appliances ≥5 items per pickup; KakaoTalk booking |
| S42 | CalRecycle CEW program — https://calrecycle.ca.gov/electronics/cew/ and update page https://calrecycle.ca.gov/electronics/cew/update/ | $4–6 point-of-sale fee; $0.40/lb collector, ~$1.16–1.19/lb recycler; 1–12% of claimed money denied yearly; ~$27M (1.9%) adjusted to Dec 2025 |
| S43 | 14 CCR §18660.33 — https://govt.westlaw.com/calregs/Document/I9B252C703EDB11F0B49CBC85D00306CA | Collector payment requires source documentation |
| S44 | RCW 70A.500.090 (Washington) — https://apps.leg.wa.gov/rcw/default.aspx?cite=70A.500.090 | Convenience standard: every county, every city >10,000 |
| S45 | WMMFA 2024 annual report — https://ecology.wa.gov/getattachment/5578e428-75a9-4a5e-b199-f4cb1c60691c/2024-WMMFA-v2-Annual-Report-04-21-2025.pdf | 12.84M lb collected in 2024; 200+ free sites |

Not verified in this session (flagged where used): the California "Tung Tai" fraud case figures (62,000 lb received vs 555,000 lb claimed) appeared only in a search synthesis — **UNVERIFIED**. India E-Waste (Management) Rules 2022 bulk-consumer obligations are cited from background knowledge — **UNVERIFIED** here; confirm with the regulatory agent.

---

## 2. Findings

### F1. Who pays, and when, decided diversion more than tracking did

| System | Funding moment | Citizen experience | Outcome signal |
|--------|----------------|--------------------|----------------|
| Switzerland SENS/Swico | Advance recycling contribution at purchase (S10, S11) | Free return at any retailer or 442+ points | "Almost all" WEEE processed in-system; export needs a federal permit (S10). Operator admits its collection rate has data limitations |
| Japan (4 appliances) | Citizen pays ¥1,500–4,800-range fee **at disposal** (S1, S6) | Must pay to discard | Illegal dumping (164,678 items in 2002 → 53,195 in 2020 after enforcement, S6); ~1/3 leaks to scrappers/exporters (S8, S9); FY2019 collection 64.1%, FY2030 target 70.9% (S5) |
| China 2009–11 trade-in | State pays consumer 10% of new price (capped) and dismantler ¥5–20/unit (S15, S16) | Paid to hand in | 100+ formal plants created; **volume at formal plants dropped immediately** in the 2011–12 gap before the producer fund paid out (S21) |
| China 2012+ fund | Producer levy per unit sold → per-unit dismantling subsidy (S22, S26) | Informal still pays more for some items | "Green recovery rate" ~34% (2012) → ~60% (2015) (S22, **UNVERIFIED** vs primary) |
| California | $4–6 fee at sale; state pays recycler per lb, recycler must pass $0.40/lb to collector (S42, S43) | Free drop-off | Continuous claims; 1–12% of claimed money denied yearly (S42) |
| Ghana pilots | Donor/state pays **above** scrap value, instantly, via mobile money (S27, S28) | Paid more than kabadiwala-equivalent | 27.3 t, 1,389 transactions in 10 months; cable burning visibly reduced; outages when cash ran short (S27) |

Lesson: charging the discarder (Japan) creates leakage. Paying the discarder works (China, Ghana), but only while the money keeps flowing. EcoSure's scheme-funded UPI incentive at `collected` is on the right side of this evidence. The PRD has no plan for keeping that funding going, though, and China's 2011–12 gap shows what happens without one.

### F2. Japan's recycling ticket is the closest precedent for EcoSure's public verification, and it shows the limits of paper custody

- Each appliance gets a multi-part ticket (manifest). The citizen keeps a copy and can type a **13-digit number** on a public page to see the handover date, maker, and item (S3, S4). Retailers must keep the returned copy for 3 years, and citizens have a legal right to inspect it (S2).
- The ticket proves hand-off to a designated take-back site, not processing outcomes.
- Paid-for manifests still leaked. Logistics contractors took the fee, then illegally exported the appliances (S7).
- Japan monitors the system with more than one indicator: collection rate against units shipped, rate against estimated discards, illegal dumping and scrap counts, reuse, and weight (S5).

EcoSure fit: v2 already goes further than Japan. The attestation is issued by the recycler and linked to the citizen's pickup ("sent for recycling" message with attestation number). But v2 verifies weight, not items. A shop could collect 5 phones, resell 2, pad the lot with other scrap to hold the weight, and every weight check would still pass.

### F3. Per-unit incentives were defrauded predictably; the fixes were reconciliation, separation of roles, and audit evidence

In China's trade-in (S17–S20, S24–S26):
- Trade-in vouchers were sold online ("usable at Gome, Suning, JD"). Dismantlers did not check that each voucher matched a physical unit (S19).
- Retail staff reportedly resold good-condition units to second-hand markets while the paperwork still went through (S20, **UNVERIFIED** outcome).
- The regulatory response in 2011 (S17):
  - collected units must reach the dismantler within 45 days or the freight subsidy is forfeited
  - firms could no longer hold both the collector and dismantler qualification
  - no subsidy unless the recovery voucher, the dismantling voucher, and the physical unit match one-to-one
- Fund-era controls (S24–S26):
  - quarterly self-check followed by a provincial audit that samples processing days
  - continuous CCTV on dismantling lines, footage kept ≥3 years and never edited
  - material-balance checks
  - national data-system cross-matching
  - clawback, disqualification, and public naming
- California's payment system denies 1–12% of claimed money each year for non-compliant documentation (S42).

EcoSure fit: v2 pays the citizen incentive on the shop's own weigh record at `collected`. That makes the shop both the witness and the party that benefits: it can invent pickups using friends' phones and UPI IDs. Principle 1 ("money moves fast") conflicts with incentive integrity unless the PRD adds controls. Right now v2 has weight tolerance and capacity caps, but no incentive-specific controls.

### F4. Informal integration worked when the price beat scrap value, payment was instant, and the fraction was negative-value or hazardous

- Ghana deliberately targeted the most polluting fractions (cables, then batteries and thermoplastics) and paid above material value (S27–S29). Acceptance grew once incentive levels were raised and trust built up (S27). Liquidity failures took the system offline (S27).
- Kenya's 2024 regime makes producers **publish a per-product payment rate** to waste pickers, paid at registered collection points or material recovery facilities (S34). Producer responsibility organisations must run a traceability system (S33).
- Nigeria: 48% of consumers used informal collectors *for cash*, and most did not know any collection centre existed (S30). Informal collectors asked for visibility and street security (S32). EPRON's Blackbox already covers consumer pickup requests and collector/recycler reporting (S31), so EcoSure's software scope is not novel. Execution and incentive design are what make the difference.

EcoSure fit: v2 lists informal collectors only as an open question (OQ-74 "micro-tier shops"). It also plans a flat incentive per data-bearing device and per kg (OQ-70). Positive-value items (phones, laptops) are exactly where kabadiwalas already pay well, so a flat incentive there buys little diversion. Negative-value items (CRT TVs, CFLs, batteries, refrigerant-bearing appliances) are where a subsidy changes behaviour.

### F5. Voluntary formal networks plateau; mandatory handover and "all actors" rules moved volumes

- The EU collected 40.6% in 2022 against a 65% target, down from 48.6% in 2019 (S35). All 27 member states received infringement notices in July 2024 (S36).
- UNITAR (2018 data): 55% of WEEE reported collected, ≥20% in complementary flows (scrap, illegal export, residual waste, reuse export), 25% unknown (S37).
- Countries with "all actors" reporting, clearing houses, or mandatory handover collect up to 1.4 kg per inhabitant more (S37). France attributes +2.9 kg per inhabitant to mandatory handover (S38).
- Washington state sets a **convenience standard** (service in every county and every city over 10,000 people) rather than a count of sites (S44). It collected 12.84M lb in 2024 through 200+ free sites (S45).
- South Korea runs a free producer/municipality-funded door-to-door pickup. Booking is by web, phone, or KakaoTalk; large items are collected singly and small appliances need ≥5 items per pickup; the resident must be present (S40, S41). I did not verify Korea's national collection-rate figures in this session.

EcoSure fit: v2's mandate covers recyclers and producers only; everyone else joins voluntarily. v2 has no handover lever for large, controllable sources (government offices, public-sector undertakings (PSUs), institutions, bulk consumers). The corridor launch checklist counts shops ("≥8"), not household coverage.

### F6. Switzerland's trust comes from audited mass balance downstream of the recycler, not from custody paperwork upstream

- Recyclers are audited every year and dismantlers every two years; downstream fraction processors are assessed every 3–6 years. Audits follow SN EN 50625 plus Swiss additions (S12, S13).
- Recyclers file an annual **material-flow tally** covering inputs, output fractions, and the named recipients of each fraction. Batch tests calculate the real recycling and recovery rates (S14).
- Nine cantons formally recognise these audits as delegated enforcement (S12).

EcoSure fit: v2's attestation checks are CPCB authorization, processed weight ≤ accepted weight, and period total ≤ capacity. Nothing records output fractions or where hazardous fractions end up. India's documented abuse pattern is "paper recycling", where certificates exist without real processing. Upstream custody alone cannot catch that.

---

## 3. v2 fit summary

| International mechanism | v2 status | Assessment |
|-------------------------|-----------|------------|
| Public manifest lookup (Japan) | Public attestation verification by number | **Strong**, and better than Japan because it is recycler-issued |
| Pay the discarder, instantly (China, Ghana) | UPI incentive at `collected` | **Strong in principle** |
| Funding continuity (China gap) | Scheme budget + producer pool; nothing on continuity | **Gap** |
| Voucher/unit reconciliation, role separation (China) | Weight-only reconciliation; no conflict-of-interest rule | **Gap** |
| Incentive fraud controls (China, California) | None specific | **Critical gap** |
| Differentiated incentive by value/hazard (Ghana, Kenya) | Flat per device / per kg (OQ-70) | **Gap** |
| Informal collector on-ramp (Ghana, Kenya, Nigeria) | OQ-74 only | **Partial** |
| Mandatory handover / all actors (EU) | Recyclers and producers only | **Gap** (bulk and public sources) |
| Convenience standard (Washington, Korea) | Shop count in launch checklist | **Partial** |
| Downstream mass balance and audit (Switzerland, China) | Capacity cap only | **Gap** |
| Monitoring against a denominator (Japan, EU) | "Formal network only" label; no diversion estimate | **Partial.** The honesty is right, but the pilot cannot show diversion without one |
| Record retention ≥3 years (Japan, China) | 7 years for custody records (12-nfr) | **Meets** |
| Fast payment to collectors (Ghana, China 7-day treasury) | Shops paid ≤7 days; 8-week float | **Strong** |

---

## 4. Gaps and risks

1. **Incentive farming by shops.** The collecting shop is the only witness to the event that triggers payment. Expect fake pickups, split pickups to multiply flat per-device incentives, and weight padding for per-kg items.
2. **Resale leakage of good devices.** This is the Suning pattern. Weight reconciliation hides device substitution, so the chain looks complete while phones go to the grey market with no data wipe.
3. **Funding cliff.** When pilot or scheme money pauses, formal volume falls straight away (S21). Shops and citizens go back to kabadiwalas, and trust is hard to win back.
4. **Weak diversion for positive-value items.** Flat incentives overpay where the informal price is already high and underpay where the formal chain actually needs help.
5. **Paper-recycling risk at the root of trust.** Recycler attestations are not checked against output fractions or downstream recipients.
6. **Related-party chains.** A shop, hub, and recycler under common ownership can manufacture a clean-looking custody trail.
7. **No way to show diversion.** Honest "formal only" labels are correct, but the sponsor's pilot gate needs evidence that material moved *from* informal channels, not just that formal tonnes grew.
8. **Density measured by shop count.** Eight shops clustered in two wards pass the checklist.

---

## 5. Recommended PRD changes

| # | File | Change |
|---|------|--------|
| R1 | `10-workflows.md` §1 and §3; `04-consumer.md` | **Incentive integrity controls.** (a) Cap incentives per phone number and per UPI VPA per month. (b) Block payment where the requester's phone or VPA belongs to shop staff or a related party. (c) For data-bearing devices, capture a per-device photo, plus optional IMEI or serial last-4 in a hashed form. (d) The operator makes callback checks on a random ≥5% of paid pickups. (e) If a collected item is not received at the hub within N days (default 14), or the device count does not match, claw the incentive back from the shop's next settlement. The citizen still gets paid at `collected`, but the shop underwrites the risk. |
| R2 | `10-workflows.md` §4; `03-domain-model.md` | **Count reconciliation alongside weight.** Carry a device count per category for data-bearing items from pickup to lot to hub receipt. A count mismatch opens a *leakage flag*, distinct from a weight dispute, and holds the shop's incentive reimbursement for those items. |
| R3 | `10-workflows.md` §6; `07-professional-recycler.md`; `09-government.md` | **Downstream mass balance.** An attestation must record output fractions (kg) and the recipient of each hazardous fraction (authorized treatment, storage and disposal facility (TSDF), or refiner). Add a period-level material-balance check (inputs ≈ outputs + stock ± tolerance) as a compliance flag. Plan an annual third-party audit with batch-test sampling, in the style of SN EN 50625 or CPCB guidelines, and ask whether the SPCB will recognise it (new OQ). |
| R4 | `00-overview.md` §1 (Funding) and §10 (Risks); `13-roadmap.md` stage gates | **Funding continuity rule.** A corridor may launch citizen incentives only if 12 months of incentive budget is committed, *and* a written transition to the producer-funded pool exists before the scheme money ends. Add a risk row, "Incentive funding gap (China 2011–12 precedent)", and a kill-or-pause protocol that tells citizens in advance rather than silently stopping payments. |
| R5 | `14-open-questions.md` OQ-70; `05-local-recycle-shop.md` rate card | **Differentiated, published incentive.** Pay higher incentives for negative-value or hazardous categories (CRT, CFL/lamps, batteries, refrigerant-bearing appliances, small mixed electronics). Pay low or zero incentives where the street price already exceeds the formal price (phones, laptops), and lean on data-wipe trust instead. Publish the rates per category and version, as Kenya does. |
| R6 | `00-overview.md` §1 (Mandate); `09-government.md` | **Mandatory-handover lever for controllable sources.** Recommend that the SPCB and state direct government departments, PSUs, and state-funded institutions in the corridor to dispose of e-waste through EcoSure-attested channels. Where the E-Waste Rules 2022 bulk-consumer duties apply (**UNVERIFIED** here), offer EcoSure attestation as the evidence route. This is the EU "mandatory handover" lesson applied where the state has direct control. |
| R7 | `00-overview.md` §8 (launch checklist) | **Convenience standard.** Replace or add to "≥8 shops" with a coverage rule: for example, ≥80% of target wards have a drop-off point within 2 km *or* doorstep service with ≤5-day scheduling. For doorstep collection of small items only, set a minimum per visit (for example, 3 items or 2 kg, as in Korea) to protect route economics. |
| R8 | `02-roles-rbac.md` / onboarding in `06-regional-hub.md` and `07-professional-recycler.md` | **Related-party declaration.** Every organisation declares beneficial owners at onboarding. The system flags any custody chain where shop, hub, and recycler share ownership. Default to prohibiting hub-to-recycler related parties in the pilot, following China's 2011 removal of dual collector+dismantler qualification. |
| R9 | `00-overview.md` §7 (metrics); `13-roadmap.md` pilot evaluation | **Diversion evidence for the pilot gate (not the official views).** Add a pilot-evaluation metric: the share of surveyed households that disposed through EcoSure versus informal channels, from baseline and endline household surveys in pilot wards. Report it only in the evaluation report, so official aggregates keep the "formal network only" label. |
| R10 | `14-open-questions.md` OQ-74 | **Resolve informal onboarding.** Make "informal collector (micro-tier)" a first-class path: phone-only KYC, a photo ID card for street visibility and security (Nigeria feedback), same-day UPI payment at the shop or hub, and no requirement for premises. Ghana is the precedent: pay above scrap value for targeted fractions and budget for liquidity. |

---

## 6. Score

**6 / 10** for v2's alignment with what worked internationally.

v2 gets the biggest levers right: pay the discarder instantly, pay collectors fast, anchor trust at an authorized recycler, offer public manifest-style verification, and label coverage honestly. On those points it is ahead of Japan's manifest and close to Ghana's incentive design. It loses points because every system that paid per unit or per kilogram (China, California) was defrauded, and v2 has no controls specific to incentives. It also has no plan for funding continuity, uses flat rather than value-differentiated incentives, has no downstream mass balance, and has no mandatory-handover lever. R1, R2, and R4 close most of the risk. R3 and R6 would move v2 closer to the Swiss and EU models.
