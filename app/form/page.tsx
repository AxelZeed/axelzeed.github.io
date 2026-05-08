"use client";

import React from 'react';
import { WishesForm } from '@/components/debut/WishesForm';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StandaloneWishesPage() {
  return (
    <div className="min-h-screen bg-[#05161a] relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[url('/Assets/BG.jpg')] bg-cover bg-fixed opacity-20 grayscale"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05161a]/80 to-[#05161a]"></div>
      
      <div className="relative z-10 w-full max-w-4xl animate-fade-in">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 mb-6 relative group">
            <div className="absolute inset-0 bg-neon-cyan/20 blur-xl group-hover:bg-neon-cyan/40 transition-all rounded-full animate-pulse"></div>
            <img src="/Assets/Logo.png" alt="Logo" className="w-full h-full object-contain relative z-10" />
          </div>
          
          <div className="text-center">
            <h1 className="text-neon-cyan font-ethnocentric text-3xl md:text-5xl tracking-tighter mb-4 glitch-text" data-text="NEURAL_UPLOAD">NEURAL_UPLOAD</h1>
            <p className="text-xs text-gray-400 font-mono tracking-[0.5em] uppercase">Transmission Protocol v2.4.0 // Secure Uplink Established</p>
          </div>
        </div>

        <div className="relative">
          {/* Decorative frame elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-neon-cyan opacity-50"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-neon-cyan opacity-50"></div>
          
          <WishesForm />
        </div>

        <div className="mt-12 flex justify-center gap-8 items-center">
          <Link 
            href="/debut" 
            className="flex items-center gap-2 text-[10px] font-ethnocentric text-gray-500 hover:text-neon-cyan transition-colors tracking-widest"
          >
            <ArrowLeft size={14} />
            RETURN_TO_BASE
          </Link>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <Shield size={12} className="text-neon-green" />
            ENCRYPTED_CONNECTION
          </div>
        </div>
      </div>
      
      {/* Footer minimal */}
      <div className="absolute bottom-8 text-center w-full pointer-events-none">
        <p className="text-[8px] text-gray-700 font-mono tracking-widest uppercase">©2026 ZERYUZ_CORP // AXEL_ZEED_SYSTEMS</p>
      </div>
    </div>
  );
}
