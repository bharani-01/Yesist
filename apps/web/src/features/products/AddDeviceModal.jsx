import QrScannerLib from 'qr-scanner';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button.jsx';
import { QrScanner, parseQrId } from '../../components/qr/QrScanner.jsx';
import { productsApi } from './products.api.js';

// ─── constants ────────────────────────────────────────────────────────────────

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

// MODE: 'form' | 'guide' | 'scanning' | 'confirming'

// ─── icons ────────────────────────────────────────────────────────────────────

function Icon({ d, size = 20, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      {Array.isArray(d) ? d.map((dd, i) => <path key={i} d={dd} />) : <path d={d} />}
    </svg>
  );
}
const ICONS = {
  close:  'M18 6 6 18M6 6l12 12',
  photo:  ['M21 15l-5-5L5 21', 'M3 3h18v18H3z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3'],
  scan:   ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2'],
  upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  check:  'M20 6 9 17l-5-5',
  arrow:  'M19 12H5M12 5l-7 7 7 7',
  info:   ['M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z', 'M12 8h.01', 'M12 12v4'],
};

function CloseBtn({ onClick, label = 'Close' }) {
  return (
    <button className="modal__close" onClick={onClick} aria-label={label} type="button">
      <Icon d={ICONS.close} size={20} />
    </button>
  );
}

// ─── STAGE 1 — QR Guide overlay ───────────────────────────────────────────────

function QrGuide({ onStartScanning, onClose }) {
  return (
    <div className="qr-guide">
      <div className="qr-guide__header">
        <div>
          <p className="modal__eyebrow">Where to find it</p>
          <h3 className="qr-guide__title">Finding the EcoSure label</h3>
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      <img
        src="/qr-guide.jpg"
        alt="Steps showing where to find the EcoSure QR label on a phone and laptop"
        className="qr-guide__img"
        loading="lazy"
      />

      <ol className="qr-guide__steps">
        <li>
          <span className="qr-guide__step-num">1</span>
          <div>
            <strong>Find the label</strong>
            <p>Look for the green EcoSure sticker — usually on the <em>back or bottom</em> of the device.</p>
          </div>
        </li>
        <li>
          <span className="qr-guide__step-num">2</span>
          <div>
            <strong>Point your camera</strong>
            <p>Hold your phone 10–20 cm away. The code scans automatically — no button needed.</p>
          </div>
        </li>
        <li>
          <span className="qr-guide__step-num">3</span>
          <div>
            <strong>Confirm the product</strong>
            <p>We'll show you the product details. Just tap <em>Confirm &amp; claim</em> to register it.</p>
          </div>
        </li>
      </ol>

      <div className="qr-guide__actions">
        <Button variant="primary" block onClick={onStartScanning}>
          <Icon d={ICONS.scan} size={16} />
          Open scanner
        </Button>
      </div>
    </div>
  );
}

// ─── STAGE 2 — Scanning (camera + upload) ────────────────────────────────────

function ScanningView({ onScanResult, onBack, scanError, setScanError }) {
  const uploadRef = useRef(null);
  const [decoding, setDecoding] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDecoding(true);
    setScanError(null);
    try {
      const result = await QrScannerLib.scanImage(file, { returnDetailedScanResult: true });
      const id = parseQrId(result.data);
      if (!id) { setScanError("That image doesn't contain an EcoSure QR code. Try again."); }
      else { onScanResult(id); }
    } catch {
      setScanError('No QR code found in that image. Try a clearer photo.');
    } finally {
      setDecoding(false);
      e.target.value = '';
    }
  };

  return (
    <div className="scanning-view">
      <button className="scanning-view__back" type="button" onClick={onBack}>
        <Icon d={ICONS.arrow} size={16} /> Back
      </button>

      <div className="scanning-view__camera">
        <QrScanner label="" onScan={onScanResult} />
      </div>

      <div className="scanning-view__or">
        <span>or upload a photo of the label</span>
      </div>

      <button
        type="button"
        className="scanning-view__upload-btn"
        onClick={() => uploadRef.current?.click()}
        disabled={decoding}
      >
        {decoding
          ? <><span className="spinner" aria-hidden="true" /> Decoding…</>
          : <><Icon d={ICONS.upload} size={16} /> Upload label photo</>
        }
      </button>
      <input ref={uploadRef} type="file" accept="image/*" hidden onChange={handleUpload} />

      {scanError && <p className="field__error" role="alert">{scanError}</p>}
    </div>
  );
}

// ─── STAGE 3 — Confirmation card ─────────────────────────────────────────────

function ConfirmView({ product, qrId, onConfirm, onCancel, busy, error }) {
  const state = product?.state ?? '—';
  const name  = [product?.brand, product?.modelName].filter(Boolean).join(' ') || product?.categoryName || 'Device';

  return (
    <div className="confirm-view">
      <div className="confirm-view__pill">
        <Icon d={ICONS.check} size={14} />
        QR code recognised
      </div>

      <div className="confirm-view__card">
        {/* Device identity */}
        <div className="confirm-view__identity">
          <div className="confirm-view__avatar" aria-hidden="true">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="confirm-view__name">{name}</p>
            <p className="confirm-view__category">{product?.categoryName ?? '—'}</p>
          </div>
        </div>

        <div className="confirm-view__divider" />

        {/* Details grid */}
        <dl className="confirm-view__details">
          {product?.brand && (
            <><dt>Brand</dt><dd>{product.brand}</dd></>
          )}
          {product?.modelName && (
            <><dt>Model</dt><dd>{product.modelName}</dd></>
          )}
          {product?.serialNumber && (
            <><dt>Serial</dt><dd className="mono">{product.serialNumber}</dd></>
          )}
          {product?.yearOfManufacture && (
            <><dt>Year</dt><dd>{product.yearOfManufacture}</dd></>
          )}
          <dt>Status</dt>
          <dd style={{ textTransform: 'capitalize' }}>{state.replace(/_/g, ' ')}</dd>
          <dt>Label&nbsp;ID</dt>
          <dd className="mono">…{qrId.slice(-6)}</dd>
        </dl>
      </div>

      <p className="confirm-view__notice">
        By claiming this device you agree to follow its recycling journey through EcoSure.
      </p>

      {error && <p className="field__error" role="alert">{error}</p>}

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={busy}>
          Not my device
        </Button>
        <Button type="button" variant="primary" loading={busy} onClick={onConfirm}>
          <Icon d={ICONS.check} size={15} />
          Confirm &amp; claim
        </Button>
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function AddDeviceModal({ onClose, onSuccess }) {
  const navigate = useNavigate();
  const photoRef = useRef(null);

  /* ── state machine ── */
  const [mode,       setMode]       = useState('form');   // 'form' | 'guide' | 'scanning' | 'confirming'
  const [scannedId,  setScannedId]  = useState(null);
  const [product,    setProduct]    = useState(null);
  const [scanError,  setScanError]  = useState(null);
  const [busy,       setBusy]       = useState(false);
  const [error,      setError]      = useState(null);

  /* ── form state ── */
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile,    setPhotoFile]    = useState(null);
  const [form, setForm] = useState({
    category: '', brand: '', modelName: '', serialNumber: '',
    yearOfPurchase: '', condition: 'working', notes: '',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* ── QR scan → fetch product details ── */
  const handleScanResult = async (qrId) => {
    setScannedId(qrId);
    setScanError(null);
    setBusy(true);
    try {
      const p = await productsApi.journey(qrId, undefined);
      setProduct(p);
      setMode('confirming');
    } catch (e) {
      setScanError(e?.message ?? 'Could not look up this product. Try again.');
    } finally {
      setBusy(false);
    }
  };

  /* ── confirm & claim ── */
  const handleConfirm = async () => {
    setBusy(true);
    setError(null);
    try {
      await productsApi.claim(scannedId);
      onSuccess?.();
      navigate(`/p/${scannedId}`);
    } catch (e) {
      setError(e?.message ?? 'Could not claim this device. Try again.');
      setBusy(false);
    }
  };

  /* ── manual form submit ── */
  const handleManualSubmit = async (e) => {
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

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget && mode !== 'confirming') onClose();
  };

  /* ── titles by mode ── */
  const headerTitle = {
    form:       'Add a device',
    guide:      null,             // guide has its own header
    scanning:   'Scan QR label',
    confirming: 'Confirm device',
  }[mode];

  return (
    <div className="modal-backdrop" onClick={onBackdrop} role="dialog" aria-modal="true" aria-label="Add a device">
      <div className="modal">

        {/* ── Guide overlay (replaces entire modal content) ── */}
        {mode === 'guide' && (
          <QrGuide
            onClose={() => setMode('form')}
            onStartScanning={() => setMode('scanning')}
          />
        )}

        {/* ── Normal modal chrome (form / scanning / confirming) ── */}
        {mode !== 'guide' && (
          <>
            <div className="modal__header">
              <div>
                <p className="modal__eyebrow">Register a product</p>
                <h2 className="modal__title">{headerTitle}</h2>
              </div>
              <CloseBtn onClick={onClose} />
            </div>

            <div className="modal__body">

              {/* ════ SCANNING MODE ════ */}
              {mode === 'scanning' && (
                <ScanningView
                  onScanResult={handleScanResult}
                  onBack={() => { setScanError(null); setMode('form'); }}
                  scanError={scanError}
                  setScanError={setScanError}
                />
              )}

              {/* ════ CONFIRMING MODE ════ */}
              {mode === 'confirming' && (
                <ConfirmView
                  product={product}
                  qrId={scannedId}
                  onConfirm={handleConfirm}
                  onCancel={() => { setProduct(null); setScannedId(null); setMode('form'); }}
                  busy={busy}
                  error={error}
                />
              )}

              {/* ════ FORM MODE ════ */}
              {mode === 'form' && (
                <form className="add-device-form" onSubmit={handleManualSubmit} noValidate>

                  {/* Scan QR pill */}
                  <div className="add-device-qr-row">
                    <div className="add-device-qr-row__text">
                      <Icon d={ICONS.scan} size={15} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
                      <span className="add-device-qr-label">Have an EcoSure QR label?</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn--sm btn--secondary"
                      onClick={() => setMode('guide')}
                    >
                      Scan QR
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="add-device-divider">
                    <span>or fill in the details below</span>
                  </div>

                  {/* Photo upload */}
                  <div
                    className="photo-upload"
                    onClick={() => photoRef.current?.click()}
                    role="button" tabIndex={0}
                    aria-label="Upload product photo"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') photoRef.current?.click(); }}
                  >
                    {photoPreview
                      ? <img src={photoPreview} alt="Product photo" className="photo-upload__img" />
                      : (
                        <div className="photo-upload__placeholder">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span>Add product photo</span>
                          <span className="photo-upload__hint">Optional — tap to choose</span>
                        </div>
                      )
                    }
                    <input ref={photoRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
                  </div>

                  {/* Form fields */}
                  <div className="form-grid">
                    <div className="field">
                      <label className="field__label" htmlFor="f-category">
                        Category <span className="field__required" aria-hidden="true">*</span>
                      </label>
                      <select id="f-category" className="select" value={form.category} onChange={set('category')} required>
                        <option value="">Select a category…</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

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

                    <div className="form-grid form-grid--2">
                      <div className="field">
                        <label className="field__label" htmlFor="f-serial">Serial / IMEI</label>
                        <input id="f-serial" className="input" placeholder="Optional" value={form.serialNumber} onChange={set('serialNumber')} autoComplete="off" />
                      </div>
                      <div className="field">
                        <label className="field__label" htmlFor="f-year">Year of purchase</label>
                        <input id="f-year" className="input" type="number"
                          placeholder={String(new Date().getFullYear())}
                          min="1990" max={new Date().getFullYear()}
                          value={form.yearOfPurchase} onChange={set('yearOfPurchase')}
                        />
                      </div>
                    </div>

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
              )}

            </div>
          </>
        )}
      </div>
    </div>
  );
}
