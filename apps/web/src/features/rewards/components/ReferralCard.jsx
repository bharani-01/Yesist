import { useState } from 'react';
import { Users, Copy, Check, Share2, Send, Award, Gift } from 'lucide-react';

export function ReferralCard({ referralData, onRefresh }) {
  const [copied, setCopied] = useState(false);
  const code = referralData?.code || 'ECO-SHARE';
  const shareUrl = `${window.location.origin}/register?ref=${code}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Join me on EcoSure to responsibly recycle e-waste and earn rewards! Use my invite code ${code}: ${shareUrl}`
  )}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="referral-card">
      <div className="referral-card__header">
        <div className="referral-card__badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Gift size={14} />
          <span>Earn +100 Green Points per friend</span>
        </div>
        <h3 className="referral-card__title">Invite Colleagues & Friends to Recycle</h3>
        <p className="referral-card__sub">
          Help colleagues and friends recycle their old phones, laptops, and appliances responsibly. When they complete their first doorstep pickup, you receive <strong>100 Green Points</strong> directly in your balance.
        </p>
      </div>

      <div className="referral-card__box">
        <div className="referral-card__code-display">
          <span className="referral-card__code-label">Your Unique Referral Code</span>
          <span className="referral-card__code-text">{code}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn--primary btn--sm referral-card__copy-btn tap-effect"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? 'Copied Link!' : 'Copy Invite Link'}</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary btn--sm tap-effect"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={14} />
            <span>Share via WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="referral-card__stats">
        <div className="referral-stat">
          <span className="referral-stat__label">Invited Friends</span>
          <span className="referral-stat__value">{referralData?.totalInvites ?? 0}</span>
        </div>
        <div className="referral-stat">
          <span className="referral-stat__label">Verified Pickups</span>
          <span className="referral-stat__value">{referralData?.successfulRecycles ?? 0}</span>
        </div>
        <div className="referral-stat">
          <span className="referral-stat__label">Points Credited</span>
          <div className="referral-stat__val-wrap">
            <span className="referral-stat__value text-success">+{referralData?.pointsEarned ?? 0}</span>
            <span className="referral-stat__unit">pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
