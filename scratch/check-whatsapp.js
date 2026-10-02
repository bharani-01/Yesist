import { Pool } from 'pg';
import { pool, withTx, queryOne } from '../apps/api/src/core/db.js';

async function main() {
  const adminPool = new Pool({ connectionString: process.env.DATABASE_ADMIN_URL });
  try {
    console.log('Creating app.auth_lookup_by_phone function...');
    await adminPool.query(`
      create or replace function app.auth_lookup_by_phone(p_phone text)
      returns table (id uuid, full_name text, email text, phone text)
      language sql stable security definer set search_path = public, pg_temp as $$
        select id, full_name, email, phone from users where phone = p_phone and status = 'active';
      $$;
      grant execute on function app.auth_lookup_by_phone(text) to ecosure_app;
    `);
    console.log('Function created successfully.');

    // Now test calling it as normal application pool (ecosure_app)
    const foundUser = await queryOne(pool, 'select * from app.auth_lookup_by_phone($1)', ['9843554591']);
    console.log('Lookup as ecosure_app:', foundUser);

    if (foundUser) {
      // Test running an operation inside withTx(foundUser.id)
      const devices = await withTx(foundUser.id, async (tx) => {
        const { rows } = await tx.query('select * from manual_devices where user_id = $1', [foundUser.id]);
        return rows;
      });
      console.log('Devices with user RLS:', devices);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await adminPool.end();
    await pool.end();
  }
}

main();
