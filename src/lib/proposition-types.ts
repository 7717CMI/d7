// Proposition 1 - Standard
export interface Proposition1 {
  S_No: number
  Customer_Retailer_Name: string
  Parent_Group_Brand: string
  Company_Type: string
  Region_Country_Presence: string
  Business_Overview: string
  Product_Offering_Business_Segments: string
  Industry_Vertical: string
  Cloud_Platforms_Used: string
  Trigger_Event_Recent_Activity: string
  Employee_Count_Band: string
  Key_Contact_Person: string
  Designation_Role: string
  Email_Address: string
  Phone_WhatsApp_Number: string
  LinkedIn_Profile: string
  Website_URL: string
  Primary_Motivation_FinOps_Adoption: string
  Upcoming_Triggers_Initiatives: string
  License_Ecosystem: string
  Estimated_Optimization_Potential: number
  Cost_Sensitivity_Budget_Risk_Level: string
}

// Proposition 2 - Advance (includes Purchasing Behaviour, Solution Requirements, and CMI Insights)
export interface Proposition2 extends Proposition1 {
  Decision_Makers: string
  Optimization_Type: string
  Procurement_Model: string
  Budget_Approach_Tier: string
  Preferred_Solution_Type: string
  Preferred_Model_Type: string
  Preferred_Technology: string
  Integration_Requirements: string
  Deployment_Timeline: string
  Key_Success_Metrics: string
  Budget_Allocation: string
  Customer_Benchmarking_Summary: string
  Additional_Comments_Notes: string
}

// Proposition 3 - Premium (extends Proposition2 with additional detailed fields)
export interface Proposition3 extends Omit<Proposition2, 'Deployment_Timeline' | 'Additional_Comments_Notes'> {
  Deployment_Intensity_Timeline: string
  Service_Expectations: string
  Other_Constraints: string
  Additional_Comments_Notes_CMI_Team: string
}

