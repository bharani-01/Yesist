import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const WINDOW_OPTIONS = Object.entries(WINDOW_LABELS).map(([value, label]) => ({ value, label }));

const CONDITIONS = [
  { value: 'working', label: 'Working', desc: 'Turns on and functions normally' },
  { value: 'partially_working', label: 'Partially working', desc: 'Turns on but has issues (e.g. broken screen)' },
  { value: 'not_working', label: 'Not working', desc: 'Does not turn on or severe damage' },
];

export function NewPickupPage() {
  const reference = useReference();
  const devicesQ = useAsync(productsApi.myDevices);

  return (
    <div className="page pickup-wizard-page">
      <PageHeader 
        title="Book a pickup" 
        description="Schedule a doorstep collection for your registered devices." 
        back={{ to: '/pickups', label: 'My pickups' }} 
      />
      <AsyncView query={reference}>
        {(ref) => (
          <AsyncView query={devicesQ}>
            {(devices) => <Wizard refData={ref} devices={devices} />}
          </AsyncView>
        )}
      </AsyncView>
    </div>
  );
}

function Wizard({ refData, devices }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const availableDevices = devices.filter((d) => ['placed_on_market', 'claimed', 'registered'].includes(d.state));

  const [step, setStep] = useState(1);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [condition, setCondition] = useState('');
  
  const [form, setForm] = useState({
    contactName: user.fullName ?? '', 
    contactPhone: user.phone ?? '',
    preferredDate: addDaysIso(1), 
    preferredWindow: 'morning',
    wardId: '', 
    addressLine: '', 
    landmark: ''
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const fieldErrors = error?.fieldErrors?.() ?? {};
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

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
    if (step === 3 && (!form.contactName || !form.contactPhone || !form.preferredDate || !form.preferredWindow)) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setPending(true);
    setError(null);
    try {
      const { pickup } = await pickupsApi.create({
        wardId: refData.wards[0]?.id || 1,
        addressLine: form.addressLine,
        landmark: form.landmark || undefined,
        contactName: form.contactName,
        contactPhone: form.contactPhone,
        preferredDate: form.preferredDate,
        preferredWindow: form.preferredWindow,
        // Send the category code of the selected device with quantity 1
        items: [{ categoryCode: selectedDevice.categoryCode, quantity: 1 }],
      });
      navigate(`/pickups/${pickup.id}`, { replace: true });
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };

  return (
    <div className="wizard-container">
      {/* Step Indicator */}
      <div className="wizard-progress">
        <div className="wizard-progress__bar" style={{ width: `${((step - 1) / 3) * 100}%` }} />
        <div className="wizard-steps">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`wizard-step ${step >= s ? 'is-active' : ''}`}>
              <span>{s}</span>
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
                return (
                  <label key={deviceId} className={`device-card ${selectedDeviceId === deviceId ? 'is-selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="device" 
                      value={deviceId} 
                      checked={selectedDeviceId === deviceId} 
                      onChange={() => setSelectedDeviceId(deviceId)} 
                      className="sr-only"
                    />
                    <div className="device-card__avatar">{d.categoryName?.charAt(0) || 'D'}</div>
                    <div className="device-card__info">
                      <strong>{[d.brand, d.modelName].filter(Boolean).join(' ') || d.categoryName}</strong>
                      <span>{d.categoryName} • ID: {deviceId.slice(0, 6)}</span>
                    </div>
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
            <p className="wizard-desc">When should the collector arrive, and who should they contact?</p>
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
                <TextField 
                  label="Contact mobile" 
                  type="tel" 
                  inputMode="numeric" 
                  maxLength={10} 
                  required 
                  value={form.contactPhone} 
                  onChange={set('contactPhone')} 
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-panel fade-in">
            <h2 className="wizard-title">Location</h2>
            <p className="wizard-desc">Where should we pick this up?</p>
            
            <div className="form-grid" style={{ marginBottom: 'var(--space-4)' }}>
              <div className="field" style={{ position: 'relative' }}>
                <label className="field__label">Search address</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Start typing your address..." 
                  value={form.addressLine} 
                  onChange={set('addressLine')} 
                  autoComplete="off"
                />
                {form.addressLine.length > 2 && !form.addressLine.includes(' ') && (
                  <div className="address-suggestions">
                    <div onClick={() => setForm({...form, addressLine: form.addressLine + ' Society, Scheme 140'})}>
                      <strong>{form.addressLine} Society</strong>, Scheme 140, Indore
                    </div>
                    <div onClick={() => setForm({...form, addressLine: form.addressLine + ' Enclave, Vijay Nagar'})}>
                      <strong>{form.addressLine} Enclave</strong>, Vijay Nagar, Indore
                    </div>
                    <div onClick={() => setForm({...form, addressLine: form.addressLine + ' Apartments, Palasia'})}>
                      <strong>{form.addressLine} Apartments</strong>, Palasia, Indore
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="map-visual" style={{ height: 220, padding: 0 }}>
              <iframe 
                title="Map view"
                width="100%" 
                height="100%" 
                style={{ border: 0, pointerEvents: 'none', filter: 'grayscale(0.2) contrast(1.1)' }} 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=75.75,22.65,75.95,22.85&layer=mapnik&marker=22.7196,75.8577`}
              />
              <div className="map-visual__pin" style={{ zIndex: 10 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-brand)" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3" fill="#fff"></circle>
                </svg>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: 'var(--space-4)' }}>
              <TextField 
                label="Flat / Wing / Complete Address" 
                autoComplete="street-address" 
                required 
                value={form.addressLine} 
                onChange={set('addressLine')} 
                error={fieldErrors.addressLine} 
                hint="Make sure the collector can find your exact door" 
              />
              <TextField 
                label="Landmark & additional instructions (optional)" 
                value={form.landmark} 
                onChange={set('landmark')} 
                error={fieldErrors.landmark} 
                placeholder="e.g. Near the big banyan tree, call upon arrival"
              />
            </div>
            {error && !Object.keys(fieldErrors).length && <ErrorAlert error={error} />}
          </div>
        )}
      </div>

      <div className="wizard-actions">
        {step > 1 && (
          <Button type="button" variant="secondary" onClick={handleBack} disabled={pending}>Back</Button>
        )}
        <div style={{ flexGrow: 1 }} />
        {step < 4 ? (
          <Button 
            type="button" 
            variant="primary" 
            onClick={handleNext}
            disabled={(step === 1 && !selectedDeviceId) || (step === 2 && !condition) || (step === 3 && (!form.contactName || !form.contactPhone))}
          >
            Continue
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="primary" 
            onClick={handleSubmit} 
            loading={pending}
            disabled={!form.addressLine}
          >
            Confirm booking
          </Button>
        )}
      </div>
    </div>
  );
}
