import React, { useState, useEffect } from 'react';
// 'lucide-react' se icons import karein
import { Github, ExternalLink } from 'lucide-react';
// ❗️ FIX: Hamara custom 'api' (axios) instance import karein
import api from './api'; // (Path check kar lein, 'api.js' ya 'axios.js')

// --- Inlined ProjectCard Component ---
// (Yeh component wahi hai jo aapne diya tha, bilkul sahi hai)
function ProjectCard({ project }) {
  const {
    title = "Project Title",
    description = "No description provided.",
    imageUrl,
    tags = [],
    demoUrl,
    repoUrl
  } = project || {};

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-400/20">
      <img
        src={imageUrl || "https://placehold.co/600x400/1e293b/94a3b8?text=Project"}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1e293b/94a3b8?text=Image+Error"; }}
      />
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-700">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
            	aria-label={`View code for ${title} on Github`}
          	>
          	  <Github size={18} />
          	  <span>Code</span>
          	</a>
          )}
  		  {demoUrl && (
        	<a
        	  href={demoUrl}
        	  target="_blank"
        	  rel="noopener noreferrer"
        	  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
        	  aria-label={`View live demo for ${title}`}
        	>
        	  <ExternalLink size={18} />
      	  <span>Demo</span>
    	  </a>
    	  )}
  		</div>
  	  </div>
  	</div>
  );
}
// --- End of Inlined Component ---


// --- MAIN PAGE COMPONENT (FIXED) ---
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ❗️ FIX: 'fetch' ko 'api.get' se badla gaya
        const response = await api.get('/projects'); // '/api' prefix nahi hai
        
        // ❗️ FIX: Axios data 'response.data' mein deta hai
        setProjects(response.data); 

      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message);
      } finally {
        setLoading(false); 
    	}
  	};

  	fetchProjects();
  }, []); // Empty dependency array, sirf ek baar run hoga

  return (
  	<div className="max-w-6xl mx-auto py-12 px-4">
  	  <h2 className="text-4xl font-bold text-white mb-8">Projects</h2>

  	  {loading && <p className="text-center text-slate-300">Loading projects...</p>}
  	  {error && <p className="text-center text-red-400">{error}</p>}

  	  {!loading && !error && projects.length > 0 && (
  		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  		  {projects.map(project => (
  			<ProjectCard key={project._id} project={project} />
  		  ))}
  		</div>
  	  )}

  	  {!loading && !error && projects.length === 0 && (
  		   <div className="text-center py-20 bg-slate-800 rounded-lg">
  			 <h3 className="text-2xl text-white mb-4">No projects to display</h3>
  			 <p className="text-slate-400">Your backend is connected, but no projects have been created.</p>
  			 <p className="text-slate-400 mt-2">Go to the admin panel to add your projects!</p>
  		   </div>
  	  )}
  	</div>
  );
}
