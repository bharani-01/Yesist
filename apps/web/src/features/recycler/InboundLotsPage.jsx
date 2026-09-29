import { Link, useNavigate } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Badge, StatusBadge } from '../../components/ui/Badge.jsx';
import { Metric } from '../../components/ui/Metric.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime, formatInt, formatKg } from '../../lib/format.js';
import { LOT_STATUS } from '../../lib/status.js';
import { recyclerApi } from './recycler.api.js';

export function InboundLotsPage() {
  const navigate = useNavigate();
  const query = useAsync((s) => recyclerApi.lots(s).then((r) => r.lots), []);

  const lots = query.data ?? [];
  const receivedLots = lots.filter((l) => l.status === 'received' || l.status === 'processed' || l.status === 'attested');
  const totalAcceptedKg = receivedLots.reduce((acc, l) => acc + (Number(l.acceptedNetKg) || 0), 0);
  const issuedAttestations = lots.filter((l) => l.attestation?.status === 'issued').length;
  const readyToReceive = lots.filter((l) => l.receivable && l.status !== 'received' && l.status !== 'processed' && l.status !== 'attested').length;

  return (
    <div className="page">
      <PageHeader
        title="Inbound Lots"
        eyebrow="PRO RECYCLER DASHBOARD"
        description="Verify incoming lot weight, inspect material custody, and issue recovery attestations."
      />

      {/* Real Backend Metrics */}
      <div className="metrics metrics--4">
        <Metric
          label="Total lots handled"
          value={formatInt(lots.length)}
          hint="All routed lots"
        />
        <Metric
          label="Ready to receive"
          value={formatInt(readyToReceive)}
          hint="Arrived and awaiting receipt weigh-in"
        />
        <Metric
          label="Total accepted weight"
          value={formatKg(totalAcceptedKg)}
          hint="Verified scale weight received"
        />
        <Metric
          label="Certificates issued"
          value={formatInt(issuedAttestations)}
          hint="Official recovery attestations"
        />
      </div>

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
                      <td>{l.agentName}{l.hubName && <span className="subtle"> via {l.hubName}</span>}</td>
                      <td>
                        {l.hubName && !l.receivable && ['in_transit', 'at_hub'].includes(l.status)
                          ? <Badge tone="neutral">{l.hubReceivedAt ? 'At hub' : 'To hub'}</Badge>
                          : <StatusBadge map={LOT_STATUS} value={l.status} />}
                      </td>
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
