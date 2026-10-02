import { useEffect, useMemo, useState } from 'react';
import { QrScanner } from '../../../components/qr/QrScanner.jsx';
import { Alert, ErrorAlert } from '../../../components/ui/Alert.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { TextField } from '../../../components/ui/Field.jsx';
import { formatInr } from '../../../lib/format.js';
import { agentApi } from '../agent.api.js';
import './WalkInIntakeModal.css';

function CategoryIcon({ code }) {
  if (code === 'laptop' || code === 'desktop_cpu') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    );
  }
  if (code === 'mobile_phone' || code === 'tablet') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  }
  if (code === 'monitor_tv') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    );
  }
  if (code === 'printer') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect width="12" height="8" x="6" y="14" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.044-1.771l1.97-3.474a1.812 1.812 0 0 1 1.57-.874H10" />
      <path d="M11 19h6.185a1.83 1.83 0 0 0 1.57-.881 1.785 1.785 0 0 0 .044-1.771l-1.97-3.474a1.812 1.812 0 0 0-1.57-.874H13" />
      <path d="M15.5 8 13.53 4.526a1.812 1.812 0 0 0-1.57-.874H8.04a1.83 1.83 0 0 0-1.57.881 1.785 1.785 0 0 0-.044 1.771L8.5 10" />
    </svg>
  );
}

const DEFAULT_CATEGORIES = [
  { code: 'mobile_phone', name: 'Smartphone', dataBearing: true, hasBattery: true },
  { code: 'laptop', name: 'Laptop', dataBearing: true, hasBattery: true },
  { code: 'tablet', name: 'Tablet', dataBearing: true, hasBattery: true },
  { code: 'desktop_cpu', name: 'Desktop CPU', dataBearing: true, hasBattery: false },
  { code: 'monitor_tv', name: 'Monitor / TV', dataBearing: false, hasBattery: false },
  { code: 'printer', name: 'Printer / Scanner', dataBearing: false, hasBattery: false },
  { code: 'cables_accessories', name: 'Cables & Accessories', dataBearing: false, hasBattery: false },
  { code: 'small_appliance', name: 'Small Appliance', dataBearing: false, hasBattery: true },
];

function sanitizePhone(raw) {
  if (!raw) return '';
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits.slice(0, 10);
}

export function WalkInIntakeModal({ isOpen, onClose, onSuccess }) {
  // Rates & Categories
  const [ratesData, setRatesData] = useState({ rates: [], categories: DEFAULT_CATEGORIES });
  const [loadingRates, setLoadingRates] = useState(false);

  // Customer State
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [customerLookup, setCustomerLookup] = useState({ searching: false, found: false, data: null, error: null });

  // Items State
  const [items, setItems] = useState([
    {
      categoryCode: 'mobile_phone',
      quantity: 1,
      batteryCheck: 'intact_embedded',
      refusedReason: '',
      identifiersText: '',
      qrIds: [],
      scanning: false,
    },
  ]);

  // Scale & Payout State
  const [netKg, setNetKg] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('cash');

  // Submission & Result
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [receiptResult, setReceiptResult] = useState(null);

  // Load available rates and categories from active agreement
  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setLoadingRates(true);
    agentApi.rates()
      .then((res) => {
        if (!active) return;
        if (res && res.categories && res.categories.length > 0) {
          setRatesData({
            rates: res.rates || [],
            categories: res.categories,
          });
        }
      })
      .catch((err) => console.warn('Could not load recycler rates:', err))
      .finally(() => { if (active) setLoadingRates(false); });
    return () => { active = false; };
  }, [isOpen]);

  // Debounced Phone Lookup
  useEffect(() => {
    const clean = sanitizePhone(phone);
    if (isAnonymous || clean.length !== 10) {
      setCustomerLookup({ searching: false, found: false, data: null, error: null });
      return;
    }

    let active = true;
    setCustomerLookup((prev) => ({ ...prev, searching: true, error: null }));

    const timer = setTimeout(() => {
      agentApi.lookupCustomer(clean)
        .then((res) => {
          if (!active) return;
          if (res.found && res.customer) {
            setCustomerLookup({ searching: false, found: true, data: res.customer, error: null });
            if (res.customer.fullName) setFullName(res.customer.fullName);
          } else {
            setCustomerLookup({ searching: false, found: false, data: null, error: null });
          }
        })
        .catch((err) => {
          if (!active) return;
          setCustomerLookup({ searching: false, found: false, data: null, error: err.message });
        });
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [phone, isAnonymous]);

  // Rate card suggested payout computation
  const suggestedPayout = useMemo(() => {
    let sum = 0;
    for (const line of items) {
      const cat = ratesData.categories.find((c) => c.code === line.categoryCode);
      const rate = ratesData.rates.find((r) => r.categoryCode === line.categoryCode);
      const isRefused = line.batteryCheck === 'swollen_or_damaged_refused';
      if (isRefused) continue;

      const qty = parseInt(line.quantity, 10) || 0;
      if (rate?.pricePerUnit != null) {
        sum += Number(rate.pricePerUnit) * qty;
      } else if (rate?.pricePerKg != null && cat?.typicalUnitKg != null) {
        sum += Number(rate.pricePerKg) * Number(cat.typicalUnitKg) * qty;
      }
    }
    return Math.round(sum * 100) / 100;
  }, [items, ratesData]);

  // Auto-fill suggested payout if agent hasn't manually typed an amount yet
  useEffect(() => {
    if (suggestedPayout > 0 && (!paidAmount || paidAmount === '0')) {
      setPaidAmount(String(suggestedPayout));
    }
  }, [suggestedPayout]);

  if (!isOpen) return null;

  // Item Line Helpers
  const updateItem = (index, patch) => {
    setItems((curr) => curr.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const addItemLine = () => {
    setItems((curr) => [
      ...curr,
      {
        categoryCode: 'small_appliance',
        quantity: 1,
        batteryCheck: 'no_battery',
        refusedReason: '',
        identifiersText: '',
        qrIds: [],
        scanning: false,
      },
    ]);
  };

  const removeItemLine = (index) => {
    if (items.length <= 1) return;
    setItems((curr) => curr.filter((_, i) => i !== index));
  };

  const addQrToLine = (index, qr) => {
    setItems((curr) => {
      const line = curr[index];
      if (line.qrIds.includes(qr)) return curr;
      return curr.map((l, i) => (i === index ? { ...l, qrIds: [...l.qrIds, qr] } : l));
    });
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      const cleanP = sanitizePhone(phone);
      const payload = {
        customer: {
          phone: isAnonymous ? null : cleanP,
          fullName: isAnonymous ? 'Walk-in Guest' : (fullName.trim() || 'Walk-in Citizen'),
          isAnonymous: Boolean(isAnonymous),
        },
        netKg: parseFloat(netKg),
        materialPaidAmount: parseFloat(paidAmount || 0),
        payoutMethod,
        items: items.map((l) => {
          const cat = ratesData.categories.find((c) => c.code === l.categoryCode);
          const isRefused = l.batteryCheck === 'swollen_or_damaged_refused';
          return {
            categoryCode: l.categoryCode,
            quantity: isRefused ? 0 : parseInt(l.quantity, 10),
            batteryCheck: cat?.hasBattery ? l.batteryCheck || undefined : undefined,
            refusedReason: l.refusedReason || undefined,
            identifiers: cat?.dataBearing && !isRefused
              ? l.identifiersText.split(/[\n, ]+/).map((s) => s.trim()).filter(Boolean)
              : [],
            qrIds: isRefused ? [] : l.qrIds,
          };
        }),
      };

      const result = await agentApi.walkIn(payload);
      setReceiptResult(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setSubmitError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setPhone('');
    setFullName('');
    setIsAnonymous(false);
    setCustomerLookup({ searching: false, found: false, data: null, error: null });
    setItems([
      {
        categoryCode: 'mobile_phone',
        quantity: 1,
        batteryCheck: 'intact_embedded',
        refusedReason: '',
        identifiersText: '',
        qrIds: [],
        scanning: false,
      },
    ]);
    setNetKg('');
    setPaidAmount('');
    setPayoutMethod('cash');
    setSubmitError(null);
    setReceiptResult(null);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget && !submitting) onClose(); }} role="dialog" aria-modal="true">
      <div className="modal walkin-modal">
        {/* Header */}
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">Counter Drop-off</p>
            <h2 className="modal__title">Direct Walk-in Intake</h2>
          </div>
          <button
            type="button"
            className="btn btn--ghost"
            style={{ padding: '6px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal__body" style={{ padding: 'var(--space-5)' }}>
          {receiptResult ? (
            /* ════ RECEIPT SUCCESS VIEW ════ */
            <div>
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(52, 199, 89, 0.12)',
                  color: '#34c759',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: 'var(--text-lg)' }}>Intake Confirmed</h3>
                <p className="subtle" style={{ margin: 0 }}>Reference: <strong className="mono">{receiptResult.pickup.reference}</strong></p>
                {receiptResult.pointsAwarded > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <span className="walkin-badge walkin-badge--verified" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                      <span className="walkin-badge-dot" />
                      +{receiptResult.pointsAwarded} Green Points Credited
                    </span>
                  </div>
                )}
              </div>

              {/* Printable Receipt Card */}
              <div className="walkin-receipt-container">
                <div className="walkin-receipt-header">
                  <h4 style={{ margin: '0 0 2px' }}>EcoSure E-Waste Intake Receipt</h4>
                  <p className="subtle" style={{ margin: 0, fontSize: '0.8rem' }}>{receiptResult.receipt.agentOrgName} · Indore</p>
                  <p className="subtle" style={{ margin: 0, fontSize: '0.75rem' }}>{new Date().toLocaleString()}</p>
                </div>

                <div className="walkin-receipt-row">
                  <span className="subtle">Customer</span>
                  <strong>{receiptResult.receipt.customerName} {receiptResult.receipt.customerPhone ? `(${receiptResult.receipt.customerPhone})` : ''}</strong>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', margin: '8px 0', paddingTop: '8px' }}>
                  {receiptResult.receipt.items.map((item, idx) => (
                    <div key={idx} className="walkin-receipt-row">
                      <span>{item.quantity}× {item.name}</span>
                      <span className="subtle">{item.batteryCheck === 'swollen_or_damaged_refused' ? 'Refused' : 'Accepted'}</span>
                    </div>
                  ))}
                </div>

                <div className="walkin-receipt-row walkin-receipt-total">
                  <span>Net Scale Weight</span>
                  <span>{receiptResult.receipt.totalNetKg} kg</span>
                </div>
                <div className="walkin-receipt-row walkin-receipt-total" style={{ borderTop: 'none', color: 'var(--color-brand)' }}>
                  <span>Material Payout</span>
                  <span>{formatInr(receiptResult.receipt.materialPaidAmount)} ({receiptResult.receipt.payoutMethod?.toUpperCase()})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="stack stack--sm">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <Button type="button" variant="secondary" onClick={() => window.print()}>
                    Print Receipt
                  </Button>
                  {receiptResult.receipt.customerPhone && (
                    <a
                      href={`https://wa.me/91${receiptResult.receipt.customerPhone}?text=${encodeURIComponent(
                        `*EcoSure E-Waste Receipt*\nRef: ${receiptResult.pickup.reference}\nWeight: ${receiptResult.receipt.totalNetKg} kg\nPayout: INR ${receiptResult.receipt.materialPaidAmount}\nGreen Points: +${receiptResult.pointsAwarded}\n\nThank you for recycling with EcoSure Indore.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp-outline"
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      WhatsApp Receipt
                    </a>
                  )}
                </div>
                <Button type="button" variant="primary" onClick={handleReset}>
                  Intake Another Customer
                </Button>
                <Button type="button" variant="ghost" onClick={onClose}>
                  Done (View Pickups)
                </Button>
              </div>
            </div>
          ) : (
            /* ════ INTAKE FORM VIEW ════ */
            <form onSubmit={handleSubmit} className="form-grid" noValidate>
              {/* SECTION 1: CUSTOMER IDENTIFICATION */}
              <div className="walkin-lookup-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>1. Customer Details</label>
                  <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => {
                        setIsAnonymous(e.target.checked);
                        if (e.target.checked) setCustomerLookup({ searching: false, found: false, data: null, error: null });
                      }}
                    />
                    Anonymous Drop-off
                  </label>
                </div>

                {!isAnonymous ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                      <TextField
                        label="10-Digit Mobile Number"
                        type="tel"
                        maxLength={10}
                        placeholder="e.g. 9826012345"
                        value={phone}
                        onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                        hint={customerLookup.searching ? 'Checking citizen records…' : 'Enter 10-digit Indian mobile'}
                        required
                      />
                      <TextField
                        label="Customer Full Name"
                        placeholder="e.g. Rajesh Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required={!customerLookup.found}
                      />
                    </div>

                    {customerLookup.found && customerLookup.data && (
                      <div className="walkin-customer-card">
                        <div>
                          <span className="walkin-badge walkin-badge--verified">
                            <span className="walkin-badge-dot" />
                            Verified Citizen
                          </span>
                          <div style={{ fontWeight: 600, marginTop: '4px' }}>{customerLookup.data.fullName}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className="subtle" style={{ fontSize: '0.75rem' }}>Current Balance</span>
                          <div style={{ fontWeight: 700, color: 'var(--color-brand)' }}>{customerLookup.data.pointsBalance} pts</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Alert tone="info">
                    Anonymous drop-off selected. Devices will be recorded in your custody chain under a guest account. Citizen green points cannot be credited without a mobile number.
                  </Alert>
                )}
              </div>

              {/* SECTION 2: ITEMS & TRIAGE */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>2. Devices & Battery Triage</label>
                  <span className="subtle" style={{ fontSize: '0.78rem' }}>{items.length} line item(s)</span>
                </div>

                {items.map((line, idx) => {
                  const cat = ratesData.categories.find((c) => c.code === line.categoryCode);
                  const isRefused = line.batteryCheck === 'swollen_or_damaged_refused';

                  return (
                    <div key={idx} className="walkin-item-card">
                      <div className="walkin-item-header">
                        <strong style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CategoryIcon code={line.categoryCode} />
                          {cat?.name || 'Device'}
                        </strong>
                        {items.length > 1 && (
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            style={{ color: '#ff3b30', padding: '2px 8px' }}
                            onClick={() => removeItemLine(idx)}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Category Selection Grid */}
                      <div className="walkin-category-grid">
                        {ratesData.categories.slice(0, 6).map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            className={`walkin-cat-btn ${line.categoryCode === c.code ? 'is-selected' : ''}`}
                            onClick={() => updateItem(idx, { categoryCode: c.code })}
                          >
                            <CategoryIcon code={c.code} />
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Quantity & Refusal Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        <TextField
                          label="Quantity"
                          type="number"
                          min={1}
                          max={50}
                          value={line.quantity}
                          onChange={(e) => updateItem(idx, { quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                        />

                        {cat?.hasBattery && (
                          <div>
                            <label style={{ fontSize: '0.82rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                              Battery Safety Triage
                            </label>
                            <div className="walkin-triage-pills">
                              <button
                                type="button"
                                className={`walkin-triage-pill ${line.batteryCheck === 'intact_embedded' ? 'is-active-green' : ''}`}
                                onClick={() => updateItem(idx, { batteryCheck: 'intact_embedded' })}
                              >
                                Battery intact
                              </button>
                              <button
                                type="button"
                                className={`walkin-triage-pill ${line.batteryCheck === 'no_battery' ? 'is-active-gray' : ''}`}
                                onClick={() => updateItem(idx, { batteryCheck: 'no_battery' })}
                              >
                                No battery
                              </button>
                              <button
                                type="button"
                                className={`walkin-triage-pill ${line.batteryCheck === 'swollen_or_damaged_refused' ? 'is-active-danger' : ''}`}
                                onClick={() => updateItem(idx, { batteryCheck: 'swollen_or_damaged_refused' })}
                              >
                                Swollen / Damaged (Refuse)
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {isRefused && (
                        <Alert tone="warning" style={{ marginBottom: '10px' }}>
                          Safety protocol: Swollen, leaking, or damaged batteries cannot be accepted for transport. Advise customer on local battery collection.
                        </Alert>
                      )}

                      {/* Data-bearing details: IMEI / Serial */}
                      {cat?.dataBearing && !isRefused && (
                        <div style={{ marginTop: '10px' }}>
                          <TextField
                            label={line.categoryCode === 'mobile_phone' ? 'IMEI Number (Optional)' : 'Serial Number (Optional)'}
                            placeholder={line.categoryCode === 'mobile_phone' ? '15-digit IMEI (dial *#06#)' : 'Serial from device label'}
                            value={line.identifiersText}
                            onChange={(e) => updateItem(idx, { identifiersText: e.target.value })}
                            hint="Only the last 4 digits are revealed. Used to check duplicate and custody records."
                          />

                          {/* QR Code Scanner for Pre-tagged devices */}
                          <div style={{ marginTop: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span className="subtle" style={{ fontSize: '0.8rem' }}>
                                {line.qrIds.length ? `${line.qrIds.length} EcoSure label(s) scanned` : 'Has EcoSure QR tag?'}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => updateItem(idx, { scanning: !line.scanning })}
                              >
                                {line.scanning ? 'Stop Camera' : 'Scan QR Tag'}
                              </Button>
                            </div>
                            {line.qrIds.length > 0 && (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                                {line.qrIds.map((qr) => (
                                  <span key={qr} className="walkin-badge walkin-badge--verified" style={{ fontFamily: 'var(--font-mono)' }}>
                                    …{qr.slice(-6)}
                                    <button
                                      type="button"
                                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0 2px' }}
                                      onClick={() => updateItem(idx, { qrIds: line.qrIds.filter((q) => q !== qr) })}
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                            {line.scanning && (
                              <div style={{ marginTop: '8px' }}>
                                <QrScanner
                                  label={`Scan ${cat.name} QR code`}
                                  continuous
                                  onScan={(qr) => addQrToLine(idx, qr)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  style={{ width: '100%', marginTop: '4px' }}
                  onClick={addItemLine}
                >
                  + Add Another Device Category
                </button>
              </div>

              {/* SECTION 3: SCALE WEIGHT & PAYOUT */}
              <div className="walkin-lookup-box" style={{ background: 'var(--color-surface)' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  3. Scale Weight & Customer Payout
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <TextField
                    label="Net Weight (kg)"
                    type="number"
                    step="0.001"
                    min="0.001"
                    placeholder="e.g. 1.850"
                    value={netKg}
                    onChange={(e) => setNetKg(e.target.value)}
                    hint="From calibrated shop scale"
                    required
                  />

                  <TextField
                    label="Payout to Customer (INR)"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="e.g. 450"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    hint={suggestedPayout > 0 ? `Rate card suggests ${formatInr(suggestedPayout)}` : 'Amount paid to citizen'}
                  />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                    Payout Method
                  </label>
                  <div className="walkin-triage-pills">
                    <button
                      type="button"
                      className={`walkin-triage-pill ${payoutMethod === 'cash' ? 'is-active-green' : ''}`}
                      onClick={() => setPayoutMethod('cash')}
                    >
                      Cash
                    </button>
                    <button
                      type="button"
                      className={`walkin-triage-pill ${payoutMethod === 'upi' ? 'is-active-green' : ''}`}
                      onClick={() => setPayoutMethod('upi')}
                    >
                      UPI / QR
                    </button>
                    <button
                      type="button"
                      className={`walkin-triage-pill ${payoutMethod === 'none' ? 'is-active-gray' : ''}`}
                      onClick={() => setPayoutMethod('none')}
                    >
                      Free Drop-off
                    </button>
                  </div>
                </div>

                {suggestedPayout > 0 && (
                  <div className="walkin-rate-banner">
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>Recycler Rate Recommendation</span>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-brand)' }}>
                        {formatInr(suggestedPayout)}
                      </div>
                    </div>
                    <span className="walkin-badge walkin-badge--verified" style={{ fontSize: '0.78rem' }}>
                      Active Recycler Rates
                    </span>
                  </div>
                )}
              </div>

              <ErrorAlert error={submitError} />

              {/* Submit Button */}
              <div className="form-actions" style={{ marginTop: 'var(--space-4)' }}>
                <Button
                  type="submit"
                  loading={submitting}
                  disabled={!(parseFloat(netKg) > 0) || (!isAnonymous && sanitizePhone(phone).length !== 10)}
                  style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 600 }}
                >
                  Confirm Walk-in Drop-off & Issue Receipt
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
