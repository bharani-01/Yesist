import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatInr, formatKg } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { pickupsApi } from './pickups.api.js';

export function PayoutHistoryPage() {
  const query = useAsync((signal) => pickupsApi.list(signal).then((r) => r.pickups), []);

  return (
    <div className="page">
      <PageHeader 
        title="Payout History" 
        description="View all incentives and payouts received from your completed e-waste pickups." 
        back={{ to: '/pickups', label: 'Dashboard' }} 
      />
      <div className="wizard-container" style={{ padding: '0' }}>
        <AsyncView
          query={query}
          isEmpty={(d) => {
            const completed = d.filter((p) => new Set(['collected', 'in_lot', 'received', 'closed']).has(p.status));
            return completed.length === 0;
          }}
          empty={<EmptyState title="No payouts yet" text="Complete a pickup to earn payouts for your e-waste." />}
        >
          {(items) => {
            const completedPickups = items.filter((p) => new Set(['collected', 'in_lot', 'received', 'closed']).has(p.status));
            return (
              <ul className="list">
                {completedPickups.map((p) => (
                  <li key={p.id} style={{ padding: 'var(--space-4)' }}>
                    <Link to={`/pickups/${p.id}`} className="list__item list__item--link tap-effect">
                      <div className="list__main">
                        <span className="list__title" style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                          {p.materialPaidAmount ? `+ ${formatInr(p.materialPaidAmount)}` : '₹0'}
                        </span>
                        <span className="list__meta">
                          <span className="mono">{p.reference}</span>
                          <span>{p.categories ?? 'Pickup'}</span>
                          <span>{p.collectedNetKg ? `Weighed ${formatKg(p.collectedNetKg)}` : 'Completed'}</span>
                          <span>{formatDate(p.scheduledFor ?? p.createdAt)}</span>
                        </span>
                      </div>
                      <StatusBadge map={PICKUP_STATUS} value={p.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            );
          }}
        </AsyncView>
      </div>
    </div>
  );
}
