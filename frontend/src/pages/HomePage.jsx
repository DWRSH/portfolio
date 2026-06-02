import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Sparkles, MapPin, Music, Trophy,
  Github, Layers, Wrench, BookOpen, Star, Users, GitBranch,
  ExternalLink, Headphones, Mail, Code2, Zap
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Fira+Code:wght@400;500&display=swap');

/* ── Reset & Root ─────────────────────────────────────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
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

/* ── Page Shell ───────────────────────────────────────────────────────── */
.hp{
  background:var(--bg);
  font-family:'DM Sans',sans-serif;
  color:var(--text);
  min-height:100vh;
  overflow-x:hidden;
}

/* ── Ambient glows ────────────────────────────────────────────────────── */
.hp-ambient{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.hp-g1{
  position:absolute;width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle,rgba(0,212,180,0.055) 0%,transparent 65%);
  top:-350px;right:-250px;
  animation:floatA 18s ease-in-out infinite;
}
.hp-g2{
  position:absolute;width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,111,247,0.05) 0%,transparent 65%);
  bottom:-250px;left:-200px;
  animation:floatA 22s ease-in-out infinite reverse;
}
.hp-noise{
  position:absolute;inset:0;opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode:overlay;
}
@keyframes floatA{0%,100%{transform:translate(0,0)}50%{transform:translate(-28px,38px)}}

/* ── Page Content wrapper ─────────────────────────────────────────────── */
.hp-body{
  position:relative;z-index:1;
  max-width:1180px;margin:0 auto;
  padding:100px 24px 64px;
  display:flex;flex-direction:column;gap:56px;
}
@media(max-width:640px){.hp-body{padding:80px 16px 48px;gap:40px}}

/* ══════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════ */
.hero{display:flex;flex-direction:column;gap:0;position:relative}

/* Status pill */
.hero-pill{
  display:inline-flex;align-items:center;gap:8px;align-self:flex-start;
  padding:7px 16px;border-radius:100px;
  border:1px solid rgba(0,212,180,0.3);background:rgba(0,212,180,0.06);
  color:var(--teal);font-size:11.5px;font-weight:600;letter-spacing:.09em;
  text-transform:uppercase;margin-bottom:28px;backdrop-filter:blur(8px);
}
.hero-dot{
  width:6px;height:6px;border-radius:50%;background:var(--teal);
  box-shadow:0 0 9px var(--teal);animation:blink 2.2s ease-in-out infinite;
}
@keyframes blink{50%{opacity:.35;box-shadow:none}}

/* Big name */
.hero-name{
  font-family:'Syne',sans-serif;
  font-size:clamp(72px,14vw,168px);
  font-weight:800;line-height:.88;
  letter-spacing:-.04em;
  margin-bottom:32px;
  display:flex;flex-direction:column;
}
.hero-outline{
  color:transparent;
  -webkit-text-stroke:1.5px rgba(255,255,255,0.18);
  transition:color .5s var(--ease),-webkit-text-stroke .5s var(--ease),text-shadow .5s var(--ease);
  cursor:default;
}
.hero-outline:hover{
  color:var(--teal);
  -webkit-text-stroke:1.5px transparent;
  text-shadow:0 0 80px rgba(0,212,180,.28);
}

/* Rotating badge */
.hero-badge{
  position:absolute;top:0;right:0;
  width:130px;height:130px;
  display:none;
}
@media(min-width:900px){.hero-badge{display:block}}
.badge-svg{animation:rotateBadge 14s linear infinite;width:100%;height:100%}
.badge-icon{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  color:var(--teal);
}
@keyframes rotateBadge{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

/* Bottom row */
.hero-bottom{
  display:flex;flex-direction:column;gap:28px;
}
@media(min-width:700px){
  .hero-bottom{flex-direction:row;justify-content:space-between;align-items:flex-end}
}
.hero-bio{
  font-size:17px;font-weight:300;line-height:1.65;
  color:var(--muted);max-width:460px;
}
.hero-bio strong{color:#fff;font-weight:500}

/* CTA Buttons */
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;flex-shrink:0}
.hbtn{
  position:relative;display:inline-flex;align-items:center;gap:9px;
  padding:14px 28px;border-radius:100px;
  font-size:14.5px;font-weight:600;text-decoration:none;
  overflow:hidden;z-index:1;transition:transform .35s var(--ease),box-shadow .35s var(--ease);
}
.hbtn::before{
  content:'';position:absolute;top:100%;left:0;
  width:100%;height:100%;border-radius:100px;
  transition:transform .5s var(--ease);z-index:-1;
}
.hbtn:hover{transform:translateY(-3px)}
.hbtn-primary{background:var(--teal);color:#04060a;border:1px solid var(--teal)}
.hbtn-primary::before{background:#fff}
.hbtn-primary:hover{box-shadow:0 12px 32px rgba(0,212,180,.22)}
.hbtn-primary:hover::before{transform:translateY(-100%)}
.hbtn-sec{background:rgba(255,255,255,.03);color:#fff;border:1px solid var(--border);backdrop-filter:blur(10px)}
.hbtn-sec::before{background:rgba(255,255,255,.07)}
.hbtn-sec:hover{border-color:rgba(255,255,255,.18)}
.hbtn-sec:hover::before{transform:translateY(-100%)}
.hbtn svg{transition:transform .3s}
.hbtn:hover svg{transform:translateX(3px)}

/* Scroll hint */
.hero-scroll{
  display:flex;align-items:center;gap:10px;margin-top:48px;
  font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--muted2);font-family:'Fira Code',monospace;
}
.scroll-line{
  width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--muted2));
}

/* ══════════════════════════════════════════════════
   BENTO GRID
══════════════════════════════════════════════════ */
.bento{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
  width:100%;
}

/* Responsive breakpoints */
@media(max-width:1000px){
  .bento{grid-template-columns:repeat(3,1fr)}
  .c4{grid-column:span 3 !important}
  .c3{grid-column:span 3 !important}
  .c2{grid-column:span 2 !important}
  .c1{grid-column:span 1 !important}
}
@media(max-width:720px){
  .bento{grid-template-columns:repeat(2,1fr);gap:11px}
  .c4,.c3,.c2{grid-column:span 2 !important}
  .c1{grid-column:span 1 !important}
  .mob-full{grid-column:span 2 !important}
}
@media(max-width:420px){
  .bento{grid-template-columns:1fr;gap:10px}
  .c4,.c3,.c2,.c1,.mob-full{grid-column:span 1 !important}
}

/* Span helpers */
.c1{grid-column:span 1}
.c2{grid-column:span 2}
.c3{grid-column:span 3}
.c4{grid-column:span 4}

/* ── Base Card ────────────────────────────────────────────────────────── */
.card{
  background:var(--surf);
  border:1px solid var(--border);
  border-radius:var(--r);
  padding:22px;
  position:relative;overflow:hidden;
  display:flex;flex-direction:column;gap:14px;
  transition:border-color .3s,transform .35s var(--ease),box-shadow .35s var(--ease);
}
.card:hover{
  border-color:var(--border-h);
  transform:translateY(-3px);
  box-shadow:0 20px 48px rgba(0,0,0,.5);
}
.card::after{
  content:'';position:absolute;inset:0;border-radius:var(--r);
  background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),rgba(0,212,180,.045),transparent 50%);
  opacity:0;transition:opacity .4s;pointer-events:none;
}
.card:hover::after{opacity:1}

/* card label */
.lbl{
  display:flex;align-items:center;gap:7px;
  font-size:11px;font-weight:600;letter-spacing:.08em;
  text-transform:uppercase;color:var(--muted);
}
.lbl svg{color:var(--muted2);flex-shrink:0}

/* ── CARD: Stack Diagram ──────────────────────────────────────────────── */
.venn-wrap{
  flex:1;display:flex;align-items:center;justify-content:center;
  min-height:148px;position:relative;
}
.venn-c{
  width:108px;height:108px;border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:3px;position:absolute;
}
.va{
  background:rgba(124,111,247,.13);border:1.5px solid rgba(124,111,247,.35);
  left:calc(50% - 76px);
}
.vb{
  background:rgba(0,212,180,.09);border:1.5px solid rgba(0,212,180,.3);
  left:calc(50% - 32px);
}
.vtag{font-family:'Syne',sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.04em}
.vsub{font-size:9px;color:var(--muted);font-weight:500;letter-spacing:.07em;text-transform:uppercase;font-family:'Fira Code',monospace}
.vcenter{
  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  font-size:9px;font-weight:700;color:#fff;text-align:center;
  background:rgba(0,0,0,.6);padding:5px 9px;border-radius:7px;
  backdrop-filter:blur(8px);white-space:nowrap;z-index:2;font-family:'Fira Code',monospace;
}
.vcorner{position:absolute;font-family:'Fira Code',monospace;font-size:9.5px;font-weight:500;color:var(--muted2)}
.vtl{top:0;left:0}.vtr{top:0;right:0}.vbr{bottom:0;right:0}

/* ── CARD: Blog ───────────────────────────────────────────────────────── */
.blog-title{font-family:'Syne',sans-serif;font-size:15.5px;font-weight:700;line-height:1.4;color:#fff}
.blog-desc{font-size:12.5px;line-height:1.6;color:var(--muted)}
.blog-meta{display:flex;justify-content:space-between;align-items:center;margin-top:auto}
.blog-date{font-size:11px;color:var(--muted2);font-family:'Fira Code',monospace}
.read-pill{
  display:inline-flex;align-items:center;gap:5px;
  font-size:11px;font-weight:600;color:var(--teal);
  background:var(--teal-dim);border:1px solid rgba(0,212,180,.2);
  padding:4px 11px;border-radius:100px;text-decoration:none;
  transition:background .2s,border-color .2s;
}
.read-pill:hover{background:rgba(0,212,180,.18);border-color:rgba(0,212,180,.4)}

/* ── CARD: Achievements ───────────────────────────────────────────────── */
.ach-list{display:flex;flex-direction:column;gap:9px}
.ach-item{
  display:flex;align-items:center;gap:10px;
  font-size:12.5px;color:rgba(255,255,255,.68);
  background:var(--surf2);border:1px solid var(--border);
  padding:9px 13px;border-radius:var(--rsm);
}
.ach-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);flex-shrink:0;box-shadow:0 0 8px var(--teal-glow)}

/* ── CARD: Tools ──────────────────────────────────────────────────────── */
.tools-wrap{display:flex;flex-wrap:wrap;gap:8px}
.tchip{
  font-family:'Fira Code',monospace;font-size:11px;font-weight:500;
  color:rgba(255,255,255,.6);background:var(--surf2);border:1px solid var(--border);
  padding:5px 12px;border-radius:100px;
  transition:border-color .2s,color .2s;
}
.tchip:hover{border-color:var(--teal);color:var(--teal)}

/* ── CARD: Location ───────────────────────────────────────────────────── */
.map-wrap{flex:1;border-radius:var(--rsm);overflow:hidden;min-height:118px;position:relative}
.map-wrap iframe{width:100%;height:100%;border:0;border-radius:var(--rsm);pointer-events:none;min-height:118px;filter:invert(92%) hue-rotate(180deg) saturate(.8) contrast(.9)}
.loc-name{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;display:flex;align-items:center;gap:6px}
.loc-name svg{color:var(--teal)}

/* ── CARD: Music ──────────────────────────────────────────────────────── */
.music-inner{display:flex;align-items:center;gap:14px}
.music-art{width:60px;height:60px;border-radius:10px;object-fit:cover;flex-shrink:0;box-shadow:0 4px 18px rgba(0,0,0,.55)}
.music-song{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#fff}
.music-artist{font-size:12px;color:var(--muted);margin-top:2px}
.np-row{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:10.5px;color:var(--teal);font-weight:600;letter-spacing:.07em;text-transform:uppercase}
.np-bars{display:flex;align-items:flex-end;gap:2px;height:13px}
.npb{width:3px;background:var(--teal);border-radius:1px;animation:npA .9s ease-in-out infinite alternate}
.npb:nth-child(2){animation-delay:.2s}.npb:nth-child(3){animation-delay:.4s}
@keyframes npA{from{height:3px}to{height:13px}}
.music-bar{height:3px;border-radius:100px;background:var(--surf2);position:relative;overflow:hidden;margin-top:4px}
.music-fill{position:absolute;left:0;top:0;height:100%;width:62%;background:linear-gradient(90deg,var(--teal),var(--violet));border-radius:100px}
.music-time{display:flex;justify-content:space-between;font-family:'Fira Code',monospace;font-size:10px;color:var(--muted2);margin-top:4px}

/* ── CARD: Discord ────────────────────────────────────────────────────── */
.disc-inner{display:flex;align-items:center;gap:12px}
.disc-logo{width:44px;height:44px;border-radius:11px;background:#5865f2;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.disc-name{font-weight:700;font-size:14px;color:#fff}
.disc-handle{font-family:'Fira Code',monospace;font-size:12px;color:var(--muted);margin-top:2px}
.disc-online{display:flex;align-items:center;gap:5px;font-size:11px;color:#43b581;margin-top:5px}
.disc-online-dot{width:7px;height:7px;border-radius:50%;background:#43b581;box-shadow:0 0 8px rgba(67,181,129,.6)}

/* ── CARD: GitHub ─────────────────────────────────────────────────────── */
.gh-stats{display:flex;gap:10px;flex-wrap:wrap}
.gh-stat{
  display:flex;align-items:center;gap:9px;flex:1;min-width:84px;
  background:var(--surf2);border:1px solid var(--border);
  border-radius:var(--rsm);padding:11px 14px;
}
.gh-num{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff}
.gh-label{font-size:11px;color:var(--muted);margin-top:1px}
.cal-label{font-size:11px;color:var(--muted);font-family:'Fira Code',monospace}
.cal-grid{display:flex;gap:3px;overflow-x:auto;padding-bottom:4px}
.cal-col{display:flex;flex-direction:column;gap:3px}
.cal-cell{width:11px;height:11px;border-radius:2px;flex-shrink:0}

/* ── CARD: Tech Stack ─────────────────────────────────────────────────── */
.tech-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
@media(max-width:720px){.tech-grid{grid-template-columns:repeat(6,1fr)}}
.ticon{
  background:var(--surf2);border:1px solid var(--border);border-radius:10px;
  aspect-ratio:1;display:flex;align-items:center;justify-content:center;
  transition:border-color .25s,transform .25s var(--ease),background .25s;
}
.ticon:hover{border-color:var(--border-h);background:rgba(255,255,255,.04);transform:translateY(-3px)}
.ticon img{width:24px;height:24px;object-fit:contain}
.inv{filter:invert(1) brightness(.8)}

/* ── CARD: Learning ───────────────────────────────────────────────────── */
.learn-list{display:flex;flex-direction:column;gap:11px}
.learn-item{display:flex;align-items:center;gap:10px}
.learn-lbl{font-size:12.5px;color:rgba(255,255,255,.68);flex:0 0 100px}
.learn-bar{flex:1;height:4px;background:var(--surf2);border-radius:100px;overflow:hidden}
.learn-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--teal),var(--violet));transition:width 1.6s var(--ease)}
.learn-pct{font-family:'Fira Code',monospace;font-size:11px;color:var(--muted);width:30px;text-align:right;flex-shrink:0}

/* ── CARD: Socials ────────────────────────────────────────────────────── */
.soc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1}
.soc-item{
  background:var(--surf2);border:1px solid var(--border);border-radius:var(--rsm);
  padding:14px;display:flex;flex-direction:column;gap:5px;
  text-decoration:none;color:inherit;
  transition:border-color .25s,background .25s;
}
.soc-item:hover{border-color:var(--border-h);background:rgba(255,255,255,.04)}
.soc-icon{font-size:19px}
.soc-name{font-weight:700;font-size:13px;color:#fff}
.soc-handle{font-family:'Fira Code',monospace;font-size:11px;color:var(--muted)}

/* ── CARD: CTA ────────────────────────────────────────────────────────── */
.cta-card{
  background:linear-gradient(135deg,rgba(0,212,180,.07) 0%,rgba(124,111,247,.07) 100%) !important;
  border-color:rgba(0,212,180,.18) !important;
}
.cta-card:hover{border-color:rgba(0,212,180,.35) !important}
.cta-big{font-family:'Syne',sans-serif;font-size:clamp(22px,3.5vw,30px);font-weight:800;line-height:1.2;color:#fff}
.cta-big span{color:var(--teal)}
.cta-sub{font-size:13px;color:var(--muted);line-height:1.6}
.cta-btn{
  display:inline-flex;align-items:center;gap:7px;
  background:var(--teal);color:#04060a;
  font-weight:700;font-size:13.5px;
  padding:11px 22px;border-radius:100px;
  text-decoration:none;border:none;cursor:pointer;align-self:flex-start;
  transition:background .2s,transform .25s var(--ease),box-shadow .25s;
  margin-top:auto;
}
.cta-btn:hover{background:#00f2ce;transform:translateY(-2px);box-shadow:0 8px 26px rgba(0,212,180,.3)}

/* ── CARD: Stats Counter ──────────────────────────────────────────────── */
.stats-row{display:flex;gap:0;flex:1}
.stat-box{
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:16px 8px;text-align:center;border-right:1px solid var(--border);
}
.stat-box:last-child{border-right:none}
.stat-num{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:800;color:#fff;line-height:1}
.stat-num span{color:var(--teal)}
.stat-lbl{font-size:11px;color:var(--muted);margin-top:5px;text-transform:uppercase;letter-spacing:.07em}

/* ── Animations ────────────────────────────────────────────────────────── */
@keyframes revealUp{
  from{opacity:0;transform:translateY(36px);filter:blur(8px)}
  to{opacity:1;transform:translateY(0);filter:blur(0)}
}
.r1{opacity:0;animation:revealUp 1s var(--ease) .1s forwards}
.r2{opacity:0;animation:revealUp 1s var(--ease) .22s forwards}
.r3{opacity:0;animation:revealUp 1s var(--ease) .36s forwards}
.r4{opacity:0;animation:revealUp 1s var(--ease) .52s forwards}
.r5{opacity:0;animation:revealUp 1s var(--ease) .66s forwards}

/* ── Scrollbar ─────────────────────────────────────────────────────────── */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:100px}
`;

/* ─────────────────────────────────────────────────────────────────────────
   MINI GITHUB CALENDAR (pure CSS, no external dep)
───────────────────────────────────────────────────────────────────────── */
const LEVELS = [0,0,1,2,0,3,4,1,0,0,2,3,1,0,2,4,1,3,0,2,1,4,3,2,1,0,2,3,4,1,2,0,
                1,3,4,2,1,0,3,2,4,1,2,3,0,1,2,4,3,1,2,0,3,4,1,2,0,3,4,1,2,0,3,1,
                4,2,0,1,3,2,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,3,2,4,1,2,3,0,4,
                2,1,3,0,2,4,1,0,3,2,4,0,1,3,2,4,0,1,3,0,2,4,1,3,2,0,4,1,3,0,2,4,
                1,3,2,0,4,1,3,2,0,4,1,3,2,0,1,4,3,2,1,0,4,3,2,1,0,3,4,1,2,0,3,4,
                1,2,0,3,4,1,2,0,3];
const CAL_COLORS = ['#161b22','#0e4429','#006d32','#26a641','#39d353'];

function MiniCal() {
  const WEEKS = 26;
  let idx = 0;
  return (
    <div className="cal-grid">
      {Array.from({length:WEEKS}).map((_,w)=>(
        <div className="cal-col" key={w}>
          {Array.from({length:7}).map((_,d)=>(
            <div className="cal-cell" key={d}
              style={{background:CAL_COLORS[LEVELS[idx++%LEVELS.length]]}} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */
const TECH = [
  {name:'C',        url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg'},
  {name:'C++',      url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'},
  {name:'JS',       url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'React',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'HTML5',    url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
  {name:'CSS3',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
  {name:'Django',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',inv:true},
  {name:'Docker',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'},
  {name:'.NET',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg'},
  {name:'GitHub',   url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',inv:true},
  {name:'Java',     url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'},
  {name:'Discord',  url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg'},
];

const LEARNING = [
  {label:'Next.js',     pct:72},
  {label:'TypeScript',  pct:58},
  {label:'DevOps/CI',   pct:35},
];

const TOOLS = ['VS Code','Git','GitHub','Postman','Vite','Android Studio','Figma','npm'];

const SOCIALS = [
  {icon:'🐙', name:'GitHub',   handle:'@DWRSH',  href:'https://github.com/DWRSH'},
  {icon:'💼', name:'LinkedIn', handle:'Darsh',    href:'#'},
  {icon:'𝕏',  name:'Twitter',  handle:'@dwrsh_',  href:'#'},
  {icon:'✍️', name:'Blog',     handle:'Articles', href:'#'},
];

const ACHIEVEMENTS = [
  'Completed 50+ projects',
  'Built full MERN blog platform',
  'Visited 30+ software hubs',
  'Open-source contributor',
];

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function HomePage() {

  // Mouse glow on cards
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const handlers = [];
    cards.forEach(card => {
      const fn = e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      };
      card.addEventListener('mousemove', fn);
      handlers.push({card, fn});
    });
    return () => handlers.forEach(({card,fn}) => card.removeEventListener('mousemove',fn));
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="hp">

        {/* Ambient bg */}
        <div className="hp-ambient">
          <div className="hp-g1"/><div className="hp-g2"/><div className="hp-noise"/>
        </div>

        <div className="hp-body">

          {/* ══════════════════ HERO ══════════════════ */}
          <section className="hero">

            {/* Rotating badge */}
            <div className="hero-badge r1">
              <svg viewBox="0 0 100 100" className="badge-svg">
                <path id="bp" fill="none" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/>
                <text>
                  <textPath href="#bp" fill="rgba(255,255,255,0.35)" fontSize="9.5"
                    letterSpacing="1.6" fontWeight="600">
                    CREATIVE DEVELOPER • FULL STACK •
                  </textPath>
                </text>
              </svg>
              <div className="badge-icon"><Sparkles size={22}/></div>
            </div>

            {/* Status pill */}
            <div className="hero-pill r1">
              <div className="hero-dot"/>
              Available for New Projects
            </div>

            {/* Big name */}
            <h1 className="hero-name r2">
              <span className="hero-outline">DARSH</span>
            </h1>

            {/* Bio + CTA */}
            <div className="hero-bottom r3">
              <p className="hero-bio">
                I engineer <strong>high-performance</strong>, aesthetic digital
                architectures. Specialising in the <strong>MERN stack</strong> —
                bridging heavy-duty backends with pixel-perfect frontends.
              </p>
              <div className="hero-btns">
                <a href="/Darsh_resume.pdf" download className="hbtn hbtn-primary">
                  Download CV <Download size={17}/>
                </a>
                <Link to="/projects" className="hbtn hbtn-sec">
                  Explore Work <ArrowRight size={17}/>
                </Link>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="hero-scroll r4">
              <div className="scroll-line"/>
              scroll to explore
            </div>
          </section>

          {/* ══════════════════ BENTO ══════════════════ */}
          <div className="bento r5">

            {/* ── 1. Venn / Stack Diagram ── c2 ── */}
            <div className="card c2">
              <div className="lbl"><Code2 size={13}/>Architecture Focus</div>
              <div className="venn-wrap">
                <span className="vcorner vtl">Full-Stack</span>
                <span className="vcorner vtr">MEAN</span>
                <span className="vcorner vbr">MERN</span>
                <div className="venn-c va">
                  <span className="vtag" style={{color:'#9b8ff9'}}>MEAN</span>
                  <span className="vsub">Angular</span>
                </div>
                <div className="venn-c vb">
                  <span className="vtag" style={{color:'#00d4b4'}}>MERN</span>
                  <span className="vsub">React</span>
                </div>
                <div className="vcenter">Node + Express<br/>+ MongoDB</div>
              </div>
            </div>

            {/* ── 2. Stats ── c2 ── */}
            <div className="card c2" style={{padding:'0'}}>
              <div className="stats-row">
                {[
                  {num:'50',suffix:'+',lbl:'Projects'},
                  {num:'2',suffix:'+',lbl:'Years Exp'},
                  {num:'30',suffix:'+',lbl:'Hubs Visited'},
                ].map(s=>(
                  <div className="stat-box" key={s.lbl}>
                    <div className="stat-num">{s.num}<span>{s.suffix}</span></div>
                    <div className="stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 3. Blog ── c1 ── */}
            <div className="card c1" style={{minHeight:210}}>
              <div className="lbl"><BookOpen size={13}/>Latest Post</div>
              <p className="blog-title">Is MERN Stack Dead? A Fresher's Struggle To Find a Job…</p>
              <p className="blog-desc">An honest story of visiting 30+ software hubs to find real opportunities in today's market.</p>
              <div className="blog-meta">
                <span className="blog-date">18 Dec 2025 · 6 min</span>
                <a href="#" className="read-pill">Read <ArrowRight size={11}/></a>
              </div>
            </div>

            {/* ── 4. Achievements ── c1 ── */}
            <div className="card c1">
              <div className="lbl"><Trophy size={13}/>Achievements</div>
              <div className="ach-list">
                {ACHIEVEMENTS.map(a=>(
                  <div className="ach-item" key={a}>
                    <div className="ach-dot"/>{a}
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. Location ── c1 ── */}
            <div className="card c1">
              <div className="lbl"><MapPin size={13}/>Location</div>
              <div className="loc-name"><MapPin size={14}/>Idar, Gujarat</div>
              <div className="map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58444.75704901416!2d72.96291244335936!3d23.834469200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dbece3b6d2e6f%3A0xc54dfabfbfd538e4!2sIdar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1701323838276!5m2!1sen!2sin"
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Map"
                />
              </div>
            </div>

            {/* ── 6. Music ── c2 ── */}
            <div className="card c2">
              <div className="lbl"><Headphones size={13}/>Now Playing</div>
              <div className="music-inner">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/0/03/Alan_Walker_-_Alone.png"
                  alt="Alone" className="music-art"
                />
                <div style={{flex:1}}>
                  <div className="music-song">Alone</div>
                  <div className="music-artist">Alan Walker</div>
                  <div className="np-row">
                    <div className="np-bars">
                      <div className="npb" style={{height:4}}/>
                      <div className="npb" style={{height:9}}/>
                      <div className="npb" style={{height:5}}/>
                    </div>
                    Playing
                  </div>
                </div>
              </div>
              <div className="music-bar"><div className="music-fill"/></div>
              <div className="music-time"><span>1:42</span><span>2:43</span></div>
            </div>

            {/* ── 7. Discord ── c1 ── */}
            <div className="card c1">
              <div className="lbl">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Discord
              </div>
              <div className="disc-inner">
                <div className="disc-logo">
                  <svg width="22" height="16" viewBox="0 0 24 18" fill="white">
                    <path d="M20.317 1.37A19.791 19.791 0 0 0 15.432-.145a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0A12.64 12.64 0 0 0 8.64-.108a.077.077 0 0 0-.079.037A19.736 19.736 0 0 0 3.677 1.37a.07.07 0 0 0-.032.027C.533 5.976-.32 10.51.099 15a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </div>
                <div>
                  <div className="disc-name">Darsh</div>
                  <div className="disc-handle">@dwrsh</div>
                  <div className="disc-online">
                    <div className="disc-online-dot"/>Online
                  </div>
                </div>
              </div>
            </div>

            {/* ── 8. GitHub Activity ── c3 ── */}
            <div className="card c3">
              <div className="lbl"><Github size={13}/>GitHub Activity</div>
              <div className="gh-stats">
                {[
                  {icon:<Star size={14} color="#f0c23a"/>, num:'6', lbl:'Stars'},
                  {icon:<Users size={14} color="#00d4b4"/>, num:'5', lbl:'Followers'},
                  {icon:<GitBranch size={14} color="#7c6ff7"/>, num:'12', lbl:'Repos'},
                ].map(s=>(
                  <div className="gh-stat" key={s.lbl}>
                    {s.icon}
                    <div>
                      <div className="gh-num">{s.num}</div>
                      <div className="gh-label">{s.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cal-label">Contributions — last 6 months</div>
              <MiniCal/>
            </div>

            {/* ── 9. Tools ── c1 ── */}
            <div className="card c1">
              <div className="lbl"><Wrench size={13}/>Tools</div>
              <div className="tools-wrap">
                {TOOLS.map(t=><div className="tchip" key={t}>{t}</div>)}
              </div>
            </div>

            {/* ── 10. Tech Stack ── c3 ── */}
            <div className="card c3">
              <div className="lbl"><Layers size={13}/>Tech Stack</div>
              <div className="tech-grid">
                {TECH.map(t=>(
                  <div className="ticon" title={t.name} key={t.name}>
                    <img src={t.url} alt={t.name} className={t.inv?'inv':''}/>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 11. Currently Learning ── c1 ── */}
            <div className="card c1">
              <div className="lbl"><Zap size={13}/>Currently Learning</div>
              <div className="learn-list">
                {LEARNING.map(l=>(
                  <div className="learn-item" key={l.label}>
                    <span className="learn-lbl">{l.label}</span>
                    <div className="learn-bar">
                      <div className="learn-fill" style={{width:`${l.pct}%`}}/>
                    </div>
                    <span className="learn-pct">{l.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 12. Socials ── c2 ── */}
            <div className="card c2">
              <div className="lbl"><ExternalLink size={13}/>Find Me Online</div>
              <div className="soc-grid">
                {SOCIALS.map(s=>(
                  <a className="soc-item" key={s.name} href={s.href}
                    target="_blank" rel="noreferrer">
                    <span className="soc-icon">{s.icon}</span>
                    <span className="soc-name">{s.name}</span>
                    <span className="soc-handle">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── 13. CTA ── c2 ── */}
            <div className="card c2 cta-card">
              <p className="cta-big">
                Let's build<br/><span>something great.</span>
              </p>
              <p className="cta-sub">
                Open to freelance projects, full-time roles, and interesting collabs.
                Drop a message — I reply fast.
              </p>
              <a href="mailto:darsh@example.com" className="cta-btn">
                <Mail size={15}/> Get in Touch
              </a>
            </div>

          </div>{/* /bento */}
        </div>{/* /hp-body */}
      </div>{/* /hp */}
    </>
  );
}