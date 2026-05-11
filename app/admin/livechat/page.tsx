"use client";

import React, { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { MockChat } from './components/MockChat';
import { useChatStore } from './store';
import { generateCSS } from './utils';
import { Copy, Check, Download, ExternalLink, Code } from 'lucide-react';

export default function LiveChatGenerator() {
  const state = useChatStore();
  const [copied, setCopied] = useState(false);
  
  const cssOutput = generateCSS(state);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header Info */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-4xl font-ethnocentric tracking-tighter text-white mb-2">
            LIVE_CHAT_MODDER
          </h1>
          <p className="text-xs font-mono text-neon-cyan tracking-widest uppercase opacity-70">
            Advanced CSS Injection for OBS / Social Stream Ninja
          </p>
        </div>
        <div className="hidden md:flex gap-4">
           <div className="text-right">
             <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Target_Platform</p>
             <p className="text-[10px] text-white font-mono uppercase">YouTube_Live_Chat</p>
           </div>
           <div className="w-[1px] h-8 bg-white/10"></div>
           <div className="text-right">
             <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Build_Version</p>
             <p className="text-[10px] text-neon-green font-mono uppercase">v2.0.4-STABLE</p>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Controls */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0 h-full overflow-hidden border border-white/5 shadow-2xl rounded-lg">
          <ControlPanel />
        </div>

        {/* Preview & Export */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          {/* Live Preview */}
          <div className="flex-1 bg-black/40 border border-white/5 rounded-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03),transparent_70%)] pointer-events-none"></div>
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
               <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
               <span className="text-[8px] font-ethnocentric text-gray-500 tracking-widest">LIVE_RENDER_VIEWPORT</span>
            </div>
            
            <div className="h-full overflow-y-auto custom-scrollbar p-10">
              <div className="max-w-md mx-auto">
                <MockChat />
              </div>
            </div>

            {/* Background Hint */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
               <Code size={120} className="text-white/5" />
            </div>
          </div>

          {/* Export Panel */}
          <div className="h-64 bg-[#05161a] border border-neon-cyan/20 rounded-lg flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-neon-cyan/10 bg-[#041215] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Code size={16} className="text-neon-cyan" />
                <span className="text-[10px] font-ethnocentric tracking-widest">COMPILED_CSS_OUTPUT</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] font-ethnocentric transition-all ${
                    copied ? 'bg-neon-green text-black' : 'bg-neon-cyan text-black hover:scale-105'
                  }`}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'COPIED_TO_UPLINK' : 'COPY_TO_CLIPBOARD'}
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 bg-black/60 relative group">
              <textarea 
                readOnly
                value={cssOutput}
                className="w-full h-full bg-transparent font-mono text-[10px] text-neon-cyan/80 resize-none outline-none custom-scrollbar leading-relaxed"
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-[8px] font-mono text-gray-600 bg-black/80 px-2 py-1 border border-white/5 uppercase">Read_Only_Buffer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Hint */}
      <div className="mt-6 flex items-center gap-4 text-gray-600">
         <ExternalLink size={14} />
         <p className="text-[9px] font-mono uppercase tracking-[0.2em]">
           How to use: Copy the CSS above &gt; Open OBS &gt; Right click Browser Source &gt; Properties &gt; Paste into "Custom CSS" box.
         </p>
      </div>
    </div>
  );
}
