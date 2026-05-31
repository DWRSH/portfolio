import React from 'react';
import { Home, User, Briefcase, FileText } from 'lucide-react';

/* ─── PRO STYLES ──────────────────────────────────────────────────────────── */
const proHeaderStyles = `
  :root {
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.65);
    --glass-nav-bg: rgba(5, 7, 10, 0.75);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Fixed Glass Header */
  .hdr-wrapper {
    position: sticky; top: 0; z-index: 50;
    background: var(--glass-nav-bg);
    border-bottom: 1px solid var(--glass-border);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    font-family: 'DM Sans', sans-serif;
  }

  .hdr-container {
    max-width: 1152px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px;
  }

  /* Typography & Logo */
  .hdr-brand {
    display: flex; align-items: center; gap: 4px;
    text-decoration: none; transition: opacity 0.2s;
  }
  .hdr-brand:hover { opacity: 0.85; }
  
  .hdr-brand-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(0,210,180,0.1); border: 1px solid rgba(0,210,180,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
    color: var(--primary); box-shadow: 0 4px 12px rgba(0,210,180,0.1);
  }
  .hdr-brand-text {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
    color: var(--text-main); letter-spacing: 0.05em;
  }

  /* Navigation Links */
  .hdr-nav {
    display: flex; align-items: center; gap: 32px;
  }
  .hdr-link {
    display: flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 500; color: var(--text-muted);
    text-decoration: none; transition: all 0.3s var(--easing);
  }
  .hdr-link:hover { color: var(--primary); }
  .hdr-link svg { transition: transform 0.3s var(--easing); }
  .hdr-link:hover svg { transform: translateY(-2px); }

  @media (max-width: 768px) {
    .hdr-nav { gap: 20px; }
    .hdr-link-text { display: none; } /* Hide text on mobile, keep icons */
  }
`;

export default function Header() {
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About', icon: User, path: '/about' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Blog', icon: FileText, path: '/blog' },
  ];

  return (
    <>
      <style>{proHeaderStyles}</style>
      <header className="hdr-wrapper">
        <div className="hdr-container">
          
          {/* Logo Section (Standard <a> tag replacing NavLink) */}
          <a href="/" className="hdr-brand" aria-label="Home">
            <div className="hdr-brand-icon">D</div>
            <span className="hdr-brand-text">ARSH</span>
          </a>

          {/* Navigation Section */}
          <nav className="hdr-nav">
            {navItems.map(item => (
              // Replaced NavLink with native <a> tag to fix Router Context Error
              <a 
                key={item.path} 
                href={item.path} 
                className="hdr-link"
                aria-label={item.name}
              >
                <item.icon size={18} />
                <span className="hdr-link-text">{item.name}</span>
              </a>
            ))}
          </nav>

        </div>
      </header>
    </>
  );
}
