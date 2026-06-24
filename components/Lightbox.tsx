"use client";

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ 
  isOpen, 
  onClose, 
  src, 
  title, 
  onPrev, 
  onNext 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-neon-cyan transition-colors z-[100000] p-3 bg-black/40 rounded-full"
      >
        <X size={32} />
      </button>

      {onPrev && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 text-white hover:text-neon-cyan transition-colors z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      {onNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 text-white hover:text-neon-cyan transition-colors z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
        >
          <ChevronRight size={48} />
        </button>
      )}

      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full flex flex-col items-center cursor-default"
      >
        <div className="relative max-h-[80vh] flex items-center justify-center">
          <img 
            src={src} 
            alt={title || "Viewer"} 
            className="max-w-full max-h-[80vh] object-contain animate-zoom-in border border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.1)]" 
          />
        </div>
        
        {title && (
          <div className="mt-8 text-center bg-black/60 px-6 py-3 backdrop-blur-md border border-neon-cyan/20">
            <h3 className="text-white font-ethnocentric text-sm md:text-xl tracking-widest uppercase glitch-text" data-text={title}>
              {title}
            </h3>
            <div className="mt-2 w-24 h-1 bg-neon-cyan mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};
