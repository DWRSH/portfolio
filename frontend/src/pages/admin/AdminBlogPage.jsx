import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, X } from 'lucide-react';

// Helper to get the auth token
const getAuthToken = () => localStorage.getItem('adminAuthToken');

// --- Blog Post Modal (Add/Edit) ---
const BlogModal = ({ isOpen, onClose, onSave, post }) => {
  const [formData, setFormData] = useState({ title: '', slug: '', content: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const isEditMode = !!post;

  // Auto-generate slug from title (only if slug is not manually changed)
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
      // Reset for Add mode
      setFormData({ title: '', slug: '', content: '' });
      setCurrentImage(null);
      setFile(null);
    }
  }, [isOpen, post, isEditMode]);

  // Handle title change to auto-update slug
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const newSlug = newTitle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // remove invalid chars
    setFormData(prev => ({ ...prev, title: newTitle, slug: newSlug }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCurrentImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode && !file && !currentImage) {
      setError('Please select a featured image.');
      return;
    }
    if (!isEditMode && !file) {
      setError('Please select a featured image for the new post.');
      return;
    }

    setLoading(true);
    setError('');

    const blogFormData = new FormData();
    blogFormData.append('title', formData.title);
    blogFormData.append('slug', formData.slug);
    blogFormData.append('content', formData.content);
    if (file) {
      blogFormData.append('image', file); // 'image' must match server's upload.single('image')
    }

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Authentication token not found.");

      const url = isEditMode ? `/api/blogs/${post._id}` : '/api/blogs';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: blogFormData,
      });

      // --- START ROBUST FIX ---
      if (!res.ok) {
        let errorMsg = `Failed to ${isEditMode ? 'update' : 'add'} post.`;
        try {
          const errorData = await res.json();
          errorMsg = errorData.msg || errorMsg;
        } catch (jsonError) {
          errorMsg = `${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      // --- END ROBUST FIX ---
      
      onSave(data); // Send new/updated post back to parent
      onClose(); // Close modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 animate-fade-in p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-3xl border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{isEditMode ? 'Edit Post' : 'Add New Post'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleTitleChange} required className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Content (Markdown supported)</label>
            <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="10" className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Featured Image</label>
            <input type="file" name="image" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500" />
            {isEditMode && currentImage && !file && (
               <div className="mt-2 text-sm text-slate-400">
                 <p>Current image:</p>
                 <img src={currentImage} alt="Current post" className="w-20 h-12 object-cover rounded-md mt-1" />
                 <p className="mt-1">Select a new file above to replace it.</p>
               </div>
            )}
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-500 disabled:bg-cyan-800 flex items-center gap-2">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? (isEditMode ? 'Saving...' : 'Publishing...') : (isEditMode ? 'Save Changes' : 'Publish Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Delete Confirmation Modal ---
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 animate-fade-in p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Are you sure?</h2>
        <p className="text-slate-300 mb-6">
          Do you really want to delete this blog post? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 disabled:bg-red-800 flex items-center gap-2">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Admin Page Component ---
export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); // For edit/delete
  const [modalLoading, setModalLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/blogs');

      // --- START ROBUST FIX ---
      if (!res.ok) {
        let errorMsg = 'Failed to fetch posts';
        try {
          const errorData = await res.json();
          errorMsg = errorData.msg || errorMsg;
        } catch (jsonError) {
          errorMsg = `${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }
      
      const data = await res.json();
      // --- END ROBUST FIX ---
      
      setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // --- Modal Handlers ---
  const openAddModal = () => {
    setCurrentPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const openDeleteModal = (post) => {
    setCurrentPost(post);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentPost(null);
    setModalLoading(false);
  };

  // --- CRUD Operations ---
  const handleSavePost = (savedPost) => {
    if (currentPost) {
      // Edit mode
      setPosts(posts.map(p => p._id === savedPost._id ? savedPost : p));
    } else {
      // Add mode
      setPosts([savedPost, ...posts]);
    }
  };

  const handleDeletePost = async () => {
    if (!currentPost) return;
    setModalLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token not found.');

      const res = await fetch(`/api/blogs/${currentPost._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // --- START ROBUST FIX ---
      if (!res.ok) {
        let errorMsg = 'Failed to delete post';
        try {
          const errorData = await res.json();
          errorMsg = errorData.msg || errorMsg;
        } catch (jsonError) {
          errorMsg = `${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      // No need to parse JSON on a successful DELETE unless your server sends back the deleted item
      // const data = await res.json(); 
      // --- END ROBUST FIX ---

      // Remove from UI
      setPosts(posts.filter(p => p._id !== currentPost._id));
      closeModal();
    } catch (err) {
      setError(err.message);
      closeModal();
    }
    // No finally needed, closeModal resets loading
  };

  return (
    <div className="animate-fade-in">
      {/* === Responsive Header === */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-white">Manage Blog Posts</h1>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-500 w-full md:w-auto"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      {error && <p className="p-4 mb-4 text-red-400 bg-red-900/20 rounded-md">{error}</p>}

      {/* === Responsive Table Container === */}
      <div className="rounded-lg bg-slate-800 shadow-lg overflow-x-auto">
        {loading ? (
          <p className="p-6 text-slate-400">Loading posts...</p>
        ) : !posts.length ? (
          <div className="p-12 text-center"><p className="text-lg text-slate-400">No blog posts found. Add one to get started!</p></div>
        ) : (
          <table className="w-full text-left min-w-[640px]">
            <thead className="bg-slate-900">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-300">Image</th>
                <th className="p-4 text-sm font-semibold text-slate-300">Title</th>
                {/* Hide on mobile */}
                <th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell">Slug</th>
                <th className="p-4 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {posts.map(post => (
                <tr key={post._id} className="hover:bg-slate-700/50">
                  <td className="p-4">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="w-16 h-10 object-cover rounded-md bg-slate-700" />
                    ) : (
                      <div className="w-16 h-10 rounded-md bg-slate-700 flex items-center justify-center"><ImageIcon size={20} className="text-slate-500" /></div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-white whitespace-nowrap">{post.title}</td>
                  {/* Hide on mobile */}
                  <td className="p-4 text-sm text-slate-400 hidden md:table-cell">/{post.slug}</td>
                  <td className="p-4">
                    {/* Stack buttons on small screens */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <button onClick={() => openEditModal(post)} className="flex items-center gap-1 text-sm text-cyan-400 hover:underline">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => openDeleteModal(post)} className="flex items-center gap-1 text-sm text-red-400 hover:underline">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSavePost}
        post={currentPost}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        onConfirm={handleDeletePost}
        loading={modalLoading}
      />
    </div>
  );
}
