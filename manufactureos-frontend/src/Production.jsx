import { useState } from "react";

export default function Production() {
  const stages = ["Cutting","Stitching","Finishing","QC","Dispatch"];
  const [priorityFilter, setPriorityFilter] = useState("All");

const initialOrders = [ 
    { id: "ORD-2401", stage: "Cutting", client: "Fashion Hub Inc", qty: 500, eta: "Apr 8, 2026", vendor: "Kumar Textiles", priority: "HIGH" },
    { id: "ORD-2402", stage: "Stitching", client: "StyleCraft Ltd", qty: 350, eta: "Apr 10, 2026", vendor: "Singh Manufacturing", priority: "MEDIUM", delayed: true },
    { id: "ORD-2403", stage: "Finishing", client: "Urban Threads", qty: 420, eta: "Apr 5, 2026", vendor: "Patel Garments", priority: "HIGH" },
    { id: "ORD-2404", stage: "QC", client: "Textile Masters", qty: 280, eta: "Apr 12, 2026", vendor: "Sharma Industries", priority: "LOW" },
    { id: "ORD-2405", stage: "Dispatch", client: "Fashion Hub Inc", qty: 600, eta: "Apr 15, 2026", vendor: "Kumar Textiles", priority: "MEDIUM" },
 ];
const [orders, setOrders] = useState(initialOrders);

const vendors = [
  "Kumar Textiles",
  "Singh Manufacturing",
  "Patel Garments",
  "Sharma Industries"
];
const [vendorFilter, setVendorFilter] = useState("All");
const [showForm, setShowForm] = useState(false);

const [form, setForm] = useState({
  client: "",
  phone: "",
  product: "",
  fabric: "Cotton",
  complexity: "Medium",
  priority: "MEDIUM",
  vendor: vendors[0]
});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Production Tracker</h1>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Search by Order ID or Client..."
        />
        <div className="flex gap-4">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1 md:flex-none w-1/2 md:w-auto"
          >
            <option value="All">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1 md:flex-none w-1/2 md:w-auto"
          >
            <option value="All">All Vendors</option>
            {vendors.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
        >
          + Add New Order
        </button>

      </div>

      {/* KANBAN LANES */}
      <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 snap-x relative">

        {stages.map((stage) => (
          <div key={stage} className="bg-gray-50 rounded-xl p-3 min-w-[280px] md:min-w-0 flex-shrink-0 snap-center md:snap-align-none">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">{stage}</h2>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {orders
  .filter(o => o.stage === stage)
  .filter(o => priorityFilter === "All" || o.priority === priorityFilter).length}
 
              </span>
            </div>

            {/* CARDS */}
            <div className="space-y-3">

              {orders
  .filter(o => o.stage === stage)
  .filter(o => priorityFilter === "All" || o.priority === priorityFilter)
  .filter(o => vendorFilter === "All" || o.vendor === vendorFilter)
  .map(o => (
                  <div
                    key={o.id}
                    className={`bg-white p-3 rounded-lg shadow-sm border ${
                      o.delayed ? "border-red-500" : "border-gray-200"
                    }`}
                  >

                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{o.id}</p>
                      <span
  className={`text-xs px-2 py-1 rounded font-medium
    ${
      o.priority === "HIGH"
        ? "bg-red-100 text-red-600"
        : o.priority === "MEDIUM"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-200 text-gray-600"
    }
  `}
>
  {o.priority}
</span>
                    </div>

                    <p className="text-xs text-gray-500">{o.client}</p>

                    <div className="text-xs mt-2 text-gray-600">
                      <p>Qty: {o.qty}</p>
                      <p>ETA: {o.eta}</p>
                      <p>Vendor: {o.vendor}</p>
                    </div>

                    {o.delayed && (
                      <p className="text-red-500 text-xs mt-2">⚠ Delayed</p>
                    )}

                    <div className="flex gap-2 mt-3">
                      <button
  onClick={() => alert(`Calling ${o.vendor}`)}
  className="flex-1 bg-gray-100 text-xs py-1 rounded"
>
  Call
</button>
                      <button
  onClick={() => window.open(`https://wa.me/91${o.phone}`)}
  className="flex-1 bg-green-100 text-xs py-1 rounded"
>
  WhatsApp
</button>
                    </div>

                  </div>
                ))}

            </div>
          </div>
        ))}

      </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  {/* MACHINE AVAILABILITY */}
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="font-semibold mb-4">Machine Availability</h2>

    <div className="divide-y divide-gray-200 text-sm">

      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Cutting Machine 1
        </div>
        <span className="text-gray-500 text-xs">⏱︎ Apr 1, 6:00 PM</span>
      </div>

      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Cutting Machine 2
        </div>
        <span className="text-gray-500 text-xs">⏱︎ Now</span>
      </div>

      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Stitching Line 1
        </div>
        <span className="text-gray-500 text-xs">⏱︎ Apr 2, 10:00 AM</span>
      </div>

      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Stitching Line 2
        </div>
        <span className="text-gray-500 text-xs">⏱︎ Apr 1, 8:00 PM</span>
      </div>

      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Finishing Station 1
        </div>
        <span className="text-gray-500 text-xs">⏱︎ Now</span>
      </div>

    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col gap-6">

    {/* LABOUR */}
    <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
      <div>
        <h2 className="font-semibold">Labour Availability</h2>
        <p className="text-2xl font-bold mt-2">42 / 50</p>
        <p className="text-sm text-gray-500">Workers Available</p>
      </div>

      <span className="text-green-600 text-sm font-medium">
        84% Capacity
      </span>
    </div>

    {/* ETA */}
    <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
      <h2 className="font-semibold mb-2">ETA Predictor</h2>
      <p className="text-sm text-gray-600 mb-4">
        Based on current production rate and machine availability
      </p>

      <div className="bg-white p-4 rounded-lg">
        <p className="text-sm text-gray-500">Average Completion Time</p>
        <p className="text-2xl font-bold text-green-600">6.2 days</p>
        <p className="text-xs text-gray-400 mt-1">
          ↓ 0.8 days faster than last month
        </p>
      </div>
    </div>

  </div>

</div>

{showForm && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[400px]">

      <h2 className="font-semibold mb-4">Create Order</h2>

<input
  value={form.client}
  onChange={(e) => setForm({...form, client: e.target.value})}
  placeholder="Client Name"
  className="w-full border p-2 mb-2 rounded"
/>

<input
  value={form.phone}
  onChange={(e) => setForm({...form, phone: e.target.value})}
  placeholder="Mobile Number"
  className="w-full border p-2 mb-2 rounded"
/>

<input
  value={form.product}
  onChange={(e) => setForm({...form, product: e.target.value})}
  placeholder="Product"
  className="w-full border p-2 mb-2 rounded"
/>

<select
  value={form.fabric}
  onChange={(e) => setForm({...form, fabric: e.target.value})}
  className="w-full border p-2 mb-2 rounded"
>
  <option>Cotton</option>
  <option>Denim</option>
  <option>Linen</option>
  <option>Satin</option>
  <option>Polyester</option>
</select>

<select
  value={form.complexity}
  onChange={(e) => setForm({...form, complexity: e.target.value})}
  className="w-full border p-2 mb-2 rounded"
>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>

	<select
  value={form.priority}
  onChange={(e) => setForm({...form, priority: e.target.value})}
  className="w-full border p-2 mb-2 rounded"
>
  <option value="HIGH">High</option>
  <option value="MEDIUM">Medium</option>
  <option value="LOW">Low</option>
</select>



      <select className="w-full border p-2 mb-2 rounded">
        <option>HIGH</option>
        <option>MEDIUM</option>
        <option>LOW</option>
      </select>

      <select className="w-full border p-2 mb-4 rounded">
        {vendors.map(v => (
          <option key={v}>{v}</option>
        ))}
      </select>

      <div className="flex justify-end gap-2">
        <button onClick={() => setShowForm(false)}>Cancel</button>

        <button
         onClick={() => {
  const newOrder = {
    id: "ORD-" + Math.floor(Math.random() * 10000),
    stage: "Cutting",
    client: form.client,
    phone: form.phone,
    fabric: form.fabric,
    complexity: form.complexity,
    priority: form.priority,
    vendor: form.vendor,
    qty: 100,
    eta: "TBD"
  };

  setOrders(prev => [...prev, newOrder]);
  setShowForm(false);

          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );



}