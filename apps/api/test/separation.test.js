// The manufacturer registry (Track A) and the custody chain (Track B) never share people or partners.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { asAdmin, asAppUser, uniqueRef, useServer } from './helpers/harness.js';

const t = useServer();

const userId = async (email) => (await asAdmin('select id from users where email = $1', [email]))[0].id;
const orgId = async (type, name) => (await asAdmin('select id from organizations where org_type = $1 and name = $2', [type, name]))[0].id;
const newOrg = async (type, extra = {}) => (await asAdmin(
  `insert into organizations (org_type, name, registration_no, registration_valid_until)
   values ($1, $2, $3, $4) returning id`,
  [type, `${uniqueRef('Sep')} ${type}`, extra.registrationNo ?? null, extra.validUntil ?? null],
))[0].id;

async function rejects(sql, params, constraint) {
  await assert.rejects(asAdmin(sql, params), (err) => {
    assert.equal(err.code, '23514');
    assert.equal(err.constraint, constraint);
    return true;
  });
}

describe('track separation', () => {
  test('no user can belong to both a manufacturer and a custody organisation', async () => {
    const producerOrg = await newOrg('producer', { registrationNo: uniqueRef('EPR') });
    const hubOrg = await newOrg('regional_hub');
    const shopOrg = await newOrg('local_shop');
    const hubUser = await userId('hub@ecosure.test');
    const producerOwner = await userId('producer.owner@ecosure.test');
    const recyclerMaker = await userId('recycler.maker@ecosure.test');
    const add = 'insert into organization_members (org_id, user_id, org_role) values ($1, $2, $3)';

    await rejects(add, [producerOrg, hubUser, 'viewer'], 'member_track_separation');
    await rejects(add, [producerOrg, recyclerMaker, 'viewer'], 'member_track_separation');
    await rejects(add, [hubOrg, producerOwner, 'operator'], 'member_track_separation');
    await rejects(add, [shopOrg, producerOwner, 'operator'], 'member_track_separation');

    // Moving an existing membership across the line is caught too.
    const producerMembership = await orgId('producer', 'Test Electronics Maker (local only)');
    await rejects('update organization_members set org_id = $1 where org_id = $2 and user_id = $3',
      [hubOrg, producerMembership, producerOwner], 'member_track_separation');

    // Staying on one side is fine.
    await asAdmin(add, [hubOrg, hubUser, 'viewer']);
    assert.equal((await t.signIn('hub@ecosure.test').then((c) => c.get('/auth/me'))).body.user.workspace, 'hub');
    await asAdmin('delete from organization_members where org_id = $1', [hubOrg]);
  });

  test('an organisation cannot change type to cross the line', async () => {
    const hubOrg = await orgId('regional_hub', 'Test Regional Hub (local only)');
    await rejects("update organizations set org_type = 'producer', registration_no = 'X' where id = $1", [hubOrg], 'org_type_fixed');
  });

  test('only a recycler can be a principal, and only custody organisations can act for it', async () => {
    const recycler = await orgId('pro_recycler', 'Test Recycler (local only)');
    const producer = await orgId('producer', 'Test Electronics Maker (local only)');
    const hubOrg = await newOrg('regional_hub');
    const agreement = `insert into agent_agreements (principal_org_id, agent_org_id, categories, max_storage_days, valid_from, valid_until)
                       values ($1, $2, array['mobile_phone'], 30, current_date, current_date + 365)`;

    await rejects(agreement, [producer, hubOrg], 'agreement_parties');
    await rejects(agreement, [recycler, producer], 'agreement_parties');
    await rejects(agreement, [hubOrg, recycler], 'agreement_parties');
    await asAdmin(agreement, [recycler, hubOrg]);
  });

  test('the manufacturer is shut out of every custody route and row', async () => {
    const owner = await t.signIn('producer.owner@ecosure.test');
    for (const path of ['/hub/lots', '/hub/shipments', '/agent/lots', '/agent/jobs', '/recycler/lots']) {
      assert.equal((await owner.get(path)).status, 403, path);
    }
    const ownerId = await userId('producer.owner@ecosure.test');
    for (const table of ['lots', 'pickup_requests', 'hub_shipments', 'weigh_records', 'custody_events']) {
      assert.equal((await asAppUser(ownerId, `select 1 from ${table} limit 1`)).length, 0, table);
    }
  });
});
