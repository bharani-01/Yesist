import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button.jsx';
import { QrScanner, parseQrId } from '../../components/qr/QrScanner.jsx';
import { productsApi } from './products.api.js';

// ─── categories ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Television',
  'Refrigerator', 'Washing machine', 'Air conditioner', 'Microwave',
  'Camera', 'Printer', 'Gaming console', 'Speaker / headphones', 'Other',
];

const CONDITIONS = [
  { value: 'working',           label: 'Working' },
  { value: 'partially_working', label: 'Partially working' },
  { value: 'not_working',       label: 'Not working' },
];

// ─── icons ───────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ScanQrIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="7" y="7" width="4" height="4" />
      <rect x="13" y="7" width="4" height="4" />
      <rect x="7" y="13" width="4" height="4" />
      <line x1="13" y1="13" x2="17" y2="13" />
      <line x1="17" y1="13" x2="17" y2="17" />
    </svg>
  );
}

// ─── modal ───────────────────────────────────────────────────────────────────

export function AddDeviceModal({ onClose, onSuccess }) {
  const navigate  = useNavigate();
  const fileRef   = useRef(null);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile,    setPhotoFile]    = useState(null);
  const [scanOpen,     setScanOpen]     = useState(false);
  const [busy,         setBusy]         = useState(false);
  const [error,        setError]        = useState(null);

  const [form, setForm] = useState({
    category:      '',
    brand:         '',
    modelName:     '',
    serialNumber:  '',
    yearOfPurchase:'',
    condition:     'working',
    notes:         '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // ── photo ─────────────────────────────────────────────────────────────────
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── QR scan callback ──────────────────────────────────────────────────────
  const handleScan = async (qrId) => {
    setScanOpen(false);
    setBusy(true);
    setError(null);
    try {
      await productsApi.claim(qrId);
      onSuccess?.();
      navigate(`/p/${qrId}`);
    } catch (e) {
      setError(e?.message ?? 'Could not claim this device. Try again.');
      setBusy(false);
    }
  };

  // ── submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) { setError('Please select a category.'); return; }
    setError(null);
    setBusy(true);
    try {
      let photoUrl = null;
      if (photoFile) {
        const fd = new FormData();
        fd.append('file', photoFile);
        photoUrl = await productsApi.uploadPhoto(fd);
      }
      await productsApi.addManual({ ...form, photoUrl });
      onSuccess?.();
      onClose();
    } catch (e) {
      setError(e?.message ?? 'Could not save the product. Please try again.');
      setBusy(false);
    }
  };

  // close on backdrop click
  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-backdrop" onClick={onBackdrop} role="dialog" aria-modal="true" aria-label="Add a device">
      <div className="modal">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">Register a product</p>
            <h2 className="modal__title">Add a device</h2>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <form className="modal__body add-device-form" onSubmit={handleSubmit} noValidate>

          {/* QR scanner (inline, collapsed by default) */}
          <div className="add-device-qr-row">
            <span className="add-device-qr-label">Have an EcoSure QR label?</span>
            <button
              type="button"
              className={`btn btn--sm ${scanOpen ? 'btn--secondary' : 'btn--ghost'}`}
              onClick={() => setScanOpen((v) => !v)}
              aria-expanded={scanOpen}
            >
              <ScanQrIcon />
              {scanOpen ? 'Close scanner' : 'Scan QR'}
            </button>
          </div>

          {scanOpen && (
            <div className="add-device-scanner-wrap">
              <QrScanner label="Scan the product label" onScan={handleScan} />
            </div>
          )}

          {/* Divider */}
          <div className="add-device-divider">
            <span>or fill in the details below</span>
          </div>

          {/* Photo upload */}
          <div
            className="photo-upload"
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload product photo"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileRef.current?.click(); }}
          >
            {photoPreview
              ? <img src={photoPreview} alt="Product photo preview" className="photo-upload__img" />
              : (
                <div className="photo-upload__placeholder">
                  <PhotoIcon />
                  <span>Add product photo</span>
                  <span className="photo-upload__hint">Tap to choose — optional</span>
                </div>
              )
            }
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
          </div>

          {/* Form fields */}
          <div className="form-grid">

            {/* Category */}
            <div className="field">
              <label className="field__label" htmlFor="f-category">
                Category <span className="field__required" aria-hidden="true">*</span>
              </label>
              <select id="f-category" className="select" value={form.category} onChange={set('category')} required>
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Brand + Model */}
            <div className="form-grid form-grid--2">
              <div className="field">
                <label className="field__label" htmlFor="f-brand">Brand</label>
                <input id="f-brand" className="input" placeholder="e.g. Samsung" value={form.brand} onChange={set('brand')} />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-model">Model</label>
                <input id="f-model" className="input" placeholder="e.g. Galaxy S23" value={form.modelName} onChange={set('modelName')} />
              </div>
            </div>

            {/* Serial + Year */}
            <div className="form-grid form-grid--2">
              <div className="field">
                <label className="field__label" htmlFor="f-serial">Serial / IMEI</label>
                <input id="f-serial" className="input" placeholder="Optional" value={form.serialNumber} onChange={set('serialNumber')} autoComplete="off" />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-year">Year of purchase</label>
                <input
                  id="f-year" className="input" type="number"
                  placeholder={String(new Date().getFullYear())}
                  min="1990" max={new Date().getFullYear()}
                  value={form.yearOfPurchase} onChange={set('yearOfPurchase')}
                />
              </div>
            </div>

            {/* Condition */}
            <div className="field">
              <span className="field__label">Condition</span>
              <div className="segmented">
                {CONDITIONS.map((c) => (
                  <label key={c.value}>
                    <input type="radio" name="condition" value={c.value}
                           checked={form.condition === c.value} onChange={set('condition')} />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="field">
              <label className="field__label" htmlFor="f-notes">Notes</label>
              <textarea id="f-notes" className="textarea"
                placeholder="Any other details — visible only to you"
                value={form.notes} onChange={set('notes')} />
            </div>
          </div>

          {error && <p className="field__error" role="alert">{error}</p>}

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={onClose} disabled={busy}>Cancel</Button>
            <Button type="submit" variant="primary" loading={busy}>Save product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
