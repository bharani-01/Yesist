const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_ADMIN_URL);
(async () => {
  try {
    await client.connect();
    await client.query(`
      GRANT SELECT, INSERT, UPDATE, DELETE ON whatsapp_settings TO ecosure_app;
      GRANT SELECT, INSERT, UPDATE, DELETE ON whatsapp_messages TO ecosure_app;
      GRANT USAGE, SELECT ON SEQUENCE whatsapp_messages_id_seq TO ecosure_app;
    `);
    console.log("Grants updated");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
