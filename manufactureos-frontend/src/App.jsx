import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./Dashboard";
import Production from "./Production";
import Finance from "./Finance";
import Employees from "./Employees";
import Vendors from "./Vendors";
import History from "./History";
import Alerts from "./Alerts";
import Inventory from "./Inventory";
import SalesPortal from "./sales/page";
import { RiMenuLine, RiBellLine, RiAlertLine, RiMoneyDollarCircleLine, RiArchiveLine, RiLogoutBoxLine } from "react-icons/ri";

export default function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Sales", path: "/sales" },
    { name: "Production", path: "/production" },
    { name: "Finance", path: "/finance" },
    { name: "Employees", path: "/employees" },
    { name: "Vendors", path: "/vendors" },
    { name: "Inventory", path: "/inventory" },
    { name: "History", path: "/history" },
    { name: "Alerts", path: "/alerts" }
  ];

  const isSalesPage = location.pathname === "/sales";

  // If we are on the Sales page, we might want a different layout or just show the component
  // Since SalesPortal has its own sidebar in the current implementation, we should check if they want to keep it.
  // HOWEVER, the user said "design it accordingly the website theme" and "react router /sales it should show".
  // The SalesPortal.jsx I built earlier has its OWN sidebar.
  // This might create nested sidebars if I'm not careful.
  
  // Actually, SalesPortal.jsx (src/sales/page.tsx) is a FULL PAGE component with its own sidebar.
  // If the user wants /sales to show THAT, we should probably allow it to take over the screen.

  if (isSalesPage) {
    return (
      <>
        <Toaster position="bottom-right" />
        <SalesPortal />
      </>
    );
  }

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
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`block p-2 rounded cursor-pointer transition-colors ${
                location.pathname === item.path ? "bg-green-500" : "hover:bg-slate-700"
              }`}
            >
              {item.name}
            </Link>
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

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/production" element={<Production />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/history" element={<History />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </div>
  );
}

