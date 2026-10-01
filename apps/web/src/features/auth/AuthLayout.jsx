import { Link } from 'react-router-dom';
import { Logo } from '../../components/layout/Logo.jsx';

export function AuthLayout({ title, subtitle, children, footer, sidebar }) {
  return (
    <main className="auth-page">
      <div className={`auth-container ${sidebar ? 'auth-container--with-sidebar' : ''}`}>
        {/* Main Sign In / Form Card */}
        <div className="auth-card auth-card--main">
          {/* Brand Header */}
          <div className="auth-card__brand">
            <Link to="/" className="brand">
              <Logo size={32} />
            </Link>
          </div>

          {/* Header Text */}
          <div className="auth-card__header">
            <h1 className="auth-card__title">{title}</h1>
            {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
          </div>

          {/* Main Form Content */}
          <div className="auth-card__content">
            {children}
          </div>

          {/* Footer Links */}
          {footer && (
            <div className="auth-card__footer">
              {footer}
            </div>
          )}
        </div>

        {/* Right Sidebar (e.g. Quick Role Switcher) */}
        {sidebar && (
          <div className="auth-card auth-card--sidebar">
            {sidebar}
          </div>
        )}
      </div>
    </main>
  );
}
