import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { X, MapPin, Phone, ChevronRight, SlidersHorizontal, User } from 'lucide-react'
import { customers } from '../data/mockData'

const ALMAX_BLUE = '#0099D6'

function createPin(selected = false) {
  const size = selected ? 42 : 34
  const glow = selected ? '0 0 0 6px rgba(0,153,214,0.18)' : '0 2px 10px rgba(0,0,0,0.22)'
  return L.divIcon({
    html: `
      <div style="width:${size}px;height:${size + 10}px;position:relative;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25))">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="${size}" height="${size + 10}">
          <circle cx="20" cy="20" r="19" fill="${ALMAX_BLUE}" stroke="white" stroke-width="3"/>
          <path d="M20 52 C20 52 8 34 8 20 A12 12 0 0 1 32 20 C32 34 20 52 20 52Z" fill="${ALMAX_BLUE}" stroke="white" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="20" cy="20" r="7" fill="white"/>
        </svg>
      </div>`,
    className: '',
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size + 10],
  })
}

export default function CustomerMap() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const open = (customer) => setSelected(customer)
  const close = () => setSelected(null)

  const goToProfile = () => {
    navigate('/customer', { state: { customerId: selected.id } })
  }

  return (
    <div style={{ position: 'relative', height: 'calc(100svh - 56px)', overflow: 'hidden' }}>

      {/* Title overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, padding: '14px 16px 10px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.97) 65%, transparent)', pointerEvents: 'none' }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Customer Map</h1>
      </div>

      {/* Filter button */}
      <button style={{ position: 'absolute', top: 14, right: 16, zIndex: 30, width: 42, height: 42, borderRadius: 12, background: '#fff', border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: ALMAX_BLUE }}>
        <SlidersHorizontal size={18} />
      </button>

      {/* Customer count badge */}
      <div style={{ position: 'absolute', bottom: selected ? 240 : 24, left: 16, zIndex: 30, background: '#fff', borderRadius: 12, padding: '8px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: '1px solid #E8EDF4', display: 'flex', alignItems: 'center', gap: 6, transition: 'bottom 0.32s cubic-bezier(0.32,0.72,0,1)' }}>
        <User size={14} style={{ color: ALMAX_BLUE }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{customers.length} customers</span>
      </div>

      {/* Map */}
      <MapContainer
        center={[customers[0].lat, customers[0].lng]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        {customers.map(c => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={createPin(selected?.id === c.id)}
            eventHandlers={{ click: () => open(c) }}
          />
        ))}
      </MapContainer>

      {/* Backdrop */}
      {selected && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(15,23,42,0.25)' }}
          onClick={close}
        />
      )}

      {/* Customer card — compact slide-up */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#fff',
        borderRadius: '22px 22px 0 0',
        boxShadow: '0 -6px 32px rgba(0,0,0,0.13)',
        transform: selected ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
          <div style={{ width: 32, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
        </div>

        {selected && (
          <div style={{ padding: '10px 18px 28px' }}>
            {/* Header row */}
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

            {/* Stats row */}
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

            {/* Quick actions row */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <a
                href={`tel:${selected.phone}`}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 12, background: '#DCFCE7', textDecoration: 'none', fontSize: 13, fontWeight: 600, color: '#16a34a' }}
              >
                <Phone size={15} /> Call
              </a>
              <button
                onClick={goToProfile}
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 12, background: ALMAX_BLUE, border: 'none', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: '0 3px 12px rgba(0,153,214,0.3)' }}
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
