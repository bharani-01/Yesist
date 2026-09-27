import { Link } from 'react-router-dom';
import { BrandMark } from '../../components/layout/BrandMark.jsx';

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="auth">
      <div className="auth__card">
        <div className="stack stack--sm" style={{ justifyItems: 'center', textAlign: 'center' }}>
          <Link to="/" className="brand"><BrandMark /> EcoSure</Link>
          <h1 style={{ fontSize: 'var(--text-xl)' }}>{title}</h1>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
        <div className="panel auth__panel">{children}</div>
        {footer && <p className="muted" style={{ textAlign: 'center', fontSize: 'var(--text-sm)' }}>{footer}</p>}
      </div>
    </main>
  );
}
