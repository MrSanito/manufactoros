export const VENDORS_LIST = [
  {
    id: "VEN-001",
    name: "Kumar Textiles",
    specialty: "Fabric Cutting & Stitching",
    availability: "available",
    rating: 4.8,
    activeOrders: 2,
    pendingAmount: "₹4.2 L",
    contact: { phone: "+91 98765 11111", email: "kumar.textiles@vendor.com", address: "Industrial Area, Sector 12, Delhi" },
    orders: [
      { id: "ORD-2401", due: "Apr 8",  status: "In Progress" },
      { id: "ORD-2405", due: "Apr 15", status: "Ready" },
    ],
    costBreakdown: { labour: "₹1.5 L", materials: "₹2.2 L", overhead: "₹0.5 L" },
    paymentSummary: { totalPaid: "₹5.5 L", pending: "₹4.2 L" },
    paymentHistory: [
      { amount: "₹1.5 L", date: "Mar 28, 2026", status: "Paid" },
      { amount: "₹1.2 L", date: "Mar 15, 2026", status: "Paid" },
      { amount: "₹1.8 L", date: "Mar 1, 2026",  status: "Paid" },
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
    pendingAmount: "₹2.5 L",
    contact: { phone: "+91 98765 22222", email: "singh@vendor.com", address: "Sector 14, Okhla, Delhi" },
    orders: [
      { id: "ORD-2390", due: "Apr 10", status: "In Progress" },
      { id: "ORD-2395", due: "Apr 12", status: "In Progress" },
    ],
    costBreakdown: { labour: "₹1.2 L", materials: "₹1.1 L", overhead: "₹0.2 L" },
    paymentSummary: { totalPaid: "₹3.2 L", pending: "₹2.5 L" },
    paymentHistory: [
      { amount: "₹1.0 L", date: "Mar 20, 2026", status: "Paid" },
      { amount: "₹2.2 L", date: "Feb 15, 2026", status: "Paid" },
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
    pendingAmount: "₹2.0 L",
    contact: { phone: "+91 98765 33333", email: "patel@vendor.com", address: "Sector 1, Surat, Gujarat" },
    orders: [
      { id: "ORD-2410", due: "May 2", status: "Ready" },
    ],
    costBreakdown: { labour: "₹1.5 L", materials: "₹0.2 L", overhead: "₹0.3 L" },
    paymentSummary: { totalPaid: "₹2.8 L", pending: "₹2.0 L" },
    paymentHistory: [
      { amount: "₹1.5 L", date: "Mar 10, 2026", status: "Paid" },
    ],
    review: { rating: 4.7, text: "Very consistent quality control. Rarely find defects." },
  },
];

export const FINANCE_DATA = {
  kpis: [
    { title: "Total Revenue (YTD)", value: "₹54 L", change: "+12.5%", up: true, dashboardLabel: "Revenue" },
    { title: "Receivables Collected", value: "₹42 L", change: "+8.2%", up: true },
    { title: "Payables Due", value: "₹8.7 L", change: "-5.3%", up: false },
    { title: "Receivables Pending", value: "₹12 L", change: "-2.1%", up: false, dashboardLabel: "Pending Payments" },
    { title: "Profit (YTD)", value: "₹13.5 L", change: "+15.2%", up: true },
  ],
  
  overview: {
    totalOrders: 2480,
    delayedOrders: 120,
    revenue: "₹54 L",
    pendingPayments: "₹12 L",
  },

  performance: {
    monthly: [
      { name: "Jan", Revenue: 850000,  Cost: 620000 },
      { name: "Feb", Revenue: 920000,  Cost: 700000 },
      { name: "Mar", Revenue: 750000,  Cost: 580000 },
      { name: "Apr", Revenue: 950000,  Cost: 720000 },
      { name: "May", Revenue: 880000,  Cost: 650000 },
      { name: "Jun", Revenue: 1050000, Cost: 780000 },
    ],
    quarterly: [
      { name: "Q1", Revenue: 2520000, Cost: 1900000 },
      { name: "Q2", Revenue: 2880000, Cost: 2150000 },
    ],
    topProfitOrders: [
      { id: "ORD-2401", client: "Fashion Hub",     profit: "+₹0.52 L" },
      { id: "ORD-2399", client: "Urban Threads",   profit: "+₹0.48 L" },
      { id: "ORD-2406", client: "Modern Apparel",  profit: "+₹0.36 L" },
      { id: "ORD-2385", client: "StyleCraft",      profit: "+₹0.29 L" },
      { id: "ORD-2372", client: "Textile Masters", profit: "+₹0.21 L" },
    ],
    topLossOrders: [
      { id: "ORD-2391", client: "Beta Brand",    loss: "-₹0.18 L" },
      { id: "ORD-2384", client: "Local Retail",  loss: "-₹0.12 L" },
      { id: "ORD-2342", client: "Quick Fashion", loss: "-₹0.08 L" },
      { id: "ORD-2311", client: "Street Wear",   loss: "-₹0.06 L" },
      { id: "ORD-2298", client: "Active Gear",   loss: "-₹0.04 L" },
    ]
  },

  payments: [
    { client: "Fashion Hub Inc", order: "ORD-2401", orderValue: "₹1.85 L", amount: "₹1.85 L", status: "Paid", dueDate: "Apr 5, 2026" },
    { client: "StyleCraft Ltd",  order: "ORD-2402", orderValue: "₹2.5 L",  amount: "₹1.23 L", status: "Partial", dueDate: "Apr 10, 2026" },
    { client: "Urban Threads",   order: "ORD-2403", orderValue: "₹2.28 L", amount: "₹2.28 L", status: "Paid", dueDate: "Apr 8, 2026" },
    { client: "Textile Masters", order: "ORD-2404", orderValue: "₹0.08 L",   amount: "₹0.08 L",  status: "Pending", dueDate: "Apr 12, 2026" },
    { client: "Fashion Hub Inc", order: "ORD-2405", orderValue: "₹1.52 L", amount: "₹1.52 L", status: "Paid", dueDate: "Apr 15, 2026" },
    { client: "Modern Apparel",  order: "ORD-2406", orderValue: "₹3.5 L",  amount: "₹1.95 L", status: "Partial", dueDate: "Apr 18, 2026" },
    { client: "StyleCraft Ltd",  order: "ORD-2407", orderValue: "₹1.17 L", amount: "₹1.17 L", status: "Pending", dueDate: "Apr 20, 2026" },
  ],

  cashAllocation: [
    { name: "Production",    value: 2100000 },
    { name: "Salaries",      value: 1200000 },
    { name: "Overheads",     value: 820000  },
    { name: "Procurement",   value: 450000  },
  ],

  vendorDues: {
    total: "₹8.7 L",
    breakdown: [
      { vendor: "Kumar Textiles",     amount: "₹4.2 L", status: "Overdue", dueDate: "Apr 3, 2026"    },
      { vendor: "Singh Manufacturing", amount: "₹2.5 L", status: "Due soon", dueDate: "Apr 6, 2026"   },
      { vendor: "Patel Garments",      amount: "₹2.0 L", status: "Due in 30d", dueDate: "Apr 7, 2026" },
    ],
  },

  expenses: [
    { category: "Raw Materials",          amount: "₹1.2 L",   change: "+15.2%", details: [{ desc: "Steel Sheets", amount: "₹0.60 L" }, { desc: "Aluminum Extrusion", amount: "₹0.40 L" }, { desc: "Fabric & Thread", amount: "₹0.20 L" }] },
    { category: "Factory Rent",           amount: "₹0.80 L",  change: "0.0%",   details: [{ desc: "Main Unit Shed A", amount: "₹0.50 L" }, { desc: "Warehouse B", amount: "₹0.30 L" }] },
    { category: "Electricity & Utilities",amount: "₹0.40 L",  change: "+5.1%",  details: [{ desc: "Heavy Machinery Power", amount: "₹0.20 L" }, { desc: "HVAC & Lighting", amount: "₹0.10 L" }, { desc: "Water & Waste", amount: "₹0.10 L" }] },
    { category: "Salaries (Production)",  amount: "₹1.5 L",   change: "+2.4%",  details: [{ desc: "Machine Operators (12)", amount: "₹0.90 L" }, { desc: "Floor Supervisors (3)", amount: "₹0.40 L" }, { desc: "Support Staff (4)", amount: "₹0.20 L" }] },
    { category: "Logistics & Shipping",   amount: "₹0.20 L",  change: "-3.2%",  details: [{ desc: "Outbound Freight", amount: "₹0.10 L" }, { desc: "Local Transports", amount: "₹0.05 L" }, { desc: "Packaging Supp.", amount: "₹0.05 L" }] },
  ],

  productionLineup: [
    { id: "ORD-2401", client: "Fashion Hub", status: "Finishing", steps: ["Cutting", "Stitching", "Finishing", "QC", "Dispatch"], currentStep: 2 },
    { id: "ORD-2402", client: "StyleCraft", status: "Stitching", steps: ["Cutting", "Stitching", "Finishing", "QC", "Dispatch"], currentStep: 1, alert: true },
    { id: "ORD-2403", client: "Urban Threads", status: "QC", steps: ["Cutting", "Stitching", "Finishing", "QC", "Dispatch"], currentStep: 3 },
  ],

  inventory: [
    { name: "Fabric", level: "normal", quantity: "4500 meters" },
    { name: "Thread", level: "low", quantity: "1800 spools", alert: "AI: Low stock predicted next 7 days" },
    { name: "Dye", level: "normal", quantity: "850 liters" },
    { name: "Buttons", level: "normal", quantity: "50000 pieces" },
  ],

  activities: [
    { text: "Order ORD-2408 moved to QC", type: "blue", time: "10 min ago" },
    { text: "Payment received from Fashion Hub Inc - ₹0.18 L", type: "green", time: "25 min ago" },
    { text: "Order ORD-2407 dispatched", type: "blue", time: "1 hour ago" },
    { text: "New order ORD-2409 created", type: "blue", time: "2 hours ago" },
    { text: "Vendor payment completed - ₹0.08 L", type: "green", time: "3 hours ago" },
  ]
};