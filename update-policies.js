const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_ADMIN_URL);
(async () => {
  try {
    await client.connect();
    await client.query(`
      DROP POLICY IF EXISTS whatsapp_settings_update ON whatsapp_settings;
      DROP POLICY IF EXISTS whatsapp_messages_read ON whatsapp_messages;
      CREATE POLICY whatsapp_settings_update ON whatsapp_settings 
        FOR UPDATE USING (app.user_role() IN ('programme_operator', 'spcb_officer', 'cpcb_officer', 'ulb_officer'));
      CREATE POLICY whatsapp_messages_read ON whatsapp_messages 
        FOR SELECT USING (app.user_role() IN ('programme_operator', 'spcb_officer', 'cpcb_officer', 'ulb_officer'));
    `);
    console.log("Policies updated");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
