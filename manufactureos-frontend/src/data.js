export const VENDORS_LIST = [
  {
    id: "VEN-001",
    name: "Kumar Textiles",
    specialty: "Fabric Cutting & Stitching",
    availability: "available",
    rating: 4.8,
    activeOrders: 2,
    pendingAmount: "₹4.2L",
    contact: { phone: "+91 98765 11111", email: "kumar.textiles@vendor.com", address: "Industrial Area, Sector 12, Delhi" },
    orders: [
      { id: "ORD-2401", due: "Apr 8",  status: "In Progress" },
      { id: "ORD-2405", due: "Apr 15", status: "Ready" },
    ],
    costBreakdown: { labour: "₹1.5L", materials: "₹2.2L", overhead: "₹0.5L" },
    paymentSummary: { totalPaid: "₹15.7L", pending: "₹4.2L" },
    paymentHistory: [
      { amount: "₹15,000", date: "Mar 28, 2026", status: "Paid" },
      { amount: "₹12,500", date: "Mar 15, 2026", status: "Paid" },
      { amount: "₹18,200", date: "Mar 1, 2026",  status: "Paid" },
    ],
    review: { rating: 4.8, text: "Excellent quality and timely delivery. Highly recommended for bulk orders." },
  },
  {
    id: "VEN-002",
    name: "Singh Manufacturing",
    specialty: "Stitching & Embroidery",
    availability: "busy",
    rating: 4.5,
    activeOrders: 2,
    pendingAmount: "₹2.5L",
    contact: { phone: "+91 98765 22222", email: "singh@vendor.com", address: "Sector 14, Okhla, Delhi" },
    orders: [
      { id: "ORD-2390", due: "Apr 10", status: "In Progress" },
      { id: "ORD-2395", due: "Apr 12", status: "In Progress" },
    ],
    costBreakdown: { labour: "₹1.2L", materials: "₹1.1L", overhead: "₹0.2L" },
    paymentSummary: { totalPaid: "₹12.4L", pending: "₹2.5L" },
    paymentHistory: [
      { amount: "₹10,000", date: "Mar 20, 2026", status: "Paid" },
      { amount: "₹22,400", date: "Feb 15, 2026", status: "Paid" },
    ],
    review: { rating: 4.5, text: "Good stitching, but sometimes delayed during peak seasons." },
  },
  {
    id: "VEN-003",
    name: "Patel Garments",
    specialty: "Finishing & Quality Control",
    availability: "available",
    rating: 4.7,
    activeOrders: 1,
    pendingAmount: "₹2.0L",
    contact: { phone: "+91 98765 33333", email: "patel@vendor.com", address: "Sector 1, Surat, Gujarat" },
    orders: [
      { id: "ORD-2410", due: "May 2", status: "Ready" },
    ],
    costBreakdown: { labour: "₹1.5L", materials: "₹0.2L", overhead: "₹0.3L" },
    paymentSummary: { totalPaid: "₹8.2L", pending: "₹2.0L" },
    paymentHistory: [
      { amount: "₹15,200", date: "Mar 10, 2026", status: "Paid" },
    ],
    review: { rating: 4.7, text: "Very consistent quality control. Rarely find defects." },
  },
];

export const FINANCE_DATA = {
  kpis: [
    { title: "Total Revenue (YTD)", value: "₹48.2L", change: "+12.5%", up: true, dashboardLabel: "Revenue" },
    { title: "Receivables Collected", value: "₹39.4L", change: "+8.2%", up: true },
    { title: "Payables Due", value: "₹8.7L", change: "-5.3%", up: false },
    { title: "Receivables Pending", value: "₹4.5L", change: "-2.1%", up: false, dashboardLabel: "Pending Payments" },
    { title: "Profit (YTD)", value: "₹15.1L", change: "+15.2%", up: true },
  ],
  
  overview: {
    totalOrders: 248,
    delayedOrders: 12,
    revenue: "₹48.2L",
    pendingPayments: "₹4.5L",
  },

  payments: [
    { client: "Fashion Hub Inc", order: "ORD-2401", orderValue: "₹18.5K", amount: "₹18.5K", status: "Paid", dueDate: "Apr 5, 2026" },
    { client: "StyleCraft Ltd",  order: "ORD-2402", orderValue: "₹25K",   amount: "₹12.3K", status: "Partial", dueDate: "Apr 10, 2026" },
    { client: "Urban Threads",   order: "ORD-2403", orderValue: "₹22.8K", amount: "₹22.8K", status: "Paid", dueDate: "Apr 8, 2026" },
    { client: "Textile Masters", order: "ORD-2404", orderValue: "₹8.9K",  amount: "₹8.9K",  status: "Pending", dueDate: "Apr 12, 2026" },
    { client: "Fashion Hub Inc", order: "ORD-2405", orderValue: "₹15.2K", amount: "₹15.2K", status: "Paid", dueDate: "Apr 15, 2026" },
    { client: "Modern Apparel",  order: "ORD-2406", orderValue: "₹35K",   amount: "₹19.5K", status: "Partial", dueDate: "Apr 18, 2026" },
    { client: "StyleCraft Ltd",  order: "ORD-2407", orderValue: "₹11.7K", amount: "₹11.7K", status: "Pending", dueDate: "Apr 20, 2026" },
  ],

  cashAllocation: [
    { name: "Production",    value: 210000 },
    { name: "Salaries",      value: 120000 },
    { name: "Overheads",     value: 82000  },
    { name: "Procurement",   value: 45000  },
  ],

  vendorDues: {
    total: "₹8.7L",
    breakdown: [
      { vendor: "Global Fabrics Ltd", amount: "₹4.2L", status: "Overdue", dueDate: "Apr 3, 2026"    },
      { vendor: "Swift Logistics",    amount: "₹2.5L", status: "Due soon", dueDate: "Apr 6, 2026"   },
      { vendor: "Eco Packaging",      amount: "₹2.0L", status: "Due in 30d", dueDate: "Apr 7, 2026" },
    ],
  },

  expenses: [
    { category: "Raw Materials",          amount: "₹1.20L", change: "+15.2%", details: [{ desc: "Steel Sheets", amount: "₹60K" }, { desc: "Aluminum Extrusion", amount: "₹45K" }, { desc: "Fabric & Thread", amount: "₹15K" }] },
    { category: "Factory Rent",           amount: "₹85K",   change: "0.0%",   details: [{ desc: "Main Unit Shed A", amount: "₹50K" }, { desc: "Warehouse B", amount: "₹35K" }] },
    { category: "Electricity & Utilities",amount: "₹42K",   change: "+5.1%",  details: [{ desc: "Heavy Machinery Power", amount: "₹28K" }, { desc: "HVAC & Lighting", amount: "₹10K" }, { desc: "Water & Waste", amount: "₹4K" }] },
    { category: "Salaries (Production)",  amount: "₹1.50L", change: "+2.4%",  details: [{ desc: "Machine Operators (12)", amount: "₹90K" }, { desc: "Floor Supervisors (3)", amount: "₹40K" }, { desc: "Support Staff (4)", amount: "₹20K" }] },
    { category: "Logistics & Shipping",   amount: "₹28K",   change: "-3.2%",  details: [{ desc: "Outbound Freight", amount: "₹18K" }, { desc: "Local Transports", amount: "₹7K" }, { desc: "Packaging Supp.", amount: "₹3K" }] },
  ],

  productionLineup: [
    { id: "ORD-2401", client: "Fashion Hub", status: "Finishing", steps: ["Cutting", "Stitching", "Finishing", "QC", "Dispatch"], currentStep: 2 },
    { id: "ORD-2402", client: "StyleCraft", status: "Stitching", steps: ["Cutting", "Stitching", "Finishing", "QC", "Dispatch"], currentStep: 1, alert: true },
    { id: "ORD-2403", client: "Urban Threads", status: "QC", steps: ["Cutting", "Stitching", "Finishing", "QC", "Dispatch"], currentStep: 3 },
  ],

  inventory: [
    { name: "Fabric", level: "normal", quantity: "450 meters" },
    { name: "Thread", level: "low", quantity: "180 spools", alert: "AI: Low stock predicted next 7 days" },
    { name: "Dye", level: "normal", quantity: "85 liters" },
    { name: "Buttons", level: "normal", quantity: "5000 pieces" },
  ],

  activities: [
    { text: "Order ORD-2408 moved to QC", type: "blue", time: "10 min ago" },
    { text: "Payment received from Fashion Hub Inc - ₹18,500", type: "green", time: "25 min ago" },
    { text: "Order ORD-2407 dispatched", type: "blue", time: "1 hour ago" },
    { text: "New order ORD-2409 created", type: "blue", time: "2 hours ago" },
    { text: "Vendor payment completed - ₹8,200", type: "green", time: "3 hours ago" },
  ]
};
