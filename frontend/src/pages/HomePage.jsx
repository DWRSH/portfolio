import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, Code2, Star, MapPin, Music, Trophy, Wrench, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE PREMIUM BENTO GRID ARCHITECTURE ────────────────────────────── */
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
    --card-bg: #090d13; /* Exact dark layout box color from screenshot */
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
  .eh-ambient {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .eh-glow-1 {
    position: absolute; width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.05) 0%, transparent 60%);
    top: -300px; right: -200px;
    animation: floatSlow 15s ease-in-out infinite;
  }
  .eh-glow-2 {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%);
    bottom: -200px; left: -200px;
    animation: floatSlow 18s ease-in-out infinite reverse;
  }
  .eh-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }

  /* --- Animations --- */
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30px, 40px); }
  }
  @keyframes rotateBadge {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .reveal-1 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.1s; }
  .reveal-2 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.2s; }
  .reveal-3 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.3s; }
  .reveal-4 { opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; animation-delay: 0.5s; }

  /* --- Container & Layout --- */
  .eh-container {
    position: relative; z-index: 2;
    width: 100%; max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  /* --- Massive Editorial Typography --- */
  .eh-hero-section {
    display: flex; flex-direction: column; position: relative;
  }
  
  .eh-status-pill {
    display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.05); color: var(--primary);
    font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 32px; backdrop-filter: blur(8px);
  }
  .eh-status-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--primary);
    box-shadow: 0 0 10px var(--primary); animation: blink 2s infinite;
  }
  @keyframes blink { 50% { opacity: 0.4; box-shadow: none; } }

  .eh-massive-text {
    font-family: 'Syne', sans-serif;
    font-size: clamp(60px, 11vw, 160px);
    font-weight: 800; line-height: 0.9;
    letter-spacing: -0.04em; margin: 0 0 24px 0;
    display: flex; flex-direction: column;
  }
  .eh-text-outline {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
    transition: all 0.5s var(--easing-premium);
  }
  .eh-text-outline:hover {
    color: var(--primary); -webkit-text-stroke: 1.5px transparent;
    text-shadow: 0 0 60px rgba(0,210,180,0.3);
  }

  .eh-hero-bottom {
    display: flex; flex-direction: column; gap: 32px;
  }
  @media (min-width: 768px) {
    .eh-hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; }
  }

  .eh-bio {
    font-size: 18px; font-weight: 300; line-height: 1.6;
    color: var(--text-muted); max-width: 480px; margin: 0;
  }
  .eh-bio strong { color: #fff; font-weight: 500; }

  /* --- Liquid Hover Buttons --- */
  .eh-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  
  .eh-btn {
    position: relative; display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 32px; border-radius: 100px; font-size: 15px; font-weight: 600;
    text-decoration: none; overflow: hidden; transition: color 0.4s; z-index: 1;
  }
  .eh-btn::before {
    content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%;
    transition: transform 0.5s var(--easing-premium); z-index: -1;
    border-radius: 100px;
  }
  
  .eh-btn-primary {
    background: var(--primary); color: var(--bg-ultra-dark);
    border: 1px solid var(--primary);
  }
  .eh-btn-primary::before { background: #fff; }
  .eh-btn-primary:hover { color: var(--bg-ultra-dark); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,210,180,0.2); }
  .eh-btn-primary:hover::before { transform: translateY(-100%); }

  .eh-btn-secondary {
    background: var(--glass-bg); color: #fff;
    border: 1px solid var(--glass-border); backdrop-filter: blur(12px);
  }
  .eh-btn-secondary::before { background: rgba(255,255,255,0.1); }
  .eh-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
  .eh-btn-secondary:hover::before { transform: translateY(-100%); }
  .eh-btn-secondary:hover svg { transform: translateX(4px); }
  .eh-btn svg { transition: transform 0.3s; }

  /* --- Rotating SVG Badge --- */
  .eh-rotating-badge {
    position: absolute; top: 40px; right: 0;
    width: 140px; height: 140px;
    display: none;
  }
  @media (min-width: 1024px) { .eh-rotating-badge { display: block; } }
  
  .eh-badge-svg { animation: rotateBadge 12s linear infinite; width: 100%; height: 100%; }
  .eh-badge-icon {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    color: var(--primary);
  }

  /* ─── MASTER BOX BENTO GRID CONTAINER (NO BORDER) ─────────────────────── */
  .eh-bento-master {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile for tight bento look */
    gap: 14px;
    width: 100%;
  }

  @media (min-width: 768px) {
    .eh-bento-master {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .eh-bento-master {
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
  }

  /* Compact Individual Cards */
  .eh-bento-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: all 0.3s var(--easing-premium);
  }
  .eh-bento-card:hover {
    border-color: rgba(255,255,255,0.15);
    transform: translateY(-2px);
  }

  /* Grid Spanning Rules */
  .span-1 { grid-column: span 1; }
  .span-2 { grid-column: span 2; }
  .span-3 { grid-column: span 3; }
  .span-4 { grid-column: span 4; }

  @media (max-width: 768px) {
    .span-1, .span-2, .span-3, .span-4 { grid-column: span 2; }
    .mob-half { grid-column: span 1 !important; } /* Keeps essential small blocks side-by-side on mobile */
  }

  /* Widget Content Elements */
  .eh-w-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px; }
  .eh-w-title svg { color: var(--text-muted); }
  
  .eh-text-bold-title { font-size: 18px; font-weight: 700; color: #fff; line-height: 1.3; margin-bottom: 8px; }
  .eh-text-muted-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
  
  .eh-bullet-list { margin: 8px 0 0 0; padding-left: 16px; font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 6px; }

  /* Map and Graphic Elements */
  .eh-diagram-box {
    width: 100%; height: 120px; border-radius: 10px; margin-bottom: 12px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    display: flex; align-items: center; justify-content: center; position: relative;
  }
  .eh-map-frame {
    width: 100%; height: 100px; border: 0; border-radius: 10px; margin-top: auto;
    filter: invert(90%) hue-rotate(180deg) contrast(90%); pointer-events: none;
  }

  /* GitHub Calendar Layout Constraints */
  .eh-github-box { width: 100%; display: flex; justify-content: center; overflow: hidden; }
  .eh-github-scale { transform: scale(0.96); transform-origin: center; width: max-content; }
  @media (max-width: 768px) {
    .eh-github-box { overflow-x: auto; justify-content: flex-start; }
    .eh-github-scale { transform: scale(1); padding-bottom: 4px; }
  }
  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 11px; }

  /* Under Construction Strip */
  .eh-construction-strip {
    background: #000; border: 1px solid var(--glass-border); border-radius: 12px;
    padding: 14px; display: flex; align-items: center; justify-content: center; gap: 10px;
    font-weight: 700; font-size: 15px; color: #fff; text-transform: uppercase; letter-spacing: 0.05em;
  }

  /* Clean Image Wrappers */
  .eh-fit-img { width: 100%; height: 100%; object-fit: contain; }

  /* Skills Grid Layout (Exact Match) */
  .eh-tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: auto; }
  .eh-tech-icon-card {
    background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
    border-radius: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  }
  .eh-tech-img { width: 22px; height: 22px; object-fit: contain; }
  .invert-logo { filter: invert(1); }

  /* Social Dynamic Box Grid */
  .eh-social-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; width: 100%; }
  .eh-social-card {
    background: #000; border: 1px solid var(--glass-border); border-radius: 10px;
    padding: 12px; display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: #fff;
    transition: background 0.2s;
  }
  .eh-social-card:hover { background: rgba(255,255,255,0.04); }
  .eh-soc-title { font-weight: 700; font-size: 13px; color: #fff; }
  .eh-soc-desc { font-size: 11px; color: var(--text-muted); line-height: 1.3; }
`;

export default function HomePage() {
  const eliteCalendarTheme = {
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const techIcons = [
    { name: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Discord', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg' },
    { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', invert: true },
    { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: '.NET', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
    { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }
  ];

  return (
    <>
      <style>{eliteHomeStyles}</style>

      <section className="eh-wrapper">
        {/* --- Ambient Background --- */}
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

          {/* ─── 100% IMAGE ACCURATE BENTO MASTER ─────────────────────────── */}
          <div className="eh-bento-master reveal-4">
            
            {/* Widget 1: Full-Stack vs MEAN Diagram Block */}
            <div className="eh-bento-card span-2">
              <div className="eh-diagram-box">
                <span className="absolute top-3 left-3 text-[11px] font-bold text-gray-400">Full-Stack</span>
                <span className="absolute top-3 right-3 text-[11px] font-bold text-gray-400">Mean Stack</span>
                <span className="absolute bottom-3 right-3 text-[11px] font-bold text-gray-400">Mern Stack</span>
                
                {/* Visual Intersect representation matching the image */}
                <div className="flex items-center justify-center gap-1">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold">MEAN</div>
                  <div className="w-10 h-10 rounded-full bg-red-500/80 text-white font-bold text-xs flex items-center justify-center z-10">VS</div>
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[10px] font-bold text-teal-400">MERN</div>
                </div>
              </div>
            </div>

            {/* Widget 2: Blog Card */}
            <div className="eh-bento-card span-1">
              <h4 className="eh-text-bold-title">Is MERN Stack Dead? A Fresher's Struggle To Get a...</h4>
              <p className="eh-text-muted-desc line-clamp-3">A real and honest story of a fresher visiting 30+ software hubs to find opportunities.</p>
              <div className="flex justify-between text-[11px] text-gray-500 mt-auto font-medium">
                <span>December 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            {/* Widget 3: Achievements Box */}
            <div className="eh-bento-card span-1 mob-half">
              <div className="eh-w-title"><Trophy size={15} /> Achievements</div>
              <ul className="eh-bullet-list">
                <li>Completed 50+ Projects</li>
                <li>Built a MERN blog app</li>
              </ul>
            </div>

            {/* Widget 4: Tools Block */}
            <div className="eh-bento-card span-1 mob-half">
              <div className="eh-w-title"><Layers size={15} /> Tools</div>
              <p className="eh-text-muted-desc mt-1">VS Code, Git, GitHub, Postman, Vite, Android Studio</p>
            </div>

            {/* Widget 5: Location Map Box */}
            <div className="eh-bento-card span-1 mob-half">
              <div className="eh-w-title"><MapPin size={15} /> Location</div>
              <p className="text-xs text-gray-400 font-medium">Idar, Gujarat</p>
              <div className="eh-map-img">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58444.75704901416!2d72.96291244335936!3d23.834469200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dbece3b6d2e6f%3A0xc54dfabfbfd538e4!2sIdar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1701323838276!5m2!1sen!2sin" 
                  className="eh-map-frame" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map">
                </iframe>
              </div>
            </div>

            {/* Widget 6: Alone Track Box */}
            <div className="eh-bento-card span-1 mob-half">
              <div className="eh-w-title"><Music size={15} /> Alone</div>
              <div className="flex gap-3 items-center mb-2">
                <span className="text-[11px] text-gray-400 flex-1">Top listened track this month</span>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alone" className="w-12 h-12 rounded-lg object-cover" />
              </div>
              <p className="text-[11px] text-gray-500 italic mt-auto leading-tight">"This track captures the feeling of being completely immersed in your own world..."</p>
            </div>

            {/* Widget 7: GitHub Contributions (Span 2) */}
            <div className="eh-bento-card span-2">
              <div className="eh-w-title"><Github size={15} /> GitHub Contributions</div>
              <div className="eh-github-box">
                <div className="eh-github-scale">
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
              <div className="flex justify-between text-[11px] text-white font-bold mt-4 px-1">
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* Widget 8: Discord Small Card */}
            <div className="eh-bento-card span-1 mob-half" style={{ background: '#11141a' }}>
              <div className="flex items-center gap-2 mb-2">
                {/* Inline SVG for Discord Icon */}
                <svg className="w-5 h-5 text-indigo-400 fill-current" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a74.37,74.37,0,0,0,6.72-11A68.6,68.6,0,0,1,28.21,79.9c.85-.63,1.69-1.29,2.5-2a75.47,75.47,0,0,0,72.71,0c.81.69,1.65,1.35,2.5,2a68.41,68.41,0,0,1-10.57,5.47,75.06,75.06,0,0,0,6.72,11,105.73,105.73,0,0,0,31-18.83C129.07,50.7,123.2,27.83,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/></svg>
                <span className="text-xs font-bold text-white">discord</span>
              </div>
              <p className="text-[11px] text-gray-400">@princep4423d</p>
              <p className="text-[10px] text-gray-500 mt-2 leading-tight">Actively engaging in developer communities on Discord.</p>
            </div>

            {/* MIDDLE ROW FULL-SPAN: Under Construction Bar Block */}
            <div className="span-4 col-span-4 width-full">
              <div className="eh-construction-strip">
                <Wrench size={16} /> Under Construction
              </div>
            </div>

            {/* Widget 9: Vertical Book Block */}
            <div className="eh-bento-card span-1 mob-half" style={{ padding: 0 }}>
              <div className="flex h-full">
                <div className="text-[10px] font-bold text-gray-400 border-r border-white/10 pr-2 flex items-center justify-center text-center px-2 py-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', background: '#090d13' }}>
                  I love reading books <BookOpen size={11} className="inline ml-1" />
                </div>
                <div className="flex-1 flex items-center justify-center p-3 bg-black/40">
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Rich Dad Cover" className="eh-fit-img max-h-[110px] rounded shadow-md" />
                </div>
              </div>
            </div>

            {/* Widget 10: Skills Static Grid Wrapper */}
            <div className="eh-bento-card span-1 mob-half">
              <div className="eh-w-title"><Layers size={14} /> Skills</div>
              <div className="eh-tech-grid">
                {techIcons.slice(0, 8).map((skill, idx) => (
                  <div key={idx} className="eh-tech-icon-card" title={skill.name}>
                    <img src={skill.url} className={`eh-tech-img ${skill.invert ? 'invert-logo' : ''}`} alt={skill.name} />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 11: Comprehensive Social Dynamic Grid (Spans 2) */}
            <div className="eh-bento-card span-2" style={{ padding: '14px', background: 'transparent', border: 'none' }}>
              <div className="eh-social-container">
                
                {/* CodePen Inline SVG */}
                <a href="#" className="eh-social-card">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zm0 0v6.5M22 8.5L12 15 2 8.5M2 15.5L12 9l10 6.5"/></svg>
                    <span className="eh-soc-title">CodePen</span>
                  </div>
                  <span className="eh-soc-desc">View my front-end UI blueprints...</span>
                </a>

                {/* Facebook Inline SVG */}
                <a href="#" className="eh-social-card">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                    <span className="eh-soc-title">Facebook</span>
                  </div>
                  <span className="eh-soc-desc">Connect and follow me on social streams...</span>
                </a>

                {/* GitHub */}
                <a href="https://github.com/DWRSH" target="_blank" rel="noreferrer" className="eh-social-card">
                  <div className="flex items-center gap-2">
                    <Github size={16} />
                    <span className="eh-soc-title">GitHub</span>
                  </div>
                  <span className="eh-soc-desc">Explore engineering repositories and tools...</span>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/darshprajapati15" target="_blank" rel="noreferrer" className="eh-social-card">
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-[#0077b5]" />
                    <span className="eh-soc-title">LinkedIn</span>
                  </div>
                  <span className="eh-soc-desc">Connect with my industry network...</span>
                </a>

                {/* Reddit Full Width Span Inside Grid */}
                <a href="#" className="eh-social-card" style={{ gridColumn: 'span 2' }}>
                  <div className="flex items-center gap-2">
                    {/* Reddit Inline SVG */}
                    <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20"><g><path d="M17.17,9a2.31,2.31,0,0,0-2.32,2.31,2.44,2.44,0,0,0,.08,0,5.65,5.65,0,0,1-3.66-1.5,5.72,5.72,0,0,1-1-1.63,2.48,2.48,0,0,0,.43-1.39,2.31,2.31,0,0,0-4.62,0,2.41,2.41,0,0,0,.48,1.44,5.83,5.83,0,0,1-4.72,3.12,2.42,2.42,0,0,0,.08-.54A2.31,2.31,0,0,0,4.52,8.52a2.34,2.34,0,0,0-1.47.53,10.66,10.66,0,0,1,.1-1.8A4.14,4.14,0,0,1,6,3.61a1.21,1.21,0,0,0,.34.05,1.15,1.15,0,1,0-1.15-1.15,1.13,1.13,0,0,0,.1.48A6.33,6.33,0,0,0,2,6.91a13.3,13.3,0,0,0-.14,2.32,2.3,2.3,0,0,0-1.14,2,2.32,2.32,0,0,0,3.77,1.8,7.92,7.92,0,0,0,5.4,1.88,8,8,0,0,0,5.44-1.89,2.32,2.32,0,0,0,3.74-1.79A2.3,2.3,0,0,0,17.17,9Z"/></g></svg>
                    <span className="eh-soc-title">Reddit</span>
                  </div>
                  <span className="eh-soc-desc">princep4423d <br/> Join technical open-source discussions and share engineering insights on subreddits.</span>
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
