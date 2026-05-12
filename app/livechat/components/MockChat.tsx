"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../store';
import { generateCSS } from '../utils';
import { Play, Pause, Settings2, CheckCircle2, Circle } from 'lucide-react';

const AVATARS = ['/Assets/livechat_1.png','/Assets/livechat_2.png','/Assets/livechat_3.png','/Assets/livechat_4.png','/Assets/livechat_5.png','/Assets/livechat_6.png'];
const NAMES = ["Cyber_Runner","Data_Ghost","Neon_Soul","Flux_User","Static_Void","Zero_One"];
const PHRASES = [
  "This UI is absolute fire! 🔥","Neural sync at 98.2%. Bandwidth stable for the next jump.",
  "LMAO the skew effect is sick. Totally fits the mainframe aesthetic.",
  "Can we add more neon? I feel like we can always use more glow around the edges.",
  "Zeryuz Corp is taking over. Resistance is futile when the CSS is this optimized.",
  "Check out the brand icon! It's so clean.","Is this real life or just CSS? Can't tell anymore.",
  "PROTOCOL_SHAPE_CATALOG: LOADING...","The mainframe is breathing. Can you hear the fans?",
  "This is a longer message intended to test wrapping logic and ensure readability even with long text."
];

const CATALOG = [
  {author:'AXEL_ZEED',type:'owner',message:'Mainframe Administrator. Priority Level 0. Access Granted.',avatar:AVATARS[0]},
  {author:'MOD_BOT_9000',type:'moderator',message:'System Moderator. Neutralizing unauthorized packets.',avatar:AVATARS[1]},
  {author:'LOYAL_MEMBER',type:'member',message:'24 month member. Glory to Zeryuz Corp.',avatar:AVATARS[2]},
  {author:'ELITE_DONOR',type:'superchat',message:'MASSIVE DONATION DETECTED. Systems at peak.',avatar:AVATARS[4]},
  {author:'GIFTED_ONE',type:'supersticker',message:'SUPER STICKER DEPLOYED! WOW!',avatar:AVATARS[3]},
  {author:'CITIZEN_USER',type:'default',message:'Regular user message. Simple and clean.',avatar:AVATARS[5]},
];

interface Msg { id: number; author: string; type: string; message: string; avatar: string; }

/* Build a single message's HTML using YouTube's real DOM structure */
function msgToHTML(msg: { author: string; type: string; message: string; avatar: string }) {
  const isPaid = msg.type === 'superchat';
  const isSticker = msg.type === 'supersticker';
  
  // Use specific tags for special messages
  const tag = isPaid ? 'yt-live-chat-paid-message-renderer' : 
              isSticker ? 'yt-live-chat-paid-sticker-renderer' : 
              'yt-live-chat-text-message-renderer';
              
  const at = (msg.type !== 'default' && !isPaid && !isSticker) ? ` author-type="${msg.type}"` : '';
  const badge = msg.type === 'owner' ? '👑' : msg.type === 'moderator' ? '🔧' : msg.type === 'member' ? '⭐' : '';
  const badgeHTML = badge ? `<yt-live-chat-author-badge-renderer type="${msg.type}">${badge}</yt-live-chat-author-badge-renderer>` : '';
  
  if (isPaid) {
    return `<yt-live-chat-paid-message-renderer>
      <div id="card">
        <div id="header">
          <yt-img-shadow id="author-photo" class="yt-live-chat-paid-message-renderer" style="background: linear-gradient(45deg, #333, #666);">
            <img id="img" src="${msg.avatar}" alt="" class="yt-live-chat-paid-message-renderer" onerror="this.style.display='none'">
          </yt-img-shadow>
          <div id="header-content">
            <span id="author-name">${msg.author}</span>
            <div id="purchase-amount">IDR 100,000</div>
          </div>
        </div>
        <div id="content">
          <span id="message"><span>${msg.message}</span></span>
        </div>
      </div>
    </yt-live-chat-paid-message-renderer>`;
  }

  if (isSticker) {
    return `<yt-live-chat-paid-sticker-renderer>
      <div id="card">
        <yt-img-shadow id="author-photo" class="yt-live-chat-paid-sticker-renderer" style="background: linear-gradient(45deg, #333, #666);">
          <img id="img" src="${msg.avatar}" alt="" class="yt-live-chat-paid-sticker-renderer" onerror="this.style.display='none'">
        </yt-img-shadow>
        <span id="author-name">${msg.author}</span>
        <div id="sticker-container"><img src="https://www.gstatic.com/youtube/img/emojis/emojis-svg-2.svg" width="40" height="40" /></div>
      </div>
    </yt-live-chat-paid-sticker-renderer>`;
  }

  return `<yt-live-chat-text-message-renderer${at}>
    <yt-img-shadow id="author-photo" class="yt-live-chat-text-message-renderer" style="background: linear-gradient(45deg, #333, #666);">
      <img id="img" src="${msg.avatar}" alt="" class="yt-live-chat-text-message-renderer" onerror="this.style.display='none'">
    </yt-img-shadow>
    <div id="content">
      <yt-live-chat-author-chip>
        ${badgeHTML}
        <span id="author-name" type="${msg.type}">${msg.author}</span>
      </yt-live-chat-author-chip>
      <span id="timestamp">12:00</span>
      <span id="message"><span>${msg.message}</span></span>
    </div>
  </yt-live-chat-text-message-renderer>`;
}

/* Build the full iframe HTML document */
function buildIframeDoc(cssText: string, messagesHTML: string) {
  // Extract @import lines to ensure they are at the very top of the style tag
  const fontImports = cssText.match(/@import[^;]+;/g)?.join('\n') || '';
  const cleanCSS = cssText.replace(/@import[^;]+;/g, '');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
${fontImports}

/* === YT element base defaults === */
body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
yt-live-chat-text-message-renderer {
  display: flex; align-items: flex-start; position: relative;
  padding: 8px 16px; overflow: visible; contain: none;
  font-size: 13px; color: #fff;
}
yt-live-chat-text-message-renderer #content {
  overflow: initial; display: inline; flex: 1; min-width: 0; position: relative;
}
yt-live-chat-author-chip { display: inline; }
yt-img-shadow { 
  display: inline-block; vertical-align: top; flex-shrink: 0; margin-right: 8px; 
  border-radius: 50%; overflow: hidden; width: 24px; height: 24px;
  background: #444; /* Fallback color */
}
yt-img-shadow img { width: 100%; height: 100%; object-fit: cover; }
yt-live-chat-author-badge-renderer { display: inline-block; vertical-align: middle; margin-right: 4px; font-size: 14px; }
#author-name { font-weight: 700; font-size: 13px; margin-right: 8px; color: #aaa; }
#timestamp { font-size: 11px; color: #888; margin-right: 8px; display: none; }
#message { font-size: 13px; word-break: break-word; }
yt-live-chat-item-list-renderer, #items, #item-scroller { display: block; }
yt-live-chat-renderer { display: block; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

/* === USER GENERATED CSS === */
${cleanCSS}
</style>
</head>
<body>
<yt-live-chat-renderer>
<yt-live-chat-item-list-renderer>
<div id="item-scroller">
<div id="items">
${messagesHTML}
</div>
</div>
</yt-live-chat-item-list-renderer>
</yt-live-chat-renderer>
<script>
// Auto-scroll to bottom
const items = document.getElementById('items');
if (items) {
  const observer = new MutationObserver(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  observer.observe(items, { childList: true });
  window.scrollTo(0, document.body.scrollHeight);
}
</script>
</body></html>`;
}

export const MockChat = () => {
  const state = useChatStore();
  const [tab, setTab] = useState<'live' | 'catalog'>('live');
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, author: 'Axel Zeed', type: 'owner', message: 'Uplink established. System protocols initialized.', avatar: AVATARS[0] },
    { id: 2, author: 'Moderator_AI', type: 'moderator', message: 'All sectors clear. Proceed with research data.', avatar: AVATARS[1] },
  ]);
  const [showCtrl, setShowCtrl] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const cssText = generateCSS(state);

  // Live simulation engine
  useEffect(() => {
    if (tab !== 'live' || state.isSimPaused) return;
    const iv = setInterval(() => {
      const enabled = Object.entries(state.simEnabledRoles).filter(([_, v]) => v).map(([k]) => k);
      if (!enabled.length) return;
      const weighted: string[] = [];
      enabled.forEach(r => { for (let i = 0; i < (state.simRoleFrequencies[r] || 1); i++) weighted.push(r); });
      const role = weighted[Math.floor(Math.random() * weighted.length)];
      setMessages(prev => {
        const next = [...prev, {
          id: Date.now(),
          author: role === 'owner' ? 'Axel Zeed' : role === 'moderator' ? 'Mod_Bot' : NAMES[Math.floor(Math.random() * NAMES.length)],
          type: role,
          message: PHRASES[Math.floor(Math.random() * PHRASES.length)],
          avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
        }];
        return next.length > 12 ? next.slice(-12) : next;
      });
    }, state.simSpeed);
    return () => clearInterval(iv);
  }, [tab, state.isSimPaused, state.simSpeed, state.simEnabledRoles, state.simRoleFrequencies]);

  // Write content into iframe whenever state or messages change
  const updateIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const html = tab === 'live'
      ? messages.map(m => msgToHTML(m)).join('\n')
      : CATALOG.map(m => msgToHTML(m)).join('\n');

    const doc = buildIframeDoc(cssText, html);

    // Use srcdoc-like approach via blob URL to avoid cross-origin issues
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Only update if content actually changed
    if (iframe.dataset.lastUrl) {
      URL.revokeObjectURL(iframe.dataset.lastUrl);
    }
    iframe.dataset.lastUrl = url;
    iframe.src = url;
  }, [tab, messages, cssText]);

  useEffect(() => {
    updateIframe();
  }, [updateIframe]);

  return (
    <div className="w-full bg-[#020a0c] border border-white/10 rounded-lg overflow-hidden flex flex-col h-[650px] shadow-2xl relative">
      {/* Tabs */}
      <div className="flex border-b border-white/5 bg-[#041215] relative z-20">
        {([['live', 'LIVE_SIMULATION'], ['catalog', 'ROLE_CATALOG']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex-1 p-4 text-[10px] font-ethnocentric tracking-widest transition-all ${tab === id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-gray-500 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Sim controls overlay (only on live tab) */}
      {tab === 'live' && (
        <div className="absolute top-16 right-4 z-30 flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button onClick={() => state.setField('isSimPaused', !state.isSimPaused)}
              className={`p-3 rounded-full border transition-all ${state.isSimPaused ? 'border-emerald-400 text-emerald-400 bg-emerald-400/10' : 'border-rose-500 text-rose-500 bg-rose-500/10'}`}>
              {state.isSimPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            <button onClick={() => setShowCtrl(!showCtrl)}
              className={`p-3 rounded-full border border-white/20 bg-black/50 text-white transition-all ${showCtrl ? 'bg-neon-cyan text-black border-neon-cyan' : 'hover:border-neon-cyan'}`}>
              <Settings2 size={18} />
            </button>
          </div>
          {showCtrl && (
            <div className="w-80 bg-[#05161a] border border-neon-cyan/20 p-5 rounded-lg shadow-2xl space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-ethnocentric text-gray-500 uppercase tracking-widest">INTERVAL</span>
                </div>
                <input type="range" min="500" max="10000" step="500" value={state.simSpeed}
                  onChange={e => state.setField('simSpeed', parseInt(e.target.value))} className="w-full accent-neon-cyan h-1.5" />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[9px] font-mono text-neon-cyan font-bold">FAST</span>
                  <span className="text-[9px] font-mono text-neon-cyan font-bold">SLOW</span>
                </div>
              </div>
              <div className="space-y-2.5">
                <p className="text-[10px] font-ethnocentric text-gray-500 uppercase tracking-widest">ROLES & WEIGHTS</p>
                <div className="space-y-2">
                {Object.keys(state.simEnabledRoles).map(r => (
                  <div key={r} className="flex items-center gap-3 bg-white/5 p-2 rounded border border-white/5">
                    <button onClick={() => state.setSimRole(r, !state.simEnabledRoles[r])}>
                      {state.simEnabledRoles[r] ? <CheckCircle2 size={16} className="text-neon-cyan" /> : <Circle size={16} className="text-gray-600" />}
                    </button>
                    <span className="text-xs font-mono flex-1 uppercase text-white/90">{r}</span>
                    <div className="flex gap-1">
                      <button onClick={() => state.setSimFreq(r, 1)} className={`px-2 py-1 text-[9px] font-bold rounded ${state.simRoleFrequencies[r] === 1 ? 'bg-gray-500 text-white' : 'bg-black text-gray-500'}`}>LOW</button>
                      <button onClick={() => state.setSimFreq(r, 3)} className={`px-2 py-1 text-[9px] font-bold rounded ${state.simRoleFrequencies[r] === 3 ? 'bg-blue-500 text-white' : 'bg-black text-gray-500'}`}>MED</button>
                      <button onClick={() => state.setSimFreq(r, 6)} className={`px-2 py-1 text-[9px] font-bold rounded ${state.simRoleFrequencies[r] === 6 ? 'bg-neon-cyan text-black' : 'bg-black text-gray-500'}`}>HIGH</button>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Isolated iframe preview — CSS cannot leak */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none z-0"></div>
        <iframe
          key={tab}
          ref={iframeRef}
          className="w-full h-full border-0 relative z-10"
          sandbox="allow-same-origin"
          title="Chat Preview"
        />
      </div>
    </div>
  );
};
