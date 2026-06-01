import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Music, Trophy, PenTool, Github, Rss, Linkedin, Facebook, Codepen, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── FULL BENTO GRID STYLES (NO SHORTCUTS) ─────────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
    --glass-border: rgba(255, 255, 255, 0.08);
    --card-bg: #0d1117;
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 100px 24px 80px;
    display: flex; flex-direction: column; align-items: center;
    overflow: hidden; position: relative;
  }

  /* Ambient Background Glow */
  .eh-ambient-glow {
    position: absolute; width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.05) 0%, transparent 60%);
    top: -200px; right: -200px; pointer-events: none; z-index: 0;
  }

  .eh-container {
    width: 100%; max-width: 1100px; position: relative; z-index: 10;
  }

  /* --- DARSH Typography --- */
  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(60px, 12vw, 140px);
    font-weight: 900; line-height: 0.9; letter-spacing: -0.04em; margin-bottom: 40px;
  }
  .eh-text-outline {
    color: transparent; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
    transition: all 0.3s;
  }
  .eh-text-outline:hover { color: var(--text-main); -webkit-text-stroke: 2px transparent; }

  /* --- Master Bento Wrapper (No Border) --- */
  .eh-bento-master {
    background: rgba(255, 255, 255, 0.02); /* Subtle background to group them */
    border-radius: 32px;
    padding: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    grid-auto-flow: dense;
  }

  /* --- Individual Cards --- */
  .eh-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .eh-card:hover {
    border-color: rgba(255,255,255,0.2); transform: translateY(-4px);
  }

  /* Grid Spans - Desktop */
  .col-span-1 { grid-column: span 1; }
  .col-span-2 { grid-column: span 2; }
  .col-span-3 { grid-column: span 3; }
  .col-span-4 { grid-column: span 4; }

  /* Grid Spans - Mobile (Ensuring Bento layout stays, not just 1 column) */
  @media (max-width: 768px) {
    .eh-bento-master { grid-template-columns: repeat(2, 1fr); padding: 12px; gap: 12px; }
    .eh-card { padding: 16px; }
    /* Force specific mobile spans */
    .col-span-1 { grid-column: span 1; }
    .col-span-2 { grid-column: span 2; }
    .col-span-3 { grid-column: span 2; }
    .col-span-4 { grid-column: span 2; }
    .mob-span-2 { grid-column: span 2; } /* Useful to force full width on mobile */
  }

  /* --- Widget Specifics --- */
  .eh-widget-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 16px; }
  .eh-widget-title svg { color: var(--primary); }

  /* MERN Graphic Background */
  .eh-mern-bg {
    background: linear-gradient(135deg, #1e3a8a 0%, #0d1117 100%);
    justify-content: center; align-items: center; text-align: center;
  }

  /* Images */
  .eh-img-contain { width: 100%; height: 100%; object-fit: contain; }
  .eh-img-cover { width: 100%; height: 100px; object-fit: cover; border-radius: 12px; margin-top: 12px; opacity: 0.7; }

  /* Map Override */
  .eh-map-img {
    width: 100%; height: 100px; border-radius: 12px; margin-top: auto;
    background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/512px-Google_Maps_Logo_2020.svg.png') center/cover;
    filter: grayscale(1) invert(1) contrast(0.8); opacity: 0.6;
  }

  /* Social Grid */
  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; height: 100%; }
  .eh-social-item {
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px;
    padding: 16px; display: flex; flex-direction: column; gap: 8px; color: var(--text-main); text-decoration: none;
    transition: 0.3s;
  }
  .eh-social-item:hover { background: rgba(255,255,255,0.1); border-color: var(--primary); }
  .eh-social-name { font-weight: 700; font-size: 13px; }
  .eh-social-sub { font-size: 11px; color: var(--text-muted); line-height: 1.4; }

  /* GitHub Calendar - Scaling to fit 100% perfectly */
  .eh-git-wrapper {
    width: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center;
  }
  .eh-git-scale {
    transform: scale(0.9); transform-origin: center; width: max-content;
  }
  @media (max-width: 768px) {
    .eh-git-wrapper { overflow-x: auto; justify-content: flex-start; }
    .eh-git-scale { transform: scale(1); padding-bottom: 8px; }
  }
  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 12px; }

  /* --- Infinite Marquee for Skills --- */
  .eh-marquee-wrapper {
    display: flex; flex-direction: column; gap: 16px; overflow: hidden; width: 100%; position: relative;
    -webkit-mask-image: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
  }
  .eh-marquee-track {
    display: flex; gap: 24px; width: max-content;
  }
  .eh-marquee-left { animation: scrollLeft 25s linear infinite; }
  .eh-marquee-right { animation: scrollRight 25s linear infinite; }
  
  @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

  .eh-skill-icon {
    width: 40px; height: 40px; padding: 8px; background: rgba(255,255,255,0.05);
    border-radius: 12px; border: 1px solid var(--glass-border); transition: 0.3s;
  }
  .eh-skill-icon:hover { transform: scale(1.1); border-color: var(--primary); background: rgba(0,210,180,0.1); }
  .icon-invert { filter: invert(1); } /* For dark icons like Github/Nextjs */
`;

export default function HomePage() {
  
  const eliteCalendarTheme = {
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

      <div className="eh-wrapper">
        <div className="eh-ambient-glow" />

        <div className="eh-container">
          
          {/* Exact Text as requested */}
          <h1 className="eh-massive-text">
            <span className="eh-text-outline">DARSH</span>
          </h1>

          {/* Master Box wrapping the entire grid without its own border */}
          <div className="eh-bento-master">
            
            {/* ROW 1 */}
            {/* 1. Full Stack MERN */}
            <div className="eh-card col-span-2 eh-mern-bg mob-span-2">
              <h2 className="text-3xl font-bold text-white mb-2">Full-Stack</h2>
              <p className="text-lg text-teal-400 font-semibold tracking-widest uppercase">MERN Architecture</p>
            </div>

            {/* 2. Blog Snippet */}
            <div className="eh-card col-span-1">
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">Is MERN Stack Dead? A Fresher's Struggle...</h3>
              <p className="text-sm text-gray-400 mb-4">A real and honest story of a fresher visiting 30+ software...</p>
              <div className="flex justify-between text-[11px] text-gray-500 mt-auto font-semibold">
                <span>Dec 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            {/* 3. Achievements */}
            <div className="eh-card col-span-1">
              <div className="eh-widget-title"><Trophy size={16} /> Achievements</div>
              <ul className="text-sm text-gray-400 space-y-2 mt-2">
                <li>• Completed 15+ Projects</li>
                <li>• Built StockWatcher App</li>
                <li>• Deloitte Simulation</li>
              </ul>
            </div>

            {/* ROW 2 */}
            {/* 4. Location */}
            <div className="eh-card col-span-1">
              <div className="eh-widget-title"><MapPin size={16} /> Location</div>
              <p className="text-sm text-gray-400">Idar, Gujarat, India</p>
              <div className="eh-map-img" />
            </div>

            {/* 5. Music: Alone */}
            <div className="eh-card col-span-1">
              <div className="eh-widget-title"><Music size={16} /> Alone</div>
              <div className="flex gap-4 items-start mb-4">
                <p className="text-xs text-gray-400 flex-1">Top listened track this month</p>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alan Walker Alone" className="w-16 h-16 rounded-lg object-cover" />
              </div>
              <p className="text-[11px] text-gray-500 italic mt-auto">"This track captures the feeling of being completely immersed..."</p>
            </div>

            {/* 6. GitHub Contributions (Fully Visible & Scaled) */}
            <div className="eh-card col-span-2 mob-span-2">
              <div className="eh-widget-title"><Github size={16} /> GitHub Contributions</div>
              <div className="eh-git-wrapper">
                <div className="eh-git-scale">
                  <GitHubCalendar 
                    username="princep4423d" 
                    colorScheme="dark"
                    theme={eliteCalendarTheme}
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    hideTotalCount={true}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-white font-semibold mt-4 px-2">
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* ROW 3 */}
            {/* 7. Book */}
            <div className="eh-card col-span-1" style={{ padding: '16px' }}>
              <div className="flex h-full">
                <div className="writing-vertical text-xs font-semibold text-gray-400 border-r border-white/10 pr-2 flex items-center justify-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  I love reading books <BookOpen size={12} className="inline ml-2" />
                </div>
                <div className="flex-1 flex items-center justify-center pl-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Rich Dad Poor Dad" className="eh-img-contain max-h-[140px] rounded" />
                </div>
              </div>
            </div>

            {/* 8. Marquee Skills */}
            <div className="eh-card col-span-1">
              <div className="eh-widget-title"><Layers size={16} /> Skills</div>
              <div className="eh-marquee-wrapper mt-auto mb-auto">
                {/* Track 1 (Left) */}
                <div className="eh-marquee-track eh-marquee-left">
                  {[...skillIconsRow1, ...skillIconsRow1].map((url, i) => (
                    <img key={`r1-${i}`} src={url} alt="Skill" className="eh-skill-icon" />
                  ))}
                </div>
                {/* Track 2 (Right) */}
                <div className="eh-marquee-track eh-marquee-right">
                  {[...skillIconsRow2, ...skillIconsRow2].map((url, i) => (
                    <img key={`r2-${i}`} src={url} alt="Skill" className={`eh-skill-icon ${url.includes('github') ? 'icon-invert' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* 9. Social Links & Tools (Combined to match layout) */}
            <div className="eh-card col-span-2 mob-span-2" style={{ padding: '16px' }}>
              <div className="eh-social-grid">
                
                <a href="https://github.com/princep4423d" target="_blank" rel="noreferrer" className="eh-social-item">
                  <Github size={20} className="mb-2" />
                  <div>
                    <div className="eh-social-name">GitHub</div>
                    <div className="eh-social-sub line-clamp-1">View repositories</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/darshprajapati15" target="_blank" rel="noreferrer" className="eh-social-item">
                  <Linkedin size={20} className="mb-2 text-[#0077b5]" />
                  <div>
                    <div className="eh-social-name">LinkedIn</div>
                    <div className="eh-social-sub line-clamp-1">Professional network</div>
                  </div>
                </a>
                
                <div className="eh-social-item">
                  <PenTool size={20} className="mb-2 text-teal-400" />
                  <div>
                    <div className="eh-social-name">Tools</div>
                    <div className="eh-social-sub line-clamp-1">VS Code, Git, Vite</div>
                  </div>
                </div>

                <a href="#" className="eh-social-item">
                  <Codepen size={20} className="mb-2" />
                  <div>
                    <div className="eh-social-name">CodePen</div>
                    <div className="eh-social-sub line-clamp-1">Frontend UI</div>
                  </div>
                </a>

                <a href="#" className="eh-social-item col-span-2" style={{ gridColumn: 'span 2' }}>
                  <Rss size={20} className="mb-2 text-[#ff4500]" />
                  <div>
                    <div className="eh-social-name">Reddit</div>
                    <div className="eh-social-sub line-clamp-1">DWRSH - Join discussions and share insights</div>
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
