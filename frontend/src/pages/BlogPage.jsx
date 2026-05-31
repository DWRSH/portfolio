import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, AlertCircle } from 'lucide-react';
import api from '../api/axios'; // Tumhara custom Axios instance

const proBlogStyles = `
  :root {
    --bg-dark: #05070a;
    --primary: #00d2b4;
    --primary-hover: #00f0cc;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-hover: rgba(255, 255, 255, 0.04);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .bl-wrapper {
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
  @keyframes blFadeUp {
    from { opacity: 0; transform: translate3d(0, 24px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Ambient Background System */
  .bl-ambient-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .bl-grid-overlay {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--glass-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--glass-bg) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 10%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 10%, transparent 100%);
  }
  .bl-glow {
    position: absolute; top: -150px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 300px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,210,180,0.08) 0%, transparent 70%);
    filter: blur(60px);
  }

  /* Layout Container */
  .bl-container {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
  }

  /* Header & Search */
  .bl-header { 
    text-align: center; margin-bottom: 56px; 
    opacity: 0; animation: blFadeUp 0.8s var(--easing) forwards; 
  }
  .bl-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(40px, 6vw, 64px); letter-spacing: -0.03em; margin: 0 0 16px;
  }
  .bl-subtitle {
    font-size: 16px; color: var(--text-muted); font-weight: 300; letter-spacing: 0.05em; margin-bottom: 40px;
  }
  
  /* Glassmorphism Search Bar */
  .bl-search-wrapper {
    position: relative; max-width: 540px; margin: 0 auto;
  }
  .bl-search-input {
    width: 100%; padding: 18px 24px 18px 52px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
    border-radius: 100px; color: var(--text-main); font-family: inherit; font-size: 15px;
    transition: all 0.3s var(--easing); box-sizing: border-box; outline: none;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .bl-search-input::placeholder { color: rgba(255,255,255,0.3); }
  .bl-search-input:focus {
    border-color: rgba(0,210,180,0.5);
    background: rgba(255,255,255,0.05);
    box-shadow: 0 0 0 4px rgba(0,210,180,0.1);
  }
  .bl-search-icon {
    position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
    color: var(--text-muted); transition: color 0.3s;
  }
  .bl-search-input:focus + .bl-search-icon { color: var(--primary); }

  /* Grid System */
  .bl-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
  }

  /* Blog Card */
  .bl-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
    transition: all 0.4s var(--easing); opacity: 0;
    animation: blFadeUp 0.8s var(--easing) forwards;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    text-decoration: none;
  }
  .bl-card:hover {
    transform: translateY(-6px); border-color: rgba(0,210,180,0.3);
    background: var(--glass-hover);
    box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(0,210,180,0.05);
  }

  /* Image Section */
  .bl-image-wrap {
    position: relative; height: 220px; overflow: hidden;
    border-bottom: 1px solid var(--glass-border);
  }
  .bl-image {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s var(--easing); filter: grayscale(15%) contrast(1.05);
  }
  .bl-card:hover .bl-image {
    transform: scale(1.05); filter: grayscale(0%) contrast(1);
  }

  /* Content Section */
  .bl-content { padding: 28px; display: flex; flex-direction: column; flex-grow: 1; }
  .bl-meta {
    font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
    color: var(--primary); text-transform: uppercase; margin-bottom: 12px;
  }
  .bl-card-title {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700;
    color: var(--text-main); margin: 0 0 12px; line-height: 1.3;
    transition: color 0.2s;
  }
  .bl-card:hover .bl-card-title { color: var(--primary); }
  
  /* CSS Line Clamping (Pro Truncation) */
  .bl-card-desc {
    font-size: 15px; font-weight: 300; line-height: 1.7;
    color: var(--text-muted); margin: 0 0 24px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; flex-grow: 1;
  }

  .bl-read-more {
    display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;
    color: var(--text-main); text-transform: uppercase; letter-spacing: 0.05em;
    margin-top: auto; transition: color 0.2s;
  }
  .bl-card:hover .bl-read-more { color: var(--primary); }
  .bl-read-more svg { transition: transform 0.3s var(--easing); }
  .bl-card:hover .bl-read-more svg { transform: translateX(4px); }

  /* Skeletons */
  .skeleton-box {
    background: rgba(255,255,255,0.03); position: relative; overflow: hidden;
  }
  .skeleton-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }

  /* Empty/Error States */
  .bl-state {
    text-align: center; padding: 80px 24px; border-radius: 16px;
    background: var(--glass-bg); border: 1px dashed var(--glass-border);
    animation: blFadeUp 0.6s var(--easing) forwards;
    max-width: 600px; margin: 40px auto 0;
  }
  .bl-state svg { color: var(--text-muted); margin: 0 auto 16px; width: 48px; height: 48px; }
  .bl-state-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 12px; }
  .bl-state-desc { font-size: 15px; color: var(--text-muted); line-height: 1.6; }

  @media (max-width: 768px) {
    .bl-wrapper { padding: 80px 20px; }
    .bl-grid { grid-template-columns: 1fr; }
  }
`;

// --- SKELETON LOADER COMPONENT ---
function BlogSkeleton({ index }) {
  return (
    <div className="bl-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="bl-image-wrap skeleton-box" />
      <div className="bl-content">
        <div className="skeleton-box" style={{ height: 12, width: '40%', borderRadius: 4, marginBottom: 16 }} />
        <div className="skeleton-box" style={{ height: 28, width: '90%', borderRadius: 4, marginBottom: 16 }} />
        <div className="skeleton-box" style={{ height: 14, width: '100%', borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton-box" style={{ height: 14, width: '100%', borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton-box" style={{ height: 14, width: '60%', borderRadius: 4, marginBottom: 24, flexGrow: 1 }} />
        <div className="skeleton-box" style={{ height: 16, width: 100, borderRadius: 4 }} />
      </div>
    </div>
  );
}

// --- BLOG CARD COMPONENT ---
function BlogPostCard({ post, index }) {
  const {
    title = "Blog Post Title",
    slug = "blog-post-title",
    content = "No excerpt available...", 
    createdAt = new Date().toISOString(),
    featuredImage
  } = post || {};

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link to={`/blog/${slug}`} className="bl-card" style={{ animationDelay: `${index * 0.1}s` }}>
      {featuredImage && (
        <div className="bl-image-wrap">
          <img
            src={featuredImage}
            alt={title}
            className="bl-image"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/05070a/1e293b?text=Image+Error"; }}
          />
        </div>
      )}
      <div className="bl-content">
        <time dateTime={createdAt} className="bl-meta">
          {formattedDate}
        </time>
        <h3 className="bl-card-title">{title}</h3>
        
        {/* CSS handles the truncation elegantly now */}
        <p className="bl-card-desc">{content}</p>
        
        <div className="bl-read-more">
          Read Article <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}

// --- MAIN PAGE COMPONENT ---
function BlogPage() {
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
      <style>{proBlogStyles}</style>

      <div className="bl-wrapper">
        {/* Ambient Background Elements */}
        <div className="bl-ambient-bg">
          <div className="bl-glow" />
          <div className="bl-grid-overlay" />
        </div>

        <div className="bl-container">
          
          {/* Header & Search */}
          <header className="bl-header">
            <h2 className="bl-title">Engineering <span style={{ color: 'var(--primary)' }}>Insights</span></h2>
            <p className="bl-subtitle">Thoughts, experiments, and technical deep-dives.</p>
            
            <div className="bl-search-wrapper">
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bl-search-input"
                aria-label="Search blog posts"
              />
              <Search className="bl-search-icon" size={20} />
            </div>
          </header>

          {/* Loading State */}
          {loading && (
            <div className="bl-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogSkeleton key={i} index={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bl-state" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <AlertCircle style={{ color: '#ef4444' }} />
              <h3 className="bl-state-title" style={{ color: '#fca5a5' }}>Connection Error</h3>
              <p className="bl-state-desc">{error}</p>
            </div>
          )}

          {/* Empty / No Results State */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="bl-state">
              <FileText />
              <h3 className="bl-state-title">
                {searchQuery ? "No Matches Found" : "No Publications Yet"}
              </h3>
              <p className="bl-state-desc">
                {searchQuery 
                  ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your keywords.`
                  : "The connection is established, but no content has been published yet. Check back soon."}
              </p>
            </div>
          )}

          {/* Success State: Blog Grid */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="bl-grid">
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

export default BlogPage;
