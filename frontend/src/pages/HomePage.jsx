import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, MapPin, Github, Layers, BookOpen, 
  ExternalLink, Headphones, Mail, Gamepad2, Activity, Shield, Scan
} from "lucide-react";

import api from '../api/axios';

/* ─────────────────────────────────────────────────────────────────────────
   STYLES (Perfect Grid + Car SVG + Unique Engineer Components)
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

/* 🔴 STRICT MOBILE LAYOUT */
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
.car-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; min-height: 140px; position: relative; overflow: hidden; padding: 0; border-radius: var(--rsm); background: linear-gradient(to bottom, transparent 30%, rgba(0,212,180,0.03) 100%); }
.svg-scene { width: 100%; height: 100%; max-height: 150px; object-fit: contain; }

/* ── UNIQUE: STOCKWATCHER LIVE PULSE ── */
.sw-wrap { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(180deg, rgba(0,212,180,0.02) 0%, rgba(0,212,180,0.08) 100%); border-radius: var(--rsm); padding: 12px; position: relative; overflow: hidden; min-height: 120px; border: 1px solid rgba(0,212,180,0.1); }
.sw-header { position: absolute; top: 12px; left: 12px; right: 12px; display: flex; justify-content: space-between; font-family: 'Fira Code', monospace; font-size: 10px; color: var(--teal); opacity: 0.8; }
.sw-svg { width: 100%; height: 60px; overflow: visible; }
.sw-line-g { animation: slideLeft 4s linear infinite; }
.sw-line { fill: none; stroke: var(--teal); stroke-width: 2.5; filter: drop-shadow(0 4px 6px rgba(0,212,180,0.5)); }
@keyframes slideLeft { from { transform: translateX(0); } to { transform: translateX(-100px); } }

/* ── UNIQUE: CYBER SECURITY RADAR ── */
.radar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; min-height: 140px; }
.radar-screen { width: 80px; height: 80px; border-radius: 50%; border: 1px solid rgba(0,212,180,0.4); position: relative; background: radial-gradient(circle, rgba(0,212,180,0.1) 0%, transparent 70%); overflow: hidden; }
.radar-screen::before { content:''; position: absolute; inset: 0; background: repeating-radial-gradient(transparent, transparent 10px, rgba(0,212,180,0.2) 11px); }
.radar-screen::after { content:''; position: absolute; top:50%; left:0; right:0; height:1px; background:rgba(0,212,180,0.3); } 
.radar-sweep { position: absolute; top: 0; left: 50%; width: 50%; height: 50%; background: linear-gradient(135deg, rgba(0,212,180,0.8) 0%, transparent 70%); transform-origin: bottom left; animation: radarSpin 4s linear infinite; border-left: 2px solid var(--teal); }
.radar-text { font-family: 'Fira Code', monospace; font-size: 9px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.1em; }
@keyframes radarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ── UNIQUE: AFS-CNN VISION SCANNER ── */
.ai-wrap { flex: 1; display: flex; align-items: center; justify-content: center; background: #070a10; border-radius: var(--rsm); position: relative; overflow: hidden; padding: 14px; min-height: 140px;}
.ai-image { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(124,111,247,0.3); border-radius: 8px;}
.ai-scanline { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--violet); box-shadow: 0 0 10px var(--violet); animation: aiScan 2.5s ease-in-out infinite alternate; }
.ai-bounding-box { position: absolute; top: 25%; left: 25%; width: 50%; height: 50%; border: 1px solid var(--violet); opacity: 0; animation: aiBbox 2.5s infinite alternate; }
.ai-bounding-box::before, .ai-bounding-box::after { content:''; position: absolute; width: 6px; height: 6px; border-color: var(--teal); border-style: solid; }
.ai-bounding-box::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.ai-bounding-box::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
.ai-tag { position: absolute; top: -16px; left: -1px; background: var(--violet); color: #fff; font-family: 'Fira Code', monospace; font-size: 8px; padding: 2px 6px; white-space: nowrap; border-radius: 2px; }
@keyframes aiScan { 0% { top: 5%; } 100% { top: 95%; } }
@keyframes aiBbox { 0%, 40% { opacity: 0; transform: scale(1.1); } 50%, 100% { opacity: 1; transform: scale(1); } }

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

.soc-grid { display: flex; flex-direction: column; gap: 8px; flex: 1; justify-content: center; }
.soc-item { background: var(--surf2); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; transition: border-color .25s, background .25s; }
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
];

const TECH_ROW_2 = [
  {name:'JavaScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'TypeScript',url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'GitHub',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',inv:true},
  {name:'Figma',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
  {name:'Tailwind', url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
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

            {/* ── ROW 1 ── */}
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
            </div>
<div className="card c2" style={{padding: 0, justifyContent: 'center', background: 'transparent', border: 'none', boxShadow: 'none'}}>
              <div className="stats-row">
                <div className="stat-box"><div className="stat-num">13<span>+</span></div><div className="stat-lbl">Projects</div></div>
                <div className="stat-box"><div className="stat-num">2<span>+</span></div><div className="stat-lbl">Years Exp</div></div>
                <div className="stat-box"><div className="stat-num">6<span>+</span></div><div className="stat-lbl">Hubs</div></div>
              </div>
            </div>

            {/* ── ROW 2 ── */}
            <div className="card c2">
              <div className="lbl"><Github size={13}/>Live GitHub Data</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '10px' }}>
                <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=DWRSH&show_icons=true&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true&bg_color=00000000" alt="GitHub Stats" style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} />
                <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=DWRSH&layout=compact&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true&bg_color=00000000" alt="Top Langs" style={{ width: '100%', height: '100%', maxHeight: '140px', objectFit: 'contain', background: 'var(--surf2)', borderRadius: '12px', border: '1px solid var(--border)' }} />
              </div>
            </div>

            <div className="card c1" onMouseEnter={handlePlay} onMouseLeave={handlePause} onTouchStart={() => isPlaying ? handlePause() : handlePlay()}>
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
                </div>
              </div>
            </div>

            <div className="card c1">
              <div className="lbl"><Shield size={13}/>Security Radar</div>
              <div className="radar-wrap">
                 <div className="radar-screen">
                    <div className="radar-sweep"></div>
                 </div>
                 <div className="radar-text">[SECURE] 0 Anomalies</div>
              </div>
            </div>

            {/* ── ROW 3 ── */}
            <div className="card c2">
              <div className="lbl"><Activity size={13}/>StockWatcher Live</div>
              <div className="sw-wrap">
                 <div className="sw-header"><span>FASTAPI // MONGODB</span><span>SYNC: ACTIVE</span></div>
                 <svg viewBox="0 0 200 60" className="sw-svg" preserveAspectRatio="none">
                    <g className="sw-line-g">
                      <polyline fill="none" points="0,50 20,40 40,45 60,20 80,30 100,10 120,35 140,25 160,40 180,15 200,30 220,40 240,45 260,20 280,30 300,10" className="sw-line" />
                    </g>
                 </svg>
              </div>
            </div>

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

            {/* ── ROW 4 ── */}
            <div className="card c1">
              <div className="lbl"><Scan size={13}/>AFS-CNN Vision</div>
              <div className="ai-wrap">
                <div className="ai-image">
                   <svg viewBox="0 0 100 100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                     <rect x="20" y="20" width="60" height="60" rx="4"/>
                     <circle cx="50" cy="45" r="15" />
                     <path d="M 35 70 Q 50 50 65 70" />
                   </svg>
                   <div className="ai-scanline"></div>
                   <div className="ai-bounding-box">
                      <span className="ai-tag">Feature_Ext_99%</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="card c1" style={{padding: 0}}>
              <div className="lbl" style={{padding: '16px 16px 0', position: 'absolute', zIndex: 10}}><MapPin size={13}/>Location</div>
              <a href="https://maps.google.com/?q=Surat,Gujarat,India" target="_blank" rel="noreferrer" className="map-link">
                <div className="map-wrap">
                  <iframe
                    src="https://maps.google.com/maps?q=Surat,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map"
                  />
                </div>
              </a>
            </div>

            <div className="card c2">
              <div className="lbl"><ExternalLink size={13}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{fontSize: '16px'}}>{s.icon}</span>
                    <span style={{fontWeight: 700, fontSize: '13px', color: '#fff'}}>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── ROW 5 ── */}
            <div className="card c2 mob-full">
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

            <div className="card c2 cta-card">
              <p style={{fontFamily: 'Syne', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 'auto 0 12px'}}>
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