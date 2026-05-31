import React, { useState, useEffect } from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import api from './axios'; // Tumhara custom axios instance
import BlogPostCard from './BlogPostCard'; // Tumhara custom blog card component

/* ─── PRO STYLES ──────────────────────────────────────────────────────────── */
const proBlogListStyles = `
  :root {
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Responsive Grid for Blog Cards */
  .bl-list-grid {
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
    width: 100%;
  }

  /* Status States (Empty & Error) */
  .bl-state {
    text-align: center; padding: 80px 24px; border-radius: 16px;
    background: var(--glass-bg); border: 1px dashed var(--glass-border);
    animation: fadeIn 0.6s var(--easing) forwards;
    grid-column: 1 / -1; /* Stretch across the entire grid */
    font-family: 'DM Sans', sans-serif;
  }
  .bl-state svg { color: var(--text-muted); margin: 0 auto 16px; width: 48px; height: 48px; }
  .bl-state-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; color: var(--text-main); }
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

  .bl-skeleton-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
    height: 440px; /* Matching Blog Card approximate height */
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
function BlogSkeleton() {
  return (
    <div className="bl-skeleton-card">
      {/* Image Skeleton */}
      <div className="sk-box" style={{ height: '220px', width: '100%', borderBottom: '1px solid var(--glass-border)' }} />
      
      {/* Content Skeleton */}
      <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="sk-box" style={{ height: '12px', width: '40%', borderRadius: '4px', marginBottom: '16px' }} />
        <div className="sk-box" style={{ height: '24px', width: '90%', borderRadius: '4px', marginBottom: '16px' }} />
        <div className="sk-box" style={{ height: '14px', width: '100%', borderRadius: '4px', marginBottom: '8px' }} />
        <div className="sk-box" style={{ height: '14px', width: '100%', borderRadius: '4px', marginBottom: '8px' }} />
        <div className="sk-box" style={{ height: '14px', width: '60%', borderRadius: '4px', marginBottom: '24px', flexGrow: 1 }} />
        <div className="sk-box" style={{ height: '16px', width: '100px', borderRadius: '4px' }} />
      </div>
    </div>
  );
}

// --- MAIN LIST COMPONENT ---
export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Backend failure handling

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Validated API call without '/api' prefix
        const res = await api.get('/blogs'); 
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Unable to connect to the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <style>{proBlogListStyles}</style>

      {/* 1. Loading State */}
      {loading && (
        <div className="bl-list-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 2. Error State */}
      {error && !loading && (
        <div className="bl-list-grid">
          <div className="bl-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <AlertCircle style={{ color: '#ef4444' }} />
            <h3 className="bl-state-title" style={{ color: '#fca5a5' }}>Failed to Load Articles</h3>
            <p className="pl-state-desc">{error}</p>
          </div>
        </div>
      )}

      {/* 3. Empty State (Connected but Database is empty) */}
      {!loading && !error && posts.length === 0 && (
        <div className="bl-list-grid">
          <div className="bl-state">
            <FileText />
            <h3 className="bl-state-title">No Articles Published</h3>
            <p className="pl-state-desc">Your backend is working perfectly, but no blog posts exist in the database yet.</p>
          </div>
        </div>
      )}

      {/* 4. Success State (Render Cards) */}
      {!loading && !error && posts.length > 0 && (
        <div className="bl-list-grid">
          {posts.map((post, index) => (
            // Added index prop for staggered animations if your card supports it
            <BlogPostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
