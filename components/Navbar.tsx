"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCommOpen, setIsMobileCommOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <nav className={`sticky top-0 z-[40] bg-[#05161a]/90 backdrop-blur-md border-b border-neon-cyan/20 ${isAdmin ? 'lg:pl-64' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img src="/Assets/Logo.png" alt="Axel Zeed Logo" className="w-10 h-10 md:w-12 md:h-12" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <Link
            href="/"
            className="text-sm font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors"
          >
            HOME
          </Link>

          {/* COMMISSION DROPDOWN */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1 text-sm font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors focus:outline-none">
              COMMISSION <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-48 bg-[#05161a]/95 backdrop-blur-md border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,242,255,0.15)] rounded overflow-hidden z-50">
              <div className="flex flex-col py-1">
                <Link href="/portfolio" className="px-4 py-2.5 text-xs font-bold tracking-widest text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  PORTFOLIO
                </Link>
                <Link href="/price" className="px-4 py-2.5 text-xs font-bold tracking-widest text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  PRICE
                </Link>
                <Link href="/terms" className="px-4 py-2.5 text-xs font-bold tracking-widest text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors last:border-0">
                  TERMS
                </Link>
              </div>
            </div>
          </div>

          {/* TOOLS DROPDOWN */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1 text-sm font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors focus:outline-none">
              TOOLS <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-48 bg-[#05161a]/95 backdrop-blur-md border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,242,255,0.15)] rounded overflow-hidden z-50">
              <div className="flex flex-col py-1">
                <Link href="/lore" className="px-4 py-2.5 text-xs font-bold tracking-widest text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  LORE
                </Link>
                <Link href="/livechat" className="px-4 py-2.5 text-xs font-bold tracking-widest text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  LIVECHAT
                </Link>
                <Link href="/invite" className="px-4 py-2.5 text-xs font-bold tracking-widest text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors last:border-0">
                  INVITE
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/zeryuz"
            className="text-sm font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors"
          >
            ZERYUZ
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-neon-cyan"
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMobileCommOpen(false);
            setIsMobileToolsOpen(false);
          }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-dark-teal border-b border-neon-cyan/20 animate-fade-in max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col py-6 px-6 gap-4 font-mono">
            {/* HOME */}
            <Link
              href="/"
              className="text-base font-bold tracking-widest text-center text-foreground hover:text-neon-cyan transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>

            <div className="w-full h-[1px] bg-white/5"></div>

            {/* COMMISSION CATEGORY */}
            <div className="flex flex-col items-center">
              <button 
                onClick={() => setIsMobileCommOpen(!isMobileCommOpen)}
                className="flex items-center justify-center gap-2 text-base font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors py-2 focus:outline-none w-full text-center"
              >
                COMMISSION 
                <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileCommOpen ? 'rotate-180 text-neon-cyan' : 'text-gray-400'}`} />
              </button>
              
              {isMobileCommOpen && (
                <div className="flex flex-col items-center gap-3 bg-black/40 border border-white/5 rounded-lg py-3 px-8 mt-2 w-full animate-fade-in">
                  <Link 
                    href="/portfolio" 
                    className="text-sm font-bold tracking-widest text-gray-300 hover:text-neon-cyan transition-colors py-1 w-full text-center"
                    onClick={() => { setIsOpen(false); setIsMobileCommOpen(false); }}
                  >
                    PORTFOLIO
                  </Link>
                  <Link 
                    href="/price" 
                    className="text-sm font-bold tracking-widest text-gray-300 hover:text-neon-cyan transition-colors py-1 w-full text-center"
                    onClick={() => { setIsOpen(false); setIsMobileCommOpen(false); }}
                  >
                    PRICE
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-sm font-bold tracking-widest text-gray-300 hover:text-neon-cyan transition-colors py-1 w-full text-center"
                    onClick={() => { setIsOpen(false); setIsMobileCommOpen(false); }}
                  >
                    TERMS
                  </Link>
                </div>
              )}
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>

            {/* TOOLS CATEGORY */}
            <div className="flex flex-col items-center">
              <button 
                onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                className="flex items-center justify-center gap-2 text-base font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors py-2 focus:outline-none w-full text-center"
              >
                TOOLS 
                <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileToolsOpen ? 'rotate-180 text-neon-cyan' : 'text-gray-400'}`} />
              </button>
              
              {isMobileToolsOpen && (
                <div className="flex flex-col items-center gap-3 bg-black/40 border border-white/5 rounded-lg py-3 px-8 mt-2 w-full animate-fade-in">
                  <Link 
                    href="/lore" 
                    className="text-sm font-bold tracking-widest text-gray-300 hover:text-neon-cyan transition-colors py-1 w-full text-center"
                    onClick={() => { setIsOpen(false); setIsMobileToolsOpen(false); }}
                  >
                    LORE
                  </Link>
                  <Link 
                    href="/livechat" 
                    className="text-sm font-bold tracking-widest text-gray-300 hover:text-neon-cyan transition-colors py-1 w-full text-center"
                    onClick={() => { setIsOpen(false); setIsMobileToolsOpen(false); }}
                  >
                    LIVECHAT
                  </Link>
                  <Link 
                    href="/invite" 
                    className="text-sm font-bold tracking-widest text-gray-300 hover:text-neon-cyan transition-colors py-1 w-full text-center"
                    onClick={() => { setIsOpen(false); setIsMobileToolsOpen(false); }}
                  >
                    INVITE
                  </Link>
                </div>
              )}
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>

            {/* ZERYUZ */}
            <Link
              href="/zeryuz"
              className="text-base font-bold tracking-widest text-center text-foreground hover:text-neon-cyan transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              ZERYUZ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
