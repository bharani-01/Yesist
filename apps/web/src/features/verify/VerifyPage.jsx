import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime, formatInt, formatKg } from '../../lib/format.js';
import { http } from '../../lib/http.js';

const NUMBER_PATTERN = /^ECS-ATT-\d{4}-\d{6}$/;

export function VerifyPage() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(number ?? '');
  const valid = NUMBER_PATTERN.test(input.trim().toUpperCase());

  return (
    <div className="page">
      <PageHeader title="Verify a custody attestation" description="Anyone can check that an EcoSure attestation is genuine. Only non-personal details are shown." />
      <Panel>
        <form className="row" style={{ alignItems: 'flex-end' }} onSubmit={(e) => { e.preventDefault(); if (valid) navigate(`/verify/${input.trim().toUpperCase()}`); }}>
          <TextField label="Attestation number" placeholder="ECS-ATT-2026-000001" value={input} onChange={(e) => setInput(e.target.value)} style={{ minWidth: 260, fontFamily: 'var(--font-mono)' }} />
          <Button type="submit" disabled={!valid}>Verify</Button>
        </form>
      </Panel>
      {number && <VerifyResult key={number} number={number} />}
    </div>
  );
}

function VerifyResult({ number }) {
  const query = useAsync((signal) => http.get(`/public/attestations/${encodeURIComponent(number)}`, { signal }).then((r) => r.attestation), [number]);
  if (query.status === 'error' && query.error.status === 404) {
    return <Alert tone="error" title="Not found">No issued attestation matches <span className="mono">{number}</span>. Check the number, or report a suspected fake certificate to the MPPCB.</Alert>;
  }
  return (
    <AsyncView query={query}>
      {(a) => (
        <Panel title={<span className="row"><span className="mono">{a.publicNumber}</span><Badge tone="success">Genuine</Badge></span>}>
          <div className="stack stack--sm">
            <dl className="dl">
              <dt>Issued by</dt><dd>{a.issuer}</dd>
              <dt>Registration</dt><dd className="mono">{a.registrationNo}</dd>
              <dt>Issued</dt><dd>{formatDateTime(a.issuedAt)}</dd>
              <dt>Processed weight</dt><dd>{formatKg(a.processedKg)}</dd>
              <dt>Battery weight</dt><dd>{formatKg(a.batteryKg)}</dd>
              <dt>Units</dt><dd>{formatInt(a.unitCount)}</dd>
              <dt>Categories</dt><dd>{a.categories.join(', ') || '—'}</dd>
              <dt>Content hash</dt><dd className="mono" style={{ wordBreak: 'break-all' }}>{a.sha256}</dd>
            </dl>
            <p className="subtle">This custody attestation records material received and processed by the named recycler. It is not a CPCB EPR certificate. Disclaimer {a.disclaimerVersion}.</p>
          </div>
        </Panel>
      )}
    </AsyncView>
  );
}
