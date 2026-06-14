import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin, 
  Github, Layers, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Play, Pause, Activity
} from "lucide-react";
import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. MEGA CSS ENGINE (10X SPATIAL UI + FLUID PHYSICS)
───────────────────────────────────────────────────────────────────────── */
const MEGA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg:          #010203;
  --surf:        rgba(11, 15, 24, 0.4);
  --surf-solid:  #080b12;
  --border:      rgba(255, 255, 255, 0.05);
  --border-h:    rgba(150, 194, 219, 0.4);
  --primary:     #96c2db; 
  --primary-gl:  rgba(150, 194, 219, 0.3);
  --violet:      #e5edf1; 
  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.4);
  
  --ease-fluid:  cubic-bezier(0.25, 1, 0.25, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --r:           24px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body, html { cursor: none !important; background: var(--bg); color: var(--text); overflow-x: hidden; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
::selection { background: var(--primary); color: #000; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(150, 194, 219, 0.2); border-radius: 10px; }

/* ── CINEMATIC PRELOADER ── */
.loader-wrapper { position: fixed; inset: 0; background: #010203; z-index: 99999; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 30px; transition: opacity 0.8s var(--ease-fluid), transform 1s var(--ease-fluid); }
.loader-wrapper.hidden { opacity: 0; transform: scale(1.05); pointer-events: none; }
.loader-text { font-family: 'Space Mono', monospace; font-size: 14px; letter-spacing: 0.2em; color: var(--primary); display: flex; gap: 10px; overflow: hidden; }
.loader-text span { animation: decode 1.5s infinite; }
.loader-progress-container { width: 240px; height: 1px; background: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
.loader-progress { position: absolute; top: 0; left: 0; height: 100%; background: var(--primary); width: 0%; box-shadow: 0 0 10px var(--primary); animation: loadBar 2.5s var(--ease-fluid) forwards; }
@keyframes loadBar { 0% { width: 0%; } 40% { width: 30%; } 70% { width: 80%; } 100% { width: 100%; } }

/* ── STATE-AWARE MAGNETIC CURSOR ── */
.cursor-dot { position: fixed; width: 6px; height: 6px; background: var(--primary); border-radius: 50%; pointer-events: none; z-index: 100000; transform: translate3d(-50%, -50%, 0); box-shadow: 0 0 10px var(--primary); transition: width 0.3s, height 0.3s, background 0.3s; }
.cursor-ring { position: fixed; width: 40px; height: 40px; border: 1px solid var(--primary-gl); border-radius: 50%; pointer-events: none; z-index: 99999; transform: translate3d(-50%, -50%, 0); transition: width 0.4s var(--ease-bounce), height 0.4s var(--ease-bounce), background 0.3s, border 0.3s; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0; }
.cursor-ring span { opacity: 0; transition: opacity 0.2s; }

body.hovering-link .cursor-ring { width: 60px; height: 60px; background: rgba(150, 194, 219, 0.1); border-color: transparent; backdrop-filter: blur(2px); opacity: 1; }
body.hovering-play .cursor-ring { width: 80px; height: 80px; background: var(--primary); border-color: var(--primary); opacity: 1; }
body.hovering-play .cursor-ring span { opacity: 1; }
body.hovering-map .cursor-ring { width: 90px; height: 90px; background: #fff; border-color: #fff; opacity: 1; }
body.hovering-map .cursor-ring span { opacity: 1; }
body.hovering-link .cursor-dot { opacity: 0; }

/* ── NOISE & CANVAS ── */
.noise { position: fixed; inset: 0; z-index: 9990; opacity: 0.04; pointer-events: none; background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E'); }
.canvas-3d { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.8; mix-blend-mode: screen; }

/* ── LAYOUT ── */
.hp-body { position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; padding: 120px 24px 80px; display: flex; flex-direction: column; gap: 100px; }

/* ── HERO (10X KINETIC TYPOGRAPHY) ── */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; perspective: 1000px; }
.hero-pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; border-radius: 100px; border: 1px solid rgba(150, 194, 219, 0.2); background: rgba(150, 194, 219, 0.05); color: var(--primary); font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 30px; backdrop-filter: blur(10px); }
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); animation: pulse 2s infinite; }

.hero-name { font-family: 'Syne', sans-serif; font-size: clamp(60px, 14vw, 190px); font-weight: 800; line-height: 0.85; letter-spacing: -0.05em; margin-bottom: 40px; position: relative; text-transform: uppercase; }
.hero-name span { display: inline-block; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.2); transition: all 0.5s var(--ease-bounce); position: relative; cursor: default; }
.hero-name span:hover { color: var(--bg); -webkit-text-stroke: 1.5px var(--primary); transform: translateY(-15px) scale(1.05) rotate(2deg); text-shadow: 15px 20px 0 rgba(150, 194, 219, 0.15); z-index: 2; }

.hero-bottom { display: flex; flex-direction: column; gap: 40px; }
@media(min-width: 800px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 500px; }
.hero-bio strong { color: #fff; font-weight: 500; }

/* Magnetic Button */
.mag-btn-wrap { display: inline-block; position: relative; padding: 20px; margin: -20px; } /* Padding captures mouse early */
.mag-btn { display: inline-flex; align-items: center; gap: 12px; padding: 18px 36px; border-radius: 100px; font-size: 14px; font-weight: 700; transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.3s; text-decoration: none; position: relative; z-index: 1; pointer-events: none; }
.hbtn-primary { background: var(--primary); color: #000; box-shadow: 0 10px 30px rgba(150, 194, 219, 0.2); }
.mag-btn-wrap:hover .hbtn-primary { box-shadow: 0 20px 40px rgba(150, 194, 219, 0.4); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
.mag-btn-wrap:hover .hbtn-sec { border-color: var(--primary); background: rgba(150, 194, 219, 0.05); color: var(--primary); }

/* ── 3D BENTO GRID ── */
.bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; gap: 20px; width: 100%; perspective: 2500px; transform-style: preserve-3d; }
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; } .c4 { grid-column: span 4; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); gap: 16px; } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { .bento { grid-template-columns: repeat(1, 1fr); } .c1, .c2, .c3, .c4 { grid-column: span 1 !important; } }

/* Ultra Tilt Card */
.ultra-card {
  background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); 
  position: relative; display: flex; flex-direction: column;
  transform-style: preserve-3d; transition: border-color 0.4s, box-shadow 0.4s;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
}
.ultra-card:hover { border-color: var(--border-h); box-shadow: 0 30px 60px rgba(0,0,0,0.9), 0 0 50px rgba(150, 194, 219, 0.15); z-index: 20; }

.uc-glare { position: absolute; inset: 0; pointer-events: none; z-index: 20; opacity: 0; border-radius: inherit; mix-blend-mode: soft-light; transition: opacity 0.4s; }
.ultra-card:hover .uc-glare { opacity: 1; }

.uc-content { padding: 24px; display: flex; flex-direction: column; flex: 1; gap: 20px; position: relative; z-index: 2; transform: translateZ(40px); transform-style: preserve-3d; }
.lbl { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); transform: translateZ(10px); }
.lbl svg { color: var(--primary); }

/* WIDGET: SVG CAR */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 160px; position: relative; border-radius: var(--rsm); background: linear-gradient(180deg, transparent 20%, rgba(150, 194, 219, 0.05) 100%); overflow: hidden; transform: translateZ(20px); }
.svg-scene { width: 100%; height: 100%; max-height: 160px; object-fit: contain; filter: drop-shadow(0 30px 25px rgba(0,0,0,0.9)); transform: translateZ(30px); }

/* WIDGET: STATS (Count Up Engine) */
.stats-row { display: flex; flex: 1; width: 100%; background: var(--surf-solid); border-radius: var(--rsm); border: 1px solid var(--border); box-shadow: inset 0 5px 15px rgba(0,0,0,0.8); transform: translateZ(10px); overflow: hidden;}
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 10px; border-right: 1px solid var(--border); position: relative; }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(32px, 4vw, 48px); font-weight: 800; color: #fff; line-height: 1; }
.stat-num span { color: var(--primary); }
.stat-lbl { font-size: 10px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }

/* WIDGET: MUSIC PLAYER (10X Physics) */
.music-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 20px; position: relative; }
.vinyl-container { position: relative; width: 110px; height: 110px; transform-style: preserve-3d; transform: translateZ(30px); }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: repeating-radial-gradient(#0a0a0a 0px, #111 2px, #0a0a0a 4px); border: 4px solid #000; box-shadow: 0 15px 30px rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; transition: transform 0.3s; }
.vinyl-record::after { content:''; position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(transparent 0deg, rgba(255,255,255,0.1) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.1) 225deg, transparent 270deg); mix-blend-mode: overlay; pointer-events: none;}
.vinyl-record.playing { animation: spin 1.8s linear infinite; }
.vinyl-label { width: 35%; height: 35%; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #fff); border: 2px solid #000; box-shadow: inset 0 0 5px rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 2;}
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; }
.tonearm { position: absolute; top: -15px; right: -20px; width: 50px; height: 80px; transform-origin: 80% 10%; transform: rotate(-35deg) translateZ(40px); transition: transform 0.6s var(--ease-bounce); filter: drop-shadow(10px 15px 10px rgba(0,0,0,0.8)); z-index: 10; pointer-events: none; }
.tonearm.playing { transform: rotate(15deg) translateZ(40px); }

.audio-viz { display: flex; gap: 3px; height: 20px; align-items: flex-end; justify-content: center; opacity: 0.2; transition: opacity 0.5s; transform: translateZ(15px); }
.audio-viz.active { opacity: 1; }
.vz { width: 4px; background: var(--primary); border-radius: 2px; transform-origin: bottom; transform: scaleY(0.1); box-shadow: 0 0 10px var(--primary-gl); }
.audio-viz.active .vz { animation: eq 0.5s infinite alternate ease-in-out; }
.audio-viz.active .vz:nth-child(1) { animation-delay: 0.1s; animation-duration: 0.4s; }
.audio-viz.active .vz:nth-child(2) { animation-delay: 0.3s; animation-duration: 0.6s; }
.audio-viz.active .vz:nth-child(3) { animation-delay: 0.0s; animation-duration: 0.5s; }
.audio-viz.active .vz:nth-child(4) { animation-delay: 0.2s; animation-duration: 0.45s; }
.audio-viz.active .vz:nth-child(5) { animation-delay: 0.4s; animation-duration: 0.55s; }

/* WIDGET: MARQUEE */
.tech-mq { display: flex; flex-direction: column; gap: 16px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); flex: 1; justify-content: center; transform: translateZ(20px); }
.mq-track { display: flex; width: max-content; gap: 16px; }
.mq-left { animation: scrollL 25s linear infinite; }
.mq-right { transform: translateX(calc(-50% - 8px)); animation: scrollR 25s linear infinite; }
.tc { background: var(--surf-solid); border: 1px solid var(--border); border-radius: 16px; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; transition: all 0.4s var(--ease-bounce); }
.tc:hover { border-color: var(--primary); transform: translateY(-10px) translateZ(30px) scale(1.1); box-shadow: 0 15px 30px rgba(150, 194, 219, 0.2); z-index: 10; background: var(--surf); }
.tc img { width: 28px; height: 28px; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.8)); transition: transform 0.3s; }
.tc:hover img { transform: scale(1.1); }
.inv { filter: invert(1) brightness(0.9); }

/* WIDGET: SOCIALS */
.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; flex: 1; transform: translateZ(20px); }
.soc-item { background: var(--surf-solid); border: 1px solid var(--border); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: all 0.4s var(--ease-bounce); text-decoration: none; color: inherit; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5); }
.soc-item:hover { border-color: var(--primary); transform: translateY(-8px) translateZ(30px); box-shadow: 0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2); background: rgba(150, 194, 219, 0.05); }
.soc-item svg { transition: transform 0.4s var(--ease-bounce); }
.soc-item:hover svg { transform: scale(1.2) translateY(-2px); color: var(--primary); }

/* WIDGET: BLOG */
.blog-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; line-height: 1.3; color: #fff; transform: translateZ(15px); }
.blog-desc { font-size: 13.5px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; transform: translateZ(10px); }
.read-pill { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: #fff; background: var(--surf-solid); border: 1px solid var(--border); padding: 12px 24px; border-radius: 100px; text-decoration: none; transition: all 0.4s var(--ease-bounce); margin-top: auto; align-self: flex-start; transform: translateZ(20px); }
.read-pill:hover { background: var(--primary); color: #000; border-color: var(--primary); transform: translateY(-5px) translateZ(30px); box-shadow: 0 10px 25px rgba(150, 194, 219, 0.4); }

/* WIDGET: MAP SCANNER */
.map-link { flex: 1; border-radius: var(--rsm); overflow: hidden; position: relative; transform: translateZ(20px); border: 1px solid rgba(255,255,255,0.05); display: block; }
.map-link::after { content:''; position: absolute; top:-100%; left: 0; width: 100%; height: 20%; background: linear-gradient(to bottom, transparent, rgba(150, 194, 219, 0.4)); animation: scan 3s infinite linear; pointer-events: none; }
.map-link iframe { width: 100%; height: 100%; border: 0; filter: invert(100%) hue-rotate(180deg) saturate(2) contrast(0.9); transition: filter 0.5s; pointer-events: none; }
.radar-ping { position: absolute; top: 50%; left: 50%; width: 12px; height: 12px; background: var(--primary); border-radius: 50%; transform: translate(-50%, -50%); z-index: 10; box-shadow: 0 0 20px var(--primary); }
.radar-ping::after { content: ''; position: absolute; inset: -20px; border: 1.5px solid var(--primary); border-radius: 50%; animation: radar 2s infinite ease-out; }

/* CTA CARD */
.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, 0.08) 0%, transparent 100%) !important; border-color: rgba(150, 194, 219, 0.2) !important; }
.cta-text { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 24px; transform: translateZ(30px); text-shadow: 0 10px 20px rgba(0,0,0,0.5); }

/* KEYFRAMES */
@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes eq { 0% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }
@keyframes scrollL { to { transform: translateX(calc(-50% - 8px)); } }
@keyframes scrollR { to { transform: translateX(0); } }
@keyframes scan { 100% { top: 200%; } }
@keyframes radar { 0% { transform: scale(0.1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }

/* REVEAL */
@keyframes revealUp { from { opacity: 0; transform: translateY(80px) translateZ(-100px) rotateX(15deg); } to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); } }
.r1 { opacity: 0; animation: revealUp 1.2s var(--ease-fluid) 0.8s forwards; }
.r2 { opacity: 0; animation: revealUp 1.2s var(--ease-fluid) 0.9s forwards; }
.r3 { opacity: 0; animation: revealUp 1.2s var(--ease-fluid) 1.0s forwards; }
.r5 { opacity: 0; animation: revealUp 1.5s var(--ease-fluid) 1.2s forwards; }
@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; box-shadow: 0 0 15px var(--primary); } 100% { opacity: 0.5; } }
`;

/* ─────────────────────────────────────────────────────────────────────────
   2. DATA (UNCHANGED)
───────────────────────────────────────────────────────────────────────── */
const TECH_ROW_1 = [
  {name:'React',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Node JS',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'MongoDB',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'},
  {name:'Python',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'FastAPI',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'},
  {name:'HTML5',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'}
];
const TECH_ROW_2 = [
  {name:'JavaScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'TypeScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'GitHub',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',inv:true},
  {name:'Tailwind', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
  {name:'AWS',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',inv:true}
];
const MARQUEE_1 = [...TECH_ROW_1, ...TECH_ROW_1, ...TECH_ROW_1];
const MARQUEE_2 = [...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2];
const SOCIALS = [
  {icon:'🐙', name:'GitHub',    handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'https://www.linkedin.com/in/darshprajapati15'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
];

/* ─────────────────────────────────────────────────────────────────────────
   3. PHYSICS & ENGINE COMPONENTS
───────────────────────────────────────────────────────────────────────── */

/** Context-Aware Cursor */
const MagneticCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if(dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if(ringRef.current) ringRef.current.animate({ transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)` }, { duration: 600, fill: "forwards", easing: "ease-out" });
    };
    
    // Check elements under cursor for context
    const checkHover = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if(!el) return;
      document.body.classList.remove('hovering-link', 'hovering-play', 'hovering-map');
      if(textRef.current) textRef.current.innerText = "";

      if(el.closest('.interactable') || el.closest('a') || el.closest('button')) {
        document.body.classList.add('hovering-link');
      } else if(el.closest('.music-trigger')) {
        document.body.classList.add('hovering-play');
        if(textRef.current) textRef.current.innerText = "PLAY";
      } else if(el.closest('.map-link')) {
        document.body.classList.add('hovering-map');
        if(textRef.current) textRef.current.innerText = "VIEW";
      }
    };

    window.addEventListener("mousemove", (e) => { onMove(e); checkHover(e); });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring"><span ref={textRef}></span></div></>
  );
};

/** Neural Interactive WebGL-Lite Canvas */
const NeuralCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth; let h = canvas.height = window.innerHeight;
    let particles = []; let mouse = { x: w/2, y: h/2 }; let clickWave = { r: 0, x: -100, y: -100, active: false };

    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('click', e => { clickWave = { r: 0, x: e.clientX, y: e.clientY, active: true }; });
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    class P {
      constructor() {
        this.x = (Math.random() - 0.5) * 4000; this.y = (Math.random() - 0.5) * 4000; this.z = Math.random() * 3000;
        this.vx = 0; this.vy = 0; this.size = Math.random() * 2 + 0.5;
      }
      update() {
        this.z -= 2; if(this.z <= 0) { this.z = 3000; this.x = (Math.random()-0.5)*4000; this.y = (Math.random()-0.5)*4000; }
        
        let fov = 400; let x2 = (this.x * fov)/this.z + w/2; let y2 = (this.y * fov)/this.z + h/2;
        
        // Repulsion
        let dx = x2 - mouse.x; let dy = y2 - mouse.y; let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 250) { this.vx += (dx/dist) * 0.4; this.vy += (dy/dist) * 0.4; }
        
        // Click Shockwave
        if(clickWave.active) {
          let cx = x2 - clickWave.x; let cy = y2 - clickWave.y; let cd = Math.sqrt(cx*cx + cy*cy);
          if(Math.abs(cd - clickWave.r) < 30) { this.vx += (cx/cd)*3; this.vy += (cy/cd)*3; }
        }
        
        this.x += this.vx; this.y += this.vy; this.vx *= 0.92; this.vy *= 0.92;
      }
      draw() {
        let fov = 400; let scale = fov/this.z; let x2 = (this.x * fov)/this.z + w/2; let y2 = (this.y * fov)/this.z + h/2;
        let op = Math.min(1, scale * 1.5);
        ctx.fillStyle = `rgba(150, 194, 219, ${op * 0.6})`;
        ctx.beginPath(); ctx.arc(x2, y2, this.size * scale, 0, Math.PI*2); ctx.fill();

        // Lines
        particles.forEach(p2 => {
          let p2x2 = (p2.x*fov)/p2.z + w/2; let p2y2 = (p2.y*fov)/p2.z + h/2;
          let d = Math.sqrt((x2-p2x2)**2 + (y2-p2y2)**2);
          if(d < 120 * scale) {
            ctx.strokeStyle = `rgba(150, 194, 219, ${0.15 * op * (1 - d/(120*scale))})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(p2x2, p2y2); ctx.stroke();
          }
        });
      }
    }
    for(let i=0; i<300; i++) particles.push(new P());

    const anim = () => {
      ctx.clearRect(0,0,w,h);
      if(clickWave.active) {
        clickWave.r += 15;
        ctx.strokeStyle = `rgba(150, 194, 219, ${1 - clickWave.r/800})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(clickWave.x, clickWave.y, clickWave.r, 0, Math.PI*2); ctx.stroke();
        if(clickWave.r > 800) clickWave.active = false;
      }
      particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(anim);
    }; anim();
  }, []);
  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/** Magnetic Button Wrapper */
const MagneticBtn = ({ children }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current; const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) * 0.4;
    const y = (e.clientY - rect.top - rect.height/2) * 0.4;
    el.children[0].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const handleLeave = () => { ref.current.children[0].style.transform = `translate3d(0, 0, 0)`; };
  return <div className="mag-btn-wrap" ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>{children}</div>;
};

/** The Ultra 3D Card (Multi-layer Glass + Dynamic Light) */
const UltraCard = ({ children, className, style, onClick, ...props }) => {
  const ref = useRef(null);
  const [tr, setTr] = useState("perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  const [gl, setGl] = useState({ x: -1000, y: -1000, a: 0 });

  const onMove = (e) => {
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left; const y = e.clientY - r.top;
    const cx = r.width/2; const cy = r.height/2;
    const rx = ((y - cy) / cy) * -12; // Intense Tilt
    const ry = ((x - cx) / cx) * 12;
    const a = Math.atan2(y - cy, x - cx) * (180/Math.PI);
    
    setTr(`perspective(1500px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`);
    setGl({ x, y, a });
  };
  const onLeave = () => { setTr("perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"); setGl(p => ({...p, x: -1000})); };

  return (
    <div ref={ref} className={`ultra-card ${className}`} style={{ ...style, transform: tr }} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} {...props}>
      <div className="uc-glare" style={{ background: `linear-gradient(${gl.a}deg, rgba(255,255,255,0.1) 0%, transparent 80%)` }} />
      <div className="uc-glare" style={{ background: `radial-gradient(800px circle at ${gl.x}px ${gl.y}px, rgba(150, 194, 219, 0.15), transparent 50%)`, mixBlendMode: 'color-dodge' }} />
      <div className="uc-content">{children}</div>
    </div>
  );
};

/** Number CountUp Engine */
const CountUp = ({ end, duration = 2000 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if(!start) start = ts; const prog = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const ease = prog === 1 ? 1 : 1 - Math.pow(2, -10 * prog);
      setVal(Math.floor(ease * end));
      if(prog < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <>{val}</>;
};

/* ─────────────────────────────────────────────────────────────────────────
   4. THE MASTER HOMEPAGE ASSEMBLY
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => { setTimeout(() => setLoaded(true), 2800); }, []);

  useEffect(() => {
    api.get('/blogs').then(res => {
      if(res.data && res.data.length > 0) {
        setLatestPost({ title: res.data[0].title, desc: res.data[0].desc || res.data[0].content?.substring(0,100)+'...', link: `/blog/${res.data[0].slug || res.data[0]._id}`});
      }
    }).catch(console.error).finally(()=>setLoadingPost(false));
  }, []);

  const toggleMusic = () => {
    if(!audioRef.current) return;
    if(isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.volume = 0.5; audioRef.current.play().catch(()=>{}); setIsPlaying(true); }
  };

  return (
    <>
      <style>{MEGA_CSS}</style>

      {/* Cinematic Loading */}
      <div className={`loader-wrapper ${loaded ? 'hidden' : ''}`}>
        <div className="loader-text">
          <span>S</span><span>Y</span><span>S</span><span>T</span><span>E</span><span>M</span>
          &nbsp;
          <span>I</span><span>N</span><span>I</span><span>T</span>
        </div>
        <div className="loader-progress-container"><div className="loader-progress"/></div>
      </div>

      <MagneticCursor />
      <div className="noise" />
      <NeuralCanvas />

      <div className="hp">
        <div className="hp-body" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s 0.5s' }}>
          
          <section className="hero">
            <div className="hero-pill r1"><div className="hero-dot"/> Available for New Projects</div>
            
            <h1 className="hero-name r2">
              {"DARSH".split('').map((l,i) => <span key={i} style={{transitionDelay: \`\${i*0.05}s\`}}>{l}</span>)}
            </h1>

            <div className="hero-bottom r3">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. Specialising in the <strong>MERN stack</strong> — bridging heavy-duty backends with pixel-perfect 3D frontends.
              </p>
              <div className="hero-btns">
                <MagneticBtn><a href="/Darsh_resume.pdf" className="hbtn hbtn-primary interactable">Download CV <Download size={18}/></a></MagneticBtn>
                <MagneticBtn><Link to="/projects" className="hbtn hbtn-sec interactable">Explore Work <ArrowRight size={18}/></Link></MagneticBtn>
              </div>
            </div>
          </section>

          <div className="bento r5">

            {/* 1. CAR SVG */}
            <UltraCard className="c2">
              <div className="lbl"><Gamepad2 size={13}/>Keep Moving</div>
              <div className="car-wrap">
                <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(150, 194, 219, 0.5)"/><stop offset="100%" stopColor="transparent"/></linearGradient>
                  </defs>
                  <g opacity="0.1" fill="var(--teal)"><animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="10s" repeatCount="indefinite" /><rect x="20" y="60" width="40" height="90"/><rect x="120" y="40" width="50" height="110"/></g>
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--border)" strokeWidth="3" />
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--muted)" strokeWidth="3" strokeDasharray="30 20"><animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.3s" repeatCount="indefinite" /></line>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.5s" repeatCount="indefinite" />
                    <path d="M 65 110 L 60 85 L 95 65 L 160 65 L 190 85 L 210 85 Q 220 85 220 95 L 220 110 Z" fill="var(--surf-solid)" stroke="var(--teal)" strokeWidth="2.5" />
                    <path d="M 98 68 L 155 68 L 180 85 L 85 85 Z" fill="#010203" stroke="var(--teal)" strokeWidth="1.5" />
                    <line x1="120" y1="68" x2="105" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                    <path d="M 60 90 L 65 90 L 65 100 L 60 100 Z" fill="#ff4747" />
                    <polygon points="220,92 300,70 300,115 220,102" fill="url(#hl)" />
                  </g>
                  <g transform="translate(100, 115)"><circle cx="0" cy="0" r="15" fill="#010203" stroke="var(--violet)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.3s" repeatCount="indefinite" /><line x1="-15" y1="0" x2="15" y2="0" stroke="var(--violet)" strokeWidth="2"/><circle cx="0" cy="0" r="4" fill="var(--teal)"/></g></g>
                  <g transform="translate(180, 115)"><circle cx="0" cy="0" r="15" fill="#010203" stroke="var(--violet)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.3s" repeatCount="indefinite" /><line x1="-15" y1="0" x2="15" y2="0" stroke="var(--violet)" strokeWidth="2"/><circle cx="0" cy="0" r="4" fill="var(--teal)"/></g></g>
                </svg>
              </div>
            </UltraCard>

            {/* 2. STATS */}
            <UltraCard className="c2" style={{padding:0}}>
              <div className="stats-row">
                <div className="stat-box"><div className="stat-num"><CountUp end={13}/><span>+</span></div><div className="stat-lbl">Projects</div></div>
                <div className="stat-box"><div className="stat-num"><CountUp end={2}/><span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                <div className="stat-box"><div className="stat-num"><CountUp end={6}/><span>+</span></div><div className="stat-lbl">Hubs</div></div>
              </div>
            </UltraCard>

            {/* 3. GITHUB */}
            <UltraCard className="c3">
              <div className="lbl"><Github size={13}/>Live GitHub Data (@DWRSH)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '10px', transform:'translateZ(10px)' }}>
                <img src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" style={{ width: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                <img src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" style={{ width: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', transform:'translateZ(20px)' }}>
               <img src={`https://ghchart.rshah.org/96c2db/DWRSH?v=${Date.now()}`} alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }} />
              </div>
            </UltraCard>

            {/* 4. MUSIC PLAYER */}
            <UltraCard className="c1 music-trigger" onClick={toggleMusic} style={{minHeight: '220px', cursor:'none'}}>
              <div className="lbl"><Headphones size={13}/>Vibes</div>
              <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
              <div className="music-wrap">
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
                  <div className={`audio-viz ${isPlaying ? 'active' : ''}`}><div className="vz"/><div className="vz"/><div className="vz"/><div className="vz"/><div className="vz"/></div>
                </div>
              </div>
            </UltraCard>

            {/* 5. TECH MARQUEE */}
            <UltraCard className="c2">
              <div className="lbl"><Layers size={13}/>Tech Stack</div>
              <div className="tech-mq">
                <div className="mq-track mq-left">
                  {MARQUEE_1.map((t, i) => (<div className="tc interactable" key={`m1-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>))}
                </div>
                <div className="mq-track mq-right">
                  {MARQUEE_2.map((t, i) => (<div className="tc interactable" key={`m2-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>))}
                </div>
              </div>
            </UltraCard>

            {/* 6. SOCIALS */}
            <UltraCard className="c2">
              <div className="lbl"><ExternalLink size={13}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item interactable" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{fontSize: '28px'}}>{s.icon}</span>
                    <span style={{fontWeight: 700, fontSize: '14px'}}>{s.name}</span>
                  </a>
                ))}
              </div>
            </UltraCard>

            {/* 7. BLOG */}
            <UltraCard className="c1 mob-full">
              <div className="lbl"><BookOpen size={13}/>Latest Post</div>
              {loadingPost ? <span className="loading-pulse">Syncing...</span> : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <Link to={latestPost.link} className="read-pill interactable">Read Article <ArrowRight size={12}/></Link>
                </>
              ) : <p className="blog-desc">No posts yet.</p>}
            </UltraCard>

            {/* 8. MAP WITH RADAR */}
            <UltraCard className="c1 map-link" style={{padding:0}}>
              <div className="uc-content" style={{padding:0, height:'100%', minHeight:'200px'}}>
                <div className="lbl" style={{padding: '24px', position: 'absolute', zIndex: 10}}><MapPin size={13}/>Location</div>
                <div className="map-wrap">
                  <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" allowFullScreen="" loading="lazy" title="Map" />
                  <div className="radar-ping"></div>
                </div>
              </div>
            </UltraCard>

            {/* 9. GRAND CTA */}
            <UltraCard className="c2 cta-card">
              <p className="cta-text">Let's build <span style={{color: 'var(--primary)'}}>something great.</span></p>
              <MagneticBtn><a href="mailto:contact@darshprajapati.dev" className="cta-btn interactable"><Mail size={16}/> Get in Touch</a></MagneticBtn>
            </UltraCard>

          </div>
        </div>
      </div>
    </>
  );
}
