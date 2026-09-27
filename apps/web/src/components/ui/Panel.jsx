export function Panel({ title, actions, children, flush = false, as: Tag = 'section', ...rest }) {
  return (
    <Tag className="panel" {...rest}>
      {(title || actions) && (
        <header className="panel__header">
          {typeof title === 'string' ? <h2>{title}</h2> : title}
          {actions && <div className="row">{actions}</div>}
        </header>
      )}
      <div className={flush ? 'panel__body panel__body--flush' : 'panel__body'}>{children}</div>
    </Tag>
  );
}
