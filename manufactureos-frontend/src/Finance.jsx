import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { RiDownloadLine, RiArrowUpLine, RiArrowDownLine, RiBuildingLine } from 'react-icons/ri';

export default function Finance() {
  const [viewMode, setViewMode] = useState("monthly");
  const [selectedExpense, setSelectedExpense] = useState(null);

  const formatCurrency = (value) => {
    if (value >= 100000) return `₹${+(value / 100000).toFixed(2)}L`;
    if (value >= 1000) return `₹${+(value / 1000).toFixed(2)}K`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const kpis = [
    { title: "Total Revenue (YTD)", value: "₹4.82L", change: "+12.5%" },
    { title: "Recievables collected", value: "₹3.94L", change: "+8.2%" },
    { title: "Payables due", value: "₹87K", change: "-5.3%" },
    { title: "Receivables Pending", value: "₹45K", change: "-2.1%" },
    { title: "Profit (YTD)", value: "₹1.41L", change: "+15.2%" }
  ];

  const payments = [
    { client: "Fashion Hub Inc", order: "ORD-2401", orderValue: "₹18.5K", amount: "₹18.5K", status: "Paid" },
    { client: "StyleCraft Ltd", order: "ORD-2402", orderValue: "₹25K", amount: "₹12.3K", status: "Partial" },
    { client: "Urban Threads", order: "ORD-2403", orderValue: "₹22.8K", amount: "₹22.8K", status: "Paid" },
    { client: "Textile Masters", order: "ORD-2404", orderValue: "₹8.9K", amount: "₹8.9K", status: "Pending" },
    { client: "Fashion Hub Inc", order: "ORD-2405", orderValue: "₹15.2K", amount: "₹15.2K", status: "Paid" },
    { client: "Modern Apparel", order: "ORD-2406", orderValue: "₹35K", amount: "₹19.5K", status: "Partial" },
    { client: "StyleCraft Ltd", order: "ORD-2407", orderValue: "₹11.7K", amount: "₹11.7K", status: "Pending" }
  ];

  const cashAllocation = [
    { name: "Production", value: 210000 },
    { name: "Salaries", value: 120000 },
    { name: "Overheads", value: 82000 },
    { name: "Procurement", value: 45000 },
  ];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const monthlyData = [
    { name: "Jan", Revenue: 85000, Cost: 62000 },
    { name: "Feb", Revenue: 92000, Cost: 70000 },
    { name: "Mar", Revenue: 75000, Cost: 58000 },
    { name: "Apr", Revenue: 95000, Cost: 72000 },
    { name: "May", Revenue: 88000, Cost: 65000 },
    { name: "Jun", Revenue: 105000, Cost: 78000 },
  ];

  const quarterlyData = [
    { name: "Q1", Revenue: 252000, Cost: 190000 },
    { name: "Q2", Revenue: 288000, Cost: 215000 },
  ];

  const topProfitOrders = [
    { id: "ORD-2401", client: "Fashion Hub", profit: "+₹5.2K" },
    { id: "ORD-2399", client: "Urban Threads", profit: "+₹4.8K" },
    { id: "ORD-2406", client: "Modern Apparel", profit: "+₹3.6K" },
    { id: "ORD-2385", client: "StyleCraft", profit: "+₹2.9K" },
    { id: "ORD-2372", client: "Textile Masters", profit: "+₹2.1K" }
  ];

  const topLossOrders = [
    { id: "ORD-2391", client: "Beta Brand", loss: "-₹1.8K" },
    { id: "ORD-2384", client: "Local Retail", loss: "-₹1.2K" },
    { id: "ORD-2342", client: "Quick Fashion", loss: "-₹850" },
    { id: "ORD-2311", client: "Street Wear", loss: "-₹600" },
    { id: "ORD-2298", client: "Active Gear", loss: "-₹420" }
  ];

  const vendorDues = {
    total: "₹87K",
    breakdown: [
      { vendor: "Global Fabrics Ltd", amount: "₹42K", status: "Overdue" },
      { vendor: "Swift Logistics", amount: "₹25K", status: "Due soon" },
      { vendor: "Eco Packaging", amount: "₹20K", status: "Due in 30d" }
    ]
  };

  const expenses = [
    { 
      category: "Raw Materials", amount: "₹1.20L", change: "+15.2%",
      details: [ { desc: "Steel Sheets", amount: "₹60K" }, { desc: "Aluminum Extrusion", amount: "₹45K" }, { desc: "Fabric & Thread", amount: "₹15K" } ]
    },
    { 
      category: "Factory Rent", amount: "₹85K", change: "0.0%",
      details: [ { desc: "Main Unit Shed A", amount: "₹50K" }, { desc: "Warehouse B", amount: "₹35K" } ]
    },
    { 
      category: "Electricity & Utilities", amount: "₹42K", change: "+5.1%",
       details: [ { desc: "Heavy Machinery Power", amount: "₹28K" }, { desc: "HVAC & Lighting", amount: "₹10K" }, { desc: "Water & Waste", amount: "₹4K" } ]
    },
    { 
      category: "Salaries (Production)", amount: "₹1.50L", change: "+2.4%",
      details: [ { desc: "Machine Operators (12)", amount: "₹90K" }, { desc: "Floor Supervisors (3)", amount: "₹40K" }, { desc: "Support Staff (4)", amount: "₹20K" } ]
    },
    { 
      category: "Logistics & Shipping", amount: "₹28K", change: "-3.2%",
      details: [ { desc: "Outbound Freight", amount: "₹18K" }, { desc: "Local Transports", amount: "₹7K" }, { desc: "Packaging Supp.", amount: "₹3K" } ]
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>

      {/* QUICK ACTIONS / AI PROMPTS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="bg-slate-800 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-slate-700 transition-colors shadow-sm">
          Generate Balance Sheet
        </button>
        <button className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-amber-200 transition-colors shadow-sm flex items-center">
          What needs attention ⚠️
        </button>
        <button className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-100 transition-colors shadow-sm">
          Cash outlook (30 days)
        </button>
        <button className="bg-rose-50 text-rose-700 border border-rose-100 px-4 py-2 rounded-full font-medium text-sm hover:bg-rose-100 transition-colors shadow-sm">
          Where am I losing money?
        </button>
        <button className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-full font-medium text-sm hover:bg-emerald-100 transition-colors shadow-sm">
          Can I take more orders?
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500">{k.title}</p>
            <p className="text-xl font-bold mt-1">{k.value}</p>
            <p className="text-green-500 text-xs mt-1">{k.change}</p>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* TABLE */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-4 text-lg">Client Payments</h2>

          <div className="divide-y text-sm overflow-x-auto pb-4">
            <div className="min-w-[700px]">
              {/* TABLE HEADINGS */}
              <div className="grid grid-cols-6 py-3 items-center font-bold text-gray-400 text-xs uppercase tracking-wider">
                <p>Client</p>
                <p>Order ID</p>
                <p>Order Value</p>
                <p>Amount</p>
                <p>Status</p>
                <p>Invoice</p>
              </div>

              {payments.map((p, i) => (
                <div key={i} className="grid grid-cols-6 py-3 items-center hover:bg-slate-50 transition-colors px-2 -mx-2 rounded-lg">
                  <p className="font-medium text-slate-800">{p.client}</p>
                  <p className="text-gray-500 font-medium">{p.order}</p>
                  <p className="text-slate-600 font-medium">{p.orderValue}</p>
                  <p className="font-semibold">{p.amount}</p>

                  <span className={`text-xs px-2.5 py-1 rounded-md w-fit font-bold
                    ${p.status === "Paid" ? "bg-emerald-100 text-emerald-700" : ""}
                    ${p.status === "Partial" ? "bg-amber-100 text-amber-700" : ""}
                    ${p.status === "Pending" ? "bg-rose-100 text-rose-700" : ""}
                  `}>
                    {p.status}
                  </span>

                  <button 
                    onClick={() => alert(`Downloading invoice for ${p.order}...`)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Download Invoice"
                  >
                    <RiDownloadLine className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CASH ALLOCATION CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full">
          <h2 className="font-semibold mb-4 text-lg">Cash Allocation</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cashAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cashAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* COMBINED LAYER: REVENUE VS COST & EXPENSES */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* REVENUE VS COST CHART */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-lg">Revenue vs Cost ({viewMode === "monthly" ? "Monthly" : "Quarterly"})</h2>
              <p className="text-sm text-emerald-600 font-medium mt-1 bg-emerald-50 px-2 py-1 rounded w-fit">
                Trend Insight: Revenue is growing faster (+6.2% MoM) than costs (+4.1% MoM).
              </p>
            </div>
            <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
              <button 
                onClick={() => setViewMode("monthly")}
                className={`px-4 py-1.5 rounded-md transition-colors ${viewMode === "monthly" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setViewMode("quarterly")}
                className={`px-4 py-1.5 rounded-md transition-colors ${viewMode === "quarterly" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
              >
                Quarterly
              </button>
            </div>
          </div>

          <div className="flex-1 mt-2 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewMode === "monthly" ? monthlyData : quarterlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} tickFormatter={(val) => formatCurrency(val)} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(value) => formatCurrency(value)} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="Revenue" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Cost" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LAYER 5: EXPENSE SHEET */}
        <div className="col-span-1 bg-white p-6 rounded-xl shadow-sm flex flex-col">
          <h2 className="font-semibold mb-4 text-lg">Expense Sheet</h2>
          <div className="divide-y text-sm flex-1 overflow-x-auto pb-4">
            <div className="min-w-[400px]">
              <div className="grid grid-cols-4 py-3 items-center font-bold text-gray-400 text-xs uppercase tracking-wider">
                <p className="col-span-2">Expense</p>
                <p>Amount</p>
                <p className="text-right">MoM</p>
              </div>
              {expenses.map((exp, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedExpense(exp)}
                  className="grid grid-cols-4 py-3 items-center hover:bg-slate-50 transition-colors px-2 -mx-2 rounded-lg cursor-pointer"
                >
                  <p className="col-span-2 font-medium text-slate-800 pr-2 truncate" title={exp.category}>{exp.category}</p>
                  <p className="font-semibold text-slate-700">{exp.amount}</p>
                  <p className={`text-right font-medium ${exp.change.startsWith('+') ? 'text-emerald-500' : exp.change.startsWith('-') ? 'text-rose-500' : 'text-slate-500'}`}>
                    {exp.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-4 w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-medium py-2 rounded-lg transition-colors text-sm">
            View More
          </button>
        </div>

      </div>

      {/* LAYER 4: 3 OUTPUTS / KPI CARDS */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Top 5 Profit */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
          <h2 className="font-semibold mb-4 text-emerald-700 flex items-center">
            <span className="bg-emerald-100 p-1.5 rounded-lg mr-2">
              <RiArrowUpLine className="w-4 h-4" />
            </span>
            Top 5 Profit Orders
          </h2>
          <div className="flex-1 flex flex-col space-y-3">
            {topProfitOrders.map((order, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-800">{order.id}</p>
                  <p className="text-xs text-slate-500">{order.client}</p>
                </div>
                <p className="font-bold text-emerald-600">{order.profit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Top 5 Loss */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
          <h2 className="font-semibold mb-4 text-rose-700 flex items-center">
            <span className="bg-rose-100 p-1.5 rounded-lg mr-2">
              <RiArrowDownLine className="w-4 h-4" />
            </span>
            Top 5 Loss Orders
          </h2>
          <div className="flex-1 flex flex-col space-y-3">
            {topLossOrders.map((order, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-800">{order.id}</p>
                  <p className="text-xs text-slate-500">{order.client}</p>
                </div>
                <p className="font-bold text-rose-600">{order.loss}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Vendor Dues */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
          <h2 className="font-semibold mb-2 text-slate-800 flex items-center">
            <span className="bg-slate-100 p-1.5 rounded-lg mr-2">
              <RiBuildingLine className="w-4 h-4" />
            </span>
            Vendor Dues KPI
          </h2>
          <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Total Outstanding</p>
              <p className="text-2xl font-bold text-slate-800">{vendorDues.total}</p>
            </div>
            <p className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">Action Needed</p>
          </div>
          <div className="flex-1 flex flex-col space-y-3 mt-1">
            {vendorDues.breakdown.map((due, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-700">{due.vendor}</p>
                  <p className={`text-xs font-medium mt-0.5 ${due.status === 'Overdue' ? 'text-rose-500' : 'text-amber-500'}`}>
                     {due.status}
                  </p>
                </div>
                <p className="font-bold text-slate-800">{due.amount}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* EXPENSE MODAL */}
      {selectedExpense && (
        <div 
          onClick={() => setSelectedExpense(null)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden relative border border-slate-100"
          >
            <button 
              onClick={() => setSelectedExpense(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{selectedExpense.category}</h2>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-xl font-semibold text-slate-600">{selectedExpense.amount}</p>
                <p className={`text-sm font-medium px-2 py-0.5 rounded ${selectedExpense.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : selectedExpense.change.startsWith('-') ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                  {selectedExpense.change} MoM
                </p>
              </div>

              <h3 className="font-semibold text-sm text-slate-400 uppercase tracking-wider mb-3">Recent Transactions</h3>
              <div className="space-y-3">
                {selectedExpense.details.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">{detail.desc}</p>
                    </div>
                    <p className="font-semibold text-slate-700">{detail.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedExpense(null)} 
                className="px-5 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}