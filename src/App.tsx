import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar, MobileNavbar } from './components/sidebar'
import { OverviewPage } from './pages/OverviewPage'
import { CustomersPage } from './pages/CustomersPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Branding with Logo in top left */}
        <div className="logo-container fixed top-0 left-0 z-[60]">
          <img 
            src="/logo.png" 
            alt="COHERENT MARKET INSIGHTS"
            style={{ height: '45px', width: 'auto' }}
          />
        </div>
        <MobileNavbar />
        <Sidebar />
        <div className="min-h-screen transition-all duration-300 lg:ml-[280px]">
          <div className="p-8 pt-20">
            <div className="mb-6">
              <h1 className="text-center text-3xl font-bold text-blue-600 mb-2 tracking-tight">
                Customer Database - U.S. Cloud FinOps Market
              </h1>
            </div>
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

