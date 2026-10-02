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

function generateBagTag() {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BAG-${rand}`;
}

export function LotsPanel({ collectedJobs, onChanged }) {
  const lots = useAsync((s) => agentApi.lots(s).then((r) => r.lots), []);
  const destinations = useAsync((s) => agentApi.destinations(s), []);
  const hubs = destinations.data?.hubs ?? [];
  const [notice, setNotice] = useState(null);
  const onCreated = (lot) => {
    setNotice(<>Bag <span className="mono">{lot.sealTag}</span> packed &amp; sealed. Dispatch it below once it is weighed.</>);
    lots.refresh();
    onChanged();
  };
  const onDispatched = (lot, hub) => {
    setNotice(<>Bag <span className="mono">{lot.sealTag}</span> dispatched{hub ? ` to ${hub.name}` : ''}. {hub ? 'The hub' : 'Your recycler'} will confirm on arrival.</>);
    lots.refresh();
  };
  return (
    <div className="stack">
      {notice && <Alert tone="success">{notice}</Alert>}
      <CreateLotForm jobs={collectedJobs} onCreated={onCreated} />
      <Panel title="Your Packed Bags &amp; Dispatches" flush>
        <AsyncView query={lots} isEmpty={(d) => !d.length} empty={<EmptyState title="No packed bags yet" text="Pack collected pickups into a bag or box with a tag number, then dispatch it to your recycler." />}>
          {(rows) => (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Bag Tag</th><th>Status</th><th>Destination</th><th className="num">Pickups</th><th className="num">Units</th><th className="num">Sent</th><th>Deadline or attestation</th><th /></tr>
                </thead>
                <tbody>
                  {rows.map((l) => (
                    <tr key={l.id}>
                      <td className="mono">{l.sealTag}</td>
                      <td><StatusBadge map={LOT_STATUS} value={l.status} /></td>
                      <td>{l.status === 'sealed' ? '—' : l.hubName ? <>{l.hubName}<div className="subtle">Hub, then {l.recyclerName}</div></> : l.recyclerName}</td>
                      <td className="num">{l.pickupCount}</td>
                      <td className="num">{l.unitCountSent}</td>
                      <td className="num">{formatKg(l.senderNetKg)}</td>
                      <td>
                        {['sealed', 'in_transit', 'at_hub'].includes(l.status)
                          ? <span title={formatDateTime(l.storageDeadline)}>{formatDate(l.storageDeadline)} <span className="subtle">({relativeFromNow(l.storageDeadline)})</span></span>
                          : l.attestationNumber ? <Link to={`/verify/${l.attestationNumber}`} className="mono">{l.attestationNumber}</Link> : '—'}
                      </td>
                      <td>{l.status === 'sealed' && <DispatchForm lot={l} recyclerName={l.recyclerName} hubs={hubs} onDone={onDispatched} />}</td>
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
  const [sealTag, setSealTag] = useState(() => generateBagTag());
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
      let cleanTag = (sealTag || generateBagTag()).trim().toUpperCase().replace(/[^A-Z0-9-]/g, '-');
      // If user typed a short number/tag (e.g. "1" or "BAG1"), pad to BAG-001 so DB constraint (>= 6 chars) passes
      if (cleanTag.length < 6) {
        cleanTag = `BAG-${cleanTag.replace(/^BAG-?/i, '').padStart(3, '0')}`;
      }
      const { lot } = await agentApi.createLot({ sealTag: cleanTag, pickupIds: [...selected] });
      setSelected(new Set());
      setSealTag(generateBagTag());
      onCreated(lot);
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <Panel title="Pack &amp; Seal a Bag / Lot">
      <form className="form-grid" onSubmit={submit}>
        <fieldset className="stack stack--sm" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field__label" style={{ marginBottom: 6 }}>Collected pickups to pack ({jobs.length})</legend>
          {jobs.map((j) => (
            <label key={j.id} className="checkbox">
              <input type="checkbox" checked={selected.has(j.id)} onChange={() => toggle(j.id)} />
              <span><span className="mono">{j.reference}</span> · {j.items.map((i) => `${i.collectedQuantity ?? 0} × ${i.name}`).join(', ')} · {formatKg(j.collectedNetKg)}</span>
            </label>
          ))}
        </fieldset>
        
        <div className="field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label className="field__label" style={{ margin: 0 }}>Bag / Box Tag Number</label>
            <button 
              type="button" 
              onClick={() => setSealTag(generateBagTag())}
              className="btn btn--ghost btn--sm tap-effect" 
              style={{ fontSize: '12px', height: '28px', padding: '0 8px', color: 'var(--color-primary, #16a34a)', fontWeight: 600 }}
            >
              Generate New Tag
            </button>
          </div>
          <input 
            type="text" 
            className="input mono" 
            value={sealTag} 
            onChange={(e) => setSealTag(e.target.value.toUpperCase())} 
            placeholder="e.g. BAG-01 or use generated tag"
          />
          <span className="field__hint">
            Tag or marker number written on your bag/box (auto-generated for you, or type your own marker).
          </span>
        </div>

        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={!selected.size || !sealTag.trim()}>Pack &amp; Seal Bag ({selected.size})</Button>
        </div>
      </form>
    </Panel>
  );
}

function DispatchForm({ lot, recyclerName, hubs, onDone }) {
  const [kg, setKg] = useState('');
  const [hubId, setHubId] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await agentApi.dispatchLot(lot.id, { senderNetKg: Number(kg), ...(hubId && { hubOrgId: hubId }) });
      onDone(lot, hubs.find((h) => h.id === hubId));
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  return (
    <form className="row" onSubmit={submit} style={{ flexWrap: 'nowrap' }}>
      {hubs.length > 0 && (
        <select className="select" style={{ minHeight: 32, width: 'auto' }} aria-label={`Destination for lot ${lot.sealTag}`} value={hubId} onChange={(e) => setHubId(e.target.value)}>
          <option value="">Direct to {recyclerName}</option>
          {hubs.map((h) => <option key={h.id} value={h.id}>Via hub: {h.name}</option>)}
        </select>
      )}
      <input className="input" style={{ width: 110, minHeight: 32 }} type="number" step="0.001" min="0.001" placeholder="Net kg" aria-label="Net weight at loading (kg)" value={kg} onChange={(e) => setKg(e.target.value)} />
      <Button type="submit" size="sm" loading={pending} disabled={!(Number(kg) > 0)}>Dispatch</Button>
      {error && <span className="field__error" role="alert">{error.message}</span>}
    </form>
  );
}
