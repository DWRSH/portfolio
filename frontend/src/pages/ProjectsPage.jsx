import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, AlertCircle, FolderOpen } from 'lucide-react';
import api from '../api/axios'; // Tumhara custom Axios instance


const proProjectStyles = `
  :root {
    --bg-dark: #05070a;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-hover: rgba(255, 255, 255, 0.05);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .pj-wrapper {
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-dark);
    min-height: 100vh;
    padding: 100px 24px 120px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: var(--text-main);
  }

  /* Hardware Accelerated Animations */
  @keyframes pjFadeUp {
    from { opacity: 0; transform: translate3d(0, 30px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @keyframes pjPulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Ambient Background */
  .pj-ambient-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .pj-grid-overlay {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--glass-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--glass-bg) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 10%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 10%, transparent 100%);
  }

  /* Layout */
  .pj-container {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
  }

  /* Header */
  .pj-header { text-align: center; margin-bottom: 64px; opacity: 0; animation: pjFadeUp 0.8s var(--easing) forwards; }
  .pj-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(40px, 6vw, 64px); letter-spacing: -0.03em; margin: 0 0 16px;
  }
  .pj-subtitle {
    font-size: 16px; color: var(--text-muted); font-weight: 300; letter-spacing: 0.05em;
  }

  /* Grid System */
  .pj-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
  }

  /* Glassmorphism Project Card */
  .pj-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
    transition: all 0.4s var(--easing); opacity: 0;
    animation: pjFadeUp 0.8s var(--easing) forwards;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .pj-card:hover {
    transform: translateY(-8px); border-color: rgba(0,210,180,0.3);
    background: var(--glass-hover);
    box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(0,210,180,0.05);
  }

  /* Card Image */
  .pj-image-wrap {
    position: relative; height: 200px; overflow: hidden;
    border-bottom: 1px solid var(--glass-border);
  }
  .pj-image {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s var(--easing); filter: grayscale(20%) contrast(1.1);
  }
  .pj-card:hover .pj-image {
    transform: scale(1.05); filter: grayscale(0%) contrast(1);
  }
  .pj-image-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(5,7,10,0.9) 100%);
  }

  /* Card Content */
  .pj-content { padding: 24px; display: flex; flex-direction: column; flex-grow: 1; }
  .pj-card-title {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700;
    color: var(--text-main); margin: 0 0 12px; letter-spacing: -0.01em;
  }
  .pj-card-desc {
    font-size: 14px; font-weight: 300; line-height: 1.6;
    color: var(--text-muted); margin: 0 0 24px; flex-grow: 1;
  }

  /* Tags */
  .pj-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .pj-tag {
    background: rgba(0,210,180,0.06); border: 0.5px solid rgba(0,210,180,0.2);
    color: var(--primary); font-size: 11px; font-weight: 500;
    padding: 4px 12px; border-radius: 100px; letter-spacing: 0.05em;
  }

  /* Card Actions */
  .pj-actions {
    display: flex; gap: 16px; padding-top: 20px;
    border-top: 1px solid var(--glass-border);
  }
  .pj-link {
    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500;
    color: var(--text-muted); text-decoration: none; transition: color 0.2s;
  }
  .pj-link:hover { color: var(--primary); }
  .pj-link svg { transition: transform 0.2s; }
  .pj-link:hover svg { transform: translateY(-2px) scale(1.05); }

  /* Skeletons */
  .skeleton-box {
    background: rgba(255,255,255,0.03); position: relative; overflow: hidden;
  }
  .skeleton-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }

  /* States */
  .pj-state {
    text-align: center; padding: 80px 24px; border-radius: 16px;
    background: var(--glass-bg); border: 1px dashed var(--glass-border);
    animation: pjFadeUp 0.6s var(--easing) forwards;
  }
  .pj-state svg { color: var(--text-muted); margin: 0 auto 16px; width: 48px; height: 48px; }
  .pj-state-title { font-size: 20px; font-weight: 500; margin-bottom: 8px; }
  .pj-state-desc { font-size: 15px; color: var(--text-muted); }

  @media (max-width: 768px) {
    .pj-wrapper { padding: 80px 20px; }
    .pj-grid { grid-template-columns: 1fr; }
  }
`;

// --- SKELETON LOADER COMPONENT ---
function ProjectSkeleton({ index }) {
  return (
    <div className="pj-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="pj-image-wrap skeleton-box" />
      <div className="pj-content">
        <div className="skeleton-box" style={{ height: 28, width: '70%', borderRadius: 4, marginBottom: 16 }} />
        <div className="skeleton-box" style={{ height: 14, width: '100%', borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton-box" style={{ height: 14, width: '80%', borderRadius: 4, marginBottom: 24, flexGrow: 1 }} />
        <div className="pj-tags">
          <div className="skeleton-box" style={{ height: 24, width: 60, borderRadius: 100 }} />
          <div className="skeleton-box" style={{ height: 24, width: 80, borderRadius: 100 }} />
        </div>
        <div className="pj-actions">
          <div className="skeleton-box" style={{ height: 20, width: 80, borderRadius: 4 }} />
        </div>
      </div>
    </div>
  );
}

// --- PROJECT CARD COMPONENT ---
function ProjectCard({ project, index }) {
  const { title, description, imageUrl, tags = [], demoUrl, repoUrl } = project || {};

  return (
    <div className="pj-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="pj-image-wrap">
        <img
          src={imageUrl || "https://placehold.co/600x400/05070a/1e293b?text=Project"}
          alt={title}
          className="pj-image"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/05070a/1e293b?text=Image+Error"; }}
        />
        <div className="pj-image-overlay" />
      </div>
      
      <div className="pj-content">
        <h3 className="pj-card-title">{title}</h3>
        <p className="pj-card-desc">{description || "No description provided."}</p>
        
        {tags.length > 0 && (
          <div className="pj-tags">
            {tags.map(tag => (
              <span key={tag} className="pj-tag">{tag}</span>
            ))}
          </div>
        )}
        
        <div className="pj-actions">
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="pj-link" aria-label={`View code for ${title}`}>
              <Github size={16} /> <span>Code</span>
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="pj-link" aria-label={`View live demo for ${title}`}>
              <ExternalLink size={16} /> <span>Live Demo</span>
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
      <style>{proProjectStyles}</style>

      <div className="pj-wrapper">
        <div className="pj-ambient-bg">
          <div className="pj-grid-overlay" />
        </div>

        <div className="pj-container">
          
          <header className="pj-header">
            <h2 className="pj-title">Featured Work</h2>
            <p className="pj-subtitle">Digital products, architectures, and experiments.</p>
          </header>

          {/* Loading State: Skeleton Grid */}
          {loading && (
            <div className="pj-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProjectSkeleton key={i} index={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="pj-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <AlertCircle style={{ color: '#ef4444' }} />
              <h3 className="pj-state-title" style={{ color: '#fca5a5' }}>System Error</h3>
              <p className="pj-state-desc">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="pj-state">
              <FolderOpen />
              <h3 className="pj-state-title">No Projects Found</h3>
              <p className="pj-state-desc">The database is connected, but no entries exist yet. Add some via the admin panel.</p>
            </div>
          )}

          {/* Success State: Project Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="pj-grid">
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
