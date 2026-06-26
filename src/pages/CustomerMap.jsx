import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { X, MapPin, Phone, ChevronRight, SlidersHorizontal, User } from 'lucide-react'
import { customers } from '../data/mockData'

const ALMAX_BLUE = '#0099D6'

function makeBrushIcon(w, shadow) {
  // House painter's brush — bristles at top, handle tapers to map point at bottom
  // Modelled on the reference image but in Almax blue throughout
  const h = Math.round(w * 2.1)
  return `<div style="filter:drop-shadow(${shadow})">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 100" width="${w}" height="${h}">

      <!-- BRISTLE FAN — wide at top, narrows to ferrule -->
      <path d="M3 40 C5 30 10 18 16 10 C20 4 24 1 27 1 C30 1 34 4 38 10 C44 18 49 30 51 40 L42 46 L12 46 Z"
        fill="${ALMAX_BLUE}" stroke="#005f8a" stroke-width="1.5" stroke-linejoin="round"/>
      <!-- Bristle texture — lighter vertical streaks -->
      <line x1="11" y1="36" x2="14" y2="46" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/>
      <line x1="17" y1="26" x2="19" y2="46" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="18" x2="23" y2="46" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/>
      <line x1="27" y1="14" x2="27" y2="46" stroke="rgba(255,255,255,0.3)"  stroke-width="2" stroke-linecap="round"/>
      <line x1="32" y1="18" x2="31" y2="46" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/>
      <line x1="37" y1="26" x2="35" y2="46" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/>
      <line x1="43" y1="36" x2="40" y2="46" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/>

      <!-- FERRULE — silver metal band -->
      <rect x="12" y="44" width="30" height="5"  rx="1" fill="#B0BAC8"/>
      <rect x="12" y="49" width="30" height="5"  rx="1" fill="#8A97A4"/>
      <rect x="12" y="54" width="30" height="3"  rx="1" fill="#6B7880"/>

      <!-- HANDLE — blue, tapers from ferrule down to a rounded point -->
      <path d="M17 57 C15 65 14 76 16 86 C18 93 22 98 27 100 C32 98 36 93 38 86 C40 76 39 65 37 57 Z"
        fill="${ALMAX_BLUE}" stroke="#005f8a" stroke-width="1.5" stroke-linejoin="round"/>
      <!-- Handle highlight — left side -->
      <path d="M20 58 C18 66 18 76 19 84 C20 89 22 93 25 96 C23 92 22 86 21 79 C20 70 20 64 20 58 Z"
        fill="rgba(255,255,255,0.22)"/>
      <!-- Small oval detail near bottom of handle (like ref image) -->
      <ellipse cx="27" cy="87" rx="4.5" ry="6" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
      <ellipse cx="27" cy="91"  rx="1.8" ry="1.8" fill="rgba(255,255,255,0.35)"/>

    </svg>
  </div>`
}

const pinDefault = L.divIcon({
  html: makeBrushIcon(32, '0 3px 10px rgba(0,0,0,0.3)'),
  className: '',
  iconSize: [32, 67],
  iconAnchor: [16, 67],
})

const pinSelected = L.divIcon({
  html: makeBrushIcon(40, '0 4px 18px rgba(0,153,214,0.5)'),
  className: '',
  iconSize: [40, 84],
  iconAnchor: [20, 84],
})

// Only show Almax for now
const mapCustomers = customers.filter(c => c.id === 1)

export default function CustomerMap() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleMarkerClick = useCallback((customer) => {
    setSelected(customer)
  }, [])

  const close = useCallback(() => setSelected(null), [])

  const goToProfile = () => {
    navigate('/customer', { state: { customerId: selected.id } })
  }

  const cardHeight = 220

  return (
    <div style={{ position: 'relative', height: 'calc(100svh - 56px)' }}>

      {/* Map — full size, sits behind everything */}
      <MapContainer
        center={[mapCustomers[0].lat, mapCustomers[0].lng]}
        zoom={14}
        style={{ width: '100%', height: '100%', zIndex: 0 }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        {mapCustomers.map(c => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={selected?.id === c.id ? pinSelected : pinDefault}
            eventHandlers={{ click: () => handleMarkerClick(c) }}
          />
        ))}
      </MapContainer>

      {/* Title overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '14px 16px 24px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.96) 60%, transparent)', pointerEvents: 'none' }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Customer Map</h1>
      </div>

      {/* Filter button */}
      <button style={{ position: 'absolute', top: 14, right: 16, zIndex: 20, width: 42, height: 42, borderRadius: 12, background: '#fff', border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: ALMAX_BLUE }}>
        <SlidersHorizontal size={18} />
      </button>

      {/* Customer count badge */}
      <div style={{ position: 'absolute', bottom: selected ? cardHeight + 16 : 24, left: 16, zIndex: 20, background: '#fff', borderRadius: 12, padding: '8px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: '1px solid #E8EDF4', display: 'flex', alignItems: 'center', gap: 6, transition: 'bottom 0.3s cubic-bezier(0.32,0.72,0,1)' }}>
        <User size={14} style={{ color: ALMAX_BLUE }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{mapCustomers.length} customer{mapCustomers.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Backdrop */}
      {selected && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 15, background: 'rgba(15,23,42,0.22)' }}
          onClick={close}
        />
      )}

      {/* Customer card slide-up */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
        background: '#fff',
        borderRadius: '22px 22px 0 0',
        boxShadow: '0 -6px 32px rgba(0,0,0,0.14)',
        transform: selected ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
          <div style={{ width: 32, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
        </div>

        {selected && (
          <div style={{ padding: '8px 18px 32px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: '#E6F4FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={22} style={{ color: ALMAX_BLUE }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: '0 0 2px', lineHeight: 1.25 }}>{selected.name}</p>
                <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.4 }}>{selected.address}</p>
              </div>
              <button onClick={close} style={{ background: '#F4F7FB', border: 'none', borderRadius: 99, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <X size={15} style={{ color: '#64748B' }} />
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[
                { label: 'Sales YTD', value: selected.salesYTD, color: '#22c55e' },
                { label: 'Last Visit', value: selected.lastVisit, color: ALMAX_BLUE },
                { label: 'Next Call', value: selected.nextCall, color: '#f97316' },
              ].map(s => (
                <div key={s.label} style={{ background: '#F4F7FB', borderRadius: 12, padding: '9px 10px' }}>
                  <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 3px' }}>{s.label}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: s.color, margin: 0, lineHeight: 1.3 }}>{s.value || '—'}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={`tel:${selected.phone}`}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', borderRadius: 12, background: '#DCFCE7', textDecoration: 'none', fontSize: 13, fontWeight: 600, color: '#16a34a' }}
              >
                <Phone size={15} /> Call
              </a>
              <button
                onClick={goToProfile}
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', borderRadius: 12, background: ALMAX_BLUE, border: 'none', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: '0 3px 12px rgba(0,153,214,0.3)' }}
              >
                View Full Profile <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
