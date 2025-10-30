import React from 'react';
// We are replacing NavLink with regular <a> tags to resolve the Router context error.
// This component is being rendered without a <BrowserRouter> wrapper.
import { NavLink } from 'react-router-dom'; // Using Link, but NavLink is what needs context. Let's use <a> tags for a pure fix.
import { Home, User, Briefcase, FileText } from 'lucide-react';

export default function Header() {
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About', icon: User, path: '/about' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Blog', icon: FileText, path: '/blog' },
  ];

  // This function is for NavLink, which requires a Router context.
  // We will use a simplified class for standard <a> tags.
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-colors ${
      isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
    }`;
  
  // A simple class for <a> tags since we don't have active state
  const linkClass = "flex items-center gap-2 transition-colors text-slate-300 hover:text-cyan-400";

  return (
    <header className="bg-slate-800/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-white">
          {/* Replaced NavLink with <a> tag */}
          <NavLink to="/">[DARSH]</NavLink>
        </div>
        <div className="flex items-center gap-6">
          {navItems.map(item => (
            // Replaced NavLink with <a> tag and 'to' with 'href'
            // Using a simple class instead of getNavLinkClass
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            <NavLink
              key={item.path}
              to={item.path}
              className={getNavLinkClass}
            >
              <item.icon size={20} />
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

