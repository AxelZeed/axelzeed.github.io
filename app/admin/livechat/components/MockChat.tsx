import React, { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../store';

const INITIAL_MESSAGES = [
  { id: 1, author: 'AXEL ZEED', type: 'owner', message: 'Uplink established. Ready for research.', avatar: '/Assets/Footer-PP.png' },
  { id: 2, author: 'MOD_BOT_01', type: 'moderator', message: 'System integrity nominal. Scanning for anomalies.', avatar: 'https://i.pravatar.cc/150?u=mod' },
];

const RANDOM_PHRASES = [
  "This UI is absolute fire! 🔥",
  "Neural sync at 98.2%",
  "LMAO the skew effect is sick",
  "Can we add more neon?",
  "Zeryuz Corp is taking over",
  "Check out the brand icon!",
  "Is this real life or just CSS?",
  "Wait, am I in a simulation?",
  "The opacity setting is perfect now",
  "Superchat incoming! 💰",
];

const NAMES = ["Cyber_Runner", "Data_Ghost", "Neon_Soul", "Flux_User", "Static_Void", "Zeed_Fan_01", "Glitch_Master", "Binary_Specter"];

const ROLE_PREVIEW_MESSAGES = [
  { id: 'p1', author: 'PUBLIC_USER', type: 'default', message: 'Standard communication protocol.', avatar: 'https://i.pravatar.cc/150?u=p1' },
  { id: 'm1', author: 'MEMBER_ZEED', type: 'member', message: 'Loyal subscriber since the Great Reset.', avatar: 'https://i.pravatar.cc/150?u=m1' },
  { id: 'mo1', author: 'SYSTEM_MOD', type: 'moderator', message: 'Enforcing protocol efficiency.', avatar: 'https://i.pravatar.cc/150?u=mo1' },
  { id: 'o1', author: 'AXEL ZEED', type: 'owner', message: 'Welcome to the mainframe.', avatar: '/Assets/Footer-PP.png' },
  { id: 's1', author: 'BIG_SUPPORT', type: 'superchat', message: 'Take my credits! 5000 ZC!', avatar: 'https://i.pravatar.cc/150?u=s1' },
  { id: 'ss1', author: 'STICKER_FAN', type: 'superchat', message: '✨ [SUPER STICKER]', avatar: 'https://i.pravatar.cc/150?u=ss1' },
];

export const MockChat = () => {
  const state = useChatStore();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state.isLivePreviewEnabled) return;

    const interval = setInterval(() => {
      const typeRand = Math.random();
      const type = typeRand > 0.9 ? 'superchat' : typeRand > 0.7 ? 'member' : typeRand > 0.6 ? 'moderator' : 'default';
      
      const newMessage = {
        id: Date.now(),
        author: NAMES[Math.floor(Math.random() * NAMES.length)],
        type,
        message: RANDOM_PHRASES[Math.floor(Math.random() * RANDOM_PHRASES.length)],
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };
      setMessages(prev => [...prev.slice(-10), newMessage]);
    }, 3000);

    return () => clearInterval(interval);
  }, [state.isLivePreviewEnabled]);

  useEffect(() => {
    if (scrollRef.current && state.isLivePreviewEnabled) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, state.isLivePreviewEnabled]);

  const bgImageUrl = state.customBgImage || `/Assets/livechat_${state.liveChatAssetIndex}.png`;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Live Feed Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-ethnocentric text-neon-cyan opacity-50 uppercase tracking-widest">Live_Feed_Simulation</span>
          {!state.isLivePreviewEnabled && <span className="text-[8px] font-mono text-red-500 animate-pulse">PAUSED</span>}
        </div>
        <div className="w-full h-[400px] bg-[#020a0c] border border-white/10 rounded-lg overflow-hidden relative flex flex-col shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.02)_1px,transparent_1px)] bg-[length:30px_30px] pointer-events-none"></div>

          <style dangerouslySetInnerHTML={{ __html: `
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
            }

            .mock-msg::before {
              content: '';
              position: absolute;
              inset: 0;
              background-color: inherit;
              border-radius: inherit;
              z-index: -1;
            }

            .mock-msg::after {
              content: '';
              position: absolute;
              inset: 0;
              background-image: url('${bgImageUrl}');
              background-size: cover;
              background-position: ${state.bgImagePositionX}% ${state.bgImagePositionY}%;
              opacity: ${state.bgImageOpacity};
              z-index: 0;
              border-radius: inherit;
              transform: skew(${state.bgImageSkewX}deg, ${state.bgImageSkewY}deg);
              pointer-events: none;
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
              position: relative;
              z-index: 10;
            }

            .mock-msg .content {
              transform: skewX(${-state.skewAngle}deg) !important;
              display: flex;
              flex-direction: column;
              flex: 1;
              position: relative;
              z-index: 10;
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
            }

            .mock-msg .brand-icon-layer {
              position: absolute;
              top: -8px;
              right: -8px;
              width: 32px;
              height: 32px;
              background: url('${state.brandIcon}') no-repeat center;
              background-size: contain;
              transform: skewX(${-state.skewAngle}deg);
              z-index: 20;
              display: ${state.brandIcon ? 'block' : 'none'};
              filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
            }

            .mock-msg[data-type="owner"] { background: ${state.ownerBg} !important; }
            .mock-msg[data-type="owner"] .author, .mock-msg[data-type="owner"] .text { color: ${state.ownerText} !important; text-shadow: none !important; }

            .mock-msg[data-type="moderator"] { background: ${state.modBg} !important; }
            .mock-msg[data-type="moderator"] .author, .mock-msg[data-type="moderator"] .text { color: ${state.modText} !important; text-shadow: none !important; }

            .mock-msg[data-type="member"] { background: ${state.memberBg} !important; }
            .mock-msg[data-type="member"] .author, .mock-msg[data-type="member"] .text { color: ${state.memberText} !important; text-shadow: none !important; }

            .mock-msg[data-type="superchat"] { background: ${state.superchatBg} !important; }
            .mock-msg[data-type="superchat"] .author, .mock-msg[data-type="superchat"] .text { color: ${state.superchatText} !important; text-shadow: none !important; }
          ` }} />

          <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {messages.map((msg) => (
              <div key={msg.id} className="mock-msg" data-type={msg.type}>
                {state.brandIcon && <div className="brand-icon-layer" />}
                <img src={msg.avatar} alt={msg.author} className="avatar" />
                <div className="content">
                  <span className="author">{msg.author}</span>
                  <span className="text">{msg.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Catalog Section */}
      <div className="flex flex-col gap-2">
        <div className="px-2">
          <span className="text-[10px] font-ethnocentric text-neon-cyan opacity-50 uppercase tracking-widest">Protocol_Role_Catalog</span>
        </div>
        <div className="w-full bg-black/40 border border-white/10 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLE_PREVIEW_MESSAGES.map((msg) => (
            <div key={msg.id} className="mock-msg" data-type={msg.type}>
              {state.brandIcon && <div className="brand-icon-layer" />}
              <img src={msg.avatar} alt={msg.author} className="avatar" />
              <div className="content">
                <span className="author">{msg.author}</span>
                <span className="text">{msg.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
