// Seeds realistic pilot data across all workspaces: manufacturer models, batches,
// citizen pickups in various stages, lots, hub shipments, recycler attestations, and compliance flags.
// Usage: node --env-file=.env.supabase apps/api/scripts/seed-data.js

import { randomUUID } from 'node:crypto';
import { createApp } from '../src/app.js';
import { closePool } from '../src/core/db.js';

const PASSWORD = process.env.PILOT_ACCOUNT_PASSWORD;
if (!PASSWORD) {
  console.error('PILOT_ACCOUNT_PASSWORD must be set in the environment.');
  process.exit(1);
}

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cookie = null;
  }

  async request(method, path, body) {
    const headers = { Accept: 'application/json', Origin: this.baseUrl };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (this.cookie) headers.Cookie = this.cookie;
    const res = await fetch(`${this.baseUrl}/api/v1${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) this.cookie = setCookie.split(';')[0];
    const text = await res.text();
    let parsed = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = text;
    }
    return { status: res.status, body: parsed };
  }

  get(path) { return this.request('GET', path); }
  post(path, body = {}) { return this.request('POST', path, body); }
}

function randomImei() {
  const digits = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10));
  let sum = 0;
  for (let i = 0; i < 14; i += 1) {
    let d = digits[13 - i];
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return digits.join('') + ((10 - (sum % 10)) % 10);
}

const today = () => new Date().toLocaleDateString('en-CA');

async function main() {
  console.log('Starting local EcoSure instance to seed demo data...');
  const app = createApp();
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  console.log(`API listening on ${baseUrl}`);

  const client = () => new ApiClient(baseUrl);

  async function login(email) {
    const c = client();
    const res = await c.post('/auth/login', { email, password: PASSWORD });
    if (res.status !== 200) {
      throw new Error(`Login failed for ${email}: ${JSON.stringify(res.body)}`);
    }
    return c;
  }

  try {
    const citizen = await login('citizen@ecosure.test');
    const shop = await login('shop@ecosure.test');
    const hub = await login('hub@ecosure.test');
    const maker = await login('recycler.maker@ecosure.test');
    const checker = await login('recycler.checker@ecosure.test');
    const producerOwner = await login('producer.owner@ecosure.test');
    const producerApprover = await login('producer.approver@ecosure.test');

    const ref = await client().get('/reference');
    const wards = ref.body.wards;
    const ward1 = wards.find((w) => w.number === 1)?.id ?? wards[0].id;
    const ward2 = wards.find((w) => w.number === 2)?.id ?? wards[1].id;
    const ward3 = wards.find((w) => w.number === 3)?.id ?? wards[2].id;
    const ward5 = wards.find((w) => w.number === 5)?.id ?? wards[4].id;

    console.log('\n--- 1. Seeding Manufacturer Registry (Models, Batches, QR Units) ---');
    // 1. Models
    const model1Res = await producerOwner.post('/producer/models', {
      brand: 'EcoTech',
      modelName: `EcoPhone 14 Pro ${randomUUID().slice(0, 4)}`,
      categoryCode: 'mobile_phone',
      typicalUnitKg: 0.21,
      batteryType: 'li_ion',
    });
    const model1 = model1Res.body.model;
    console.log(`✓ Model registered: ${model1.brand} ${model1.modelName} (${model1.categoryCode})`);

    const model2Res = await producerOwner.post('/producer/models', {
      brand: 'VoltDynamics',
      modelName: `VoltBook Ultra 15 ${randomUUID().slice(0, 4)}`,
      categoryCode: 'laptop',
      typicalUnitKg: 1.85,
      batteryType: 'li_ion',
    });
    const model2 = model2Res.body.model;
    console.log(`✓ Model registered: ${model2.brand} ${model2.modelName} (${model2.categoryCode})`);

    // 2. Batches
    const batch1Res = await producerOwner.post('/producer/batches', {
      modelId: model1.id,
      batchRef: `BATCH-EP14-${randomUUID().slice(0, 4).toUpperCase()}`,
      marketMonth: '2026-09',
      stateCode: 'MP',
      quantity: 5,
    });
    const batch1 = batch1Res.body.batch;
    console.log(`✓ Batch created: ${batch1.batchRef} (Qty: 5)`);

    const imei1 = randomImei();
    const imei2 = randomImei();
    const imei3 = randomImei();

    const uploadRes = await producerOwner.post(`/producer/batches/${batch1.id}/units`, {
      rows: [
        { imei: imei1, serial: 'SN-EP14-001' },
        { imei: imei2, serial: 'SN-EP14-002' },
        { imei: imei3, serial: 'SN-EP14-003' },
        { serial: 'SN-EP14-004' },
        { serial: 'SN-EP14-005' },
      ],
    });
    const registeredUnits = uploadRes.body.results.filter((r) => r.qrPublicId);
    console.log(`✓ Registered ${uploadRes.body.registered} units with QR codes`);

    // Place batch on market
    await producerApprover.post(`/producer/batches/${batch1.id}/place`);
    console.log(`✓ Batch ${batch1.batchRef} approved & placed on market by checker`);

    const qrPhone = registeredUnits[0]?.qrPublicId;
    if (registeredUnits[1]?.qrPublicId) {
      await citizen.post('/devices/claim', { qr: registeredUnits[1].qrPublicId });
      console.log(`✓ Citizen claimed device: ${registeredUnits[1].qrPublicId}`);
    }
    if (registeredUnits[2]?.qrPublicId) {
      await citizen.post('/devices/claim', { qr: registeredUnits[2].qrPublicId });
      console.log(`✓ Citizen claimed device: ${registeredUnits[2].qrPublicId}`);
    }

    console.log('\n--- 2. Seeding Citizen Pickups in Diverse Lifecycle Stages ---');
    // Pickup A: Requested (Open, waiting for agent to accept)
    const pARes = await citizen.post('/pickups', {
      wardId: ward1,
      contactName: 'Aarav Sharma',
      contactPhone: '9826011223',
      addressLine: 'Flat 402, Royal Palms, Vijay Nagar, Indore',
      preferredDate: today(),
      preferredWindow: 'morning',
      items: [
        { categoryCode: 'laptop', quantity: 1 },
        { categoryCode: 'mobile_phone', quantity: 2 },
      ],
    });
    const pickupA = pARes.body.pickup.id;
    console.log(`✓ Pickup A [REQUESTED]: ${pickupA} (Ward 1 - Vijay Nagar)`);

    // Pickup B: Accepted by Agent, scheduled for today afternoon
    const pBRes = await citizen.post('/pickups', {
      wardId: ward2,
      contactName: 'Pooja Verma',
      contactPhone: '9826044556',
      addressLine: '15 Old Palasia Main Road, Indore',
      preferredDate: today(),
      preferredWindow: 'afternoon',
      items: [
        { categoryCode: 'monitor_tv', quantity: 1 },
        { categoryCode: 'small_appliance', quantity: 2 },
      ],
    });
    const pickupB = pBRes.body.pickup.id;
    await shop.post(`/agent/jobs/${pickupB}/accept`, { scheduledFor: today(), scheduledWindow: 'afternoon' });
    console.log(`✓ Pickup B [ACCEPTED & SCHEDULED]: ${pickupB} (Ward 2 - Palasia)`);

    // Pickup C: Collected (Handover verified, IMEI checked, ₹210 material payout, incentive granted)
    const pCRes = await citizen.post('/pickups', {
      wardId: ward3,
      contactName: 'Ramesh Patel',
      contactPhone: '9826077889',
      addressLine: '74 Sarafa Bazar, Rajwada, Indore',
      preferredDate: today(),
      preferredWindow: 'morning',
      items: [
        { categoryCode: 'mobile_phone', quantity: 2 },
        { categoryCode: 'tablet', quantity: 1 },
      ],
    });
    const pickupC = pCRes.body.pickup.id;
    await shop.post(`/agent/jobs/${pickupC}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    const { code: codeC } = (await citizen.post(`/pickups/${pickupC}/handover-code`)).body;
    const jobC = (await shop.get(`/agent/jobs/${pickupC}`)).body.job;
    const phoneItem = jobC.items.find((i) => i.categoryCode === 'mobile_phone');
    const tabletItem = jobC.items.find((i) => i.categoryCode === 'tablet');

    await shop.post(`/agent/jobs/${pickupC}/collect`, {
      handoverCode: codeC,
      netKg: 1.4,
      materialPaidAmount: 210,
      items: [
        { itemId: phoneItem.id, collectedQuantity: 2, batteryCheck: 'intact_embedded', identifiers: [randomImei(), randomImei()] },
        { itemId: tabletItem.id, collectedQuantity: 1, batteryCheck: 'intact_embedded' },
      ],
    });
    console.log(`✓ Pickup C [COLLECTED & PAID]: ${pickupC} (Handover verified, ₹210 paid, Incentive created)`);

    // Pickup D: Collected with Manufacturer QR Device
    const pDRes = await citizen.post('/pickups', {
      wardId: ward5,
      contactName: 'Demo Citizen (test)',
      contactPhone: '9000000001',
      addressLine: '12 Geeta Bhawan Square, Indore',
      preferredDate: today(),
      preferredWindow: 'evening',
      items: [{ categoryCode: 'mobile_phone', quantity: 1 }],
    });
    const pickupD = pDRes.body.pickup.id;
    await shop.post(`/agent/jobs/${pickupD}/accept`, { scheduledFor: today(), scheduledWindow: 'evening' });
    const { code: codeD } = (await citizen.post(`/pickups/${pickupD}/handover-code`)).body;
    const jobD = (await shop.get(`/agent/jobs/${pickupD}`)).body.job;
    const phoneD = jobD.items[0];

    await shop.post(`/agent/jobs/${pickupD}/collect`, {
      handoverCode: codeD,
      netKg: 0.3,
      materialPaidAmount: 60,
      items: [
        { itemId: phoneD.id, collectedQuantity: 1, batteryCheck: 'intact_embedded', qrIds: qrPhone ? [qrPhone] : [] },
      ],
    });
    console.log(`✓ Pickup D [COLLECTED with QR]: ${pickupD} (Linked to QR ${qrPhone})`);

    console.log('\n--- 3. Seeding Sealed Lots, Regional Hub Inbound & Outbound Shipments ---');
    // Lot 1: Sealed and Dispatched to Regional Hub
    const sealTag1 = `SEAL-IND-${randomUUID().slice(0, 6).toUpperCase()}`;
    const lot1Res = await shop.post('/agent/lots', { sealTag: sealTag1, pickupIds: [pickupC, pickupD] });
    const lot1Id = lot1Res.body.lot.id;
    console.log(`✓ Lot 1 created: ${sealTag1} (Contains Pickups C & D)`);

    const destinations = (await shop.get('/agent/lots/destinations')).body;
    const hubOrg = destinations.hubs[0];

    await shop.post(`/agent/lots/${lot1Id}/dispatch`, {
      senderNetKg: 2.1,
      hubOrgId: hubOrg?.id,
    });
    console.log(`✓ Lot 1 dispatched to Regional Hub (Sender Net: 2.1 kg)`);

    // Hub receives Lot 1 with verified weight
    const hubReceiveRes = await hub.post(`/hub/lots/${lot1Id}/receive`, {
      hubNetKg: 1.95,
      sealIntact: true,
      unitCountReceived: 4,
    });
    console.log(`✓ Lot 1 received at Regional Hub (Hub Net: 1.95 kg, Flags: ${JSON.stringify(hubReceiveRes.body.result?.flags ?? [])})`);

    // Hub creates consolidated shipment to Recycler
    const shipmentRes = await hub.post('/hub/shipments', { lotIds: [lot1Id] });
    const shipmentId = shipmentRes.body.shipment.id;
    await hub.post(`/hub/shipments/${shipmentId}/dispatch`, { vehicleRef: 'MP 09 CZ 8821' });
    console.log(`✓ Hub Shipment dispatched: ${shipmentId} (Vehicle: MP 09 CZ 8821, destination: Test Recycler)`);

    console.log('\n--- 4. Seeding Recycler Receipt, Recovery Fractions & Attestations ---');
    // Recycler receives lot from shipment
    await maker.post(`/recycler/lots/${lot1Id}/receive`, {
      receiverNetKg: 1.95,
      sealIntact: true,
      unitCountReceived: 4,
    });
    console.log(`✓ Recycler received lot ${lot1Id} (Accepted Net: 1.95 kg)`);

    // Maker drafts attestation
    const attestDraft = await maker.post(`/recycler/attestations/lots/${lot1Id}`, {
      processedKg: 1.45,
      batteryKg: 0.50,
      fractions: [
        { materialCode: 'plastics_abs', netKg: 0.65 },
        { materialCode: 'copper_precious', netKg: 0.35 },
        { materialCode: 'ferrous_metals', netKg: 0.45 },
      ],
    });
    const attestationId = attestDraft.body.attestation?.id;
    console.log(`✓ Recycler operator drafted attestation: ${attestationId}`);

    let certRef = attestationId ? attestationId.slice(0, 8).toUpperCase() : 'N/A';
    if (attestationId) {
      // Checker approves and issues official recovery attestation
      const approvedAttest = await checker.post(`/recycler/attestations/${attestationId}/issue`);
      certRef = approvedAttest.body.attestation?.certificateRef ?? certRef;
      console.log(`✓ Recycler approver officially issued Certificate: ${certRef}`);
    }

    console.log('\n================================================================');
    console.log('DEMO DATA SEEDING COMPLETE!');
    console.log('================================================================');
    console.log(`• Models & Batches: EcoTech EcoPhone 14 Pro, VoltDynamics VoltBook Ultra 15`);
    console.log(`• Pickups:`);
    console.log(`  - 1 x Requested [Open] (Vijay Nagar)`);
    console.log(`  - 1 x Accepted & Scheduled (Palasia)`);
    console.log(`  - 2 x Collected & Dispatched with verified payouts and incentives`);
    console.log(`• Custody Chain: Sealed Lot (${sealTag1}) → Regional Hub → Recycler`);
    console.log(`• Material Recovery: 1.45 kg processed, 0.50 kg batteries recovered`);
    console.log(`• Issued Attestation Certificate Ref: ${certRef}`);
    console.log(`================================================================\n`);
  } finally {
    server.close();
    await closePool();
  }
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
