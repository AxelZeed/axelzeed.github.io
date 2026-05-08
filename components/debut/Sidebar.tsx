"use client";

import React, { useEffect, useState } from 'react';
import { LogOut, List } from 'lucide-react';

interface SidebarProps {
  sections: { id: string; title: string }[];
  onLogout: () => void;
  activeId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, onLogout, activeId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 left-4 z-[160] lg:hidden w-10 h-10 bg-black border border-neon-cyan flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)]"
      >
        <List size={20} />
      </button>

      {/* Sidebar Content */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-black border-r border-white/5 z-[155] transition-transform duration-500 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} pt-24 p-8 flex flex-col`}>
        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/10">
          <div className="w-1.5 h-6 bg-neon-cyan"></div>
          <h2 className="text-sm font-ethnocentric text-white tracking-widest uppercase">Navigation</h2>
        </div>

        <nav className="flex-1 overflow-y-auto pr-4 scrollbar-custom">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-4 text-xs font-bold tracking-widest transition-all ${activeId === section.id ? 'text-neon-cyan' : 'text-gray-500 hover:text-white'}`}
                >
                  <span className={`w-1 h-1 rounded-full transition-all ${activeId === section.id ? 'bg-neon-cyan scale-150 shadow-[0_0_8px_#00f2ff]' : 'bg-gray-800'}`}></span>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 text-xs font-bold text-neon-red hover:text-white transition-colors uppercase tracking-widest"
          >
            <LogOut size={14} />
            Term_Session [Logout]
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] lg:hidden"
        ></div>
      )}
    </>
  );
};
