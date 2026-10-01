const pg = require('pg');
const client = new pg.Client({
  connectionString: 'postgresql://postgres:GtaA1CtB9O05THbD@db.xkrvylgxwvcpgaetqoie.supabase.co:5432/postgres'
});
client.connect().then(async () => {
  try {
    await client.query("grant all on manual_devices to ecosure_app;");
    const res = await client.query("SELECT has_table_privilege('ecosure_app', 'manual_devices', 'insert') as can_insert");
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
});
