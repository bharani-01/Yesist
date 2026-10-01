import { Link } from 'react-router-dom';

export function BalanceWidget({ balance = 0, rank = 1, showRank = true, size = 'md' }) {
  const isSm = size === 'sm';

  return (
    <Link
      to="/rewards"
      className={`balance-widget ${isSm ? 'balance-widget--sm' : ''} tap-effect`}
      title="View Green Points & ESG Rewards"
    >
      <div className="balance-widget__icon-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
      <div className="balance-widget__content">
        <div className="balance-widget__pts">
          <span className="balance-widget__value">{balance.toLocaleString('en-IN')}</span>
          <span className="balance-widget__label">pts</span>
        </div>
        {showRank && (
          <span className="balance-widget__rank">
            {rank === 1 ? 'Top Recycler' : `Rank #${rank}`}
          </span>
        )}
      </div>
      <svg className="balance-widget__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Link>
  );
}
