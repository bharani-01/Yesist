import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { SelectField, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatInt } from '../../lib/format.js';
import { BATCH_STATUS } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { INDIAN_STATES, producerApi, producerRole, STAFF } from './producer.api.js';

export const monthLabel = (ym) => new Date(`${ym}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

export function BatchesPage() {
  const { user } = useAuth();
  const canWork = STAFF.work.includes(producerRole(user));
  const batches = useAsync((s) => producerApi.batches(s), []);

  return (
    <div className="page">
      <PageHeader title="Placed-on-market batches" description="Batches you report for EPR compliance. Units are registered into a draft batch, then an approver places it on the market." />
      <div className="split">
        <Panel title="Batches" flush>
          <AsyncView query={batches} isEmpty={(d) => !d.length} empty={<EmptyState title="No batches yet" text="Create a batch for a registered model, then upload its units." />}>
            {(rows) => (
              <ul className="list">
                {rows.map((b) => (
                  <li key={b.id}>
                    <Link to={`/producer/batches/${b.id}`} className="list__item list__item--link">
                      <div className="list__main">
                        <span className="list__title">{b.brand} {b.modelName}</span>
                        <span className="list__meta">
                          <span className="mono">{b.batchRef}</span>
                          <span>{monthLabel(b.marketMonth)} · {b.stateCode}</span>
                          <span>{formatInt(b.registeredUnits)} of {formatInt(b.quantity)} units registered</span>
                        </span>
                      </div>
                      <StatusBadge map={BATCH_STATUS} value={b.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </AsyncView>
        </Panel>
        {canWork
          ? <CreateBatchForm />
          : <Alert tone="info">Only an owner or operator can create batches. Approvers place draft batches on the market from the batch page.</Alert>}
      </div>
    </div>
  );
}

const currentMonth = () => new Date().toLocaleDateString('en-CA').slice(0, 7);

function CreateBatchForm() {
  const navigate = useNavigate();
  const models = useAsync((s) => producerApi.models(s), []);
  const [form, setForm] = useState({ modelId: '', batchRef: '', marketMonth: currentMonth(), stateCode: 'MP', quantity: '' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const fieldErrors = error?.fieldErrors?.() ?? {};

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const batch = await producerApi.createBatch({ ...form, batchRef: form.batchRef.trim(), quantity: Number(form.quantity) });
      navigate(`/producer/batches/${batch.id}`);
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };

  if (models.status === 'success' && !models.data.length) {
    return (
      <Panel title="Create a batch">
        <EmptyState title="Register a model first" text="Batches belong to a product model." action={<Link to="/producer/models" className="btn btn--primary">Register a model</Link>} />
      </Panel>
    );
  }

  return (
    <Panel title="Create a batch">
      <form className="form-grid" onSubmit={submit}>
        <SelectField label="Model" required value={form.modelId} onChange={set('modelId')} disabled={!models.data} error={fieldErrors.modelId}>
          <option value="" disabled>{models.status === 'error' ? 'Models unavailable' : 'Choose a model'}</option>
          {models.data?.map((m) => <option key={m.id} value={m.id}>{m.brand} {m.modelName}</option>)}
        </SelectField>
        <TextField label="Batch reference" required value={form.batchRef} onChange={set('batchRef')} error={fieldErrors.batchRef} hint="As in your EPR return, e.g. INV-2026-0914" />
        <div className="form-grid form-grid--2">
          <TextField label="Month placed on market" type="month" required value={form.marketMonth} onChange={set('marketMonth')} error={fieldErrors.marketMonth} />
          <TextField label="Units in batch" type="number" min="1" max="1000000" required value={form.quantity} onChange={set('quantity')} error={fieldErrors.quantity} />
        </div>
        <SelectField label="State of sale" value={form.stateCode} onChange={set('stateCode')} error={fieldErrors.stateCode}>
          {INDIAN_STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
        </SelectField>
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={!form.modelId || form.batchRef.trim().length < 2 || !(Number(form.quantity) >= 1)}>Create draft batch</Button>
        </div>
      </form>
    </Panel>
  );
}
