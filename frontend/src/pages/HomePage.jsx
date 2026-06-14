import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Sparkles, MapPin, Trophy,
  Github, Layers, Wrench, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Briefcase, Code2, Zap
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. MEGA CSS STYLE INJECTION (Award-Winning Architecture)
───────────────────────────────────────────────────────────────────────── */
const MEGA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Fira+Code:wght@400;500&display=swap');

/* Basic Resets & Cursor Override */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body, html { cursor: none !important; overflow-x: hidden; background: #020305; scroll-behavior: smooth; }

:root {
  /* THEME: Blue-Grey & White */
  --bg:          #020305;
  --surf:        #0b0f18;
  --surf2:       #111620;
  --border:      rgba(255, 255, 255, 0.06);
  --primary:     #96c2db; /* Blue-Grey */
  --primary-dim: rgba(150, 194, 219, 0.12);
  --primary-glw: rgba(150, 194, 219, 0.25);
  --secondary:   #e5edf1; /* Light Blue-Grey */
  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.45);
  --muted2:      rgba(255, 255, 255, 0.25);
  
  /* Layout & Animations */
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
.loader-brand span { color: var(--primary); }
.loader-bar { width: 200px; height: 2px; background: var(--border); border-radius: 4px; overflow: hidden; position: relative; }
.loader-progress { position: absolute; top: 0; left: 0; height: 100%; background: var(--primary); width: 0%; animation: loadProgress 2s cubic-bezier(0.85, 0, 0.15, 1) forwards; }
@keyframes loadProgress { 0% { width: 0%; } 50% { width: 60%; } 100% { width: 100%; } }

/* ─────────────────────────────────────────────────────────────────────────
   CUSTOM MAGNETIC CURSOR
───────────────────────────────────────────────────────────────────────── */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: var(--primary); border-radius: 50%;
  pointer-events: none; z-index: 10000; transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 12px var(--primary); mix-blend-mode: screen; transition: opacity 0.2s;
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1.5px solid rgba(150, 194, 219, 0.6); border-radius: 50%;
  pointer-events: none; z-index: 9999; transform: translate3d(-50%, -50%, 0);
  transition: width 0.3s var(--ease), height 0.3s var(--ease), background 0.3s var(--ease);
}
a:hover ~ .cursor-ring, button:hover ~ .cursor-ring, .interactable:hover ~ .cursor-ring {
  width: 60px; height: 60px; background: rgba(150, 194, 219, 0.1); border-color: transparent;
}

/* NOISE & CANVAS */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9998; opacity: 0.035;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E');
}
.canvas-3d { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; mix-blend-mode: screen; opacity: 0.8; }

/* ─────────────────────────────────────────────────────────────────────────
   MAIN PAGE ARCHITECTURE
───────────────────────────────────────────────────────────────────────── */
.hp { font-family: 'DM Sans', sans-serif; color: var(--text); min-height: 100vh; position: relative; perspective: 1200px; }
.hp-body { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 120px 24px 80px; display: flex; flex-direction: column; gap: 60px; transform-style: preserve-3d; }

/* HERO SECTION */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; transform-style: preserve-3d; }
.hero-pill { 
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 100px; 
  border: 1px solid rgba(150, 194, 219, 0.25); background: rgba(150, 194, 219, 0.05); color: var(--primary); 
  font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 40px; 
  backdrop-filter: blur(12px); width: fit-content; transform: translateZ(20px);
}
.hero-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 12px var(--primary); animation: pulse 2s infinite; }

.hero-name { 
  font-family: 'Syne', sans-serif; font-size: clamp(64px, 12vw, 180px); font-weight: 800; 
  line-height: 0.85; letter-spacing: -0.04em; margin-bottom: 48px; position: relative;
  transform: translateZ(40px);
}
.hero-outline { 
  color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.15); 
  transition: all 0.5s var(--ease); 
}
.hero-outline:hover { 
  color: var(--bg); -webkit-text-stroke: 1.5px var(--primary); 
  text-shadow: 15px 15px 0 rgba(150, 194, 219, 0.1), 30px 30px 0 rgba(150, 194, 219, 0.05); 
  transform: translateY(-5px); display: inline-block;
}

.hero-bottom { display: flex; flex-direction: column; gap: 32px; transform: translateZ(30px); }
@media(min-width: 800px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 540px; }
.hero-bio strong { color: #fff; font-weight: 500; }

.hbtn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-size: 14px; font-weight: 600; position: relative; z-index: 1; transition: all 0.4s var(--ease); text-decoration: none; }
.hbtn-primary { background: var(--primary); color: #000; box-shadow: 0 10px 30px rgba(150, 194, 219, 0.2); }
.hbtn-primary:hover { box-shadow: 0 20px 40px rgba(150, 194, 219, 0.4); transform: translateY(-4px) translateZ(10px); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
.hbtn-sec:hover { border-color: var(--primary); transform: translateY(-4px) translateZ(10px); background: rgba(150, 194, 219, 0.05); color: var(--primary); }

/* ─────────────────────────────────────────────────────────────────────────
   THE FIXED 3D BENTO GRID & TILT CARDS
───────────────────────────────────────────────────────────────────────── */
.bento { 
  display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; 
  gap: clamp(16px, 2vw, 24px); width: 100%; transform-style: preserve-3d; perspective: 2000px; 
}
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; } .c4 { grid-column: span 4; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { .bento { grid-template-columns: repeat(1, 1fr); } .c1, .c2, .c3, .c4 { grid-column: span 1 !important; } }

/* The Wrapper handles the 3D rotation, keeping Flexbox inside completely safe */
.tilt-wrapper {
  background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); 
  position: relative; display: flex; flex-direction: column; overflow: hidden;
  transform-style: preserve-3d; transition: border-color 0.4s, box-shadow 0.4s;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
  will-change: transform;
}
.tilt-wrapper:hover {
  border-color: rgba(150, 194, 219, 0.35);
  box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(150, 194, 219, 0.12);
  z-index: 20;
}

/* Spotlight & Glare Effect */
.card-spotlight, .card-glare { position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.4s; border-radius: inherit; }
.tilt-wrapper:hover .card-spotlight, .tilt-wrapper:hover .card-glare { opacity: 1; }

/* The Content Box - STRICT FLEXBOX PRESERVATION */
.card-content {
  padding: clamp(20px, 3vw, 28px); display: flex; flex-direction: column; flex: 1; gap: 20px;
  position: relative; z-index: 2; 
  /* Push content off the background card */
  transform: translateZ(40px); transform-style: preserve-3d;
}

/* WIDGET SHARED STYLES */
.lbl { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.lbl svg { color: var(--primary); }

/* 1. CAR SVG DETAILS */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 180px; position: relative; border-radius: var(--rsm); background: linear-gradient(to bottom, transparent 40%, rgba(150, 194, 219, 0.04) 100%); overflow: hidden; transform: translateZ(10px); }
.svg-scene { width: 100%; height: 100%; max-height: 180px; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.7)); }

/* 2. STATS ROW */
.stats-row { display: flex; flex: 1; flex-wrap: wrap; background: rgba(0,0,0,0.3); border-radius: var(--rsm); overflow: hidden; border: 1px solid var(--border); }
.stat-box { flex: 1; min-width: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); transition: background 0.3s; }
.stat-box:hover { background: rgba(150, 194, 219, 0.05); }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 38px); font-weight: 800; color: #fff; line-height: 1; }
.stat-num span { color: var(--primary); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }

/* 3. MUSIC PLAYER */
.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 20px; cursor: pointer; }
.vinyl-container { position: relative; width: 100px; height: 100px; transform-style: preserve-3d; }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: repeating-radial-gradient(#111 0%, #050505 10%, #111 20%); border: 3px solid #222; box-shadow: 0 20px 40px rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; transition: transform 0.3s var(--ease); }
.vinyl-record.playing { animation: spinRecord 2s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label { width: 35%; height: 35%; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); border: 2px solid #000; display: flex; align-items: center; justify-content: center; }
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; }
.tonearm { position: absolute; top: -10px; right: -25px; width: 45px; height: 80px; transform-origin: top right; transform: rotate(-35deg) translateZ(20px); transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); filter: drop-shadow(5px 10px 15px rgba(0,0,0,0.9)); }
.tonearm.playing { transform: rotate(12deg) translateZ(20px); }

/* 4. TECH MARQUEE */
.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 16px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); flex: 1; justify-content: center; transform: translateZ(15px); }
.tm-track { display: flex; width: max-content; gap: 16px; }
.tm-left { animation: scrollL 30s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 8px)); animation: scrollR 30s linear infinite; }
.ticon { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; transition: all .3s; backdrop-filter: blur(5px); }
.ticon:hover { background: rgba(150, 194, 219, 0.1); border-color: var(--primary); transform: translateY(-6px) scale(1.1); box-shadow: 0 10px 25px rgba(150, 194, 219, 0.25); }
.ticon img { width: 26px; height: 26px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.6)); }
.inv { filter: invert(1) brightness(0.9); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 8px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* 5. EXPERIENCE TIMELINE (NEW) */
.timeline { display: flex; flex-direction: column; gap: 20px; flex: 1; justify-content: center; }
.tl-item { display: flex; gap: 16px; position: relative; }
.tl-item::before { content: ''; position: absolute; left: 19px; top: 38px; bottom: -20px; width: 2px; background: var(--border); }
.tl-item:last-child::before { display: none; }
.tl-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--surf2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--primary); z-index: 2; transition: all 0.3s; }
.tl-item:hover .tl-icon { background: var(--primary); color: #000; box-shadow: 0 0 20px rgba(150, 194, 219, 0.4); transform: scale(1.1); }
.tl-content { display: flex; flex-direction: column; gap: 4px; padding-top: 6px; }
.tl-title { font-size: 15px; font-weight: 700; color: #fff; }
.tl-org { font-size: 13px; color: var(--primary); font-weight: 500; }
.tl-date { font-size: 11px; color: var(--muted); }

/* 6. SKILL RINGS (NEW) */
.skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; flex: 1; align-items: center; }
.skill-ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.ring-svg { width: 64px; height: 64px; transform: rotate(-90deg); filter: drop-shadow(0 0 8px rgba(150, 194, 219, 0.2)); }
.ring-bg { fill: none; stroke: var(--border); stroke-width: 6; }
.ring-prog { fill: none; stroke: var(--primary); stroke-width: 6; stroke-linecap: round; stroke-dasharray: 176; stroke-dashoffset: 176; transition: stroke-dashoffset 1.5s var(--ease); }
.tilt-wrapper:hover .ring-prog { stroke-dashoffset: var(--target); }
.skill-name { font-size: 12px; font-weight: 600; color: var(--text); }

/* 7. SOCIAL GRID & BLOG */
.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; flex: 1; }
.soc-item { background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 10px; transition: all .3s var(--ease); text-decoration: none; }
.soc-item:hover { border-color: var(--primary); background: rgba(150, 194, 219, 0.08); transform: translateY(-5px) translateZ(20px); box-shadow: 0 15px 30px rgba(0,0,0,0.5); }

.blog-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; line-height: 1.4; color: #fff; }
.blog-desc { font-size: 13px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.read-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--primary); background: var(--primary-dim); border: 1px solid rgba(150, 194, 219, .2); padding: 8px 16px; border-radius: 100px; text-decoration: none; transition: all .2s; margin-top: auto; align-self: flex-start; }
.read-pill:hover { background: var(--primary); color: #000; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(150, 194, 219, 0.3); }

/* 8. CTA CARD */
.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, 0.08) 0%, rgba(229, 237, 241, 0.05) 100%) !important; }
.cta-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--primary); color: #000; font-weight: 700; padding: 14px 28px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .3s var(--ease); box-shadow: 0 10px 20px rgba(150, 194, 219, 0.2); }
.cta-btn:hover { background: #fff; transform: translateY(-5px) scale(1.05); box-shadow: 0 15px 35px rgba(150, 194, 219, 0.5); }

/* REVEAL ANIMATIONS */
@keyframes revealUp { from { opacity: 0; transform: translateY(60px) translateZ(-100px) rotateX(10deg); } to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); } }
.r1 { animation: revealUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both; }
.r2 { animation: revealUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both; }
.r3 { animation: revealUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both; }
.r5 { animation: revealUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both; }

@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
`;

/* ─────────────────────────────────────────────────────────────────────────
   2. DATA STRUCTURES
───────────────────────────────────────────────────────────────────────── */
const TECH_ROW_1 = [
  {name:'React',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Node.js',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'MongoDB',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'},
  {name:'Express',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', inv:true},
  {name:'Next.js',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', inv:true},
];

const TECH_ROW_2 = [
  {name:'TypeScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'JavaScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'Python',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'FastAPI',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'},
  {name:'Tailwind', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
];

const TECH_ROW_3 = [
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'AWS',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', inv:true},
  {name:'Git',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'},
  {name:'Figma',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
  {name:'Linux',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'},
];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',    handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'https://www.linkedin.com/in/darshprajapati15'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
];

const TIMELINE = [
  { title: 'Founder & Full Stack Dev', org: 'AllVora', date: '2024 - Present', icon: Zap },
  { title: 'Cyber Security Sim', org: 'Deloitte Australia', date: 'Jan 2026', icon: Trophy },
  { title: 'B.Sc. CA & IT', org: 'Ganpat University', date: '2023 - 2026', icon: BookOpen },
];

const SKILLS = [
  { name: 'Frontend', pct: 90 },
  { name: 'Backend', pct: 85 },
  { name: 'Security', pct: 70 }
];

/* ─────────────────────────────────────────────────────────────────────────
   3. REUSABLE COMPONENTS
───────────────────────────────────────────────────────────────────────── */

/**
 * CustomCursor - Magnetic trailing cursor
 */
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
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={cursorRef} className="cursor-ring" />
    </>
  );
};

/**
 * Canvas3D - WebGL Style Parallax Starfield/Particles
 */
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
        this.z -= 1.5; 
        if (this.z <= 0) { this.z = 2000; this.x = (Math.random() - 0.5) * 3000; this.y = (Math.random() - 0.5) * 3000; }
      }
      draw() {
        let fov = 300;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let xOffset = (mouse.x - width / 2) * (1000 / this.z) * 0.15;
        let yOffset = (mouse.y - height / 2) * (1000 / this.z) * 0.15;
        let scale = fov / this.z;
        let opacity = Math.min(1, scale * 1.2);

        ctx.fillStyle = `rgba(150, 194, 219, ${opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(x2d - xOffset, y2d - yOffset, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 350; i++) particles.push(new Particle());
    const animate = () => { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); };
    animate();
  }, []);
  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/**
 * TiltCard - The core 3D interactive container (Fixed Flexbox Logic)
 */
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

    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
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
      <div className="card-spotlight" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(150, 194, 219, 0.1), transparent 40%)` }} />
      <div className="card-glare" style={{ background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 40%)` }} />
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   4. MAIN HOMEPAGE COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [siteLoaded, setSiteLoaded] = useState(false);

  // Cinematic Preloader
  useEffect(() => {
    const timer = setTimeout(() => setSiteLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Latest Blog
  useEffect(() => {
    async function fetchLatestBlog() {
      try {
        const response = await api.get('/blogs');
        if (response.data && response.data.length > 0) {
          const latest = response.data[0];
          setLatestPost({ 
            title: latest.title, 
            desc: latest.desc || latest.content?.substring(0, 100) + '...', 
            link: `/blog/${latest.slug || latest._id}` 
          });
        }
      } catch (error) { console.error(error); } 
      finally { setLoadingPost(false); }
    }
    fetchLatestBlog();
  }, []);

  const handlePlay = () => {
    if(audioRef.current) { audioRef.current.volume = 0.4; audioRef.current.play().catch(()=>{}); setIsPlaying(true); }
  };
  const handlePause = () => {
    if(audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
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
          
          {/* HERO */}
          <section className="hero">
            <div className="hero-pill r1"><div className="hero-dot"/> Available for Full-Time & Freelance</div>
            <h1 className="hero-name r2"><span className="hero-outline">DARSH</span></h1>
            <div className="hero-bottom r3">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures. Specializing in the <strong>MERN stack</strong> & AI Integrations — bridging heavy-duty backends with pixel-perfect 3D frontends.
              </p>
              <div className="hero-btns">
                <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary">Download CV <Download size={18}/></a>
                <Link to="/projects" className="hbtn hbtn-sec">Explore Works <ArrowRight size={18}/></Link>
              </div>
            </div>
          </section>

          {/* MEGA BENTO GRID */}
          <div className="bento r5">

            {/* 1. ANIMATED CAR & SCENE */}
            <TiltCard className="c2">
              <div className="lbl"><Gamepad2 size={14}/>Journey & Vision</div>
              <div className="car-wrap">
                <svg viewBox="0 0 300 150" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="hl-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(150, 194, 219, 0.4)" /><stop offset="100%" stopColor="rgba(150, 194, 219, 0)" /></linearGradient>
                  </defs>
                  
                  {/* City Background Parallax */}
                  <g opacity="0.1" fill="var(--primary)">
                    <animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="15s" repeatCount="indefinite" />
                    <rect x="20" y="50" width="30" height="80"/><rect x="80" y="30" width="40" height="100"/><rect x="150" y="60" width="35" height="70"/><rect x="220" y="20" width="45" height="110"/>
                  </g>
                  
                  <g opacity="0.2" fill="var(--secondary)">
                    <animateTransform attributeName="transform" type="translate" from="300,0" to="-300,0" dur="8s" repeatCount="indefinite" />
                    <rect x="40" y="70" width="25" height="60"/><rect x="100" y="90" width="30" height="40"/><rect x="190" y="50" width="40" height="80"/>
                  </g>

                  {/* Road */}
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--border)" strokeWidth="3" />
                  <line x1="0" y1="130" x2="300" y2="130" stroke="var(--muted)" strokeWidth="3" strokeDasharray="40 20">
                    <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.3s" repeatCount="indefinite" />
                  </line>

                  {/* Car Chassis */}
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="0.4s" repeatCount="indefinite" />
                    <path d="M 50 110 L 45 80 L 85 60 L 170 60 L 205 80 L 230 80 Q 240 80 240 95 L 240 110 Z" fill="var(--surf2)" stroke="var(--primary)" strokeWidth="2.5" />
                    <path d="M 90 63 L 165 63 L 195 80 L 75 80 Z" fill="#020305" stroke="var(--primary)" strokeWidth="1.5" />
                    <line x1="130" y1="63" x2="110" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <line x1="150" y1="63" x2="130" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <path d="M 45 88 L 55 88 L 55 100 L 45 100 Z" fill="#ff4747" />
                    <path d="M 230 90 L 240 90 L 240 102 L 230 102 Z" fill="#fff" />
                    <polygon points="240,90 320,70 320,120 240,102" fill="url(#hl-beam)" />
                    <line x1="135" y1="80" x2="135" y2="110" stroke="var(--primary)" strokeWidth="1.5" opacity="0.5" />
                  </g>

                  {/* Wheels */}
                  <g transform="translate(90, 115)"><circle cx="0" cy="0" r="16" fill="#050505" stroke="var(--secondary)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.3s" repeatCount="indefinite" /><line x1="-16" y1="0" x2="16" y2="0" stroke="var(--secondary)" strokeWidth="2" /><line x1="0" y1="-16" x2="0" y2="16" stroke="var(--secondary)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--primary)" /></g></g>
                  <g transform="translate(195, 115)"><circle cx="0" cy="0" r="16" fill="#050505" stroke="var(--secondary)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.3s" repeatCount="indefinite" /><line x1="-16" y1="0" x2="16" y2="0" stroke="var(--secondary)" strokeWidth="2" /><line x1="0" y1="-16" x2="0" y2="16" stroke="var(--secondary)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--primary)" /></g></g>
                </svg>
              </div>
            </TiltCard>

            {/* 2. LIVE METRICS & STATS */}
            <TiltCard className="c2">
              <div className="lbl"><Trophy size={14}/>Impact Metrics</div>
              <div className="stats-row">
                <div className="stat-box"><div className="stat-num">15<span>+</span></div><div className="stat-lbl">Projects</div></div>
                <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp.</div></div>
                <div className="stat-box"><div className="stat-num">100<span>k</span></div><div className="stat-lbl">Lines of Code</div></div>
                <div className="stat-box"><div className="stat-num">3</div><div className="stat-lbl">Hackathons</div></div>
              </div>
            </TiltCard>

            {/* 3. GITHUB LIVE INTEGRATION */}
            <TiltCard className="c3">
              <div className="lbl"><Github size={14}/>Live GitHub Data (@DWRSH)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', flex: 1 }}>
                <div style={{width: '100%', height: '100%', minHeight: '150px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex'}}>
                  <img src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" style={{ width: '100%', objectFit: 'contain', padding: '10px' }} />
                </div>
                <div style={{width: '100%', height: '100%', minHeight: '150px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex'}}>
                  <img src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" style={{ width: '100%', objectFit: 'contain', padding: '10px' }} />
                </div>
              </div>
            </TiltCard>

            {/* 4. VIBES / MUSIC PLAYER */}
            <TiltCard className="c1" onMouseEnter={handlePlay} onMouseLeave={handlePause} onTouchStart={() => isPlaying ? handlePause() : handlePlay()}>
              <div className="lbl"><Headphones size={14}/>Current Vibe</div>
              <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
              <div className="music-player-wrap">
                <div className="vinyl-container">
                  <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                    <div className="vinyl-label"><div className="vinyl-hole"/></div>
                  </div>
                  <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                    <circle cx="30" cy="10" r="8" fill="#555" stroke="#222" strokeWidth="2"/>
                    <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#999" strokeWidth="5" strokeLinecap="round"/>
                    <rect x="2" y="65" width="14" height="18" rx="2" fill="#222" transform="rotate(25 8 72)"/>
                  </svg>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontFamily: 'Syne', fontWeight: 700, color: '#fff', fontSize: '15px'}}>Deep Focus</div>
                  <div style={{fontSize: '12px', color: 'var(--muted)', marginTop: '4px'}}>Lofi Hip-Hop</div>
                  <div style={{fontSize: '9px', color: 'var(--primary)', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.1em'}}>{isPlaying ? 'Now Playing' : 'Hover to Play'}</div>
                </div>
              </div>
            </TiltCard>

            {/* 5. EXPERIENCE / TIMELINE (NEW WIDGET) */}
            <TiltCard className="c2">
              <div className="lbl"><Briefcase size={14}/>Experience & Journey</div>
              <div className="timeline">
                {TIMELINE.map((item, i) => (
                  <div className="tl-item" key={i}>
                    <div className="tl-icon"><item.icon size={18}/></div>
                    <div className="tl-content">
                      <div className="tl-title">{item.title}</div>
                      <div className="tl-org">{item.org}</div>
                      <div className="tl-date">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* 6. SKILL RINGS (NEW WIDGET) */}
            <TiltCard className="c2">
              <div className="lbl"><Code2 size={14}/>Core Expertise</div>
              <div className="skills-grid">
                {SKILLS.map((skill, i) => {
                  const targetOffset = 176 - (176 * skill.pct) / 100;
                  return (
                    <div className="skill-ring-wrap" key={i}>
                      <svg className="ring-svg" viewBox="0 0 64 64" style={{ '--target': targetOffset }}>
                        <circle className="ring-bg" cx="32" cy="32" r="28" />
                        <circle className="ring-prog" cx="32" cy="32" r="28" />
                      </svg>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  );
                })}
              </div>
            </TiltCard>

            {/* 7. INFINITE TECH MARQUEE */}
            <TiltCard className="c2">
              <div className="lbl"><Layers size={14}/>Technology Stack</div>
              <div className="tech-marquee-wrapper">
                <div className="tm-track tm-left">
                  {[...TECH_ROW_1, ...TECH_ROW_1, ...TECH_ROW_1].map((t, i) => (
                    <div className="ticon" title={t.name} key={`m1-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                  ))}
                </div>
                <div className="tm-track tm-right">
                  {[...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2].map((t, i) => (
                    <div className="ticon" title={t.name} key={`m2-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                  ))}
                </div>
                <div className="tm-track tm-left" style={{ animationDuration: '35s' }}>
                  {[...TECH_ROW_3, ...TECH_ROW_3, ...TECH_ROW_3].map((t, i) => (
                    <div className="ticon" title={t.name} key={`m3-${i}`}><img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''}/></div>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* 8. SOCIAL LINKS */}
            <TiltCard className="c2">
              <div className="lbl"><ExternalLink size={14}/>Connect Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item interactable" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{fontSize: '24px'}}>{s.icon}</span>
                    <span style={{fontWeight: 700, fontSize: '15px'}}>{s.name}</span>
                  </a>
                ))}
              </div>
            </TiltCard>

            {/* 9. LATEST BLOG POST */}
            <TiltCard className="c1 mob-full">
              <div className="lbl"><BookOpen size={14}/>Latest Writing</div>
              {loadingPost ? <span className="loading-pulse" style={{marginTop: 'auto', marginBottom: 'auto'}}>Syncing Feed...</span> : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <Link to={latestPost.link} className="read-pill interactable">Read Article <ArrowRight size={12}/></Link>
                </>
              ) : <p className="blog-desc">No publications yet.</p>}
            </TiltCard>

            {/* 10. MAP / LOCATION */}
            <TiltCard className="c1" style={{padding: 0}}>
              <div className="card-content" style={{padding: 0, minHeight: '220px'}}>
                <div className="lbl" style={{padding: '24px 24px 0', position: 'absolute', zIndex: 10}}><MapPin size={14}/>Location</div>
                <div style={{position: 'absolute', inset: 0, borderRadius: 'var(--r)', overflow: 'hidden'}}>
                  <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" style={{width: '100%', height: '100%', border: 0, filter: 'invert(95%) hue-rotate(180deg) saturate(1.8) contrast(0.8)'}} allowFullScreen="" loading="lazy" />
                </div>
              </div>
            </TiltCard>

            {/* 11. GRAND CTA */}
            <TiltCard className="c2 cta-card">
              <div className="card-content" style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                <p style={{fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '24px'}}>
                  Ready to build <span style={{color: 'var(--primary)'}}>something extraordinary?</span>
                </p>
                <a href="mailto:contact@darshprajapati.dev" className="cta-btn interactable"><Mail size={18}/> Start a Project</a>
              </div>
            </TiltCard>

          </div>
        </div>
      </div>
    </>
  );
}
