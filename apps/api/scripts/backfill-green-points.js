import crypto from 'node:crypto';
import pg from 'pg';

const adminUrl = process.env.DATABASE_ADMIN_URL;
if (!adminUrl) {
  console.error('DATABASE_ADMIN_URL is required to run backfill.');
  process.exit(1);
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // unambiguous chars
  let res = 'ECO-';
  for (let i = 0; i < 5; i++) {
    res += chars[crypto.randomInt(chars.length)];
  }
  return res;
}

async function runBackfill() {
  const client = new pg.Client({ connectionString: adminUrl });
  await client.connect();

  try {
    console.log('--- Starting Green Points Backfill ---');

    // 1. Profile Complete bonus for existing citizens
    const citizens = await client.query(`
      select id, full_name, phone from users
      where platform_role = 'citizen' and full_name is not null and phone is not null
    `);
    console.log(`Found ${citizens.rows.length} citizens with completed profile`);

    let profileCount = 0;
    for (const u of citizens.rows) {
      const exists = await client.query(`
        select 1 from green_point_ledger
        where user_id = $1 and event_type = 'profile_complete'
      `, [u.id]);
      if (exists.rowCount === 0) {
        await client.query(`
          select app.credit_green_points($1, 20, 'profile_complete', null, null, null, 'Welcome to EcoSure! Profile complete bonus')
        `, [u.id]);
        profileCount++;
      }
    }
    console.log(`Credited profile_complete bonus to ${profileCount} citizens`);

    // 2. Manual devices already added
    const devices = await client.query(`
      select id, user_id, brand, model from manual_devices
    `);
    let deviceCount = 0;
    for (const d of devices.rows) {
      const exists = await client.query(`
        select 1 from green_point_ledger
        where user_id = $1 and event_type = 'device_added' and ref_device_id = $2
      `, [d.user_id, d.id]);
      if (exists.rowCount === 0) {
        await client.query(`
          select app.credit_green_points($1, 5, 'device_added', null, $2, null, $3)
        `, [d.user_id, d.id, `Registered device: ${d.brand || ''} ${d.model || ''}`.trim()]);
        deviceCount++;
      }
    }
    console.log(`Credited device_added bonus for ${deviceCount} devices`);

    // 3. Collected pickups
    const pickups = await client.query(`
      select id, requester_id, status from pickup_requests
      where status in ('collected', 'in_lot', 'received', 'closed')
    `);
    let pickupBaseCount = 0;
    let pickupDeviceCount = 0;
    let pickupDataBearingCount = 0;

    for (const p of pickups.rows) {
      // Base pickup bonus
      const baseExists = await client.query(`
        select 1 from green_point_ledger
        where user_id = $1 and event_type = 'pickup_collected' and ref_pickup_id = $2
      `, [p.requester_id, p.id]);
      if (baseExists.rowCount === 0) {
        await client.query(`
          select app.credit_green_points($1, 50, 'pickup_collected', $2, null, null, 'Doorstep pickup completed')
        `, [p.requester_id, p.id]);
        pickupBaseCount++;
      }

      // Items collected
      const itemsRes = await client.query(`
        select pi.collected_quantity, wc.data_bearing
        from pickup_items pi
        join waste_categories wc on wc.code = pi.category_code
        where pi.pickup_id = $1
      `, [p.id]);

      let totalCollected = 0;
      let totalDataBearing = 0;
      for (const item of itemsRes.rows) {
        const qty = item.collected_quantity || 0;
        totalCollected += qty;
        if (item.data_bearing) {
          totalDataBearing += qty;
        }
      }

      if (totalCollected > 0) {
        const devExists = await client.query(`
          select 1 from green_point_ledger
          where user_id = $1 and event_type = 'device_collected' and ref_pickup_id = $2
        `, [p.requester_id, p.id]);
        if (devExists.rowCount === 0) {
          await client.query(`
            select app.credit_green_points($1, $2, 'device_collected', $3, null, null, $4)
          `, [p.requester_id, totalCollected * 10, p.id, `Collected ${totalCollected} e-waste device(s)`]);
          pickupDeviceCount++;
        }
      }

      if (totalDataBearing > 0) {
        const dbExists = await client.query(`
          select 1 from green_point_ledger
          where user_id = $1 and event_type = 'data_bearing_bonus' and ref_pickup_id = $2
        `, [p.requester_id, p.id]);
        if (dbExists.rowCount === 0) {
          await client.query(`
            select app.credit_green_points($1, $2, 'data_bearing_bonus', $3, null, null, $4)
          `, [p.requester_id, totalDataBearing * 25, p.id, `Safe data destruction bonus (${totalDataBearing} device(s))`]);
          pickupDataBearingCount++;
        }
      }
    }
    console.log(`Credited pickups: ${pickupBaseCount} base, ${pickupDeviceCount} item bonuses, ${pickupDataBearingCount} data-bearing bonuses`);

    // 4. Issued attestations
    const attestations = await client.query(`
      select distinct a.id as attestation_id, a.lot_id, pr.requester_id, pr.id as pickup_id
      from attestations a
      join pickup_requests pr on pr.lot_id = a.lot_id
      where a.status = 'issued'
    `);
    let attestationCount = 0;
    for (const a of attestations.rows) {
      const exists = await client.query(`
        select 1 from green_point_ledger
        where user_id = $1 and event_type = 'attestation_issued' and ref_pickup_id = $2
      `, [a.requester_id, a.pickup_id]);
      if (exists.rowCount === 0) {
        await client.query(`
          select app.credit_green_points($1, 30, 'attestation_issued', $2, null, null, 'Recycling certificate issued for your pickup')
        `, [a.requester_id, a.pickup_id]);
        attestationCount++;
      }
    }
    console.log(`Credited ${attestationCount} attestation bonuses`);

    // 5. Ensure each citizen has a referral code
    let refCodesCreated = 0;
    for (const u of citizens.rows) {
      const hasRef = await client.query('select 1 from referral_links where referrer_id = $1', [u.id]);
      if (hasRef.rowCount === 0) {
        let code = generateCode();
        let inserted = false;
        while (!inserted) {
          try {
            await client.query(`
              insert into referral_links (referrer_id, code) values ($1, $2)
            `, [u.id, code]);
            inserted = true;
            refCodesCreated++;
          } catch (err) {
            if (err.code === '23505') {
              code = generateCode();
            } else {
              throw err;
            }
          }
        }
      }
    }
    console.log(`Generated ${refCodesCreated} referral codes for existing citizens`);

    // Summary of balances
    const balances = await client.query(`
      select u.email, coalesce(l.balance_after, 0) as balance
      from users u
      left join lateral (
        select balance_after from green_point_ledger
        where user_id = u.id order by id desc limit 1
      ) l on true
      where u.platform_role = 'citizen'
      order by balance desc
    `);
    console.log('\nCitizen Green Point Balances:');
    console.table(balances.rows);

    console.log('--- Backfill Completed Successfully ---');
  } catch (err) {
    console.error('Backfill failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runBackfill();
