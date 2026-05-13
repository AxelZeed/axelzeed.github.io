"use client";

import React, { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { MockChat } from './components/MockChat';
import { useChatStore } from './store';
import { generateCSS } from './utils';
import { Copy, Check, ExternalLink, Code, Terminal } from 'lucide-react';

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
    <div className="min-h-screen bg-[#020a0c] pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header Info */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={24} className="text-neon-cyan" />
              <span className="text-[10px] font-ethnocentric text-neon-cyan tracking-[0.3em] uppercase">SYSTEM_UTILITY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-ethnocentric tracking-tighter text-white mb-2">
              LIVECHAT_MODDER
            </h1>
            <p className="text-xs font-mono text-neon-cyan tracking-widest uppercase opacity-70">
              Advanced CSS Injection Framework for Virtual Overlays
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Target_Platform</p>
              <p className="text-[10px] text-white font-mono uppercase">YouTube_Live_Chat</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden md:block"></div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Build_Version</p>
              <p className="text-[10px] text-neon-green font-mono uppercase">v3.2.0-PUBLIC</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Controls - scrollable sidebar */}
          <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] overflow-y-auto border border-white/5 shadow-2xl rounded-lg custom-scrollbar">
            <ControlPanel />
          </div>

          {/* Preview & Export */}
          <div className="flex-1 flex flex-col gap-8 w-full">
            {/* Live Preview */}
            <div className="bg-black/40 border border-white/5 rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03),transparent_70%)] pointer-events-none"></div>
              <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#00ff00]"></div>
                <span className="text-[10px] font-ethnocentric text-gray-500 tracking-widest uppercase">LIVE_RENDER_UPLINK</span>
              </div>

              <div className="p-12">
                <div className="max-w-2xl mx-auto">
                  <MockChat />
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-6 right-6 pointer-events-none opacity-10">
                <Code size={160} className="text-white" />
              </div>
            </div>

            {/* Export Panel */}
            <div className="h-72 bg-[#05161a] border border-neon-cyan/20 rounded-lg flex flex-col overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-neon-cyan/10 bg-[#041215] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Code size={18} className="text-neon-cyan" />
                  <span className="text-[10px] font-ethnocentric tracking-[0.2em] text-white">COMPILED_CSS_BUFFER</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-6 py-3 text-[10px] font-ethnocentric transition-all ${copied ? 'bg-neon-green text-black' : 'bg-neon-cyan text-black hover:scale-105 active:scale-95'
                      }`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'UPLINK_SUCCESS' : 'COPY_TO_CLIPBOARD'}
                  </button>
                </div>
              </div>
              <div className="flex-1 p-5 bg-black/60 relative group">
                <textarea
                  readOnly
                  value={cssOutput}
                  className="w-full h-full bg-transparent font-mono text-[11px] text-neon-cyan/70 resize-none outline-none custom-scrollbar leading-relaxed"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[8px] font-mono text-gray-600 bg-black/80 px-2 py-1 border border-white/5 uppercase">Read_Only_Stream</p>
                </div>
              </div>
            </div>

            {/* Footer Hint */}
            <div className="flex items-center gap-4 text-gray-600 bg-white/5 p-4 rounded border border-white/5">
              <ExternalLink size={16} />
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] leading-relaxed">
                Usage Instruction: Copy the Compiled Buffer &gt; Open OBS Browser Source &gt; Properties &gt; Paste into &quot;Custom CSS&quot; box. Restart cache if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
