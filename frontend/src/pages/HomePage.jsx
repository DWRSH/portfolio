import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Sparkles, MapPin, Trophy,
  Github, Layers, Wrench, BookOpen, ExternalLink, Headphones, Mail, Code2
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   STYLES (Perfect Grid Packing + OG Music Player - NO NAVBAR)
───────────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Fira+Code:wght@400;500&display=swap');

*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #04060a;
  --surf:      #0b0f18;
  --surf2:     #111620;
  --border:    rgba(255,255,255,0.07);
  --border-h:  rgba(255,255,255,0.14);
  --teal:      #00d4b4;
  --teal-dim:  rgba(0,212,180,0.10);
  --teal-glow: rgba(0,212,180,0.22);
  --violet:    #7c6ff7;
  --text:      #ffffff;
  --muted:     rgba(255,255,255,0.40);
  --muted2:    rgba(255,255,255,0.22);
  --ease:      cubic-bezier(0.16,1,0.3,1);
  --r:         18px;
  --rsm:       12px;
}

.hp {
  background: var(--bg);
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* Ambient Glows */
.hp-ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.hp-g1 { position: absolute; width: 900px; height: 900px; border-radius: 50%; background: radial-gradient(circle, rgba(0,212,180,0.055) 0%, transparent 65%); top: -350px; right: -250px; animation: floatA 18s ease-in-out infinite; }
.hp-g2 { position: absolute; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(124,111,247,0.05) 0%, transparent 65%); bottom: -250px; left: -200px; animation: floatA 22s ease-in-out infinite reverse; }
@keyframes floatA { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-28px,38px); } }

/* Page Body */
.hp-body { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 100px 24px 64px; display: flex; flex-direction: column; gap: 56px; }
@media(max-width: 640px) { .hp-body { padding: 80px 16px 48px; gap: 40px; } }

/* ── Hero Section ── */
.hero { display: flex; flex-direction: column; gap: 0; position: relative; }
.hero-pill { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; padding: 7px 16px; border-radius: 100px; border: 1px solid rgba(0,212,180,0.3); background: rgba(0,212,180,0.06); color: var(--teal); font-size: 11.5px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; margin-bottom: 28px; backdrop-filter: blur(8px); }
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 9px var(--teal); animation: blink 2.2s ease-in-out infinite; }
@keyframes blink { 50% { opacity: .35; box-shadow: none; } }

/* Original Hero Text */
.hero-name { font-family: 'Syne', sans-serif; font-size: clamp(60px, 12vw, 168px); font-weight: 800; line-height: .88; letter-spacing: -.04em; margin-bottom: 32px; display: flex; flex-direction: column; }
.hero-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.18); transition: all .5s var(--ease); cursor: default; }
.hero-outline:hover { color: var(--teal); -webkit-text-stroke: 1.5px transparent; text-shadow: 0 0 80px rgba(0,212,180,.28); }

.hero-bottom { display: flex; flex-direction: column; gap: 28px; }
@media(min-width: 768px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 17px; font-weight: 300; line-height: 1.65; color: var(--muted); max-width: 460px; }
.hero-bio strong { color: #fff; font-weight: 500; }

.hero-btns { display: flex; gap: 14px; flex-wrap: wrap; flex-shrink: 0; }
.hbtn { position: relative; display: inline-flex; align-items: center; gap: 9px; padding: 14px 28px; border-radius: 100px; font-size: 14.5px; font-weight: 600; text-decoration: none; overflow: hidden; z-index: 1; transition: transform .35s var(--ease), box-shadow .35s var(--ease); }
.hbtn::before { content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%; border-radius: 100px; transition: transform .5s var(--ease); z-index: -1; }
.hbtn:hover { transform: translateY(-3px); }
.hbtn-primary { background: var(--teal); color: #04060a; border: 1px solid var(--teal); }
.hbtn-primary::before { background: #fff; }
.hbtn-primary:hover { box-shadow: 0 12px 32px rgba(0,212,180,.22); }
.hbtn-primary:hover::before { transform: translateY(-100%); }
.hbtn-sec { background: rgba(255,255,255,.03); color: #fff; border: 1px solid var(--border); backdrop-filter: blur(10px); }
.hbtn-sec::before { background: rgba(255,255,255,.07); }
.hbtn-sec:hover { border-color: rgba(255,255,255,.18); }
.hbtn-sec:hover::before { transform: translateY(-100%); }

/* ── BENTO GRID (Dense Packing) ── */
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense; 
  gap: clamp(12px, 2vw, 16px);
  width: 100%;
}

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { .bento { grid-template-columns: 1fr; } .c4, .c3, .c2, .c1 { grid-column: span 1; } }

.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; }

/* Base Card */
.card {
  background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: clamp(16px, 3vw, 22px); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 14px; transition: border-color .3s, transform .35s var(--ease), box-shadow .35s var(--ease);
}
.card:hover { border-color: var(--border-h); transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,0,0,.5); }

.lbl { display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); z-index: 2; }
.lbl svg { color: var(--muted2); flex-shrink: 0; }

/* ── OG Interactive Music Player ── */
.music-player-wrap {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex: 1; position: relative; gap: 16px; cursor: pointer;
}
.vinyl-container { position: relative; width: 90px; height: 90px; }
.vinyl-record {
  width: 100%; height: 100%; border-radius: 50%;
  background: radial-gradient(circle, #000 30%, #1a1a1a 40%, #000 50%, #1a1a1a 60%, #000 70%, #1a1a1a 80%, #000 90%);
  border: 3px solid #333; box-shadow: 0 10px 20px rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s var(--ease);
}
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 34%; height: 34%; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--violet)); border: 2px solid #111; display: flex; align-items: center; justify-content: center; }
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; }
.tonearm {
  position: absolute; top: -10px; right: -15px; width: 35px; height: 60px;
  transform-origin: top right; transform: rotate(-35deg); transition: transform 0.4s var(--ease); filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5));
}
.tonearm.playing { transform: rotate(10deg); }
.music-info { text-align: center; z-index: 2; }
.music-song { font-family: 'Syne', sans-serif; font-weight: 700; color: #fff; font-size: 15px; margin-bottom: 2px; }
.music-artist { font-size: 11px; color: var(--muted); }
.hover-hint { font-size: 9px; text-transform: uppercase; letter-spacing: .1em; color: var(--teal); opacity: 0.7; margin-top: 8px; animation: pulseHint 2s infinite alternate; }
@keyframes pulseHint { from { opacity: 0.3; } to { opacity: 1; } }

/* Other Components */
.venn-wrap { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 148px; position: relative; }
.venn-c { width: 108px; height: 108px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; position: absolute; }
.va { background: rgba(124,111,247,.13); border: 1.5px solid rgba(124,111,247,.35); left: calc(50% - 76px); }
.vb { background: rgba(0,212,180,.09); border: 1.5px solid rgba(0,212,180,.3); left: calc(50% - 32px); }
.vtag { font-family: 'Syne', sans-serif; font-size: 11.5px; font-weight: 800; letter-spacing: .04em; }
.vcenter { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); font-size: 9px; font-weight: 700; color: #fff; text-align: center; background: rgba(0,0,0,.6); padding: 5px 9px; border-radius: 7px; backdrop-filter: blur(8px); white-space: nowrap; z-index: 2; font-family: 'Fira Code', monospace; }

.stats-row { display: flex; flex: 1; border-radius: var(--r); overflow: hidden; }
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 8px; text-align: center; border-right: 1px solid var(--border); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 800; color: #fff; line-height: 1; }
.stat-num span { color: var(--teal); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: .07em; }

.blog-title { font-family: 'Syne', sans-serif; font-size: 15.5px; font-weight: 700; line-height: 1.4; color: #fff; }
.blog-desc { font-size: 12.5px; line-height: 1.6; color: var(--muted); }
.blog-meta { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.read-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: var(--teal); background: var(--teal-dim); border: 1px solid rgba(0,212,180,.2); padding: 4px 11px; border-radius: 100px; text-decoration: none; transition: background .2s, border-color .2s; }
.read-pill:hover { background: rgba(0,212,180,.18); border-color: rgba(0,212,180,.4); }

.map-wrap { flex: 1; border-radius: var(--rsm); overflow: hidden; min-height: 160px; position: relative; }
.map-wrap iframe { width: 100%; height: 100%; border: 0; pointer-events: none; position: absolute; inset: 0; filter: invert(90%) hue-rotate(180deg) saturate(1.5) contrast(.8); }

.tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 10px; }
.ticon { background: var(--surf2); border: 1px solid var(--border); border-radius: 10px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; transition: border-color .25s, transform .25s var(--ease); }
.ticon:hover { border-color: var(--teal); transform: translateY(-3px); }
.ticon img { width: 22px; height: 22px; object-fit: contain; }
.inv { filter: invert(1) brightness(.8); }

.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; flex: 1; }
.soc-item { background: var(--surf2); border: 1px solid var(--border); border-radius: var(--rsm); padding: 14px; display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: inherit; transition: border-color .25s, background .25s; }
.soc-item:hover { border-color: var(--teal); background: rgba(0,212,180,0.05); }

.cta-card { background: linear-gradient(135deg, rgba(0,212,180,.07) 0%, rgba(124,111,247,.07) 100%) !important; border-color: rgba(0,212,180,.18) !important; justify-content: center; }
.cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; background: var(--teal); color: #04060a; font-weight: 700; font-size: 13.5px; padding: 11px 22px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .2s; }
.cta-btn:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,212,180,.3); }

/* Reveal Animations */
@keyframes revealUp { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
.r1 { opacity: 0; animation: revealUp 0.8s var(--ease) .1s forwards; }
.r2 { opacity: 0; animation: revealUp 0.8s var(--ease) .2s forwards; }
.r3 { opacity: 0; animation: revealUp 0.8s var(--ease) .3s forwards; }
.r4 { opacity: 0; animation: revealUp 0.8s var(--ease) .4s forwards; }
.r5 { opacity: 0; animation: revealUp 0.8s var(--ease) .5s forwards; }
`;

const TECH = [
  {name:'React',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Node JS',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'MongoDB',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'},
  {name:'Python',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'FastAPI',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'},
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'GitHub',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',inv:true},
  {name:'Figma',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',   handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'#'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
];

export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if(audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(()=>console.log("Autoplay prevented by browser"));
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if(audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="hp">
        
        <div className="hp-ambient">
          <div className="hp-g1"/><div className="hp-g2"/>
        </div>

        <div className="hp-body">
          <section className="hero">
            <div className="hero-pill r1"><div className="hero-dot"/> Available for New Projects</div>
            
            {/* Restored pure text hero name */}
            <h1 className="hero-name r2">
              <span className="hero-outline">DARSH</span>
            </h1>

            <div className="hero-bottom r3">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital
                architectures. Specialising in the <strong>MERN stack</strong> —
                bridging heavy-duty backends with pixel-perfect frontends.
              </p>
              <div className="hero-btns">
                <a href="#" className="hbtn hbtn-primary">Download CV <Download size={17}/></a>
                <Link to="/projects" className="hbtn hbtn-sec">Explore Work <ArrowRight size={17}/></Link>
              </div>
            </div>
          </section>

          {/* Grid perfectly blocked into sets of 4 columns to prevent gaps */}
          <div className="bento r5">

            {/* ROW 1: 2 + 2 = 4 Cols */}
            <div className="card c2">
              <div className="lbl"><Code2 size={13}/>Architecture Focus</div>
              <div className="venn-wrap">
                <div className="venn-c va"><span className="vtag" style={{color:'#9b8ff9'}}>MEAN</span></div>
                <div className="venn-c vb"><span className="vtag" style={{color:'#00d4b4'}}>MERN</span></div>
                <div className="vcenter">Node + Express<br/>+ MongoDB</div>
              </div>
            </div>

            <div className="card c2" style={{padding: 0}}>
              <div className="stats-row">
                <div className="stat-box"><div className="stat-num">50<span>+</span></div><div className="stat-lbl">Projects</div></div>
                <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                <div className="stat-box"><div className="stat-num">30<span>+</span></div><div className="stat-lbl">Hubs</div></div>
              </div>
            </div>

            {/* ROW 2: 3 + 1 = 4 Cols */}
            <div className="card c3">
              <div className="lbl"><Github size={13}/>Live GitHub Data (@DWRSH)</div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <img src="https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true" alt="GitHub Stats" style={{ height: '140px', flex: '1', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                <img src="https://github-readme-streak-stats.herokuapp.com/?user=DWRSH&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true" alt="GitHub Streak" style={{ height: '140px', flex: '1', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'var(--surf2)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                 <img src="https://ghchart.rshah.org/00d4b4/DWRSH" alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }}/>
              </div>
            </div>

            {/* OG Interactive Music Player Card */}
            <div 
              className="card c1" 
              style={{minHeight: '210px'}}
              onMouseEnter={handlePlay}
              onMouseLeave={handlePause}
              onTouchStart={() => isPlaying ? handlePause() : handlePlay()}
            >
              <div className="lbl"><Headphones size={13}/>Vibes</div>
              
              {/* Using a royalty-free lo-fi beat sample URL */}
              <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
              
              <div className="music-player-wrap">
                <div className="vinyl-container">
                  <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                    <div className="vinyl-label"><div className="vinyl-hole"/></div>
                  </div>
                  {/* Tonearm graphic made with SVG */}
                  <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                    <circle cx="30" cy="10" r="8" fill="#555" stroke="#222" strokeWidth="2"/>
                    <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#ccc" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="2" y="65" width="12" height="15" rx="2" fill="#222" transform="rotate(25 8 72)"/>
                  </svg>
                </div>
                <div className="music-info">
                  <div className="music-song">Lo-Fi Coding</div>
                  <div className="music-artist">Lofi Study</div>
                  <div className="hover-hint">{isPlaying ? 'Playing...' : 'Hover to Play'}</div>
                </div>
              </div>
            </div>

            {/* ROW 3: 2 + 2 = 4 Cols */}
            <div className="card c2">
              <div className="lbl"><Layers size={13}/>Tech Stack</div>
              <div className="tech-grid">
                {TECH.map(t=>(
                  <div className="ticon" title={t.name} key={t.name}>
                    <img src={t.url} alt={t.name} className={t.inv?'inv':''}/>
                  </div>
                ))}
              </div>
            </div>

            <div className="card c2">
              <div className="lbl"><ExternalLink size={13}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{fontSize: '18px'}}>{s.icon}</span>
                    <span style={{fontWeight: 700, fontSize: '13px', color: '#fff'}}>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ROW 4: 1 + 1 + 2 = 4 Cols */}
            <div className="card c1">
              <div className="lbl"><BookOpen size={13}/>Latest Post</div>
              <p className="blog-title">Is MERN Stack Dead?</p>
              <p className="blog-desc" style={{marginBottom: '10px'}}>An honest story of visiting 30+ software hubs to find real opportunities.</p>
              <div className="blog-meta">
                <a href="#" className="read-pill">Read <ArrowRight size={11}/></a>
              </div>
            </div>

            <div className="card c1" style={{padding: 0}}>
              <div className="lbl" style={{padding: '16px 16px 0'}}><MapPin size={13}/>Location</div>
              <div className="map-wrap" style={{minHeight: '100%'}}>
                <iframe
                  src="https://maps.google.com/maps?q=Gujarat,India&t=k&z=7&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"
                />
              </div>
            </div>

            <div className="card c2 cta-card">
              <p style={{fontFamily: 'Syne', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '12px'}}>
                Let's build <span style={{color: 'var(--teal)'}}>something great.</span>
              </p>
              <a href="mailto:darsh@example.com" className="cta-btn"><Mail size={15}/> Get in Touch</a>
            </div>

          </div>{/* /bento */}
        </div>
      </div>
    </>
  );
}
