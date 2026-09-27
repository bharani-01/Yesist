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

/** Compares an arrival weight with the previous custodian's; outside tolerance the lower reading is accepted (PRD v3 §16.4 step 5). */
export function compareWeights(settings, expectedKg, measuredKg) {
  const variancePct = (Math.abs(measuredKg - expectedKg) / expectedKg) * 100;
  const tolerancePct = weightTolerancePct(settings);
  const withinTolerance = variancePct <= tolerancePct;
  return { variancePct, tolerancePct, withinTolerance, acceptedKg: withinTolerance ? measuredKg : Math.min(expectedKg, measuredKg) };
}

const ARRIVAL = {
  hub: { weightFlag: 'hub_weight_variance', where: 'at the hub', key: 'hub-' },
  recycler: { weightFlag: 'weight_variance', where: 'at the recycler', key: '' },
};

/**
 * Raises the weight, seal, and unit-count flags for a lot arriving at a hub or at the recycler.
 * `orgId` is the custodian that handed the lot over. Returns the flag types raised.
 */
export async function flagArrival(tx, settings, { stage, lot, orgId, weights, sealIntact, unitsSent, unitsReceived }) {
  const { weightFlag, where, key } = ARRIVAL[stage];
  const flags = [];
  if (!weights.withinTolerance) {
    flags.push(weightFlag);
    await raiseFlag(tx, {
      type: weightFlag, severity: weights.variancePct > weights.tolerancePct * 2 ? 'high' : 'medium', orgId, lotId: lot.id,
      summary: `Lot ${lot.sealTag}: weight ${where} differs from the previous custodian's by ${weights.variancePct.toFixed(1)}% (tolerance ${weights.tolerancePct}%)`,
      evidence: { expectedKg: weights.expectedKg, measuredKg: weights.measuredKg, acceptedKg: weights.acceptedKg, tolerancePct: weights.tolerancePct },
      dedupeKey: `${key}weight:${lot.id}`,
    });
  }
  if (!sealIntact) {
    flags.push('seal_broken');
    await raiseFlag(tx, {
      type: 'seal_broken', severity: 'high', orgId, lotId: lot.id,
      summary: `Lot ${lot.sealTag} arrived ${where} with a broken or mismatched seal`,
      evidence: { sealTag: lot.sealTag, stage }, dedupeKey: `${key}seal:${lot.id}`,
    });
  }
  const receivedPct = unitsSent > 0 ? (unitsReceived / unitsSent) * 100 : 100;
  if (receivedPct < settings.unit_leakage_min_pct) {
    flags.push('unit_count_leakage');
    await raiseFlag(tx, {
      type: 'unit_count_leakage', severity: receivedPct < 90 ? 'high' : 'medium', orgId, lotId: lot.id,
      summary: `Lot ${lot.sealTag}: ${unitsReceived} of ${unitsSent} units counted ${where} (${receivedPct.toFixed(1)}%)`,
      evidence: { sent: unitsSent, received: unitsReceived, stage }, dedupeKey: `${key}units:${lot.id}`,
    });
  }
  return flags;
}
