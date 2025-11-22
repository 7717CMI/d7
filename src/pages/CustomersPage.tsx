import { useState } from 'react'
import { DemoDataNotice } from '../components/demo-notice'
import { Proposition1Table } from '../components/proposition-1-table'
import { Proposition2Table } from '../components/proposition-2-table'
import { Proposition3Table } from '../components/proposition-3-table'
import { generateProposition1Data, generateProposition2Data, generateProposition3Data } from '../lib/proposition-data'
import { Proposition1, Proposition2, Proposition3 } from '../lib/proposition-types'

type PropositionType = 'proposition1' | 'proposition2' | 'proposition3'

export function CustomersPage() {
  const [activeProposition, setActiveProposition] = useState<PropositionType>('proposition1')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Generate dummy data for all propositions
  const proposition1Data = generateProposition1Data(15)
  const proposition2Data = generateProposition2Data(15)
  const proposition3Data = generateProposition3Data(15)

  const handleExport = () => {
    let csv = ''
    let headers: string[] = []
    let data: any[] = []

    if (activeProposition === 'proposition1') {
      headers = Object.keys(proposition1Data[0] || {})
      data = proposition1Data
    } else if (activeProposition === 'proposition2') {
      headers = Object.keys(proposition2Data[0] || {})
      data = proposition2Data
    } else {
      headers = Object.keys(proposition3Data[0] || {})
      data = proposition3Data
    }

    // Create CSV
    csv = headers.join(',') + '\n'
    data.forEach(row => {
      csv += headers.map(header => {
        const value = row[header] || ''
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proposition_${activeProposition}_export.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-full mx-auto page-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Customer Details</h2>
        <p className="text-gray-600">Detailed customer information and contact details</p>
      </div>

      <DemoDataNotice />

      {/* Proposition Selection Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setActiveProposition('proposition1')}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 border-2 ${
            activeProposition === 'proposition1'
              ? 'bg-[#FFB366] text-gray-900 border-[#FFB366] shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
          }`}
        >
          Proposition 1 - Standard
        </button>
        <button
          onClick={() => setActiveProposition('proposition2')}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 border-2 ${
            activeProposition === 'proposition2'
              ? 'bg-[#DDA0DD] text-gray-900 border-[#DDA0DD] shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
          }`}
        >
          Proposition 2 - Advance
        </button>
        <button
          onClick={() => setActiveProposition('proposition3')}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 border-2 ${
            activeProposition === 'proposition3'
              ? 'bg-[#FFF4E6] text-gray-900 border-[#FFF4E6] shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
          }`}
        >
          Proposition 3 - Premium
        </button>
      </div>

      {/* Search and Export */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          onClick={handleExport}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm flex items-center justify-center"
        >
          <i className="bi bi-download mr-2"></i>
          Export to CSV
        </button>
      </div>

      {/* Table Display */}
      <div className="mb-6">
        {activeProposition === 'proposition1' && (
          <Proposition1Table data={proposition1Data} searchTerm={searchTerm} />
        )}
        {activeProposition === 'proposition2' && (
          <Proposition2Table data={proposition2Data} searchTerm={searchTerm} />
        )}
        {activeProposition === 'proposition3' && (
          <Proposition3Table data={proposition3Data} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  )
}
