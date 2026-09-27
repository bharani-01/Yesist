import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Segmented, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime, formatInt, formatKg } from '../../lib/format.js';
import { FLAG_TYPE_LABELS, HUB_STAGE } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { canWorkAtHub, hubApi } from './hub.api.js';

export function HubLotDetailPage() {
  const { id } = useParams();
  const query = useAsync((s) => hubApi.lot(id, s), [id]);
  return (
    <div className="page">
      <AsyncView query={query}>{(lot) => <HubLot lot={lot} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function HubLot({ lot, onChange }) {
  const { user } = useAuth();
  const canWork = canWorkAtHub(user);
  const [receipt, setReceipt] = useState(null);

  return (
    <>
      <PageHeader
        back={{ to: '/hub', label: 'Lots' }}
        title={<>Lot <span className="mono">{lot.sealTag}</span></>}
        description={`From ${lot.agentName} · dispatched ${formatDateTime(lot.dispatchedAt)}`}
        actions={<StatusBadge map={HUB_STAGE} value={lot.stage} />}
      />
      <div className="split">
        <div className="stack">
          {lot.stage === 'inbound' && (canWork
            ? <ReceiveForm lot={lot} onReceived={(r) => { setReceipt(r); onChange(); }} />
            : <Alert tone="info">A colleague with operator rights records the arrival.</Alert>)}
          {receipt && (
            <Alert tone={receipt.flags.length ? 'warning' : 'success'} title="Lot received at hub">
              Weight variance {receipt.variancePct}% against tolerance {receipt.tolerancePct}%.
              {receipt.flags.length > 0 && ` Flags raised for the regulator: ${receipt.flags.map((f) => FLAG_TYPE_LABELS[f]).join(', ')}.`}
            </Alert>
          )}
          {lot.stage === 'at_hub' && !lot.shipmentId && (
            <Alert tone="info" title="Ready to ship">
              Keep the seal intact. <Link to="/hub/shipments">Load it on a shipment</Link> before its storage deadline.
            </Alert>
          )}
          {lot.shipmentId && (
            <Alert tone="info" title={`On shipment ${lot.shipmentReference}`}>
              <Link to={`/hub/shipments/${lot.shipmentId}`}>Open the shipment</Link> to see its status.
            </Alert>
          )}
          <Panel title="Contents" flush>
            <table className="table">
              <thead><tr><th>Category</th><th className="num">Units</th></tr></thead>
              <tbody>
                {lot.contents.map((c) => <tr key={c.name}><td>{c.name}</td><td className="num">{formatInt(c.units)}</td></tr>)}
              </tbody>
            </table>
          </Panel>
        </div>
        <Panel title="Weights and custody">
          <dl className="dl">
            <dt>Units sent</dt><dd>{formatInt(lot.unitCountSent)}</dd>
            <dt>Units at hub</dt><dd>{formatInt(lot.hubUnitCount)}</dd>
            <dt>Sender net</dt><dd>{formatKg(lot.senderNetKg)}</dd>
            <dt>Hub net</dt><dd>{formatKg(lot.hubNetKg)}</dd>
            <dt>Seal at hub</dt><dd>{lot.hubSealIntact == null ? '—' : lot.hubSealIntact ? 'Intact' : 'Broken'}</dd>
            <dt>Received at hub</dt><dd>{formatDateTime(lot.hubReceivedAt)}</dd>
            <dt>Storage deadline</dt><dd>{formatDateTime(lot.storageDeadline)}</dd>
          </dl>
        </Panel>
      </div>
    </>
  );
}

function ReceiveForm({ lot, onReceived }) {
  const [form, setForm] = useState({ hubNetKg: '', unitCountReceived: String(lot.unitCountSent), sealIntact: 'yes' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { result } = await hubApi.receive(lot.id, {
        hubNetKg: Number(form.hubNetKg),
        unitCountReceived: Number(form.unitCountReceived),
        sealIntact: form.sealIntact === 'yes',
      });
      onReceived(result);
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };

  return (
    <Panel title="Record arrival">
      <form className="form-grid" onSubmit={submit}>
        <div className="form-grid form-grid--2">
          <TextField label="Hub net weight (kg)" type="number" step="0.001" min="0.001" required value={form.hubNetKg} onChange={(e) => setForm({ ...form, hubNetKg: e.target.value })} hint={`Agent recorded ${formatKg(lot.senderNetKg)}`} />
          <TextField label="Units counted" type="number" min="0" required value={form.unitCountReceived} onChange={(e) => setForm({ ...form, unitCountReceived: e.target.value })} hint={`${lot.unitCountSent} sent`} />
        </div>
        <Segmented name="seal" label={`Seal ${lot.sealTag}`} value={form.sealIntact} onChange={(v) => setForm({ ...form, sealIntact: v })} options={[{ value: 'yes', label: 'Intact and matching' }, { value: 'no', label: 'Broken or mismatched' }]} />
        <p className="subtle" style={{ margin: 0 }}>Keep the lot sealed. The recycler weighs it again and compares against your reading.</p>
        <ErrorAlert error={error} />
        <div className="form-actions"><Button type="submit" loading={pending} disabled={!(Number(form.hubNetKg) > 0)}>Record arrival</Button></div>
      </form>
    </Panel>
  );
}
