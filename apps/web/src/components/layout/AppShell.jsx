import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen, LogOut, User as UserIcon } from 'lucide-react';
import { HOME_BY_WORKSPACE, WORKSPACE_LABELS, useAuth } from '../../features/auth/AuthProvider.jsx';
import { Button } from '../ui/Button.jsx';
import { Logo } from './Logo.jsx';

function Icon({ name }) {
  if (name === 'dashboard') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    );
  }
  if (name === 'products' || name === 'devices') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  }
  if (name === 'plus') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    );
  }
  if (name === 'lots' || name === 'package') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v8.86a1.78 1.78 0 0 0 .86 1.53l9.05 5.23a1.78 1.78 0 0 0 2.5-1.54V11a1.78 1.78 0 0 0-.96-1.6Z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" x2="12" y1="22" y2="12" />
      </svg>
    );
  }
  if (name === 'shipments' || name === 'truck') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-5.5a1.5 1.5 0 0 0-.44-1.06L18.5 7.38A1.5 1.5 0 0 0 17.44 7H14" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  }
  if (name === 'models' || name === 'layers') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }
  if (name === 'batches' || name === 'database') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }
  if (name === 'units' || name === 'tag') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
    );
  }
  if (name === 'requests' || name === 'inbox') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    );
  }
  if (name === 'id-card') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    );
  }
  if (name === 'oversight' || name === 'activity') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }
  if (name === 'rewards') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }
  if (name === 'verify') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name === 'referral' || name === 'gift' || name === 'users') {
    return (
      <svg className="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return null;
}

const NAV = {
  citizen: [
    { to: '/pickups', label: 'Dashboard', icon: 'dashboard', end: true },
    { to: '/devices', label: 'My Products', icon: 'devices' },
    { to: '/rewards', label: 'Green Points', icon: 'rewards' },
    { to: '/referral', label: 'Referral Hub', icon: 'referral', badge: '+100 pts' },
    { to: '/pickups/new', label: 'Book a Pickup', icon: 'plus' },
  ],
  agent: [
    { to: '/agent', label: 'Dashboard', icon: 'dashboard', end: true },
    { to: '/agent/requests', label: 'Open Requests', icon: 'requests' },
    { to: '/agent/pickups', label: 'My Pickups', icon: 'shipments' },
    { to: '/agent/lots', label: 'Sealed Lots', icon: 'lots' },
    { to: '/agent/id-card', label: 'Agent ID Card', icon: 'id-card' },
  ],
  recycler: [
    { to: '/recycler', label: 'Inbound Lots', icon: 'lots', end: true },
  ],
  hub: [
    { to: '/hub', label: 'Lots Inventory', icon: 'lots', end: true },
    { to: '/hub/shipments', label: 'Shipments', icon: 'shipments' },
  ],
  producer: [
    { to: '/producer', label: 'Outcomes', icon: 'dashboard', end: true },
    { to: '/producer/models', label: 'Models', icon: 'models' },
    { to: '/producer/batches', label: 'Batches', icon: 'batches' },
    { to: '/producer/units', label: 'Units', icon: 'units' },
  ],
  oversight: [
    { to: '/oversight', label: 'Overview & Flags', icon: 'oversight', end: true },
    { to: '/oversight/whatsapp', label: 'WhatsApp Bot', icon: 'activity' },
  ],
};

export function AppShell() {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth.user;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('ecosure_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const links = user ? NAV[user.workspace] ?? [] : [];

  const handleLogout = async () => {
    try {
      await auth.logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ecosure_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapsed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const displayName = user?.fullName ?? user?.orgs?.[0]?.name ?? 'User';

  return (
    <div className="shell">
      <a href="#main" className="visually-hidden">Skip to content</a>

      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <Link to={user ? HOME_BY_WORKSPACE[user.workspace] ?? '/' : '/'} className="brand">
          <Logo />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user?.workspace === 'citizen' && (
            <Link to="/referral" className="mobile-referral-chip">
              <Icon name="referral" />
              <span>Refer</span>
              <span className="chip-badge">+100</span>
            </Link>
          )}
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}

      {/* Vertical Sidebar */}
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__header-row">
            <Link 
              to={user ? HOME_BY_WORKSPACE[user.workspace] ?? '/' : '/'} 
              className="brand" 
              onClick={() => setMobileOpen(false)}
              title="EcoSure Home"
            >
              <Logo />
            </Link>
            <button
              type="button"
              className="sidebar__toggle-btn"
              onClick={toggleCollapsed}
              aria-label={collapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
              title={collapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
          {user && user.workspace !== 'citizen' && (
            <span className="brand__workspace">{WORKSPACE_LABELS[user.workspace]}</span>
          )}
        </div>

        <nav className="sidebar__nav" aria-label="Primary Navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? l.label : undefined}
            >
              <Icon name={l.icon} />
              <span className="nav-link__text">{l.label}</span>
              {l.badge && !collapsed && (
                <span className="nav-link__badge">{l.badge}</span>
              )}
              {collapsed && <span className="nav-link__tooltip">{l.label}</span>}
            </NavLink>
          ))}
        </nav>

        {user?.workspace === 'citizen' && !collapsed && (
          <div className="sidebar__referral-box">
            <div className="sidebar__referral-head">
              <span className="sidebar__referral-tag">Referral Bonus</span>
              <span className="sidebar__referral-pts">+100 pts</span>
            </div>
            <p className="sidebar__referral-text">
              Invite friends to recycle electronics. Earn 100 pts per completed pickup.
            </p>
            <Link to="/referral" className="sidebar__referral-link" onClick={() => setMobileOpen(false)}>
              Invite Friends →
            </Link>
          </div>
        )}

        <div className="sidebar__footer">
          {user ? (
            <div className={`user-card ${collapsed ? 'user-card--collapsed' : ''}`}>
              <div className="user-avatar" title={`${displayName} (${user.orgs?.[0]?.name ?? user.email})`}>
                {getInitials(displayName)}
              </div>
              <div className="user-details">
                <span className="user-name" title={displayName}>{displayName}</span>
                <span className="user-email">{user.orgs?.[0]?.name ?? user.email}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                title="Sign out"
                aria-label="Sign out"
                className="user-logout-btn"
              >
                <LogOut size={16} />
              </Button>
            </div>
          ) : auth.status === 'anonymous' ? (
            <Link to="/login" className="btn btn--primary btn--sm btn--block">Sign in</Link>
          ) : null}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        <main id="main" className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

