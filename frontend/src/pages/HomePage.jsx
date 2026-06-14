import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Sparkles, MapPin, Trophy,
  Github, Layers, Wrench, BookOpen, ExternalLink, Headphones, Mail, Gamepad2
} from "lucide-react";
import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. CUSTOM MAGNETIC CURSOR (Awwwards Vibe)
───────────────────────────────────────────────────────────────────────── */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current && dotRef.current) {
        // Dot follows instantly
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        // Ring follows with slight delay (magnetic feel)
        cursorRef.current.animate({
          transform: `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`
        }, { duration: 500, fill: "forwards", easing: "ease-out" });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={cursorRef} className="cursor-ring" />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   2. 3D CANVAS PARTICLE NETWORK (Interactive WebGL-style Background)
───────────────────────────────────────────────────────────────────────── */
const Canvas3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    
    // Mouse interaction
    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 1.5;
      }
      update() {
        this.z -= 2; // Move towards camera
        if (this.z <= 0) {
          this.z = 2000;
          this.x = (Math.random() - 0.5) * 2000;
          this.y = (Math.random() - 0.5) * 2000;
        }
      }
      draw() {
        // 3D projection formulas
        let fov = 350;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        
        // Parallax offset based on mouse
        let xOffset = (mouse.x - width / 2) * (1000 / this.z) * 0.1;
        let yOffset = (mouse.y - height / 2) * (1000 / this.z) * 0.1;

        let scale = fov / this.z;
        let opacity = Math.min(1, scale * 1.5);

        ctx.fillStyle = `rgba(150, 194, 219, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(x2d - xOffset, y2d - yOffset, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 400; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/* ─────────────────────────────────────────────────────────────────────────
   3. HOLOGRAPHIC 3D TILT CARDS (With Mouse Spotlight)
───────────────────────────────────────────────────────────────────────── */
const TiltCard = ({ children, className, style, ...props }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 3D Math for Tilt
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{ ...style, transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Border Glow Spotlight */}
      <div 
        className="card-spotlight" 
        style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(150, 194, 219, 0.15), transparent 40%)` }}
      />
      {/* Glass Inner Shine */}
      <div 
        className="card-glare" 
        style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 40%)` }}
      />
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   4. AWARD-WINNING STYLES (Noise, Custom Cursors, Z-Depths)
───────────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Fira+Code:wght@400;500&display=swap');

* { cursor: none !important; box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #020305;
  --surf:      #0b0f18;
  --surf2:     #111620;
  --border:    rgba(255,255,255,0.05);
  --teal:      #96c2db; 
  --teal-dim:  rgba(150, 194, 219, 0.10); 
  --violet:    #e5edf1; 
  --text:      #ffffff;
  --muted:     rgba(255,255,255,0.40);
  --r:         24px;
}

body { background: var(--bg); overflow-x: hidden; }

/* -- NOISE GRAIN OVERLAY -- */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.04;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
}

/* -- CUSTOM CURSOR -- */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: var(--teal); border-radius: 50%;
  pointer-events: none; z-index: 10000; transform: translate3d(-50%, -50%, 0); margin: -3px 0 0 -3px;
  box-shadow: 0 0 10px var(--teal);
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 32px; height: 32px; border: 1px solid rgba(150, 194, 219, 0.5); border-radius: 50%;
  pointer-events: none; z-index: 9999; transition: transform 0.1s;
}
a:hover ~ .cursor-ring, button:hover ~ .cursor-ring { transform: scale(1.5); background: rgba(150, 194, 219, 0.1); border-color: var(--teal); }

/* -- 3D CANVAS -- */
.canvas-3d { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; mix-blend-mode: screen; }

/* Page Body */
.hp-body { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 120px 24px 80px; display: flex; flex-direction: column; gap: 80px; }

/* ── Hero Section (Massive 3D Typography) ── */
.hero { display: flex; flex-direction: column; gap: 0; position: relative; z-index: 10; }
.hero-pill { 
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 100px; 
  border: 1px solid rgba(150, 194, 219, 0.3); background: rgba(150, 194, 219, 0.05); color: var(--teal); 
  font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 32px; 
  backdrop-filter: blur(10px); width: fit-content;
}
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 12px var(--teal); animation: blink 2s infinite; }

.hero-name { 
  font-family: 'Syne', sans-serif; font-size: clamp(80px, 15vw, 200px); font-weight: 800; 
  line-height: .85; letter-spacing: -.05em; margin-bottom: 40px; position: relative;
}
.hero-outline { 
  color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.1); 
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); 
}
.hero-outline:hover { 
  color: var(--bg); -webkit-text-stroke: 2px var(--teal); 
  text-shadow: 10px 10px 0 rgba(150, 194, 219, 0.2), 20px 20px 0 rgba(150, 194, 219, 0.1); 
}

.hero-bottom { display: flex; flex-direction: column; gap: 32px; }
@media(min-width: 768px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 500px; }
.hero-bio strong { color: #fff; font-weight: 500; }

.hbtn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-size: 14px; font-weight: 600; overflow: hidden; position: relative; z-index: 1; transition: all 0.4s; }
.hbtn-primary { background: var(--teal); color: #000; box-shadow: 0 10px 30px rgba(150, 194, 219, 0.2); }
.hbtn-primary:hover { box-shadow: 0 15px 40px rgba(150, 194, 219, 0.4); transform: translateY(-5px); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
.hbtn-sec:hover { border-color: var(--teal); transform: translateY(-5px); background: rgba(150, 194, 219, 0.05); }

/* ── 3D SPOTLIGHT CARDS (The Awwwards Secret) ── */
.bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; width: 100%; perspective: 2000px; }
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { .bento { grid-template-columns: repeat(1, 1fr); } .c1, .c2, .c3, .c4 { grid-column: span 1 !important; } }

.spotlight-card {
  background: var(--surf); border: 1px solid rgba(255,255,255,0.04); border-radius: var(--r); 
  position: relative; overflow: hidden; display: flex; flex-direction: column;
  transform-style: preserve-3d; transition: border-color 0.4s, box-shadow 0.4s;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  will-change: transform;
}
.spotlight-card:hover { border-color: rgba(150, 194, 219, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(150, 194, 219, 0.1); z-index: 20; }

.card-spotlight, .card-glare { position: absolute; inset: -1px; pointer-events: none; z-index: 0; opacity: 0; transition: opacity 0.4s; }
.spotlight-card:hover .card-spotlight, .spotlight-card:hover .card-glare { opacity: 1; }

.card-content {
  padding: clamp(20px, 3vw, 28px); display: flex; flex-direction: column; gap: 16px; flex: 1;
  position: relative; z-index: 1; transform: translateZ(50px); /* Lifts content off the card background! */
}

.lbl { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.lbl svg { color: var(--teal); }

/* SVG CAR */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 160px; position: relative; }
.svg-scene { width: 100%; height: 100%; max-height: 160px; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5)); }

/* OTHER WIDGETS */
.stats-row { display: flex; background: rgba(0,0,0,0.4); border-radius: 16px; overflow: hidden; border: 1px solid var(--border); backdrop-filter: blur(10px); }
.stat-box { flex: 1; padding: 20px 10px; text-align: center; border-right: 1px solid var(--border); transition: background 0.3s; }
.stat-box:hover { background: rgba(150, 194, 219, 0.05); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; }
.stat-num span { color: var(--teal); }

/* MUSIC PLAYER */
.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 16px; }
.vinyl-container { position: relative; width: 90px; height: 90px; }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: repeating-radial-gradient(#111 0%, #000 10%, #111 20%); border: 2px solid #222; box-shadow: 0 15px 30px rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; }
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 34%; height: 34%; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--violet)); border: 2px solid #000; }
.tonearm { position: absolute; top: -10px; right: -20px; width: 40px; height: 70px; transform-origin: top right; transform: rotate(-35deg); transition: transform 0.4s; filter: drop-shadow(5px 10px 10px rgba(0,0,0,0.9)); }
.tonearm.playing { transform: rotate(10deg); }

/* INFINITE MARQUEE */
.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 16px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); flex: 1; justify-content: center; }
.tm-track { display: flex; width: max-content; gap: 16px; }
.tm-left { animation: scrollL 25s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 8px)); animation: scrollR 25s linear infinite; }
.ticon { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; transition: all .3s; backdrop-filter: blur(5px); }
.ticon:hover { background: rgba(150, 194, 219, 0.1); border-color: var(--teal); transform: translateY(-5px) scale(1.1); box-shadow: 0 10px 20px rgba(150, 194, 219, 0.2); }
.ticon img { width: 24px; height: 24px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5)); }
.inv { filter: invert(1) brightness(0.9); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 8px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* SOCIAL GRID */
.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; flex: 1; }
.soc-item { background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 8px; transition: all .3s; }
.soc-item:hover { border-color: var(--teal); background: rgba(150, 194, 219, 0.05); transform: translateY(-5px); }

/* CTA CARD */
.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, 0.05) 0%, rgba(229, 237, 241, 0.05) 100%) !important; justify-content: center; }
.cta-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--teal); color: #000; font-weight: 700; padding: 14px 28px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .3s; }
.cta-btn:hover { background: #fff; box-shadow: 0 10px 30px rgba(150, 194, 219, 0.5); transform: scale(1.05); }

/* ENTRY ANIMATIONS */
@keyframes revealUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
.r1 { animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
.r2 { animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
.r3 { animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
.r5 { animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
`;

const TECH_ROW_1 = [
  {name:'React',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Node JS',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'MongoDB',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'},
  {name:'Python',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'FastAPI',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'},
  {name:'HTML5',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
];
const TECH_ROW_2 = [
  {name:'JavaScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'TypeScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'GitHub',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',inv:true},
  {name:'Tailwind', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
  {name:'AWS',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',inv:true},
];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',    handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'https://www.linkedin.com/in/darshprajapati15'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
];

export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const handlePlay = () => {
    if(audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(()=>console.log("Autoplay prevented"));
      setIsPlaying(true);
    }
  };
  const handlePause = () => {
    if(audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    async function fetchLatestBlog() {
      try {
        const response = await api.get('/blogs');
        if (response.data && response.data.length > 0) {
          const latest = response.data[0];
          setLatestPost({ title: latest.title, desc: latest.desc || 'Read article.', link: `/blog/${latest.slug || latest._id}` });
        }
      } catch (error) { console.error(error); } finally { setLoadingPost(false); }
    }
    fetchLatestBlog();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="noise-overlay" />
      <CustomCursor />
      
      <div className="hp">
        <Canvas3D />

        <div className="hp-body">
          <section className="hero">
            <div className="hero-pill r1"><div className="hero-dot"/> Available for New Projects</div>
            
            <h1 className="hero-name r2">
              <span className="hero-outline">DARSH</span>
            </h1>

            <div className="hero-bottom r3">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. Specialising in the <strong>MERN stack</strong> — bridging heavy-duty backends with pixel-perfect frontends.
              </p>
              <div className="hero-btns">
                <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary">Download CV <Download size={17}/></a>
                <Link to="/projects" className="hbtn hbtn-sec">Explore Work <ArrowRight size={17}/></Link>
              </div>
            </div>
          </section>

          <div className="bento r5">

            {/* ROW 1 */}
            <TiltCard className="c2">
              <div className="card-content">
                <div className="lbl"><Gamepad2 size={13}/>Keep Moving</div>
                <div className="car-wrap">
                  <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                    {/* Simplified for space, but retains animation */}
                    <path d="M 65 110 L 60 85 L 95 65 L 160 65 L 190 85 L 210 85 Q 220 85 220 95 L 220 110 Z" fill="var(--surf2)" stroke="var(--teal)" strokeWidth="2.5" />
                    <path d="M 98 68 L 155 68 L 180 85 L 85 85 Z" fill="#04060a" stroke="var(--teal)" strokeWidth="1.5" />
                    <line x1="0" y1="130" x2="300" y2="130" stroke="var(--muted)" strokeWidth="3" strokeDasharray="30 20">
                      <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    {/* Wheels */}
                    <g transform="translate(100, 115)"><circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" /></g>
                    <g transform="translate(180, 115)"><circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" /></g>
                  </svg>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="c2">
              <div className="card-content" style={{justifyContent: 'center'}}>
                <div className="stats-row">
                  <div className="stat-box"><div className="stat-num">13<span>+</span></div><div className="stat-lbl" style={{color: 'var(--muted)', fontSize: '11px'}}>Projects</div></div>
                  <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl" style={{color: 'var(--muted)', fontSize: '11px'}}>Years Exp</div></div>
                  <div className="stat-box"><div className="stat-num">6<span>+</span></div><div className="stat-lbl" style={{color: 'var(--muted)', fontSize: '11px'}}>Hubs</div></div>
                </div>
              </div>
            </TiltCard>

            {/* ROW 2 */}
            <TiltCard className="c3">
              <div className="card-content">
                <div className="lbl"><Github size={13}/>Live GitHub Data</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '10px' }}>
                  <img src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" style={{ width: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                  <img src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" style={{ width: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                 <img src={`https://ghchart.rshah.org/96c2db/DWRSH?v=${Date.now()}`} alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }} />
                </div>
              </div>
            </TiltCard>

            <TiltCard className="c1" onMouseEnter={handlePlay} onMouseLeave={handlePause}>
              <div className="card-content">
                <div className="lbl"><Headphones size={13}/>Vibes</div>
                <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
                <div className="music-player-wrap">
                  <div className="vinyl-container">
                    <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                      <div className="vinyl-label"><div className="vinyl-hole"/></div>
                    </div>
                    <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                      <circle cx="30" cy="10" r="8" fill="#555" stroke="#222" strokeWidth="2"/>
                      <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#ccc" strokeWidth="4" strokeLinecap="round"/>
                      <rect x="2" y="65" width="12" height="15" rx="2" fill="#222" transform="rotate(25 8 72)"/>
                    </svg>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontFamily: 'Syne', fontWeight: 700, color: '#fff'}}>Lo-Fi Coding</div>
                    <div style={{fontSize: '11px', color: 'var(--muted)'}}>Lofi Study</div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* ROW 3 */}
            <TiltCard className="c2">
              <div className="card-content">
                <div className="lbl"><Layers size={13}/>Tech Stack</div>
                <div className="tech-marquee-wrapper">
                  <div className="tm-track tm-left">
                    {[...TECH_ROW_1, ...TECH_ROW_1].map((t, i) => (
                      <div className="ticon" title={t.name} key={`m1-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                    ))}
                  </div>
                  <div className="tm-track tm-right">
                    {[...TECH_ROW_2, ...TECH_ROW_2].map((t, i) => (
                      <div className="ticon" title={t.name} key={`m2-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="c2">
              <div className="card-content">
                <div className="lbl"><ExternalLink size={13}/>Find Me Online</div>
                <div className="soc-grid">
                  {SOCIALS.map(s=>(
                    <a className="soc-item" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                      <span style={{fontSize: '20px'}}>{s.icon}</span>
                      <span style={{fontWeight: 700, fontSize: '14px', color: '#fff'}}>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* ROW 4 */}
            <TiltCard className="c1">
              <div className="card-content">
                <div className="lbl"><BookOpen size={13}/>Latest Post</div>
                {loadingPost ? <span className="loading-pulse">Syncing...</span> : latestPost ? (
                  <>
                    <p style={{fontFamily: 'Syne', fontWeight: 700, color: '#fff'}}>{latestPost.title}</p>
                    <p style={{fontSize: '12px', color: 'var(--muted)', marginTop: '8px'}}>{latestPost.desc}</p>
                  </>
                ) : <p style={{fontSize: '12px', color: 'var(--muted)'}}>No posts found.</p>}
              </div>
            </TiltCard>

            <TiltCard className="c1" style={{padding: 0}}>
              <div className="card-content" style={{padding: 0, height: '100%', minHeight: '180px'}}>
                <div className="lbl" style={{padding: '20px 20px 0', position: 'absolute', zIndex: 10}}><MapPin size={13}/>Location</div>
                <div style={{width: '100%', height: '100%', position: 'absolute', inset: 0, borderRadius: 'var(--r)', overflow: 'hidden'}}>
                  <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" style={{width: '100%', height: '100%', border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(1.5) contrast(.8)'}} allowFullScreen="" loading="lazy" />
                </div>
              </div>
            </TiltCard>

            <TiltCard className="c2 cta-card">
              <div className="card-content" style={{justifyContent: 'center'}}>
                <p style={{fontFamily: 'Syne', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '20px'}}>
                  Let's build <span style={{color: 'var(--teal)'}}>something great.</span>
                </p>
                <a href="mailto:contact@darshprajapati.dev" className="cta-btn"><Mail size={16}/> Get in Touch</a>
              </div>
            </TiltCard>

          </div>
        </div>
      </div>
    </>
  );
}
