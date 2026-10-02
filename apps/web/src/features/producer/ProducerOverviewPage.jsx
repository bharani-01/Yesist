import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Metric } from '../../components/ui/Metric.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatCount, formatInt } from '../../lib/format.js';
import { producerApi } from './producer.api.js';
import './ComplianceReportPage.css';

const COLLECTED_STATES = ['collected', 'in_lot', 'at_hub', 'received_at_recycler', 'processed'];

export function ProducerOverviewPage() {
  const query = useAsync((s) => producerApi.overview(s), []);
  return (
    <div className="page">
      <PageHeader
        title="End-of-life outcomes"
        description="What happened to the units you placed on the market. Collector, hub, and recycler identities are never shown here."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Link to="/producer/batches" className="btn btn--secondary">Batches</Link>
            <Link to="/producer/compliance" className="btn btn--primary">Compliance & CPCB Filing</Link>
          </div>
        }
      />
      <AsyncView
        query={query}
        loadingRows={4}
        isEmpty={(d) => d.totals.models === 0}
        empty={
          <Panel>
            <EmptyState
              title="Start by registering a product model"
              text="Register each model you sell, then record placed-on-market batches and their units. Each unit gets a QR label that follows it to the recycler."
              action={<Link to="/producer/models" className="btn btn--primary">Register a model</Link>}
            />
          </Panel>
        }
      >
        {(data) => <Overview data={data} />}
      </AsyncView>
    </div>
  );
}

function Overview({ data }) {
  const { totals, byState, monthly, byModel } = data;
  const registered = Object.values(byState).reduce((a, b) => a + b, 0);
  const collected = COLLECTED_STATES.reduce((a, s) => a + (byState[s] ?? 0), 0);
  const processed = byState.processed ?? 0;
  const pct = (n) => (registered ? `${Math.round((n / registered) * 100)}% of registered units` : 'No units yet');
  const maxMonth = Math.max(1, ...monthly.map((m) => m.collected));

  return (
    <>
      <div className="metrics metrics--4">
        <Metric label="Units registered" value={formatInt(registered)} hint={`${formatCount(totals.batches, 'batch', 'batches')} · ${formatCount(totals.models, 'model')}`} />
        <Metric label="Declared on market" value={formatInt(totals.placedQuantity)} hint={totals.draftBatches ? `${formatCount(totals.draftBatches, 'batch', 'batches')} still in draft` : 'Declared units in placed batches'} />
        <Metric label="Collected" value={formatInt(collected)} hint={pct(collected)} />
        <Metric label="Recycled" value={formatInt(processed)} hint={pct(processed)} />
      </div>
      <div className="split">
        <Panel title="Units collected per month">
          <div className="bars" style={{ '--bars': monthly.length }} role="img" aria-label="Units collected and recycled per month for the last six months">
            {monthly.map((m) => (
              <div key={m.month} className="bars__bar" title={`${m.month}: ${m.collected} collected, ${m.processed} recycled`}>
                <span className="num">{m.collected || ''}</span>
                <div className="bars__track"><div className="bars__fill" style={{ height: `${(m.collected / maxMonth) * 100}%` }} /></div>
                <span>{new Date(`${m.month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'short' })}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="By model" flush>
          {byModel.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Model</th><th className="num">Units</th><th className="num">Collected</th><th className="num">Recycled</th></tr></thead>
                <tbody>
                  {byModel.map((m) => (
                    <tr key={m.id}>
                      <td>{m.brand} {m.modelName}</td>
                      <td className="num">{formatInt(m.units)}</td>
                      <td className="num">{formatInt(m.collected)}</td>
                      <td className="num">{formatInt(m.processed)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="muted panel__note">No units registered yet.</p>}
        </Panel>
      </div>
    </>
  );
}
