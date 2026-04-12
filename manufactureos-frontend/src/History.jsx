import { useState } from "react";
import { RiWhatsappLine, RiPhoneLine, RiCloseLine, RiRepeatLine, RiCalendarLine, RiPhoneFill, RiSettingsLine, RiFireLine, RiScissorsLine, RiMoneyDollarCircleLine, RiRocketLine, RiChatQuoteLine, RiBuildingLine, RiSearchLine, RiEyeLine, RiDownload2Line, RiMapPin2Line, RiAlertLine, RiCheckLine } from "react-icons/ri";

const CLIENTS = [
  {
    id: "CLT-001",
    name: "Fashion Hub Inc.",
    avatar: "FH",
    avatarColor: "#4F46E5",
    specialty: "High-Volume Apparel",
    rating: 4.8,
    orderFrequency: "Weekly",
    totalOrders: 142,
    totalRevenue: "₹24.5L",
    pendingPayments: "₹45,000",
    status: "active",
    contact: {
      phone: "+91 98765 43210",
      email: "procurement@fashionhub.com",
      address: "B-42, Okhla Phase III, New Delhi, 110020",
      location: "https://maps.google.com/?q=Okhla+Phase+III+Delhi"
    },
    orders: [
      { 
        id: "ORD-2401", 
        status: "Delivered", 
        amount: "₹85,000", 
        date: "Apr 2, 2026",
        invoiceDate: "Mar 30, 2026",
        invoiceId: "INV-2401",
        timeline: "Jan 15 - Feb 20, 2026",
        complexity: "Medium",
        priority: "High",
        fabric: "Premium Cotton (200 GSM)",
        rawMaterialCost: "₹32,400",
        stages: [
          { label: "Fabric Sourcing", status: "completed", date: "Jan 15", delay: null },
          { label: "Cutting", status: "completed", date: "Jan 22", delay: "2 days delay - Fabric delivery lag" },
          { label: "Stitching", status: "completed", date: "Feb 05", delay: null },
          { label: "Finishing", status: "completed", date: "Feb 15", delay: "1 day delay - Power outage" },
          { label: "QC & Dispatch", status: "completed", date: "Feb 20", delay: null },
        ],
        clientFeedback: "Excellent stitch quality, but delivery was tight on scheduled date.",
        companyFeedback: "Smooth collaboration, clear specs provided early.",
        paymentDates: ["Feb 22, 2026", "Mar 05, 2026"]
      },
      { 
        id: "ORD-2395", 
        status: "Delivered", 
        amount: "₹1,20,000", 
        date: "Mar 28, 2026",
        invoiceDate: "Mar 20, 2026",
        invoiceId: "INV-2395",
        timeline: "Jan 5 - Feb 10, 2026",
        complexity: "High",
        priority: "Medium",
        fabric: "Linen Blend (Soft)",
        rawMaterialCost: "₹58,000",
        stages: [
          { label: "Design Approval", status: "completed", date: "Jan 05", delay: null },
          { label: "Raw Sourcing", status: "completed", date: "Jan 12", delay: null },
          { label: "Bulk Production", status: "completed", date: "Feb 01", delay: "4 days delay - Machine repair" },
          { label: "QC Check", status: "completed", date: "Feb 08", delay: null },
          { label: "Dispatch", status: "completed", date: "Feb 10", delay: null },
        ],
        clientFeedback: "Perfect fit, our best selling line this month.",
        companyFeedback: "Higher complexity required specialized operators.",
        paymentDates: ["Feb 15, 2026"]
      },
    ],
    growth: "↑ 15% this qtr"
  },
  {
    id: "CLT-002",
    name: "StyleCraft Ltd",
    avatar: "SC",
    avatarColor: "#10B981",
    specialty: "Premium Retailers",
    rating: 4.5,
    orderFrequency: "Bi-Weekly",
    totalOrders: 68,
    totalRevenue: "₹12.8L",
    pendingPayments: "₹0",
    status: "active",
    contact: {
      phone: "+91 88221 10044",
      email: "contact@stylecraft.in",
      address: "Sector 63, Noida, Uttar Pradesh, 201301",
      location: "https://maps.google.com/?q=Sector+63+Noida"
    },
    orders: [
      { 
        id: "ORD-2398", 
        status: "Delivered", 
        amount: "₹42,000", 
        date: "Apr 5, 2026",
        invoiceDate: "Apr 2, 2026",
        invoiceId: "INV-2398",
        timeline: "Jan 10 - Feb 15, 2026",
        complexity: "Low",
        priority: "High",
        fabric: "Organic Jersey",
        rawMaterialCost: "₹15,200",
        stages: [
          { label: "Sourcing", status: "completed", date: "Jan 12", delay: null },
          { label: "Production", status: "completed", date: "Feb 10", delay: "3 days delay - Worker shortage" },
          { label: "Packaging", status: "completed", date: "Feb 15", delay: null },
        ],
        clientFeedback: "Packaging was a bit damaged but garments are fine.",
        companyFeedback: "Easy repeatable pattern, efficient run.",
        paymentDates: ["Feb 20, 2026"]
      },
    ],
    growth: "→ Stable"
  }
];

function OrderSidebar({ order, onClose }) {
    if (!order) return null;

    return (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px] transition-all" onClick={onClose} />
          <div className="fixed top-0 right-0 h-full w-[520px] max-w-full bg-slate-50 z-50 shadow-2xl flex flex-col overflow-hidden text-slate-800" style={{ animation: "slideInRight 0.3s ease-out" }}>
             <div className="bg-white border-b px-6 py-5 shrink-0 shadow-sm relative z-10">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{backgroundColor: order.avatarColor}}>{order.avatar}</div>
                      <div>
                         <h2 className="text-xl font-bold tracking-tight text-slate-900">{order.clientName}</h2>
                         <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{order.id} • {order.invoiceId}</p>
                      </div>
                   </div>
                   <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 font-bold"><RiCloseLine className="w-5 h-5" /></button>
                </div>
             </div>
             <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Frequency</p><p className="text-lg font-bold flex items-center gap-1"><RiRepeatLine className="text-slate-500" /> {order.orderFrequency}</p></div>
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-right"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Invoice Date</p><p className="text-lg font-bold flex items-center justify-end gap-1"><RiCalendarLine className="text-slate-500" /> {order.invoiceDate}</p></div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                   <div className="flex items-center gap-2 pb-2 border-b border-slate-100"><RiPhoneFill className="text-slate-500" /><h3 className="text-sm font-bold text-slate-800">Contact Details</h3></div>
                   <div className="grid grid-cols-1 gap-2 text-sm">
                      <p className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-bold underline text-indigo-600">{order.contact?.phone}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Timeline:</span> <span className="font-bold text-slate-700">{order.timeline}</span></p>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                       <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Complexity</p><p className="text-sm font-bold flex items-center gap-1"><RiSettingsLine className="text-slate-500" /> {order.complexity}</p></div>
                       <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Priority</p><p className={`text-sm font-bold flex items-center gap-1 ${order.priority === 'High' ? 'text-red-500' : 'text-blue-500'}`}><RiFireLine /> {order.priority}</p></div>
                   </div>
                   <div className="space-y-4 text-right">
                       <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Fabric Used</p><p className="text-sm font-bold flex items-center gap-1"><RiScissorsLine className="text-slate-500" /> {order.fabric}</p></div>
                       <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">RM Cost</p><p className="text-sm font-bold text-green-600 flex items-center gap-1"><RiMoneyDollarCircleLine /> {order.rawMaterialCost}</p></div>
                   </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative">
                   <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase flex items-center gap-2"><RiRocketLine className="text-slate-500" /> Vertical Production Pipeline</h3>
                   <div className="space-y-8 relative">
                      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                      {order.stages?.map((stage, idx) => (
                         <div key={idx} className="relative pl-8">
                            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10 ${stage.status === 'completed' ? 'bg-green-500' : 'bg-slate-200'}`}>
                                {stage.status === 'completed' && <RiCheckLine className="text-[10px] text-white" />}
                            </div>
                            <div className="flex justify-between items-start">
                               <div><p className="text-sm font-bold text-slate-800 leading-none">{stage.label}</p><p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{stage.date}</p></div>
                               {stage.delay && <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg px-2 py-1 text-[10px] font-bold flex items-center gap-1"><RiAlertLine className="shrink-0" /> {stage.delay}</div>}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100"><p className="text-[10px] text-blue-600 font-bold uppercase mb-2 flex items-center gap-1"><RiChatQuoteLine />Client Feedback</p><p className="text-sm italic text-slate-700">"{order.clientFeedback}"</p></div>
                   <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100"><p className="text-[10px] text-indigo-600 font-bold uppercase mb-2 flex items-center gap-1"><RiBuildingLine />Manufacturer Feedback</p><p className="text-sm text-slate-700">{order.companyFeedback}</p></div>
                </div>
                <div className="bg-green-50/30 p-5 rounded-2xl border border-green-100 mb-8">
                   <p className="text-[10px] text-green-700 font-bold uppercase mb-3 text-center flex items-center justify-center gap-1"><RiMoneyDollarCircleLine /> Payment Receipt Dates</p>
                   <div className="flex flex-wrap justify-center gap-2">
                       {order.paymentDates?.map((d, i) => (<span key={i} className="bg-white border border-green-200 text-green-600 px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1"><RiMoneyDollarCircleLine className="shrink-0" /> {d}</span>))}
                   </div>
                </div>
             </div>
          </div>
        </>
    );
}

function ClientSidebar({ client, onClose }) {
  if (!client) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col" style={{ animation: "slideInRight 0.3s ease" }}>
         <div className="flex items-center gap-4 p-6 border-b bg-gray-50 shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg" style={{ backgroundColor: client.avatarColor }}>{client.avatar}</div>
            <div className="flex-1 min-w-0"><h2 className="text-xl font-bold text-slate-800 truncate">{client.name}</h2><p className="text-gray-500 text-sm">{client.specialty} • {client.id}</p></div>
             <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 text-xl transition-colors"><RiCloseLine className="w-5 h-5" /></button>
         </div>
         <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Frequency</p><p className="text-lg font-bold text-indigo-600">{client.orderFrequency}</p></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Account Growth</p><p className="text-lg font-bold text-green-600">{client.growth}</p></div>
            </div>
            <div>
                 <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-2 flex items-center gap-1"><RiMapPin2Line className="text-slate-500" /> Office Identity</h3>
                <div className="space-y-3 text-sm text-gray-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <p className="flex"><span className="text-gray-400 w-20 shrink-0">Phone:</span> <span className="font-semibold text-slate-700">{client.contact?.phone}</span></p>
                    <p className="flex"><span className="text-gray-400 w-20 shrink-0">Email:</span> <span className="font-semibold text-slate-700 underline">{client.contact?.email}</span></p>
                    <p className="flex items-start"><span className="text-gray-400 w-20 shrink-0">Address:</span> <span className="font-medium text-slate-700 leading-relaxed">{client.contact?.address}</span></p>
                     <a href={client.contact?.location} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 w-full py-2 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-200 transition-colors"><RiMapPin2Line /> View on Map</a>
                </div>
            </div>
            <div>
                 <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-2 flex items-center gap-1"><RiCalendarLine className="text-slate-500" /> Order History</h3>
                <div className="space-y-2">
                    {client.orders?.map(o => (
                        <div key={o.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors">
                            <div><p className="font-bold text-sm text-slate-800">{o.id}</p><p className="text-[10px] text-gray-400 mt-0.5">{o.date}</p></div>
                            <div className="text-right"><p className="font-bold text-sm text-slate-700">{o.amount}</p><span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 rounded">{o.status}</span></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-2">
                <div className="grid grid-cols-2 gap-3 pb-8">
                      <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${client.contact?.phone?.replace(/\D/g, '')}`, '_blank'); }} className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"><RiWhatsappLine className="w-5 h-5" />WhatsApp</button>
                      <button onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${client.contact?.phone}`; }} className="bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"><RiPhoneLine className="w-5 h-5" /> Call</button>
                </div>
            </div>
         </div>
      </div>
    </>
  );
}

export default function History() {
  const [viewMode, setViewMode] = useState("orders");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState({ field: "id", direction: "desc" });

  const ALL_ORDERS = CLIENTS.flatMap(client => client.orders.map(order => ({ ...order, clientName: client.name, clientId: client.id, avatar: client.avatar, avatarColor: client.avatarColor, orderFrequency: client.orderFrequency, contact: client.contact })));

  const handleSort = (field) => { setSortBy(prev => ({ field, direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc" })); };

  const sortValue = (item, field) => {
    switch(field) {
      case "amount": return parseInt(item.amount.replace(/[^0-9]/g, ""));
      case "date": return new Date(item.date).getTime();
      default: return item[field]?.toLowerCase();
    }
  };

  const filteredItems = viewMode === "clients" 
    ? CLIENTS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase()))
    : ALL_ORDERS.filter(o => o.id.toLowerCase().includes(query.toLowerCase()) || o.clientName.toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
          const valA = sortValue(a, sortBy.field); const valB = sortValue(b, sortBy.field);
          if (valA < valB) return sortBy.direction === "asc" ? -1 : 1;
          if (valA > valB) return sortBy.direction === "asc" ? 1 : -1;
          return 0;
        });

  return (
    <div className="flex flex-col h-full animate-fadeIn transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">History & Analytics</h1>
        <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
            <button onClick={() => setViewMode("clients")} className={`px-4 py-1.5 rounded-md transition-colors ${viewMode === "clients" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>Clients</button>
            <button onClick={() => setViewMode("orders")} className={`px-4 py-1.5 rounded-md transition-colors ${viewMode === "orders" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>Orders</button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="border border-slate-200 bg-white rounded-xl flex items-center px-4 py-2.5 w-full md:w-[400px] shadow-sm">
              <RiSearchLine className="text-gray-400 mr-2" />
              <input type="text" placeholder="Search by Order ID or Client..." className="outline-none w-full bg-transparent text-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
         <div className="flex flex-1 gap-2 overflow-x-auto hide-scrollbar">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none hover:border-indigo-300 transition-colors shadow-sm">
               <option>All Payment Status</option>
               <option>Paid</option>
               <option>Pending</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none hover:border-indigo-300 transition-colors shadow-sm">
               <option>Last 30 Days</option>
               <option>Last 90 Days</option>
               <option>Year 2026</option>
            </select>
         </div>
      </div>

      <div className="h-[calc(100vh-240px)] overflow-y-auto hide-scrollbar pb-6">
        {viewMode === "clients" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map(c => (
                  <div key={c.id} onClick={() => setSelectedClient(c)} className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:border-indigo-300 group">
                     <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg group-hover:scale-105 transition-transform" style={{ backgroundColor: c.avatarColor }}>{c.avatar}</div>
                            <div>
                               <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-slate-600 transition-colors">{c.name}</h3>
                               <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider">{c.id}</p>
                            </div>
                         </div>
                         <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 font-bold text-sm text-yellow-500">⭐ {c.rating}</div>
                            <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 mt-2 rounded-lg font-bold uppercase tracking-tighter">
                               {c.orderFrequency}
                            </span>
                         </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-4 mb-4">
                        <div><p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Total Orders</p><p className="text-base font-bold text-slate-700">{c.totalOrders}</p></div>
                        <div className="text-right"><p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Revenue</p><p className="text-base font-bold text-slate-600">{c.totalRevenue}</p></div>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{c.growth}</span>
                        <div className="flex gap-2">
                           <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${c.contact?.phone?.replace(/\D/g, '')}`, '_blank'); }} className="w-9 h-9 bg-[#25D366] text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                              <RiWhatsappLine className="w-4 h-4" />
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${c.contact?.phone}`; }} className="w-9 h-9 bg-slate-800 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                              <RiPhoneLine className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm uppercase">
                   <thead className="bg-slate-50 text-gray-400 font-bold text-xs tracking-wider border-b border-slate-100">
                      <tr>
                         <th className="px-6 py-5">Order ID</th>
                         <th className="px-6 py-5">Client Name</th>
                         <th className="px-6 py-5">Timeline</th>
                         <th className="px-6 py-5">Payment</th>
                         <th className="px-6 py-5">Invoice</th>
                         <th className="px-6 py-5 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {filteredItems.map(order => (
                        <tr key={order.id} onClick={() => setSelectedOrder(order)} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                          <td className="px-6 py-5 font-bold text-slate-800 tracking-tight">{order.id}</td>
                          <td className="px-6 py-5 whitespace-nowrap">
                             <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-slate-100 shadow-lg" style={{ backgroundColor: order.avatarColor }}>{order.avatar}</div>
                                <span className="font-bold text-slate-700 tracking-tight">{order.clientName}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5 text-slate-400 font-bold text-xs">{order.timeline || order.date}</td>
                          <td className="px-6 py-5">
                             <span className="px-3 py-1 rounded-lg text-[9px] font-bold bg-green-50 text-green-600 border border-green-100 shadow-sm tracking-widest">PAID</span>
                          </td>
                          <td className="px-6 py-5 font-bold text-slate-400 text-xs group-hover:text-slate-600 transition-colors uppercase tracking-tight">
                             {order.invoiceId}
                          </td>
                          <td className="px-6 py-5 text-right">
                              <div className="flex justify-end items-center gap-4">
                                 <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors"><RiEyeLine className="w-4 h-4" /></button>
                                 <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors"><RiDownload2Line className="w-4 h-4" /></button>
                              </div>
                          </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>

      <ClientSidebar client={selectedClient} onClose={() => setSelectedClient(null)} />
      <OrderSidebar order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
