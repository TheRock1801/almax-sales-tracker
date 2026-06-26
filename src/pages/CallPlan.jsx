import { useState } from 'react'
import { MapPin, Phone, Play, Plus, X, ChevronDown } from 'lucide-react'
import { callPlan } from '../data/mockData'

const ALMAX = '#0099D6'
const TABS = ['Today', 'Tomorrow', 'This Week']
const KEYS = ['today', 'tomorrow', 'thisWeek']

function AppointmentCard({ appt }) {
  const isVisit = appt.type === 'VISIT'
  return (
    <div style={{ background: '#F4F7FB', borderRadius: 16, border: '1px solid #E8EDF4', padding: '14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: isVisit ? ALMAX : '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {isVisit ? <MapPin size={17} style={{ color: '#fff' }} /> : <Phone size={17} style={{ color: '#fff' }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: '0 0 3px', lineHeight: 1.3 }}>{appt.customer}</p>
        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 5px' }} className="truncate">{appt.address}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#94A3B8' }}>{appt.time} · {appt.duration}</span>
          {appt.phone && <span style={{ fontSize: 11, color: '#94A3B8' }}>· {appt.phone}</span>}
          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 20, background: isVisit ? '#E6F4FA' : '#DCFCE7', color: isVisit ? ALMAX : '#16a34a' }}>{appt.type}</span>
        </div>
      </div>
      <button style={{ width: 36, height: 36, borderRadius: '50%', background: isVisit ? ALMAX : '#16a34a', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,153,214,0.25)' }}>
        <Play size={14} style={{ color: '#fff', marginLeft: 2 }} />
      </button>
    </div>
  )
}

function AddAppointmentSheet({ onClose, onAdd }) {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [time, setTime] = useState('')
  const [type, setType] = useState('VISIT')

  const submit = () => {
    if (!customer.trim()) return
    onAdd({ customer, address, time, type, duration: '30 min', id: Date.now() })
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={onClose} />
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '8px 20px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 16px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Add Appointment</h3>
          <button onClick={onClose} style={{ background: '#F4F7FB', border: 'none', borderRadius: 99, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {['VISIT', 'PHONE'].map(t => (
            <button key={t} onClick={() => setType(t)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: type === t ? `2px solid ${ALMAX}` : '2px solid #E8EDF4', background: type === t ? '#E6F4FA' : '#F4F7FB', color: type === t ? ALMAX : '#64748B', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>
        {[
          { label: 'Customer', value: customer, set: setCustomer, placeholder: 'Customer name...' },
          { label: 'Address', value: address, set: setAddress, placeholder: 'Address...' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>{f.label}</label>
            <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }} />
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>Time</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }} />
        </div>
        <button onClick={submit} style={{ width: '100%', padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,153,214,0.3)' }}>Save Appointment</button>
      </div>
    </div>
  )
}

export default function CallPlan() {
  const [activeTab, setActiveTab] = useState(0)
  const [plan, setPlan] = useState(callPlan)
  const [showAdd, setShowAdd] = useState(false)

  const current = plan[KEYS[activeTab]]

  const handleAdd = (appt) => {
    setPlan(prev => ({ ...prev, [KEYS[activeTab]]: [...prev[KEYS[activeTab]], appt] }))
  }

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ paddingTop: 4 }}>
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Call Plan</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 8, flexShrink: 0 }}>
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 0, background: '#fff', borderRadius: 16, border: '1px solid #E8EDF4', padding: 4, marginBottom: 16 }}>
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: activeTab === i ? ALMAX : 'transparent', color: activeTab === i ? '#fff' : '#64748B', transition: 'all 0.15s' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{current.length}</span>
        <span style={{ fontSize: 15, color: '#64748B', marginLeft: 8 }}>appointment{current.length !== 1 ? 's' : ''} {TABS[activeTab].toLowerCase()}</span>
      </div>

      {/* List */}
      <div style={{ paddingBottom: 24 }}>
        {current.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#94A3B8', fontSize: 14 }}>No appointments scheduled</div>
        ) : (
          current.map(appt => <AppointmentCard key={appt.id} appt={appt} />)
        )}
      </div>

      {showAdd && <AddAppointmentSheet onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  )
}
