import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin, 
  Github, Layers, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Play, Pause
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. MEGA CSS ENGINE (Holographic Shaders & Magnetic Physics)
───────────────────────────────────────────────────────────────────────── */
const MEGA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Space+Mono:wght@400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
::selection { background: rgba(150, 194, 219, 0.5); color: #fff; }

body, html { 
  cursor: none !important; overflow-x: hidden; background: #020305; 
  -webkit-font-smoothing: antialiased; font-family: 'DM Sans', sans-serif;
  scroll-behavior: smooth;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #010102; }
::-webkit-scrollbar-thumb { background: rgba(150, 194, 219, 0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #96c2db; }

:root {
  --bg:          #020305;
  --surf:        rgba(11, 15, 24, 0.4);
  --surf2:       rgba(17, 22, 32, 0.6);
  --border:      rgba(255, 255, 255, 0.05);
  --border-h:    rgba(150, 194, 219, 0.5);
  
  --primary:     #96c2db; 
  --primary-dim: rgba(150, 194, 219, 0.15);
  --primary-glow:rgba(150, 194, 219, 0.4);
  --secondary:   #e5edf1; 
  
  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.5);
  
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --r:           24px;
}

/* ─────────────────────────────────────────────────────────────────────────
   CINEMATIC PERCENTAGE PRELOADER
───────────────────────────────────────────────────────────────────────── */
.preloader {
  position: fixed; inset: 0; z-index: 99999; background: var(--bg);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 1.2s cubic-bezier(0.77, 0, 0.175, 1);
}
.preloader.hidden { opacity: 0; pointer-events: none; }
.pl-counter { font-family: 'Space Mono', monospace; font-size: 8vw; font-weight: 700; color: var(--text); opacity: 0.1; position: absolute; }
.pl-brand { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; letter-spacing: 0.2em; z-index: 2; display: flex; gap: 8px; }
.pl-brand span { color: var(--primary); }
.pl-bar-container { width: 250px; height: 1px; background: rgba(255,255,255,0.1); margin-top: 30px; position: relative; overflow: hidden; }
.pl-bar-fill { position: absolute; left: 0; top: 0; height: 100%; background: var(--primary); width: 0%; box-shadow: 0 0 15px var(--primary); transition: width 0.1s linear; }

/* ─────────────────────────────────────────────────────────────────────────
   QUANTUM MAGNETIC CURSOR
───────────────────────────────────────────────────────────────────────── */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 4px; height: 4px; background: #fff; border-radius: 50%;
  pointer-events: none; z-index: 100000; transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 10px #fff; mix-blend-mode: difference;
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 1px solid rgba(150, 194, 219, 0.6); border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate3d(-50%, -50%, 0);
  transition: width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo), background 0.3s, border-color 0.3s;
}
.cursor-ring.hovering { width: 80px; height: 80px; background: rgba(150, 194, 219, 0.05); border-color: rgba(150, 194, 219, 0.2); backdrop-filter: blur(2px); }

/* ─────────────────────────────────────────────────────────────────────────
   DYNAMIC FILM GRAIN & QUANTUM CANVAS
───────────────────────────────────────────────────────────────────────── */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9990; opacity: 0.045;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E');
  animation: noiseShift 0.2s infinite steps(2);
}
@keyframes noiseShift { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }

.canvas-3d { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; mix-blend-mode: screen; }
.ambient-glow { position: fixed; width: 1000px; height: 1000px; border-radius: 50%; background: radial-gradient(circle, rgba(150, 194, 219, 0.05) 0%, transparent 60%); top: -500px; right: -300px; pointer-events: none; z-index: 0; animation: breathe 15s infinite alternate; }
@keyframes breathe { 100% { transform: scale(1.2) translate(-100px, 100px); } }

/* ─────────────────────────────────────────────────────────────────────────
   GLOBAL ARCHITECTURE
───────────────────────────────────────────────────────────────────────── */
.hp-body { position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; padding: 10vh 24px 80px; display: flex; flex-direction: column; gap: 8vh; transform-style: preserve-3d; }

/* ── SCRAMBLE HERO ── */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; transform-style: preserve-3d; }
.hero-pill { 
  display: inline-flex; align-items: center; gap: 10px; padding: 10px 24px; border-radius: 100px; 
  border: 1px solid rgba(150, 194, 219, 0.2); background: rgba(150, 194, 219, 0.03); color: var(--primary); 
  font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4vh; 
  backdrop-filter: blur(10px); width: fit-content; transform: translateZ(40px);
}
.hero-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 20px var(--primary); animation: pulse 2s infinite; }

.hero-name { 
  font-family: 'Syne', sans-serif; font-size: clamp(80px, 15vw, 220px); font-weight: 800; 
  line-height: 0.8; letter-spacing: -0.05em; margin-bottom: 5vh; position: relative;
  transform: translateZ(80px);
}
.hero-outline { 
  color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.2); 
  transition: all 0.6s var(--ease-out-expo); display: inline-block;
}
.hero-outline:hover { 
  color: var(--bg); -webkit-text-stroke: 2px var(--primary); 
  text-shadow: 10px 10px 0 rgba(150, 194, 219, 0.1), 20px 20px 0 rgba(150, 194, 219, 0.05); 
  transform: translateY(-10px) rotateX(15deg); 
}

.hero-bottom { display: flex; flex-direction: column; gap: 40px; transform: translateZ(50px); }
@media(min-width: 800px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: clamp(16px, 2vw, 20px); font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 600px; }
.hero-bio strong { color: #fff; font-weight: 500; }

.hbtn { display: inline-flex; align-items: center; gap: 12px; padding: 18px 36px; border-radius: 100px; font-size: 15px; font-weight: 700; position: relative; z-index: 1; transition: all 0.5s var(--ease-elastic); text-decoration: none; overflow: hidden; }
.hbtn-primary { background: var(--primary); color: #000; box-shadow: 0 10px 30px rgba(150, 194, 219, 0.15); }
.hbtn-primary:hover { box-shadow: 0 20px 50px rgba(150, 194, 219, 0.4); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
.hbtn-sec:hover { border-color: var(--primary); background: rgba(150, 194, 219, 0.05); color: var(--primary); box-shadow: 0 10px 40px rgba(0,0,0,0.6); }

/* ─────────────────────────────────────────────────────────────────────────
   IQ 300 BENTO GRID & HOLOGRAPHIC CARDS
───────────────────────────────────────────────────────────────────────── */
.global-grid { 
  display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; 
  gap: clamp(16px, 2vw, 24px); width: 100%; transform-style: preserve-3d; perspective: 2500px; 
}
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; }

@media(max-width: 1024px) { .global-grid { grid-template-columns: repeat(3, 1fr); } .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .global-grid { grid-template-columns: repeat(2, 1fr); } .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { .global-grid { grid-template-columns: repeat(1, 1fr); } .c1, .c2, .c3 { grid-column: span 1 !important; } }

/* Holographic Card Wrapper */
.holo-card {
  background: var(--surf); border-radius: var(--r); position: relative; display: flex; flex-direction: column;
  transform-style: preserve-3d; will-change: transform; transition: transform 0.1s linear;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
  backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
}
/* Holographic Animated Border Shader */
.holo-card::before {
  content: ''; position: absolute; inset: -1px; border-radius: calc(var(--r) + 1px);
  background: conic-gradient(from var(--angle), transparent 70%, rgba(150, 194, 219, 0.8), #fff);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  padding: 1px; pointer-events: none; opacity: 0; transition: opacity 0.5s;
}
.holo-card:hover::before { opacity: 1; animation: rotateHolo 4s linear infinite; }
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotateHolo { to { --angle: 360deg; } }

.card-glare { position: absolute; inset: 0; pointer-events: none; z-index: 10; opacity: 0; transition: opacity 0.4s; border-radius: inherit; mix-blend-mode: overlay; }
.holo-card:hover .card-glare { opacity: 1; }

/* True Parallax Inner Content */
.card-content {
  padding: clamp(20px, 3vw, 32px); display: flex; flex-direction: column; flex: 1; gap: 24px;
  position: relative; z-index: 20; transform: translateZ(50px); transform-style: preserve-3d;
}

.lbl { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); transform: translateZ(20px); text-shadow: 0 4px 10px rgba(0,0,0,0.8); }
.lbl svg { color: var(--primary); filter: drop-shadow(0 0 8px var(--primary-glow)); }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGETS STYLING (Unchanged Data, IQ 300 Visuals)
───────────────────────────────────────────────────────────────────────── */
/* SVG CAR */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 160px; position: relative; border-radius: var(--rsm); background: linear-gradient(180deg, transparent 0%, rgba(150, 194, 219, 0.05) 100%); overflow: hidden; transform: translateZ(30px); border: 1px solid rgba(255,255,255,0.02); }
.svg-scene { width: 100%; height: 100%; max-height: 160px; object-fit: contain; filter: drop-shadow(0 30px 30px rgba(0,0,0,0.9)); transform: translateZ(40px); }

/* STATS */
.stats-row { display: flex; flex: 1; width: 100%; background: rgba(0,0,0,0.5); border-radius: var(--rsm); overflow: hidden; border: 1px solid var(--border); transform: translateZ(20px); box-shadow: inset 0 5px 20px rgba(0,0,0,0.5); }
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 10px; text-align: center; border-right: 1px solid var(--border); position: relative; overflow: hidden; }
.stat-box::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at bottom, rgba(150, 194, 219, 0.15), transparent 60%); opacity: 0; transition: opacity 0.4s; }
.stat-box:hover::after { opacity: 1; }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(32px, 4vw, 48px); font-weight: 800; color: #fff; line-height: 1; transform: translateZ(10px); text-shadow: 0 10px 20px rgba(0,0,0,0.8); }
.stat-num span { color: var(--primary); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; transform: translateZ(5px); }

/* GITHUB */
.gh-wrap { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 10px; transform: translateZ(20px); }
.gh-img-box { width: 100%; background: rgba(0,0,0,0.4); border-radius: 12px; border: 1px solid var(--border); display: flex; overflow: hidden; box-shadow: inset 0 2px 15px rgba(0,0,0,0.5); transition: transform 0.4s; }
.gh-img-box:hover { transform: translateZ(15px); border-color: rgba(150, 194, 219, 0.2); }

/* MUSIC PLAYER */
.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 24px; position: relative; }
.player-controls { position: absolute; top: 0px; right: 0px; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #fff; border: 1px solid rgba(255,255,255,0.1); transition: all 0.5s var(--ease-elastic); transform: translateZ(40px); cursor: none; }
.player-controls:hover { background: var(--primary); color: #000; transform: translateZ(60px) scale(1.1); box-shadow: 0 10px 25px rgba(150, 194, 219, 0.4); }

.vinyl-container { position: relative; width: clamp(100px, 20vw, 130px); height: clamp(100px, 20vw, 130px); transform-style: preserve-3d; transform: translateZ(30px); }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: repeating-radial-gradient(#0a0a0a 0%, #1a1a1a 5%, #0a0a0a 10%); border: 4px solid #000; box-shadow: 0 25px 50px rgba(0,0,0,0.9), inset 0 0 15px rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; position: relative; }
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 35%; height: 35%; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #4a6f85); border: 2px solid #000; display: flex; align-items: center; justify-content: center; }
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; }
.tonearm { position: absolute; top: -15px; right: -25px; width: 50px; height: 90px; transform-origin: 80% 10%; transform: rotate(-35deg) translateZ(40px); transition: transform 0.6s var(--ease-elastic); filter: drop-shadow(10px 20px 15px rgba(0,0,0,0.9)); pointer-events: none; }
.tonearm.playing { transform: rotate(15deg) translateZ(40px); }

.music-info { text-align: center; transform: translateZ(25px); width: 100%; display: flex; flex-direction: column; align-items: center; }
.music-song { font-family: 'Syne', sans-serif; font-weight: 800; color: #fff; font-size: 18px; text-shadow: 0 4px 10px rgba(0,0,0,0.8); }
.visualizer-pro { display: flex; gap: 4px; height: 24px; align-items: flex-end; margin-top: 16px; opacity: 0.2; transition: opacity 0.5s; }
.visualizer-pro.active { opacity: 1; }
.vz-bar { width: 4px; background: var(--primary); border-radius: 2px; transform-origin: bottom; transform: scaleY(0.1); box-shadow: 0 0 10px var(--primary-glow); }
.visualizer-pro.active .vz-bar { animation: vzBounce 0.5s infinite alternate ease-in-out; }
.visualizer-pro.active .vz-bar:nth-child(1) { animation-duration: 0.4s; }
.visualizer-pro.active .vz-bar:nth-child(2) { animation-duration: 0.6s; }
.visualizer-pro.active .vz-bar:nth-child(3) { animation-duration: 0.5s; }
.visualizer-pro.active .vz-bar:nth-child(4) { animation-duration: 0.7s; }
.visualizer-pro.active .vz-bar:nth-child(5) { animation-duration: 0.45s; }
@keyframes vzBounce { 0% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }

/* MARQUEE */
.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 16px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); flex: 1; justify-content: center; transform: translateZ(20px); }
.tm-track { display: flex; width: max-content; gap: 16px; }
.tm-left { animation: scrollL 30s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 8px)); animation: scrollR 30s linear infinite; }
.ticon { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; transition: all 0.5s var(--ease-elastic); backdrop-filter: blur(10px); }
.ticon img { width: 30px; height: 30px; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.6)); transition: transform 0.3s; }
.inv { filter: invert(1) brightness(0.9); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 8px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* SOCIAL GRID */
.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; flex: 1; transform: translateZ(20px); }
.soc-item { background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; transition: all 0.5s var(--ease-elastic); text-decoration: none; color: inherit; position: relative; overflow: hidden; }
.soc-item::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(150, 194, 219, 0.15), transparent 70%); opacity: 0; transition: opacity 0.4s; }
.soc-item:hover::before { opacity: 1; }

/* BLOG */
.blog-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; line-height: 1.3; color: #fff; transform: translateZ(30px); }
.blog-desc { font-size: 14px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; transform: translateZ(20px); }
.read-pill { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 12px 24px; border-radius: 100px; text-decoration: none; transition: all .4s var(--ease); margin-top: auto; align-self: flex-start; transform: translateZ(40px); }
.read-pill:hover { background: var(--primary); color: #000; border-color: var(--primary); }

/* MAP */
.map-link { flex: 1; display: flex; flex-direction: column; text-decoration: none; border-radius: var(--rsm); overflow: hidden; min-height: 200px; position: relative; transform: translateZ(10px); border: 1px solid rgba(255,255,255,0.02); }
.map-wrap { width: 100%; height: 100%; position: absolute; inset: 0; pointer-events: none; }
.map-wrap iframe { width: 100%; height: 100%; border: 0; filter: invert(95%) hue-rotate(180deg) saturate(1.8) contrast(0.85); transition: filter 0.5s; }
.radar-ping { position: absolute; top: 50%; left: 50%; width: 12px; height: 12px; background: var(--primary); border-radius: 50%; transform: translate(-50%, -50%); z-index: 10; box-shadow: 0 0 20px var(--primary); }
.radar-ping::after { content: ''; position: absolute; inset: -20px; border: 2px solid var(--primary); border-radius: 50%; animation: radar 2.5s infinite cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes radar { 0% { transform: scale(0.1); opacity: 1; } 100% { transform: scale(4); opacity: 0; } }

/* CTA */
.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, 0.1) 0%, rgba(229, 237, 241, 0.02) 100%) !important; }
.cta-text { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 32px; transform: translateZ(40px); }
.cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 12px; background: var(--primary); color: #000; font-weight: 700; font-size: 16px; padding: 18px 36px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .4s var(--ease); transform: translateZ(50px); box-shadow: 0 15px 30px rgba(150, 194, 219, 0.2); }

@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; box-shadow: 0 0 20px var(--primary); } 100% { opacity: 0.5; } }
`;

/* ─────────────────────────────────────────────────────────────────────────
   2. UNTOUCHED DATA ARRAYS
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

const MARQUEE_1 = [...TECH_ROW_1, ...TECH_ROW_1, ...TECH_ROW_1];
const MARQUEE_2 = [...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',    handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'https://www.linkedin.com/in/darshprajapati15'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
];

/* ─────────────────────────────────────────────────────────────────────────
   3. IQ 300 REACT COMPONENTS (Physics & Math logic)
───────────────────────────────────────────────────────────────────────── */

/** 1. MAGNETIC PHYSICS WRAPPER */
const Magnetic = ({ children, className }) => {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Pull the element 20% towards the mouse
    ref.current.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 20px) scale(1.05)`;
  };
  const handleMouseLeave = () => {
    ref.current.style.transform = `translate3d(0px, 0px, 0px) scale(1)`;
  };
  return (
    <div ref={ref} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transition: 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)' }}>
      {children}
    </div>
  );
};

/** 2. QUANTUM CANVAS BACKGROUND (Advanced Math) */
const Canvas3D = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    let lastMouse = { x: width / 2, y: height / 2 };

    window.addEventListener('mousemove', (e) => { 
      mouse.vx = e.clientX - lastMouse.x; mouse.vy = e.clientY - lastMouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      lastMouse.x = e.clientX; lastMouse.y = e.clientY;
    });
    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

    class Particle {
      constructor() {
        this.x = (Math.random() - 0.5) * 5000;
        this.y = (Math.random() - 0.5) * 5000;
        this.z = Math.random() * 3000;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = 0; this.vy = 0;
      }
      update() {
        this.z -= 3; // Camera forward speed
        if (this.z <= 0) { this.z = 3000; this.x = (Math.random() - 0.5) * 5000; this.y = (Math.random() - 0.5) * 5000; }
        
        // Quantum Repulsion based on mouse velocity
        let fov = 500;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let dx = x2d - mouse.x; let dy = y2d - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 250) {
          let force = (250 - dist) / 250;
          this.vx += (dx / dist) * force * 1.5;
          this.vy += (dy / dist) * force * 1.5;
        }
        this.x += this.vx * (this.z / fov); this.y += this.vy * (this.z / fov);
        this.vx *= 0.92; this.vy *= 0.92; // Friction
      }
      draw() {
        let fov = 500;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let scale = fov / this.z;
        let opacity = Math.min(1, scale * 1.5);

        ctx.fillStyle = `rgba(150, 194, 219, ${opacity * 0.7})`;
        ctx.beginPath(); ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2); ctx.fill();

        // Neural Network Lines
        particles.forEach(p2 => {
          let p2x2d = (p2.x * fov) / p2.z + width / 2;
          let p2y2d = (p2.y * fov) / p2.z + height / 2;
          let dist2d = Math.hypot(x2d - p2x2d, y2d - p2y2d);
          if (dist2d < 120 * scale) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 194, 219, ${0.1 * opacity * (1 - dist2d/(120*scale))})`;
            ctx.lineWidth = 1;
            ctx.moveTo(x2d, y2d); ctx.lineTo(p2x2d, p2y2d); ctx.stroke();
          }
        });
      }
    }

    for (let i = 0; i < 200; i++) particles.push(new Particle());
    const animate = () => { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); };
    animate();
  }, []);
  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/** 3. HOLO TILT CARD (The Heart of 3D) */
const HoloCard = ({ children, className, style, ...props }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setMousePos({ x: -1000, y: -1000 });
  };

  const handleMouseEnter = () => {
    // Force cursor to turn into a ring on card hover
    document.querySelector('.cursor-ring')?.classList.add('hovering');
  };
  const handleMouseOut = () => {
    document.querySelector('.cursor-ring')?.classList.remove('hovering');
  };

  return (
    <div
      ref={cardRef}
      className={`holo-card ${className}`}
      style={{ ...style, transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => { handleMouseLeave(); handleMouseOut(); }}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <div className="card-glare" style={{ background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 50%)` }} />
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   4. THE MASTER HOMEPAGE
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  
  // Preloader States
  const [percent, setPercent] = useState(0);
  const [siteLoaded, setSiteLoaded] = useState(false);

  // Cinematic Intro Counter
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setSiteLoaded(true), 400); // Wait briefly at 100%
      }
      setPercent(current);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Fetch Blog
  useEffect(() => {
    async function fetchLatestBlog() {
      try {
        const response = await api.get('/blogs');
        if (response.data && response.data.length > 0) {
          const latest = response.data[0];
          setLatestPost({
            title: latest.title,
            desc: latest.desc || (latest.content ? latest.content.substring(0, 120) + '...' : 'Click to read this article.'),
            link: `/blog/${latest.slug || latest._id}`
          });
        }
      } catch (error) { console.error(error); } finally { setLoadingPost(false); }
    }
    fetchLatestBlog();
  }, []);

  const togglePlay = (e) => {
    if(audioRef.current) {
      if(isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
      else { audioRef.current.volume = 0.5; audioRef.current.play().catch(()=>{}); setIsPlaying(true); }
    }
  };

  return (
    <>
      <style>{MEGA_CSS}</style>

      {/* ── CINEMATIC PRELOADER ── */}
      <div className={`preloader-wrap ${siteLoaded ? 'hidden' : ''}`}>
        <div className="pl-bg-top" />
        <div className="pl-bg-bottom" />
        <div className="pl-content">
          <div className="pl-counter">{percent}%</div>
          <div className="pl-brand">
            <span className="pl-letter">D</span><span className="pl-letter">A</span><span className="pl-letter">R</span><span className="pl-letter">S</span><span className="pl-letter">H</span>
          </div>
          <div className="pl-bar-container"><div className="pl-bar-fill" style={{ width: `${percent}%` }} /></div>
        </div>
      </div>

      <div className="noise-overlay" />
      <div className="ambient-glow" />
      <CustomCursor />
      
      <div className="hp">
        <Canvas3D />

        <div className="hp-body" style={{ opacity: siteLoaded ? 1 : 0, transition: 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1) 0.8s' }}>
          
          <section className="hero">
            <div className="hero-pill interactable"><div className="hero-dot"/> Systems Online / Available</div>
            
            <h1 className="hero-name">
              <span className="hero-outline">DARSH</span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. Specialising in the <strong>MERN stack</strong> — bridging heavy-duty backends with pixel-perfect, physics-driven frontends.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Magnetic>
                  <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary">Download CV <Download size={18}/></a>
                </Magnetic>
                <Magnetic>
                  <Link to="/projects" className="hbtn hbtn-sec">Explore Work <ArrowRight size={18}/></Link>
                </Magnetic>
              </div>
            </div>
          </section>

          {/* ── IQ 300 HOLOGRAPHIC GRID ── */}
          <div className="global-grid">

            {/* CARD 1: NATIVE SVG CAR */}
            <HoloCard className="c2">
              <div className="lbl"><Gamepad2 size={14}/>Keep Moving</div>
              <div className="car-wrap">
                <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs><linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(150, 194, 219, 0.5)" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
                  
                  <g opacity="0.1" fill="var(--teal)"><animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="12s" repeatCount="indefinite" /><path d="M 20 120 L 20 60 L 50 60 L 50 120 Z" /><path d="M 70 120 L 70 40 L 110 40 L 110 120 Z" /><path d="M 150 120 L 150 80 L 190 80 L 190 120 Z" /></g>
                  <g opacity="0.2" fill="var(--violet)"><animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="6s" repeatCount="indefinite" /><rect x="10" y="70" width="30" height="60" /><rect x="50" y="90" width="40" height="40" /><rect x="110" y="50" width="35" height="80" /></g>
                  
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
                  
                  <g transform="translate(100, 115)"><circle cx="0" cy="0" r="15" fill="#020305" stroke="var(--secondary)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" /><line x1="-15" y1="0" x2="15" y2="0" stroke="var(--secondary)" strokeWidth="2" /><line x1="0" y1="-15" x2="0" y2="15" stroke="var(--secondary)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--primary)" /></g></g>
                  <g transform="translate(180, 115)"><circle cx="0" cy="0" r="15" fill="#020305" stroke="var(--secondary)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" /><line x1="-15" y1="0" x2="15" y2="0" stroke="var(--secondary)" strokeWidth="2" /><line x1="0" y1="-15" x2="0" y2="15" stroke="var(--secondary)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--primary)" /></g></g>
                </svg>
              </div>
            </HoloCard>

            {/* CARD 2: STATS */}
            <HoloCard className="c2" style={{background: 'transparent', border: 'none', boxShadow: 'none'}}>
              <div className="card-content" style={{padding: 0, justifyContent: 'center'}}>
                <div className="stats-row">
                  <div className="stat-box"><div className="stat-num">13<span>+</span></div><div className="stat-lbl">Projects</div></div>
                  <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                  <div className="stat-box"><div className="stat-num">6<span>+</span></div><div className="stat-lbl">Hubs</div></div>
                </div>
              </div>
            </HoloCard>

            {/* CARD 3: GITHUB DATA */}
            <HoloCard className="c3">
              <div className="lbl"><Github size={14}/>Live GitHub Data (@DWRSH)</div>
              <div className="gh-wrap">
                <div className="gh-img-box"><img src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" style={{ width: '100%', objectFit: 'contain', padding: '10px' }} /></div>
                <div className="gh-img-box"><img src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" style={{ width: '100%', objectFit: 'contain', padding: '10px' }} /></div>
              </div>
              <div className="gh-img-box" style={{ marginTop: '16px', padding: '16px', overflowX: 'auto' }}>
               <img src={`https://ghchart.rshah.org/96c2db/DWRSH?v=${Date.now()}`} alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }} />
              </div>
            </HoloCard>

            {/* CARD 4: MUSIC PLAYER */}
            <HoloCard className="c1" style={{minHeight: '240px'}} onClick={togglePlay}>
              <div className="lbl"><Headphones size={14}/>Vibes</div>
              <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
              <div className="music-player-wrap">
                <Magnetic className="player-controls">
                  {isPlaying ? <Pause fill="#fff" size={18}/> : <Play fill="#fff" size={18} style={{marginLeft: '2px'}}/>}
                </Magnetic>
                <div className="vinyl-container">
                  <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                    <div className="vinyl-label"><div className="vinyl-hole"/></div>
                  </div>
                  <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                    <circle cx="30" cy="10" r="8" fill="#333" stroke="#000" strokeWidth="2"/>
                    <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#aaa" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="2" y="65" width="12" height="15" rx="2" fill="#111" transform="rotate(25 8 72)"/>
                  </svg>
                </div>
                <div className="music-info">
                  <div className="music-song">Lo-Fi Coding</div>
                  <div className="music-artist">Lofi Study</div>
                  <div className={`visualizer-pro ${isPlaying ? 'active' : ''}`}>
                    <div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/>
                  </div>
                </div>
              </div>
            </HoloCard>

            {/* CARD 5: TECH STACK */}
            <HoloCard className="c2">
              <div className="lbl"><Layers size={14}/>Tech Stack</div>
              <div className="tech-marquee-wrapper">
                <div className="tm-track tm-left">
                  {MARQUEE_1.map((t, i) => (
                    <Magnetic key={`m1-${i}`}>
                      <div className="ticon" title={t.name}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                    </Magnetic>
                  ))}
                </div>
                <div className="tm-track tm-right">
                  {MARQUEE_2.map((t, i) => (
                    <Magnetic key={`m2-${i}`}>
                      <div className="ticon" title={t.name}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </HoloCard>

            {/* CARD 6: SOCIAL LINKS */}
            <HoloCard className="c2">
              <div className="lbl"><ExternalLink size={14}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <Magnetic key={s.name}>
                    <a className="soc-item" href={s.href} target="_blank" rel="noreferrer">
                      <span className="icon-text">{s.icon}</span>
                      <span style={{fontWeight: 700, fontSize: '14px', color: '#fff'}}>{s.name}</span>
                    </a>
                  </Magnetic>
                ))}
              </div>
            </HoloCard>

            {/* CARD 7: LATEST POST */}
            <HoloCard className="c1 mob-full">
              <div className="lbl"><BookOpen size={14}/>Latest Post</div>
              {loadingPost ? (
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="loading-pulse">Syncing matrix...</span>
                </div>
              ) : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <Magnetic>
                    <Link to={latestPost.link} className="read-pill">Read Article <ArrowRight size={14}/></Link>
                  </Magnetic>
                </>
              ) : (
                <p className="blog-desc">No data transmitted yet.</p>
              )}
            </HoloCard>

            {/* CARD 8: MAP */}
            <HoloCard className="c1" style={{padding: 0}}>
              <div className="card-content" style={{padding: 0, height: '100%', minHeight: '200px'}}>
                <div className="lbl" style={{padding: '24px 24px 0', position: 'absolute', zIndex: 10}}><MapPin size={14}/>Location</div>
                <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map-link">
                  <div className="map-wrap">
                    <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" allowFullScreen="" loading="lazy" title="Map" />
                    <div className="radar-ping"></div>
                  </div>
                </a>
              </div>
            </HoloCard>

            {/* CARD 9: GRAND CTA */}
            <HoloCard className="c2 cta-card">
              <div className="card-content" style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                <p className="cta-text">
                  Ready to build <span style={{color: 'var(--primary)'}}>something extraordinary?</span>
                </p>
                <Magnetic>
                  <a href="mailto:contact@darshprajapati.dev" className="cta-btn"><Mail size={18}/> Start a Project</a>
                </Magnetic>
              </div>
            </HoloCard>

          </div>
        </div>
      </div>
    </>
  );
}
