import { useState } from 'react'
import { MapPin, Phone, CheckCircle, Clock, Play, ChevronRight, TrendingUp } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { tasks, callPlan, salesData, topCustomers } from '../data/mockData'

const ALMAX_BLUE = '#0099D6'
const CUSTOMER_COLORS = ['#0099D6','#22c55e','#ef4444','#f97316','#8b5cf6','#06b6d4','#ec4899','#84cc16','#f59e0b','#6366f1']

const callPlanTabs = ['Today', 'Tomorrow', 'This Week']
const callPlanKeys = ['today', 'tomorrow', 'thisWeek']

function formatSales(value) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
  return `$${value}`
}

const SalesTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#0F172A', color: '#fff', borderRadius: 10, padding: '8px 14px', fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
      <p style={{ fontWeight: 700, marginBottom: 2 }}>{label}</p>
      <p>Sales: {formatSales(payload[0].value)}</p>
    </div>
  )
}

function SectionCard({ title, action, actionLabel, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,153,214,0.06)', overflow: 'hidden' }}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          {title && <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h2>}
          {action && (
            <button
              onClick={action}
              style={{ fontSize: 12, color: ALMAX_BLUE, fontWeight: 600, background: '#E6F4FA', border: 'none', borderRadius: 20, padding: '4px 12px', cursor: 'pointer' }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
      <div className="px-5 pb-5">{children}</div>
    </div>
  )
}

function TaskCard({ task, onComplete }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4 mb-3"
      style={{ background: '#F4F7FB', border: '1px solid #E8EDF4' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
      >
        <CheckCircle size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>{task.title}</p>
        <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{task.customer}</p>
        <span
          style={{ display: 'inline-block', marginTop: 5, fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: '#FFF7ED', color: '#C2410C' }}
        >
          {task.status}
        </span>
      </div>
      <button
        onClick={() => onComplete(task.id)}
        className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-colors"
        style={{ border: '2px solid #E8EDF4', background: '#fff' }}
      >
        <CheckCircle size={17} style={{ color: '#CBD5E1' }} />
      </button>
    </div>
  )
}

function AppointmentCard({ appt }) {
  const isVisit = appt.type === 'VISIT'
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4 mb-3"
      style={{ background: '#F4F7FB', border: '1px solid #E8EDF4' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: isVisit ? ALMAX_BLUE : '#16a34a' }}
      >
        {isVisit ? <MapPin size={17} className="text-white" /> : <Phone size={17} className="text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>{appt.customer}</p>
        <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }} className="truncate">{appt.address}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span style={{ fontSize: 11, color: '#94A3B8' }}>{appt.time} · {appt.duration}</span>
          {appt.phone && <span style={{ fontSize: 11, color: '#94A3B8' }}>· {appt.phone}</span>}
          <span
            style={{
              fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 20,
              background: isVisit ? '#E6F4FA' : '#DCFCE7',
              color: isVisit ? ALMAX_BLUE : '#16a34a',
            }}
          >
            {appt.type}
          </span>
        </div>
      </div>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
        style={{ background: isVisit ? ALMAX_BLUE : '#16a34a', boxShadow: '0 2px 8px rgba(0,153,214,0.25)' }}
      >
        <Play size={14} className="text-white" style={{ marginLeft: 2 }} />
      </button>
    </div>
  )
}

export default function Dashboard() {
  const [completedTasks, setCompletedTasks] = useState([])
  const [callTab, setCallTab] = useState(0)

  const activeTasks = tasks.filter(t => !completedTasks.includes(t.id))
  const currentCallList = callPlan[callPlanKeys[callTab]]

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Page title */}
      <div className="pt-1 pb-1">
        <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
          Sales Tracker
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>Dashboard</h1>
      </div>

      {/* Today's Tasks */}
      <SectionCard
        title="Today's Tasks"
        actionLabel="View All"
        action={() => {}}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, marginTop: -4 }}>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748B', background: '#F4F7FB', border: '1px solid #E8EDF4', borderRadius: 20, padding: '4px 12px', cursor: 'pointer' }}
          >
            <Clock size={12} /> Overdue
          </button>
        </div>

        {activeTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#94A3B8', fontSize: 13 }}>
            All tasks complete ✓
          </div>
        ) : (
          activeTasks.map(task => (
            <TaskCard key={task.id} task={task} onComplete={id => setCompletedTasks(p => [...p, id])} />
          ))
        )}

        {/* First visit from call plan shown here too */}
        {callPlan.today.slice(0, 1).map(appt => (
          <AppointmentCard key={appt.id} appt={appt} />
        ))}
      </SectionCard>

      {/* Call Plan */}
      <SectionCard>
        <div className="flex items-center gap-3 mb-4 flex-wrap" style={{ marginTop: -4 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0, marginRight: 4 }}>Call Plan</h2>
          {callPlanTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setCallTab(i)}
              style={{
                fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20,
                border: callTab === i ? `2px solid ${ALMAX_BLUE}` : '2px solid #E8EDF4',
                background: callTab === i ? ALMAX_BLUE : '#fff',
                color: callTab === i ? '#fff' : '#64748B',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-2 mb-4">
          <span style={{ fontSize: 42, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{currentCallList.length}</span>
          <span style={{ fontSize: 14, color: '#64748B', paddingBottom: 6 }}>
            appointment{currentCallList.length !== 1 ? 's' : ''} {callPlanTabs[callTab].toLowerCase()}
          </span>
        </div>

        {currentCallList.map(appt => (
          <AppointmentCard key={appt.id} appt={appt} />
        ))}
      </SectionCard>

      {/* Today's Route */}
      <SectionCard title="Today's Route">
        <RouteMap appointments={callPlan.today} />
      </SectionCard>

      {/* Active Carts */}
      <SectionCard title="Active Carts">
        <p style={{ fontSize: 13, color: '#94A3B8' }}>No active carts on this device.</p>
      </SectionCard>

      {/* Draft Orders */}
      <SectionCard title="Draft Orders">
        <p style={{ fontSize: 13, color: '#94A3B8' }}>No draft orders saved on this device.</p>
      </SectionCard>

      {/* Sales Chart */}
      <SectionCard title="My Sales — Last 12 Months">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, marginTop: -4 }}>
          <TrendingUp size={14} style={{ color: '#22c55e' }} />
          <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>+38% vs last year</span>
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={salesData} margin={{ top: 4, right: 4, left: -8, bottom: 44 }}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: '#94A3B8' }}
              angle={-45}
              textAnchor="end"
              interval={0}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatSales}
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              width={38}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<SalesTooltip />} cursor={{ fill: '#E6F4FA' }} />
            <Bar dataKey="sales" fill={ALMAX_BLUE} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Top Customers */}
      <SectionCard title="Top 10 Customers — Last 12 Months">
        <div className="space-y-3" style={{ marginTop: -4 }}>
          {topCustomers.map((c, i) => {
            const max = topCustomers[0].sales
            const pct = (c.sales / max) * 100
            return (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#0F172A' }} className="truncate pr-2">{c.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', flexShrink: 0 }}>{formatSales(c.sales)}</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: '#F4F7FB', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: CUSTOMER_COLORS[i % CUSTOMER_COLORS.length], borderRadius: 99, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            )
          })}
        </div>
      </SectionCard>
    </div>
  )
}

function RouteMap({ appointments }) {
  return (
    <div
      style={{ borderRadius: 14, overflow: 'hidden', height: 180, background: '#E6F4FA', position: 'relative', marginTop: -4 }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3,
        backgroundImage: 'repeating-linear-gradient(0deg,#94a3b8 0,#94a3b8 1px,transparent 1px,transparent 36px),repeating-linear-gradient(90deg,#94a3b8 0,#94a3b8 1px,transparent 1px,transparent 36px)'
      }} />

      {/* Route line */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <polyline
          points={appointments.map((_, i) => `${(i + 1) * (100 / (appointments.length + 1))}%,${50 + (i % 2 === 0 ? -15 : 15)}%`).join(' ')}
          fill="none"
          stroke={ALMAX_BLUE}
          strokeWidth="2"
          strokeDasharray="6 3"
          opacity="0.5"
        />
      </svg>

      {/* Stop markers */}
      {appointments.map((appt, i) => (
        <div
          key={appt.id}
          style={{
            position: 'absolute',
            left: `${(i + 1) * (100 / (appointments.length + 1))}%`,
            top: `${50 + (i % 2 === 0 ? -15 : 15)}%`,
            transform: 'translate(-50%, -50%)',
            width: 32, height: 32,
            borderRadius: '50%',
            background: ALMAX_BLUE,
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 13,
            boxShadow: '0 2px 10px rgba(0,153,214,0.4)',
            border: '3px solid #fff',
            zIndex: 2
          }}
        >
          {i + 1}
        </div>
      ))}

      <p style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 10, color: '#94A3B8' }}>
        OpenStreetMap · Leaflet
      </p>
    </div>
  )
}
