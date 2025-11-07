import Papa from 'papaparse'
import { Customer } from './types'
import type { FilterState } from './types'

// Cache for serverless environments
let cachedData: Customer[] | null = null
let dataLoadPromise: Promise<Customer[]> | null = null

export async function loadCustomerData(): Promise<Customer[]> {
  // Return cached data if available (useful for serverless)
  if (cachedData) {
    return cachedData
  }

  // Return existing promise if load is in progress
  if (dataLoadPromise) {
    return dataLoadPromise
  }

  // Create new load promise
  dataLoadPromise = (async () => {
    try {
      // Use relative URL for client-side
      const csvUrl = '/data/customers.csv'
      
      const response = await fetch(csvUrl)
      
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`)
      }

      const text = await response.text()
      
      return new Promise<Customer[]>((resolve, reject) => {
        Papa.parse<Record<string, string>>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const customers: Customer[] = results.data.map((row) => {
              const numericFields = [
                'Sr_No', 'Cloud_Optimization_Potential', 'ELO_Optimization_Potential',
                'Total_Optimization_Potential', 'Annual_IT_Spend_M', 'Current_Cloud_Spend_M',
                'Current_License_Spend_M', 'Potential_Cloud_Savings_M', 'Potential_License_Savings_M',
                'Total_Potential_Savings_M', 'Number_of_Employees', 'IT_Team_Size',
                'Number_of_VMs', 'Physical_Servers', 'Number_of_Databases', 'Number_of_Applications',
                'Microsoft_Licenses', 'SAP_Licenses', 'Oracle_Licenses', 'Azure_VMs', 'Azure_Storage_TB',
                'Azure_Monthly_Spend_K', 'AWS_EC2_Instances', 'AWS_S3_Storage_TB', 'AWS_Monthly_Spend_K',
                'GCP_VMs', 'GCP_Storage_TB', 'GCP_Monthly_Spend_K', 'Implementation_Cost_K',
                'Monthly_Savings_K', 'ROI_Payback_Months', 'Last_Contact_Days_Ago', 'Engagement_Score'
              ]
              
              const customer: any = {}
              Object.keys(row).forEach((key) => {
                const value = row[key]
                if (numericFields.includes(key)) {
                  customer[key] = parseFloat(value) || 0
                } else {
                  customer[key] = value
                }
              })
              return customer as Customer
            })
            cachedData = customers
            resolve(customers)
          },
          error: (error: Error) => {
            console.error('CSV parsing error:', error)
            reject(error)
          },
        })
      })
    } catch (error) {
      console.error('Error loading customer data:', error)
      dataLoadPromise = null // Reset promise on error
      return []
    }
  })()

  return dataLoadPromise
}

export function applyFilters(customers: Customer[], filters: FilterState): Customer[] {
  let filtered = [...customers]

  // Industry filter
  if (filters.industries.length > 0) {
    filtered = filtered.filter(c => filters.industries.includes(c.Industry_Vertical))
  }

  // Cloud platform filter
  if (filters.clouds.length > 0) {
    filtered = filtered.filter(c => filters.clouds.includes(c.Cloud_Platforms))
  }

  // Region filter
  if (filters.regions.length > 0) {
    filtered = filtered.filter(c => 
      filters.regions.some(region => 
        c.Geographical_Presence.toLowerCase().includes(region.toLowerCase())
      )
    )
  }

  // Optimization type filter
  if (filters.optTypes.length > 0) {
    filtered = filtered.filter(c => filters.optTypes.includes(c.Optimization_Type))
  }

  // License ecosystem filter
  if (filters.licenses.length > 0) {
    filtered = filtered.filter(c => 
      filters.licenses.some(license => 
        c.License_Ecosystem.toLowerCase().includes(license.toLowerCase())
      )
    )
  }

  // Optimization potential range filter
  if (filters.optRange && filters.optRange.length === 2) {
    filtered = filtered.filter(c => 
      c.Total_Optimization_Potential >= filters.optRange[0] &&
      c.Total_Optimization_Potential <= filters.optRange[1]
    )
  }

  return filtered
}

export function getUniqueValues(customers: Customer[]) {
  const industries = [...new Set(customers.map(c => c.Industry_Vertical))].sort()
  const clouds = [...new Set(customers.map(c => c.Cloud_Platforms))].sort()
  const optTypes = [...new Set(customers.map(c => c.Optimization_Type))].sort()
  
  // Extract regions from Geographical_Presence
  const regions = [...new Set(
    customers
      .map(c => {
        const match = c.Geographical_Presence.match(/operates across (.+)$/i)
        return match ? match[1].trim() : null
      })
      .filter(Boolean) as string[]
  )].sort()

  // Extract licenses from License_Ecosystem
  const allLicenses = new Set<string>()
  customers.forEach(c => {
    c.License_Ecosystem.split(',').forEach(lic => {
      const trimmed = lic.trim()
      if (trimmed) allLicenses.add(trimmed)
    })
  })
  const licenses = [...allLicenses].sort()

  return { industries, clouds, regions, optTypes, licenses }
}

export function exportToCSV(customers: Customer[]): string {
  if (customers.length === 0) return ''
  
  const headers = Object.keys(customers[0])
  const rows = customers.map(c => Object.values(c))
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(val => 
      typeof val === 'string' && val.includes(',') ? `"${val}"` : val
    ).join(','))
  ].join('\n')
  
  return csvContent
}

