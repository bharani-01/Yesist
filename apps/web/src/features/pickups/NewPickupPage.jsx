import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { ErrorAlert } from '../../components/ui/Alert.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Segmented, SelectField, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { addDaysIso, todayIso, WINDOW_LABELS } from '../../lib/format.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useReference } from '../reference/useReference.js';
import { pickupsApi } from './pickups.api.js';
import { productsApi } from '../products/products.api.js';
import { useAsync } from '../../hooks/useAsync.js';

// Fix Leaflet default marker icons broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper: re-center map when coords change
function MapRecenter({ coords }) {
  const map = useMap();
  useEffect(() => { map.setView(coords, 16); }, [coords, map]);
  return null;
}

function DeviceIcon({ categoryCode }) {
  if (categoryCode === 'laptop' || categoryCode === 'desktop_cpu') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    );
  }
  if (categoryCode === 'mobile_phone' || categoryCode === 'tablet') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  }
  if (categoryCode === 'monitor_tv') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    );
  }
  // Fallback: generic box/package icon
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

const WINDOW_OPTIONS = Object.entries(WINDOW_LABELS).map(([value, label]) => ({ value, label }));

const CONDITIONS = [
  { value: 'working', label: 'Working', desc: 'Turns on and functions normally' },
  { value: 'partially_working', label: 'Partially working', desc: 'Turns on but has issues (e.g. broken screen)' },
  { value: 'not_working', label: 'Not working', desc: 'Does not turn on or severe damage' },
];

export function NewPickupPage() {
  const reference = useReference();
  const devicesQ = useAsync(productsApi.myDevices);
  const pickupsQ = useAsync((signal) => pickupsApi.list(signal).then((r) => r.pickups), []);

  return (
    <div className="page pickup-wizard-page">
      <PageHeader 
        title="Book a pickup" 
        description="Schedule a doorstep collection for your registered devices." 
        actions={
          <Link to="/pickups/history" className="btn btn--secondary tap-effect" style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
            Manage pickups
          </Link>
        }
      />
      <AsyncView query={reference}>
        {(ref) => (
          <AsyncView query={devicesQ}>
            {(devices) => (
              <AsyncView query={pickupsQ}>
                {(pickups) => {
                  return <Wizard refData={ref} devices={devices} pickups={pickups} />;
                }}
              </AsyncView>
            )}
          </AsyncView>
        )}
      </AsyncView>
    </div>
  );
}

function Wizard({ refData, devices, pickups = [] }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const availableDevices = devices.filter(
    (d) => !d.isRecycled && d.status !== 'recycled' && ['placed_on_market', 'claimed', 'registered', 'active'].includes(d.state),
  );

  const [step, setStep] = useState(1);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [condition, setCondition] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState([13.0827, 80.2707]); // Default Chennai
  
  const [form, setForm] = useState({
    contactName: user.fullName ?? '', 
    contactPhone: user.phone ?? '',
    preferredDate: addDaysIso(1), 
    preferredWindow: 'morning',
    wardId: '', 
    addressLine: '', 
    landmark: '',
    acknowledged: false,
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const fieldErrors = error?.fieldErrors?.() ?? {};
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // Debounced live suggestions
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(searchQuery)}&limit=5`);
        const data = await res.json();
        if (data && data.features && data.features.length > 0) {
          setSuggestions(data.features);
        } else {
          throw new Error('No results');
        }
      } catch (err) {
        // Fallback mock suggestions for demo resilience
        setSuggestions([
          { properties: { name: searchQuery, street: 'Adyar', city: 'Chennai', state: 'Tamil Nadu' } },
          { properties: { name: searchQuery, street: 'T Nagar', city: 'Chennai', state: 'Tamil Nadu' } },
          { properties: { name: searchQuery, street: 'Velachery', city: 'Chennai', state: 'Tamil Nadu' } }
        ]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const selectSuggestion = (s) => {
    const { name, street, city, state, postcode } = s.properties;
    const addressString = [name, street, city, state, postcode].filter(Boolean).join(', ');
    setForm({ ...form, addressLine: addressString });
    setSearchQuery('');
    setSuggestions([]);
    if (s.geometry && s.geometry.coordinates) {
      // GeoJSON is [lon, lat]
      setCoords([s.geometry.coordinates[1], s.geometry.coordinates[0]]);
    }
  };

  if (availableDevices.length === 0) {
    return (
      <EmptyState 
        icon="M20 6L9 17l-5-5" 
        title="No devices available" 
        description="You don't have any registered devices available for pickup. Please add a device first."
        action={<Button variant="primary" onClick={() => navigate('/products')}>Go to My Devices</Button>}
      />
    );
  }

  const selectedDevice = availableDevices.find((d) => (d.qrPublicId || d.id) === selectedDeviceId);

  const handleNext = () => {
    if (step === 1 && !selectedDeviceId) return;
    if (step === 2 && !condition) return;
    if (step === 3 && (!form.contactName || !form.contactPhone || form.contactPhone.length < 10 || !form.preferredDate || !form.preferredWindow)) return;
    if (step === 4 && (!form.addressLine || form.addressLine.trim().length < 5)) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const normalizeCategoryCode = (code) => {
    if (!code) return 'cables_accessories';
    const clean = String(code).toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const map = {
      smartphone: 'mobile_phone',
      mobile: 'mobile_phone',
      phone: 'mobile_phone',
      mobile_phone: 'mobile_phone',
      laptop: 'laptop',
      tablet: 'tablet',
      smartwatch: 'cables_accessories',
      television: 'monitor_tv',
      tv: 'monitor_tv',
      monitor: 'monitor_tv',
      monitor_tv: 'monitor_tv',
      desktop: 'desktop_cpu',
      cpu: 'desktop_cpu',
      desktop_cpu: 'desktop_cpu',
      printer: 'printer',
      scanner: 'printer',
      refrigerator: 'small_appliance',
      washing_machine: 'small_appliance',
      air_conditioner: 'small_appliance',
      microwave: 'small_appliance',
      camera: 'cables_accessories',
      gaming_console: 'small_appliance',
      speaker: 'cables_accessories',
      speaker_headphones: 'cables_accessories',
      cables_accessories: 'cables_accessories',
      small_appliance: 'small_appliance',
      other: 'cables_accessories',
    };
    return map[clean] || (clean.match(/^[a-z_]{2,40}$/) ? clean : 'cables_accessories');
  };

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    try {
      // Strip everything non-numeric, remove leading 91 country code if present, take last 10 digits
      const digits = form.contactPhone.replace(/\D/g, '');
      const sanitizedPhone = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits.slice(-10);
      const catCode = normalizeCategoryCode(selectedDevice?.categoryCode || selectedDevice?.categoryName);
      const { pickup } = await pickupsApi.create({
        wardId: refData.wards[0]?.id ?? 1,
        addressLine: form.addressLine || 'Address not specified',
        landmark: form.landmark || undefined,
        contactName: form.contactName,
        contactPhone: sanitizedPhone,
        preferredDate: form.preferredDate,
        preferredWindow: form.preferredWindow,
        items: [{ categoryCode: catCode, quantity: 1 }],
      });
      navigate(`/pickups/${pickup.id}`, { replace: true });
    } catch (err) {
      console.error('[Pickup] booking error:', err);
      setError(err);
      setPending(false);
    }
  };

  const STEP_LABELS = ['Device', 'Condition', 'Schedule', 'Location', 'Confirm'];

  return (
    <div className="wizard-container">
      {/* Step Indicator */}
      <div className="wizard-progress">
        <div className="wizard-progress__bar-bg" />
        <div className="wizard-progress__bar" style={{ width: `${((step - 1) / 4) * 100}%` }} />
        <div className="wizard-steps">
          {[1, 2, 3, 4, 5].map((s, idx) => (
            <div key={s} className="wizard-step-wrapper">
              <div className={`wizard-step ${step >= s ? 'is-active' : ''}`}>
                <span>{s}</span>
              </div>
              <div className={`wizard-step-label ${step >= s ? 'is-active-label' : ''}`}>
                {STEP_LABELS[idx]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-content">
        {step === 1 && (
          <div className="wizard-panel fade-in">
            <h2 className="wizard-title">Select device</h2>
            <p className="wizard-desc">Choose a registered device to hand over.</p>
            <div className="device-picker">
              {availableDevices.map((d) => {
                const deviceId = d.qrPublicId || d.id || `dev-${Math.random()}`;
                const activeBooking = pickups.find(p => (p.status === 'requested' || p.status === 'scheduled') && p.categories?.toLowerCase().includes(d.categoryName?.toLowerCase()));

                const cardContent = (
                  <>
                    <div className="device-card__avatar">
                      <DeviceIcon categoryCode={d.categoryCode} />
                    </div>
                    <div className="device-card__info">
                      <strong>{[d.brand, d.modelName].filter(Boolean).join(' ') || d.categoryName}</strong>
                      <span>{d.categoryName} • ID: {deviceId.slice(0, 6)}</span>
                    </div>
                  </>
                );

                if (activeBooking) {
                  return (
                    <div key={deviceId} className="device-card" style={{ opacity: 0.65, cursor: 'default' }}>
                      {cardContent}
                      <Link to={`/pickups/${activeBooking.id}`} className="btn btn--secondary btn--sm tap-effect" style={{ textDecoration: 'none' }}>View Booking</Link>
                    </div>
                  );
                }

                return (
                  <label key={deviceId} className={`device-card tap-effect ${selectedDeviceId === deviceId ? 'is-selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="device" 
                      value={deviceId} 
                      checked={selectedDeviceId === deviceId} 
                      onChange={() => setSelectedDeviceId(deviceId)} 
                      className="sr-only"
                    />
                    {cardContent}
                    <div className="device-card__radio" />
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-panel fade-in">
            <h2 className="wizard-title">Condition</h2>
            <p className="wizard-desc">What is the current condition of this device?</p>
            <div className="condition-picker">
              {CONDITIONS.map((c) => (
                <label key={c.value} className={`condition-card ${condition === c.value ? 'is-selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="condition" 
                    value={c.value} 
                    checked={condition === c.value} 
                    onChange={() => setCondition(c.value)} 
                    className="sr-only"
                  />
                  <div className="condition-card__info">
                    <strong>{c.label}</strong>
                    <span>{c.desc}</span>
                  </div>
                  <div className="device-card__radio" />
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-panel fade-in">
            <h2 className="wizard-title">Schedule &amp; Contact</h2>
            <p className="wizard-desc">When should the Kabadi Wala arrive, and who should they contact?</p>
            <div className="form-grid">
              <TextField 
                label="Preferred date" 
                type="date" 
                min={todayIso()} 
                max={addDaysIso(30)} 
                required 
                value={form.preferredDate} 
                onChange={set('preferredDate')} 
              />
              <Segmented 
                name="window" 
                label="Preferred time" 
                value={form.preferredWindow} 
                onChange={(v) => setForm({ ...form, preferredWindow: v })} 
                options={WINDOW_OPTIONS} 
              />
              <div className="form-grid form-grid--2" style={{ marginTop: 'var(--space-2)' }}>
                <TextField 
                  label="Contact name" 
                  autoComplete="name" 
                  required 
                  value={form.contactName} 
                  onChange={set('contactName')} 
                />
                {/* Phone field with +91 prefix */}
                <div className="field">
                  <label className="field__label">Contact mobile</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <span style={{
                      padding: '0 12px', height: 44, display: 'flex', alignItems: 'center',
                      background: 'var(--color-surface-raised, #f5f5f7)', border: '1px solid var(--color-border)',
                      borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                      fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink-subtle)',
                      userSelect: 'none', whiteSpace: 'nowrap',
                    }}>+91</span>
                    <input
                      className="input"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile"
                      required
                      value={form.contactPhone}
                      onChange={(e) => setForm({ ...form, contactPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0', flex: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-panel fade-in">
            <h2 className="wizard-title">Location</h2>
            <p className="wizard-desc">Where should we pick this up?</p>
            
            {/* Address fields FIRST, map preview BELOW */}
            <div className="form-grid" style={{ marginBottom: 'var(--space-3)' }}>
              <div className="field" style={{ position: 'relative' }}>
                <label className="field__label">Search address</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Start typing your address..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <div className="address-suggestions">
                    {suggestions.map((s, i) => {
                      const { name, street, city, state, postcode } = s.properties;
                      const title = name || street || city;
                      const subtitle = [street !== title ? street : null, city !== title ? city : null, state, postcode].filter(Boolean).join(', ');
                      return (
                        <div key={i} onClick={() => selectSuggestion(s)}>
                          <strong>{title}</strong>
                          {subtitle && <div>{subtitle}</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <TextField 
                label="Flat / Wing / Complete Address" 
                autoComplete="street-address" 
                required 
                value={form.addressLine} 
                onChange={set('addressLine')} 
                error={fieldErrors.addressLine} 
                hint="Make sure the Kabadi Wala can find your exact door" 
              />
              <TextField 
                label="Landmark & additional instructions (optional)" 
                value={form.landmark} 
                onChange={set('landmark')} 
                error={fieldErrors.landmark} 
                placeholder="e.g. Near the big banyan tree, call upon arrival"
              />
            </div>

            {/* Map preview below the fields */}
            <div className="map-visual" style={{ height: 200, padding: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <MapContainer
                center={coords}
                zoom={16}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                attributionControl={false}
              >
                <TileLayer url="/tiles/{z}/{x}/{y}" />
                <Marker position={coords} />
                <MapRecenter coords={coords} />
              </MapContainer>
            </div>

            {error && !Object.keys(fieldErrors).length && <ErrorAlert error={error} style={{ marginTop: 'var(--space-3)' }} />}
          </div>
        )}

        {step === 5 && (
          <div className="wizard-panel fade-in">
            <h2 className="wizard-title">Final Confirmation</h2>
            <p className="wizard-desc">Please review the handover instructions before confirming.</p>
            
            <div className="instruction-card" style={{ background: '#ffffff', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', marginTop: 'var(--space-2)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-5)' }}>
                <img src="/handover-guide.jpg" alt="Handover instructions" style={{ height: '140px', objectFit: 'contain' }} />
              </div>
              <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-md)', color: 'var(--color-ink)' }}>Handover Instructions</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', color: 'var(--color-ink-subtle)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                <li>A verified EcoSure Kabadi Wala will arrive at your location.</li>
                <li>They will verify the device condition you reported.</li>
                <li>Please ensure the device is wiped of any personal data.</li>
                <li>You will receive the payment directly from the Kabadi Wala.</li>
              </ul>
            </div>

            <label className="checkbox-field" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-4)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                style={{ width: 20, height: 20, accentColor: 'var(--color-brand)' }}
                checked={form.acknowledged} 
                onChange={(e) => setForm({ ...form, acknowledged: e.target.checked })} 
              />
              <span style={{ fontSize: 'var(--text-md)', color: 'var(--color-ink)', fontWeight: 500 }}>I acknowledge the handover instructions</span>
            </label>
            
            {error && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <ErrorAlert error={error} />
                {error.details?.length > 0 && (
                  <ul style={{ margin: '8px 0 0 0', padding: '0 0 0 16px', fontSize: '0.78rem', color: 'var(--color-danger, #c0392b)' }}>
                    {error.details.map((d, i) => (
                      <li key={i}><strong>{d.path}</strong>: {d.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="wizard-actions">
        {step > 1 && (
          <Button type="button" variant="secondary" onClick={handleBack} disabled={pending}>Back</Button>
        )}
        <div style={{ flexGrow: 1 }} />
        {step < 5 ? (
          <Button 
            type="button" 
            variant="primary" 
            onClick={handleNext}
          disabled={(step === 1 && !selectedDeviceId) || (step === 2 && !condition) || (step === 3 && (!form.contactName || form.contactPhone.length < 10)) || (step === 4 && (!form.addressLine || form.addressLine.trim().length < 5))}
          >
            Continue
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="primary" 
            onClick={handleSubmit} 
            loading={pending}
            disabled={!form.acknowledged}
          >
            Confirm booking
          </Button>
        )}
      </div>
    </div>
  );
}
