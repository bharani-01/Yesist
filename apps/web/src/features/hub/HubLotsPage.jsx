import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Segmented } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatDateTime, formatKg, relativeFromNow } from '../../lib/format.js';
import { HUB_STAGE } from '../../lib/status.js';
import { hubApi } from './hub.api.js';

const FILTERS = [
  { value: 'open', label: 'Needs action' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];
const IN_FILTER = {
  open: ['inbound', 'at_hub'],
  shipped: ['shipped'],
  delivered: ['delivered'],
};
const EMPTY = {
  open: { title: 'Nothing waiting', text: 'Lots an agent sends to your hub appear here as soon as they are dispatched.' },
  shipped: { title: 'No lots on the road', text: 'Lots appear here once their shipment leaves for the recycler.' },
  delivered: { title: 'No deliveries yet', text: 'Lots the recycler has received from your shipments appear here.' },
};

export function HubLotsPage() {
  const navigate = useNavigate();
  const query = useAsync((s) => hubApi.lots(s), []);
  const [filter, setFilter] = useState('open');
  const count = (f) => query.data?.filter((l) => IN_FILTER[f].includes(l.stage)).length ?? 0;

  return (
    <div className="page">
      <PageHeader title="Lots" description="Sealed lots routed through your hub. Weigh each one on arrival, then load it on a shipment to the recycler." />
      <Segmented
        name="hub-lot-filter"
        value={filter}
        onChange={setFilter}
        options={FILTERS.map((f) => ({ ...f, label: query.data ? `${f.label} (${count(f.value)})` : f.label }))}
      />
      <Panel flush>
        <AsyncView
          query={query}
          isEmpty={(d) => !d.some((l) => IN_FILTER[filter].includes(l.stage))}
          empty={<EmptyState title={EMPTY[filter].title} text={EMPTY[filter].text} />}
        >
          {(lots) => (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Seal tag</th><th>From</th><th>Stage</th><th className="num">Units</th>
                    <th className="num">Sender kg</th><th className="num">Hub kg</th><th>Storage deadline</th><th>Shipment</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.filter((l) => IN_FILTER[filter].includes(l.stage)).map((l) => (
                    <tr key={l.id} className="is-clickable" onClick={() => navigate(`/hub/lots/${l.id}`)}>
                      <td><Link className="mono" to={`/hub/lots/${l.id}`} onClick={(e) => e.stopPropagation()}>{l.sealTag}</Link></td>
                      <td>{l.agentName}</td>
                      <td><StatusBadge map={HUB_STAGE} value={l.stage} /></td>
                      <td className="num">{l.hubUnitCount ?? l.unitCountSent}</td>
                      <td className="num">{formatKg(l.senderNetKg)}</td>
                      <td className="num">{formatKg(l.hubNetKg)}</td>
                      <td>
                        {l.stage === 'delivered'
                          ? '—'
                          : <span title={formatDateTime(l.storageDeadline)}>{formatDate(l.storageDeadline)} <span className="subtle">({relativeFromNow(l.storageDeadline)})</span></span>}
                      </td>
                      <td>{l.shipmentReference ? <span className="mono">{l.shipmentReference}</span> : '—'}</td>
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
