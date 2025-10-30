import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-200px)]">
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
        [Darsh's Portfolio]
      </h1>
      <h2 className="text-2xl md:text-3xl font-light text-cyan-300 mb-8">
        MERN Stack Developer | Web Innovator
      </h2>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
        A frontend developer passionate about creating accessible, high-performance websites for modern brands and startups.
      </p>
      <div className="flex gap-4">
        <a
          href="/Darsh_resume.pdf" // Link to your actual CV
          download
          className="bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300"
        >
          Download CV
        </a>
        <Link
          to="/projects"
          className="bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-slate-600 transition-all duration-300"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
}
