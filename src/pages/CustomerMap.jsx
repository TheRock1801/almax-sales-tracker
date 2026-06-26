import { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { X, MapPin, Phone, Mail, ChevronRight, SlidersHorizontal } from 'lucide-react'

const ALMAX_BLUE = '#0099D6'

// Almax NZ — 6b TY Duncan Road, Oamaru North, Oamaru 9494
const ALMAX_CUSTOMER = {
  id: 1,
  name: 'Almax Professional Painters Tools',
  address: '6b TY Duncan Road, Oamaru North, Oamaru 9494',
  phone: '09 444 1234',
  email: 'sales@almax.co.nz',
  lat: -45.0878,
  lng: 170.9748,
  type: 'Customer',
  lastVisit: '12 Jun 2026',
  nextCall: 'Today, 9:00 AM',
  salesYTD: '$148,400',
}

// Custom Almax blue pin icon
function createAlmaxIcon(selected = false) {
  const size = selected ? 44 : 36
  const shadow = selected ? '0 4px 18px rgba(0,153,214,0.55)' : '0 2px 8px rgba(0,0,0,0.25)'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 36 44">
      <circle cx="18" cy="18" r="16" fill="${ALMAX_BLUE}" stroke="white" stroke-width="3"/>
      <path d="M18 34 C18 34 10 24 10 18 A8 8 0 0 1 26 18 C26 24 18 34 18 34Z" fill="${ALMAX_BLUE}" stroke="white" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="18" cy="18" r="5" fill="white"/>
    </svg>
  `
  return L.divIcon({
    html: `<div style="filter:drop-shadow(${shadow})">${svg}</div>`,
    className: '',
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 8],
    popupAnchor: [0, -(size + 8)],
  })
}

export default function CustomerMap() {
  const [selected, setSelected] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleMarkerClick = (customer) => {
    setSelected(customer)
    setSheetOpen(true)
  }

  const closeSheet = () => {
    setSheetOpen(false)
    setTimeout(() => setSelected(null), 300)
  }

  return (
    <div style={{ position: 'relative', height: 'calc(100svh - 56px)', overflow: 'hidden' }}>
      {/* Page title overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        padding: '14px 16px 10px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.97) 70%, transparent)',
        pointerEvents: 'none',
      }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
          Almax Sales Tracker
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Customer Map</h1>
      </div>

      {/* Filter button */}
      <button
        style={{
          position: 'absolute', top: 14, right: 16, zIndex: 30,
          width: 42, height: 42, borderRadius: 12,
          background: '#fff', border: '1px solid #E8EDF4',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#0099D6',
        }}
      >
        <SlidersHorizontal size={18} />
      </button>

      {/* Map */}
      <MapContainer
        center={[ALMAX_CUSTOMER.lat, ALMAX_CUSTOMER.lng]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <Marker
          position={[ALMAX_CUSTOMER.lat, ALMAX_CUSTOMER.lng]}
          icon={createAlmaxIcon(selected?.id === ALMAX_CUSTOMER.id)}
          eventHandlers={{ click: () => handleMarkerClick(ALMAX_CUSTOMER) }}
        />
      </MapContainer>

      {/* Bottom sheet backdrop */}
      {sheetOpen && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(15,23,42,0.3)', backdropFilter: 'blur(1px)' }}
          onClick={closeSheet}
        />
      )}

      {/* Customer bottom sheet */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: '#fff',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          transform: sheetOpen ? 'translateY(0)' : 'translateY(110%)',
          transition: 'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
          paddingBottom: 24,
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
        </div>

        {/* Close */}
        <button
          onClick={closeSheet}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: 99,
            background: '#F4F7FB', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#64748B',
          }}
        >
          <X size={16} />
        </button>

        {selected && (
          <div style={{ padding: '8px 20px 0' }}>
            {/* Customer header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: '#E6F4FA',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={24} style={{ color: ALMAX_BLUE }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.25 }}>{selected.name}</p>
                <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>{selected.address}</p>
              </div>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10, marginBottom: 18,
            }}>
              {[
                { label: 'Sales YTD', value: selected.salesYTD, color: '#22c55e' },
                { label: 'Last Visit', value: selected.lastVisit, color: ALMAX_BLUE },
                { label: 'Next Call', value: selected.nextCall, color: '#f97316' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#F4F7FB', borderRadius: 14, padding: '10px 12px' }}>
                  <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>{stat.label}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: stat.color, margin: 0, lineHeight: 1.3 }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              <a
                href={`tel:${selected.phone}`}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F4F7FB', borderRadius: 14, textDecoration: 'none' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={16} style={{ color: '#16a34a' }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{selected.phone}</span>
              </a>
              <a
                href={`mailto:${selected.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F4F7FB', borderRadius: 14, textDecoration: 'none' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E6F4FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={16} style={{ color: ALMAX_BLUE }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{selected.email}</span>
              </a>
            </div>

            {/* View full profile */}
            <button
              style={{
                width: '100%', padding: '15px', borderRadius: 16,
                background: ALMAX_BLUE, color: '#fff', border: 'none',
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                boxShadow: '0 4px 16px rgba(0,153,214,0.35)',
              }}
            >
              View Full Profile <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
