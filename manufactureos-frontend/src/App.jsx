import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import aiIcon from "./assets/AI.png";
import Production from "./Production";
import Finance from "./Finance";
import Employees from "./Employees";
import Vendors from "./Vendors";
import History from "./History";
import Alerts from "./Alerts";
import Inventory from "./Inventory";
import { RiMenuLine, RiBellLine, RiAlertLine, RiMoneyDollarCircleLine, RiArchiveLine, RiLogoutBoxLine } from "react-icons/ri";
import { FINANCE_DATA } from "./data";


export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [selectedDay, setSelectedDay] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#334155',
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
        }} 
      />
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 bg-slate-900 text-white p-5 w-60 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>	
        <h2 className="text-xl font-bold">ManufactureOS</h2>

        <div className="mt-6 font-semibold space-y-2">
          {["Dashboard","Production","Finance","Employees","Vendors","History","Alerts","Inventory"].map((item) => (
            <p
              key={item}
              onClick={() => { setPage(item); setIsSidebarOpen(false); }}
              className={`p-2 rounded cursor-pointer ${
                page === item ? "bg-green-500" : "hover:bg-slate-700"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>


      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 w-full md:max-w-[calc(100vw-240px)]">

<div className="flex justify-between md:justify-end items-center gap-4 mb-4">
  <button className="md:hidden text-2xl hover:text-gray-600 focus:outline-none" onClick={() => setIsSidebarOpen(true)}>
    <RiMenuLine className="w-6 h-6" />
  </button>
  
  <div className="flex items-center gap-4">
  {/* BELL */}
  <div className="relative">
    <button
      onClick={() => setShowNotifications(!showNotifications)}
      className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100"
    >
      <RiBellLine className="w-5 h-5 text-slate-600" />
    </button>

    {/* PANEL */}
    {showNotifications && (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50">
        <h3 className="font-semibold mb-2">Notifications</h3>

        <div className="text-sm space-y-2">
          <p className="flex items-center gap-2"><RiAlertLine className="text-amber-500 shrink-0" /> ORD-2402 delayed</p>
          <p className="flex items-center gap-2"><RiMoneyDollarCircleLine className="text-emerald-500 shrink-0" /> Payment pending: Fashion Hub</p>
          <p className="flex items-center gap-2"><RiArchiveLine className="text-blue-500 shrink-0" /> Low stock: Thread</p>
        </div>
      </div>
    )}
  </div>

  {/* AUTH BUTTON */}
  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
    <RiLogoutBoxLine className="w-4 h-4" /> Sign Out
  </button>
  </div>
</div>


        {page === "Dashboard" && (
          <div>
            <h1 className="text-2xl font-bold">Operations Dashboard</h1>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Total Orders</p>
                <h2 className="text-2xl font-bold mt-1">{FINANCE_DATA.overview.totalOrders}</h2>
                <p className="text-green-500 text-sm mt-1">↑ 12%</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Revenue</p>
                <h2 className="text-2xl font-bold mt-1">{FINANCE_DATA.overview.revenue}</h2>
                <p className="text-green-500 text-sm mt-1">↑ 8%</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Delayed Orders</p>
                <h2 className="text-2xl font-bold mt-1">{FINANCE_DATA.overview.delayedOrders}</h2>
                <p className="text-green-500 text-sm mt-1">↓ 3%</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Pending Payments</p>
                <h2 className="text-2xl font-bold mt-1">{FINANCE_DATA.overview.pendingPayments}</h2>
                <p className="text-red-500 text-sm mt-1">↑ 2%</p>
              </div>

            </div>

            {/* ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">

              {/* PRODUCTION */}
<div className="bg-white p-6 rounded-xl shadow-sm">
  <h2 className="mb-4 font-semibold">Production Lineup</h2>

  {FINANCE_DATA.productionLineup.map((order, idx) => (
    <div key={idx} className="border p-4 rounded-lg mb-4 last:mb-0">
      <p className="font-semibold mb-2">{order.id} • {order.client}</p>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        {order.steps.map((step, sIdx) => (
          <div key={sIdx} className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded font-semibold ${
              sIdx < order.currentStep ? "bg-green-200" : 
              sIdx === order.currentStep ? (order.alert ? "bg-blue-500 text-white border-4 border-red-500 flex items-center gap-1" : "bg-blue-500 text-white") : 
              "bg-gray-200"
            }`}>
              {step} {sIdx === order.currentStep && order.alert && <RiAlertLine className="text-red-300" />}
            </span>
            {sIdx < order.steps.length - 1 && <span>→</span>}
          </div>
        ))}
      </div>
    </div>
  ))}

</div>

              {/* CHART */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="mb-4 font-semibold">Revenue</h2>

                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  Chart
                </div>
              </div>

            </div>


        

<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">

  {/* CLIENT PAYMENTS */}
<div className="bg-white p-6 rounded-xl shadow-sm">
  <h2 className="text-lg font-semibold mb-4">Pending Client Payments</h2>

  <div className="divide-y">

    {FINANCE_DATA.payments.filter(p => p.status !== "Paid").map((p, i) => (
      <div key={i} className="flex justify-between py-3">
        <div>
          <p className="font-medium">{p.client}</p>
          <p className="text-xs text-gray-400">Due: {p.dueDate}</p>
        </div>
        <p className="font-medium">{p.amount}</p>
      </div>
    ))}

  </div>
</div>
  {/* VENDOR PAYMENTS */}
  <div className="bg-white p-6 rounded-xl shadow-sm">
  <h2 className="text-lg font-semibold mb-4">Vendor Payment Reminder</h2>

  <div className="divide-y">

    {FINANCE_DATA.vendorDues.breakdown.map((d, i) => (
      <div key={i} className="flex justify-between py-3">
        <div>
          <p className="font-medium">{d.vendor}</p>
          <p className="text-xs text-gray-400">Due: {d.dueDate}</p>
        </div>
        <p className={`font-medium ${d.status === 'Overdue' ? 'text-red-500' : 'text-yellow-600'}`}>{d.amount}</p>
      </div>
    ))}

  </div>
</div>

  {/* ATTENDANCE */}
 <div className="bg-white p-6 rounded-xl shadow-sm">
  <h2 className="text-lg font-semibold mb-4">Attendance Calendar</h2>

  <div className="text-center text-sm mb-3">April 2026</div>

  {/* DAYS HEADER */}
  <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
    {["S","M","T","W","T","F","S"].map((d) => (
      <div key={d} className="text-center">{d}</div>
    ))}
  </div>

  {/* CALENDAR GRID */}
  <div className="grid grid-cols-7 gap-2 text-sm">

    {[...Array(30)].map((_, i) => {
      const day = i + 1;
      const isSelected = selectedDay === day;

      return (
        <div
          key={day}
          onClick={() => {
            setSelectedDay(day);
            console.log("Selected day:", day);
          }}
          className={`h-10 flex items-center justify-center rounded cursor-pointer
            ${isSelected ? "bg-blue-500 text-white" : "bg-green-100 hover:bg-green-200"}
          `}
        >
          {day}
        </div>
      );
       })}

  </div>
  </div>

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">

  {/* INVENTORY */}
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Inventory Overview</h2>

    <div className="space-y-4">

    {FINANCE_DATA.inventory.map((item, i) => (
      <div key={i} className="border rounded-lg p-4">
        <div className="flex justify-between">
          <p className="font-medium">{item.name}</p>
          <span className={`text-xs px-2 py-1 rounded font-semibold ${item.level === 'low' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
            {item.level}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{item.quantity}</p>
        {item.alert && (
          <div className="mt-3 text-xs bg-orange-100 text-orange-600 p-2 rounded">
            {item.alert}
          </div>
        )}
      </div>
    ))}

    </div>
  </div>

  {/* RECENT ACTIVITY */}
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

    <div className="space-y-4 text-sm">

    {FINANCE_DATA.activities.map((act, i) => (
      <div key={i}>
        <p className={`${act.type === 'blue' ? 'text-blue-500' : 'text-green-500'}`}>• {act.text}</p>
        <p className="text-gray-400 text-xs">{act.time}</p>
      </div>
    ))}

    </div>
  </div>


</div>
</div>
)}
{page === "Production" && <Production />}	
{page === "Finance" && <Finance />}	
{page === "Employees" && <Employees />}
{page === "Vendors" && <Vendors />}
{page === "History" && <History />}
{page === "Alerts" && <Alerts />}
{page === "Inventory" && <Inventory />}

      </div>


    </div>
  );
}

