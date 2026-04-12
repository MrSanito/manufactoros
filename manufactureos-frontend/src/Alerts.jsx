import { useState } from "react";
import {
  RiAlertLine, RiMoneyDollarCircleLine, RiTimeLine, RiUserLine,
  RiTruckLine, RiBuildingLine, RiFlashlightLine, RiSeedlingLine,
  RiCheckboxCircleLine, RiCloseCircleLine, RiArrowRightLine,
  RiPhoneLine, RiRefreshLine, RiArchiveLine, RiShieldLine,
  RiGroupLine, RiExchangeLine, RiToolsLine, RiBankCardLine,
  RiBarChartLine, RiCalendarCloseLine, RiErrorWarningLine,
  RiPriceTag3Line, RiDropLine, RiThumbDownLine, RiInformationLine,
  RiFireLine, RiArrowUpLine, RiArrowDownLine, RiSearchLine, RiCloseLine,
  RiFilter3Line, RiEyeLine, RiEyeOffLine, RiRepeatLine
} from "react-icons/ri";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const ALERT_DATA = [
  // ── PRODUCTION ──────────────────────────────────────────────────────────────
  {
    id: "ALT-001", category: "Production", severity: "HIGH", status: "active",
    icon: RiToolsLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "Machine breakdown — Stitching Unit 3",
    desc: "Main stitching machine offline since 10:30 AM. 3 orders stalled.",
    impact: "₹3.8L shipment at risk", impactColor: "text-red-600",
    order: "ORD-2402", client: "StyleCraft", time: "Apr 1, 2026 · 10:30 AM",
    action: "Assign", actionStyle: "bg-green-500 hover:bg-green-600 text-white",
    delay: "2 days",
    tags: ["Machine", "Production"],
  },
  {
    id: "ALT-002", category: "Production", severity: "MEDIUM", status: "active",
    icon: RiGroupLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Labour absentees — 4 workers missing",
    desc: "4 of 12 stitching workers absent today. Production at 65% capacity.",
    impact: "₹1.4L daily output loss", impactColor: "text-amber-600",
    order: "ORD-2403", client: "Fashion Hub", time: "Apr 1, 2026 · 08:00 AM",
    action: "Reassign", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: "1 day",
    tags: ["Labour", "Capacity"],
  },
  {
    id: "ALT-003", category: "Production", severity: "HIGH", status: "active",
    icon: RiFireLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "Priority order ORD-2405 behind schedule by 3 days",
    desc: "Client StyleCraft has a hard deadline Apr 4. Current pace misses it by 3 days.",
    impact: "₹2.1L penalty clause risk", impactColor: "text-red-600",
    order: "ORD-2405", client: "StyleCraft", time: "Apr 1, 2026 · 09:00 AM",
    action: "Expedite", actionStyle: "bg-red-500 hover:bg-red-600 text-white",
    delay: "3 days",
    tags: ["Priority", "Deadline"],
  },
  {
    id: "ALT-004", category: "Production", severity: "LOW", status: "watching",
    icon: RiRepeatLine, iconBg: "bg-blue-100", iconColor: "text-blue-600",
    title: "Overtime exceeding 12 hrs/week for 6 workers",
    desc: "6 employees worked 14+ hrs overtime this week. Morale risk and error rate rising.",
    impact: "↑ defect rate 3.1% this week", impactColor: "text-blue-600",
    order: "ORD-2401", client: "Urban Threads", time: "Apr 1, 2026 · 06:00 PM",
    action: "Review", actionStyle: "bg-blue-500 hover:bg-blue-600 text-white",
    delay: null,
    tags: ["Labour", "Wellbeing"],
  },
  {
    id: "ALT-005", category: "Production", severity: "MEDIUM", status: "active",
    icon: RiArchiveLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "QC rejected batch — 12 defective units in ORD-2406",
    desc: "2.8% defect rate detected in stitching batch. Rework required before dispatch.",
    impact: "₹38K rework cost", impactColor: "text-amber-600",
    order: "ORD-2406", client: "Modern Apparel", time: "Mar 31, 2026 · 11:00 AM",
    action: "Assign QC", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Quality", "Rework"],
  },

  // ── PAYMENT ──────────────────────────────────────────────────────────────────
  {
    id: "ALT-006", category: "Payment", severity: "HIGH", status: "active",
    icon: RiMoneyDollarCircleLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "Client payment overdue — ORD-2404 (7 days)",
    desc: "Payment installment of ₹2.3L overdue by 7 days. Production start delayed.",
    impact: "₹2.3L pending · Cash flow blocked", impactColor: "text-rose-600",
    order: "ORD-2404", client: "Cash Trivete", time: "Mar 31, 2026 · 08:00 AM",
    action: "Remind", actionStyle: "bg-rose-500 hover:bg-rose-600 text-white",
    delay: "7 days",
    tags: ["Finance", "Receivable"],
  },
  {
    id: "ALT-007", category: "Payment", severity: "HIGH", status: "active",
    icon: RiBankCardLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "Pending vendor payment blocking dispatch — Kapoor Fabrics",
    desc: "₹78K outstanding to Kapoor Fabrics. Vendor has held 3 fabric rolls pending clearance.",
    impact: "₹1.9L orders stalled", impactColor: "text-rose-600",
    order: "ORD-2407", client: "Kapoor Fabrics (Vendor)", time: "Apr 1, 2026 · 09:15 AM",
    action: "Pay Now", actionStyle: "bg-rose-500 hover:bg-rose-600 text-white",
    delay: null,
    tags: ["Vendor", "Finance"],
  },
  {
    id: "ALT-008", category: "Payment", severity: "MEDIUM", status: "active",
    icon: RiExchangeLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Client delayed payment pushed production start by 4 days",
    desc: "Fashion Hub's advance not received. ORD-2408 production start pushed to Apr 6.",
    impact: "₹1.2L in downstream delays", impactColor: "text-amber-600",
    order: "ORD-2408", client: "Fashion Hub", time: "Apr 1, 2026 · 10:00 AM",
    action: "Follow Up", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: "4 days",
    tags: ["Client", "Finance"],
  },
  {
    id: "ALT-009", category: "Payment", severity: "LOW", status: "watching",
    icon: RiTimeLine, iconBg: "bg-blue-100", iconColor: "text-blue-600",
    title: "Finishing stage minor delay — payment milestone impacted",
    desc: "ORD-2401 finishing delayed 6 hrs. 2nd client payment milestone may shift.",
    impact: "₹90K milestone at risk", impactColor: "text-blue-600",
    order: "ORD-2401", client: "Tranct", time: "Mar 31, 2026 · 09:15 AM",
    action: "Remind", actionStyle: "bg-blue-400 hover:bg-blue-500 text-white",
    delay: "6 hrs",
    tags: ["Finance", "Milestone"],
  },
  {
    id: "ALT-010", category: "Payment", severity: "HIGH", status: "active",
    icon: RiCalendarCloseLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "Electricity bill unpaid — risk of power cut",
    desc: "MSEDCL bill of ₹42K overdue by 12 days. Notice received. Facility at risk.",
    impact: "Full factory shutdown if cut", impactColor: "text-rose-700",
    order: "—", client: "Facility", time: "Apr 1, 2026 · 08:00 AM",
    action: "Pay Now", actionStyle: "bg-rose-600 hover:bg-rose-700 text-white",
    delay: "12 days overdue",
    tags: ["Utility", "Risk"],
  },

  // ── VENDOR ───────────────────────────────────────────────────────────────────
  {
    id: "ALT-011", category: "Vendor", severity: "HIGH", status: "active",
    icon: RiTruckLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "Vendor delivery delayed — Sharma Threads (5 days late)",
    desc: "Thread stock ETA was Mar 28. Now Apr 4 at earliest. 2 orders at risk.",
    impact: "₹2.6L orders blocked", impactColor: "text-red-600",
    order: "ORD-2402", client: "Sharma Threads (Vendor)", time: "Apr 1, 2026 · 11:00 AM",
    action: "Call Vendor", actionStyle: "bg-red-500 hover:bg-red-600 text-white",
    delay: "5 days",
    tags: ["Vendor", "Supply"],
  },
  {
    id: "ALT-012", category: "Vendor", severity: "MEDIUM", status: "active",
    icon: RiShieldLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Vendor quality mismatch — fabric GSM 20% lower than spec",
    desc: "Kapoor Fabrics delivered 180gsm when 220gsm ordered. Affects 3 client orders.",
    impact: "₹1.1L rework or return", impactColor: "text-amber-600",
    order: "ORD-2409", client: "Kapoor Fabrics (Vendor)", time: "Mar 31, 2026 · 02:00 PM",
    action: "Raise Dispute", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Quality", "Vendor"],
  },

  // ── INVENTORY ────────────────────────────────────────────────────────────────
  {
    id: "ALT-013", category: "Inventory", severity: "HIGH", status: "active",
    icon: RiArchiveLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "Critical inventory — Thread stock < 2 days",
    desc: "Only 18kg thread remaining. Current consumption: 9kg/day. 2 orders will halt.",
    impact: "Production halt in 2 days", impactColor: "text-red-600",
    order: "ORD-2402", client: "Internal", time: "Apr 1, 2026 · 08:00 AM",
    action: "Restock", actionStyle: "bg-red-500 hover:bg-red-600 text-white",
    delay: null,
    tags: ["Inventory", "Critical"],
  },
  {
    id: "ALT-014", category: "Inventory", severity: "MEDIUM", status: "active",
    icon: RiDropLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Button stock at 30% — reorder needed",
    desc: "Button inventory at 1,200 units. Min threshold: 1,000. 2 orders need 800 units.",
    impact: "Avoid production delay", impactColor: "text-amber-600",
    order: "ORD-2410", client: "Internal", time: "Apr 1, 2026 · 09:00 AM",
    action: "Reorder", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Inventory"],
  },
  {
    id: "ALT-015", category: "Inventory", severity: "LOW", status: "watching",
    icon: RiPriceTag3Line, iconBg: "bg-blue-100", iconColor: "text-blue-600",
    title: "Zipper variant SKU-ZP-08 out of stock",
    desc: "Zipper SKU-ZP-08 depleted. ORD-2411 requires 200 units by Apr 8.",
    impact: "₹45K order at risk", impactColor: "text-blue-600",
    order: "ORD-2411", client: "Internal", time: "Mar 31, 2026 · 04:00 PM",
    action: "Source Alt", actionStyle: "bg-blue-400 hover:bg-blue-500 text-white",
    delay: null,
    tags: ["Inventory", "SKU"],
  },

  // ── CLIENT ────────────────────────────────────────────────────────────────────
  {
    id: "ALT-016", category: "Client", severity: "HIGH", status: "active",
    icon: RiUserLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "Client delayed ORD-2412 by 18 days — extreme delay",
    desc: "StyleCraft postponed approval by 18 days. Production slot is now wasted.",
    impact: "₹4.2L slot wasted + ₹60K idle cost", impactColor: "text-rose-600",
    order: "ORD-2412", client: "StyleCraft", time: "Mar 28, 2026 · 02:00 PM",
    action: "Escalate", actionStyle: "bg-rose-500 hover:bg-rose-600 text-white",
    delay: "18 days",
    tags: ["Client", "Slot Loss"],
  },
  {
    id: "ALT-017", category: "Client", severity: "HIGH", status: "active",
    icon: RiSeedlingLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "No new clients in 45 days — stagnant pipeline",
    desc: "Last new client onboarded: Feb 16, 2026. Revenue growth is flat.",
    impact: "Growth risk · ₹8L+ quarterly gap", impactColor: "text-rose-600",
    order: "—", client: "Business", time: "Apr 1, 2026",
    action: "Review Strategy", actionStyle: "bg-rose-500 hover:bg-rose-600 text-white",
    delay: null,
    tags: ["Growth", "Business"],
  },
  {
    id: "ALT-018", category: "Client", severity: "MEDIUM", status: "watching",
    icon: RiThumbDownLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Negative client feedback on ORD-2403 — delivery quality",
    desc: "Fashion Hub rated delivery 2/5. Cited late delivery and minor stitching issues.",
    impact: "Repeat order at risk (₹3.2L/yr)", impactColor: "text-amber-600",
    order: "ORD-2403", client: "Fashion Hub", time: "Mar 30, 2026 · 03:00 PM",
    action: "Resolve", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Client", "Reputation"],
  },
  {
    id: "ALT-019", category: "Client", severity: "LOW", status: "resolved",
    icon: RiPhoneLine, iconBg: "bg-green-100", iconColor: "text-green-600",
    title: "Client Urban Threads unresponsive for 7 days",
    desc: "No response to 3 follow-ups on ORD-2413 design approval.",
    impact: "Production slot at risk", impactColor: "text-green-600",
    order: "ORD-2413", client: "Urban Threads", time: "Mar 25, 2026 · 11:00 AM",
    action: "Resolved", actionStyle: "bg-green-500 text-white cursor-default",
    delay: null,
    tags: ["Client", "Communication"],
  },

  // ── FINANCIAL RISK ─────────────────────────────────────────────────────────────
  {
    id: "ALT-020", category: "Financial Risk", severity: "HIGH", status: "active",
    icon: RiBarChartLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "Cash blocked in 6 incomplete orders — ₹9.4L stuck",
    desc: "Orders at 60-80% completion with invoices not raised. Working capital severely constrained.",
    impact: "₹9.4L working capital blocked", impactColor: "text-red-600",
    order: "Multiple", client: "Various", time: "Apr 1, 2026",
    action: "Review WC", actionStyle: "bg-red-500 hover:bg-red-600 text-white",
    delay: null,
    tags: ["Finance", "WC"],
  },
  {
    id: "ALT-021", category: "Financial Risk", severity: "HIGH", status: "active",
    icon: RiMoneyDollarCircleLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "Cumulative delay losses this month — ₹5.7L",
    desc: "Delays across 8 orders have incurred idle costs, penalty clauses, and expedite fees.",
    impact: "₹5.7L lost to delays this month", impactColor: "text-red-600",
    order: "Multiple", client: "Various", time: "Apr 1, 2026",
    action: "View Report", actionStyle: "bg-red-500 hover:bg-red-600 text-white",
    delay: null,
    tags: ["Finance", "Losses"],
  },
  {
    id: "ALT-022", category: "Financial Risk", severity: "MEDIUM", status: "active",
    icon: RiExchangeLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Gross margin eroded by 12% — material cost spike",
    desc: "Fabric prices up 18%. Orders priced 3 months ago now running on thin margins.",
    impact: "₹1.8L margin erosion this quarter", impactColor: "text-amber-600",
    order: "—", client: "Cross-order", time: "Apr 1, 2026",
    action: "Reprice", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Finance", "Margin"],
  },

  // ── COMPLIANCE / UTILITY ───────────────────────────────────────────────────────
  {
    id: "ALT-023", category: "Compliance", severity: "HIGH", status: "active",
    icon: RiFlashlightLine, iconBg: "bg-red-100", iconColor: "text-red-600",
    title: "ESI/PF returns overdue — penalty accruing",
    desc: "March ESI & PF returns not filed. ₹12K penalty per day from Apr 5.",
    impact: "₹36K penalty so far", impactColor: "text-red-600",
    order: "—", client: "HR/Finance", time: "Apr 1, 2026",
    action: "File Now", actionStyle: "bg-red-500 hover:bg-red-600 text-white",
    delay: null,
    tags: ["Compliance", "HR"],
  },
  {
    id: "ALT-024", category: "Compliance", severity: "MEDIUM", status: "watching",
    icon: RiBuildingLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Factory safety audit due in 8 days",
    desc: "Annual safety compliance audit scheduled Apr 9. Fire extinguisher records outdated.",
    impact: "Operational license at risk", impactColor: "text-amber-600",
    order: "—", client: "Facility", time: "Apr 1, 2026",
    action: "Prepare", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Compliance", "Safety"],
  },
  {
    id: "ALT-025", category: "Compliance", severity: "LOW", status: "watching",
    icon: RiInformationLine, iconBg: "bg-blue-100", iconColor: "text-blue-600",
    title: "Worker skill certifications expired for 3 employees",
    desc: "3 stitching operators' NSDC certifications lapsed. Client audits may flag this.",
    impact: "Audit compliance risk", impactColor: "text-blue-600",
    order: "—", client: "HR", time: "Mar 30, 2026",
    action: "Schedule", actionStyle: "bg-blue-400 hover:bg-blue-500 text-white",
    delay: null,
    tags: ["Compliance", "HR"],
  },

  // ── BUSINESS HEALTH ───────────────────────────────────────────────────────────
  {
    id: "ALT-026", category: "Business Health", severity: "HIGH", status: "active",
    icon: RiThumbDownLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "3 repeat clients not reordered in 90 days",
    desc: "Textile Masters, City Fashion, ElegantWear — all silent for 90+ days post last order.",
    impact: "₹12L annual revenue at risk", impactColor: "text-rose-600",
    order: "—", client: "Multiple", time: "Apr 1, 2026",
    action: "Reconnect", actionStyle: "bg-rose-500 hover:bg-rose-600 text-white",
    delay: null,
    tags: ["Growth", "Retention"],
  },
  {
    id: "ALT-027", category: "Business Health", severity: "MEDIUM", status: "watching",
    icon: RiCloseCircleLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Client satisfaction score dropped to 3.2/5 this quarter",
    desc: "Avg CSAT down from 4.1 in Q4 2025. Driven by delays and communication issues.",
    impact: "Referral loss risk", impactColor: "text-amber-600",
    order: "—", client: "Business-wide", time: "Apr 1, 2026",
    action: "Review", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Reputation", "CSAT"],
  },
  {
    id: "ALT-028", category: "Business Health", severity: "MEDIUM", status: "active",
    icon: RiErrorWarningLine, iconBg: "bg-amber-100", iconColor: "text-amber-600",
    title: "Order rejection rate up 4.2% — quality systemic issue",
    desc: "April rejection rate at 6.8% vs. 2.6% benchmark. Pattern points to stitching unit.",
    impact: "₹2.4L in rework + client trust", impactColor: "text-amber-600",
    order: "Multiple", client: "QC Team", time: "Apr 1, 2026",
    action: "Investigate", actionStyle: "bg-amber-500 hover:bg-amber-600 text-white",
    delay: null,
    tags: ["Quality", "Business"],
  },
  {
    id: "ALT-029", category: "Business Health", severity: "LOW", status: "watching",
    icon: RiBarChartLine, iconBg: "bg-blue-100", iconColor: "text-blue-600",
    title: "Capacity utilisation below 60% for 2nd week",
    desc: "Factory running at 58% capacity. Fixed costs being absorbed by fewer orders.",
    impact: "₹80K idle cost/week", impactColor: "text-blue-600",
    order: "—", client: "Operations", time: "Apr 1, 2026",
    action: "Action Plan", actionStyle: "bg-blue-400 hover:bg-blue-500 text-white",
    delay: null,
    tags: ["Operations", "Efficiency"],
  },
  {
    id: "ALT-030", category: "Business Health", severity: "HIGH", status: "active",
    icon: RiArrowDownLine, iconBg: "bg-rose-100", iconColor: "text-rose-600",
    title: "Net profit margin collapsed to 4.1% (was 14.2% last quarter)",
    desc: "Combination of delays, rework, idle costs, and material price hike eroding margins fast.",
    impact: "Business viability risk if trend continues", impactColor: "text-rose-600",
    order: "—", client: "Finance", time: "Apr 1, 2026",
    action: "Full Review", actionStyle: "bg-rose-500 hover:bg-rose-600 text-white",
    delay: null,
    tags: ["Finance", "Critical"],
  },
];

const AI_PRIORITY_ACTIONS = [
  {
    icon: RiToolsLine, iconColor: "text-red-500", bg: "bg-red-50",
    title: "Reassign stitching work for ORD-2402",
    sub: "Impact: ₹3.8L delay · Production · Priority",
    action: "Fix", style: "bg-green-500 hover:bg-green-600 text-white",
  },
  {
    icon: RiMoneyDollarCircleLine, iconColor: "text-blue-500", bg: "bg-blue-50",
    title: "Follow up on overdue payment for ORD-2404",
    sub: "Impact: ₹2.3L due · Finance · 7 days overdue",
    action: "Remind", style: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  {
    icon: RiArchiveLine, iconColor: "text-amber-500", bg: "bg-amber-50",
    title: "Restock critical thread inventory immediately",
    sub: "Impact: Avoid production halt · Inventory · 2 days left",
    action: "Restock", style: "bg-amber-500 hover:bg-amber-600 text-white",
  },
  {
    icon: RiFlashlightLine, iconColor: "text-red-500", bg: "bg-rose-50",
    title: "Pay electricity bill to prevent factory shutdown",
    sub: "Impact: Full facility shutdown risk · Utility · 12 days overdue",
    action: "Pay Now", style: "bg-rose-500 hover:bg-rose-600 text-white",
  },
  {
    icon: RiTruckLine, iconColor: "text-orange-500", bg: "bg-orange-50",
    title: "Call Sharma Threads — delivery 5 days overdue",
    sub: "Impact: ₹2.6L orders blocked · Vendor · Supply chain",
    action: "Call", style: "bg-orange-500 hover:bg-orange-600 text-white",
  },
];

const CATEGORIES = ["All", "Production", "Payment", "Vendor", "Inventory", "Client", "Financial Risk", "Compliance", "Business Health"];
const SEVERITIES = ["All Severity", "HIGH", "MEDIUM", "LOW"];
const STATUSES = ["All Status", "active", "watching", "resolved"];

const SEV_STYLE = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-blue-100 text-blue-600",
};

const CAT_ICONS = {
  Production: RiToolsLine,
  Payment: RiMoneyDollarCircleLine,
  Vendor: RiTruckLine,
  Inventory: RiArchiveLine,
  Client: RiUserLine,
  "Financial Risk": RiBarChartLine,
  Compliance: RiShieldLine,
  "Business Health": RiBuildingLine,
};

const CAT_COLORS = {
  Production: "border-red-400 text-red-600",
  Payment: "border-rose-400 text-rose-600",
  Vendor: "border-orange-400 text-orange-600",
  Inventory: "border-amber-400 text-amber-600",
  Client: "border-purple-400 text-purple-600",
  "Financial Risk": "border-rose-500 text-rose-700",
  Compliance: "border-blue-400 text-blue-600",
  "Business Health": "border-slate-400 text-slate-600",
};

/* ─────────────────────────────────────────────────────────────────────────────
   ALERT CARD
───────────────────────────────────────────────────────────────────────────── */

function AlertCard({ alert, onIgnore }) {
  const Icon = alert.icon;
  return (
    <div className={`bg-white border rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow ${alert.status === "resolved" ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${alert.iconBg}`}>
          <Icon className={`w-5 h-5 ${alert.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${SEV_STYLE[alert.severity]}`}>{alert.severity}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${alert.status === "active" ? "bg-green-100 text-green-700" : alert.status === "resolved" ? "bg-gray-100 text-gray-500" : "bg-sky-100 text-sky-700"}`}>
              {alert.status}
            </span>
            {alert.delay && (
              <span className="text-[10px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                <RiTimeLine className="shrink-0" /> {alert.delay}
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug">{alert.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{alert.desc}</p>
        </div>
      </div>

      {/* Impact row */}
      <div className={`text-xs font-bold ${alert.impactColor} bg-slate-50 rounded-lg px-3 py-1.5 flex items-center gap-1.5`}>
        <RiAlertLine className="shrink-0 text-slate-400" />
        Impact: {alert.impact}
      </div>

      {/* Meta + Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-[10px] text-gray-400 leading-tight">
          <span className="font-semibold text-gray-600">{alert.order}</span> · {alert.client}
          <span className="ml-1">· {alert.time}</span>
        </div>
        <div className="flex items-center gap-2">
          {alert.status !== "resolved" && (
            <button
              onClick={() => onIgnore(alert.id)}
              className="text-[10px] text-gray-400 hover:text-gray-600 font-semibold transition-colors"
            >
              Ignore
            </button>
          )}
          <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm ${alert.actionStyle}`}>
            {alert.action}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Alerts() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [query, setQuery] = useState("");
  const [ignoredIds, setIgnoredIds] = useState([]);
  const [showAIPriority, setShowAIPriority] = useState(true);
  const [showResolved, setShowResolved] = useState(false);

  const handleIgnore = (id) => setIgnoredIds((prev) => [...prev, id]);

  const filtered = ALERT_DATA.filter((a) => {
    if (ignoredIds.includes(a.id)) return false;
    if (!showResolved && a.status === "resolved") return false;
    if (categoryFilter !== "All" && a.category !== categoryFilter) return false;
    if (severityFilter !== "All Severity" && a.severity !== severityFilter) return false;
    if (statusFilter !== "All Status" && a.status !== statusFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.order.toLowerCase().includes(q) ||
        a.client.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Group by category
  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter((a) => a.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const highCount = ALERT_DATA.filter((a) => a.severity === "HIGH").length;
  const totalRisk = "8.4L";
  const ordersAtRisk = "5.7L";
  const cashRisk = "9.4L";

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alerts & Issues</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time factory intelligence — {ALERT_DATA.length} active signals tracked</p>
        </div>
        <button
          onClick={() => setShowResolved(!showResolved)}
          className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors border ${showResolved ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}
        >
          {showResolved ? <RiEyeOffLine /> : <RiEyeLine />}
          {showResolved ? "Hide Resolved" : "Show Resolved"}
        </button>
      </div>

      {/* ── KPI CARDS ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-red-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium mb-1">Critical Issues</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-red-600">₹{totalRisk}<span className="text-sm font-semibold text-gray-400 ml-1">at Risk</span></p>
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <RiAlertLine className="text-red-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-red-500 font-semibold mt-1 uppercase">{highCount} HIGH severity alerts</p>
        </div>
        <div className="bg-white border border-amber-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium mb-1">Orders at Risk</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-amber-600">₹{ordersAtRisk}<span className="text-sm font-semibold text-gray-400 ml-1">delayed</span></p>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <RiTimeLine className="text-amber-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-amber-500 font-semibold mt-1 uppercase">8 orders impacted</p>
        </div>
        <div className="bg-white border border-rose-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium mb-1">Cash Blocked</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-rose-600">₹{cashRisk}<span className="text-sm font-semibold text-gray-400 ml-1">stuck</span></p>
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <RiMoneyDollarCircleLine className="text-rose-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-rose-500 font-semibold mt-1 uppercase">WC severely constrained</p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium mb-1">Margin Erosion</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-emerald-700">4.1%<span className="text-sm font-semibold text-gray-400 ml-1">net margin</span></p>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <RiArrowDownLine className="text-emerald-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-rose-500 font-semibold mt-1 uppercase">Was 14.2% last quarter</p>
        </div>
      </div>

      {/* ── AI PRIORITY ACTIONS ────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowAIPriority(!showAIPriority)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
        >
          <div className="text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
                <RiFlashlightLine className="text-green-400 w-4 h-4" />
              </div>
              <h2 className="font-bold text-slate-800">AI Priority Actions</h2>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{AI_PRIORITY_ACTIONS.length} URGENT</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 ml-9">Suggested actions to prevent risks and recover losses</p>
          </div>
          <RiArrowRightLine className={`text-slate-400 transition-transform ${showAIPriority ? "rotate-90" : ""}`} />
        </button>
        {showAIPriority && (
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {AI_PRIORITY_ACTIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.bg}`}>
                    <Icon className={`w-5 h-5 ${a.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.sub}</p>
                  </div>
                  <button className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm shrink-0 ${a.style}`}>
                    {a.action}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── FILTERS ────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <RiSearchLine className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search alerts, orders, clients…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <RiCloseLine className="text-gray-400 hover:text-gray-600 w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 outline-none hover:border-slate-400 transition-colors"
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 outline-none hover:border-slate-400 transition-colors"
          >
            {SEVERITIES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1 opacity-60">
                  ({ALERT_DATA.filter((a) => a.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── WHAT THIS COSTS YOU — IMPACT BANNER ───────────────────────────── */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <RiBarChartLine className="text-red-400 w-5 h-5" />
          <h3 className="font-bold text-white">What an Unmanaged Factory Costs You</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Monthly Delay Losses", value: "₹5.7L", sub: "Idle + penalty + expedite", color: "text-red-400" },
            { label: "Working Capital Blocked", value: "₹9.4L", sub: "Incomplete order cash", color: "text-amber-400" },
            { label: "Client Churn Risk", value: "₹12L", sub: "3 silent repeat clients", color: "text-rose-400" },
            { label: "Margin Collapse", value: "−10.1%", sub: "Q4 → Q1 drop", color: "text-orange-400" },
          ].map((m) => (
            <div key={m.label} className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-slate-400">{m.label}</p>
              <p className={`text-xl font-black mt-1 ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 border-t border-white/10 pt-3">
          ManufactureOS tracks these in real-time and surfaces fixes before they compound. Unaddressed, these signals become permanent losses.
        </p>
      </div>

      {/* ── GROUPED ALERT LISTS ────────────────────────────────────────────── */}
      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <RiCheckboxCircleLine className="w-12 h-12 mx-auto mb-3 text-green-300" />
          <p className="font-bold text-slate-600">No alerts match your filters</p>
          <p className="text-sm mt-1">Try adjusting the category, severity, or search query</p>
        </div>
      )}

      {Object.entries(grouped).map(([cat, alerts]) => {
        const CatIcon = CAT_ICONS[cat] || RiAlertLine;
        const catStyle = CAT_COLORS[cat] || "border-slate-300 text-slate-600";
        const highPriority = alerts.filter((a) => a.severity === "HIGH").length;
        return (
          <div key={cat}>
            {/* Category header */}
            <div className={`flex items-center gap-3 mb-3 border-l-4 pl-3 ${catStyle}`}>
              <CatIcon className="w-4 h-4" />
              <h2 className="font-bold text-sm uppercase tracking-wide">{cat}</h2>
              <span className="text-xs text-gray-400 font-semibold">{alerts.length} issue{alerts.length > 1 ? "s" : ""}</span>
              {highPriority > 0 && (
                <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  {highPriority} HIGH
                </span>
              )}
              <button className="ml-auto text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-semibold">
                View all <RiArrowRightLine className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3 mb-6">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onIgnore={handleIgnore} />
              ))}
            </div>
          </div>
        );
      })}

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white text-center mb-8">
        <RiArrowUpLine className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <h3 className="font-bold text-lg">This is fixable — systematically.</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Every alert above has a root cause, a fix, and a financial recovery. ManufactureOS surfaces them before they compound into permanent losses.
        </p>
        <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg">
          Generate Full Recovery Plan
        </button>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
