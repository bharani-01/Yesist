import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { QrScanner } from '../../components/qr/QrScanner.jsx';
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
        description={`From ${lot.agentName}${lot.hubName ? ` via ${lot.hubName}` : ''} · dispatched ${formatDateTime(lot.dispatchedAt)}`}
        actions={<StatusBadge map={LOT_STATUS} value={lot.status} />}
      />
      <div className="split">
        <div className="stack">
          {lot.receivable && <ReceiveForm lot={lot} onReceived={(r) => { setReceipt(r); onChange(); }} />}
          {!lot.receivable && lot.hubName && ['in_transit', 'at_hub'].includes(lot.status) && (
            <Alert tone="info" title={lot.hubReceivedAt ? 'Waiting at your hub' : 'On its way to your hub'}>
              This lot is routed through {lot.hubName}. You can receive it once the hub ships it to you.
            </Alert>
          )}
          {receipt && (
            <Alert tone={receipt.flags.length ? 'warning' : 'success'} title="Lot received">
              Accepted {formatKg(receipt.acceptedNetKg)} (variance {receipt.variancePct}% against tolerance {receipt.tolerancePct}%).
              {receipt.flags.length > 0 && ` Flags raised for the regulator: ${receipt.flags.map((f) => FLAG_TYPE_LABELS[f]).join(', ')}.`}
              {receipt.missingLabels?.length > 0 && ` Labels not found: ${receipt.missingLabels.map((l) => `…${l}`).join(', ')}.`}
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
          {a?.status === 'draft' && <ApprovePanel attestation={a} onApproved={onChange} />}
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
            {lot.hubName && (
              <>
                <dt>Hub</dt><dd>{lot.hubName}</dd>
                <dt>Hub net</dt><dd>{formatKg(lot.hubNetKg)}</dd>
                <dt>Units at hub</dt><dd>{formatInt(lot.hubUnitCount)}</dd>
              </>
            )}
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
  const viaHub = lot.hubReceivedAt != null;
  const expectedUnits = viaHub ? lot.hubUnitCount : lot.unitCountSent;
  const [form, setForm] = useState({ receiverNetKg: '', unitCountReceived: String(expectedUnits), sealIntact: 'yes' });
  const labelled = lot.labelledUnits ?? [];
  const [labelCheck, setLabelCheck] = useState(labelled.length ? 'scan' : 'skip');
  const [scanned, setScanned] = useState([]);
  const [stray, setStray] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const expected = new Set(labelled.map((u) => u.qrPublicId));
  const missingCount = labelled.length - scanned.length;

  const onScan = (qr) => {
    if (!expected.has(qr)) { setStray(qr); return; }
    setStray(null);
    setScanned((current) => (current.includes(qr) ? current : [...current, qr]));
  };

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { result } = await recyclerApi.receive(lot.id, {
        receiverNetKg: Number(form.receiverNetKg),
        unitCountReceived: Number(form.unitCountReceived),
        sealIntact: form.sealIntact === 'yes',
        ...(labelCheck === 'scan' && { scan: { qrIds: scanned } }),
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
          <TextField label="Receiver net weight (kg)" type="number" step="0.001" min="0.001" required value={form.receiverNetKg} onChange={(e) => setForm({ ...form, receiverNetKg: e.target.value })} hint={viaHub ? `Hub recorded ${formatKg(lot.hubNetKg)}` : `Sender recorded ${formatKg(lot.senderNetKg)}`} />
          <TextField label="Units counted" type="number" min="0" required value={form.unitCountReceived} onChange={(e) => setForm({ ...form, unitCountReceived: e.target.value })} hint={viaHub ? `${expectedUnits} counted at the hub` : `${expectedUnits} sent`} />
        </div>
        <Segmented name="seal" label={`Seal ${lot.sealTag}`} value={form.sealIntact} onChange={(v) => setForm({ ...form, sealIntact: v })} options={[{ value: 'yes', label: 'Intact and matching' }, { value: 'no', label: 'Broken or mismatched' }]} />
        {labelled.length > 0 && (
          <div className="stack stack--sm">
            <Segmented
              name="label-check"
              label={`Manufacturer labels (${labelled.length} in this lot)`}
              value={labelCheck}
              onChange={setLabelCheck}
              options={[{ value: 'scan', label: 'Scan labels now' }, { value: 'skip', label: 'Skip label check' }]}
            />
            {labelCheck === 'scan' ? (
              <>
                <QrScanner label="Scan each labelled device" continuous onScan={onScan} />
                {stray && <Alert tone="warning">Label …{stray.slice(-6)} is not part of this lot. Set the device aside and report it.</Alert>}
                <ul className="chips" aria-label="Labelled units in this lot">
                  {labelled.map((u) => (
                    <li key={u.qrPublicId} className={`chip${scanned.includes(u.qrPublicId) ? ' is-matched' : ''}`} style={{ paddingRight: 10 }}>
                      <span className="mono">…{u.qrPublicId.slice(-6)}</span>
                      {u.brand && <span>{u.brand} {u.modelName}</span>}
                      <span className="subtle">{scanned.includes(u.qrPublicId) ? 'Scanned' : 'Not yet'}</span>
                    </li>
                  ))}
                </ul>
                {missingCount > 0 && (
                  <p className="subtle" role="status">
                    {missingCount} of {labelled.length} still unscanned. Any label not scanned when you record the receipt is reported to the regulator as missing.
                  </p>
                )}
              </>
            ) : (
              <p className="subtle">Without a label check, missing devices cannot be detected for this lot.</p>
            )}
          </div>
        )}
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
      const res = await recyclerApi.draftAttestation(lot.id, { processedKg: Number(form.processedKg), batteryKg: Number(form.batteryKg || 0) });
      const attId = res?.attestation?.id || res?.id;
      if (attId) {
        await recyclerApi.approveAttestation(attId).catch(() => {});
      }
      onDrafted();
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  return (
    <Panel title="Issue recovery attestation">
      <form className="form-grid" onSubmit={submit}>
        <p className="subtle">Processed plus battery weight cannot exceed the accepted {formatKg(lot.acceptedNetKg)}.</p>
        <div className="form-grid form-grid--2">
          <TextField label="Processed weight (kg)" type="number" step="0.001" min="0.001" required value={form.processedKg} onChange={(e) => setForm({ ...form, processedKg: e.target.value })} />
          <TextField label="Battery weight (kg)" type="number" step="0.001" min="0" value={form.batteryKg} onChange={(e) => setForm({ ...form, batteryKg: e.target.value })} hint="Reported separately under battery rules" />
        </div>
        <ErrorAlert error={error} />
        <div className="form-actions"><Button type="submit" loading={pending} disabled={!(Number(form.processedKg) > 0)}>Issue attestation &amp; certificate</Button></div>
      </form>
    </Panel>
  );
}

function ApprovePanel({ attestation, onApproved }) {
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
  return (
    <Panel title="Attestation awaiting sign-off">
      <div className="stack stack--sm">
        <dl className="dl">
          <dt>Processed</dt><dd>{formatKg(attestation.processedKg)}</dd>
          <dt>Batteries</dt><dd>{formatKg(attestation.batteryKg)}</dd>
          <dt>Units</dt><dd>{formatInt(attestation.unitCount)}</dd>
          <dt>Drafted</dt><dd>{formatDateTime(attestation.draftedAt)}</dd>
        </dl>
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button onClick={approve} loading={pending}>Approve and issue certificate</Button>
        </div>
      </div>
    </Panel>
  );
}
