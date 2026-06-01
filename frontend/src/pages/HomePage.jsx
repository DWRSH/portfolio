import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, MapPin, Music, Trophy, PenTool, Github, Linkedin, Facebook, Codepen, Rss, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE SENIOR ARCHITECT BENTO STYLES ──────────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --text-muted: rgba(255, 255, 255, 0.4);
    --glass-border: rgba(255, 255, 255, 0.06);
    --card-bg: #0d1117;
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 80px 24px;
    display: flex; flex-direction: column; align-items: center;
  }

  .eh-container { width: 100%; max-width: 1100px; position: relative; z-index: 10; }

  /* --- DARSH Typography --- */
  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(70px, 12vw, 150px);
    font-weight: 900; line-height: 0.8; letter-spacing: -0.05em; margin-bottom: 40px;
  }
  .eh-text-outline { color: transparent; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3); }

  /* --- Bento Grid Parent Container (No Border) --- */
  .eh-bento-wrapper {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 32px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .eh-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 18px;
    padding: 20px;
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.3s var(--easing-premium);
  }
  .eh-card:hover { border-color: var(--primary); transform: scale(1.01); }

  /* Grid Logic (Mobile & Desktop) */
  .eh-span-1 { grid-column: span 1; }
  .eh-span-2 { grid-column: span 2; }
  .eh-span-3 { grid-column: span 3; }
  .eh-span-4 { grid-column: span 4; }

  @media (max-width: 768px) {
    .eh-bento-wrapper { grid-template-columns: repeat(2, 1fr); padding: 10px; }
    .eh-span-1, .eh-span-2, .eh-span-3, .eh-span-4 { grid-column: span 2; }
    .eh-mobile-small { grid-column: span 1 !important; }
  }

  /* --- Marquee Skills Animation --- */
  .eh-marquee-container { display: flex; gap: 20px; width: 100%; overflow: hidden; position: relative; }
  .eh-marquee { display: flex; gap: 20px; animation: scrollLeft 20s linear infinite; white-space: nowrap; }
  .eh-marquee-reverse { animation: scrollRight 20s linear infinite; }
  
  @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

  .eh-skill-icon {
    width: 32px; height: 32px; filter: grayscale(1); transition: 0.3s;
  }
  .eh-skill-icon:hover { filter: grayscale(0); transform: scale(1.2); }

  /* --- Widget Elements --- */
  .eh-title { font-size: 14px; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 8px; margin-bottom: 12px; text-transform: uppercase; }
  .eh-img-full { width: 100%; height: 100%; object-fit: contain; }
  
  .eh-map-box { height: 100px; border-radius: 12px; filter: invert(90%) hue-rotate(180deg); }
  
  /* GitHub Calendar Tweaks to fit container */
  .github-wrap { transform: scale(0.95); transform-origin: left; width: 100%; }
  
  .eh-social-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .eh-social-item { background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px; height: 50px; display: flex; align-items: center; justify-content: center; color: white; transition: 0.3s; }
  .eh-social-item:hover { background: var(--primary); color: black; }
`;

export default function HomePage() {
  const skillIcons = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  ];

  return (
    <>
      <style>{eliteHomeStyles}</style>
      <div className="eh-wrapper">
        <div className="eh-container">
          
          <h1 className="eh-massive-text">
            <span className="eh-text-outline">DAR</span>SH
          </h1>

          {/* Compact Bento Grid */}
          <div className="eh-bento-wrapper">
            
            {/* 1. MERN Featured */}
            <div className="eh-card eh-span-2" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0d1117 100%)' }}>
              <div className="eh-title"><Layers size={14} /> Architecture</div>
              <h2 className="text-xl font-bold text-white mt-auto">Full-Stack<br/>MERN Ecosystem</h2>
            </div>

            {/* 2. Blog Snippet */}
            <div className="eh-card eh-span-1">
              <div className="eh-title">Insights</div>
              <p className="text-xs text-white font-semibold line-clamp-2">Is MERN Stack Dead in 2026?</p>
              <p className="text-[10px] text-gray-500 mt-2">A real story of a developer visiting 30+ software houses...</p>
            </div>

            {/* 3. Achievements */}
            <div className="eh-card eh-span-1">
              <div className="eh-title"><Trophy size={14} /> Wins</div>
              <ul className="text-[10px] text-gray-300 space-y-1">
                <li>• 12+ Production Apps</li>
                <li>• Deloitte Simulation</li>
              </ul>
            </div>

            {/* 4. GitHub (FULL WIDTH) */}
            <div className="eh-card eh-span-4">
              <div className="eh-title"><Github size={14} /> 365 Days of Code</div>
              <div className="github-wrap">
                <GitHubCalendar 
                  username="DWRSH" 
                  colorScheme="dark"
                  theme={{ dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] }}
                  blockSize={11}
                  blockMargin={4}
                  fontSize={10}
                />
              </div>
            </div>

            {/* 5. Location (Small) */}
            <div className="eh-card eh-span-1 eh-mobile-small">
              <div className="eh-title"><MapPin size={14} /> Base</div>
              <p className="text-xs text-white mb-2">Idar, India</p>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655!2d72.9329!3d23.8344" 
                className="eh-map-box" title="Map">
              </iframe>
            </div>

            {/* 6. Music (Small) */}
            <div className="eh-card eh-span-1 eh-mobile-small">
              <div className="eh-title"><Music size={14} /> Vibe</div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" 
                className="eh-img-full rounded-lg" alt="Alone" 
              />
            </div>

            {/* 7. Skills (Infinite Marquee) */}
            <div className="eh-card eh-span-2" style={{ justifyContent: 'center', gap: '10px' }}>
              <div className="eh-marquee">
                {[...skillIcons, ...skillIcons].map((url, i) => (
                  <img key={i} src={url} className="eh-skill-icon" alt="skill" />
                ))}
              </div>
              <div className="eh-marquee eh-marquee-reverse">
                {[...skillIcons, ...skillIcons].map((url, i) => (
                  <img key={i} src={url} className="eh-skill-icon" alt="skill" />
                ))}
              </div>
            </div>

            {/* 8. Reading */}
            <div className="eh-card eh-span-1 eh-mobile-small" style={{ padding: '10px' }}>
               <img 
                src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" 
                className="eh-img-full rounded-md" alt="Book" 
              />
            </div>

            {/* 9. Social Grid */}
            <div className="eh-card eh-span-3">
              <div className="eh-title">Network</div>
              <div className="eh-social-grid">
                <a href="#" className="eh-social-item"><Linkedin size={18}/></a>
                <a href="#" className="eh-social-item"><Github size={18}/></a>
                <a href="#" className="eh-social-item"><Codepen size={18}/></a>
                <a href="#" className="eh-social-item"><Facebook size={18}/></a>
                <a href="#" className="eh-social-item"><Rss size={18}/></a>
                <a href="#" className="eh-social-item"><Mail size={18}/></a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
