import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, AlertCircle, FolderOpen, ArrowUpRight } from 'lucide-react';
import api from '../api/axios'; 

/* ─── ULTRA-PREMIUM 3D & RESPONSIVE STYLES ───────────────────────────────── */
const eliteProjectStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ep-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 120px 24px 120px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: var(--text-main);
  }

  /* --- Ambient Background --- */
  .ep-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .ep-glow {
    position: absolute; width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.04) 0%, transparent 60%);
    top: -200px; right: -200px;
    animation: floatSlow 15s ease-in-out infinite;
  }
  .ep-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
  @keyframes floatSlow {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30px, 40px); }
  }
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .ep-container {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
  }

  /* --- Massive Header --- */
  .ep-header { 
    margin-bottom: 80px; opacity: 0; 
    animation: revealUp 1s var(--easing-premium) forwards; 
  }
  .ep-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(40px, 10vw, 120px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 16px;
    display: flex; flex-direction: column; word-break: break-word;
  }
  .ep-text-outline {
    color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
  }
  .ep-text-solid { color: var(--text-main); }
  .ep-subtitle {
    font-size: 18px; color: var(--text-muted); font-weight: 300; letter-spacing: 0.05em;
    max-width: 500px; margin-top: 24px;
  }

  /* --- Asymmetrical Elite Grid --- */
  .ep-grid {
    display: grid; 
    grid-template-columns: repeat(12, 1fr);
    gap: 32px;
    perspective: 1200px; /* Perspective for 3D Cards */
  }

  /* --- The Cinematic Project Card --- */
  .ep-card {
    background: rgba(255,255,255,0.01);
    border: 1px solid var(--glass-border);
    border-radius: 24px; overflow: hidden;
    display: flex; flex-direction: column;
    position: relative; opacity: 0;
    animation: revealUp 1s var(--easing-premium) forwards;
    transition: transform 0.6s var(--easing-premium), box-shadow 0.6s var(--easing-premium), border-color 0.6s;
    transform-style: preserve-3d;
    will-change: transform;
  }

  /* Responsive Grid Hierarchy */
  .ep-card { grid-column: span 12; } /* Mobile default */
  
  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet (iPad) View */
    .ep-card:nth-child(1) { grid-column: span 12; } /* First item stays full width */
    .ep-card:nth-child(n+2) { grid-column: span 6; } /* Others take half width */
  }

  @media (min-width: 1024px) {
    /* Desktop Elite View */
    .ep-card:nth-child(1) { grid-column: span 12; flex-direction: row; align-items: center; }
    .ep-card:nth-child(1) .ep-image-wrap { width: 60%; height: 500px; border-bottom: none; border-right: 1px solid var(--glass-border); }
    .ep-card:nth-child(1) .ep-content { width: 40%; padding: 48px; }
    .ep-card:nth-child(1) .ep-card-title { font-size: 48px; }
    
    .ep-card:nth-child(2), .ep-card:nth-child(3) { grid-column: span 6; }
    .ep-card:nth-child(2) .ep-image-wrap, .ep-card:nth-child(3) .ep-image-wrap { height: 320px; }
    
    .ep-card:nth-child(n+4) { grid-column: span 4; }
  }

  /* 3D Hover Effect */
  .ep-card:hover {
    background: rgba(255,255,255,0.02); border-color: rgba(0,210,180,0.3);
    transform: translateY(-8px) scale(1.02) rotateX(2deg) rotateY(-2deg);
    box-shadow: -10px 30px 60px rgba(0,0,0,0.5), 0 0 20px rgba(0,210,180,0.1);
  }

  /* Image Wrap & Hover Overlay */
  .ep-image-wrap {
    position: relative; height: 260px; overflow: hidden;
    border-bottom: 1px solid var(--glass-border);
  }
  .ep-image {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s var(--easing-premium), filter 0.8s;
    filter: grayscale(40%) contrast(1.1);
  }
  .ep-card:hover .ep-image { transform: scale(1.08); filter: grayscale(0%) contrast(1); }
  
  .ep-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(0deg, rgba(2,4,6,0.9) 0%, transparent 60%);
    opacity: 0.8; transition: opacity 0.5s;
  }
  .ep-card:hover .ep-overlay { opacity: 0.4; }

  /* Content & Watermark */
  .ep-content {
    padding: 32px; display: flex; flex-direction: column; flex-grow: 1; position: relative;
    transform: translateZ(20px); /* Brings content forward in 3D space */
  }
  .ep-watermark {
    position: absolute; top: 16px; right: 24px;
    font-family: 'Syne', sans-serif; font-size: 80px; font-weight: 800;
    color: rgba(255,255,255,0.03); line-height: 1; pointer-events: none;
    transition: color 0.5s, transform 0.5s;
  }
  .ep-card:hover .ep-watermark { 
    color: rgba(0,210,180,0.08); transform: scale(1.1) translateZ(10px); 
  }

  .ep-card-title {
    font-family: 'Syne', sans-serif; font-size: clamp(24px, 4vw, 28px); font-weight: 800;
    color: var(--text-main); margin: 0 0 16px; letter-spacing: -0.02em;
    z-index: 1; transition: color 0.3s;
  }
  .ep-card:hover .ep-card-title { color: var(--primary); }

  .ep-card-desc {
    font-size: 15px; font-weight: 300; line-height: 1.6;
    color: var(--text-muted); margin: 0 0 32px; flex-grow: 1; z-index: 1;
  }

  /* Tags */
  .ep-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; z-index: 1; }
  .ep-tag {
    background: transparent; border: 1px solid rgba(0,210,180,0.3);
    color: var(--primary); font-size: 11px; font-weight: 600; text-transform: uppercase;
    padding: 6px 14px; border-radius: 100px; letter-spacing: 0.1em;
  }

  /* Liquid Action Links */
  .ep-actions {
    display: flex; gap: 16px; align-items: center; z-index: 1; flex-wrap: wrap;
  }
  .ep-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--text-main); text-decoration: none; padding: 12px 20px;
    border-radius: 100px; border: 1px solid var(--glass-border);
    position: relative; overflow: hidden; transition: all 0.4s var(--easing-premium);
  }
  .ep-link::before {
    content: ''; position: absolute; inset: 0; background: var(--primary);
    transform: translateY(100%); transition: transform 0.4s var(--easing-premium); z-index: -1;
  }
  .ep-link:hover { color: #000; border-color: var(--primary); }
  .ep-link:hover::before { transform: translateY(0); }
  .ep-link svg { transition: transform 0.3s; }
  .ep-link:hover svg { transform: translate(3px, -3px); }

  /* Skeletons */
  .sk-box { background: rgba(255,255,255,0.03); position: relative; overflow: hidden; }
  .sk-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

  /* States */
  .ep-state {
    grid-column: span 12; text-align: center; padding: 100px 24px; border-radius: 24px;
    background: rgba(255,255,255,0.01); border: 1px dashed var(--glass-border);
  }
  .ep-state svg { color: var(--text-muted); margin: 0 auto 20px; width: 56px; height: 56px; }
  .ep-state-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 12px; }

  /* Mobile Tweaks */
  @media (max-width: 768px) {
    .ep-wrapper { padding: 100px 16px 80px; }
    .ep-header { margin-bottom: 48px; }
  }
`;

// --- ASYMMETRICAL SKELETON LOADER ---
function ProjectSkeleton({ index }) {
  return (
    <div className="ep-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="ep-image-wrap sk-box" />
      <div className="ep-content">
        <div className="sk-box" style={{ height: 32, width: '60%', borderRadius: 4, margin: '16px 0' }} />
        <div className="sk-box" style={{ height: 14, width: '100%', borderRadius: 4, marginBottom: 8 }} />
        <div className="sk-box" style={{ height: 14, width: '80%', borderRadius: 4, marginBottom: 32, flexGrow: 1 }} />
        <div className="ep-tags">
          <div className="sk-box" style={{ height: 26, width: 80, borderRadius: 100 }} />
          <div className="sk-box" style={{ height: 26, width: 100, borderRadius: 100 }} />
        </div>
      </div>
    </div>
  );
}

// --- ELITE PROJECT CARD ---
function ProjectCard({ project, index }) {
  const { title, description, imageUrl, tags = [], demoUrl, repoUrl } = project || {};
  const watermarkNum = String(index + 1).padStart(2, '0');

  return (
    <div className="ep-card" style={{ animationDelay: `${index * 0.1}s` }}>
      
      <div className="ep-image-wrap">
        <img
          src={imageUrl || "https://placehold.co/1200x800/020406/1e293b?text=Project"}
          alt={title}
          className="ep-image"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x800/020406/1e293b?text=Image+Error"; }}
        />
        <div className="ep-overlay" />
      </div>
      
      <div className="ep-content">
        <div className="ep-watermark">{watermarkNum}</div>
        
        <h3 className="ep-card-title">{title}</h3>
        <p className="ep-card-desc">{description || "No description provided."}</p>
        
        {tags.length > 0 && (
          <div className="ep-tags">
            {tags.map(tag => (
              <span key={tag} className="ep-tag">{tag}</span>
            ))}
          </div>
        )}
        
        <div className="ep-actions">
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="ep-link" aria-label={`Live demo: ${title}`}>
              Live Preview <ArrowUpRight size={16} />
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="ep-link" aria-label={`Source code: ${title}`}>
              Source Code <Github size={16} />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message || "Failed to establish connection with the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <style>{eliteProjectStyles}</style>

      <div className="ep-wrapper">
        <div className="ep-ambient">
          <div className="ep-glow" />
          <div className="ep-noise" />
        </div>

        <div className="ep-container">
          
          <header className="ep-header">
            <h1 className="ep-massive-text">
              <span className="ep-text-outline">SELECTED</span>
              <span className="ep-text-solid">WORKS.</span>
            </h1>
            <p className="ep-subtitle">An archive of digital experiences, full-stack architectures, and production-grade applications.</p>
          </header>

          {/* Loading State: Asymmetrical Skeleton Grid */}
          {loading && (
            <div className="ep-grid">
              {[1, 2, 3, 4, 5, 6].map((i, index) => (
                <ProjectSkeleton key={i} index={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="ep-grid">
              <div className="ep-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <AlertCircle style={{ color: '#ef4444' }} />
                <h3 className="ep-state-title" style={{ color: '#fca5a5' }}>System Failure</h3>
                <p style={{ color: 'var(--text-muted)' }}>{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="ep-grid">
              <div className="ep-state">
                <FolderOpen />
                <h3 className="ep-state-title">Archive Empty</h3>
                <p style={{ color: 'var(--text-muted)' }}>The connection is secure, but no projects are currently deployed to the portfolio.</p>
              </div>
            </div>
          )}

          {/* Success State: Elite Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="ep-grid">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
