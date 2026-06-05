import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // 👈 Tumhara axios instance import ho gaya

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

  /* Typing Animation */
  .typing-dots {
    display: flex;
    gap: 4px;
    padding: 4px 0;
  }
  .typing-dot {
    width: 6px;
    height: 6px;
    background: var(--cb-primary);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out both;
  }
  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  @keyframes typing {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }

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
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hey! I'm Darsh's AI Assistant. I can tell you about his projects, skills, or help you get in touch. How can I help?",
      actions: [
        { label: "View Projects", path: "/projects" },
        { label: "Contact Details", path: "contact" }
      ]
    }
  ]);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const currentInput = input;
    
    // 1. Add User Message
    setMessages(prev => [...prev, { sender: 'user', text: currentInput }]);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Call the Real Backend AI Route
      const response = await api.post('/chat', { message: currentInput });
      const data = response.data;

      // 3. Add AI Response
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: data.text,
        actions: data.actions 
      }]);
    } catch (error) {
      console.error("Chat API failed:", error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I'm having a little trouble connecting right now, but you can always email Darsh directly at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>.",
        actions: [{ label: "Get in Touch", path: "contact" }] 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.path === 'contact') {
      setMessages(prev => [...prev, { sender: 'user', text: "How can I contact Darsh?" }]);
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: <>You can email him at <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>.</> 
        }]);
        setIsTyping(false);
      }, 500);
    } else {
      navigate(action.path);
      setIsOpen(false); 
    }
  };

  return (
    <>
      <style>{chatStyles}</style>
      
      <div className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} color="#000" /> : <MessageSquare size={28} color="#000" />}
      </div>

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
              <div 
                className="cb-bubble" 
                dangerouslySetInnerHTML={typeof msg.text === 'string' ? { __html: msg.text } : undefined}
              >
                {typeof msg.text !== 'string' && msg.text}
              </div>
              
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
          
          {isTyping && (
            <div className="cb-msg-row bot">
              <div className="cb-bubble">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="cb-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="cb-input" 
            placeholder="Ask me anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="cb-send-btn" disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>

      </div>
    </>
  );
}
