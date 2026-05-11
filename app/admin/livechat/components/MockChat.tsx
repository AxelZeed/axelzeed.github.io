import React, { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../store';

const INITIAL_MESSAGES = [
  { id: 1, author: 'Axel Zeed', type: 'owner', message: 'Uplink established. Ready for research.', avatar: '/Assets/Footer-PP.png' },
  { id: 2, author: 'Moderator_AI', type: 'moderator', message: 'System integrity nominal. Scanning for anomalies.', avatar: 'https://i.pravatar.cc/150?u=mod' },
];

const RANDOM_PHRASES = [
  "This UI is absolute fire! 🔥",
  "Neural sync at 98.2%",
  "LMAO the skew effect is sick",
  "Can we add more neon?",
  "Zeryuz Corp is taking over",
  "Check out the brand icon!",
  "Is this real life or just CSS?",
];

const NAMES = ["Cyber_Runner", "Data_Ghost", "Neon_Soul", "Flux_User", "Static_Void"];

export const MockChat = () => {
  const state = useChatStore();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        author: NAMES[Math.floor(Math.random() * NAMES.length)],
        type: Math.random() > 0.8 ? 'member' : 'default',
        message: RANDOM_PHRASES[Math.floor(Math.random() * RANDOM_PHRASES.length)],
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };
      setMessages(prev => [...prev.slice(-15), newMessage]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-[500px] bg-[#020a0c] border border-white/10 rounded-lg overflow-hidden relative flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mock-chat-list {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .mock-msg {
          background: ${state.bgColor} !important;
          margin-bottom: ${state.messageSpacing}px !important;
          padding: 10px 16px !important;
          border-radius: ${state.bubbleRadius}px !important;
          transform: skewX(${state.skewAngle}deg) !important;
          display: flex !important;
          align-items: center !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
          ${state.neonGlow ? `box-shadow: 0 0 15px ${state.bgColor}, inset 0 0 10px rgba(255,255,255,0.1) !important;` : ''}
          position: relative;
          z-index: 1;
          animation: message-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes message-pop {
          from { opacity: 0; transform: skewX(${state.skewAngle}deg) scale(0.9) translateY(20px); }
          to { opacity: 1; transform: skewX(${state.skewAngle}deg) scale(1) translateY(0); }
        }

        .mock-msg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: ${state.customBgImage ? `url(${state.customBgImage})` : 'none'};
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          z-index: -1;
          border-radius: ${state.bubbleRadius}px;
        }

        .mock-msg .avatar {
          display: ${state.showAvatar ? 'block' : 'none'} !important;
          width: ${state.avatarSize}px !important;
          height: ${state.avatarSize}px !important;
          border-radius: 50% !important;
          margin-right: 12px !important;
          transform: skewX(${-state.skewAngle}deg) !important;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.1);
        }

        .mock-msg .content {
          transform: skewX(${-state.skewAngle}deg) !important;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mock-msg .author {
          color: ${state.textColor} !important;
          font-family: '${state.fontFamily}', sans-serif !important;
          font-size: ${state.fontSizeName}px !important;
          font-weight: 900 !important;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
          ${state.neonGlow ? `text-shadow: 0 0 8px ${state.textColor} !important;` : ''}
        }

        .mock-msg .text {
          color: ${state.textColor} !important;
          font-family: '${state.fontFamily}', sans-serif !important;
          font-size: ${state.fontSizeMessage}px !important;
          line-height: ${state.lineHeight} !important;
          opacity: 0.9;
        }

        /* Brand Icon Overlay */
        .mock-msg .brand-icon {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 4px;
          padding: 2px;
          transform: skewX(${-state.skewAngle}deg);
          box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
          display: ${state.brandIcon ? 'block' : 'none'};
        }

        /* Role Colors */
        .mock-msg[data-type="owner"] { background: ${state.ownerBg} !important; border-color: rgba(255,255,255,0.2); }
        .mock-msg[data-type="owner"] .author, .mock-msg[data-type="owner"] .text { 
          color: ${state.ownerText} !important; text-shadow: none !important; 
        }

        .mock-msg[data-type="moderator"] { background: ${state.modBg} !important; }
        .mock-msg[data-type="moderator"] .author, .mock-msg[data-type="moderator"] .text { 
          color: ${state.modText} !important; text-shadow: none !important; 
        }

        .mock-msg[data-type="member"] { background: ${state.memberBg} !important; }
        .mock-msg[data-type="member"] .author, .mock-msg[data-type="member"] .text { 
          color: ${state.memberText} !important; text-shadow: none !important; 
        }
      ` }} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar mock-chat-list">
        {messages.map((msg) => (
          <div key={msg.id} className="mock-msg" data-type={msg.type}>
            {state.brandIcon && <img src={state.brandIcon} className="brand-icon" alt="brand" />}
            <img src={msg.avatar} alt={msg.author} className="avatar" />
            <div className="content">
              <span className="author">{msg.author}</span>
              <span className="text">{msg.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
