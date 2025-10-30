import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Files, LogOut, X } from 'lucide-react';

// Sidebar ka link kaisa dikhega, uske liye helper
const getLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? 'bg-cyan-600 text-white'
      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
  }`;

export default function AdminSidebar({ isSidebarOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken'); // Token remove karein
    navigate('/admin/login'); // Login page par redirect karein
    onClose(); // Logout ke baad sidebar band karein (mobile par)
  };

  return (
    <>
      {/* Mobile Overlay - Jab sidebar khula ho tab content ko dhak dega */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 shadow-lg p-6
                   transform transition-transform duration-300 ease-in-out
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Admin</h2>
          {/* Mobile par Close button */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100%-8rem)]">
          <ul className="flex-1 space-y-3">
            <li>
              <NavLink to="/admin/dashboard" className={getLinkClass} onClick={onClose}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/projects" className={getLinkClass} onClick={onClose}>
                <Files size={20} />
                <span>Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/blog" className={getLinkClass} onClick={onClose}>
                <Newspaper size={20} />
                <span>Blog</span>
              </NavLink>
            </li>
          </ul>

          {/* Logout Button - Neeche */}
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left
                         text-red-400 hover:bg-red-900/50 hover:text-red-300"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
