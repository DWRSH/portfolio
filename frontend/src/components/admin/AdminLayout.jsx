import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react'; // Menu icon ke liye

// --- BADLAAV ---
// Import path ko relative ('./') se absolute ('/src/') kar diya gaya hai
// taaki Vite ise hamesha sahi jagah se dhoondh sake.
import AdminSidebar from '/src/components/admin/AdminSidebar.jsx';
// --- END BADLAAV ---

export default function AdminLayout() {
  // Sidebar ke state ko manage karne ke liye (mobile par)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar Component */}
      <AdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        onClose={toggleSidebar} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out md:ml-64">
        {/* Mobile Header - Sirf mobile par dikhega */}
        <header className="md:hidden sticky top-0 bg-slate-800 shadow-md z-10">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <button
              onClick={toggleSidebar}
              className="text-white p-2 rounded-md hover:bg-slate-700"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 md:p-8">
          <Outlet /> {/* Baki admin pages yahan render honge */}
        </main>
      </div>
    </div>
  );
}

