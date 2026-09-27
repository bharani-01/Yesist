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
import { formatDateTime, formatInt, formatKg } from '../../lib/format.js';
import { HUB_STAGE, SHIPMENT_STATUS } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { LotPicker } from './components/LotPicker.jsx';
import { canWorkAtHub, hubApi, loadableLots, toggleIn } from './hub.api.js';

export function ShipmentDetailPage() {
  const { id } = useParams();
  const query = useAsync((s) => hubApi.shipment(id, s), [id]);
  return (
    <div className="page">
      <AsyncView query={query}>{(shipment) => <Shipment shipment={shipment} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function Shipment({ shipment, onChange }) {
  const { user } = useAuth();
  const loading = shipment.status === 'loading' && canWorkAtHub(user);
  return (
    <>
      <PageHeader
        back={{ to: '/hub/shipments', label: 'Shipments' }}
        title={<>Shipment <span className="mono">{shipment.reference}</span></>}
        description={`To ${shipment.recyclerName} · started ${formatDateTime(shipment.createdAt)}`}
        actions={<StatusBadge map={SHIPMENT_STATUS} value={shipment.status} />}
      />
      <div className="split">
        <div className="stack">
          {loading && <DispatchForm shipment={shipment} onDispatched={onChange} />}
          {loading && <AddLots shipment={shipment} onAdded={onChange} />}
          {shipment.status === 'in_transit' && (
            <Alert tone="info" title="On the road">The recycler weighs each lot at its gate against your hub reading.</Alert>
          )}
          <Panel title="Lots on this shipment" flush>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Seal tag</th><th>From</th><th>Stage</th><th className="num">Units</th><th className="num">Hub kg</th></tr></thead>
                <tbody>
                  {shipment.lots.map((l) => (
                    <tr key={l.id}>
                      <td><Link className="mono" to={`/hub/lots/${l.id}`}>{l.sealTag}</Link></td>
                      <td>{l.agentName}</td>
                      <td><StatusBadge map={HUB_STAGE} value={l.stage} /></td>
                      <td className="num">{formatInt(l.hubUnitCount)}</td>
                      <td className="num">{formatKg(l.hubNetKg)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel title="Summary">
          <dl className="dl">
            <dt>Recycler</dt><dd>{shipment.recyclerName}</dd>
            <dt>Lots</dt><dd>{formatInt(shipment.lotCount)}</dd>
            <dt>Units</dt><dd>{formatInt(shipment.units)}</dd>
            <dt>Hub net</dt><dd>{formatKg(shipment.netKg)}</dd>
            <dt>Vehicle</dt><dd>{shipment.vehicleRef ?? '—'}</dd>
            <dt>Dispatched</dt><dd>{formatDateTime(shipment.dispatchedAt)}</dd>
            <dt>Received</dt><dd>{formatDateTime(shipment.receivedAt)}</dd>
          </dl>
        </Panel>
      </div>
    </>
  );
}

function DispatchForm({ shipment, onDispatched }) {
  const [vehicleRef, setVehicleRef] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await hubApi.dispatchShipment(shipment.id, { vehicleRef: vehicleRef.trim() });
      onDispatched();
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  return (
    <Panel title="Dispatch">
      <form className="form-grid" onSubmit={submit}>
        <TextField label="Vehicle registration" value={vehicleRef} onChange={(e) => setVehicleRef(e.target.value.toUpperCase())} hint="As on the number plate, for example MP09 AB 1234" maxLength={40} />
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={vehicleRef.trim().length < 2}>Dispatch {formatInt(shipment.lotCount)} lot{shipment.lotCount === 1 ? '' : 's'}</Button>
        </div>
      </form>
    </Panel>
  );
}

function AddLots({ shipment, onAdded }) {
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
      await hubApi.addLots(shipment.id, { lotIds: [...selected] });
      setSelected(new Set());
      lots.refresh();
      onAdded();
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };
  return (
    <Panel title="Add lots">
      <form className="form-grid" onSubmit={submit}>
        <LotPicker lots={lots.data} selected={selected} onToggle={(id) => setSelected(toggleIn(selected, id))} legend={`Also waiting at your hub (${lots.data.length})`} />
        <ErrorAlert error={error} />
        <div className="form-actions"><Button type="submit" variant="secondary" loading={pending} disabled={!selected.size}>Add to shipment ({selected.size})</Button></div>
      </form>
    </Panel>
  );
}
