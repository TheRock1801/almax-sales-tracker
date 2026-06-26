import { useState } from 'react'
import { RefreshCw, Upload, Download, CheckCircle } from 'lucide-react'

const ALMAX = '#0099D6'

const uploadItems = [
  { label: 'Orders', count: 0 },
  { label: 'Quotes', count: 0 },
  { label: 'Prospects', count: 0 },
  { label: 'Notes', count: 0 },
  { label: 'Tasks', count: 0 },
]

const downloadItems = [
  { label: 'Customers', count: 32 },
  { label: 'Products', count: '2.9k' },
  { label: 'Catalogue', count: '2.8k' },
  { label: 'Prices', count: '64k' },
  { label: 'Countries', count: 2 },
  { label: 'Address Types', count: 2 },
  { label: 'Sales Reps', count: 18 },
]

function SectionLabel({ children }) {
  return <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{children}</p>
}

function Badge({ label, color }) {
  const colors = {
    green: { bg: '#F0FDF4', text: '#15803D' },
    orange: { bg: '#FFF7ED', text: '#C2410C' },
    gray: { bg: '#F4F7FB', text: '#64748B' },
  }
  const c = colors[color] || colors.gray
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: c.bg, color: c.text }}>{label}</span>
}

export default function DataSync() {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState('All up-to-date. Force a full re-sync if needed.')
  const [downloadTimes, setDownloadTimes] = useState(() => Object.fromEntries(downloadItems.map(i => [i.label, 'Just now'])))

  const handleSyncAll = () => {
    setSyncing(true)
    setLastSync('Syncing...')
    setTimeout(() => {
      setSyncing(false)
      setLastSync('All up-to-date. Force a full re-sync if needed.')
      setDownloadTimes(Object.fromEntries(downloadItems.map(i => [i.label, 'Just now'])))
    }, 1800)
  }

  const handleDownloadAll = () => {
    downloadItems.forEach((item, i) => {
      setTimeout(() => {
        setDownloadTimes(prev => ({ ...prev, [item.label]: 'Just now' }))
      }, i * 200)
    })
  }

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Data Sync</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 24 }}>

        {/* Sync All */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F4F7FB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 3, height: 18, borderRadius: 99, background: ALMAX }} />
              <SectionLabel>Sync All</SectionLabel>
            </div>
            <button
              onClick={handleSyncAll}
              disabled={syncing}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 12, background: syncing ? '#94A3B8' : ALMAX, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: syncing ? 'not-allowed' : 'pointer', boxShadow: syncing ? 'none' : '0 2px 10px rgba(0,153,214,0.3)', transition: 'all 0.2s' }}
            >
              <RefreshCw size={15} style={{ animation: syncing ? 'spin 1s linear infinite' : 'none' }} /> Sync All
            </button>
          </div>
          <p style={{ padding: '12px 20px', fontSize: 13, color: '#64748B', margin: 0 }}>{lastSync}</p>
        </div>

        {/* Pending Uploads */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F4F7FB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 3, height: 18, borderRadius: 99, background: ALMAX }} />
              <SectionLabel>Pending Uploads</SectionLabel>
              <Badge label="NONE" color="gray" />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#64748B', background: '#F4F7FB', border: '1px solid #E8EDF4', borderRadius: 10, padding: '7px 12px', cursor: 'pointer' }}>
              <Upload size={13} /> Upload All
            </button>
          </div>
          <div>
            {uploadItems.map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < uploadItems.length - 1 ? '1px solid #F4F7FB' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 99, background: '#E8EDF4' }} />
                  <span style={{ fontSize: 14, color: '#94A3B8' }}>{item.label} ({item.count})</span>
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}>Upload</button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Downloads */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F4F7FB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 3, height: 18, borderRadius: 99, background: ALMAX }} />
              <SectionLabel>Data Downloads</SectionLabel>
              <Badge label="FRESH" color="green" />
            </div>
            <button onClick={handleDownloadAll} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#0F172A', background: '#F4F7FB', border: '1px solid #E8EDF4', borderRadius: 10, padding: '7px 12px', cursor: 'pointer' }}>
              <Download size={13} /> Download All
            </button>
          </div>
          <div>
            {downloadItems.map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < downloadItems.length - 1 ? '1px solid #F4F7FB' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={14} style={{ color: '#22c55e' }} />
                  <span style={{ fontSize: 14, color: '#0F172A', fontWeight: 500 }}>{item.label} ({item.count})</span>
                </div>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{downloadTimes[item.label]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
