import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin, 
  Github, Layers, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Activity
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. MEGA CSS (Award-Winning Layout + Micro-Interactions)
───────────────────────────────────────────────────────────────────────── */
const MEGA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

/* Basic Resets */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body, html { cursor: none !important; overflow-x: hidden; background: #020305; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #020305; }
::-webkit-scrollbar-thumb { background: rgba(150, 194, 219, 0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(150, 194, 219, 0.6); }

:root {
  --bg:          #020305;
  --surf:        #0b0f18;
  --surf2:       #111620;
  --border:      rgba(255, 255, 255, 0.08);
  --border-h:    rgba(150, 194, 219, 0.35);
  
  /* Blue-Grey Theme */
  --teal:        #96c2db; 
  --teal-dim:    rgba(150, 194, 219, 0.12);
  --teal-glow:   rgba(150, 194, 219, 0.25);
  --violet:      #e5edf1; /* Light Blue-Grey */
  
  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.45);
  --muted2:      rgba(255, 255, 255, 0.25);
  --ease:        cubic-bezier(0.16, 1, 0.3, 1);
  --r:           24px;
  --rsm:         14px;
}

/* ─────────────────────────────────────────────────────────────────────────
   PRELOADER
───────────────────────────────────────────────────────────────────────── */
.preloader {
  position: fixed; inset: 0; z-index: 99999; background: var(--bg);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px;
  transition: opacity 0.8s var(--ease), visibility 0.8s;
}
.preloader.hidden { opacity: 0; visibility: hidden; }
.loader-brand { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px; }
.loader-brand span { color: var(--teal); }
.loader-bar { width: 200px; height: 2px; background: var(--border); border-radius: 4px; overflow: hidden; position: relative; }
.loader-progress { position: absolute; top: 0; left: 0; height: 100%; background: var(--teal); width: 0%; animation: loadProgress 2s cubic-bezier(0.85, 0, 0.15, 1) forwards; }
@keyframes loadProgress { 0% { width: 0%; } 50% { width: 60%; } 100% { width: 100%; } }

/* ─────────────────────────────────────────────────────────────────────────
   MAGNETIC CURSOR
───────────────────────────────────────────────────────────────────────── */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: var(--teal); border-radius: 50%;
  pointer-events: none; z-index: 10000; transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 12px var(--teal); mix-blend-mode: screen; transition: opacity 0.2s;
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1.5px solid rgba(150, 194, 219, 0.5); border-radius: 50%;
  pointer-events: none; z-index: 9999; transform: translate3d(-50%, -50%, 0);
  transition: width 0.3s var(--ease), height 0.3s var(--ease), background 0.3s var(--ease);
}
a:hover ~ .cursor-ring, button:hover ~ .cursor-ring, .interactable:hover ~ .cursor-ring {
  width: 60px; height: 60px; background: rgba(150, 194, 219, 0.1); border-color: transparent;
}

/* NOISE & CANVAS */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9998; opacity: 0.04;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E');
}
.canvas-3d { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; opacity: 0.6; }

/* ─────────────────────────────────────────────────────────────────────────
   MAIN PAGE ARCHITECTURE
───────────────────────────────────────────────────────────────────────── */
.hp { font-family: 'DM Sans', sans-serif; color: var(--text); min-height: 100vh; position: relative; perspective: 1200px; }
.hp-body { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 120px 24px 80px; display: flex; flex-direction: column; gap: 60px; transform-style: preserve-3d; }

/* ── HERO SECTION ── */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; transform-style: preserve-3d; }
.hero-pill { 
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 100px; 
  border: 1px solid rgba(150, 194, 219, 0.3); background: rgba(150, 194, 219, 0.05); color: var(--teal); 
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px; 
  backdrop-filter: blur(12px); width: fit-content; transform: translateZ(20px);
}
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 10px var(--teal); animation: pulse 2s infinite; }

.hero-name { 
  font-family: 'Syne', sans-serif; font-size: clamp(60px, 12vw, 168px); font-weight: 800; 
  line-height: 0.85; letter-spacing: -0.04em; margin-bottom: 40px; position: relative;
  transform: translateZ(40px);
}
.hero-outline { 
  color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.15); 
  transition: all 0.5s var(--ease); 
}
.hero-outline:hover { 
  color: var(--bg); -webkit-text-stroke: 1.5px var(--teal); 
  text-shadow: 10px 10px 0 rgba(150, 194, 219, 0.1), 20px 20px 0 rgba(150, 194, 219, 0.05); 
  transform: translateY(-5px); display: inline-block;
}

.hero-bottom { display: flex; flex-direction: column; gap: 32px; transform: translateZ(30px); }
@media(min-width: 800px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 17px; font-weight: 300; line-height: 1.65; color: var(--muted); max-width: 480px; }
.hero-bio strong { color: #fff; font-weight: 500; }

.hbtn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; border-radius: 100px; font-size: 14.5px; font-weight: 600; position: relative; z-index: 1; transition: all 0.4s var(--ease); text-decoration: none; }
.hbtn-primary { background: var(--teal); color: #04060a; box-shadow: 0 10px 25px rgba(150, 194, 219, 0.2); }
.hbtn-primary:hover { box-shadow: 0 15px 35px rgba(150, 194, 219, 0.4); transform: translateY(-4px) translateZ(10px); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
.hbtn-sec:hover { border-color: var(--teal); transform: translateY(-4px) translateZ(10px); background: rgba(150, 194, 219, 0.05); color: var(--teal); }

/* ─────────────────────────────────────────────────────────────────────────
   THE FIXED 3D BENTO GRID & TILT CARDS
───────────────────────────────────────────────────────────────────────── */
.bento { 
  display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; 
  gap: clamp(16px, 2vw, 24px); width: 100%; transform-style: preserve-3d; perspective: 1500px; 
}
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; } .c4 { grid-column: span 4; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { 
  .hp-body { padding: 80px 16px 48px; gap: 40px; }
  .bento { grid-template-columns: repeat(2, 1fr); gap: 16px; } 
  .c1 { grid-column: span 1; } 
  .c2, .c3, .c4 { grid-column: span 2; } 
  .mob-full { grid-column: span 2 !important; }
}

/* TILT WRAPPER - Perfect Flex Layout */
.tilt-wrapper {
  background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); 
  position: relative; display: flex; flex-direction: column; overflow: hidden;
  transform-style: preserve-3d; transition: border-color 0.4s, box-shadow 0.4s;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
  will-change: transform;
}
.tilt-wrapper:hover {
  border-color: var(--border-h);
  box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(150, 194, 219, 0.1);
  z-index: 20;
}

/* Spotlight & Glare */
.card-spotlight, .card-glare { position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.4s; border-radius: inherit; }
.tilt-wrapper:hover .card-spotlight, .tilt-wrapper:hover .card-glare { opacity: 1; }

/* Content Box */
.card-content {
  padding: clamp(16px, 3vw, 24px); display: flex; flex-direction: column; flex: 1; gap: 16px;
  position: relative; z-index: 2; transform: translateZ(30px); transform-style: preserve-3d;
}

.lbl { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.lbl svg { color: var(--teal); }

/* ── ORIGINAL WIDGET 1: CAR SVG ── */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 140px; position: relative; border-radius: var(--rsm); background: linear-gradient(to bottom, transparent 30%, rgba(150, 194, 219, 0.04) 100%); overflow: hidden; transform: translateZ(10px); }
.svg-scene { width: 100%; height: 100%; max-height: 150px; object-fit: contain; filter: drop-shadow(0 15px 20px rgba(0,0,0,0.5)); }

/* ── ORIGINAL WIDGET 2: STATS ── */
.stats-row { display: flex; flex: 1; width: 100%; background: var(--surf2); border-radius: var(--rsm); overflow: hidden; border: 1px solid var(--border); }
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 8px; text-align: center; border-right: 1px solid var(--border); transition: background 0.3s; }
.stat-box:hover { background: rgba(150, 194, 219, 0.05); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 800; color: #fff; line-height: 1; }
.stat-num span { color: var(--teal); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: 0.07em; }

/* ── ORIGINAL WIDGET 3: MUSIC PLAYER (Now with Visualizer) ── */
.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 16px; cursor: pointer; }
.vinyl-container { position: relative; width: clamp(70px, 20vw, 90px); height: clamp(70px, 20vw, 90px); transform-style: preserve-3d; }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: radial-gradient(circle, #000 30%, #1a1a1a 40%, #000 50%, #1a1a1a 60%, #000 70%, #1a1a1a 80%, #000 90%); border: 3px solid #333; box-shadow: 0 10px 20px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; transition: transform 0.3s var(--ease); }
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 34%; height: 34%; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--violet)); border: 2px solid #111; display: flex; align-items: center; justify-content: center; }
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; }
.tonearm { position: absolute; top: -10px; right: -15px; width: 35px; height: 60px; transform-origin: top right; transform: rotate(-35deg) translateZ(10px); transition: transform 0.4s var(--ease); filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5)); z-index: 5; }
.tonearm.playing { transform: rotate(10deg) translateZ(10px); }

/* Audio Visualizer Effect */
.visualizer { display: flex; gap: 3px; height: 12px; align-items: flex-end; margin-top: 6px; justify-content: center; opacity: 0; transition: opacity 0.3s; }
.visualizer.active { opacity: 1; }
.vz-bar { width: 3px; background: var(--teal); border-radius: 2px; animation: bounceBar 1s infinite alternate ease-in-out; }
.vz-bar:nth-child(1) { height: 4px; animation-delay: 0.1s; }
.vz-bar:nth-child(2) { height: 12px; animation-delay: 0.3s; }
.vz-bar:nth-child(3) { height: 8px; animation-delay: 0.0s; }
.vz-bar:nth-child(4) { height: 10px; animation-delay: 0.2s; }
@keyframes bounceBar { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }

/* ── ORIGINAL WIDGET 4: MARQUEE ── */
.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 14px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); flex: 1; justify-content: center; transform: translateZ(15px); }
.tm-track { display: flex; width: max-content; gap: 14px; }
.tm-left { animation: scrollL 25s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 7px)); animation: scrollR 25s linear infinite; }
.ticon { background: var(--surf2); border: 1px solid var(--border); border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; transition: all .3s; flex-shrink: 0; }
.ticon:hover { border-color: var(--teal); transform: translateY(-5px) translateZ(15px); box-shadow: 0 10px 20px rgba(150, 194, 219, 0.2); }
.ticon img { width: 22px; height: 22px; object-fit: contain; }
.inv { filter: invert(1) brightness(0.9); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 7px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* ── ORIGINAL WIDGET 5: SOCIAL GRID ── */
.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; flex: 1; }
.soc-item { background: var(--surf2); border: 1px solid var(--border); border-radius: var(--rsm); padding: 14px; display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: inherit; transition: all .25s var(--ease); }
.soc-item:hover { border-color: var(--teal); background: rgba(150, 194, 219, 0.05); transform: translateY(-4px) translateZ(15px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }

/* ── ORIGINAL WIDGET 6: BLOG ── */
.blog-title { font-family: 'Syne', sans-serif; font-size: 15.5px; font-weight: 700; line-height: 1.4; color: #fff; }
.blog-desc { font-size: 12.5px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 10px; }
.blog-meta { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.read-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: var(--teal); background: var(--teal-dim); border: 1px solid rgba(150, 194, 219, .2); padding: 6px 14px; border-radius: 100px; text-decoration: none; transition: all .2s; }
.read-pill:hover { background: var(--teal); color: #000; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(150, 194, 219, 0.3); }

/* ── ORIGINAL WIDGET 7: MAP (Now with Radar Ping) ── */
.map-link { flex: 1; display: flex; flex-direction: column; text-decoration: none; border-radius: var(--rsm); overflow: hidden; min-height: 160px; position: relative; transition: opacity 0.2s, transform 0.3s; }
.map-link:hover { opacity: 0.85; transform: translateZ(10px) scale(1.02); }
.map-wrap { width: 100%; height: 100%; position: absolute; inset: 0; pointer-events: none; border-radius: var(--rsm); overflow: hidden;}
.map-wrap iframe { width: 100%; height: 100%; border: 0; filter: invert(90%) hue-rotate(180deg) saturate(1.5) contrast(.8); }
.radar-ping { position: absolute; top: 50%; left: 50%; width: 12px; height: 12px; background: var(--teal); border-radius: 50%; transform: translate(-50%, -50%); z-index: 10; box-shadow: 0 0 10px var(--teal); }
.radar-ping::after { content: ''; position: absolute; inset: -10px; border: 2px solid var(--teal); border-radius: 50%; animation: radar 2s infinite ease-out; }
@keyframes radar { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }

/* ── ORIGINAL WIDGET 8: CTA ── */
.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, .1) 0%, rgba(229, 237, 241, .1) 100%) !important; border-color: rgba(150, 194, 219, .3) !important; }
.cta-btn { display: inline-flex; align-items: center; gap: 7px; background: var(--teal); color: #04060a; font-weight: 700; font-size: 13.5px; padding: 12px 24px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .3s var(--ease); }
.cta-btn:hover { background: #fff; transform: translateY(-4px) translateZ(20px); box-shadow: 0 12px 30px rgba(150, 194, 219, .4); }

/* REVEAL ANIMATIONS */
@keyframes revealUp { from { opacity: 0; transform: translateY(40px) translateZ(-50px) rotateX(10deg); } to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); } }
.r1 { opacity: 0; animation: revealUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) .1s forwards; }
.r2 { opacity: 0; animation: revealUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) .2s forwards; }
.r3 { opacity: 0; animation: revealUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) .3s forwards; }
.r5 { opacity: 0; animation: revealUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) .5s forwards; }

.loading-pulse { display: inline-block; animation: pulse 1.5s infinite; color: var(--muted); font-size: 12px; }
@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
`;

/* ─────────────────────────────────────────────────────────────────────────
   2. ORIGINAL DATA SETS (UNTOUCHED)
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
   3. REUSABLE COMPONENTS
───────────────────────────────────────────────────────────────────────── */

/** Custom Magnetic Cursor */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  useEffect(() => {
    const onMouseMove = (e) => {
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (cursorRef.current) {
        cursorRef.current.animate({ transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)` }, 
        { duration: 400, fill: "forwards", easing: "ease-out" });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <><div ref={dotRef} className="cursor-dot" /><div ref={cursorRef} className="cursor-ring" /></>
  );
};

/** 3D Canvas with Network Constellation Lines */
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
        this.x = (Math.random() - 0.5) * 3000;
        this.y = (Math.random() - 0.5) * 3000;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.z -= 2; 
        if (this.z <= 0) { this.z = 2000; this.x = (Math.random() - 0.5) * 3000; this.y = (Math.random() - 0.5) * 3000; }
      }
      draw() {
        let fov = 350;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let xOffset = (mouse.x - width / 2) * (1000 / this.z) * 0.15;
        let yOffset = (mouse.y - height / 2) * (1000 / this.z) * 0.15;
        let scale = fov / this.z;
        let opacity = Math.min(1, scale * 1.5);

        ctx.fillStyle = `rgba(150, 194, 219, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(x2d - xOffset, y2d - yOffset, this.size * scale, 0, Math.PI * 2);
        ctx.fill();

        // Constellation Lines logic (draw line if close to another particle)
        particles.forEach(p2 => {
          let dx = this.x - p2.x; let dy = this.y - p2.y; let dz = this.z - p2.z;
          let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < 150) {
            let p2x2d = (p2.x * fov) / p2.z + width / 2 - (mouse.x - width / 2) * (1000 / p2.z) * 0.15;
            let p2y2d = (p2.y * fov) / p2.z + height / 2 - (mouse.y - height / 2) * (1000 / p2.z) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 194, 219, ${0.1 * (1 - dist/150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(x2d - xOffset, y2d - yOffset);
            ctx.lineTo(p2x2d, p2y2d);
            ctx.stroke();
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

/** Fixed Flexbox Tilt Card */
const TiltCard = ({ children, className, style, ...props }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-wrapper interactable ${className}`}
      style={{ ...style, transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="card-spotlight" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(150, 194, 219, 0.12), transparent 40%)` }} />
      <div className="card-glare" style={{ background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 40%)` }} />
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   4. MAIN HOMEPAGE
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [siteLoaded, setSiteLoaded] = useState(false);

  // Cinematic Intro
  useEffect(() => {
    const timer = setTimeout(() => setSiteLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      <style>{MEGA_CSS}</style>

      {/* Awwwards Preloader */}
      <div className={`preloader ${siteLoaded ? 'hidden' : ''}`}>
        <div className="loader-brand">D<span>ARSH</span></div>
        <div className="loader-bar"><div className="loader-progress" /></div>
      </div>

      <div className="noise-overlay" />
      <CustomCursor />
      
      <div className="hp">
        <Canvas3D />

        <div className="hp-body" style={{ opacity: siteLoaded ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
          
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
                <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary interactable">Download CV <Download size={17}/></a>
                <Link to="/projects" className="hbtn hbtn-sec interactable">Explore Work <ArrowRight size={17}/></Link>
              </div>
            </div>
          </section>

          <div className="bento r5">

            {/* CARD 1: NATIVE SVG ANIMATED CAR */}
            <TiltCard className="c2">
              <div className="lbl"><Gamepad2 size={13}/>Keep Moving</div>
              <div className="car-wrap">
                <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="headlight-beam" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(150, 194, 219, 0.4)" />
                      <stop offset="100%" stopColor="rgba(150, 194, 219, 0)" />
                    </linearGradient>
                  </defs>

                  <g opacity="0.1" fill="var(--teal)">
                    <animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="12s" repeatCount="indefinite" />
                    <path d="M 20 120 L 20 60 L 50 60 L 50 120 Z" />
                    <path d="M 70 120 L 70 40 L 110 40 L 110 120 Z" />
                    <path d="M 150 120 L 150 80 L 190 80 L 190 120 Z" />
                  </g>

                  <g opacity="0.2" fill="var(--violet)">
                    <animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="6s" repeatCount="indefinite" />
                    <rect x="10" y="70" width="30" height="60" />
                    <rect x="50" y="90" width="40" height="40" />
                    <rect x="110" y="50" width="35" height="80" />
                    <rect x="180" y="75" width="25" height="55" />
                    <rect x="230" y="60" width="45" height="70" />
                  </g>

                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--border)" strokeWidth="3" />
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--muted)" strokeWidth="3" strokeDasharray="30 20">
                    <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.4s" repeatCount="indefinite" />
                  </line>

                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2.5; 0,0" dur="0.4s" repeatCount="indefinite" />
                    <path d="M 65 110 L 60 85 L 95 65 L 160 65 L 190 85 L 210 85 Q 220 85 220 95 L 220 110 Z" fill="var(--surf2)" stroke="var(--teal)" strokeWidth="2.5" />
                    <path d="M 98 68 L 155 68 L 180 85 L 85 85 Z" fill="#04060a" stroke="var(--teal)" strokeWidth="1.5" />
                    <line x1="120" y1="68" x2="105" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                    <line x1="135" y1="68" x2="120" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                    <path d="M 60 90 L 65 90 L 65 100 L 60 100 Z" fill="#ff5f56" />
                    <path d="M 210 92 L 220 92 L 220 102 L 210 102 Z" fill="#fff" />
                    <polygon points="220,92 290,75 290,115 220,102" fill="url(#headlight-beam)" />
                    <line x1="130" y1="85" x2="130" y2="110" stroke="var(--teal)" strokeWidth="1.5" opacity="0.5" />
                    <line x1="90" y1="85" x2="90" y2="110" stroke="var(--teal)" strokeWidth="1.5" opacity="0.5" />
                  </g>

                  <g transform="translate(100, 115)">
                    <circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" />
                    <g>
                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" />
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="var(--violet)" strokeWidth="2" />
                      <line x1="0" y1="-14" x2="0" y2="14" stroke="var(--violet)" strokeWidth="2" />
                      <circle cx="0" cy="0" r="4" fill="var(--teal)" />
                    </g>
                  </g>

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
            </TiltCard>

            {/* CARD 2: STATS */}
            <div className="tilt-wrapper interactable c2" style={{padding: 0, justifyContent: 'center', background: 'transparent', border: 'none', boxShadow: 'none'}}>
              <div className="card-content" style={{padding: 0, justifyContent: 'center'}}>
                <div className="stats-row">
                  <div className="stat-box"><div className="stat-num">13<span>+</span></div><div className="stat-lbl">Projects</div></div>
                  <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                  <div className="stat-box"><div className="stat-num">6<span>+</span></div><div className="stat-lbl">Hubs</div></div>
                </div>
              </div>
            </div>

            {/* CARD 3: GITHUB DATA */}
            <TiltCard className="c3">
              <div className="lbl"><Github size={13}/>Live GitHub Data (@DWRSH)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '10px' }}>
                <img 
                  src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} 
                  alt="GitHub Stats" 
                  style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} 
                />
                <img 
                  src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} 
                  alt="GitHub Streak" 
                  style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} 
                />
              </div>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'var(--surf2)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
               <img 
                  src={`https://ghchart.rshah.org/96c2db/DWRSH?v=${Date.now()}`} 
                  alt="GitHub Commits" 
                  style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }}
                />
              </div>
            </TiltCard>

            {/* CARD 4: MUSIC PLAYER (WITH VISUALIZER) */}
            <TiltCard 
              className="c1 interactable" 
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
                  <div className={`visualizer ${isPlaying ? 'active' : ''}`}>
                    <div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* CARD 5: TECH STACK */}
            <TiltCard className="c2">
              <div className="lbl"><Layers size={13}/>Tech Stack</div>
              <div className="tech-marquee-wrapper">
                <div className="tm-track tm-left">
                  {MARQUEE_1.map((t, i) => (
                    <div className="ticon interactable" title={t.name} key={`m1-${i}`}>
                      <img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/>
                    </div>
                  ))}
                </div>
                <div className="tm-track tm-right">
                  {MARQUEE_2.map((t, i) => (
                    <div className="ticon interactable" title={t.name} key={`m2-${i}`}>
                      <img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* CARD 6: SOCIAL LINKS */}
            <TiltCard className="c2">
              <div className="lbl"><ExternalLink size={13}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item interactable" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{fontSize: '18px'}}>{s.icon}</span>
                    <span style={{fontWeight: 700, fontSize: '13px', color: '#fff'}}>{s.name}</span>
                  </a>
                ))}
              </div>
            </TiltCard>

            {/* CARD 7: LATEST POST */}
            <TiltCard className="c1 mob-full">
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
                    <Link to={latestPost.link} className="read-pill interactable">Read <ArrowRight size={11}/></Link>
                  </div>
                </>
              ) : (
                <p className="blog-desc">No posts found right now.</p>
              )}
            </TiltCard>

            {/* CARD 8: MAP (WITH RADAR PING) */}
            <TiltCard className="c1 interactable" style={{padding: 0}}>
              <div className="card-content" style={{padding: 0, height: '100%', minHeight: '180px'}}>
                <div className="lbl" style={{padding: '16px 16px 0', position: 'absolute', zIndex: 10}}><MapPin size={13}/>Location</div>
                <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map-link">
                  <div className="map-wrap">
                    <iframe
                      src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed"
                      allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"
                    />
                    <div className="radar-ping"></div>
                  </div>
                </a>
              </div>
            </TiltCard>

            {/* CARD 9: GRAND CTA */}
            <TiltCard className="c2 cta-card">
              <div className="card-content" style={{justifyContent: 'center'}}>
                <p style={{fontFamily: 'Syne', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '12px'}}>
                  Let's build <span style={{color: 'var(--teal)'}}>something great.</span>
                </p>
                <a href="mailto:contact@darshprajapati.dev" className="cta-btn interactable"><Mail size={15}/> Get in Touch</a>
              </div>
            </TiltCard>

          </div>{/* /bento */}
        </div>
      </div>
    </>
  );
}
