import React from 'react';
import { MapPin, Music, Trophy, PenTool, Github, Linkedin, Facebook, Codepen, BookOpen, Layers, Rss, Hammer, Wrench } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE EXACT IMAGE BENTO STYLES (CRASH-FREE) ───────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --card-bg: #0d1117; /* Exact GitHub dark card color from image */
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 80px 16px 80px;
    display: flex; flex-direction: column; align-items: center;
    overflow: hidden; position: relative;
  }

  /* Ambient Background Glow */
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
    transition: all 0.3s; margin-right: -2px; /* Pulls A closer */
  }
  .eh-massive-header:hover .eh-d-icon { stroke: var(--text-main); fill: var(--text-main); }

  /* --- Master Bento Wrapper (NO BORDER) --- */
  .eh-bento-master {
    background: rgba(255, 255, 255, 0.015);
    border-radius: 24px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    grid-auto-flow: dense;
  }

  /* --- Individual Cards --- */
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
  .eh-card:hover {
    border-color: rgba(255,255,255,0.2); transform: translateY(-2px);
  }

  /* Grid Spans - Desktop (4 Columns) */
  .col-1 { grid-column: span 1; }
  .col-2 { grid-column: span 2; }
  .col-3 { grid-column: span 3; }
  .col-4 { grid-column: span 4; }

  /* Grid Spans - Mobile (Force True 2-Column Bento) */
  @media (max-width: 768px) {
    .eh-bento-master { grid-template-columns: repeat(2, 1fr); padding: 8px; gap: 12px; }
    .eh-card { padding: 14px; }
    .col-1 { grid-column: span 2; } /* Default most to full width */
    .col-2, .col-3, .col-4 { grid-column: span 2; }
    /* Force specific small widgets to stay side-by-side on mobile */
    .mob-half { grid-column: span 1 !important; } 
  }

  /* --- Widget Specifics --- */
  .eh-widget-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px; }
  .eh-widget-title svg { color: var(--text-muted); }

  /* Map Override */
  .eh-map-img {
    width: 100%; height: 110px; border-radius: 8px; margin-top: auto;
    background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/512px-Google_Maps_Logo_2020.svg.png') center/cover;
    filter: grayscale(1) invert(0.9) contrast(1.2); opacity: 0.8;
  }

  /* Construction Bar */
  .eh-construction-bar {
    background: #000; border: 1px solid var(--glass-border); border-radius: 8px;
    padding: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;
    font-weight: 700; font-size: 16px; color: #fff; text-align: center;
  }

  /* Social/Mini Grid Layouts matching the image */
  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .eh-social-item {
    background: #000; border: 1px solid var(--glass-border); border-radius: 8px;
    padding: 12px; display: flex; flex-direction: column; gap: 8px; color: var(--text-main); text-decoration: none;
    transition: 0.2s;
  }
  .eh-social-item:hover { background: rgba(255,255,255,0.05); }
  .eh-social-name { font-weight: 700; font-size: 13px; }
  .eh-social-sub { font-size: 11px; color: var(--text-muted); line-height: 1.3; }

  /* GitHub Calendar - Strict Scaling */
  .eh-git-wrapper { width: 100%; display: flex; justify-content: center; overflow: hidden; padding: 4px 0; }
  .eh-git-scale { transform: scale(0.95); transform-origin: center; width: max-content; }
  @media (max-width: 768px) {
    .eh-git-wrapper { justify-content: flex-start; overflow-x: auto; }
    .eh-git-scale { transform: scale(1); padding-bottom: 8px; }
  }

  /* --- Infinite Marquee for Skills --- */
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
`;

export default function HomePage() {
  
  // Strict matching theme from the image
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

  return (
    <>
      <style>{eliteHomeStyles}</style>

      <div className="eh-wrapper">
        <div className="eh-ambient-glow" />

        <div className="eh-container">
          
          {/* Header incorporating the Custom 'D' Icon per User Correction Ledger */}
          <div className="eh-massive-header">
            <svg viewBox="0 0 100 100" className="eh-d-icon">
              {/* Custom structural D to match the outline style */}
              <path d="M20 10 L50 10 C 80 10, 90 30, 90 50 C 90 70, 80 90, 50 90 L 20 90 Z" />
              <line x1="20" y1="10" x2="20" y2="90" />
            </svg>
            <h1 className="eh-massive-text">
              ARSH
            </h1>
          </div>

          <div className="eh-bento-master">
            
            {/* ROW 1 */}
            {/* 1. Full-Stack / Mean vs Mern Image Replica */}
            <div className="eh-card col-1" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)', padding: '16px' }}>
              <div className="flex justify-between text-xs font-bold text-white mb-4">
                <span>Full-Stack</span>
                <span>MERN Stack</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                {/* Visual representation of the Venn Diagram in the image */}
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

            {/* 2. Blog Snippet */}
            <div className="eh-card col-1">
              <h3 className="text-[17px] font-bold text-white mb-2 leading-tight">Is MERN Stack Dead? A Fresher's Struggle...</h3>
              <p className="text-[13px] text-gray-400 mb-4 line-clamp-3">A real and honest story of a fresher visiting 30+ software houses to understand the actual market demand.</p>
              <div className="flex justify-between text-[11px] text-gray-500 mt-auto font-semibold">
                <span>December 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            {/* 3. Achievements (Using Real Data) */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><Trophy size={16} /> Achievements</div>
              <ul className="text-[12px] text-gray-400 space-y-2 mt-2 leading-tight">
                <li>• Deloitte Cyber Security Simulation Completed</li>
                <li>• Authored AFS-CNN Research Paper</li>
                <li>• B.Sc. CA & IT Graduate</li>
              </ul>
            </div>

            {/* 4. Tools (Using Real Data) */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><PenTool size={16} /> Tools</div>
              <p className="text-[13px] text-gray-400 mt-2 leading-relaxed">
                VS Code, Git, GitHub, FastAPI, React Native, Expo, Postman
              </p>
            </div>

            {/* ROW 2 */}
            {/* 5. Location */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><MapPin size={16} /> Location</div>
              <p className="text-[12px] text-gray-400">Ahmedabad, Gujarat</p>
              <div className="eh-map-img" />
            </div>

            {/* 6. Music: Alone */}
            <div className="eh-card col-1 mob-half">
              <div className="eh-widget-title"><Music size={16} /> Alone</div>
              <div className="flex gap-3 items-start mb-2">
                <p className="text-[11px] text-gray-400 flex-1">Top listened track this month</p>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alone" className="w-16 h-16 rounded-md object-cover" />
              </div>
              <p className="text-[11px] text-gray-500 italic mt-auto leading-tight">"This track captures the feeling of being completely immersed in your own world..."</p>
            </div>

            {/* 7. GitHub Contributions (Col Span 2) */}
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
              <div className="flex justify-between text-[12px] text-white font-semibold mt-4 px-2">
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* ROW 3 */}
            {/* 8. Book Box */}
            <div className="eh-card col-1 mob-half" style={{ padding: 0 }}>
              <div className="flex h-full">
                <div className="text-[10px] font-semibold text-gray-300 border-r border-white/10 pr-2 flex items-center justify-center text-center px-2 py-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', background: '#111' }}>
                  I love reading books <BookOpen size={12} className="inline ml-1" />
                </div>
                <div className="flex-1 flex items-center justify-center p-3" style={{ background: '#222' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Rich Dad" className="w-full h-full max-h-[120px] object-contain rounded" />
                </div>
              </div>
            </div>

            {/* 9. Skills Grid (Marquee added as requested) */}
            <div className="eh-card col-1">
              <div className="eh-widget-title"><Layers size={16} /> Skills</div>
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

            {/* 10. Under Construction / Real Project Bar & Socials (Col Span 2) */}
            <div className="col-2 flex flex-col gap-4">
              
              {/* Construction Bar replaced with Real Current Focus */}
              <div className="eh-construction-bar">
                <Wrench size={18} /> Building StockWatcher V1.0
              </div>

              {/* Social Grid matching the image perfectly */}
              <div className="eh-social-grid" style={{ flex: 1 }}>
                
                <a href="#" className="eh-social-item">
                  <Codepen size={20} className="mb-1 text-white" />
                  <div>
                    <div className="eh-social-name">CodePen</div>
                    <div className="eh-social-sub">View my front-end...</div>
                  </div>
                </a>
                
                <a href="#" className="eh-social-item">
                  <Facebook size={20} className="mb-1 text-white" />
                  <div>
                    <div className="eh-social-name">Facebook</div>
                    <div className="eh-social-sub">Connect and follow...</div>
                  </div>
                </a>

                <a href="https://github.com/DWRSH" target="_blank" rel="noreferrer" className="eh-social-item">
                  <Github size={20} className="mb-1 text-white" />
                  <div>
                    <div className="eh-social-name">GitHub</div>
                    <div className="eh-social-sub">My GitHub profile...</div>
                  </div>
                </a>

                <a href="linkedin.com/in/darshprajapati15" target="_blank" rel="noreferrer" className="eh-social-item">
                  <Linkedin size={20} className="mb-1 text-white" />
                  <div>
                    <div className="eh-social-name">LinkedIn</div>
                    <div className="eh-social-sub">Connect with me...</div>
                  </div>
                </a>

                <a href="#" className="eh-social-item" style={{ gridColumn: 'span 2', flexDirection: 'row', alignItems: 'center' }}>
                  <Rss size={24} className="mr-2 text-white" />
                  <div>
                    <div className="eh-social-name">Reddit</div>
                    <div className="eh-social-sub">DWRSH <br/> Join discussions and share insights on Reddit communities</div>
                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
