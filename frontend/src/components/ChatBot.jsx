import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─── CHATBOT STYLES ──────────────────────────────────────────────────────── */
const chatStyles = `
  :root {
    --cb-primary: #00d4b4;
    --cb-bg: #04060a;
    --cb-surf: #0b0f18;
    --cb-surf2: #111620;
    --cb-border: rgba(255, 255, 255, 0.1);
    --cb-text: #ffffff;
    --cb-muted: rgba(255, 255, 255, 0.5);
  }

  /* Floating Action Button */
  .chatbot-fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--cb-primary), #00a38a);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 212, 180, 0.3);
    z-index: 9999;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
  }
  .chatbot-fab:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 212, 180, 0.5);
  }

  /* Chat Window */
  .chatbot-window {
    position: fixed;
    bottom: 110px;
    right: 30px;
    width: 380px;
    height: 560px;
    background: var(--cb-surf);
    border: 1px solid var(--cb-border);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    z-index: 9998;
    transform-origin: bottom right;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    pointer-events: none;
    font-family: 'DM Sans', sans-serif;
  }
  .chatbot-window.open {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: all;
  }

  /* Header */
  .cb-header {
    padding: 16px 20px;
    background: var(--cb-surf2);
    border-bottom: 1px solid var(--cb-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cb-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cb-avatar {
    width: 36px;
    height: 36px;
    background: var(--cb-primary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    color: #000;
    font-size: 18px;
  }
  .cb-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: var(--cb-text);
    margin: 0;
  }
  .cb-status {
    font-size: 11px;
    color: var(--cb-primary);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cb-status-dot {
    width: 6px;
    height: 6px;
    background: var(--cb-primary);
    border-radius: 50%;
    animation: cbPulse 2s infinite;
  }
  @keyframes cbPulse { 0% { opacity: 0.5; } 50% { opacity: 1; box-shadow: 0 0 8px var(--cb-primary); } 100% { opacity: 0.5; } }
  
  .cb-close {
    background: transparent;
    border: none;
    color: var(--cb-muted);
    cursor: pointer;
    transition: color 0.2s;
  }
  .cb-close:hover { color: var(--cb-text); }

  /* Message Area */
  .cb-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .cb-messages::-webkit-scrollbar { width: 4px; }
  .cb-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

  .cb-msg-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
  .cb-msg-row.bot { align-items: flex-start; }
  .cb-msg-row.user { align-items: flex-end; }

  .cb-bubble {
    max-width: 85%;
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .cb-msg-row.bot .cb-bubble {
    background: var(--cb-surf2);
    color: var(--cb-text);
    border: 1px solid var(--cb-border);
    border-bottom-left-radius: 4px;
  }
  .cb-msg-row.user .cb-bubble {
    background: var(--cb-primary);
    color: #000;
    border-bottom-right-radius: 4px;
    font-weight: 500;
  }

  /* Link formatting inside bubble */
  .cb-bubble a {
    color: var(--cb-primary);
    text-decoration: underline;
    font-weight: 600;
  }
  .cb-msg-row.user .cb-bubble a {
    color: #000;
  }

  /* Action Buttons */
  .cb-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }
  .cb-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 212, 180, 0.1);
    border: 1px solid var(--cb-primary);
    color: var(--cb-primary);
    padding: 8px 14px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cb-action-btn:hover {
    background: var(--cb-primary);
    color: #000;
  }

  /* Input Area */
  .cb-input-area {
    padding: 16px;
    background: var(--cb-surf2);
    border-top: 1px solid var(--cb-border);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cb-input {
    flex: 1;
    background: var(--cb-bg);
    border: 1px solid var(--cb-border);
    border-radius: 100px;
    padding: 12px 16px;
    color: var(--cb-text);
    font-family: inherit;
    font-size: 13px;
    outline: none;
    transition: border-color 0.3s;
  }
  .cb-input:focus { border-color: var(--cb-primary); }
  .cb-input::placeholder { color: var(--cb-muted); }

  .cb-send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--cb-primary);
    color: #000;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
  }
  .cb-send-btn:hover { filter: brightness(1.1); }
  .cb-send-btn:active { transform: scale(0.9); }
  .cb-send-btn:disabled { background: var(--cb-muted); cursor: not-allowed; }

  @media (max-width: 480px) {
    .chatbot-window {
      width: calc(100% - 40px);
      right: 20px;
      bottom: 100px;
      height: 480px;
    }
  }
`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate(); // For programmatic routing
  
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hey! I'm Darsh's AI Assistant. I know everything about his MERN stack skills, Cyber Security experience, projects, and academics. How can I help you today?",
      actions: [
        { label: "View Projects", path: "/projects" },
        { label: "Contact Details", path: "contact" }
      ]
    }
  ]);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─── 100% FACTUAL KNOWLEDGE BASE ───
  const getBotResponse = (query) => {
    const text = query.toLowerCase();

    // 1. Projects & Work
    if (text.includes('project') || text.includes('work') || text.includes('build') || text.includes('portfolio')) {
      return {
        text: "Darsh is currently developing 'StockWatcher' (a real-time stock alert system using FastAPI & MongoDB) and establishing his own digital services startup called 'AllVora'. You can check out his complete portfolio here:",
        actions: [{ label: "Go to Projects Page", path: "/projects" }]
      };
    } 
    // 2. Skills & Tech Stack
    else if (text.includes('skill') || text.includes('tech') || text.includes('stack') || text.includes('mern')) {
      return {
        text: "He is a Full Stack Developer specializing in the MERN Stack, Python, and React Native (Expo). He also has strong expertise in Deep Learning architectures and Fintech API integrations.",
        actions: [{ label: "View Developer Profile", path: "/about" }]
      };
    } 
    // 3. Education & Background
    else if (text.includes('education') || text.includes('study') || text.includes('college') || text.includes('degree') || text.includes('university')) {
      return {
        text: "Darsh is currently in his 6th semester pursuing a B.Sc. in Computer Applications and Information Technology (CA & IT) at Ganpat University. He is also preparing for the CUET PG 2026 exam to pursue an M.Sc. in Cyber Security.",
        actions: []
      };
    } 
    // 4. Cyber Security & Experience
    else if (text.includes('cyber') || text.includes('security') || text.includes('hack') || text.includes('experience')) {
      return {
        text: "He is deeply interested in digital forensics and ethical hacking. In January 2026, he successfully completed a Cyber Security job simulation for Deloitte Australia where he analyzed web breach logs.",
        actions: []
      };
    } 
    // 5. Research & AI/Blog
    else if (text.includes('ai') || text.includes('machine learning') || text.includes('cnn') || text.includes('research') || text.includes('paper') || text.includes('blog')) {
      return {
        text: "Darsh is actively involved in AI research! In February 2026, he authored a journal-style paper titled 'Enhanced CNN with Adaptive Feature Selection for Image Classification (AFS-CNN)'. You can read his articles here:",
        actions: [{ label: "Read Blog & Research", path: "/blog" }]
      };
    } 
    // 6. Contact Details
    else if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('talk') || text.includes('reach')) {
      return {
        text: <>You can email him directly at <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>. He usually replies very quickly! You can also check his GitHub at <a href="https://github.com/DWRSH" target="_blank" rel="noreferrer">@DWRSH</a>.</>,
        actions: []
      };
    } 
    // 7. General Greetings
    else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return {
        text: "Hello there! How can I assist you? I can provide quick links to Darsh's projects, explain his M.Sc Cyber Security plans, or give you his direct contact info.",
        actions: [
          { label: "Show Projects", path: "/projects" },
          { label: "Show Contact", path: "contact" }
        ]
      };
    } 
    // Default Fallback
    else {
      return {
        text: "I am specifically trained on Darsh's professional profile. I can tell you about his B.Sc CA & IT studies, his 'StockWatcher' project, his AI research, or how to contact him.",
        actions: [
          { label: "View Projects", path: "/projects" },
          { label: "About Darsh", path: "/about" }
        ]
      };
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    // Simulate thinking delay for bot
    setTimeout(() => {
      const responseObj = getBotResponse(currentInput);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: responseObj.text,
        actions: responseObj.actions 
      }]);
    }, 600);
  };

  // Handle Action Button Clicks
  const handleActionClick = (action) => {
    if (action.path === 'contact') {
      // Direct contact logic
      setMessages(prev => [...prev, { sender: 'user', text: "How can I contact Darsh?" }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: <>You can email him at <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>.</> 
        }]);
      }, 500);
    } else {
      // Use React Router to navigate seamlessly
      navigate(action.path);
      setIsOpen(false); // Optional: close chat when navigating
    }
  };

  return (
    <>
      <style>{chatStyles}</style>
      
      {/* Floating Action Button */}
      <div className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} color="#000" /> : <MessageSquare size={28} color="#000" />}
      </div>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        
        <div className="cb-header">
          <div className="cb-header-left">
            {/* Branding D Icon */}
            <div className="cb-avatar">D</div>
            <div>
              <h3 className="cb-title">Darsh's AI</h3>
              <span className="cb-status"><div className="cb-status-dot"></div> Online</span>
            </div>
          </div>
          <button className="cb-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cb-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`cb-msg-row ${msg.sender}`}>
              <div className="cb-bubble">{msg.text}</div>
              
              {/* Render Action Buttons if available */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="cb-actions">
                  {msg.actions.map((act, i) => (
                    <button 
                      key={i} 
                      className="cb-action-btn"
                      onClick={() => handleActionClick(act)}
                    >
                      {act.label} 
                      {act.path === 'contact' ? <ExternalLink size={12}/> : <ArrowRight size={12}/>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="cb-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="cb-input" 
            placeholder="Ask about projects, education, skills..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="cb-send-btn" disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </form>

      </div>
    </>
  );
}
