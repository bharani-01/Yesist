# 34 — Seasonal Stress Test: 12 Months of Indore Operations

**Agent:** 34 of 36 (v2 deep research swarm)
**Date:** 2026-09-27
**PRD files reviewed:** `06-regional-hub.md`, `10-workflows.md`, `13-roadmap.md`, `00-overview.md` (grep), `01-stakeholders-and-personas.md` (grep), `14-open-questions.md` (grep); prior swarm reports `v2-deep/12-madhya-pradesh.md` and `v2-deep/13-batteries-hazardous.md`
**Angle:** Walk the Indore corridor through a full year (Oct 2026 – Sep 2027): the Diwali surge, monsoon moisture and weight disputes, summer heat and lithium fire risk, power cuts, exam seasons, and elections (the Model Code of Conduct). Identify what breaks and what v2 must add.
**Convention:** Anything not backed by a primary or clearly dated source is marked **UNVERIFIED**. Volume multipliers are design assumptions, not measured data.

---

## 1. Sources

### Weather and climate
| # | Source | Used for |
|---|--------|----------|
| W1 | IMD, new normal monsoon onset/withdrawal dates (press release) — https://mausam.imd.gov.in/backend/assets/press_release_pdf/IMD_Press_release_new_onset_and_withdrawal_dates(Final).pdf | New normals put MP onset 3–7 days later than the old normals; withdrawal from central India later than before |
| W2 | IMD CRS research report on revised normals — https://internal.imd.gov.in/press_release/20200515_pr_804.pdf | Search synthesis gave Indore normal onset ≈ 20 June and withdrawal ≈ 3 October (**UNVERIFIED** at station level; I did not read the station table directly) |
| W3 | IMD glossary (seasons) — https://www.imdpune.gov.in/Reports/glossary.pdf | Official seasons: pre-monsoon Mar–May, SW monsoon Jun–Sep, post-monsoon Oct–Dec |
| W4 | IMD all-India monsoon normals — https://mausam.imd.gov.in/responsive/ismr_departure.php | July and August are the wettest months nationally (280 mm and 255 mm normal) |
| W5 | Indore monthly history — https://www.weatherandclimate.eu/history/42754_3 | Indore rain concentrated in Jun–Sep (aggregator, **UNVERIFIED** figures) |
| W6 | TOI, Indore 44.3 °C seasonal high, hottest May day in a decade (May 2026) — https://timesofindia.indiatimes.com/city/indore/hot-winds-searing-afternoons-keep-indore-under-grip-of-extreme-heat/articleshow/131210183.cms | Summer peak temperatures |
| W7 | TOI, 43.6 °C, record May history (46 °C on 31 May 1994) — https://timesofindia.indiatimes.com/city/indore/43-6-d-c-hottest-day-of-the-year-rising/articleshow/131048678.cms | Heat already above 35 °C by 8:30 am |
| W8 | TOI, warmest night 30.2 °C (May 2026) — https://timesofindia.indiatimes.com/city/indore/no-respite-at-30-2-d-celsius-indore-records-warmest-night-of-season/articleshow/131076170.cms | Nights no longer cool a godown |
| W9 | IMD special press release, 18 May 2026 — https://mausam.imd.gov.in/Forecast/marquee_data/special%20Press%20Release%2018-05-2026.pdf | Heatwave in west MP, 18–24 May 2026 |
| W10 | TOI, pre-monsoon rain from 31 May (2026) — https://timesofindia.indiatimes.com/city/indore/rain-relief-likely-from-weekend-as-intense-summer-heat-grips-indore/articleshow/131377261.cms | Pre-monsoon storms late May / early June |
| W11 | TOI, roads turn to streams (Jul 2026) — https://timesofindia.indiatimes.com/city/indore/intense-rain-transforms-roads-into-streams-brings-traffc-to-standstill/articleshow/132170145.cms | Humidity 98%; waterlogging near airport |
| W12 | TOI, 58 mm in 2 hours (Sep 2026) — https://timesofindia.indiatimes.com/city/indore/58mm-of-rainfall-in-2-hours-catches-indoreans-off-guard/articleshow/133892119.cms | Waterlogging on AB Road, Vijay Nagar, LIG, Rasoma Square; humidity 96% |
| W13 | Free Press Journal, knee-deep water MR-10 (Jun 2026) — https://www.freepressjournal.in/indore/groom-rides-horse-through-knee-deep-water-as-wedding-procession-moves-through-flooded-road-in-indore-video | Flooded arterial roads |
| W14 | NDTV, school holiday due to waterlogging — https://www.ndtv.com/video/heavy-rains-cause-waterlogging-traffic-chaos-school-holiday-declared-829351 | Collector-declared closures (date **UNVERIFIED**) |

### Power
| # | Source | Used for |
|---|--------|----------|
| P1 | TOI, scheduled 2-hour daily shutdowns, ~10 unscheduled shutdowns and ~50 trippings a day (2026) — https://timesofindia.indiatimes.com/city/indore/surge-in-power-demand-triggers-shutdowns-outages-in-indore/articleshow/130982593.cms | Summer outage pattern |
| P2 | TOI, record 707 MW demand — https://timesofindia.indiatimes.com/city/indore/power-demand-crosses-record-700-mw-in-a-day/articleshow/131102293.cms | Grid stress in heat |
| P3 | TOI, 4–6 trippings a day in Sanwer Road, Palda, Pithampur industrial belts — https://timesofindia.indiatimes.com/city/indore/summer-power-tripping-disrupt-industrial-operations-msmes-seek-infra-upgrade/articleshow/131126700.cms | Exactly where hubs/recyclers sit (Sanwer Road, Palda) |
| P4 | FPJ, early-morning maintenance windows, feeder WhatsApp alerts (Apr 2026) — https://www.freepressjournal.in/indore/indore-power-staff-battle-extreme-heat-to-maintain-uninterrupted-electricity-supply | Outage notice channel |
| P5 | FPJ, West Discom MD orders tripping reduction (Apr 2026) — https://www.freepressjournal.in/indore/west-discom-md-orders-urgent-steps-to-reduce-power-tripping-in-indore | Restoration target 2–2.5 h |

### Fire / battery
| # | Source | Used for |
|---|--------|----------|
| F1 | Swarm report 13 (CPCB battery guideline: Li-ion stored ≤ 35 °C, 90-day limit, segregation) — `docs/research/v2-deep/13-batteries-hazardous.md` | Temperature and storage norms |
| F2 | Telangana Today, summer rise in scrap-godown fires (Mar 2026) — https://telanganatoday.com/series-of-fire-accidents-reported-across-hyderabad-as-summer-heat-rises | Seasonal pattern (Hyderabad, not Indore) |
| F3 | The Hindu, Bholakpur scrap-yard fire, tin shed (May 2026) — https://www.thehindu.com/news/cities/Hyderabad/massive-fire-at-scrap-yard-in-hyderabads-bholakpur-triggers-firefighting-late-night-evacuation/article70937145.ece | Tin-roof scrap storage in residential areas |
| F4 | The Hindu, Meerpet scrap-godown fire (Jul 2026) — https://www.thehindu.com/news/cities/Hyderabad/six-rescued-as-fire-guts-scrap-godown-spreads-to-residential-building-in-meerpet/article71224313.ece | Electrical cause near pole work |
| F5 | Recycling Today, Li-ion fire risk in waste streams — https://www.recyclingtoday.com/news/lithium-ion-battery-risks-mitigation-across-the-waste-recycling-stream/ | Heat causes swelling/instability; compression in trucks |

### Festivals, exams, elections
| # | Source | Used for |
|---|--------|----------|
| C1 | Samvat, Diwali 2026 — https://samvat.in/festivals/diwali-2026/ | Dhanteras 6 Nov, Diwali 8 Nov, Bhai Dooj 10/11 Nov 2026 |
| C2 | Moneycontrol, festival list 2026 — https://www.moneycontrol.com/religion/festivals-in-2026-in-india-complete-list-of-festival-dates-and-times-as-per-2026-panchang-article-13753677.html | Diwali week dates |
| C3 | Airalo, Diwali 2027 = 29 Oct 2027 — https://www.airalo.com/blog/when-is-diwali | Second Diwali inside the roadmap |
| C4 | Desi.net Indore panchang — https://desi.net/indore/calendar | Navratri 11 Oct, Dussehra 20 Oct 2026 (Indore) |
| C5 | Prokerala panchang 2027 — https://www.prokerala.com/astrology/panchang/2027.html | Holi 23 Mar, Rang Panchami 27 Mar, Ganesh 4 Sep, Navratri 30 Sep, Dussehra 9 Oct, Diwali 29 Oct 2027 |
| C6 | Hindutone festival calendar 2026–27 — https://hindutone.com/festivals/hindu-festival-calendar-2026-2027/ | Cross-check (Holi ≈ 22 Mar 2027; one-day variance vs C5) |
| C7 | Panasonic #DiwaliWaliSafai (CSRBox) — https://www.csrbox.org/India_CSR_news_Panasonic%E2%80%99s-Initiative-DiwaliWaliSafai-Turns-Five,-Encourages-People-Towards-Responsible-E-waste_2638 | Brands run Diwali e-waste campaigns: the festive clean-out is a recognised trigger |
| C8 | Samsung Care for Clean India — https://www.samsung.com/in/microsite/care-for-clean-india/ ; Aptronix exchange — https://www.aptronixindia.com/pages/limitless-aptronix-exchange | Competing free pickup / exchange offers for the same devices |
| C9 | India Today, MPBSE 2027 timetable — https://www.indiatoday.in/education-today/news/story/madhya-pradesh-class-10-12-board-exam-timetable-2027-released-subject-wise-dates-mpbse-nic-in-2970904-2026-08-14 | Class 12: 17 Feb – 19 Mar 2027; Class 10: 24 Feb – 18 Mar 2027 |
| E1 | ECI, Model Code of Conduct — https://www.eci.gov.in/mcc/ | No announcement of financial grants, no discretionary payments once elections are announced |
| E2 | CEO Delhi, MCC Compendium Vol. III — https://ceodelhi.gov.in/WriteReadData/Compendium/compendiumV3.pdf | "Processing of beneficiary oriented schemes, even if ongoing, should be stopped"; completed utilities may be commissioned by civil authority without fanfare |
| E3 | MCC FAQ (s3waas copy) — https://cdnbbsr.s3waas.gov.in/s3cbf8710b43df3f2c1553e649403426df/uploads/2025/02/20250213668231254.pdf | No fresh beneficiaries; no fresh release of welfare funds |
| E4 | Puducherry DPAR circular on ECI letter of 2 May 2024 — https://dpar.py.gov.in/SS1/Circulars/ID.Note_13.05.24.pdf | ECI barred registering individuals for beneficiary schemes via surveys/digital forms during MCC |
| E5 | TOI, IMC wards 58 & 60 bypolls: poll 29 Sep 2026, count 3 Oct 2026 — https://timesofindia.indiatimes.com/city/indore/bypolls-in-imc-wards-58-60-on-sept-29/articleshow/133662271.cms | MCC is live in parts of Indore right now |
| E6 | Dainik Bhaskar, urban body polls proposed June 2027, panchayat July 2027 — https://www.bhaskar.com/local/mp/bhopal/news/panchayat-and-urban-body-elections-2027-dbp-138653363.html | 413 ULBs incl. Indore |
| E7 | Lalluram, 16 municipal corporations in July 2027 — https://lalluram.com/urban-body-elections-2027-elections-for-16-municipal-corporations-scheduled-for-july/ | Alternative month |
| E8 | Swadesh News / Mediasaheb, polls may slip ~6 months (delimitation after census) — https://www.swadeshnews.in/pradesh/civic-body-elections-in-madhya-pradesh-could-be-postponed-by-six-months/247243 ; https://mediasaheb.com/likely-delay-in-mp-civic-body-elections-ward-delimitation-stalled-polls-could-be-pushed-back-by-six-months/ | Window uncertain: Jun–Jul 2027 or ≈ Dec 2027 – Jan 2028 (**UNVERIFIED**) |
| E9 | Varanasi Live, Indore BJP in election mode for next year's IMC poll (24 Sep 2026) — https://www.varanasilive.com/news/detail/indore-bjp-in-indore-shifts-to-election-mode-municipal-elections-are-due-next-year-2026-09-24/737120 | Political season already started |
| E10 | Wikipedia, IMC (last election 6 Jul 2022; next 2027) — https://en.wikipedia.org/wiki/Indore_Municipal_Corporation | Term cycle |

Not searched, from general knowledge, **UNVERIFIED**: MP Vidhan Sabha election due ≈ Nov–Dec 2028; Lok Sabha ≈ Apr–May 2029; Ujjain Simhastha ≈ Mar–May 2028 (heavy traffic and policing load 55 km from Indore); Census 2027 enumeration phase ≈ Feb 2027 (government staff diverted); wedding-season demand for tempos and labour (Nov–Feb, Apr–Jun).

---

## 2. Calendar assumption used for the stress test

The roadmap gives durations, not dates. Assuming the pilot starts in the first week of October 2026 and every gate passes first time:

| Stage | Duration (13-roadmap) | Calendar window if started Oct 2026 | What the season does to it |
|-------|----------------------|--------------------------------------|----------------------------|
| Pilot | 12 weeks | ~5 Oct 2026 – ~27 Dec 2026 | Week 4 gate lands in Navratri–Dussehra; week 5–6 is Diwali. The week-8 and week-12 "steady tonnes" gates measure a festival spike and then the post-Diwali slump. |
| Phase 0 | 6–8 weeks | Jan – Feb 2027 | Board exams begin 17 Feb; Census enumeration (**UNVERIFIED**). Quiet but fine. |
| Phase 1 | 12–16 weeks | Mar – late Jun 2027 | **Go-live lands in peak heat (Apr–May), peak power cuts, monsoon onset (~20 Jun) and the proposed urban-body election MCC (Jun–Jul 2027).** |
| Phase 2 (incl. H9 surge mode) | 10–12 weeks | Jul – Sep/Oct 2027 | Surge mode ships at best weeks before Diwali 29 Oct 2027 — **after** the software has already run one Diwali (2026, pilot) and one monsoon without it. |

Conclusion: the two worst operating windows (Diwali and the monsoon) are both hit **before** H9 surge mode exists, and Phase 1 go-live is scheduled into the single worst month of the year.

---

## 3. Month-by-month risk (Oct 2026 – Sep 2027)

Severity: **H** high, **M** medium, **L** low. "PRD coverage" says whether v2 handles it today.

| Month | Events (sources) | Operational risk | Sev | PRD coverage |
|-------|------------------|------------------|-----|--------------|
| **Oct 2026** | Monsoon withdrawal ~3 Oct (W2, **UNVERIFIED**); bypoll count 3 Oct (E5); Navratri 11–19, Dussehra 20 Oct (C4); pre-Diwali cleaning starts | Damp monsoon stock still at hub; "monsoon mode" end date is undefined, so tolerance flips from 8% to 5% on a date nobody set. Pre-Diwali advance requests spike (shops pay staff bonuses). Navratri garba and Dussehra processions close roads in the evening. | M | Partial: monsoon tolerance exists; switch-over rule missing |
| **Nov 2026** | Dhanteras 6, Diwali 8, Govardhan 9/10, Bhai Dooj 10/11 Nov (C1, C2); brand Diwali take-back campaigns (C7, C8) | **Surge**: household clear-outs plus new-purchase replacement (assume 2–3× normal pickup requests for 2–3 weeks, **UNVERIFIED**). At the same time: collectors and loaders go home for the festival, shops are busy with their own retail peak, bank holidays break the "paid within 7 days" rule, recyclers may close for 3–5 days so dwell clocks run with no outlet, and **firecrackers are burst in dense scrap markets next to battery-laden stock**. Competing brand exchange offers take the high-value items. | **H** | No: surge mode is phase 2; SLA calendar ignores holidays; no fire-season rule |
| **Dec 2026** | Post-Diwali slump; wedding season (**UNVERIFIED**); pilot week 12 gate | Pilot gate "steady weekly tonnes" compares a spike to a slump and may fail or pass for the wrong reason. Tempo rentals scarce/costly in wedding season. | M | No seasonal baseline in gate metrics |
| **Jan 2027** | Makar Sankranti 14 Jan (C5, C6); cold mornings | Low risk. Good window for SPCB audits and hub safety audits. | L | — |
| **Feb 2027** | MPBSE Class 12 from 17 Feb, Class 10 from 24 Feb (C9); Census enumeration (**UNVERIFIED**) | Society drives and school/college collection drives (which IMC targets, per report 12) lose turnout; residents object to loudspeaker announcements near exam households; teachers and ward staff on exam/census duty. | M | No: society drive has no blackout calendar |
| **Mar 2027** | Exams to 19 Mar (C9); Holi 22/23 Mar, Rang Panchami Gair 27 Mar (C5, C6) — large road closures in central Indore; heat begins; financial year-end | Rang Panchami closes the old-city market routes (Rajwada area) used by trips to Siyaganj-area shops (**UNVERIFIED** route overlap). Producers and recyclers rush year-end EPR paperwork, so attestations spike and recycler grading queues lengthen. Summer replacement of coolers/fans/ACs starts (**UNVERIFIED** second surge). | M | No |
| **Apr 2027** | Heat 40–43 °C (P4, W7); scheduled early-morning shutdowns, trippings (P1, P5) | Li-ion stock in tin-roof godowns exceeds the CPCB 35 °C storage guidance (F1) for most of the day. Power cuts stop ventilation fans, CCTV, and mains-powered smoke detectors; charging of scales and phones fails. Afternoon pickups expose collectors to heat stress. | **H** | Partial: offline sync covers data only |
| **May 2027** | Peak heat 44 °C+ days, 30 °C nights (W6, W8); IMD heatwave alerts (W9); record grid load, 50 trippings/day (P1, P2); industrial belts 4–6 trips/day (P3) | **Highest fire-risk month.** Warm nights mean stock never cools. Swollen batteries more likely. Heat plus power cuts plus summer-surge stock (coolers, fans) = the most dangerous hub state of the year. Weight also drops slightly as items dry, favouring the hub in disputes (minor). | **H** | No heat or fire controls in 06 or 10 |
| **Jun 2027** | Pre-monsoon storms from late May (W10); monsoon onset ~20 Jun (W2); **proposed urban-body polls June 2027 (E6)**; Phase 1 go-live | Storm-driven outages and flash floods. **If MCC is in force, launching a government citizen-incentive scheme or expanding it to new wards may be treated as a new beneficiary scheme** (E1–E3); ward registration drives resemble the survey-registration ECI banned in 2024 (E4). IMC (proposed co-sponsor in report 12) officials unavailable; no launch events with political functionaries. | **H** | No MCC rule anywhere |
| **Jul 2027** | Wettest month (W4); humidity 96–98% (W11, W12); **16 municipal corporation polls possibly July (E7)**; panchayat polls July (E6) | **Moisture weight disputes peak**: cardboard, jute and cloth bags absorb water; coolers, washing machines and ACs arrive with water in them; photos taken in rain are unreadable. Flat 8% tolerance is either too loose (wet material at shop, dried at hub → shop loses) or too tight (dry at shop, rained on during transit). Flooded roads (W13) cancel trips; `failed_visit` reasons do not include weather. | **H** | Partial: 8% tolerance, monsoon dwell; no moisture evidence |
| **Aug 2027** | Heavy rain continues; Raksha Bandhan, Janmashtami (C6) | Hub dampness (mould on boards, corrosion); dwell limits need to be **shorter**, not longer, in monsoon to avoid stock degradation — the PRD does not say which direction. Battery 90-day clock and e-waste 180-day ceiling (report 13) still apply regardless of season. | M | Ambiguous |
| **Sep 2027** | Ganesh Chaturthi 4 Sep, visarjan 14 Sep (C5); heavy late-season spells (W12); election window may shift here if polls slip (E8) | Visarjan road closures; late monsoon cloudbursts; phase 2 in progress; surge-mode code not yet proven before Diwali 29 Oct 2027 (C3). | M | Surge mode arrives too late |

Recurring every month in summer and monsoon: **power cuts** (P1–P5). The PRD's only answer is offline data sync (00-overview risk table). That protects records, not people or stock.

---

## 4. Findings

### F1. Seasonality is hard-coded as a single "monsoon mode" boolean; nothing else seasonal is modelled
`06` H4/H5 and `10` §4 use "monsoon months" with 8% tolerance and monsoon dwell limits, and `03` stores `monsoon_max_dwell_days` and `monsoon_tolerance_pct` on the offtake agreement. There is no definition of when monsoon starts or ends, who declares it, or how a lot weighed on 30 September but received on 4 October is judged. Heat, festivals, exams, elections, bank holidays and road closures have no representation at all. A corridor-level operating calendar with dated windows and policy overrides would cover every case below with one mechanism.

### F2. Diwali breaks phase 1, not phase 2 — and the pilot runs straight through Diwali 2026
Surge mode (`06` H9) is phase 2, but the pilot (Oct–Dec 2026) and the first live year both hit Diwali first. The failure is not only volume. In the same fortnight labour leaves, shops are busy with retail, bank holidays break the 7-day payment promise (`10` §7), recyclers close so dwell clocks run with no outlet, advance demand spikes (float risk), brands run competing exchange campaigns (C7, C8), and firecrackers go off near battery stock. The 72-hour dispute window and 5-working-day resolution (`10` §4) also need a holiday calendar. The pilot's week-8 and week-12 gates will measure a festival spike and then a slump, so they cannot show "steady weekly tonnes" without a seasonal baseline.

### F3. The monsoon tolerance is a blunt number; disputes will be about water, not scales
Flat 8% does not tell apart packaging absorption, water inside appliances (coolers, washing machines, ACs), or wet-then-dried material. The "undisputed = lower reading" rule (`10` §4 step 5) always favours the payer, so shops in the wet season will systematically lose on water that evaporates in transit. Evidence needs to change: bag tare, a wet/dry condition flag at both weighs, draining appliances before weighing, weighing under cover, and a maximum gap between sender and receiver weighs. Monsoon dwell should be **shorter** (to avoid mould and corrosion) and capped by the statutory 180-day e-waste and 90-day battery limits (report 13); the PRD does not say which way the monsoon value should move.

### F4. Summer (Apr–Jun) is the fire season, and power cuts disable the safeguards
Indore reached 44.3 °C with 30.2 °C nights in May 2026 (W6, W8), against CPCB's 35 °C Li-ion storage guidance (F1). Tin-roof godowns run hotter than ambient. Summer 2026 also brought 2-hour scheduled shutdowns, about 10 unscheduled shutdowns and 50 trippings a day in the city (P1), and 4–6 trips a day in the Sanwer Road and Palda industrial belts where recyclers and hubs sit (P3). Fans, CCTV and mains-only smoke detectors stop when the power does. The PRD has monsoon readiness in H1 but no heat readiness, no temperature logging, no heat-triggered battery caps or faster outbound, no battery-backed detection requirement, and no heat-safe collector windows. Diwali (fireworks) is a second fire window.

### F5. Elections: the Model Code of Conduct can freeze the citizen incentive at go-live, and the PRD does not know MCC exists
ECI's MCC bars announcing financial grants and discretionary payments once elections are announced (E1), and its compendium says processing of beneficiary-oriented schemes, "even if ongoing", should stop (E2, E3). In 2024 ECI also barred registering individuals for beneficiary schemes through surveys and digital forms (E4). A government-sponsored programme that pays citizens by UPI and signs up households ward by ward looks exactly like this. Whether MP's State Election Commission applies the same rules to urban body polls is **UNVERIFIED**, but the risk is concrete: MCC is live right now in IMC wards 58 and 60 (E5), and the general urban-body polls are proposed for June–July 2027 (E6, E7), exactly when phase 1 would go live. They may slip by about 6 months (E8). IMC, the proposed co-sponsor (report 12), is itself the body being elected. Producer-funded incentives (phase 2) are arguably not public funds, which is another **UNVERIFIED** point that needs a legal opinion.

### F6. Exams and big civic events block society drives and routes
MPBSE board exams run 17 Feb – 19 Mar 2027 (C9). Society drives, loudspeaker announcements and school/college drives (IMC's target channel, report 12) perform badly then. Rang Panchami Gair (27 Mar 2027), Ganesh visarjan, Navratri and Muharram close central roads; Ujjain Simhastha 2028 (**UNVERIFIED** dates) will strain traffic and policing across the region. The trip planner (`06` H3) has no route blackout or event calendar.

### F7. The roadmap's timing is the biggest single seasonal risk
Using the roadmap durations from an October 2026 start, phase 1 goes live in June 2027: peak heat and outages, monsoon onset, and the proposed election MCC together. The pilot runs through Diwali without surge tooling, and surge mode reaches production only weeks before the second Diwali. The roadmap needs launch windows, not just durations.

---

## 5. What breaks (summary)

| Scenario | What fails first | PRD rule that breaks |
|----------|------------------|----------------------|
| Diwali week | Labour and recycler closures; payments late; dwell flags fire en masse; float runs dry | `10` §7 "paid within 7 days"; `06` H5 dwell flags; `10` §7 advance cap from a 4-week average inflated by the surge |
| Monsoon peak | Weight disputes above the 15% pilot gate; trips cancelled; mould | `10` §4 tolerance and "lower reading" rule; `13` week-8 gate "disputes ≤ 15%" |
| May heat plus outage | Battery swelling or fire at hub; detectors dark | No rule exists |
| MCC during go-live | Citizen incentive paused or challenged; launch event cancelled; ward expansion frozen | `10` §3 step 9 incentive; `13` phase 1 exit |
| Exam season | Society drives under-deliver; drive schedule complaints | `10` §3 step 2 society drive |

---

## 6. Recommended PRD changes

| File | Change |
|------|--------|
| `03-domain-model.md` | **Add `OperatingCalendarWindow`** (per corridor, append-only history): `type` (`monsoon`, `heat`, `festival_surge`, `exam`, `election_mcc`, `bank_holiday`, `road_closure`, `custom`), `starts_on`, `ends_on`, `declared_by`, `source_ref` (e.g. IMD bulletin, SEC notification), `policy_overrides` (JSON of allowed keys only: tolerance %, dwell days, battery cap kg, pickup hours, incentive status, broadcast status, SLA day-count mode). Replace `monsoon_max_dwell_days` / `monsoon_tolerance_pct` with per-window overrides on the offtake agreement, each validated against the statutory ceilings (≤ 180 days e-waste, ≤ 90 days battery). **Rule:** a transfer is judged by the window active at the **sender weigh time**, and this is recorded on the transfer. |
| `03-domain-model.md` | Add to `WeighRecord`: `condition` (`dry`, `damp`, `wet`), `container_tare_kg`, `drained` (bool, for water-holding appliances), `covered_weighing` (bool). Add a `failed_visit` reason `weather_or_road_closure` that never counts against the requester. |
| `06-regional-hub.md` | **H1**: add a **heat-readiness check** next to monsoon readiness (roof insulation or shade, ventilation, a thermometer or logger in the battery bay, battery-backed smoke/heat detection, extinguisher type, no charging on site) and a **power-resilience check** (UPS or inverter for detectors, CCTV, scale and router). |
| `06-regional-hub.md` | **H4**: moisture evidence at both weighs (condition, tare, drained, covered); maximum 48 h between sender and receiver weigh in monsoon windows or the tolerance falls back to the normal value; appliances with water are drained before weighing. |
| `06-regional-hub.md` | **H5**: monsoon dwell must be **≤ normal dwell** (faster outbound, to prevent mould and corrosion); heat window adds a lower Li-ion on-site cap and a "battery bay above 35 °C" compliance flag from logged readings. |
| `06-regional-hub.md` | **Move a minimum H9 "festival readiness" to phase 1**: a pre-booked recycler slot before the festival week, a declared recycler closure window that pauses dwell clocks, an advance cap computed on a non-festival baseline, extra labour slots, a festival fire rule (no open storage, no stock near cracker-selling stalls), and a customer message that sets expectations on delayed pickups. Keep full surge mode (overflow sites, extended hours) in phase 2. |
| `10-workflows.md` | §4 and §7: SLAs (72 h dispute window, 5 working-day resolution, 7-day payment) count **working days on the corridor calendar** (bank holidays and declared festival closures excluded) and show the due date explicitly. Replace the monsoon clause with "tolerance per the active operating calendar window". |
| `10-workflows.md` | §3: add a **society-drive blackout** during declared exam windows (no loudspeaker announcements; drives only on request); pickup windows in heat windows default to 7–11 am and 5–8 pm. |
| `10-workflows.md` | New §11 **Election period (MCC)**: while an `election_mcc` window is active for a ward or corridor: no new wards, no incentive rate increases, no new incentive schemes or promotions, no WhatsApp broadcast campaigns from government-branded senders, no launch events with political functionaries, no ward sign-up drives. Ongoing pickups and payments for material already collected continue **only if** the sponsor has a written clarification from the State Election Commission or the District Election Officer; otherwise the incentive is accrued and paid after results. Every such decision is logged in the audit log. |
| `00-overview.md` | §8 corridor launch checklist: add **"No election MCC active or announced for the corridor within the launch window + 6 weeks; SEC/DEO clarification on file for the citizen incentive"** and **"Go-live not inside Diwali −2/+1 weeks or the monsoon peak (Jul–Aug)"**. §10 risks: add "MCC freezes incentive/launch", "Summer battery fire during power outage", "Festival surge with labour and recycler closure". |
| `13-roadmap.md` | Give every stage a **launch window**, not only a duration. Recommended: pilot either Jan–Mar 2027 (avoids Diwali; exam-season caveat for drives) **or** keep Oct 2026 but make Diwali an explicit stress test with a surge-readiness checklist and seasonally adjusted gates. Phase 1 go-live must avoid June–July 2027 (heat, monsoon onset, proposed MCC) and mid-Oct to mid-Nov 2027 (Diwali 29 Oct); target **Aug–Sep 2027 only if MCC is clear**, otherwise **Jan 2028**. Pilot gates use a seasonal baseline ("tonnes within ±25% of the season-adjusted forecast") instead of "steady weekly tonnes". |
| `12-nfr-security.md` | Operator console must render calendar windows and their policy overrides; every override is audit-logged with the source reference; overrides can only move within statutory limits. |
| `14-open-questions.md` | Add: (a) Does the MP SEC MCC for urban body polls cover a state-sponsored citizen incentive, and is a producer-funded incentive exempt? (b) Who declares monsoon start/end for the corridor (IMD onset/withdrawal for Indore vs operator)? (c) Should monsoon dwell be shorter than normal? (d) Festival closure calendar for the partner recycler. (e) Heat threshold for battery caps (35 °C per CPCB guidance, measured where?). (f) Final date of 2027 urban body polls (June, July or delayed). |
| `01-stakeholders-and-personas.md` | Hub persona blockers already mention power cuts and 5% monsoon tolerance; add "Diwali labour shortage and recycler closure" and "godown heat". |

---

## 7. Score

**4 / 10** for seasonal resilience of PRD v2.

What v2 gets right: it already knows the monsoon exists (storage readiness, a wider tolerance, separate dwell), it plans offline collection for poor connectivity and power, and it names festival surge mode as a feature. The data model (offtake terms, compliance flags, append-only events) can absorb a calendar mechanism cheaply.

What drags the score down: seasonality is a single undefined boolean; heat and fire season are absent; surge mode arrives after the software has lived through a Diwali; SLAs ignore holidays; moisture disputes are handled with a number rather than evidence; and the roadmap puts phase 1 go-live into the peak-heat, monsoon-onset, election-MCC window without mentioning the Model Code of Conduct at all. For a government programme paying citizens, MCC blindness is the most embarrassing gap and the cheapest to fix.

---

## 8. Verification notes

- Indore station-level monsoon onset (~20 Jun) and withdrawal (~3 Oct) came from search synthesis of IMD documents, not from reading the station table: **UNVERIFIED**.
- Festival dates for 2027 vary by one day between panchang sources (e.g. Holi 22 vs 23 Mar): use the local Indore panchang when setting windows.
- Urban body election month (June vs July 2027, or a delay of ~6 months) is from news reports, with no SEC notification yet: **UNVERIFIED**.
- ECI MCC rules are written for Lok Sabha and Vidhan Sabha polls; the SEC's code for local body polls is similar in spirit, but its exact text was not read: **UNVERIFIED**.
- Diwali surge multiplier (2–3×), summer cooler/AC replacement surge, wedding-season vehicle scarcity, Census 2027 staff diversion, Simhastha 2028 dates, and 2028/2029 election timing: all **UNVERIFIED** design assumptions.
- Fire incidents cited (F2–F4) are from Hyderabad, not Indore; they show a seasonal pattern, not an Indore statistic.
