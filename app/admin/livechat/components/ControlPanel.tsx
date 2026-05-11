"use client";

import React, { useState } from 'react';
import { useChatStore } from '../store';
import { 
  Type, 
  Layout, 
  Palette, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronUp,
  RefreshCcw,
  Sparkles
} from 'lucide-react';

const Accordion: React.FC<{ title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-neon-cyan" />
          <span className="text-[10px] font-ethnocentric tracking-widest">{title.toUpperCase()}</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="p-6 bg-black/20 space-y-4 animate-fade-in">{children}</div>}
    </div>
  );
};

export const ControlPanel = () => {
  const state = useChatStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'customBgImage' | 'brandIcon') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        state.setField(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to convert rgba to hex for the color picker (rough approximation)
  const toHex = (rgba: string) => {
    if (rgba.startsWith('#')) return rgba;
    return '#000000'; // Default fallback
  };

  return (
    <div className="flex flex-col h-full bg-[#05161a] border-r border-neon-cyan/20">
      <div className="p-6 border-b border-neon-cyan/10 flex justify-between items-center bg-[#041215] shrink-0">
        <h2 className="text-sm font-ethnocentric tracking-tighter text-neon-cyan flex items-center gap-2">
          <Sparkles size={16} />
          CONFIG_TERMINAL
        </h2>
        <button 
          onClick={() => state.reset()}
          className="p-2 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors"
          title="Reset to Default"
        >
          <RefreshCcw size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Accordion title="Layout & Behavior" icon={Layout} defaultOpen={true}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Message_Spacing</label>
                <span className="text-[10px] font-mono text-neon-cyan">{state.messageSpacing}px</span>
              </div>
              <input 
                type="range" min="0" max="100" value={state.messageSpacing}
                onChange={(e) => state.setField('messageSpacing', parseInt(e.target.value))}
                className="w-full accent-neon-cyan cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Bubble_Radius</label>
                <span className="text-[10px] font-mono text-neon-cyan">{state.bubbleRadius}px</span>
              </div>
              <input 
                type="range" min="0" max="100" value={state.bubbleRadius}
                onChange={(e) => state.setField('bubbleRadius', parseInt(e.target.value))}
                className="w-full accent-neon-cyan cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Skew_Angle</label>
                <span className="text-[10px] font-mono text-neon-cyan">{state.skewAngle}deg</span>
              </div>
              <input 
                type="range" min="-45" max="45" value={state.skewAngle}
                onChange={(e) => state.setField('skewAngle', parseInt(e.target.value))}
                className="w-full accent-neon-cyan cursor-pointer"
              />
            </div>
          </div>
        </Accordion>

        <Accordion title="Typography & Visuals" icon={Type}>
          <div className="space-y-4">
            <div>
              <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 block">Font_Family</label>
              <select 
                value={state.fontFamily}
                onChange={(e) => state.setField('fontFamily', e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-mono outline-none focus:border-neon-cyan text-white"
              >
                <option value="Rubik">Rubik</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Orbitron">Orbitron</option>
                <option value="Rajdhani">Rajdhani</option>
                <option value="Ethnocentric">Ethnocentric</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 block">Size_Name</label>
                <input 
                  type="number" value={state.fontSizeName}
                  onChange={(e) => state.setField('fontSizeName', parseInt(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 block">Size_Message</label>
                <input 
                  type="number" value={state.fontSizeMessage}
                  onChange={(e) => state.setField('fontSizeMessage', parseInt(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-white/10" onClick={() => state.setField('neonGlow', !state.neonGlow)}>
              <span className="text-[10px] font-mono text-gray-400">NEON_GLOW_MODE</span>
              <input 
                type="checkbox" checked={state.neonGlow}
                readOnly
                className="w-4 h-4 accent-neon-cyan pointer-events-none"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-white/10" onClick={() => state.setField('showAvatar', !state.showAvatar)}>
              <span className="text-[10px] font-mono text-gray-400">SHOW_AVATARS</span>
              <input 
                type="checkbox" checked={state.showAvatar}
                readOnly
                className="w-4 h-4 accent-neon-cyan pointer-events-none"
              />
            </div>
          </div>
        </Accordion>

        <Accordion title="Role Customization" icon={Palette}>
          <div className="space-y-6">
            {/* Owner */}
            <div className="p-4 border border-white/5 bg-black/20 rounded">
               <p className="text-[9px] text-neon-green font-bold mb-4 uppercase tracking-widest">// OWNER_CONFIG</p>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[8px] text-gray-600 mb-2 block uppercase">Background</label>
                   <input type="color" value={state.ownerBg.startsWith('rgba') ? '#ffe646' : state.ownerBg} 
                     onChange={(e) => state.setField('ownerBg', e.target.value)}
                     className="w-full h-8 bg-transparent cursor-pointer" />
                 </div>
                 <div>
                   <label className="text-[8px] text-gray-600 mb-2 block uppercase">Text</label>
                   <input type="color" value={toHex(state.ownerText)} 
                     onChange={(e) => state.setField('ownerText', e.target.value)}
                     className="w-full h-8 bg-transparent cursor-pointer" />
               </div>
             </div>
            </div>
            {/* Mod */}
            <div className="p-4 border border-white/5 bg-black/20 rounded">
               <p className="text-[9px] text-neon-cyan font-bold mb-4 uppercase tracking-widest">// MODERATOR_CONFIG</p>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[8px] text-gray-600 mb-2 block uppercase">Background</label>
                   <input type="color" value={state.modBg.startsWith('rgba') ? '#631fff' : state.modBg} 
                     onChange={(e) => state.setField('modBg', e.target.value)}
                     className="w-full h-8 bg-transparent cursor-pointer" />
                 </div>
                 <div>
                   <label className="text-[8px] text-gray-600 mb-2 block uppercase">Text</label>
                   <input type="color" value={toHex(state.modText)} 
                     onChange={(e) => state.setField('modText', e.target.value)}
                     className="w-full h-8 bg-transparent cursor-pointer" />
                 </div>
               </div>
            </div>
            {/* Default */}
            <div className="p-4 border border-white/5 bg-black/20 rounded">
               <p className="text-[9px] text-gray-400 font-bold mb-4 uppercase tracking-widest">// GLOBAL_CONFIG</p>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[8px] text-gray-600 mb-2 block uppercase">BG_Color</label>
                   <input type="color" value={state.bgColor.startsWith('rgba') ? '#000000' : state.bgColor} 
                     onChange={(e) => state.setField('bgColor', e.target.value)}
                     className="w-full h-8 bg-transparent cursor-pointer" />
                 </div>
                 <div>
                   <label className="text-[8px] text-gray-600 mb-2 block uppercase">Text_Color</label>
                   <input type="color" value={toHex(state.textColor)} 
                     onChange={(e) => state.setField('textColor', e.target.value)}
                     className="w-full h-8 bg-transparent cursor-pointer" />
                 </div>
               </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Asset Manager" icon={ImageIcon}>
          <div className="space-y-6">
            {/* Texture Map */}
            <div>
              <label className="text-[9px] text-neon-cyan font-bold mb-3 uppercase tracking-widest block">// BACKGROUND_TEXTURE</label>
              <div className="relative group">
                <input 
                  type="file" accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'customBgImage')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-6 border border-dashed border-white/10 group-hover:border-neon-cyan/50 transition-colors flex flex-col items-center gap-2">
                   <ImageIcon size={20} className="text-gray-600 group-hover:text-neon-cyan" />
                   <span className="text-[8px] font-mono text-gray-500 uppercase">UPLOAD_TEXTURE</span>
                </div>
              </div>
              {state.customBgImage && (
                <div className="mt-2 flex items-center justify-between p-2 bg-neon-green/5 border border-neon-green/10 rounded">
                  <span className="text-[8px] font-mono text-neon-green">ACTIVE</span>
                  <button onClick={() => state.setField('customBgImage', null)} className="text-[8px] text-neon-red hover:underline uppercase">Clear</button>
                </div>
              )}
            </div>

            {/* Brand Icon */}
            <div>
              <label className="text-[9px] text-neon-cyan font-bold mb-3 uppercase tracking-widest block">// PINNED_BRAND_ICON</label>
              <div className="relative group">
                <input 
                  type="file" accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'brandIcon')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-6 border border-dashed border-white/10 group-hover:border-neon-cyan/50 transition-colors flex flex-col items-center gap-2">
                   <Sparkles size={20} className="text-gray-600 group-hover:text-neon-cyan" />
                   <span className="text-[8px] font-mono text-gray-500 uppercase">UPLOAD_BRAND_ICON</span>
                </div>
              </div>
              {state.brandIcon && (
                <div className="mt-2 flex items-center justify-between p-2 bg-neon-green/5 border border-neon-green/10 rounded">
                  <span className="text-[8px] font-mono text-neon-green">ACTIVE</span>
                  <button onClick={() => state.setField('brandIcon', null)} className="text-[8px] text-neon-red hover:underline uppercase">Clear</button>
                </div>
              )}
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
