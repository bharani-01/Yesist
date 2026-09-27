export function Button({ variant = 'primary', size, block, loading = false, disabled, children, type = 'button', ...rest }) {
  const className = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', rest.className].filter(Boolean).join(' ');
  return (
    <button {...rest} type={type} className={className} disabled={disabled || loading} aria-busy={loading || undefined}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
