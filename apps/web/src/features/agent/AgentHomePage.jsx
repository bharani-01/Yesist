import { Link, useSearchParams } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Metric } from '../../components/ui/Metric.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { Tabs } from '../../components/ui/Tabs.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatInt, formatKg, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { agentApi } from './agent.api.js';
import { LotsPanel } from './components/LotsPanel.jsx';

const itemsSummary = (items) => items.map((i) => `${i.quantity} × ${i.name}`).join(', ');

export function AgentHomePage() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'open';
  const open = useAsync((s) => agentApi.openJobs(s).then((r) => r.jobs), []);
  const mine = useAsync((s) => agentApi.myJobs(s).then((r) => r.jobs), []);

  const openList = open.data ?? [];
  const myJobsList = mine.data ?? [];

  const scheduledCount = myJobsList.filter((j) => j.status === 'scheduled').length;
  const collectedJobs = myJobsList.filter((j) => j.status === 'collected');
  const totalCollectedKg = myJobsList.reduce((acc, j) => acc + (Number(j.collectedNetKg) || 0), 0);

  const tabs = [
    { value: 'open', label: 'Open requests', count: openList.length },
    { value: 'mine', label: 'My jobs', count: myJobsList.length },
    { value: 'lots', label: 'Lots' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Jobs and lots"
        eyebrow="COLLECTION AGENT DASHBOARD"
      />

      {/* Real Backend Metrics Grid */}
      <div className="metrics metrics--4">
        <Metric
          label="Open requests"
          value={formatInt(openList.length)}
          hint="Awaiting acceptance in your service wards"
        />
        <Metric
          label="Scheduled pickups"
          value={formatInt(scheduledCount)}
          hint="Planned for collection"
        />
        <Metric
          label="Collected (in shop)"
          value={formatInt(collectedJobs.length)}
          hint="Ready to aggregate into a sealed lot"
        />
        <Metric
          label="Total collected"
          value={formatKg(totalCollectedKg)}
          hint="Net verified weight collected"
        />
      </div>

      <Tabs label="Agent work" tabs={tabs} value={tab} onChange={(v) => setParams({ tab: v }, { replace: true })} />

      <div role="tabpanel" id={`tabpanel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'open' && (
          <Panel flush>
            <AsyncView query={open} isEmpty={(d) => !d.length} empty={<EmptyState title="No open requests" text="New pickup requests in your service wards appear here." />}>
              {(jobs) => (
                <ul className="list">
                  {jobs.map((j) => (
                    <li key={j.id}>
                      <Link to={`/agent/jobs/${j.id}`} className="list__item list__item--link">
                        <div className="list__main">
                          <span className="list__title">{itemsSummary(j.items)}</span>
                          <span className="list__meta">
                            <span>{j.wardName}</span>
                            <span>{formatDate(j.preferredDate)} · {WINDOW_LABELS[j.preferredWindow]}</span>
                            <span className="mono">{j.reference}</span>
                          </span>
                        </div>
                        <span className="btn btn--secondary btn--sm">Review</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AsyncView>
          </Panel>
        )}
        {tab === 'mine' && (
          <Panel flush>
            <AsyncView query={mine} isEmpty={(d) => !d.length} empty={<EmptyState title="No active jobs" text="Accepted pickups waiting for collection, and collected pickups not yet in a lot, appear here." />}>
              {(jobs) => (
                <ul className="list">
                  {jobs.map((j) => (
                    <li key={j.id}>
                      <Link to={`/agent/jobs/${j.id}`} className="list__item list__item--link">
                        <div className="list__main">
                          <span className="list__title">{itemsSummary(j.items)}</span>
                          <span className="list__meta">
                            <span>{j.wardName}</span>
                            {j.status === 'scheduled' && <span>{formatDate(j.scheduledFor)} · {WINDOW_LABELS[j.scheduledWindow]}</span>}
                            {j.collectedNetKg && <span>{formatKg(j.collectedNetKg)}</span>}
                            <span>{j.addressLine}</span>
                          </span>
                        </div>
                        <StatusBadge map={PICKUP_STATUS} value={j.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AsyncView>
          </Panel>
        )}
        {tab === 'lots' && <LotsPanel collectedJobs={collectedJobs} onChanged={mine.refresh} />}
      </div>
    </div>
  );
}
