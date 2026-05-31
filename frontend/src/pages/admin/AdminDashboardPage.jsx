import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Files, Newspaper, ArrowRight, AlertCircle, Terminal } from 'lucide-react';
import api from '../../api/axios'; 

/* ─── ULTRA-PREMIUM COMMAND CENTER STYLES ───────────────────────────────── */
const eliteAdminStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --bg-surface: #0a0e14;
    --primary: #00d2b4;
    --accent: #6366f1;
    --danger: #ef4444;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ad-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 100px 24px 120px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: var(--text-main);
  }

  /* --- Ambient Background --- */
  .ad-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .ad-glow {
    position: absolute; width: 60vw; height: 60vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 60%);
    top: -20%; right: -10%; filter: blur(80px);
  }
  .ad-grid-overlay {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--glass-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--glass-bg) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 10%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 10%, transparent 100%);
  }

  @keyframes revealUp {
    from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .ad-container {
    position: relative; z-index: 2;
    max-width: 1000px; margin: 0 auto;
    width: 100%;
  }

  /* --- Command Center Header --- */
  .ad-header { 
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 64px; opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards;
  }
  .ad-header-left { display: flex; flex-direction: column; gap: 8px; }
  
  .ad-brand-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; border-radius: 12px;
    background: rgba(0,210,180,0.1); border: 1px solid rgba(0,210,180,0.3);
    color: var(--primary); font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
    margin-bottom: 16px; box-shadow: 0 8px 20px rgba(0,210,180,0.15);
  }

  .ad-title {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 48px);
    font-weight: 800; line-height: 1; letter-spacing: -0.03em; margin: 0;
  }
  .ad-subtitle {
    font-family: 'Fira Code', monospace; font-size: 13px; color: var(--text-muted);
    display: flex; align-items: center; gap: 8px; margin-top: 8px;
  }
  .ad-status-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--primary);
    box-shadow: 0 0 10px var(--primary); animation: pulse 2s infinite;
  }
  @keyframes pulse { 50% { opacity: 0.5; box-shadow: none; } }

  /* --- Error State --- */
  .ad-error {
    background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 16px; padding: 20px 24px; display: flex; gap: 16px; align-items: flex-start;
    margin-bottom: 40px; opacity: 0; animation: revealUp 0.6s var(--easing-premium) forwards;
  }
  .ad-error-icon { color: var(--danger); flex-shrink: 0; }
  .ad-error-text h4 { margin: 0 0 4px; color: #fca5a5; font-weight: 600; font-size: 15px; }
  .ad-error-text p { margin: 0; color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.5; }

  /* --- Bento Grid Stats --- */
  .ad-grid {
    display: grid; grid-template-columns: 1fr; gap: 24px; margin-bottom: 48px;
  }
  @media (min-width: 768px) { .ad-grid { grid-template-columns: 1fr 1fr; } }

  .ad-stat-card {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 24px; padding: 32px; display: flex; align-items: center; gap: 24px;
    transition: all 0.4s var(--easing-premium); position: relative; overflow: hidden;
    opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards;
  }
  .ad-stat-card:hover {
    transform: translateY(-4px); border-color: rgba(255,255,255,0.15);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .ad-stat-card::before {
    content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 40%);
  }
  .ad-stat-card:hover::before { opacity: 1; }

  .ad-icon-wrap {
    width: 64px; height: 64px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ad-icon-cyan { background: rgba(0,210,180,0.1); color: var(--primary); }
  .ad-icon-purple { background: rgba(99,102,241,0.1); color: var(--accent); }

  .ad-stat-info h3 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin: 0 0 8px; }
  .ad-stat-info p { font-family: 'Syne', sans-serif; font-size: 48px; font-weight: 800; color: var(--text-main); line-height: 1; margin: 0; letter-spacing: -0.02em; }

  /* --- Quick Links Section --- */
  .ad-section-title {
    font-size: 18px; font-weight: 600; color: var(--text-main); margin: 0 0 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .ad-section-title::after { content: ''; flex: 1; height: 1px; background: var(--glass-border); }

  .ad-link-card {
    background: transparent; border: 1px solid var(--glass-border);
    border-radius: 24px; padding: 32px; display: flex; flex-direction: column;
    text-decoration: none; transition: all 0.4s var(--easing-premium);
    position: relative; overflow: hidden;
    opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards; animation-delay: 0.2s;
  }
  .ad-link-card::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(135deg, var(--glass-bg), transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .ad-link-card:hover { border-color: rgba(0,210,180,0.3); transform: translateY(-4px); }
  .ad-link-card:hover::after { opacity: 1; }

  .ad-link-title { font-size: 20px; font-weight: 700; color: var(--text-main); margin: 0 0 12px; }
  .ad-link-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0 0 32px; flex-grow: 1; }
  
  .ad-link-action {
    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.3s;
  }
  .ad-link-cyan { color: var(--primary); }
  .ad-link-purple { color: var(--accent); }
  
  .ad-link-card:hover .ad-link-action { color: #fff; }
  .ad-link-action svg { transition: transform 0.3s var(--easing-premium); }
  .ad-link-card:hover .ad-link-action svg { transform: translateX(6px); }

  /* Skeletons */
  .sk-box { background: rgba(255,255,255,0.03); position: relative; overflow: hidden; border-radius: 8px; }
  .sk-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

  /* Mobile */
  @media (max-width: 768px) {
    .ad-wrapper { padding: 100px 16px 80px; }
    .ad-header { margin-bottom: 40px; }
    .ad-stat-card { padding: 24px; }
    .ad-link-card { padding: 24px; }
  }
`;

// --- STAT CARD SKELETON ---
const StatSkeleton = () => (
  <div className="ad-stat-card">
    <div className="sk-box" style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0 }} />
    <div style={{ width: '100%' }}>
      <div className="sk-box" style={{ width: 100, height: 16, marginBottom: 12 }} />
      <div className="sk-box" style={{ width: 60, height: 48 }} />
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ projectCount: 0, blogCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication required. Please login again.');

        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        const res = await api.get('/stats/dashboard', config);

        if (!res.data) throw new Error('Invalid response from server');
        setStats(res.data);
      } catch (err) {
        console.error("Fetch stats error:", err);
        setError(err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Hover Effect for Bento Cards (Mouse tracking glow)
  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.ad-stat-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <>
      <style>{eliteAdminStyles}</style>

      <div className="ad-wrapper" onMouseMove={handleMouseMove}>
        
        {/* Ambient Effects */}
        <div className="ad-ambient">
          <div className="ad-glow" />
          <div className="ad-grid-overlay" />
        </div>

        <div className="ad-container">
          
          {/* Header */}
          <header className="ad-header">
            <div className="ad-header-left">
              <div className="ad-brand-badge">D</div>
              <h1 className="ad-title">Command Center</h1>
              <div className="ad-subtitle">
                <div className="ad-status-dot" />
                System Active // {new Date().toISOString().split('T')[0]}
              </div>
            </div>
          </header>

          {/* Error Banner */}
          {error && (
            <div className="ad-error">
              <AlertCircle size={24} className="ad-error-icon" />
              <div className="ad-error-text">
                <h4>Connection Interrupted</h4>
                <p>{error}. Please verify your network and authentication token.</p>
              </div>
            </div>
          )}

          {/* Stats Bento Grid */}
          <div className="ad-grid">
            {loading ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : (
              <>
                <div className="ad-stat-card" style={{ animationDelay: '0.1s' }}>
                  <div className="ad-icon-wrap ad-icon-cyan">
                    <Files size={28} strokeWidth={2} />
                  </div>
                  <div className="ad-stat-info">
                    <h3>Total Projects</h3>
                    <p>{stats.projectCount}</p>
                  </div>
                </div>

                <div className="ad-stat-card" style={{ animationDelay: '0.2s' }}>
                  <div className="ad-icon-wrap ad-icon-purple">
                    <Newspaper size={28} strokeWidth={2} />
                  </div>
                  <div className="ad-stat-info">
                    <h3>Published Articles</h3>
                    <p>{stats.blogCount}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Links */}
          <h2 className="ad-section-title reveal-3">
            <Terminal size={20} /> System Modules
          </h2>
          
          <div className="ad-grid">
            
            <Link to="/admin/projects" className="ad-link-card">
              <h3 className="ad-link-title">Manage Projects</h3>
              <p className="ad-link-desc">
                Deploy new case studies, update existing portfolio items, and manage the technical architecture showcase.
              </p>
              <div className="ad-link-action ad-link-cyan">
                Access Module <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </Link>

            <Link to="/admin/blog" className="ad-link-card" style={{ animationDelay: '0.3s' }}>
              <h3 className="ad-link-title">Manage Insights</h3>
              <p className="ad-link-desc">
                Draft, edit, or remove technical deep-dives and engineering articles from the public blog feed.
              </p>
              <div className="ad-link-action ad-link-purple">
                Access Module <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </Link>

          </div>

        </div>
      </div>
    </>
  );
}
