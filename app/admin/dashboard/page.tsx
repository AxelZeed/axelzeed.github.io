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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#05161a] border border-neon-cyan/20 p-8 hover:border-neon-cyan/50 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded group-hover:bg-neon-cyan/20 transition-colors">
              <MessageSquare className="text-neon-cyan" size={24} />
            </div>
            <span className="text-[10px] text-gray-600 font-mono font-bold uppercase tracking-widest">Wishes_Relay</span>
          </div>
          <h3 className="text-4xl font-ethnocentric text-white mb-2">{wishesCount || 0}</h3>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-relaxed">Total transmissions received from the neural form.</p>
          <Link href="/admin/review" className="mt-6 inline-flex items-center gap-2 text-[10px] font-ethnocentric text-neon-cyan hover:translate-x-1 transition-transform">
            VIEW_LOGS <Zap size={12} />
          </Link>
        </div>

        <div className="bg-[#05161a] border border-neon-green/20 p-8 hover:border-neon-green/50 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-neon-green/10 border border-neon-green/20 rounded group-hover:bg-neon-green/20 transition-colors">
              <Activity className="text-neon-green" size={24} />
            </div>
            <span className="text-[10px] text-gray-600 font-mono font-bold uppercase tracking-widest">Site_Vitals</span>
          </div>
          <h3 className="text-4xl font-ethnocentric text-white mb-2">99.9%</h3>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-relaxed">Mainframe stability across all deployment nodes.</p>
          <a href="https://vercel.com" target="_blank" className="mt-6 inline-flex items-center gap-2 text-[10px] font-ethnocentric text-neon-green hover:translate-x-1 transition-transform">
            HEALTH_CHECK <Zap size={12} />
          </a>
        </div>

        <div className="bg-[#05161a] border border-white/10 p-8 hover:border-white/30 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded group-hover:bg-white/10 transition-colors">
              <Terminal className="text-white" size={24} />
            </div>
            <span className="text-[10px] text-gray-600 font-mono font-bold uppercase tracking-widest">System_Access</span>
          </div>
          <h3 className="text-4xl font-ethnocentric text-white mb-2">AUTH</h3>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-relaxed">Active administrative session encrypted via Supabase.</p>
          <Link href="/admin/settings" className="mt-6 inline-flex items-center gap-2 text-[10px] font-ethnocentric text-white/50 hover:translate-x-1 transition-transform">
            SEC_CONFIG <Settings size={12} />
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-black/40 border-2 border-white/5 p-10 relative overflow-hidden" style={{ clipPath: 'polygon(0 15px, 100% 0, 100% calc(100% - 15px), 0 100%)' }}>
        <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>
        <h3 className="text-sm font-ethnocentric text-white mb-8 tracking-widest uppercase flex items-center gap-3">
           <LayoutDashboard className="text-neon-cyan" size={18} />
           SURFACE_LINK_BUFFER
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link 
              key={link.title} 
              href={link.url}
              className="flex items-center justify-between p-4 bg-black/60 border border-white/5 hover:border-neon-cyan transition-all group"
            >
              <span className="text-[10px] font-mono text-gray-400 group-hover:text-neon-cyan transition-colors">{link.title}</span>
              <link.icon className={`${link.color} opacity-40 group-hover:opacity-100 transition-opacity`} size={16} />
            </Link>
          ))}
        </div>
      </div>

      {/* Maintenance Info */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 bg-dark-teal/10 border-l-4 border-neon-cyan p-8">
           <h3 className="text-xs font-ethnocentric text-neon-cyan mb-4 tracking-widest uppercase">RESEARCH_NOTES</h3>
           <p className="text-sm text-gray-400 font-mono leading-relaxed">
             // The dashboard foundation is now active. All admin routes are protected via server-side middleware and Supabase Auth. <br /><br />
             // Next phase: Implement the Kanban board for commission tracking and integrate live Vercel analytics API.
           </p>
        </div>
        <div className="lg:w-1/3 bg-neon-red/5 border-l-4 border-neon-red p-8 flex flex-col justify-center">
           <div className="flex items-center gap-3 text-neon-red mb-2">
             <Shield size={18} />
             <h3 className="text-xs font-ethnocentric tracking-widest uppercase">SECURITY_LOCK</h3>
           </div>
           <p className="text-[10px] text-red-900/60 font-mono font-bold uppercase tracking-widest">
             Neural logging enabled. Any unauthorized uplink attempts are redirected to surface nodes.
           </p>
        </div>
      </div>
    </div>
  );
}
