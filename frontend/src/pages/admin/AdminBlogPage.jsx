import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, X, AlertCircle } from 'lucide-react';
import api from '../../api/axios'; 

const getAuthToken = () => localStorage.getItem('adminAuthToken');

/* ─── ULTRA-PREMIUM ADMIN BLOG STYLES ───────────────────────────────────── */
const eliteAdminBlogStyles = `
  :root {
    --bg-ultra-dark: #020406;
    --bg-surface: #0a0e14;
    --primary: #00d2b4;
    --accent: #6366f1;
    --danger: #ef4444;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ab-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 100px 24px 120px;
    box-sizing: border-box;
    position: relative;
    color: var(--text-main);
  }

  /* --- Ambient Background --- */
  .ab-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .ab-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%);
    top: -100px; right: -100px; filter: blur(80px);
  }

  .ab-container {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
    width: 100%;
  }

  /* --- Header --- */
  .ab-header {
    display: flex; flex-direction: column; gap: 20px;
    margin-bottom: 48px; opacity: 0; animation: fadeIn 0.8s forwards;
  }
  @media (min-width: 768px) {
    .ab-header { flex-direction: row; justify-content: space-between; align-items: flex-end; }
  }
  .ab-title {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 48px);
    font-weight: 800; letter-spacing: -0.02em; margin: 0 0 8px;
  }
  .ab-subtitle { color: var(--text-muted); font-size: 15px; margin: 0; }

  /* --- Buttons --- */
  .ab-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent); color: #fff; font-weight: 700; font-size: 14px;
    padding: 12px 24px; border-radius: 100px; border: none; cursor: pointer;
    transition: all 0.3s var(--easing-premium); box-shadow: 0 10px 20px rgba(99,102,241,0.15);
  }
  .ab-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(99,102,241,0.3); }
  .ab-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

  .ab-btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent; color: var(--text-main); font-weight: 600; font-size: 14px;
    padding: 12px 24px; border-radius: 100px; border: 1px solid var(--glass-border);
    cursor: pointer; transition: all 0.3s;
  }
  .ab-btn-secondary:hover:not(:disabled) { background: var(--glass-bg); border-color: rgba(255,255,255,0.2); }

  .ab-btn-danger { background: var(--danger); color: #fff; box-shadow: 0 10px 20px rgba(239,68,68,0.15); }
  .ab-btn-danger:hover:not(:disabled) { box-shadow: 0 15px 30px rgba(239,68,68,0.3); }

  /* --- Glass Table (Desktop) --- */
  .ab-table-wrap {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 24px; overflow-x: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    opacity: 0; animation: fadeIn 0.8s 0.2s forwards;
  }
  .ab-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 800px; }
  .ab-th {
    padding: 20px 24px; font-size: 12px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--text-muted); border-bottom: 1px solid var(--glass-border);
    background: rgba(0,0,0,0.2); white-space: nowrap;
  }
  .ab-td {
    padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.03);
    font-size: 14px; color: var(--text-main); transition: background 0.3s;
  }
  .ab-tr:hover .ap-td { background: rgba(255,255,255,0.02); }
  .ab-tr:last-child .ap-td { border-bottom: none; }

  /* Image Thumbnail */
  .ab-thumb {
    width: 64px; height: 40px; border-radius: 6px; object-fit: cover;
    border: 1px solid var(--glass-border); background: #000;
  }
  .ab-thumb-empty {
    width: 64px; height: 40px; border-radius: 6px; background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center; color: var(--text-muted);
  }

  /* Table Actions */
  .ab-action-btn {
    background: none; border: none; padding: 6px 12px; border-radius: 6px;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px; margin-right: 8px;
  }
  .ab-edit-btn { color: var(--accent); }
  .ab-edit-btn:hover { background: rgba(99,102,241,0.1); }
  .ab-del-btn { color: var(--danger); }
  .ab-del-btn:hover { background: rgba(239,68,68,0.1); }

  /* --- Mobile Cards --- */
  .ab-mobile-grid { display: grid; gap: 20px; opacity: 0; animation: fadeIn 0.8s 0.2s forwards; }
  .ab-mobile-card {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
  }
  .ab-mc-img { width: 100%; height: 160px; object-fit: cover; border-bottom: 1px solid var(--glass-border); }
  .ab-mc-body { padding: 20px; }
  .ab-mc-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin: 0 0 4px; word-break: break-word; }
  .ab-mc-tags { font-size: 13px; color: var(--text-muted); margin: 0 0 16px; word-break: break-word; }
  .ab-mc-actions { display: flex; gap: 12px; padding-top: 16px; border-top: 1px solid var(--glass-border); }
  .ab-mc-btn { flex: 1; justify-content: center; }

  /* --- Elite Modals --- */
  .ab-modal-overlay {
    position: fixed; inset: 0; background: rgba(2,4,6,0.85); backdrop-filter: blur(12px);
    z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px;
    opacity: 0; animation: fadeIn 0.3s forwards;
  }
  .ab-modal-box {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 24px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;
    padding: 32px; box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    transform: translateY(20px); animation: slideUp 0.4s var(--easing-premium) forwards;
  }
  
  .ab-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .ab-modal-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; margin: 0; }
  .ab-close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; transition: color 0.2s; }
  .ab-close-btn:hover { color: #fff; }

  /* Forms */
  .ab-form-group { margin-bottom: 20px; }
  .ab-label { display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .ab-input, .ab-textarea {
    width: 100%; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
    padding: 14px 20px; border-radius: 12px; color: #fff; font-family: inherit; font-size: 15px;
    transition: all 0.3s var(--easing-premium); box-sizing: border-box; outline: none;
  }
  .ab-input:focus, .ab-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(99,102,241,0.1); background: rgba(255,255,255,0.05); }
  .ab-textarea { resize: vertical; min-height: 160px; font-family: 'Fira Code', monospace; font-size: 13px; }
  
  /* File Input Styling */
  .ab-file-input::file-selector-button {
    background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
    color: #fff; padding: 8px 16px; border-radius: 8px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; margin-right: 16px;
  }
  .ab-file-input::file-selector-button:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

  .ab-modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--glass-border); }

  @keyframes fadeIn { to { opacity: 1; } }
  @keyframes slideUp { to { transform: translateY(0); opacity: 1; } }
`;

// --- MODALS ---
const BlogModal = ({ isOpen, onClose, onSave, post }) => {
  const [formData, setFormData] = useState({ title: '', slug: '', content: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const isEditMode = !!post;

  useEffect(() => {
    if (isEditMode && post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
      });
      setCurrentImage(post.featuredImage || null);
      setFile(null);
    } else {
      setFormData({ title: '', slug: '', content: '' });
      setCurrentImage(null);
      setFile(null);
    }
  }, [isOpen, post, isEditMode]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const newSlug = newTitle.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, title: newTitle, slug: newSlug }));
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => { setFile(e.target.files[0]); setCurrentImage(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode && !file && !currentImage) { setError('Please select a featured image.'); return; }
    if (!isEditMode && !file) { setError('Please select a featured image for the new post.'); return; }

    setLoading(true); setError('');
    const blogFormData = new FormData();
    blogFormData.append('title', formData.title);
    blogFormData.append('slug', formData.slug);
    blogFormData.append('content', formData.content);
    if (file) blogFormData.append('image', file);

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");
      const url = isEditMode ? `/blogs/${post._id}` : '/blogs';
      const config = { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      
      const res = isEditMode ? await api.put(url, blogFormData, config) : await api.post(url, blogFormData, config);
      if (!res.data) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} post`);
      
      onSave(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ab-modal-overlay">
      <div className="ab-modal-box">
        <div className="ab-modal-header">
          <h2 className="ab-modal-title">{isEditMode ? 'Edit Publication' : 'Draft New Insight'}</h2>
          <button onClick={onClose} className="ab-close-btn"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="ab-form-group">
            <label className="ab-label">Title</label>
            <input name="title" value={formData.title} onChange={handleTitleChange} required className="ab-input" placeholder="e.g. Scaling MERN Architectures" />
          </div>
          
          <div className="ab-form-group">
            <label className="ab-label">URL Slug</label>
            <input name="slug" value={formData.slug} onChange={handleInputChange} required className="ab-input" style={{ color: 'var(--text-muted)' }} />
          </div>
          
          <div className="ab-form-group">
            <label className="ab-label">Markdown Content</label>
            <textarea name="content" value={formData.content} onChange={handleInputChange} required className="ab-textarea" placeholder="# Introduction\nWrite your insights here..." />
          </div>
          
          <div className="ab-form-group">
            <label className="ab-label">Featured Cover</label>
            <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="ab-input ab-file-input" style={{padding: '10px'}} />
            {isEditMode && currentImage && !file && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={currentImage} alt="Current" className="ab-thumb" />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Current cover active.</span>
              </div>
            )}
          </div>
          
          {error && (
            <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', color: '#fca5a5', borderRadius: '8px', fontSize: '14px', marginTop: '10px' }}>
              {error}
            </div>
          )}

          <div className="ab-modal-footer">
            <button type="button" onClick={onClose} disabled={loading} className="ab-btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="ab-btn-primary">
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Processing...' : (isEditMode ? 'Commit Changes' : 'Publish Article')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="ab-modal-overlay">
      <div className="ab-modal-box" style={{ maxWidth: '440px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', borderRadius: '50%' }}>
            <AlertCircle size={28} />
          </div>
          <h2 className="ab-modal-title" style={{ fontSize: '20px' }}>Confirm Deletion</h2>
        </div>
        
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
          Are you absolute sure you want to drop this article from the database? This action is irreversible.
        </p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} disabled={loading} className="ab-btn-secondary" style={{ flex: 1 }}>Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="ab-btn-primary ab-btn-danger" style={{ flex: 1 }}>
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN ADMIN PAGE COMPONENT ---
export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true); setError('');
      const res = await api.get('/blogs');
      setPosts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openAddModal = () => { setCurrentPost(null); setIsModalOpen(true); };
  const openEditModal = (post) => { setCurrentPost(post); setIsModalOpen(true); };
  const openDeleteModal = (post) => { setCurrentPost(post); setIsDeleteModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setIsDeleteModalOpen(false); setCurrentPost(null); setModalLoading(false); };

  const handleSavePost = (savedPost) => {
    if (currentPost) {
      setPosts(posts.map(p => p._id === savedPost._id ? savedPost : p));
    } else {
      setPosts([savedPost, ...posts]);
    }
  };

  const handleDeletePost = async () => {
    if (!currentPost) return;
    setModalLoading(true);
    try {
      const token = getAuthToken();
      await api.delete(`/blogs/${currentPost._id}`, { headers: { 'Authorization': `Bearer ${token}` } });
      setPosts(posts.filter(p => p._id !== currentPost._id));
      closeModal();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete post');
      closeModal();
    }
  };

  return (
    <>
      <style>{eliteAdminBlogStyles}</style>

      <div className="ab-wrapper">
        <div className="ab-ambient"><div className="ab-glow" /></div>

        <div className="ab-container">
          
          <div className="ab-header">
            <div>
              <h1 className="ab-title">Manage Publications</h1>
              <p className="ab-subtitle">System database for technical insights & articles.</p>
            </div>
            <button onClick={openAddModal} className="ab-btn-primary">
              <Plus size={18} strokeWidth={2.5} /> Draft Insight
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '16px 20px', borderRadius: '12px', color: '#fca5a5', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={20} /> {error}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: 'var(--accent)' }} />
              Initializing database connection...
            </div>
          ) : !posts.length ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-surface)', border: '1px dashed var(--glass-border)', borderRadius: '24px' }}>
              <ImageIcon size={48} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px' }}>Archive Empty</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>No articles published yet. Click 'Draft Insight' to start.</p>
            </div>
          ) : (
            isMobile ? (
              /* --- MOBILE CARD VIEW --- */
              <div className="ab-mobile-grid">
                {posts.map(post => (
                  <div key={post._id} className="ab-mobile-card">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="ab-mc-img" />
                    ) : (
                      <div className="ab-mc-img" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'#1e293b' }}><ImageIcon size={32} color="#475569" /></div>
                    )}
                    <div className="ab-mc-body">
                      <h3 className="ab-mc-title">{post.title}</h3>
                      <p className="ab-mc-tags">/{post.slug}</p>
                      
                      <div className="ab-mc-actions">
                        <button onClick={() => openEditModal(post)} className="ab-btn-secondary ab-mc-btn"><Edit size={14}/> Edit</button>
                        <button onClick={() => openDeleteModal(post)} className="ab-btn-secondary ab-mc-btn" style={{ borderColor: 'rgba(239,68,68,0.3)', color: 'var(--danger)' }}><Trash2 size={14}/> Drop</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* --- DESKTOP TABLE VIEW --- */
              <div className="ab-table-wrap">
                <table className="ab-table">
                  <thead>
                    <tr>
                        <th className="ab-th">Cover</th>
                        <th className="ab-th">Article Title</th>
                        <th className="ab-th">URI Slug</th>
                        <th className="ab-th">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => (
                        <tr key={post._id} className="ab-tr">
                          <td className="ab-td" style={{ width: '80px' }}>
                              {post.featuredImage ? (
                                <img src={post.featuredImage} alt="cover" className="ab-thumb" />
                              ) : (
                                <div className="ab-thumb-empty"><ImageIcon size={18} /></div>
                              )}
                          </td>
                          <td className="ab-td" style={{ fontWeight: 700 }}>{post.title}</td>
                          <td className="ab-td" style={{ color: 'var(--text-muted)' }}>/{post.slug}</td>
                          <td className="ab-td">
                              <button onClick={() => openEditModal(post)} className="ab-action-btn ab-edit-btn">
                                  <Edit size={14} /> Edit
                              </button>
                              <button onClick={() => openDeleteModal(post)} className="ab-action-btn ab-del-btn">
                                  <Trash2 size={14} /> Drop
                              </button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

        </div>

        <BlogModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSavePost} post={currentPost} />
        <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={closeModal} onConfirm={handleDeletePost} loading={modalLoading} />
      </div>
    </>
  );
}
