import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, MapPin, Music, Trophy, PenTool, Github, Linkedin, Facebook, Codepen, Rss, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── ORIGINAL ULTRA-PREMIUM STYLES (RESTORED) ────────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);
    --card-bg: #0d1117; /* GitHub dark theme matching */
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

  .eh-container { position: relative; z-index: 2; width: 100%; max-width: 1200px; display: flex; flex-direction: column; gap: 60px; }
  
  /* --- Massive Editorial Hero --- */
  .eh-hero-section { display: flex; flex-direction: column; position: relative; }
  
  .eh-status-pill {
    display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.05); color: var(--primary); font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px;
  }
  .eh-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); animation: blink 2s infinite; }
  @keyframes blink { 50% { opacity: 0.4; box-shadow: none; } }

  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(80px, 14vw, 180px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 24px 0;
  }
  .eh-text-outline { color: transparent; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3); transition: all 0.5s; }
  .eh-text-outline:hover { color: var(--text-main); -webkit-text-stroke: 2px transparent; text-shadow: 0 0 40px rgba(255,255,255,0.2); }

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

  /* --- 4-COLUMN BENTO GRID (Image Accurate) --- */
  .eh-bento-grid {
    display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 20px;
    grid-auto-flow: dense;
  }
  @media (min-width: 768px) { .eh-bento-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .eh-bento-grid { grid-template-columns: repeat(4, 1fr); } }

  .eh-span-2 { grid-column: span 1; }
  .eh-span-3 { grid-column: span 1; }
  .eh-span-4 { grid-column: span 1; }
  
  @media (min-width: 768px) {
    .eh-span-2 { grid-column: span 2; }
    .eh-span-3 { grid-column: span 2; }
    .eh-span-4 { grid-column: span 2; }
  }
  @media (min-width: 1024px) {
    .eh-span-3 { grid-column: span 3; }
    .eh-span-4 { grid-column: span 4; }
  }

  .eh-bento-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
    transition: all 0.3s var(--easing-premium); display: flex; flex-direction: column;
  }
  .eh-bento-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

  /* Widget Headers */
  .eh-widget-title { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 16px; }
  .eh-widget-title svg { color: var(--text-muted); }

  /* Custom Sub-Styles for Widgets based on Image */
  .eh-blog-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
  .eh-blog-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
  
  .eh-list { margin: 0; padding-left: 20px; color: var(--text-muted); font-size: 14px; display: flex; flex-direction: column; gap: 8px; }
  
  .eh-map-img { width: 100%; height: 120px; background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/227px-Google_Maps_Logo_2020.svg.png') center/cover; border-radius: 12px; opacity: 0.5; margin-top: 12px; }
  
  .eh-music-cover { width: 80px; height: 80px; background: linear-gradient(45deg, #111, #333); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  
  .eh-skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .eh-skill-icon { padding: 8px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 12px; font-weight: 600; }
  
  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; height: 100%; }
  @media (min-width: 768px) { .eh-social-grid { grid-template-columns: repeat(3, 1fr); } }
  .eh-social-item { display: flex; flex-direction: column; gap: 8px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--glass-border); text-decoration: none; color: var(--text-main); transition: background 0.3s; }
  .eh-social-item:hover { background: rgba(255,255,255,0.1); }
  .eh-social-name { font-weight: 700; font-size: 14px; }
  .eh-social-sub { font-size: 12px; color: var(--text-muted); line-height: 1.4; }

  /* GitHub Calendar Tweaks */
  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 12px; }
`;

export default function HomePage() {
  
  // Custom dark theme for calendar to match the image precisely
  const eliteCalendarTheme = {
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'], // Exact GitHub Greens
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

            {/* Exactly as requested: Just "DARSH" with outline */}
            <h1 className="eh-massive-text reveal-2">
              <span className="eh-text-outline">DARSH</span>
            </h1>

            <div className="eh-hero-bottom reveal-3">
              <p className="eh-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. 
                Specializing in the MERN stack & modern ecosystems to build scalable solutions.
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

          {/* --- ASYMMETRICAL 4-COLUMN BENTO GRID (IMAGE EXACT) --- */}
          <div className="eh-bento-grid reveal-4">
            
            {/* Row 1 */}
            <div className="eh-bento-card eh-span-2" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', justifyContent: 'center', alignItems: 'center' }}>
               <h3 className="text-2xl font-bold text-white text-center">Full-Stack<br/>MERN Architecture</h3>
            </div>

            <div className="eh-bento-card">
              <h3 className="eh-blog-title">Is MERN Stack Dead? A Fresher's Struggle...</h3>
              <p className="eh-blog-desc">A real and honest story of a fresher visiting 30+ software...</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: 'auto' }}>
                <span>December 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            <div className="eh-bento-card">
              <div className="eh-widget-title"><Trophy size={18} /> Achievements</div>
              <ul className="eh-list">
                <li>Completed 12+ Projects</li>
                <li>Built a MERN app</li>
              </ul>
            </div>

            {/* Row 2 */}
            <div className="eh-bento-card">
              <div className="eh-widget-title"><PenTool size={18} /> Tools</div>
              <p className="eh-blog-desc">VS Code, Git, GitHub, Postman, Vite, Android Studio</p>
            </div>

            <div className="eh-bento-card">
              <div className="eh-widget-title"><MapPin size={18} /> Location</div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Idar, Gujarat</p>
              <div className="eh-map-img"></div>
            </div>

            <div className="eh-bento-card">
              <div className="eh-widget-title"><Music size={18} /> Alone</div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1, fontSize: '13px', color: 'var(--text-muted)' }}>Top listened track this month</div>
                <div className="eh-music-cover"><Music size={32} color="#fff" /></div>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 'auto' }}>
                "This track captures the feeling of being completely immersed in your own world..."
              </p>
            </div>

            {/* GitHub Contributions (Span 2) */}
            <div className="eh-bento-card eh-span-2">
              <div className="eh-widget-title"><Github size={18} /> GitHub Contributions</div>
              <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
                <div style={{ minWidth: '500px' }}>
                  <GitHubCalendar 
                    username="DWRSH" 
                    colorScheme="dark"
                    theme={eliteCalendarTheme}
                    blockSize={11}
                    blockMargin={4}
                    fontSize={12}
                    hideTotalCount={true}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '16px', color: '#fff' }}>
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="eh-bento-card" style={{ padding: 0 }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '16px 8px', fontSize: '12px', fontWeight: '600', borderRight: '1px solid var(--glass-border)' }}>
                  I love reading books <BookOpen size={14} style={{ display: 'inline', marginLeft: '8px' }} />
                </div>
                <div style={{ flex: 1, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Book placeholder */}
                  <div style={{ width: '80%', height: '80%', background: '#ffcc00', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', padding: '8px' }}>
                    Rich Dad<br/>Poor Dad
                  </div>
                </div>
              </div>
            </div>

            <div className="eh-bento-card eh-span-2">
              <div className="eh-widget-title"><Layers size={18} /> Skills</div>
              <div className="eh-skills-grid">
                {['C', 'C++', 'CSS', 'Discord', 'Django', 'Docker', '.NET', 'React', 'GitHub', 'HTML5', 'Java', 'JS', 'jQuery', 'Kotlin', 'Linux'].map(skill => (
                  <span key={skill} className="eh-skill-icon">{skill}</span>
                ))}
              </div>
            </div>

            <div className="eh-bento-card eh-span-3" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <div className="eh-social-grid">
                <a href="#" className="eh-social-item">
                  <Codepen size={24} />
                  <div>
                    <div className="eh-social-name">CodePen</div>
                    <div className="eh-social-sub">View my front-end...</div>
                  </div>
                </a>
                <a href="#" className="eh-social-item">
                  <Facebook size={24} />
                  <div>
                    <div className="eh-social-name">Facebook</div>
                    <div className="eh-social-sub">Connect and follow me on...</div>
                  </div>
                </a>
                <a href="https://github.com/DWRSH" className="eh-social-item">
                  <Github size={24} />
                  <div>
                    <div className="eh-social-name">GitHub</div>
                    <div className="eh-social-sub">My GitHub profile...</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/darshprajapati15" className="eh-social-item">
                  <Linkedin size={24} />
                  <div>
                    <div className="eh-social-name">LinkedIn</div>
                    <div className="eh-social-sub">Connect with me...</div>
                  </div>
                </a>
                <a href="#" className="eh-social-item eh-span-2" style={{ gridColumn: 'span 2' }}>
                  <Rss size={24} />
                  <div>
                    <div className="eh-social-name">Reddit</div>
                    <div className="eh-social-sub">DWRSH<br/>Join discussions and share insights on Reddit communities.</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
