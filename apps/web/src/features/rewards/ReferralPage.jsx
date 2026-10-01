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
            {/* Editorial Performance Metrics Strip */}
            <section className="referral-metrics-strip" aria-label="Referral Performance">
              <div className="referral-metric-item">
                <span className="referral-metric-item__value">{referral.totalInvites}</span>
                <span className="referral-metric-item__label">Friends Joined</span>
                <span className="referral-metric-item__sub">Registered via your link</span>
              </div>

              <div className="referral-metric-item">
                <span className="referral-metric-item__value referral-metric-item__value--brand">
                  {referral.successfulRecycles}
                </span>
                <span className="referral-metric-item__label">Verified Pickups</span>
                <span className="referral-metric-item__sub">Completed doorstep collections</span>
              </div>

              <div className="referral-metric-item">
                <span className="referral-metric-item__value referral-metric-item__value--brand">
                  +{referral.pointsEarned.toLocaleString('en-IN')}
                  <span style={{ fontSize: '1rem', fontWeight: 600, marginLeft: 3 }}>pts</span>
                </span>
                <span className="referral-metric-item__label">Points Earned</span>
                <span className="referral-metric-item__sub">Direct referral rewards</span>
              </div>
            </section>

            {/* Main Unified Invite Console */}
            <section className="referral-card-main" aria-label="Invite friends console">
              <header className="referral-card-main__header">
                <span className="referral-card-main__eyebrow">Eco-Ambassador Reward</span>
                <h2 className="referral-card-main__title">
                  Give 100 pts. Get 100 pts.
                </h2>
                <p className="referral-card-main__description">
                  Invite friends to safely recycle electronics through EcoSure doorstep collections. You both receive 100 Green Points once their first pickup is verified.
                </p>
              </header>

              <div className="referral-interactive-layout">
                {/* Left: Share Console */}
                <div className="referral-console">
                  {/* Share Bar */}
                  <div className="referral-share-hub">
                    <div className="referral-code-pill">
                      <span className="referral-code-pill__label">Your Invite Code</span>
                      <span className="referral-code-pill__value">{referralCode}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="btn btn--secondary btn--sm tap-effect"
                        title="Copy code only"
                      >
                        {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedCode ? 'Code Copied' : 'Copy Code'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="btn btn--primary btn--sm tap-effect"
                        style={{ background: '#000000', color: '#FFFFFF', border: '1px solid #000000' }}
                      >
                        {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedLink ? 'Link Copied!' : 'Copy Invite Link'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Channels Bar */}
                  <div className="referral-channels-bar">
                    <span className="referral-channels-label">Direct share:</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-channel tap-effect"
                      style={{ background: '#25D366', color: '#FFFFFF', borderColor: '#25D366' }}
                    >
                      <Send size={13} />
                      <span>WhatsApp</span>
                    </a>

                    <a href={emailUrl} className="btn-channel tap-effect">
                      <Mail size={13} />
                      <span>Email</span>
                    </a>

                    {typeof navigator !== 'undefined' && 'share' in navigator && (
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="btn-channel tap-effect"
                      >
                        {shareSuccess ? <Check size={13} /> : <Share2 size={13} />}
                        <span>{shareSuccess ? 'Shared!' : 'More'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Clean QR Pass */}
                <div className="referral-qr-pass">
                  <div style={{ background: '#FFFFFF', padding: 10, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'inline-flex' }}>
                    <QrCode
                      value={shareUrl}
                      label={`Scan to register with referral code ${referralCode}`}
                      size={120}
                    />
                  </div>
                  <span className="referral-qr-pass__caption">
                    Scan with phone camera to register
                  </span>
                </div>
              </div>

              {/* Minimal Trust Footer */}
              <div className="referral-trust-note">
                <ShieldCheck size={15} style={{ color: '#1a7f4b', flexShrink: 0 }} />
                <span>Points credit automatically upon verified device handover at doorstep.</span>
              </div>
            </section>
          </div>
        )}
      </AsyncView>
    </div>
  );
}
