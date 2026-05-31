import React from 'react';
import { Calendar, Rocket, Layers, ShieldCheck } from 'lucide-react';

/* ─── 100% RESPONSIVE & TRUE 3D POP-OUT STYLES ──────────────────────────── */
const eliteAboutStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
    --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .ea-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 140px 24px 100px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: var(--text-main);
  }

  /* --- Ambient Background --- */
  .ea-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .ea-glow-1 {
    position: absolute; width: 50vw; height: 50vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.05) 0%, transparent 60%);
    top: 0; right: -20%; filter: blur(60px);
  }
  .ea-glow-2 {
    position: absolute; width: 60vw; height: 60vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 60%);
    bottom: -20%; left: -20%; filter: blur(60px);
  }
  .ea-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }

  @keyframes revealUp {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes lineFill {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  .reveal-1 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.1s; }
  .reveal-2 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.2s; }
  .reveal-3 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.4s; }
  .reveal-4 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.6s; }

  .ea-container {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
    width: 100%;
  }

  /* --- Massive Header --- */
  .ea-header { margin-bottom: 60px; }
  .ea-massive-text {
    font-family: 'Syne', sans-serif; 
    /* The Fix: Dropped lower bound to 28px, added 12vw for perfect mobile scaling */
    font-size: clamp(28px, 12vw, 110px); 
    font-weight: 800; line-height: 0.9; letter-spacing: -0.02em; margin: 0;
    display: flex; flex-direction: column;
    word-break: break-word;
    hyphens: auto;
  }
  .ea-text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2); }
  .ea-text-solid { color: var(--text-main); }

  /* --- Editorial Grid --- */
  .ea-content-grid {
    display: grid; grid-template-columns: 1fr; gap: 64px; align-items: center;
    margin-bottom: 100px;
  }
  @media (min-width: 1024px) {
    .ea-content-grid { grid-template-columns: 4fr 6fr; gap: 80px; }
  }

  /* ─── THE FLAWLESS 3D POP-OUT LOGIC ─────────────────────────────────────── */
  
  .ea-image-col { 
    position: relative; 
    perspective: 1000px; 
    padding: 20px 0; 
  }

  .ea-arch-wrapper {
    width: 100%; max-width: 360px; margin: 0 auto; aspect-ratio: 3/4;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s var(--easing-premium);
  }

  .ea-arch-wrapper:hover {
    transform: rotateX(10deg) rotateY(-15deg); 
  }

  /* LAYER 1: The Glass Frame */
  .ea-arch-frame {
    position: absolute; inset: 0;
    border-radius: 200px 200px 16px 16px;
    border: 1px solid var(--glass-border);
    background: rgba(255,255,255,0.02);
    transform: translateZ(-20px); 
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    transition: all 0.6s var(--easing-premium);
  }
  .ea-arch-wrapper:hover .ea-arch-frame {
    background: rgba(0,210,180,0.05); border-color: rgba(0,210,180,0.3);
  }

  /* LAYER 2: The Image Container */
  .ea-image-inner {
    position: absolute; inset: 0;
    border-radius: 200px 200px 16px 16px;
    overflow: hidden; 
    transform: translateZ(10px); 
    transition: transform 0.6s var(--easing-bounce), box-shadow 0.6s var(--easing-premium);
  }
  .ea-arch-wrapper:hover .ea-image-inner {
    transform: translateZ(60px) translateY(-25px); 
    box-shadow: -20px 40px 50px rgba(0,0,0,0.7);
  }

  .ea-arch-image {
    width: 100%; height: 100%; object-fit: cover;
    filter: grayscale(20%) contrast(1.1); transition: filter 0.6s, transform 0.6s;
  }
  .ea-arch-wrapper:hover .ea-arch-image {
    filter: grayscale(0%) contrast(1); transform: scale(1.05);
  }

  /* LAYER 3: The Floating Badge */
  .ea-floating-badge {
    position: absolute; bottom: 20px; right: -15px;
    width: 70px; height: 70px; border-radius: 50%;
    background: rgba(5,7,10,0.9); border: 1px solid rgba(0,210,180,0.4);
    display: flex; align-items: center; justify-content: center;
    color: var(--primary); font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
    transform: translateZ(20px);
    transition: transform 0.6s var(--easing-bounce);
  }
  .ea-arch-wrapper:hover .ea-floating-badge {
    transform: translateZ(100px) scale(1.1) rotate(15deg); 
  }
  /* ───────────────────────────────────────────────────────────────────────── */

  /* Bio Typography */
  .ea-bio-col { display: flex; flex-direction: column; gap: 24px; }
  .ea-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--primary); display: flex; align-items: center; gap: 12px;
  }
  .ea-label::before { content: ''; width: 24px; height: 1px; background: var(--primary); }

  .ea-bio-lead {
    font-family: 'Syne', sans-serif; font-size: clamp(20px, 4vw, 32px);
    font-weight: 700; line-height: 1.3; color: var(--text-main); letter-spacing: -0.02em;
  }
  .ea-bio-text {
    font-size: 16px; font-weight: 300; line-height: 1.8; color: var(--text-muted); margin: 0;
  }
  .ea-bio-text strong { color: var(--text-main); font-weight: 500; }

  /* --- Asymmetrical Stats Row --- */
  .ea-stats-row {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
    background: var(--glass-border); border: 1px solid var(--glass-border);
    border-radius: 20px; overflow: hidden; width: 100%;
  }
  @media (min-width: 1024px) { .ea-stats-row { grid-template-columns: repeat(4, 1fr); } }
  
  .ea-stat-box {
    background: rgba(5,7,10,0.8); 
    padding: 32px 16px; 
    text-align: center;
    transition: background 0.4s; display: flex; flex-direction: column; align-items: center;
    justify-content: center;
  }
  .ea-stat-box:hover { background: rgba(255,255,255,0.02); }
  .ea-stat-num {
    font-family: 'Syne', sans-serif; 
    /* The Fix: More fluid boundaries for the numbers/text so "Active" doesn't cut */
    font-size: clamp(18px, 5vw, 32px); 
    font-weight: 800;
    color: var(--text-main); margin-bottom: 8px;
    word-break: break-word;
  }
  .ea-stat-desc {
    font-size: 12px; color: var(--text-muted); font-weight: 400; letter-spacing: 0.05em;
    line-height: 1.4;
  }
  .ea-stat-icon { color: var(--primary); margin-bottom: 12px; }

  /* --- Ultra-Sharp Tech Arsenal --- */
  .ea-skills-section { margin-top: 100px; width: 100%; }
  .ea-skills-grid {
    display: grid; grid-template-columns: 1fr; gap: 32px;
  }
  @media (min-width: 768px) { .ea-skills-grid { grid-template-columns: 1fr 1fr; gap: 48px; } }

  .ea-skill-item { display: flex; flex-direction: column; gap: 10px; width: 100%; }
  .ea-skill-header { display: flex; justify-content: space-between; align-items: flex-end; }
  .ea-skill-name { font-size: 14px; font-weight: 500; color: var(--text-main); letter-spacing: 0.02em; }
  .ea-skill-pct { font-family: 'Fira Code', monospace; font-size: 13px; color: var(--primary); font-weight: 500; }
  
  /* Sci-Fi 1px Tracker */
  .ea-skill-track {
    width: 100%; height: 2px; background: rgba(255,255,255,0.08);
    position: relative; border-radius: 2px;
  }
  .ea-skill-fill {
    position: absolute; top: 0; left: 0; height: 100%;
    background: var(--primary); border-radius: 2px;
    transform-origin: left; transform: scaleX(0);
    animation: lineFill 1.5s var(--easing-premium) forwards; animation-delay: 0.8s;
    box-shadow: 0 0 10px rgba(0,210,180,0.5);
  }
  .ea-skill-fill::after {
    content: ''; position: absolute; right: 0; top: -2px;
    width: 6px; height: 6px; border-radius: 50%; background: #fff;
    box-shadow: 0 0 8px 2px var(--primary);
  }

  /* --- MOBILE SPECIFIC OVERRIDES (THE FIXES) --- */
  @media (max-width: 768px) {
    .ea-wrapper { padding: 100px 16px 80px; }
    .ea-header { margin-bottom: 40px; }
    
    /* Reduced margin and gap to save space */
    .ea-content-grid { gap: 40px; margin-bottom: 60px; }
    .ea-arch-wrapper { max-width: 260px; } 
    
    /* Pre-tilt the 3D element slightly on mobile to show off the effect */
    .ea-image-inner { transform: translateZ(15px) translateY(-8px); box-shadow: -8px 16px 24px rgba(0,0,0,0.4); }
    .ea-arch-frame { border-color: rgba(0,210,180,0.2); }
    
    /* Reduced padding on the stat boxes so text has room */
    .ea-stats-row { border-radius: 16px; }
    .ea-stat-box { padding: 20px 8px; }
    
    .ea-skills-section { margin-top: 80px; }
    .ea-skills-grid { gap: 24px; }
  }

  /* Very Small Devices (e.g. iPhone SE/Fold) */
  @media (max-width: 400px) {
    .ea-stat-box { padding: 16px 4px; }
    .ea-stat-icon { transform: scale(0.85); margin-bottom: 8px; }
    .ea-stat-num { font-size: 18px; }
    .ea-stat-desc { font-size: 10px; }
  }
`;

const SKILLS = [
  { name: 'JavaScript/ES6+', pct: 92 },
  { name: 'React & Redux', pct: 88 },
  { name: 'React Native & Expo', pct: 85 },
  { name: 'Node.js & Express', pct: 84 },
  { name: 'Python & FastAPI', pct: 80 },
  { name: 'MongoDB Architecture', pct: 78 },
  { name: 'Tailwind CSS & UI', pct: 90 },
  { name: 'Cybersecurity / Forensics', pct: 70 },
];

const STATS = [
  { icon: Calendar, num: '6th Sem', label: 'B.Sc. CA & IT' },
  { icon: Rocket, num: '15+', label: 'Projects Shipped' },
  { icon: Layers, num: 'MERN', label: 'Primary Architecture' },
  { icon: ShieldCheck, num: 'Active', label: 'Cybersec Interest' },
];

export default function AboutPage() {
  return (
    <>
      <style>{eliteAboutStyles}</style>

      <div className="ea-wrapper">
        
        {/* --- Ambient Background --- */}
        <div className="ea-ambient">
          <div className="ea-glow-1" />
          <div className="ea-glow-2" />
          <div className="ea-noise" />
        </div>

        <div className="ea-container">
          
          {/* --- Massive Editorial Header --- */}
          <header className="ea-header reveal-1">
            <h1 className="ea-massive-text">
              <span className="ea-text-outline">THE</span>
              <span className="ea-text-solid">ENGINEER.</span>
            </h1>
          </header>

          {/* --- The Arch & Bio Grid --- */}
          <div className="ea-content-grid">
            
            {/* Left: 3D Pop-Out Image Architecture */}
            <div className="ea-image-col reveal-2">
              <div className="ea-arch-wrapper">
                
                {/* Layer 1: The Glass Frame Background */}
                <div className="ea-arch-frame"></div>
                
                {/* Layer 2: The Popping Image Container */}
                <div className="ea-image-inner">
                  <img
                    src="/d2d.png"
                    alt="Darsh"
                    className="ea-arch-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x800/020406/1e293b?text=Portrait';
                    }}
                  />
                  <div className="ea-image-overlay" />
                </div>
                
                {/* Layer 3: Floating Branding Badge */}
                <div className="ea-floating-badge">D</div>
                
              </div>
            </div>

            {/* Right: Editorial Bio */}
            <div className="ea-bio-col reveal-3">
              <div className="ea-label">Biography</div>
              
              <div className="ea-bio-lead">
                I am a Full Stack Developer passionate about building clean, performant, and scalable software architecture.
              </div>
              
              <p className="ea-bio-text">
                Currently pursuing my B.Sc. in Computer Applications & Information Technology. While my core expertise lies in crafting seamless web and mobile experiences using the <strong>MERN stack and React Native</strong>, I am deeply curious about backend infrastructure.
              </p>
              
              <p className="ea-bio-text">
                I am actively engineering tools ranging from real-time financial tracking systems to complete digital service platforms. Beyond standard web development, I am exploring the critical intersections of <strong>Cybersecurity, Digital Forensics, and AI/ML architectures</strong> — constantly pushing the boundaries of what I can build.
              </p>
            </div>

          </div>

          {/* --- Asymmetrical Stats Row --- */}
          <div className="ea-stats-row reveal-4">
            {STATS.map((stat, i) => (
              <div key={i} className="ea-stat-box">
                <stat.icon size={24} className="ea-stat-icon" strokeWidth={1.5} />
                <span className="ea-stat-num">{stat.num}</span>
                <span className="ea-stat-desc">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* --- Ultra-Sharp Tech Arsenal --- */}
          <div className="ea-skills-section reveal-4">
            <div className="ea-label" style={{ marginBottom: '32px' }}>Technical Arsenal</div>
            
            <div className="ea-skills-grid">
              {SKILLS.map((skill, index) => (
                <div key={skill.name} className="ea-skill-item">
                  <div className="ea-skill-header">
                    <span className="ea-skill-name">{skill.name}</span>
                    <span className="ea-skill-pct">{skill.pct}%</span>
                  </div>
                  
                  {/* The Sci-Fi 1px Line Tracker */}
                  <div className="ea-skill-track">
                    <div
                      className="ea-skill-fill"
                      style={{ transform: `scaleX(${skill.pct / 100})`, animationDelay: `${0.6 + (index * 0.1)}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
