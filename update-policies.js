const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_ADMIN_URL);
(async () => {
  try {
    await client.connect();
    await client.query(`
      DROP POLICY IF EXISTS whatsapp_settings_update ON whatsapp_settings;
      DROP POLICY IF EXISTS whatsapp_settings_read ON whatsapp_settings;
      DROP POLICY IF EXISTS whatsapp_messages_read ON whatsapp_messages;
      DROP POLICY IF EXISTS whatsapp_messages_insert ON whatsapp_messages;
      DROP POLICY IF EXISTS whatsapp_messages_delete ON whatsapp_messages;
      
      CREATE POLICY whatsapp_settings_read ON whatsapp_settings 
        FOR SELECT USING (true);
      CREATE POLICY whatsapp_settings_update ON whatsapp_settings 
        FOR UPDATE USING (true);
      CREATE POLICY whatsapp_messages_read ON whatsapp_messages 
        FOR SELECT USING (true);
      CREATE POLICY whatsapp_messages_insert ON whatsapp_messages 
        FOR INSERT WITH CHECK (true);
      CREATE POLICY whatsapp_messages_delete ON whatsapp_messages 
        FOR DELETE USING (true);
        
      GRANT ALL ON whatsapp_settings TO ecosure_app;
      GRANT ALL ON whatsapp_messages TO ecosure_app;
      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ecosure_app;
    `);
    console.log("Policies and grants updated");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
