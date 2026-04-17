import { useState } from 'react';
import { RiSearchLine, RiStarFill, RiWhatsappLine, RiPhoneLine, RiCloseLine, RiCalendarLine } from 'react-icons/ri';
import { VENDORS_LIST } from './data';

// Helper to remove decimals from preformatted "₹X.Y L" strings
const cleanPreformatted = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/\.\d+/, '');
};

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <RiStarFill key={i} className={`text-xs ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`} />
      ))}
      <span className="text-xs font-semibold ml-1 text-gray-700">{rating}</span>
    </div>
  );
}

function VendorSidebar({ vendor, onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-[460px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.25s ease" }}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between p-5 border-b bg-gray-50 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-gray-900 text-lg">{vendor.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${vendor.availability === "available" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                {vendor.availability}
              </span>
            </div>
            <p className="text-xs text-gray-500">{vendor.specialty}</p>
            <p className="text-xs text-gray-400 mt-0.5">{vendor.id}</p>
            <StarRow rating={vendor.rating} />
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500 shrink-0">
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "none" }}>

          {/* CONTACT */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Contact Information</p>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-2 text-sm">
              {[["Phone", vendor.contact?.phone], ["Email", vendor.contact?.email], ["Address", vendor.contact?.address]].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-gray-400 w-16 shrink-0 text-xs">{k}:</span>
                  <span className="font-medium text-gray-700 text-xs">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CURRENT ORDERS */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Current Orders</p>
            <div className="space-y-2">
              {vendor.orders?.map(o => (
                <div key={o.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{o.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <RiCalendarLine className="text-gray-400" /> Due: {o.due}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium
                    ${o.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                      o.status === "Ready" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COST + PAYMENT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Cost Breakdown</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
                {[["Labour", vendor.costBreakdown?.labour], ["Materials", vendor.costBreakdown?.materials], ["Overhead", vendor.costBreakdown?.overhead]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Payment</p>
              <div className="space-y-2 text-xs">
                <div className="bg-green-100 border border-green-200 rounded-lg p-2.5 flex justify-between items-center">
                  <span className="text-green-700 font-medium">Paid</span>
                  <span className="font-bold text-green-600">{vendor.paymentSummary?.totalPaid}</span>
                </div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-2.5 flex justify-between items-center">
                  <span className="text-red-700 font-medium">Pending</span>
                  <span className="font-bold text-red-600">{vendor.paymentSummary?.pending}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT HISTORY */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Payment History</p>
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm divide-y divide-gray-50">
              {vendor.paymentHistory?.map((p, i) => (
                <div key={i} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{p.amount}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.date}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded font-semibold">{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEW */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Vendor Review</p>
            <StarRow rating={vendor.review?.rating} />
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">{vendor.review?.text}</p>
          </div>

        </div>

        {/* FOOTER ACTIONS */}
        <div className="border-t px-5 py-4 bg-white shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open(`https://wa.me/${vendor.contact?.phone?.replace(/\D/g, '')}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <RiWhatsappLine className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={() => window.location.href = `tel:${vendor.contact?.phone}`}
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

export default function Vendors() {
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState("All");
  const [specFilter, setSpecFilter] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState(null);

  const specialties = [...new Set(VENDORS_LIST.map(v => v.specialty))];

  const filtered = VENDORS_LIST.filter(v => {
    const q = search.toLowerCase();
    const matchQ     = v.name.toLowerCase().includes(q) || v.specialty.toLowerCase().includes(q) || v.id.toLowerCase().includes(q);
    const matchAvail = availFilter === "All" || v.availability === availFilter.toLowerCase();
    const matchSpec  = specFilter === "All" || v.specialty === specFilter;
    return matchQ && matchAvail && matchSpec;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendor Management</h1>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center border rounded-lg px-4 py-2 bg-white gap-2">
          <RiSearchLine className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, specialty or ID..."
            className="outline-none w-full bg-transparent text-sm"
          />
        </div>
        <div className="flex gap-4">
          <select value={availFilter} onChange={e => setAvailFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
          </select>
          <select value={specFilter} onChange={e => setSpecFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="All">All Specialties</option>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm w-full md:w-auto">
          + Add Vendor
        </button>
      </div>

      {/* VENDOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12 text-sm">No vendors found</div>
        )}
        {filtered.map(v => (
          <div
            key={v.id}
            onClick={() => setSelectedVendor(v)}
            className={`bg-white border rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md
              ${selectedVendor?.id === v.id ? "border-green-500" : "border-gray-200 hover:border-green-300"}`}
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-start mb-2">
              <div className="min-w-0 flex-1 pr-3">
                <h3 className="font-bold text-gray-800 truncate">{v.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{v.specialty}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <StarRow rating={v.rating} />
                <span className={`text-xs mt-1.5 px-2 py-0.5 rounded font-semibold ${v.availability === "available" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                  {v.availability}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 border-b border-gray-100 pb-2 mb-2">{v.id}</p>

            {/* STATS */}
            <div className="text-xs text-gray-600 mb-3 space-y-1">
              <p>Active Orders: <span className="font-semibold text-gray-800">{v.activeOrders}</span></p>
              <p>Pending: <span className="font-semibold text-red-500">{cleanPreformatted(v.pendingAmount)}</span></p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={e => { e.stopPropagation(); window.open(`https://wa.me/${v.contact?.phone?.replace(/\D/g, '')}`, '_blank'); }}
                className="flex-1 bg-green-100 text-green-700 text-xs py-1 rounded flex items-center justify-center gap-1 hover:bg-green-200"
              >
                <RiWhatsappLine /> WhatsApp
              </button>
              <button
                onClick={e => { e.stopPropagation(); window.location.href = `tel:${v.contact?.phone}`; }}
                className="flex-1 bg-gray-100 text-gray-700 text-xs py-1 rounded flex items-center justify-center gap-1 hover:bg-gray-200"
              >
                <RiPhoneLine /> Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedVendor && <VendorSidebar vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />}
    </div>
  );
}