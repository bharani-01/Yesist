import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { agentApi } from './agent.api.js';
import { LotsPanel } from './components/LotsPanel.jsx';

export function AgentLotsPage() {
  const mine = useAsync((s) => agentApi.myJobs(s).then((r) => r.jobs), []);
  const myJobsList = mine.data ?? [];
  const collectedJobs = myJobsList.filter((j) => j.status === 'collected');

  return (
    <div className="page">
      <PageHeader
        title="Sealed Lots & Dispatches"
        eyebrow="AGGREGATE & DISPATCH TO RECYCLER"
        actions={
          <Link to="/agent/pickups" className="btn btn--secondary tap-effect" style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
            &larr; View My Pickups
          </Link>
        }
      />

      <LotsPanel collectedJobs={collectedJobs} onChanged={mine.refresh} />
    </div>
  );
}
