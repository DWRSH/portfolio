import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

// This is the single, corrected component.
export default function ProjectCard({ project }) {
  // Set default values and destructure the correct 'tags' prop
  const {
    title = "Project Title",
    description = "No description provided.",
    imageUrl,
    tags = [], // <-- The fix is here. We read 'tags' from the prop.
    demoUrl,
    repoUrl
  } = project || {};

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-400/20">
      <img
        src={imageUrl || "https://placehold.co/600x400/1e293b/94a3b8?text=Project"}
        alt={title}
        className="w-full h-48 object-cover"
        // Fallback for broken image links
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1e293b/94a3b8?text=Image+Error"; }}
      />
      
      {/* Set a fixed height for the content area to align cards */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]"> {/* 12rem = h-48 */}
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        
        {/* 'flex-grow' pushes the tags and links to the bottom */}
        <p className="text-slate-400 mb-4 flex-grow">{description}</p>

        {/* Map over 'tags' (which we correctly destructured) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* 'mt-auto' ensures this div is at the bottom of the flex container */}
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