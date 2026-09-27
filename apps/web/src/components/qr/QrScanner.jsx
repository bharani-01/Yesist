import QrScannerLib from 'qr-scanner';
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '../ui/Button.jsx';

const QR_ID = /^[0-9a-f]{18}$/;

/** Extracts the unit id from a scanned label URL (`…/p/<id>`) or a typed id; null when it is not ours. */
export function parseQrId(text) {
  const value = String(text ?? '').trim().toLowerCase();
  if (QR_ID.test(value)) return value;
  const match = value.match(/\/p\/([0-9a-f]{18})(?:[/?#]|$)/);
  return match ? match[1] : null;
}

const CAMERA_ERRORS = {
  unsupported: 'This browser cannot use the camera. Type the code printed under the label instead.',
  denied: 'Camera access was blocked. Allow it in the browser settings, or type the code under the label.',
  none: 'No camera was found. Type the code printed under the label.',
};

/**
 * Scans EcoSure product labels with the device camera, with typed entry always available.
 * Calls onScan(qrId) once per distinct label; repeated reads of the same label are ignored.
 */
export function QrScanner({ onScan, label = 'Scan a product label', continuous = false }) {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const lastRef = useRef({ id: null, at: 0 });
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;
  const [camera, setCamera] = useState('off');
  const [cameraError, setCameraError] = useState(null);
  const [typed, setTyped] = useState('');
  const [typedError, setTypedError] = useState(null);
  const [notice, setNotice] = useState(null);
  const inputId = useId();

  const emit = (id) => {
    const now = Date.now();
    if (lastRef.current.id === id && now - lastRef.current.at < 2500) return;
    lastRef.current = { id, at: now };
    onScanRef.current(id);
  };

  useEffect(() => {
    if (camera !== 'starting') return undefined;
    let cancelled = false;
    const scanner = new QrScannerLib(
      videoRef.current,
      (result) => {
        const id = parseQrId(result.data);
        if (!id) { setNotice('That code is not an EcoSure product label.'); return; }
        setNotice(null);
        emit(id);
        if (!continuous) setCamera('off');
      },
      { returnDetailedScanResult: true, preferredCamera: 'environment', highlightScanRegion: true, maxScansPerSecond: 5 },
    );
    scannerRef.current = scanner;
    scanner.start()
      .then(() => { if (!cancelled) setCamera('on'); })
      .catch(async () => {
        if (cancelled) return;
        const hasCamera = await QrScannerLib.hasCamera().catch(() => false);
        const reason = !navigator.mediaDevices ? 'unsupported' : !hasCamera ? 'none' : 'denied';
        setCameraError(CAMERA_ERRORS[reason]);
        setCamera('off');
      });
    return () => {
      cancelled = true;
      scanner.destroy();
      scannerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera === 'starting' || camera === 'on', continuous]);

  const submitTyped = () => {
    const id = parseQrId(typed);
    if (!id) { setTypedError('Enter the 18-character code printed under the QR label.'); return; }
    setTypedError(null);
    setTyped('');
    emit(id);
  };

  const active = camera === 'starting' || camera === 'on';
  return (
    <div className="scanner">
      <div className="row row--between">
        <span className="field__label">{label}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => { setCameraError(null); setNotice(null); setCamera(active ? 'off' : 'starting'); }}
        >
          {active ? 'Stop camera' : 'Use camera'}
        </Button>
      </div>
      {active && (
        <div className="scanner__viewport">
          <video ref={videoRef} className="scanner__video" muted playsInline aria-label="Camera preview for scanning" />
          {camera === 'starting' && <span className="scanner__hint">Starting camera…</span>}
        </div>
      )}
      {cameraError && <p className="field__error" role="alert">{cameraError}</p>}
      {notice && <p className="field__hint" role="status">{notice}</p>}
      {/* Not a <form>: the scanner is often placed inside another form. */}
      <div className="scanner__manual">
        <label className="visually-hidden" htmlFor={inputId}>Code printed under the label</label>
        <input
          id={inputId}
          className="input mono"
          placeholder="Or type the code under the label"
          autoComplete="off"
          spellCheck={false}
          value={typed}
          onChange={(e) => { setTyped(e.target.value); setTypedError(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitTyped(); } }}
          aria-invalid={typedError ? true : undefined}
        />
        <Button variant="secondary" disabled={!typed.trim()} onClick={submitTyped}>Add</Button>
      </div>
      {typedError && <p className="field__error" role="alert">{typedError}</p>}
    </div>
  );
}
