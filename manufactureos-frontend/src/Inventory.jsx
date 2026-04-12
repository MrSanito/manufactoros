import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  RiArchiveLine, RiAlertLine, RiArrowUpLine, RiArrowDownLine,
  RiSearchLine, RiFlashlightLine, RiBuildingLine, RiCloseLine, RiAddLine
} from "react-icons/ri";

/* ── DATA ─────────────────────────────────────────────────────────────────── */
const INVENTORY_ITEMS = [
  { id:"INV-001", name:"Cotton Fabric",      category:"Fabric",      quantity:450,  unit:"meters", reorder:200,  usageRate:"45 m/day",      status:"optimal",  trend:"flat",  supplier:"Fabric Suppliers Co",    lastRestocked:"Mar 28, 2026" },
  { id:"INV-002", name:"Thread (Assorted)",  category:"Consumable",  quantity:180,  unit:"spools", reorder:250,  usageRate:"22 spools/day", status:"low",      trend:"down",  supplier:"Thread Masters",          lastRestocked:"Mar 25, 2026" },
  { id:"INV-003", name:"Denim Fabric",       category:"Fabric",      quantity:85,   unit:"meters", reorder:100,  usageRate:"8 m/day",       status:"critical", trend:"down",  supplier:"Fabric Suppliers Co",    lastRestocked:"Mar 20, 2026" },
  { id:"INV-004", name:"Buttons (Standard)", category:"Accessories", quantity:5000, unit:"pieces", reorder:2000, usageRate:"150 pcs/day",   status:"optimal",  trend:"flat",  supplier:"Hardware Supplies Inc",  lastRestocked:"Mar 30, 2026" },
  { id:"INV-005", name:"Zippers",            category:"Accessories", quantity:850,  unit:"pieces", reorder:400,  usageRate:"35 pcs/day",    status:"optimal",  trend:"flat",  supplier:"Hardware Supplies Inc",  lastRestocked:"Mar 28, 2026" },
  { id:"INV-006", name:"Fabric Dye",         category:"Consumable",  quantity:125,  unit:"liters", reorder:150,  usageRate:"6 L/day",       status:"low",      trend:"flat",  supplier:"Dye Solutions",          lastRestocked:"Mar 22, 2026" },
  { id:"INV-007", name:"Silk Fabric",        category:"Fabric",      quantity:320,  unit:"meters", reorder:80,   usageRate:"12 m/day",      status:"excess",   trend:"up",    supplier:"Premium Textiles Ltd",   lastRestocked:"Mar 15, 2026" },
  { id:"INV-008", name:"Labels & Tags",      category:"Accessories", quantity:3200, unit:"pieces", reorder:1500, usageRate:"120 pcs/day",   status:"optimal",  trend:"flat",  supplier:"Branding Solutions",     lastRestocked:"Mar 29, 2026" },
];

const SUPPLIERS = [
  { name:"Fabric Suppliers Co",   items:2, lastRestocked:"Mar 28, 2026" },
  { name:"Thread Masters",        items:1, lastRestocked:"Mar 25, 2026" },
  { name:"Hardware Supplies Inc", items:2, lastRestocked:"Mar 30, 2026" },
  { name:"Dye Solutions",         items:1, lastRestocked:"Mar 22, 2026" },
  { name:"Premium Textiles Ltd",  items:1, lastRestocked:"Mar 15, 2026" },
  { name:"Branding Solutions",    items:1, lastRestocked:"Mar 29, 2026" },
];

const AI_SUGGESTIONS = [
  { item:"Thread (Assorted)", note:"Low stock predicted next 7 days. Recommend ordering 500 spools.",    urgency:"medium" },
  { item:"Denim Fabric",      note:"Critical stock level. Urgent restock recommended within 2 days.",    urgency:"high"   },
  { item:"Fabric Dye",        note:"Usage rate stable. Schedule restock in 15 days.",                    urgency:"low"    },
];

const USAGE_TREND = [
  { month:"Oct", fabric:1250, thread:520, dye:80 },
  { month:"Nov", fabric:1300, thread:490, dye:95 },
  { month:"Dec", fabric:1280, thread:510, dye:75 },
  { month:"Jan", fabric:1350, thread:530, dye:100 },
  { month:"Feb", fabric:1420, thread:560, dye:90 },
  { month:"Mar", fabric:1500, thread:580, dye:85 },
];

/* ── HELPERS ──────────────────────────────────────────────────────────────── */
const STATUS_STYLE = {
  optimal:  "bg-green-100 text-green-700",
  low:      "bg-yellow-100 text-yellow-700",
  critical: "bg-red-100 text-red-700",
  excess:   "bg-blue-100 text-blue-700",
};

function TrendIcon({ trend }) {
  if (trend === "up")   return <RiArrowUpLine className="w-4 h-4 text-green-500" />;
  if (trend === "down") return <RiArrowDownLine className="w-4 h-4 text-red-500" />;
  return <span className="text-gray-300 font-bold text-sm">—</span>;
}

function stockPct(qty, reorder) {
  const ratio = qty / reorder;
  if (ratio >= 2) return { pct: 100, color: "bg-blue-400" };
  if (ratio >= 1) return { pct: Math.min(100, (ratio - 1) * 100), color: "bg-green-400" };
  return { pct: Math.min(100, ratio * 100), color: qty / reorder < 0.9 ? "bg-red-400" : "bg-yellow-400" };
}

/* ── COMPONENT ────────────────────────────────────────────────────────────── */
export default function Inventory() {
  const [search,         setSearch]         = useState("");
  const [statusFilter,   setStatusFilter]   = useState("All Status");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");
  const [sortBy,         setSortBy]         = useState("Item Name");
  const [selected,       setSelected]       = useState(null);

  const supplierList = ["All Suppliers", ...SUPPLIERS.map(s => s.name)];

  const filtered = INVENTORY_ITEMS
    .filter(item => {
      const q            = search.toLowerCase();
      const matchSearch   = !q || item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      const matchStatus   = statusFilter   === "All Status"   || item.status   === statusFilter.toLowerCase();
      const matchSupplier = supplierFilter === "All Suppliers" || item.supplier === supplierFilter;
      return matchSearch && matchStatus && matchSupplier;
    })
    .sort((a, b) => {
      if (sortBy === "Quantity") return b.quantity - a.quantity;
      if (sortBy === "Status")   return a.status.localeCompare(b.status);
      return a.name.localeCompare(b.name);
    });

  const stockAlerts   = INVENTORY_ITEMS.filter(i => i.status === "low" || i.status === "critical");
  const criticalCount = INVENTORY_ITEMS.filter(i => i.status === "critical").length;
  const lowCount      = INVENTORY_ITEMS.filter(i => i.status === "low").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
        {[
          { label:"Total Items",      value:INVENTORY_ITEMS.length, suffix:"",     color:"text-slate-900",   bg:"bg-slate-100",   icon:RiArchiveLine  },
          { label:"Critical Stock",   value:criticalCount,           suffix:"items",color:"text-red-600",    bg:"bg-red-100",    icon:RiAlertLine    },
          { label:"Low Stock",        value:lowCount,                suffix:"items",color:"text-amber-600", bg:"bg-amber-100", icon:RiAlertLine    },
          { label:"Inventory Value",  value:"₹18.2K",                suffix:"",     color:"text-emerald-600", bg:"bg-emerald-100", icon:RiArrowUpLine  },
        ].map(k => (
          <div key={k.label} className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm font-medium">{k.label}</p>
            <div className="flex items-center justify-between mt-1">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.bg}`}>
                <k.icon className={`w-5 h-5 ${k.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center border border-slate-200 rounded-xl px-4 py-2 bg-white gap-2 shadow-sm">
          <RiSearchLine className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search items by name or ID..."
            className="outline-none w-full bg-transparent text-sm" />
          {search && <button onClick={() => setSearch("")}><RiCloseLine className="text-gray-400 w-4 h-4" /></button>}
        </div>
        <div className="flex gap-3">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm outline-none">
            {["All Status","Optimal","Low","Critical","Excess"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={supplierFilter} onChange={e => setSupplierFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm outline-none">
            {supplierList.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm outline-none">
            {["Item Name","Quantity","Status"].map(s => <option key={s} value={s}>Sort: {s}</option>)}
          </select>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 w-full md:w-auto shadow-sm transition-all">
          <RiAddLine className="w-5 h-5" /> Add Item
        </button>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Stock Inventory</h2>
        </div>
        {/* HEADER */}
        <div className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.5fr] px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Item Details</span><span>Quantity / Stock</span><span>Usage Rate</span><span>Status</span><span className="text-center">Trend</span>
        </div>
        {/* ROWS */}
        <div className="divide-y divide-slate-50">
          {filtered.map(item => {
            const { pct, color } = stockPct(item.quantity, item.reorder);
            return (
              <div key={item.id} onClick={() => setSelected(item)}
                className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.5fr] px-5 py-4 items-center cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.id} · {item.category}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{item.quantity.toLocaleString()} {item.unit}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Reorder: {item.reorder}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-500 font-medium">{item.usageRate}</span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tight w-fit ${STATUS_STYLE[item.status]}`}>{item.status}</span>
                <div className="flex items-center justify-center"><TrendIcon trend={item.trend} /></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STOCK ALERTS + AI SUGGESTIONS SIDE BY SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* STOCK ALERTS */}
        <div>
          <h2 className="font-bold text-slate-800 mb-3 ml-1">Critical Alerts</h2>
          <div className="space-y-3">
            {stockAlerts.map(item => (
              <div key={item.id}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 ${item.status === "critical" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.status === "critical" ? "bg-red-200" : "bg-amber-200"}`}>
                  <RiAlertLine className={`w-5 h-5 ${item.status === "critical" ? "text-red-700" : "text-amber-700"}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${item.status === "critical" ? "text-red-900" : "text-amber-900"}`}>{item.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Current: <span className="font-bold">{item.quantity} {item.unit}</span> · Min: {item.reorder}
                  </p>
                </div>
                <button className={`text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all ${item.status === "critical" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"}`}>
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI SUGGESTIONS */}
        <div>
          <h2 className="font-bold text-slate-800 mb-3 ml-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center shadow-lg"><RiFlashlightLine className="text-white w-3.5 h-3.5" /></span>
            AI Insights
          </h2>
          <div className="space-y-3">
            {AI_SUGGESTIONS.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-green-400 transition-colors">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-full -mr-8 -mt-8 group-hover:bg-green-500/10 transition-colors" />
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{s.item}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.note}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${s.urgency === "high" ? "bg-red-100 text-red-600" : s.urgency === "medium" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"}`}>
                    {s.urgency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* USAGE TREND CHART */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-800 mb-6">Usage Analytics</h2>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={USAGE_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis   tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ fontSize: 12, fontWeight: 600, borderRadius: 12, border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                itemStyle={{ padding: "2px 0" }}
              />
              <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 20 }} iconType="circle" />
              <Line type="monotone" dataKey="fabric" name="Fabric" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: "#22c55e" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="thread" name="Thread" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="dye"    name="Dye"    stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: "#f59e0b" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SUPPLIER SUMMARY */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-slate-800 mb-5">Trusted Suppliers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SUPPLIERS.map(s => (
            <div key={s.name} className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-green-300 hover:bg-white cursor-pointer transition-all hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <RiBuildingLine className="w-5 h-5 text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate">{s.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{s.items} item{s.items > 1 ? "s" : ""}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Last: {s.lastRestocked}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ITEM DETAIL SIDEBAR */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelected(null)} />
          <div className="fixed top-0 right-0 h-full w-[460px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
            style={{ animation: "slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>

            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                <p className="text-xs text-slate-400 font-bold tracking-widest mt-0.5">{selected.id} · {selected.category.toUpperCase()}</p>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center transition-colors">
                <RiCloseLine className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollbarWidth: "none" }}>

              {/* STATUS & CATEGORY */}
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLE[selected.status]}`}>
                  {selected.status}
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <RiArchiveLine className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">{selected.category}</span>
                </div>
              </div>

              {/* STOCK LEVEL CARD */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Real-time Stock Level</p>
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-4xl font-black">{selected.quantity.toLocaleString()}</h3>
                  <p className="text-lg font-bold text-slate-400">{selected.unit}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${stockPct(selected.quantity, selected.reorder).color}`}
                      style={{ width: `${Math.min(100, (selected.quantity / (selected.reorder * 2)) * 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Critical: {selected.reorder}</span>
                    <span>Target: {selected.reorder * 2}</span>
                  </div>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:"Daily Usage",    value:selected.usageRate, icon:RiArrowUpLine },
                  { label:"Stock Trend",     value:selected.trend === "up" ? "Increasing" : selected.trend === "down" ? "Decreasing" : "Stable", color: selected.trend === "up" ? "text-green-500" : selected.trend === "down" ? "text-red-500" : "text-slate-600" },
                  { label:"Primary Supplier",value:selected.supplier },
                  { label:"Last Restocked",  value:selected.lastRestocked },
                ].map(d => (
                  <div key={d.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all hover:border-slate-200">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-2">{d.label}</p>
                    <p className={`text-sm font-bold ${d.color || "text-slate-900"}`}>{d.value}</p>
                  </div>
                ))}
              </div>

              {/* SMART INSIGHT (IF CRITICAL/LOW) */}
              {(selected.status === "critical" || selected.status === "low") && (
                <div className={`p-5 rounded-2xl border-2 shadow-sm ${selected.status === "critical" ? "bg-red-50 border-red-100 text-red-900" : "bg-amber-50 border-amber-100 text-amber-900"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selected.status === "critical" ? "bg-red-200" : "bg-amber-200"}`}>
                      <RiAlertLine className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-tight">AI Stock Warning</p>
                  </div>
                  <p className="text-xs font-medium leading-relaxed opacity-80">
                    Current stock level is <span className="font-bold underline">{Math.round((selected.quantity / selected.reorder) * 100)}%</span> of the safety threshold. Production line may stall in <span className="font-bold">~3 days</span> if not restocked immediately.
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-6 border-t border-slate-100 bg-white space-y-3 shrink-0">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-green-500/20 transition-all active:scale-[0.98]">
                Place Order with {selected.supplier.split(' ')[0]}
              </button>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-all">
                Edit Item Parameters
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}