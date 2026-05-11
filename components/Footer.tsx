"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const socialLinks = [
    { name: 'Youtube', icon: '/Assets/Youtube.png', href: 'https://youtube.com/@axelzeed' },
    { name: 'Instagram', icon: '/Assets/Instagram.png', href: 'https://www.instagram.com/axel_zeed/' },
    { name: 'X', icon: '/Assets/X.png', href: 'https://twitter.com/axel_zeed' },
    { name: 'Discord', icon: '/Assets/Discord.png', href: 'https://discord.gg/TQPCCM22pV' },
    { name: 'Tiktok', icon: '/Assets/Tiktok.png', href: 'https://www.tiktok.com/@axelzeedd' },
    { name: 'Threads', icon: '/Assets/Threads.png', href: 'https://www.threads.net/@axel_zeed' },
    { name: 'Twitch', icon: '/Assets/Twitch.png', href: 'https://www.twitch.tv/axel_zeed' },
    { name: 'Trello', icon: '/Assets/Trello.png', href: 'https://trello.com/b/AipZ6l9k/axel-zeed-commission-waiting-list' },
    { name: 'Trakteer', icon: '/Assets/Trakteer.png', href: 'https://trakteer.id/axel-zeed' },
    { name: 'VGen', icon: '/Assets/VGen.png', href: 'https://vgen.co/axel_zeed' },
  ];

  const systemLinks = [
    { name: 'Debut', href: 'https://www.youtube.com/live/cQinAv1I4to?si=qJamCfGLKZ_5kAHb' },
    { name: 'Model Showcase', href: 'https://youtu.be/fBEN56Y2MHg' },
    { name: 'Commission', href: '/price' },
    { name: 'Shorts', href: 'https://youtube.com/playlist?list=PLvagROOJB7HeKy-GltBRrF5l5mw0ufhbl&si=8F1QetzwW475jlF3' },
  ];

  return (
    <footer className={`bg-dark-teal border-t border-neon-cyan/20 py-12 mt-auto relative z-10 ${isAdmin ? 'lg:pl-64' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img src="/Assets/Footer-PP.png" alt="Profile" className="w-20 h-20 rounded-full border-2 border-neon-cyan/20 shadow-[0_0_15px_rgba(0,242,255,0.2)]" />
            <div>
              <h3 className="text-xl font-bold text-foreground font-ethnocentric tracking-tighter">Axel Zeed</h3>
              <p className="text-sm text-gray-400">Lead Researcher & Scientist @ Zeryuz Corp</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-neon-cyan font-ethnocentric mb-4 tracking-tighter text-lg underline underline-offset-8 decoration-neon-cyan/30">SYSTEM ACCESS</h4>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-sm font-bold tracking-widest">
              {systemLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-neon-cyan transition-colors border-b border-transparent hover:border-neon-cyan"
                >
                  {link.name.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-neon-cyan/10 my-8" />

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {socialLinks.map((social) => (
            <a 
              key={social.name} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]"
              title={social.name}
            >
              <img src={social.icon} alt={social.name} className="w-8 h-8" />
            </a>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-[10px] md:text-xs text-gray-500 tracking-[0.3em] font-bold">
            ©2022-2026 AXEL ZEED. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] text-neon-cyan/40 tracking-widest font-mono">
            // SYSTEM_STATUS: OPERATIONAL // UPLINK_STABLE //
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
