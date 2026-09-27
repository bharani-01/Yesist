import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { pickupsApi } from './pickups.api.js';

export function PickupsListPage() {
  const query = useAsync((signal) => pickupsApi.list(signal).then((r) => r.pickups), []);
  const bookButton = <Link to="/pickups/new" className="btn btn--primary">Book a pickup</Link>;

  return (
    <div className="page">
      <PageHeader title="My pickups" description="Every pickup is tracked from your door to the authorised recycler." actions={bookButton} />
      <Panel flush>
        <AsyncView
          query={query}
          isEmpty={(d) => d.length === 0}
          empty={<EmptyState title="No pickups yet" text="Book a doorstep pickup for old phones, laptops, appliances, and cables. You get the recycler’s price plus the scheme incentive." action={bookButton} />}
        >
          {(pickups) => (
            <ul className="list">
              {pickups.map((p) => (
                <li key={p.id}>
                  <Link to={`/pickups/${p.id}`} className="list__item list__item--link">
                    <div className="list__main">
                      <span className="list__title">{p.categories ?? 'Pickup'}</span>
                      <span className="list__meta">
                        <span className="mono">{p.reference}</span>
                        <span>{p.wardName}</span>
                        <span>
                          {p.scheduledFor
                            ? `Scheduled ${formatDate(p.scheduledFor)} · ${WINDOW_LABELS[p.scheduledWindow]}`
                            : `Requested for ${formatDate(p.preferredDate)}`}
                        </span>
                      </span>
                    </div>
                    <StatusBadge map={PICKUP_STATUS} value={p.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </AsyncView>
      </Panel>
    </div>
  );
}
