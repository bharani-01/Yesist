import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Smartphone,
  Lock,
  Award,
  Users,
  Plus,
  Sparkles,
  Gift,
  Zap,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { rewardsApi } from './rewards.api.js';

const EVENT_CONFIG = {
  pickup_collected: { title: 'Pickup Collected', icon: Truck, class: 'event-tag--earn' },
  device_collected: { title: 'Devices Recycled', icon: Smartphone, class: 'event-tag--earn' },
  data_bearing_bonus: { title: 'Safe Data Destruction', icon: Lock, class: 'event-tag--earn' },
  attestation_issued: { title: 'Recycling Certificate Issued', icon: Award, class: 'event-tag--earn' },
  referral_bonus: { title: 'Referral Bonus', icon: Users, class: 'event-tag--earn' },
  device_added: { title: 'Product Registered', icon: Plus, class: 'event-tag--earn' },
  profile_complete: { title: 'Welcome Milestone', icon: Sparkles, class: 'event-tag--earn' },
  redemption: { title: 'Reward Redeemed', icon: Gift, class: 'event-tag--redeem' },
};

export function LedgerPage() {
  const [filter, setFilter] = useState('all');

  const statsQuery = useAsync((signal) => rewardsApi.balance(signal), []);
  const ledgerQuery = useAsync((signal) => rewardsApi.ledger({ limit: 50 }, signal), []);

  const stats = statsQuery.data ?? { balance: 0, totalEarned: 0, totalRedeemed: 0 };
  const entries = ledgerQuery.data ?? [];

  const filteredEntries = entries.filter((e) => {
    if (filter === 'earned') return e.delta > 0;
    if (filter === 'redeemed') return e.delta < 0;
    return true;
  });

  return (
    <div className="page ledger-page">
      <PageHeader
        title="Transaction History"
        eyebrow="Green Points Ledger"
        description="Immutable audit ledger recording all point earnings, bonuses, certificates, and voucher redemptions."
        actions={
          <Link to="/rewards" className="btn btn--secondary btn--sm tap-effect" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={15} />
            Back to Rewards
          </Link>
        }
      />

      {/* Summary KPI Strip */}
      <div className="ledger-summary-strip">
        <div className="ledger-kpi">
          <span className="ledger-kpi__label">Current Balance</span>
          <div className="ledger-kpi__val-wrap">
            <span className="ledger-kpi__val">{stats.balance.toLocaleString('en-IN')}</span>
            <span className="ledger-kpi__unit">pts</span>
          </div>
        </div>
        <div className="ledger-kpi">
          <span className="ledger-kpi__label">Lifetime Earned</span>
          <div className="ledger-kpi__val-wrap">
            <span className="ledger-kpi__val text-brand">+{stats.totalEarned.toLocaleString('en-IN')}</span>
            <span className="ledger-kpi__unit">pts</span>
          </div>
        </div>
        <div className="ledger-kpi">
          <span className="ledger-kpi__label">Lifetime Redeemed</span>
          <div className="ledger-kpi__val-wrap">
            <span className="ledger-kpi__val text-danger">-{stats.totalRedeemed.toLocaleString('en-IN')}</span>
            <span className="ledger-kpi__unit">pts</span>
          </div>
        </div>
      </div>

      {/* Ledger Feed Section */}
      <div className="ledger-section">
        <div className="ledger-filter-row">
          <div className="rewards-filter-tabs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rewards-filter-btn ${filter === 'all' ? 'is-active' : ''}`}
            >
              All Events ({entries.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('earned')}
              className={`rewards-filter-btn ${filter === 'earned' ? 'is-active' : ''}`}
            >
              Points Earned
            </button>
            <button
              type="button"
              onClick={() => setFilter('redeemed')}
              className={`rewards-filter-btn ${filter === 'redeemed' ? 'is-active' : ''}`}
            >
              Points Redeemed
            </button>
          </div>
        </div>

        <AsyncView query={ledgerQuery}>
          {() => (
            filteredEntries.length === 0 ? (
              <div className="ledger-empty">
                <p>No transactions found in this view.</p>
              </div>
            ) : (
              <div className="ledger-table-wrap">
                <table className="ledger-table">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Points</th>
                      <th>Balance After</th>
                      <th>Note</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((row) => {
                      const cfg = EVENT_CONFIG[row.eventType] || { title: row.eventType, icon: Zap, class: '' };
                      const IconComponent = cfg.icon;
                      const isEarn = row.delta > 0;

                      return (
                        <tr key={row.id}>
                          <td>
                            <div className="ledger-event-cell">
                              <span className="ledger-event-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconComponent size={16} />
                              </span>
                              <div>
                                <div className="ledger-event-title">{cfg.title}</div>
                                {row.refPickupId && (
                                  <span className="ledger-event-ref">Pickup: {row.refPickupId.slice(0, 8)}…</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`ledger-delta ${isEarn ? 'text-brand' : 'text-danger'}`}>
                              {isEarn ? `+${row.delta}` : row.delta} pts
                            </span>
                          </td>
                          <td>
                            <span className="ledger-balance-snapshot">
                              {row.balanceAfter.toLocaleString('en-IN')} pts
                            </span>
                          </td>
                          <td>
                            <span className="ledger-note">{row.note || '—'}</span>
                          </td>
                          <td>
                            <span className="ledger-date">{formatDate(row.createdAt)}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}
        </AsyncView>
      </div>
    </div>
  );
}
