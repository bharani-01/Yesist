import { useState } from 'react';
import { CheckCircle, Copy, Check, ShieldCheck } from 'lucide-react';
import { RewardIcon } from './RewardIcon.jsx';
import { REWARD_IMAGES } from './RewardCard.jsx';

export function RedeemModal({ reward, userBalance, isOpen, onClose, onConfirm, result, isSubmitting }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !reward) return null;

  const handleCopyCode = async (code) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const balanceAfter = userBalance - reward.pointsCost;
  const imageUrl = reward.imageUrl || REWARD_IMAGES[reward.key];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog redeem-modal" onClick={(e) => e.stopPropagation()}>
        {!result ? (
          <>
            {imageUrl && (
              <div className="redeem-modal__media">
                <img src={imageUrl} alt={reward.label} className="redeem-modal__img" />
              </div>
            )}
            <div className="redeem-modal__header">
              {!imageUrl && (
                <div className="redeem-modal__icon">
                  <RewardIcon name={reward.key || reward.iconEmoji} size={28} />
                </div>
              )}
              <h3 className="redeem-modal__title">Redeem {reward.label}?</h3>
              <p className="redeem-modal__desc">{reward.description}</p>
            </div>

            <div className="redeem-modal__summary">
              <div className="redeem-summary-row">
                <span>Reward Cost</span>
                <span className="text-danger font-semibold">-{reward.pointsCost.toLocaleString('en-IN')} pts</span>
              </div>
              <div className="redeem-summary-row">
                <span>Current Balance</span>
                <span>{userBalance.toLocaleString('en-IN')} pts</span>
              </div>
              <div className="redeem-summary-divider" />
              <div className="redeem-summary-row font-semibold">
                <span>Balance After Redemption</span>
                <span className="text-success">{balanceAfter.toLocaleString('en-IN')} pts</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              background: 'var(--color-surface-muted)',
              borderRadius: 'var(--radius-md)',
              fontSize: '11px',
              color: 'var(--color-ink-muted)',
              marginTop: '12px'
            }}>
              <ShieldCheck size={16} style={{ color: '#1a7f4b', flexShrink: 0 }} />
              <span>Instant fulfillment from partner voucher inventory. Terms & conditions apply.</span>
            </div>

            <div className="redeem-modal__actions" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--primary tap-effect"
                onClick={() => onConfirm(reward)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing Transaction…' : 'Confirm & Redeem'}
              </button>
            </div>
          </>
        ) : (
          <div className="redeem-modal__success">
            {imageUrl ? (
              <div className="redeem-success-thumb">
                <img src={imageUrl} alt="" className="redeem-success-img" />
                <div className="redeem-success-check-badge">
                  <CheckCircle size={20} />
                </div>
              </div>
            ) : (
              <div className="redeem-success-icon" style={{ color: '#1a7f4b', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={32} />
              </div>
            )}
            <h3 className="redeem-modal__title">Redemption Successful</h3>
            <p className="redeem-modal__desc">
              You redeemed <strong>{reward.label}</strong> for {reward.pointsCost.toLocaleString('en-IN')} Green Points.
            </p>

            {result.voucherCode ? (
              <div className="voucher-display">
                <span className="voucher-display__label">Voucher / Claim Code</span>
                <div className="voucher-display__box">
                  <span className="voucher-display__code">{result.voucherCode}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(result.voucherCode)}
                    className="btn btn--sm btn--secondary tap-effect"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <p className="voucher-display__hint">
                  Present this code at partner checkout or apply it during online redemption.
                </p>
              </div>
            ) : (
              <div className="voucher-display">
                <span className="voucher-display__label">Social Impact Certificate</span>
                <p className="voucher-display__hint">
                  Your environmental contribution has been recorded in the public ESG impact ledger and submitted to the foundation.
                </p>
              </div>
            )}

            <div className="redeem-modal__actions" style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="btn btn--primary"
                style={{ width: '100%' }}
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
