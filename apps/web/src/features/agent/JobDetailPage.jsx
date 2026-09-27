import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Segmented, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { addDaysIso, formatDate, formatInr, formatKg, todayIso, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { agentApi } from './agent.api.js';
import { CollectForm } from './components/CollectForm.jsx';

const WINDOW_OPTIONS = Object.entries(WINDOW_LABELS).map(([value, label]) => ({ value, label }));

export function JobDetailPage() {
  const { id } = useParams();
  const query = useAsync((s) => agentApi.job(id, s).then((r) => r.job), [id]);
  return (
    <div className="page">
      <AsyncView query={query}>{(job) => <JobDetail job={job} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function JobDetail({ job, onChange }) {
  const [collectResult, setCollectResult] = useState(null);
  return (
    <>
      <PageHeader
        back={{ to: job.isMine ? '/agent?tab=mine' : '/agent', label: 'Jobs' }}
        title={`Pickup ${job.reference}`}
        description={`${job.wardName} · requested for ${formatDate(job.preferredDate)}, ${WINDOW_LABELS[job.preferredWindow]}`}
        actions={<StatusBadge map={PICKUP_STATUS} value={job.status} />}
      />
      <div className="split">
        <div className="stack">
          {job.status === 'requested' && !job.isMine && <AcceptForm job={job} onAccepted={onChange} />}
          {job.status === 'scheduled' && job.isMine && (
            <CollectForm job={job} onCollected={(r) => { setCollectResult(r); onChange(); }} />
          )}
          {job.status === 'collected' && job.isMine && (
            <Alert tone="success" title="Collected">
              {formatKg(job.collectedNetKg)} collected, {formatInr(job.materialPaidAmount)} paid.
              {collectResult?.incentive && ` Customer incentive ${formatInr(collectResult.incentive.amount)} (${collectResult.incentive.status}).`}
              {collectResult?.duplicates > 0 && ` ${collectResult.duplicates} device(s) were already in the custody chain and have been flagged for review.`}
              {' '}Add it to a sealed lot from the Lots tab.
            </Alert>
          )}
          <Panel title="Items" flush>
            <table className="table">
              <thead><tr><th>Item</th><th className="num">Booked</th><th className="num">Collected</th></tr></thead>
              <tbody>
                {job.items.map((i) => (
                  <tr key={i.id}>
                    <td>{i.name}{i.dataBearing && <span className="subtle"> · data-bearing</span>}</td>
                    <td className="num">{i.quantity}</td>
                    <td className="num">{i.collectedQuantity ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
        <div className="stack">
          <Panel title="Customer">
            {job.address ? (
              <dl className="dl">
                <dt>Name</dt><dd>{job.address.contactName}</dd>
                <dt>Mobile</dt><dd><a href={`tel:+91${job.address.contactPhone}`}>{job.address.contactPhone}</a></dd>
                <dt>Address</dt><dd>{job.address.addressLine}</dd>
                {job.address.landmark && (<><dt>Landmark</dt><dd>{job.address.landmark}</dd></>)}
                {job.scheduledFor && (<><dt>Visit</dt><dd>{formatDate(job.scheduledFor)} · {WINDOW_LABELS[job.scheduledWindow]}</dd></>)}
              </dl>
            ) : (
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>The address and contact are shared once you accept the pickup.</p>
            )}
          </Panel>
          {job.rates.length > 0 && (
            <Panel title="Recycler rate card">
              <dl className="dl">
                {job.items.map((i) => {
                  const r = job.rates.find((x) => x.categoryCode === i.categoryCode);
                  return (
                    <div key={i.id} style={{ display: 'contents' }}>
                      <dt>{i.name}</dt>
                      <dd>{r ? (r.pricePerUnit != null ? `${formatInr(r.pricePerUnit)} each` : `${formatInr(r.pricePerKg)}/kg`) : 'No rate'}</dd>
                    </div>
                  );
                })}
              </dl>
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}

function AcceptForm({ job, onAccepted }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    scheduledFor: job.preferredDate < todayIso() ? todayIso() : job.preferredDate,
    scheduledWindow: job.preferredWindow,
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await agentApi.accept(job.id, form);
      onAccepted();
    } catch (err) {
      setError(err);
      setPending(false);
      if (err.code === 'not_available') setTimeout(() => navigate('/agent'), 1500);
    }
  };
  return (
    <Panel title="Accept and schedule">
      <form className="form-grid" onSubmit={submit}>
        <TextField label="Visit date" type="date" min={todayIso()} max={addDaysIso(30)} value={form.scheduledFor} onChange={(e) => setForm({ ...form, scheduledFor: e.target.value })} />
        <Segmented name="window" label="Time window" value={form.scheduledWindow} onChange={(v) => setForm({ ...form, scheduledWindow: v })} options={WINDOW_OPTIONS} />
        <ErrorAlert error={error} />
        <div className="form-actions"><Button type="submit" loading={pending}>Accept pickup</Button></div>
      </form>
    </Panel>
  );
}
