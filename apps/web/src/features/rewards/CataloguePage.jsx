import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { rewardsApi } from './rewards.api.js';
import { RewardCard } from './components/RewardCard.jsx';
import { RedeemModal } from './components/RedeemModal.jsx';

export function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalReward, setActiveModalReward] = useState(null);
  const [redeemResult, setRedeemResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const statsQuery = useAsync((signal) => rewardsApi.balance(signal), []);
  const catalogueQuery = useAsync((signal) => rewardsApi.catalogue(signal), []);

  const stats = statsQuery.data ?? { balance: 0, rank: 1 };
  const catalogue = catalogueQuery.data ?? [];

  const filteredCatalogue = catalogue.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.rewardType === selectedCategory;
  });

  const handleOpenRedeem = (reward) => {
    setErrorMsg(null);
    setRedeemResult(null);
    setActiveModalReward(reward);
  };

  const handleCloseModal = () => {
    setActiveModalReward(null);
    setRedeemResult(null);
    setIsSubmitting(false);
  };

  const handleConfirmRedeem = async (reward) => {
    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      const res = await rewardsApi.redeem({ rewardKey: reward.key });
      setRedeemResult(res);
      statsQuery.run();
    } catch (err) {
      setErrorMsg(err.message || 'Redemption failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page catalogue-page">
      <PageHeader
        title="Rewards Catalogue"
        eyebrow="Redeem Points"
        actions={
          <div className="catalogue-header-actions">
            <Link to="/rewards" className="btn btn--secondary btn--sm tap-effect" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={15} />
              Rewards Dashboard
            </Link>
          </div>
        }
      />

      {/* Balance Banner */}
      <div className="catalogue-balance-bar">
        <div className="catalogue-balance-info">
          <span className="catalogue-balance-label">Your Available Balance:</span>
          <span className="catalogue-balance-pts">{stats.balance.toLocaleString('en-IN')} pts</span>
        </div>
        <Link to="/pickups/new" className="btn btn--secondary btn--sm tap-effect">
          + Book Pickup to Earn More
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="catalogue-filters-wrap">
        <div className="rewards-filter-tabs">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rewards-filter-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
          >
            All Rewards ({catalogue.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('partner_voucher')}
            className={`rewards-filter-btn ${selectedCategory === 'partner_voucher' ? 'is-active' : ''}`}
          >
            Partner Vouchers
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('social_impact')}
            className={`rewards-filter-btn ${selectedCategory === 'social_impact' ? 'is-active' : ''}`}
          >
            Social Impact
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('platform_benefit')}
            className={`rewards-filter-btn ${selectedCategory === 'platform_benefit' ? 'is-active' : ''}`}
          >
            Eco Perks
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="alert alert--danger" style={{ marginBottom: '16px' }}>
          {errorMsg}
        </div>
      )}

      {/* Rewards Grid */}
      <AsyncView query={catalogueQuery}>
        {() => (
          <div className="rewards-grid">
            {filteredCatalogue.map((reward) => (
              <RewardCard
                key={reward.key}
                reward={reward}
                userBalance={stats.balance}
                onRedeem={handleOpenRedeem}
              />
            ))}
          </div>
        )}
      </AsyncView>

      {/* Modal */}
      <RedeemModal
        reward={activeModalReward}
        userBalance={stats.balance}
        isOpen={Boolean(activeModalReward)}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRedeem}
        result={redeemResult}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
