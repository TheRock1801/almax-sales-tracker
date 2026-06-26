export default function Placeholder({ title }) {
  return (
    <div className="px-4 py-5">
      <div className="pt-1 pb-1 mb-4">
        <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
          Almax Sales Tracker
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>{title}</h1>
      </div>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,153,214,0.06)', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ color: '#94A3B8', fontSize: 14 }}>Coming soon</p>
      </div>
    </div>
  )
}
