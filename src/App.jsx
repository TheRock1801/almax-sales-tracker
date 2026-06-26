import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CustomerMap from './pages/CustomerMap'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer-map" element={<CustomerMap />} />
          <Route path="/call-plan" element={<Placeholder title="Call Plan" />} />
          <Route path="/prospects" element={<Placeholder title="Prospects" />} />
          <Route path="/tasks" element={<Placeholder title="Tasks" />} />
          <Route path="/customer" element={<Placeholder title="Customer" />} />
          <Route path="/catalogue" element={<Placeholder title="Catalogue" />} />
          <Route path="/order-quote" element={<Placeholder title="Order / Quote" />} />
          <Route path="/data-sync" element={<Placeholder title="Data Sync" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
