/** Appends an audit entry inside the caller's transaction. */
export async function writeAudit(tx, { actor, action, entity, entityId = null, detail = {}, ip = null }) {
  await tx.query(
    'insert into audit_log (actor_user_id, action, entity, entity_id, detail, ip) values ($1,$2,$3,$4,$5,$6)',
    [actor?.userId ?? null, action, entity, entityId, detail, ip ?? actor?.ip ?? null],
  );
}
