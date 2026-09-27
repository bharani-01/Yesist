import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime, formatInt, formatKg } from '../../lib/format.js';
import { SHIPMENT_STATUS } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { LotPicker } from './components/LotPicker.jsx';
import { canWorkAtHub, hubApi, loadableLots, toggleIn } from './hub.api.js';

export function ShipmentsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const shipments = useAsync((s) => hubApi.shipments(s), []);
  return (
    <div className="page">
      <PageHeader title="Shipments" description="Consolidated loads from your hub to the recycler. Each lot keeps its own seal and is weighed again at the recycler gate." />
      {canWorkAtHub(user) && <NewShipment onCreated={(s) => navigate(`/hub/shipments/${s.id}`)} />}
      <Panel title="All shipments" flush>
        <AsyncView query={shipments} isEmpty={(d) => !d.length} empty={<EmptyState title="No shipments yet" text="Start one from the lots waiting at your hub." />}>
          {(rows) => (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Reference</th><th>Status</th><th>To</th><th className="num">Lots</th><th className="num">Units</th><th className="num">Hub kg</th><th>Vehicle</th><th>Dispatched</th></tr>
                </thead>
                <tbody>
                  {rows.map((s) => (
                    <tr key={s.id} className="is-clickable" onClick={() => navigate(`/hub/shipments/${s.id}`)}>
                      <td><Link className="mono" to={`/hub/shipments/${s.id}`} onClick={(e) => e.stopPropagation()}>{s.reference}</Link></td>
                      <td><StatusBadge map={SHIPMENT_STATUS} value={s.status} /></td>
                      <td>{s.recyclerName}</td>
                      <td className="num">{formatInt(s.lotCount)}</td>
                      <td className="num">{formatInt(s.units)}</td>
                      <td className="num">{formatKg(s.netKg)}</td>
                      <td>{s.vehicleRef ?? '—'}</td>
                      <td>{formatDateTime(s.dispatchedAt)}</td>
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

function NewShipment({ onCreated }) {
  const lots = useAsync((s) => loadableLots(s), []);
  const [selected, setSelected] = useState(() => new Set());
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  if (!lots.data?.length) return null;

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { shipment } = await hubApi.createShipment({ lotIds: [...selected] });
      onCreated(shipment);
    } catch (err) {
      setError(err);
      setPending(false);
      lots.refresh();
    }
  };

  return (
    <Panel title="Start a shipment">
      <form className="form-grid" onSubmit={submit}>
        <LotPicker lots={lots.data} selected={selected} onToggle={(id) => setSelected(toggleIn(selected, id))} legend={`Lots waiting at your hub (${lots.data.length})`} />
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={!selected.size}>Start shipment ({selected.size})</Button>
        </div>
      </form>
    </Panel>
  );
}
