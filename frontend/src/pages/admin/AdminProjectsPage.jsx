import React, { useState, useEffect } from 'react';
import { Plus, Edit, Image as ImageIcon, Github, ExternalLink, Loader2, Trash2, X, AlertCircle } from 'lucide-react';
import api from '../../api/axios'; 

const getAuthToken = () => localStorage.getItem('adminAuthToken');

/* ─── ULTRA-PREMIUM ADMIN PROJECTS STYLES ───────────────────────────────── */
const eliteAdminProjectsStyles = `
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

  .ap-wrapper {
    background-color: var(--bg-ultra-dark);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 100px 24px 120px;
    box-sizing: border-box;
    position: relative;
    color: var(--text-main);
  }

  /* --- Ambient Background --- */
  .ap-ambient { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .ap-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.04) 0%, transparent 60%);
    top: -100px; left: -100px; filter: blur(80px);
  }

  .ap-container {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
    width: 100%;
  }

  /* --- Header --- */
  .ap-header {
    display: flex; flex-direction: column; gap: 20px;
    margin-bottom: 48px; opacity: 0; animation: fadeIn 0.8s forwards;
  }
  @media (min-width: 768px) {
    .ap-header { flex-direction: row; justify-content: space-between; align-items: flex-end; }
  }
  .ap-title {
    font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 48px);
    font-weight: 800; letter-spacing: -0.02em; margin: 0 0 8px;
  }
  .ap-subtitle { color: var(--text-muted); font-size: 15px; margin: 0; }

  /* --- Buttons --- */
  .ap-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--primary); color: #000; font-weight: 700; font-size: 14px;
    padding: 12px 24px; border-radius: 100px; border: none; cursor: pointer;
    transition: all 0.3s var(--easing-premium); box-shadow: 0 10px 20px rgba(0,210,180,0.15);
  }
  .ap-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,210,180,0.3); }
  .ap-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

  .ap-btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent; color: var(--text-main); font-weight: 600; font-size: 14px;
    padding: 12px 24px; border-radius: 100px; border: 1px solid var(--glass-border);
    cursor: pointer; transition: all 0.3s;
  }
  .ap-btn-secondary:hover:not(:disabled) { background: var(--glass-bg); border-color: rgba(255,255,255,0.2); }

  .ap-btn-danger { background: var(--danger); color: #fff; box-shadow: 0 10px 20px rgba(239,68,68,0.15); }
  .ap-btn-danger:hover:not(:disabled) { box-shadow: 0 15px 30px rgba(239,68,68,0.3); }

  /* --- Glass Table (Desktop) --- */
  .ap-table-wrap {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 24px; overflow-x: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    opacity: 0; animation: fadeIn 0.8s 0.2s forwards;
  }
  .ap-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 800px; }
  .ap-th {
    padding: 20px 24px; font-size: 12px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--text-muted); border-bottom: 1px solid var(--glass-border);
    background: rgba(0,0,0,0.2); white-space: nowrap;
  }
  .ap-td {
    padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.03);
    font-size: 14px; color: var(--text-main); transition: background 0.3s;
  }
  .ap-tr:hover .ap-td { background: rgba(255,255,255,0.02); }
  .ap-tr:last-child .ap-td { border-bottom: none; }

  /* Image Thumbnail */
  .ap-thumb {
    width: 80px; height: 48px; border-radius: 8px; object-fit: cover;
    border: 1px solid var(--glass-border); background: #000;
  }
  .ap-thumb-empty {
    width: 80px; height: 48px; border-radius: 8px; background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center; color: var(--text-muted);
  }

  /* Table Actions */
  .ap-action-btn {
    background: none; border: none; padding: 6px 12px; border-radius: 6px;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px; margin-right: 8px;
  }
  .ap-edit-btn { color: var(--primary); }
  .ap-edit-btn:hover { background: rgba(0,210,180,0.1); }
  .ap-del-btn { color: var(--danger); }
  .ap-del-btn:hover { background: rgba(239,68,68,0.1); }

  /* --- Mobile Cards --- */
  .ap-mobile-grid { display: grid; gap: 20px; opacity: 0; animation: fadeIn 0.8s 0.2s forwards; }
  .ap-mobile-card {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
  }
  .ap-mc-img { width: 100%; height: 160px; object-fit: cover; border-bottom: 1px solid var(--glass-border); }
  .ap-mc-body { padding: 20px; }
  .ap-mc-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin: 0 0 8px; }
  .ap-mc-tags { font-size: 13px; color: var(--text-muted); margin: 0 0 16px; }
  .ap-mc-actions { display: flex; gap: 12px; padding-top: 16px; border-top: 1px solid var(--glass-border); }
  .ap-mc-btn { flex: 1; justify-content: center; }

  /* --- Elite Modals --- */
  .ap-modal-overlay {
    position: fixed; inset: 0; background: rgba(2,4,6,0.85); backdrop-filter: blur(12px);
    z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px;
    opacity: 0; animation: fadeIn 0.3s forwards;
  }
  .ap-modal-box {
    background: var(--bg-surface); border: 1px solid var(--glass-border);
    border-radius: 24px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;
    padding: 32px; box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    transform: translateY(20px); animation: slideUp 0.4s var(--easing-premium) forwards;
  }
  
  .ap-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .ap-modal-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; margin: 0; }
  .ap-close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; transition: color 0.2s; }
  .ap-close-btn:hover { color: #fff; }

  /* Forms */
  .ap-form-group { margin-bottom: 20px; }
  .ap-label { display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .ap-input, .ap-textarea {
    width: 100%; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
    padding: 14px 20px; border-radius: 12px; color: #fff; font-family: inherit; font-size: 15px;
    transition: all 0.3s var(--easing-premium); box-sizing: border-box; outline: none;
  }
  .ap-input:focus, .ap-textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(0,210,180,0.1); background: rgba(255,255,255,0.05); }
  .ap-textarea { resize: vertical; min-height: 100px; }
  
  /* File Input Styling */
  .ap-file-input::file-selector-button {
    background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
    color: #fff; padding: 8px 16px; border-radius: 8px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; margin-right: 16px;
  }
  .ap-file-input::file-selector-button:hover { background: var(--primary); color: #000; border-color: var(--primary); }

  .ap-modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--glass-border); }

  @keyframes fadeIn { to { opacity: 1; } }
  @keyframes slideUp { to { transform: translateY(0); opacity: 1; } }

  /* Utilities */
  .ap-link-icon { color: var(--text-muted); transition: color 0.2s; }
  .ap-link-icon:hover { color: var(--primary); }
`;

// --- MODALS ---
const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [formData, setFormData] = useState({ title: '', description: '', technologies: '', demoUrl: '', repoUrl: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const isEditMode = !!project;

  useEffect(() => {
    if (isEditMode && project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: Array.isArray(project.tags) ? project.tags.join(', ') : '',
        demoUrl: project.demoUrl || '',
        repoUrl: project.repoUrl || '',
      });
      setCurrentImage(project.imageUrl || null);
      setFile(null);
    } else {
      setFormData({ title: '', description: '', technologies: '', demoUrl: '', repoUrl: '' });
      setCurrentImage(null);
      setFile(null);
    }
  }, [isOpen, project, isEditMode]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => { setFile(e.target.files[0]); setCurrentImage(null); };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (isEditMode && !file && !currentImage) {
        setError('Please select an image file.'); return;
      }
      if (!isEditMode && !file) {
        setError('Please select an image file for the new project.'); return;
      }

      setLoading(true); setError('');
      const projectFormData = new FormData();
      projectFormData.append('title', formData.title);
      projectFormData.append('description', formData.description);
      const tags = (formData.technologies || '').split(',').map(t => t.trim()).filter(Boolean);
      projectFormData.append('tags', JSON.stringify(tags));
      projectFormData.append('demoUrl', formData.demoUrl || '');
      projectFormData.append('repoUrl', formData.repoUrl || '');
      if (file) projectFormData.append('image', file);

      try {
        const token = getAuthToken();
        if (!token) throw new Error('Authentication token not found.');

        const url = isEditMode ? `/projects/${project._id}` : '/projects';
        const config = { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
        
        const res = isEditMode ? await api.put(url, projectFormData, config) : await api.post(url, projectFormData, config);
        if (!res.data) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} project`);

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
      <div className="ap-modal-overlay">
        <div className="ap-modal-box">
            <div className="ap-modal-header">
              <h2 className="ap-modal-title">{isEditMode ? 'Edit Architecture' : 'Deploy New Project'}</h2>
              <button onClick={onClose} className="ap-close-btn"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="ap-form-group">
                  <label className="ap-label">Project Title</label>
                  <input name="title" value={formData.title} onChange={handleInputChange} required className="ap-input" placeholder="e.g. NextGen E-Commerce" />
              </div>
              <div className="ap-form-group">
                  <label className="ap-label">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} required className="ap-textarea" placeholder="Detail the problem, architecture, and solution..." />
              </div>
              <div className="ap-form-group">
                  <label className="ap-label">Tech Stack (Comma Separated)</label>
                  <input name="technologies" value={formData.technologies} onChange={handleInputChange} className="ap-input" placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="ap-form-group">
                  <label className="ap-label">Project Cover Image</label>
                  <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="ap-input ap-file-input" style={{padding: '10px'}} />
                  {isEditMode && currentImage && !file && (
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={currentImage} alt="Current" className="ap-thumb" />
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Current cover active. Upload new to replace.</span>
                    </div>
                  )}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="ap-form-group">
                    <label className="ap-label">Live Demo URL</label>
                    <input name="demoUrl" value={formData.demoUrl} onChange={handleInputChange} className="ap-input" placeholder="https://..." />
                </div>
                <div className="ap-form-group">
                    <label className="ap-label">GitHub Repo URL</label>
                    <input name="repoUrl" value={formData.repoUrl} onChange={handleInputChange} className="ap-input" placeholder="https://github.com/..." />
                </div>
              </div>

              {error && (
                <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', color: '#fca5a5', borderRadius: '8px', fontSize: '14px', marginTop: '10px' }}>
                  {error}
                </div>
              )}

              <div className="ap-modal-footer">
                  <button type="button" onClick={onClose} disabled={loading} className="ap-btn-secondary">Cancel</button>
                  <button type="submit" disabled={loading} className="ap-btn-primary">
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? 'Processing...' : (isEditMode ? 'Commit Changes' : 'Deploy Project')}
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
      <div className="ap-modal-overlay">
        <div className="ap-modal-box" style={{ maxWidth: '440px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', borderRadius: '50%' }}>
                <AlertCircle size={28} />
              </div>
              <h2 className="ap-modal-title" style={{ fontSize: '20px' }}>Confirm Deletion</h2>
            </div>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
              Are you absolute sure you want to drop this project from the database? This action is irreversible and the data will be lost forever.
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} disabled={loading} className="ap-btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button onClick={onConfirm} disabled={loading} className="ap-btn-primary ap-btn-danger" style={{ flex: 1 }}>
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
        </div>
      </div>
  );
};

// --- MAIN ADMIN PAGE COMPONENT ---
export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Check window width for responsive render
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProjects = async () => {
      try {
        setLoading(true); setError('');
        const res = await api.get('/projects');
        setProjects(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load database. Check connection.');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAddModal = () => { setCurrentProject(null); setIsModalOpen(true); };
  const openEditModal = (project) => { setCurrentProject(project); setIsModalOpen(true); };
  const openDeleteModal = (project) => { setCurrentProject(project); setIsDeleteModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setIsDeleteModalOpen(false); setCurrentProject(null); setModalLoading(false); };

  const handleSaveProject = (savedProject) => {
      if (currentProject) {
        setProjects(projects.map(p => p._id === savedProject._id ? savedProject : p));
      } else {
        setProjects([savedProject, ...projects]);
      }
  };

  const handleDeleteProject = async () => {
      if (!currentProject) return;
      setModalLoading(true);
      try {
        const token = getAuthToken();
        await api.delete(`/projects/${currentProject._id}`, { headers: { 'Authorization': `Bearer ${token}` } });
        setProjects(projects.filter(p => p._id !== currentProject._id));
        closeModal();
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to delete project');
        closeModal();
      }
  };

  return (
      <>
        <style>{eliteAdminProjectsStyles}</style>

        <div className="ap-wrapper">
          <div className="ap-ambient"><div className="ap-glow" /></div>

          <div className="ap-container">
            
            <div className="ap-header">
              <div>
                <h1 className="ap-title">Manage Projects</h1>
                <p className="ap-subtitle">System database for portfolio architectures.</p>
              </div>
              <button onClick={openAddModal} className="ap-btn-primary">
                <Plus size={18} strokeWidth={2.5} /> Deploy New
              </button>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '16px 20px', borderRadius: '12px', color: '#fca5a5', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertCircle size={20} /> {error}
              </div>
            )}

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: 'var(--primary)' }} />
                Initializing database connection...
              </div>
            ) : !projects.length ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-surface)', border: '1px dashed var(--glass-border)', borderRadius: '24px' }}>
                <ImageIcon size={48} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px' }}>Archive Empty</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>No projects deployed yet. Click 'Deploy New' to start.</p>
              </div>
            ) : (
              isMobile ? (
                /* --- MOBILE CARD VIEW --- */
                <div className="ap-mobile-grid">
                  {projects.map(project => (
                    <div key={project._id} className="ap-mobile-card">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} className="ap-mc-img" />
                      ) : (
                        <div className="ap-mc-img" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'#1e293b' }}><ImageIcon size={32} color="#475569" /></div>
                      )}
                      <div className="ap-mc-body">
                        <h3 className="ap-mc-title">{project.title}</h3>
                        <p className="ap-mc-tags">{Array.isArray(project.tags) ? project.tags.join(' • ') : ''}</p>
                        
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="ap-link-icon"><ExternalLink size={18}/></a>}
                          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="ap-link-icon"><Github size={18}/></a>}
                        </div>

                        <div className="ap-mc-actions">
                          <button onClick={() => openEditModal(project)} className="ap-btn-secondary ap-mc-btn"><Edit size={14}/> Edit</button>
                          <button onClick={() => openDeleteModal(project)} className="ap-btn-secondary ap-mc-btn" style={{ borderColor: 'rgba(239,68,68,0.3)', color: 'var(--danger)' }}><Trash2 size={14}/> Drop</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* --- DESKTOP TABLE VIEW --- */
                <div className="ap-table-wrap">
                  <table className="ap-table">
                    <thead>
                      <tr>
                          <th className="ap-th">Cover</th>
                          <th className="ap-th">Project Matrix</th>
                          <th className="ap-th">Tech Stack</th>
                          <th className="ap-th">Live Nodes</th>
                          <th className="ap-th">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(project => (
                          <tr key={project._id} className="ap-tr">
                            <td className="ap-td" style={{ width: '100px' }}>
                                {project.imageUrl ? (
                                  <img src={project.imageUrl} alt="cover" className="ap-thumb" />
                                ) : (
                                  <div className="ap-thumb-empty"><ImageIcon size={20} /></div>
                                )}
                            </td>
                            <td className="ap-td" style={{ fontWeight: 700 }}>{project.title}</td>
                            <td className="ap-td" style={{ color: 'var(--text-muted)' }}>
                                {Array.isArray(project.tags) ? project.tags.join(', ') : ''}
                            </td>
                            <td className="ap-td">
                                <div style={{ display: 'flex', gap: '12px' }}>
                                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="ap-link-icon" title="Live Demo"><ExternalLink size={18} /></a>}
                                  {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="ap-link-icon" title="Source Code"><Github size={18} /></a>}
                                </div>
                            </td>
                            <td className="ap-td">
                                <button onClick={() => openEditModal(project)} className="ap-action-btn ap-edit-btn">
                                    <Edit size={14} /> Edit
                                </button>
                                <button onClick={() => openDeleteModal(project)} className="ap-action-btn ap-del-btn">
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

          <ProjectModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveProject} project={currentProject} />
          <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={closeModal} onConfirm={handleDeleteProject} loading={modalLoading} />
        </div>
      </>
  );
}
