import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

/** Public product page URL encoded in every unit label. */
export const productUrl = (qrPublicId) => `${window.location.origin}/p/${qrPublicId}`;

/** Renders a QR code for `value` as an image; `label` is the accessible description. */
export function QrCode({ value, label, size = 128 }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let live = true;
    QRCode.toDataURL(value, { errorCorrectionLevel: 'M', margin: 1, width: size * 2 })
      .then((url) => { if (live) setSrc(url); })
      .catch(() => { if (live) setSrc(null); });
    return () => { live = false; };
  }, [value, size]);
  if (!src) return <span className="qr qr--pending" style={{ width: size, height: size }} aria-hidden="true" />;
  return <img className="qr" src={src} width={size} height={size} alt={label} />;
}
