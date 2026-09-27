"""
EcoSure v3 -- 24-month Monte Carlo simulation (Indore pilot, months counted from sanction).

Run:  python 15-montecarlo.py            (10,000 runs + tornado; writes 15-montecarlo-results.json)

Every input is drawn from an explicit distribution listed in VARS below, with its source.
All rupee and tonnage figures are ILLUSTRATIVE planning numbers, not measurements.

Model structure (per run):
  1. Schedule: Stage -1 -> 12-week manual pilot (gates wk4/8/12, one retry each) ->
     Phase 0 (parallel) -> Phase 1a (go-live + audits) -> Phase 1b (25 t gate) -> Phase 2 (50 t gate).
  2. Volume by channel, monthly: IMC custody capture, recycler/PRO direct capture,
     households (Bass adoption in covered wards + drives), informal agents (enrolment, churn,
     diversion), bulk/institutional.
  3. Additionality: which tonnes are genuinely new vs relabelled baseline flows.
  4. Survival: pilot stops, volume-gate kills, budget renewal, IMC/additionality scandal,
     hazard incident, fraud scandal, recycler dropout, kabadiwala backlash.
  5. Costs: fixed (PMU, operator, software, hosting, audits, IEC) and variable (incentives,
     messaging, logistics viability gap), cost per kg.
  6. Sensitivity: tornado (each input pinned at its P10 and P90), Spearman rank correlations.
"""
import json
import os
import sys

import numpy as np

N = 10_000
T = 24
SEED = 20260927
LAKH = 1e5

# ---------------------------------------------------------------------------
# Inverse normal CDF (Acklam), vectorised -- avoids a scipy dependency
# ---------------------------------------------------------------------------
_A = [-3.969683028665376e01, 2.209460984245205e02, -2.759285104469687e02,
      1.383577518672690e02, -3.066479806614716e01, 2.506628277459239e00]
_B = [-5.447609879822406e01, 1.615858368580409e02, -1.556989798598866e02,
      6.680131188771972e01, -1.328068155288572e01]
_C = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e00,
      -2.549732539343734e00, 4.374664141464968e00, 2.938163982698783e00]
_D = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e00,
      3.754408661907416e00]


def norm_ppf(p):
    p = np.clip(np.asarray(p, dtype=float), 1e-9, 1 - 1e-9)
    x = np.empty_like(p)
    lo, hi = p < 0.02425, p > 1 - 0.02425
    mid = ~(lo | hi)
    q = np.sqrt(-2 * np.log(p[lo]))
    x[lo] = (((((_C[0]*q+_C[1])*q+_C[2])*q+_C[3])*q+_C[4])*q+_C[5]) / ((((_D[0]*q+_D[1])*q+_D[2])*q+_D[3])*q+1)
    q = p[mid] - 0.5
    r = q * q
    x[mid] = (((((_A[0]*r+_A[1])*r+_A[2])*r+_A[3])*r+_A[4])*r+_A[5])*q / (((((_B[0]*r+_B[1])*r+_B[2])*r+_B[3])*r+_B[4])*r+1)
    q = np.sqrt(-2 * np.log(1 - p[hi]))
    x[hi] = -(((((_C[0]*q+_C[1])*q+_C[2])*q+_C[3])*q+_C[4])*q+_C[5]) / ((((_D[0]*q+_D[1])*q+_D[2])*q+_D[3])*q+1)
    return x


def q_uniform(u, a, b):
    return a + (b - a) * u


def q_tri(u, a, c, b):
    fc = (c - a) / (b - a)
    return np.where(u < fc, a + np.sqrt(u * (b - a) * (c - a)), b - np.sqrt((1 - u) * (b - a) * (b - c)))


def q_lognorm(u, median, sigma):
    return median * np.exp(sigma * norm_ppf(u))


def q_logitnorm(u, median, sigma):
    z = np.log(median / (1 - median)) + sigma * norm_ppf(u)
    return 1 / (1 + np.exp(-z))


def q_imc_flow(u):
    """IMC reported 60-75 t/month (2-2.5 t/day, TOI May 2024, unverified).
    50%: claim roughly accurate (0.75-1.05x of 67.5 t); 50%: overstated (0.25-0.75x)."""
    return 67.5 * np.where(u < 0.5, 0.25 + 0.5 * (u / 0.5), 0.75 + 0.30 * ((u - 0.5) / 0.5))


# ---------------------------------------------------------------------------
# Inputs: (key, kind, params, unit, label, source)
# kind: uni(a,b) | tri(a,c,b) | logn(median,sigma) | logit(median,sigma) | bern(p) | imc
# ---------------------------------------------------------------------------
VARS = [
    ("stage1", "logn", (5.0, 0.5), "months", "Stage -1 duration (sanction to pilot start)",
     "PRD s25.1 says 8-16 wk; v2-deep/10 procurement says 2-12 months (MPSEDC nomination faster). Median 5, P90 ~9.5"),
    ("sw_slip", "logn", (1.25, 0.2), "x", "Software schedule slip multiplier (Phases 0-2)",
     "PRD s25.1 durations; technical review 50-62 wk for P0-2 vs PRD ~40 wk implies ~1.25x"),
    ("audit_delay", "uni", (0.0, 3.0), "months", "Extra CERT-In/STQC delay before 1a exit",
     "PRD s25.5 exit needs security audit + STQC; 35-premortem: STQC CQW 5-6 months"),
    ("vendor_lag", "logn", (1.0, 0.6), "months", "Software vendor contracting lag after Stage -1",
     "PRD s25.2 separate vendor procurement; v2-deep/10: nomination 2-5 months"),
    ("imc_flow", "imc", (), "t/month", "IMC true existing e-waste flow",
     "PRD s2.2/s26.2 reportedly 60-75 t/month (TOI 2024, unverified; PRD s29.3)"),
    ("imc_ok", "bern", (0.60,), "flag", "IMC integration succeeds (MoU signed AND custody logging works)",
     "PRD s5.1/s25.2 joint order + MoU; assumed P(MoU)=0.75 x P(logging works)=0.8"),
    ("imc_cap", "uni", (0.4, 0.9), "share", "Max share of IMC flow brought under EcoSure custody",
     "Assumption: IMC's two vendors hold existing contracts (19-citizen S3); not all flow reaches pilot recycler"),
    ("imc_formal", "uni", (0.5, 0.95), "share", "Share of IMC flow already reaching authorized recyclers (baseline)",
     "Unknown; PRD s29.3 lists IMC vendor contracts as unverified"),
    ("b_other", "logn", (20.0, 0.6), "t/month", "PRO + recycler-direct Indore flow (baseline)",
     "Assumption; 19-citizen S18: one Indore recycler ~450 t/yr (~37 t/mo, not all Indore-origin)"),
    ("b_cap", "uni", (0.2, 0.7), "share", "Share of PRO/recycler-direct flow tracked on EcoSure",
     "Assumption: only participating recyclers' flows are logged (PRD s5.3)"),
    ("hh_m", "logit", (0.12, 0.5), "share", "Household market potential in covered wards (24 months)",
     "19-citizen: 60% hold e-waste (S9) x intention-action gap ~15-25% (S10)"),
    ("bass_p", "logn", (0.005, 0.5), "/month", "Household innovation (spontaneous trial) rate",
     "Calibrated so solo base ~ 19-citizen monthly first-pickup conversion 0.6-2% of aware holders"),
    ("bass_q", "logn", (0.12, 0.4), "/month", "Household imitation (word-of-mouth) rate",
     "Assumption; typical Bass q 0.1-0.4/yr-equivalents scaled; drives visibility"),
    ("kg_ho", "logn", (3.5, 0.35), "kg", "Weight per household hand-over",
     "19-citizen: 4 kg doorstep assumption; 30-budget: 3 kg; unit-econ: 2.5 kg"),
    ("cov_pilot", "uni", (60_000, 150_000), "households", "Households covered during manual pilot",
     "PRD s5.6 Indore only; covered-ward count unspecified (gap). ~750k HH citywide (19-citizen S1)"),
    ("cov_scale", "uni", (150_000, 400_000), "households", "Households covered after 1a go-live",
     "Assumption; 20-70% of IMC area"),
    ("drives_max", "uni", (6, 16), "drives/month", "Drives per month at maturity",
     "19-citizen: 6-12 drives/month recommended; PRD s10.2 C9 150 kg threshold"),
    ("drive_res", "logn", (30.0, 0.4), "residents", "Residents per drive",
     "19-citizen: 35 at Rs75 incentive"),
    ("repeat", "uni", (0.01, 0.03), "/month", "Repeat hand-overs per adopter per month",
     "19-citizen: 10-24% repeat within 12 months"),
    ("ag_max", "tri", (15, 35, 80), "agents", "Informal agents enrolled at maturity",
     "PRD s25.3 >=8 agents by wk4; 35-premortem: >3,000 waste pickers in Indore; few will sign"),
    ("ag_tau", "uni", (3.0, 8.0), "months", "Agent enrolment time constant",
     "Assumption; PRD s11.2 S1 3-day decision, provisional 500 kg/month"),
    ("ag_pre", "uni", (0.0, 10.0), "agents", "Agents pre-recruited during Stage -1",
     "PRD s25.2 recycler MoU + agent agreements in Stage -1"),
    ("ag_kg", "logn", (400.0, 0.5), "kg/month", "Gross e-waste handled per agent per month",
     "19-citizen: ~13 kg/shop/day; unit-econ: 180 kg typical lot"),
    ("gap", "uni", (0.0, 12.0), "Rs/kg", "Street price minus formal recycler price",
     "unit-econ Economy 2: street Rs32 vs formal Rs28 plus friction; gap >8 = adverse selection"),
    ("churn", "logit", (0.035, 0.4), "/month", "Agent base monthly churn",
     "Assumption; unit-econ: multi-homing when money is slow"),
    ("slow_reimb", "bern", (0.30,), "flag", "Agent reimbursement median > 7 days",
     "35-premortem Story 1: 7-day SLA structurally hard; PRD s17 escrow reduces risk"),
    ("relabel", "uni", (0.2, 0.5), "share", "Share of agent tonnes that were already formal (recyclers' own aggregators)",
     "PRD s5.3 layers over recyclers' own networks; assumption"),
    ("bulk_max", "logn", (5.0, 0.6), "t/month", "Bulk/institutional/producer take-back tonnes at maturity",
     "30-budget: ~60% of tonnage non-household; 19-citizen S16 BMC 75% non-household"),
    ("bulk_add", "uni", (0.2, 0.6), "share", "Share of bulk tonnes that are genuinely additional",
     "Assumption: Rule 8 already obliges bulk consumers to use authorized channels"),
    ("cannibal", "uni", (0.10, 0.35), "share", "Share of household tonnes cannibalised from IMC/baseline",
     "35-premortem Story 2; assumption"),
    ("g", "uni", (0.0, 0.15), "/year", "Organic growth of baseline formal flows",
     "Assumption: generation growth + IMC's own paid pickup app (19-citizen S18)"),
    ("leak", "logit", (0.08, 0.5), "share", "Fraud leakage share of incentive spend",
     "35-premortem Story 4; PRD s18 controls (handover code, caps); CAG PM-KISAN pattern"),
    ("winfl", "uni", (0.0, 0.04), "share", "Weight inflation in reported tonnes",
     "PRD s18.2 dual weighing, 5%/8% tolerance"),
    ("inc_ho", "logn", (70.0, 0.35), "Rs", "Scheme incentive per household hand-over",
     "PRD s17.3 Rs50 per data-bearing device (illustrative); OQ-70 unset; 30-budget Rs75"),
    ("imc_uplift", "uni", (0.0, 0.15), "share", "Uplift of IMC flow from EcoSure outreach",
     "Assumption; 19-citizen F2 IMC co-run effect"),
    ("p_w8", "uni", (0.4, 0.85), "prob", "Pilot week-8 operational gate first-try pass probability",
     "PRD s25.3 five conjunct conditions; assumption"),
    ("fixed_ov", "logn", (1.10, 0.15), "x", "Fixed-cost overrun multiplier",
     "30-budget +10% contingency; government IT overrun norms"),
    ("base_meas", "bern", (0.85,), "flag", "12-month baseline agreed in Stage -1",
     "PRD s24.1 / s18.3 tripwire; baseline data may not exist by channel"),
    ("payout_slow", "bern", (0.25,), "flag", "Citizen incentive median > 4 working days",
     "PRD s17.2 treasury batch 1-4 days; v2-deep/07 T+4"),
    ("backup_rec", "bern", (0.60,), "flag", "Backup recycler signed before phase 1b",
     "PRD s27.2 at least one backup recycler"),
    ("topup", "bern", (0.50,), "flag", "Incentive budget topped up 50% when exhausted",
     "Assumption; PRD s26.1 incentives ~Rs39 lakh"),
]
KEYS = [v[0] for v in VARS]
K = len(VARS)
N_EVENTS = 26


def params_from_u(U):
    P = {}
    for j, (key, kind, prm, *_rest) in enumerate(VARS):
        u = U[:, j]
        if kind == "uni":
            P[key] = q_uniform(u, *prm)
        elif kind == "tri":
            P[key] = q_tri(u, *prm)
        elif kind == "logn":
            P[key] = q_lognorm(u, *prm)
        elif kind == "logit":
            P[key] = q_logitnorm(u, *prm)
        elif kind == "bern":
            P[key] = u < prm[0]
        elif kind == "imc":
            P[key] = q_imc_flow(u)
    return P


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def tonnes_at(V, tau):
    """Tracked tonnes in the month containing time tau (V shape N x 25)."""
    idx = np.clip(np.ceil(tau).astype(int), 1, T)
    return V[np.arange(V.shape[0]), idx]


def pilot_gate(p, u1, u2, u3, ok1=True, ok2=True):
    """First try passes if ok1 & u1<p. Retry (+1.5 mo) passes if ok2 & u2<p'. Second failure:
    steering committee stops with prob 0.5 (u3<0.5), else changes course (+2 mo) and continues."""
    p_retry = p + (1 - p) * 0.4
    pass1 = ok1 & (u1 < p)
    pass2 = ~pass1 & ok2 & (u2 < p_retry)
    fail2 = ~pass1 & ~pass2
    stop = fail2 & (u3 < 0.5)
    delay = np.where(pass1, 0.0, np.where(pass2, 1.5, 3.5))
    return pass1 | pass2, stop, delay


# ---------------------------------------------------------------------------
# Schedule
# ---------------------------------------------------------------------------
def schedule(P, E, V=None, NV=None):
    n = len(P["stage1"])
    Ts = P["stage1"]
    killt = np.full(n, np.inf)
    cause = np.zeros(n, int)

    lapse = Ts > 12.0
    killt[lapse] = 12.0
    cause[lapse] = 1

    D = np.zeros(n)
    # Week 4: >=8 agents, IMC logging, first sealed lots (recycler MoU)
    agents_m1 = P["ag_pre"] + (P["ag_max"] - P["ag_pre"]) * (1 - np.exp(-1 / P["ag_tau"]))
    p4 = np.where(agents_m1 >= 8, 0.95, 0.5) * np.where(P["imc_ok"], 1.0, 0.5) * np.where(E[:, 24] < 0.92, 1.0, 0.3)
    ok4, stop4, d4 = pilot_gate(p4, E[:, 0], E[:, 1], E[:, 2])
    t_stop = Ts + 1 + 1.5
    m = stop4 & (t_stop < killt)
    killt[m], cause[m] = t_stop[m], 2
    D += d4

    # Week 8: operational conjuncts
    p8 = P["p_w8"] * np.where(P["slow_reimb"], 0.6, 1.0)
    ok8, stop8, d8 = pilot_gate(p8, E[:, 3], E[:, 4], E[:, 5])
    t_stop = Ts + 2 + D + 1.5
    m = stop8 & (t_stop < killt)
    killt[m], cause[m] = t_stop[m], 2
    D += d8

    # Week 12: >=8 t/month (volume), producer LOIs (0.9), MPPCB confirms usefulness (0.85)
    t12a = Ts + 3 + D
    t12b = t12a + 1.5
    if V is None:
        v1 = v2 = np.ones(n, bool)
        s1 = s2 = np.ones(n, bool)
    else:
        v1, v2 = tonnes_at(V, t12a) >= 8, tonnes_at(V, t12b) >= 8
        s1, s2 = tonnes_at(NV, t12a) >= 8, tonnes_at(NV, t12b) >= 8
    ok12, stop12, d12 = pilot_gate(np.full(n, 0.9 * 0.85), E[:, 6], E[:, 7], E[:, 8], v1, v2)
    pass12_1 = v1 & (E[:, 6] < 0.765)
    strict8 = np.where(pass12_1, s1, s2) & ok12
    t_stop = t12b
    m = stop12 & (t_stop < killt)
    killt[m], cause[m] = t_stop[m], 2
    D += d12
    pilot_end = Ts + 3 + D
    gate8_time = np.where(pass12_1, t12a, t12b)

    p0_start = Ts + P["vendor_lag"]
    p0_end = p0_start + 2.25 * P["sw_slip"]
    golive = np.maximum(pilot_end, p0_end) + 3.25 * P["sw_slip"] + P["audit_delay"]

    def volume_gate(t_exit, thr, ukill, cause_code):
        reached = t_exit <= T
        if V is None:
            a = b = np.ones(n, bool)
            sa = sb = np.ones(n, bool)
        else:
            a, b = tonnes_at(V, t_exit) >= thr, tonnes_at(V, t_exit + 2) >= thr
            sa, sb = tonnes_at(NV, t_exit) >= thr, tonnes_at(NV, t_exit + 2) >= thr
        p1 = a
        p2 = ~a & b & (t_exit + 2 <= T)
        passed = reached & (p1 | p2)
        strict = reached & np.where(p1, sa, sb) & passed
        gtime = np.where(p1, t_exit, t_exit + 2)
        failed = reached & ~(p1 | p2) & (t_exit + 2 <= T)
        kill_now = failed & (ukill < 0.6)
        tk = t_exit + 2
        mm = kill_now & (tk < killt)
        killt[mm], cause[mm] = tk[mm], cause_code
        new_exit = np.where(p1, t_exit, t_exit + 2)
        return passed, strict, gtime, new_exit

    exit1b = golive + 2.75 * P["sw_slip"]
    pass25, strict25, g25_time, exit1b = volume_gate(exit1b, 25.0, E[:, 9], 3)
    exit2 = exit1b + 2.75 * P["sw_slip"]
    pass50, strict50, g50_time, exit2 = volume_gate(exit2, 50.0, E[:, 10], 4)

    return dict(Ts=Ts, ops=Ts, pilot_end=pilot_end, p0_start=p0_start, golive=golive,
                exit1b=exit1b, exit2=exit2, killt=killt, cause=cause,
                pass8=ok12 & (gate8_time <= T), strict8=strict8 & (gate8_time <= T), g8_time=gate8_time,
                pass25=pass25, strict25=strict25, g25_time=g25_time,
                pass50=pass50, strict50=strict50, g50_time=g50_time)


# ---------------------------------------------------------------------------
# Volume model
# ---------------------------------------------------------------------------
def volume(P, E, S, killt):
    n = len(P["stage1"])
    ops, gl = S["ops"], S["golive"]
    V = np.zeros((n, T + 1))      # tracked tonnes (as reported, incl. weight inflation)
    NV = np.zeros((n, T + 1))     # new-channel tonnes (households + agents + bulk)
    ADD = np.zeros((n, T + 1))    # genuinely additional tonnes
    CH = {k: np.zeros((n, T + 1)) for k in ("imc", "other", "hh", "agents", "bulk")}
    HO = np.zeros((n, T + 1))     # household hand-overs incl. drive residents
    INC = np.zeros((n, T + 1))    # scheme incentive spend (Rs), incl. fraud leakage
    AG = np.zeros((n, T + 1))     # active agents

    A = np.zeros(n)
    Ud = np.zeros(n)
    agents = np.zeros(n)
    E_prev = np.zeros(n)
    cum_inc = np.zeros(n)
    cap = np.where(P["topup"], 58.5 * LAKH, 39.0 * LAKH)

    mcc_on = E[:, 22] < 0.7                       # municipal election MCC inside window
    mcc_start = 6 + 5 * E[:, 23]                  # IMC last elected Jul 2022 -> due ~mid-2027

    drop_t = ops + (-np.log(np.clip(E[:, 18], 1e-12, 1))) / 0.008
    drop_len = np.where(P["backup_rec"], 3.0, 5.0)
    drop_fac = np.where(P["backup_rec"], 0.5, 0.3)

    S_imc = np.where(P["imc_ok"], P["imc_cap"], 0.15 * P["imc_cap"])
    aw = np.where(P["imc_ok"], 1.8, 1.0)
    pay = np.where(P["payout_slow"], 0.85, 1.0)
    # 19-citizen: Rs30 -> Rs75 lifts monthly conversion 0.9% -> 1.4%, elasticity ~0.48
    inc_el = (P["inc_ho"] / 70.0) ** 0.48
    div = np.clip(0.12 + 0.03 * P["gap"], 0.05, 0.8)
    churn = np.clip(P["churn"] + 0.03 * P["slow_reimb"] + 0.02 * np.maximum(P["gap"] - 6, 0) / 6, 0, 0.5)

    for t in range(1, T + 1):
        tm = t - 0.5
        alive = (tm >= ops) & (tm < killt)
        af = alive.astype(float)
        since = np.maximum(tm - ops, 0)
        live = tm >= gl
        ramp_sw = np.where(live, 1 - np.exp(-(tm - gl) / 3.0), 0.0)
        cap_frac = 0.35 + 0.65 * ramp_sw
        growth = 1 + P["g"] * tm / 12
        dis = np.where((tm >= drop_t) & (tm < drop_t + drop_len), drop_fac, 1.0)

        imc_t = af * P["imc_flow"] * growth * S_imc * cap_frac
        imc_up = af * P["imc_flow"] * P["imc_uplift"] * P["imc_ok"] * np.minimum(1, since / 12)
        oth_t = af * P["b_other"] * growth * P["b_cap"] * (0.3 + 0.7 * ramp_sw) * dis

        C = af * np.where(live, P["cov_pilot"] + (P["cov_scale"] - P["cov_pilot"]) * np.minimum(1, (tm - gl) / 3),
                          P["cov_pilot"])
        mcc_block = mcc_on & (tm >= mcc_start) & (tm < mcc_start + 2) & (ops > mcc_start - 1)
        inc_on = (cum_inc < cap) & ~mcc_block
        m_inc = np.where(inc_on, inc_el, 0.6)
        mC = P["hh_m"] * C
        pot = np.maximum(mC - A, 0)
        hz = P["bass_p"] * aw * m_inc * pay + P["bass_q"] * np.where(mC > 0, A / np.maximum(mC, 1), 0)
        new = np.minimum(hz * pot, pot) * af
        rep = P["repeat"] * A * af
        A = A + new
        drives = np.where(alive, np.maximum(2, P["drives_max"] * np.minimum(1, since / 9)), 0)
        res = drives * P["drive_res"] * np.sqrt(m_inc) * pay
        Ud += 0.5 * res
        hh_t = ((new + rep) * P["kg_ho"] + res * 3.0) / 1000 * dis
        inc = (new + rep + res) * P["inc_ho"] * inc_on / (1 - P["leak"]) * af
        cum_inc += inc

        Et = np.where(alive, P["ag_pre"] + (P["ag_max"] - P["ag_pre"]) * (1 - np.exp(-since / P["ag_tau"])), 0)
        lost = agents * churn
        agents = (agents - lost + np.maximum(Et - E_prev, 0) + 0.5 * lost) * af
        E_prev = Et
        ag_t = agents * P["ag_kg"] * (1 - div) / 1000 * dis
        bulk_t = af * P["bulk_max"] * (1 - np.exp(-since / 6.0)) * dis

        new_ch = hh_t + ag_t + bulk_t
        tracked = imc_t + imc_up + oth_t + new_ch
        add = imc_t * (1 - P["imc_formal"]) + imc_up + hh_t * (1 - P["cannibal"]) + \
            ag_t * (1 - P["relabel"]) + bulk_t * P["bulk_add"]

        V[:, t] = tracked * (1 + P["winfl"])
        NV[:, t] = new_ch
        ADD[:, t] = add
        CH["imc"][:, t] = imc_t + imc_up
        CH["other"][:, t] = oth_t
        CH["hh"][:, t] = hh_t
        CH["agents"][:, t] = ag_t
        CH["bulk"][:, t] = bulk_t
        HO[:, t] = (new + rep + res) * af
        INC[:, t] = inc
        AG[:, t] = agents

    covered24 = np.where(24 - 0.5 >= gl, P["cov_scale"], P["cov_pilot"])
    part24 = np.minimum(A + Ud, covered24) / covered24
    return dict(V=V, NV=NV, ADD=ADD, CH=CH, HO=HO, INC=INC, AG=AG, part24=part24,
                drop_t=drop_t)


# ---------------------------------------------------------------------------
# Survival events (programme-ending)
# ---------------------------------------------------------------------------
def events(P, E, S, vol):
    n = len(P["stage1"])
    killt = S["killt"].copy()
    cause = S["cause"].copy()
    V, ADD = vol["V"], vol["ADD"]
    ops = S["ops"]
    B = P["imc_flow"] * P["imc_formal"] + P["b_other"]

    def apply(mask, tk, code):
        mm = mask & (tk < killt) & (tk < T) & (tk >= ops)
        killt[mm] = tk[mm]
        cause[mm] = code

    # State budget renewal decision (Feb-Mar 2028 ~ month 15.5 if sanction ~Nov 2026)
    v15 = V[:, 15]
    ratio15 = (v15 - B) / B
    fixed_month = 11.25 * LAKH * P["fixed_ov"]
    rec_kg15 = np.where(v15 > 0, fixed_month / np.maximum(v15 * 1000, 1), np.inf)
    # Finance sees tracked tonnes and cost per kg (the literal KPI ratio is ambiguous, so not used here)
    p_nr = np.where(v15 < 25, 0.20, 0.06) + np.where(rec_kg15 > 150, 0.08, 0.0)
    apply(E[:, 11] < p_nr, np.full(n, 15.5), 5)

    # IMC channel conflict / additionality scandal (pre-mortem story 2)
    cumT = V[:, 1:16].sum(1)
    add_share = np.where(cumT > 0, ADD[:, 1:16].sum(1) / np.maximum(cumT, 1e-9), 0)
    p_imc = np.where(~P["imc_ok"], 0.12, np.where(add_share < 0.3, 0.10, 0.04))
    apply(E[:, 12] < p_imc, 12 + 12 * E[:, 13], 6)

    # Hazard incident (battery fire / mixed-regime lot), fatal half the time (story 3)
    cum24 = V[:, 1:].sum(1)
    p_haz = 0.08 * np.sqrt(np.minimum(1, cum24 / 600)) * 0.5
    apply(E[:, 14] < p_haz, np.maximum(ops, 6) + (T - np.maximum(ops, 6)) * E[:, 15], 7)

    # Fraud scandal (story 4)
    p_fr = 0.02 + 0.6 * np.maximum(0, P["leak"] - 0.05)
    apply(E[:, 16] < p_fr, 12 + 12 * E[:, 17], 8)

    # Recycler dropout without backup
    apply((~P["backup_rec"]) & (E[:, 19] < 0.4), vol["drop_t"], 9)

    # Kabadiwala backlash
    apply(E[:, 20] < 0.03, ops + 3 + np.maximum(T - ops - 3, 0) * E[:, 21], 10)

    return killt, cause


# ---------------------------------------------------------------------------
# Costs
# ---------------------------------------------------------------------------
def costs(P, S, killt, vol):
    n = len(P["stage1"])
    ov = P["fixed_ov"]
    ops, pe, p0, gl, e1b, e2 = S["ops"], S["pilot_end"], S["p0_start"], S["golive"], S["exit1b"], S["exit2"]
    total = np.zeros(n)
    fixed_tot = np.zeros(n)
    rec24 = np.zeros(n)
    build_rate = 140 * LAKH * ov / np.maximum(e2 - p0, 1)
    for t in range(1, T + 1):
        tm = t - 0.5
        prog = tm < killt
        running = prog & (tm >= ops)
        f = np.zeros(n)
        f += np.where(prog, 4.5 * LAKH * ov, 0)                                  # PMU
        f += np.where(t == 1, 10 * LAKH, 0)                                      # setup, DPR, legal
        f += np.where(running & (tm < pe), 5 * LAKH, 0)                          # manual pilot ops
        f += np.where(running & (tm >= pe), 4 * LAKH * ov, 0)                    # field operator
        f += np.where(running, 1.25 * LAKH, 0)                                   # IEC / outreach
        f += np.where(prog & (tm >= p0), 1.5 * LAKH * ov, 0)                     # hosting
        f += np.where(prog & (tm >= p0) & (tm < e2), build_rate, 0)              # software build
        f += np.where(prog & (tm >= e2), 4.4 * LAKH * ov, 0)                     # software O&M
        f += np.where(prog & (np.abs(tm - gl) < 0.5), 20 * LAKH, 0)              # audits at go-live
        f += np.where(prog & (np.abs(tm - e1b) < 0.5), 10 * LAKH, 0)
        f += np.where(prog & (t == T), 10 * LAKH, 0)                             # evaluation
        f += np.where(running & (np.abs(tm - ops) < 0.5), 5 * LAKH, 0)           # agent goodwill
        nv = vol["NV"][:, t]
        gap_t = np.interp(nv, [0, 8, 25, 50, 100], [6000, 6000, 3000, 1000, 1000])
        var = vol["INC"][:, t] + vol["HO"][:, t] * 15 + nv * gap_t
        spend = (f + var) * 1.10                                                  # 10% contingency
        total += spend
        fixed_tot += f * 1.10
        if t == T:
            one_off = (np.where(prog & (tm >= p0) & (tm < e2), build_rate, 0) + np.where(prog, 10 * LAKH, 0))
            rec24 = (f - one_off + var) * 1.10
    return total, fixed_tot, rec24


# ---------------------------------------------------------------------------
# Full simulation
# ---------------------------------------------------------------------------
def simulate(U, E):
    P = params_from_u(U)
    S = schedule(P, E)
    vol = volume(P, E, S, S["killt"])
    for _ in range(3):
        S = schedule(P, E, vol["V"], vol["NV"])
        vol = volume(P, E, S, S["killt"])
    killt, cause = events(P, E, S, vol)
    vol = volume(P, E, S, killt)
    total, fixed_tot, rec24 = costs(P, S, killt, vol)

    V, NV, ADD = vol["V"], vol["NV"], vol["ADD"]
    B = P["imc_flow"] * P["imc_formal"] + P["b_other"]
    alive24 = killt >= T
    w = slice(13, 25)
    lit_ratio = (V[:, w].sum(1) - 12 * B) / (12 * B)
    tot_ratio = (ADD[:, w].sum(1) + ((B * P["g"])[:, None] * (np.arange(13, 25) - 0.5)[None, :] / 12).sum(1)
                 + (P["winfl"][:, None] * V[:, w]).sum(1)) / (12 * B)
    true_ratio = ADD[:, w].sum(1) / (12 * B)
    kpi_lit = alive24 & P["base_meas"] & (lit_ratio >= 0.30)
    kpi_tot = alive24 & P["base_meas"] & (tot_ratio >= 0.30)
    kpi_true = alive24 & (true_ratio >= 0.30)

    g8 = S["pass8"] & (S["g8_time"] < killt)
    g25 = S["pass25"] & (S["g25_time"] < killt)
    g50 = S["pass50"] & (S["g50_time"] < killt)
    s8 = S["strict8"] & (S["g8_time"] < killt)
    s25 = S["strict25"] & (S["g25_time"] < killt)
    s50 = S["strict50"] & (S["g50_time"] < killt)

    success_prd = alive24 & g25 & kpi_lit
    success_true = alive24 & (NV[:, 24] >= 25) & kpi_true

    cum_t = V[:, 1:].sum(1)
    cum_add = ADD[:, 1:].sum(1)
    inc_total = vol["INC"][:, 1:].sum(1)
    out = dict(
        P=P, S=S, vol=vol, killt=killt, cause=cause, alive24=alive24, B=B,
        lit_ratio=lit_ratio, tot_ratio=tot_ratio, true_ratio=true_ratio,
        kpi_lit=kpi_lit, kpi_tot=kpi_tot, kpi_true=kpi_true,
        g8=g8, g25=g25, g50=g50, s8=s8, s25=s25, s50=s50,
        success_prd=success_prd, success_true=success_true,
        total=total, fixed_tot=fixed_tot, rec24=rec24,
        cum_t=cum_t, cum_add=cum_add, inc_total=inc_total,
        leak_rs=inc_total * P["leak"],
    )
    return out


def pct(x, qs=(10, 50, 90)):
    x = np.asarray(x, float)
    x = x[np.isfinite(x)]
    if x.size == 0:
        return [None] * len(qs)
    return [float(np.percentile(x, q)) for q in qs]


def main():
    rng = np.random.default_rng(SEED)
    U = rng.random((N, K))
    E = rng.random((N, N_EVENTS))
    R = simulate(U, E)
    P, S, vol = R["P"], R["S"], R["vol"]
    V, NV, ADD, CH = vol["V"], vol["NV"], vol["ADD"], vol["CH"]
    alive = R["alive24"]

    res = {"N": N, "seed": SEED}
    res["schedule"] = {
        "stage1_months": pct(S["Ts"]),
        "pilot_end_month": pct(S["pilot_end"]),
        "golive_1a_month": pct(S["golive"]),
        "exit_1b_month": pct(S["exit1b"]),
        "exit_2_month": pct(S["exit2"]),
        "P_golive_by_24": float(np.mean(S["golive"] <= 24)),
        "P_exit1b_by_24": float(np.mean(S["exit1b"] <= 24)),
        "P_exit2_by_24": float(np.mean(S["exit2"] <= 24)),
        "P_phase2_within_prd_66wk": float(np.mean(S["exit2"] <= 66 / 4.345)),
    }
    res["volume"] = {
        "tracked_t_m12": pct(V[:, 12]), "tracked_t_m18": pct(V[:, 18]), "tracked_t_m24": pct(V[:, 24]),
        "tracked_t_m24_alive": pct(V[alive, 24]),
        "newchannel_t_m24_alive": pct(NV[alive, 24]),
        "additional_t_m24_alive": pct(ADD[alive, 24]),
        "baseline_t_per_month": pct(R["B"]),
        "cum_tracked_24m": pct(R["cum_t"]), "cum_additional_24m": pct(R["cum_add"]),
        "channels_m24_alive": {k: pct(CH[k][alive, 24]) for k in CH},
        "agents_active_m24_alive": pct(vol["AG"][alive, 24]),
        "household_participation_m24_alive": pct(vol["part24"][alive]),
        "P_participation_ge5pct": float(np.mean(alive & (vol["part24"] >= 0.05))),
        "additional_share_of_tracked_cum": pct(np.where(R["cum_t"] > 0, R["cum_add"] / np.maximum(R["cum_t"], 1e-9), np.nan)),
        "informal_diversion_share": pct(np.clip(0.12 + 0.03 * P["gap"], 0.05, 0.8)),
    }
    res["gates"] = {
        "P_gate8_pilot_exit": float(R["g8"].mean()), "P_gate25_1b_exit": float(R["g25"].mean()),
        "P_gate50_2_exit": float(R["g50"].mean()),
        "P_gate8_strict_newchannel": float(R["s8"].mean()), "P_gate25_strict_newchannel": float(R["s25"].mean()),
        "P_gate50_strict_newchannel": float(R["s50"].mean()),
        "P_m24_tracked_ge8": float(np.mean(V[:, 24] >= 8)), "P_m24_tracked_ge25": float(np.mean(V[:, 24] >= 25)),
        "P_m24_tracked_ge50": float(np.mean(V[:, 24] >= 50)),
        "P_m24_new_ge8": float(np.mean(NV[:, 24] >= 8)), "P_m24_new_ge25": float(np.mean(NV[:, 24] >= 25)),
        "P_m24_new_ge50": float(np.mean(NV[:, 24] >= 50)),
    }
    res["kpi"] = {
        "P_kpi_prd_literal": float(R["kpi_lit"].mean()),
        "P_kpi_total_formal_static_baseline": float(R["kpi_tot"].mean()),
        "P_kpi_true_additionality": float(R["kpi_true"].mean()),
        "ratio_literal_alive": pct(R["lit_ratio"][alive]),
        "ratio_total_alive": pct(R["tot_ratio"][alive]),
        "ratio_true_alive": pct(R["true_ratio"][alive]),
        "P_success_prd_view": float(R["success_prd"].mean()),
        "P_success_genuine": float(R["success_true"].mean()),
    }
    causes = {1: "Stage -1 lapse (>12 months)", 2: "Pilot gate stop", 3: "25 t gate kill", 4: "50 t gate kill",
              5: "Budget not renewed", 6: "IMC conflict / additionality scandal", 7: "Hazard incident",
              8: "Fraud scandal", 9: "Recycler dropout, no backup", 10: "Kabadiwala backlash"}
    res["survival"] = {
        "P_survive_24": float(alive.mean()),
        "kill_causes": {causes[c]: float(np.mean(R["cause"][~alive] == c) * np.mean(~alive)) for c in causes},
    }
    kg_t = R["cum_t"] * 1000
    kg_a = R["cum_add"] * 1000
    res["money"] = {
        "total_spend_cr": pct(R["total"] / 1e7),
        "total_spend_cr_alive": pct(R["total"][alive] / 1e7),
        "P_spend_over_6_2cr": float(np.mean(R["total"] > 6.2e7)),
        "fixed_share_alive": pct(R["fixed_tot"][alive] / R["total"][alive]),
        "incentive_spend_lakh": pct(R["inc_total"] / LAKH),
        "fraud_leakage_lakh": pct(R["leak_rs"] / LAKH),
        "cost_per_tracked_kg_24m_alive": pct(np.where(kg_t > 0, R["total"] / np.maximum(kg_t, 1), np.nan)[alive]),
        "cost_per_additional_kg_24m_alive": pct(np.where(kg_a > 0, R["total"] / np.maximum(kg_a, 1), np.nan)[alive]),
        "recurring_rs_per_tracked_kg_m24_alive": pct(np.where(V[:, 24] > 0, R["rec24"] / np.maximum(V[:, 24] * 1000, 1), np.nan)[alive]),
        "recurring_rs_per_additional_kg_m24_alive": pct(np.where(ADD[:, 24] > 0, R["rec24"] / np.maximum(ADD[:, 24] * 1000, 1), np.nan)[alive]),
    }

    # --- conditional "what must be true" ---
    cond = {}
    succ = R["success_true"]
    for key in KEYS:
        col = U[:, KEYS.index(key)]
        lo, hi = col < 1 / 3, col > 2 / 3
        cond[key] = {"P_success_low_tercile": float(succ[lo].mean()), "P_success_high_tercile": float(succ[hi].mean())}
    res["conditional_genuine_success"] = cond
    combo = P["imc_ok"] & (P["imc_formal"] < 0.75) & (P["hh_m"] > 0.12)
    res["combos"] = {
        "P_success_genuine_given_imc_ok": float(succ[P["imc_ok"]].mean()),
        "P_success_genuine_given_imc_fail": float(succ[~P["imc_ok"]].mean()),
        "P_success_genuine_given_imc_ok_informal_share_gt25_hh_m_gt12": float(succ[combo].mean()),
        "P_kpi_lit_given_imc_ok": float(R["kpi_lit"][P["imc_ok"]].mean()),
        "P_kpi_lit_given_imc_fail": float(R["kpi_lit"][~P["imc_ok"]].mean()),
        "P_survive_given_stage1_le_4": float(alive[S["Ts"] <= 4].mean()),
        "P_survive_given_stage1_gt_8": float(alive[S["Ts"] > 8].mean()),
    }

    # --- Spearman rank correlation with month-24 additional tonnes ---
    def ranks(x):
        r = np.empty(len(x))
        r[np.argsort(x, kind="mergesort")] = np.arange(len(x))
        return r
    ra = ranks(ADD[:, 24] + 1e-9 * np.arange(N))
    spear = {}
    for j, key in enumerate(KEYS):
        rc = ranks(U[:, j])
        spear[key] = float(np.corrcoef(rc, ra)[0, 1])
    res["spearman_additional_m24"] = dict(sorted(spear.items(), key=lambda kv: -abs(kv[1])))

    # --- Tornado: pin each input at P10 and P90 (common random numbers) ---
    tornado = []
    base_true, base_lit, base_surv = float(succ.mean()), float(R["kpi_lit"].mean()), float(alive.mean())
    base_add = float(np.median(ADD[:, 24]))
    for j, (key, kind, prm, unit, label, src) in enumerate(VARS):
        row = {"key": key, "label": label, "unit": unit}
        for tag, qv in (("p10", 0.10), ("p90", 0.90)):
            Up = U.copy()
            Up[:, j] = qv
            Rp = simulate(Up, E)
            val = params_from_u(Up[:1])[key][0]
            row[tag] = {
                "input_value": (bool(val) if kind == "bern" else float(val)),
                "P_success_genuine": float(Rp["success_true"].mean()),
                "P_kpi_literal": float(Rp["kpi_lit"].mean()),
                "P_kpi_true": float(Rp["kpi_true"].mean()),
                "P_survive": float(Rp["alive24"].mean()),
                "P_gate25": float(Rp["g25"].mean()),
                "median_additional_t_m24": float(np.median(Rp["vol"]["ADD"][:, 24])),
            }
        row["swing_success"] = abs(row["p90"]["P_success_genuine"] - row["p10"]["P_success_genuine"])
        row["swing_kpi_true"] = abs(row["p90"]["P_kpi_true"] - row["p10"]["P_kpi_true"])
        row["swing_survive"] = abs(row["p90"]["P_survive"] - row["p10"]["P_survive"])
        row["swing_add_t"] = abs(row["p90"]["median_additional_t_m24"] - row["p10"]["median_additional_t_m24"])
        tornado.append(row)
        print(f"  tornado {j+1}/{K} {key}", file=sys.stderr)
    tornado.sort(key=lambda r: -(r["swing_success"] + r["swing_kpi_true"]))
    res["tornado_base"] = {"P_success_genuine": base_true, "P_kpi_literal": base_lit, "P_survive": base_surv,
                           "median_additional_t_m24": base_add}
    res["tornado"] = tornado
    res["assumptions"] = [{"key": k, "dist": kind, "params": list(prm), "unit": unit, "label": label, "source": src}
                          for (k, kind, prm, unit, label, src) in VARS]

    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "15-montecarlo-results.json"), "w", encoding="utf-8") as fh:
        json.dump(res, fh, indent=1)

    # --- console summary ---
    def show(d, ind=""):
        for k, v in d.items():
            if isinstance(v, dict):
                print(f"{ind}{k}:")
                show(v, ind + "  ")
            elif isinstance(v, list):
                print(f"{ind}{k}: " + ", ".join("None" if x is None else f"{x:,.3f}" for x in v))
            else:
                print(f"{ind}{k}: {v:,.4f}" if isinstance(v, float) else f"{ind}{k}: {v}")
    for sec in ("schedule", "volume", "gates", "kpi", "survival", "money", "combos"):
        print(f"\n== {sec} ==")
        show(res[sec])
    print("\n== spearman (top 10) ==")
    for k, v in list(res["spearman_additional_m24"].items())[:10]:
        print(f"  {k}: {v:+.3f}")
    print("\n== tornado (top 12 by swing in genuine success + true KPI) ==")
    print(f"  base: success={base_true:.3f} kpi_lit={base_lit:.3f} survive={base_surv:.3f} addT={base_add:.1f}")
    for r in tornado[:12]:
        a, b = r["p10"], r["p90"]
        print(f"  {r['key']:<12} P10={a['input_value']!s:>10.8} succ={a['P_success_genuine']:.3f} kpiT={a['P_kpi_true']:.3f} "
              f"surv={a['P_survive']:.3f} | P90={b['input_value']!s:>10.8} succ={b['P_success_genuine']:.3f} "
              f"kpiT={b['P_kpi_true']:.3f} surv={b['P_survive']:.3f}")


if __name__ == "__main__":
    main()
