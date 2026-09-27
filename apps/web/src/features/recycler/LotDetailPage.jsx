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
import { FLAG_TYPE_LABELS, LOT_STATUS } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { CHECKER_ROLES, MAKER_ROLES, recyclerApi } from './recycler.api.js';

export function LotDetailPage() {
  const { id } = useParams();
  const query = useAsync((s) => recyclerApi.lot(id, s).then((r) => r.lot), [id]);
  return (
    <div className="page">
      <AsyncView query={query}>{(lot) => <LotDetail lot={lot} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function LotDetail({ lot, onChange }) {
  const { user } = useAuth();
  const orgRole = user.orgs.find((o) => o.type === 'pro_recycler')?.orgRole;
  const a = lot.attestation;
  const [receipt, setReceipt] = useState(null);

  return (
    <>
      <PageHeader
        back={{ to: '/recycler', label: 'Inbound lots' }}
        title={<>Lot <span className="mono">{lot.sealTag}</span></>}
        description={`From ${lot.agentName} · dispatched ${formatDateTime(lot.dispatchedAt)}`}
        actions={<StatusBadge map={LOT_STATUS} value={lot.status} />}
      />
      <div className="split">
        <div className="stack">
          {lot.status === 'in_transit' && <ReceiveForm lot={lot} onReceived={(r) => { setReceipt(r); onChange(); }} />}
          {receipt && (
            <Alert tone={receipt.flags.length ? 'warning' : 'success'} title="Lot received">
              Accepted {formatKg(receipt.acceptedNetKg)} (variance {receipt.variancePct}% against tolerance {receipt.tolerancePct}%).
              {receipt.flags.length > 0 && ` Flags raised for the regulator: ${receipt.flags.map((f) => FLAG_TYPE_LABELS[f]).join(', ')}.`}
            </Alert>
          )}
          {lot.status === 'disputed' && (
            <Alert tone="error" title="Custody dispute open">The seal was broken or mismatched. Attestation is blocked until the programme team resolves the dispute.</Alert>
          )}
          {lot.status === 'received' && !a && (
            MAKER_ROLES.includes(orgRole)
              ? <DraftForm lot={lot} onDrafted={onChange} />
              : <Alert tone="info">A colleague with maker rights drafts the attestation.</Alert>
          )}
          {a?.status === 'draft' && <ApprovePanel attestation={a} canApprove={CHECKER_ROLES.includes(orgRole)} onApproved={onChange} />}
          {a?.status === 'issued' && (
            <Panel title="Custody attestation issued">
              <dl className="dl">
                <dt>Number</dt><dd><Link to={`/verify/${a.publicNumber}`} className="mono">{a.publicNumber}</Link></dd>
                <dt>Issued</dt><dd>{formatDateTime(a.issuedAt)}</dd>
                <dt>Processed</dt><dd>{formatKg(a.processedKg)}</dd>
                <dt>Batteries (separate)</dt><dd>{formatKg(a.batteryKg)}</dd>
                <dt>SHA-256</dt><dd className="mono" style={{ wordBreak: 'break-all' }}>{a.sha256}</dd>
              </dl>
            </Panel>
          )}
          <Panel title="Contents" flush>
            <table className="table">
              <thead><tr><th>Category</th><th className="num">Units</th><th className="num">With passport</th></tr></thead>
              <tbody>
                {lot.contents.map((c) => (
                  <tr key={c.name}><td>{c.name}</td><td className="num">{formatInt(c.units)}</td><td className="num">{formatInt(c.passportUnits)}</td></tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
        <Panel title="Weights and custody">
          <dl className="dl">
            <dt>Units sent</dt><dd>{formatInt(lot.unitCountSent)}</dd>
            <dt>Units received</dt><dd>{formatInt(lot.unitCountReceived)}</dd>
            <dt>Sender net</dt><dd>{formatKg(lot.senderNetKg)}</dd>
            <dt>Receiver net</dt><dd>{formatKg(lot.receiverNetKg)}</dd>
            <dt>Accepted</dt><dd>{formatKg(lot.acceptedNetKg)}</dd>
            <dt>Seal</dt><dd>{lot.sealIntact == null ? '—' : lot.sealIntact ? 'Intact' : 'Broken'}</dd>
            <dt>Vehicle</dt><dd>{lot.vehicleRef ?? '—'}</dd>
            <dt>Storage deadline</dt><dd>{formatDateTime(lot.storageDeadline)}</dd>
          </dl>
        </Panel>
      </div>
    </>
  );
}

function ReceiveForm({ lot, onReceived }) {
  const [form, setForm] = useState({ receiverNetKg: '', unitCountReceived: String(lot.unitCountSent), sealIntact: 'yes' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { result } = await recyclerApi.receive(lot.id, {
        receiverNetKg: Number(form.receiverNetKg),
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
    <Panel title="Receive at gate">
      <form className="form-grid" onSubmit={submit}>
        <div className="form-grid form-grid--2">
          <TextField label="Receiver net weight (kg)" type="number" step="0.001" min="0.001" required value={form.receiverNetKg} onChange={(e) => setForm({ ...form, receiverNetKg: e.target.value })} hint={`Sender recorded ${formatKg(lot.senderNetKg)}`} />
          <TextField label="Units counted" type="number" min="0" required value={form.unitCountReceived} onChange={(e) => setForm({ ...form, unitCountReceived: e.target.value })} hint={`${lot.unitCountSent} sent`} />
        </div>
        <Segmented name="seal" label={`Seal ${lot.sealTag}`} value={form.sealIntact} onChange={(v) => setForm({ ...form, sealIntact: v })} options={[{ value: 'yes', label: 'Intact and matching' }, { value: 'no', label: 'Broken or mismatched' }]} />
        <ErrorAlert error={error} />
        <div className="form-actions"><Button type="submit" loading={pending} disabled={!(Number(form.receiverNetKg) > 0)}>Record receipt</Button></div>
      </form>
    </Panel>
  );
}

function DraftForm({ lot, onDrafted }) {
  const [form, setForm] = useState({ processedKg: '', batteryKg: '0' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await recyclerApi.draftAttestation(lot.id, { processedKg: Number(form.processedKg), batteryKg: Number(form.batteryKg || 0) });
      onDrafted();
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  return (
    <Panel title="Draft custody attestation">
      <form className="form-grid" onSubmit={submit}>
        <p className="subtle">Processed plus battery weight cannot exceed the accepted {formatKg(lot.acceptedNetKg)}. A different colleague must approve.</p>
        <div className="form-grid form-grid--2">
          <TextField label="Processed weight (kg)" type="number" step="0.001" min="0.001" required value={form.processedKg} onChange={(e) => setForm({ ...form, processedKg: e.target.value })} />
          <TextField label="Battery weight (kg)" type="number" step="0.001" min="0" value={form.batteryKg} onChange={(e) => setForm({ ...form, batteryKg: e.target.value })} hint="Reported separately under battery rules" />
        </div>
        <ErrorAlert error={error} />
        <div className="form-actions"><Button type="submit" loading={pending} disabled={!(Number(form.processedKg) > 0)}>Submit for approval</Button></div>
      </form>
    </Panel>
  );
}

function ApprovePanel({ attestation, canApprove, onApproved }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const approve = async () => {
    setPending(true);
    setError(null);
    try {
      await recyclerApi.approveAttestation(attestation.id);
      onApproved();
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  const blockedReason = attestation.madeByMe
    ? 'You drafted this attestation. A different approver must sign it off.'
    : !canApprove ? 'Only an owner or approver can sign off attestations.' : null;
  return (
    <Panel title="Attestation awaiting approval">
      <div className="stack stack--sm">
        <dl className="dl">
          <dt>Processed</dt><dd>{formatKg(attestation.processedKg)}</dd>
          <dt>Batteries</dt><dd>{formatKg(attestation.batteryKg)}</dd>
          <dt>Units</dt><dd>{formatInt(attestation.unitCount)}</dd>
          <dt>Drafted</dt><dd>{formatDateTime(attestation.draftedAt)}</dd>
        </dl>
        {blockedReason ? <Alert tone="info">{blockedReason}</Alert> : (
          <>
            <ErrorAlert error={error} />
            <Button onClick={approve} loading={pending}>Approve and issue</Button>
          </>
        )}
      </div>
    </Panel>
  );
}
