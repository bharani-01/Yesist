const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_ADMIN_URL);
(async () => {
  try {
    await client.connect();
    const res = await client.query(`SELECT policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE tablename = 'whatsapp_settings'`);
    console.log(res.rows);
  } finally {
    await client.end();
  }
})();
