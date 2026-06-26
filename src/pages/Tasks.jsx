import { useState } from 'react'
import { Pencil, Check, Trash2, Plus, X, ChevronDown } from 'lucide-react'
import { detailedTasks } from '../data/mockData'

const ALMAX = '#0099D6'

const statusColors = {
  Pending: { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  Complete: { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
}

const typeColors = {
  TASK: { bg: '#EFF6FF', text: '#1D4ED8' },
  NOTE: { bg: '#F5F3FF', text: '#6D28D9' },
}

function PageHeader({ title }) {
  return (
    <div style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
      <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>Almax Sales Tracker</p>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>{title}</h1>
    </div>
  )
}

function Card({ children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF4', boxShadow: '0 2px 12px rgba(0,153,214,0.06)', ...style }}>
      {children}
    </div>
  )
}

function BlueBtn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{ width: '100%', padding: '14px', borderRadius: 14, background: ALMAX, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, ...style }}>
      {children}
    </button>
  )
}

function Select({ value, onChange, options }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', appearance: 'none', padding: '12px 36px 12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', background: '#fff', fontSize: 14, color: '#0F172A', cursor: 'pointer', outline: 'none' }}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
    </div>
  )
}

function TaskCard({ task, onComplete, onDelete }) {
  const sc = statusColors[task.status]
  const tc = typeColors[task.type]
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF4', marginBottom: 12, overflow: 'hidden', display: 'flex' }}>
      <div style={{ width: 4, background: task.status === 'Pending' ? '#F97316' : '#22C55E', flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '14px 14px 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: tc.bg, color: tc.text }}>✓ {task.type}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: sc.bg, color: sc.text }}>{task.status}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2 }}><Pencil size={16} /></button>
            <button onClick={() => onComplete(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2 }}><Check size={16} /></button>
            <button onClick={() => onDelete(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2 }}><Trash2 size={16} /></button>
          </div>
        </div>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 4px', lineHeight: 1.3 }}>{task.title}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: ALMAX, margin: '0 0 6px' }}>{task.customer}</p>
        <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Due: {task.dueDate} &nbsp; Assigned: {task.assignedTo}</p>
        <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>By: {task.createdBy} &nbsp; Created: {task.createdDate}</p>
      </div>
    </div>
  )
}

function AddTaskSheet({ onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [customer, setCustomer] = useState('')
  const [dueDate, setDueDate] = useState('')

  const submit = () => {
    if (!title.trim()) return
    onAdd({ title, customer, dueDate })
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={onClose} />
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '8px 20px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 16px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E8EDF4' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Add Task</h3>
          <button onClick={onClose} style={{ background: '#F4F7FB', border: 'none', borderRadius: 99, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}><X size={16} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>Task Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title..." style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>Customer</label>
            <input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Customer name..." style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>Due Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }} />
          </div>
          <BlueBtn onClick={submit} style={{ marginTop: 8 }}>Save Task</BlueBtn>
        </div>
      </div>
    </div>
  )
}

export default function Tasks() {
  const [taskList, setTaskList] = useState(detailedTasks)
  const [dateRange, setDateRange] = useState('Last 12 Months')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = taskList.filter(t => {
    const matchStatus = status === 'All' || t.status === status
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const handleComplete = id => setTaskList(prev => prev.map(t => t.id === id ? { ...t, status: 'Complete' } : t))
  const handleDelete = id => setTaskList(prev => prev.filter(t => t.id !== id))
  const handleAdd = ({ title, customer, dueDate }) => {
    setTaskList(prev => [...prev, {
      id: Date.now(), title, customer: customer || '—', status: 'Pending', type: 'TASK',
      dueDate: dueDate || '—', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: 'Today'
    }])
  }

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <PageHeader title="Tasks" />

      <Card style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>Date Range</label>
          <Select value={dateRange} onChange={setDateRange} options={['Last 12 Months', 'Last 30 Days', 'Last 7 Days', 'All Time']} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>Status</label>
          <Select value={status} onChange={setStatus} options={['All', 'Pending', 'Complete']} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 8 }}>Search</label>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Subject or notes..."
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E8EDF4', fontSize: 14, outline: 'none', color: '#0F172A', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BlueBtn onClick={() => {}}>Apply Filter</BlueBtn>
          <BlueBtn onClick={() => setShowAdd(true)}><Plus size={18} /> Add Task</BlueBtn>
        </div>
      </Card>

      <div style={{ paddingBottom: 24 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 14 }}>No tasks found</div>
        ) : (
          filtered.map(t => <TaskCard key={t.id} task={t} onComplete={handleComplete} onDelete={handleDelete} />)
        )}
      </div>

      {showAdd && <AddTaskSheet onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  )
}
