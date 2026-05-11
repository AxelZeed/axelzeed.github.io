"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/admin/dashboard');
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#020a0c] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-[#05161a]/90 backdrop-blur-xl border-2 border-neon-cyan shadow-[0_0_50px_rgba(0,242,255,0.15)] p-8 md:p-10" style={{ clipPath: 'polygon(0 20px, 100% 0, 100% calc(100% - 20px), 0 100%)' }}>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-cyan/10 border border-neon-cyan rounded-full mb-6">
              <Shield className="text-neon-cyan" size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-ethnocentric tracking-tighter text-white glitch-text" data-text="ZERYUZ_MAINFRAME">
              ZERYUZ MAINFRAME
            </h1>
            <p className="text-[10px] text-neon-cyan font-mono tracking-[0.5em] uppercase mt-2 opacity-60">Admin_Authorization_Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-ethnocentric text-gray-400 mb-3 tracking-widest uppercase">Node_Identifier (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 focus:border-neon-cyan p-4 pl-12 text-sm outline-none transition-all font-mono"
                  placeholder="admin@zeryuz.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-ethnocentric text-gray-400 mb-3 tracking-widest uppercase">Security_Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 focus:border-neon-cyan p-4 pl-12 text-sm outline-none transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-neon-red/10 border border-neon-red/30 p-4 flex items-start gap-3 animate-shake">
                <AlertCircle className="text-neon-red shrink-0" size={18} />
                <p className="text-[10px] text-neon-red font-mono uppercase leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-custom bg-neon-cyan text-black font-ethnocentric text-xs py-4 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  INITIALIZING_UPLINK...
                </>
              ) : (
                'ESTABLISH_CONNECTION'
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[8px] text-gray-600 font-mono tracking-[0.3em] uppercase">
              Authorized Personnel Only // Biometric Logging Enabled
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
           <a href="/" className="text-[10px] font-ethnocentric text-gray-500 hover:text-neon-cyan transition-colors tracking-widest uppercase">
             [ ABORT_AND_RETURN_TO_SURFACE ]
           </a>
        </div>
      </div>
    </div>
  );
}
