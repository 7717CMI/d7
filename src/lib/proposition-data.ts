import { Proposition1, Proposition2, Proposition3 } from './proposition-types'

// Helper function to get random item from array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Helper function to get random number in range
function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to generate random string
function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// Sample data arrays
const companyTypes = ['Public', 'Private', 'Government', 'Non-profit', 'Subsidiary', 'JV']
const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa']
const industries = ['Retail', 'Manufacturing', 'Healthcare', 'Financial Services', 'Technology', 'Energy', 'Telecommunications', 'Transportation']
const cloudPlatforms = ['Azure', 'AWS', 'GCP', 'Multi-cloud', 'Azure + AWS', 'AWS + GCP']
const employeeBands = ['1-100', '101-500', '501-1000', '1001-5000', '5001-10000', '10000+']
const designations = ['CIO', 'CTO', 'CFO', 'VP of IT', 'Director of Cloud', 'Head of FinOps', 'IT Procurement Manager', 'Cloud Architect']
const motivations = [
  'Reduce cloud overspend',
  'Improve unit economics',
  'Increase visibility/chargeback',
  'Optimize license costs',
  'Better budget forecasting',
  'Compliance and governance'
]
const triggers = [
  'New cloud migration wave',
  'Data center exit',
  'SAP/Oracle/SaaS modernization',
  'FinOps team formation',
  'Cost optimization initiative',
  'License audit'
]
const licenseEcosystems = ['Microsoft', 'Oracle', 'IBM', 'SAP', 'MS + Oracle', 'MS + SAP', 'Oracle + IBM']
const costSensitivity = ['High - Volatile cloud bill', 'Medium - Margin pressure', 'Low - Stable operations', 'High - Recent layoffs']
const decisionMakers = ['CIO/CTO', 'Head Store Ops', 'Digital', 'VP', 'Procurement', 'CFO', 'CEO']
const optimizationTypes = ['Cloud', 'ELO', 'Both Cloud + ELO']
const procurementModels = ['Direct buy', 'Lease', 'SaaS', 'Managed service', 'via POS integrator']
const budgetTiers = ['Capex/Opex/Hybrid; Enterprise/Mid/Premium', 'Capex/Enterprise', 'Opex/Mid', 'Hybrid/Premium']
const solutionTypes = [
  'Cloud FinOps / SaaS / ELO',
  'Both Cloud + ELO',
  'Financial governance',
  'Chargeback/showback',
  'Unit economics'
]
const modelTypes = [
  'SaaS [native]',
  'Hybrid [tool + service]',
  'Managed service only',
  'Marketplace subscription'
]
const technologies = [
  'Multi-cloud visibility',
  'AWS cost optimization',
  'Reserve Instance planning',
  'Rightsizing & Automated policy enforcement',
  'Tagging & remediation',
  'License usage discovery [SAP/Oracle/MS/IBM]'
]
const integrationRequirements = [
  'Cloud APIs [AWS, Azure, GCP, IBM]',
  'ServiceNow, Jira',
  'Finance systems [SAP, Oracle ERP, NetSuite]',
  'Monitoring tools [Datadog, Dynatrace, New Relic]',
  'CMDB integration',
  'existing FinOps tools'
]
const deploymentTimelines = [
  'Quick announcement [2-4 weeks]',
  'Pilot [6-12 weeks]',
  'Full scale rollout [3-12 months]',
  'Cloud CoE-led phased rollout'
]
const serviceExpectations = [
  'Implementation',
  'Ongoing cloud monitoring',
  'Rightsizing analysis',
  'ELO license usage mapping',
  'Billing anomaly alerts',
  'Monthly FinOps reporting',
  'Cloud governance models',
  'Training for FinOps maturity levels'
]
const constraints = [
  'Data residency, PCI',
  'Security compliance [GDPR, HIPAA, ISO27001]',
  'Vendor lock-in concerns',
  'Audit - Microsoft/Oracle/SAP/IBM complexity [multi-AD/fragmented]'
]

// Generate dummy data for Proposition 1
export function generateProposition1Data(count: number = 15): Proposition1[] {
  const data: Proposition1[] = []
  
  for (let i = 1; i <= count; i++) {
    const companyName = `Customer ${i}`
    data.push({
      S_No: i,
      Customer_Retailer_Name: companyName,
      Parent_Group_Brand: `${companyName} Group`,
      Company_Type: randomItem(companyTypes),
      Region_Country_Presence: randomItem(regions),
      Business_Overview: `Leading ${randomItem(industries).toLowerCase()} company providing innovative solutions across multiple markets.`,
      Product_Offering_Business_Segments: `${randomItem(industries)} solutions, Consulting, Managed Services`,
      Industry_Vertical: randomItem(industries),
      Cloud_Platforms_Used: randomItem(cloudPlatforms),
      Trigger_Event_Recent_Activity: randomItem(triggers),
      Employee_Count_Band: randomItem(employeeBands),
      Key_Contact_Person: `John ${randomString(6)}`,
      Designation_Role: randomItem(designations),
      Email_Address: `contact${i}@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      Phone_WhatsApp_Number: `+1-${randomNumber(200, 999)}-${randomNumber(200, 999)}-${randomNumber(1000, 9999)}`,
      LinkedIn_Profile: `linkedin.com/in/contact${i}`,
      Website_URL: `www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      Primary_Motivation_FinOps_Adoption: randomItem(motivations),
      Upcoming_Triggers_Initiatives: randomItem(triggers),
      License_Ecosystem: randomItem(licenseEcosystems),
      Estimated_Optimization_Potential: randomNumber(15, 45),
      Cost_Sensitivity_Budget_Risk_Level: randomItem(costSensitivity),
    })
  }
  
  return data
}

// Generate dummy data for Proposition 2
export function generateProposition2Data(count: number = 15): Proposition2[] {
  const prop1Data = generateProposition1Data(count)
  
  const deploymentTimelines2 = [
    'Quick Assessment [2-4 weeks]',
    'Pilot [<3 months]',
    'Full Rollout [3-6 months]',
    'Phased Rollout [6-12 months]'
  ]
  
  const keySuccessMetrics = [
    'Cost savings',
    'Spend visibility',
    'Compliance',
    'Efficiency gains',
    'Resource utilization',
    'Forecast accuracy'
  ]
  
  const budgetAllocations = ['Capex', 'Opex', 'Hybrid']
  
  return prop1Data.map(item => ({
    ...item,
    Decision_Makers: randomItem(decisionMakers),
    Optimization_Type: randomItem(optimizationTypes),
    Procurement_Model: randomItem(procurementModels),
    Budget_Approach_Tier: randomItem(budgetTiers),
    Preferred_Solution_Type: randomItem(solutionTypes),
    Preferred_Model_Type: randomItem(modelTypes),
    Preferred_Technology: randomItem(technologies),
    Integration_Requirements: randomItem(integrationRequirements),
    Deployment_Timeline: randomItem(deploymentTimelines2),
    Key_Success_Metrics: randomItem(keySuccessMetrics),
    Budget_Allocation: randomItem(budgetAllocations),
    Customer_Benchmarking_Summary: `Potential Customers/Peer Group: ${randomNumber(3, 8)} similar companies in ${randomItem(industries)} industry`,
    Additional_Comments_Notes: `High priority lead. Follow up scheduled for next quarter.`,
  }))
}

// Generate dummy data for Proposition 3
export function generateProposition3Data(count: number = 15): Proposition3[] {
  const prop2Data = generateProposition2Data(count)
  
  return prop2Data.map(item => {
    const { Deployment_Timeline, Additional_Comments_Notes, ...rest } = item
    return {
      ...rest,
      Deployment_Intensity_Timeline: randomItem(deploymentTimelines),
      Service_Expectations: randomItem(serviceExpectations),
      Other_Constraints: randomItem(constraints),
      Additional_Comments_Notes_CMI_Team: `High priority lead. Follow up scheduled for next quarter. Strong interest in FinOps optimization.`,
    }
  })
}

