import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Sparkles, MapPin, Trophy,
  Github, Layers, Wrench, BookOpen, ExternalLink, Headphones, Mail, Gamepad2
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES (Perfect Grid + Native SVG Car + Strict Horizontal Stats)
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

.hp { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); min-height: 100vh; overflow-x: hidden; position: relative; }

/* Ambient Glows */
.hp-ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.hp-g1 { position: absolute; width: 900px; height: 900px; border-radius: 50%; background: radial-gradient(circle, rgba(0,212,180,0.055) 0%, transparent 65%); top: -350px; right: -250px; animation: floatA 18s ease-in-out infinite; }
.hp-g2 { position: absolute; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(124,111,247,0.05) 0%, transparent 65%); bottom: -250px; left: -200px; animation: floatA 22s ease-in-out infinite reverse; }
@keyframes floatA { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-28px,38px); } }

/* Page Body */
.hp-body { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 100px 24px 64px; display: flex; flex-direction: column; gap: 56px; }

/* ── Hero Section ── */
.hero { display: flex; flex-direction: column; gap: 0; position: relative; }
.hero-pill { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; padding: 7px 16px; border-radius: 100px; border: 1px solid rgba(0,212,180,0.3); background: rgba(0,212,180,0.06); color: var(--teal); font-size: 11.5px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; margin-bottom: 28px; backdrop-filter: blur(8px); }
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 9px var(--teal); animation: blink 2.2s ease-in-out infinite; }
@keyframes blink { 50% { opacity: .35; box-shadow: none; } }

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

/* ── TRUE MOBILE BENTO GRID ── */
.bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; gap: clamp(12px, 2vw, 16px); width: 100%; }
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }

/* 🔴 MOBILE LAYOUT: Maintain 2 cols & Strict Horizontal Stats */
@media(max-width: 640px) { 
  .hp-body { padding: 80px 16px 48px; gap: 40px; }
  .bento { grid-template-columns: repeat(2, 1fr); gap: 12px; } 
  .c1 { grid-column: span 1; } 
  .c2, .c3, .c4 { grid-column: span 2; } 
  .mob-full { grid-column: span 2 !important; }
  
  .stats-row { flex-direction: row !important; flex-wrap: nowrap !important; }
  .stat-box { padding: 12px 4px !important; border-bottom: none !important; border-right: 1px solid var(--border) !important; }
  .stat-box:last-child { border-right: none !important; }
  .stat-num { font-size: 20px !important; }
  .stat-lbl { font-size: 9px !important; }
}

.card { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: clamp(16px, 3vw, 22px); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 14px; transition: border-color .3s, transform .35s var(--ease), box-shadow .35s var(--ease); }
.card:hover { border-color: var(--border-h); transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,0,0,.5); }
.lbl { display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); z-index: 2; }
.lbl svg { color: var(--muted2); flex-shrink: 0; }

/* ── CAR SVG WRAPPER ── */
.car-wrap { 
  flex: 1; display: flex; align-items: flex-end; justify-content: center; 
  min-height: 140px; position: relative; overflow: hidden; 
  padding: 0; border-radius: var(--rsm); 
  background: linear-gradient(to bottom, transparent 30%, rgba(0,212,180,0.03) 100%); 
}
.svg-scene { width: 100%; height: 100%; max-height: 150px; object-fit: contain; }

/* ── MUSIC PLAYER ── */
.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; position: relative; gap: 16px; cursor: pointer; }
.vinyl-container { position: relative; width: clamp(70px, 20vw, 90px); height: clamp(70px, 20vw, 90px); }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: radial-gradient(circle, #000 30%, #1a1a1a 40%, #000 50%, #1a1a1a 60%, #000 70%, #1a1a1a 80%, #000 90%); border: 3px solid #333; box-shadow: 0 10px 20px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; transition: transform 0.3s var(--ease); }
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 34%; height: 34%; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--violet)); border: 2px solid #111; display: flex; align-items: center; justify-content: center; }
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; }
.tonearm { position: absolute; top: -10px; right: -15px; width: 35px; height: 60px; transform-origin: top right; transform: rotate(-35deg); transition: transform 0.4s var(--ease); filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5)); z-index: 5; }
.tonearm.playing { transform: rotate(10deg); }
.music-info { text-align: center; z-index: 2; }
.music-song { font-family: 'Syne', sans-serif; font-weight: 700; color: #fff; font-size: clamp(13px, 4vw, 15px); margin-bottom: 2px; }
.music-artist { font-size: 11px; color: var(--muted); }
.hover-hint { font-size: 9px; text-transform: uppercase; letter-spacing: .1em; color: var(--teal); opacity: 0.7; margin-top: 8px; animation: pulseHint 2s infinite alternate; }
@keyframes pulseHint { from { opacity: 0.3; } to { opacity: 1; } }

/* ── INFINITE MARQUEE ── */
.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 14px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); flex: 1; justify-content: center; }
.tm-track { display: flex; width: max-content; gap: 14px; }
.tm-left { animation: scrollL 25s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 7px)); animation: scrollR 25s linear infinite; }
.ticon { background: var(--surf2); border: 1px solid var(--border); border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; transition: border-color .25s, transform .25s var(--ease); flex-shrink: 0; }
.ticon:hover { border-color: var(--teal); transform: translateY(-3px); }
.ticon img { width: 22px; height: 22px; object-fit: contain; }
.inv { filter: invert(1) brightness(.8); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 7px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* Stats & Others */
.stats-row { display: flex; flex: 1; flex-direction: row; border-radius: var(--r); overflow: hidden; background: var(--surf2); border: 1px solid var(--border); }
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 8px; text-align: center; border-right: 1px solid var(--border); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 800; color: #fff; line-height: 1; }
.stat-num span { color: var(--teal); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: .07em; }

.blog-title { font-family: 'Syne', sans-serif; font-size: 15.5px; font-weight: 700; line-height: 1.4; color: #fff; }
.blog-desc { font-size: 12.5px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 10px; }
.blog-meta { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.read-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: var(--teal); background: var(--teal-dim); border: 1px solid rgba(0,212,180,.2); padding: 4px 11px; border-radius: 100px; text-decoration: none; transition: background .2s, border-color .2s; }
.read-pill:hover { background: rgba(0,212,180,.18); border-color: rgba(0,212,180,.4); }

.map-link { flex: 1; display: flex; flex-direction: column; text-decoration: none; border-radius: var(--rsm); overflow: hidden; min-height: 160px; position: relative; transition: opacity 0.2s; }
.map-link:hover { opacity: 0.85; }
.map-wrap { width: 100%; height: 100%; position: absolute; inset: 0; pointer-events: none; }
.map-wrap iframe { width: 100%; height: 100%; border: 0; filter: invert(90%) hue-rotate(180deg) saturate(1.5) contrast(.8); }

.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; flex: 1; }
.soc-item { background: var(--surf2); border: 1px solid var(--border); border-radius: var(--rsm); padding: 14px; display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: inherit; transition: border-color .25s, background .25s; }
.soc-item:hover { border-color: var(--teal); background: rgba(0,212,180,0.05); }

.cta-card { background: linear-gradient(135deg, rgba(0,212,180,.07) 0%, rgba(124,111,247,.07) 100%) !important; border-color: rgba(0,212,180,.18) !important; justify-content: center; }
.cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; background: var(--teal); color: #04060a; font-weight: 700; font-size: 13.5px; padding: 11px 22px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .2s; }
.cta-btn:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,212,180,.3); }

@keyframes revealUp { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
.r1 { opacity: 0; animation: revealUp 0.8s var(--ease) .1s forwards; }
.r2 { opacity: 0; animation: revealUp 0.8s var(--ease) .2s forwards; }
.r3 { opacity: 0; animation: revealUp 0.8s var(--ease) .3s forwards; }
.r4 { opacity: 0; animation: revealUp 0.8s var(--ease) .4s forwards; }
.r5 { opacity: 0; animation: revealUp 0.8s var(--ease) .5s forwards; }

.loading-pulse { display: inline-block; animation: pulse 1.5s infinite; color: var(--muted); font-size: 12px; }
@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
`;

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

const MARQUEE_1 = [...TECH_ROW_1, ...TECH_ROW_1, ...TECH_ROW_1];
const MARQUEE_2 = [...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',   handle:'@DWRSH',  href:'https://github.com/DWRSH'},
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
        const posts = response.data;
        
        if (posts && posts.length > 0) {
          const latest = posts[0];
          setLatestPost({
            title: latest.title,
            desc: latest.desc || (latest.content ? latest.content.substring(0, 120) + '...' : 'Click to read this article.'),
            link: `/blog/${latest.slug || latest._id}`
          });
        } else {
          setLatestPost(null);
        }
        setLoadingPost(false);
      } catch (error) {
        console.error("Failed to sync latest blog:", error);
        setLoadingPost(false);
      }
    }
    fetchLatestBlog();
  }, []);

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
                <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary">Download CV <Download size={17}/></a>
                <Link to="/projects" className="hbtn hbtn-sec">Explore Work <ArrowRight size={17}/></Link>
              </div>
            </div>
          </section>

          <div className="bento r5">

            {/* ROW 1 */}
            {/* ── NATIVE SVG ANIMATED CAR ── */}
            <div className="card c2">
              <div className="lbl"><Gamepad2 size={13}/>Keep Moving</div>
              <div className="car-wrap">
                <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="headlight-beam" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(0, 212, 180, 0.4)" />
                      <stop offset="100%" stopColor="rgba(0, 212, 180, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Deep Background (Slow Clouds/City) */}
                  <g opacity="0.1" fill="var(--teal)">
                    <animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="12s" repeatCount="indefinite" />
                    <path d="M 20 120 L 20 60 L 50 60 L 50 120 Z" />
                    <path d="M 70 120 L 70 40 L 110 40 L 110 120 Z" />
                    <path d="M 150 120 L 150 80 L 190 80 L 190 120 Z" />
                  </g>

                  {/* Mid Background (Fast Cityscape) */}
                  <g opacity="0.2" fill="var(--violet)">
                    <animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="6s" repeatCount="indefinite" />
                    <rect x="10" y="70" width="30" height="60" />
                    <rect x="50" y="90" width="40" height="40" />
                    <rect x="110" y="50" width="35" height="80" />
                    <rect x="180" y="75" width="25" height="55" />
                    <rect x="230" y="60" width="45" height="70" />
                  </g>

                  {/* The Road */}
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--border)" strokeWidth="3" />
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--muted)" strokeWidth="3" strokeDasharray="30 20">
                    <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.4s" repeatCount="indefinite" />
                  </line>

                  {/* Bouncing Car Body */}
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2.5; 0,0" dur="0.4s" repeatCount="indefinite" />
                    
                    {/* Main Chassis */}
                    <path d="M 65 110 L 60 85 L 95 65 L 160 65 L 190 85 L 210 85 Q 220 85 220 95 L 220 110 Z" fill="var(--surf2)" stroke="var(--teal)" strokeWidth="2.5" />
                    
                    {/* Window */}
                    <path d="M 98 68 L 155 68 L 180 85 L 85 85 Z" fill="#04060a" stroke="var(--teal)" strokeWidth="1.5" />
                    
                    {/* Window Reflection Details */}
                    <line x1="120" y1="68" x2="105" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                    <line x1="135" y1="68" x2="120" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />

                    {/* Taillight */}
                    <path d="M 60 90 L 65 90 L 65 100 L 60 100 Z" fill="#ff5f56" />
                    
                    {/* Headlight */}
                    <path d="M 210 92 L 220 92 L 220 102 L 210 102 Z" fill="#fff" />
                    
                    {/* Headlight Beam */}
                    <polygon points="220,92 290,75 290,115 220,102" fill="url(#headlight-beam)" />
                    
                    {/* Door Outline */}
                    <line x1="130" y1="85" x2="130" y2="110" stroke="var(--teal)" strokeWidth="1.5" opacity="0.5" />
                    <line x1="90" y1="85" x2="90" y2="110" stroke="var(--teal)" strokeWidth="1.5" opacity="0.5" />
                  </g>

                  {/* Independent Spinning Back Wheel */}
                  <g transform="translate(100, 115)">
                    <circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" />
                    <g>
                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" />
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="var(--violet)" strokeWidth="2" />
                      <line x1="0" y1="-14" x2="0" y2="14" stroke="var(--violet)" strokeWidth="2" />
                      <circle cx="0" cy="0" r="4" fill="var(--teal)" />
                    </g>
                  </g>

                  {/* Independent Spinning Front Wheel */}
                  <g transform="translate(180, 115)">
                    <circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" />
                    <g>
                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" />
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="var(--violet)" strokeWidth="2" />
                      <line x1="0" y1="-14" x2="0" y2="14" stroke="var(--violet)" strokeWidth="2" />
                      <circle cx="0" cy="0" r="4" fill="var(--teal)" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <div className="card c2" style={{padding: 0, justifyContent: 'center', background: 'transparent', border: 'none', boxShadow: 'none'}}>
              <div className="stats-row">
                <div className="stat-box"><div className="stat-num">13<span>+</span></div><div className="stat-lbl">Projects</div></div>
                <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                <div className="stat-box"><div className="stat-num">6<span>+</span></div><div className="stat-lbl">Hubs</div></div>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="card c3">
              <div className="lbl"><Github size={13}/>Live GitHub Data (@DWRSH)</div>
              {/* FIXED GITHUB STATS - Using Grid to prevent squishing and ensure proper wrapping */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '10px' }}>
                <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true&bg_color=00000000" alt="GitHub Stats" style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                <img src="https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true&background=00000000" alt="GitHub Streak" style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'var(--surf2)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                 <img src="https://ghchart.rshah.org/00d4b4/DWRSH" alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }}/>
              </div>
            </div>

            <div 
              className="card c1" 
              style={{minHeight: '210px'}}
              onMouseEnter={handlePlay}
              onMouseLeave={handlePause}
              onTouchStart={() => isPlaying ? handlePause() : handlePlay()}
            >
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
                <div className="music-info">
                  <div className="music-song">Lo-Fi Coding</div>
                  <div className="music-artist">Lofi Study</div>
                  <div className="hover-hint">{isPlaying ? 'Playing...' : 'Tap to Play'}</div>
                </div>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="card c2">
              <div className="lbl"><Layers size={13}/>Tech Stack</div>
              <div className="tech-marquee-wrapper">
                <div className="tm-track tm-left">
                  {MARQUEE_1.map((t, i) => (
                    <div className="ticon" title={t.name} key={`m1-${i}`}>
                      <img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/>
                    </div>
                  ))}
                </div>
                <div className="tm-track tm-right">
                  {MARQUEE_2.map((t, i) => (
                    <div className="ticon" title={t.name} key={`m2-${i}`}>
                      <img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/>
                    </div>
                  ))}
                </div>
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

            {/* ROW 4 */}
            <div className="card c1 mob-full">
              <div className="lbl"><BookOpen size={13}/>Latest Post</div>
              {loadingPost ? (
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="loading-pulse">Syncing latest feed...</span>
                </div>
              ) : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <div className="blog-meta">
                    <Link to={latestPost.link} className="read-pill">Read <ArrowRight size={11}/></Link>
                  </div>
                </>
              ) : (
                <p className="blog-desc">No posts found right now.</p>
              )}
            </div>

            <div className="card c1" style={{padding: 0}}>
              <div className="lbl" style={{padding: '16px 16px 0', position: 'absolute', zIndex: 10}}><MapPin size={13}/>Location</div>
              <a href="https://maps.google.com/?q=Surat,Gujarat,India" target="_blank" rel="noreferrer" className="map-link">
                <div className="map-wrap">
                  <iframe
                    src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"
                  />
                </div>
              </a>
            </div>

            <div className="card c2 cta-card">
              <p style={{fontFamily: 'Syne', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '12px'}}>
                Let's build <span style={{color: 'var(--teal)'}}>something great.</span>
              </p>
              <a href="mailto:contact@darshprajapati.dev" className="cta-btn"><Mail size={15}/> Get in Touch</a>
            </div>

          </div>{/* /bento */}
        </div>
      </div>
    </>
  );
}
