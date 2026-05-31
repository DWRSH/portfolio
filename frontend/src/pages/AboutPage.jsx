import React from 'react';

/* ─── Google Font + Tabler Icons ──────────────────────────────────────────────
   Add these in your index.html <head> (if not already from HomePage):

   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
   ─────────────────────────────────────────────────────────────────────────── */

const styles = `
  @keyframes abFadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes abFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes abFloat1 {
    0%, 100% { transform: translate(0, 0); }
    50%      { transform: translate(-20px, 24px); }
  }
  @keyframes abFloat2 {
    0%, 100% { transform: translate(0, 0); }
    50%      { transform: translate(18px, -18px); }
  }
  @keyframes abPulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.35; }
  }
  @keyframes abBarFill {
    from { width: 0; }
    to   { width: var(--pct); }
  }

  .ab-orb1 { animation: abFloat1 11s ease-in-out infinite; }
  .ab-orb2 { animation: abFloat2 14s ease-in-out infinite; }
  .ab-pulse { animation: abPulse 2s infinite; }

  .ab-a1 { opacity: 0; animation: abFadeUp 0.7s 0.10s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ab-a2 { opacity: 0; animation: abFadeUp 0.8s 0.20s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ab-a3 { opacity: 0; animation: abFadeUp 0.8s 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ab-a4 { opacity: 0; animation: abFadeUp 0.7s 0.50s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ab-a5 { opacity: 0; animation: abFadeUp 0.7s 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ab-a6 { opacity: 0; animation: abFadeUp 0.8s 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }

  .ab-skill-card {
    border: 0.5px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.025);
    display: flex; flex-direction: column; gap: 10px;
    transition: border-color 0.2s, background 0.2s, transform 0.18s;
    cursor: default;
  }
  .ab-skill-card:hover {
    border-color: rgba(0,210,180,0.3);
    background: rgba(0,210,180,0.04);
    transform: translateY(-2px);
  }

  .ab-skill-bar-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, #00d2b4, #6366f1);
    width: var(--pct);
    animation: abBarFill 1.2s 0.8s cubic-bezier(0.16,1,0.3,1) both;
  }

  .ab-mini-card { transition: border-color 0.2s, background 0.2s; }
  .ab-mini-card:hover {
    border-color: rgba(0,210,180,0.25);
    background: rgba(0,210,180,0.03);
  }
`;

const SKILLS = [
  { name: 'JavaScript', pct: 92 },
  { name: 'React',       pct: 88 },
  { name: 'Node.js',     pct: 84 },
  { name: 'Express.js',  pct: 82 },
  { name: 'MongoDB',     pct: 78 },
  { name: 'Tailwind CSS',pct: 90 },
  { name: 'Git',         pct: 85 },
  { name: 'Docker',      pct: 68 },
  { name: 'Python',      pct: 72 },
  { name: 'SQL',         pct: 74 },
];

const MINI_CARDS = [
  { icon: 'ti-calendar',  num: '2+',  label: 'Years coding'    },
  { icon: 'ti-rocket',    num: '15+', label: 'Projects shipped' },
  { icon: 'ti-stack-2',   num: 'MERN',label: 'Primary stack'   },
  { icon: 'ti-world',     num: 'Open',label: 'To work'         },
];

export default function AboutPage() {
  return (
    <>
      <style>{styles}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: '#080b12',
          minHeight: '100vh',
          padding: '80px 48px 100px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ─── Atmospheric background ──────────────────────────────────── */}
        <div
          className="ab-orb1"
          style={{
            position: 'absolute', width: 480, height: 480,
            background: 'radial-gradient(circle, rgba(0,210,180,0.09) 0%, transparent 70%)',
            borderRadius: '50%', top: -100, right: -80, pointerEvents: 'none',
          }}
        />
        <div
          className="ab-orb2"
          style={{
            position: 'absolute', width: 360, height: 360,
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            borderRadius: '50%', bottom: 80, left: -60, pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(rgba(0,210,180,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,210,180,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 50% at 70% 30%, black 0%, transparent 100%)',
          }}
        />

        {/* ─── Main content ────────────────────────────────────────────── */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 860, margin: '0 auto' }}>

          {/* Eyebrow */}
          <div
            className="ab-a1"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}
          >
            <div
              className="ab-pulse"
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#00d2b4', boxShadow: '0 0 7px rgba(0,210,180,0.7)',
              }}
            />
            <span
              style={{
                fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(0,210,180,0.7)',
              }}
            >
              Get to know me
            </span>
          </div>

          {/* Heading */}
          <h2
            className="ab-a2"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1,
              letterSpacing: '-0.03em', color: '#fff', margin: '0 0 56px',
            }}
          >
            About{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d2b4, #6366f1)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Me
            </span>
          </h2>

          {/* Bio + Photo grid */}
          <div
            className="ab-a3"
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: 52,
              alignItems: 'start',
              marginBottom: 80,
            }}
          >
            {/* ── Photo column ─────────────────────────────────────────── */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  border: '0.5px solid rgba(0,210,180,0.2)',
                }}
              >
                <img
                  src="/d2d.png"
                  alt="Darsh Prajapati"
                  style={{ width: '100%', display: 'block', filter: 'grayscale(20%) contrast(1.05)' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x480/0d1117/1e293b?text=Darsh';
                  }}
                />
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(8,11,18,0.7) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center',
                    fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  Darsh Prajapati
                </div>
              </div>

              {/* Accent badge */}
              <div
                style={{
                  position: 'absolute', top: -10, right: -10,
                  width: 42, height: 42, borderRadius: '50%',
                  border: '0.5px solid rgba(0,210,180,0.25)',
                  background: 'rgba(0,210,180,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#00d2b4', fontSize: 16,
                }}
              >
                <i className="ti ti-code" aria-hidden="true" />
              </div>
            </div>

            {/* ── Bio column ───────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>

              {/* Section divider label */}
              <div
                style={{
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', marginBottom: 20,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                Biography
                <span style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', margin: '0 0 20px' }}>
                Hello! I'm a{' '}
                <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>self-taught developer</strong>
                {' '}passionate about building clean, maintainable software. I believe great code is both an art and an engineering discipline.
              </p>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', margin: '0 0 20px' }}>
                I work across the{' '}
                <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>JavaScript, React, Node.js</strong>
                {' '}and Python ecosystems — always chasing elegant solutions to complex problems.
              </p>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', margin: '0 0 24px' }}>
                Constantly learning, always shipping. Here you'll find the projects I'm building and the journey behind them.
              </p>

              {/* Mini stats cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {MINI_CARDS.map((c) => (
                  <div
                    key={c.label}
                    className="ab-mini-card"
                    style={{
                      border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 10,
                      padding: '14px 16px', background: 'rgba(255,255,255,0.02)',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'rgba(0,210,180,0.1)', border: '0.5px solid rgba(0,210,180,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#00d2b4', fontSize: 15, flexShrink: 0,
                      }}
                    >
                      <i className={`ti ${c.icon}`} aria-hidden="true" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif", fontSize: 18,
                          fontWeight: 700, color: '#fff', lineHeight: 1,
                        }}
                      >
                        {c.num}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                        {c.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Skills section ──────────────────────────────────────── */}

          <div
            className="ab-a4"
            style={{
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            Technical skills
            <span style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <h3
            className="ab-a5"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', margin: '0 0 36px',
            }}
          >
            My Stack
          </h3>

          <div
            className="ab-a6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 10,
            }}
          >
            {SKILLS.map((skill) => (
              <div key={skill.name} className="ab-skill-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.02em' }}>
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif", fontSize: 12,
                      fontWeight: 700, color: '#00d2b4',
                    }}
                  >
                    {skill.pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 2, background: 'rgba(255,255,255,0.06)',
                    borderRadius: 2, overflow: 'hidden',
                  }}
                >
                  <div
                    className="ab-skill-bar-fill"
                    style={{ '--pct': `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
