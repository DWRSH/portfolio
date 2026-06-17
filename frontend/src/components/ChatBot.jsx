import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; 

/* ─── ULTRA-PREMIUM CHATBOT STYLES ────────────────────────────────────────── */
const chatStyles = `
  :root {
    --cb-primary: #96c2db; /* Blue-Grey Theme */
    --cb-primary-glow: rgba(150, 194, 219, 0.4);
    --cb-bg: #020305;
    --cb-surf: rgba(11, 15, 24, 0.75); /* Frosted Glass */
    --cb-surf2: rgba(17, 22, 32, 0.85);
    --cb-border: rgba(255, 255, 255, 0.08);
    --cb-text: #ffffff;
    --cb-muted: rgba(255, 255, 255, 0.5);
    --ease-elastic: cubic-bezier(0.19, 1, 0.22, 1);
  }

  .chatbot-fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--cb-primary), #6a95ad);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: none; /* Let custom cursor handle it */
    box-shadow: 0 10px 30px var(--cb-primary-glow), inset 0 2px 5px rgba(255,255,255,0.4);
    z-index: 9999;
    transition: transform 0.4s var(--ease-elastic), box-shadow 0.4s var(--ease-elastic);
  }
  .chatbot-fab:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 15px 40px rgba(150, 194, 219, 0.6), inset 0 2px 5px rgba(255,255,255,0.6);
  }

  .chatbot-window {
    position: fixed;
    bottom: 110px;
    right: 30px;
    width: 380px;
    height: 560px;
    background: var(--cb-surf);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--cb-border);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1);
    z-index: 9998;
    transform-origin: bottom right;
    transition: all 0.5s var(--ease-elastic);
    opacity: 0;
    transform: scale(0.8) translateY(20px) rotateX(10deg);
    pointer-events: none;
    font-family: 'DM Sans', sans-serif;
  }
  .chatbot-window.open {
    opacity: 1;
    transform: scale(1) translateY(0) rotateX(0deg);
    pointer-events: all;
  }

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
    width: 38px;
    height: 38px;
    background: var(--cb-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    color: #000;
    font-size: 18px;
    box-shadow: 0 0 15px var(--cb-primary-glow);
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
    font-weight: 600;
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
    cursor: none;
    transition: all 0.3s;
    padding: 4px;
    border-radius: 50%;
  }
  .cb-close:hover { color: var(--cb-text); background: rgba(255,255,255,0.1); transform: rotate(90deg); }

  .cb-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .cb-messages::-webkit-scrollbar { width: 4px; }
  .cb-messages::-webkit-scrollbar-thumb { background: rgba(150, 194, 219, 0.3); border-radius: 10px; }

  .cb-msg-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    animation: msgFadeIn 0.4s var(--ease-elastic) forwards;
  }
  @keyframes msgFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cb-msg-row.bot { align-items: flex-start; }
  .cb-msg-row.user { align-items: flex-end; }

  .cb-bubble {
    max-width: 85%;
    padding: 14px 18px;
    border-radius: 18px;
    font-size: 13.5px;
    line-height: 1.6;
    word-wrap: break-word;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
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
    font-weight: 600;
  }

  .cb-bubble a {
    color: var(--cb-primary);
    text-decoration: underline;
    font-weight: 700;
  }
  .cb-msg-row.user .cb-bubble a {
    color: #000;
  }

  .cb-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
    animation: msgFadeIn 0.5s var(--ease-elastic) 0.2s both;
  }
  
  .cb-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(150, 194, 219, 0.1);
    border: 1px solid var(--cb-primary);
    color: var(--cb-primary);
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
    cursor: none;
    transition: all 0.3s;
  }
  .cb-action-btn:hover {
    background: var(--cb-primary);
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px var(--cb-primary-glow);
  }

  .cb-input-area {
    padding: 16px 20px;
    background: var(--cb-surf2);
    border-top: 1px solid var(--cb-border);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cb-input {
    flex: 1;
    background: rgba(0,0,0,0.5);
    border: 1px solid var(--cb-border);
    border-radius: 100px;
    padding: 14px 20px;
    color: var(--cb-text);
    font-family: inherit;
    font-size: 13.5px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .cb-input:focus { 
    border-color: var(--cb-primary); 
    box-shadow: 0 0 10px rgba(150, 194, 219, 0.2); 
  }
  .cb-input::placeholder { color: var(--cb-muted); }

  .cb-send-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--cb-primary);
    color: #000;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: none;
    transition: all 0.3s var(--ease-elastic);
  }
  .cb-send-btn:hover { 
    transform: scale(1.1); 
    box-shadow: 0 5px 15px var(--cb-primary-glow);
  }
  .cb-send-btn:active { transform: scale(0.95); }
  .cb-send-btn:disabled { background: var(--cb-border); color: var(--cb-muted); box-shadow: none; transform: none; }

  .typing-dots {
    display: flex;
    gap: 5px;
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
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px var(--cb-primary); }
  }

  @media (max-width: 480px) {
    .chatbot-window {
      width: calc(100% - 32px);
      right: 16px;
      bottom: 100px;
      height: 500px;
    }
    .chatbot-fab { width: 56px; height: 56px; right: 16px; bottom: 20px; }
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
  const typewriterIntervalRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
    };
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const currentInput = input;
    const chatHistorySnapshot = [...messages];
    
    setMessages(prev => [...prev, { sender: 'user', text: currentInput }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.post('/chat', { 
        message: currentInput,
        history: chatHistorySnapshot.map(msg => ({
          sender: msg.sender,
          text: typeof msg.text === 'string' ? msg.text : "User clicked an action."
        }))
      });
      
      const data = response.data;
      setIsTyping(false);

      // Bot ka empty message inject karo jise badme fill karenge
      setMessages(prev => [...prev, { sender: 'bot', text: '', actions: [] }]);
      
      let index = 0;
      let currentHtml = '';
      const fullHtml = data.text || '';
      const speed = 10; // Typing speed in ms
      
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);

      typewriterIntervalRef.current = setInterval(() => {
        if (index < fullHtml.length) {
          // HTML tag start hota hai (<), toh end tag (>) tak pura skip karo ek sath
          if (fullHtml[index] === '<') {
            let tag = '';
            while (index < fullHtml.length && fullHtml[index] !== '>') {
              tag += fullHtml[index];
              index++;
            }
            if (index < fullHtml.length) {
              tag += fullHtml[index]; 
              index++; 
            }
            currentHtml += tag;
          } else {
            currentHtml += fullHtml[index];
            index++;
          }
          
          setMessages(prev => {
            const newMsgs = [...prev];
            if (newMsgs.length > 0) {
              newMsgs[newMsgs.length - 1].text = currentHtml;
            }
            return newMsgs;
          });
        } else {
          // Typing complete! Add buttons
          clearInterval(typewriterIntervalRef.current);
          setMessages(prev => {
            const newMsgs = [...prev];
            if (newMsgs.length > 0) {
              newMsgs[newMsgs.length - 1].actions = data.actions || [];
            }
            return newMsgs;
          });
        }
      }, speed);

    } catch (error) {
      console.error("Chat API failed:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I'm having a little trouble connecting right now, but you can always email Darsh directly at <a href='mailto:contact@darshprajapati.dev'>contact@darshprajapati.dev</a>.",
        actions: [{ label: "Get in Touch", path: "contact" }] 
      }]);
    }
  };

  const handleActionClick = (action) => {
    if (action.path === 'contact') {
      setMessages(prev => [...prev, { sender: 'user', text: "How can I contact Darsh?" }]);
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `You can email him at <a href="mailto:contact@darshprajapati.dev">contact@darshprajapati.dev</a>.`,
          actions: []
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
      {/* 🔥 CSS Injection Fix Applied Here */}
      <style dangerouslySetInnerHTML={{ __html: chatStyles }} />
      
      {/* FAB - Added 'interactable' for Magnetic Cursor */}
      <div className="chatbot-fab interactable" onClick={() => setIsOpen(!isOpen)}>
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
          {/* Close button - interactable */}
          <button className="cb-close interactable" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="cb-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`cb-msg-row ${msg.sender}`}>
              {typeof msg.text === 'string' ? (
                <div 
                  className="cb-bubble" 
                  dangerouslySetInnerHTML={{ __html: msg.text }} 
                />
              ) : (
                <div className="cb-bubble">
                  {msg.text}
                </div>
              )}
              
              {msg.actions && msg.actions.length > 0 && (
                <div className="cb-actions">
                  {msg.actions.map((act, i) => (
                    // Action Buttons - interactable
                    <button 
                      key={i} 
                      className="cb-action-btn interactable"
                      onClick={() => handleActionClick(act)}
                    >
                      {act.label} 
                      {act.path === 'contact' ? <ExternalLink size={12} strokeWidth={2.5}/> : <ArrowRight size={12} strokeWidth={2.5}/>}
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
          {/* Send Button - interactable */}
          <button type="submit" className="cb-send-btn interactable" disabled={!input.trim() || isTyping}>
            <Send size={18} strokeWidth={2.5} style={{marginLeft: '-2px', marginTop: '2px'}}/>
          </button>
        </form>

      </div>
    </>
  );
}
