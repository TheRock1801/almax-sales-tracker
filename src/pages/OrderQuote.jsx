import { useState } from 'react'
import { ShoppingCart, Plus, Trash2, X, ChevronDown } from 'lucide-react'
import { products } from '../data/mockData'

const ALMAX = '#0099D6'
const CUSTOMER = { name: 'Almax Professional Painters Tools', accountNo: 'ALMAX-0001' }

function Select({ value, onChange, options }) {
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', appearance: 'none', padding: '12px 36px 12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', background: '#fff', fontSize: 14, color: '#0F172A', cursor: 'pointer', outline: 'none' }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
    </div>
  )
}

export default function OrderQuote() {
  const [customerSelected] = useState(true)
  const [type, setType] = useState('Order')
  const [lines, setLines] = useState([])
  const [showProductPicker, setShowProductPicker] = useState(false)
  const [productSearch, setProductSearch] = useState('')

  const filteredProducts = products.filter(p =>
    !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.code.toLowerCase().includes(productSearch.toLowerCase())
  )

  const addProduct = (product) => {
    setLines(prev => {
      const existing = prev.find(l => l.code === product.code)
      if (existing) return prev.map(l => l.code === product.code ? { ...l, qty: l.qty + 1 } : l)
      return [...prev, { ...product, qty: 1 }]
    })
    setShowProductPicker(false)
    setProductSearch('')
  }

  const updateQty = (code, delta) => {
    setLines(prev => prev.map(l => l.code === code ? { ...l, qty: Math.max(1, l.qty + delta) } : l))
  }

  const removeLine = (code) => setLines(prev => prev.filter(l => l.code !== code))

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  const gst = subtotal * 0.15
  const total = subtotal + gst

  if (!customerSelected) {
    return (
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Order / Quote</h1>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: '60px 24px', textAlign: 'center' }}>
          <ShoppingCart size={48} style={{ color: '#E8EDF4', margin: '0 auto 16px', display: 'block' }} />
          <p style={{ fontSize: 15, color: '#94A3B8', margin: 0 }}>Select a customer from the header bar to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Order / Quote</h1>
      </div>

      {/* Customer banner */}
      <div style={{ background: '#E6F4FA', borderRadius: 16, padding: '12px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>{CUSTOMER.name}</p>
          <p style={{ fontSize: 12, color: ALMAX, margin: '2px 0 0' }}>{CUSTOMER.accountNo}</p>
        </div>
      </div>

      {/* Order type */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: 20, marginBottom: 14 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>Type</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Order', 'Quote'].map(t => (
            <button key={t} onClick={() => setType(t)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: type === t ? `2px solid ${ALMAX}` : '2px solid #E8EDF4', background: type === t ? '#E6F4FA' : '#F4F7FB', color: type === t ? ALMAX : '#64748B', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Line items */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #F4F7FB' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>Line Items</p>
          <button onClick={() => setShowProductPicker(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 12, background: ALMAX, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={16} /> Add Product
          </button>
        </div>
        {lines.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>No products added yet</p>
        ) : (
          lines.map(line => (
            <div key={line.code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #F4F7FB' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '0 0 2px', lineHeight: 1.3 }}>{line.name}</p>
                <p style={{ fontSize: 11, color: ALMAX, margin: 0 }}>{line.code} · ${line.price.toFixed(2)}/{line.unit}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateQty(line.code, -1)} style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #E8EDF4', background: '#F4F7FB', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', minWidth: 20, textAlign: 'center' }}>{line.qty}</span>
                <button onClick={() => updateQty(line.code, 1)} style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #E8EDF4', background: '#F4F7FB', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ALMAX }}>+</button>
              </div>
              <div style={{ textAlign: 'right', minWidth: 60 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 2px' }}>${(line.price * line.qty).toFixed(2)}</p>
                <button onClick={() => removeLine(line.code)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals */}
      {lines.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', padding: 20, marginBottom: 14 }}>
          {[['Subtotal', subtotal], ['GST (15%)', gst]].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 14, color: '#64748B' }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>${val.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '2px solid #F4F7FB' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: ALMAX }}>${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {lines.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          <button style={{ padding: '15px', borderRadius: 16, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,153,214,0.35)' }}>
            Submit {type}
          </button>
          <button style={{ padding: '15px', borderRadius: 16, background: '#F4F7FB', color: '#64748B', border: '1px solid #E8EDF4', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Save as Draft
          </button>
        </div>
      )}

      {/* Product picker sheet */}
      {showProductPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setShowProductPicker(false)} />
          <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '8px 20px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)', maxHeight: '75vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 16px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Add Product</h3>
              <button onClick={() => setShowProductPicker(false)} style={{ background: '#F4F7FB', border: 'none', borderRadius: 99, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
            </div>
            <input value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Search products..." style={{ padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', marginBottom: 12 }} />
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filteredProducts.map(p => (
                <button key={p.code} onClick={() => addProduct(p)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '12px 4px', background: 'none', border: 'none', borderBottom: '1px solid #F4F7FB', cursor: 'pointer', textAlign: 'left' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '0 0 2px' }}>{p.name}</p>
                    <p style={{ fontSize: 11, color: ALMAX, margin: 0 }}>{p.code}</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', flexShrink: 0, marginLeft: 12 }}>${p.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
