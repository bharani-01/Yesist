const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_ADMIN_URL);
(async () => {
  try {
    await client.connect();
    const res = await client.query(`SELECT email, platform_role FROM users WHERE email = 'spcb@ecosure.test'`);
    console.log(res.rows);
  } finally {
    await client.end();
  }
})();
