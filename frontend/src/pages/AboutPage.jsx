import React from 'react';

// Inlined SkillTag component to avoid import path issues
// This was previously in 'src/components/SkillTag.jsx'
function SkillTag({ name }) {
  return (
    <span className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-4 py-2 rounded-lg shadow-md">
      {name}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src="/d2d.png"
            alt="Darsh Prajapati"
            className="rounded-lg shadow-lg w-full"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/1e293b/94a3b8?text=Image+Error"; }}
          />
           {/*  */}
        </div>
        <div className="md:col-span-2 space-y-6 text-slate-300 text-lg">
          <p>
            Hello, welcome to my little corner on the web! I'm a self-taught code solutions programmer. I love programming and I try to use software architecture, clean, and maintainable code.
          </p>
          <p>
            I like to work with technologies from the JavaScript, React, Python and Rust ecosystem.
          </p>
          <p>
            I'm always learning. Here you can find the projects I'm working on and details about my journey and skills.
          </p>
        </div>
      </div>

      <h3 className="text-3xl font-bold text-white mt-16 mb-6">My Skills</h3>
      <div className="flex flex-wrap gap-4">
        <SkillTag name="JavaScript" />
        <SkillTag name="React" />
        <SkillTag name="Node.js" />
        <SkillTag name="Express.js" />
        <SkillTag name="MongoDB" />
        <SkillTag name="Tailwind CSS" />
        <SkillTag name="Git" />
        <SkillTag name="Docker" />
        <SkillTag name="Python" />
        <SkillTag name="SQL" />
        {/* Add more skills as needed */}
      </div>
    </div>
  );
}

