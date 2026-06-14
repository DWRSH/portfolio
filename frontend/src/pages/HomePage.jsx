import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin,
  Github, Layers, BookOpen, ExternalLink, Headphones, Mail, Gamepad2, Play, Pause
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   PREMIUM CSS — Award Level
───────────────────────────────────────────────────────────────────────── */
const STABLE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Space+Mono:wght@400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
::selection { background: rgba(120, 180, 255, 0.35); color: #fff; }

body, html {
  cursor: none !important; overflow-x: hidden; background: #03040a;
  -webkit-font-smoothing: antialiased; font-family: 'DM Sans', sans-serif;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #03040a; }
::-webkit-scrollbar-thumb { background: rgba(120, 180, 255, 0.25); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(120, 180, 255, 0.6); }

:root {
  --bg:          #03040a;
  --surf:        rgba(8, 12, 22, 0.65);
  --surf2:       rgba(14, 20, 35, 0.8);
  --border:      rgba(255, 255, 255, 0.07);
  --border-h:    rgba(120, 180, 255, 0.4);
  --border-glow: rgba(120, 180, 255, 0.15);

  --primary:     #78b4ff;
  --primary-dim: rgba(120, 180, 255, 0.12);
  --accent1:     #b58fff;
  --accent2:     #5fffd4;
  --secondary:   #e5edf1;

  --text:        #ffffff;
  --muted:       rgba(255, 255, 255, 0.45);
  --muted2:      rgba(255, 255, 255, 0.25);

  --ease:        cubic-bezier(0.16, 1, 0.3, 1);
  --ease-back:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --r:           20px;
  --r-sm:        14px;
  --r-lg:        28px;
}

/* ── PRELOADER ── */
.preloader {
  position: fixed; inset: 0; z-index: 99999; background: var(--bg);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 0.9s var(--ease), visibility 0.9s;
}
.preloader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
.pl-brand {
  font-family: 'Syne', sans-serif; font-size: 38px; font-weight: 800;
  color: #fff; letter-spacing: 0.25em; display: flex; gap: 6px; margin-bottom: 24px;
}
.pl-brand span { color: var(--primary); }
.pl-counter {
  font-family: 'Space Mono', monospace; font-size: 12px;
  color: var(--muted); margin-bottom: 14px; letter-spacing: 0.15em;
}
.pl-bar-container {
  width: 220px; height: 1.5px; background: rgba(255,255,255,0.08);
  overflow: visible; border-radius: 4px; position: relative;
}
.pl-bar-fill {
  height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent1));
  width: 0%; border-radius: 4px; position: relative;
  box-shadow: 0 0 16px var(--primary), 0 0 30px rgba(120, 180, 255, 0.3);
  transition: width 0.1s linear;
}
.pl-bar-fill::after {
  content: ''; position: absolute; right: 0; top: -3px;
  width: 8px; height: 8px; border-radius: 50%;
  background: #fff; box-shadow: 0 0 12px var(--primary);
}

/* ── AURORA BACKGROUND ── */
.aurora-bg {
  position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
}
.aurora-orb {
  position: absolute; border-radius: 50%; filter: blur(80px);
  animation: auroraFloat 18s ease-in-out infinite;
  mix-blend-mode: screen;
}
.aurora-orb-1 {
  width: 55vw; height: 55vw; top: -20%; left: -15%;
  background: radial-gradient(ellipse, rgba(70, 130, 255, 0.18) 0%, transparent 70%);
  animation-duration: 20s; animation-delay: 0s;
}
.aurora-orb-2 {
  width: 45vw; height: 45vw; top: 10%; right: -10%;
  background: radial-gradient(ellipse, rgba(140, 90, 255, 0.14) 0%, transparent 70%);
  animation-duration: 24s; animation-delay: -7s;
}
.aurora-orb-3 {
  width: 40vw; height: 40vw; bottom: 10%; left: 20%;
  background: radial-gradient(ellipse, rgba(30, 220, 190, 0.1) 0%, transparent 70%);
  animation-duration: 28s; animation-delay: -14s;
}
.aurora-orb-4 {
  width: 30vw; height: 30vw; top: 50%; right: 20%;
  background: radial-gradient(ellipse, rgba(100, 160, 255, 0.12) 0%, transparent 70%);
  animation-duration: 22s; animation-delay: -4s;
}
@keyframes auroraFloat {
  0%,100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(4%, 6%) scale(1.05); }
  50% { transform: translate(-3%, 3%) scale(0.97); }
  75% { transform: translate(5%, -4%) scale(1.03); }
}

/* Aurora grid overlay */
.aurora-grid {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
  background-image:
    linear-gradient(rgba(120,180,255,1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120,180,255,1) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}

/* ── NOISE ── */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9990; opacity: 0.03;
  background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E');
}

/* ── CURSOR ── */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 5px; height: 5px;
  background: #fff; border-radius: 50%; pointer-events: none; z-index: 100000;
  transform: translate3d(-50%, -50%, 0); box-shadow: 0 0 12px rgba(120,180,255,0.9);
  transition: transform 0.05s;
}
.cursor-ring {
  position: fixed; top: 0; left: 0; width: 36px; height: 36px;
  border: 1px solid rgba(120, 180, 255, 0.5); border-radius: 50%; pointer-events: none;
  z-index: 99999; transform: translate3d(-50%, -50%, 0);
  transition: width 0.4s var(--ease), height 0.4s var(--ease), background 0.3s, opacity 0.3s;
}
.cursor-ring.hovering {
  width: 56px; height: 56px;
  background: rgba(120, 180, 255, 0.08); border-color: rgba(120,180,255,0.3);
}

/* ── CANVAS ── */
.canvas-3d {
  position: fixed; inset: 0; width: 100vw; height: 100vh;
  z-index: 0; pointer-events: none; opacity: 0.5;
}

/* ── LAYOUT ── */
.hp-body {
  position: relative; z-index: 1; max-width: 1240px; margin: 0 auto;
  padding: 130px 28px 100px; display: flex; flex-direction: column; gap: 96px;
}

/* ── HERO ── */
.hero { display: flex; flex-direction: column; position: relative; z-index: 10; }

.hero-pill {
  display: inline-flex; align-items: center; gap: 10px; padding: 9px 22px;
  border-radius: 100px; border: 1px solid rgba(120, 180, 255, 0.25);
  background: rgba(120, 180, 255, 0.06); color: var(--primary);
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  margin-bottom: 36px; width: fit-content; backdrop-filter: blur(10px);
}
.hero-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--accent2);
  box-shadow: 0 0 12px var(--accent2); animation: pulse 2s ease-in-out infinite;
}

.hero-name {
  font-family: 'Syne', sans-serif; font-size: clamp(64px, 15vw, 200px);
  font-weight: 800; line-height: 0.88; letter-spacing: -0.045em; margin-bottom: 48px;
}
.hero-solid { color: #fff; }
.hero-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
  transition: all 0.5s var(--ease); display: inline-block;
}
.hero-outline:hover {
  -webkit-text-stroke-color: var(--primary);
  text-shadow: 0 0 80px rgba(120,180,255,0.2), 8px 8px 0 rgba(120,180,255,0.08);
  transform: skewX(-2deg) translateY(-6px);
}

.hero-bottom {
  display: flex; flex-direction: column; gap: 28px;
}
@media(min-width: 800px) {
  .hero-bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; }
}
.hero-bio {
  font-size: 17px; font-weight: 300; line-height: 1.7; color: var(--muted);
  max-width: 520px; letter-spacing: 0.01em;
}
.hero-bio strong { color: rgba(255,255,255,0.85); font-weight: 500; }

.hbtn {
  display: inline-flex; align-items: center; gap: 10px; padding: 15px 30px;
  border-radius: 100px; font-size: 14px; font-weight: 600; text-decoration: none;
  transition: all 0.35s var(--ease); letter-spacing: 0.01em;
}
.hbtn-primary {
  background: linear-gradient(135deg, var(--primary), var(--accent1));
  color: #03040a; box-shadow: 0 4px 20px rgba(120,180,255,0.25);
}
.hbtn-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 40px rgba(120,180,255,0.4);
}
.hbtn-sec {
  border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.03); backdrop-filter: blur(10px);
}
.hbtn-sec:hover {
  border-color: rgba(120,180,255,0.4); background: rgba(120,180,255,0.08);
  color: var(--primary); transform: translateY(-4px);
}

/* ══════════════════════════════════════════════
   PREMIUM BENTO GRID
══════════════════════════════════════════════ */
.bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: auto;
  gap: 16px;
  width: 100%;
}

/* Card span classes */
.bc-3  { grid-column: span 3; }
.bc-4  { grid-column: span 4; }
.bc-5  { grid-column: span 5; }
.bc-6  { grid-column: span 6; }
.bc-7  { grid-column: span 7; }
.bc-8  { grid-column: span 8; }
.bc-9  { grid-column: span 9; }
.bc-12 { grid-column: span 12; }
.br-2  { grid-row: span 2; }

/* Tablet */
@media(max-width: 1080px) {
  .bento { grid-template-columns: repeat(6, 1fr); }
  .bc-3  { grid-column: span 3; }
  .bc-4  { grid-column: span 3; }
  .bc-5  { grid-column: span 6; }
  .bc-6  { grid-column: span 6; }
  .bc-7  { grid-column: span 6; }
  .bc-8  { grid-column: span 6; }
  .bc-9  { grid-column: span 6; }
  .bc-12 { grid-column: span 6; }
}

/* Mobile */
@media(max-width: 640px) {
  .bento { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .bc-3,.bc-4,.bc-5,.bc-6,.bc-7,.bc-8,.bc-9,.bc-12 { grid-column: span 2; }
  .bc-mob-1 { grid-column: span 1 !important; }
  .br-2 { grid-row: span 1; }
}

/* ── STABLE CARD ── */
.stable-card {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: var(--r);
  display: flex; flex-direction: column; overflow: hidden; position: relative;
  transition: transform 0.25s ease-out, border-color 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  will-change: transform;
}
.stable-card::before {
  content: ''; position: absolute; inset: 0; border-radius: var(--r);
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%);
  pointer-events: none; z-index: 1;
}
.stable-card:hover {
  border-color: rgba(120, 180, 255, 0.25);
  box-shadow:
    0 0 0 1px rgba(120,180,255,0.08),
    0 20px 50px rgba(0,0,0,0.6),
    0 0 30px rgba(120,180,255,0.08);
  z-index: 10;
}

.card-content {
  padding: 22px; display: flex; flex-direction: column; flex: 1;
  gap: 14px; z-index: 2; position: relative;
}
.card-glare {
  position: absolute; inset: 0; pointer-events: none; z-index: 3;
  opacity: 0; transition: opacity 0.4s; border-radius: var(--r);
}
.stable-card:hover .card-glare { opacity: 1; }

/* ── LABEL ── */
.lbl {
  display: flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--muted2);
}
.lbl svg { color: var(--primary); opacity: 0.8; }
.lbl-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent2); box-shadow: 0 0 8px var(--accent2);
  animation: pulse 2.5s ease-in-out infinite;
}

/* ── STATS ── */
.stats-row {
  display: flex; flex: 1; background: rgba(0,0,0,0.25); border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.04); overflow: hidden;
}
.stat-box {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 22px 10px;
  border-right: 1px solid rgba(255,255,255,0.04);
  transition: background 0.3s;
}
.stat-box:hover { background: rgba(120, 180, 255, 0.05); }
.stat-box:last-child { border-right: none; }
.stat-num {
  font-family: 'Syne', sans-serif; font-size: clamp(30px, 4vw, 46px);
  font-weight: 800; color: #fff; line-height: 1;
  background: linear-gradient(135deg, #fff 30%, var(--primary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-num span { color: var(--primary); -webkit-text-fill-color: var(--primary); }
.stat-lbl {
  font-size: 10px; color: var(--muted); margin-top: 6px;
  text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;
}

/* ── GITHUB ── */
.gh-wrap {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px; margin-top: 8px;
}
.gh-img {
  width: 100%; background: rgba(0,0,0,0.2); border-radius: 12px;
  border: 1px solid var(--border); padding: 10px; object-fit: contain;
}

/* ── MUSIC ── */
.music-player-wrap {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex: 1; gap: 18px;
}
.vinyl-container { position: relative; width: 90px; height: 90px; }
.vinyl-record {
  width: 100%; height: 100%; border-radius: 50%;
  background: repeating-radial-gradient(#0d0d0d 0%, #1a1a1a 4%, #0a0a0a 8%);
  border: 3px solid rgba(0,0,0,0.8); box-shadow: 0 12px 30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center;
}
.vinyl-record.playing { animation: spinRecord 2.5s linear infinite; }
@keyframes spinRecord { 100% { transform: rotate(360deg); } }
.vinyl-label {
  width: 36%; height: 36%; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent1));
  box-shadow: 0 0 20px rgba(120,180,255,0.5);
}
.tonearm {
  position: absolute; top: -10px; right: -18px; width: 42px; height: 75px;
  transform-origin: 80% 10%; transform: rotate(-35deg);
  transition: transform 0.5s var(--ease); filter: drop-shadow(3px 8px 6px rgba(0,0,0,0.9));
  pointer-events: none;
}
.tonearm.playing { transform: rotate(12deg); }
.music-info { text-align: center; width: 100%; }
.visualizer {
  display: flex; gap: 3px; height: 18px; align-items: flex-end;
  justify-content: center; opacity: 0.15; transition: opacity 0.5s; margin-top: 10px;
}
.visualizer.active { opacity: 1; }
.vz-bar {
  width: 3px; background: linear-gradient(to top, var(--primary), var(--accent1));
  border-radius: 2px; transform-origin: bottom; transform: scaleY(0.2);
}
.visualizer.active .vz-bar { animation: vzBounce 0.5s infinite alternate ease-in-out; }
.vz-bar:nth-child(1){animation-duration:0.35s;} .vz-bar:nth-child(2){animation-duration:0.55s;}
.vz-bar:nth-child(3){animation-duration:0.45s;} .vz-bar:nth-child(4){animation-duration:0.65s;}
.vz-bar:nth-child(5){animation-duration:0.4s;}
@keyframes vzBounce { 0%{transform:scaleY(0.15);} 100%{transform:scaleY(1);} }

/* ── TECH MARQUEE ── */
.tech-marquee-wrapper {
  position: relative; display: flex; flex-direction: column; gap: 14px;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  flex: 1; justify-content: center;
}
.tm-track { display: flex; width: max-content; gap: 12px; }
.tm-left { animation: scrollL 22s linear infinite; }
.tm-right { transform: translateX(calc(-50% - 6px)); animation: scrollR 26s linear infinite; }
.ticon {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; width: 46px; height: 46px; display: flex; align-items: center;
  justify-content: center; transition: all 0.3s var(--ease); flex-shrink: 0;
}
.ticon:hover {
  border-color: rgba(120,180,255,0.3); transform: translateY(-5px);
  background: rgba(120,180,255,0.08); box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}
.ticon img { width: 24px; height: 24px; object-fit: contain; }
.inv { filter: invert(1) brightness(0.85); }
@keyframes scrollL { to { transform: translateX(calc(-50% - 6px)); } }
@keyframes scrollR { to { transform: translateX(0); } }

/* ── SOCIALS ── */
.soc-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px; flex: 1;
}
.soc-item {
  background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: var(--r-sm);
  padding: 18px 10px; display: flex; flex-direction: column; align-items: center; gap: 9px;
  transition: all 0.35s var(--ease); text-decoration: none; color: inherit;
  position: relative; overflow: hidden;
}
.soc-item::before {
  content: ''; position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(ellipse at 50% 120%, rgba(120,180,255,0.15), transparent 70%);
  transition: opacity 0.3s;
}
.soc-item:hover { border-color: rgba(120,180,255,0.3); transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.5); }
.soc-item:hover::before { opacity: 1; }
.soc-icon { font-size: 22px; }
.soc-name { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.85); letter-spacing: 0.02em; }

/* ── CAR ── */
.car-wrap {
  flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 150px;
  background: linear-gradient(180deg, transparent 0%, rgba(120,180,255,0.04) 100%);
  border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.03);
}
.svg-scene { width: 100%; height: 100%; max-height: 155px; object-fit: contain; }

/* ── BLOG ── */
.blog-title {
  font-family: 'Syne', sans-serif; font-size: 19px; font-weight: 700;
  line-height: 1.3; color: #fff; margin-bottom: 6px;
}
.blog-desc {
  font-size: 13px; line-height: 1.7; color: var(--muted);
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
  overflow: hidden;
}
.read-pill {
  display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary);
  background: rgba(120,180,255,0.06); border: 1px solid rgba(120,180,255,0.2);
  padding: 9px 18px; border-radius: 100px; text-decoration: none;
  transition: all 0.3s var(--ease); align-self: flex-start; margin-top: auto;
}
.read-pill:hover {
  background: var(--primary); color: #03040a; border-color: var(--primary);
  transform: translateY(-2px); box-shadow: 0 8px 20px rgba(120,180,255,0.3);
}

/* ── MAP ── */
.map-link {
  flex: 1; position: relative; border-radius: var(--r-sm); overflow: hidden;
  min-height: 170px; border: 1px solid var(--border); display: block;
  transition: opacity 0.3s; cursor: pointer;
}
.map-link:hover { opacity: 0.85; }
.map-link iframe {
  width: 100%; height: 100%; border: 0;
  filter: invert(95%) hue-rotate(180deg) saturate(1.6) contrast(0.82) brightness(0.95);
  position: absolute; inset: 0; pointer-events: none;
}
.map-badge {
  position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  background: rgba(3,4,10,0.85); backdrop-filter: blur(12px);
  border: 1px solid rgba(120,180,255,0.2); border-radius: 100px;
  padding: 7px 16px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.8);
  display: flex; align-items: center; gap: 6px; white-space: nowrap; z-index: 5;
}

/* ── CTA ── */
.cta-card {
  background: linear-gradient(135deg, rgba(120,180,255,0.07) 0%, rgba(140,90,255,0.05) 50%, rgba(95,255,212,0.04) 100%) !important;
  border-color: rgba(120,180,255,0.15) !important;
  position: relative; overflow: hidden;
}
.cta-card::after {
  content: ''; position: absolute; top: -50%; right: -20%;
  width: 400px; height: 400px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(ellipse, rgba(120,180,255,0.08) 0%, transparent 70%);
}
.cta-text {
  font-family: 'Syne', sans-serif; font-size: clamp(26px, 4vw, 44px);
  font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 26px; position: relative; z-index: 2;
}
.cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, var(--primary), var(--accent1));
  color: #03040a; font-weight: 700; font-size: 14px; padding: 15px 30px;
  border-radius: 100px; text-decoration: none; transition: all 0.35s var(--ease);
  align-self: flex-start; position: relative; z-index: 2;
  box-shadow: 0 4px 20px rgba(120,180,255,0.25);
}
.cta-btn:hover {
  transform: translateY(-4px); box-shadow: 0 16px 40px rgba(120,180,255,0.4);
  background: linear-gradient(135deg, #a8d0ff, #d4b0ff);
}

/* ── DIVIDER ── */
.section-divider {
  display: flex; align-items: center; gap: 16px; margin-bottom: -60px;
}
.divider-line {
  flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(120,180,255,0.2), transparent);
}
.divider-label {
  font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--muted2);
}

/* ── ANIMATIONS ── */
@keyframes pulse {
  0%,100% { opacity: 0.5; }
  50% { opacity: 1; box-shadow: 0 0 12px var(--primary); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── MOBILE EXTRAS ── */
@media(max-width: 640px) {
  .hp-body { padding: 100px 16px 60px; gap: 56px; }
  .hero-name { margin-bottom: 30px; }
  .card-content { padding: 18px; }
  .stat-box { padding: 16px 6px; }
  .music-player-wrap { gap: 14px; }
  .cta-text { font-size: clamp(22px, 7vw, 30px); }
}
`;

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */
const TECH_ROW_1 = [
  {name:'React',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'Node JS',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'MongoDB',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'},
  {name:'Python',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'FastAPI',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'},
  {name:'HTML5',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
  {name:'CSS3',       url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
];
const TECH_ROW_2 = [
  {name:'JavaScript', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'TypeScript', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'Docker',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'GitHub',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', inv:true},
  {name:'Figma',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
  {name:'Tailwind',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
  {name:'AWS',        url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', inv:true},
];
const MARQUEE_1 = [...TECH_ROW_1, ...TECH_ROW_1];
const MARQUEE_2 = [...TECH_ROW_2, ...TECH_ROW_2];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',   href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', href:'https://www.linkedin.com/in/darshprajapati15'},
  {icon:'𝕏',  name:'Twitter',  href:'#'},
];

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────── */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dotRef.current)  dotRef.current.style.transform  = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (ringRef.current) ringRef.current.animate(
        { transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)` },
        { duration: 450, fill: "forwards" }
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

/* Aurora Background */
const AuroraBG = () => (
  <div className="aurora-bg">
    <div className="aurora-orb aurora-orb-1" />
    <div className="aurora-orb aurora-orb-2" />
    <div className="aurora-orb aurora-orb-3" />
    <div className="aurora-orb aurora-orb-4" />
    <div className="aurora-grid" />
  </div>
);

/* Enhanced Star Canvas */
const Canvas3D = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: W / 2, y: H / 2 };

    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = (Math.random() - 0.5) * 3200;
        this.y = (Math.random() - 0.5) * 3200;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 1.2 + 0.3;
        this.color = Math.random() > 0.7
          ? `rgba(180, 210, 255,`
          : `rgba(120, 180, 255,`;
      }
      update() {
        this.z -= 1.2;
        if (this.z <= 0) this.reset(), this.z = 2000;
      }
      draw() {
        const fov = 380;
        const x2d = (this.x * fov) / this.z + W / 2;
        const y2d = (this.y * fov) / this.z + H / 2;
        const xOff = (mouse.x - W / 2) * (800 / this.z) * 0.08;
        const yOff = (mouse.y - H / 2) * (800 / this.z) * 0.08;
        const scale = fov / this.z;
        const alpha = Math.min(1, scale * 1.2);
        ctx.fillStyle = `${this.color}${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d - xOff, y2d - yOff, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const stars = Array.from({ length: 250 }, () => new Star());
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => { s.update(); s.draw(); });
      requestAnimationFrame(tick);
    };
    tick();
  }, []);
  return <canvas ref={canvasRef} className="canvas-3d" />;
};

/* Premium Tilt Card */
const StableCard = ({ children, className = '', style, onClick }) => {
  const ref = useRef(null);
  const [tform, setTform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: -1000, y: -1000 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -4.5;
    const ry = ((x - cx) / cx) * 4.5;
    setTform(`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`);
    setGlarePos({ x, y });
  };
  const onLeave = () => {
    setTform('perspective(1200px) rotateX(0deg) rotateY(0deg)');
    setGlarePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={ref}
      className={`stable-card ${className}`}
      style={{ ...style, transform: tform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => document.querySelector('.cursor-ring')?.classList.add('hovering')}
      onMouseOut={() => document.querySelector('.cursor-ring')?.classList.remove('hovering')}
      onClick={onClick}
    >
      <div
        className="card-glare"
        style={{
          background: `radial-gradient(500px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.07), transparent 40%)`
        }}
      />
      <div className="card-content">{children}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   HOMEPAGE
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [percent, setPercent] = useState(0);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.floor(Math.random() * 7) + 2;
      if (v >= 100) { v = 100; clearInterval(t); setTimeout(() => setSiteLoaded(true), 300); }
      setPercent(v);
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/blogs');
        if (r.data?.length > 0) {
          const p = r.data[0];
          setLatestPost({ title: p.title, desc: p.desc || 'Read this article.', link: `/blog/${p.slug || p._id}` });
        }
      } catch (e) { console.error(e); } finally { setLoadingPost(false); }
    })();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.volume = 0.4; audioRef.current.play().catch(() => {}); setIsPlaying(true); }
  };

  return (
    <>
      <style>{STABLE_CSS}</style>

      {/* ─── PRELOADER ─── */}
      <div className={`preloader ${siteLoaded ? 'hidden' : ''}`}>
        <div className="pl-brand">D<span>ARSH</span></div>
        <div className="pl-counter">{String(percent).padStart(3,'0')}%</div>
        <div className="pl-bar-container">
          <div className="pl-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* ─── BACKGROUNDS ─── */}
      <div className="noise-overlay" />
      <AuroraBG />
      <CustomCursor />
      <Canvas3D />

      {/* ─── CONTENT ─── */}
      <div className="hp">
        <div className="hp-body" style={{ opacity: siteLoaded ? 1 : 0, transition: 'opacity 1.1s ease 0.4s' }}>

          {/* HERO */}
          <section className="hero">
            <div className="hero-pill">
              <div className="lbl-dot" />
              Available for New Projects
            </div>
            <h1 className="hero-name">
              <span className="hero-solid">DARSH</span>
            </h1>
            <div className="hero-bottom">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital architectures.
                Specialising in the <strong>MERN stack</strong> — bridging heavy-duty backends
                with pixel-perfect frontends.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary">
                  Download CV <Download size={16} />
                </a>
                <Link to="/projects" className="hbtn hbtn-sec">
                  Explore Work <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* BENTO GRID */}
          <div className="bento">

            {/* ── ROW 1: CAR (7) + STATS (5) ── */}
            <StableCard className="bc-7">
              <div className="lbl"><Gamepad2 size={12} /> Keep Moving</div>
              <div className="car-wrap">
                <svg viewBox="0 0 320 155" className="svg-scene" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(120, 180, 255, 0.5)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(120,180,255,0.15)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  {/* BG buildings */}
                  <g opacity="0.08" fill="#78b4ff">
                    <animateTransform attributeName="transform" type="translate" from="320,0" to="-320,0" dur="10s" repeatCount="indefinite" />
                    <rect x="10" y="60" width="40" height="70" /><rect x="60" y="40" width="30" height="90" />
                    <rect x="110" y="70" width="50" height="60" /><rect x="180" y="30" width="35" height="100" />
                    <rect x="230" y="55" width="45" height="75" />
                  </g>
                  {/* Road glow */}
                  <rect x="0" y="125" width="320" height="30" fill="url(#roadGrad)" opacity="0.4" />
                  {/* Road line */}
                  <line x1="0" y1="138" x2="320" y2="138" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                  <line x1="0" y1="138" x2="320" y2="138" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="25 18">
                    <animate attributeName="stroke-dashoffset" from="43" to="0" dur="0.35s" repeatCount="indefinite" />
                  </line>
                  {/* Car body */}
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,1;0,-3;0,0" dur="0.5s" repeatCount="indefinite" />
                    <path d="M 55 118 L 50 93 L 88 72 L 162 72 L 195 92 L 218 92 Q 230 92 230 104 L 230 118 Z"
                      fill="#0d1220" stroke="var(--primary)" strokeWidth="2" />
                    <path d="M 91 74 L 158 74 L 185 92 L 76 92 Z"
                      fill="#040710" stroke="rgba(120,180,255,0.4)" strokeWidth="1.5" />
                    <line x1="115" y1="74" x2="97" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"/>
                    <line x1="130" y1="74" x2="114" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"/>
                    <line x1="145" y1="74" x2="129" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"/>
                    {/* Tail lights */}
                    <rect x="50" y="99" width="9" height="11" rx="2" fill="#ff4060" opacity="0.9" />
                    <rect x="50" y="99" width="9" height="11" rx="2" fill="#ff4060">
                      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
                    </rect>
                    {/* Headlights + beam */}
                    <rect x="220" y="96" width="10" height="14" rx="2" fill="rgba(180,220,255,0.95)" />
                    <polygon points="230,96 310,68 310,125 230,110" fill="url(#beam)" opacity="0.7" />
                    {/* Undercar glow */}
                    <ellipse cx="140" cy="122" rx="80" ry="5" fill="rgba(120,180,255,0.12)" />
                  </g>
                  {/* Wheels */}
                  {[93, 182].map((cx, i) => (
                    <g key={i} transform={`translate(${cx}, 122)`}>
                      <circle cx="0" cy="0" r="16" fill="#050810" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="9" fill="none" stroke="rgba(120,180,255,0.3)" strokeWidth="1.5" />
                      <g>
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.3s" repeatCount="indefinite" />
                        <line x1="-14" y1="0" x2="14" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
                        <line x1="0" y1="-14" x2="0" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
                        <line x1="-10" y1="-10" x2="10" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <line x1="10" y1="-10" x2="-10" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      </g>
                      <circle cx="0" cy="0" r="4" fill="var(--primary)" />
                    </g>
                  ))}
                </svg>
              </div>
            </StableCard>

            <StableCard className="bc-5" style={{ background: 'transparent', border: 'none', boxShadow: 'none', backdropFilter: 'none' }}>
              <div className="stats-row" style={{ height: '100%' }}>
                <div className="stat-box">
                  <div className="stat-num">13<span>+</span></div>
                  <div className="stat-lbl">Projects</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">2<span>+</span></div>
                  <div className="stat-lbl">Years</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">6<span>+</span></div>
                  <div className="stat-lbl">Hubs</div>
                </div>
              </div>
            </StableCard>

            {/* ── ROW 2: GITHUB (9) + MUSIC (3) ── */}
            <StableCard className="bc-9">
              <div className="lbl"><Github size={12} /> Live GitHub Data <span style={{color:'var(--muted2)',marginLeft:'4px'}}>@DWRSH</span></div>
              <div className="gh-wrap">
                <img className="gh-img" src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=78b4ff&text_color=ffffff&icon_color=b58fff&hide_border=true&bg_color=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Stats" />
                <img className="gh-img" src={`https://streak-stats.demolab.com/?user=DWRSH&theme=transparent&title_color=78b4ff&text_color=ffffff&icon_color=b58fff&hide_border=true&background=00000000&cache_seconds=1800&v=${Date.now()}`} alt="GitHub Streak" />
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', overflowX: 'auto', marginTop: '4px' }}>
                <img src={`https://ghchart.rshah.org/78b4ff/DWRSH?v=${Date.now()}`} alt="GitHub Activity" style={{ minWidth: '580px', width: '100%', filter: 'saturate(1.3)' }} />
              </div>
            </StableCard>

            <StableCard className="bc-3" style={{ minHeight: '240px', cursor: 'pointer' }} onClick={togglePlay}>
              <div className="lbl" style={{ justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><Headphones size={12} /> Vibes</span>
                <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                  {isPlaying ? <Pause size={13} fill="var(--primary)" /> : <Play size={13} fill="var(--primary)" />}
                </span>
              </div>
              <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="auto" />
              <div className="music-player-wrap">
                <div className="vinyl-container">
                  <div className={`vinyl-record ${isPlaying ? 'playing' : ''}`}>
                    <div className="vinyl-label" />
                  </div>
                  <svg className={`tonearm ${isPlaying ? 'playing' : ''}`} viewBox="0 0 40 80">
                    <circle cx="30" cy="10" r="7" fill="#222" stroke="#111" strokeWidth="1.5" />
                    <path d="M 30 10 Q 30 48 10 68" fill="none" stroke="#888" strokeWidth="3.5" strokeLinecap="round" />
                    <rect x="2" y="63" width="10" height="13" rx="2" fill="#111" transform="rotate(25 7 70)" />
                  </svg>
                </div>
                <div className="music-info">
                  <div style={{ fontFamily: 'Syne', fontWeight: 800, color: '#fff', fontSize: '15px', letterSpacing: '0.02em' }}>Lo-Fi Coding</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px' }}>Lofi Study</div>
                  <div className={`visualizer ${isPlaying ? 'active' : ''}`}>
                    <div className="vz-bar"/><div className="vz-bar"/><div className="vz-bar"/>
                    <div className="vz-bar"/><div className="vz-bar"/>
                  </div>
                </div>
              </div>
            </StableCard>

            {/* ── ROW 3: BLOG (3) + TECH (5) + SOCIAL (4) ── */}
            <StableCard className="bc-3">
              <div className="lbl"><BookOpen size={12} /> Latest Post</div>
              {loadingPost ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', animation: 'pulse 1.5s infinite' }}>Syncing…</span>
                </div>
              ) : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <Link to={latestPost.link} className="read-pill">Read Article <ArrowRight size={12} /></Link>
                </>
              ) : (
                <p className="blog-desc" style={{ marginTop: '8px' }}>No posts yet.</p>
              )}
            </StableCard>

            <StableCard className="bc-5">
              <div className="lbl"><Layers size={12} /> Tech Stack</div>
              <div className="tech-marquee-wrapper">
                <div className="tm-track tm-left">
                  {MARQUEE_1.map((t, i) => (
                    <div className="ticon" title={t.name} key={`m1-${i}`}>
                      <img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''} />
                    </div>
                  ))}
                </div>
                <div className="tm-track tm-right">
                  {MARQUEE_2.map((t, i) => (
                    <div className="ticon" title={t.name} key={`m2-${i}`}>
                      <img src={t.url} alt={t.name} className={t.inv ? 'inv' : ''} />
                    </div>
                  ))}
                </div>
              </div>
            </StableCard>

            <StableCard className="bc-4">
              <div className="lbl"><ExternalLink size={12} /> Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s => (
                  <a className="soc-item" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span className="soc-icon">{s.icon}</span>
                    <span className="soc-name">{s.name}</span>
                  </a>
                ))}
              </div>
            </StableCard>

            {/* ── ROW 4: MAP (4) + CTA (8) ── */}
            <StableCard className="bc-4" style={{ padding: 0, minHeight: '220px' }}>
              <div className="card-content" style={{ padding: 0, height: '100%', position: 'relative' }}>
                <div className="lbl" style={{ padding: '20px 20px 0', position: 'absolute', zIndex: 10 }}>
                  <MapPin size={12} /> Location
                </div>
                <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map-link">
                  <iframe src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" allowFullScreen loading="lazy" title="Map" style={{ width: '100%', height: '100%', border: '0', filter: 'invert(95%) hue-rotate(180deg) saturate(1.8) contrast(0.82) brightness(0.95)' }} />
                  <div className="map-badge"><MapPin size={11} /> Idar, Gujarat</div>
                </a>
              </div>
            </StableCard>

            <StableCard className="bc-8 cta-card">
              <div className="card-content" style={{ justifyContent: 'center', alignItems: 'flex-start', minHeight: '180px' }}>
                <p className="cta-text">
                  Ready to build{' '}
                  <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    something extraordinary?
                  </span>
                </p>
                <a href="mailto:contact@darshprajapati.dev" className="cta-btn">
                  <Mail size={16} /> Start a Project
                </a>
              </div>
            </StableCard>

          </div>
        </div>
      </div>
    </>
  );
}
