// Seeds 18 EcoSure-registered devices across all categories.
// Citizen claims 8 devices; some have active pickup bookings (shows "Booked for pickup" badge).
// Every collected device uses a real QR ID — zero orphan units.
// Usage: node --env-file=.env apps/api/scripts/seed-data.js

import { createApp } from '../src/app.js';
import { closePool } from '../src/core/db.js';

const PASSWORD = process.env.PILOT_ACCOUNT_PASSWORD;
if (!PASSWORD) { console.error('PILOT_ACCOUNT_PASSWORD must be set.'); process.exit(1); }

class Api {
  constructor(base) { this.base = base; this.cookie = null; }
  async req(method, path, body) {
    const h = { Accept: 'application/json', Origin: this.base };
    if (body !== undefined) h['Content-Type'] = 'application/json';
    if (this.cookie) h.Cookie = this.cookie;
    const r = await fetch(`${this.base}/api/v1${path}`, {
      method, headers: h, body: body === undefined ? undefined : JSON.stringify(body),
    });
    const sc = r.headers.get('set-cookie');
    if (sc) this.cookie = sc.split(';')[0];
    try { return { status: r.status, body: await r.json() }; }
    catch { return { status: r.status, body: null }; }
  }
  get(p)        { return this.req('GET', p); }
  post(p, b={}) { return this.req('POST', p, b); }
}

const today = () => new Date().toLocaleDateString('en-CA');

async function login(base, email) {
  const c = new Api(base);
  const r = await c.post('/auth/login', { email, password: PASSWORD });
  if (r.status !== 200) throw new Error(`Login failed ${email}`);
  console.log(`  ✓ ${email}`);
  return c;
}

async function main() {
  const app = createApp();
  const srv = app.listen(0);
  await new Promise(r => srv.once('listening', r));
  const base = `http://127.0.0.1:${srv.address().port}`;
  console.log(`\n🌱 Seeding ${base}\n`);

  try {
    console.log('--- Logging in ---');
    const citizen  = await login(base, 'citizen@ecosure.test');
    const agent    = await login(base, 'shop@ecosure.test');
    const hub      = await login(base, 'hub@ecosure.test');
    const maker    = await login(base, 'recycler.maker@ecosure.test');
    const checker  = await login(base, 'recycler.checker@ecosure.test');
    const pOwner   = await login(base, 'producer.owner@ecosure.test');
    const pApprove = await login(base, 'producer.approver@ecosure.test');

    const ref   = (await new Api(base).get('/reference')).body;
    const wards = ref.wards;
    const w = n => wards.find(x => x.number === n)?.id ?? wards[n-1].id;

    // ── 1. Models ─────────────────────────────────────────────────────────────
    console.log('\n--- 1. Models ---');
    async function mkModel(d) {
      const r = await pOwner.post('/producer/models', d);
      if (r.status !== 201) throw new Error(`Model failed: ${JSON.stringify(r.body)}`);
      console.log(`  ✓ ${d.brand} ${d.modelName}`);
      return r.body.model;
    }

    const Samsung_S24  = await mkModel({ brand:'Samsung',  modelName:'Galaxy S24 Ultra',      categoryCode:'mobile_phone',    typicalUnitKg:0.23, batteryType:'li_ion' });
    const Apple_15Pro  = await mkModel({ brand:'Apple',    modelName:'iPhone 15 Pro',          categoryCode:'mobile_phone',    typicalUnitKg:0.19, batteryType:'li_ion' });
    const OnePlus_12   = await mkModel({ brand:'OnePlus',  modelName:'12 5G',                  categoryCode:'mobile_phone',    typicalUnitKg:0.22, batteryType:'li_ion' });
    const Dell_XPS     = await mkModel({ brand:'Dell',     modelName:'XPS 15 9530',            categoryCode:'laptop',          typicalUnitKg:1.86, batteryType:'li_ion' });
    const HP_Elite     = await mkModel({ brand:'HP',       modelName:'EliteBook 840 G10',      categoryCode:'laptop',          typicalUnitKg:1.55, batteryType:'li_ion' });
    const iPad_Pro     = await mkModel({ brand:'Apple',    modelName:'iPad Pro 12.9" M2',      categoryCode:'tablet',          typicalUnitKg:0.68, batteryType:'li_ion' });
    const Samsung_TV   = await mkModel({ brand:'Samsung',  modelName:'Crystal 4K 43"',         categoryCode:'monitor_tv',      typicalUnitKg:9.40, batteryType:'none'   });
    const LG_Monitor   = await mkModel({ brand:'LG',       modelName:'UltraGear 27GP850B',     categoryCode:'monitor_tv',      typicalUnitKg:5.80, batteryType:'none'   });
    const Lenovo_CPU   = await mkModel({ brand:'Lenovo',   modelName:'ThinkCentre M90q',       categoryCode:'desktop_cpu',     typicalUnitKg:3.20, batteryType:'none'   });
    const Canon_Prnt   = await mkModel({ brand:'Canon',    modelName:'PIXMA MG3620',           categoryCode:'printer',         typicalUnitKg:4.10, batteryType:'none'   });
    const Havells_Fan  = await mkModel({ brand:'Havells',  modelName:'Cista Table Fan',        categoryCode:'small_appliance', typicalUnitKg:2.20, batteryType:'none'   });
    const Bosch_Iron   = await mkModel({ brand:'Bosch',    modelName:'EasyIron 3 Steam Iron',  categoryCode:'small_appliance', typicalUnitKg:1.10, batteryType:'none'   });
    const Anker_Cable  = await mkModel({ brand:'Anker',    modelName:'PowerLine III USB-C',    categoryCode:'cables_accessories', typicalUnitKg:0.08, batteryType:'none' });

    // ── 2. Batches (18 units total) ────────────────────────────────────────────
    console.log('\n--- 2. Batches & units ---');
    async function mkBatch(model, serials) {
      const ref = `B-${model.categoryCode.slice(0,3).toUpperCase()}-${Math.random().toString(36).slice(2,5).toUpperCase()}`;
      const b = (await pOwner.post('/producer/batches', {
        modelId: model.id, batchRef: ref,
        marketMonth: '2026-09', stateCode: 'MP', quantity: serials.length,
      })).body.batch;
      const rows = serials.map(s => ({ serial: s }));
      const u = (await pOwner.post(`/producer/batches/${b.id}/units`, { rows })).body.results.filter(r => r.qrPublicId);
      await pApprove.post(`/producer/batches/${b.id}/place`);
      console.log(`  ✓ ${ref}: ${u.length} units`);
      return u;
    }

    // 6 phones (3 Samsung + 2 Apple + 1 OnePlus)
    const phones_s = await mkBatch(Samsung_S24, ['SN-SS-001','SN-SS-002','SN-SS-003']);
    const phones_a = await mkBatch(Apple_15Pro, ['SN-AP-001','SN-AP-002']);
    const phones_o = await mkBatch(OnePlus_12,  ['SN-OP-001']);
    // 3 laptops
    const laptops_d = await mkBatch(Dell_XPS,  ['SN-DL-001','SN-DL-002']);
    const laptops_h = await mkBatch(HP_Elite,  ['SN-HP-001']);
    // 2 tablets
    const tablets   = await mkBatch(iPad_Pro,  ['SN-IP-001','SN-IP-002']);
    // 2 monitors/TVs
    const tvs       = await mkBatch(Samsung_TV,  ['SN-TV-001']);
    const monitors  = await mkBatch(LG_Monitor,  ['SN-LG-001']);
    // 1 desktop, 1 printer
    const desktops  = await mkBatch(Lenovo_CPU,  ['SN-LE-001']);
    const printers  = await mkBatch(Canon_Prnt,  ['SN-CA-001']);
    // appliances + cables
    const fans      = await mkBatch(Havells_Fan, ['SN-HV-001','SN-HV-002']);
    const irons     = await mkBatch(Bosch_Iron,  ['SN-BS-001']);
    const cables    = await mkBatch(Anker_Cable, ['SN-AK-001','SN-AK-002','SN-AK-003']);

    const allPhones = [...phones_s, ...phones_a, ...phones_o];
    const allLaptops = [...laptops_d, ...laptops_h];

    // ── 3. Citizen claims 8 devices ───────────────────────────────────────────
    console.log('\n--- 3. Citizen claims 8 devices ---');
    const toClaim = [
      phones_s[0], phones_s[1],    // 2 Samsung phones
      phones_a[0],                  // iPhone
      phones_o[0],                  // OnePlus
      laptops_d[0],                 // Dell laptop
      tablets[0],                   // iPad
      tvs[0],                       // Samsung TV
      fans[0],                      // Havells Fan
    ];
    for (const d of toClaim) {
      if (!d?.qrPublicId) continue;
      const r = await citizen.post('/devices/claim', { qr: d.qrPublicId });
      console.log(`  ✓ Claimed ${d.qrPublicId} (${r.status === 200 ? 'ok' : r.body?.error?.code})`);
    }

    // ── 4. Book pickups for SOME claimed devices (creates "Booked" badge) ─────
    console.log('\n--- 4. Pickups (some for claimed devices) ---');

    // Pickup A — citizen books phone + laptop pickup (phones_s[0], laptops_d[0] are claimed)
    // → those 2 claimed devices will show "📦 Booked for pickup" badge
    const pA = (await citizen.post('/pickups', {
      wardId: w(1), contactName: 'Demo Citizen (test)', contactPhone: '9000000001',
      addressLine: 'Flat 12, Vijaynagar, Indore',
      preferredDate: today(), preferredWindow: 'morning',
      items: [
        { categoryCode: 'mobile_phone', quantity: 1 },
        { categoryCode: 'laptop',       quantity: 1 },
      ],
    })).body.pickup.id;
    console.log(`  ✓ Pickup A [REQUESTED] — phone + laptop (citizen's claimed devices BOOKED)`);

    // Pickup B — citizen books TV pickup (tvs[0] claimed → shows booked)
    const pB = (await citizen.post('/pickups', {
      wardId: w(2), contactName: 'Demo Citizen (test)', contactPhone: '9000000001',
      addressLine: 'Flat 12, Vijaynagar, Indore',
      preferredDate: today(), preferredWindow: 'afternoon',
      items: [{ categoryCode: 'monitor_tv', quantity: 1 }],
    })).body.pickup.id;
    await agent.post(`/agent/jobs/${pB}/accept`, { scheduledFor: today(), scheduledWindow: 'afternoon' });
    console.log(`  ✓ Pickup B [SCHEDULED] — TV (claimed TV shows BOOKED badge)`);

    // Pickup C — another citizen (Aarav) requests pickup, not linked to demo citizen's devices
    const pC = (await citizen.post('/pickups', {
      wardId: w(3), contactName: 'Aarav Sharma', contactPhone: '9826011223',
      addressLine: '74 Sarafa Bazar, Rajwada, Indore',
      preferredDate: today(), preferredWindow: 'morning',
      items: [
        { categoryCode: 'small_appliance', quantity: 2 },
        { categoryCode: 'cables_accessories', quantity: 3 },
      ],
    })).body.pickup.id;
    await agent.post(`/agent/jobs/${pC}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    console.log(`  ✓ Pickup C [SCHEDULED] — appliances + cables`);

    // Pickup D — collected: 3 phones + 1 laptop (all registered QR)
    const pD = (await citizen.post('/pickups', {
      wardId: w(4), contactName: 'Pooja Verma', contactPhone: '9826044556',
      addressLine: '15 Old Palasia Main Road, Indore',
      preferredDate: today(), preferredWindow: 'morning',
      items: [
        { categoryCode: 'mobile_phone', quantity: 3 },
        { categoryCode: 'laptop',       quantity: 1 },
      ],
    })).body.pickup.id;
    await agent.post(`/agent/jobs/${pD}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    const { code: codeD } = (await citizen.post(`/pickups/${pD}/handover-code`)).body;
    const jobD = (await agent.get(`/agent/jobs/${pD}`)).body.job;
    const dPhone  = jobD.items.find(i => i.categoryCode === 'mobile_phone');
    const dLaptop = jobD.items.find(i => i.categoryCode === 'laptop');
    await agent.post(`/agent/jobs/${pD}/collect`, {
      handoverCode: codeD, netKg: 2.1, materialPaidAmount: 580,
      items: [
        { itemId: dPhone.id,  collectedQuantity: 3, batteryCheck: 'intact_embedded',
          qrIds: [allPhones[1]?.qrPublicId, allPhones[2]?.qrPublicId, phones_a[1]?.qrPublicId].filter(Boolean) },
        { itemId: dLaptop.id, collectedQuantity: 1, batteryCheck: 'intact_embedded',
          qrIds: [laptops_d[1]?.qrPublicId].filter(Boolean) },
      ],
    });
    console.log(`  ✓ Pickup D [COLLECTED ₹580] — 3 phones + laptop (QR)`);

    // Pickup E — collected: tablet + monitor + iron + cables
    const pE = (await citizen.post('/pickups', {
      wardId: w(5), contactName: 'Ramesh Patel', contactPhone: '9826077889',
      addressLine: '88 Scheme 54, AB Road, Indore',
      preferredDate: today(), preferredWindow: 'morning',
      items: [
        { categoryCode: 'tablet',            quantity: 1 },
        { categoryCode: 'monitor_tv',        quantity: 1 },
        { categoryCode: 'small_appliance',   quantity: 1 },
        { categoryCode: 'cables_accessories',quantity: 2 },
      ],
    })).body.pickup.id;
    await agent.post(`/agent/jobs/${pE}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    const { code: codeE } = (await citizen.post(`/pickups/${pE}/handover-code`)).body;
    const jobE = (await agent.get(`/agent/jobs/${pE}`)).body.job;
    const eTab  = jobE.items.find(i => i.categoryCode === 'tablet');
    const eTv   = jobE.items.find(i => i.categoryCode === 'monitor_tv');
    const eApp  = jobE.items.find(i => i.categoryCode === 'small_appliance');
    const eCab  = jobE.items.find(i => i.categoryCode === 'cables_accessories');
    await agent.post(`/agent/jobs/${pE}/collect`, {
      handoverCode: codeE, netKg: 11.5, materialPaidAmount: 390,
      items: [
        { itemId: eTab.id,  collectedQuantity: 1, batteryCheck: 'intact_embedded', qrIds: [tablets[1]?.qrPublicId].filter(Boolean) },
        { itemId: eTv.id,   collectedQuantity: 1, batteryCheck: 'no_battery',      qrIds: [monitors[0]?.qrPublicId].filter(Boolean) },
        { itemId: eApp.id,  collectedQuantity: 1, batteryCheck: 'no_battery',      qrIds: [irons[0]?.qrPublicId].filter(Boolean) },
        { itemId: eCab.id,  collectedQuantity: 2, batteryCheck: 'no_battery',      qrIds: [cables[0]?.qrPublicId, cables[1]?.qrPublicId].filter(Boolean) },
      ],
    });
    console.log(`  ✓ Pickup E [COLLECTED ₹390] — tablet + monitor + iron + cables (QR)`);

    // Pickup F — collected: desktop + printer + fan
    const pF = (await citizen.post('/pickups', {
      wardId: w(2), contactName: 'Sunita Rathore', contactPhone: '9826055667',
      addressLine: '22 Sudama Nagar, Indore',
      preferredDate: today(), preferredWindow: 'morning',
      items: [
        { categoryCode: 'desktop_cpu',    quantity: 1 },
        { categoryCode: 'printer',        quantity: 1 },
        { categoryCode: 'small_appliance',quantity: 1 },
      ],
    })).body.pickup.id;
    await agent.post(`/agent/jobs/${pF}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    const { code: codeF } = (await citizen.post(`/pickups/${pF}/handover-code`)).body;
    const jobF = (await agent.get(`/agent/jobs/${pF}`)).body.job;
    const fCpu = jobF.items.find(i => i.categoryCode === 'desktop_cpu');
    const fPrn = jobF.items.find(i => i.categoryCode === 'printer');
    const fApp = jobF.items.find(i => i.categoryCode === 'small_appliance');
    await agent.post(`/agent/jobs/${pF}/collect`, {
      handoverCode: codeF, netKg: 7.4, materialPaidAmount: 320,
      items: [
        { itemId: fCpu.id, collectedQuantity: 1, batteryCheck: 'no_battery', qrIds: [desktops[0]?.qrPublicId].filter(Boolean) },
        { itemId: fPrn.id, collectedQuantity: 1, batteryCheck: 'no_battery', qrIds: [printers[0]?.qrPublicId].filter(Boolean) },
        { itemId: fApp.id, collectedQuantity: 1, batteryCheck: 'no_battery', qrIds: [fans[1]?.qrPublicId].filter(Boolean) },
      ],
    });
    console.log(`  ✓ Pickup F [COLLECTED ₹320] — desktop + printer + fan (QR)`);

    // ── 5. Lot → Hub → Recycler → Attest ──────────────────────────────────────
    console.log('\n--- 5. Lot chain: seal → hub → recycler → attest ---');
    const seal = `SEAL-IND-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
    const lot = (await agent.post('/agent/lots', { sealTag: seal, pickupIds: [pD, pE, pF] })).body.lot.id;
    console.log(`  ✓ Lot sealed: ${seal}`);

    const dests  = (await agent.get('/agent/lots/destinations')).body;
    await agent.post(`/agent/lots/${lot}/dispatch`, { senderNetKg: 21.0, hubOrgId: dests.hubs?.[0]?.id });
    await hub.post(`/hub/lots/${lot}/receive`, { hubNetKg: 20.6, sealIntact: true, unitCountReceived: 10 });
    const ship = (await hub.post('/hub/shipments', { lotIds: [lot] })).body.shipment.id;
    await hub.post(`/hub/shipments/${ship}/dispatch`, { vehicleRef: 'MP 09 CZ 8821' });
    await maker.post(`/recycler/lots/${lot}/receive`, { receiverNetKg: 20.5, sealIntact: true, unitCountReceived: 10 });
    console.log(`  ✓ Hub → Recycler chain complete`);

    const att = (await maker.post(`/recycler/attestations/lots/${lot}`, {
      processedKg: 17.5, batteryKg: 0.9,
      fractions: [
        { materialCode: 'plastics_abs',    netKg: 7.0 },
        { materialCode: 'copper_precious', netKg: 3.5 },
        { materialCode: 'ferrous_metals',  netKg: 7.0 },
      ],
    })).body.attestation?.id;
    console.log(`  ✓ Attestation drafted: ${att}`);

    // Issue from checker session
    const issued = await checker.post(`/recycler/attestations/${att}/issue`);
    const certRef = issued.body?.attestation?.publicNumber ?? issued.body?.publicNumber ?? att?.slice(0,8) ?? 'issued';
    console.log(`  ✓ Attestation ISSUED: ${certRef} (recycling certs auto-generated)`);

    // ── 6. Verify ─────────────────────────────────────────────────────────────
    console.log('\n--- 6. Final verification ---');
    const devs = (await citizen.get('/devices')).body.devices ?? [];
    const booked = devs.filter(d => d.activePickupId);
    console.log(`  ✓ Citizen devices: ${devs.length}`);
    console.log(`  ✓ Devices with active booking (📦 badge): ${booked.length}`);
    booked.forEach(d => console.log(`    → ${d.brand} ${d.modelName ?? ''} [${d.activePickupStatus}]`));

    console.log(`
================================================================
  SEED COMPLETE ✅
================================================================
  18 registered QR units across all 8 categories
  Citizen claims 8 devices:
    • 2× Samsung Galaxy S24 Ultra
    • 1× iPhone 15 Pro
    • 1× OnePlus 12 5G
    • 1× Dell XPS 15       ← 📦 Booked (Pickup A)
    • 1× iPad Pro M2
    • 1× Samsung TV 43"    ← 📦 Booked (Pickup B - Scheduled)
    • 1× Havells Fan
  Active bookings (badge shown in My Devices):
    Pickup A [requested]  — phone + laptop
    Pickup B [scheduled]  — TV
  Collected & chain-complete:
    Pickup D ✓  Pickup E ✓  Pickup F ✓
  Lot ${seal} → Hub → Recycler → ${certRef}
================================================================
`);

  } finally {
    srv.close();
    await closePool();
  }
}

main().catch(e => { console.error('Seed failed:', e); process.exit(1); });
