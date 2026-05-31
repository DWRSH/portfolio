import React from 'react';
import { Link } from 'react-router-dom';

/* ─── Google Font import ────────────────────────────────────────────────────
   Add this inside your <head> (index.html) if not already present:

   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />

   Also add Tabler Icons CDN for button icons:
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
   ─────────────────────────────────────────────────────────────────────────── */

const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(-24px, 28px) scale(1.04); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(20px, -20px) scale(0.97); }
  }
  @keyframes floatRev {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(14px, -18px) scale(1.03); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }
  @keyframes scrollPulse {
    0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
    30%  { opacity: 1; transform: scaleY(1); transform-origin: top; }
    70%  { opacity: 1; transform: scaleY(1); transform-origin: bottom; }
    100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
  }

  .hp-root { background: #080b12; }

  /* Animated background orbs */
  .hp-orb1 { animation: float1 9s ease-in-out infinite; }
  .hp-orb2 { animation: float2 12s ease-in-out infinite; }
  .hp-orb3 { animation: floatRev 15s ease-in-out infinite; }

  /* Staggered content reveals */
  .hp-anim-1 { opacity: 0; animation: fadeUp 0.7s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-2 { opacity: 0; animation: fadeUp 0.7s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-3 { opacity: 0; animation: fadeUp 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-4 { opacity: 0; animation: fadeUp 0.8s 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-5 { opacity: 0; animation: fadeIn  1.0s 0.7s ease forwards; }
  .hp-anim-6 { opacity: 0; animation: fadeUp 0.8s 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-7 { opacity: 0; animation: fadeUp 0.8s 0.9s  cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-8 { opacity: 0; animation: fadeUp 0.8s 1.1s  cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .hp-anim-9 { opacity: 0; animation: fadeIn  1.0s 1.5s ease forwards; }

  /* Badge dot pulse */
  .hp-badge-dot { animation: pulse 2s infinite; }

  /* Scroll indicator */
  .hp-scroll-line { animation: scrollPulse 2.5s ease-in-out infinite; }

  /* Primary button shimmer on hover */
  .hp-btn-primary-inner::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 6px;
  }
  .hp-btn-primary-inner:hover::before { opacity: 1; }
  .hp-btn-primary-inner:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(0,210,180,0.28); }
  .hp-btn-primary-inner:active { transform: translateY(0) scale(0.98); }

  /* Secondary button hover */
  .hp-btn-secondary-inner:hover {
    border-color: rgba(255,255,255,0.45);
    color: #fff;
    background: rgba(255,255,255,0.04);
    transform: translateY(-2px);
  }
  .hp-btn-secondary-inner:active { transform: translateY(0) scale(0.98); }
  .hp-btn-secondary-inner:hover .hp-icon-arr { transform: translateX(4px); }

  /* Arrow icon transition */
  .hp-icon-arr { transition: transform 0.2s; }

  /* Corner decoration fade */
  .hp-corner { opacity: 0; animation: fadeIn 1s 1.8s ease forwards; }
`;

export default function HomePage() {
  return (
    <>
      {/* ── Injected keyframe styles ── */}
      <style>{styles}</style>

      <div
        className="hp-root"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '60px 40px',
          boxSizing: 'border-box',
        }}
      >

        {/* ─── Atmospheric Background ─────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>

          {/* Teal glow — top-right */}
          <div
            className="hp-orb1"
            style={{
              position: 'absolute',
              width: 520, height: 520,
              background: 'radial-gradient(circle, rgba(0,210,180,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              top: -80, right: -60,
            }}
          />

          {/* Indigo glow — bottom-left */}
          <div
            className="hp-orb2"
            style={{
              position: 'absolute',
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
              borderRadius: '50%',
              bottom: -100, left: -80,
            }}
          />

          {/* Subtle center glow */}
          <div
            className="hp-orb3"
            style={{
              position: 'absolute',
              width: 280, height: 280,
              background: 'radial-gradient(circle, rgba(0,210,180,0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              top: '40%', left: '35%',
            }}
          />

          {/* Dot grid overlay */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0,210,180,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,210,180,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)',
            }}
          />
        </div>

        {/* ─── Corner Labels ──────────────────────────────────────────────── */}

        {/* Available-for-work — top-left */}
        <div
          className="hp-corner"
          style={{
            position: 'absolute', top: 28, left: 28, zIndex: 3,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <div
            className="hp-badge-dot"
            style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#00d2b4',
              boxShadow: '0 0 6px rgba(0,210,180,0.8)',
            }}
          />
          <span
            style={{
              fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
            }}
          >
            Available for work
          </span>
        </div>

        {/* Version tag — top-right */}
        <div
          className="hp-corner"
          style={{
            position: 'absolute', top: 28, right: 28, zIndex: 3,
            fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)',
          }}
        >
          Portfolio v1.0
        </div>

        {/* ─── Main Content ───────────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative', zIndex: 2,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            maxWidth: 700, width: '100%',
          }}
        >

          {/* Status badge */}
          <div
            className="hp-anim-1"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '0.5px solid rgba(0,210,180,0.35)',
              borderRadius: 100,
              padding: '6px 18px',
              marginBottom: 36,
            }}
          >
            <div
              className="hp-badge-dot"
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#00d2b4',
                boxShadow: '0 0 8px rgba(0,210,180,0.7)',
              }}
            />
            <span
              style={{
                fontSize: 12, fontWeight: 400,
                letterSpacing: '0.12em',
                color: 'rgba(0,210,180,0.85)',
                textTransform: 'uppercase',
              }}
            >
              MERN Stack Developer
            </span>
          </div>

          {/* Eyebrow */}
          <p
            className="hp-anim-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 300,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.38)',
              textTransform: 'uppercase',
              marginBottom: 20, marginTop: 0,
            }}
          >
            Full-Stack Engineer &amp; Web Innovator
          </p>

          {/* Name */}
          <h1
            className="hp-anim-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(52px, 10vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#fff',
              margin: '0 0 8px',
            }}
          >
            Hey, I'm<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00d2b4 0%, #00f0cc 50%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Darsh
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="hp-anim-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(15px, 2.5vw, 20px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 36px',
            }}
          >
            crafting experiences that live on the web
          </p>

          {/* Divider */}
          <div
            className="hp-anim-5"
            style={{
              width: 48, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(0,210,180,0.6), transparent)',
              margin: '0 auto 36px',
            }}
          />

          {/* Bio */}
          <p
            className="hp-anim-6"
            style={{
              fontSize: 16, fontWeight: 300, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 520, margin: '0 auto 52px',
            }}
          >
            I build{' '}
            <strong style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 400 }}>
              high-performance
            </strong>
            , accessible digital products for modern brands and startups — from interactive
            frontends to full MERN-stack applications that scale.
          </p>

          {/* CTA Buttons */}
          <div
            className="hp-anim-7"
            style={{
              display: 'flex', gap: 16,
              alignItems: 'center', flexWrap: 'wrap',
              justifyContent: 'center', marginBottom: 64,
            }}
          >
            {/* Primary — Download CV */}
            <a
              href="/Darsh_resume.pdf"
              download
              className="hp-btn-primary-inner"
              style={{
                position: 'relative',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px',
                background: '#00d2b4',
                color: '#080b12',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 500, letterSpacing: '0.04em',
                border: 'none', borderRadius: 6,
                cursor: 'pointer', textDecoration: 'none',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <i className="ti ti-download" aria-hidden="true" style={{ fontSize: 16 }} />
              Download CV
            </a>

            {/* Secondary — View Projects */}
            <Link
              to="/projects"
              className="hp-btn-secondary-inner"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 400, letterSpacing: '0.04em',
                border: '0.5px solid rgba(255,255,255,0.2)',
                borderRadius: 6,
                cursor: 'pointer', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              View Projects
              <i
                className="ti ti-arrow-right hp-icon-arr"
                aria-hidden="true"
                style={{ fontSize: 14 }}
              />
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="hp-anim-8"
            style={{
              display: 'flex',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {[
              { num: '2', unit: '+', label: 'Years XP' },
              { num: '15', unit: '+', label: 'Projects' },
              { num: '5', unit: '★', label: 'Client Rating' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 36px',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  flex: 1,
                  position: 'relative',
                  borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 28, fontWeight: 700,
                    color: '#fff', display: 'block',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.num}
                  <span style={{ fontSize: 18, color: '#00d2b4' }}>{stat.unit}</span>
                </span>
                <span
                  style={{
                    display: 'block', fontSize: 11,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)', marginTop: 4,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Scroll Indicator ───────────────────────────────────────────── */}
        <div
          className="hp-anim-9"
          style={{
            position: 'absolute', bottom: 32, left: '50%',
            transform: 'translateX(-50%)', zIndex: 2,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            }}
          >
            Scroll
          </span>
          <div
            className="hp-scroll-line"
            style={{
              width: 1, height: 48,
              background: 'linear-gradient(180deg, rgba(0,210,180,0.5), transparent)',
            }}
          />
        </div>

      </div>
    </>
  );
}
