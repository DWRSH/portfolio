import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { MathUtils } from "three";
import {
  ArrowRight, Download, MapPin, Github, Layers, BookOpen,
  ExternalLink, Headphones, Mail, Gamepad2,
} from "lucide-react";
import api from "../api/axios";

/* Install: npm i three @react-three/fiber @react-three/drei
   (React 18 → @react-three/fiber@8 + @react-three/drei@9) */

const TEAL = "#00d4b4", VIOLET = "#7c6ff7", PINK = "#ff6b9d", AMBER = "#ffb84d";
const ORB_COLORS = [TEAL, VIOLET, PINK, AMBER];

/* ───────────────────────── STYLES ───────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#04060a;--surf:#0b0f18;--surf2:#111620;--border:rgba(255,255,255,.07);--border-h:rgba(255,255,255,.16);
--teal:${TEAL};--violet:${VIOLET};--muted:rgba(255,255,255,.45);--ease:cubic-bezier(.16,1,.3,1);--r:20px}
.hp{background:var(--bg);background-image:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:28px 28px;
font-family:'DM Sans',sans-serif;color:#fff;min-height:100vh;overflow-x:hidden}
.hp a:focus-visible,.hp button:focus-visible{outline:2px solid var(--teal);outline-offset:3px}
.hp-body{max-width:1180px;margin:0 auto;padding:90px 24px 64px;display:flex;flex-direction:column;gap:48px}

/* Hero */
.hero{position:relative;min-height:600px;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:8px}
.hero-3d{position:absolute;top:-70px;right:-6%;width:68%;height:calc(100% + 70px);z-index:0}
.hero-in{position:relative;z-index:1;display:flex;flex-direction:column;gap:26px;pointer-events:none}
.hero-in a,.hero-in .hero-name{pointer-events:auto}
.hero-pill{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:100px;
border:1px solid rgba(0,212,180,.3);background:rgba(0,212,180,.06);color:var(--teal);font-size:13px;font-weight:600}
.hero-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 9px var(--teal);animation:blink 2.2s infinite}
@keyframes blink{50%{opacity:.3}}
.hero-name{font-family:'Syne',sans-serif;font-size:clamp(64px,15vw,200px);font-weight:800;line-height:.9;letter-spacing:-.04em;display:flex;cursor:default;width:fit-content}
.hl{display:inline-block;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.3);transition:transform .45s var(--ease),color .25s,-webkit-text-stroke-color .25s}
.hl:hover{transform:translateY(-16px) rotate(-7deg);color:var(--teal);-webkit-text-stroke-color:transparent}
.hero-bottom{display:flex;flex-direction:column;gap:24px}
@media(min-width:768px){.hero-bottom{flex-direction:row;justify-content:space-between;align-items:flex-end}}
.hero-bio{font-size:17px;font-weight:300;line-height:1.65;color:var(--muted);max-width:440px}
.hero-bio strong{color:#fff;font-weight:500}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.hbtn{display:inline-flex;align-items:center;gap:9px;padding:14px 26px;border-radius:100px;font-size:15px;font-weight:600;text-decoration:none;transition:transform .35s var(--ease),box-shadow .35s var(--ease),background .2s}
.hbtn:hover{transform:translateY(-3px) scale(1.03)}
.hbtn-primary{background:var(--teal);color:#04060a}
.hbtn-primary:hover{box-shadow:0 12px 32px rgba(0,212,180,.3);background:#fff}
.hbtn-sec{background:rgba(255,255,255,.04);color:#fff;border:1px solid var(--border-h);backdrop-filter:blur(10px)}
.orb-hint{position:absolute;z-index:1;right:12%;top:8px;font-size:12px;color:var(--muted);pointer-events:none}
@media(max-width:767px){.hero{min-height:560px}.hero-3d{width:120%;right:-10%;top:-30px;opacity:.7}.orb-hint{display:none}}

/* Bento */
.bento{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;perspective:1400px}
.c1{grid-column:span 1}.c2{grid-column:span 2}.c3{grid-column:span 3}
@media(max-width:1024px){.bento{grid-template-columns:repeat(3,1fr)}.c3{grid-column:span 3}}
@media(max-width:768px){.bento{grid-template-columns:repeat(2,1fr);gap:12px}.c2,.c3{grid-column:span 2}.mob-full{grid-column:span 2}}
.card{--mx:50%;--my:50%;background:var(--surf);border:1px solid var(--border);border-radius:var(--r);padding:clamp(16px,3vw,22px);
position:relative;overflow:hidden;display:flex;flex-direction:column;gap:14px;transform-style:preserve-3d;
transition:transform .3s var(--ease),border-color .3s,box-shadow .3s;will-change:transform}
.card::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;
background:radial-gradient(260px circle at var(--mx) var(--my),rgba(0,212,180,.14),transparent 70%)}
.card:hover{border-color:var(--border-h);box-shadow:0 24px 50px rgba(0,0,0,.55)}
.card:hover::after{opacity:1}
.lbl{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:var(--muted)}

/* 3D car */
.car-wrap{height:210px;border-radius:12px;overflow:hidden;cursor:pointer;touch-action:pan-y}
.car-hint{font-size:12px;color:var(--muted);margin-left:auto}

/* Stats */
.stats-row{display:flex;flex:1;gap:12px}
.stat{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-radius:var(--r);
background:var(--surf2);border:1px solid var(--border);padding:16px 6px;transition:transform .35s var(--ease),border-color .2s}
.stat:hover{transform:translateY(-6px) rotate(-2deg);border-color:var(--teal)}
.stat-num{font-family:'Syne',sans-serif;font-size:clamp(26px,4vw,40px);font-weight:800;line-height:1}
.stat-num span{color:var(--teal)}
.stat-lbl{font-size:12px;color:var(--muted)}

/* Vinyl */
.vinyl-card{cursor:pointer;min-height:210px}
.music-player-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:16px}
.vinyl-container{position:relative;width:clamp(70px,20vw,90px);height:clamp(70px,20vw,90px)}
.vinyl-record{width:100%;height:100%;border-radius:50%;border:3px solid #333;box-shadow:0 10px 20px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;
background:radial-gradient(circle,#000 30%,#1a1a1a 40%,#000 50%,#1a1a1a 60%,#000 70%,#1a1a1a 80%,#000 90%)}
.vinyl-record.playing{animation:spin 2s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.vinyl-label{width:34%;height:34%;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--violet));display:flex;align-items:center;justify-content:center}
.vinyl-hole{width:6px;height:6px;border-radius:50%;background:#000}
.tonearm{position:absolute;top:-10px;right:-15px;width:35px;height:60px;transform-origin:top right;transform:rotate(-35deg);transition:transform .4s var(--ease);z-index:5}
.tonearm.playing{transform:rotate(10deg)}
.music-info{text-align:center}
.music-song{font-family:'Syne',sans-serif;font-weight:600;font-size:15px}
.music-artist,.hover-hint{font-size:12px;color:var(--muted)}
.hover-hint{color:var(--teal);margin-top:6px}

/* Marquee */
.marquee{display:flex;flex-direction:column;gap:14px;overflow:hidden;flex:1;justify-content:center;mask-image:linear-gradient(to right,transparent,#000 10%,#000 90%,transparent)}
.tm-track{display:flex;width:max-content;gap:14px}
.tm-left{animation:scrollL 25s linear infinite}
.tm-right{transform:translateX(calc(-50% - 7px));animation:scrollR 25s linear infinite}
.ticon{background:var(--surf2);border:1px solid var(--border);border-radius:12px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .3s var(--ease),border-color .2s}
.ticon:hover{border-color:var(--teal);transform:translateY(-6px) rotate(8deg) scale(1.15)}
.ticon img{width:22px;height:22px}
.inv{filter:invert(1) brightness(.8)}
@keyframes scrollL{to{transform:translateX(calc(-50% - 7px))}}
@keyframes scrollR{to{transform:translateX(0)}}

/* Misc */
.gh-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.gh-img{width:100%;max-height:140px;object-fit:contain;background:var(--surf2);border-radius:12px;border:1px solid var(--border)}
.blog-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:600;line-height:1.4}
.blog-desc{font-size:13px;line-height:1.6;color:var(--muted);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.read-pill{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;color:var(--teal);background:rgba(0,212,180,.1);border:1px solid rgba(0,212,180,.2);padding:5px 12px;border-radius:100px;text-decoration:none;margin-top:auto;align-self:flex-start}
.map-link{flex:1;min-height:160px;position:relative;border-radius:12px;overflow:hidden;display:block}
.map-link iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;filter:invert(90%) hue-rotate(180deg) saturate(1.5) contrast(.8)}
.soc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;flex:1}
.soc-item{background:var(--surf2);border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:6px;text-decoration:none;color:#fff;font-weight:600;font-size:14px;transition:transform .35s var(--ease),border-color .2s}
.soc-item:hover{border-color:var(--teal);transform:translateY(-5px) rotate(-1.5deg)}
.cta-card{background:linear-gradient(135deg,rgba(0,212,180,.09),rgba(124,111,247,.09))!important;border-color:rgba(0,212,180,.2)!important;justify-content:center}
.cta-title{font-family:'Syne',sans-serif;font-size:clamp(22px,3vw,30px);font-weight:800;line-height:1.2}
.cta-btn{display:inline-flex;align-items:center;gap:7px;background:var(--teal);color:#04060a;font-weight:700;font-size:14px;padding:11px 22px;border-radius:100px;text-decoration:none;align-self:flex-start;transition:transform .3s var(--ease),background .2s}
.cta-btn:hover{background:#fff;transform:translateY(-2px) scale(1.05)}
.pulse{color:var(--muted);font-size:13px;animation:blink 1.5s infinite}

@media(prefers-reduced-motion:reduce){.hp *{animation:none!important;transition:none!important}}
`;

/* ───────────────────────── 3D: HERO ORB ───────────────────────── */
function Orb() {
  const group = useRef(), mesh = useRef(), pop = useRef(0);
  const [i, setI] = useState(0);
  const [hov, setHov] = useState(false);
  const color = ORB_COLORS[i];

  useFrame(({ pointer }) => {
    const g = group.current;
    g.rotation.y += (MathUtils.clamp(pointer.x, -1, 1) * 0.7 - g.rotation.y) * 0.06;
    g.rotation.x += (-MathUtils.clamp(pointer.y, -1, 1) * 0.4 - g.rotation.x) * 0.06;
    pop.current *= 0.92;
    const target = (hov ? 1.1 : 1) + pop.current * 0.4;
    mesh.current.scale.setScalar(MathUtils.lerp(mesh.current.scale.x, target, 0.15));
  });

  return (
    <group ref={group}>
      <Float speed={2} floatIntensity={1.2} rotationIntensity={0.5}>
        <mesh
          ref={mesh}
          onClick={() => { pop.current = 1; setI((n) => (n + 1) % ORB_COLORS.length); }}
          onPointerOver={() => { document.body.style.cursor = "pointer"; setHov(true); }}
          onPointerOut={() => { document.body.style.cursor = ""; setHov(false); }}
        >
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial color={color} distort={hov ? 0.6 : 0.4} speed={hov ? 4 : 2} roughness={0.2} metalness={0.3} />
        </mesh>
      </Float>
      {/* orbiting satellites */}
      <Satellites />
      <pointLight position={[3, 2, 4]} intensity={40} color={color} />
    </group>
  );
}

function Satellites() {
  const g = useRef();
  useFrame((_, dt) => { g.current.rotation.y += dt * 0.6; g.current.rotation.z += dt * 0.15; });
  const items = [[2.5, 0, 0, VIOLET, 0.2], [-2.3, 0.6, 1, TEAL, 0.16], [0.4, -2.2, -1.6, PINK, 0.18], [0, 2.4, 1, AMBER, 0.14]];
  return (
    <group ref={g}>
      <mesh rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 120]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.25} />
      </mesh>
      {items.map(([x, y, z, c, s], k) => (
        <mesh key={k} position={[x, y, z]}>
          <octahedronGeometry args={[s]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 4, 3]} intensity={1.6} />
      <Orb />
      <Sparkles count={70} scale={9} size={2.5} speed={0.4} color={TEAL} />
    </>
  );
}

/* ───────────────────────── 3D: DRIVING CAR ───────────────────────── */
const BUILDINGS = Array.from({ length: 9 }, (_, i) => ({
  x: i * 1.9 - 8, h: 1 + ((i * 37) % 5) * 0.6, w: 0.9 + (i % 3) * 0.3, c: i % 2 ? VIOLET : TEAL,
}));

function CarScene() {
  const car = useRef(), wheels = useRef([]), dashes = useRef([]), blds = useRef([]);
  const phys = useRef({ y: 0, vy: 0 });

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05), p = phys.current;
    p.vy -= 14 * dt;
    p.y = Math.max(0, p.y + p.vy * dt);
    if (p.y === 0) p.vy = 0;
    car.current.position.y = p.y + (p.y === 0 ? Math.sin(clock.elapsedTime * 28) * 0.012 : 0);
    car.current.rotation.z = p.vy * 0.025;
    wheels.current.forEach((w) => (w.rotation.z -= dt * 16));
    dashes.current.forEach((d) => { d.position.x -= dt * 5; if (d.position.x < -8) d.position.x += 16; });
    blds.current.forEach((b) => { b.position.x -= dt * 1.2; if (b.position.x < -9) b.position.x += 17.1; });
  });

  return (
    <>
      <fog attach="fog" args={["#0b0f18", 6, 14]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />

      {/* tap anywhere = jump */}
      <mesh position={[0, 1, 2]} onClick={() => { if (phys.current.y === 0) phys.current.vy = 5.5; }}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {BUILDINGS.map((b, k) => (
        <mesh key={k} ref={(el) => (blds.current[k] = el)} position={[b.x, b.h / 2, -3]}>
          <boxGeometry args={[b.w, b.h, 0.8]} />
          <meshStandardMaterial color="#111620" emissive={b.c} emissiveIntensity={0.12} />
        </mesh>
      ))}

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[30, 3]} />
        <meshStandardMaterial color="#080b12" />
      </mesh>
      {Array.from({ length: 8 }, (_, k) => (
        <mesh key={k} ref={(el) => (dashes.current[k] = el)} rotation-x={-Math.PI / 2} position={[k * 2 - 8, 0.005, 1.1]}>
          <planeGeometry args={[0.8, 0.07]} />
          <meshBasicMaterial color="#fff" transparent opacity={0.45} />
        </mesh>
      ))}

      <group ref={car}>
        <RoundedBox args={[2.2, 0.5, 1]} radius={0.12} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#1a2030" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[1.1, 0.42, 0.86]} radius={0.12} position={[-0.15, 0.92, 0]}>
          <meshStandardMaterial color={TEAL} metalness={0.3} roughness={0.25} />
        </RoundedBox>
        {[0.3, -0.3].map((z) => (
          <React.Fragment key={z}>
            <mesh position={[1.1, 0.55, z]}>
              <boxGeometry args={[0.05, 0.12, 0.2]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-1.1, 0.55, z]}>
              <boxGeometry args={[0.05, 0.12, 0.2]} />
              <meshStandardMaterial color="#ff5f56" emissive="#ff5f56" emissiveIntensity={1.5} />
            </mesh>
          </React.Fragment>
        ))}
        <pointLight position={[1.7, 0.6, 0]} color={TEAL} intensity={8} distance={4} />
        {[[-0.7, 0.52], [-0.7, -0.52], [0.7, 0.52], [0.7, -0.52]].map(([x, z], k) => (
          <group key={k} position={[x, 0.3, z]} ref={(el) => (wheels.current[k] = el)}>
            <mesh rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.3, 0.3, 0.18, 20]} />
              <meshStandardMaterial color="#0b0f18" />
            </mesh>
            <mesh>
              <boxGeometry args={[0.46, 0.06, 0.2]} />
              <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

/* ───────────────────────── 3D-tilt card ───────────────────────── */
function Tilt({ className = "", children, ...rest }) {
  const ref = useRef();
  const move = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - y) * 9}deg) rotateY(${(x - 0.5) * 11}deg) scale(1.015)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onPointerMove={move}
      onPointerLeave={() => (ref.current.style.transform = "")}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ───────────────────────── DATA ───────────────────────── */
const dev = (n, f = `${n}-original`) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${f}.svg`;
const ROW1 = [
  { name: "React", url: dev("react") }, { name: "Node JS", url: dev("nodejs") }, { name: "MongoDB", url: dev("mongodb") },
  { name: "Python", url: dev("python") }, { name: "FastAPI", url: dev("fastapi") }, { name: "HTML5", url: dev("html5") }, { name: "CSS3", url: dev("css3") },
];
const ROW2 = [
  { name: "JavaScript", url: dev("javascript") }, { name: "TypeScript", url: dev("typescript") }, { name: "Docker", url: dev("docker") },
  { name: "GitHub", url: dev("github"), inv: true }, { name: "Figma", url: dev("figma") }, { name: "Tailwind", url: dev("tailwindcss") },
  { name: "AWS", url: dev("amazonwebservices", "amazonwebservices-original-wordmark"), inv: true },
];
const M1 = [...ROW1, ...ROW1, ...ROW1], M2 = [...ROW2, ...ROW2, ...ROW2];
const SOCIALS = [
  { icon: "🐙", name: "GitHub", href: "https://github.com/DWRSH" },
  { icon: "💼", name: "LinkedIn", href: "https://www.linkedin.com/in/darshprajapati15" },
  { icon: "𝕏", name: "Twitter", href: "#" },
];

/* ───────────────────────── PAGE ───────────────────────── */
export default function HomePage() {
  const heroRef = useRef(), audioRef = useRef();
  const bust = useRef(Date.now()).current; // stable cache-buster (Date.now() in render reloaded images on every state change)
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };
  const pause = () => { audioRef.current?.pause(); setIsPlaying(false); };

  useEffect(() => {
    (async () => {
      try {
        const { data: posts } = await api.get("/blogs");
        const p = posts?.[0];
        setLatestPost(p ? {
          title: p.title,
          desc: p.desc || (p.content ? p.content.substring(0, 120) + "..." : "Click to read this article."),
          link: `/blog/${p.slug || p._id}`,
        } : null);
      } catch (e) {
        console.error("Failed to sync latest blog:", e);
      } finally {
        setLoadingPost(false);
      }
    })();
  }, []);

  const gh = `&theme=transparent&title_color=00d4b4&text_color=ffffff&icon_color=7c6ff7&hide_border=true&cache_seconds=1800&v=${bust}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hp">
        <div className="hp-body">
          {/* HERO — the one big 3D moment */}
          <section className="hero" ref={heroRef}>
            <div className="hero-3d">
              <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.75]}
                eventSource={heroRef}
                eventPrefix="client"
                style={{ touchAction: "pan-y" }}
              >
                <Suspense fallback={null}><HeroScene /></Suspense>
              </Canvas>
            </div>
            <span className="orb-hint">Click the orb to change its mood</span>

            <div className="hero-in">
              <div className="hero-pill"><span className="hero-dot" /> Available for new projects</div>
              <h1 className="hero-name" aria-label="Darsh">
                {"DARSH".split("").map((c, k) => <span className="hl" key={k} aria-hidden="true">{c}</span>)}
              </h1>
              <div className="hero-bottom">
                <p className="hero-bio">
                  I engineer <strong>high-performance</strong>, aesthetic digital architectures. Specialising in the{" "}
                  <strong>MERN stack</strong>, bridging heavy-duty backends with pixel-perfect frontends.
                </p>
                <div className="hero-btns">
                  <a href="/Darsh_resume.pdf" className="hbtn hbtn-primary">Download CV <Download size={17} /></a>
                  <Link to="/projects" className="hbtn hbtn-sec">Explore work <ArrowRight size={17} /></Link>
                </div>
              </div>
            </div>
          </section>

          <div className="bento">
            <Tilt className="c2">
              <div className="lbl"><Gamepad2 size={14} /> Keep moving <span className="car-hint">Tap to jump</span></div>
              <div className="car-wrap">
                <Canvas camera={{ position: [0, 1.5, 6.5], fov: 35 }} dpr={[1, 1.75]}>
                  <Suspense fallback={null}><CarScene /></Suspense>
                </Canvas>
              </div>
            </Tilt>

            <div className="c2 stats-row">
              {[["13", "Projects"], ["2", "Years exp"], ["6", "Hubs"]].map(([n, l]) => (
                <div className="stat" key={l}>
                  <div className="stat-num">{n}<span>+</span></div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>

            <Tilt className="c3">
              <div className="lbl"><Github size={14} /> Live GitHub data (@DWRSH)</div>
              <div className="gh-grid">
                <img className="gh-img" alt="GitHub stats" src={`https://github-readme-stats.vercel.app/api?username=DWRSH&show_icons=true&bg_color=00000000${gh}`} />
                <img className="gh-img" alt="GitHub streak" src={`https://streak-stats.demolab.com/?user=DWRSH&background=00000000${gh}`} />
              </div>
              <div style={{ overflowX: "auto", background: "var(--surf2)", padding: 12, borderRadius: 12, border: "1px solid var(--border)" }}>
                <img alt="GitHub commits" src={`https://ghchart.rshah.org/00d4b4/DWRSH?v=${bust}`}
                  style={{ minWidth: 600, width: "100%", filter: "hue-rotate(345deg) saturate(1.2)" }} />
              </div>
            </Tilt>

            <Tilt className="c1 vinyl-card" onMouseEnter={play} onMouseLeave={pause} onTouchStart={() => (isPlaying ? pause() : play())}>
              <div className="lbl"><Headphones size={14} /> Vibes</div>
              <audio ref={audioRef} loop preload="auto" src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" />
              <div className="music-player-wrap">
                <div className="vinyl-container">
                  <div className={`vinyl-record ${isPlaying ? "playing" : ""}`}>
                    <div className="vinyl-label"><div className="vinyl-hole" /></div>
                  </div>
                  <svg className={`tonearm ${isPlaying ? "playing" : ""}`} viewBox="0 0 40 80" aria-hidden="true">
                    <circle cx="30" cy="10" r="8" fill="#555" stroke="#222" strokeWidth="2" />
                    <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#ccc" strokeWidth="4" strokeLinecap="round" />
                    <rect x="2" y="65" width="12" height="15" rx="2" fill="#222" transform="rotate(25 8 72)" />
                  </svg>
                </div>
                <div className="music-info">
                  <div className="music-song">Lo-Fi Coding</div>
                  <div className="music-artist">Lofi Study</div>
                  <div className="hover-hint">{isPlaying ? "Playing…" : "Hover or tap to play"}</div>
                </div>
              </div>
            </Tilt>

            <Tilt className="c2">
              <div className="lbl"><Layers size={14} /> Tech stack</div>
              <div className="marquee">
                {[[M1, "tm-left"], [M2, "tm-right"]].map(([list, cls]) => (
                  <div className={`tm-track ${cls}`} key={cls}>
                    {list.map((t, k) => (
                      <div className="ticon" title={t.name} key={k}><img src={t.url} alt={t.name} className={t.inv ? "inv" : ""} /></div>
                    ))}
                  </div>
                ))}
              </div>
            </Tilt>

            <Tilt className="c2">
              <div className="lbl"><ExternalLink size={14} /> Find me online</div>
              <div className="soc-grid">
                {SOCIALS.map((s) => (
                  <a className="soc-item" key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    <span style={{ fontSize: 20 }}>{s.icon}</span>{s.name}
                  </a>
                ))}
              </div>
            </Tilt>

            <Tilt className="c1 mob-full">
              <div className="lbl"><BookOpen size={14} /> Latest post</div>
              {loadingPost ? (
                <span className="pulse">Syncing latest feed…</span>
              ) : latestPost ? (
                <>
                  <p className="blog-title">{latestPost.title}</p>
                  <p className="blog-desc">{latestPost.desc}</p>
                  <Link to={latestPost.link} className="read-pill">Read post <ArrowRight size={12} /></Link>
                </>
              ) : (
                <p className="blog-desc">No posts yet.</p>
              )}
            </Tilt>

            <Tilt className="c1" style={{ padding: 0 }}>
              <div className="lbl" style={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}><MapPin size={14} /> Location</div>
              <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map-link" aria-label="Open location in Google Maps">
                <iframe title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=k&z=10&ie=UTF8&iwloc=&output=embed" />
              </a>
            </Tilt>

            <Tilt className="c2 cta-card">
              <p className="cta-title">Let's build something great together.</p>
              <a href="mailto:contact@darshprajapati.dev" className="cta-btn"><Mail size={15} /> Get in touch</a>
            </Tilt>
          </div>
        </div>
      </div>
    </>
  );
}
