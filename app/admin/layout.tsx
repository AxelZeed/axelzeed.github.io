import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ExternalLink, 
  LogOut, 
  Shield, 
  User,
  Activity
} from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#020a0c] text-white flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#05161a] border-r border-neon-cyan/20 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-neon-cyan/10">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-neon-cyan/10 border border-neon-cyan rounded flex items-center justify-center group-hover:bg-neon-cyan transition-colors">
              <Shield size={16} className="text-neon-cyan group-hover:text-black transition-colors" />
            </div>
            <span className="font-ethnocentric text-[10px] tracking-tighter">ZERYUZ ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 border border-transparent hover:border-neon-cyan/20 transition-all"
          >
            <LayoutDashboard size={16} />
            DASHBOARD
          </Link>
          <Link 
            href="/admin/review" 
            className="flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 border border-transparent hover:border-neon-cyan/20 transition-all"
          >
            <MessageSquare size={16} />
            COMM_LINK
          </Link>
          
          <div className="pt-8 px-4">
            <p className="text-[8px] text-gray-600 font-bold tracking-[0.3em] uppercase mb-4">External_Access</p>
          </div>

          <a 
            href="https://vercel.com" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Activity size={16} />
            VERCEL_LOGS
            <ExternalLink size={12} className="ml-auto opacity-50" />
          </a>
          <a 
            href="https://supabase.com" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Shield size={16} />
            SUPABASE_DB
            <ExternalLink size={12} className="ml-auto opacity-50" />
          </a>
        </nav>

        <div className="p-4 border-t border-neon-cyan/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 bg-neon-green/10 border border-neon-green/30 rounded-full flex items-center justify-center">
              <User size={16} className="text-neon-green" />
            </div>
            <div className="truncate">
              <p className="text-[10px] text-white font-bold truncate">{user.email}</p>
              <p className="text-[8px] text-neon-green uppercase tracking-widest font-mono">Verified_Admin</p>
            </div>
          </div>
          
          <form action="/auth/sign-out" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono text-neon-red hover:bg-neon-red/10 border border-transparent hover:border-neon-red/20 transition-all"
            >
              <LogOut size={16} />
              LOGOUT_SESSION
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        {/* Background Decorative HUD */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
           <Shield size={400} className="text-neon-cyan" />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
