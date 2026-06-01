import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, Code2, Star, MapPin, Music, Trophy, Pen, Github, Linkedin, Code, Rss, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── ULTRA-PREMIUM STYLES + ADVANCED BENTO GRID ──────────────────────────── */
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
    --card-bg: #0d1117;
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    color: var(--text-main);
    padding: 120px 24px 60px;
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
    background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%);
    bottom: -200px; left: -200px; animation: floatSlow 18s ease-in-out infinite reverse;
  }
  .eh-noise {
    position: absolute; inset: 0; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }

  /* --- Animations --- */
  @keyframes revealUp { from { opacity: 0; transform: translateY(40px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
  @keyframes floatSlow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, 40px); } }
  @keyframes rotateBadge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .reveal-1 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.1s; }
  .reveal-2 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.2s; }
  .reveal-3 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.3s; }
  .reveal-4 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.5s; }

  /* --- Container & Layout --- */
  .eh-container { position: relative; z-index: 2; width: 100%; max-width: 1100px; display: flex; flex-direction: column; gap: 60px; }

  /* --- Massive Editorial Typography (Untouched) --- */
  .eh-hero-section { display: flex; flex-direction: column; position: relative; }
  
  .eh-status-pill {
    display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.05); color: var(--primary);
    font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 32px; backdrop-filter: blur(8px);
  }
  .eh-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); animation: blink 2s infinite; }
  @keyframes blink { 50% { opacity: 0.4; box-shadow: none; } }

  .eh-massive-text { font-family: 'Syne', sans-serif; font-size: clamp(60px, 11vw, 160px); font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 24px 0; display: flex; flex-direction: column; }
  .eh-text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2); transition: all 0.5s var(--easing-premium); }
  .eh-text-outline:hover { color: var(--primary); -webkit-text-stroke: 1.5px transparent; text-shadow: 0 0 60px rgba(0,210,180,0.3); }
  
  .eh-hero-bottom { display: flex; flex-direction: column; gap: 32px; }
  @media (min-width: 768px) { .eh-hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
  .eh-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--text-muted); max-width: 480px; margin: 0; }
  .eh-bio strong { color: #fff; font-weight: 500; }

  /* Liquid Hover Buttons */
  .eh-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .eh-btn { position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-size: 15px; font-weight: 600; text-decoration: none; overflow: hidden; transition: color 0.4s; z-index: 1; }
  .eh-btn::before { content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%; transition: transform 0.5s var(--easing-premium); z-index: -1; border-radius: 100px; }
  .eh-btn-primary { background: var(--primary); color: var(--bg-ultra-dark); border: 1px solid var(--primary); }
  .eh-btn-primary::before { background: #fff; }
  .eh-btn-primary:hover { color: var(--bg-ultra-dark); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,210,180,0.2); }
  .eh-btn-primary:hover::before { transform: translateY(-100%); }
  .eh-btn-secondary { background: var(--glass-bg); color: #fff; border: 1px solid var(--glass-border); backdrop-filter: blur(12px); }
  .eh-btn-secondary::before { background: rgba(255,255,255,0.1); }
  .eh-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
  .eh-btn-secondary:hover::before { transform: translateY(-100%); }
  .eh-btn-secondary:hover svg { transform: translateX(4px); }
  .eh-btn svg { transition: transform 0.3s; }

  .eh-rotating-badge { position: absolute; top: 40px; right: 0; width: 140px; height: 140px; display: none; }
  @media (min-width: 1024px) { .eh-rotating-badge { display: block; } }
  .eh-badge-svg { animation: rotateBadge 12s linear infinite; width: 100%; height: 100%; }
  .eh-badge-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary); }

  /* ─── NEW COMPACT BENTO MASTER ───────────────────────────────────────── */
  .eh-bento-master {
    background: rgba(255, 255, 255, 0.015); /* Subtle grouping wrapper, NO border */
    border-radius: 32px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    grid-auto-flow: dense;
  }

  .eh-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.3s var(--easing-premium), border-color 0.3s;
  }
  .eh-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-4px); }

  /* Grid Spans */
  .col-span-1 { grid-column: span 1; }
  .col-span-2 { grid-column: span 2; }
  .col-span-3 { grid-column: span 3; }
  .col-span-4 { grid-column: span 4; }

  /* Mobile Bento Grid (Force 2 Columns) */
  @media (max-width: 768px) {
    .eh-bento-master { grid-template-columns: repeat(2, 1fr); padding: 10px; gap: 10px; }
    .eh-card { padding: 16px; }
    .col-span-1 { grid-column: span 2; } 
    .col-span-2, .col-span-3, .col-span-4 { grid-column: span 2; }
    .mob-span-1 { grid-column: span 1 !important; } /* Keeps location & music small side-by-side */
  }

  /* Widget Details */
  .eh-widget-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; }
  .eh-widget-title svg { color: var(--primary); }
  
  .eh-mern-bg { background: linear-gradient(135deg, #1e3a8a 0%, #0d1117 100%); justify-content: center; align-items: center; text-align: center; }
  
  .eh-map-img { width: 100%; height: 90px; border-radius: 12px; margin-top: 12px; background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/512px-Google_Maps_Logo_2020.svg.png') center/cover; filter: grayscale(1) invert(1) contrast(0.8); opacity: 0.6; }
  
  /* GitHub Scaling */
  .eh-git-wrapper { width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .eh-git-scale { transform: scale(0.95); transform-origin: center; }
  @media (max-width: 768px) {
    .eh-git-wrapper { justify-content: flex-start; overflow-x: auto; }
    .eh-git-scale { transform: scale(1); padding-bottom: 8px; }
  }
  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 12px; }

  /* Infinite Marquee */
  .eh-marquee-wrapper { display: flex; flex-direction: column; gap: 12px; overflow: hidden; width: 100%; position: relative; -webkit-mask-image: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent); }
  .eh-marquee-track { display: flex; gap: 16px; width: max-content; }
  .eh-marquee-left { animation: scrollLeft 20s linear infinite; }
  .eh-marquee-right { animation: scrollRight 20s linear infinite; }
  @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  
  .eh-skill-icon { width: 36px; height: 36px; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; border: 1px solid var(--glass-border); transition: 0.3s; }
  .eh-skill-icon:hover { transform: scale(1.1); border-color: var(--primary); background: rgba(0,210,180,0.1); }
  .icon-invert { filter: invert(1); }

  /* Social Grid */
  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; height: 100%; }
  .eh-social-item { background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 6px; color: var(--text-main); text-decoration: none; transition: 0.3s; }
  .eh-social-item:hover { background: rgba(255,255,255,0.1); border-color: var(--primary); transform: translateY(-2px); }
  .eh-social-name { font-weight: 700; font-size: 13px; }
  .eh-social-sub { font-size: 11px; color: var(--text-muted); }
`;

export default function HomePage() {
  
  const eliteCalendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const skillIconsRow1 = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  ];

  const skillIconsRow2 = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  ];

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
          
          {/* --- Massive Editorial Hero (UNTOUCHED) --- */}
          <div className="eh-hero-section">
            <div className="eh-rotating-badge reveal-1">
              <svg viewBox="0 0 100 100" className="eh-badge-svg">
                <path id="circlePath" fill="none" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                <text>
                  <textPath href="#circlePath" fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="1.5px" fontWeight="600">
                    CREATIVE DEVELOPER • FULL STACK •
                  </textPath>
                </text>
              </svg>
              <div className="eh-badge-icon"><Sparkles size={24} /></div>
            </div>

            <div className="eh-status-pill reveal-1">
              <div className="eh-status-dot" />
              Available for New Projects
            </div>

            <h1 className="eh-massive-text reveal-2">
              <span className="eh-text-outline">DARSH</span>
            </h1>

            <div className="eh-hero-bottom reveal-3">
              <p className="eh-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. 
                Specializing in the MERN stack to bridge the gap between heavy-duty backends and pixel-perfect frontends.
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

          {/* --- ADVANCED COMPACT BENTO GRID --- */}
          <div className="eh-bento-master reveal-4">
            
            {/* Row 1 */}
            <div className="eh-card col-span-2 eh-mern-bg">
              <h2 className="text-3xl font-bold text-white mb-2">Full-Stack</h2>
              <p className="text-sm text-teal-400 font-semibold tracking-widest uppercase">MERN Architecture</p>
            </div>

            <div className="eh-card col-span-1">
              <h3 className="text-[16px] font-bold text-white mb-2 leading-snug">Is MERN Stack Dead? A Fresher's Struggle...</h3>
              <p className="text-xs text-gray-400 mb-4">A real story of a fresher visiting 30+ software houses...</p>
              <div className="flex justify-between text-[10px] text-gray-500 mt-auto font-semibold">
                <span>Dec 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            <div className="eh-card col-span-1">
              <div className="eh-widget-title"><Trophy size={14} /> Achievements</div>
              <ul className="text-xs text-gray-400 space-y-2 mt-2">
                <li>• Completed 15+ Projects</li>
                <li>• Built StockWatcher</li>
                <li>• Deloitte Simulation</li>
              </ul>
            </div>

            {/* Row 2 */}
            <div className="eh-card col-span-1 mob-span-1">
              <div className="eh-widget-title"><MapPin size={14} /> Location</div>
              <p className="text-xs text-gray-400">Idar, Gujarat</p>
              <div className="eh-map-img" />
            </div>

            <div className="eh-card col-span-1 mob-span-1">
              <div className="eh-widget-title"><Music size={14} /> Alone</div>
              <div className="flex gap-3 items-start mb-2">
                <p className="text-[10px] text-gray-400 flex-1">Top track this month</p>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alone" className="w-12 h-12 rounded-lg object-cover" />
              </div>
              <p className="text-[10px] text-gray-500 italic mt-auto leading-tight">"This track captures the feeling of being immersed..."</p>
            </div>

            <div className="eh-card col-span-2">
              <div className="eh-widget-title"><Github size={14} /> GitHub Contributions</div>
              <div className="eh-git-wrapper">
                <div className="eh-git-scale">
                  <GitHubCalendar 
                    username="DWRSH" 
                    colorScheme="dark"
                    theme={eliteCalendarTheme}
                    blockSize={11}
                    blockMargin={4}
                    fontSize={11}
                    hideTotalCount={true}
                  />
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-white font-semibold mt-3 px-2">
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="eh-card col-span-1" style={{ padding: '12px' }}>
              <div className="flex h-full">
                <div className="text-[10px] font-semibold text-gray-400 border-r border-white/10 pr-2 flex items-center justify-center text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  I love reading <BookOpen size={10} className="inline ml-1" />
                </div>
                <div className="flex-1 flex items-center justify-center p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Rich Dad" className="max-h-[100px] w-auto object-contain rounded" />
                </div>
              </div>
            </div>

            <div className="eh-card col-span-1">
              <div className="eh-widget-title"><Layers size={14} /> Skills</div>
              <div className="eh-marquee-wrapper mt-auto mb-auto">
                <div className="eh-marquee-track eh-marquee-left">
                  {[...skillIconsRow1, ...skillIconsRow1].map((url, i) => (
                    <img key={`r1-${i}`} src={url} alt="Skill" className="eh-skill-icon" />
                  ))}
                </div>
                <div className="eh-marquee-track eh-marquee-right">
                  {[...skillIconsRow2, ...skillIconsRow2].map((url, i) => (
                    <img key={`r2-${i}`} src={url} alt="Skill" className={`eh-skill-icon ${url.includes('github') ? 'icon-invert' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="eh-card col-span-2" style={{ padding: '16px' }}>
              <div className="eh-social-grid">
                
                <a href="https://github.com/DWRSH" target="_blank" rel="noreferrer" className="eh-social-item">
                  <Github size={16} className="mb-1 text-white" />
                  <div>
                    <div className="eh-social-name">GitHub</div>
                    <div className="eh-social-sub">Repositories</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/darshprajapati15" target="_blank" rel="noreferrer" className="eh-social-item">
                  <Linkedin size={16} className="mb-1 text-[#0077b5]" />
                  <div>
                    <div className="eh-social-name">LinkedIn</div>
                    <div className="eh-social-sub">Connect</div>
                  </div>
                </a>
                
                <div className="eh-social-item">
                  <Pen size={16} className="mb-1 text-teal-400" />
                  <div>
                    <div className="eh-social-name">Tools</div>
                    <div className="eh-social-sub">VS Code, Git</div>
                  </div>
                </div>

                <a href="#" className="eh-social-item">
                  <Code size={16} className="mb-1 text-white" />
                  <div>
                    <div className="eh-social-name">CodePen</div>
                    <div className="eh-social-sub">Frontend UI</div>
                  </div>
                </a>

                <a href="#" className="eh-social-item col-span-2" style={{ gridColumn: 'span 2' }}>
                  <Rss size={16} className="mb-1 text-[#ff4500]" />
                  <div>
                    <div className="eh-social-name">Reddit</div>
                    <div className="eh-social-sub">Join discussions</div>
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
