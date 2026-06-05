import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, MapPin } from 'lucide-react';

/* ─── ULTRA-PREMIUM STYLES ────────────────────────────────────────────────── */
const eliteFooterStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.4);
    --border-subtle: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mega-footer {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-ultra-dark);
    overflow: hidden;
    color: var(--text-main);
  }

  /* 1. Infinite Marquee Border */
  .marquee-wrapper {
    width: 100%;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    padding: 16px 0;
    overflow: hidden;
    background: rgba(0, 210, 180, 0.02);
    display: flex;
    white-space: nowrap;
  }
  .marquee-content {
    display: flex;
    animation: scrollMarquee 30s linear infinite;
  }
  .marquee-text {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--primary);
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .marquee-text span { color: var(--text-muted); }
  @keyframes scrollMarquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); } 
  }

  /* 2. Main Layout */
  .mf-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 80px 24px 40px;
  }

  /* 3. Massive Typography Header */
  .mf-heading-wrap {
    margin-bottom: 80px;
    text-align: center;
  }
  .mf-huge-text {
    font-family: 'Syne', sans-serif;
    font-size: clamp(48px, 12vw, 160px); /* Adjusted lower bound for mobile */
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
    transition: all 0.6s var(--easing-premium);
    cursor: default;
    position: relative;
    display: inline-block;
  }
  .mf-huge-text:hover {
    color: var(--primary);
    -webkit-text-stroke: 1px transparent;
    transform: scale(1.02);
    text-shadow: 0 0 80px rgba(0, 210, 180, 0.4);
  }
  .mf-sub-heading {
    font-size: 18px;
    color: var(--text-muted);
    margin-top: 24px;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  /* 4. Interactive Full-Width Social Rows */
  .mf-social-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border-subtle);
    margin-bottom: 80px;
  }
  .mf-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 0;
    border-bottom: 1px solid var(--border-subtle);
    text-decoration: none;
    color: var(--text-main);
    transition: all 0.5s var(--easing-premium);
    position: relative;
    overflow: hidden;
  }
  
  /* Row Hover Glass Fill */
  .mf-row::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(0,210,180,0.05), transparent);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.5s var(--easing-premium);
    z-index: 0;
  }
  .mf-row:hover { padding: 32px 24px; border-bottom-color: var(--primary); }
  .mf-row:hover::before { transform: scaleY(1); }

  .mf-row-left { display: flex; align-items: center; gap: 24px; z-index: 1; }
  .mf-row-icon { 
    width: 48px; height: 48px; border-radius: 50%;
    border: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); transition: all 0.4s var(--easing-premium);
  }
  .mf-row:hover .mf-row-icon {
    background: var(--primary); border-color: var(--primary); color: #000;
    transform: rotate(-10deg) scale(1.1);
  }
  .mf-row-title {
    font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700;
    transition: all 0.4s var(--easing-premium);
  }
  .mf-row:hover .mf-row-title { letter-spacing: 0.05em; color: var(--primary); }

  .mf-row-right { display: flex; align-items: center; gap: 16px; z-index: 1; }
  .mf-row-handle {
    font-size: 16px; color: var(--text-muted); font-weight: 300;
    opacity: 0; transform: translateX(-20px); transition: all 0.4s var(--easing-premium);
  }
  @media (min-width: 768px) { .mf-row-handle { opacity: 1; transform: translateX(0); } }
  .mf-row:hover .mf-row-handle { color: #fff; }

  .mf-arrow {
    color: var(--text-muted); transition: all 0.4s var(--easing-premium);
  }
  .mf-row:hover .mf-arrow {
    color: var(--primary); transform: translate(6px, -6px) scale(1.2);
  }

  /* 5. Bottom Info Bar */
  .mf-bottom {
    display: flex; flex-direction: column; gap: 24px;
    align-items: center; text-align: center;
  }
  @media (min-width: 768px) {
    .mf-bottom { flex-direction: row; justify-content: space-between; text-align: left; }
  }
  
  .mf-brand {
    display: flex; align-items: center; gap: 12px;
  }
  .mf-brand-logo {
    width: 24px; height: 24px; background: var(--primary); color: #000;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px;
    display: flex; align-items: center; justify-content: center; border-radius: 4px;
  }
  .mf-copyright { font-size: 14px; color: var(--text-muted); font-weight: 300; }

  /* Live Clock Feature */
  .mf-time-box {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 20px; border-radius: 100px;
    border: 1px solid var(--border-subtle);
    background: rgba(255,255,255,0.02);
  }
  .mf-time-loc { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 13px; }
  .mf-time-val { font-family: 'Fira Code', monospace; font-size: 13px; color: var(--primary); font-weight: 500; }
  .blink { animation: blinker 1s linear infinite; }
  @keyframes blinker { 50% { opacity: 0; } }

  /* ─── MOBILE RESPONSIVE ADJUSTMENTS ──────────────────────────────────────── */
  @media (max-width: 640px) {
    .mf-container { padding: 60px 16px 32px; }
    
    .mf-heading-wrap { margin-bottom: 50px; }
    .mf-huge-text { font-size: clamp(40px, 15vw, 100px); }
    .mf-sub-heading { font-size: 15px; margin-top: 16px; padding: 0 10px; line-height: 1.5; }
    
    .mf-social-list { margin-bottom: 50px; }
    .mf-row { padding: 24px 0; }
    .mf-row:hover { padding: 24px 12px; }
    
    .mf-row-left { gap: 16px; }
    .mf-row-icon { width: 40px; height: 40px; }
    .mf-row-icon svg { width: 18px; height: 18px; }
    .mf-row-title { font-size: 20px; }
    
    .mf-arrow { width: 24px; height: 24px; }
    
    .mf-bottom { gap: 20px; }
    .mf-time-box { 
      width: 100%; 
      justify-content: center; 
      padding: 12px 20px; 
    }
  }
`;

export default function Footer() {
  // Live Clock Logic (India Standard Time)
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false });
  const minutes = time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', minute: '2-digit' });

  const SOCIALS = [
    { 
      name: 'Email', 
      handle: 'contact@darshprajapati.dev', 
      url: 'mailto:contact@darshprajapati.dev', 
      icon: Mail 
    },
    { 
      name: 'LinkedIn', 
      handle: 'darshprajapati15', 
      url: 'https://www.linkedin.com/in/darshprajapati15', 
      icon: Linkedin 
    },
    { 
      name: 'GitHub', 
      handle: 'DWRSH', 
      url: 'https://github.com/DWRSH', 
      icon: Github 
    },
    { 
      name: 'Twitter / X', 
      handle: '@darsh_dev', 
      url: '#', 
      icon: Twitter 
    }
  ];

  return (
    <>
      <style>{eliteFooterStyles}</style>
      <footer className="mega-footer">

        {/* Infinite CSS Marquee */}
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {/* Duplicated for seamless loop */}
            {[1, 2].map((group) => (
              <div key={group} className="marquee-text">
                AVAILABLE FOR WORK <span>✦</span>
                FULL STACK ENGINEERING <span>✦</span>
                MERN ARCHITECTURE <span>✦</span>
                AVAILABLE FOR WORK <span>✦</span>
                FULL STACK ENGINEERING <span>✦</span>
                MERN ARCHITECTURE <span>✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mf-container">

          {/* Massive Editorial Header */}
          <div className="mf-heading-wrap">
            <h2 className="mf-huge-text">Say Hello</h2>
            <p className="mf-sub-heading">Have an idea? Let's build something extraordinary together.</p>
          </div>

          {/* Interactive Full-Width Rows */}
          <div className="mf-social-list">
            {SOCIALS.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target={social.name !== 'Email' ? "_blank" : undefined}
                rel="noopener noreferrer" 
                className="mf-row"
              >
                <div className="mf-row-left">
                  <div className="mf-row-icon">
                    <social.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="mf-row-title">{social.name}</span>
                </div>

                <div className="mf-row-right">
                  <span className="mf-row-handle">{social.handle}</span>
                  <ArrowUpRight size={28} className="mf-arrow" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </div>

          {/* Precision Bottom Bar */}
          <div className="mf-bottom">
            <div className="mf-brand">
              <div className="mf-brand-logo">D</div>
              <span className="mf-copyright">© {new Date().getFullYear()} Darsh Prajapati</span>
            </div>

            {/* The Live Clock Flex */}
            <div className="mf-time-box">
              <div className="mf-time-loc">
                <MapPin size={14} /> Ahmedabad, IN
              </div>
              <div className="mf-time-val">
                {hours}<span className="blink">:</span>{minutes} IST
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
