import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, MapPin, Music, Trophy, PenTool, Github, Linkedin, Facebook, Codepen, Rss, BookOpen, Layers, Terminal, Code2 } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* ─── 20-YOE SENIOR ARCHITECT BENTO ENGINE STYLES ────────────────────────── */
const eliteHomeStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --glass-border: rgba(255, 255, 255, 0.08);
    --card-bg: #0d1117;
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eh-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center;
    position: relative; overflow-x: hidden; color: #fff;
    padding: 80px 20px;
  }

  /* --- Ambient Background --- */
  .eh-glow {
    position: absolute; width: 60vw; height: 60vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.03) 0%, transparent 70%);
    top: -10%; right: -5%; z-index: 0; pointer-events: none;
  }

  .eh-container { position: relative; z-index: 2; width: 100%; max-width: 1100px; }

  /* --- Massive Header --- */
  .eh-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(50px, 10vw, 120px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.05em; margin-bottom: 40px;
    text-align: left; color: #fff;
  }

  /* --- THE MASTER BENTO BOX --- */
  .eh-bento-master-container {
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid var(--glass-border);
    border-radius: 32px;
    padding: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  }

  .eh-bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    grid-auto-flow: dense;
  }
  @media (min-width: 768px) { .eh-bento-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
  @media (min-width: 1024px) { .eh-bento-grid { grid-template-columns: repeat(4, 1fr); } }

  /* Card Base */
  .eh-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 18px;
    padding: 16px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s var(--easing);
    display: flex; flex-direction: column;
  }
  .eh-card:hover { border-color: var(--primary); transform: translateY(-2px); }

  /* Spans */
  .col-2 { grid-column: span 2; }
  .col-4 { grid-column: span 2; }
  @media (min-width: 1024px) { .col-4 { grid-column: span 4; } }

  /* Widget Titles */
  .eh-label { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }

  /* --- SKILLS MARQUEE ANIMATION --- */
  .eh-marquee-container {
    width: 100%; overflow: hidden;
    white-space: nowrap; position: relative;
    padding: 10px 0;
  }
  .eh-marquee-content {
    display: inline-flex;
    gap: 20px;
    animation: marquee 20s linear infinite;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .eh-skill-icon {
    width: 32px; height: 32px; filter: grayscale(1); transition: 0.3s;
  }
  .eh-skill-icon:hover { filter: grayscale(0) scale(1.2); }

  /* --- Image Rendering --- */
  .eh-img-100 { width: 100%; height: 100%; object-fit: contain; }
  
  /* --- Map Styling --- */
  .eh-map { width: 100%; height: 100px; border-radius: 12px; filter: invert(90%) hue-rotate(180deg) brightness(0.6); margin-top: 10px; }

  /* --- Social Links --- */
  .eh-social-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: auto; }
  .eh-social-link { 
    display: flex; align-items: center; justify-content: center; height: 40px;
    background: rgba(255,255,255,0.03); border-radius: 10px; border: 1px solid var(--glass-border);
    transition: 0.3s;
  }
  .eh-social-link:hover { background: var(--primary); color: #000; border-color: var(--primary); }

  /* CV Button */
  .eh-cv-btn {
    background: #fff; color: #000; padding: 10px 20px; border-radius: 100px;
    font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; gap: 8px;
    margin-top: 15px; transition: 0.3s;
  }
  .eh-cv-btn:hover { background: var(--primary); transform: scale(1.05); }
`;

export default function HomePage() {
  const skills = [
    'react', 'nodejs', 'mongodb', 'python', 'docker', 'kotlin', 'java', 'html5', 'css3', 'javascript', 'git', 'linux'
  ];

  return (
    <>
      <style>{eliteHomeStyles}</style>
      
      <div className="eh-wrapper">
        <div className="eh-glow" />
        
        <div className="eh-container">
          {/* Header Section */}
          <header className="reveal-1">
            <h1 className="eh-massive-text">DARSH</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
              <p style={{ maxWidth: '400px', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                Senior Full-Stack Engineer specializing in <span style={{color: '#fff'}}>MERN Ecosystem</span>. 
                Architecting scalable systems with precision and performance.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="/resume.pdf" className="eh-cv-btn">Download CV <Download size={14}/></a>
                <Link to="/projects" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: '600' }}>
                   Works <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          </header>

          {/* THE MASTER BENTO BOX */}
          <div className="eh-bento-master-container reveal-2">
            <div className="eh-bento-grid">
              
              {/* Stack Card */}
              <div className="eh-card col-2" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #000 100%)' }}>
                <div className="eh-label" style={{color: '#60a5fa'}}><Code2 size={14}/> Core_Architecture</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800' }}>MERN STACK <br/> SPECIALIST</h3>
                <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>Scalable Web & Mobile Solutions</p>
              </div>

              {/* Blog Card */}
              <div className="eh-card">
                <div className="eh-label"><Rss size={14}/> Latest_Insight</div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1.3' }}>Is MERN Stack Dead?</h4>
                <p style={{ fontSize: '11px', opacity: 0.5, marginTop: '5px' }}>The truth about fresher struggle in 2025...</p>
              </div>

              {/* Achievements */}
              <div className="eh-card">
                <div className="eh-label"><Trophy size={14}/> Milestones</div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>15+ Production Apps</div>
                <div style={{ fontSize: '11px', opacity: 0.5 }}>End-to-End Deployment</div>
              </div>

              {/* Location Card */}
              <div className="eh-card">
                <div className="eh-label"><MapPin size={14}/> Base</div>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Gujarat, India</span>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117070!2d72.93!3d23.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dbece3b6d2e6f%3A0xc54dfabfbfd538e4!2sIdar!5e0!3m2!1sen!2sin!4v1" 
                  className="eh-map" title="map" />
              </div>

              {/* Music Card */}
              <div className="eh-card">
                <div className="eh-label"><Music size={14}/> Heavy_Rotation</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png" alt="Alone" style={{ width: '45px', height: '45px', borderRadius: '8px' }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700' }}>Alone</div>
                    <div style={{ fontSize: '10px', opacity: 0.5 }}>Alan Walker</div>
                  </div>
                </div>
              </div>

              {/* Tools Card */}
              <div className="eh-card">
                <div className="eh-label"><PenTool size={14}/> Toolkit</div>
                <div style={{ fontSize: '12px', opacity: 0.8, lineHeight: '1.5' }}>VS Code • Android Studio • Docker • Git</div>
              </div>

              {/* Books Card */}
              <div className="eh-card" style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center' }}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '10px', fontWeight: '800', opacity: 0.3 }}>READING</div>
                <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg" alt="Book" style={{ height: '70px', borderRadius: '4px' }} />
                <div style={{ fontSize: '11px', fontWeight: '700' }}>Rich Dad <br/> Poor Dad</div>
              </div>

              {/* GitHub Calendar Card - FULL WIDTH */}
              <div className="eh-card col-4">
                <div className="eh-label"><Github size={14}/> Git_Activity_Pulse</div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '10px 0' }}>
                  <GitHubCalendar 
                    username="DWRSH" 
                    colorScheme="dark"
                    blockSize={11}
                    blockMargin={4}
                    fontSize={12}
                    theme={{ dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] }}
                  />
                </div>
              </div>

              {/* SKILLS MARQUEE - FULL WIDTH */}
              <div className="eh-card col-2">
                <div className="eh-label"><Layers size={14}/> Technical_Arsenal</div>
                <div className="eh-marquee-container">
                  <div className="eh-marquee-content">
                    {/* Double the list for seamless looping */}
                    {[...skills, ...skills].map((s, i) => (
                      <img key={i} src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s}/${s}-original.svg`} className="eh-skill-icon" alt={s} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="eh-card col-2">
                <div className="eh-label"><Sparkles size={14}/> Digital_Presence</div>
                <div className="eh-social-row">
                  <a href="https://github.com/DWRSH" className="eh-social-link"><Github size={18}/></a>
                  <a href="https://linkedin.com/in/darshprajapati15" className="eh-social-link"><Linkedin size={18}/></a>
                  <a href="#" className="eh-social-link"><Codepen size={18}/></a>
                  <a href="#" className="eh-social-link"><Facebook size={18}/></a>
                  <a href="#" className="eh-social-link"><Rss size={18}/></a>
                  <a href="mailto:hello@darsh.dev" className="eh-social-link"><Terminal size={18}/></a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
