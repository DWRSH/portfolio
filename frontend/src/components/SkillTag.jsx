import React from 'react';
import { Hash } from 'lucide-react';

const proTagStyles = `
  :root {
    --primary: #00d2b4;
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .skill-tag {
    display: inline-flex; 
    align-items: center; 
    gap: 8px;
    padding: 8px 16px; 
    border-radius: 100px; /* Pill shape for premium feel */
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; 
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: all 0.3s var(--easing);
    cursor: default;
  }

  .skill-tag:hover {
    background: rgba(0, 210, 180, 0.08);
    border-color: rgba(0, 210, 180, 0.35);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 210, 180, 0.12);
  }

  .skill-icon {
    color: var(--primary);
    transition: transform 0.3s var(--easing);
  }

  .skill-tag:hover .skill-icon {
    transform: rotate(15deg) scale(1.1);
  }
`;

export default function SkillTag({ name }) {
  return (
    <>
      <style>{proTagStyles}</style>
      <div className="skill-tag">
        <Hash size={14} className="skill-icon" strokeWidth={2.5} />
        <span>{name}</span>
      </div>
    </>
  );
}
