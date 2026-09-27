import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../../components/ui/Alert.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { TextField } from '../../../components/ui/Field.jsx';
import { Panel } from '../../../components/ui/Panel.jsx';
import { useAsync } from '../../../hooks/useAsync.js';
import { formatDate, formatDateTime, formatKg, relativeFromNow } from '../../../lib/format.js';
import { LOT_STATUS } from '../../../lib/status.js';
import { agentApi } from '../agent.api.js';

export function LotsPanel({ collectedJobs, onChanged }) {
  const lots = useAsync((s) => agentApi.lots(s).then((r) => r.lots), []);
  const [notice, setNotice] = useState(null);
  const onCreated = (lot) => {
    setNotice(<>Lot <span className="mono">{lot.sealTag}</span> sealed. Dispatch it below once it is weighed.</>);
    lots.refresh();
    onChanged();
  };
  const onDispatched = (lot) => {
    setNotice(<>Lot <span className="mono">{lot.sealTag}</span> dispatched. Your recycler will confirm the seal and weight on arrival.</>);
    lots.refresh();
  };
  return (
    <div className="stack">
      {notice && <Alert tone="success">{notice}</Alert>}
      <CreateLotForm jobs={collectedJobs} onCreated={onCreated} />
      <Panel title="Your lots" flush>
        <AsyncView query={lots} isEmpty={(d) => !d.length} empty={<EmptyState title="No lots yet" text="Seal collected pickups into a lot with a numbered tamper-evident tag, then dispatch it to your recycler." />}>
          {(rows) => (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Seal tag</th><th>Status</th><th className="num">Pickups</th><th className="num">Units</th><th className="num">Sent</th><th>Deadline or attestation</th><th /></tr>
                </thead>
                <tbody>
                  {rows.map((l) => (
                    <tr key={l.id}>
                      <td className="mono">{l.sealTag}</td>
                      <td><StatusBadge map={LOT_STATUS} value={l.status} /></td>
                      <td className="num">{l.pickupCount}</td>
                      <td className="num">{l.unitCountSent}</td>
                      <td className="num">{formatKg(l.senderNetKg)}</td>
                      <td>
                        {l.status === 'sealed' || l.status === 'in_transit'
                          ? <span title={formatDateTime(l.storageDeadline)}>{formatDate(l.storageDeadline)} <span className="subtle">({relativeFromNow(l.storageDeadline)})</span></span>
                          : l.attestationNumber ? <Link to={`/verify/${l.attestationNumber}`} className="mono">{l.attestationNumber}</Link> : '—'}
                      </td>
                      <td>{l.status === 'sealed' && <DispatchForm lot={l} onDone={onDispatched} />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AsyncView>
      </Panel>
    </div>
  );
}

function CreateLotForm({ jobs, onCreated }) {
  const [selected, setSelected] = useState(() => new Set());
  const [sealTag, setSealTag] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  if (!jobs.length) return null;

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { lot } = await agentApi.createLot({ sealTag, pickupIds: [...selected] });
      setSelected(new Set());
      setSealTag('');
      onCreated(lot);
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <Panel title="Seal a new lot">
      <form className="form-grid" onSubmit={submit}>
        <fieldset className="stack stack--sm" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field__label" style={{ marginBottom: 6 }}>Collected pickups ({jobs.length})</legend>
          {jobs.map((j) => (
            <label key={j.id} className="checkbox">
              <input type="checkbox" checked={selected.has(j.id)} onChange={() => toggle(j.id)} />
              <span><span className="mono">{j.reference}</span> · {j.items.map((i) => `${i.collectedQuantity ?? 0} × ${i.name}`).join(', ')} · {formatKg(j.collectedNetKg)}</span>
            </label>
          ))}
        </fieldset>
        <TextField label="Seal tag number" value={sealTag} onChange={(e) => setSealTag(e.target.value.toUpperCase())} hint="As printed on the tamper-evident tag (6–30 letters, digits, dashes)" />
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={!selected.size || sealTag.trim().length < 6}>Seal lot ({selected.size})</Button>
        </div>
      </form>
    </Panel>
  );
}

function DispatchForm({ lot, onDone }) {
  const [kg, setKg] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await agentApi.dispatchLot(lot.id, { senderNetKg: Number(kg) });
      onDone(lot);
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  return (
    <form className="row" onSubmit={submit} style={{ flexWrap: 'nowrap' }}>
      <input className="input" style={{ width: 110, minHeight: 32 }} type="number" step="0.001" min="0.001" placeholder="Net kg" aria-label="Net weight at loading (kg)" value={kg} onChange={(e) => setKg(e.target.value)} />
      <Button type="submit" size="sm" loading={pending} disabled={!(Number(kg) > 0)}>Dispatch</Button>
      {error && <span className="field__error" role="alert">{error.message}</span>}
    </form>
  );
}
