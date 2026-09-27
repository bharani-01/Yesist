import { Link, useNavigate } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Badge, StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime, formatKg } from '../../lib/format.js';
import { LOT_STATUS } from '../../lib/status.js';
import { recyclerApi } from './recycler.api.js';

export function InboundLotsPage() {
  const navigate = useNavigate();
  const query = useAsync((s) => recyclerApi.lots(s).then((r) => r.lots), []);
  return (
    <div className="page">
      <PageHeader title="Inbound lots" description="Receive sealed lots from your agents, check weight and seal, and issue custody attestations." />
      <Panel flush>
        <AsyncView query={query} isEmpty={(d) => !d.length} empty={<EmptyState title="No lots dispatched to you yet" text="Lots appear here as soon as an agent dispatches them." />}>
          {(lots) => (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Seal tag</th><th>Agent</th><th>Status</th><th className="num">Units sent</th><th className="num">Sender kg</th><th className="num">Accepted kg</th><th>Dispatched</th><th>Attestation</th></tr>
                </thead>
                <tbody>
                  {lots.map((l) => (
                    <tr key={l.id} className="is-clickable" onClick={() => navigate(`/recycler/lots/${l.id}`)}>
                      <td><Link className="mono" to={`/recycler/lots/${l.id}`} onClick={(e) => e.stopPropagation()}>{l.sealTag}</Link></td>
                      <td>{l.agentName}</td>
                      <td><StatusBadge map={LOT_STATUS} value={l.status} /></td>
                      <td className="num">{l.unitCountSent}</td>
                      <td className="num">{formatKg(l.senderNetKg)}</td>
                      <td className="num">{formatKg(l.acceptedNetKg)}</td>
                      <td>{formatDateTime(l.dispatchedAt)}</td>
                      <td>
                        {l.attestation?.status === 'issued' && <span className="mono">{l.attestation.publicNumber}</span>}
                        {l.attestation?.status === 'draft' && <Badge tone="warning">Awaiting approval</Badge>}
                        {!l.attestation && l.status === 'received' && <Badge tone="info">Ready to attest</Badge>}
                      </td>
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
