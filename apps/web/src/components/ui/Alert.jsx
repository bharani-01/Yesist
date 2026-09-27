export function Alert({ tone = 'info', title, children }) {
  return (
    <div className={`alert alert--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <div>
        {title && <strong style={{ display: 'block' }}>{title}</strong>}
        {children}
      </div>
    </div>
  );
}

/** Shows an ApiError message (with reference id for support) or nothing. */
export function ErrorAlert({ error }) {
  if (!error) return null;
  return (
    <Alert tone="error">
      {error.message}
      {error.requestId && <span className="subtle" style={{ display: 'block' }}>Reference: <span className="mono">{error.requestId.slice(0, 8)}</span></span>}
    </Alert>
  );
}
