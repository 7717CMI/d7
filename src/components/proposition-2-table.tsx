import { Proposition2 } from '../lib/proposition-types'

interface Proposition2TableProps {
  data: Proposition2[]
  searchTerm: string
}

export function Proposition2Table({ data, searchTerm }: Proposition2TableProps) {
  const filteredData = searchTerm
    ? data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm" style={{ tableLayout: 'auto' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            {/* Main category headers */}
            <tr>
              <th rowSpan={2} className="p-3 border border-gray-400 bg-[#B0C4DE] text-gray-900 font-bold text-center align-middle" style={{ minWidth: '60px' }}>
                S.No.
              </th>
              <th colSpan={10} className="p-3 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-bold text-center">
                Customer Information
              </th>
              <th colSpan={6} className="p-3 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-bold text-center">
                Contact Details
              </th>
              <th colSpan={5} className="p-3 border border-gray-400 bg-[#E0F6FF] text-gray-900 font-bold text-center">
                Personal / Professional Drivers
              </th>
              <th colSpan={4} className="p-3 border border-gray-400 bg-[#F0FFF0] text-gray-900 font-bold text-center">
                Purchasing Behaviour
              </th>
              <th colSpan={7} className="p-3 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-bold text-center">
                Solution Requirements
              </th>
              <th colSpan={2} className="p-3 border border-gray-400 bg-[#E6E6FA] text-gray-900 font-bold text-center">
                CMI Insights
              </th>
            </tr>
            {/* Column headers */}
            <tr>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Customer / Retailer Name</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '120px', fontSize: '11px' }}>Parent Group / Brand</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '200px', fontSize: '11px' }}>Company Type (Public, Private, Government, Non-profit, Subsidiary, JV)</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Region / Country Presence</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '200px', fontSize: '11px' }}>Business Overview</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '200px', fontSize: '11px' }}>Product Offering / Business Segments</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '120px', fontSize: '11px' }}>Industry Vertical</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Cloud Platforms Used</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '200px', fontSize: '11px' }}>Trigger Event / Recent Activity</th>
              <th className="p-2 border border-gray-400 bg-[#FFF8DC] text-gray-900 font-semibold text-left" style={{ minWidth: '120px', fontSize: '11px' }}>Employee Count Band</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Key Contact Person</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-semibold text-left" style={{ minWidth: '250px', fontSize: '11px' }}>Designation / Role (Focus on roles directly relevant to FinOps, Licensing, Cloud, IT, and Procurement)</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-semibold text-left" style={{ minWidth: '180px', fontSize: '11px' }}>Email Address</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Phone / WhatsApp Number</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>LinkedIn Profile</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4E1] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Website URL</th>
              <th className="p-2 border border-gray-400 bg-[#E0F6FF] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Primary Motivation for FinOps Adoption (Reduce cloud overspend, Improve unit economics, Increase visibility/chargeback, etc.)</th>
              <th className="p-2 border border-gray-400 bg-[#E0F6FF] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Upcoming Triggers / Initiatives (New cloud migration wave, Data center exit, SAP/Oracle/SaaS modernization, FinOps team formation, etc.)</th>
              <th className="p-2 border border-gray-400 bg-[#E0F6FF] text-gray-900 font-semibold text-left" style={{ minWidth: '200px', fontSize: '11px' }}>License Ecosystem (MS/Oracle/IBM/SAP)</th>
              <th className="p-2 border border-gray-400 bg-[#E0F6FF] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Estimated Optimization Potential (%)</th>
              <th className="p-2 border border-gray-400 bg-[#E0F6FF] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Cost Sensitivity / Budget Risk Level (Volatile cloud bill, Margin pressure, Recent layoffs, etc.)</th>
              <th className="p-2 border border-gray-400 bg-[#F0FFF0] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Decision Makers (CIO/CTO, Head Store Ops, Digital, LP, Procurement, CFO, CEO)</th>
              <th className="p-2 border border-gray-400 bg-[#F0FFF0] text-gray-900 font-semibold text-left" style={{ minWidth: '150px', fontSize: '11px' }}>Optimization Type (Cloud / ELO)</th>
              <th className="p-2 border border-gray-400 bg-[#F0FFF0] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Procurement Model (Direct buy / Lease / SaaS / Managed service / via POS integrator)</th>
              <th className="p-2 border border-gray-400 bg-[#F0FFF0] text-gray-900 font-semibold text-left" style={{ minWidth: '250px', fontSize: '11px' }}>Budget Approach / Tier (Capex/Opex/Hybrid; Entry/Mid/Premium)</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '350px', fontSize: '11px' }}>Preferred Solution Type (Cloud FinOps / SaaS / ELO, Both Cloud + ELO, Financial governance, Chargeback/showback, Unit economics)</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Preferred Model Type (SaaS [native], Hybrid [tool + service], Managed service only, Marketplace subscription)</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '400px', fontSize: '11px' }}>Preferred Technology (Multi-cloud visibility, AWS cost optimization, Reserve Instance planning, Rightsizing & Automated policy enforcement, Tagging & remediation, License usage discovery [SAP/Oracle/MS/IBM])</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '400px', fontSize: '11px' }}>Integration Requirements (Cloud APIs [AWS, Azure, GCP], ITSM [ServiceNow, Jira], Finance systems [SAP, Oracle ERP, NetSuite], Monitoring tools [Datadog, Dynatrace, New Relic], CMDB integration, Existing FinOps tools)</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '350px', fontSize: '11px' }}>Deployment Timeline (Quick Assessment [2-4 weeks], Pilot [&lt;3 months], Full Rollout [3-6 months], Phased Rollout [6-12 months])</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '350px', fontSize: '11px' }}>Key Success Metrics (Cost savings, Spend visibility, Compliance, Efficiency gains, Resource utilization, Forecast accuracy)</th>
              <th className="p-2 border border-gray-400 bg-[#FFE4B5] text-gray-900 font-semibold text-left" style={{ minWidth: '200px', fontSize: '11px' }}>Budget Allocation (Capex, Opex, Hybrid)</th>
              <th className="p-2 border border-gray-400 bg-[#E6E6FA] text-gray-900 font-semibold text-left" style={{ minWidth: '300px', fontSize: '11px' }}>Customer Benchmarking Summary (Potential Customers/Peer Group: X similar companies in Y industry)</th>
              <th className="p-2 border border-gray-400 bg-[#E6E6FA] text-gray-900 font-semibold text-left" style={{ minWidth: '250px', fontSize: '11px' }}>Additional Comments / Notes (CMI Team)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.S_No} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2 border border-gray-300 text-center font-medium">{item.S_No}</td>
                <td className="p-2 border border-gray-300 font-medium text-gray-900">{item.Customer_Retailer_Name}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Parent_Group_Brand}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Company_Type}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Region_Country_Presence}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Business_Overview}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Product_Offering_Business_Segments}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Industry_Vertical}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Cloud_Platforms_Used}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Trigger_Event_Recent_Activity}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Employee_Count_Band}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Key_Contact_Person}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Designation_Role}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Email_Address}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Phone_WhatsApp_Number}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.LinkedIn_Profile}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Website_URL}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Primary_Motivation_FinOps_Adoption}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Upcoming_Triggers_Initiatives}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.License_Ecosystem}</td>
                <td className="p-2 border border-gray-300 text-center font-semibold text-gray-900">{item.Estimated_Optimization_Potential}%</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Cost_Sensitivity_Budget_Risk_Level}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Decision_Makers}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Optimization_Type}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Procurement_Model}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Budget_Approach_Tier}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Preferred_Solution_Type}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Preferred_Model_Type}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Preferred_Technology}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Integration_Requirements}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Deployment_Timeline}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Key_Success_Metrics}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Budget_Allocation}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Customer_Benchmarking_Summary}</td>
                <td className="p-2 border border-gray-300 text-gray-800">{item.Additional_Comments_Notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData.length === 0 && (
        <div className="p-4 text-center text-gray-500">No data found matching your search criteria.</div>
      )}
    </div>
  )
}
