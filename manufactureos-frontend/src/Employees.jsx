import { useState } from "react";
import { RiWhatsappLine, RiPhoneLine, RiAlertLine, RiSearchLine, RiCloseLine, RiUserLine, RiFlashlightLine, RiCheckboxCircleLine } from "react-icons/ri";

const MONTH_DAYS = 30;

function genAttendance() {
  const types = ["present", "present", "present", "present", "absent", "overtime"];
  return Array.from({ length: MONTH_DAYS }, (_, i) => ({
    day: i + 1,
    type: types[Math.floor(Math.random() * types.length)],
    inTime:  "09:" + String(Math.floor(Math.random() * 30)).padStart(2, "0") + " AM",
    outTime: "06:" + String(Math.floor(Math.random() * 30)).padStart(2, "0") + " PM",
  }));
}

const EMPLOYEES = [
  {
    id: "EMP-001", name: "Rajesh Kumar", role: "Production Manager",
    status: "active", phone: "+91 98765 43210", avatar: "RK", avatarColor: "#4F46E5",
    salary: 45000, isSpecialist: true,
    impactIfAbsent: "Critical — No one else can sign off production batches.",
    attendance: genAttendance(),
    orders: [
      { id: "ORD-2401", client: "Fashion Hub",   role: "Floor Supervisor",  status: "Completed"  },
      { id: "ORD-2397", client: "StyleCraft",    role: "Production Lead",   status: "Completed"  },
      { id: "ORD-2408", client: "Urban Threads", role: "Manager",           status: "In Progress" },
    ],
    activityLog: [
      { time: "10:25 AM", action: "Approved batch #B-041 for QC" },
      { time: "11:50 AM", action: "Reviewed stitching count for ORD-2408" },
      { time: "02:10 PM", action: "Raised issue on thread stock" },
    ],
    productivity: { outputPerDay: 120, efficiencyTarget: 95, efficiencyActual: 91, defectRate: 1.2, reworkRate: 0.8 },
    alerts: [],
  },
  {
    id: "EMP-002", name: "Priya Sharma", role: "Quality Inspector",
    status: "active", phone: "+91 98765 43211", avatar: "PS", avatarColor: "#0891B2",
    salary: 30000, isSpecialist: true,
    impactIfAbsent: "High — QC pipeline stalls, dispatch delayed by ~2 days.",
    attendance: genAttendance(),
    orders: [
      { id: "ORD-2401", client: "Fashion Hub",   role: "QC Inspector", status: "Completed"  },
      { id: "ORD-2403", client: "Urban Threads", role: "QC Lead",      status: "In Progress" },
    ],
    activityLog: [
      { time: "09:45 AM", action: "Inspected 80 units — 2 defects found" },
      { time: "12:30 PM", action: "Cleared batch #B-039" },
      { time: "03:00 PM", action: "Filed rework report for ORD-2403" },
    ],
    productivity: { outputPerDay: 85, efficiencyTarget: 90, efficiencyActual: 88, defectRate: 2.4, reworkRate: 1.5 },
    alerts: ["Drop in productivity detected last week"],
  },
  {
    id: "EMP-003", name: "Amit Patel", role: "Machine Operator",
    status: "active", phone: "+91 98765 43212", avatar: "AP", avatarColor: "#059669",
    salary: 22000, isSpecialist: false,
    impactIfAbsent: "Low — Replaceable with 2hr reallocation.",
    attendance: genAttendance(),
    orders: [
      { id: "ORD-2402", client: "StyleCraft",   role: "Stitching Operator", status: "In Progress" },
      { id: "ORD-2399", client: "Fashion Hub",  role: "Cutter",             status: "Completed"   },
    ],
    activityLog: [
      { time: "09:00 AM", action: "Started cutting for ORD-2402 batch" },
      { time: "01:00 PM", action: "Completed 200 pieces before lunch" },
      { time: "04:30 PM", action: "Handed off to stitching line" },
    ],
    productivity: { outputPerDay: 210, efficiencyTarget: 200, efficiencyActual: 210, defectRate: 0.5, reworkRate: 0.2 },
    alerts: [],
  },
  {
    id: "EMP-004", name: "Sunita Devi", role: "Supervisor",
    status: "On Leave", phone: "+91 98765 43213", avatar: "SD", avatarColor: "#D97706",
    salary: 35000, isSpecialist: true,
    impactIfAbsent: "Medium — Rajesh covering short-term but workload stress rising.",
    attendance: genAttendance(),
    orders: [
      { id: "ORD-2400", client: "Textile Masters", role: "Shift Supervisor", status: "Completed" },
    ],
    activityLog: [{ time: "—", action: "Currently on approved medical leave" }],
    productivity: { outputPerDay: 95, efficiencyTarget: 90, efficiencyActual: 93, defectRate: 1.0, reworkRate: 0.6 },
    alerts: ["Repeated absence pattern detected (3 times this month)"],
  },
  {
    id: "EMP-005", name: "Mohammed Ali", role: "Machine Operator",
    status: "active", phone: "+91 98765 43214", avatar: "MA", avatarColor: "#7C3AED",
    salary: 22000, isSpecialist: false,
    impactIfAbsent: "Low — Replaceable with 2hr reallocation.",
    attendance: genAttendance(),
    orders: [
      { id: "ORD-2403", client: "Urban Threads", role: "Stitching Operator", status: "In Progress" },
    ],
    activityLog: [
      { time: "08:55 AM", action: "Clocked in and started stitching line" },
      { time: "12:00 PM", action: "Completed 150 units" },
      { time: "05:30 PM", action: "Overtime — completing backlog of ORD-2403" },
    ],
    productivity: { outputPerDay: 175, efficiencyTarget: 180, efficiencyActual: 170, defectRate: 3.1, reworkRate: 2.0 },
    alerts: ["High defect rate — 3.1% this week"],
  },
];

function calcReliabilityScore(emp) {
  const presentDays = emp.attendance.filter(d => d.type === "present" || d.type === "overtime").length;
  const attendance   = Math.round((presentDays / MONTH_DAYS) * 100);
  const outputScore  = Math.min(100, Math.round((emp.productivity.efficiencyActual / emp.productivity.efficiencyTarget) * 100));
  const errorScore   = Math.max(0, 100 - emp.productivity.defectRate * 10);
  const overtimeBonus = emp.attendance.filter(d => d.type === "overtime").length * 2;
  return Math.min(99, Math.round(attendance * 0.35 + outputScore * 0.30 + errorScore * 0.25 + Math.min(10, overtimeBonus) * 0.10));
}

function AttendanceCalendar({ attendance }) {
  const [hovered, setHovered] = useState(null);
  const colorMap = { present: "#22c55e", absent: "#ef4444", overtime: "#eab308" };
  const labelMap = { present: "Present", absent: "Absent", overtime: "Overtime" };
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-400 mb-1 text-center">
        {["S","M","T","W","T","F","S"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 relative">
        {attendance.map(d => (
          <div
            key={d.day}
            onMouseEnter={() => setHovered(d.day)}
            onMouseLeave={() => setHovered(null)}
            className="relative h-7 rounded flex items-center justify-center text-xs font-semibold text-white cursor-default hover:opacity-80"
            style={{ backgroundColor: colorMap[d.type] }}
          >
            {d.day}
            {hovered === d.day && (
              <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl pointer-events-none">
                <p className="font-semibold">{labelMap[d.type]}</p>
                <p>In: {d.inTime}</p><p>Out: {d.outTime}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 text-xs">
        {[["#22c55e","Present"],["#ef4444","Absent"],["#eab308","Overtime"]].map(([c,l]) => (
          <span key={l} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: c }} />{l}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScoreRing({ score }) {
  const color = score >= 85 ? "#22c55e" : score >= 65 ? "#eab308" : "#ef4444";
  const r = 28, circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <svg width="72" height="72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ}
          strokeLinecap="round" transform="rotate(-90 36 36)" style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="bold" fill={color}>{score}</text>
      </svg>
      <span className="text-xs text-gray-500 mt-1">/ 100</span>
    </div>
  );
}

function MiniBar({ value, max, color }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
      <div className="h-1.5 rounded-full transition-all" style={{ width: `${Math.min(100, Math.round((value / max) * 100))}%`, backgroundColor: color }} />
    </div>
  );
}

function EmployeeSidebar({ emp, onClose }) {
  const [tab, setTab] = useState(1);
  const score = calcReliabilityScore(emp);
  const presentDays  = emp.attendance.filter(d => d.type === "present" || d.type === "overtime").length;
  const absentDays   = emp.attendance.filter(d => d.type === "absent").length;
  const overtimeDays = emp.attendance.filter(d => d.type === "overtime").length;

  const tabs = [
    { id: 1, label: "Attendance" },
    { id: 2, label: "Involvement" },
    { id: 3, label: "Productivity" },
    { id: 4, label: "Cost" },
    { id: 5, label: "Reliability" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[460px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.25s ease" }}>

        {/* HEADER */}
        <div className="flex items-center gap-3 p-5 border-b bg-gray-50 shrink-0">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: emp.avatarColor }}>
            {emp.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900 truncate">{emp.name}</h2>
            <p className="text-xs text-gray-500">{emp.role} · {emp.id}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${emp.status === "active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                {emp.status}
              </span>
              {emp.alerts.length > 0 && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <RiAlertLine /> {emp.alerts.length} Alert{emp.alerts.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500 shrink-0">
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* ALERT BANNER */}
        {emp.alerts.length > 0 && (
          <div className="px-5 pt-3">
            {emp.alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2 bg-red-100 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700 mb-1">
                <RiAlertLine className="mt-0.5 shrink-0" />{a}
              </div>
            ))}
          </div>
        )}

        {/* TABS */}
        <div className="flex border-b px-5 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`shrink-0 text-xs font-semibold px-3 py-3 border-b-2 transition-colors
                ${tab === t.id ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "none" }}>

          {/* ATTENDANCE */}
          {tab === 1 && (
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-3">April 2026 — Attendance Calendar</p>
              <AttendanceCalendar attendance={emp.attendance} />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Present",  value: presentDays,  color: "#22c55e", bg: "#f0fdf4" },
                  { label: "Absent",   value: absentDays,   color: "#ef4444", bg: "#fef2f2" },
                  { label: "Overtime", value: overtimeDays, color: "#eab308", bg: "#fefce8" },
                ].map(s => (
                  <div key={s.label} className="rounded-lg p-3 text-center border border-gray-100" style={{ backgroundColor: s.bg }}>
                    <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INVOLVEMENT */}
          {tab === 2 && (
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-3">Orders Worked On</p>
                <div className="space-y-2">
                  {emp.orders.map(o => (
                    <div key={o.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{o.id} — {o.client}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Role: {o.role}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${o.status === "Completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-3">Today's Activity Log</p>
                <div className="space-y-2">
                  {emp.activityLog.map((a, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                        {i < emp.activityLog.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" style={{ minHeight: 16 }} />}
                      </div>
                      <div className="pb-2">
                        <p className="text-xs text-gray-400">{a.time}</p>
                        <p className="text-sm text-gray-700">{a.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTIVITY */}
          {tab === 3 && (
            <div className="space-y-4">
              <p className="font-semibold text-sm text-gray-700">Productivity Signal</p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-500">Output Per Day</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{emp.productivity.outputPerDay} <span className="text-base font-normal text-gray-500">units</span></p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Efficiency vs Target</span>
                  <span className={`font-bold ${emp.productivity.efficiencyActual >= emp.productivity.efficiencyTarget ? "text-green-500" : "text-red-500"}`}>
                    {emp.productivity.efficiencyActual}% / {emp.productivity.efficiencyTarget}%
                  </span>
                </div>
                <MiniBar value={emp.productivity.efficiencyActual} max={100} color={emp.productivity.efficiencyActual >= emp.productivity.efficiencyTarget ? "#22c55e" : "#ef4444"} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Defect Rate", value: emp.productivity.defectRate, high: emp.productivity.defectRate > 2, suffix: "%" },
                  { label: "Rework Rate", value: emp.productivity.reworkRate, high: emp.productivity.reworkRate > 1.5, suffix: "%" },
                ].map(m => (
                  <div key={m.label} className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{m.label}</p>
                    <p className={`text-xl font-bold mt-1 ${m.high ? "text-red-500" : "text-green-600"}`}>{m.value}{m.suffix}</p>
                    <MiniBar value={m.value} max={10} color={m.high ? "#ef4444" : "#22c55e"} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COST */}
          {tab === 4 && (
            <div className="space-y-4">
              <p className="font-semibold text-sm text-gray-700">Cost Layer</p>
              <div className="bg-gray-800 rounded-lg p-4 text-white">
                <p className="text-xs text-gray-400">Monthly Salary</p>
                <p className="text-3xl font-bold mt-1">
                  ₹{emp.salary >= 100000 
                    ? parseFloat((emp.salary / 100000).toFixed(2)) 
                    : (emp.salary / 100000).toFixed(2)} L
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Per annum: ₹{emp.salary * 12 >= 100000 
                    ? parseFloat((emp.salary * 12 / 100000).toFixed(2)) 
                    : (emp.salary * 12 / 100000).toFixed(2)} L
                </p>
              </div>
              <p className="font-semibold text-sm text-gray-700">Specialist Status</p>
              <div className={`rounded-lg p-4 border-2 flex items-center gap-4 ${emp.isSpecialist ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: emp.isSpecialist ? "#22c55e" : "#9ca3af" }}>
                  {emp.isSpecialist ? "Y" : "N"}
                </div>
                <div>
                  <p className="font-semibold">{emp.isSpecialist ? "Specialist" : "Non-Specialist"}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{emp.isSpecialist ? "Has unique skills critical to operations." : "Role can be covered by others."}</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-yellow-700 mb-1 flex items-center gap-1">
                  <RiFlashlightLine /> Impact if Absent
                </p>
                <p className="text-sm text-gray-700">{emp.impactIfAbsent}</p>
              </div>
            </div>
          )}

          {/* RELIABILITY */}
          {tab === 5 && (
            <div className="space-y-4">
              <p className="font-semibold text-sm text-gray-700">Reliability Score</p>
              <div className="flex items-center gap-5 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <ScoreRing score={score} />
                <div>
                  <p className={`text-4xl font-black ${score >= 85 ? "text-green-600" : score >= 65 ? "text-yellow-500" : "text-red-500"}`}>{score}</p>
                  <p className="text-sm text-gray-500">
                    {score >= 85 ? <span className="flex items-center gap-1 text-green-600"><RiCheckboxCircleLine /> Highly Reliable</span>
                      : score >= 65 ? <span className="text-yellow-500">Moderate</span>
                      : <span className="flex items-center gap-1 text-red-500"><RiAlertLine /> Needs Attention</span>}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Auto-generated from 4 signals</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "1. Attendance Consistency", value: Math.round((emp.attendance.filter(d => d.type !== "absent").length / MONTH_DAYS) * 100), max: 100, suffix: "%" },
                  { label: "2. Output Consistency",     value: Math.min(100, Math.round((emp.productivity.efficiencyActual / emp.productivity.efficiencyTarget) * 100)), max: 100, suffix: "%" },
                  { label: "3. Error Rate (inverse)",   value: Math.max(0, Math.round(100 - emp.productivity.defectRate * 10)), max: 100, suffix: "%" },
                  { label: "4. Overtime Days",          value: emp.attendance.filter(d => d.type === "overtime").length, max: 30, suffix: " days" },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 text-xs">{m.label}</span>
                      <span className="font-semibold text-gray-800 text-xs">{m.value}{m.suffix}</span>
                    </div>
                    <MiniBar value={m.value} max={m.max} color="#22c55e" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t px-5 pb-6 shrink-0 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open(`https://wa.me/${emp.phone?.replace(/\D/g, '')}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <RiWhatsappLine className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={() => window.location.href = `tel:${emp.phone}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <RiPhoneLine className="w-4 h-4" /> Call
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
}

export default function Employees() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const roles = [...new Set(EMPLOYEES.map(e => e.role))];

  const filtered = EMPLOYEES.filter(e => {
    const q = query.toLowerCase();
    const matchQ = e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.id.toLowerCase().includes(q);
    const matchRole   = roleFilter === "All" || e.role === roleFilter;
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchQ && matchRole && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Employees</h1>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center border rounded-lg px-4 py-2 bg-white gap-2">
          <RiSearchLine className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, role or ID..."
            className="outline-none w-full bg-transparent text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
              <RiCloseLine className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="All">All Roles</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="All">All Statuses</option>
            <option value="active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm w-full md:w-auto">
          + Add Employee
        </button>
      </div>

      {/* EMPLOYEE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400">
            <RiSearchLine className="text-4xl mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No employees match "{query}"</p>
          </div>
        )}
        {filtered.map(emp => (
          <div
            key={emp.id}
            onClick={() => setSelected(emp)}
            className={`bg-white rounded-lg shadow-sm border cursor-pointer transition-all hover:shadow-md p-4
              ${selected?.id === emp.id ? "border-green-500" : "border-gray-200 hover:border-green-300"}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: emp.avatarColor }}>
                  {emp.avatar}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{emp.name}</h3>
                  <p className="text-xs text-gray-500">{emp.role}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${emp.status === "active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                {emp.status}
              </span>
            </div>

            <div className="text-xs text-gray-400 mb-3 flex items-center gap-1">
              <RiUserLine /> <span>{emp.id}</span>
            </div>

            {emp.alerts.length > 0 && (
              <div className="bg-red-100 text-red-600 text-xs px-2 py-1.5 rounded flex items-center gap-1 mb-3 font-medium">
                <RiAlertLine /> {emp.alerts[0]}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                Reliability: <span className="font-bold text-gray-700">{calcReliabilityScore(emp)}/100</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={e => { e.stopPropagation(); window.open(`https://wa.me/${emp.phone?.replace(/\D/g, '')}`, '_blank'); }}
                  className="flex-1 bg-green-100 text-xs py-1 px-2 rounded flex items-center gap-1 text-green-700"
                >
                  <RiWhatsappLine /> WhatsApp
                </button>
                <button
                  onClick={e => { e.stopPropagation(); window.location.href = `tel:${emp.phone}`; }}
                  className="flex-1 bg-gray-100 text-xs py-1 px-2 rounded flex items-center gap-1 text-gray-700"
                >
                  <RiPhoneLine /> Call
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <EmployeeSidebar emp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}