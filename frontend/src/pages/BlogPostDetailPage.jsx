import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../api/axios';

/* ─── ULTRA-PREMIUM EDITORIAL STYLES ──────────────────────────────────────── */
const eliteDetailStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --bg-surface: #0a0e14;
    --primary: #00d2b4;
    --accent: #6366f1;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ebd-wrapper {
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-ultra-dark);
    min-height: 100vh;
    padding: 100px 24px 120px;
    color: var(--text-main);
    position: relative;
    overflow: hidden;
  }

  /* --- Reading Progress Bar --- */
  .ebd-progress-bar {
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    z-index: 1000; transition: transform 0.1s ease-out;
    transform-origin: left; box-shadow: 0 0 10px rgba(0,210,180,0.5);
  }

  /* --- Animations --- */
  @keyframes ebdFadeUp {
    from { opacity: 0; transform: translateY(30px); filter: blur(5px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .ebd-container {
    max-width: 800px; /* Optimal reading width (approx 65-75 characters) */
    margin: 0 auto;
    position: relative; z-index: 2;
    opacity: 0; animation: ebdFadeUp 0.8s var(--easing-premium) forwards;
  }

  /* --- Floating Back Link --- */
  .ebd-back-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--text-muted); text-decoration: none; margin-bottom: 40px;
    transition: all 0.3s var(--easing-premium);
    padding: 8px 16px; border-radius: 100px; border: 1px solid transparent;
  }
  .ebd-back-link:hover { 
    color: var(--primary); background: var(--glass-bg); 
    border-color: var(--glass-border); transform: translateX(-4px); 
  }

  /* --- Cinematic 3D Hero Image --- */
  .ebd-hero-wrap {
    width: 100%; 
    height: clamp(250px, 40vh, 480px); /* Fluid height based on screen */
    border-radius: 24px; overflow: hidden; margin-bottom: 48px;
    border: 1px solid var(--glass-border); position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    transform-style: preserve-3d;
    transition: transform 0.6s var(--easing-premium), box-shadow 0.6s;
    perspective: 1000px;
  }
  .ebd-hero-wrap:hover {
    transform: translateY(-5px) rotateX(2deg) rotateY(-2deg);
    box-shadow: -10px 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,210,180,0.1);
    border-color: rgba(0,210,180,0.3);
  }
  .ebd-hero-img {
    width: 100%; height: 100%; object-fit: cover;
    filter: grayscale(15%) contrast(1.1); transition: transform 10s ease-out, filter 0.6s;
  }
  .ebd-hero-wrap:hover .ebd-hero-img { 
    transform: scale(1.08); filter: grayscale(0%) contrast(1);
  }
  .ebd-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(2,4,6,0.9) 100%);
  }

  /* --- Editorial Header & Meta --- */
  .ebd-title {
    font-family: 'Syne', sans-serif; 
    font-size: clamp(32px, 5vw, 64px); /* Fluid Typography */
    font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
    margin: 0 0 32px; color: var(--text-main);
    word-break: break-word;
  }

  .ebd-meta-bar {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 24px; padding: 24px 0;
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
    margin-bottom: 48px; background: rgba(255,255,255,0.01);
  }
  
  .ebd-author { display: flex; align-items: center; gap: 12px; }
  .ebd-brand-mark {
    width: 40px; height: 40px; border-radius: 12px;
    background: rgba(0,210,180,0.1); border: 1px solid rgba(0,210,180,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
    color: var(--primary);
  }
  .ebd-author-info { display: flex; flex-direction: column; }
  .ebd-author-name { font-size: 15px; font-weight: 600; color: var(--text-main); }
  .ebd-author-title { font-size: 12px; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase;}
  
  .ebd-meta-stats { display: flex; align-items: center; gap: 20px; flex-wrap: wrap;}
  .ebd-meta-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: var(--text-muted);
    letter-spacing: 0.05em; text-transform: uppercase;
  }

  /* --- Ultra-Premium Markdown Content --- */
  .ebd-content {
    font-size: clamp(16px, 2vw, 19px); /* Fluid reading size */
    line-height: 1.8; color: rgba(255,255,255,0.8); font-weight: 300;
  }
  .ebd-content h1, .ebd-content h2, .ebd-content h3 {
    font-family: 'Syne', sans-serif; color: var(--text-main);
    font-weight: 800; margin: 2em 0 1em; letter-spacing: -0.02em; line-height: 1.2;
  }
  .ebd-content h2 { font-size: clamp(24px, 4vw, 36px); }
  .ebd-content h3 { font-size: clamp(20px, 3vw, 28px); }
  .ebd-content p { margin-bottom: 1.6em; }
  
  .ebd-content a {
    color: var(--primary); text-decoration: none; font-weight: 500;
    border-bottom: 1px solid rgba(0,210,180,0.3); transition: all 0.3s;
  }
  .ebd-content a:hover { border-bottom-color: var(--primary); background: rgba(0,210,180,0.1); }
  
  /* Editorial Blockquote */
  .ebd-content blockquote {
    position: relative; margin: 2.5em 0; padding: 24px 32px;
    background: var(--bg-surface); border-radius: 0 16px 16px 0;
    border-left: 4px solid var(--primary);
    font-size: 1.1em; font-style: italic; color: var(--text-main);
    box-shadow: inset 0 0 0 1px var(--glass-border);
  }
  
  /* MacOS Style Code Blocks */
  .ebd-content pre {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 12px; padding: 20px; overflow-x: auto; margin: 2em 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .ebd-content pre::before {
    content: '•••'; position: absolute; color: rgba(255,255,255,0.2);
    font-size: 24px; line-height: 0; margin-top: -10px; letter-spacing: 2px;
  }
  .ebd-content code {
    font-family: 'Fira Code', monospace; font-size: 0.9em;
    background: rgba(255,255,255,0.05); padding: 4px 8px;
    border-radius: 6px; color: #00f0cc; word-break: break-word;
  }
  .ebd-content pre code { background: transparent; padding: 0; color: #e2e8f0; display: block; margin-top: 16px;}
  .ebd-content ul, .ebd-content ol { margin-bottom: 1.6em; padding-left: 24px; }
  .ebd-content li { margin-bottom: 0.5em; }
  .ebd-content img { border-radius: 16px; max-width: 100%; height: auto; margin: 2em 0; border: 1px solid var(--glass-border); }

  /* Skeletons */
  .sk-box { background: rgba(255,255,255,0.03); position: relative; overflow: hidden; border-radius: 8px; }
  .sk-box::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 2s infinite;
  }

  /* States */
  .ebd-state {
    text-align: center; padding: 80px 24px; border-radius: 16px;
    background: var(--glass-bg); border: 1px dashed rgba(239, 68, 68, 0.3);
    max-width: 600px; margin: 0 auto; animation: ebdFadeUp 0.6s var(--easing-premium) forwards;
  }

  /* Mobile Adjustments */
  @media (max-width: 768px) {
    .ebd-wrapper { padding: 80px 16px 80px; }
    .ebd-meta-bar { flex-direction: column; align-items: flex-start; gap: 16px; }
    .ebd-meta-stats { width: 100%; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;}
    .ebd-content blockquote { padding: 20px; }
    .ebd-hero-wrap { transform: none !important; } /* Disable 3D tilt on mobile for better scrolling */
  }
`;

// --- SKELETON LOADER COMPONENT ---
function ArticleSkeleton() {
  return (
    <div className="ebd-container">
      <div className="sk-box" style={{ width: 120, height: 32, borderRadius: 100, marginBottom: 40 }} />
      <div className="sk-box" style={{ width: '100%', height: '40vh', borderRadius: 24, marginBottom: 48 }} />
      <div className="sk-box" style={{ width: '90%', height: 60, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '70%', height: 60, marginBottom: 48 }} />
      
      <div className="sk-box" style={{ width: '100%', height: 80, marginBottom: 48 }} />
      
      <div className="sk-box" style={{ width: '100%', height: 20, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '100%', height: 20, marginBottom: 16 }} />
      <div className="sk-box" style={{ width: '85%', height: 20, marginBottom: 40 }} />
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function BlogPostDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { slug } = useParams();

  // Fetch Post Data
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

  // Live Reading Progress Bar Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  // Dynamic Reading Time Calculator
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text ? text.trim().split(/\s+/).length : 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes > 0 ? minutes : 1;
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="ebd-wrapper">
        <style>{eliteDetailStyles}</style>
        <ArticleSkeleton />
      </div>
    );
  }

  // 2. Error State
  if (error || !post) {
    return (
      <div className="ebd-wrapper">
        <style>{eliteDetailStyles}</style>
        <div className="ebd-state">
          <AlertCircle style={{ color: '#ef4444', margin: '0 auto 16px', width: 48, height: 48 }} />
          <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px', color: '#fca5a5' }}>Article Not Found</h3>
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
      <style>{eliteDetailStyles}</style>
      
      {/* Dynamic Reading Progress Bar */}
      <div className="ebd-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />

      <div className="ebd-wrapper">
        <div className="ebd-container">
          
          <Link to="/blog" className="ebd-back-link">
            <ArrowLeft size={16} /> Back to Publications
          </Link>

          <article>
            {post.featuredImage && (
              <div className="ebd-hero-wrap">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="ebd-hero-img"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
                <div className="ebd-hero-overlay" />
              </div>
            )}
            
            <h1 className="ebd-title">{post.title}</h1>
            
            {/* Meta Information & Branding */}
            <div className="ebd-meta-bar">
              <div className="ebd-author">
                <div className="ebd-brand-mark">D</div>
                <div className="ebd-author-info">
                  <span className="ebd-author-name">Darsh Prajapati</span>
                  <span className="ebd-author-title">MERN Stack Developer</span>
                </div>
              </div>
              
              <div className="ebd-meta-stats">
                <div className="ebd-meta-item">
                  <Calendar size={14} strokeWidth={2.5} />
                  <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                </div>
                <div className="ebd-meta-item">
                  <Clock size={14} strokeWidth={2.5} />
                  <span>{calculateReadingTime(post.content)} Min Read</span>
                </div>
              </div>
            </div>

            {/* Markdown Content Wrapper */}
            <div className="ebd-content">
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
