"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ExternalLink, 
  LogOut, 
  Shield, 
  User,
  Activity,
  ChevronDown,
  ChevronRight,
  Globe
} from 'lucide-react';

interface RouteLink {
  title: string;
  url: string;
}

interface SidebarProps {
  userEmail: string;
  publicLinks: RouteLink[];
  adminLinks: RouteLink[];
}

export default function AdminSidebar({ userEmail, publicLinks, adminLinks }: SidebarProps) {
  const pathname = usePathname();
  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-[#05161a] border-r border-neon-cyan/20 flex flex-col fixed inset-y-0 left-0 z-50">
      <div className="p-6 border-b border-neon-cyan/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-neon-cyan/10 border border-neon-cyan rounded flex items-center justify-center group-hover:bg-neon-cyan transition-colors">
            <Shield size={16} className="text-neon-cyan group-hover:text-black transition-colors" />
          </div>
          <span className="font-ethnocentric text-[10px] tracking-tighter text-white">ZERYUZ ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        <Link 
          href="/admin/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 text-xs font-mono transition-all border border-transparent ${
            isActive('/admin/dashboard') 
              ? 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30' 
              : 'text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 hover:border-neon-cyan/20'
          }`}
        >
          <LayoutDashboard size={16} />
          DASHBOARD
        </Link>

        {/* Dynamic Admin/Private Links */}
        <div className="pt-2">
          <button 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all"
          >
            <Shield size={16} className="text-neon-red" />
            PRIVATE_SEC
            {isAdminOpen ? <ChevronDown size={14} className="ml-auto" /> : <ChevronRight size={14} className="ml-auto" />}
          </button>
          
          {isAdminOpen && (
            <div className="pl-10 space-y-1 mt-1">
              {adminLinks.map((link) => (
                <Link 
                  key={link.url}
                  href={link.url}
                  className={`block py-2 text-[10px] font-mono transition-colors ${
                    isActive(link.url) ? 'text-neon-cyan' : 'text-gray-500 hover:text-neon-cyan'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
              {adminLinks.length === 0 && <p className="text-[8px] text-gray-700 italic">No sub-modules...</p>}
            </div>
          )}
        </div>

        {/* Dynamic Public Links */}
        <div className="pt-2">
          <button 
            onClick={() => setIsPublicOpen(!isPublicOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all"
          >
            <Globe size={16} />
            PUBLIC_SURFACE
            {isPublicOpen ? <ChevronDown size={14} className="ml-auto" /> : <ChevronRight size={14} className="ml-auto" />}
          </button>
          
          {isPublicOpen && (
            <div className="pl-10 space-y-1 mt-1">
              {publicLinks.map((link) => (
                <Link 
                  key={link.url}
                  href={link.url}
                  className={`block py-2 text-[10px] font-mono transition-colors ${
                    isActive(link.url) ? 'text-neon-cyan' : 'text-gray-500 hover:text-neon-cyan'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-8 px-4">
          <p className="text-[8px] text-gray-600 font-bold tracking-[0.3em] uppercase mb-4">External_Access</p>
        </div>

        <a 
          href="https://vercel.com/axelzeeds-projects/axelzeed" 
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Activity size={16} />
          VERCEL_DASH
          <ExternalLink size={12} className="ml-auto opacity-50" />
        </a>
        <a 
          href="https://supabase.com/dashboard/project/yvfqgagqyacoblooilgq" 
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Shield size={16} />
          SUPABASE_DB
          <ExternalLink size={12} className="ml-auto opacity-50" />
        </a>
      </nav>

      <div className="p-4 border-t border-neon-cyan/10 bg-[#041215]">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="w-8 h-8 bg-neon-green/10 border border-neon-green/30 rounded-full flex items-center justify-center">
            <User size={16} className="text-neon-green" />
          </div>
          <div className="truncate">
            <p className="text-[10px] text-white font-bold truncate">{userEmail}</p>
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
  );
}
