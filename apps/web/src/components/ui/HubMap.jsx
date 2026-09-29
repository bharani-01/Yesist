import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { createPortal } from 'react-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const indoreLocation = [22.7196, 75.8577];
const hubs = [
  { id: 'techpark', position: [22.722, 75.875], name: 'TechPark Hub' },
  { id: 'central', position: [22.715, 75.850], name: 'Central E-Waste Depot' },
  { id: 'south', position: [22.685, 75.865], name: 'South Zone Collection Center' }
];

export function HubMap() {
  const [expanded, setExpanded] = useState(false);

  const MapContent = ({ interactive }) => (
    <MapContainer 
      center={indoreLocation} 
      zoom={interactive ? 13 : 13} 
      style={{ width: '100%', height: '100%', zIndex: 1 }}
      zoomControl={interactive}
      dragging={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      attributionControl={interactive}
    >
      <TileLayer
        attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      />
      {hubs.map(hub => (
        <Marker key={hub.id} position={hub.position}>
          <Popup>{hub.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  return (
    <>
      {/* Inline Preview Map */}
      <div 
        className="dropoff-map tap-effect" 
        style={{ padding: 0, position: 'relative', border: '1px solid var(--color-border)', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => setExpanded(true)}
        title="Click to expand map"
      >
        <MapContent interactive={false} />
        {/* Invisible overlay to block leaflet pointer events on preview so onClick triggers cleanly */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }} />
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'var(--color-surface)', padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600, boxShadow: 'var(--shadow-card)', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 11 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-brand)' }} />
          TechPark Hub
        </div>
      </div>

      {/* Fullscreen Expanded Map */}
      {expanded && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'var(--color-canvas)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', zIndex: 2 }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, margin: 0, color: 'var(--color-ink)' }}>Nearest Drop-off Hubs</h2>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-subtle)' }}>Select a marker to view hub details.</p>
            </div>
            <button 
              className="btn btn--secondary btn--sm tap-effect" 
              onClick={() => setExpanded(false)}
            >
              Close Map
            </button>
          </div>
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <MapContent interactive={true} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
