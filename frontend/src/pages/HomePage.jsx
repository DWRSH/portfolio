import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, MapPin, Terminal, Code2, Github, Linkedin, Mail, Sparkles, BookOpen } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

/* Sirf Ambient Glowing Effects ke liye chhota sa custom CSS */
const ambientStyles = `
  .ambient-glow-1 {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,180,0.04) 0%, transparent 60%);
    top: -200px; right: -100px; filter: blur(80px); z-index: 0; pointer-events: none;
  }
  .ambient-noise {
    position: absolute; inset: 0; mix-blend-mode: overlay; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }
  /* Calendar text override for dark theme */
  .react-activity-calendar { color: rgba(255,255,255,0.5) !important; font-family: 'Fira Code', monospace; font-size: 12px; }
`;

export default function HomePage() {
  const eliteCalendarTheme = {
    dark: ['#1e293b', 'rgba(0,210,180,0.3)', 'rgba(0,210,180,0.6)', 'rgba(0,210,180,0.8)', '#00d2b4'],
  };

  return (
    <>
      <style>{ambientStyles}</style>
      
      {/* Main Wrapper */}
      <div className="relative min-h-screen bg-[#020406] text-white overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Background Effects */}
        <div className="ambient-glow-1" />
        <div className="ambient-noise" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12">
          
          {/* --- HERO SECTION --- */}
          <header className="flex flex-col items-start mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Available for Work
            </div>
            
            {/* Exactly what you asked for: Just "DARSH" */}
            <h1 className="text-[clamp(60px,12vw,160px)] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-6">
              DARSH
            </h1>
          </header>

          {/* --- TIGHT BENTO GRID (Tailwind Powered) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            
            {/* WIDGET 1: Bio & Actions (Span 2) */}
            <div className="col-span-1 md:col-span-2 row-span-2 bg-[#0a0e14] border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
                  <Terminal size={18} className="text-teal-400" /> System_Bio
                </div>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-8 max-w-md">
                  I engineer <span className="text-white font-medium">high-performance digital architectures</span>. 
                  Specializing in the MERN Stack and Android ecosystem to build scalable, pixel-perfect solutions from ground up.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-auto">
                <a href="/Darsh_resume.pdf" download className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-teal-400 transition-colors flex items-center gap-2">
                  Download CV <Download size={16} />
                </a>
                <Link to="/projects" className="border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
                  View Work <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* WIDGET 2: Tech Stack */}
            <div className="col-span-1 bg-[#0a0e14] border border-white/5 rounded-3xl p-6 flex flex-col hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
                <Code2 size={18} className="text-teal-400" /> Stack
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['React', 'Node.js', 'MongoDB', 'Express', 'React Native', 'FastAPI', 'Python'].map(tech => (
                  <span key={tech} className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* WIDGET 3: Location */}
            <div className="col-span-1 bg-[#0a0e14] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-end hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 blur-3xl rounded-full" />
              <div className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                <MapPin size={18} className="text-teal-400" /> Base
              </div>
              <div className="relative z-10 mt-12">
                <h3 className="text-3xl font-bold text-white mb-1">Gujarat</h3>
                <p className="text-slate-400 text-sm">India</p>
              </div>
            </div>

            {/* WIDGET 4: GitHub Contributions (Full Width Span 4) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#0a0e14] border border-white/5 rounded-3xl p-6 flex flex-col hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
                <Github size={18} className="text-teal-400" /> Contributions
              </div>
              {/* overflow-x-auto ensures it never breaks mobile screens */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="min-w-[750px] flex justify-center">
                  <GitHubCalendar 
                    username="princep4423d" 
                    colorScheme="dark"
                    theme={eliteCalendarTheme}
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                  />
                </div>
              </div>
            </div>

            {/* WIDGET 5: Currently Building */}
            <div className="col-span-1 md:col-span-2 bg-[#0a0e14] border border-white/5 rounded-3xl p-6 flex flex-col hover:border-teal-500/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-400" />
              <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">
                <Sparkles size={18} className="text-teal-400" /> Currently Building
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">StockWatcher</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A real-time portfolio management & alert system powered by FastAPI and MongoDB.
              </p>
            </div>

            {/* WIDGET 6: Social Links Grid */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
              <a href="https://github.com/princep4423d" target="_blank" rel="noreferrer" className="bg-[#0a0e14] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors group">
                <Github size={28} className="text-slate-300 group-hover:text-black transition-colors" />
                <span className="font-semibold text-sm">GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="bg-[#0a0e14] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#0077b5] transition-colors group">
                <Linkedin size={28} className="text-slate-300 group-hover:text-white transition-colors" />
                <span className="font-semibold text-sm">LinkedIn</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
