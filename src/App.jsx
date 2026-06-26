import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CustomerMap from './pages/CustomerMap'
import CallPlan from './pages/CallPlan'
import Prospects from './pages/Prospects'
import Tasks from './pages/Tasks'
import Customer from './pages/Customer'
import Catalogue from './pages/Catalogue'
import OrderQuote from './pages/OrderQuote'
import DataSync from './pages/DataSync'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer-map" element={<CustomerMap />} />
          <Route path="/call-plan" element={<CallPlan />} />
          <Route path="/prospects" element={<Prospects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/order-quote" element={<OrderQuote />} />
          <Route path="/data-sync" element={<DataSync />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
