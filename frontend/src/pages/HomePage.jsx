import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { MathUtils } from "three";
import * as GC from "react-github-calendar";
import {
  ArrowRight, ArrowUpRight, Download, MapPin, Github, Linkedin, Twitter,
  Layers, BookOpen, Headphones, Mail, Gamepad2,
} from "lucide-react";
import api from "../api/axios";

const GitHubCalendar = GC.default || GC.GitHubCalendar;
const ACC = "#3ddbc0";
const REDUCE = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ───────────────────────── STYLES ─────────────────────────
   Palette: ink #07090d · panel #0d1117 · paper #f3f1ec · mist #8d939e · one accent (teal)
   Type: Instrument Serif (display) + Inter Tight (text)                          */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter+Tight:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07090d;--panel:#0d1117;--panel2:#121821;--line:rgba(255,255,255,.08);--line2:rgba(255,255,255,.18);
--ink:#f3f1ec;--muted:#8d939e;--acc:${ACC};--ease:cubic-bezier(.16,1,.3,1);--r:16px;--serif:'Instrument Serif',serif}
.hp{background:var(--bg);color:var(--ink);font-family:'Inter Tight',sans-serif;min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;position:relative}
.hp::before{content:'';position:fixed;inset:0;pointer-events:none;background:radial-gradient(900px 520px at 78% -8%,rgba(61,219,192,.08),transparent 70%)}
.hp a:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
.hp-body{position:relative;max-width:1160px;margin:0 auto;padding:96px 24px 72px;display:flex;flex-direction:column;gap:72px}

/* Hero */
.hero{display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:24px;min-height:620px}
.copy{display:flex;flex-direction:column;gap:28px}
.status{display:inline-flex;align-items:center;gap:10px;align-self:flex-start;font-size:14px;color:var(--muted)}
.dot{width:7px;height:7px;border-radius:50%;background:var(--acc);box-shadow:0 0 0 4px rgba(61,219,192,.15);animation:ping 2.4s infinite}
@keyframes ping{50%{box-shadow:0 0 0 9px rgba(61,219,192,0)}}
.name{font-family:var(--serif);font-weight:400;font-size:clamp(56px,8.4vw,120px);line-height:.95;letter-spacing:-.025em}
.bio{font-size:clamp(17px,2vw,20px);line-height:1.6;color:var(--muted);max-width:480px;font-weight:300}
.bio b{color:var(--ink);font-weight:500}
.btns{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:9px;padding:13px 24px;border-radius:100px;font-size:15px;font-weight:500;text-decoration:none;transition:transform .4s var(--ease),background .25s,border-color .25s}
.btn:hover{transform:translateY(-2px)}
.btn-p{background:var(--ink);color:#07090d}.btn-p:hover{background:var(--acc)}
.btn-s{border:1px solid var(--line2);color:var(--ink)}.btn-s:hover{border-color:var(--ink)}
.facts{display:flex;max-width:480px;border-top:1px solid var(--line);padding-top:22px}
.fact{flex:1}.fact+.fact{padding-left:22px;border-left:1px solid var(--line)}
.fact b{display:block;font-family:var(--serif);font-weight:400;font-size:36px;line-height:1}
.fact span{font-size:13px;color:var(--muted)}
.hero-3d{position:relative;height:min(620px,72vh);min-height:420px}
.hint{position:absolute;bottom:4px;left:0;right:0;text-align:center;font-size:12px;color:var(--muted);pointer-events:none}
.rise{opacity:0;transform:translateY(18px);animation:rise 1.1s var(--ease) forwards}
@keyframes rise{to{opacity:1;transform:none}}
@media(max-width:860px){.hero{grid-template-columns:1fr;min-height:0}.hero-3d{order:-1;height:340px;min-height:0}}

/* Grid + cards */
.bento{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;perspective:1600px}
.c1{grid-column:span 1}.c2{grid-column:span 2}.c3{grid-column:span 3}.c4{grid-column:span 4}
@media(max-width:1024px){.bento{grid-template-columns:repeat(2,1fr)}.c1{grid-column:span 1}.c2,.c3,.c4{grid-column:span 2}}
@media(max-width:560px){.c1{grid-column:span 2}}
.card{--mx:50%;--my:50%;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:16px;background:var(--panel);
border:1px solid var(--line);border-radius:var(--r);padding:22px;transition:transform .6s var(--ease)}
.card::before{content:'';position:absolute;inset:0;z-index:2;border-radius:inherit;padding:1px;pointer-events:none;opacity:0;transition:opacity .4s;
background:radial-gradient(240px circle at var(--mx) var(--my),rgba(61,219,192,.6),transparent 70%);
-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.card::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(340px circle at var(--mx) var(--my),rgba(61,219,192,.05),transparent 70%)}
.card:hover::before,.card:hover::after{opacity:1}
.lbl{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--muted)}
.lbl small{margin-left:auto;font-size:12px;font-weight:400}
.car{height:230px;border-radius:12px;overflow:hidden;cursor:pointer;touch-action:pan-y;background:#0a0d12}

/* Post */
.post-title{font-family:var(--serif);font-size:27px;line-height:1.15;letter-spacing:-.01em}
.post-desc{font-size:14px;line-height:1.6;color:var(--muted);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:500;color:var(--acc);text-decoration:none;margin-top:auto}
.link svg{transition:transform .35s var(--ease)}.link:hover svg{transform:translateX(4px)}
.pulse{font-size:13px;color:var(--muted);animation:ping2 1.5s infinite}@keyframes ping2{50%{opacity:.4}}

/* Vinyl */
.vinyl-card{cursor:pointer;min-height:230px}
.player{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:18px}
.vinyl{position:relative;width:88px;height:88px}
.disc{width:100%;height:100%;border-radius:50%;border:2px solid #2a2f38;box-shadow:0 12px 24px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;
background:repeating-radial-gradient(circle,#050607 0 3px,#14181e 3px 4px)}
.disc.on{animation:spin 2.4s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.disc i{width:32%;height:32%;border-radius:50%;background:var(--acc);display:flex;align-items:center;justify-content:center}
.disc i::after{content:'';width:5px;height:5px;border-radius:50%;background:#07090d}
.arm{position:absolute;top:-10px;right:-15px;width:35px;height:60px;transform-origin:top right;transform:rotate(-35deg);transition:transform .5s var(--ease);z-index:3}
.arm.on{transform:rotate(10deg)}
.song{font-family:var(--serif);font-size:21px;text-align:center}
.artist{font-size:13px;color:var(--muted);text-align:center;margin-top:2px}

/* Calendar / marquee / social */
.cal{overflow-x:auto;padding:4px 0 2px}.cal text{fill:var(--muted)!important}
.marquee{display:flex;flex-direction:column;gap:14px;overflow:hidden;flex:1;justify-content:center;mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.track{display:flex;width:max-content;gap:14px}
.t-l{animation:sl 28s linear infinite}.t-r{transform:translateX(calc(-50% - 7px));animation:sr 28s linear infinite}
@keyframes sl{to{transform:translateX(calc(-50% - 7px))}}@keyframes sr{to{transform:translateX(0)}}
.ticon{width:46px;height:46px;flex-shrink:0;border-radius:12px;background:var(--panel2);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;transition:transform .4s var(--ease),border-color .25s}
.ticon img{width:22px;height:22px;filter:grayscale(1) opacity(.6);transition:filter .3s}
.ticon img.inv{filter:grayscale(1) invert(1) opacity(.6)}
.ticon:hover{transform:translateY(-5px);border-color:var(--line2)}
.ticon:hover img{filter:none}.ticon:hover img.inv{filter:invert(1)}
.soc{display:flex;flex-direction:column}
.soc a{display:flex;align-items:center;gap:12px;padding:15px 0;border-top:1px solid var(--line);color:var(--ink);text-decoration:none;font-size:15px;transition:color .25s,padding .4s var(--ease)}
.soc a:first-child{border-top:0}.soc a:hover{color:var(--acc);padding-left:8px}
.soc em{margin-left:auto;font-style:normal;font-size:13px;color:var(--muted)}
.map{flex:1;min-height:170px;position:relative;border-radius:12px;overflow:hidden;display:block}
.map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;filter:invert(.92) hue-rotate(180deg) grayscale(.85) contrast(.85)}

/* CTA */
.cta{flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:28px;padding:clamp(28px,5vw,56px);
background:radial-gradient(640px 260px at 0 0,rgba(61,219,192,.1),transparent 70%),var(--panel)}
.cta-title{font-family:var(--serif);font-size:clamp(36px,5.4vw,68px);line-height:1;letter-spacing:-.02em;max-width:660px}
.cta-side{display:flex;flex-direction:column;gap:12px;align-items:flex-start;font-size:14px;color:var(--muted)}

@media(prefers-reduced-motion:reduce){.hp *{animation:none!important;transition:none!important}.rise{opacity:1;transform:none}}
`;

/* ───────────────────────── helpers ───────────────────────── */
function useInView() {
  const ref = useRef();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, visible];
}
const loop = (visible) => (visible && !REDUCE ? "always" : "demand"); // pause off-screen canvases

function Tilt({ className = "", children, ...rest }) {
  const ref = useRef();
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  return (
    <div ref={ref} className={`card ${className}`} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = "")} {...rest}>
      {children}
    </div>
  );
}

/* ───────────────────────── 3D: armillary hero ─────────────────────────
   Three polished metal rings gyrate around a glowing core. Pointer = parallax, hover = faster spin. */
const RINGS = [
  { r: 1.9, rot: [0, 0, 0], axis: "y", s: 0.22, accent: false },
  { r: 1.55, rot: [1.1, 0, 0], axis: "x", s: -0.3, accent: false },
  { r: 1.2, rot: [0, 1, 0.8], axis: "z", s: 0.38, accent: true },
];

function Armillary() {
  const group = useRef(), rings = useRef([]), core = useRef(), speed = useRef(1);
  const [hov, setHov] = useState(false);

  useFrame(({ pointer, clock }, delta) => {
    const dt = Math.min(delta, 0.05), g = group.current;
    g.rotation.y = MathUtils.lerp(g.rotation.y, MathUtils.clamp(pointer.x, -1, 1) * 0.5, 0.05);
    g.rotation.x = MathUtils.lerp(g.rotation.x, -MathUtils.clamp(pointer.y, -1, 1) * 0.35, 0.05);
    speed.current = MathUtils.lerp(speed.current, hov ? 3.2 : 1, 0.05);
    RINGS.forEach((d, i) => { rings.current[i].rotation[d.axis] += dt * d.s * speed.current; });
    core.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.6) * 0.05);
  });

  return (
    <group ref={group}>
      <mesh onPointerOver={() => setHov(true)} onPointerOut={() => setHov(false)}>
        <sphereGeometry args={[2.1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {RINGS.map((d, i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={d.rot}>
          <torusGeometry args={[d.r, 0.032, 32, 220]} />
          <meshStandardMaterial color={d.accent ? ACC : "#d5d8de"} metalness={1} roughness={d.accent ? 0.28 : 0.18} />
        </mesh>
      ))}
      <mesh ref={core}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshStandardMaterial color="#0a3a33" emissive={ACC} emissiveIntensity={1.6} roughness={0.35} />
      </mesh>
      <pointLight color={ACC} intensity={14} distance={7} />
    </group>
  );
}

function HeroScene() {
  return (
    <>
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3.5} position={[0, 4, -5]} scale={[12, 2, 1]} />
        <Lightformer form="ring" color={ACC} intensity={3} position={[4, 1, 2]} scale={4} />
        <Lightformer form="rect" intensity={1.5} position={[-5, -1, 3]} scale={[6, 1, 1]} />
      </Environment>
      <Armillary />
      <Sparkles count={36} scale={8} size={1.6} speed={0.25} opacity={0.5} color={ACC} />
    </>
  );
}

/* ───────────────────────── 3D: night drive ───────────────────────── */
const BUILDINGS = Array.from({ length: 9 }, (_, i) => ({ x: i * 1.9 - 8, h: 1 + ((i * 37) % 5) * 0.6, w: 0.9 + (i % 3) * 0.3 }));

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
      <fog attach="fog" args={["#0a0d12", 6, 14]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <mesh position={[0, 1, 2]} onClick={() => { if (phys.current.y === 0) phys.current.vy = 5.5; }}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {BUILDINGS.map((b, k) => (
        <mesh key={k} ref={(el) => (blds.current[k] = el)} position={[b.x, b.h / 2, -3]}>
          <boxGeometry args={[b.w, b.h, 0.8]} />
          <meshStandardMaterial color="#10151d" emissive={ACC} emissiveIntensity={0.05} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[30, 3]} />
        <meshStandardMaterial color="#07090d" />
      </mesh>
      {Array.from({ length: 8 }, (_, k) => (
        <mesh key={k} ref={(el) => (dashes.current[k] = el)} rotation-x={-Math.PI / 2} position={[k * 2 - 8, 0.005, 1.1]}>
          <planeGeometry args={[0.8, 0.06]} />
          <meshBasicMaterial color="#f3f1ec" transparent opacity={0.35} />
        </mesh>
      ))}

      <group ref={car}>
        <RoundedBox args={[2.2, 0.5, 1]} radius={0.12} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#2a3446" metalness={0.7} roughness={0.28} />
        </RoundedBox>
        <RoundedBox args={[1.1, 0.42, 0.86]} radius={0.12} position={[-0.15, 0.92, 0]}>
          <meshStandardMaterial color="#0c1016" metalness={0.9} roughness={0.12} />
        </RoundedBox>
        {[0.505, -0.505].map((z) => (
          <mesh key={z} position={[0, 0.5, z]}>
            <boxGeometry args={[2.0, 0.03, 0.006]} />
            <meshStandardMaterial color={ACC} emissive={ACC} emissiveIntensity={1.4} />
          </mesh>
        ))}
        {[0.3, -0.3].map((z) => (
          <React.Fragment key={z}>
            <mesh position={[1.1, 0.55, z]}>
              <boxGeometry args={[0.05, 0.12, 0.2]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-1.1, 0.55, z]}>
              <boxGeometry args={[0.05, 0.12, 0.2]} />
              <meshStandardMaterial color="#ff5f56" emissive="#ff5f56" emissiveIntensity={1.4} />
            </mesh>
          </React.Fragment>
        ))}
        <pointLight position={[1.7, 0.6, 0]} color={ACC} intensity={8} distance={4} />
        {[[-0.7, 0.52], [-0.7, -0.52], [0.7, 0.52], [0.7, -0.52]].map(([x, z], k) => (
          <group key={k} position={[x, 0.3, z]} ref={(el) => (wheels.current[k] = el)}>
            <mesh rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.3, 0.3, 0.18, 24]} />
              <meshStandardMaterial color="#0a0d12" roughness={0.6} />
            </mesh>
            <mesh>
              <boxGeometry args={[0.46, 0.05, 0.2]} />
              <meshStandardMaterial color="#c9ccd2" metalness={1} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

function CarCard() {
  const [ref, visible] = useInView();
  return (
    <Tilt className="c2">
      <div className="lbl"><Gamepad2 size={15} /> Keep moving <small>Tap to jump</small></div>
      <div className="car" ref={ref}>
        <Canvas camera={{ position: [0, 1.5, 6.5], fov: 35 }} dpr={[1, 1.75]} frameloop={loop(visible)}>
          <Suspense fallback={null}><CarScene /></Suspense>
        </Canvas>
      </div>
    </Tilt>
  );
}

/* ───────────────────────── data ───────────────────────── */
const dev = (n, f = `${n}-original`) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${f}.svg`;
const ROW1 = ["react", "nodejs", "mongodb", "python", "fastapi", "html5", "css3"].map((n) => ({ name: n, url: dev(n) }));
const ROW2 = [
  { name: "javascript", url: dev("javascript") }, { name: "typescript", url: dev("typescript") }, { name: "docker", url: dev("docker") },
  { name: "github", url: dev("github"), inv: true }, { name: "figma", url: dev("figma") }, { name: "tailwind", url: dev("tailwindcss") },
  { name: "aws", url: dev("amazonwebservices", "amazonwebservices-original-wordmark"), inv: true },
];
const MARQUEE = [[[...ROW1, ...ROW1, ...ROW1], "t-l"], [[...ROW2, ...ROW2, ...ROW2], "t-r"]];
const SOCIALS = [
  { Icon: Github, name: "GitHub", handle: "@DWRSH", href: "https://github.com/DWRSH" },
  { Icon: Linkedin, name: "LinkedIn", handle: "darshprajapati15", href: "https://www.linkedin.com/in/darshprajapati15" },
  { Icon: Twitter, name: "Twitter", handle: "@dwrsh_", href: "#" },
];
const FACTS = [["13+", "Projects"], ["2+", "Years of experience"], ["6+", "Hubs"]];

/* ───────────────────────── page ───────────────────────── */
export default function HomePage() {
  const [heroRef, heroVisible] = useInView();
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {});
    setPlaying(true);
  };
  const pause = () => { audioRef.current?.pause(); setPlaying(false); };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/blogs");
        const p = data?.[0];
        setPost(p ? {
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

  const d = (s) => ({ animationDelay: `${s}s` });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hp">
        <div className="hp-body">
          <section className="hero" ref={heroRef}>
            <div className="copy">
              <div className="status rise" style={d(0.1)}><span className="dot" /> Available for new projects</div>
              <h1 className="name rise" style={d(0.2)}>Darsh Prajapati</h1>
              <p className="bio rise" style={d(0.35)}>
                I engineer <b>high-performance</b>, thoughtfully designed web products. I specialise in the <b>MERN stack</b>,
                pairing heavy-duty backends with pixel-perfect frontends.
              </p>
              <div className="btns rise" style={d(0.5)}>
                <a href="/Darsh_resume.pdf" className="btn btn-p">Download CV <Download size={16} /></a>
                <Link to="/projects" className="btn btn-s">Explore work <ArrowRight size={16} /></Link>
              </div>
              <div className="facts rise" style={d(0.65)}>
                {FACTS.map(([n, l]) => <div className="fact" key={l}><b>{n}</b><span>{l}</span></div>)}
              </div>
            </div>

            <div className="hero-3d">
              <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.75]} frameloop={loop(heroVisible)}
                eventSource={heroRef} eventPrefix="client" style={{ touchAction: "pan-y" }}>
                <Suspense fallback={null}><HeroScene /></Suspense>
              </Canvas>
              <span className="hint">Hover the rings to wind them up</span>
            </div>
          </section>

          <div className="bento">
            <CarCard />

            <Tilt className="c1">
              <div className="lbl"><BookOpen size={15} /> Latest post</div>
              {loadingPost ? <span className="pulse">Syncing latest feed…</span> : post ? (
                <>
                  <p className="post-title">{post.title}</p>
                  <p className="post-desc">{post.desc}</p>
                  <Link to={post.link} className="link">Read post <ArrowRight size={14} /></Link>
                </>
              ) : <p className="post-desc">No posts yet.</p>}
            </Tilt>

            <Tilt className="c1 vinyl-card" onMouseEnter={play} onMouseLeave={pause} onTouchStart={() => (playing ? pause() : play())}>
              <div className="lbl"><Headphones size={15} /> Vibes</div>
              <audio ref={audioRef} loop preload="none" src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" />
              <div className="player">
                <div className="vinyl">
                  <div className={`disc ${playing ? "on" : ""}`}><i /></div>
                  <svg className={`arm ${playing ? "on" : ""}`} viewBox="0 0 40 80" aria-hidden="true">
                    <circle cx="30" cy="10" r="8" fill="#3a404a" stroke="#1a1d23" strokeWidth="2" />
                    <path d="M 30 10 Q 30 50 10 70" fill="none" stroke="#c9ccd2" strokeWidth="3.5" strokeLinecap="round" />
                    <rect x="2" y="65" width="12" height="15" rx="2" fill="#1a1d23" transform="rotate(25 8 72)" />
                  </svg>
                </div>
                <div>
                  <div className="song">Lo-Fi Coding</div>
                  <div className="artist">{playing ? "Now playing" : "Hover or tap to play"}</div>
                </div>
              </div>
            </Tilt>

            <Tilt className="c3">
              <div className="lbl"><Github size={15} /> Contributions <small>@DWRSH</small></div>
              <div className="cal">
                <GitHubCalendar username="DWRSH" colorScheme="dark" blockSize={11} blockMargin={4} fontSize={12}
                  theme={{ dark: ["#141a22", "#0f4a43", "#14806f", "#27b8a0", ACC] }} />
              </div>
            </Tilt>

            <Tilt className="c1" style={{ padding: 0 }}>
              <div className="lbl" style={{ position: "absolute", top: 18, left: 20, zIndex: 3 }}><MapPin size={15} /> Based in Gujarat</div>
              <a href="https://maps.google.com/?q=Idar,Gujarat,India" target="_blank" rel="noreferrer" className="map" aria-label="Open location in Google Maps">
                <iframe title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Idar,Gujarat,India&t=m&z=10&ie=UTF8&iwloc=&output=embed" />
              </a>
            </Tilt>

            <Tilt className="c2">
              <div className="lbl"><Layers size={15} /> Tech stack</div>
              <div className="marquee">
                {MARQUEE.map(([list, cls]) => (
                  <div className={`track ${cls}`} key={cls}>
                    {list.map((t, k) => (
                      <div className="ticon" title={t.name} key={k}><img src={t.url} alt={t.name} className={t.inv ? "inv" : ""} /></div>
                    ))}
                  </div>
                ))}
              </div>
            </Tilt>

            <Tilt className="c2">
              <div className="lbl">Find me online</div>
              <nav className="soc">
                {SOCIALS.map(({ Icon, name, handle, href }) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer">
                    <Icon size={18} /> {name} <em>{handle}</em> <ArrowUpRight size={16} />
                  </a>
                ))}
              </nav>
            </Tilt>

            <Tilt className="c4 cta">
              <p className="cta-title">Let's build something worth keeping.</p>
              <div className="cta-side">
                contact@darshprajapati.dev
                <a href="mailto:contact@darshprajapati.dev" className="btn btn-p"><Mail size={16} /> Get in touch</a>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </>
  );
}
