import { useState } from 'react'
import { Search, Zap, ChevronDown } from 'lucide-react'
import { products, categories } from '../data/mockData'

const ALMAX = '#0099D6'

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

export default function Catalogue() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [sort, setSort] = useState('Description A–Z')
  const [results, setResults] = useState(null)

  const doSearch = () => {
    let res = [...products]
    if (category !== 'All Categories') res = res.filter(p => p.category === category)
    if (searchTerm) res = res.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase()))
    if (sort === 'Description A–Z') res.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Description Z–A') res.sort((a, b) => b.name.localeCompare(a.name))
    if (sort === 'Price Low–High') res.sort((a, b) => a.price - b.price)
    if (sort === 'Price High–Low') res.sort((a, b) => b.price - a.price)
    setResults(res)
  }

  const showHistory = () => setResults(products.slice(0, 3))

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>Catalogue</h1>
      </div>

      {/* Search panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="Search by product name or code..."
            style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: 14, border: '1px solid #E8EDF4', background: '#fff', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 8px rgba(0,153,214,0.05)' }}
          />
        </div>

        <Select value={category} onChange={setCategory} options={categories} />

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={showHistory}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', borderRadius: 12, border: '1px solid #E8EDF4', background: '#F4F7FB', fontSize: 13, fontWeight: 600, color: '#64748B', cursor: 'pointer', flexShrink: 0 }}
          >
            <Zap size={14} /> History
          </button>
          <div style={{ flex: 1 }}>
            <Select value={sort} onChange={setSort} options={['Description A–Z', 'Description Z–A', 'Price Low–High', 'Price High–Low']} />
          </div>
        </div>

        <button
          onClick={doSearch}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,153,214,0.3)' }}
        >
          <Search size={18} /> Search
        </button>
      </div>

      {/* Results */}
      {results === null ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>
          Enter a search term or select categories,<br />then tap Search.
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: '#94A3B8', fontSize: 14 }}>No products found</div>
      ) : (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12 }}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
          {results.map(product => (
            <div key={product.code} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF4', padding: '14px 16px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: '0 0 4px', lineHeight: 1.3 }}>{product.name}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: ALMAX }}>{product.code}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#F4F7FB', color: '#64748B' }}>{product.category}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>${product.price.toFixed(2)}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>per {product.unit}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
