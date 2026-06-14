import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin, 
  Github, Layers, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Play, Pause
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   1. THE MEGA CSS ENGINE (1000+ Lines Level Architecture)
   Contains deep animations, multi-layered glassmorphism, and 3D perspectives.
───────────────────────────────────────────────────────────────────────── */
const MEGA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

/* ── Global Resets & Typography ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
::selection { background: rgba(150, 194, 219, 0.4); color: #fff; }
html { scroll-behavior: smooth; }
body, html { cursor: none !important; overflow-x: hidden; background: #020305; -webkit-font-smoothing: antialiased; }

/* ── Custom Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #020305; }
::-webkit-scrollbar-thumb { background: rgba(150, 194, 219, 0.2); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(150, 194, 219, 0.5); }

/* ── CSS Variables (Blue-Grey Elite Theme) ── */
:root {
  --bg:          #020305;
  --surf:        #0b0f18;
  --surf-glass:  rgba(11, 15, 24, 0.65);
  --surf2:       #111620;
  --border:      rgba(255, 255, 255, 0.06);
  --border-h:    rgba(150, 194, 219, 0.4);
  
  --primary:     #96c2db; 
  --primary-dim: rgba(150, 194, 219, 0.12);
  --primary-glow:rgba(150, 194, 219, 0.3);
  --secondary:   #e5edf1; 
  
  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.45);
  --muted2:      rgba(255, 255, 255, 0.25);
  
  --ease:        cubic-bezier(0.19, 1, 0.22, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --r:           24px;
  --rsm:         14px;
}

/* ─────────────────────────────────────────────────────────────────────────
   CINEMATIC SPLIT-SCREEN PRELOADER
───────────────────────────────────────────────────────────────────────── */
.preloader-wrap {
  position: fixed; inset: 0; z-index: 99999; pointer-events: none;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.pl-bg-top, .pl-bg-bottom {
  position: absolute; left: 0; width: 100%; height: 50vh; background: #020305;
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1) 0.8s;
}
.pl-bg-top { top: 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.pl-bg-bottom { bottom: 0; }
.preloader-wrap.hidden .pl-bg-top { transform: translateY(-100%); }
.preloader-wrap.hidden .pl-bg-bottom { transform: translateY(100%); }

.pl-content {
  position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 30px;
  transition: opacity 0.5s var(--ease) 0.4s;
}
.preloader-wrap.hidden .pl-content { opacity: 0; }

.pl-brand {
  font-family: 'Syne', sans-serif; font-size: 4vw; font-weight: 800; color: #fff; letter-spacing: 0.2em;
  display: flex; gap: 5px; overflow: hidden;
}
.pl-letter {
  transform: translateY(100%); opacity: 0;
  animation: letterUp 0.8s var(--ease-bounce) forwards;
}
.pl-letter:nth-child(1) { animation-delay: 0.1s; color: var(--primary); }
.pl-letter:nth-child(2) { animation-delay: 0.15s; }
.pl-letter:nth-child(3) { animation-delay: 0.2s; }
.pl-letter:nth-child(4) { animation-delay: 0.25s; }
.pl-letter:nth-child(5) { animation-delay: 0.3s; }

.pl-bar-wrap { width: 200px; height: 2px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; position: relative; }
.pl-bar { position: absolute; left: 0; top: 0; height: 100%; background: var(--primary); width: 0%; box-shadow: 0 0 10px var(--primary); animation: loadProgress 1s var(--ease) 0.4s forwards; }

@keyframes letterUp { to { transform: translateY(0); opacity: 1; } }
@keyframes loadProgress { 0% { width: 0%; } 40% { width: 40%; } 70% { width: 80%; } 100% { width: 100%; } }

/* ─────────────────────────────────────────────────────────────────────────
   CUSTOM MAGNETIC CURSOR
───────────────────────────────────────────────────────────────────────── */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: var(--primary); border-radius: 50%;
  pointer-events: none; z-index: 100000; transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 15px var(--primary); mix-blend-mode: screen; transition: opacity 0.2s;
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 1.5px solid rgba(150, 194, 219, 0.5); border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate3d(-50%, -50%, 0);
  transition: width 0.3s var(--ease), height 0.3s var(--ease), background 0.3s var(--ease), border-color 0.3s;
}
a:hover ~ .cursor-ring, button:hover ~ .cursor-ring, .interactable:hover ~ .cursor-ring {
  width: 70px; height: 70px; background: rgba(150, 194, 219, 0.08); border-color: transparent; backdrop-filter: blur(2px);
}
.tilt-wrapper:hover ~ .cursor-ring { border-color: rgba(255,255,255,0.2); }

/* ─────────────────────────────────────────────────────────────────────────
   BACKGROUND: NOISE & ADVANCED 3D CANVAS
───────────────────────────────────────────────────────────────────────── */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9990; opacity: 0.035;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E');
}
.canvas-3d { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; opacity: 0.7; }
.ambient-light { position: fixed; width: 800px; height: 800px; border-radius: 50%; background: radial-gradient(circle, rgba(150, 194, 219, 0.08) 0%, transparent 60%); top: -400px; left: -200px; pointer-events: none; z-index: 0; animation: floatLight 20s infinite alternate ease-in-out; }
@keyframes floatLight { 100% { transform: translate(200px, 100px); } }

/* ─────────────────────────────────────────────────────────────────────────
   LAYOUT & GLOBAL 3D PERSPECTIVE
───────────────────────────────────────────────────────────────────────── */
.hp { font-family: 'DM Sans', sans-serif; color: var(--text); min-height: 100vh; position: relative; perspective: 2000px; overflow-x: hidden; }
.hp-body { position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; padding: 120px 24px 80px; display: flex; flex-direction: column; gap: 80px; transform-style: preserve-3d; }

/* ── HERO SECTION (MASSIVE 3D TYPOGRAPHY) ── */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; transform-style: preserve-3d; }
.hero-pill { 
  display: inline-flex; align-items: center; gap: 10px; padding: 10px 24px; border-radius: 100px; 
  border: 1px solid rgba(150, 194, 219, 0.25); background: rgba(150, 194, 219, 0.05); color: var(--primary); 
  font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 40px; 
  backdrop-filter: blur(12px); width: fit-content; transform: translateZ(30px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.hero-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 15px var(--primary); animation: pulse 2s infinite; }

.hero-name { 
  font-family: 'Syne', sans-serif; font-size: clamp(70px, 14vw, 200px); font-weight: 800; 
  line-height: 0.85; letter-spacing: -0.04em; margin-bottom: 48px; position: relative;
  transform: translateZ(60px);
}
.hero-outline { 
  color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.15); 
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); 
  display: inline-block; cursor: default;
}
.hero-outline:hover { 
  color: #020305; -webkit-text-stroke: 2px var(--primary); 
  text-shadow: 10px 10px 0 rgba(150, 194, 219, 0.15), 20px 20px 0 rgba(150, 194, 219, 0.08), 30px 30px 0 rgba(150, 194, 219, 0.03); 
  transform: translateY(-10px) rotateX(10deg); 
}

.hero-bottom { display: flex; flex-direction: column; gap: 32px; transform: translateZ(40px); }
@media(min-width: 800px) { .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.hero-bio { font-size: 19px; font-weight: 300; line-height: 1.7; color: var(--muted); max-width: 580px; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
.hero-bio strong { color: #fff; font-weight: 500; }

.hbtn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 36px; border-radius: 100px; font-size: 15px; font-weight: 600; position: relative; z-index: 1; transition: all 0.4s var(--ease); text-decoration: none; overflow: hidden; }
.hbtn-primary { background: var(--primary); color: #000; box-shadow: 0 10px 30px rgba(150, 194, 219, 0.2); }
.hbtn-primary::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-100%); transition: transform 0.6s var(--ease); }
.hbtn-primary:hover::after { transform: translateX(100%); }
.hbtn-primary:hover { box-shadow: 0 20px 40px rgba(150, 194, 219, 0.4); transform: translateY(-5px) translateZ(20px); background: #fff; }
.hbtn-sec { border: 1px solid var(--border); color: #fff; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
.hbtn-sec:hover { border-color: var(--primary); transform: translateY(-5px) translateZ(20px); background: rgba(150, 194, 219, 0.08); color: var(--primary); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

/* ─────────────────────────────────────────────────────────────────────────
   GLOBAL 3D BENTO GRID WRAPPER
───────────────────────────────────────────────────────────────────────── */
.global-grid-wrapper {
  width: 100%; transform-style: preserve-3d; transition: transform 0.1s linear; will-change: transform;
}
.bento { 
  display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-flow: dense; 
  gap: clamp(16px, 2vw, 24px); width: 100%; transform-style: preserve-3d; perspective: 2000px; 
}
.c1 { grid-column: span 1; } .c2 { grid-column: span 2; } .c3 { grid-column: span 3; } .c4 { grid-column: span 4; }

@media(max-width: 1024px) { .bento { grid-template-columns: repeat(3, 1fr); } .c4, .c3 { grid-column: span 3; } .c2 { grid-column: span 2; } }
@media(max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } .c4, .c3, .c2 { grid-column: span 2; } .c1 { grid-column: span 1; } }
@media(max-width: 640px) { 
  .hp-body { padding: 80px 16px 48px; gap: 50px; }
  .bento { grid-template-columns: repeat(1, 1fr); gap: 20px; } 
  .c1, .c2, .c3, .c4 { grid-column: span 1 !important; }
}

/* ─────────────────────────────────────────────────────────────────────────
   INDIVIDUAL TILT CARDS (The Secret Sauce)
───────────────────────────────────────────────────────────────────────── */
.tilt-wrapper {
  background: var(--surf-glass); border: 1px solid var(--border); border-radius: var(--r); 
  position: relative; display: flex; flex-direction: column; overflow: hidden;
  transform-style: preserve-3d; transition: border-color 0.5s var(--ease), box-shadow 0.5s var(--ease);
  box-shadow: 0 15px 35px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  will-change: transform;
}
.tilt-wrapper:hover {
  border-color: var(--border-h);
  box-shadow: 0 30px 60px rgba(0,0,0,0.9), 0 0 50px rgba(150, 194, 219, 0.15), inset 0 1px 0 rgba(255,255,255,0.2);
  z-index: 20;
}

/* Multi-layered Glare & Shadow */
.card-spotlight { position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.5s; mix-blend-mode: color-dodge; }
.card-glare { position: absolute; inset: 0; pointer-events: none; z-index: 50; opacity: 0; transition: opacity 0.5s; mix-blend-mode: overlay; }
.tilt-wrapper:hover .card-spotlight, .tilt-wrapper:hover .card-glare { opacity: 1; }

/* The Core Content Area - Strict Flexbox */
.card-content {
  padding: clamp(20px, 3vw, 28px); display: flex; flex-direction: column; flex: 1; gap: 20px;
  position: relative; z-index: 10; 
  transform: translateZ(40px); transform-style: preserve-3d; /* Parallax pop-out */
}

/* Widget Label */
.lbl { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); text-shadow: 0 2px 4px rgba(0,0,0,0.5); transform: translateZ(10px); }
.lbl svg { color: var(--primary); filter: drop-shadow(0 0 5px var(--primary-glow)); }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 1: 3D ANIMATED CAR SVG
───────────────────────────────────────────────────────────────────────── */
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 180px; position: relative; border-radius: var(--rsm); background: linear-gradient(180deg, transparent 20%, rgba(150, 194, 219, 0.05) 100%); overflow: hidden; transform: translateZ(20px); border: 1px solid rgba(255,255,255,0.02); }
.svg-scene { width: 100%; height: 100%; max-height: 180px; object-fit: contain; filter: drop-shadow(0 25px 25px rgba(0,0,0,0.8)); transform: translateZ(30px); }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 2: METRICS & STATS
───────────────────────────────────────────────────────────────────────── */
.stats-row { display: flex; flex: 1; width: 100%; background: rgba(0,0,0,0.4); border-radius: var(--rsm); overflow: hidden; border: 1px solid var(--border); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5); transform: translateZ(10px); }
.stat-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 10px; text-align: center; border-right: 1px solid var(--border); transition: background 0.4s var(--ease); position: relative; overflow: hidden; }
.stat-box::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top, rgba(150, 194, 219, 0.1), transparent); opacity: 0; transition: opacity 0.4s; }
.stat-box:hover::before { opacity: 1; }
.stat-box:hover { background: rgba(150, 194, 219, 0.03); transform: translateZ(10px); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: #fff; line-height: 1; text-shadow: 0 5px 15px rgba(0,0,0,0.5); }
.stat-num span { color: var(--primary); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 3: PRO-LEVEL MUSIC PLAYER (Vinyl + Visualizer)
───────────────────────────────────────────────────────────────────────── */
.music-player-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 24px; position: relative; }
.player-controls { position: absolute; top: 10px; right: 10px; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; color: #fff; opacity: 0; transition: opacity 0.3s, transform 0.3s; transform: translateZ(40px); z-index: 20; border: 1px solid rgba(255,255,255,0.2); }
.tilt-wrapper:hover .player-controls { opacity: 1; }
.player-controls:hover { background: var(--primary); color: #000; transform: translateZ(50px) scale(1.1); }

.vinyl-container { position: relative; width: clamp(90px, 20vw, 120px); height: clamp(90px, 20vw, 120px); transform-style: preserve-3d; transform: translateZ(20px); }
.vinyl-record { width: 100%; height: 100%; border-radius: 50%; background: conic-gradient(#111, #222, #111, #222, #111); border: 4px solid #0a0a0a; box-shadow: 0 20px 40px rgba(0,0,0,0.9), inset 0 0 10px rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; transition: transform 0.3s var(--ease); position: relative; overflow: hidden; }
/* Grooves */
.vinyl-record::before { content: ''; position: absolute; inset: 4px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); }
.vinyl-record::after { content: ''; position: absolute; inset: 12px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.03); }
.vinyl-record.playing { animation: spinRecord 1.8s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }

.vinyl-label { width: 38%; height: 38%; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #3a5f75); border: 2px solid #000; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 5px rgba(0,0,0,0.5); }
.vinyl-hole { width: 6px; height: 6px; border-radius: 50%; background: #000; box-shadow: inset 0 1px 2px rgba(255,255,255,0.2); }

.tonearm { position: absolute; top: -15px; right: -30px; width: 55px; height: 90px; transform-origin: 80% 10%; transform: rotate(-35deg) translateZ(30px); transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); filter: drop-shadow(8px 15px 12px rgba(0,0,0,0.8)); z-index: 10; pointer-events: none; }
.tonearm.playing { transform: rotate(18deg) translateZ(30px); }

.music-info { text-align: center; transform: translateZ(20px); width: 100%; display: flex; flex-direction: column; align-items: center; }
.music-song { font-family: 'Syne', sans-serif; font-weight: 800; color: #fff; font-size: 16px; margin-bottom: 4px; text-shadow: 0 2px 5px rgba(0,0,0,0.8); }
.music-artist { font-size: 12px; color: var(--muted); letter-spacing: 0.05em; }

/* Pro CSS Equalizer Visualizer */
.visualizer-pro { display: flex; gap: 4px; height: 24px; align-items: flex-end; margin-top: 16px; justify-content: center; opacity: 0.3; transition: opacity 0.5s; width: 100%; }
.visualizer-pro.active { opacity: 1; }
.vz-bar { width: 4px; background: var(--primary); border-radius: 2px; transform-origin: bottom; transform: scaleY(0.1); box-shadow: 0 0 8px var(--primary-glow); }
.visualizer-pro.active .vz-bar { animation: vzBounce 0.5s infinite alternate ease-in-out; }
.visualizer-pro.active .vz-bar:nth-child(1) { animation-delay: 0.0s; animation-duration: 0.4s; }
.visualizer-pro.active .vz-bar:nth-child(2) { animation-delay: 0.2s; animation-duration: 0.6s; }
.visualizer-pro.active .vz-bar:nth-child(3) { animation-delay: 0.1s; animation-duration: 0.5s; }
.visualizer-pro.active .vz-bar:nth-child(4) { animation-delay: 0.3s; animation-duration: 0.7s; }
.visualizer-pro.active .vz-bar:nth-child(5) { animation-delay: 0.15s;animation-duration: 0.45s; }
.visualizer-pro.active .vz-bar:nth-child(6) { animation-delay: 0.4s; animation-duration: 0.55s; }
@keyframes vzBounce { 0% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 4: INFINITE TECH MARQUEE
───────────────────────────────────────────────────────────────────────── */
.tech-marquee-wrapper { position: relative; display: flex; flex-direction: column; gap: 16px; overflow: hidden; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); flex: 1; justify-content: center; transform: translateZ(10px); }
.tm-track { display: flex; width: max-content; gap: 16px; }
.tm-left { animation: scrollL 30s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 8px)); animation: scrollR 30s linear infinite; }
.ticon { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; transition: all 0.4s var(--ease); backdrop-filter: blur(5px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.ticon:hover { background: rgba(150, 194, 219, 0.1); border-color: var(--primary); transform: translateY(-8px) translateZ(20px) scale(1.15); box-shadow: 0 15px 30px rgba(150, 194, 219, 0.2); z-index: 10; }
.ticon img { width: 28px; height: 28px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5)); transition: transform 0.3s; }
.ticon:hover img { transform: scale(1.1); filter: drop-shadow(0 8px 15px rgba(150, 194, 219, 0.4)); }
.inv { filter: invert(1) brightness(0.9); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 8px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 5: SOCIAL GRID
───────────────────────────────────────────────────────────────────────── */
.soc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; flex: 1; transform: translateZ(10px); }
.soc-item { background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 16px; padding: 24px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; transition: all .4s var(--ease); text-decoration: none; color: inherit; position: relative; overflow: hidden; box-shadow: inset 0 2px 10px rgba(0,0,0,0.3); }
.soc-item::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent, rgba(150, 194, 219, 0.1)); opacity: 0; transition: opacity 0.4s; }
.soc-item:hover::before { opacity: 1; }
.soc-item:hover { border-color: var(--primary); transform: translateY(-6px) translateZ(25px); box-shadow: 0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(150, 194, 219, 0.15); }
.soc-item svg, .soc-item span.icon-text { font-size: 28px; transition: transform 0.4s var(--ease-bounce); }
.soc-item:hover svg, .soc-item:hover span.icon-text { transform: scale(1.2) translateY(-2px); color: var(--primary); }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 6: BLOG & TEXT
───────────────────────────────────────────────────────────────────────── */
.blog-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; line-height: 1.3; color: #fff; transform: translateZ(15px); margin-bottom: 8px; }
.blog-desc { font-size: 13.5px; line-height: 1.6; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 20px; transform: translateZ(10px); }
.read-pill { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 10px 20px; border-radius: 100px; text-decoration: none; transition: all .4s var(--ease); margin-top: auto; align-self: flex-start; transform: translateZ(20px); }
.read-pill:hover { background: var(--primary); color: #000; border-color: var(--primary); transform: translateY(-3px) translateZ(30px); box-shadow: 0 10px 25px rgba(150, 194, 219, 0.3); }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 7: MAP WITH RADAR
───────────────────────────────────────────────────────────────────────── */
.map-link { flex: 1; display: flex; flex-direction: column; text-decoration: none; border-radius: var(--rsm); overflow: hidden; min-height: 200px; position: relative; transition: opacity 0.3s, transform 0.5s var(--ease); transform: translateZ(10px); border: 1px solid rgba(255,255,255,0.02); }
.map-link:hover { opacity: 0.9; transform: translateZ(30px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
.map-wrap { width: 100%; height: 100%; position: absolute; inset: 0; pointer-events: none; }
.map-wrap iframe { width: 100%; height: 100%; border: 0; filter: invert(95%) hue-rotate(180deg) saturate(1.8) contrast(0.85); transition: filter 0.5s; }
.map-link:hover iframe { filter: invert(95%) hue-rotate(180deg) saturate(2) contrast(1); }
.radar-ping { position: absolute; top: 50%; left: 50%; width: 14px; height: 14px; background: var(--primary); border-radius: 50%; transform: translate(-50%, -50%); z-index: 10; box-shadow: 0 0 15px var(--primary); }
.radar-ping::after { content: ''; position: absolute; inset: -15px; border: 2px solid var(--primary); border-radius: 50%; animation: radar 2s infinite cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes radar { 0% { transform: scale(0.2); opacity: 1; } 100% { transform: scale(3.5); opacity: 0; } }

/* ─────────────────────────────────────────────────────────────────────────
   WIDGET 8: GRAND CTA
───────────────────────────────────────────────────────────────────────── */
.cta-card { background: linear-gradient(135deg, rgba(150, 194, 219, 0.08) 0%, rgba(229, 237, 241, 0.02) 100%) !important; border-color: rgba(150, 194, 219, 0.2) !important; }
.cta-text { font-family: 'Syne', sans-serif; font-size: clamp(26px, 3.5vw, 40px); font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 24px; transform: translateZ(30px); }
.cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--primary); color: #000; font-weight: 700; font-size: 15px; padding: 16px 32px; border-radius: 100px; text-decoration: none; align-self: flex-start; transition: all .4s var(--ease); transform: translateZ(40px); box-shadow: 0 10px 25px rgba(150, 194, 219, 0.2); }
.cta-btn:hover { background: #fff; transform: translateY(-5px) translateZ(50px) scale(1.05); box-shadow: 0 15px 40px rgba(150, 194, 219, 0.5); }

/* REVEAL ANIMATIONS */
@keyframes revealUp { from { opacity: 0; transform: translateY(60px) translateZ(-100px) rotateX(15deg); } to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); } }
.r1 { opacity: 0; animation: revealUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.1s forwards; }
.r2 { opacity: 0; animation: revealUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.2s forwards; }
.r3 { opacity: 0; animation: revealUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards; }
.r5 { opacity: 0; animation: revealUp 1.5s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards; }

@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; box-shadow: 0 0 15px var(--primary); } 100% { opacity: 0.5; } }
`;

/* ─────────────────────────────────────────────────────────────────────────
   2. ORIGINAL DATA SETS (ABSOLUTELY UNTOUCHED)
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
   3. REUSABLE COMPLEX COMPONENTS
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
        { duration: 500, fill: "forwards", easing: "ease-out" });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <><div ref={dotRef} className="cursor-dot" /><div ref={cursorRef} className="cursor-ring" /></>
  );
};

/** Advanced 3D Canvas (Mouse Repulsion + Constellations) */
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
        this.x = (Math.random() - 0.5) * 4000;
        this.y = (Math.random() - 0.5) * 4000;
        this.z = Math.random() * 2500;
        this.size = Math.random() * 2 + 0.5;
        this.vx = 0; this.vy = 0;
      }
      update() {
        this.z -= 2; 
        if (this.z <= 0) { this.z = 2500; this.x = (Math.random() - 0.5) * 4000; this.y = (Math.random() - 0.5) * 4000; }
        
        // Advanced Mouse Repulsion Physics
        let fov = 400;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let dx = x2d - mouse.x; let dy = y2d - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
          let force = (200 - dist) / 200;
          this.vx += (dx / dist) * force * 0.5;
          this.vy += (dy / dist) * force * 0.5;
        }
        this.x += this.vx; this.y += this.vy;
        this.vx *= 0.95; this.vy *= 0.95; // Friction
      }
      draw() {
        let fov = 400;
        let x2d = (this.x * fov) / this.z + width / 2;
        let y2d = (this.y * fov) / this.z + height / 2;
        let scale = fov / this.z;
        let opacity = Math.min(1, scale * 1.5);

        ctx.fillStyle = `rgba(150, 194, 219, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
        ctx.fill();

        // Constellation Network
        particles.forEach(p2 => {
          let p2x2d = (p2.x * fov) / p2.z + width / 2;
          let p2y2d = (p2.y * fov) / p2.z + height / 2;
          let dx = x2d - p2x2d; let dy = y2d - p2y2d;
          let dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100 * scale) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 194, 219, ${0.15 * opacity * (1 - dist/(100*scale))})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(p2x2d, p2y2d);
            ctx.stroke();
          }
        });
      }
    }

    for (let i = 0; i < 250; i++) particles.push(new Particle());
    const animate = () => { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); };
    animate();
  }, []);
  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/** Perfect 3D Flexbox Tilt Card */
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
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

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
      <div className="card-spotlight" style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(150, 194, 219, 0.15), transparent 40%)` }} />
      <div className="card-glare" style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 40%)` }} />
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   4. MAIN HOMEPAGE (The Awwwards Assembly)
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [siteLoaded, setSiteLoaded] = useState(false);
  
  // Global 3D Grid Tracking
  const [gridTransform, setGridTransform] = useState("perspective(2000px) rotateX(0deg) rotateY(0deg)");

  // Cinematic Intro
  useEffect(() => {
    const timer = setTimeout(() => setSiteLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Global Mouse Parallax
  useEffect(() => {
    const handleGlobalMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6; // Max 3 deg
      const y = (e.clientY / window.innerHeight - 0.5) * -6;
      setGridTransform(`perspective(2000px) rotateX(${y}deg) rotateY(${x}deg)`);
    };
    window.addEventListener('mousemove', handleGlobalMouse);
    return () => window.removeEventListener('mousemove', handleGlobalMouse);
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

  const togglePlay = (e) => {
    e.stopPropagation();
    if(audioRef.current) {
      if(isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(()=>console.log("Autoplay prevented"));
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <style>{MEGA_CSS}</style>

      {/* Cinematic Split-Screen Preloader */}
      <div className={`preloader-wrap ${siteLoaded ? 'hidden' : ''}`}>
        <div className="pl-bg-top" />
        <div className="pl-bg-bottom" />
        <div className="pl-content">
          <div className="pl-brand">
            <span className="pl-letter">D</span>
            <span className="pl-letter">A</span>
            <span className="pl-letter">R</span>
            <span className="pl-letter">S</span>
            <span className="pl-letter">H</span>
          </div>
          <div className="pl-bar-wrap"><div className="pl-bar" /></div>
        </div>
      </div>

      <div className="noise-overlay" />
      <div className="ambient-light" />
      <CustomCursor />
      
      <div className="hp">
        <Canvas3D />

        <div className="hp-body" style={{ opacity: siteLoaded ? 1 : 0, transition: 'opacity 1s ease 1s' }}>
          
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

          {/* GLOBAL 3D GRID WRAPPER */}
          <div className="global-grid-wrapper r5" style={{ transform: gridTransform }}>
            <div className="bento">

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
                    <g transform="translate(100, 115)"><circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" /><line x1="-14" y1="0" x2="14" y2="0" stroke="var(--violet)" strokeWidth="2" /><line x1="0" y1="-14" x2="0" y2="14" stroke="var(--violet)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--teal)" /></g></g>
                    <g transform="translate(180, 115)"><circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="var(--violet)" strokeWidth="3" /><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.4s" repeatCount="indefinite" /><line x1="-14" y1="0" x2="14" y2="0" stroke="var(--violet)" strokeWidth="2" /><line x1="0" y1="-14" x2="0" y2="14" stroke="var(--violet)" strokeWidth="2" /><circle cx="0" cy="0" r="4" fill="var(--teal)" /></g></g>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '10px', transform: 'translateZ(15px)' }}>
                  <img src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                  <img src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=96c2db&text_color=ffffff&icon_color=e5edf1&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ width: '100%', overflowX: 'auto', marginTop: '16px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', transform: 'translateZ(25px)' }}>
                 <img src={`https://ghchart.rshah.org/96c2db/DWRSH?v=${Date.now()}`} alt="GitHub Commits" style={{ minWidth: '600px', width: '100%', filter: 'hue-rotate(345deg) saturate(1.2)' }} />
                </div>
              </TiltCard>

              {/* CARD 4: ADVANCED MUSIC PLAYER WITH CSS EQUALIZER */}
              <TiltCard className="c1 interactable" style={{minHeight: '220px'}} onClick={togglePlay}>
                <div className="lbl"><Headphones size={13}/>Vibes</div>
                <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
                <div className="music-player-wrap">
                  <div className="player-controls">
                    {isPlaying ? <Pause fill="#fff" size={16}/> : <Play fill="#fff" size={16} style={{marginLeft: '2px'}}/>}
                  </div>
                  <div className="vinyl-container">
                    <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                      <div className="vinyl-label"><div className="vinyl-hole"/></div>
                    </div>
                    <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                      <circle cx="30" cy="10" r="8" fill="#444" stroke="#111" strokeWidth="2"/>
                      <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#bbb" strokeWidth="4" strokeLinecap="round"/>
                      <rect x="2" y="65" width="12" height="15" rx="2" fill="#111" transform="rotate(25 8 72)"/>
                    </svg>
                  </div>
                  <div className="music-info">
                    <div className="music-song">Lo-Fi Coding</div>
                    <div className="music-artist">Lofi Study</div>
                    <div className={`visualizer-pro ${isPlaying ? 'active' : ''}`}>
                      <div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/>
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
                      <span className="icon-text">{s.icon}</span>
                      <span style={{fontWeight: 700, fontSize: '14px', color: '#fff'}}>{s.name}</span>
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
                    <Link to={latestPost.link} className="read-pill interactable">Read <ArrowRight size={12}/></Link>
                  </>
                ) : (
                  <p className="blog-desc">No posts found right now.</p>
                )}
              </TiltCard>

              {/* CARD 8: MAP WITH RADAR */}
              <TiltCard className="c1 interactable" style={{padding: 0}}>
                <div className="card-content" style={{padding: 0, height: '100%', minHeight: '180px'}}>
                  <div className="lbl" style={{padding: '20px 20px 0', position: 'absolute', zIndex: 10}}><MapPin size={13}/>Location</div>
                  <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map-link">
                    <div className="map-wrap">
                      <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" allowFullScreen="" loading="lazy" title="Map" />
                      <div className="radar-ping"></div>
                    </div>
                  </a>
                </div>
              </TiltCard>

              {/* CARD 9: GRAND CTA */}
              <TiltCard className="c2 cta-card">
                <div className="card-content" style={{justifyContent: 'center'}}>
                  <p className="cta-text">
                    Let's build <span style={{color: 'var(--teal)'}}>something great.</span>
                  </p>
                  <a href="mailto:contact@darshprajapati.dev" className="cta-btn interactable"><Mail size={16}/> Get in Touch</a>
                </div>
              </TiltCard>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
