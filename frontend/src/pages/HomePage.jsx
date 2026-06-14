import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin, 
  Github, Layers, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Play, Pause
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. STABLE PREMIUM CSS
───────────────────────────────────────────────────────────────────────── */
const STABLE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Space+Mono:wght@400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
::selection { background: rgba(150, 194, 219, 0.5); color: #fff; }

body, html { 
  cursor: none !important; overflow-x: hidden; background: #020305; 
  -webkit-font-smoothing: antialiased; font-family: 'DM Sans', sans-serif;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #010102; }
::-webkit-scrollbar-thumb { background: rgba(150, 194, 219, 0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #96c2db; }

:root {
  --bg:          #020305;
  --surf:        rgba(11, 15, 24, 0.6);
  --surf2:       rgba(17, 22, 32, 0.8);
  --border:      rgba(255, 255, 255, 0.08);
  --border-h:    rgba(150, 194, 219, 0.4);
  
  --primary:     #96c2db; 
  --primary-dim: rgba(150, 194, 219, 0.15);
  --secondary:   #e5edf1; 
  
  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.5);
  
  --ease:        cubic-bezier(0.16, 1, 0.3, 1);
  --r:           24px;
}

/* ── PRELOADER ── */
.preloader { position: fixed; inset: 0; z-index: 99999; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.8s var(--ease), visibility 0.8s; }
.preloader.hidden { opacity: 0; visibility: hidden; }
.pl-brand { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; color: #fff; letter-spacing: 0.2em; display: flex; gap: 8px; margin-bottom: 20px; }
.pl-brand span { color: var(--primary); }
.pl-bar-container { width: 200px; height: 2px; background: rgba(255,255,255,0.1); overflow: hidden; border-radius: 4px; }
.pl-bar-fill { height: 100%; background: var(--primary); width: 0%; box-shadow: 0 0 10px var(--primary); transition: width 0.1s linear; }

/* ── CURSOR ── */
.cursor-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: #fff; border-radius: 50%; pointer-events: none; z-index: 100000; transform: translate3d(-50%, -50%, 0); box-shadow: 0 0 10px #fff; mix-blend-mode: difference; }
.cursor-ring { position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 1px solid rgba(150, 194, 219, 0.5); border-radius: 50%; pointer-events: none; z-index: 99999; transform: translate3d(-50%, -50%, 0); transition: width 0.3s var(--ease), height 0.3s var(--ease), background 0.3s, border-color 0.3s; }
.cursor-ring.hovering { width: 60px; height: 60px; background: rgba(150, 194, 219, 0.1); border-color: transparent; }

/* ── BACKGROUNDS ── */
.noise-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 9990; opacity: 0.04; background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E'); }
.canvas-3d { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; opacity: 0.6; }

/* ── LAYOUT ── */
.hp-body { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 120px 24px 80px; display: flex; flex-direction: column; gap: 80px; }

/* ── HERO ── */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; }
.hero-pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; border-radius: 100px; border: 1px solid rgba(150, 194, 219, 0.3); background: rgba(150, 194, 219, 0.05); color: var(--primary); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 30px; width: fit-content; }
.hero-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 15px var(--primary); animation: pulse 2s infinite; }

.hero-name { font-family: 'Syne', sans-serif; font-size: clamp(60px, 14vw, 180px); font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin-bottom: 40px; }
.hero-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.2); transition: all 0.4s var(--ease); }
.hero-outline:hover { color: var(--bg); -webkit-text-stroke: 1.5px var(--primary); text-shadow: 10px 10px 0 rgba(150, 194, 219, 0.15); transform: translateY(-5px); display: inline-block; }

.hero-bottom { display: flex; flex-direction: column; gap: 30px; }
@media(min-width: 800px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 550px; }
.hero-bio strong { color: #fff; font-weight: 500; }

.hbtn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s var(--ease); }
.hbtn-primary { background: var(--primary); color: #000; }
.hbtn-primary:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(150, 194, 219, 0.3); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); }
.hbtn-sec:hover { border-color: var(--primary); background: rgba(150, 194, 219, 0.05); color: var(--primary); transform: translateY(-4px); }

/* ── STABLE BENTO GRID ── */
.bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; gap: 20px; width: 100%; perspective: 1000px; }
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { .bento { grid-template-columns: repeat(1, 1fr); gap: 16px; } .c1, .c2, .c3 { grid-column: span 1 !important; } }

/* ── STABLE CARD WRAPPER ── */
.stable-card {
  background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); 
  display: flex; flex-direction: column; overflow: hidden; position: relative;
  transition: transform 0.2s ease-out, border-color 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
}
.stable-card:hover {
  border-color: var(--border-h);
  box-shadow: 0 15px 40px rgba(0,0,0,0.5), 0 0 20px rgba(150, 194, 219, 0.1);
  z-index: 10;
}
.card-content { padding: 24px; display: flex; flex-direction: column; flex: 1; gap: 16px; z-index: 2; position: relative; }
.card-glare { position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.3s; mix-blend-mode: overlay; }
.stable-card:hover .card-glare { opacity: 1; }

.lbl { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); }
.lbl svg { color: var(--primary); }

/* ── WIDGETS ── */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 160px; background: linear-gradient(180deg, transparent 0%, rgba(150, 194, 219, 0.05) 100%); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.02); }
.svg-scene { width: 100%; height: 100%; max-height: 160px; object-fit: contain; }

.stats-row { display: flex; flex: 1; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid var(--border); }
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 10px; border-right: 1px solid var(--border); transition: background 0.3s; }
.stat-box:hover { background: rgba(150, 194, 219, 0.05); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: #fff; line-height: 1; }
.stat-num span { color: var(--primary); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }

.gh-wrap { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 10px; }
.gh-img { width: 100%; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid var(--border); padding: 10px; object-fit: contain; }

.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 20px; }
.vinyl-container { position: relative; width: 100px; height: 100px; }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: repeating-radial-gradient(#111 0%, #222 5%, #111 10%); border: 3px solid #000; box-shadow: 0 10px 20px rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; }
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 35%; height: 35%; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #4a6f85); }
.tonearm { position: absolute; top: -10px; right: -20px; width: 45px; height: 80px; transform-origin: 80% 10%; transform: rotate(-35deg); transition: transform 0.4s var(--ease); filter: drop-shadow(5px 10px 8px rgba(0,0,0,0.8)); pointer-events: none; }
.tonearm.playing { transform: rotate(15deg); }
.music-info { text-align: center; width: 100%; }
.visualizer { display: flex; gap: 4px; height: 20px; align-items: flex-end; justify-content: center; opacity: 0.2; transition: opacity 0.3s; margin-top: 10px; }
.visualizer.active { opacity: 1; }
.vz-bar { width: 4px; background: var(--primary); border-radius: 2px; transform-origin: bottom; transform: scaleY(0.2); }
.visualizer.active .vz-bar { animation: vzBounce 0.5s infinite alternate ease-in-out; }
.vz-bar:nth-child(1){animation-duration: 0.4s;} .vz-bar:nth-child(2){animation-duration: 0.6s;} .vz-bar:nth-child(3){animation-duration: 0.5s;} .vz-bar:nth-child(4){animation-duration: 0.7s;}
@keyframes vzBounce { 0% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }

.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 16px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); flex: 1; justify-content: center; }
.tm-track { display: flex; width: max-content; gap: 16px; }
.tm-left { animation: scrollL 25s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 8px)); animation: scrollR 25s linear infinite; }
.ticon { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; transition: all 0.3s var(--ease); }
.ticon:hover { border-color: var(--primary); transform: translateY(-5px); background: rgba(150, 194, 219, 0.1); }
.ticon img { width: 26px; height: 26px; object-fit: contain; }
.inv { filter: invert(1) brightness(0.9); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 8px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; flex: 1; }
.soc-item { background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: all 0.3s var(--ease); text-decoration: none; color: inherit; }
.soc-item:hover { border-color: var(--primary); background: rgba(150, 194, 219, 0.05); transform: translateY(-5px); }

.blog-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; line-height: 1.3; color: #fff; margin-bottom: 8px; }
.blog-desc { font-size: 13.5px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 16px; }
.read-pill { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 10px 20px; border-radius: 100px; text-decoration: none; transition: all 0.3s; align-self: flex-start; margin-top: auto; }
.read-pill:hover { background: var(--primary); color: #000; border-color: var(--primary); }

.map-link { flex: 1; position: relative; border-radius: 12px; overflow: hidden; min-height: 180px; border: 1px solid var(--border); transition: opacity 0.3s; display: block; }
.map-link:hover { opacity: 0.8; }
.map-link iframe { width: 100%; height: 100%; border: 0; filter: invert(95%) hue-rotate(180deg) saturate(1.5) contrast(0.85); position: absolute; inset: 0; pointer-events: none; }

.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, 0.08) 0%, rgba(229, 237, 241, 0.02) 100%) !important; border-color: rgba(150, 194, 219, 0.2) !important; }
.cta-text { font-family: 'Syne', sans-serif; font-size: clamp(26px, 4vw, 40px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 24px; }
.cta-btn { display: inline-flex; align-items: center; gap: 10px; background: var(--primary); color: #000; font-weight: 700; font-size: 15px; padding: 16px 32px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all 0.3s; }
.cta-btn:hover { background: #fff; transform: translateY(-4px); box-shadow: 0 10px 25px rgba(150, 194, 219, 0.3); }

@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; box-shadow: 0 0 15px var(--primary); } 100% { opacity: 0.5; } }
`;

/* ─────────────────────────────────────────────────────────────────────────
   2. DATA SETS
───────────────────────────────────────────────────────────────────────── */
const TECH_ROW_1 = [
  {name:'React',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Node JS',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'MongoDB',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'},
  {name:'Python',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'FastAPI',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'},
  {name:'HTML5',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
  {name:'CSS3',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
];
const TECH_ROW_2 = [
  {name:'JavaScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'TypeScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'GitHub',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',inv:true},
  {name:'Figma',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
  {name:'Tailwind', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
  {name:'AWS',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',inv:true},
];
const MARQUEE_1 = [...TECH_ROW_1, ...TECH_ROW_1];
const MARQUEE_2 = [...TECH_ROW_2, ...TECH_ROW_2];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',    handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'https://www.linkedin.com/in/darshprajapati15'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
];

/* ─────────────────────────────────────────────────────────────────────────
   3. COMPONENTS (Safe & Stable)
───────────────────────────────────────────────────────────────────────── */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  useEffect(() => {
    const onMouseMove = (e) => {
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (cursorRef.current) {
        cursorRef.current.animate({ transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)` }, { duration: 400, fill: "forwards" });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return <><div ref={dotRef} className="cursor-dot" /><div ref={cursorRef} className="cursor-ring" /></>;
};

const Canvas3D = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let mouse = { x: width / 2, y: height / 2 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

    class Particle {
      constructor() {
        this.x = (Math.random() - 0.5) * 3000; this.y = (Math.random() - 0.5) * 3000;
        this.z = Math.random() * 2000; this.size = Math.random() * 1.5;
      }
      update() {
        this.z -= 1.5; 
        if (this.z <= 0) { this.z = 2000; this.x = (Math.random() - 0.5) * 3000; this.y = (Math.random() - 0.5) * 3000; }
      }
      draw() {
        let fov = 350;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let xOffset = (mouse.x - width / 2) * (1000 / this.z) * 0.1;
        let yOffset = (mouse.y - height / 2) * (1000 / this.z) * 0.1;
        let scale = fov / this.z;
        
        ctx.fillStyle = `rgba(150, 194, 219, ${Math.min(1, scale)})`;
        ctx.beginPath(); ctx.arc(x2d - xOffset, y2d - yOffset, this.size * scale, 0, Math.PI * 2); ctx.fill();
      }
    }
    for (let i = 0; i < 200; i++) particles.push(new Particle());
    const animate = () => { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); };
    animate();
  }, []);
  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/* Safe Simple Tilt (No preserve-3d issues) */
const StableCard = ({ children, className, style, ...props }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
    setMousePos({ x, y });
  };
  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      className={`stable-card interactable ${className}`}
      style={{ ...style, transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => document.querySelector('.cursor-ring')?.classList.add('hovering')}
      onMouseOut={() => document.querySelector('.cursor-ring')?.classList.remove('hovering')}
      {...props}
    >
      <div className="card-glare" style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 40%)` }} />
      <div className="card-content">{children}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   4. HOMEPAGE
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  
  // Preloader States
  const [percent, setPercent] = useState(0);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setSiteLoaded(true), 300);
      }
      setPercent(current);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchLatestBlog() {
      try {
        const response = await api.get('/blogs');
        if (response.data && response.data.length > 0) {
          const latest = response.data[0];
          setLatestPost({ title: latest.title, desc: latest.desc || 'Read this article.', link: `/blog/${latest.slug || latest._id}` });
        }
      } catch (error) { console.error(error); } finally { setLoadingPost(false); }
    }
    fetchLatestBlog();
  }, []);

  const togglePlay = () => {
    if(audioRef.current) {
      if(isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
      else { audioRef.current.volume = 0.4; audioRef.current.play().catch(()=>{}); setIsPlaying(true); }
    }
  };

  return (
    <>
      <style>{STABLE_CSS}</style>

      {/* Preloader */}
      <div className={`preloader ${siteLoaded ? 'hidden' : ''}`}>
        <div className="pl-brand">D<span>ARSH</span></div>
        <div style={{color: 'var(--muted)', fontSize: '14px', marginBottom: '10px', fontFamily: 'Space Mono'}}>{percent}%</div>
        <div className="pl-bar-container"><div className="pl-bar-fill" style={{ width: `${percent}%` }} /></div>
      </div>

      <div className="noise-overlay" />
      <CustomCursor />
      <Canvas3D />

      <div className="hp">
        <div className="hp-body" style={{ opacity: siteLoaded ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
          
          <section className="hero">
            <div className="hero-pill interactable"><div className="hero-dot"/> Available for New Projects</div>
            <h1 className="hero-name"><span className="hero-outline">DARSH</span></h1>
            <div className="hero-bottom">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. Specialising in the <strong>MERN stack</strong> — bridging heavy-duty backends with pixel-perfect frontends.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary interactable">Download CV <Download size={18}/></a>
                <Link to="/projects" className="hbtn hbtn-sec interactable">Explore Work <ArrowRight size={18}/></Link>
              </div>
            </div>
          </section>

          {/* STABLE GRID */}
          <div className="bento">

            {/* 1. CAR */}
            <StableCard className="c2">
              <div className="lbl"><Gamepad2 size={13}/>Keep Moving</div>
              <div className="car-wrap">
                <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs><linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(150, 194, 219, 0.4)" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
                  
                  <g opacity="0.1" fill="var(--teal)"><animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="12s" repeatCount="indefinite" /><path d="M 20 120 L 20 60 L 50 60 L 50 120 Z" /><path d="M 70 120 L 70 40 L 110 40 L 110 120 Z" /><path d="M 150 120 L 150 80 L 190 80 L 190 120 Z" /></g>
                  <g opacity="0.2" fill="var(--secondary)"><animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="6s" repeatCount="indefinite" /><rect x="10" y="70" width="30" height="60" /><rect x="50" y="90" width="40" height="40" /><rect x="110" y="50" width="35" height="80" /></g>
                  
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--border)" strokeWidth="3" />
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--muted)" strokeWidth="3" strokeDasharray="30 20"><animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.4s" repeatCount="indefinite" /></line>
                  
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.4s" repeatCount="indefinite" />
                    <path d="M 65 110 L 60 85 L 95 65 L 160 65 L 190 85 L 210 85 Q 220 85 220 95 L 220 110 Z" fill="#111620" stroke="var(--primary)" strokeWidth="2.5" />
                    <path d="M 98 68 L 155 68 L 180 85 L 85 85 Z" fill="#020305" stroke="var(--primary)" strokeWidth="1.5" />
                    <line x1="120" y1="68" x2="105" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="3" /><line x1="135" y1="68" x2="120" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                    <path d="M 60 90 L 65 90 L 65 100 L 60 100 Z" fill="#ff4747" /><path d="M 210 92 L 220 92 L 220 102 L 210 102 Z" fill="#fff" />
                    <polygon points="220,92 290,75 290,115 220,102" fill="url(#beam)" />
                  </g>
                  
                  <g transform="translate(100, 115)"><circle cx="0" cy="0" r="14" fill="#020305" stroke="var(--secondary)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" /><line x1="-14" y1="0" x2="14" y2="0" stroke="var(--secondary)" strokeWidth="2" /><line x1="0" y1="-14" x2="0" y2="14" stroke="var(--secondary)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--primary)" /></g></g>
                  <g transform="translate(180, 115)"><circle cx="0" cy="0" r="14" fill="#020305" stroke="var(--secondary)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" /><line x1="-14" y1="0" x2="14" y2="0" stroke="var(--secondary)" strokeWidth="2" /><line x1="0" y1="-14" x2="0" y2="14" stroke="var(--secondary)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--primary)" /></g></g>
                </svg>
              </div>
            </StableCard>

            {/* 2. STATS */}
            <StableCard className="c2" style={{background: 'transparent', border: 'none', boxShadow: 'none'}}>
              <div className="stats-row" style={{height: '100%'}}>
                <div className="stat-box"><div className="stat-num">13<span>+</span></div><div className="stat-lbl">Projects</div></div>
                <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                <div className="stat-box"><div className="stat-num">6<span>+</span></div><div className="stat-lbl">Hubs</div></div>
              </div>
            </StableCard>

            {/* 3. GITHUB */}
            <StableCard className="c3">
              <div className="lbl"><Github size={14}/>Live GitHub Data (@DWRSH)</div>
              <div className="gh-wrap">
                <img className="gh-img" src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" />
                <img className="gh-img" src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" />
              </div>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
               <img src={`https://ghchart.rshah.org/96c2db/DWRSH?v=${Date.now()}`} alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }} />
              </div>
            </StableCard>

            {/* 4. AUDIO */}
            <StableCard className="c1" style={{minHeight: '240px'}} onClick={togglePlay}>
              <div className="lbl" style={{justifyContent: 'space-between'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Headphones size={14}/>Vibes</span>
                {isPlaying ? <Pause size={14} fill="var(--primary)"/> : <Play size={14} fill="var(--primary)"/>}
              </div>
              <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
              <div className="music-player-wrap">
                <div className="vinyl-container">
                  <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                    <div className="vinyl-label"><div className="vinyl-hole"/></div>
                  </div>
                  <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                    <circle cx="30" cy="10" r="8" fill="#333" stroke="#000" strokeWidth="2"/>
                    <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#999" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="2" y="65" width="12" height="15" rx="2" fill="#111" transform="rotate(25 8 72)"/>
                  </svg>
                </div>
                <div className="music-info">
                  <div style={{fontFamily: 'Syne', fontWeight: 800, color: '#fff', fontSize: '16px'}}>Lo-Fi Coding</div>
                  <div style={{fontSize: '12px', color: 'var(--muted)'}}>Lofi Study</div>
                  <div className={`visualizer ${isPlaying ? 'active' : ''}`}>
                    <div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/>
                  </div>
                </div>
              </div>
            </StableCard>

            {/* 5. TECH */}
            <StableCard className="c2">
              <div className="lbl"><Layers size={14}/>Tech Stack</div>
              <div className="tech-marquee-wrapper">
                <div className="tm-track tm-left">
                  {MARQUEE_1.map((t, i) => (
                    <div className="ticon" title={t.name} key={`m1-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                  ))}
                </div>
                <div className="tm-track tm-right">
                  {MARQUEE_2.map((t, i) => (
                    <div className="ticon" title={t.name} key={`m2-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                  ))}
                </div>
              </div>
            </StableCard>

            {/* 6. SOCIAL */}
            <StableCard className="c2">
              <div className="lbl"><ExternalLink size={14}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item interactable" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{fontSize: '24px'}}>{s.icon}</span>
                    <span style={{fontWeight: 700, fontSize: '14px', color: '#fff'}}>{s.name}</span>
                  </a>
                ))}
              </div>
            </StableCard>

            {/* 7. BLOG */}
            <StableCard className="c1 mob-full">
              <div className="lbl"><BookOpen size={14}/>Latest Post</div>
              {loadingPost ? (
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{fontSize: '12px', color: 'var(--muted)', animation: 'pulse 1.5s infinite'}}>Syncing data...</span>
                </div>
              ) : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <Link to={latestPost.link} className="read-pill interactable">Read Article <ArrowRight size={14}/></Link>
                </>
              ) : (
                <p className="blog-desc">No posts available.</p>
              )}
            </StableCard>

            {/* 8. MAP */}
            <StableCard className="c1" style={{padding: 0}}>
              <div className="card-content" style={{padding: 0, height: '100%', minHeight: '200px', position: 'relative'}}>
                <div className="lbl" style={{padding: '24px 24px 0', position: 'absolute', zIndex: 10}}><MapPin size={14}/>Location</div>
                <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map-link interactable" style={{position: 'absolute', inset: 0, border: 'none'}}>
                  <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" allowFullScreen="" loading="lazy" title="Map" style={{width: '100%', height: '100%', border: '0', filter: 'invert(95%) hue-rotate(180deg) saturate(1.8) contrast(0.85)'}} />
                </a>
              </div>
            </StableCard>

            {/* 9. CTA */}
            <StableCard className="c2 cta-card">
              <div className="card-content" style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                <p className="cta-text">
                  Ready to build <span style={{color: 'var(--primary)'}}>something extraordinary?</span>
                </p>
                <a href="mailto:contact@darshprajapati.dev" className="cta-btn interactable"><Mail size={18}/> Start a Project</a>
              </div>
            </StableCard>

          </div>
        </div>
      </div>
    </>
  );
}
