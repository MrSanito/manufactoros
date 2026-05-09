import { useState } from "react";
import {
  Bell, Search, ChevronDown, Users, UserPlus, Phone, Trophy,
  Snowflake, TrendingDown, IndianRupee, LayoutDashboard,
  AlertTriangle, UserCheck, CheckCircle2, FileText, Handshake,
  CalendarCheck, XCircle, BarChart2, Activity, PieChart,
  Settings, Users2, Puzzle, ChevronRight, MoreVertical,
  Mail, MessageCircle, StickyNote, RefreshCcw, Circle,
  ArrowUpRight, ArrowDownRight, Filter, Download, Eye
} from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    items: [
      { icon: AlertTriangle, label: "Alerts", badge: 5, badgeColor: "bg-red-500" },
      { icon: LayoutDashboard, label: "Dashboard", active: true },
    ],
  },
  {
    section: "LEADS",
    items: [
      { icon: UserPlus, label: "New Leads", badge: 32, badgeColor: "bg-blue-500" },
      { icon: Phone, label: "Follow Ups", badge: 18, badgeColor: "bg-orange-500" },
      { icon: CheckCircle2, label: "Closed Won" },
      { icon: FileText, label: "Proposed" },
      { icon: CalendarCheck, label: "Meeting Set" },
      { icon: XCircle, label: "Closed Lost" },
    ],
  },
  {
    section: "REPORTS",
    items: [
      { icon: BarChart2, label: "Pipeline" },
      { icon: Activity, label: "Performance" },
      { icon: PieChart, label: "Source Report" },
    ],
  },
  {
    section: "SETTINGS",
    items: [
      { icon: Users2, label: "Users" },
      { icon: Users, label: "Team" },
      { icon: Puzzle, label: "Integrations" },
      { icon: Settings, label: "Settings" },
    ],
  },
];

const KPI_CARDS = [
  {
    label: "Total Leads",
    value: "1,234",
    change: "+18.6%",
    sub: "vs last 30 days",
    up: true,
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "New Leads (This Week)",
    value: "245",
    change: "+12.4%",
    sub: "vs last week",
    up: true,
    icon: UserPlus,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
  },
  {
    label: "Follow Ups",
    value: "18",
    change: "+5.2%",
    sub: "due today",
    up: true,
    icon: Phone,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    label: "Won Deals",
    value: "32",
    change: "+23.1%",
    sub: "vs last 30 days",
    up: true,
    icon: Trophy,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    label: "Cold Leads",
    value: "87",
    change: "-4.3%",
    sub: "vs last 30 days",
    up: false,
    icon: Snowflake,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-400",
  },
  {
    label: "Inbound Leads",
    value: "156",
    change: "+9.8%",
    sub: "vs last 30 days",
    up: true,
    icon: TrendingDown,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Pipeline Value",
    value: "₹1.68 Cr",
    change: "+15.7%",
    sub: "vs last 30 days",
    up: true,
    icon: IndianRupee,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    wide: true,
  },
];

const PIPELINE_STAGES = [
  { label: "New", count: 245, value: "₹18,40,000", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Contacted", count: 310, value: "₹24,60,000", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { label: "Qualified", count: 210, value: "₹36,75,000", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { label: "Proposal Sent", count: 128, value: "₹28,20,000", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { label: "Negotiation", count: 62, value: "₹16,80,000", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Won", count: 32, value: "₹14,50,000", color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Lost", count: 45, value: "₹6,10,000", color: "bg-red-100 text-red-700 border-red-200" },
];

const REMINDERS = [
  {
    icon: MessageCircle,
    iconColor: "text-green-500 bg-green-50",
    name: "Call Mr. Rohit Sharma",
    time: "Today, 03:00 PM",
    company: "Sharma Industries",
  },
  {
    icon: Phone,
    iconColor: "text-blue-500 bg-blue-50",
    name: "Follow up with Priya Patel",
    time: "Today, 04:30 PM",
    company: "Patel & Co.",
  },
  {
    icon: Mail,
    iconColor: "text-purple-500 bg-purple-50",
    name: "Send proposal to Amit Kumar",
    time: "Tomorrow, 11:00 AM",
    company: "Kumar Enterprises",
  },
];

const ALL_LEADS = [
  { initials: "RS", name: "Rohit Sharma", company: "Sharma Industries", stage: "Negotiation", value: "₹4,20,000", owner: "Arjun Mehta", priority: "High", date: "Today, 03:00 PM" },
  { initials: "PP", name: "Priya Patel", company: "Patel & Co.", stage: "Proposal Sent", value: "₹2,80,000", owner: "Neha Singh", priority: "High", date: "Today, 04:30 PM" },
  { initials: "AK", name: "Amit Kumar", company: "Kumar Enterprises", stage: "Qualified", value: "₹6,50,000", owner: "Vikram Rao", priority: "Medium", date: "Tomorrow, 11:00 AM" },
  { initials: "SC", name: "Sneha Choudhary", company: "Choudhary Solutions", stage: "Contacted", value: "₹1,90,000", owner: "Neha Singh", priority: "Medium", date: "Tomorrow, 03:30 PM" },
  { initials: "VS", name: "Vikas Singh", company: "Singh Traders", stage: "New", value: "₹3,10,000", owner: "Arjun Mehta", priority: "Low", date: "14 May, 10:00 AM" },
  { initials: "RV", name: "Rahul Verma", company: "Verma Tech", stage: "Won", value: "₹8,75,000", owner: "Pooja Mehta", priority: "High", date: "13 May, 02:00 PM" },
  { initials: "NK", name: "Nisha Kapoor", company: "Kapoor & Sons", stage: "Closed Lost", value: "₹2,30,000", owner: "Arjun Mehta", priority: "Low", date: "12 May, 09:00 AM" },
];

const priorityStyle = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-amber-50 text-amber-600 border border-amber-200",
  Low: "bg-green-50 text-green-600 border border-green-200",
};

const stageStyle = {
  New: "bg-blue-50 text-blue-600",
  Contacted: "bg-cyan-50 text-cyan-600",
  Qualified: "bg-teal-50 text-teal-700",
  "Proposal Sent": "bg-amber-50 text-amber-700",
  Negotiation: "bg-orange-50 text-orange-600",
  Won: "bg-green-50 text-green-700",
  "Closed Lost": "bg-red-50 text-red-600",
};

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
  "bg-rose-100 text-rose-700",
  "bg-indigo-100 text-indigo-700",
  "bg-green-100 text-green-700",
];

export default function SalesPortal() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-slate-900 flex flex-col flex-shrink-0 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <p className="text-white font-bold text-sm tracking-widest uppercase">SALES<span className="text-green-500">os</span></p>
        </div>

        {/* Nav Groups */}
        <nav className="flex-1 px-3 py-3 space-y-5">
          {SIDEBAR_ITEMS.map((group, gi) => (
            <div key={gi}>
              {group.section && (
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2 mb-3">
                  {group.section}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => setActiveNav(item.label)}
                        className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 group active:scale-95 ${
                          isActive
                            ? "bg-green-500 text-white"
                            : "text-slate-400 hover:bg-slate-700 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={15} className="flex-shrink-0" />
                          <span className="text-[13px] font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${
                              isActive ? "bg-white/30" : item.badgeColor ?? "bg-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="px-3 py-3 border-t border-white/10">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10">
              <span className="text-white text-[11px] font-bold">AM</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-[12px] font-bold truncate">Arjun Mehta</p>
              <p className="text-slate-500 text-[10px] font-medium tracking-wider">SALES OWNER</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Top Bar ── */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg w-60 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 transition-all"
                placeholder="Search by name, company, phone..."
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-gray-100 rounded px-1 border border-gray-200">⌘K</span>
            </div>
            {/* Notifications */}
            <button className="relative p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
              <Bell size={16} />
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">6</span>
            </button>
            {/* User */}
            <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all active:scale-95 group">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center border border-gray-200 group-hover:border-green-500">
                <span className="text-blue-600 text-[9px] font-bold">AM</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">Arjun Mehta</p>
                <p className="text-xs font-medium text-gray-500 leading-tight">Sales Owner</p>
              </div>
              <ChevronDown size={12} className="text-gray-400 ml-1" />
            </button>

            <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

            {/* Main Action */}
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3.5 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95">
              <UserPlus size={16} />
              <span className="hidden sm:inline">Create Lead</span>
            </button>
          </div>
        </header>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-auto">
          <div className="p-5 space-y-5">
            {/* Welcome */}
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-gray-500 tracking-wide">
                Welcome back, <span className="font-bold text-gray-900">Arjun Mehta 👋</span>
              </h2>
            </div>

            {/* ── KPI Row 1 ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {KPI_CARDS.slice(0, 4).map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{card.label}</p>
                      <div className={`w-8 h-8 rounded p-2 ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={16} className={card.iconColor} />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 leading-none font-mono tracking-tight">{card.value}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold">
                        {card.up ? (
                          <ArrowUpRight size={13} className="text-green-500" />
                        ) : (
                          <ArrowDownRight size={13} className="text-red-500" />
                        )}
                        <span className={card.up ? "text-green-600" : "text-red-500"}>{card.change}</span>
                        <span className="text-gray-400 font-normal ml-0.5">{card.sub}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── KPI Row 2 ── */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {KPI_CARDS.slice(4).map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{card.label}</p>
                      <div className={`w-8 h-8 rounded p-2 ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={16} className={card.iconColor} />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 leading-none font-mono tracking-tight">{card.value}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold">
                        {card.up ? (
                          <ArrowUpRight size={13} className="text-green-500" />
                        ) : (
                          <ArrowDownRight size={13} className="text-red-500" />
                        )}
                        <span className={card.up ? "text-green-600" : "text-red-500"}>{card.change}</span>
                        <span className="text-gray-400 font-normal ml-0.5">{card.sub}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Sales Pipeline + Reminders ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Pipeline */}
              <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden shrink-0">
                    <select className="text-xs font-semibold px-3 py-1.5 text-gray-600 bg-white focus:outline-none transition-all active:scale-95 cursor-pointer">
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>This Quarter  </option>
                    </select>
                  </div>
                </div>
                {/* Funnel */}
                <div className="flex items-stretch gap-1 mb-4 overflow-x-auto pb-2 snap-x hide-scroll">
                  {PIPELINE_STAGES.map((stage, i) => (
                    <div
                      key={stage.label}
                      className={`flex-1 min-w-[100px] rounded-lg border px-3 py-4 text-center cursor-pointer hover:shadow-sm transition-all snap-center ${stage.color}`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">{stage.label}</p>
                      <p className="text-xl font-bold leading-none font-mono tracking-tight">{stage.count}</p>
                      <p className="text-[10px] font-bold opacity-60 mt-2 bg-white/30 px-2 py-0.5 rounded-full inline-block font-mono">{stage.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Total Pipeline Value: <span className="font-bold text-green-600 ml-1 font-mono">₹1,68,35,000</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Conversion Rate: <span className="font-bold text-green-600 ml-1 font-mono">12.5%</span>
                  </span>
                </div>
              </div>

              {/* Reminders */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Reminders</h3>
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest">AI</span>
                  </div>
                  <button className="text-sm font-semibold text-green-500 hover:text-green-600 transition-all active:scale-95">View All</button>
                </div>
                <div className="space-y-2 flex-1">
                  {REMINDERS.map((r, i) => {
                    const Icon = r.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer active:scale-95 transition-all outline outline-1 outline-transparent hover:outline-gray-200">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${r.iconColor}`}>
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <p className="text-sm font-semibold text-gray-900 truncate mb-0.5">{r.name}</p>
                          <p className="text-xs font-medium text-gray-500 truncate mb-1">{r.company}</p>
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{r.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 p-3 bg-green-50 shadow-sm border border-green-100 rounded-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10">
                      <RefreshCcw size={40} className="text-green-600 rotate-12 -mr-4 -mt-2" />
                    </div>
                    <RefreshCcw size={14} className="text-green-600 animate-spin-slow shrink-0" />
                    <p className="text-xs text-green-700 font-semibold flex-1 relative z-10">AI extracted 5 reminders from notes</p>
                    <button className="text-xs text-green-600 font-bold hover:underline relative z-10 active:scale-95 transition-all">Review</button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── All Leads ── */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">All Leads</h3>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">Your assigned leads pipeline</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all active:scale-95">
                    <Filter size={14} />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all active:scale-95">
                    <Download size={14} />
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      {["Lead", "Company", "Stage", "Value", "Owner", "Follow Up", "Priority", ""].map((h) => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_LEADS.map((lead, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition-all cursor-pointer group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm ${avatarColors[i % avatarColors.length]}`}>
                              {lead.initials}
                            </div>
                            <span className="font-bold text-gray-900">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 font-medium">{lead.company}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${stageStyle[lead.stage] ?? "bg-gray-100 text-gray-600"}`}>
                            {lead.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900 font-mono tracking-tight">{lead.value}</td>
                        <td className="px-6 py-4 text-gray-500 font-medium">{lead.owner}</td>
                        <td className={`px-6 py-4 text-sm font-semibold font-mono ${lead.date.startsWith("Today") ? "text-orange-500" : "text-gray-400"}`}>
                          {lead.date}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityStyle[lead.priority]}`}>
                            {lead.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-90">
                              <Eye size={15} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-90">
                              <MoreVertical size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/30 rounded-b-xl">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Showing {ALL_LEADS.length} of 1,234 leads</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "...", 42].map((p, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all active:scale-90 ${
                        p === 1 ? "bg-green-500 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95 ml-2">
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}