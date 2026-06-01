import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, MapPin, Music, Trophy, PenTool, Github, Linkedin, Wrench, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE EXACT IMAGE BENTO STYLES (CRASH-FREE) ───────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --card-bg: #0d1117;
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 80px 16px 80px;
    display: flex; flex-direction: column; align-items: center;
    overflow: hidden; position: relative;
  }

  .eh-ambient-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.04) 0%, transparent 60%);
    top: -100px; right: -100px; pointer-events: none; z-index: 0; filter: blur(80px);
  }

  .eh-container {
    width: 100%; max-width: 1150px; position: relative; z-index: 10;
  }

  /* --- DARSH Typography with Custom 'D' Icon --- */
  .eh-massive-header {
    display: flex; align-items: center; margin-bottom: 40px;
  }
  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(60px, 10vw, 120px);
    font-weight: 900; line-height: 0.9; letter-spacing: -0.04em;
    color: transparent; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
    transition: all 0.3s;
  }
  .eh-massive-text:hover { color: var(--text-main); -webkit-text-stroke: 2px transparent; }
  
  .eh-d-icon {
    height: clamp(60px, 10vw, 120px); width: auto;
    stroke: rgba(255,255,255,0.3); fill: transparent; stroke-width: 4;
    transition: all 0.3s; margin-right: -2px;
  }
  .eh-massive-header:hover .eh-d-icon { stroke: var(--text-main); fill: var(--text-main); }

  /* --- Hero Actions --- */
  .eh-hero-bottom { display: flex; flex-direction: column; gap: 32px; margin-bottom: 40px; }
  @media (min-width: 768px) { .eh-hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
  .eh-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--text-muted); max-width: 480px; margin: 0; }
  .eh-bio strong { color: #fff; font-weight: 500; }
  
  .eh-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .eh-btn { position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-size: 15px; font-weight: 600; text-decoration: none; overflow: hidden; transition: color 0.4s; z-index: 1; }
  .eh-btn::before { content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); z-index: -1; border-radius: 100px; }
  .eh-btn-primary { background: var(--primary); color: var(--bg-ultra-dark); border: 1px solid var(--primary); }
  .eh-btn-primary::before { background: #fff; }
  .eh-btn-primary:hover { color: var(--bg-ultra-dark); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,210,180,0.2); }
  .eh-btn-primary:hover::before { transform: translateY(-100%); }
  .eh-btn-secondary { background: rgba(255, 255, 255, 0.02); color: #fff; border: 1px solid var(--glass-border); backdrop-filter: blur(12px); }
  .eh-btn-secondary::before { background: rgba(255,255,255,0.1); }
  .eh-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
  .eh-btn-secondary:hover::before { transform: translateY(-100%); }
  .eh-btn-secondary:hover svg { transform: translateX(4px); }
  .eh-btn svg { transition: transform 0.3s; }

  .eh-status-pill {
    display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.05); color: var(--primary);
    font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 32px; backdrop-filter: blur(8px);
  }
  .eh-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); animation: blink 2s infinite; }
  @keyframes blink { 50% { opacity: 0.4; box-shadow: none; } }

  .eh-rotating-badge { position: absolute; top: 0; right: 0; width: 140px; height: 140px; display: none; }
  @media (min-width: 1024px) { .eh-rotating-badge { display: block; } }
  .eh-badge-svg { animation: rotateBadge 12s linear infinite; width: 100%; height: 100%; }
  .eh-badge-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary); }
  @keyframes rotateBadge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* --- Master Bento Wrapper --- */
  .eh-bento-master {
    background: rgba(255, 255, 255, 0.015);
    border-radius: 24px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    grid-auto-flow: dense;
  }

  .eh-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .eh-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

  .col-1 { grid-column: span 1; }
  .col-2 { grid-column: span 2; }
  .col-3 { grid-column: span 3; }
  .col-4 { grid-column: span 4; }

  @media (max-width: 768px) {
    .eh-bento-master { grid-template-columns: repeat(2, 1fr); padding: 8px; gap: 12px; }
    .eh-card { padding: 14px; }
    .col-1, .col-2, .col-3, .col-4 { grid-column: span 2; }
    .mob-half { grid-column: span 1 !important; } 
  }

  .eh-widget-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px; }
  .eh-widget-title svg { color: var(--text-muted); }

  .eh-map-img {
    width: 100%; height: 110px; border-radius: 8px; margin-top: auto;
    background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/512px-Google_Maps_Logo_2020.svg.png') center/cover;
    filter: grayscale(1) invert(0.9) contrast(1.2); opacity: 0.8;
  }

  .eh-construction-bar {
    background: #000; border: 1px solid var(--glass-border); border-radius: 8px;
    padding: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;
    font-weight: 700; font-size: 16px; color: #fff; text-align: center;
  }

  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .eh-social-item {
    background: #000; border: 1px solid var(--glass-border); border-radius: 8px;
    padding: 12px; display: flex; flex-direction: column; gap: 8px; color: var(--text-main); text-decoration: none;
    transition: 0.2s;
  }
  .eh-social-item:hover { background: rgba(255,255,255,0.05); }
  .eh-social-name { font-weight: 700; font-size: 13px; }
  .eh-social-sub { font-size: 11px; color: var(--text-muted); line-height: 1.3; }

  .eh-git-wrapper { width: 100%; display: flex; justify-content: center; overflow: hidden; padding: 4px 0; }
  .eh-git-scale { transform: scale(0.95); transform-origin: center; width: max-content; }
  @media (max-width: 768px) {
    .eh-git-wrapper { justify-content: flex-start; overflow-x: auto; }
    .eh-git-scale { transform: scale(1); padding-bottom: 8px; }
  }

  .eh-marquee-wrapper {
    display: flex; flex-direction: column; gap: 12px; overflow: hidden; width: 100%; position: relative;
    -webkit-mask-image: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
  }
  .eh-marquee-track { display: flex; gap: 16px; width: max-content; }
  .eh-marquee-left { animation: scrollLeft 15s linear infinite; }
  .eh-marquee-right { animation: scrollRight 15s linear infinite; }
  
  @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

  .eh-skill-icon {
    width: 36px; height: 36px; padding: 6px; background: rgba(255,255,255,0.05);
    border-radius: 8px; border: 1px solid var(--glass-border);
  }
  .icon-invert { filter: invert(1); }

  .eh-text-bold-title { font-size: 18px; font-weight: 700; color: #fff; line-height: 1.3; margin-bottom: 8px; }
  .eh-text-muted-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
  .eh-bullet-list { margin: 8px 0 0 0; padding-left: 16px; font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 6px; }
  
  .eh-fit-img { width: 100%; height: 100%; object-fit: contain; }
  
  .eh-tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: auto; }
  .eh-tech-icon-card {
    background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
    border-radius: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  }
  .eh-tech-img { width: 22px; height: 22px; object-fit: contain; }
  .invert-logo { filter: invert(1); }

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

  const skillIconsRow1 = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
  ];

  const skillIconsRow2 = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  ];

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

      <div className="eh-wrapper">
        <div className="eh-ambient-glow" />

        <div className="eh-container">
          
          {/* --- HERO SECTION --- */}
          <div style={{ position: 'relative' }}>
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

            {/* Custom D Icon Override applied here */}
            <div className="eh-massive-header reveal-2">
              <svg viewBox="0 0 100 100" className="eh-d-icon">
                <path d="M20 10 L50 10 C 80 10, 90 30, 90 50 C 90 70, 80 90, 50 90 L 20 90 Z" />
                <line x1="20" y1="10" x2="20" y2="90" />
              </svg>
              <h1 className="eh-massive-text">
                ARSH
              </h1>
            </div>

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

          {/* ─── IMAGE ACCURATE BENTO MASTER ─────────────────────────── */}
          <div className="eh-bento-master reveal-4">
            
            {/* Widget 1: Full-Stack vs MEAN Diagram Block */}
            <div className="eh-card col-1" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)', padding: '16px' }}>
              <div className="flex justify-between text-xs font-bold text-white mb-4">
                <span>Full-Stack</span>
                <span>Mean Stack</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl absolute -ml-12 z-10">
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <img src={skillIconsRow1[0]} className="w-6 h-6" alt="Icon" />
                    <img src={skillIconsRow2[2]} className="w-6 h-6" alt="Icon" />
                    <img src={skillIconsRow1[1]} className="w-6 h-6" alt="Icon" />
                    <img src={skillIconsRow1[3]} className="w-6 h-6 icon-invert" alt="Icon" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center z-20 shadow-lg border-2 border-[#1e3a8a]">VS</div>
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl absolute -mr-12 z-10">
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <img src={skillIconsRow2[0]} className="w-6 h-6" alt="Icon" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-6 h-6" alt="Icon" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-6 h-6" alt="Icon" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-6 h-6 icon-invert" alt="Icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Blog Card */}
            <div className="eh-card col-1">
              <h4 className="eh-text-bold-title">Is MERN Stack Dead? A Fresher's Struggle...</h4>
              <p className="eh-text-muted-desc line-clamp-3">A real and honest story of a fresher visiting 30+ software houses to understand the actual market demand.</p>
              <div className="flex justify-between text-[11px] text-gray-500 mt-auto font-medium">
                <span>December 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            {/* Widget 3: Achievements Box */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><Trophy size={16} /> Achievements</div>
              <ul className="eh-bullet-list">
                <li>• Deloitte Cyber Security Simulation</li>
                <li>• Authored AFS-CNN Research Paper</li>
                <li>• B.Sc. CA & IT Ongoing</li>
              </ul>
            </div>

            {/* Widget 4: Tools Block */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><PenTool size={16} /> Tools</div>
              <p className="text-[13px] text-gray-400 mt-2 leading-relaxed">
                VS Code, Git, GitHub, FastAPI, React Native, Expo, Postman
              </p>
            </div>

            {/* ROW 2 */}
            {/* Widget 5: Location Map Box */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><MapPin size={16} /> Location</div>
              <p className="text-[12px] text-gray-400">Ahmedabad, Gujarat</p>
              <div className="eh-map-img" />
            </div>

            {/* Widget 6: Alone Track Box */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><Music size={16} /> Alone</div>
              <div className="flex gap-3 items-center mb-2">
                <span className="text-[11px] text-gray-400 flex-1">Top listened track this month</span>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alone" className="w-12 h-12 rounded-lg object-cover" />
              </div>
              <p className="text-[11px] text-gray-500 italic mt-auto leading-tight">"This track captures the feeling of being completely immersed in your own world..."</p>
            </div>

            {/* Widget 7: GitHub Contributions (Span 2) */}
            <div className="eh-card col-2">
              <div className="eh-widget-title"><Github size={16} /> GitHub Contributions</div>
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
              <div className="flex justify-between text-[12px] text-white font-semibold mt-4 px-1">
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* Widget 8: Discord Small Card */}
            <div className="eh-card col-1 mob-half" style={{ background: '#11141a' }}>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-indigo-400 fill-current" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a74.37,74.37,0,0,0,6.72-11A68.6,68.6,0,0,1,28.21,79.9c.85-.63,1.69-1.29,2.5-2a75.47,75.47,0,0,0,72.71,0c.81.69,1.65,1.35,2.5,2a68.41,68.41,0,0,1-10.57,5.47,75.06,75.06,0,0,0,6.72,11,105.73,105.73,0,0,0,31-18.83C129.07,50.7,123.2,27.83,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/></svg>
                <span className="text-xs font-bold text-white">discord</span>
              </div>
              <p className="text-[11px] text-gray-400">@princep4423d</p>
              <p className="text-[10px] text-gray-500 mt-2 leading-tight">Actively engaging in developer communities on Discord.</p>
            </div>

            {/* MIDDLE ROW FULL-SPAN: Construction Strip */}
            <div className="col-4" style={{ gridColumn: '1 / -1' }}>
              <div className="eh-construction-bar">
                <Wrench size={16} /> Building StockWatcher V1.0
              </div>
            </div>

            {/* ROW 3 */}
            {/* Widget 9: Vertical Book Block */}
            <div className="eh-card col-1 mob-half" style={{ padding: 0 }}>
              <div className="flex h-full">
                <div className="text-[10px] font-bold text-gray-400 border-r border-white/10 pr-2 flex items-center justify-center text-center px-2 py-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', background: '#090d13' }}>
                  I love reading books <BookOpen size={11} className="inline ml-1" />
                </div>
                <div className="flex-1 flex items-center justify-center p-3 bg-black/40">
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Rich Dad Cover" className="eh-fit-img max-h-[110px] rounded shadow-md" />
                </div>
              </div>
            </div>

            {/* Widget 10: Skills Grid */}
            <div className="eh-card col-1">
              <div className="eh-widget-title"><Layers size={14} /> Skills</div>
              <div className="eh-tech-grid">
                {techIcons.slice(0, 8).map((skill, idx) => (
                  <div key={idx} className="eh-tech-icon-card" title={skill.name}>
                    <img src={skill.url} className={`eh-tech-img ${skill.invert ? 'invert-logo' : ''}`} alt={skill.name} />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 11: Comprehensive Social Dynamic Grid (Spans 2) */}
            <div className="eh-card col-2" style={{ padding: '14px', background: 'transparent', border: 'none' }}>
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
