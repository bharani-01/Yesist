import fs from 'fs';

let content = fs.readFileSync('database/schema.sql', 'utf8');
const target = 'create or replace function app.auth_credentials(p_email text)';
const addition = `create or replace function app.auth_lookup_by_phone(p_phone text)
returns table (id uuid, full_name text, email text, phone text)
language sql stable security definer set search_path = public, pg_temp as $$
  select id, full_name, email, phone from users where phone = p_phone and status = 'active';
$$;

`;

if (!content.includes('auth_lookup_by_phone')) {
  content = content.replace(target, addition + target);
  fs.writeFileSync('database/schema.sql', content, 'utf8');
  console.log('Successfully added auth_lookup_by_phone to database/schema.sql');
} else {
  console.log('Already present');
}
