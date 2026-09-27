import { useId } from 'react';

/** Label + control + hint/error wiring with correct ARIA relationships. */
export function Field({ label, hint, error, children, className }) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      {label && <label className="field__label" htmlFor={id}>{label}</label>}
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && !error && <span id={hintId} className="field__hint">{hint}</span>}
      {error && <span id={errorId} className="field__error" role="alert">{error}</span>}
    </div>
  );
}

export function TextField({ label, hint, error, className, ...inputProps }) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {(a11y) => <input className="input" {...a11y} {...inputProps} />}
    </Field>
  );
}

export function SelectField({ label, hint, error, className, children, ...selectProps }) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {(a11y) => <select className="select" {...a11y} {...selectProps}>{children}</select>}
    </Field>
  );
}

export function TextAreaField({ label, hint, error, className, ...props }) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {(a11y) => <textarea className="textarea" {...a11y} {...props} />}
    </Field>
  );
}

export function Segmented({ name, value, onChange, options, label }) {
  return (
    <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
      {label && <legend className="field__label" style={{ marginBottom: 6 }}>{label}</legend>}
      <div className="segmented">
        {options.map((o) => (
          <label key={o.value}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
