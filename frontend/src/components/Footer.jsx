import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Briefcase, FileText, ArrowUpRight, Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

/* ─── 1. MAGNETIC PHYSICS WRAPPER ─────────────────────────────────────────── */
const Magnetic = ({ children, className }) => {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    ref.current.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0) scale(1.05)`;
  };
  const handleMouseLeave = () => {
    ref.current.style.transform = `translate3d(0px, 0px, 0px) scale(1)`;
  };
  return (
    <div 
      ref={ref} 
      className={className} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      style={{ transition: 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      {children}
    </div>
  );
};

/* ─── 2. ULTRA-PREMIUM STYLES (10X Level) ─────────────────────────────────── */
const eliteFooterStyles = `
  :root {
    --bg-ultra-dark: #020305;
    --primary: #96c2db; /* Blue-Grey */
    --primary-glow: rgba(150, 194, 219, 0.4);
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --border-subtle: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.19, 1, 0.22, 1);
  }

  .mega-footer {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-ultra-dark);
    overflow: hidden;
    color: var(--text-main);
    z-index: 10;
  }

  /* 1. Infinite Marquee Border */
  .marquee-wrapper {
    width: 100%;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    padding: 16px 0;
    overflow: hidden;
    background: rgba(150, 194, 219, 0.03);
    display: flex;
    white-space: nowrap;
    position: relative;
  }
  .marquee-wrapper::before, .marquee-wrapper::after {
    content: ''; position: absolute; top: 0; bottom: 0; width: 10%; z-index: 2; pointer-events: none;
  }
  .marquee-wrapper::before { left: 0; background: linear-gradient(to right, var(--bg-ultra-dark), transparent); }
  .marquee-wrapper::after { right: 0; background: linear-gradient(to left, var(--bg-ultra-dark), transparent); }
  
  .marquee-content {
    display: flex;
    animation: scrollMarquee 30s linear infinite;
  }
  .marquee-text {
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase; color: var(--primary);
    padding: 0 24px; display: flex; align-items: center; gap: 24px;
  }
  .marquee-text span { color: var(--text-muted); font-size: 10px; }
  @keyframes scrollMarquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }

  /* 2. Main Layout */
  .mf-container {
    max-width: 1240px; margin: 0 auto; padding: 100px 24px 40px;
  }

  /* 3. Massive 3D Typography Header */
  .mf-heading-wrap { margin-bottom: 100px; text-align: center; perspective: 1000px; }
  .mf-huge-text {
    font-family: 'Syne', sans-serif;
    font-size: clamp(60px, 14vw, 180px);
    font-weight: 800; line-height: 0.85; letter-spacing: -0.05em; text-transform: uppercase;
    color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
    transition: all 0.6s var(--easing-premium); cursor: default;
    display: inline-block; position: relative;
  }
  .mf-huge-text:hover {
    color: var(--bg-ultra-dark); -webkit-text-stroke: 2px var(--primary);
    transform: translateY(-10px) rotateX(10deg);
    text-shadow: 10px 10px 0 rgba(150, 194, 219, 0.15), 20px 20px 0 rgba(150, 194, 219, 0.05);
  }
  .mf-sub-heading {
    font-size: 18px; color: var(--text-muted); margin-top: 24px;
    font-weight: 300; letter-spacing: 0.05em;
  }

  /* 4. Interactive Full-Width Social Rows */
  .mf-social-list {
    display: flex; flex-direction: column;
    border-top: 1px solid var(--border-subtle); margin-bottom: 80px;
  }
  .mf-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 36px 0; border-bottom: 1px solid var(--border-subtle);
    text-decoration: none; color: var(--text-main);
    transition: all 0.5s var(--easing-premium); position: relative; overflow: hidden;
  }
  
  /* Row Hover Glass Fill */
  .mf-row::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(150, 194, 219, 0.05), transparent);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.5s var(--easing-premium); z-index: 0;
  }
  .mf-row:hover { padding: 36px 24px; border-bottom-color: var(--primary); }
  .mf-row:hover::before { transform: scaleY(1); }

  .mf-row-left { display: flex; align-items: center; gap: 32px; z-index: 1; }
  .mf-row-icon { 
    width: 56px; height: 56px; border-radius: 50%; border: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); transition: all 0.4s var(--easing-premium);
  }
  .mf-row:hover .mf-row-icon {
    background: var(--primary); border-color: var(--primary); color: #000;
    transform: rotate(-10deg) scale(1.1); box-shadow: 0 0 20px var(--primary-glow);
  }
  .mf-row-title {
    font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 700;
    transition: all 0.4s var(--easing-premium);
  }
  .mf-row:hover .mf-row-title { letter-spacing: 0.05em; color: var(--primary); }

  .mf-row-right { display: flex; align-items: center; gap: 24px; z-index: 1; }
  .mf-row-handle {
    font-size: 16px; color: var(--text-muted); font-weight: 400; font-family: 'Fira Code', monospace;
    opacity: 0; transform: translateX(-20px); transition: all 0.4s var(--easing-premium);
  }
  @media (min-width: 768px) { .mf-row-handle { opacity: 1; transform: translateX(0); } }
  .mf-row:hover .mf-row-handle { color: #fff; }

  .mf-arrow { color: var(--text-muted); transition: all 0.4s var(--easing-premium); }
  .mf-row:hover .mf-arrow { color: var(--primary); transform: translate(6px, -6px) scale(1.2); }

  /* 5. Bottom Info Bar */
  .mf-bottom { display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center; }
  @media (min-width: 768px) { .mf-bottom { flex-direction: row; justify-content: space-between; text-align: left; } }
  
  .mf-brand { display: flex; align-items: center; gap: 12px; }
  .mf-brand-logo {
    width: 28px; height: 28px; background: var(--primary); color: #000;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px;
    display: flex; align-items: center; justify-content: center; border-radius: 6px;
    box-shadow: 0 0 10px var(--primary-glow);
  }
  .mf-copyright { font-size: 14px; color: var(--text-muted); font-weight: 400; }

  /* Live Clock Feature */
  .mf-time-box {
    display: flex; align-items: center; gap: 16px; padding: 12px 24px; border-radius: 100px;
    border: 1px solid var(--border-subtle); background: rgba(255,255,255,0.02);
    backdrop-filter: blur(10px);
  }
  .mf-time-loc { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 13px; font-weight: 500; }
  .mf-time-val { font-family: 'Fira Code', monospace; font-size: 14px; color: var(--primary); font-weight: 600; }
  .blink { animation: blinker 1s linear infinite; }
  @keyframes blinker { 50% { opacity: 0; } }

  /* ─── MOBILE RESPONSIVE ──────────────────────────────────────── */
  @media (max-width: 640px) {
    .mf-container { padding: 60px 16px 32px; }
    .mf-heading-wrap { margin-bottom: 60px; }
    .mf-huge-text { font-size: clamp(50px, 18vw, 100px); }
    .mf-sub-heading { font-size: 15px; margin-top: 16px; padding: 0 10px; line-height: 1.5; }
    
    .mf-social-list { margin-bottom: 60px; }
    .mf-row { padding: 24px 0; }
    .mf-row:hover { padding: 24px 12px; }
    .mf-row-left { gap: 16px; }
    .mf-row-icon { width: 44px; height: 44px; }
    .mf-row-icon svg { width: 18px; height: 18px; }
    .mf-row-title { font-size: 22px; }
    .mf-arrow { width: 24px; height: 24px; }
    
    .mf-bottom { gap: 20px; }
    .mf-time-box { width: 100%; justify-content: center; padding: 12px 20px; }
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
      {/* 🔥 CSS Injection Fix Applied Here */}
      <style dangerouslySetInnerHTML={{ __html: eliteFooterStyles }} />
      
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
            <Magnetic>
              <h2 className="mf-huge-text interactable">Say Hello</h2>
            </Magnetic>
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
                className="mf-row interactable"
              >
                <div className="mf-row-left">
                  <Magnetic>
                    <div className="mf-row-icon">
                      <social.icon size={24} strokeWidth={1.5} />
                    </div>
                  </Magnetic>
                  <span className="mf-row-title">{social.name}</span>
                </div>

                <div className="mf-row-right">
                  <span className="mf-row-handle">{social.handle}</span>
                  <ArrowUpRight size={32} className="mf-arrow" strokeWidth={1.5} />
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
                <MapPin size={16} strokeWidth={2} /> Ahmedabad, IN
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
