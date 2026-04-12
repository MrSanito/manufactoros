import { useState } from "react";
import {
  RiAlertLine, RiMoneyDollarCircleLine, RiTimeLine, RiUserLine,
  RiTruckLine, RiBuildingLine, RiFlashlightLine, RiSeedlingLine,
  RiCheckboxCircleLine, RiCloseCircleLine, RiArrowRightLine,
  RiPhoneLine, RiArchiveLine, RiShieldLine, RiGroupLine,
  RiExchangeLine, RiToolsLine, RiBankCardLine, RiBarChartLine,
  RiCalendarCloseLine, RiErrorWarningLine, RiPriceTag3Line,
  RiDropLine, RiThumbDownLine, RiInformationLine, RiFireLine,
  RiArrowUpLine, RiArrowDownLine, RiSearchLine, RiCloseLine,
  RiEyeLine, RiEyeOffLine, RiRepeatLine
} from "react-icons/ri";

/* ── DATA ─────────────────────────────────────────────────────────────────── */
const ALERT_DATA = [
  { id:"ALT-001",category:"Production",severity:"HIGH",status:"active",icon:RiToolsLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Machine breakdown — Stitching Unit 3",desc:"Main stitching machine offline since 10:30 AM. 3 orders stalled.",impact:"₹3.8L shipment at risk",impactColor:"text-red-600",order:"ORD-2402",client:"StyleCraft",time:"Apr 1 · 10:30 AM",action:"Assign",actionStyle:"bg-green-500 hover:bg-green-600 text-white",delay:"2 days",tags:["Machine","Production"]},
  { id:"ALT-002",category:"Production",severity:"MEDIUM",status:"active",icon:RiGroupLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Labour absentees — 4 workers missing",desc:"4 of 12 stitching workers absent today. Production at 65% capacity.",impact:"₹1.4L daily output loss",impactColor:"text-yellow-600",order:"ORD-2403",client:"Fashion Hub",time:"Apr 1 · 08:00 AM",action:"Reassign",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:"1 day",tags:["Labour","Capacity"]},
  { id:"ALT-003",category:"Production",severity:"HIGH",status:"active",icon:RiFireLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Priority order ORD-2405 behind schedule by 3 days",desc:"Client StyleCraft has a hard deadline Apr 4. Current pace misses it.",impact:"₹2.1L penalty clause risk",impactColor:"text-red-600",order:"ORD-2405",client:"StyleCraft",time:"Apr 1 · 09:00 AM",action:"Expedite",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:"3 days",tags:["Priority","Deadline"]},
  { id:"ALT-004",category:"Production",severity:"LOW",status:"watching",icon:RiRepeatLine,iconBg:"bg-blue-100",iconColor:"text-blue-600",title:"Overtime exceeding 12 hrs/week for 6 workers",desc:"6 employees worked 14+ hrs overtime. Morale risk and error rate rising.",impact:"↑ defect rate 3.1% this week",impactColor:"text-blue-600",order:"ORD-2401",client:"Urban Threads",time:"Apr 1 · 06:00 PM",action:"Review",actionStyle:"bg-blue-500 hover:bg-blue-600 text-white",delay:null,tags:["Labour","Wellbeing"]},
  { id:"ALT-005",category:"Production",severity:"MEDIUM",status:"active",icon:RiArchiveLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"QC rejected batch — 12 defective units in ORD-2406",desc:"2.8% defect rate detected in stitching batch. Rework required before dispatch.",impact:"₹38K rework cost",impactColor:"text-yellow-600",order:"ORD-2406",client:"Modern Apparel",time:"Mar 31 · 11:00 AM",action:"Assign QC",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Quality","Rework"]},
  { id:"ALT-006",category:"Payment",severity:"HIGH",status:"active",icon:RiMoneyDollarCircleLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Client payment overdue — ORD-2404 (7 days)",desc:"Payment installment of ₹2.3L overdue by 7 days. Production start delayed.",impact:"₹2.3L pending · Cash flow blocked",impactColor:"text-red-600",order:"ORD-2404",client:"Cash Trivete",time:"Mar 31 · 08:00 AM",action:"Remind",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:"7 days",tags:["Finance","Receivable"]},
  { id:"ALT-007",category:"Payment",severity:"HIGH",status:"active",icon:RiBankCardLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Pending vendor payment blocking dispatch — Kapoor Fabrics",desc:"₹78K outstanding. Vendor has held 3 fabric rolls pending clearance.",impact:"₹1.9L orders stalled",impactColor:"text-red-600",order:"ORD-2407",client:"Kapoor Fabrics (Vendor)",time:"Apr 1 · 09:15 AM",action:"Pay Now",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Vendor","Finance"]},
  { id:"ALT-008",category:"Payment",severity:"MEDIUM",status:"active",icon:RiExchangeLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Client delayed payment pushed production start by 4 days",desc:"Fashion Hub's advance not received. ORD-2408 production start pushed to Apr 6.",impact:"₹1.2L in downstream delays",impactColor:"text-yellow-600",order:"ORD-2408",client:"Fashion Hub",time:"Apr 1 · 10:00 AM",action:"Follow Up",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:"4 days",tags:["Client","Finance"]},
  { id:"ALT-009",category:"Payment",severity:"LOW",status:"watching",icon:RiTimeLine,iconBg:"bg-blue-100",iconColor:"text-blue-600",title:"Finishing stage minor delay — payment milestone impacted",desc:"ORD-2401 finishing delayed 6 hrs. 2nd client payment milestone may shift.",impact:"₹90K milestone at risk",impactColor:"text-blue-600",order:"ORD-2401",client:"Tranct",time:"Mar 31 · 09:15 AM",action:"Remind",actionStyle:"bg-blue-400 hover:bg-blue-500 text-white",delay:"6 hrs",tags:["Finance","Milestone"]},
  { id:"ALT-010",category:"Payment",severity:"HIGH",status:"active",icon:RiCalendarCloseLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Electricity bill unpaid — risk of power cut",desc:"MSEDCL bill of ₹42K overdue by 12 days. Notice received. Facility at risk.",impact:"Full factory shutdown if cut",impactColor:"text-red-700",order:"—",client:"Facility",time:"Apr 1 · 08:00 AM",action:"Pay Now",actionStyle:"bg-red-600 hover:bg-red-700 text-white",delay:"12 days overdue",tags:["Utility","Risk"]},
  { id:"ALT-011",category:"Vendor",severity:"HIGH",status:"active",icon:RiTruckLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Vendor delivery delayed — Sharma Threads (5 days late)",desc:"Thread stock ETA was Mar 28. Now Apr 4 at earliest. 2 orders at risk.",impact:"₹2.6L orders blocked",impactColor:"text-red-600",order:"ORD-2402",client:"Sharma Threads",time:"Apr 1 · 11:00 AM",action:"Call Vendor",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:"5 days",tags:["Vendor","Supply"]},
  { id:"ALT-012",category:"Vendor",severity:"MEDIUM",status:"active",icon:RiShieldLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Vendor quality mismatch — fabric GSM 20% lower than spec",desc:"Kapoor Fabrics delivered 180gsm when 220gsm ordered. Affects 3 orders.",impact:"₹1.1L rework or return",impactColor:"text-yellow-600",order:"ORD-2409",client:"Kapoor Fabrics",time:"Mar 31 · 02:00 PM",action:"Raise Dispute",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Quality","Vendor"]},
  { id:"ALT-013",category:"Inventory",severity:"HIGH",status:"active",icon:RiArchiveLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Critical inventory — Thread stock < 2 days",desc:"Only 18kg thread remaining. Current consumption: 9kg/day. 2 orders will halt.",impact:"Production halt in 2 days",impactColor:"text-red-600",order:"ORD-2402",client:"Internal",time:"Apr 1 · 08:00 AM",action:"Restock",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Inventory","Critical"]},
  { id:"ALT-014",category:"Inventory",severity:"MEDIUM",status:"active",icon:RiDropLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Button stock at 30% — reorder needed",desc:"Button inventory at 1,200 units. Min threshold: 1,000. 2 orders need 800 units.",impact:"Avoid production delay",impactColor:"text-yellow-600",order:"ORD-2410",client:"Internal",time:"Apr 1 · 09:00 AM",action:"Reorder",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Inventory"]},
  { id:"ALT-015",category:"Inventory",severity:"LOW",status:"watching",icon:RiPriceTag3Line,iconBg:"bg-blue-100",iconColor:"text-blue-600",title:"Zipper variant SKU-ZP-08 out of stock",desc:"Zipper SKU-ZP-08 depleted. ORD-2411 requires 200 units by Apr 8.",impact:"₹45K order at risk",impactColor:"text-blue-600",order:"ORD-2411",client:"Internal",time:"Mar 31 · 04:00 PM",action:"Source Alt",actionStyle:"bg-blue-400 hover:bg-blue-500 text-white",delay:null,tags:["Inventory","SKU"]},
  { id:"ALT-016",category:"Client",severity:"HIGH",status:"active",icon:RiUserLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Client delayed ORD-2412 by 18 days — extreme delay",desc:"StyleCraft postponed approval by 18 days. Production slot is now wasted.",impact:"₹4.2L slot wasted + ₹60K idle cost",impactColor:"text-red-600",order:"ORD-2412",client:"StyleCraft",time:"Mar 28 · 02:00 PM",action:"Escalate",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:"18 days",tags:["Client","Slot Loss"]},
  { id:"ALT-017",category:"Client",severity:"HIGH",status:"active",icon:RiSeedlingLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"No new clients in 45 days — stagnant pipeline",desc:"Last new client onboarded: Feb 16, 2026. Revenue growth is flat.",impact:"Growth risk · ₹8L+ quarterly gap",impactColor:"text-red-600",order:"—",client:"Business",time:"Apr 1, 2026",action:"Review Strategy",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Growth","Business"]},
  { id:"ALT-018",category:"Client",severity:"MEDIUM",status:"watching",icon:RiThumbDownLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Negative client feedback on ORD-2403 — delivery quality",desc:"Fashion Hub rated delivery 2/5. Cited late delivery and minor stitching issues.",impact:"Repeat order at risk (₹3.2L/yr)",impactColor:"text-yellow-600",order:"ORD-2403",client:"Fashion Hub",time:"Mar 30 · 03:00 PM",action:"Resolve",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Client","Reputation"]},
  { id:"ALT-019",category:"Client",severity:"LOW",status:"resolved",icon:RiPhoneLine,iconBg:"bg-green-100",iconColor:"text-green-600",title:"Client Urban Threads unresponsive for 7 days",desc:"No response to 3 follow-ups on ORD-2413 design approval.",impact:"Production slot at risk",impactColor:"text-green-600",order:"ORD-2413",client:"Urban Threads",time:"Mar 25 · 11:00 AM",action:"Resolved",actionStyle:"bg-green-500 text-white",delay:null,tags:["Client","Communication"]},
  { id:"ALT-020",category:"Financial Risk",severity:"HIGH",status:"active",icon:RiBarChartLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Cash blocked in 6 incomplete orders — ₹9.4L stuck",desc:"Orders at 60-80% completion with invoices not raised.",impact:"₹9.4L working capital blocked",impactColor:"text-red-600",order:"Multiple",client:"Various",time:"Apr 1, 2026",action:"Review WC",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Finance","WC"]},
  { id:"ALT-021",category:"Financial Risk",severity:"HIGH",status:"active",icon:RiMoneyDollarCircleLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Cumulative delay losses this month — ₹5.7L",desc:"Delays across 8 orders have incurred idle costs and penalty clauses.",impact:"₹5.7L lost to delays this month",impactColor:"text-red-600",order:"Multiple",client:"Various",time:"Apr 1, 2026",action:"View Report",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Finance","Losses"]},
  { id:"ALT-022",category:"Financial Risk",severity:"MEDIUM",status:"active",icon:RiExchangeLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Gross margin eroded by 12% — material cost spike",desc:"Fabric prices up 18%. Orders priced 3 months ago now running on thin margins.",impact:"₹1.8L margin erosion this quarter",impactColor:"text-yellow-600",order:"—",client:"Cross-order",time:"Apr 1, 2026",action:"Reprice",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Finance","Margin"]},
  { id:"ALT-023",category:"Compliance",severity:"HIGH",status:"active",icon:RiFlashlightLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"ESI/PF returns overdue — penalty accruing",desc:"March ESI & PF returns not filed. ₹12K penalty per day from Apr 5.",impact:"₹36K penalty so far",impactColor:"text-red-600",order:"—",client:"HR/Finance",time:"Apr 1, 2026",action:"File Now",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Compliance","HR"]},
  { id:"ALT-024",category:"Compliance",severity:"MEDIUM",status:"watching",icon:RiBuildingLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Factory safety audit due in 8 days",desc:"Annual safety compliance audit scheduled Apr 9. Fire extinguisher records outdated.",impact:"Operational license at risk",impactColor:"text-yellow-600",order:"—",client:"Facility",time:"Apr 1, 2026",action:"Prepare",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Compliance","Safety"]},
  { id:"ALT-025",category:"Compliance",severity:"LOW",status:"watching",icon:RiInformationLine,iconBg:"bg-blue-100",iconColor:"text-blue-600",title:"Worker skill certifications expired for 3 employees",desc:"3 stitching operators' NSDC certifications lapsed. Client audits may flag this.",impact:"Audit compliance risk",impactColor:"text-blue-600",order:"—",client:"HR",time:"Mar 30, 2026",action:"Schedule",actionStyle:"bg-blue-400 hover:bg-blue-500 text-white",delay:null,tags:["Compliance","HR"]},
  { id:"ALT-026",category:"Business Health",severity:"HIGH",status:"active",icon:RiThumbDownLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"3 repeat clients not reordered in 90 days",desc:"Textile Masters, City Fashion, ElegantWear — all silent for 90+ days.",impact:"₹12L annual revenue at risk",impactColor:"text-red-600",order:"—",client:"Multiple",time:"Apr 1, 2026",action:"Reconnect",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Growth","Retention"]},
  { id:"ALT-027",category:"Business Health",severity:"MEDIUM",status:"watching",icon:RiCloseCircleLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Client satisfaction score dropped to 3.2/5 this quarter",desc:"Avg CSAT down from 4.1 in Q4 2025. Driven by delays and communication issues.",impact:"Referral loss risk",impactColor:"text-yellow-600",order:"—",client:"Business-wide",time:"Apr 1, 2026",action:"Review",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Reputation","CSAT"]},
  { id:"ALT-028",category:"Business Health",severity:"MEDIUM",status:"active",icon:RiErrorWarningLine,iconBg:"bg-yellow-100",iconColor:"text-yellow-600",title:"Order rejection rate up 4.2% — quality systemic issue",desc:"April rejection rate at 6.8% vs. 2.6% benchmark.",impact:"₹2.4L in rework + client trust",impactColor:"text-yellow-600",order:"Multiple",client:"QC Team",time:"Apr 1, 2026",action:"Investigate",actionStyle:"bg-yellow-500 hover:bg-yellow-600 text-white",delay:null,tags:["Quality","Business"]},
  { id:"ALT-029",category:"Business Health",severity:"LOW",status:"watching",icon:RiBarChartLine,iconBg:"bg-blue-100",iconColor:"text-blue-600",title:"Capacity utilisation below 60% for 2nd week",desc:"Factory running at 58% capacity. Fixed costs being absorbed by fewer orders.",impact:"₹80K idle cost/week",impactColor:"text-blue-600",order:"—",client:"Operations",time:"Apr 1, 2026",action:"Action Plan",actionStyle:"bg-blue-400 hover:bg-blue-500 text-white",delay:null,tags:["Operations","Efficiency"]},
  { id:"ALT-030",category:"Business Health",severity:"HIGH",status:"active",icon:RiArrowDownLine,iconBg:"bg-red-100",iconColor:"text-red-600",title:"Net profit margin collapsed to 4.1% (was 14.2% last quarter)",desc:"Combination of delays, rework, idle costs, and material price hike eroding margins.",impact:"Business viability risk if trend continues",impactColor:"text-red-600",order:"—",client:"Finance",time:"Apr 1, 2026",action:"Full Review",actionStyle:"bg-red-500 hover:bg-red-600 text-white",delay:null,tags:["Finance","Critical"]},
];

const AI_PRIORITY_ACTIONS = [
  { icon: RiToolsLine,            iconColor: "text-red-500",    bg: "bg-red-100",    title: "Reassign stitching work for ORD-2402",              sub: "Impact: ₹3.8L delay · Production",         action: "Fix",      style: "bg-green-500 hover:bg-green-600 text-white" },
  { icon: RiMoneyDollarCircleLine,iconColor: "text-blue-500",   bg: "bg-blue-100",   title: "Follow up on overdue payment for ORD-2404",         sub: "Impact: ₹2.3L due · 7 days overdue",       action: "Remind",   style: "bg-gray-100 hover:bg-gray-200 text-gray-800" },
  { icon: RiArchiveLine,          iconColor: "text-yellow-500", bg: "bg-yellow-100", title: "Restock critical thread inventory immediately",      sub: "Impact: Production halt in 2 days",         action: "Restock",  style: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  { icon: RiFlashlightLine,       iconColor: "text-red-500",    bg: "bg-red-100",    title: "Pay electricity bill to prevent factory shutdown",   sub: "Impact: Full facility shutdown · 12 days",  action: "Pay Now",  style: "bg-red-500 hover:bg-red-600 text-white" },
  { icon: RiTruckLine,            iconColor: "text-yellow-600", bg: "bg-yellow-100", title: "Call Sharma Threads — delivery 5 days overdue",     sub: "Impact: ₹2.6L orders blocked · Vendor",     action: "Call",     style: "bg-gray-100 hover:bg-gray-200 text-gray-800" },
];

const CATEGORIES = ["All","Production","Payment","Vendor","Inventory","Client","Financial Risk","Compliance","Business Health"];

const SEV_STYLE = {
  HIGH:   "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW:    "bg-blue-100 text-blue-600",
};

const CAT_ICONS = {
  Production: RiToolsLine, Payment: RiMoneyDollarCircleLine, Vendor: RiTruckLine,
  Inventory: RiArchiveLine, Client: RiUserLine, "Financial Risk": RiBarChartLine,
  Compliance: RiShieldLine, "Business Health": RiBuildingLine,
};

/* ── ALERT CARD ─────────────────────────────────────────────────────────────── */
function AlertCard({ alert, onIgnore }) {
  const Icon = alert.icon;
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow ${alert.status === "resolved" ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${alert.iconBg}`}>
          <Icon className={`w-4 h-4 ${alert.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${SEV_STYLE[alert.severity]}`}>{alert.severity}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${alert.status === "active" ? "bg-green-100 text-green-600" : alert.status === "resolved" ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-600"}`}>
              {alert.status}
            </span>
            {alert.delay && (
              <span className="text-xs font-medium bg-red-100 text-red-500 px-2 py-0.5 rounded flex items-center gap-1">
                <RiTimeLine className="shrink-0" />{alert.delay}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-gray-800 leading-snug">{alert.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{alert.desc}</p>
        </div>
      </div>

      {/* IMPACT */}
      <div className={`text-xs font-semibold ${alert.impactColor} bg-gray-50 rounded px-3 py-1.5 flex items-center gap-1.5 border border-gray-100`}>
        <RiAlertLine className="shrink-0 text-gray-400" /> Impact: {alert.impact}
      </div>

      {/* META + ACTIONS */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-gray-400">
          <span className="font-medium text-gray-600">{alert.order}</span> · {alert.client} · {alert.time}
        </p>
        <div className="flex items-center gap-2">
          {alert.status !== "resolved" && (
            <button onClick={() => onIgnore(alert.id)} className="text-xs text-gray-400 hover:text-gray-600 font-medium">
              Ignore
            </button>
          )}
          <button className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${alert.actionStyle}`}>
            {alert.action}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────────────────── */
export default function Alerts() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [statusFilter,   setStatusFilter]   = useState("All Status");
  const [query,          setQuery]           = useState("");
  const [ignoredIds,     setIgnoredIds]      = useState([]);
  const [showAI,         setShowAI]          = useState(true);
  const [showResolved,   setShowResolved]    = useState(false);

  const handleIgnore = id => setIgnoredIds(prev => [...prev, id]);

  const filtered = ALERT_DATA.filter(a => {
    if (ignoredIds.includes(a.id)) return false;
    if (!showResolved && a.status === "resolved") return false;
    if (categoryFilter !== "All" && a.category !== categoryFilter) return false;
    if (severityFilter !== "All Severity" && a.severity !== severityFilter) return false;
    if (statusFilter   !== "All Status"   && a.status   !== statusFilter)   return false;
    if (query) {
      const q = query.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.order.toLowerCase().includes(q) ||
             a.client.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter(a => a.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const highCount = ALERT_DATA.filter(a => a.severity === "HIGH").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Alerts & Issues</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Critical Issues",   value:`₹8.4L`,  sub:`${highCount} HIGH alerts`,       color:"text-red-600",    bg:"bg-red-100",    icon:RiAlertLine            },
          { label:"Orders at Risk",    value:"₹5.7L",  sub:"8 orders impacted",              color:"text-yellow-600", bg:"bg-yellow-100", icon:RiTimeLine             },
          { label:"Cash Blocked",      value:"₹9.4L",  sub:"WC severely constrained",        color:"text-red-600",    bg:"bg-red-100",    icon:RiMoneyDollarCircleLine },
          { label:"Net Margin",        value:"4.1%",   sub:"Was 14.2% last quarter",         color:"text-gray-800",   bg:"bg-gray-100",   icon:RiArrowDownLine        },
        ].map(k => (
          <div key={k.label} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <div className="flex items-center justify-between">
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
              <div className={`w-8 h-8 rounded flex items-center justify-center ${k.bg}`}>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center border rounded-lg px-4 py-2 bg-white gap-2">
          <RiSearchLine className="text-gray-400 shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search alerts, orders, clients..."
            className="outline-none w-full bg-transparent text-sm" />
          {query && <button onClick={() => setQuery("")}><RiCloseLine className="text-gray-400 w-4 h-4" /></button>}
        </div>
        <div className="flex gap-3">
          <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            {["All Severity","HIGH","MEDIUM","LOW"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            {["All Status","active","watching","resolved"].map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={() => setShowResolved(!showResolved)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border transition-colors ${showResolved ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
            {showResolved ? <RiEyeOffLine /> : <RiEyeLine />}{showResolved ? "Hide Resolved" : "Show Resolved"}
          </button>
        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${categoryFilter === cat ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
            {cat}{cat !== "All" && <span className="ml-1 opacity-50">({ALERT_DATA.filter(a => a.category === cat).length})</span>}
          </button>
        ))}
      </div>

      {/* AI PRIORITY ACTIONS */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
        <button onClick={() => setShowAI(!showAI)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center">
              <RiFlashlightLine className="text-green-400 w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">AI Priority Actions</p>
              <p className="text-xs text-gray-400">Suggested fixes to prevent risks and recover losses</p>
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded font-semibold">{AI_PRIORITY_ACTIONS.length} URGENT</span>
          </div>
          <RiArrowRightLine className={`text-gray-400 transition-transform ${showAI ? "rotate-90" : ""}`} />
        </button>
        {showAI && (
          <div className="divide-y divide-gray-50 border-t border-gray-100">
            {AI_PRIORITY_ACTIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.bg}`}>
                    <Icon className={`w-4 h-4 ${a.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.sub}</p>
                  </div>
                  <button className={`px-4 py-1.5 rounded text-xs font-semibold shrink-0 transition-colors ${a.style}`}>{a.action}</button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* IMPACT BANNER */}
      <div className="bg-gray-800 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <RiBarChartLine className="text-red-400 w-4 h-4" />
          <p className="font-semibold text-white text-sm">What an Unmanaged Factory Costs You</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label:"Monthly Delay Losses", value:"₹5.7L",  sub:"Idle + penalty",    color:"text-red-400"    },
            { label:"Working Capital",       value:"₹9.4L",  sub:"Incomplete orders", color:"text-yellow-400" },
            { label:"Client Churn Risk",     value:"₹12L",   sub:"3 silent clients",  color:"text-red-400"    },
            { label:"Margin Collapse",       value:"−10.1%", sub:"Q4 → Q1 drop",      color:"text-yellow-400" },
          ].map(m => (
            <div key={m.label} className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-gray-400">{m.label}</p>
              <p className={`text-xl font-bold mt-1 ${m.color}`}>{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GROUPED ALERTS */}
      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <RiCheckboxCircleLine className="w-10 h-10 mx-auto mb-2 text-green-300" />
          <p className="font-semibold text-gray-600">No alerts match your filters</p>
          <p className="text-sm mt-1">Try adjusting the category, severity, or search query</p>
        </div>
      )}

      {Object.entries(grouped).map(([cat, alerts]) => {
        const CatIcon = CAT_ICONS[cat] || RiAlertLine;
        const highItems = alerts.filter(a => a.severity === "HIGH").length;
        return (
          <div key={cat} className="mb-6">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
              <CatIcon className="w-4 h-4 text-gray-500" />
              <h2 className="font-semibold text-sm text-gray-700">{cat}</h2>
              <span className="text-xs text-gray-400">{alerts.length} issue{alerts.length > 1 ? "s" : ""}</span>
              {highItems > 0 && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">{highItems} HIGH</span>
              )}
            </div>
            <div className="space-y-3">
              {alerts.map(alert => <AlertCard key={alert.id} alert={alert} onIgnore={handleIgnore} />)}
            </div>
          </div>
        );
      })}

      {/* BOTTOM CTA */}
      <div className="bg-gray-800 rounded-lg p-5 text-center mb-6">
        <RiArrowUpLine className="w-6 h-6 text-green-400 mx-auto mb-2" />
        <p className="font-semibold text-white">This is fixable — systematically.</p>
        <p className="text-sm text-gray-400 mt-1">Every alert above has a root cause, a fix, and a financial recovery.</p>
        <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-2 rounded-lg text-sm">
          Generate Full Recovery Plan
        </button>
      </div>
    </div>
  );
}