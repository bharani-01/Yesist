// Custody-chain primitives shared by the agent, recycler, and citizen modules.

export async function recordCustodyEvent(tx, { pickupId = null, lotId = null, type, actorId, orgId = null, detail = {} }) {
  await tx.query(
    `insert into custody_events (pickup_id, lot_id, event_type, actor_user_id, org_id, detail)
     values ($1,$2,$3,$4,$5,$6)`,
    [pickupId, lotId, type, actorId, orgId, detail],
  );
}

export async function raiseFlag(tx, { type, severity, orgId = null, lotId = null, pickupId = null, summary, evidence = {}, dedupeKey = null }) {
  await tx.query(
    'select app.raise_flag($1, $2, $3, $4, $5, $6, $7, $8)',
    [type, severity, orgId, lotId, pickupId, summary, evidence, dedupeKey],
  );
}

export async function advanceUnits(tx, pickupIds, state, lotId) {
  if (!pickupIds.length) return;
  await tx.query('select app.advance_units($1, $2, $3)', [pickupIds, state, lotId]);
}

export async function loadSchemeSettings(tx) {
  const { rows } = await tx.query('select key, value_num from scheme_settings');
  return Object.fromEntries(rows.map((r) => [r.key, Number(r.value_num)]));
}

// Monsoon (June–September) tolerance is wider because wet material gains weight (PRD v3 §16.4).
export function weightTolerancePct(settings, date = new Date()) {
  const month = date.getMonth() + 1;
  return month >= 6 && month <= 9 ? settings.weight_tolerance_monsoon_pct : settings.weight_tolerance_pct;
}
