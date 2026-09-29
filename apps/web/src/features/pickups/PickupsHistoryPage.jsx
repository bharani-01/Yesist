import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatInr, formatKg, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { pickupsApi } from './pickups.api.js';

export function PickupsHistoryPage() {
  const query = useAsync((signal) => pickupsApi.list(signal).then((r) => r.pickups), []);

  return (
    <div className="page">
      <PageHeader 
        title="Manage Pickups" 
        description="View and manage all your past and active pickup requests." 
        back={{ to: '/pickups', label: 'Dashboard' }} 
      />
      <div className="wizard-container" style={{ padding: '0' }}>
        <AsyncView
          query={query}
          isEmpty={(d) => d.length === 0}
          empty={<EmptyState title="No pickups yet" text="Book a doorstep pickup for old phones, laptops, appliances, and cables." />}
        >
          {(items) => (
            <ul className="list">
              {items.map((p) => (
                <li key={p.id} style={{ padding: 'var(--space-4)' }}>
                  <Link to={`/pickups/${p.id}`} className="list__item list__item--link tap-effect">
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
                        {p.collectedNetKg && <span>{formatKg(p.collectedNetKg)}</span>}
                        {p.materialPaidAmount && <span>{formatInr(p.materialPaidAmount)}</span>}
                      </span>
                    </div>
                    <StatusBadge map={PICKUP_STATUS} value={p.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </AsyncView>
      </div>
    </div>
  );
}
