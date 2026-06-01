import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, MapPin, Terminal, Activity, Github, Linkedin, Mail, Code2, Shield, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE SENIOR ENGINEER BENTO GRID STYLES ──────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --bg-card: #0a0e14;
    --primary: #00d2b4;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center;
    position: relative; overflow: hidden; color: var(--text-main);
    padding: 100px 24px 80px;
  }

  /* --- Premium Ambient Lighting --- */
  .eh-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .eh-glow-1 {
    position: absolute; width: 60vw; height: 60vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.03) 0%, transparent 60%);
    top: -20%; right: -10%; filter: blur(100px);
  }
  .eh-noise {
    position: absolute; inset: 0; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }

  .eh-container { position: relative; z-index: 2; width: 100%; max-width: 1280px; margin: 0 auto; }

  /* --- Massive Typography & Branding --- */
  .eh-header { margin-bottom: 40px; animation: revealUp 0.8s var(--easing-premium) forwards; }
  
  .eh-status-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.2);
    background: rgba(0,210,180,0.05); color: var(--primary); font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px;
  }
  .eh-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); animation: pulse 2s infinite; }
  @keyframes pulse { 50% { opacity: 0.4; box-shadow: 0 0 10px var(--primary); } }

  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(50px, 10vw, 120px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 16px 0;
    display: flex; flex-direction: column;
  }
  .eh-text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15); transition: all 0.4s; }
  .eh-text-outline:hover { color: var(--text-main); -webkit-text-stroke: 1.5px transparent; }
  .eh-text-solid { color: var(--text-main); }

  /* --- Ultimate Bento Grid Layout --- */
  .eh-bento-grid {
    display: grid; gap: 20px;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-flow: dense;
  }

  .eh-card {
    background: var(--bg-card); border: 1px solid var(--glass-border);
    border-radius: 24px; padding: 32px; position: relative; overflow: hidden;
    transition: all 0.4s var(--easing-premium); display: flex; flex-direction: column;
    animation: revealUp 0.8s var(--easing-premium) forwards; opacity: 0;
  }
  .eh-card:hover {
    border-color: rgba(255,255,255,0.15); transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }

  /* Grid Spans */
  .col-span-12 { grid-column: span 12; }
  @media (min-width: 768px) {
    .col-span-md-6 { grid-column: span 6; }
    .col-span-md-8 { grid-column: span 8; }
    .col-span-md-4 { grid-column: span 4; }
  }
  @media (min-width: 1024px) {
    .col-span-lg-3 { grid-column: span 3; }
    .col-span-lg-4 { grid-column: span 4; }
    .col-span-lg-5 { grid-column: span 5; }
    .col-span-lg-6 { grid-column: span 6; }
    .col-span-lg-7 { grid-column: span 7; }
    .col-span-lg-8 { grid-column: span 8; }
  }

  /* --- Widget Specifics --- */
  
  /* 1. Hero Bio Widget */
  .eh-bio-card { justify-content: space-between; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); }
  .eh-bio-text { font-size: 18px; line-height: 1.6; color: var(--text-muted); font-weight: 300; margin-bottom: 32px; max-width: 90%; }
  .eh-bio-text strong { color: #fff; font-weight: 500; }
  
  .eh-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .eh-btn {
    display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px;
    border-radius: 100px; font-size: 14px; font-weight: 600; text-decoration: none;
    transition: all 0.3s; cursor: pointer;
  }
  .eh-btn-primary { background: var(--text-main); color: #000; }
  .eh-btn-primary:hover { background: var(--primary); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,210,180,0.2); }
  .eh-btn-secondary { background: transparent; color: #fff; border: 1px solid var(--glass-border); }
  .eh-btn-secondary:hover { background: rgba(255,255,255,0.05); transform: translateY(-2px); }

  /* 2. Common Widget Headers */
  .eh-widget-header { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px; }
  .eh-widget-header svg { color: var(--primary); }

  /* 3. Location Widget */
  .eh-map-bg {
    position: absolute; inset: 0; opacity: 0.1;
    background-image: radial-gradient(circle at center, var(--primary) 1px, transparent 1px);
    background-size: 20px 20px; z-index: 0; transition: opacity 0.4s;
  }
  .eh-card:hover .eh-map-bg { opacity: 0.2; }
  .eh-loc-content { position: relative; z-index: 1; margin-top: auto; }
  .eh-loc-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 4px; }
  .eh-loc-sub { font-size: 14px; color: var(--text-muted); }

  /* 4. Focus / Activity Widget */
  .eh-focus-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; color: #fff; margin: 0 0 8px; }
  .eh-focus-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; margin: 0; }
  
  /* 5. GitHub Full Width */
  .eh-git-scroll { overflow-x: auto; padding-bottom: 10px; width: 100%; }
  
  /* 6. Skills Grid */
  .eh-skills-container { display: flex; flex-wrap: wrap; gap: 10px; }
  .eh-skill-tag {
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
    color: var(--text-main); display: flex; align-items: center; gap: 8px;
  }
  .eh-skill-tag:hover { border-color: var(--primary); background: rgba(0,210,180,0.05); }

  /* 7. Achievements List */
  .eh-achieve-list { display: flex; flex-direction: column; gap: 16px; }
  .eh-achieve-item { display: flex; gap: 12px; align-items: flex-start; }
  .eh-achieve-icon { color: var(--primary); margin-top: 2px; }
  .eh-achieve-text { font-size: 14px; color: var(--text-muted); line-height: 1.5; }
  .eh-achieve-text strong { color: #fff; font-weight: 500; }

  /* 8. Social Links */
  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; height: 100%; }
  .eh-social-btn {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
    padding: 20px; border-radius: 16px; background: rgba(255,255,255,0.02);
    border: 1px solid var(--glass-border); color: var(--text-main);
    text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.3s; height: 100%;
  }
  .eh-social-btn:hover { background: var(--text-main); color: #000; border-color: var(--text-main); transform: translateY(-4px); }

  @keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

  /* Custom GitHub Calendar Theme overrides */
  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 12px; }
`;

export default function HomePage() {
  const eliteCalendarTheme = {
    dark: ['rgba(255,255,255,0.03)', 'rgba(0,210,180,0.2)', 'rgba(0,210,180,0.5)', 'rgba(0,210,180,0.8)', '#00d2b4'],
  };

  return (
    <>
      <style>{eliteHomeStyles}</style>

      <section className="eh-wrapper">
        <div className="eh-ambient">
          <div className="eh-glow-1" />
          <div className="eh-noise" />
        </div>

        <div className="eh-container">
          
          {/* --- TOP BRANDING HEADER --- */}
          <header className="eh-header">
            <div className="eh-status-badge">
              <div className="eh-status-dot" /> System Online & Deploying
            </div>
            <h1 className="eh-massive-text">
              <span className="eh-text-outline">DARSH</span>
              <span className="eh-text-solid">PRAJAPATI.</span>
            </h1>
          </header>

          {/* --- THE ULTIMATE BENTO GRID --- */}
          <div className="eh-bento-grid">
            
            {/* WIDGET 1: Hero Bio (Span 6) */}
            <div className="eh-card eh-bio-card col-span-12 col-span-lg-6" style={{ animationDelay: '0.1s' }}>
              <div>
                <div className="eh-widget-header">
                  <Terminal size={18} /> <span>Role_Identification</span>
                </div>
                <p className="eh-bio-text">
                  I engineer <strong>high-performance, secure digital architectures</strong>. 
                  Specializing as a MERN Stack Specialist & App Developer to build scalable backends and pixel-perfect interfaces.
                </p>
              </div>
              
              <div className="eh-actions">
                <a href="/Darsh_resume.pdf" download className="eh-btn eh-btn-primary">
                  Download Resume <Download size={16} />
                </a>
                <Link to="/projects" className="eh-btn eh-btn-secondary">
                  View Architectures <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* WIDGET 2: Location (Span 3) */}
            <div className="eh-card col-span-12 col-span-md-6 col-span-lg-3" style={{ animationDelay: '0.2s', justifyContent: 'flex-end' }}>
              <div className="eh-map-bg" />
              <div className="eh-loc-content">
                <div className="eh-widget-header" style={{ marginBottom: '16px' }}>
                  <MapPin size={18} /> <span>Base_Station</span>
                </div>
                <h3 className="eh-loc-title">Gujarat</h3>
                <p className="eh-loc-sub">India (IST)</p>
              </div>
            </div>

            {/* WIDGET 3: Current Focus (Span 3) */}
            <div className="eh-card col-span-12 col-span-md-6 col-span-lg-3" style={{ animationDelay: '0.3s', borderTop: '2px solid var(--primary)' }}>
              <div className="eh-widget-header">
                <Activity size={18} /> <span>Live_Execution</span>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <h3 className="eh-focus-title">StockWatcher</h3>
                <p className="eh-focus-desc">Developing a real-time portfolio & alert system powered by FastAPI and MongoDB.</p>
              </div>
            </div>

            {/* WIDGET 4: GitHub Contributions (Span 12 Full Width) */}
            <div className="eh-card col-span-12" style={{ animationDelay: '0.4s' }}>
              <div className="eh-widget-header">
                <Github size={18} /> <span>Commit_History</span>
              </div>
              <div className="eh-git-scroll">
                <div style={{ minWidth: '800px', display: 'flex', justifyContent: 'center' }}>
                  <GitHubCalendar 
                    username="princep4423d" 
                    colorScheme="dark"
                    theme={eliteCalendarTheme}
                    blockSize={13}
                    blockMargin={5}
                    fontSize={14}
                  />
                </div>
              </div>
            </div>

            {/* WIDGET 5: Tools & Skills (Span 5) */}
            <div className="eh-card col-span-12 col-span-lg-5" style={{ animationDelay: '0.5s' }}>
              <div className="eh-widget-header">
                <Layers size={18} /> <span>Tech_Arsenal</span>
              </div>
              <div className="eh-skills-container">
                <span className="eh-skill-tag"><Code2 size={14} color="#61DAFB"/> React & Expo</span>
                <span className="eh-skill-tag"><Code2 size={14} color="#339933"/> Node.js</span>
                <span className="eh-skill-tag"><Code2 size={14} color="#47A248"/> MongoDB</span>
                <span className="eh-skill-tag"><Terminal size={14} color="#009688"/> FastAPI</span>
                <span className="eh-skill-tag"><Code2 size={14} color="#3776AB"/> Python</span>
                <span className="eh-skill-tag"><Shield size={14} color="#FF9900"/> Cyber Security</span>
              </div>
            </div>

            {/* WIDGET 6: Milestones / Achievements (Span 5) */}
            <div className="eh-card col-span-12 col-span-md-8 col-span-lg-5" style={{ animationDelay: '0.6s' }}>
              <div className="eh-widget-header">
                <BookOpen size={18} /> <span>Milestones</span>
              </div>
              <div className="eh-achieve-list">
                <div className="eh-achieve-item">
                  <Shield size={16} className="eh-achieve-icon" />
                  <span className="eh-achieve-text">Completed specialized <strong>Cyber Security Job Simulation</strong> for Deloitte Australia.</span>
                </div>
                <div className="eh-achieve-item">
                  <BookOpen size={16} className="eh-achieve-icon" />
                  <span className="eh-achieve-text">Authored research paper on <strong>Enhanced CNN (AFS-CNN)</strong> for deep learning image processing.</span>
                </div>
                <div className="eh-achieve-item">
                  <Terminal size={16} className="eh-achieve-icon" />
                  <span className="eh-achieve-text">Preparing for M.Sc. Cyber Security intake while pursuing <strong>B.Sc. in CA & IT</strong>.</span>
                </div>
              </div>
            </div>

            {/* WIDGET 7: Social Links (Span 2) */}
            <div className="eh-card col-span-12 col-span-md-4 col-span-lg-2" style={{ padding: '20px', animationDelay: '0.7s' }}>
              <div className="eh-social-grid">
                <a href="https://github.com/princep4423d" target="_blank" rel="noreferrer" className="eh-social-btn">
                  <Github size={24} style={{ marginBottom: '4px' }} /> Git
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="eh-social-btn">
                  <Linkedin size={24} style={{ marginBottom: '4px' }} /> In
                </a>
                <a href="mailto:hello@darshprajapati.dev" className="eh-social-btn" style={{ gridColumn: 'span 2' }}>
                  <Mail size={20} style={{ marginBottom: '4px' }} /> Ping Me
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
