import { Button } from '../ui/Button.jsx';

export function LoadingState({ rows = 3, label = 'Loading' }) {
  return (
    <div className="state" role="status" aria-live="polite" style={{ justifyItems: 'stretch' }}>
      <span className="visually-hidden">{label}…</span>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton" style={{ width: `${90 - i * 14}%` }} />
      ))}
    </div>
  );
}

export function EmptyState({ title, text, action }) {
  return (
    <div className="state">
      <p className="state__title">{title}</p>
      {text && <p className="state__text">{text}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ error, onRetry, action }) {
  if (error?.status === 403) {
    return (
      <div className="state">
        <p className="state__title">You don’t have access to this</p>
        <p className="state__text">This page belongs to a different role. If you think this is wrong, contact the EcoSure helpdesk.</p>
        {action}
      </div>
    );
  }
  if (error?.status === 404) {
    return (
      <div className="state">
        <p className="state__title">Not found</p>
        <p className="state__text">{error.message}</p>
      </div>
    );
  }
  return (
    <div className="state" role="alert">
      <p className="state__title">We couldn’t load this</p>
      <p className="state__text">{error?.message ?? 'Something went wrong.'}</p>
      {onRetry && <Button variant="secondary" onClick={() => onRetry()}>Try again</Button>}
    </div>
  );
}

/**
 * Renders the right state for a useAsync result.
 * `isEmpty(data)` decides when to show the empty state.
 */
export function AsyncView({ query, isEmpty, empty, loadingRows, render, children }) {
  if (query.status === 'loading' && !query.data) return <LoadingState rows={loadingRows} />;
  if (query.status === 'error' && !query.data) return <ErrorState error={query.error} onRetry={query.reload} />;
  if (isEmpty?.(query.data)) return empty ?? <EmptyState title="Nothing here yet" />;
  const renderFn = typeof children === 'function' ? children : (typeof render === 'function' ? render : null);
  if (renderFn) return renderFn(query.data);
  return children ?? null;
}
