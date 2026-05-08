"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Music, Play, Plus, Minus } from 'lucide-react';

interface MediaItem {
  src: string;
  title: string;
  author?: string;
  desc?: string;
  songs?: string[];
  isStruck?: boolean;
}

interface MediaSliderProps {
  title: string;
  items: MediaItem[];
  onItemClick: (item: MediaItem, index: number) => void;
  accentColor?: 'neon-cyan' | 'neon-green' | 'neon-red';
  aspectRatio?: 'portrait' | 'square' | 'video';
  cardWidth?: string;
}

export const MediaSlider: React.FC<MediaSliderProps> = ({ 
  title, 
  items, 
  onItemClick, 
  accentColor = 'neon-cyan',
  aspectRatio = 'portrait',
  cardWidth = 'w-[220px]'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleExpand = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedIndices);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIndices(newExpanded);
  };

  const getAccentClass = () => {
    switch (accentColor) {
      case 'neon-green': return 'text-neon-green border-neon-green shadow-neon-green/20';
      case 'neon-red': return 'text-neon-red border-neon-red shadow-neon-red/20';
      default: return 'text-neon-cyan border-neon-cyan shadow-neon-cyan/20';
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <div className="mb-16 relative group/slider">
      <div className="flex items-center justify-between mb-6">
        <h3 className={`font-ethnocentric text-xs tracking-widest uppercase flex items-center gap-2 ${getAccentClass().split(' ')[0]}`}>
           <div className={`w-1 h-4 ${accentColor === 'neon-green' ? 'bg-neon-green' : accentColor === 'neon-red' ? 'bg-neon-red' : 'bg-neon-cyan'}`}></div>
           {title}
        </h3>
        <div className="flex gap-2">
           <button onClick={() => scroll('left')} className={`w-8 h-8 flex items-center justify-center border border-white/10 hover:border-neon-cyan transition-all ${!showLeftArrow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}><ChevronLeft size={16} /></button>
           <button onClick={() => scroll('right')} className={`w-8 h-8 flex items-center justify-center border border-white/10 hover:border-neon-cyan transition-all ${!showRightArrow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}><ChevronRight size={16} /></button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4 mask-fade-edges"
      >
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`${cardWidth} shrink-0 group cursor-pointer`}
            onClick={() => onItemClick(item, idx)}
          >
            <div className={`relative overflow-hidden border border-white/10 group-hover:border-neon-cyan/50 transition-all duration-500 ${getAspectClass()}`}>
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-xs text-white font-bold leading-tight mb-1">{item.title}</span>
                {item.author && <span className="text-[10px] text-neon-cyan uppercase font-mono">{item.author}</span>}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <p className="text-xs text-gray-300 font-bold uppercase tracking-tighter truncate group-hover:text-neon-cyan transition-colors">
                  {item.title}
                </p>
                {item.songs && item.songs.length > 3 && (
                  <button 
                    onClick={(e) => toggleExpand(e, idx)}
                    className="text-[10px] text-neon-cyan hover:text-white transition-colors"
                  >
                    {expandedIndices.has(idx) ? <Minus size={12} /> : <Plus size={12} />}
                  </button>
                )}
              </div>

              {item.songs && (
                <ul className={`space-y-1 overflow-hidden transition-all duration-500 ${expandedIndices.has(idx) ? 'max-h-96' : 'max-h-[64px]'}`}>
                  {item.songs.map((s, i) => (
                    <li key={i} className="text-[10px] text-gray-500 font-mono truncate tracking-tight lowercase flex items-center gap-2 group-hover:text-gray-300">
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              
              {item.desc && (
                 <p className="text-[10px] text-gray-500 font-mono leading-relaxed group-hover:text-gray-400">
                   {item.desc}
                 </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
