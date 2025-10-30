import React, { useState, useEffect } from 'react';
import { Plus, Edit, Image as ImageIcon, Github, ExternalLink, Loader2, Trash2, X } from 'lucide-react';
// ❗️ FIX: Hamara custom 'api' (axios) instance import karein
import api from './api'; // (Path check kar lein, 'api.js' ya 'axios.js')

// Helper to get the auth token
const getAuthToken = () => localStorage.getItem('adminAuthToken');

// --- Project Modal Component (Add/Edit) ---
const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [formData, setFormData] = useState({ title: '', description: '', technologies: '', demoUrl: '', repoUrl: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const isEditMode = !!project; // Check if it's Edit mode

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
    	setFile(null); // Reset file input
    } else {
    	// Reset form for Add mode
    	setFormData({ title: '', description: '', technologies: '', demoUrl: '', repoUrl: '' });
    	setCurrentImage(null);
    	setFile(null);
    }
  }, [isOpen, project, isEditMode]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
  	setFile(e.target.files[0]);
  	setCurrentImage(null); // Clear current image preview if new file is selected
  };

  const handleSubmit = async (e) => {
  	e.preventDefault();
  	if (isEditMode && !file && !currentImage) {
  	  if (!currentImage) {
  		setError('Please select an image file.');
  		return;
  	  }
  	}
  	if (!isEditMode && !file) {
  	  setError('Please select an image file for the new project.');
  	  return;
  	}

  	setLoading(true);
  	setError('');

  	const projectFormData = new FormData();
  	projectFormData.append('title', formData.title);
  	projectFormData.append('description', formData.description);
  	const tags = (formData.technologies || '').split(',').map(t => t.trim()).filter(Boolean);
  	projectFormData.append('tags', JSON.stringify(tags)); // Send as JSON string
  	projectFormData.append('demoUrl', formData.demoUrl || '');
  	projectFormData.append('repoUrl', formData.repoUrl || '');
  	if (file) {
  	  projectFormData.append('image', file);
  	}

  	try {
  	  const token = getAuthToken();
  	  if (!token) throw new Error('Authentication token not found.');

      // ❗️ FIX: URLs updated for axios (no '/api' prefix)
  	  const url = isEditMode ? `/projects/${project._id}` : '/projects';

      // ❗️ FIX: Axios request config with auth header and FormData
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      // ❗️ FIX: Replaced fetch with api.post/api.put
  	  const res = isEditMode
        ? await api.put(url, projectFormData, config)
        : await api.post(url, projectFormData, config);

      // ❗️ FIX: Axios response is in res.data
  	  const responseData = res.data;
  	  if (!responseData) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} project`);

  	  onSave(responseData); // Send updated/new project back to parent
  	  onClose(); // Close modal
  	} catch (err) {
      console.error("Save project error:", err);
  	  setError(err.response?.data?.msg || err.message);
  	} finally {
  	  setLoading(false);
  	}
  };

  if (!isOpen) return null;

  return (
  	<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 animate-fade-in p-4">
  	  <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
  		<div className="flex justify-between items-center mb-6">
  		  <h2 className="text-2xl font-bold text-white">{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
  		  <button onClick={onClose} className="text-slate-400 hover:text-white">
  			<X size={24} />
  		  </button>
  		</div>
  		<form onSubmit={handleSubmit} className="space-y-4">
  		  <div>
  			<label className="block text-sm font-medium text-slate-300">Title</label>
  			<input name="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
  		  </div>
  		  <div>
  			<label className="block text-sm font-medium text-slate-300">Description</label>
  			<textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
  		  </div>
  		  <div>
  			<label className="block text-sm font-medium text-slate-300">Technologies (comma separated)</label>
  			<input name="technologies" value={formData.technologies} onChange={handleInputChange} placeholder="React, Tailwind, Node.js" className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
  		  </div>
  		  <div>
  			<label className="block text-sm font-medium text-slate-300">Project Image</label>
  			<input type="file" name="image" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500" />
  			{isEditMode && currentImage && !file && (
  			  <div className="mt-2 text-sm text-slate-400">
  				<p>Current image:</p>
  				<img src={currentImage} alt="Current project" className="w-20 h-12 object-cover rounded-md mt-1" />
  				<p className="mt-1">Select a new file above to replace it.</p>
  			  </div>
  			)}
  		  </div>
  		  <div>
  			<label className="block text-sm font-medium text-slate-300">Demo URL</label>
  			<input name="demoUrl" value={formData.demoUrl} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
  		  </div>
  		  <div>
  			<label className="block text-sm font-medium text-slate-300">Repository URL</label>
  			<input name="repoUrl" value={formData.repoUrl} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white" />
	  </div>
  		  {error && <p className="text-red-400 text-sm">{error}</p>}
  		  <div className="flex justify-end space-x-4 pt-4">
  			<button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">Cancel</button>
  			<button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-500 disabled:bg-cyan-800 flex items-center gap-2">
  			  {loading && <Loader2 size={16} className="animate-spin" />}
  			  {loading ? (isEditMode ? 'Saving...' : 'Adding...') : (isEditMode ? 'Save Changes' : 'Add Project')}
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
  		  Do you really want to delete this project? This action cannot be undone.
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
export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // For edit/delete
  const [modalLoading, setModalLoading] = useState(false);

  const fetchProjects = async () => {
  	try {
  	  setLoading(true);
  	  setError('');
      // ❗️ FIX: Replaced fetch with api.get, no '/api' prefix
  	  const res = await api.get('/projects');
  	  
      // ❗️ FIX: Axios response is in res.data
      const data = res.data;
  	  if (!Array.isArray(data)) {
  		throw new Error('Invalid response format from server');
  	  }
  	  setProjects(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  	} catch (err) {
      console.error("Fetch projects error:", err);
  	  setError(err.response?.data?.msg || err.message || 'Failed to load projects');
  	} finally {
  	  setLoading(false);
  	}
  };

  useEffect(() => { fetchProjects(); }, []);

  // --- Modal Handlers ---
  const openAddModal = () => {
  	setCurrentProject(null);
  	setIsModalOpen(true);
  };

  const openEditModal = (project) => {
  	setCurrentProject(project);
  	setIsModalOpen(true);
  };

  const openDeleteModal = (project) => {
  	setCurrentProject(project);
  	setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
  	setIsModalOpen(false);
  	setIsDeleteModalOpen(false);
  	setCurrentProject(null);
  	setModalLoading(false);
  };

  // --- CRUD Operations ---
  const handleSaveProject = (savedProject) => {
  	if (currentProject) {
  	  // Edit mode: replace old project with new one
  	  setProjects(projects.map(p => p._id === savedProject._id ? savedProject : p));
  	} else {
  	  // Add mode: add new project to top of list
  	  setProjects([savedProject, ...projects]);
  	}
  };

  const handleDeleteProject = async () => {
  	if (!currentProject) return;
  	setModalLoading(true);
  	try {
  	  const token = getAuthToken();
  	  if (!token) throw new Error('Authentication token not found.');
  	  
      // ❗️ FIX: Axios request config with auth header
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };

      // ❗️ FIX: Replaced fetch with api.delete, no '/api' prefix
  	  const res = await api.delete(`/projects/${currentProject._id}`, config);

      // ❗️ FIX: Axios response is in res.data
  	  const data = res.data;
  	  if (!data) throw new Error('Failed to delete project');

  	  // Remove from UI
  	  setProjects(projects.filter(p => p._id !== currentProject._id));
  	  closeModal();
  	} catch (err) {
      console.error("Delete project error:", err);
  	  setError(err.response?.data?.msg || err.message); // Show error on main page
  	  closeModal(); // Close modal even on error
  	}
  };

  return (
  	<div className="animate-fade-in">
  	  {/* === Responsive Header === */}
  	  <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  		<h1 className="text-4xl font-bold text-white">Manage Projects</h1>
  		<button 
  		  onClick={openAddModal} 
  		  className="flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-500 w-full md:w-auto"
s 	  >
  		  <Plus size={20} />
  		  Add New Project
  		</button>
  	  </div>

  	  {error && <p className="p-4 mb-4 text-red-400 bg-red-900/20 rounded-md">{error}</p>}

  	  {/* === Responsive Table Container === */}
  	  <div className="rounded-lg bg-slate-800 shadow-lg overflow-x-auto">
  		{loading ? (
  		  <p className="p-6 text-slate-400">Loading projects...</p>
  		) : !projects.length ? (
  		  <div className="p-12 text-center"><p className="text-lg text-slate-400">No projects found. Add one to get started!</p></div>
  		) : (
  		  <table className="w-full text-left min-w-[640px]">
  			<thead className="bg-slate-900">
  			  <tr>
  				<th className="p-4 text-sm font-semibold text-slate-300">Image</th>
  				<th className="p-4 text-sm font-semibold text-slate-300">Title</th>
  				{/* Hide on mobile */}
  				<th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell">Technologies</th>
  				{/* Hide on mobile and tablet */}
  				<th className="p-4 text-sm font-semibold text-slate-300 hidden lg:table-cell">Links</th>
  				<th className="p-4 text-sm font-semibold text-slate-300">Actions</th>
  			  </tr>
  			</thead>
  			<tbody className="divide-y divide-slate-700">
  			  {projects.map(project => (
  				<tr key={project._id} className="hover:bg-slate-700/50">
  				  <td className="p-4">
  					{project.imageUrl ? (
  					  <img src={project.imageUrl} alt={project.title} className="w-20 h-12 object-cover rounded-md bg-slate-700" />
  					) : (
  					  <div className="w-20 h-12 rounded-md bg-slate-700 flex items-center justify-center"><ImageIcon size={20} className="text-slate-500" /></div>
  					)}
  				  </td>
  				  <td className="p-4 font-medium text-white whitespace-nowrap">{project.title}</td>
  				  
  				  {/* Hide on mobile */}
  				  <td className="p-4 text-sm text-slate-400 hidden md:table-cell">
  					{Array.isArray(project.tags) ? project.tags.join(', ') : ''}
  				  </td>

  				  {/* Hide on mobile and tablet */}
  				  <td className="p-4 hidden lg:table-cell">
  					<div className="flex space-x-3">
  					  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400"><ExternalLink size={18} /></a>}
  					  {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400"><Github size={18} /></a>}
  					</div>
  				  </td>
  				  
  				  <td className="p-4">
  					{/* Stack buttons on small screens */}
  					<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
  					  <button onClick={() => openEditModal(project)} className="flex items-center gap-1 text-sm text-cyan-400 hover:underline">
  						<Edit size={14} /> Edit
  					  </button>
  					  <button onClick={() => openDeleteModal(project)} className="flex items-center gap-1 text-sm text-red-400 hover:underline">
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

  	  <ProjectModal
  		isOpen={isModalOpen}
  		onClose={closeModal}
  		onSave={handleSaveProject}
  		project={currentProject}
  	  />
  	  <DeleteConfirmModal
  		isOpen={isDeleteModalOpen}
  		onClose={closeModal}
  		onConfirm={handleDeleteProject}
  		loading={modalLoading}
  	  />
  	</div>
  );
}
