import { RewardIcon } from './RewardIcon.jsx';

export const REWARD_IMAGES = {
  coffee_voucher: '/rewards/coffee_voucher.jpg',
  amazon_coupon: '/rewards/amazon_coupon.jpg',
  plant_tree: '/rewards/plant_tree.jpg',
  school_donation: '/rewards/school_donation.jpg',
  priority_slot: '/rewards/priority_slot.jpg',
  ecosure_pro_badge: '/rewards/ecosure_pro_badge.jpg',
};

const TYPE_CONFIG = {
  partner_voucher: { label: 'Partner Voucher', tagClass: 'reward-tag--voucher' },
  social_impact: { label: 'Social Impact', tagClass: 'reward-tag--impact' },
  platform_benefit: { label: 'Eco Perk', tagClass: 'reward-tag--perk' },
};

export function RewardCard({ reward, userBalance = 0, onRedeem, isRedeeming = false }) {
  const canAfford = userBalance >= reward.pointsCost;
  const shortfall = reward.pointsCost - userBalance;
  const cfg = TYPE_CONFIG[reward.rewardType] || { label: reward.rewardType, tagClass: '' };
  const imageUrl = reward.imageUrl || REWARD_IMAGES[reward.key];

  return (
    <div className={`reward-card ${canAfford ? '' : 'reward-card--locked'}`}>
      {imageUrl ? (
        <div className="reward-card__media">
          <img
            src={imageUrl}
            alt={reward.label}
            className="reward-card__img"
            loading="lazy"
          />
          <div className="reward-card__media-scrim" />
          <span className={`reward-tag ${cfg.tagClass} reward-card__tag-float`}>
            {cfg.label}
          </span>
        </div>
      ) : (
        <div className="reward-card__top">
          <div className="reward-card__icon-badge">
            <RewardIcon name={reward.key || reward.iconEmoji} size={22} />
          </div>
          <span className={`reward-tag ${cfg.tagClass}`}>
            {cfg.label}
          </span>
        </div>
      )}

      <div className="reward-card__body">
        <h4 className="reward-card__title">{reward.label}</h4>
        <p className="reward-card__desc">{reward.description}</p>
      </div>

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

