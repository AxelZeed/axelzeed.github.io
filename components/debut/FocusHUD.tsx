"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, ChevronUp, ChevronDown, Minus, Plus, Maximize2 } from 'lucide-react';

interface FocusHUDProps {
  sections: { id: string; title: string }[];
  onNavigate: (id: string) => void;
  onToggle: (active: boolean) => void;
  isActive: boolean;
}

export const FocusHUD: React.FC<FocusHUDProps> = ({ 
  sections, 
  onNavigate, 
  onToggle, 
  isActive 
}) => {
  const [minimized, setMinimized] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const updateFocusedElement = (id: string) => {
    document.querySelectorAll('.focusable-chunk').forEach(el => el.classList.remove('focused'));
    const target = document.getElementById(id);
    if (target) target.classList.add('focused');
  };

  const handleToggle = () => {
    const nextActive = !isActive;
    onToggle(nextActive);
    if (nextActive) {
      updateFocusedElement(sections[currentSectionIndex].id);
      setMinimized(false);
    } else {
      document.querySelectorAll('.focusable-chunk').forEach(el => el.classList.remove('focused'));
    }
  };

  const navigate = (direction: 'up' | 'down') => {
    let nextIndex = direction === 'up' ? currentSectionIndex - 1 : currentSectionIndex + 1;
    if (nextIndex < 0) nextIndex = sections.length - 1;
    if (nextIndex >= sections.length) nextIndex = 0;
    
    setCurrentSectionIndex(nextIndex);
    const nextId = sections[nextIndex].id;
    onNavigate(nextId);
    if (isActive) updateFocusedElement(nextId);
  };

  // State 1: Not Active -> Show ONLY Engage Button
  if (!isActive) {
    return (
      <div className="fixed bottom-8 right-8 z-[9000] animate-fade-in">
        <button 
          onClick={handleToggle}
          className="bg-black/80 border-2 border-neon-cyan p-4 flex items-center gap-3 text-neon-cyan font-ethnocentric text-xs hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] group"
        >
          <Eye size={18} className="group-hover:scale-110 transition-transform" />
          ENGAGE_FOCUS_MODE
        </button>
      </div>
    );
  }

  // State 2: Active but Minimized -> Show a small toggle
  if (minimized) {
    return (
      <div className="fixed bottom-8 right-8 z-[9000] animate-fade-in">
        <button 
          onClick={() => setMinimized(false)}
          className="w-12 h-12 bg-black/80 border-2 border-neon-cyan flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]"
          title="Restore HUD"
        >
          <Plus size={20} />
        </button>
      </div>
    );
  }

  // State 3: Active and Full HUD
  return (
    <div className="fixed bottom-8 right-8 z-[9000] animate-slide-up">
      <div className="w-72 bg-black/90 border-2 border-neon-cyan/50 backdrop-blur-xl p-6 flex flex-col gap-5 relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Header with Version and Minimize */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-neon-green animate-pulse"></div>
            <span className="text-[10px] font-ethnocentric text-neon-green tracking-widest">HUD_v4.2</span>
          </div>
          <button 
            onClick={() => setMinimized(true)}
            className="text-gray-500 hover:text-white transition-colors"
            title="Minimize"
          >
            <Minus size={18} />
          </button>
        </div>

        {/* Current Sector Selection */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono">Current Sector</label>
            <span className="text-[9px] font-mono text-neon-cyan">{currentSectionIndex + 1} / {sections.length}</span>
          </div>
          <select 
            value={sections[currentSectionIndex]?.id}
            onChange={(e) => {
              const idx = sections.findIndex(s => s.id === e.target.value);
              setCurrentSectionIndex(idx);
              onNavigate(e.target.value);
              updateFocusedElement(e.target.value);
            }}
            className="w-full bg-black/50 border border-white/20 text-white text-xs p-3 outline-none focus:border-neon-cyan font-mono transition-colors"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>{section.title}</option>
            ))}
          </select>
        </div>

        {/* Navigation Controls */}
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('up')}
            className="flex-1 h-12 border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/10 flex items-center justify-center transition-all group"
          >
            <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('down')}
            className="flex-1 h-12 border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/10 flex items-center justify-center transition-all group"
          >
            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/5 overflow-hidden">
          <div className="h-full bg-neon-cyan transition-all duration-700" style={{ width: `${((currentSectionIndex + 1) / sections.length) * 100}%` }}></div>
        </div>

        {/* Disengage Button */}
        <button 
          onClick={handleToggle}
          className="w-full py-3 bg-neon-red/10 border border-neon-red text-neon-red font-ethnocentric text-[10px] tracking-widest hover:bg-neon-red hover:text-black transition-all flex items-center justify-center gap-3 mt-2"
        >
          <EyeOff size={14} />
          DISENGAGE_PROTOCOL
        </button>
      </div>
    </div>
  );
};
