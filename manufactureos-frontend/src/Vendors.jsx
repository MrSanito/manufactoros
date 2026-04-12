import { useState } from 'react';
import { RiSearchLine, RiStarFill, RiStarLine, RiWhatsappLine, RiPhoneLine, RiCloseLine, RiCalendarLine, RiCheckLine } from 'react-icons/ri';

const VENDORS = [
  {
    id: "VEN-001",
    name: "Kumar Textiles",
    specialty: "Fabric Cutting & Stitching",
    availability: "available",
    rating: 4.8,
    activeOrders: 2,
    pendingAmount: "$8,200",
    contact: {
      phone: "+91 98765 11111",
      email: "kumar.textiles@vendor.com",
      address: "Industrial Area, Sector 12, Delhi"
    },
    orders: [
      { id: "ORD-2401", due: "Apr 8", status: "In Progress" },
      { id: "ORD-2405", due: "Apr 15", status: "Ready" }
    ],
    costBreakdown: {
      labour: "$12,500",
      materials: "$8,200",
      overhead: "$2,300"
    },
    paymentSummary: {
      totalPaid: "$45,700",
      pending: "$8,200"
    },
    paymentHistory: [
      { amount: "$15,000", date: "Mar 28, 2026", status: "Paid" },
      { amount: "$12,500", date: "Mar 15, 2026", status: "Paid" },
      { amount: "$18,200", date: "Mar 1, 2026", status: "Paid" }
    ],
    review: {
      rating: 4.8,
      text: "Excellent quality and timely delivery. Highly recommended for bulk orders."
    }
  },
  {
    id: "VEN-002",
    name: "Singh Manufacturing",
    specialty: "Stitching & Embroidery",
    availability: "busy",
    rating: 4.5,
    activeOrders: 2,
    pendingAmount: "$5,500",
    contact: { phone: "+91 98765 22222", email: "singh@vendor.com", address: "Sector 14, Okhla, Delhi" },
    orders: [
      { id: "ORD-2390", due: "Apr 10", status: "In Progress" },
      { id: "ORD-2395", due: "Apr 12", status: "In Progress" }
    ],
    costBreakdown: {
      labour: "$10,500",
      materials: "$6,100",
      overhead: "$1,800"
    },
    paymentSummary: {
      totalPaid: "$32,400",
      pending: "$5,500"
    },
    paymentHistory: [
      { amount: "$10,000", date: "Mar 20, 2026", status: "Paid" },
      { amount: "$22,400", date: "Feb 15, 2026", status: "Paid" }
    ],
    review: { rating: 4.5, text: "Good stitching, but sometimes delayed during peak seasons." }
  },
  {
    id: "VEN-003",
    name: "Patel Garments",
    specialty: "Finishing & Quality Control",
    availability: "available",
    rating: 4.7,
    activeOrders: 1,
    pendingAmount: "$3,200",
    contact: { phone: "+91 98765 33333", email: "patel@vendor.com", address: "Sector 1, Surat, Gujarat" },
    orders: [
      { id: "ORD-2410", due: "May 2", status: "Ready" }
    ],
    costBreakdown: {
      labour: "$5,500",
      materials: "$2,200",
      overhead: "$900"
    },
    paymentSummary: {
      totalPaid: "$15,200",
      pending: "$3,200"
    },
    paymentHistory: [
      { amount: "$15,200", date: "Mar 10, 2026", status: "Paid" }
    ],
    review: { rating: 4.7, text: "Very consistent quality control. Rarely find defects." }
  },
  {
    id: "VEN-004",
    name: "Sharma Industries",
    specialty: "Complete Manufacturing",
    availability: "available",
    rating: 4.3,
    activeOrders: 1,
    pendingAmount: "$2,800",
    contact: { phone: "+91 98765 44444", email: "sharma@vendor.com", address: "Phase 2, Noida" },
    orders: [
      { id: "ORD-2422", due: "May 10", status: "In Progress" }
    ],
    costBreakdown: {
      labour: "$8,000",
      materials: "$4,500",
      overhead: "$1,500"
    },
    paymentSummary: {
      totalPaid: "$20,000",
      pending: "$2,800"
    },
    paymentHistory: [
      { amount: "$20,000", date: "Feb 28, 2026", status: "Paid" }
    ],
    review: { rating: 4.3, text: "Good for end-to-end processing, but materials can be slightly expensive." }
  }
];

export default function Vendors() {
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(VENDORS[0]);

  return (
    <div className="flex flex-col h-full animate-fadeIn transition-all duration-300">
      
      {/* HEADER BAR */}
      <h1 className="text-2xl font-bold mb-6">Vendor Management</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
         {/* Search Bar + Filters */}
         <div className="border border-slate-200 bg-white rounded-lg flex items-center px-4 py-2 w-full md:w-1/2">
             <span className="text-gray-400 mr-2">
                 <RiSearchLine className="h-5 w-5" />
             </span> 
             <input type="text" placeholder="Search by name, special" className="outline-none w-full bg-transparent"/>
         </div>
         <select className="border border-slate-200 bg-white rounded-lg px-4 py-2 w-full md:w-1/4 text-gray-700">
             <option>All Availability</option>
             <option>Available</option>
             <option>Busy</option>
         </select>
         <select className="border border-slate-200 bg-white rounded-lg px-4 py-2 w-full md:w-1/4 text-gray-700">
             <option>All Specialties</option>
             <option>Fabric Cutting</option>
             <option>Stitching</option>
         </select>
      </div>

      {/* VENDOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-6">
          {VENDORS.map(v => (
              <div 
                 key={v.id} 
                 onClick={() => setSelectedVendor(v)}
                 className={`bg-white border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedVendor?.id === v.id ? 'border-green-500 ring-1 ring-green-500' : 'border-slate-200 hover:border-green-300'
                 }`}
              >
                 <div className="flex justify-between items-start mb-3">
                     <div>
                         <h3 className="font-bold text-slate-800 text-lg leading-tight">{v.name}</h3>
                     </div>
                     <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1">
                             <RiStarFill className="text-yellow-400 text-sm" />
                             <span className="text-sm font-semibold">{v.rating}</span>
                         </div>
                         <span className={`text-[10px] uppercase font-bold px-2 py-0.5 mt-2 rounded-full ${
                            v.availability === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                         }`}>
                            {v.availability}
                         </span>
                     </div>
                 </div>
                 
                 <p className="text-sm text-gray-500 mb-1">{v.specialty}</p>
                 <p className="text-xs text-gray-400 border-b border-slate-100 pb-3 mb-3">{v.id}</p>
                 
                 <div className="flex justify-between items-center text-sm pt-2">
                     <div className="flex flex-col gap-1">
                        <p><span className="text-gray-400 text-xs">Active Orders:</span> <span className="font-semibold ml-1">{v.activeOrders}</span></p>
                        <p><span className="text-gray-400 text-xs">Pending:</span> <span className="font-semibold text-red-500 ml-1">{v.pendingAmount}</span></p>
                     </div>
                     <div className="flex gap-2">
                        <button 
                           onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${v.contact?.phone?.replace(/\+/g, '')}`, '_blank'); }}
                           className="w-9 h-9 bg-[#25D366] text-white rounded-lg flex items-center justify-center hover:bg-[#20ba59] transition-colors shadow-sm"
                           title="WhatsApp"
                        >
                           <RiWhatsappLine className="w-5 h-5" />
                        </button>
                        <button 
                           onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${v.contact?.phone}`; }}
                           className="w-9 h-9 bg-slate-800 text-white rounded-lg flex items-center justify-center hover:bg-slate-900 transition-colors shadow-sm"
                           title="Call"
                        >
                           <RiPhoneLine className="w-5 h-5" />
                        </button>
                     </div>
                 </div>
              </div>
          ))}
      </div>

      {/* SIDEBAR OVERLAY */}
      {selectedVendor && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
            onClick={() => setSelectedVendor(null)}
          />

          {/* Sidebar */}
          <div
            className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
            style={{ animation: "slideInRight 0.3s ease" }}
          >
             {/* Header */}
             <div className="flex items-center justify-between p-6 border-b bg-gray-50 shrink-0">
                <div>
                   <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedVendor.name}</h2>
                   <p className="text-gray-500 text-sm">{selectedVendor.specialty}</p>
                   <p className="text-gray-400 text-xs mt-1">{selectedVendor.id}</p>
                </div>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 text-xl shrink-0"
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                {/* Contact Info */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b pb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm text-gray-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="flex"><span className="text-gray-400 w-20 shrink-0">Phone:</span> <span className="font-medium text-slate-700">{selectedVendor.contact?.phone}</span></p>
                        <p className="flex"><span className="text-gray-400 w-20 shrink-0">Email:</span> <span className="font-medium text-slate-700">{selectedVendor.contact?.email}</span></p>
                        <p className="flex"><span className="text-gray-400 w-20 shrink-0">Address:</span> <span className="font-medium text-slate-700">{selectedVendor.contact?.address}</span></p>
                    </div>
                </div>

                {/* Current Orders */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b pb-2">Current Orders</h3>
                    <div className="space-y-2">
                        {selectedVendor.orders?.map(o => (
                            <div key={o.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div>
                                    <p className="font-semibold text-sm text-slate-800">{o.id}</p>
                                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                        <RiCalendarLine className="text-gray-400" /> Due: {o.due}
                                    </p>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                                    o.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                                    o.status === "Ready" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"
                                }`}>{o.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cost Breakdown & Payment Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b pb-2">Cost Breakdown</h3>
                        <div className="space-y-3 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 h-[105px]">
                            <div className="flex justify-between"><span className="text-gray-600">Labour</span><span className="font-semibold text-slate-800">{selectedVendor.costBreakdown?.labour}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Materials</span><span className="font-semibold text-slate-800">{selectedVendor.costBreakdown?.materials}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Overhead</span><span className="font-semibold text-slate-800">{selectedVendor.costBreakdown?.overhead}</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b pb-2">Payment</h3>
                        <div className="space-y-2 text-sm h-[105px]">
                           <div className="bg-green-50 p-2.5 rounded-lg border border-green-100 flex justify-between items-center">
                              <span className="text-xs text-green-700 font-medium">Paid</span>
                              <span className="font-bold text-green-600">{selectedVendor.paymentSummary?.totalPaid}</span>
                           </div>
                           <div className="bg-red-50 p-2.5 rounded-lg border border-red-100 flex justify-between items-center">
                              <span className="text-xs text-red-700 font-medium">Pending</span>
                              <span className="font-bold text-red-600">{selectedVendor.paymentSummary?.pending}</span>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Payment History */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b pb-2">Payment History</h3>
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        {selectedVendor.paymentHistory?.map((p, i) => (
                           <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                               <div>
                                   <p className="font-medium text-gray-700">{p.amount}</p>
                                   <p className="text-[11px] text-gray-400 mt-0.5">{p.date}</p>
                               </div>
                               <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded-full">{p.status}</span>
                           </div>
                        ))}
                    </div>
                </div>

                {/* Vendor Review */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Vendor Review</h3>
                    <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4].map(i => <RiStarFill key={i} className="text-yellow-400 text-base" />)}
                        <RiStarLine className="text-gray-200 text-base" />
                        <span className="font-bold ml-1.5 text-slate-700 text-sm">{selectedVendor.review?.rating}/5</span>
                    </div>
                    <p className="text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 text-gray-600">
                        {selectedVendor.review?.text}
                    </p>
                </div>

                {/* Communication */}
                <div className="pt-2">
                    <div className="grid grid-cols-2 gap-3">
                         <button 
                            onClick={() => window.open(`https://wa.me/${selectedVendor.contact?.phone?.replace(/\+/g, '')}`, '_blank')}
                            className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                         >
                             <RiWhatsappLine className="w-5 h-5" />
                             WhatsApp
                         </button>
                         <button 
                            onClick={() => window.location.href = `tel:${selectedVendor.contact?.phone}`}
                            className="bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                         >
                             <RiPhoneLine className="w-5 h-5" /> Call
                         </button>
                    </div>
                </div>

             </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
