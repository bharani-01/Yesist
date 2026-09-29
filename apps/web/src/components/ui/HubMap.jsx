import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// EcoSure drop-off hubs in Indore
const CENTER = [22.7196, 75.8577];
const HUBS = [
  { id: 'techpark',  position: [22.722,  75.875], name: 'TechPark Hub',              dist: '0.8 km' },
  { id: 'central',  position: [22.715,  75.850], name: 'Central E-Waste Depot',     dist: '2.1 km' },
  { id: 'south',    position: [22.685,  75.865], name: 'South Zone Collection Centre', dist: '4.3 km' },
];

// Tile URL routed through own backend proxy — bypasses all CSP restrictions
const TILE_URL = '/tiles/{z}/{x}/{y}';
const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';

function MapView({ interactive }) {
  return (
    <MapContainer
      center={CENTER}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      zoomControl={interactive}
      dragging={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      attributionControl={interactive}
    >
      <TileLayer attribution={ATTRIBUTION} url={TILE_URL} />
      {HUBS.map((hub) => (
        <Marker key={hub.id} position={hub.position}>
          <Popup>
            <strong style={{ display: 'block', marginBottom: 2 }}>{hub.name}</strong>
            <span style={{ color: '#666', fontSize: '0.8rem' }}>{hub.dist} away</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export function HubMap() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Compact dashboard preview */}
      <div
        className="dropoff-map"
        onClick={() => setExpanded(true)}
        title="Click to expand map"
        style={{
          padding: 0,
          position: 'relative',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <MapView interactive={false} />
        {/* Transparent click-catcher so the click reaches the div, not the map */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 999 }} />
        <div
          style={{
            position: 'absolute', bottom: 10, right: 10, zIndex: 1000,
            background: 'var(--color-surface)', padding: '5px 12px',
            borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 600,
            boxShadow: 'var(--shadow-card)', color: 'var(--color-ink)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-brand)', display: 'inline-block' }} />
          TechPark Hub · 0.8 km
        </div>
      </div>

      {/* Fullscreen expanded map portal */}
      {expanded && createPortal(
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            background: 'var(--color-canvas)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: 'var(--space-4)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)', zIndex: 2,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-ink)' }}>
                Nearest Drop-off Hubs
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-subtle)' }}>
                Tap a pin to see hub details
              </p>
            </div>
            <button className="btn btn--secondary tap-effect" onClick={() => setExpanded(false)}>
              Close
            </button>
          </div>

          {/* Full interactive map */}
          <div style={{ flex: 1 }}>
            <MapView interactive={true} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
