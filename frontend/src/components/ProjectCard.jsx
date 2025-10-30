import React, { useState, useEffect } from 'react';
import api from './axios'; // Import your updated axios instance
import ProjectCard from './ProjectCard'; // Import the card you just shared

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ✅ YAHAN CHECK KAREN: '/api' nahi hona chahiye
        const res = await api.get('/projects'); 
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Yahaan aap apne card component ka use kar rahe hain */}
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
