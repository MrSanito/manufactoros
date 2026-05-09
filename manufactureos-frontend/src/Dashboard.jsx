import { useState } from "react";
import { FINANCE_DATA } from "./data";
import { RiAlertLine } from "react-icons/ri";

// Helper to remove decimals from preformatted "₹X.Y L" strings
const cleanPreformatted = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/\.\d+/, '');
};

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
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
          <h2 className="text-2xl font-bold mt-1">{cleanPreformatted(FINANCE_DATA.overview.revenue)}</h2>
          <p className="text-green-500 text-sm mt-1">↑ 8%</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Delayed Orders</p>
          <h2 className="text-2xl font-bold mt-1">{FINANCE_DATA.overview.delayedOrders}</h2>
          <p className="text-green-500 text-sm mt-1">↓ 3%</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Pending Payments</p>
          <h2 className="text-2xl font-bold mt-1">{cleanPreformatted(FINANCE_DATA.overview.pendingPayments)}</h2>
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
          <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
            {["S","M","T","W","T","F","S"].map((d) => (
              <div key={d} className="text-center">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-sm">
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
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
  );
}
