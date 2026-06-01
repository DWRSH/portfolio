import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, Code2, MapPin, Terminal, Activity, Github, Linkedin, Mail, Smartphone } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── ULTRA-PREMIUM BENTO GRID STYLES ─────────────────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center;
    position: relative; overflow: hidden; color: var(--text-main);
    padding: 120px 24px 80px;
  }

  /* --- Ambient Light & Grid --- */
  .eh-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .eh-glow-1 {
    position: absolute; width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.05) 0%, transparent 60%);
    top: -300px; right: -200px; animation: floatSlow 15s ease-in-out infinite;
  }
  .eh-glow-2 {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%);
    bottom: -200px; left: -200px; animation: floatSlow 18s ease-in-out infinite reverse;
  }
  .eh-noise {
    position: absolute; inset: 0; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
  }

  /* --- Animations --- */
  @keyframes revealUp { from { opacity: 0; transform: translateY(40px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
  @keyframes floatSlow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, 40px); } }
  @keyframes rotateBadge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  
  .reveal-1 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.1s; }
  .reveal-2 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.2s; }
  .reveal-3 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.3s; }
  .reveal-4 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.4s; }

  /* --- Container & Hero --- */
  .eh-container { position: relative; z-index: 2; width: 100%; max-width: 1200px; display: flex; flex-direction: column; gap: 60px; }
  
  .eh-hero-section { display: flex; flex-direction: column; position: relative; }
  
  .eh-status-pill {
    display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.05); color: var(--primary); font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px; backdrop-filter: blur(8px);
  }
  .eh-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); animation: blink 2s infinite; }
  @keyframes blink { 50% { opacity: 0.4; box-shadow: none; } }

  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(60px, 11vw, 160px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 24px 0;
    display: flex; flex-direction: column;
  }
  .eh-text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2); transition: all 0.5s; }
  .eh-text-outline:hover { color: var(--primary); -webkit-text-stroke: 1.5px transparent; text-shadow: 0 0 60px rgba(0,210,180,0.3); }

  .eh-hero-bottom { display: flex; flex-direction: column; gap: 32px; }
  @media (min-width: 768px) { .eh-hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }

  .eh-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--text-muted); max-width: 500px; margin: 0; }
  .eh-bio strong { color: #fff; font-weight: 500; }

  /* Buttons */
  .eh-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .eh-btn {
    position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px;
    border-radius: 100px; font-size: 15px; font-weight: 600; text-decoration: none; overflow: hidden;
    transition: color 0.4s; z-index: 1;
  }
  .eh-btn::before { content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%; transition: transform 0.5s var(--easing-premium); z-index: -1; border-radius: 100px; }
  .eh-btn-primary { background: var(--primary); color: var(--bg-ultra-dark); border: 1px solid var(--primary); }
  .eh-btn-primary::before { background: #fff; }
  .eh-btn-primary:hover { color: var(--bg-ultra-dark); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,210,180,0.2); }
  .eh-btn-primary:hover::before { transform: translateY(-100%); }
  .eh-btn-secondary { background: var(--glass-bg); color: #fff; border: 1px solid var(--glass-border); backdrop-filter: blur(12px); }
  .eh-btn-secondary::before { background: rgba(255,255,255,0.1); }
  .eh-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
  .eh-btn-secondary:hover::before { transform: translateY(-100%); }

  /* Rotating Badge */
  .eh-rotating-badge { position: absolute; top: 40px; right: 0; width: 140px; height: 140px; display: none; }
  @media (min-width: 1024px) { .eh-rotating-badge { display: block; } }
  .eh-badge-svg { animation: rotateBadge 12s linear infinite; width: 100%; height: 100%; }
  .eh-badge-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary); }

  /* --- 4-COLUMN BENTO GRID --- */
  .eh-bento-grid {
    display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 20px;
    grid-auto-flow: dense;
  }
  @media (min-width: 768px) { .eh-bento-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .eh-bento-grid { grid-template-columns: repeat(4, 1fr); } }

  .eh-span-2 { grid-column: span 1; }
  .eh-span-4 { grid-column: span 1; }
  
  @media (min-width: 768px) {
    .eh-span-2 { grid-column: span 2; }
    .eh-span-4 { grid-column: span 2; }
  }
  @media (min-width: 1024px) {
    .eh-span-4 { grid-column: span 4; }
  }

  .eh-bento-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 24px; padding: 32px; position: relative; overflow: hidden;
    backdrop-filter: blur(12px); transition: all 0.4s var(--easing-premium);
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .eh-bento-card:hover { background: rgba(255,255,255,0.03); border-color: rgba(0,210,180,0.3); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
  
  /* Widget Specifics */
  .eh-featured-bg { background: linear-gradient(145deg, rgba(0,210,180,0.08) 0%, rgba(5,7,10,0) 100%); }
  
  .eh-bento-header { display: flex; align-items: center; gap: 12px; font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 24px; }
  .eh-bento-header svg { color: var(--primary); }
  
  .eh-bento-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.05); color: var(--primary); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
  
  .eh-stat-num { font-family: 'Syne', sans-serif; font-size: clamp(32px, 3vw, 48px); font-weight: 800; line-height: 1; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em; }
  .eh-stat-label { font-size: 14px; color: var(--text-muted); font-weight: 400; letter-spacing: 0.05em; line-height: 1.5; }

  /* Custom Tech Tags */
  .eh-tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .eh-tech-tag { padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: var(--text-main); }
  
  /* Location Map Style */
  .eh-map-bg {
    position: absolute; right: -20%; bottom: -20%; width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(0,210,180,0.1) 0%, transparent 70%); border-radius: 50%;
  }

  /* Social Mini-Grid */
  .eh-social-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; width: 100%; }
  .eh-social-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 16px; border-radius: 16px; background: rgba(255,255,255,0.03);
    border: 1px solid var(--glass-border); color: var(--text-main);
    text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.3s;
  }
  .eh-social-btn:hover { background: var(--primary); color: #000; border-color: var(--primary); transform: translateY(-4px); }

  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 12px; }
`;

export default function HomePage() {
  
  const eliteCalendarTheme = {
    dark: ['rgba(255,255,255,0.05)', 'rgba(0,210,180,0.3)', 'rgba(0,210,180,0.6)', 'rgba(0,210,180,0.8)', '#00d2b4'],
  };

  return (
    <>
      <style>{eliteHomeStyles}</style>

      <section className="eh-wrapper">
        <div className="eh-ambient">
          <div className="eh-glow-1" />
          <div className="eh-glow-2" />
          <div className="eh-noise" />
        </div>

        <div className="eh-container">
          
          {/* --- HERO SECTION --- */}
          <div className="eh-hero-section">
            <div className="eh-rotating-badge reveal-1">
              <svg viewBox="0 0 100 100" className="eh-badge-svg">
                <path id="circlePath" fill="none" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                <text><textPath href="#circlePath" fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="1.5px" fontWeight="600">CREATIVE DEVELOPER • FULL STACK •</textPath></text>
              </svg>
              <div className="eh-badge-icon"><Sparkles size={24} /></div>
            </div>

            <div className="eh-status-pill reveal-1">
              <div className="eh-status-dot" /> Available for New Projects
            </div>

            <h1 className="eh-massive-text reveal-2">
              <span className="eh-text-outline">DARSH</span>
            </h1>

            <div className="eh-hero-bottom reveal-3">
              <p className="eh-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. 
                Specializing in the MERN stack & Android ecosystem to build scalable, pixel-perfect solutions.
              </p>

              <div className="eh-actions">
                <a href="/Darsh_resume.pdf" download className="eh-btn eh-btn-primary">
                  Download CV <Download size={18} />
                </a>
                <Link to="/projects" className="eh-btn eh-btn-secondary">
                  Explore Work <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* --- ASYMMETRICAL 4-COLUMN BENTO GRID --- */}
          <div className="eh-bento-grid reveal-4">
            
            {/* Widget 1: Main Stack (Span 2) */}
            <div className="eh-bento-card eh-span-2 eh-featured-bg">
              <div className="eh-bento-icon"><Code2 size={24} /></div>
              <div>
                <div className="eh-stat-num">MERN</div>
                <div className="eh-stat-label">Core Architecture Stack</div>
              </div>
            </div>

            {/* Widget 2: Projects */}
            <div className="eh-bento-card">
              <div className="eh-bento-header" style={{marginBottom: '0'}}><Terminal size={20} /></div>
              <div style={{marginTop: '24px'}}>
                <div className="eh-stat-num">15<span style={{color: 'var(--primary)', fontSize: '32px'}}>+</span></div>
                <div className="eh-stat-label">Projects Shipped</div>
              </div>
            </div>

            {/* Widget 3: Location */}
            <div className="eh-bento-card" style={{overflow: 'hidden'}}>
              <div className="eh-map-bg"></div>
              <div className="eh-bento-header" style={{marginBottom: '0'}}><MapPin size={20} /></div>
              <div style={{marginTop: '24px', zIndex: 1}}>
                <div className="eh-stat-num" style={{fontSize: '32px'}}>Gujarat</div>
                <div className="eh-stat-label">Base Location, India</div>
              </div>
            </div>

            {/* Widget 4: GitHub Calendar (Full Width Span 4) */}
            <div className="eh-bento-card eh-span-4" style={{ overflowX: 'auto' }}>
              <div className="eh-bento-header">
                <Github size={20} />
                <span>GitHub Contributions</span>
              </div>
              <div style={{ padding: '10px 0', minWidth: '700px' }}>
                <GitHubCalendar 
                  username="DWRSH" 
                  colorScheme="dark"
                  theme={eliteCalendarTheme}
                  blockSize={14}
                  blockMargin={6}
                  fontSize={14}
                  hideTotalCount={false}
                />
              </div>
            </div>

            {/* Widget 5: Tools & Technologies (Span 2) */}
            <div className="eh-bento-card eh-span-2">
              <div className="eh-bento-header">
                <Smartphone size={20} />
                <span>Tech Arsenal</span>
              </div>
              <div className="eh-stat-label">
                My go-to tools for building scalable web apps, mobile interfaces, and secure architectures.
              </div>
              <div className="eh-tech-tags">
                <span className="eh-tech-tag">React.js</span>
                <span className="eh-tech-tag">Node.js</span>
                <span className="eh-tech-tag">MongoDB</span>
                <span className="eh-tech-tag">React Native</span>
                <span className="eh-tech-tag">FastAPI</span>
                <span className="eh-tech-tag">Python</span>
              </div>
            </div>

            {/* Widget 6: Current Focus (Span 2) */}
            <div className="eh-bento-card eh-span-2" style={{ borderLeft: '2px solid var(--primary)' }}>
              <div className="eh-bento-header">
                <Activity size={20} />
                <span>Currently Building</span>
              </div>
              <div>
                <div className="eh-stat-num" style={{fontSize: '28px'}}>StockWatcher</div>
                <div className="eh-stat-label">
                  Developing a real-time portfolio management and alert system integrated with modern fintech APIs.
                </div>
              </div>
            </div>

            {/* Widget 7: Social Connect (Full Width Span 4) */}
            <div className="eh-bento-card eh-span-4" style={{ padding: '24px' }}>
              <div className="eh-social-grid">
                <a href="https://github.com/DWRSH" target="_blank" rel="noreferrer" className="eh-social-btn">
                  <Github size={18} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/darshprajapati15" target="_blank" rel="noreferrer" className="eh-social-btn">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="mailto:contact@darshprajapati.dev" className="eh-social-btn">
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
