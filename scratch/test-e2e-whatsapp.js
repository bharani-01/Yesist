import { processIncomingMessage } from '../apps/api/src/modules/whatsapp/whatsapp.service.js';
import { pool } from '../apps/api/src/core/db.js';

async function main() {
  try {
    console.log('--- 1. Testing incoming message from registered citizen (9843554591) ---');
    await processIncomingMessage('9843554591', 'What devices do I have registered in my account?');
    console.log('Test 1 complete.');

    console.log('--- 2. Testing adding a device via natural language ---');
    await processIncomingMessage('9843554591', 'Please add a working Dell laptop to my account');
    console.log('Test 2 complete.');
  } catch (err) {
    console.error('Test failed with error:', err);
  } finally {
    await pool.end();
  }
}

main();
