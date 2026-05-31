import React from 'react';
import { Link } from 'react-router-dom';

const proStyles = `
  :root {
    --bg-dark: #05070a;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Core Reset & Typography */
  .hp-wrapper {
    background-color: var(--bg-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 80px 24px;
    box-sizing: border-box;
    color: var(--text-main);
  }

  /* Hardware Accelerated Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translate3d(0, 30px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float1 {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(-30px, 40px, 0) scale(1.05); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(40px, -30px, 0) scale(0.95); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--primary); }
    50%      { opacity: 0.5; box-shadow: 0 0 2px var(--primary); }
  }

  /* Staggered Animations */
  .reveal { opacity: 0; animation: fadeUp 0.9s var(--easing) forwards; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }
  .delay-6 { animation-delay: 0.6s; }

  /* Ambient Background System */
  .hp-ambient-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    will-change: transform;
  }
  .orb-teal {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,210,180,0.08) 0%, transparent 60%);
    top: -150px; right: -100px;
    animation: float1 12s ease-in-out infinite;
  }
  .orb-indigo {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%);
    bottom: -150px; left: -100px;
    animation: float2 15s ease-in-out infinite;
  }
  .grid-overlay {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--glass-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--glass-bg) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%);
  }

  /* Top Corners */
  .hp-corner-badge {
    position: absolute; top: 32px; z-index: 10;
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--text-muted);
    opacity: 0; animation: fadeIn 1s 1s ease forwards;
  }
  .corner-left { left: 40px; }
  .corner-right { right: 40px; }
  .status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--primary);
    animation: pulseGlow 2.5s infinite;
  }

  /* Main Content Layout */
  .hp-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column;
    align-items: center; text-align: center;
    max-width: 800px; width: 100%;
  }

  /* Typography Polish */
  .hp-role-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.03);
    border-radius: 100px;
    padding: 8px 20px; margin-bottom: 32px;
    font-size: 12px; font-weight: 500; letter-spacing: 0.1em;
    color: var(--primary); text-transform: uppercase;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  }
  .hp-eyebrow {
    font-size: 14px; font-weight: 400; letter-spacing: 0.2em;
    color: var(--text-muted); text-transform: uppercase;
    margin: 0 0 16px;
  }
  .hp-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 8vw, 100px);
    line-height: 0.95; letter-spacing: -0.04em;
    margin: 0 0 12px;
  }
  .text-gradient {
    background: linear-gradient(135deg, var(--primary) 0%, #00f0cc 40%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hp-tagline {
    font-size: clamp(16px, 2.5vw, 22px);
    font-weight: 300; font-style: italic;
    color: var(--text-muted); margin: 0 0 40px;
  }
  .hp-divider {
    width: 64px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    margin: 0 auto 40px; opacity: 0.5;
  }
  .hp-bio {
    font-size: 18px; font-weight: 300; line-height: 1.7;
    color: var(--text-muted); max-width: 580px; margin: 0 auto 48px;
  }
  .hp-bio strong {
    color: var(--text-main); font-weight: 500;
  }

  /* Buttons */
  .hp-actions {
    display: flex; gap: 20px; align-items: center;
    flex-wrap: wrap; justify-content: center; margin-bottom: 72px;
  }
  .btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px; border-radius: 8px;
    font-size: 15px; font-weight: 500; letter-spacing: 0.03em;
    text-decoration: none; transition: all 0.3s var(--easing);
    cursor: pointer; position: relative; overflow: hidden;
  }
  .btn-primary {
    background: var(--primary); color: var(--bg-dark);
    border: 1px solid var(--primary);
    box-shadow: 0 4px 24px rgba(0, 210, 180, 0.15);
  }
  .btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 210, 180, 0.3);
  }
  .btn-secondary {
    background: var(--glass-bg); color: var(--text-main);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-3px);
  }
  .btn-secondary:hover i {
    transform: translateX(4px);
  }
  .btn i { transition: transform 0.3s var(--easing); font-size: 18px; }

  /* Stats Grid (Glassmorphism + Responsive Grid) */
  .hp-stats-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--glass-border);
    border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden;
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  }
  .hp-stat-card {
    background: rgba(5, 7, 10, 0.7); /* creates hairline border effect using gap */
    padding: 24px 40px; text-align: center;
    transition: background 0.3s;
  }
  .hp-stat-card:hover { background: rgba(255, 255, 255, 0.02); }
  .hp-stat-num {
    font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800;
    letter-spacing: -0.02em; line-height: 1; margin-bottom: 8px; display: block;
  }
  .hp-stat-unit { color: var(--primary); font-size: 24px; }
  .hp-stat-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--text-muted); display: block;
  }

  /* Responsive Design adjustments */
  @media (max-width: 768px) {
    .hp-wrapper { padding: 100px 20px 60px; }
    .hp-corner-badge { display: none; } /* Hide on small screens for clean look */
    .hp-stats-grid { grid-template-columns: 1fr; border-radius: 12px; width: 100%; max-width: 320px; }
    .hp-stat-card { padding: 20px; }
    .hp-actions { flex-direction: column; width: 100%; max-width: 320px; gap: 16px; }
    .btn { width: 100%; justify-content: center; }
  }
`;

export default function HomePage() {
  const stats = [
    { num: '2', unit: '+', label: 'Years XP' },
    { num: '15', unit: '+', label: 'Projects' },
    { num: '5', unit: '★', label: 'Client Rating' },
  ];

  return (
    <>
      <style>{proStyles}</style>

      <section className="hp-wrapper">
        
        {/* ─── Ambient Background ────────────────────────────────────────── */}
        <div className="hp-ambient-bg">
          <div className="orb orb-teal" />
          <div className="orb orb-indigo" />
          <div className="grid-overlay" />
        </div>

        {/* ─── Top Badges (Desktop Only) ─────────────────────────────────── */}
        <div className="hp-corner-badge corner-left">
          <div className="status-dot" />
          <span>Available for work</span>
        </div>
        <div className="hp-corner-badge corner-right">
          <span>Portfolio v1.0</span>
        </div>

        {/* ─── Main Content ──────────────────────────────────────────────── */}
        <div className="hp-content">
          
          <div className="hp-role-badge reveal">
            <div className="status-dot" />
            MERN Stack Developer
          </div>

          <p className="hp-eyebrow reveal delay-1">
            Full-Stack Engineer & Web Innovator
          </p>

          <h1 className="hp-title reveal delay-2">
            Hey, I'm<br />
            <span className="text-gradient">Darsh</span>
          </h1>

          <p className="hp-tagline reveal delay-3">
            crafting experiences that live on the web.
          </p>

          <div className="hp-divider reveal delay-4" />

          <p className="hp-bio reveal delay-4">
            I build <strong>high-performance</strong>, accessible digital products for modern brands and startups — bridging the gap between interactive frontends and scalable MERN-stack architectures.
          </p>

          <div className="hp-actions reveal delay-5">
            <a href="/Darsh_resume.pdf" download className="btn btn-primary">
              <i className="ti ti-download" aria-hidden="true" />
              Download CV
            </a>
            <Link to="/projects" className="btn btn-secondary">
              View Projects
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          <div className="hp-stats-grid reveal delay-6">
            {stats.map((stat, i) => (
              <div key={i} className="hp-stat-card">
                <span className="hp-stat-num">
                  {stat.num}<span className="hp-stat-unit">{stat.unit}</span>
                </span>
                <span className="hp-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
