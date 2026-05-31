import React, { useState, useEffect } from 'react';
import { AlertCircle, FolderOpen } from 'lucide-react';
import api from './axios'; // Tumhara custom axios instance
import ProjectCard from './ProjectCard'; // Tumhara custom card component

/* ─── PRO STYLES ──────────────────────────────────────────────────────────── */
const proListStyles = `
  :root {
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .pl-grid {
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
    width: 100%;
  }

  /* Status States (Empty & Error) */
  .pl-state {
    text-align: center; padding: 80px 24px; border-radius: 16px;
    background: var(--glass-bg); border: 1px dashed var(--glass-border);
    animation: fadeIn 0.6s var(--easing) forwards;
    grid-column: 1 / -1; /* Stretch across entire grid */
    font-family: 'DM Sans', sans-serif;
  }
  .pl-state svg { color: var(--text-muted); margin: 0 auto 16px; width: 48px; height: 48px; }
  .pl-state-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; color: var(--text-main); }
  .pl-state-desc { font-size: 15px; color: var(--text-muted); }

  /* Skeletons Loader Animations */
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pl-skeleton-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
    height: 420px;
  }
  .sk-box {
    background: rgba(255,255,255,0.03); position: relative; overflow: hidden;
  }
  .sk-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }
`;

// --- SKELETON COMPONENT (For Loading State) ---
function ProjectSkeleton() {
  return (
    <div className="pl-skeleton-card">
      <div className="sk-box" style={{ height: '200px', width: '100%', borderBottom: '1px solid var(--glass-border)' }} />
      <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="sk-box" style={{ height: '24px', width: '70%', borderRadius: '4px', marginBottom: '16px' }} />
        <div className="sk-box" style={{ height: '14px', width: '100%', borderRadius: '4px', marginBottom: '8px' }} />
        <div className="sk-box" style={{ height: '14px', width: '80%', borderRadius: '4px', marginBottom: '24px', flexGrow: 1 }} />
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <div className="sk-box" style={{ height: '24px', width: '60px', borderRadius: '100px' }} />
          <div className="sk-box" style={{ height: '24px', width: '80px', borderRadius: '100px' }} />
        </div>
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
          <div className="sk-box" style={{ height: '20px', width: '80px', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN LIST COMPONENT ---
export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added Error State

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Validated API call without '/api' prefix
        const res = await api.get('/projects'); 
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message || "Unable to connect to the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <style>{proListStyles}</style>

      {/* 1. Loading State */}
      {loading && (
        <div className="pl-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 2. Error State */}
      {error && !loading && (
        <div className="pl-grid">
          <div className="pl-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <AlertCircle style={{ color: '#ef4444' }} />
            <h3 className="pl-state-title" style={{ color: '#fca5a5' }}>Failed to Load Projects</h3>
            <p className="pl-state-desc">{error}</p>
          </div>
        </div>
      )}

      {/* 3. Empty State (Connected but Database is empty) */}
      {!loading && !error && projects.length === 0 && (
        <div className="pl-grid">
          <div className="pl-state">
            <FolderOpen />
            <h3 className="pl-state-title">No Projects Found</h3>
            <p className="pl-state-desc">Your backend is working perfectly, but no projects exist in the database yet.</p>
          </div>
        </div>
      )}

      {/* 4. Success State (Render Cards) */}
      {!loading && !error && projects.length > 0 && (
        <div className="pl-grid">
          {projects.map((project, index) => (
            // Assuming your ProjectCard can take an index to do a staggered animation,
            // otherwise it will just render normally.
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
