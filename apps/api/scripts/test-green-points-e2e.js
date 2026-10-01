const baseUrl = 'http://localhost:4000/api/v1';

async function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runTests() {
  console.log('\n==========================================');
  console.log('🧪 Running Green Points & Rewards E2E Tests');
  console.log('==========================================\n');

  // 1. Login citizen
  console.log('1. Citizen Login');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'citizen@ecosure.test', password: 'Pilot-bE26dhw4' }),
  });
  assert(loginRes.status === 200, 'Citizen login returned 200');
  const cookie = loginRes.headers.get('set-cookie');
  assert(Boolean(cookie), 'Received auth cookie');

  // 2. Balance & Stats
  console.log('\n2. Balance & Stats');
  const balRes = await fetch(`${baseUrl}/rewards/balance`, { headers: { cookie } });
  assert(balRes.status === 200, 'GET /rewards/balance returned 200');
  const bal = await balRes.json();
  assert(typeof bal.balance === 'number' && bal.balance >= 0, `Balance is a valid number: ${bal.balance}`);
  assert(typeof bal.rank === 'number' && bal.rank >= 1, `Rank is a valid number: #${bal.rank}`);
  assert(typeof bal.totalEarned === 'number', `Total earned is tracked: ${bal.totalEarned}`);

  // 3. Catalogue
  console.log('\n3. Rewards Catalogue');
  const catRes = await fetch(`${baseUrl}/rewards/catalogue`, { headers: { cookie } });
  assert(catRes.status === 200, 'GET /rewards/catalogue returned 200');
  const cat = await catRes.json();
  assert(Array.isArray(cat) && cat.length >= 6, `Catalogue contains ${cat.length} rewards`);
  const treeReward = cat.find((r) => r.key === 'plant_tree');
  assert(Boolean(treeReward), 'Plant a Tree reward is active in catalogue');

  // 4. Referral Code & Stats
  console.log('\n4. Referral System');
  const refRes = await fetch(`${baseUrl}/rewards/referral`, { headers: { cookie } });
  assert(refRes.status === 200, 'GET /rewards/referral returned 200');
  const ref = await refRes.json();
  assert(/^ECO-[A-Z0-9]{5}$/.test(ref.code), `Valid referral code generated: ${ref.code}`);
  assert(typeof ref.totalInvites === 'number', 'Referral stats tracked');

  // 5. Redemption Flow
  console.log('\n5. Reward Redemption');
  const initialBalance = bal.balance;
  if (initialBalance >= treeReward.pointsCost) {
    const redeemRes = await fetch(`${baseUrl}/rewards/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ rewardKey: treeReward.key }),
    });
    assert(redeemRes.status === 201, 'POST /rewards/redeem returned 201');
    const redemption = await redeemRes.json();
    assert(redemption.rewardKey === 'plant_tree', 'Correct reward redeemed');
    assert(redemption.pointsSpent === treeReward.pointsCost, `Points spent matches cost (${treeReward.pointsCost})`);
    assert(redemption.status === 'fulfilled', 'Redemption status is fulfilled');

    // Verify balance deduction
    const afterRes = await fetch(`${baseUrl}/rewards/balance`, { headers: { cookie } });
    const afterBal = await afterRes.json();
    assert(afterBal.balance === initialBalance - treeReward.pointsCost, `Balance correctly deducted from ${initialBalance} to ${afterBal.balance}`);
  } else {
    console.log('  ⚠️ Skipping redemption because balance is below cost');
  }

  // 6. Insufficient points guard
  console.log('\n6. Insufficient Points Guard');
  const proBadge = cat.find((r) => r.key === 'ecosure_pro_badge');
  const currentBal = (await (await fetch(`${baseUrl}/rewards/balance`, { headers: { cookie } })).json()).balance;
  if (currentBal < proBadge.pointsCost) {
    const failRes = await fetch(`${baseUrl}/rewards/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ rewardKey: proBadge.key }),
    });
    assert(failRes.status === 422, 'Redemption with insufficient points correctly returned 422');
  }

  // 7. Ledger History
  console.log('\n7. Ledger Audit Trail');
  const ledRes = await fetch(`${baseUrl}/rewards/ledger?limit=10`, { headers: { cookie } });
  assert(ledRes.status === 200, 'GET /rewards/ledger returned 200');
  const ledger = await ledRes.json();
  assert(Array.isArray(ledger) && ledger.length > 0, `Ledger returned ${ledger.length} events`);
  assert(Boolean(ledger[0].balanceAfter), `Ledger event has balance snapshot: ${ledger[0].balanceAfter}`);

  // 8. User Redemptions History
  console.log('\n8. Redemptions List');
  const redListRes = await fetch(`${baseUrl}/rewards/redemptions`, { headers: { cookie } });
  assert(redListRes.status === 200, 'GET /rewards/redemptions returned 200');
  const redList = await redListRes.json();
  assert(Array.isArray(redList) && redList.length > 0, `User has ${redList.length} past redemptions`);

  console.log('\n==========================================');
  console.log('🎉 ALL GREEN POINTS & REWARDS TESTS PASSED!');
  console.log('==========================================\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
