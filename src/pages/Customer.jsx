import { useState } from 'react'
import { Users, Phone, Mail, MapPin, FileText, CheckSquare, Info } from 'lucide-react'

const ALMAX = '#0099D6'

const ALMAX_CUSTOMER = {
  id: 1,
  name: 'Almax Professional Painters Tools',
  accountNo: 'ALMAX-0001',
  address: '6b TY Duncan Road, Oamaru North, Oamaru 9494',
  phone: '09 444 1234',
  email: 'sales@almax.co.nz',
  salesYTD: '$148,400',
  lastVisit: '12 Jun 2026',
  outstandingBalance: '$4,250.00',
  creditLimit: '$20,000.00',
  paymentTerms: '30 days',
  notes: [
    { id: 1, date: '12 Jun 2026', author: 'MarkJ', text: 'Discussed new roller product range — very interested in ALM-007 and ALM-009. Follow up next visit.' },
    { id: 2, date: '28 May 2026', author: 'MarkJ', text: 'Delivered order #4521. All good, customer happy with delivery time.' },
  ],
  tasks: [
    { id: 1, title: 'Follow up on recent order', due: '29 Jun 2026', status: 'Pending' },
    { id: 2, title: 'Send updated pricing sheet', due: '28 Jun 2026', status: 'Pending' },
  ],
}

const subTabs = [
  { key: 'dashboard', label: 'Dashboard', icon: Users },
  { key: 'notes', label: 'Notes', icon: FileText },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare },
  { key: 'account', label: 'Account Info', icon: Info },
]

function StatTile({ label, value, color }) {
  return (
    <div style={{ background: '#F4F7FB', borderRadius: 14, padding: '12px 14px' }}>
      <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>{label}</p>
      <p style={{ fontSize: 14, fontWeight: 800, color: color || '#0F172A', margin: 0 }}>{value}</p>
    </div>
  )
}

function DashboardTab({ customer }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header card */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: '#E6F4FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPin size={24} style={{ color: ALMAX }} />
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>{customer.name}</p>
            <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>{customer.accountNo}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StatTile label="Sales YTD" value={customer.salesYTD} color="#22c55e" />
          <StatTile label="Last Visit" value={customer.lastVisit} color={ALMAX} />
          <StatTile label="Balance" value={customer.outstandingBalance} color="#f97316" />
          <StatTile label="Credit Limit" value={customer.creditLimit} color="#64748B" />
        </div>
      </div>

      {/* Contact */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px' }}>Contact</p>
        <a href={`tel:${customer.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F4F7FB', borderRadius: 14, textDecoration: 'none', marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={16} style={{ color: '#16a34a' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{customer.phone}</span>
        </a>
        <a href={`mailto:${customer.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F4F7FB', borderRadius: 14, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E6F4FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={16} style={{ color: ALMAX }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{customer.email}</span>
        </a>
      </div>
    </div>
  )
}

function NotesTab({ customer }) {
  const [noteText, setNoteText] = useState('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: 16 }}>
        <textarea
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Add a note..."
          rows={3}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, color: '#0F172A', resize: 'none', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
        />
        <button style={{ marginTop: 10, padding: '12px', width: '100%', background: ALMAX, color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save Note</button>
      </div>
      {customer.notes.map(n => (
        <div key={n.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF4', padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: ALMAX }}>{n.author}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{n.date}</span>
          </div>
          <p style={{ fontSize: 14, color: '#0F172A', margin: 0, lineHeight: 1.5 }}>{n.text}</p>
        </div>
      ))}
    </div>
  )
}

function TasksTab({ customer }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {customer.tasks.map(t => (
        <div key={t.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF4', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>{t.title}</p>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Due: {t.due}</p>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#FFF7ED', color: '#C2410C' }}>{t.status}</span>
        </div>
      ))}
    </div>
  )
}

function AccountTab({ customer }) {
  const rows = [
    ['Account No', customer.accountNo],
    ['Payment Terms', customer.paymentTerms],
    ['Credit Limit', customer.creditLimit],
    ['Outstanding Balance', customer.outstandingBalance],
    ['Address', customer.address],
    ['Phone', customer.phone],
    ['Email', customer.email],
  ]
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', overflow: 'hidden' }}>
      {rows.map(([label, value], i) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 16px', borderBottom: i < rows.length - 1 ? '1px solid #F4F7FB' : 'none' }}>
          <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500, flexShrink: 0, marginRight: 16 }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', textAlign: 'right' }}>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Customer() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [customerSelected] = useState(true)

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Customer</h1>
      </div>

      {!customerSelected ? (
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: '60px 24px', textAlign: 'center' }}>
          <Users size={48} style={{ color: '#E8EDF4', margin: '0 auto 16px', display: 'block' }} />
          <p style={{ fontSize: 15, color: '#94A3B8', margin: 0 }}>Select a customer from the header bar to get started.</p>
        </div>
      ) : (
        <>
          {/* Sub-tab bar */}
          <div style={{ display: 'flex', gap: 0, background: '#fff', borderRadius: 16, border: '1px solid #E8EDF4', padding: 4, marginBottom: 16, overflowX: 'auto' }}>
            {subTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, minWidth: 72, padding: '9px 8px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                  background: activeTab === tab.key ? ALMAX : 'transparent',
                  color: activeTab === tab.key ? '#fff' : '#64748B',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ paddingBottom: 24 }}>
            {activeTab === 'dashboard' && <DashboardTab customer={ALMAX_CUSTOMER} />}
            {activeTab === 'notes' && <NotesTab customer={ALMAX_CUSTOMER} />}
            {activeTab === 'tasks' && <TasksTab customer={ALMAX_CUSTOMER} />}
            {activeTab === 'account' && <AccountTab customer={ALMAX_CUSTOMER} />}
          </div>
        </>
      )}
    </div>
  )
}
