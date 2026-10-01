import { useState } from 'react';
import {
  Copy,
  Check,
  Send,
  Share2,
  ShieldCheck,
  Users,
  CheckCircle2,
  Gift,
  Award,
  Mail,
  QrCode as QrIcon,
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { rewardsApi } from './rewards.api.js';
import { QrCode } from '../../components/qr/QrCode.jsx';
import './ReferralPage.css';

export function ReferralPage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const referralQuery = useAsync((signal) => rewardsApi.referral(signal), []);
  const balanceQuery = useAsync((signal) => rewardsApi.balance(signal), []);

  const referral = referralQuery.data ?? {
    code: 'ECO-SHARE',
    totalInvites: 0,
    successfulRecycles: 0,
    pointsEarned: 0,
  };

  const balance = balanceQuery.data ?? { balance: 0 };
  const referralCode = referral.code || 'ECO-SHARE';
  const shareUrl = `${window.location.origin}/register?ref=${referralCode}`;

  const whatsappMessage = `Join me on EcoSure to responsibly recycle electronic waste and earn Green Points! Use my invite code ${referralCode}: ${shareUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
  const emailSubject = encodeURIComponent('Join me on EcoSure to recycle electronics safely');
  const emailBody = encodeURIComponent(
    `Hi,\n\nI am using EcoSure to safely recycle old electronics through CPCB-authorized doorstep pickups. Sign up using my referral link and we will both earn 100 Green Points upon your first verified collection:\n\n${shareUrl}\n\nInvite Code: ${referralCode}`
  );
  const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(referralCode);
      } else {
        const input = document.createElement('input');
        input.value = referralCode;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  const handleCopyLink = async () => {
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
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EcoSure E-Waste Recycling',
          text: `Join me on EcoSure to recycle electronic waste responsibly! Use code ${referralCode}:`,
          url: shareUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing', err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="page referral-page">
      <PageHeader
        title="Referral Hub"
        eyebrow="Community Growth"
        description="Invite friends, family, and colleagues to recycle electronic waste responsibly. Earn 100 verified Green Points for every friend who completes their first doorstep pickup."
      />

      <AsyncView query={referralQuery}>
        {() => (
          <div className="referral-container">
            {/* Top KPI Stat Cards Grid */}
            <div className="referral-stats-grid">
              <div className="referral-stat-card">
                <div className="referral-stat-card__top">
                  <span className="referral-stat-card__icon-wrap">
                    <Users size={18} />
                  </span>
                  <span className="referral-stat-card__pill">Invited</span>
                </div>
                <div className="referral-stat-card__body">
                  <div className="referral-stat-card__value">
                    {referral.totalInvites}
                  </div>
                  <div className="referral-stat-card__label">Friends Invited</div>
                </div>
                <div className="referral-stat-card__sub">
                  Registered using your link
                </div>
              </div>

              <div className="referral-stat-card">
                <div className="referral-stat-card__top">
                  <span className="referral-stat-card__icon-wrap referral-stat-card__icon-wrap--brand">
                    <CheckCircle2 size={18} />
                  </span>
                  <span className="referral-stat-card__pill referral-stat-card__pill--brand">Verified</span>
                </div>
                <div className="referral-stat-card__body">
                  <div className="referral-stat-card__value referral-stat-card__value--brand">
                    {referral.successfulRecycles}
                  </div>
                  <div className="referral-stat-card__label">Verified Pickups</div>
                </div>
                <div className="referral-stat-card__sub">
                  Completed e-waste handovers
                </div>
              </div>

              <div className="referral-stat-card">
                <div className="referral-stat-card__top">
                  <span className="referral-stat-card__icon-wrap referral-stat-card__icon-wrap--brand">
                    <Gift size={18} />
                  </span>
                  <span className="referral-stat-card__pill referral-stat-card__pill--brand">+100 / referral</span>
                </div>
                <div className="referral-stat-card__body">
                  <div className="referral-stat-card__value referral-stat-card__value--brand">
                    +{referral.pointsEarned.toLocaleString('en-IN')}
                    <span className="referral-stat-card__unit">pts</span>
                  </div>
                  <div className="referral-stat-card__label">Points Earned</div>
                </div>
                <div className="referral-stat-card__sub">
                  Direct referral rewards
                </div>
              </div>

              <div className="referral-stat-card">
                <div className="referral-stat-card__top">
                  <span className="referral-stat-card__icon-wrap">
                    <Award size={18} />
                  </span>
                  <span className="referral-stat-card__pill">Available</span>
                </div>
                <div className="referral-stat-card__body">
                  <div className="referral-stat-card__value">
                    {balance.balance.toLocaleString('en-IN')}
                    <span className="referral-stat-card__unit">pts</span>
                  </div>
                  <div className="referral-stat-card__label">Live Balance</div>
                </div>
                <div className="referral-stat-card__sub">
                  Spendable on vouchers
                </div>
              </div>
            </div>

            {/* Main Interactive Referral Card */}
            <section className="referral-card-main" aria-label="Referral console">
              <header className="referral-card-main__header">
                <div className="referral-card-main__badge">
                  <ShieldCheck size={14} />
                  <span>Eco-Ambassador Program · Dual Reward</span>
                </div>
                <h2 className="referral-card-main__title">
                  Invite Friends. Earn +100 Green Points.
                </h2>
                <p className="referral-card-main__description">
                  Help friends declutter broken or obsolete gadgets safely through authorized zero-landfill channels. When they complete their first pickup, both of you are rewarded with 100 verified Green Points.
                </p>
              </header>

              <div className="referral-interactive-grid">
                {/* Left Column: Share console */}
                <div className="referral-console">
                  {/* Unique Code Block */}
                  <div className="referral-field-group">
                    <label className="referral-field-label">Your Referral Code</label>
                    <div className="referral-code-banner">
                      <div className="referral-code-display">
                        <span className="referral-code-text">{referralCode}</span>
                        <span className="referral-code-sub">Unique ambassador ID</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className={`btn ${copiedCode ? 'btn--success' : 'btn--secondary'} btn--sm tap-effect`}
                      >
                        {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedCode ? 'Code Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Direct Link Block */}
                  <div className="referral-field-group">
                    <label className="referral-field-label">Direct Registration Link</label>
                    <div className="referral-input-action">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="referral-text-input"
                        onClick={(e) => e.target.select()}
                        aria-label="Direct registration URL"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="btn btn--primary btn--sm tap-effect"
                      >
                        {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Social & Channel Quick Sharing */}
                  <div className="referral-field-group">
                    <label className="referral-field-label">Quick Share</label>
                    <div className="referral-buttons-row">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--whatsapp btn--sm tap-effect"
                      >
                        <Send size={14} />
                        <span>Share on WhatsApp</span>
                      </a>

                      <a
                        href={emailUrl}
                        className="btn btn--secondary btn--sm tap-effect"
                      >
                        <Mail size={14} />
                        <span>Email Invite</span>
                      </a>

                      {typeof navigator !== 'undefined' && 'share' in navigator && (
                        <button
                          type="button"
                          onClick={handleNativeShare}
                          className="btn btn--secondary btn--sm tap-effect"
                        >
                          {shareSuccess ? <Check size={14} /> : <Share2 size={14} />}
                          <span>{shareSuccess ? 'Shared!' : 'More Apps'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: QR Code Station */}
                <div className="referral-qr-station">
                  <div className="referral-qr-header">
                    <QrIcon size={16} />
                    <span>Instant Camera Scan</span>
                  </div>
                  <div className="referral-qr-box">
                    <QrCode
                      value={shareUrl}
                      label={`Scan to register with referral code ${referralCode}`}
                      size={144}
                    />
                  </div>
                  <p className="referral-qr-hint">
                    Point any phone camera to register with your code pre-filled automatically.
                  </p>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <footer className="referral-card-main__footer">
                <div className="referral-footer-icon">
                  <ShieldCheck size={16} />
                </div>
                <div className="referral-footer-text">
                  <strong>CPCB-Aligned Verification:</strong> Points are automatically credited to your wallet the moment our certified collection executive scans and confirms the device handover.
                </div>
              </footer>
            </section>
          </div>
        )}
      </AsyncView>
    </div>
  );
}
