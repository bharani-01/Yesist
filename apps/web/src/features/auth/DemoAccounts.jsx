import { useEffect, useState } from 'react';
import { 
  User, Shield, Truck, Recycle, Building2, Factory, Check, 
  ChevronRight 
} from 'lucide-react';
import { authApi } from './auth.api.js';

function getRoleMeta(account) {
  const email = account.email.toLowerCase();

  if (email.includes('spcb') || email.includes('cpcb')) {
    return {
      icon: <Shield size={15} strokeWidth={2} />,
      badge: 'Regulator',
      color: '#059669',
      bg: 'rgba(16, 185, 129, 0.08)',
    };
  }
  if (email.includes('imc') || email.includes('ulb') || email.includes('operator')) {
    return {
      icon: <Building2 size={15} strokeWidth={2} />,
      badge: 'City Govt',
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.08)',
    };
  }
  if (email.includes('shop') || email.includes('agent')) {
    return {
      icon: <Truck size={15} strokeWidth={2} />,
      badge: 'Kabadi Wala',
      color: '#d97706',
      bg: 'rgba(217, 119, 6, 0.08)',
    };
  }
  if (email.includes('hub')) {
    return {
      icon: <Truck size={15} strokeWidth={2} />,
      badge: 'Hub',
      color: '#ea580c',
      bg: 'rgba(234, 88, 12, 0.08)',
    };
  }
  if (email.includes('recycler')) {
    return {
      icon: <Recycle size={15} strokeWidth={2} />,
      badge: 'Recycler',
      color: '#16a34a',
      bg: 'rgba(22, 163, 74, 0.08)',
    };
  }
  if (email.includes('producer')) {
    return {
      icon: <Factory size={15} strokeWidth={2} />,
      badge: 'Producer',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.08)',
    };
  }
  return {
    icon: <User size={15} strokeWidth={2} />,
    badge: 'Citizen',
    color: '#475569',
    bg: 'rgba(71, 85, 105, 0.08)',
  };
}

const DEFAULT_DEMO = {
  password: 'Password123!',
  accounts: [
    { email: 'citizen@ecosure.test', workspace: 'citizen', label: 'Citizen' },
    { email: 'shop@ecosure.test', workspace: 'agent', label: 'Local Kabadi Wala' },
    { email: 'recycler.maker@ecosure.test', workspace: 'recycler', label: 'Recycler' },
    { email: 'hub@ecosure.test', workspace: 'hub', label: 'Regional hub' },
    { email: 'producer.owner@ecosure.test', workspace: 'producer', label: 'Manufacturer' },
    { email: 'spcb@ecosure.test', workspace: 'oversight', label: 'Pollution control board officer' },
  ],
};

export function DemoAccounts({ onPick, selectedEmail }) {
  const [demo, setDemo] = useState(DEFAULT_DEMO);

  useEffect(() => {
    const controller = new AbortController();
    authApi.demoAccounts(controller.signal)
      .then((data) => {
        if (data?.accounts?.length) setDemo(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!demo?.accounts?.length) return null;

  return (
    <div className="demo-panel">
      {/* Header */}
      <div className="demo-panel__header">
        <h3 className="demo-panel__title">Quick Role Switcher</h3>
      </div>

      {/* Direct Clean Role List */}
      <div className="demo-panel__list">
        {demo.accounts.map((a) => {
          const isSelected = selectedEmail === a.email;
          const meta = getRoleMeta(a);

          return (
            <button
              key={a.email}
              type="button"
              className={`demo-item ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onPick({ email: a.email, password: demo.password })}
            >
              <div className="demo-item__left">
                <div 
                  className="demo-item__icon"
                  style={{ color: meta.color, background: meta.bg }}
                >
                  {meta.icon}
                </div>
                <div className="demo-item__info">
                  <div className="demo-item__label-row">
                    <span className="demo-item__label">{a.label}</span>
                    <span 
                      className="demo-item__badge"
                      style={{ color: meta.color, background: meta.bg }}
                    >
                      {meta.badge}
                    </span>
                  </div>
                  <span className="demo-item__email">{a.email}</span>
                </div>
              </div>

              <div className="demo-item__right">
                {isSelected ? (
                  <span className="demo-item__check">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                ) : (
                  <ChevronRight size={15} className="demo-item__arrow" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="demo-panel__footer">
        <span className="demo-panel__hint">Password is auto-filled for all demo accounts</span>
      </div>
    </div>
  );
}
