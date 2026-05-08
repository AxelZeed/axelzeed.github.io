"use client";

import React, { useState } from 'react';
import { verifyPasscode } from '@/app/debut/actions';
import { Shield, Lock, Terminal } from 'lucide-react';

interface PasscodeOverlayProps {
  onSuccess: (userKey: string) => void;
}

export const PasscodeOverlay: React.FC<PasscodeOverlayProps> = ({ onSuccess }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await verifyPasscode(input);
    if (result.success) {
      onSuccess(result.userKey!);
    } else {
      setError(result.error || "ACCESS_DENIED");
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    onSuccess('default');
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-md p-1 border-2 border-neon-cyan/50 bg-[#05161a] shadow-[0_0_50px_rgba(0,242,255,0.15)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-1 bg-neon-cyan"></div>
        <div className="absolute bottom-0 right-0 w-16 h-1 bg-neon-cyan"></div>
        
        <div className="p-8 border border-white/5">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="text-neon-cyan w-16 h-16 animate-pulse" strokeWidth={1} />
              <Lock className="absolute inset-0 m-auto text-white w-6 h-6" />
            </div>
          </div>
          
          <h1 className="glitch-text text-3xl font-ethnocentric mb-2 text-center text-neon-cyan tracking-tighter">
            SECURITY_GATE
          </h1>
          <p className="text-[10px] text-gray-500 mb-8 text-center tracking-[0.3em] font-mono uppercase">
            Awaiting Clearance Protocol
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan/50 w-4 h-4" />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-black/50 border border-neon-cyan/20 p-4 pl-10 text-center text-neon-green font-mono focus:border-neon-cyan/60 outline-none transition-all placeholder:text-gray-800"
                placeholder="INPUT_PASSCODE"
                autoFocus
                disabled={loading}
              />
            </div>
            
            {error && (
              <p className="text-neon-red text-[10px] font-mono text-center animate-shake">
                !! ERROR: {error} !!
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-neon-cyan text-black font-ethnocentric text-xs hover:bg-white transition-all disabled:opacity-50 relative group overflow-hidden"
            >
              <span className="relative z-10">{loading ? 'VERIFYING...' : 'OVERRIDE_SYSTEM'}</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </form>

          <button 
            onClick={handleGuest}
            disabled={loading}
            className="w-full mt-8 text-[10px] text-gray-600 hover:text-neon-cyan transition-colors tracking-widest uppercase font-bold font-mono"
          >
            // Bypass security (Login as Guest)
          </button>
        </div>
      </div>
    </div>
  );
};
