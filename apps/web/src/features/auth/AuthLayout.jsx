import { Link } from 'react-router-dom';

export function AuthLayout({ title, children, footer }) {
  return (
    <main className="auth">
      <div className="auth__card">
        <div className="auth__head">
          <Link to="/" className="brand">EcoSure</Link>
          <h1 className="auth__title">{title}</h1>
        </div>
        <div className="panel auth__panel">{children}</div>
        {footer && <div className="auth__footer">{footer}</div>}
      </div>
    </main>
  );
}
