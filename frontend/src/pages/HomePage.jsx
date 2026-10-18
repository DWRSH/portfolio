import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Color, MathUtils, Object3D } from "three";
import * as GC from "react-github-calendar";
import {
  ArrowRight, ArrowUpRight, Download, MapPin, Github, Linkedin, Twitter,
  Layers, BookOpen, Headphones, Mail, Gamepad2,
} from "lucide-react";
import api from "../api/axios";

const GitHubCalendar = GC.default || GC.GitHubCalendar;
const COB = "#2f4bff";
const REDUCE = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Palette: porcelain #eceef2 · white · ink #0b0d12 · one accent, cobalt #2f4bff
   Type: Bricolage Grotesque (display) + Figtree (text)                        */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Figtree:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#eceef2;--card:#fff;--ink:#0b0d12;--mute:#646b78;--line:rgba(11,13,18,.09);--acc:${COB};--ease:cubic-bezier(.16,1,.3,1);--disp:'Bricolage Grotesque',sans-serif}
.hp{background:var(--bg);color:var(--ink);font-family:'Figtree',sans-serif;min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased}
.hp a:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
.hp-body{max-width:1160px;margin:0 auto;padding:92px 24px 72px;display:flex;flex-direction:column;gap:56px}

/* Hero */
.hero{position:relative;min-height:680px;display:flex;flex-direction:column}
.hero-bg{position:absolute;inset:0;mask-image:radial-gradient(ellipse 75% 80% at 50% 50%,#000 55%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 75% 80% at 50% 50%,#000 55%,transparent 100%)}
.hero-in{position:relative;flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:40px;padding:8px 0 12px;pointer-events:none}
.hero-in a{pointer-events:auto}
.status{display:inline-flex;align-items:center;gap:10px;align-self:flex-start;font-size:14px;font-weight:500;background:var(--card);border:1px solid var(--line);padding:8px 16px;border-radius:100px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--acc);box-shadow:0 0 0 4px rgba(47,75,255,.16);animation:ping 2.4s infinite}
@keyframes ping{50%{box-shadow:0 0 0 9px rgba(47,75,255,0)}}
.name{font-family:var(--disp);font-weight:800;font-size:clamp(64px,15.5vw,196px);line-height:.88;letter-spacing:-.055em}
.ln{display:block;overflow:hidden;padding-bottom:.06em}
.ln span{display:block;transform:translateY(106%);animation:up 1.1s var(--ease) forwards}
@keyframes up{to{transform:none}}
.foot{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:28px}
.bio{font-size:clamp(17px,2vw,19px);line-height:1.6;color:var(--mute);max-width:430px}
.bio b{color:var(--ink);font-weight:600}
.side{display:flex;flex-direction:column;gap:22px;align-items:flex-start}
.btns{display:flex;gap:10px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:9px;padding:14px 26px;border-radius:100px;font-size:15px;font-weight:600;text-decoration:none;transition:transform .4s var(--ease),background .25s,color .25s,border-color .25s}
.btn:hover{transform:translateY(-2px)}
.btn-p{background:var(--ink);color:#fff}.btn-p:hover{background:var(--acc)}
.btn-s{border:1px solid rgba(11,13,18,.22)}.btn-s:hover{border-color:var(--ink)}
.facts{display:flex}
.fact+.fact{margin-left:22px;padding-left:22px;border-left:1px solid rgba(11,13,18,.16)}
.fact b{display:block;font-family:var(--disp);font-weight:700;font-size:32px;letter-spacing:-.03em;line-height:1}
.fact span{font-size:13px;color:var(--mute)}
.hint{position:absolute;top:14px;right:4px;font-size:13px;color:var(--mute);pointer-events:none}
.rise{opacity:0;transform:translateY(16px);animation:rise 1s var(--ease) forwards}
@keyframes rise{to{opacity:1;transform:none}}
@media(max-width:700px){.hero{min-height:620px}.hint{display:none}}

/* Cards */
.bento{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;perspective:1600px}
.c1{grid-column:span 1}.c2{grid-column:span 2}.c3{grid-column:span 3}.c4{grid-column:span 4}
@media(max-width:1024px){.bento{grid-template-columns:repeat(2,1fr)}.c1{grid-column:span 1}.c2,.c3,.c4{grid-column:span 2}}
@media(max-width:560px){.c1{grid-column:span 2}}
.card{--mx:50%;--my:50%;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:16px;background:var(--card);
border:1px solid var(--line);border-radius:22px;padding:22px;box-shadow:0 18px 36px -26px rgba(11,13,18,.35);transition:transform .6s var(--ease)}
.card::before{content:'';position:absolute;inset:0;z-index:2;border-radius:inherit;padding:1.5px;pointer-events:none;opacity:0;transition:opacity .4s;
background:radial-gradient(220px circle at var(--mx) var(--my),var(--acc),transparent 70%);
-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.card:hover::before{opacity:1}
.dark{background:var(--ink);color:#fff;border-color:transparent}
.dark .lbl{color:rgba(255,255,255,.55)}
.lbl{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--mute)}
.lbl small{margin-left:auto;font-size:12px;font-weight:400}
.car{height:230px;border-radius:14px;overflow:hidden;cursor:pointer;touch-action:pan-y}

.post-title{font-family:var(--disp);font-weight:700;font-size:24px;line-height:1.12;letter-spacing:-.03em}
.post-desc{font-size:14px;line-height:1.6;color:var(--mute);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:var(--acc);text-decoration:none;margin-top:auto}
.link svg{transition:transform .35s var(--ease)}.link:hover svg{transform:translateX(4px)}
.pulse{font-size:13px;color:var(--mute);animation:ping2 1.5s infinite}@keyframes ping2{50%{opacity:.4}}

.vinyl-card{cursor:pointer;min-height:230px}
.player{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:18px}
.vinyl{position:relative;width:88px;height:88px}
.disc{width:100%;height:100%;border-radius:50%;border:2px solid #272c36;display:flex;align-items:center;justify-content:center;background:repeating-radial-gradient(circle,#050607 0 3px,#171b22 3px 4px)}
.disc.on{animation:spin 2.4s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.disc i{width:32%;height:32%;border-radius:50%;background:var(--acc);display:flex;align-items:center;justify-content:center}
.disc i::after{content:'';width:5px;height:5px;border-radius:50%;background:#fff}
.arm{position:absolute;top:-10px;right:-15px;width:35px;height:60px;transform-origin:top right;transform:rotate(-35deg);transition:transform .5s var(--ease);z-index:3}
.arm.on{transform:rotate(10deg)}
.song{font-family:var(--disp);font-weight:700;font-size:18px;text-align:center;letter-spacing:-.02em}
.artist{font-size:13px;color:rgba(255,255,255,.55);text-align:center;margin-top:2px}

.cal{overflow-x:auto;padding:4px 0 2px}.cal text{fill:var(--mute)!important}
.marquee{display:flex;flex-direction:column;gap:14px;overflow:hidden;flex:1;justify-content:center;mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.track{display:flex;width:max-content;gap:14px}
.t-l{animation:sl 28s linear infinite}.t-r{transform:translateX(calc(-50% - 7px));animation:sr 28s linear infinite}
@keyframes sl{to{transform:translateX(calc(-50% - 7px))}}@keyframes sr{to{transform:translateX(0)}}
.ticon{width:46px;height:46px;flex-shrink:0;border-radius:13px;background:var(--bg);display:flex;align-items:center;justify-content:center;transition:transform .4s var(--ease),background .25s}
.ticon img{width:22px;height:22px;filter:grayscale(1) opacity(.65);transition:filter .3s}
.ticon:hover{transform:translateY(-5px) rotate(-4deg);background:#fff;box-shadow:0 8px 18px -8px rgba(11,13,18,.3)}
.ticon:hover img{filter:none}
.soc{display:flex;flex-direction:column}
.soc a{display:flex;align-items:center;gap:12px;padding:15px 0;border-top:1px solid var(--line);color:var(--ink);text-decoration:none;font-size:15px;font-weight:500;transition:color .25s,padding .4s var(--ease)}
.soc a:first-child{border-top:0}.soc a:hover{color:var(--acc);padding-left:8px}
.soc em{margin-left:auto;font-style:normal;font-size:13px;font-weight:400;color:var(--mute)}
.map{flex:1;min-height:170px;position:relative;border-radius:14px;overflow:hidden;display:block}
.map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;filter:grayscale(1) contrast(1.05)}

.cta{flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:28px;padding:clamp(28px,5vw,56px)}
.cta-title{font-family:var(--disp);font-weight:800;font-size:clamp(38px,6vw,84px);line-height:.95;letter-spacing:-.045em;max-width:720px}
.cta-side{display:flex;flex-direction:column;gap:12px;align-items:flex-start;font-size:14px;color:rgba(255,255,255,.55)}
.cta .btn-p{background:#fff;color:var(--ink)}.cta .btn-p:hover{background:var(--acc);color:#fff}

@media(prefers-reduced-motion:reduce){.hp *{animation:none!important;transition:none!important}.rise{opacity:1;transform:none}.ln span{transform:none}}
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
const loop = (v) => (v && !REDUCE ? "always" : "demand"); // pauses off-screen canvases

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

/* ───────────────────────── 3D hero: a dot field that parts around your cursor ─────────────────────────
   1,456 instanced spheres. Near the pointer they swell, turn cobalt and push outward.
   When the pointer is idle for 2.5s a ghost cursor drifts across so the page never looks dead.            */
const COLS = 56, ROWS = 26, N = COLS * ROWS;
const BASE = new Color("#c2c8d4"), HOT = new Color(COB);

function Dots() {
  const mesh = useRef();
  const st = useRef({ o: new Float32Array(N * 2), px: 0, py: 0, last: 0 });
  const dummy = useMemo(() => new Object3D(), []);
  const col = useMemo(() => new Color(), []);

  useFrame(({ pointer, clock, viewport }) => {
    const s = st.current, t = clock.elapsedTime, w = viewport.width, h = viewport.height;
    if (pointer.x !== s.px || pointer.y !== s.py) { s.px = pointer.x; s.py = pointer.y; s.last = t; }
    const idle = t - s.last > 2.5;
    const mx = idle ? Math.sin(t * 0.6) * w * 0.32 : pointer.x * (w / 2);
    const my = idle ? Math.cos(t * 0.45) * h * 0.28 : pointer.y * (h / 2);

    for (let i = 0; i < N; i++) {
      const bx = ((i % COLS) / (COLS - 1) - 0.5) * w, by = (((i / COLS) | 0) / (ROWS - 1) - 0.5) * h;
      const dx = bx - mx, dy = by - my, d = Math.hypot(dx, dy) || 1e-3;
      const f = Math.exp(-(d * d) / 2.4);
      s.o[2 * i] = MathUtils.lerp(s.o[2 * i], (dx / d) * f * 0.7, 0.12);
      s.o[2 * i + 1] = MathUtils.lerp(s.o[2 * i + 1], (dy / d) * f * 0.7, 0.12);
      dummy.position.set(bx + s.o[2 * i], by + s.o[2 * i + 1], Math.sin(bx * 0.9 + by * 0.5 + t) * 0.1 + f * 0.5);
      dummy.scale.setScalar(0.034 + f * 0.11);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      mesh.current.setColorAt(i, col.copy(BASE).lerp(HOT, Math.min(1, f * 1.3)));
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, N]} frustumCulled={false}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/* ───────────────────────── 3D car (daylight) ───────────────────────── */
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
      <color attach="background" args={["#e6e9f0"]} />
      <fog attach="fog" args={["#e6e9f0", 6, 14]} />
      <ambientLight intensity={1} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <mesh position={[0, 1, 2]} onClick={() => { if (phys.current.y === 0) phys.current.vy = 5.5; }}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {BUILDINGS.map((b, k) => (
        <mesh key={k} ref={(el) => (blds.current[k] = el)} position={[b.x, b.h / 2, -3]}>
          <boxGeometry args={[b.w, b.h, 0.8]} />
          <meshStandardMaterial color={k % 2 ? "#cdd3e0" : "#bcc4d4"} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[30, 3]} />
        <meshStandardMaterial color="#c6ccd8" />
      </mesh>
      {Array.from({ length: 8 }, (_, k) => (
        <mesh key={k} ref={(el) => (dashes.current[k] = el)} rotation-x={-Math.PI / 2} position={[k * 2 - 8, 0.005, 1.1]}>
          <planeGeometry args={[0.8, 0.06]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      ))}

      <group ref={car}>
        <RoundedBox args={[2.2, 0.5, 1]} radius={0.12} position={[0, 0.5, 0]}>
          <meshStandardMaterial color={COB} metalness={0.25} roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[1.1, 0.42, 0.86]} radius={0.12} position={[-0.15, 0.92, 0]}>
          <meshStandardMaterial color="#0b0d12" metalness={0.6} roughness={0.15} />
        </RoundedBox>
        {[0.3, -0.3].map((z) => (
          <React.Fragment key={z}>
            <mesh position={[1.1, 0.55, z]}><boxGeometry args={[0.05, 0.12, 0.2]} /><meshBasicMaterial color="#fff" /></mesh>
            <mesh position={[-1.1, 0.55, z]}><boxGeometry args={[0.05, 0.12, 0.2]} /><meshBasicMaterial color="#ff5a36" /></mesh>
          </React.Fragment>
        ))}
        {[[-0.7, 0.52], [-0.7, -0.52], [0.7, 0.52], [0.7, -0.52]].map(([x, z], k) => (
          <group key={k} position={[x, 0.3, z]} ref={(el) => (wheels.current[k] = el)}>
            <mesh rotation-x={Math.PI / 2}><cylinderGeometry args={[0.3, 0.3, 0.18, 24]} /><meshStandardMaterial color="#0b0d12" /></mesh>
            <mesh><boxGeometry args={[0.46, 0.05, 0.2]} /><meshStandardMaterial color="#fff" /></mesh>
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
const ROW2 = ["javascript", "typescript", "docker", "github", "figma", "tailwindcss"].map((n) => ({ name: n, url: dev(n) }))
  .concat({ name: "aws", url: dev("amazonwebservices", "amazonwebservices-original-wordmark") });
const MARQUEE = [[[...ROW1, ...ROW1, ...ROW1], "t-l"], [[...ROW2, ...ROW2, ...ROW2], "t-r"]];
const SOCIALS = [
  { Icon: Github, name: "GitHub", handle: "@DWRSH", href: "https://github.com/DWRSH" },
  { Icon: Linkedin, name: "LinkedIn", handle: "darshprajapati15", href: "https://www.linkedin.com/in/darshprajapati15" },
  { Icon: Twitter, name: "Twitter", handle: "@dwrsh_", href: "#" },
];
const FACTS = [["13+", "Projects"], ["2+", "Years"], ["6+", "Hubs"]];

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
            <div className="hero-bg">
              <Canvas flat camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 1.75]} frameloop={loop(heroVisible)}
                eventSource={heroRef} eventPrefix="client" style={{ touchAction: "pan-y" }}>
                <Dots />
              </Canvas>
            </div>
            <span className="hint">Move your cursor through the dots</span>

            <div className="hero-in">
              <div className="status rise" style={d(0.05)}><span className="dot" /> Available for new projects</div>
              <h1 className="name" aria-label="Darsh Prajapati">
                <span className="ln" aria-hidden="true"><span style={d(0.1)}>Darsh</span></span>
                <span className="ln" aria-hidden="true"><span style={d(0.22)}>Prajapati</span></span>
              </h1>
              <div className="foot rise" style={d(0.55)}>
                <p className="bio">
                  I engineer <b>high-performance</b>, thoughtfully designed web products. I specialise in the <b>MERN stack</b>,
                  pairing heavy-duty backends with pixel-perfect frontends.
                </p>
                <div className="side">
                  <div className="btns">
                    <a href="/Darsh_resume.pdf" className="btn btn-p">Download CV <Download size={16} /></a>
                    <Link to="/projects" className="btn btn-s">Explore work <ArrowRight size={16} /></Link>
                  </div>
                  <div className="facts">{FACTS.map(([n, l]) => <div className="fact" key={l}><b>{n}</b><span>{l}</span></div>)}</div>
                </div>
              </div>
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

            <Tilt className="c1 dark vinyl-card" onMouseEnter={play} onMouseLeave={pause} onTouchStart={() => (playing ? pause() : play())}>
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
                <GitHubCalendar username="DWRSH" colorScheme="light" blockSize={11} blockMargin={4} fontSize={12}
                  theme={{ light: ["#e6e9f0", "#c0caff", "#8b9cff", "#5671ff", COB] }} />
              </div>
            </Tilt>

            <Tilt className="c1" style={{ padding: 0 }}>
              <div className="lbl" style={{ position: "absolute", top: 18, left: 20, zIndex: 3, background: "#fff", padding: "4px 10px", borderRadius: 100 }}>
                <MapPin size={15} /> Gujarat
              </div>
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
                    {list.map((t, k) => <div className="ticon" title={t.name} key={k}><img src={t.url} alt={t.name} /></div>)}
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

            <Tilt className="c4 dark cta">
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
