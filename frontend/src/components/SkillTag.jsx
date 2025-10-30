import React from 'react';
import { Hash } from 'lucide-react';

export default function SkillTag({ name }) {
  return (
    <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg">
      <Hash size={16} className="text-cyan-400" />
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}
