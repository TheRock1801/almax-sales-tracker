import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Map, Calendar, UserPlus, CheckSquare,
  Briefcase, Grid3X3, ShoppingCart, RefreshCw, Settings,
  LogOut, X, Menu, ChevronDown, User, ChevronRight
} from 'lucide-react'
import { currentUser } from '../data/mockData'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Customer Map', icon: Map, path: '/customer-map' },
  { label: 'Call Plan', icon: Calendar, path: '/call-plan' },
  { label: 'Prospects', icon: UserPlus, path: '/prospects' },
  { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { label: 'Customer', icon: Briefcase, path: '/customer' },
  { label: 'Catalogue', icon: Grid3X3, path: '/catalogue' },
  { label: 'Order / Quote', icon: ShoppingCart, path: '/order-quote' },
  { label: 'Data Sync', icon: RefreshCw, path: '/data-sync' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header
        className="bg-white flex items-center justify-between px-4 sticky top-0 z-40"
        style={{
          height: 56,
          borderBottom: '1px solid #E8EDF4',
          boxShadow: '0 1px 8px rgba(0,153,214,0.07)'
        }}
      >
        <img src="/almax-logo.png" alt="Almax" style={{ height: 28, objectFit: 'contain' }} />
        <button
          onClick={() => setMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
          style={{ color: '#0099D6' }}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Slide-out nav */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1"
            style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)' }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="w-72 bg-white h-full flex flex-col overflow-y-auto" style={{ boxShadow: '-4px 0 32px rgba(0,0,0,0.12)' }}>

            {/* Drawer top */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #E8EDF4' }}>
              <img src="/almax-logo.png" alt="Almax" style={{ height: 26, objectFit: 'contain' }} />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg"
                style={{ background: '#F4F7FB', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* User info */}
            <div className="px-5 py-3" style={{ borderBottom: '1px solid #E8EDF4' }}>
              <div
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: '#E6F4FA' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                  style={{ background: '#0099D6' }}
                >
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-tight">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                </div>
              </div>
            </div>

            {/* Customer selector */}
            <div className="px-5 py-3" style={{ borderBottom: '1px solid #E8EDF4' }}>
              <button
                className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors"
                style={{ background: '#F4F7FB', border: '1px solid #E8EDF4', color: '#64748B' }}
              >
                <span className="flex items-center gap-2">
                  <User size={15} />
                  Select customer...
                </span>
                <ChevronDown size={15} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 py-3 px-3">
              {navItems.map(({ label, icon: Icon, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all ${
                      isActive ? 'text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                  style={({ isActive }) => isActive ? { background: '#0099D6' } : {}}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={18} className={isActive ? 'text-white' : ''} style={isActive ? {} : { color: '#0099D6' }} />
                      <span className="flex-1">{label}</span>
                      {!isActive && <ChevronRight size={14} className="text-slate-300" />}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <div className="px-3 pb-6" style={{ borderTop: '1px solid #E8EDF4', paddingTop: 12 }}>
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                onClick={() => { setMenuOpen(false); navigate('/') }}
              >
                <LogOut size={18} className="text-slate-400" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <main className="pb-10">
        {children}
      </main>
    </div>
  )
}
