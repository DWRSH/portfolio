import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

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
    width: 360px;
    height: 520px;
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
    width: 100%;
  }
  .cb-msg-row.bot { justify-content: flex-start; }
  .cb-msg-row.user { justify-content: flex-end; }

  .cb-bubble {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.5;
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
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hey! I'm Darsh's AI Assistant. You can ask me about his MERN projects, Cyber Security work, or how to get in touch!" 
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pre-fed Knowledge Base / Mock AI Logic
  const getBotResponse = (query) => {
    const text = query.toLowerCase();

    if (text.includes('project') || text.includes('work') || text.includes('build')) {
      return "He is currently building 'StockWatcher' (a real-time trading system using FastAPI & MongoDB) and establishing 'AllVora', a digital services agency. What kind of project do you have in mind?";
    } 
    else if (text.includes('skill') || text.includes('tech') || text.includes('stack')) {
      return "He is a Full Stack Developer specializing in the MERN Stack, Python, and React Native. He also has strong expertise in Cyber Security and Deep Learning.";
    } 
    else if (text.includes('education') || text.includes('study') || text.includes('college') || text.includes('degree')) {
      return "He is pursuing a B.Sc. in Computer Applications and Information Technology (CA & IT) at Ganpat University, currently in his 6th semester.";
    } 
    else if (text.includes('cyber') || text.includes('security') || text.includes('hack')) {
      return "He has a strong focus on ethical hacking and digital forensics. He recently completed a Cyber Security job simulation for Deloitte Australia, analyzing breach logs.";
    } 
    else if (text.includes('ai') || text.includes('machine learning') || text.includes('cnn') || text.includes('research')) {
      return "He authored a research paper titled 'Enhanced CNN with Adaptive Feature Selection for Image Classification (AFS-CNN)', diving deep into neural networks.";
    } 
    else if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('talk')) {
      return "You can email him directly at contact@darshprajapati.dev. He usually replies very quickly!";
    } 
    else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hello there! How can I help you learn more about Darsh's profile?";
    } 
    else {
      return "I'm a localized assistant. I can tell you about his projects, tech stack, university, or how to contact him. Try asking 'What are your skills?'";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate typing delay for bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      <style>{chatStyles}</style>
      
      {/* Floating Action Button */}
      <div className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </div>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        
        <div className="cb-header">
          <div className="cb-header-left">
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
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="cb-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="cb-input" 
            placeholder="Ask about my skills, projects..." 
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
