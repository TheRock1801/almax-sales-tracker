import { useState } from 'react'
import { Sun, Moon, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'

const ALMAX = '#0099D6'
const APP_VERSION = '1.0.0'

function SectionCard({ label, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,153,214,0.06)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: '1px solid #F4F7FB' }}>
        <div style={{ width: 3, height: 18, borderRadius: 99, background: ALMAX }} />
        <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{label}</p>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  )
}

export default function Settings() {
  const [theme, setTheme] = useState('Light')
  const [checking, setChecking] = useState(false)
  const [clearConfirm, setClearConfirm] = useState(false)

  const handleCheckLatest = () => {
    setChecking(true)
    setTimeout(() => setChecking(false), 1500)
  }

  const handleClear = () => {
    if (!clearConfirm) { setClearConfirm(true); return }
    setClearConfirm(false)
    alert('All synced data cleared.')
  }

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Settings</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 24 }}>

        {/* Appearance */}
        <SectionCard label="Appearance">
          <div style={{ display: 'flex', gap: 10 }}>
            {['Light', 'Dark'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px', borderRadius: 14, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  border: theme === t ? `2px solid ${ALMAX}` : '2px solid #E8EDF4',
                  background: theme === t ? '#E6F4FA' : '#F4F7FB',
                  color: theme === t ? ALMAX : '#64748B',
                  transition: 'all 0.15s',
                }}
              >
                {t === 'Light' ? <Sun size={18} /> : <Moon size={18} />} {t}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Account */}
        <SectionCard label="Account">
          {[
            ['Name', 'Mark Jones'],
            ['Email', 'mark.jones@almax.co.nz'],
            ['Role', 'Sales Representative'],
            ['Region', 'South Island'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #F4F7FB' }}>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{value}</span>
            </div>
          ))}
          <button style={{ width: '100%', padding: '12px', borderRadius: 12, background: '#F4F7FB', border: '1px solid #E8EDF4', fontSize: 14, fontWeight: 600, color: '#64748B', cursor: 'pointer' }}>
            Edit Profile
          </button>
        </SectionCard>

        {/* Cached Data */}
        <SectionCard label="Cached Data">
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.6 }}>
            Clears all locally stored data — customers, products, catalogue, prices, orders, drafts, carts, and pending CRM notes.
          </p>
          <button
            onClick={handleClear}
            style={{
              padding: '13px 20px', borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              background: clearConfirm ? '#FEF2F2' : '#FFF1F2',
              color: clearConfirm ? '#B91C1C' : '#E11D48',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: clearConfirm ? '0 0 0 2px #FECACA inset' : 'none',
              transition: 'all 0.15s',
            }}
          >
            <AlertTriangle size={16} />
            {clearConfirm ? 'Tap again to confirm' : 'Clear All Synced Data'}
          </button>
        </SectionCard>

        {/* Version */}
        <SectionCard label="Version">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Installed', APP_VERSION],
              ['Latest', APP_VERSION],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#64748B' }}>{label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>v{value}</span>
                  {label === 'Latest' && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: '#F0FDF4', color: '#15803D' }}>UP TO DATE</span>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={handleCheckLatest}
              disabled={checking}
              style={{ marginTop: 4, padding: '11px 18px', borderRadius: 12, background: '#F4F7FB', border: '1px solid #E8EDF4', fontSize: 13, fontWeight: 600, color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, width: 'fit-content' }}
            >
              <RefreshCw size={14} style={{ animation: checking ? 'spin 1s linear infinite' : 'none' }} />
              {checking ? 'Checking...' : 'Check Latest'}
            </button>
          </div>
        </SectionCard>

        {/* Force Update */}
        <SectionCard label="Force Update">
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.6 }}>
            Forces the app to reload from the server. Use this if you notice stale data or UI issues after an update.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '13px 20px', borderRadius: 14, background: '#EFF6FF', color: '#1D4ED8', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <RefreshCw size={16} /> Force Reload App
          </button>
        </SectionCard>

      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
