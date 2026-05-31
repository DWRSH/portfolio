import React from 'react';

/* ─── IMPORTANT HEAD TAGS ───────────────────────────────────────────────────
   Ensure these are in your public/index.html:
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
──────────────────────────────────────────────────────────────────────────── */

const proAboutStyles = `
  :root {
    --bg-dark: #05070a;
    --primary: #00d2b4;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ab-wrapper {
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-dark);
    min-height: 100vh;
    padding: 100px 24px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: var(--text-main);
  }

  /* Hardware Accelerated Animations */
  @keyframes abFadeUp {
    from { opacity: 0; transform: translate3d(0, 30px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @keyframes abFloat1 {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(-30px, 40px, 0) scale(1.05); }
  }
  @keyframes abFloat2 {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(40px, -30px, 0) scale(0.95); }
  }
  @keyframes abPulseGlow {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--primary); }
    50%      { opacity: 0.5; box-shadow: 0 0 2px var(--primary); }
  }
  @keyframes abScaleX {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .ab-reveal { opacity: 0; animation: abFadeUp 0.8s var(--easing) forwards; }
  .ab-delay-1 { animation-delay: 0.1s; }
  .ab-delay-2 { animation-delay: 0.2s; }
  .ab-delay-3 { animation-delay: 0.3s; }
  .ab-delay-4 { animation-delay: 0.4s; }

  /* Ambient Background */
  .ab-ambient-bg {
    position: absolute; inset: 0; z-index: 0;
    pointer-events: none; overflow: hidden;
  }
  .ab-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); will-change: transform;
  }
  .ab-orb-teal {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,210,180,0.06) 0%, transparent 60%);
    top: -100px; right: -50px; animation: abFloat1 14s ease-in-out infinite;
  }
  .ab-orb-indigo {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%);
    bottom: 50px; left: -50px; animation: abFloat2 18s ease-in-out infinite;
  }
  .ab-grid-overlay {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--glass-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--glass-bg) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 70% 40%, black 10%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 70% 40%, black 10%, transparent 100%);
  }

  /* Layout Container */
  .ab-container {
    position: relative; z-index: 2;
    max-width: 900px; margin: 0 auto;
  }

  /* Typography */
  .ab-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--primary); margin-bottom: 24px;
  }
  .ab-status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--primary); animation: abPulseGlow 2.5s infinite;
  }
  .ab-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(40px, 6vw, 72px); line-height: 1;
    letter-spacing: -0.03em; margin: 0 0 64px;
  }
  .ab-text-gradient {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Bio & Photo Grid */
  .ab-bio-grid {
    display: grid; grid-template-columns: 280px 1fr;
    gap: 64px; align-items: start; margin-bottom: 80px;
  }
  
  .ab-photo-wrapper {
    position: relative; border-radius: 16px;
    border: 1px solid var(--glass-border);
    overflow: hidden; background: var(--glass-bg);
    box-shadow: 0 24px 48px rgba(0,0,0,0.4);
  }
  .ab-photo {
    width: 100%; display: block;
    filter: grayscale(15%) contrast(1.1);
    transition: filter 0.4s var(--easing), transform 0.4s var(--easing);
  }
  .ab-photo-wrapper:hover .ab-photo {
    filter: grayscale(0%) contrast(1);
    transform: scale(1.02);
  }
  .ab-photo-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(5,7,10,0.9) 100%);
  }
  .ab-photo-label {
    position: absolute; bottom: 20px; left: 0; right: 0;
    text-align: center; font-size: 12px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--text-muted);
  }
  
  /* Branding Mark D */
  .ab-brand-mark {
    position: absolute; top: -12px; right: -12px;
    width: 48px; height: 48px; border-radius: 12px;
    background: rgba(5, 7, 10, 0.8);
    border: 1px solid rgba(0,210,180,0.3);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
    color: var(--primary); box-shadow: 0 8px 16px rgba(0,0,0,0.5);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  }

  .ab-bio-content p {
    font-size: 17px; font-weight: 300; line-height: 1.8;
    color: var(--text-muted); margin: 0 0 24px;
  }
  .ab-bio-content strong { color: var(--text-main); font-weight: 500; }

  /* Mini Stats */
  .ab-mini-stats {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 16px; margin-top: 32px;
  }
  .ab-mini-card {
    border: 1px solid var(--glass-border); border-radius: 12px;
    padding: 16px 20px; background: var(--glass-bg);
    display: flex; align-items: center; gap: 16px;
    transition: all 0.3s var(--easing);
  }
  .ab-mini-card:hover {
    border-color: rgba(0,210,180,0.3); background: rgba(0,210,180,0.05);
    transform: translateY(-2px);
  }
  .ab-mini-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(0,210,180,0.1); color: var(--primary);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .ab-mini-num {
    font-family: 'Syne', sans-serif; font-size: 20px;
    font-weight: 700; color: #fff; line-height: 1.2; display: block;
  }
  .ab-mini-label {
    font-size: 12px; color: var(--text-muted); display: block;
  }

  /* Skills Grid */
  .ab-section-divider {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 32px;
    display: flex; align-items: center; gap: 16px;
  }
  .ab-section-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--glass-border);
  }
  .ab-skills-container {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;
  }
  .ab-skill-card {
    border: 1px solid var(--glass-border); border-radius: 12px;
    padding: 20px; background: var(--glass-bg);
    display: flex; flex-direction: column; gap: 12px;
    transition: all 0.3s var(--easing); cursor: default;
  }
  .ab-skill-card:hover {
    border-color: rgba(0,210,180,0.4); background: rgba(0,210,180,0.05);
    box-shadow: 0 8px 24px rgba(0,210,180,0.08);
  }
  .ab-skill-header {
    display: flex; align-items: center; justify-content: space-between;
  }
  .ab-skill-name { font-size: 14px; font-weight: 500; color: var(--text-main); }
  .ab-skill-pct { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--primary); }
  
  /* Pro Progress Bar using scaleX */
  .ab-skill-track {
    height: 3px; background: rgba(255,255,255,0.06);
    border-radius: 4px; overflow: hidden; position: relative;
  }
  .ab-skill-fill {
    position: absolute; top: 0; left: 0; height: 100%; width: 100%;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform-origin: left;
    transform: scaleX(0); /* Default state */
    animation: abScaleX 1.2s 0.8s var(--easing) forwards;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .ab-wrapper { padding: 100px 20px 60px; }
    .ab-bio-grid { grid-template-columns: 1fr; gap: 40px; }
    .ab-photo-wrapper { max-width: 320px; margin: 0 auto; }
    .ab-mini-stats { grid-template-columns: 1fr; }
  }
`;

const SKILLS = [
  { name: 'JavaScript/ES6+', pct: 92 },
  { name: 'React & Redux', pct: 88 },
  { name: 'React Native', pct: 85 },
  { name: 'Node.js & Express', pct: 84 },
  { name: 'Python & FastAPI', pct: 80 },
  { name: 'MongoDB', pct: 78 },
  { name: 'Tailwind CSS', pct: 90 },
  { name: 'Security Fundamentals', pct: 70 },
];

const MINI_CARDS = [
  { icon: 'ti-calendar', num: '6th Sem', label: 'B.Sc. CA & IT' },
  { icon: 'ti-rocket', num: '15+', label: 'Projects Shipped' },
  { icon: 'ti-stack-2', num: 'MERN', label: 'Primary Stack' },
  { icon: 'ti-shield-check', num: 'Active', label: 'Cybersec Interest' },
];

export default function AboutPage() {
  return (
    <>
      <style>{proAboutStyles}</style>

      <div className="ab-wrapper">
        
        {/* ─── Ambient Background ────────────────────────────────────────── */}
        <div className="ab-ambient-bg">
          <div className="ab-orb ab-orb-teal" />
          <div className="ab-orb ab-orb-indigo" />
          <div className="ab-grid-overlay" />
        </div>

        {/* ─── Main Content ──────────────────────────────────────────────── */}
        <div className="ab-container">
          
          <div className="ab-eyebrow ab-reveal">
            <div className="ab-status-dot" />
            Get to know me
          </div>

          <h2 className="ab-title ab-reveal ab-delay-1">
            About <span className="ab-text-gradient">Me</span>
          </h2>

          {/* ─── Bio & Photo Grid ────────────────────────────────────────── */}
          <div className="ab-bio-grid ab-reveal ab-delay-2">
            
            {/* Photo Column */}
            <div className="ab-photo-wrapper">
              <img
                src="/d2d.png"
                alt="Darsh"
                className="ab-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x480/05070a/1e293b?text=Image';
                }}
              />
              <div className="ab-photo-overlay" />
              <div className="ab-photo-label">Darsh Prajapati</div>
              
              {/* Branding D Mark */}
              <div className="ab-brand-mark">D</div>
            </div>

            {/* Bio Column */}
            <div className="ab-bio-content">
              <div className="ab-section-divider">Biography</div>
              
              <p>
                Hello! I'm a <strong>Full Stack Developer</strong> currently pursuing my B.Sc. in Computer Applications & Information Technology. I am passionate about building clean, performant, and scalable software architecture.
              </p>
              <p>
                While my core expertise lies in crafting web and mobile experiences using the <strong>MERN stack and React Native</strong>, I am deeply curious about backend infrastructure. I am currently building tools ranging from real-time financial tracking systems to complete digital service platforms.
              </p>
              <p>
                Beyond standard web development, I am actively exploring the intersections of <strong>Cybersecurity, Digital Forensics, and AI/ML architectures</strong> — constantly learning and pushing the boundaries of what I can build.
              </p>

              {/* Mini Stats */}
              <div className="ab-mini-stats">
                {MINI_CARDS.map((c) => (
                  <div key={c.label} className="ab-mini-card">
                    <div className="ab-mini-icon">
                      <i className={`ti ${c.icon}`} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="ab-mini-num">{c.num}</span>
                      <span className="ab-mini-label">{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Skills Section ──────────────────────────────────────────── */}
          <div className="ab-reveal ab-delay-3">
            <div className="ab-section-divider" style={{ marginBottom: '40px' }}>
              Technical Arsenal
            </div>

            <div className="ab-skills-container">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="ab-skill-card">
                  <div className="ab-skill-header">
                    <span className="ab-skill-name">{skill.name}</span>
                    <span className="ab-skill-pct">{skill.pct}%</span>
                  </div>
                  
                  {/* Hardware Accelerated Progress Bar */}
                  <div className="ab-skill-track">
                    <div
                      className="ab-skill-fill"
                      style={{ transform: `scaleX(${skill.pct / 100})` }}
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
