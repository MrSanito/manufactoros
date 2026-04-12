import { useState } from "react";
import {
  RiWhatsappLine, RiPhoneLine, RiCloseLine, RiRepeatLine, RiCalendarLine,
  RiPhoneFill, RiSettingsLine, RiFireLine, RiScissorsLine, RiMoneyDollarCircleLine,
  RiRocketLine, RiChatQuoteLine, RiBuildingLine, RiSearchLine, RiEyeLine,
  RiDownload2Line, RiMapPin2Line, RiAlertLine, RiCheckLine
} from "react-icons/ri";

const CLIENTS = [
  {
    id: "CLT-001", name: "Fashion Hub Inc.", avatar: "FH", avatarColor: "#4F46E5",
    specialty: "High-Volume Apparel", rating: 4.8, orderFrequency: "Weekly",
    totalOrders: 142, totalRevenue: "₹24.5L", pendingPayments: "₹45,000", status: "active",
    contact: {
      phone: "+91 98765 43210", email: "procurement@fashionhub.com",
      address: "B-42, Okhla Phase III, New Delhi, 110020",
      location: "https://maps.google.com/?q=Okhla+Phase+III+Delhi"
    },
    orders: [
      {
        id: "ORD-2401", status: "Delivered", amount: "₹85,000", date: "Apr 2, 2026",
        invoiceDate: "Mar 30, 2026", invoiceId: "INV-2401", timeline: "Jan 15 - Feb 20, 2026",
        complexity: "Medium", priority: "High", fabric: "Premium Cotton (200 GSM)",
        rawMaterialCost: "₹32,400",
        stages: [
          { label: "Fabric Sourcing", status: "completed", date: "Jan 15", delay: null },
          { label: "Cutting",         status: "completed", date: "Jan 22", delay: "2 days delay - Fabric delivery lag" },
          { label: "Stitching",       status: "completed", date: "Feb 05", delay: null },
          { label: "Finishing",       status: "completed", date: "Feb 15", delay: "1 day delay - Power outage" },
          { label: "QC & Dispatch",   status: "completed", date: "Feb 20", delay: null },
        ],
        clientFeedback: "Excellent stitch quality, but delivery was tight on scheduled date.",
        companyFeedback: "Smooth collaboration, clear specs provided early.",
        paymentDates: ["Feb 22, 2026", "Mar 05, 2026"]
      },
      {
        id: "ORD-2395", status: "Delivered", amount: "₹1,20,000", date: "Mar 28, 2026",
        invoiceDate: "Mar 20, 2026", invoiceId: "INV-2395", timeline: "Jan 5 - Feb 10, 2026",
        complexity: "High", priority: "Medium", fabric: "Linen Blend (Soft)",
        rawMaterialCost: "₹58,000",
        stages: [
          { label: "Design Approval",  status: "completed", date: "Jan 05", delay: null },
          { label: "Raw Sourcing",     status: "completed", date: "Jan 12", delay: null },
          { label: "Bulk Production",  status: "completed", date: "Feb 01", delay: "4 days delay - Machine repair" },
          { label: "QC Check",         status: "completed", date: "Feb 08", delay: null },
          { label: "Dispatch",         status: "completed", date: "Feb 10", delay: null },
        ],
        clientFeedback: "Perfect fit, our best selling line this month.",
        companyFeedback: "Higher complexity required specialized operators.",
        paymentDates: ["Feb 15, 2026"]
      },
    ],
    growth: "↑ 15% this qtr"
  },
  {
    id: "CLT-002", name: "StyleCraft Ltd", avatar: "SC", avatarColor: "#10B981",
    specialty: "Premium Retailers", rating: 4.5, orderFrequency: "Bi-Weekly",
    totalOrders: 68, totalRevenue: "₹12.8L", pendingPayments: "₹0", status: "active",
    contact: {
      phone: "+91 88221 10044", email: "contact@stylecraft.in",
      address: "Sector 63, Noida, Uttar Pradesh, 201301",
      location: "https://maps.google.com/?q=Sector+63+Noida"
    },
    orders: [
      {
        id: "ORD-2398", status: "Delivered", amount: "₹42,000", date: "Apr 5, 2026",
        invoiceDate: "Apr 2, 2026", invoiceId: "INV-2398", timeline: "Jan 10 - Feb 15, 2026",
        complexity: "Low", priority: "High", fabric: "Organic Jersey",
        rawMaterialCost: "₹15,200",
        stages: [
          { label: "Sourcing",   status: "completed", date: "Jan 12", delay: null },
          { label: "Production", status: "completed", date: "Feb 10", delay: "3 days delay - Worker shortage" },
          { label: "Packaging",  status: "completed", date: "Feb 15", delay: null },
        ],
        clientFeedback: "Packaging was a bit damaged but garments are fine.",
        companyFeedback: "Easy repeatable pattern, efficient run.",
        paymentDates: ["Feb 20, 2026"]
      },
    ],
    growth: "→ Stable"
  }
];

/* ── ORDER SIDEBAR ──────────────────────────────────────────────────────────── */
function OrderSidebar({ order, onClose }) {
  if (!order) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.25s ease" }}>

        {/* HEADER */}
        <div className="flex items-center gap-3 p-5 border-b bg-gray-50 shrink-0">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: order.avatarColor }}>
            {order.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900 truncate">{order.clientName}</h2>
            <p className="text-xs text-gray-400">{order.id} · {order.invoiceId}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500">
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>

          {/* FREQ + DATE */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Frequency</p>
              <p className="font-bold text-gray-800 flex items-center gap-1 text-sm"><RiRepeatLine className="text-gray-500" /> {order.orderFrequency}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Invoice Date</p>
              <p className="font-bold text-gray-800 flex items-center gap-1 text-sm"><RiCalendarLine className="text-gray-500" /> {order.invoiceDate}</p>
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1"><RiPhoneFill className="text-gray-400" /> Contact</p>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-400">Phone:</span><span className="font-semibold text-blue-600">{order.contact?.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Timeline:</span><span className="font-semibold text-gray-700">{order.timeline}</span></div>
            </div>
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Complexity</p>
              <p className="text-sm font-bold text-gray-800 flex items-center gap-1"><RiSettingsLine className="text-gray-400" />{order.complexity}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Priority</p>
              <p className={`text-sm font-bold flex items-center gap-1 ${order.priority === 'High' ? 'text-red-500' : 'text-blue-500'}`}>
                <RiFireLine />{order.priority}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Fabric</p>
              <p className="text-xs font-bold text-gray-800 flex items-center gap-1"><RiScissorsLine className="text-gray-400" />{order.fabric}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">RM Cost</p>
              <p className="text-sm font-bold text-green-600 flex items-center gap-1"><RiMoneyDollarCircleLine />{order.rawMaterialCost}</p>
            </div>
          </div>

          {/* PIPELINE */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-sm text-gray-700 mb-4 flex items-center gap-1"><RiRocketLine className="text-gray-400" /> Production Pipeline</p>
            <div className="space-y-5 relative">
              <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-gray-100" />
              {order.stages?.map((stage, i) => (
                <div key={i} className="relative pl-7">
                  <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-10 ${stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {stage.status === 'completed' && <RiCheckLine className="text-white text-[8px]" />}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-none">{stage.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{stage.date}</p>
                    </div>
                    {stage.delay && (
                      <div className="bg-red-100 text-red-600 border border-red-200 rounded px-2 py-0.5 text-xs font-semibold flex items-center gap-1">
                        <RiAlertLine className="shrink-0" />{stage.delay}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FEEDBACK */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-xs text-blue-600 font-semibold uppercase mb-1 flex items-center gap-1"><RiChatQuoteLine />Client Feedback</p>
            <p className="text-sm italic text-gray-700">"{order.clientFeedback}"</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1 flex items-center gap-1"><RiBuildingLine />Our Notes</p>
            <p className="text-sm text-gray-700">{order.companyFeedback}</p>
          </div>

          {/* PAYMENT DATES */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-xs text-green-700 font-semibold uppercase mb-3 flex items-center gap-1"><RiMoneyDollarCircleLine /> Payment Received</p>
            <div className="flex flex-wrap gap-2">
              {order.paymentDates?.map((d, i) => (
                <span key={i} className="bg-white border border-green-200 text-green-600 px-3 py-1 text-xs font-semibold rounded flex items-center gap-1">
                  <RiMoneyDollarCircleLine className="shrink-0" />{d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── CLIENT SIDEBAR ─────────────────────────────────────────────────────────── */
function ClientSidebar({ client, onClose }) {
  if (!client) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[460px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.25s ease" }}>

        {/* HEADER */}
        <div className="flex items-center gap-3 p-5 border-b bg-gray-50 shrink-0">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: client.avatarColor }}>
            {client.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900 truncate">{client.name}</h2>
            <p className="text-xs text-gray-500">{client.specialty} · {client.id}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500">
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "none" }}>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Frequency</p>
              <p className="font-bold text-gray-800">{client.orderFrequency}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Growth</p>
              <p className="font-bold text-green-600">{client.growth}</p>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1"><RiMapPin2Line className="text-gray-400" /> Office Details</p>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-2 text-sm">
              {[["Phone", client.contact?.phone], ["Email", client.contact?.email], ["Address", client.contact?.address]].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-gray-400 w-16 shrink-0 text-xs">{k}:</span>
                  <span className="font-medium text-gray-700 text-xs">{v}</span>
                </div>
              ))}
              <a href={client.contact?.location} target="_blank" rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-1 w-full py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold hover:bg-gray-200">
                <RiMapPin2Line /> View on Map
              </a>
            </div>
          </div>

          {/* ORDER HISTORY */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1"><RiCalendarLine className="text-gray-400" /> Order History</p>
            <div className="space-y-2">
              {client.orders?.map(o => (
                <div key={o.id} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:border-green-300">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{o.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{o.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-800">{o.amount}</p>
                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded">{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t px-5 py-4 bg-white shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open(`https://wa.me/${client.contact?.phone?.replace(/\D/g, '')}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <RiWhatsappLine className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={() => window.location.href = `tel:${client.contact?.phone}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <RiPhoneLine className="w-4 h-4" /> Call
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────────────────── */
export default function History() {
  const [viewMode, setViewMode] = useState("orders");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedOrder, setSelectedOrder]   = useState(null);
  const [query, setQuery]   = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter]     = useState("Last 30 Days");

  const ALL_ORDERS = CLIENTS.flatMap(client =>
    client.orders.map(o => ({
      ...o,
      clientName: client.name,
      clientId: client.id,
      avatar: client.avatar,
      avatarColor: client.avatarColor,
      orderFrequency: client.orderFrequency,
      contact: client.contact,
    }))
  );

  const filteredClients = CLIENTS.filter(c => {
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
  });

  const filteredOrders = ALL_ORDERS.filter(o => {
    const q = query.toLowerCase();
    return o.id.toLowerCase().includes(q) || o.clientName.toLowerCase().includes(q);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">History & Analytics</h1>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center border rounded-lg px-4 py-2 bg-white gap-2">
          <RiSearchLine className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by Order ID or Client..."
            className="outline-none w-full bg-transparent text-sm"
          />
        </div>
        <div className="flex gap-4">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="All">All Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year 2026</option>
          </select>
        </div>
        {/* View Toggle */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white text-sm">
          {["clients", "orders"].map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              className={`px-4 py-2 capitalize font-medium transition-colors ${viewMode === m ? "bg-green-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* CLIENTS VIEW */}
      {viewMode === "clients" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map(c => (
            <div key={c.id} onClick={() => setSelectedClient(c)}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md hover:border-green-300 transition-all">

              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: c.avatarColor }}>
                    {c.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{c.name}</h3>
                    <p className="text-xs text-gray-400">{c.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-500">⭐ {c.rating}</p>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{c.orderFrequency}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-gray-100 py-3 mb-3 text-xs">
                <div><p className="text-gray-400">Total Orders</p><p className="font-bold text-gray-800">{c.totalOrders}</p></div>
                <div className="text-right"><p className="text-gray-400">Revenue</p><p className="font-bold text-gray-800">{c.totalRevenue}</p></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{c.growth}</span>
                <div className="flex gap-2">
                  <button onClick={e => { e.stopPropagation(); window.open(`https://wa.me/${c.contact?.phone?.replace(/\D/g, '')}`, '_blank'); }}
                    className="flex-1 bg-green-100 text-xs py-1 px-2 rounded text-green-700 flex items-center gap-1">
                    <RiWhatsappLine /> WhatsApp
                  </button>
                  <button onClick={e => { e.stopPropagation(); window.location.href = `tel:${c.contact?.phone}`; }}
                    className="flex-1 bg-gray-100 text-xs py-1 px-2 rounded text-gray-700 flex items-center gap-1">
                    <RiPhoneLine /> Call
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ORDERS VIEW */}
      {viewMode === "orders" && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Order ID", "Client", "Timeline", "Payment", "Invoice", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map(o => (
                  <tr key={o.id} onClick={() => setSelectedOrder(o)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-800">{o.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: o.avatarColor }}>{o.avatar}</div>
                        <span className="font-medium text-gray-700">{o.clientName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400">{o.timeline || o.date}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-semibold">PAID</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400 font-medium">{o.invoiceId}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="bg-gray-100 text-xs py-1 px-2 rounded text-gray-600 flex items-center gap-1 hover:bg-gray-200">
                          <RiEyeLine /> View
                        </button>
                        <button className="bg-gray-100 text-xs py-1 px-2 rounded text-gray-600 flex items-center gap-1 hover:bg-gray-200">
                          <RiDownload2Line /> Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ClientSidebar client={selectedClient} onClose={() => setSelectedClient(null)} />
      <OrderSidebar  order={selectedOrder}   onClose={() => setSelectedOrder(null)} />

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}