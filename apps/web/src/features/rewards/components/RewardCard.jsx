import { RewardIcon } from './RewardIcon.jsx';

const TYPE_CONFIG = {
  partner_voucher: { label: 'Partner Voucher', tagClass: 'reward-tag--voucher' },
  social_impact: { label: 'Social Impact', tagClass: 'reward-tag--impact' },
  platform_benefit: { label: 'Eco Perk', tagClass: 'reward-tag--perk' },
};

export function RewardCard({ reward, userBalance = 0, onRedeem, isRedeeming = false }) {
  const canAfford = userBalance >= reward.pointsCost;
  const shortfall = reward.pointsCost - userBalance;
  const progressPercent = Math.min(100, Math.round((userBalance / reward.pointsCost) * 100));
  const cfg = TYPE_CONFIG[reward.rewardType] || { label: reward.rewardType, tagClass: '' };

  return (
    <div className={`reward-card ${canAfford ? '' : 'reward-card--locked'}`}>
      <div className="reward-card__top">
        <div className="reward-card__icon-badge">
          <RewardIcon name={reward.key || reward.iconEmoji} size={22} />
        </div>
        <span className={`reward-tag ${cfg.tagClass}`}>
          {cfg.label}
        </span>
      </div>

      <div className="reward-card__body">
        <h4 className="reward-card__title">{reward.label}</h4>
        <p className="reward-card__desc">{reward.description}</p>
      </div>

      {!canAfford && (
        <div style={{ marginTop: 'auto', marginBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-ink-muted)', marginBottom: 4 }}>
            <span>Progress ({progressPercent}%)</span>
            <span>{userBalance} / {reward.pointsCost} pts</span>
          </div>
          <div style={{ height: 4, background: 'var(--color-surface-muted)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: '#1a7f4b', borderRadius: 2 }} />
          </div>
        </div>
      )}

      <div className="reward-card__footer" style={{ marginTop: canAfford ? 'auto' : 0 }}>
        <div className="reward-card__cost">
          <span className="reward-card__pts">{reward.pointsCost.toLocaleString('en-IN')}</span>
          <span className="reward-card__unit">pts</span>
        </div>

        <button
          type="button"
          onClick={() => onRedeem(reward)}
          disabled={!canAfford || isRedeeming}
          className={`btn btn--sm tap-effect ${canAfford ? 'btn--primary' : 'btn--secondary reward-card__locked-btn'}`}
        >
          {canAfford ? 'Redeem Voucher' : `Need ${shortfall} more`}
        </button>
      </div>
    </div>
  );
}
