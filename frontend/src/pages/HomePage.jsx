import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, MapPin, Music, Trophy, PenTool, Github, Linkedin, Facebook, Codepen, Rss, BookOpen, Layers } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE MASTERPIECE BENTO GRID STYLES ────────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);
    --card-bg: #0d1117; 
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
    position: absolute; width: 80vw; height: 80vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.04) 0%, transparent 60%);
    top: -40%; right: -20%; filter: blur(100px);
  }
  .eh-noise {
    position: absolute; inset: 0; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }

  /* --- Animations --- */
  @keyframes revealUp { from { opacity: 0; transform: translateY(30px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
  @keyframes rotateBadge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  
  .reveal-1 { opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards; animation-delay: 0.1s; }
  .reveal-2 { opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards; animation-delay: 0.2s; }
  .reveal-3 { opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards; animation-delay: 0.3s; }
  .reveal-4 { opacity: 0; animation: revealUp 0.8s var(--easing-premium) forwards; animation-delay: 0.4s; }

  .eh-container { position: relative; z-index: 2; width: 100%; max-width: 1240px; display: flex; flex-direction: column; gap: 60px; }
  
  /* --- Massive Editorial Hero --- */
  .eh-hero-section { display: flex; flex-direction: column; position: relative; }
  
  .eh-status-pill {
    display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.05); color: var(--primary); font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px;
  }
  .eh-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); animation: blink 2s infinite; }
  @keyframes blink { 50% { opacity: 0.4; box-shadow: none; } }

  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(60px, 12vw, 160px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 24px 0;
  }
  .eh-text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4); transition: all 0.4s; }
  .eh-text-outline:hover { color: var(--text-main); -webkit-text-stroke: 1.5px transparent; text-shadow: 0 0 40px rgba(255,255,255,0.2); }

  .eh-hero-bottom { display: flex; flex-direction: column; gap: 32px; }
  @media (min-width: 768px) { .eh-hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }

  .eh-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--text-muted); max-width: 500px; margin: 0; }
  .eh-bio strong { color: #fff; font-weight: 500; }

  /* Buttons */
  .eh-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .eh-btn {
    display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px;
    border-radius: 100px; font-size: 14px; font-weight: 700; text-decoration: none;
    transition: all 0.3s;
  }
  .eh-btn-primary { background: var(--text-main); color: #000; border: 1px solid var(--text-main); }
  .eh-btn-primary:hover { background: var(--primary); border-color: var(--primary); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,210,180,0.2); }
  .eh-btn-secondary { background: var(--glass-bg); color: #fff; border: 1px solid var(--glass-border); backdrop-filter: blur(12px); }
  .eh-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }

  /* Rotating Badge */
  .eh-rotating-badge { position: absolute; top: 40px; right: 0; width: 140px; height: 140px; display: none; }
  @media (min-width: 1024px) { .eh-rotating-badge { display: block; } }
  .eh-badge-svg { animation: rotateBadge 12s linear infinite; width: 100%; height: 100%; }
  .eh-badge-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary); }

  /* --- TRUE RESPONSIVE BENTO GRID --- */
  .eh-bento-grid {
    display: grid; 
    grid-template-columns: repeat(2, 1fr); /* 2 Columns on Mobile */
    gap: 16px; 
    margin-top: 20px;
    grid-auto-flow: dense;
  }
  @media (min-width: 768px) { .eh-bento-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } }
  @media (min-width: 1024px) { .eh-bento-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; } }

  /* Grid Spans */
  .eh-col-1 { grid-column: span 1; }
  .eh-col-2 { grid-column: span 2; }
  .eh-col-3 { grid-column: span 2; } /* Defaults to span 2 on mobile */
  .eh-col-4 { grid-column: span 2; } 
  
  @media (min-width: 768px) {
    .md-col-1 { grid-column: span 1; }
    .md-col-2 { grid-column: span 2; }
    .md-col-3 { grid-column: span 3; }
  }
  @media (min-width: 1024px) {
    .lg-col-1 { grid-column: span 1; }
    .lg-col-2 { grid-column: span 2; }
    .lg-col-3 { grid-column: span 3; }
    .lg-col-4 { grid-column: span 4; }
  }

  /* Base Card Styling */
  .eh-bento-card {
    background: var(--card-bg); border: 1px solid var(--glass-border);
    border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
    transition: all 0.3s var(--easing-premium); display: flex; flex-direction: column;
  }
  .eh-bento-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

  /* Widget Specific Styles */
  .eh-widget-title { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 16px; }
  .eh-widget-title svg { color: var(--text-muted); }

  .eh-blog-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
  .eh-blog-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5; }
  
  .eh-list { margin: 0; padding-left: 20px; color: var(--text-muted); font-size: 14px; display: flex; flex-direction: column; gap: 8px; }

  /* Map Widget - Dark Mode Invert Trick */
  .eh-map-container { width: 100%; height: 120px; border-radius: 12px; overflow: hidden; margin-top: 12px; }
  .eh-map-iframe { width: 100%; height: 100%; border: 0; filter: invert(90%) hue-rotate(180deg) contrast(85%); pointer-events: none; }
  
  /* Skills Devicon Grid */
  .eh-skills-grid { display: flex; flex-wrap: wrap; gap: 12px; }
  .eh-skill-icon-wrap { 
    display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; 
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 12px; 
    transition: transform 0.2s;
  }
  .eh-skill-icon-wrap:hover { transform: scale(1.1); border-color: var(--primary); background: rgba(0,210,180,0.05); }
  .eh-skill-img { width: 24px; height: 24px; }
  .eh-skill-img.invert-icon { filter: invert(1); } /* For dark icons like Github */
  
  /* Social Grid */
  .eh-social-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; height: 100%; }
  @media (min-width: 768px) { .eh-social-grid { grid-template-columns: repeat(3, 1fr); } }
  .eh-social-item { display: flex; flex-direction: column; gap: 8px; padding: 16px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--glass-border); text-decoration: none; color: var(--text-main); transition: all 0.3s; }
  .eh-social-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
  .eh-social-name { font-weight: 700; font-size: 14px; }
  .eh-social-sub { font-size: 12px; color: var(--text-muted); line-height: 1.4; }

  /* GitHub Calendar Text Override */
  .react-activity-calendar { color: var(--text-muted) !important; font-family: 'Fira Code', monospace; font-size: 12px; }
`;

export default function HomePage() {
  
  // Real GitHub dark mode colors
  const eliteCalendarTheme = {
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  // Real Internet DevIcons Array
  const skills = [
    { name: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', invert: true },
    { name: '.NET', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
    { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'jQuery', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
    { name: 'Kotlin', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    { name: 'Linux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  ];

  return (
    <>
      <style>{eliteHomeStyles}</style>

      <section className="eh-wrapper">
        <div className="eh-ambient">
          <div className="eh-glow-1" />
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
                Specializing in the MERN stack & modern ecosystems to build robust, scalable solutions.
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

          {/* --- 20-YOE MOBILE RESPONSIVE BENTO GRID --- */}
          <div className="eh-bento-grid reveal-4">
            
            {/* Row 1 */}
            <div className="eh-bento-card eh-col-2 md-col-2 lg-col-2" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0a0e14 100%)', justifyContent: 'center', alignItems: 'center' }}>
               <h3 className="text-3xl font-bold text-white text-center leading-tight">Full-Stack<br/>MERN Stack</h3>
            </div>

            <div className="eh-bento-card eh-col-2 md-col-1 lg-col-1">
              <h3 className="eh-blog-title">Is MERN Stack Dead? A Fresher's Struggle...</h3>
              <p className="eh-blog-desc">A real and honest story of a fresher visiting 30+ software houses...</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: 'auto', fontWeight: '600' }}>
                <span>December 18, 2025</span>
                <span>6 min read</span>
              </div>
            </div>

            <div className="eh-bento-card eh-col-2 md-col-1 lg-col-1">
              <div className="eh-widget-title"><Trophy size={18} /> Achievements</div>
              <ul className="eh-list">
                <li>Completed 12+ Projects</li>
                <li>Built a MERN App</li>
              </ul>
            </div>

            {/* Row 2 - Small Widgets (These will sit side-by-side on mobile!) */}
            <div className="eh-bento-card eh-col-2 md-col-1 lg-col-1">
              <div className="eh-widget-title"><PenTool size={18} /> Tools</div>
              <p className="eh-blog-desc">VS Code, Git, GitHub, Postman, Vite, Android Studio</p>
            </div>

            <div className="eh-bento-card eh-col-1 md-col-1 lg-col-1">
              <div className="eh-widget-title"><MapPin size={18} /> Location</div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Idar, Gujarat</p>
              <div className="eh-map-container">
                {/* Real Live Map embedded with dark mode filter */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117070.7876807106!2d72.93291244335936!3d23.834469200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dbece3b6d2e6f%3A0xc54dfabfbfd538e4!2sIdar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1701323838276!5m2!1sen!2sin" 
                  className="eh-map-iframe" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map">
                </iframe>
              </div>
            </div>

            <div className="eh-bento-card eh-col-1 md-col-1 lg-col-1">
              <div className="eh-widget-title"><Music size={18} /> Alone</div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexDirection: 'column' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Top listened track this month</div>
                {/* Real Album Cover from Spotify/Wiki */}
                <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alan Walker Alone" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 'auto', lineHeight: '1.4' }}>
                "This track captures the feeling of being immersed in your own world..."
              </p>
            </div>

            {/* GitHub Contributions (Full Width on Mobile, Span 2 on Desktop) */}
            <div className="eh-bento-card eh-col-2 md-col-3 lg-col-2">
              <div className="eh-widget-title"><Github size={18} /> GitHub Contributions</div>
              <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
                <div style={{ minWidth: '550px' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '16px', color: '#fff', fontWeight: '600' }}>
                <span>Stars: 6</span>
                <span>Followers: 5</span>
                <span>Repos: 12</span>
              </div>
            </div>

            {/* Row 3 - Books, Skills, Social */}
            <div className="eh-bento-card eh-col-1 md-col-1 lg-col-1" style={{ padding: 0 }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '16px 8px', fontSize: '12px', fontWeight: '600', borderRight: '1px solid var(--glass-border)' }}>
                  I love reading books <BookOpen size={14} style={{ display: 'inline', marginLeft: '8px' }} />
                </div>
                <div style={{ flex: 1, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                  {/* Real Book Cover */}
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Rich Dad Poor Dad" style={{ maxWidth: '100%', maxHeight: '140px', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
                </div>
              </div>
            </div>

            {/* Real Skill Icons Grid */}
            <div className="eh-bento-card eh-col-2 md-col-2 lg-col-2">
              <div className="eh-widget-title"><Layers size={18} /> Skills</div>
              <div className="eh-skills-grid">
                {skills.map(skill => (
                  <div key={skill.name} className="eh-skill-icon-wrap" title={skill.name}>
                    <img src={skill.url} alt={skill.name} className={`eh-skill-img ${skill.invert ? 'invert-icon' : ''}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="eh-bento-card eh-col-2 md-col-3 lg-col-3" style={{ background: 'transparent', border: 'none', padding: 0 }}>
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
                <a href="#" className="eh-social-item eh-col-2" style={{ gridColumn: 'span 2' }}>
                  <Rss size={24} />
                  <div>
                    <div className="eh-social-name">Reddit</div>
                    <div className="eh-social-sub">DWRSH<br/>Join discussions and share insights on Reddit.</div>
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
