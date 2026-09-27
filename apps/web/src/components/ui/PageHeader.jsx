import { Link } from 'react-router-dom';

export function PageHeader({ title, description, back, actions }) {
  return (
    <header className="page-header">
      <div className="page-header__text">
        {back && <Link className="page-header__back" to={back.to}>← {back.label}</Link>}
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {actions && <div className="row">{actions}</div>}
    </header>
  );
}
