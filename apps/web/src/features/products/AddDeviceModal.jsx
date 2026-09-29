import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button.jsx';
import { TextField, SelectField, TextAreaField } from '../../components/ui/Field.jsx';
import { QrScanner } from '../../components/qr/QrScanner.jsx';
import { parseQrId } from '../../components/qr/QrScanner.jsx';
import { productsApi } from './products.api.js';

// ─── helpers ────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'scan', label: 'Scan label', icon: ScanIcon },
  { id: 'code', label: 'Enter code', icon: KeyIcon },
  { id: 'manual', label: 'Add manually', icon: PencilIcon },
];

const CATEGORIES = [
  'Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Television',
  'Refrigerator', 'Washing machine', 'Air conditioner', 'Microwave',
  'Camera', 'Printer', 'Gaming console', 'Speaker / headphones', 'Other',
];

const CONDITIONS = [
  { value: 'working', label: 'Working' },
  { value: 'partially_working', label: 'Partially working' },
  { value: 'not_working', label: 'Not working' },
];

// ─── icons (inline SVG so no extra dep) ─────────────────────────────────────

function ScanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
function KeyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function PhotoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

// ─── sub‑panels ──────────────────────────────────────────────────────────────

function ScanTab({ onSuccess }) {
  const navigate = useNavigate();
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (qrId) => {
    setClaiming(true);
    setError(null);
    try {
      await productsApi.claim(qrId);
      onSuccess?.();
      navigate(`/p/${qrId}`);
    } catch (e) {
      setError(e?.message ?? 'Could not claim this device. Try again.');
      setClaiming(false);
    }
  };

  return (
    <div className="add-device-tab">
      <QrScanner label="Scan the product label" onScan={handleScan} />
      {claiming && <p className="add-device-tab__status">Claiming device…</p>}
      {error && <p className="field__error" role="alert">{error}</p>}
    </div>
  );
}

function CodeTab({ onSuccess }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const id = parseQrId(code);
    if (!id) { setError('Enter the 18-character code printed under the QR label.'); return; }
    setError(null);
    setBusy(true);
    try {
      await productsApi.claim(id);
      onSuccess?.();
      navigate(`/p/${id}`);
    } catch (e) {
      setError(e?.message ?? 'Could not find a device with that code.');
      setBusy(false);
    }
  };

  return (
    <div className="add-device-tab">
      <p className="add-device-tab__desc">
        Type the 18-character alphanumeric code printed underneath the QR sticker on your product.
      </p>
      <div className="field">
        <label className="field__label" htmlFor="device-code">Code under the label</label>
        <input
          id="device-code"
          className="input input--code"
          placeholder="e.g. 4a9f2b1c0e8d3f7a21"
          autoComplete="off"
          spellCheck={false}
          maxLength={20}
          value={code}
          onChange={(e) => { setCode(e.target.value.toLowerCase().replace(/[^0-9a-f]/g, '')); setError(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          aria-invalid={error ? true : undefined}
        />
        {error && <span className="field__error" role="alert">{error}</span>}
        <span className="field__hint">{code.length}/18 characters</span>
      </div>
      <Button variant="primary" block loading={busy} disabled={code.length < 18} onClick={submit}>
        Claim device
      </Button>
    </div>
  );
}

function ManualTab({ onSuccess, onClose }) {
  const fileRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [planMode, setPlanMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    category: '',
    brand: '',
    modelName: '',
    serialNumber: '',
    yearOfPurchase: '',
    condition: 'working',
    notes: '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!form.category) { setError('Please select a category.'); return; }
    setError(null);
    setBusy(true);
    try {
      // Upload photo first if provided
      let photoUrl = null;
      if (photoFile) {
        const fd = new FormData();
        fd.append('file', photoFile);
        photoUrl = await productsApi.uploadPhoto(fd);
      }
      await productsApi.addManual({ ...form, photoUrl, planMode });
      onSuccess?.();
      onClose?.();
    } catch (e) {
      setError(e?.message ?? 'Could not save the product. Please try again.');
      setBusy(false);
    }
  };

  return (
    <div className="add-device-tab add-device-tab--manual">
      {/* Plan mode banner */}
      <label className="plan-mode-toggle">
        <input
          type="checkbox"
          checked={planMode}
          onChange={(e) => setPlanMode(e.target.checked)}
        />
        <span className="plan-mode-toggle__track">
          <span className="plan-mode-toggle__thumb" />
        </span>
        <span className="plan-mode-toggle__label">
          Plan mode
          <span className="plan-mode-toggle__hint">Mark this product for future recycling — no claim needed now.</span>
        </span>
      </label>

      {/* Photo upload */}
      <div className="photo-upload" onClick={() => fileRef.current?.click()}>
        {photoPreview
          ? <img src={photoPreview} alt="Product photo" className="photo-upload__img" />
          : (
            <div className="photo-upload__placeholder">
              <PhotoIcon />
              <span>Add product photo</span>
              <span className="photo-upload__hint">Tap to choose from gallery</span>
            </div>
          )
        }
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
      </div>

      {/* Form grid */}
      <div className="form-grid">
        <div className="field">
          <label className="field__label" htmlFor="manual-category">Category <span style={{ color: 'var(--color-danger)' }}>*</span></label>
          <select id="manual-category" className="select" value={form.category} onChange={set('category')} aria-required="true">
            <option value="">Select a category…</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-grid form-grid--2">
          <div className="field">
            <label className="field__label" htmlFor="manual-brand">Brand</label>
            <input id="manual-brand" className="input" placeholder="e.g. Samsung" value={form.brand} onChange={set('brand')} />
            <span className="field__hint">Optional</span>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="manual-model">Model name</label>
            <input id="manual-model" className="input" placeholder="e.g. Galaxy S23" value={form.modelName} onChange={set('modelName')} />
            <span className="field__hint">Optional</span>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="manual-serial">Serial / IMEI</label>
            <input id="manual-serial" className="input" placeholder="Optional" value={form.serialNumber} onChange={set('serialNumber')} autoComplete="off" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="manual-year">Year of purchase</label>
            <input id="manual-year" className="input" type="number" placeholder="e.g. 2021" min="1990" max={new Date().getFullYear()} value={form.yearOfPurchase} onChange={set('yearOfPurchase')} />
          </div>
        </div>

        <div className="field">
          <label className="field__label">Condition</label>
          <div className="segmented">
            {CONDITIONS.map((c) => (
              <label key={c.value}>
                <input type="radio" name="condition" value={c.value} checked={form.condition === c.value} onChange={set('condition')} />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="manual-notes">Notes</label>
          <textarea id="manual-notes" className="textarea" placeholder="Any other details about this product…" value={form.notes} onChange={set('notes')} />
          <span className="field__hint">Optional — visible only to you</span>
        </div>
      </div>

      {error && <p className="field__error" role="alert">{error}</p>}

      <div className="form-actions">
        <Button variant="secondary" onClick={onClose} disabled={busy}>Cancel</Button>
        <Button variant="primary" loading={busy} onClick={submit}>Save product</Button>
      </div>
    </div>
  );
}

// ─── main modal ──────────────────────────────────────────────────────────────

/**
 * Full-screen slide-up modal (mobile-first) for registering a device via
 * QR scan, code entry, or manual form.
 */
export function AddDeviceModal({ onClose, onSuccess }) {
  const [tab, setTab] = useState('scan');

  // Close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label="Add a device">
      <div className="modal">
        {/* Header */}
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">Register a product</p>
            <h2 className="modal__title">Add a device</h2>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Tab bar */}
        <div className="modal__tabs" role="tablist">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`modal__tab${tab === id ? ' modal__tab--active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>

        {/* Tab bodies */}
        <div className="modal__body">
          {tab === 'scan'   && <ScanTab   onSuccess={onSuccess} />}
          {tab === 'code'   && <CodeTab   onSuccess={onSuccess} />}
          {tab === 'manual' && <ManualTab onSuccess={onSuccess} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}
