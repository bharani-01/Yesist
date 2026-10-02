import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatDateTime, formatInr, formatKg, WINDOW_LABELS } from '../../lib/format.js';
import { INCENTIVE_STATUS, PICKUP_STATUS, TIMELINE_LABELS } from '../../lib/status.js';
import { HandoverCodePanel } from './components/HandoverCodePanel.jsx';
import { PickupProgress } from './components/PickupProgress.jsx';
import { pickupsApi } from './pickups.api.js';

export function PickupDetailPage() {
  const { id } = useParams();
  const query = useAsync((signal) => pickupsApi.get(id, signal).then((r) => r.pickup), [id]);
  return (
    <div className="page">
      <AsyncView query={query}>{(pickup) => <PickupDetail pickup={pickup} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function PickupDetail({ pickup, onChange }) {
  const canCancel = pickup.status === 'requested' || pickup.status === 'scheduled';
  return (
    <>
      <PageHeader
        back={{ to: '/pickups', label: 'My pickups' }}
        title={`Pickup ${pickup.reference}`}
        description={`${pickup.wardName} · booked ${formatDate(pickup.createdAt)}`}
        actions={<StatusBadge map={PICKUP_STATUS} value={pickup.status} />}
      />
      <PickupProgress status={pickup.status} />

      <div className="split">
        <div className="stack">
          {pickup.status === 'requested' && (
            <Alert tone="info">Waiting for a local Kabadi Wala in {pickup.wardName} to accept. You’ll see their name and time here.</Alert>
          )}
          {pickup.status === 'cancelled' && <Alert tone="warning" title="Cancelled">{pickup.cancelReason}</Alert>}
          {pickup.attestation && (
            <Alert tone="success" title="Responsibly Recycled">
              Your device has been recycled on {formatDate(pickup.attestation.issuedAt)}.
              {' '}
              <Link to={`/devices/${pickup.items?.[0]?.qrPublicId ?? ''}/certificate`} style={{ fontWeight: 600 }}>View Recycling Certificate →</Link>
            </Alert>
          )}

          <Panel title="Items" flush>
            <table className="table">
              <thead><tr><th>Item</th><th className="num">Booked</th><th className="num">Collected</th></tr></thead>
              <tbody>
                {pickup.items.map((i) => (
                  <tr key={i.id}>
                    <td>
                      {i.name}
                      {i.refusedReason && <div className="subtle">Not collected: {i.refusedReason}</div>}
                      {i.batteryCheck === 'swollen_or_damaged_refused' && <div className="subtle">Refused: damaged battery</div>}
                    </td>
                    <td className="num">{i.quantity}</td>
                    <td className="num">{i.collectedQuantity ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Timeline">
            <ol className="timeline">
              {pickup.timeline.map((t, idx) => (
                <li key={idx} className="timeline__item">
                  <span className="timeline__dot" aria-hidden="true" />
                  <div>
                    <div style={{ fontWeight: 600 }}>{TIMELINE_LABELS[t.type] ?? t.type}</div>
                    <div className="subtle">
                      {formatDateTime(t.at)}
                      {t.detail.netKg != null && ` · ${formatKg(t.detail.netKg)}`}
                      {t.detail.reason && ` · ${t.detail.reason}`}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="stack">
          {pickup.status === 'scheduled' && (
            <HandoverCodePanel pickupId={pickup.id} lastExpiresAt={pickup.handoverCodeExpiresAt} onIssued={onChange} />
          )}

          <Panel title="Details">
            <dl className="dl">
              <dt>Kabadi Wala</dt><dd>{pickup.agentName ?? 'Not assigned yet'}</dd>
              <dt>Recycler</dt><dd>{pickup.recyclerName ?? '—'}</dd>
              <dt>{pickup.scheduledFor ? 'Scheduled' : 'Preferred'}</dt>
              <dd>{formatDate(pickup.scheduledFor ?? pickup.preferredDate)} · {WINDOW_LABELS[pickup.scheduledWindow ?? pickup.preferredWindow]}</dd>
              <dt>Address</dt><dd>{pickup.address?.addressLine}{pickup.address?.landmark ? `, ${pickup.address.landmark}` : ''}</dd>
              {pickup.collectedNetKg && (<><dt>Weight</dt><dd>{formatKg(pickup.collectedNetKg)}</dd></>)}
              {pickup.materialPaidAmount && (<><dt>Price paid</dt><dd>{formatInr(pickup.materialPaidAmount)}</dd></>)}
            </dl>
          </Panel>

          {pickup.incentive && (
            <Panel title="Scheme incentive">
              <div className="stack stack--sm">
                <div className="row row--between">
                  <span style={{ fontSize: 'var(--text-xl)', fontWeight: 650 }}>{formatInr(pickup.incentive.amount)}</span>
                  <StatusBadge map={INCENTIVE_STATUS} value={pickup.incentive.status} />
                </div>
                <p className="subtle">
                  For {pickup.incentive.eligibleUnits} data-bearing device{pickup.incentive.eligibleUnits === 1 ? '' : 's'}.
                  {pickup.incentive.status === 'held' && ' Held because the monthly limit of paid pickups was reached; the programme team will review it.'}
                </p>
              </div>
            </Panel>
          )}

          {canCancel && <CancelPanel pickupId={pickup.id} onCancelled={onChange} />}
        </div>
      </div>
    </>
  );
}

function CancelPanel({ pickupId, onCancelled }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return <Button variant="danger" onClick={() => setOpen(true)}>Cancel pickup</Button>;

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await pickupsApi.cancel(pickupId, reason);
      onCancelled();
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };

  return (
    <Panel title="Cancel this pickup?">
      <form className="form-grid" onSubmit={submit}>
        <TextField label="Reason" required minLength={3} value={reason} onChange={(e) => setReason(e.target.value)} hint="Helps us improve collection in your ward" />
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button variant="ghost" onClick={() => setOpen(false)}>Keep pickup</Button>
          <Button type="submit" variant="danger" loading={pending} disabled={reason.trim().length < 3}>Cancel pickup</Button>
        </div>
      </form>
    </Panel>
  );
}
