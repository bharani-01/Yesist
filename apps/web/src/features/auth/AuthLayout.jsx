import { Link } from 'react-router-dom';
import { Logo } from '../../components/layout/Logo.jsx';

export function AuthLayout({ title, children, footer }) {
  return (
    <main className="auth">
      <div className="auth__card">
        <div className="auth__head">
          <Link to="/" className="brand"><Logo size={28} /></Link>
          <h1 className="auth__title">{title}</h1>
        </div>
        <div className="panel auth__panel">{children}</div>
        {footer && <div className="auth__footer">{footer}</div>}
      </div>
    </main>
  );
}
