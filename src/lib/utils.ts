import Papa from 'papaparse'
import { Customer } from './types'
import type { FilterState } from './types'

// Cache for serverless environments
let cachedData: Customer[] | null = null
let dataLoadPromise: Promise<Customer[]> | null = null

/**
 * Normalizes license names to their canonical form.
 * Consolidates all variations of the same company/product to a single specific name.
 */
export function normalizeLicenseName(license: string): string {
  const trimmed = license.trim()
  
  // Microsoft variations → Microsoft 365
  if (trimmed.toLowerCase().includes('microsoft')) {
    return 'Microsoft 365'
  }
  
  // Oracle variations → Oracle Cloud
  if (trimmed.toLowerCase().includes('oracle')) {
    return 'Oracle Cloud'
  }
  
  // SAP variations → SAP HANA
  if (trimmed.toLowerCase().includes('sap')) {
    return 'SAP HANA'
  }
  
  // AWS variations → AWS Services
  if (trimmed.toLowerCase().includes('aws') || trimmed.toLowerCase().includes('amazon web services')) {
    return 'AWS Services'
  }
  
  // IBM variations → IBM WebSphere
  if (trimmed.toLowerCase().includes('ibm')) {
    return 'IBM WebSphere'
  }
  
  // Return original if no match
  return trimmed
}

/**
 * Normalizes geographic region names to one of the 5 standard regions.
 * Maps all regional variations to: NORTHEAST, SOUTHEAST, MIDWEST, SOUTHWEST, WEST
 */
export function normalizeRegionName(region: string): string {
  const normalized = region.trim().toLowerCase()
  
  // NORTHEAST
  if (normalized.includes('northeast') || normalized.includes('north east') || normalized.includes('mid-atlantic')) {
    return 'NORTHEAST'
  }
  
  // SOUTHEAST
  if (normalized.includes('southeast') || normalized.includes('south east') || normalized.includes('south central')) {
    return 'SOUTHEAST'
  }
  
  // MIDWEST
  if (normalized.includes('midwest') || normalized.includes('mid west')) {
    return 'MIDWEST'
  }
  
  // SOUTHWEST
  if (normalized.includes('southwest') || normalized.includes('south west')) {
    return 'SOUTHWEST'
  }
  
  // WEST
  if (normalized.includes('west') || normalized.includes('pacific')) {
    return 'WEST'
  }
  
  // Default fallback - try to match any region keyword
  if (normalized.includes('north') && normalized.includes('east')) return 'NORTHEAST'
  if (normalized.includes('south') && normalized.includes('east')) return 'SOUTHEAST'
  if (normalized.includes('south') && normalized.includes('west')) return 'SOUTHWEST'
  if (normalized.includes('mid')) return 'MIDWEST'
  if (normalized.includes('west')) return 'WEST'
  
  // If no match, return a default (could be 'UNKNOWN' or one of the 5)
  return 'WEST' // Default fallback
}

export async function loadCustomerData(): Promise<Customer[]> {
  // Clear cache to force reload fresh data (for development)
  // In production, you may want to keep caching enabled
  cachedData = null
  dataLoadPromise = null

  // Create new load promise
  dataLoadPromise = (async () => {
    try {
      // Use relative URL for client-side with cache busting
      const csvUrl = `/data/customers.csv?t=${Date.now()}`
      
      const response = await fetch(csvUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`)
      }

      const text = await response.text()
      console.log(`Fetched CSV file, length: ${text.length} characters`)
      
      return new Promise<Customer[]>((resolve, reject) => {
        Papa.parse<Record<string, string>>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log(`Loaded ${results.data.length} customers from CSV`)
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
              
              // Generate mock phone number if not present in CSV
              if (!customer.Phone || customer.Phone === '') {
                // Generate a consistent mock phone number based on Sr_No
                const seed = customer.Sr_No || 1
                const areaCode = 200 + ((seed * 7) % 800) // Area code between 200-999
                const exchange = 100 + ((seed * 13) % 900) // Exchange between 100-999
                const number = 1000 + ((seed * 17) % 9000) // Last 4 digits between 1000-9999
                customer.Phone = `+1-${areaCode}-${exchange}-${number}`
              }
              
              // Ensure percentages don't exceed 100%
              customer.Cloud_Optimization_Potential = Math.min(100, Math.max(0, customer.Cloud_Optimization_Potential || 0))
              customer.ELO_Optimization_Potential = Math.min(100, Math.max(0, customer.ELO_Optimization_Potential || 0))
              
              // Recalculate Total_Optimization_Potential as average of Cloud and ELO
              customer.Total_Optimization_Potential = (customer.Cloud_Optimization_Potential + customer.ELO_Optimization_Potential) / 2
              
              // Ensure Total_Optimization_Potential also doesn't exceed 100%
              customer.Total_Optimization_Potential = Math.min(100, Math.max(0, customer.Total_Optimization_Potential))
              
              return customer as Customer
            })
            console.log(`Processed ${customers.length} customers`)
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

  // Region filter (using normalized region names)
  if (filters.regions.length > 0) {
    filtered = filtered.filter(c => {
      const match = c.Geographical_Presence.match(/operates across (.+)$/i)
      const customerRegion = match ? normalizeRegionName(match[1].trim()) : null
      return customerRegion && filters.regions.includes(customerRegion)
    })
  }

  // Optimization type filter
  if (filters.optTypes.length > 0) {
    filtered = filtered.filter(c => filters.optTypes.includes(c.Optimization_Type))
  }

  // License ecosystem filter (using normalized names)
  if (filters.licenses.length > 0) {
    filtered = filtered.filter(c => {
      const customerLicenses = c.License_Ecosystem.split(',').map(lic => normalizeLicenseName(lic))
      return filters.licenses.some(filterLicense => 
        customerLicenses.includes(normalizeLicenseName(filterLicense))
      )
    })
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
  
  // Return only the 5 standard regions: NORTHEAST, SOUTHEAST, MIDWEST, SOUTHWEST, WEST
  // Always show all 5 regions in the dropdown, regardless of data availability
  const regions = ['NORTHEAST', 'SOUTHEAST', 'MIDWEST', 'SOUTHWEST', 'WEST']

  // Extract licenses from License_Ecosystem and normalize them
  const allLicenses = new Set<string>()
  customers.forEach(c => {
    c.License_Ecosystem.split(',').forEach(lic => {
      const normalized = normalizeLicenseName(lic)
      if (normalized) allLicenses.add(normalized)
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

