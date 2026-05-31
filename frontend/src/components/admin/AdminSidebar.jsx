import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Files, LogOut, X, ShieldCheck } from 'lucide-react';

/* ─── ELITE SIDEBAR STYLES ──────────────────────────────────────── */
const eliteSidebarClasses = {
  link: ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-teal-500/10 to-transparent text-teal-400 border-l-2 border-teal-400'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
    }`,
  container: (isOpen) => 
    `fixed inset-y-0 left-0 z-40 w-72 bg-[#0a0e14]/90 backdrop-blur-xl border-r border-slate-800 p-6
     transform transition-transform duration-500 ease-in-out
     ${isOpen ? 'translate-x-0' : '-translate-x-full'}
     md:translate-x-0`
};

export default function AdminSidebar({ isSidebarOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={eliteSidebarClasses.container(isSidebarOpen)}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/10 p-2 rounded-lg text-teal-400 border border-teal-500/20">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Command</h2>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col h-[calc(100%-8rem)]">
          <ul className="flex-1 space-y-2">
            <li>
              <NavLink to="/admin/dashboard" className={eliteSidebarClasses.link} onClick={onClose}>
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/projects" className={eliteSidebarClasses.link} onClick={onClose}>
                <Files size={20} />
                <span className="font-medium">Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/blog" className={eliteSidebarClasses.link} onClick={onClose}>
                <Newspaper size={20} />
                <span className="font-medium">Insights</span>
              </NavLink>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-rose-400 hover:bg-rose-900/10 hover:text-rose-300 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Terminate Session</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
