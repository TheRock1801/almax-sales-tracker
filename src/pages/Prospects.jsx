import { useState } from 'react'
import { Search, Plus, Camera, X, ChevronRight } from 'lucide-react'
import { prospects as initialProspects } from '../data/mockData'

const ALMAX = '#0099D6'

const statusColors = {
  New: { bg: '#EFF6FF', text: '#1D4ED8' },
  Contacted: { bg: '#FFF7ED', text: '#C2410C' },
  Qualified: { bg: '#F0FDF4', text: '#15803D' },
}

function AddProspectSheet({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const submit = () => {
    if (!name.trim()) return
    const prefix = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 4)
    onAdd({ name, phone, email, address, accountNo: `${prefix}-${String(Date.now()).slice(-6)}`, status: 'New' })
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={onClose} />
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '8px 20px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)', maxHeight: '85vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 16px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Add Prospect</h3>
          <button onClick={onClose} style={{ background: '#F4F7FB', border: 'none', borderRadius: 99, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}><X size={16} /></button>
        </div>
        {[
          { label: 'Business Name', value: name, set: setName, placeholder: 'Enter business name...' },
          { label: 'Phone', value: phone, set: setPhone, placeholder: 'Phone number...' },
          { label: 'Email', value: email, set: setEmail, placeholder: 'Email address...' },
          { label: 'Address', value: address, set: setAddress, placeholder: 'Street address...' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>{f.label}</label>
            <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }} />
          </div>
        ))}
        <button onClick={submit} style={{ width: '100%', marginTop: 8, padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,153,214,0.3)' }}>Save Prospect</button>
      </div>
    </div>
  )
}

export default function Prospects() {
  const [list, setList] = useState(initialProspects)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState(null)

  const filtered = list.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.accountNo.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = data => {
    setList(prev => [...prev, { id: Date.now(), ...data }])
  }

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Prospects</h1>
      </div>

      {/* Filter panel */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,153,214,0.06)', padding: 20, marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>Name or Code</label>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or account code..."
          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => {}} style={{ padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Apply Filter</button>
          <button onClick={() => setShowAdd(true)} style={{ padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Plus size={18} /> Add Prospect
          </button>
          <button style={{ padding: '14px', borderRadius: 14, background: '#F4F7FB', color: '#64748B', border: '1px solid #E8EDF4', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Camera size={18} /> Scan Card
          </button>
        </div>
      </div>

      {/* Prospects list */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', padding: '12px 16px', borderBottom: '1px solid #F4F7FB' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Account No</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Name</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Status</span>
        </div>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 14 }}>No prospects found</p>
        ) : (
          filtered.map((p, i) => {
            const sc = statusColors[p.status] || statusColors.New
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', alignItems: 'center', padding: '14px 16px', width: '100%', background: 'none', border: 'none', borderBottom: i < filtered.length - 1 ? '1px solid #F4F7FB' : 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: ALMAX }}>{p.accountNo}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', paddingRight: 8 }}>{p.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: sc.bg, color: sc.text }}>{p.status}</span>
              </button>
            )
          })
        )}
      </div>

      {/* Detail sheet */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)} />
          <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '8px 20px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 16px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>{selected.name}</p>
                <span style={{ fontSize: 12, fontWeight: 700, color: ALMAX }}>{selected.accountNo}</span>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: '#F4F7FB', border: 'none', borderRadius: 99, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
            </div>
            {[['Phone', selected.phone], ['Email', selected.email], ['Address', selected.address]].filter(([,v]) => v).map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F4F7FB' }}>
                <span style={{ fontSize: 13, color: '#94A3B8' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
              </div>
            ))}
            <button style={{ width: '100%', marginTop: 16, padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              Convert to Customer <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {showAdd && <AddProspectSheet onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  )
}
