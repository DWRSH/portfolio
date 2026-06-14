import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, FileText, ArrowUpRight } from 'lucide-react';

/* ─── ULTRA-PREMIUM STYLES ────────────────────────────────────────────────── */
const eliteHeaderStyles = `
  :root {
    --primary: #96c2db; /* Updated to Blue-Grey */
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-nav-bg: rgba(5, 7, 10, 0.4);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Fixed Floating Island Wrapper */
  .eh-header-wrapper {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: 90%;
    max-width: 1100px;
    transition: all 0.5s var(--easing-premium);
    font-family: 'DM Sans', sans-serif;
  }

  /* Scrolled State (Shrinks and blurs more when scrolling down) */
  .eh-header-wrapper.scrolled {
    top: 16px;
    max-width: 1000px;
  }

  .eh-nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--glass-nav-bg);
    border: 1px solid var(--glass-border);
    border-radius: 100px; /* Pill shape */
    padding: 8px 12px 8px 24px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05);
    transition: all 0.5s var(--easing-premium);
  }

  .eh-header-wrapper.scrolled .eh-nav-container {
    background: rgba(5, 7, 10, 0.6);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05);
    padding: 6px 10px 6px 20px;
  }

  /* Brand / Logo */
  .eh-brand {
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; transition: transform 0.3s var(--easing-premium);
  }
  .eh-brand:hover { transform: scale(1.05); }
  
  .eh-brand-icon {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--primary); 
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800;
    color: #000; box-shadow: 0 0 16px rgba(150, 194, 219, 0.3); /* Updated RGB for Blue-Grey glow */
  }
  .eh-brand-text {
    font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
    color: var(--text-main); letter-spacing: 0.05em;
  }

  /* Center Navigation Links */
  .eh-nav-links {
    display: flex; align-items: center; gap: 4px;
    position: absolute; left: 50%; transform: translateX(-50%);
  }
  
  .eh-link {
    display: flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 500; color: var(--text-muted);
    text-decoration: none; padding: 10px 18px; border-radius: 100px;
    transition: all 0.4s var(--easing-premium);
    position: relative; overflow: hidden;
  }
  
  /* Hover & Active States */
  .eh-link::before {
    content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.05);
    border-radius: 100px; transform: scale(0.5); opacity: 0; transition: all 0.4s var(--easing-premium);
  }
  .eh-link:hover { color: var(--text-main); }
  .eh-link:hover::before { transform: scale(1); opacity: 1; }
  
  .eh-link.active { color: var(--text-main); background: rgba(255,255,255,0.08); }
  
  .eh-link svg { transition: transform 0.3s var(--easing-premium); }
  .eh-link:hover svg, .eh-link.active svg { color: var(--primary); transform: translateY(-2px); }

  /* Right Side Call-to-Action */
  .eh-cta-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 20px; border-radius: 100px;
    background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
    color: var(--text-main); font-size: 13px; font-weight: 600; text-decoration: none;
    transition: all 0.4s var(--easing-premium);
  }
  .eh-cta-btn:hover {
    background: var(--primary); color: #000; border-color: var(--primary);
  }
  .eh-cta-btn svg { transition: transform 0.3s; }
  .eh-cta-btn:hover svg { transform: translate(3px, -3px); }

  /* Mobile Responsiveness */
  @media (max-width: 900px) {
    .eh-header-wrapper { top: 16px; width: 95%; }
    .eh-brand-text { display: none; }
    .eh-nav-links { position: static; transform: none; gap: 2px; }
    .eh-link { padding: 10px 12px; }
    .eh-link-text { display: none; } /* Hide text, show only icons on mobile */
    .eh-cta-btn span { display: none; } /* Hide CTA text on mobile */
    .eh-cta-btn { padding: 10px; }
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // Track scroll for dynamic island shrinking effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active path (Works perfectly with regular <a> tags)
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About', icon: User, path: '/about' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Blog', icon: FileText, path: '/blog' },
  ];

  return (
    <>
      <style>{eliteHeaderStyles}</style>
      
      {/* Floating Island Wrapper */}
      <header className={`eh-header-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="eh-nav-container">
          
          {/* 1. Left: Premium Logo */}
          <a href="/" className="eh-brand" aria-label="Home">
            <div className="eh-brand-icon">D</div>
            <span className="eh-brand-text">ARSH</span>
          </a>

          {/* 2. Center: Navigation Links */}
          <nav className="eh-nav-links">
            {navItems.map(item => {
              // Active route detection
              const isActive = currentPath === item.path || 
                              (item.path !== '/' && currentPath.startsWith(item.path));
              
              return (
                <a 
                  key={item.path} 
                  href={item.path} 
                  className={`eh-link ${isActive ? 'active' : ''}`}
                  aria-label={item.name}
                >
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="eh-link-text">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* 3. Right: Elite CTA Button */}
          <a href="mailto:contact@darshprajapati.dev" className="eh-cta-btn">
            <span>Let's Talk</span>
            <ArrowUpRight size={16} />
          </a>

        </div>
      </header>
    </>
  );
}
