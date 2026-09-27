import { formatInt, formatKg } from '../../../lib/format.js';

/** Checkbox list of lots that are at the hub and not yet on a shipment. */
export function LotPicker({ lots, selected, onToggle, legend }) {
  return (
    <fieldset className="stack stack--sm" style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="field__label" style={{ marginBottom: 6 }}>{legend}</legend>
      {lots.map((l) => (
        <label key={l.id} className="checkbox">
          <input type="checkbox" checked={selected.has(l.id)} onChange={() => onToggle(l.id)} />
          <span><span className="mono">{l.sealTag}</span> · {l.agentName} · {formatInt(l.hubUnitCount)} units · {formatKg(l.hubNetKg)}</span>
        </label>
      ))}
    </fieldset>
  );
}
