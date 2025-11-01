import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-8 gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold text-white">Get In Touch</h4>
          <p className="text-slate-400">I'm available for freelance & full-time roles.</p>
          <a 
            href="mailto:darshprajapati1510@gmail.com" 
            className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 mt-2"
          >
            <Mail size={18} /> darshprajapati@gmail.com
          </a>
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/DWRSH" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/darshprajapati15?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
        </div>
      </div>
      <div className="bg-black/20 py-4">
        <p className="text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} [DARSH]. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
