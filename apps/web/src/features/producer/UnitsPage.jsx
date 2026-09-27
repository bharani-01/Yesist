import { Link, useSearchParams } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { SelectField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime } from '../../lib/format.js';
import { UNIT_STATE } from '../../lib/status.js';
import { producerApi } from './producer.api.js';

const ID_TYPE = { imei: 'IMEI', serial: 'Serial', qr: 'QR only' };

export function UnitsPage() {
  const [params, setParams] = useSearchParams();
  const state = params.get('state') ?? '';
  const batchId = params.get('batchId') ?? '';
  const units = useAsync((s) => producerApi.units({ state, batchId }, s), [state, batchId]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <div className="page">
      <PageHeader title="Units" description="The latest 300 units matching the filter, with their current stage. Custody partners are not identified." />
      <div className="row">
        <SelectField label="Stage" value={state} onChange={(e) => setFilter('state', e.target.value)}>
          <option value="">All stages</option>
          {Object.entries(UNIT_STATE).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
        </SelectField>
        {batchId && <button type="button" className="btn btn--ghost btn--sm" style={{ alignSelf: 'end' }} onClick={() => setFilter('batchId', '')}>Clear batch filter</button>}
      </div>
      <Panel flush>
        <AsyncView query={units} isEmpty={(d) => !d.length} empty={<EmptyState title="No units match" text="Try a different stage, or register units into a batch." />}>
          {(rows) => (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Unit</th><th>Model</th><th>Batch</th><th>Stage</th><th>Updated</th><th>Attestation</th></tr></thead>
                <tbody>
                  {rows.map((u) => (
                    <tr key={u.id}>
                      <td><span className="mono">{u.qrPublicId}</span><div className="subtle">{ID_TYPE[u.identifierType]} ···{u.last4}</div></td>
                      <td>{u.brand} {u.modelName}</td>
                      <td><Link to={`/producer/batches/${u.batchId}`} className="mono">{u.batchRef}</Link></td>
                      <td><StatusBadge map={UNIT_STATE} value={u.state} /></td>
                      <td>{formatDateTime(u.updatedAt)}</td>
                      <td>{u.attestationNumber ? <Link to={`/verify/${u.attestationNumber}`} className="mono">{u.attestationNumber}</Link> : '—'}</td>
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
