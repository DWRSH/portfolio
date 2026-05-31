import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, AlertCircle, Clock } from 'lucide-react';
import api from '../api/axios';

/* ─── ULTRA-PREMIUM EDITORIAL STYLES ──────────────────────────────────────── */
const eliteBlogStyles = `
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

  .eb-wrapper {
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
  .eb-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .eb-glow-top {
    position: absolute; width: 1000px; height: 500px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 60%);
    top: -200px; left: 50%; transform: translateX(-50%);
  }
  .eb-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .eb-container {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
  }

  /* --- Massive Editorial Header --- */
  .eb-header { 
    text-align: center; margin-bottom: 64px; 
    opacity: 0; animation: revealUp 1s var(--easing-premium) forwards; 
  }
  .eb-massive-text {
    font-family: 'Syne', sans-serif; font-size: clamp(50px, 9vw, 110px);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.04em; margin: 0 0 16px;
    display: flex; flex-direction: column; align-items: center;
  }
  .eb-text-outline {
    color: transparent; -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
  }
  .eb-text-solid { color: var(--text-main); }
  .eb-subtitle {
    font-size: 18px; color: var(--text-muted); font-weight: 300; letter-spacing: 0.05em;
    max-width: 600px; margin: 24px auto 48px;
  }

  /* --- Elite Search Bar --- */
  .eb-search-wrapper {
    position: relative; max-width: 600px; margin: 0 auto;
    transition: transform 0.4s var(--easing-premium);
  }
  .eb-search-wrapper:focus-within { transform: scale(1.02); }
  .eb-search-input {
    width: 100%; padding: 20px 24px 20px 60px;
    background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
    border-radius: 100px; color: var(--text-main); font-family: inherit; font-size: 16px;
    transition: all 0.4s var(--easing-premium); outline: none;
    backdrop-filter: blur(12px); box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .eb-search-input::placeholder { color: rgba(255,255,255,0.3); font-weight: 300; }
  .eb-search-input:focus {
    background: rgba(255,255,255,0.05); border-color: rgba(0,210,180,0.4);
    box-shadow: 0 10px 40px rgba(0,210,180,0.1);
  }
  .eb-search-icon {
    position: absolute; left: 24px; top: 50%; transform: translateY(-50%);
    color: rgba(255,255,255,0.3); transition: color 0.4s;
  }
  .eb-search-input:focus + .eb-search-icon { color: var(--primary); }

  /* --- Asymmetrical Magazine Grid --- */
  .eb-grid {
    display: grid; 
    grid-template-columns: repeat(12, 1fr);
    gap: 32px;
  }

  /* The Cinematic Blog Card */
  .eb-card {
    background: transparent;
    display: flex; flex-direction: column; position: relative;
    opacity: 0; animation: revealUp 1s var(--easing-premium) forwards;
    text-decoration: none; cursor: pointer;
  }
  .eb-card:hover .eb-image { transform: scale(1.05); filter: grayscale(0%) contrast(1.1); }
  .eb-card:hover .eb-card-title { color: var(--primary); }

  /* Grid Hierarchy Logic (Editorial Flow) */
  .eb-card { grid-column: span 12; } /* Mobile default */
  
  @media (min-width: 1024px) {
    /* 1st Article: The Cover Story */
    .eb-card:nth-child(1) { grid-column: span 12; flex-direction: row; gap: 48px; align-items: center; }
    .eb-card:nth-child(1) .eb-image-wrap { width: 60%; height: 480px; border-radius: 24px; }
    .eb-card:nth-child(1) .eb-content { width: 40%; padding: 0; }
    .eb-card:nth-child(1) .eb-card-title { font-size: 40px; line-height: 1.1; }
    .eb-card:nth-child(1) .eb-card-desc { -webkit-line-clamp: 4; font-size: 16px; }
    
    /* 2nd & 3rd Articles: Secondary Features */
    .eb-card:nth-child(2), .eb-card:nth-child(3) { grid-column: span 6; }
    .eb-card:nth-child(2) .eb-image-wrap, .eb-card:nth-child(3) .eb-image-wrap { height: 320px; }
    
    /* 4th+ Articles: The Feed */
    .eb-card:nth-child(n+4) { grid-column: span 4; }
  }

  /* Image Wrap */
  .eb-image-wrap {
    position: relative; height: 260px; width: 100%; overflow: hidden;
    border-radius: 16px; border: 1px solid var(--glass-border);
    margin-bottom: 24px; transition: border-color 0.4s;
  }
  .eb-card:hover .eb-image-wrap { border-color: rgba(0,210,180,0.3); }
  .eb-image {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s var(--easing-premium), filter 0.8s;
    filter: grayscale(20%) contrast(1.05);
  }

  /* Content */
  .eb-content { display: flex; flex-direction: column; flex-grow: 1; }
  
  .eb-meta-bar {
    display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
  }
  .eb-meta-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(0,210,180,0.08); border: 1px solid rgba(0,210,180,0.2);
    color: var(--primary); font-size: 11px; font-weight: 600; text-transform: uppercase;
    padding: 4px 12px; border-radius: 100px; letter-spacing: 0.1em;
  }
  
  .eb-card-title {
    font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700;
    color: var(--text-main); margin: 0 0 16px; line-height: 1.2; letter-spacing: -0.02em;
    transition: color 0.4s var(--easing-premium);
  }
  .eb-card-desc {
    font-size: 15px; font-weight: 300; line-height: 1.7; color: var(--text-muted);
    margin: 0 0 24px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; flex-grow: 1;
  }

  /* Animated Read Trigger */
  .eb-read-trigger {
    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;
    color: var(--text-main); text-transform: uppercase; letter-spacing: 0.05em;
    margin-top: auto; opacity: 0.6; transition: all 0.4s var(--easing-premium);
  }
  .eb-read-icon {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--glass-border);
    transition: all 0.4s var(--easing-premium);
  }
  .eb-card:hover .eb-read-trigger { opacity: 1; color: var(--primary); }
  .eb-card:hover .eb-read-icon {
    background: var(--primary); border-color: var(--primary); color: #000;
    transform: translateX(8px);
  }

  /* Skeletons */
  .sk-box { background: rgba(255,255,255,0.03); position: relative; overflow: hidden; border-radius: 8px; }
  .sk-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }

  /* States */
  .eb-state {
    grid-column: span 12; text-align: center; padding: 100px 24px; border-radius: 24px;
    background: rgba(255,255,255,0.01); border: 1px dashed var(--glass-border);
    animation: revealUp 0.6s var(--easing-premium) forwards;
  }
  .eb-state svg { color: var(--text-muted); margin: 0 auto 20px; width: 56px; height: 56px; }
  .eb-state-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 12px; }
`;

// --- ASYMMETRICAL SKELETON LOADER ---
function BlogSkeleton({ index }) {
  // Skeleton mimics the exact CSS grid layout logic
  return (
    <div className="eb-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="eb-image-wrap sk-box" style={{ borderRadius: '16px' }} />
      <div className="eb-content">
        <div className="sk-box" style={{ height: 24, width: 100, borderRadius: 100, marginBottom: 16 }} />
        <div className="sk-box" style={{ height: 32, width: '85%', marginBottom: 16 }} />
        <div className="sk-box" style={{ height: 14, width: '100%', marginBottom: 8 }} />
        <div className="sk-box" style={{ height: 14, width: '80%', marginBottom: 24 }} />
      </div>
    </div>
  );
}

// --- ELITE BLOG CARD COMPONENT ---
function BlogPostCard({ post, index }) {
  const {
    title = "Blog Post Title",
    slug = "blog-post-title",
    content = "No excerpt available...", 
    createdAt = new Date().toISOString(),
    featuredImage
  } = post || {};

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <Link to={`/blog/${slug}`} className="eb-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="eb-image-wrap">
        <img
          src={featuredImage || "https://placehold.co/800x600/020406/1e293b?text=Article"}
          alt={title}
          className="eb-image"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/020406/1e293b?text=Image+Error"; }}
        />
      </div>
      
      <div className="eb-content">
        <div className="eb-meta-bar">
          <div className="eb-meta-pill">
            <Clock size={12} strokeWidth={2.5} />
            {formattedDate}
          </div>
        </div>
        
        <h3 className="eb-card-title">{title}</h3>
        <p className="eb-card-desc">{content}</p>
        
        <div className="eb-read-trigger">
          Read Story
          <div className="eb-read-icon">
            <ArrowRight size={14} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blogs');
        const fetchedPosts = response.data || [];
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Unable to connect to the backend server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = posts.filter(post =>
      (post.title && post.title.toLowerCase().includes(lowerCaseQuery)) ||
      (post.content && post.content.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredPosts(results);
  }, [posts, searchQuery]);

  return (
    <>
      <style>{eliteBlogStyles}</style>

      <div className="eb-wrapper">
        
        {/* Ambient Background */}
        <div className="eb-ambient">
          <div className="eb-glow-top" />
          <div className="eb-noise" />
        </div>

        <div className="eb-container">
          
          {/* Editorial Header & Search */}
          <header className="eb-header">
            <h1 className="eb-massive-text">
              <span className="eb-text-outline">ENGINEERING</span>
              <span className="eb-text-solid">INSIGHTS.</span>
            </h1>
            <p className="eb-subtitle">Deep dives into software architecture, MERN stack scaling, and thoughts on building the modern web.</p>
            
            <div className="eb-search-wrapper">
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="eb-search-input"
                aria-label="Search blog posts"
              />
              <Search className="eb-search-icon" size={20} />
            </div>
          </header>

          {/* Loading State: Asymmetrical Skeletons */}
          {loading && (
            <div className="eb-grid">
              {[1, 2, 3, 4, 5, 6].map((i, index) => (
                <BlogSkeleton key={i} index={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="eb-grid">
              <div className="eb-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <AlertCircle style={{ color: '#ef4444' }} />
                <h3 className="eb-state-title" style={{ color: '#fca5a5' }}>Connection Error</h3>
                <p style={{ color: 'var(--text-muted)' }}>{error}</p>
              </div>
            </div>
          )}

          {/* Empty / No Results State */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="eb-grid">
              <div className="eb-state">
                <FileText />
                <h3 className="eb-state-title">
                  {searchQuery ? "No Matches Found" : "No Publications Yet"}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  {searchQuery 
                    ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your keywords.`
                    : "The connection is established, but no content has been published yet. Check back soon."}
                </p>
              </div>
            </div>
          )}

          {/* Success State: Elite Editorial Grid */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="eb-grid">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post._id || index} post={post} index={index} />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
