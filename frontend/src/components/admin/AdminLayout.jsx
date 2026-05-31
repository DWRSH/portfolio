import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, LogOut, ShieldCheck, Menu, X } from 'lucide-react';

/* ─── ULTRA-PREMIUM SIDEBAR & LAYOUT STYLES ─────────────────────────────── */
const eliteLayoutStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --bg-sidebar: rgba(5, 7, 10, 0.95);
    --primary: #00d2b4;
    --danger: #ef4444;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .al-wrapper {
    display: flex;
    height: 100vh;
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }

  /* --- Mobile Header (Hidden on Desktop) --- */
  .al-mobile-header {
    display: none;
  }

  /* --- Sidebar --- */
  .al-sidebar {
    width: 280px;
    background: var(--bg-sidebar);
    border-right: 1px solid var(--glass-border);
    display: flex;
    flex-direction: column;
    padding: 32px 24px;
    backdrop-filter: blur(20px);
    z-index: 50;
    flex-shrink: 0;
    transition: transform 0.4s var(--easing-premium);
  }

  /* Admin Brand */
  .al-brand {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 48px; padding-bottom: 32px;
    border-bottom: 1px solid var(--glass-border);
  }
  .al-brand-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(0,210,180,0.1); border: 1px solid rgba(0,210,180,0.3);
    display: flex; align-items: center; justify-content: center;
    color: var(--primary); box-shadow: 0 0 20px rgba(0,210,180,0.1);
  }
  .al-brand-text {
    font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
    color: var(--text-main); letter-spacing: -0.02em;
  }

  /* Navigation Links */
  .al-nav {
    display: flex; flex-direction: column; gap: 8px; flex-grow: 1;
  }
  .al-link {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px; border-radius: 12px;
    font-size: 15px; font-weight: 600; color: var(--text-muted);
    text-decoration: none; transition: all 0.3s var(--easing-premium);
    border: 1px solid transparent;
  }
  .al-link svg { transition: transform 0.3s var(--easing-premium); }
  
  .al-link:hover {
    background: rgba(255,255,255,0.02); color: var(--text-main);
  }
  .al-link:hover svg { transform: translateX(2px); color: var(--text-main); }

  /* Active Link State */
  .al-link.active {
    background: rgba(0,210,180,0.08); border-color: rgba(0,210,180,0.2);
    color: var(--primary); box-shadow: inset 4px 0 0 var(--primary);
  }
  .al-link.active svg { color: var(--primary); }

  /* Logout Button */
  .al-logout {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px; border-radius: 12px;
    font-size: 15px; font-weight: 600; color: var(--text-muted);
    background: transparent; border: 1px solid transparent;
    cursor: pointer; transition: all 0.3s var(--easing-premium);
    text-align: left; width: 100%; margin-top: auto;
  }
  .al-logout:hover {
    background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2);
    color: var(--danger);
  }

  /* --- Main Content Area --- */
  .al-content {
    flex-grow: 1;
    height: 100vh;
    overflow-y: auto;
    position: relative;
    background: var(--bg-ultra-dark);
  }
  .al-content::-webkit-scrollbar { width: 8px; }
  .al-content::-webkit-scrollbar-track { background: var(--bg-ultra-dark); }
  .al-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

  /* --- Mobile Responsive Logic --- */
  @media (max-width: 768px) {
    .al-wrapper { flex-direction: column; }
    
    .al-mobile-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 24px; background: var(--bg-sidebar);
      border-bottom: 1px solid var(--glass-border);
      z-index: 40;
    }
    
    .al-mobile-brand {
      font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
      color: var(--text-main); display: flex; align-items: center; gap: 8px;
    }

    .al-mobile-menu-btn {
      background: transparent; border: none; color: var(--text-main);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
    }

    /* Sidebar transforms into a slide-over menu */
    .al-sidebar {
      position: fixed; inset: 0; right: auto; height: 100vh;
      transform: translateX(-100%);
      border-right: 1px solid var(--glass-border);
      box-shadow: 20px 0 50px rgba(0,0,0,0.5);
    }
    .al-sidebar.open { transform: translateX(0); }
    
    .al-content { height: calc(100vh - 70px); }

    /* Mobile Overlay */
    .al-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
      z-index: 40; opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .al-overlay.open { opacity: 1; pointer-events: auto; }
  }
`;

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Insights', path: '/admin/blog', icon: FileText },
  ];

  return (
    <>
      <style>{eliteLayoutStyles}</style>
      
      <div className="al-wrapper">
        
        {/* --- Mobile Header --- */}
        <header className="al-mobile-header">
          <div className="al-mobile-brand">
            <ShieldCheck size={20} color="var(--primary)" />
            Admin Root
          </div>
          <button onClick={toggleSidebar} className="al-mobile-menu-btn" aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </header>

        {/* Mobile Overlay (Click to close) */}
        <div 
          className={`al-overlay ${isSidebarOpen ? 'open' : ''}`} 
          onClick={closeSidebar}
        />

        {/* --- Sleek Glass Sidebar --- */}
        <aside className={`al-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          
          <div className="al-brand" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="al-brand-icon">
                <ShieldCheck size={24} strokeWidth={2.5} />
              </div>
              <span className="al-brand-text">Command</span>
            </div>
            {/* Close button for mobile inside sidebar */}
            <button onClick={closeSidebar} className="al-mobile-menu-btn md:hidden" style={{ display: window.innerWidth > 768 ? 'none' : 'block' }}>
              <X size={24} />
            </button>
          </div>

          <nav className="al-nav">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  onClick={closeSidebar} // Close menu on mobile when a link is clicked
                  className={`al-link ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <button onClick={handleLogout} className="al-logout">
            <LogOut size={20} />
            <span>Terminate Session</span>
          </button>
          
        </aside>

        {/* --- Dynamic Content Area --- */}
        <main className="al-content">
          <Outlet />
        </main>
        
      </div>
    </>
  );
}
