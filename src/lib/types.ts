export interface Customer {
  Sr_No: number
  Customer_Name: string
  Overview: string
  Geographical_Presence: string
  Product_Offering: string
  Industry_Vertical: string
  Cloud_Platforms: string
  License_Ecosystem: string
  Optimization_Type: string
  Pain_Points: string
  Trigger_Event: string
  Key_Stakeholders: string
  Cloud_Optimization_Potential: number
  ELO_Optimization_Potential: number
  Total_Optimization_Potential: number
  Decision_Maker: string
  Phone: string
  Fax: string
  Email: string
  Website: string
  Annual_IT_Spend_M: number
  Current_Cloud_Spend_M: number
  Current_License_Spend_M: number
  Potential_Cloud_Savings_M: number
  Potential_License_Savings_M: number
  Total_Potential_Savings_M: number
  Number_of_Employees: number
  IT_Team_Size: number
  Number_of_VMs: number
  Physical_Servers: number
  Number_of_Databases: number
  Number_of_Applications: number
  Microsoft_Licenses: number
  SAP_Licenses: number
  Oracle_Licenses: number
  Azure_VMs: number
  Azure_Storage_TB: number
  Azure_Monthly_Spend_K: number
  AWS_EC2_Instances: number
  AWS_S3_Storage_TB: number
  AWS_Monthly_Spend_K: number
  GCP_VMs: number
  GCP_Storage_TB: number
  GCP_Monthly_Spend_K: number
  Implementation_Cost_K: number
  Monthly_Savings_K: number
  ROI_Payback_Months: number
  Last_Contact_Days_Ago: number
  Engagement_Score: number
}

export interface FilterState {
  industries: string[]
  clouds: string[]
  regions: string[]
  optTypes: string[]
  licenses: string[]
  optRange: [number, number]
}

export const COLORS = {
  primary: '#2563EB',      // Standard Blue
  secondary: '#1E40AF',     // Darker Blue
  success: '#10B981',       // Green
  warning: '#F59E0B',       // Orange
  danger: '#EF4444',        // Red
  info: '#3B82F6',          // Light Blue
  accent1: '#60A5FA',       // Light Blue
  accent2: '#93C5FD',       // Lighter Blue
  accent3: '#DBEAFE',       // Very Light Blue
  accent4: '#EFF6FF',       // Lightest Blue
  neutral: '#6B7280',       // Gray
  light: '#F9FAFB',         // Light Gray
  dark: '#111827',          // Dark Gray
  purple: '#8B5CF6',        // Purple
  pink: '#EC4899',          // Pink
  teal: '#14B8A6',          // Teal
  indigo: '#6366F1',        // Indigo
  cyan: '#06B6D4',          // Cyan
  emerald: '#10B981',       // Emerald
  amber: '#F59E0B',         // Amber
  rose: '#F43F5E',          // Rose
}

export const COLOR_SEQUENCE = [
  COLORS.primary,    // Blue
  COLORS.success,   // Green
  COLORS.warning,   // Orange
  COLORS.purple,    // Purple
  COLORS.pink,      // Pink
  COLORS.teal,      // Teal
  COLORS.indigo,    // Indigo
  COLORS.cyan,      // Cyan
  COLORS.danger,    // Red
  COLORS.info,      // Light Blue
  COLORS.accent1,   // Light Blue
  COLORS.accent2,   // Lighter Blue
  COLORS.secondary, // Darker Blue
  COLORS.neutral,   // Gray
  COLORS.rose,      // Rose
]

