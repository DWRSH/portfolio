import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

/* ─── PRO STYLES ──────────────────────────────────────────────────────────── */
const proFooterStyles = `
  :root {
    --bg-dark: #05070a;
    --primary: #00d2b4;
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.55);
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --easing: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ftr-wrapper {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg-dark);
    border-top: 1px solid var(--glass-border);
    overflow: hidden;
    padding-top: 80px;
  }

  /* Ambient Bottom Glow */
  .ftr-glow {
    position: absolute; bottom: -150px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 300px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,210,180,0.05) 0%, transparent 70%);
    filter: blur(60px); pointer-events: none;
  }

  .ftr-container {
    max-width: 1100px; margin: 0 auto;
    padding: 0 24px;
    display: flex; flex-direction: column; gap: 48px;
    position: relative; z-index: 2;
  }

  /* Top Section: Brand & Contact */
  .ftr-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    flex-wrap: wrap; gap: 40px;
  }

  /* Brand Info */
  .ftr-brand-col { max-width: 360px; }
  
  .ftr-brand {
    display: inline-flex; align-items: center; gap: 4px;
    text-decoration: none; margin-bottom: 16px;
  }
  .ftr-brand-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(0,210,180,0.1); border: 1px solid rgba(0,210,180,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
    color: var(--primary);
  }
  .ftr-brand-text {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
    color: var(--text-main); letter-spacing: 0.05em;
  }
  .ftr-tagline {
    font-size: 15px; color: var(--text-muted); line-height: 1.6; font-weight: 300;
  }

  /* Contact & Socials */
  .ftr-contact-col {
    display: flex; flex-direction: column; align-items: flex-start;
  }
  @media (min-width: 768px) {
    .ftr-contact-col { align-items: flex-end; text-align: right; }
  }

  .ftr-subtitle {
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700;
    color: var(--text-main); margin: 0 0 8px;
  }
  .ftr-status {
    font-size: 14px; color: var(--text-muted); margin-bottom: 20px; font-weight: 300;
  }
  
  .ftr-email {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 16px; font-weight: 500; color: var(--primary);
    text-decoration: none; padding: 12px 20px;
    background: rgba(0,210,180,0.05); border: 1px solid rgba(0,210,180,0.2);
    border-radius: 100px; transition: all 0.3s var(--easing);
    margin-bottom: 32px;
  }
  .ftr-email:hover {
    background: rgba(0,210,180,0.1); border-color: rgba(0,210,180,0.4);
    transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,210,180,0.1);
  }

  /* Social Icons */
  .ftr-socials { display: flex; gap: 16px; }
  .ftr-social-link {
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); transition: all 0.3s var(--easing);
  }
  .ftr-social-link:hover {
    background: rgba(255,255,255,0.05); color: var(--primary);
    border-color: rgba(0,210,180,0.3); transform: translateY(-4px);
  }

  /* Bottom Copyright Bar */
  .ftr-bottom {
    border-top: 1px solid var(--glass-border);
    padding: 24px 0; text-align: center;
    display: flex; flex-direction: column; gap: 8px;
  }
  @media (min-width: 768px) {
    .ftr-bottom { flex-direction: row; justify-content: space-between; text-align: left; }
  }
  .ftr-copy { font-size: 13px; color: var(--text-muted); font-weight: 300; letter-spacing: 0.05em; }
`;

export default function Footer() {
  return (
    <>
      <style>{proFooterStyles}</style>
      <footer className="ftr-wrapper">
        <div className="ftr-glow" />
        
        <div className="ftr-container">
          <div className="ftr-top">
            
            {/* Left Col: Branding */}
            <div className="ftr-brand-col">
              <a href="/" className="ftr-brand" aria-label="Home">
                <div className="ftr-brand-icon">D</div>
                <span className="ftr-brand-text">ARSH</span>
              </a>
              <p className="ftr-tagline">
                Crafting high-performance digital products and scalable MERN stack architectures. 
                Always building, always learning.
              </p>
            </div>

            {/* Right Col: Contact & Socials */}
            <div className="ftr-contact-col">
              <h4 className="ftr-subtitle">Let's Connect</h4>
              <p className="ftr-status">Currently open for freelance & full-time roles.</p>
              
              <a href="mailto:darshprajapati1510@gmail.com" className="ftr-email">
                <Mail size={18} />
                darshprajapati1510@gmail.com
              </a>

              <div className="ftr-socials">
                <a href="https://github.com/DWRSH" target="_blank" rel="noopener noreferrer" className="ftr-social-link" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/darshprajapati15" target="_blank" rel="noopener noreferrer" className="ftr-social-link" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                {/* Add your Twitter/X URL in the href below */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="ftr-social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ftr-container" style={{ gap: 0 }}>
          <div className="ftr-bottom">
            <p className="ftr-copy">
              © {new Date().getFullYear()} Darsh Prajapati. All rights reserved.
            </p>
            <p className="ftr-copy">
              Designed & Engineered in India.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
