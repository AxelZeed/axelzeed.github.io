import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { 
  Zap, 
  ExternalLink, 
  MessageSquare, 
  Settings, 
  Terminal,
  Shield,
  Activity,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get some quick stats
  const { count: wishesCount } = await supabase
    .from('wishes')
    .select('*', { count: 'exact', head: true });

  const quickLinks = [
    { title: 'PORTFOLIO_LIVE', url: '/portfolio', icon: ExternalLink, color: 'text-neon-cyan' },
    { title: 'DEBUT_PAGE', url: '/debut', icon: ExternalLink, color: 'text-neon-green' },
    { title: 'TERMS_OF_SERVICE', url: '/terms', icon: ExternalLink, color: 'text-neon-cyan' },
    { title: 'SERVICE_PRICES', url: '/price', icon: ExternalLink, color: 'text-neon-cyan' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-ethnocentric tracking-tighter text-white mb-2">
            ADMIN_HUB
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-[0.5em] uppercase"> Welcome back, Researcher {user?.email?.split('@')[0]} </p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-neon-green/30 bg-neon-green/5 text-neon-green text-[10px] font-mono font-bold tracking-widest uppercase">
            STATUS: UPLINK_STABLE
          </div>
          <div className="px-4 py-2 border border-white/10 text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase">
            VER: 1.0.4-ADMIN
          </div>
        </div>
      </div>

      {/* Maintenance Info & Research Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#05161a] border-l-4 border-neon-cyan p-8 hover:bg-neon-cyan/5 transition-all">
            <h3 className="text-xs font-ethnocentric text-neon-cyan mb-4 tracking-widest uppercase flex items-center gap-2">
              <Terminal size={14} />
              RESEARCH_NOTES
            </h3>
            <p className="text-sm text-gray-400 font-mono leading-relaxed">
              // The dashboard foundation is now active. All admin routes are protected via server-side middleware and Supabase Auth. <br /><br />
              // Next phase: Implement the Kanban board for commission tracking and integrate live Vercel analytics API. <br /><br />
              // Neural synchronization at 98.2%. System stability remains nominal.
            </p>
          </div>

          <div className="bg-[#05161a] border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <LayoutDashboard size={80} />
            </div>
            <h3 className="text-xs font-ethnocentric text-gray-500 mb-6 tracking-widest uppercase">SYSTEM_LOGS_BUFFER</h3>
            <div className="space-y-3 font-mono text-[10px]">
              <p className="text-neon-green/60">&gt; [11:42:01] AUTH_SUCCESS: Session verified for UID_AXEL_018</p>
              <p className="text-gray-600">&gt; [11:43:15] DB_SYNC: Synchronizing wishes table with regional nodes...</p>
              <p className="text-gray-600">&gt; [11:45:30] ANALYTICS_IDLE: Awaiting Vercel API handshake...</p>
              <p className="text-neon-cyan/60">&gt; [11:49:10] UI_UPDATE: Sidebar logic overhaul initiated.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neon-red/5 border border-neon-red/20 p-8 flex flex-col h-full relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-red/30 animate-pulse"></div>
            <div className="flex items-center gap-3 text-neon-red mb-4">
              <Shield size={18} />
              <h3 className="text-xs font-ethnocentric tracking-widest uppercase">SECURITY_LOCK</h3>
            </div>
            <p className="text-[10px] text-red-900/80 font-mono font-bold uppercase tracking-widest leading-relaxed mb-6">
              Neural logging enabled. Any unauthorized uplink attempts are redirected to surface nodes. 
              <br /><br />
              Encryption: RSA-4096 <br />
              Protocol: ZERYUZ_SECURE_V4
            </p>
            <div className="mt-auto pt-6 border-t border-neon-red/10">
              <div className="flex justify-between items-center text-[8px] font-mono text-neon-red/40 uppercase">
                <span>Threat_Level</span>
                <span>Minimal</span>
              </div>
              <div className="w-full h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                <div className="w-1/12 h-full bg-neon-red shadow-[0_0_10px_rgba(255,0,60,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
