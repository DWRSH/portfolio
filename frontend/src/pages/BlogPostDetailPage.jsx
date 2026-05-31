import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../api/axios'; // Fixed Path


const proDetailStyles = `
  :root {
    --bg-dark: #05070a;
    --primary: #00d2b4;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.65);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .bld-wrapper {
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-dark);
    min-height: 100vh;
    padding: 100px 24px 120px;
    color: var(--text-main);
    position: relative;
    overflow: hidden;
  }

  /* Animations */
  @keyframes bldFadeUp {
    from { opacity: 0; transform: translate3d(0, 20px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .bld-container {
    max-width: 760px; /* Optimal reading width */
    margin: 0 auto;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: bldFadeUp 0.8s var(--easing) forwards;
  }

  /* Navigation */
  .bld-back-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 500; color: var(--text-muted);
    text-decoration: none; margin-bottom: 48px;
    transition: color 0.2s, transform 0.2s;
  }
  .bld-back-link:hover { color: var(--primary); transform: translateX(-4px); }

  /* Hero Section */
  .bld-hero-img-wrap {
    width: 100%; height: 360px; border-radius: 16px;
    overflow: hidden; margin-bottom: 40px;
    border: 1px solid var(--glass-border);
    position: relative;
  }
  .bld-hero-img {
    width: 100%; height: 100%; object-fit: cover;
    filter: grayscale(10%) contrast(1.05);
  }
  .bld-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(5,7,10,0.8) 100%);
  }

  /* Header & Meta */
  .bld-title {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 56px);
    font-weight: 800; line-height: 1.1; letter-spacing: -0.03em;
    margin: 0 0 24px; color: var(--text-main);
  }
  .bld-meta-bar {
    display: flex; align-items: center; flex-wrap: wrap; gap: 24px;
    padding-bottom: 32px; border-bottom: 1px solid var(--glass-border);
    margin-bottom: 40px;
  }
  
  /* Author Brand Mark */
  .bld-author {
    display: flex; align-items: center; gap: 12px;
  }
  .bld-brand-mark {
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(0,210,180,0.1); border: 1px solid rgba(0,210,180,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
    color: var(--primary);
  }
  .bld-author-name { font-size: 15px; font-weight: 500; color: var(--text-main); }
  
  .bld-meta-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 14px; color: var(--text-muted);
  }

  /* Custom Markdown Styling (Replaces Tailwind Typography) */
  .bld-content {
    font-size: 18px; line-height: 1.8; color: var(--text-muted);
    font-weight: 300;
  }
  .bld-content h1, .bld-content h2, .bld-content h3 {
    font-family: 'Syne', sans-serif; color: var(--text-main);
    font-weight: 700; margin: 2em 0 1em; letter-spacing: -0.02em;
  }
  .bld-content h2 { font-size: 32px; }
  .bld-content h3 { font-size: 24px; }
  .bld-content p { margin-bottom: 1.5em; }
  .bld-content a {
    color: var(--primary); text-decoration: none;
    border-bottom: 1px solid rgba(0,210,180,0.3); transition: border-color 0.2s;
  }
  .bld-content a:hover { border-bottom-color: var(--primary); }
  .bld-content blockquote {
    border-left: 3px solid var(--primary); margin: 2em 0;
    background: var(--glass-bg); padding: 20px 24px;
    border-radius: 0 12px 12px 0; font-style: italic; color: rgba(255,255,255,0.85);
  }
  .bld-content ul, .bld-content ol { margin-bottom: 1.5em; padding-left: 24px; }
  .bld-content li { margin-bottom: 0.5em; }
  .bld-content pre {
    background: rgba(5,7,10,0.8); border: 1px solid var(--glass-border);
    border-radius: 12px; padding: 20px; overflow-x: auto; margin: 2em 0;
  }
  .bld-content code {
    font-family: 'Fira Code', monospace; font-size: 14px;
    background: rgba(255,255,255,0.06); padding: 3px 6px;
    border-radius: 6px; color: #00f0cc;
  }
  .bld-content pre code { background: transparent; padding: 0; color: #e2e8f0; }
  .bld-content img { border-radius: 12px; max-width: 100%; margin: 2em 0; border: 1px solid var(--glass-border); }

  /* Skeleton Loaders */
  .sk-box {
    background: rgba(255,255,255,0.03); position: relative; overflow: hidden; border-radius: 8px;
  }
  .sk-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }

  /* Error State */
  .bld-state {
    text-align: center; padding: 80px 24px; border-radius: 16px;
    background: var(--glass-bg); border: 1px dashed rgba(239, 68, 68, 0.3);
    max-width: 600px; margin: 0 auto; animation: bldFadeUp 0.6s var(--easing) forwards;
  }

  @media (max-width: 768px) {
    .bld-wrapper { padding: 80px 20px; }
    .bld-hero-img-wrap { height: 240px; }
    .bld-content { font-size: 16px; }
  }
`;

// --- SKELETON LOADER COMPONENT ---
function ArticleSkeleton() {
  return (
    <div className="bld-container">
      <div className="sk-box" style={{ width: 120, height: 24, marginBottom: 48 }} />
      <div className="sk-box" style={{ width: '100%', height: 360, borderRadius: 16, marginBottom: 40 }} />
      <div className="sk-box" style={{ width: '90%', height: 48, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '60%', height: 48, marginBottom: 40 }} />
      <div className="sk-box" style={{ width: '100%', height: 60, marginBottom: 40 }} />
      
      <div className="sk-box" style={{ width: '100%', height: 20, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '100%', height: 20, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '80%', height: 20, marginBottom: 40 }} />
      
      <div className="sk-box" style={{ width: '100%', height: 20, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '95%', height: 20, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '85%', height: 20 }} />
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function BlogPostDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/slug/${slug}`);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError(err.message || "Failed to load the article.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="bld-wrapper">
        <style>{proDetailStyles}</style>
        <ArticleSkeleton />
      </div>
    );
  }

  // 2. Error State
  if (error || !post) {
    return (
      <div className="bld-wrapper">
        <style>{proDetailStyles}</style>
        <div className="bld-state">
          <AlertCircle style={{ color: '#ef4444', margin: '0 auto 16px', width: 48, height: 48 }} />
          <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>Article Not Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
            {error || "The article you are looking for does not exist or has been removed."}
          </p>
          <Link to="/blog" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
            ← Return to Publications
          </Link>
        </div>
      </div>
    );
  }

  // 3. Success State
  return (
    <>
      <style>{proDetailStyles}</style>
      
      <div className="bld-wrapper">
        <div className="bld-container">
          
          <Link to="/blog" className="bld-back-link">
            <ArrowLeft size={16} /> Back to all posts
          </Link>

          <article>
            {post.featuredImage && (
              <div className="bld-hero-img-wrap">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="bld-hero-img"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
                <div className="bld-hero-overlay" />
              </div>
            )}
            
            <h1 className="bld-title">{post.title}</h1>
            
            {/* Meta Information & Branding */}
            <div className="bld-meta-bar">
              <div className="bld-author">
                <div className="bld-brand-mark">D</div>
                <span className="bld-author-name">Darsh Prajapati</span>
              </div>
              
              <div style={{ display: 'flex', gap: '24px' }}>
                <div className="bld-meta-item">
                  <Calendar size={16} />
                  <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                </div>
                {/* Optional: Add reading time if you have it in backend, otherwise static/hidden */}
                <div className="bld-meta-item">
                  <Clock size={16} />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Markdown Content Wrapper */}
            <div className="bld-content">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
          
        </div>
      </div>
    </>
  );
}
