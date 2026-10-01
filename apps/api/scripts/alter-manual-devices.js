import pg from 'pg';

const client = new pg.Client({ connectionString: process.env.DATABASE_ADMIN_URL });
await client.connect();
try {
  await client.query(`
    create or replace function app.generate_unit_certificates()
    returns trigger language plpgsql security definer as $$
    declare
      _year text := extract(year from new.issued_at)::text;
      _unit record;
    begin
      if new.status = 'issued' and old.status = 'draft' then
        for _unit in
          select pu.id as unit_id
            from lots l
            join pickup_requests pr   on pr.lot_id = l.id
            join pickup_items    pi   on pi.pickup_id = pr.id
            join pickup_item_units piu on piu.pickup_item_id = pi.id
            join product_units   pu   on pu.id = piu.unit_id
           where l.id = new.lot_id
        loop
          insert into recycling_certificates (unit_id, attestation_id, cert_number, issued_at)
          values (
            _unit.unit_id,
            new.id,
            'ECS-CERT-' || _year || '-' || lpad(nextval('certificate_number_seq')::text, 6, '0'),
            new.issued_at
          )
          on conflict (unit_id) do nothing;

          update product_units set state = 'processed', updated_at = now() where id = _unit.unit_id;
        end loop;
      end if;
      return new;
    end;
    $$;
  `);

  // Also update any product units that already have an issued recycling_certificate
  await client.query(`
    update product_units
    set state = 'processed', updated_at = now()
    where id in (select unit_id from recycling_certificates);
  `);

  console.log('generate_unit_certificates and existing processed units updated in DB!');
} finally {
  await client.end();
}
