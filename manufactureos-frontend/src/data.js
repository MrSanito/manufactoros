export const VENDORS_LIST = [
  {
    id: "VEN-001",
    name: "Kumar Textiles",
    specialty: "Fabric Cutting & Stitching",
    availability: "available",
    rating: 4.8,
    activeOrders: 2,
    pendingAmount: "₹42L",
    contact: { phone: "+91 98765 11111", email: "kumar.textiles@vendor.com", address: "Industrial Area, Sector 12, Delhi" },
    orders: [
      { id: "ORD-2401", due: "Apr 8",  status: "In Progress" },
      { id: "ORD-2405", due: "Apr 15", status: "Ready" },
    ],
    costBreakdown: { labour: "₹15L", materials: "₹22L", overhead: "₹5L" },
    paymentSummary: { totalPaid: "₹157L", pending: "₹42L" },
    paymentHistory: [
      { amount: "₹1,50,000", date: "Mar 28, 2026", status: "Paid" },
      { amount: "₹1,25,000", date: "Mar 15, 2026", status: "Paid" },
      { amount: "₹1,82,000", date: "Mar 1, 2026",  status: "Paid" },
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
    pendingAmount: "₹25L",
    contact: { phone: "+91 98765 22222", email: "singh@vendor.com", address: "Sector 14, Okhla, Delhi" },
    orders: [
      { id: "ORD-2390", due: "Apr 10", status: "In Progress" },
      { id: "ORD-2395", due: "Apr 12", status: "In Progress" },
    ],
    costBreakdown: { labour: "₹12L", materials: "₹11L", overhead: "₹2L" },
    paymentSummary: { totalPaid: "₹124L", pending: "₹25L" },
    paymentHistory: [
      { amount: "₹1,00,000", date: "Mar 20, 2026", status: "Paid" },
      { amount: "₹2,24,000", date: "Feb 15, 2026", status: "Paid" },
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
    pendingAmount: "₹20L",
    contact: { phone: "+91 98765 33333", email: "patel@vendor.com", address: "Sector 1, Surat, Gujarat" },
    orders: [
      { id: "ORD-2410", due: "May 2", status: "Ready" },
    ],
    costBreakdown: { labour: "₹15L", materials: "₹2L", overhead: "₹3L" },
    paymentSummary: { totalPaid: "₹82L", pending: "₹20L" },
    paymentHistory: [
      { amount: "₹1,52,000", date: "Mar 10, 2026", status: "Paid" },
    ],
    review: { rating: 4.7, text: "Very consistent quality control. Rarely find defects." },
  },
];

export const FINANCE_DATA = {
  kpis: [
    { title: "Total Revenue (YTD)", value: "₹482L", change: "+12.5%", up: true, dashboardLabel: "Revenue" },
    { title: "Receivables Collected", value: "₹394L", change: "+8.2%", up: true },
    { title: "Payables Due", value: "₹87L", change: "-5.3%", up: false },
    { title: "Receivables Pending", value: "₹45L", change: "-2.1%", up: false, dashboardLabel: "Pending Payments" },
    { title: "Profit (YTD)", value: "₹151L", change: "+15.2%", up: true },
  ],
  
  overview: {
    totalOrders: 2480,
    delayedOrders: 120,
    revenue: "₹482L",
    pendingPayments: "₹45L",
  },

  payments: [
    { client: "Fashion Hub Inc", order: "ORD-2401", orderValue: "₹185K", amount: "₹185K", status: "Paid", dueDate: "Apr 5, 2026" },
    { client: "StyleCraft Ltd",  order: "ORD-2402", orderValue: "₹250K",  amount: "₹123K", status: "Partial", dueDate: "Apr 10, 2026" },
    { client: "Urban Threads",   order: "ORD-2403", orderValue: "₹228K", amount: "₹228K", status: "Paid", dueDate: "Apr 8, 2026" },
    { client: "Textile Masters", order: "ORD-2404", orderValue: "₹89K",   amount: "₹89K",  status: "Pending", dueDate: "Apr 12, 2026" },
    { client: "Fashion Hub Inc", order: "ORD-2405", orderValue: "₹152K", amount: "₹152K", status: "Paid", dueDate: "Apr 15, 2026" },
    { client: "Modern Apparel",  order: "ORD-2406", orderValue: "₹350K",  amount: "₹195K", status: "Partial", dueDate: "Apr 18, 2026" },
    { client: "StyleCraft Ltd",  order: "ORD-2407", orderValue: "₹117K", amount: "₹117K", status: "Pending", dueDate: "Apr 20, 2026" },
  ],

  cashAllocation: [
    { name: "Production",    value: 2100000 },
    { name: "Salaries",      value: 1200000 },
    { name: "Overheads",     value: 820000  },
    { name: "Procurement",   value: 450000  },
  ],

  vendorDues: {
    total: "₹87L",
    breakdown: [
      { vendor: "Global Fabrics Ltd", amount: "₹42L", status: "Overdue", dueDate: "Apr 3, 2026"    },
      { vendor: "Swift Logistics",    amount: "₹25L", status: "Due soon", dueDate: "Apr 6, 2026"   },
      { vendor: "Eco Packaging",      amount: "₹20L", status: "Due in 30d", dueDate: "Apr 7, 2026" },
    ],
  },

  expenses: [
    { category: "Raw Materials",          amount: "₹12L",   change: "+15.2%", details: [{ desc: "Steel Sheets", amount: "₹6L" }, { desc: "Aluminum Extrusion", amount: "₹4.5L" }, { desc: "Fabric & Thread", amount: "₹1.5L" }] },
    { category: "Factory Rent",           amount: "₹8.5L",  change: "0.0%",   details: [{ desc: "Main Unit Shed A", amount: "₹5L" }, { desc: "Warehouse B", amount: "₹3.5L" }] },
    { category: "Electricity & Utilities",amount: "₹4.2L",  change: "+5.1%",  details: [{ desc: "Heavy Machinery Power", amount: "₹2.8L" }, { desc: "HVAC & Lighting", amount: "₹1L" }, { desc: "Water & Waste", amount: "₹0.4L" }] },
    { category: "Salaries (Production)",  amount: "₹15L",   change: "+2.4%",  details: [{ desc: "Machine Operators (12)", amount: "₹9L" }, { desc: "Floor Supervisors (3)", amount: "₹4L" }, { desc: "Support Staff (4)", amount: "₹2L" }] },
    { category: "Logistics & Shipping",   amount: "₹2.8L",  change: "-3.2%",  details: [{ desc: "Outbound Freight", amount: "₹1.8L" }, { desc: "Local Transports", amount: "₹0.7L" }, { desc: "Packaging Supp.", amount: "₹0.3L" }] },
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
    { text: "Payment received from Fashion Hub Inc - ₹1,85,000", type: "green", time: "25 min ago" },
    { text: "Order ORD-2407 dispatched", type: "blue", time: "1 hour ago" },
    { text: "New order ORD-2409 created", type: "blue", time: "2 hours ago" },
    { text: "Vendor payment completed - ₹82,000", type: "green", time: "3 hours ago" },
  ]
};
