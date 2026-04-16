import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { RiDownloadLine, RiArrowUpLine, RiArrowDownLine, RiBuildingLine, RiSearchLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { FINANCE_DATA } from './data';

export default function Finance() {
  const [viewMode, setViewMode] = useState("monthly");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const showNotification = (msg) => {
    if (msg.toLowerCase().includes('executing') || msg.toLowerCase().includes('initiating')) {
      toast.success(msg);
    } else {
      toast(msg);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 100000) return `₹${+(value / 100000).toFixed(2)}L`;
    if (value >= 1000) return `₹${+(value / 1000).toFixed(2)}K`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const filteredPayments = FINANCE_DATA.payments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.client.toLowerCase().includes(q) || p.order.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  const monthlyData = [
    { name: "Jan", Revenue: 85000,  Cost: 62000 },
    { name: "Feb", Revenue: 92000,  Cost: 70000 },
    { name: "Mar", Revenue: 75000,  Cost: 58000 },
    { name: "Apr", Revenue: 95000,  Cost: 72000 },
    { name: "May", Revenue: 88000,  Cost: 65000 },
    { name: "Jun", Revenue: 105000, Cost: 78000 },
  ];
  const quarterlyData = [
    { name: "Q1", Revenue: 252000, Cost: 190000 },
    { name: "Q2", Revenue: 288000, Cost: 215000 },
  ];

  const topProfitOrders = [
    { id: "ORD-2401", client: "Fashion Hub",     profit: "+₹5.2K" },
    { id: "ORD-2399", client: "Urban Threads",   profit: "+₹4.8K" },
    { id: "ORD-2406", client: "Modern Apparel",  profit: "+₹3.6K" },
    { id: "ORD-2385", client: "StyleCraft",      profit: "+₹2.9K" },
    { id: "ORD-2372", client: "Textile Masters", profit: "+₹2.1K" },
  ];
  const topLossOrders = [
    { id: "ORD-2391", client: "Beta Brand",    loss: "-₹1.8K" },
    { id: "ORD-2384", client: "Local Retail",  loss: "-₹1.2K" },
    { id: "ORD-2342", client: "Quick Fashion", loss: "-₹850"  },
    { id: "ORD-2311", client: "Street Wear",   loss: "-₹600"  },
    { id: "ORD-2298", client: "Active Gear",   loss: "-₹420"  },
  ];

  const statusStyle = {
    Paid:    "bg-green-100 text-green-600",
    Partial: "bg-yellow-100 text-yellow-700",
    Pending: "bg-red-100 text-red-600",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center border rounded-lg px-4 py-2 bg-white gap-2">
          <RiSearchLine className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="outline-none w-full bg-transparent text-sm"
            placeholder="Search by client or order ID..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Pending">Pending</option>
        </select>
        <button 
          onClick={() => showNotification("Initiating Payment Record form...")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm w-full md:w-auto active:scale-95 transition-all"
        >
          + Record Payment
        </button>
      </div>

      {/* QUICK AI PROMPTS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: "Generate Balance Sheet", cls: "bg-gray-800 text-white" },
          { label: "What needs attention ⚠️", cls: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
          { label: "Cash outlook (30 days)",  cls: "bg-gray-100 text-gray-700 border border-gray-200" },
          { label: "Where am i losing money?",cls: "bg-red-100 text-red-700 border border-red-200" },
          { label: "Can i take more orders?", cls: "bg-green-100 text-green-700 border border-green-200" },
        ].map(b => (
          <button 
            key={b.label} 
            onClick={() => showNotification(`Executing: ${b.label}`)}
            className={`${b.cls} px-4 py-2 rounded-lg text-xs font-medium transition-all active:scale-95`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {FINANCE_DATA.kpis.map((k, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500">{k.title}</p>
            <p className="text-xl font-bold mt-1">{k.value}</p>
            <p className={`text-xs mt-1 font-medium ${k.up ? "text-green-500" : "text-red-500"}`}>{k.change}</p>
          </div>
        ))}
      </div>

      {/* PAYMENTS TABLE + PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* TABLE */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold mb-4">Client Payments</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <p>Client</p><p>Order</p><p>Value</p><p>Amount</p><p>Status</p><p>Invoice</p>
              </div>
              {filteredPayments.map((p, i) => (
                <div key={i} className="grid grid-cols-6 py-3 text-sm items-center border-b border-gray-50 hover:bg-gray-50">
                  <p className="font-medium text-gray-800">{p.client}</p>
                  <p className="text-gray-500">{p.order}</p>
                  <p className="text-gray-600">{p.orderValue}</p>
                  <p className="font-semibold">{p.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded font-medium w-fit ${statusStyle[p.status]}`}>
                    {p.status}
                  </span>
                  <button
                    onClick={() => showNotification(`Downloading invoice for ${p.order}...`)}
                    className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 active:scale-90 transition-all"
                  >
                    <RiDownloadLine className="text-gray-500 text-sm" />
                  </button>
                </div>
              ))}
              {filteredPayments.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-8">No results found</p>
              )}
            </div>
          </div>
        </div>

        {/* PIE */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold mb-4">Cash Allocation</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={FINANCE_DATA.cashAllocation} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                  {FINANCE_DATA.cashAllocation.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => formatCurrency(v)} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* REVENUE VS COST + EXPENSE SHEET */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* BAR CHART */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Revenue vs Cost</h2>
              <p className="text-xs text-green-600 mt-1">↑ Revenue growing faster (+6.2% MoM) than costs (+4.1% MoM)</p>
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden text-xs">
              {["monthly","quarterly"].map(m => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`px-3 py-1.5 capitalize font-medium transition-colors ${viewMode === m ? "bg-green-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewMode === "monthly" ? monthlyData : quarterlyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => formatCurrency(v)} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: 'none' }} formatter={v => formatCurrency(v)} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: 12 }} />
                <Bar dataKey="Revenue" fill="#22c55e" radius={[3, 3, 0, 0]} maxBarSize={36} />
                <Bar dataKey="Cost"    fill="#ef4444" radius={[3, 3, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* EXPENSE SHEET */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold mb-4">Expense Sheet</h2>
          <div className="divide-y divide-gray-50">
            <div className="grid grid-cols-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <p className="col-span-2">Category</p><p>Amount</p><p className="text-right">MoM</p>
            </div>
            {FINANCE_DATA.expenses.map((exp, i) => (
              <div
                key={i}
                onClick={() => setSelectedExpense(exp)}
                className="grid grid-cols-4 py-3 text-sm items-center cursor-pointer hover:bg-gray-50 rounded"
              >
                <p className="col-span-2 font-medium text-gray-800 truncate pr-2 text-xs">{exp.category}</p>
                <p className="font-semibold text-gray-700 text-xs">{exp.amount}</p>
                <p className={`text-right text-xs font-medium ${exp.change.startsWith('+') ? 'text-green-500' : exp.change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
                  {exp.change}
                </p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => showNotification("Loading all expense records...")}
            className="mt-4 w-full bg-gray-100 text-gray-600 text-xs py-2 rounded-lg hover:bg-gray-200 active:scale-95 transition-all"
          >
            View All Expenses
          </button>
        </div>
      </div>

      {/* BOTTOM ROW: PROFIT / LOSS / VENDOR DUES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* TOP PROFIT */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2 text-green-700">
            <span className="bg-green-100 p-1 rounded"><RiArrowUpLine /></span>
            Top 5 Profit Orders
          </h2>
          <div className="space-y-3">
            {topProfitOrders.map((o, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{o.id}</p>
                  <p className="text-xs text-gray-400">{o.client}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-semibold">{o.profit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP LOSS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2 text-red-700">
            <span className="bg-red-100 p-1 rounded"><RiArrowDownLine /></span>
            Top 5 Loss Orders
          </h2>
          <div className="space-y-3">
            {topLossOrders.map((o, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{o.id}</p>
                  <p className="text-xs text-gray-400">{o.client}</p>
                </div>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-semibold">{o.loss}</span>
              </div>
            ))}
          </div>
        </div>

        {/* VENDOR DUES */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <span className="bg-gray-100 p-1 rounded"><RiBuildingLine /></span>
            Vendor Dues
          </h2>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-gray-500">Total Outstanding</p>
              <p className="text-2xl font-bold">{FINANCE_DATA.vendorDues.total}</p>
            </div>
            <button 
              onClick={() => showNotification("Opening Vendor Payment priority list...")}
              className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-semibold active:scale-95 transition-all"
            >
              Action Needed
            </button>
          </div>
          <div className="space-y-3">
            {FINANCE_DATA.vendorDues.breakdown.map((d, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                <div>
                  <p className="font-medium text-gray-700 text-xs">{d.vendor}</p>
                  <p className={`text-xs mt-0.5 font-medium ${d.status === 'Overdue' ? 'text-red-500' : 'text-yellow-600'}`}>{d.status}</p>
                </div>
                <p className="font-bold text-gray-800 text-sm">{d.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXPENSE MODAL */}
      {selectedExpense && (
        <div
          onClick={() => setSelectedExpense(null)}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-xl w-[420px] shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{selectedExpense.category}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xl font-semibold">{selectedExpense.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${selectedExpense.change.startsWith('+') ? 'bg-green-100 text-green-600' : selectedExpense.change.startsWith('-') ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                      {selectedExpense.change} MoM
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedExpense(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Breakdown</p>
              <div className="space-y-2">
                {selectedExpense.details.map((d, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-sm text-gray-700 font-medium">{d.desc}</p>
                    <p className="text-sm font-semibold">{d.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 pb-5">
              <button onClick={() => setSelectedExpense(null)} className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}