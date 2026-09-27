import { Link, NavLink, Outlet } from 'react-router-dom';
import { HOME_BY_WORKSPACE, WORKSPACE_LABELS, useAuth } from '../../features/auth/AuthProvider.jsx';
import { Button } from '../ui/Button.jsx';
import { Logo } from './Logo.jsx';
const NAV = {
  citizen: [
    { to: '/pickups', label: 'My pickups', end: true },
    { to: '/pickups/new', label: 'Book a pickup' },
    { to: '/devices', label: 'My devices' },
  ],
  agent: [{ to: '/agent', label: 'Jobs and lots', end: true }],
  recycler: [{ to: '/recycler', label: 'Inbound lots', end: true }],
  hub: [
    { to: '/hub', label: 'Lots', end: true },
    { to: '/hub/shipments', label: 'Shipments' },
  ],
  producer: [
    { to: '/producer', label: 'Outcomes', end: true },
    { to: '/producer/models', label: 'Models' },
    { to: '/producer/batches', label: 'Batches' },
    { to: '/producer/units', label: 'Units' },
  ],
  oversight: [{ to: '/oversight', label: 'Overview and flags', end: true }],
};

export function AppShell() {
  const auth = useAuth();
  const user = auth.user;
  const links = user ? NAV[user.workspace] ?? [] : [];
  return (
    <div className="shell">
      <a href="#main" className="visually-hidden">Skip to content</a>
      <header className="header">
        <div className="header__inner">
          <Link to={user ? HOME_BY_WORKSPACE[user.workspace] ?? '/' : '/'} className="brand">
            <Logo />
            {user && <span className="brand__workspace">{WORKSPACE_LABELS[user.workspace]}</span>}
          </Link>
          <nav className="nav" aria-label="Primary">
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>)}
            <NavLink to="/verify">Verify certificate</NavLink>
          </nav>
          <div className="user">
            {user ? (
              <>
                <span className="user__name" title={user.email}>{user.orgs?.[0]?.name ?? user.fullName}</span>
                <Button variant="secondary" size="sm" onClick={auth.logout}>Sign out</Button>
              </>
            ) : auth.status === 'anonymous' ? (
              <Link to="/login" className="btn btn--secondary btn--sm">Sign in</Link>
            ) : null}
          </div>
        </div>
      </header>
      <main id="main" className="main">
        <Outlet />
      </main>
    </div>
  );
}
