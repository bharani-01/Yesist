import { useState, useMemo } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import {
  Gift,
  Plus,
  Copy,
  Check,
  CreditCard,
} from 'lucide-react';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { rewardsApi } from './rewards.api.js';
import { RewardCard } from './components/RewardCard.jsx';
import { RedeemModal } from './components/RedeemModal.jsx';
import { RewardIcon } from './components/RewardIcon.jsx';

// ── Main Rewards Page ────────────────────────────────────────────────────────

export function RewardsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab');

  if (rawTab === 'referral') {
    return <Navigate to="/referral" replace />;
  }

  const currentTab = ['catalogue', 'vouchers'].includes(rawTab) ? rawTab : 'catalogue';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalReward, setActiveModalReward] = useState(null);
  const [redeemResult, setRedeemResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copiedVoucherId, setCopiedVoucherId] = useState(null);

  const statsQuery = useAsync((signal) => rewardsApi.balance(signal), []);
  const catalogueQuery = useAsync((signal) => rewardsApi.catalogue(signal), []);
  const redemptionsQuery = useAsync((signal) => rewardsApi.redemptions(signal), []);

  const stats = statsQuery.data ?? { balance: 0, rank: 1, totalEarned: 0, totalRedeemed: 0 };
  const catalogue = catalogueQuery.data ?? [];
  const redemptions = redemptionsQuery.data ?? [];

  const filteredCatalogue = useMemo(() => {
    if (selectedCategory === 'all') return catalogue;
    return catalogue.filter((item) => item.rewardType === selectedCategory);
  }, [catalogue, selectedCategory]);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

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
      redemptionsQuery.run();
    } catch (err) {
      setErrorMsg(err.message || 'Redemption failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyVoucher = async (voucherCode, id) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(voucherCode);
      }
      setCopiedVoucherId(id);
      setTimeout(() => setCopiedVoucherId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page rewards-page">
      <PageHeader
        title="Green Points & Rewards"
        eyebrow="ESG Loyalty Hub"
        description="Earn verified sustainability points by recycling electronics responsibly. Redeem points for high-street vouchers, utility benefits, or carbon-offset tree plantations."
        actions={
          <div className="rewards-header-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/pickups/new" className="btn btn--primary btn--sm tap-effect" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={15} />
              Recycle & Earn
            </Link>
          </div>
        }
      />

      <AsyncView query={statsQuery}>
        {() => (
          <div className="stack stack--lg">
            {/* Green Points Balance Hero Card */}
            <section className="rewards-hero-card" aria-label="Green Points Executive Summary">
              <div className="rewards-hero-card__main">
                <span className="rewards-hero-card__eyebrow">Available Green Points</span>
                <div className="rewards-hero-card__balance-wrap">
                  <span className="rewards-hero-card__points">
                    {stats.balance.toLocaleString('en-IN')}
                  </span>
                  <span className="rewards-hero-card__unit">pts</span>
                </div>
                <p className="rewards-hero-card__sub" style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                  Spendable on verified retail vouchers, platform perks, or certified tree plantations.
                </p>
              </div>
            </section>

            {/* SOTA Navigation Tabs */}
            <div className="rewards-nav-bar" style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid var(--color-border)',
              gap: 'var(--space-2)',
              overflowX: 'auto',
              paddingBottom: 2
            }}>
              {[
                { id: 'catalogue', label: 'Rewards Catalogue', icon: Gift, count: catalogue.length },
                { id: 'vouchers', label: 'My Vouchers', icon: CreditCard, count: redemptions.length },
              ].map((t) => {
                const IconComponent = t.icon;
                const isActive = currentTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTabChange(t.id)}
                    className={`btn btn--ghost tap-effect ${isActive ? 'btn--active-tab' : ''}`}
                    style={{
                      borderRadius: 0,
                      borderBottom: isActive ? '2px solid #1a7f4b' : '2px solid transparent',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                      padding: '12px 16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <IconComponent size={16} style={{ color: isActive ? '#1a7f4b' : 'currentColor' }} />
                    <span>{t.label}</span>
                    {t.count !== undefined && t.count > 0 && (
                      <span style={{
                        fontSize: '11px',
                        padding: '1px 7px',
                        borderRadius: 'var(--radius-pill)',
                        background: isActive ? 'rgba(26, 127, 75, 0.15)' : 'var(--color-surface-muted)',
                        color: isActive ? '#1a7f4b' : 'var(--color-ink-muted)',
                        fontWeight: 600
                      }}>
                        {t.count}
                      </span>
                    )}
                    {t.badge && (
                      <span style={{
                        fontSize: '11px',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-pill)',
                        background: '#1a7f4b',
                        color: '#ffffff',
                        fontWeight: 700
                      }}>
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Rewards Catalogue */}
            {currentTab === 'catalogue' && (
              <section className="rewards-section" aria-label="Rewards Catalogue">
                <div className="rewards-section__header">
                  <div>
                    <h3 className="rewards-section__title">Redeem Rewards</h3>
                    <p className="rewards-section__sub">
                      Exchange your Green Points for lifestyle vouchers, platform benefits, or verified social impact.
                    </p>
                  </div>

                  <div className="rewards-filter-tabs">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className={`rewards-filter-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
                    >
                      All ({catalogue.length})
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
              </section>
            )}

            {/* TAB 2: My Vouchers */}
            {currentTab === 'vouchers' && (
              <section className="rewards-section" aria-label="My Vouchers">
                <div className="rewards-section__header">
                  <div>
                    <h3 className="rewards-section__title">My Vouchers & Perks</h3>
                    <p className="rewards-section__sub">
                      Active vouchers and claim codes issued to your account.
                    </p>
                  </div>
                </div>

                {redemptions.length === 0 ? (
                  <div style={{
                    padding: 'var(--space-8)',
                    textAlign: 'center',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)'
                  }}>
                    <CreditCard size={36} style={{ color: 'var(--color-ink-muted)', marginBottom: 8 }} />
                    <h4 style={{ margin: '0 0 4px', fontSize: 'var(--text-md)', fontWeight: 600 }}>No redeemed vouchers yet</h4>
                    <p style={{ margin: '0 0 16px', fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}>
                      Browse the rewards catalogue to exchange your Green Points for partner vouchers and coupons.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleTabChange('catalogue')}
                      className="btn btn--primary btn--sm tap-effect"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : (
                  <div className="my-vouchers-grid">
                    {redemptions.map((r) => (
                      <div key={r.id} className="voucher-ticket">
                        <div className="voucher-ticket__icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <RewardIcon name={r.rewardKey || r.iconEmoji} size={24} />
                        </div>
                        <div className="voucher-ticket__info">
                          <h4 className="voucher-ticket__title">{r.rewardLabel}</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 4 }}>
                            <code className="voucher-ticket__code">{r.voucherCode || 'FULFILLED'}</code>
                            {r.voucherCode && (
                              <button
                                type="button"
                                onClick={() => handleCopyVoucher(r.voucherCode, r.id)}
                                className="btn btn--ghost btn--sm"
                                style={{ minHeight: 28, padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                title="Copy voucher code"
                              >
                                {copiedVoucherId === r.id ? <Check size={13} style={{ color: '#1a7f4b' }} /> : <Copy size={13} />}
                                <span>{copiedVoucherId === r.id ? 'Copied' : 'Copy'}</span>
                              </button>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--color-ink-muted)', marginTop: 4, display: 'block' }}>
                            Redeemed on {formatDate(r.createdAt)} · {r.pointsSpent} pts spent
                          </span>
                        </div>
                        <span className="voucher-ticket__status">Ready to Use</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}


          </div>
        )}
      </AsyncView>

      {/* Redeem Modal */}
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
