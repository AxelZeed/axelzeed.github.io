"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MediaSlider } from '@/components/debut/MediaSlider';
import { Sidebar } from '@/components/debut/Sidebar';
import { FocusHUD } from '@/components/debut/FocusHUD';
import { PasscodeOverlay } from '@/components/debut/PasscodeOverlay';
import { WishesForm } from '@/components/debut/WishesForm';
import { Lightbox } from '@/components/Lightbox';
import { 
  ANIME, TV_SHOWS, FILMS, GAMES_COMBAT, GAMES_OPENWORLD, GAMES_STRATEGY, MUSIC_JPOP, MUSIC_INTERNATIONAL, MUSIC_ID,
  HARDWARE_PC, HARDWARE_LAPTOP, CARS_HYPER, CARS_GT, CARS_STREET, CREDITS,
  USERS, UserConfig, MediaItem, PREFERENCES, SEARCH_PROTOCOLS, WEB_BROWSERS,
  RACING_BROADCASTS, GALLERY, HONORABLE_MENTIONS, UMMM_SONGS, TAGS, CONTENTS
} from '@/lib/debut-data';
import { 
  Shield, Cpu, Zap, Activity, Info, Laptop, Search, MousePointer2, 
  Music, Car, Award, Send, CheckCircle, Heart, XCircle, Gamepad2, PlayCircle
} from 'lucide-react';

// --- Sub-components ---

const AttributeCard: React.FC<{ src: string; title: string; description: string; onClick: () => void }> = ({ src, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="group flex-fill flex flex-col border border-white/10 bg-dark-teal/20 p-6 w-full sm:w-[320px] transition-all hover:border-neon-cyan hover:-translate-y-2 cursor-pointer"
  >
    <div className="relative overflow-hidden mb-6 aspect-square shrink-0">
      <img src={src} alt={title} className="w-full h-full object-cover border border-white/5 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <h4 className="text-neon-cyan font-ethnocentric mb-3 text-[10px] uppercase tracking-widest">{title}</h4>
    <p className="text-xs text-gray-300 leading-relaxed font-mono flex-1">{description}</p>
  </div>
);

const HistoryCard: React.FC<{ src: string; version: string; description: string; isNew?: boolean; onClick: () => void }> = ({ src, version, description, isNew, onClick }) => (
  <div 
    onClick={onClick}
    className={`group text-center border ${isNew ? 'border-neon-green/30' : 'border-white/10'} bg-black/40 p-5 w-full sm:w-[280px] transition-all hover:border-neon-cyan hover:scale-105 cursor-pointer`}
  >
    <div className="relative aspect-[3/4] mb-4 overflow-hidden border border-white/5">
      <img src={src} alt={version} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      {isNew && (
        <div className="absolute top-2 right-2 bg-neon-green text-black text-[8px] font-bold px-2 py-1 uppercase tracking-tighter">New</div>
      )}
    </div>
    <h3 className={`font-ethnocentric text-[10px] mb-2 tracking-widest ${isNew ? 'text-neon-green' : 'text-white'}`}>{version}</h3>
    <p className="text-xs text-gray-400 italic font-mono">"{description}"</p>
  </div>
);

// --- Main Page ---

export default function DebutPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userKey, setUserKey] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserConfig | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; title: string; index: number; list: any[] }>({ isOpen: false, src: '', title: '', index: 0, list: [] });
  const [showValoStats, setShowValoStats] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);

  const sections = [
    { id: 'about', title: '01 ABOUT AXEL' },
    { id: 'archive', title: '02 ARCHIVE' },
    { id: 'attributes', title: '03 ATTRIBUTES' },
    { id: 'preferences', title: '04 PERSONAL PREFERENCES' },
    { id: 'media', title: '05 MEDIA CONSUMPTION' },
    { id: 'games', title: '06 GAMING INDEX' },
    { id: 'audio', title: '07 AUDIO NODE' },
    { id: 'hardware', title: '08 HARDWARE & SOFTWARE' },
    { id: 'cars', title: '09 COMBUSTION ENGINES' },
    { id: 'credits', title: '10 CREDIT SEQUENCE' },
    { id: 'relay', title: '11 FEEDBACK RELAY' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('axelDebutPasscode');
    if (saved && USERS[saved]) {
      handleLoginSuccess(saved);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isAuthenticated]);

  const handleLoginSuccess = (key: string) => {
    localStorage.setItem('axelDebutPasscode', key);
    setUserKey(key);
    setUserData(USERS[key]);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('axelDebutPasscode');
    setIsAuthenticated(false);
    setUserKey(null);
    setUserData(null);
  };

  const openLightbox = (item: any, index: number, list: any[]) => {
    setLightbox({ isOpen: true, src: item.src, title: item.title, index, list });
  };

  const navigateLightbox = (dir: 'prev' | 'next') => {
    const newIdx = dir === 'prev' ? lightbox.index - 1 : lightbox.index + 1;
    if (newIdx >= 0 && newIdx < lightbox.list.length) {
      const item = lightbox.list[newIdx];
      setLightbox({ ...lightbox, src: item.src, title: item.title, index: newIdx });
    }
  };

  if (!isAuthenticated) {
    return <PasscodeOverlay onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={`min-h-screen bg-[#020a0c] text-white selection:bg-neon-cyan/30 ${isFocusMode ? 'focus-mode-active' : ''}`}>
      
      <Sidebar sections={sections} onLogout={handleLogout} activeId={activeSection} />
      
      <FocusHUD 
        sections={sections} 
        isActive={isFocusMode} 
        onToggle={setIsFocusMode} 
        onNavigate={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} 
      />

      <main className="lg:ml-72 transition-all duration-500 overflow-hidden">
        
        {/* Banner Section */}
        <header className="relative h-[500px] md:h-[700px] overflow-hidden">
          <img 
            src={userData?.img || '/Assets/Guest_Banner.jpg'} 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020a0c] via-transparent to-black/60"></div>
          
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-neon-cyan"></div>
               <span className="text-[10px] font-mono text-neon-cyan tracking-[0.5em] uppercase">Sector_Verified_v3.5</span>
            </div>
            
            <h1 className="glitch-text text-3xl sm:text-5xl md:text-9xl font-ethnocentric text-white mb-4 tracking-tighter leading-none" data-text={`WELCOME_${userData?.name.toUpperCase()}`}>
              WELCOME<br />
              <span className="text-neon-cyan">{userData?.name.toUpperCase()}</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="px-4 py-2 border border-neon-green bg-neon-green/10 text-neon-green text-[10px] font-bold font-mono shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                SYSTEM_READY // UPLINK_STABLE
              </div>
              <div className="px-4 py-2 border border-white/20 text-white/50 text-[10px] font-bold font-mono">
                SEC_LVL_0{userKey === 'prototype018' ? '9' : '4'}
              </div>
            </div>
          </div>
          
          {/* Decorative HUD Scanline */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,242,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
        </header>

        <div className="container mx-auto px-6 py-20 max-w-6xl space-y-48">
          
          {/* 01 ABOUT */}
          <section id="about" className="scroll-mt-32 focusable-chunk">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
               <div className="w-2 h-8 md:h-10 bg-neon-cyan"></div>
               <h2 className="text-2xl md:text-6xl font-ethnocentric tracking-tighter uppercase">01 ABOUT AXEL</h2>
            </div>
            
            <div className="bg-dark-teal/20 border-l-4 border-neon-cyan p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative group/pfp shrink-0">
                <div className="absolute -inset-4 bg-neon-cyan/20 blur-2xl opacity-0 group-hover/pfp:opacity-100 transition-opacity"></div>
                <img 
                  src="/Assets/Axel_Main.png" 
                  alt="Axel Zeed" 
                  onClick={() => openLightbox({ src: "/Assets/Axel_Main.png", title: "Axel Zeed - Main Display" }, 0, [{ src: "/Assets/Axel_Main.png", title: "Axel Zeed - Main Display" }])}
                  className="relative w-64 h-64 md:w-96 md:h-96 border-2 border-neon-cyan object-cover cursor-pointer hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,242,255,0.2)]" 
                />
              </div>
              
              <div className="flex-1 space-y-8 text-center lg:text-start relative z-10">
                <div>
                  <h3 className="text-xs text-gray-400 mb-2 font-bold tracking-[0.3em] uppercase font-mono">Transmission_ID: AX-1807-X</h3>
                  <h2 className="text-neon-cyan font-ethnocentric text-4xl md:text-6xl tracking-tighter glitch-text" data-text="AXEL ZEED">AXEL ZEED</h2>
                </div>
                
                <div className="space-y-6 text-sm md:text-xl text-gray-300 leading-relaxed font-light">
                  <p>Greetings! Allow me to introduce myself. My name is Axel Zeed. You can call me Axel. I'm a Lead Researcher and Scientist Vtuber at Zeryuz Corp. I'm also a Virtual Artist and Live2D Artist. I can speak Indonesian and English fluently.</p>
                  <p className="text-neon-green font-bold text-xs md:text-lg border-l-4 border-neon-green/40 pl-6 py-4 bg-neon-green/5 italic">
                    // I make Illustrations, Character Design, Live2D Models & Rigging, Photo Manipulation, Stream Overlay, Stinger, Opening, Ending, Logo, Banner, and MV.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Role', val: 'Lead Researcher' },
                    { label: 'Location', val: 'Xapphire Island' },
                    { label: 'Status', val: 'Active' },
                    { label: 'Version', val: '3.5.2' }
                  ].map(stat => (
                    <div key={stat.label} className="border border-white/10 bg-black/60 p-4 text-center group/stat hover:border-neon-cyan transition-colors">
                      <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">{stat.label}</p>
                      <p className="text-[10px] text-neon-cyan font-bold font-ethnocentric mt-2 group-hover:scale-110 transition-transform">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="p-10 border-t-4 border-neon-green bg-dark-teal/10 hover:bg-dark-teal/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Shield size={64} className="text-neon-green" />
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-neon-green font-ethnocentric text-sm uppercase tracking-widest">WHO_AM_I?</h3>
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-mono">
                  Axel Zeed is a Lead Researcher and Scientist for Zeryuz Corporation, a pharmaceutical and tech giant based in Xapphire Island. His work focuses on the Zen.AI Large Language Model (LLM) to create the next generation of autonomous AI Assistants.
                </p>
              </div>
              
              <div className="p-10 border-t-4 border-neon-cyan bg-dark-teal/10 hover:bg-dark-teal/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Activity size={64} className="text-neon-cyan" />
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-neon-cyan font-ethnocentric text-sm uppercase tracking-widest">BIOMETRIC_PROFILE</h3>
                </div>
                <ul className="space-y-4 font-mono text-xs">
                  {[
                    ['Name', 'Axel Zeed'],
                    ['Nickname', 'Axel, Zed, Elzet, Deez'],
                    ['Age', '21'],
                    ['Height', '171 km'],
                    ['Sex', 'Not yet'],
                    ['Birthday', '18th July XXXX'],
                    ['Language', 'EN, ID, SUNDANESE'],
                    ['Zodiac', 'Cancer']
                  ].map(([k, v]) => (
                    <li key={k} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neon-cyan font-bold uppercase tracking-widest">{k}</span>
                      <span className="text-white text-right">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 02 ARCHIVE */}
          <section id="archive" className="scroll-mt-32 focusable-chunk">
            <div className="text-center mb-12 md:mb-20">
               <h2 className="font-ethnocentric text-2xl md:text-5xl mb-4 tracking-tighter uppercase">02 ARCHIVE LOGS</h2>
               <div className="w-24 md:w-32 h-1 bg-neon-cyan mx-auto"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              <HistoryCard onClick={() => openLightbox({ src: "/Assets/Axel_Ver1.png", title: "Axel v1.0 (2022)" }, 0, [])} src="/Assets/Axel_Ver1.png" version="v1.0 (2022)" description="Young human baseline form that started it all." />
              <HistoryCard onClick={() => openLightbox({ src: "/Assets/Axel_Ver2.png", title: "Axel v2.0 (2023)" }, 0, [])} src="/Assets/Axel_Ver2.png" version="v2.0 (2023)" description="Experimental build, the concept is all over the place." />
              <HistoryCard onClick={() => openLightbox({ src: "/Assets/Axel_Ver3.png", title: "Axel v3.0 (2024-2025)" }, 0, [])} src="/Assets/Axel_Ver3.png" version="v3.0 (2024-2025)" description="First successful stable version. More crafted design" />
              <HistoryCard onClick={() => openLightbox({ src: "/Assets/Axel_Ver3.5.png", title: "Axel v3.5 (2026)" }, 0, [])} src="/Assets/Axel_Ver3.5.png" version="v3.5 (2026)" description="The magnum opus as for now. The Beyond Era." isNew />
            </div>
          </section>

          {/* 03 ATTRIBUTES */}
          <section id="attributes" className="scroll-mt-32 focusable-chunk">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-ethnocentric text-2xl md:text-5xl mb-4 tracking-tighter uppercase">03 AUGMENTED ATTRIBUTES</h2>
              <p className="text-[8px] md:text-[10px] text-neon-cyan font-mono tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-50">Hardware Augmentations Report</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              <AttributeCard 
                onClick={() => openLightbox({ src: "/Assets/Axel_NEURAL.png", title: "N.E.U.R.A.L. Sync-Ring" }, 0, [])}
                src="/Assets/Axel_NEURAL.png" 
                title="N.E.U.R.A.L. Sync-Ring" 
                description="Neural Encryption & Uplink Relay for Active Loading. It acts as a primary data anchor, and its purpose is to maintain connection between Axel's brain and the Zeryuz mainframe." 
              />
              <AttributeCard 
                onClick={() => openLightbox({ src: "/Assets/Axel_AURIS.png", title: "A.U.R.I.S. Sensors" }, 0, [])}
                src="/Assets/Axel_AURIS.png" 
                title="A.U.R.I.S. Sensors" 
                description="Acoustic Utility & Radio-frequency Interference Scanner. Originally designed for audio signal cleaning, but it also acts as a radar detection that can phase through walls." 
              />
              <AttributeCard 
                onClick={() => openLightbox({ src: "/Assets/Axel_Aegis.png", title: "Z-Spec 'Aegis' Visor" }, 0, [])}
                src="/Assets/Axel_Aegis.png" 
                title="Z-Spec 'Aegis' Visor" 
                description="An advanced full-face optical interface that protects the user's consciousness from radar inferences and EMP blast and provides information through holographic UI." 
              />
              <AttributeCard 
                onClick={() => openLightbox({ src: "/Assets/Axel_XPhase.png", title: "X-Phase Manipulator" }, 0, [])}
                src="/Assets/Axel_XPhase.png" 
                title="X-Phase Manipulator" 
                description="A bio-mechanical prosthetic that allows its user to perform direct hardware overrides and manual code-injection." 
              />
              <AttributeCard 
                onClick={() => openLightbox({ src: "/Assets/Axel_LANGLEY.png", title: "L.A.N.G.L.E.Y" }, 0, [])}
                src="/Assets/Axel_LANGLEY.png" 
                title="L.A.N.G.L.E.Y" 
                description="Logic Analysis & Neural Guidance Link for Experimental Yields. A customized Zen.AI stabilizer drone tasked with monitoring its user neural output to prevent system-wide crashes during high-stress operations." 
              />
            </div>
          </section>

          {/* 04 PREFERENCES */}
          <section id="preferences" className="scroll-mt-32 focusable-chunk">
             <div className="flex items-center gap-4 mb-12 md:mb-16">
               <div className="w-1.5 h-8 md:h-10 bg-neon-cyan"></div>
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">04 Personal Preferences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-dark-teal/10 border border-white/5 p-8 hover:border-neon-cyan transition-all group">
                  <h3 className="font-ethnocentric text-xs mb-8 text-white border-b border-white/10 pb-2">PREFERENCES</h3>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <h4 className="text-neon-green font-bold text-[10px] mb-4 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={12}/> YAY</h4>
                        <ul className="space-y-2 text-xs text-gray-500 font-mono">
                           {PREFERENCES.yay.map(it => <li key={it}>// {it}</li>)}
                        </ul>
                     </div>
                     <div>
                        <h4 className="text-neon-red font-bold text-[10px] mb-4 uppercase tracking-widest flex items-center gap-2"><XCircle size={12}/> NAH</h4>
                        <ul className="space-y-2 text-xs text-gray-500 font-mono">
                           {PREFERENCES.nah.map(it => <li key={it}>// {it}</li>)}
                        </ul>
                     </div>
                  </div>
               </div>

               <div className="bg-dark-teal/10 border border-white/5 p-8 hover:border-neon-cyan transition-all group">
                  <h3 className="font-ethnocentric text-xs mb-8 text-white border-b border-white/10 pb-2">FOODS_&_DRINKS</h3>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <h4 className="text-neon-green font-bold text-[10px] mb-4 uppercase tracking-widest flex items-center gap-2"><Heart size={12}/> LIKE</h4>
                        <ul className="space-y-2 text-xs text-gray-500 font-mono">
                           {PREFERENCES.foods_like.map(it => <li key={it}>// {it}</li>)}
                        </ul>
                     </div>
                     <div>
                        <h4 className="text-neon-red font-bold text-[10px] mb-4 uppercase tracking-widest flex items-center gap-2"><XCircle size={12}/> DISLIKE</h4>
                        <ul className="space-y-2 text-xs text-gray-500 font-mono">
                           {PREFERENCES.foods_dislike.map(it => <li key={it}>// {it}</li>)}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8 p-10 bg-black/40 border border-neon-green/20 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="font-ethnocentric text-xs mb-8 text-white relative z-10 tracking-widest">HOBBIES_LOG</h3>
               <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  {PREFERENCES.hobbies.map(hobby => (
                    <span key={hobby} className={`px-4 py-2 text-[10px] font-bold font-mono border transition-all ${hobby.includes('Life Decision') ? 'border-neon-red text-neon-red hover:bg-neon-red hover:text-white' : 'border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10'}`}>
                      [ {hobby.toUpperCase()} ]
                    </span>
                  ))}
               </div>
            </div>

            {/* Protocol Preference Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
               <div className="bg-dark-teal/10 border border-neon-cyan/20 p-8">
                  <h3 className="font-ethnocentric text-xs mb-8 text-white uppercase tracking-widest">SEARCH_PROTOCOLS</h3>
                  <div className="space-y-8">
                     {SEARCH_PROTOCOLS.map((p, idx) => (
                       <div key={idx} className="flex gap-6 items-start group">
                         <img src={p.src} alt={p.title} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                         <div>
                            <h4 className={`text-sm font-bold tracking-widest mb-2 ${p.isStruck ? 'text-neon-red line-through' : 'text-neon-cyan'}`}>{p.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed font-mono">{p.desc}</p>
                         </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col gap-8">
                  <div className="bg-dark-teal/10 border border-neon-cyan/20 p-8 flex-1">
                    <h3 className="font-ethnocentric text-xs mb-8 text-white uppercase tracking-widest">WEB_BROWSERS</h3>
                    <div className="space-y-8">
                      {WEB_BROWSERS.map((b, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                          <img src={b.src} alt={b.title} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                          <div>
                             <h4 className="text-sm font-bold text-neon-cyan tracking-widest mb-2">{b.title}</h4>
                             <p className="text-xs text-gray-400 leading-relaxed font-mono">{b.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-dark-teal/10 border border-neon-green/20 p-8">
                    <h3 className="font-ethnocentric text-xs mb-8 text-neon-green uppercase tracking-widest">AI_ASSISTANTS</h3>
                    <div className="space-y-4">
                       <p className="text-xs text-gray-400 font-mono mb-4 uppercase tracking-widest">// DEPLOYED_LLM_VERSION_HISTORY</p>
                       {[
                         ['ChatGPT', 'GPT 5.4'],
                         ['Gemini', 'Gemini 3.1'],
                         ['Claude', 'Claude Sonnet 4.6']
                       ].map(([k, v]) => (
                         <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-neon-green font-bold text-[10px] font-mono tracking-widest">{">"} {k.toUpperCase()}</span>
                            <span className="text-white font-bold text-[10px] font-mono">{v}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* 05 MEDIA */}
          <section id="media" className="scroll-mt-32 focusable-chunk">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
               <div className="w-1.5 h-8 md:h-10 bg-neon-cyan"></div>
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">05 MEDIA CONSUMPTION</h2>
            </div>
            
            <MediaSlider title="Anime_Database" items={ANIME} onItemClick={(it, idx) => openLightbox(it, idx, ANIME)} />
            <MediaSlider title="TV_Relays" items={TV_SHOWS} onItemClick={(it, idx) => openLightbox(it, idx, TV_SHOWS)} accentColor="neon-green" />
            <MediaSlider title="Cinematic_Files" items={FILMS} onItemClick={(it, idx) => openLightbox(it, idx, FILMS)} />
          </section>

          {/* 06 GAMING */}
          <section id="games" className="scroll-mt-32 focusable-chunk">
            <div className="flex justify-between items-center mb-12 md:mb-16">
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">06 Gaming Index</h2>
               <div className="hidden md:flex items-center gap-3 text-neon-green/40">
                  <Zap size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Realtime_Stats_Active</span>
               </div>
            </div>

            <MediaSlider 
              title="Combat_Simulators" 
              items={GAMES_COMBAT} 
              onItemClick={(it, idx) => openLightbox(it, idx, GAMES_COMBAT)} 
              accentColor="neon-cyan"
              cardWidth="w-[220px]"
            />

            <MediaSlider 
              title="Open_World_&_Sandbox" 
              items={GAMES_OPENWORLD} 
              onItemClick={(it, idx) => openLightbox(it, idx, GAMES_OPENWORLD)} 
              accentColor="neon-cyan"
              cardWidth="w-[220px]"
            />

            <MediaSlider 
              title="Strategy_&_Gambling" 
              items={GAMES_STRATEGY} 
              onItemClick={(it, idx) => openLightbox(it, idx, GAMES_STRATEGY)} 
              accentColor="neon-green"
              cardWidth="w-[220px]"
            />

            {/* Valorant Tracker Toggle */}
            <div className="mt-16 bg-black border border-neon-cyan p-8 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan"></div>
               <h3 className="text-neon-cyan font-ethnocentric text-sm mb-6 tracking-widest uppercase">VALORANT_TRACKER_INTERFACE</h3>
               <button 
                 onClick={() => setShowValoStats(!showValoStats)}
                 className="inline-flex items-center gap-3 bg-neon-cyan text-black px-12 py-4 font-ethnocentric text-[10px] tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)]"
               >
                 {showValoStats ? 'TERMINATE_CONNECTION' : 'INITIALIZE_STATSFETCH'}
               </button>

               {showValoStats && (
                 <div className="mt-12 animate-zoom-in border-t border-white/10 pt-8">
                   <iframe 
                     src="https://tracker.gg/valorant/profile/riot/axelzeed%233090/overview"
                     className="w-full h-[800px] border-none bg-black rounded-lg shadow-2xl"
                     title="Valorant Stats"
                   />
                 </div>
               )}
            </div>
          </section>

          {/* 07 AUDIO */}
          <section id="audio" className="scroll-mt-32 focusable-chunk">
             <div className="flex items-center gap-4 mb-12 md:mb-16">
               <Music className="text-neon-cyan w-6 h-6 md:w-8 md:h-8" />
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">07 Audio Frequency DB</h2>
            </div>

            <MediaSlider title="Region_01: J-Pop" items={MUSIC_JPOP} onItemClick={(it, idx) => openLightbox(it, idx, MUSIC_JPOP)} cardWidth="w-[220px]" />
            <MediaSlider title="Region_02: International" items={MUSIC_INTERNATIONAL} onItemClick={(it, idx) => openLightbox(it, idx, MUSIC_INTERNATIONAL)} accentColor="neon-green" cardWidth="w-[220px]" />
            <MediaSlider title="Region_03: Indonesia" items={MUSIC_ID} onItemClick={(it, idx) => openLightbox(it, idx, MUSIC_ID)} cardWidth="w-[220px]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
               <div className="bg-black/80 border-l-4 border-neon-cyan p-10 hover:bg-white/5 transition-colors group">
                  <h3 className="text-neon-cyan font-ethnocentric text-xs mb-8 tracking-widest uppercase border-b border-white/10 pb-4">HONORABLE_MENTIONS</h3>
                  <ul className="space-y-4 text-xs text-gray-400 font-mono list-inside list-disc marker:text-neon-cyan">
                     {HONORABLE_MENTIONS.map((it, idx) => (
                       <li key={idx} className="hover:text-white transition-colors uppercase leading-relaxed">{it}</li>
                     ))}
                  </ul>
               </div>
               <div className="bg-black/80 border-l-4 border-neon-red p-10 hover:bg-white/5 transition-colors group">
                  <h3 className="text-neon-red font-ethnocentric text-xs mb-8 tracking-widest uppercase border-b border-white/10 pb-4">UMMM..._SECTION</h3>
                  <ul className="space-y-4 text-xs text-red-900 font-mono list-inside list-disc italic marker:text-neon-red">
                     {UMMM_SONGS.map((it, idx) => (
                       <li key={idx} className="hover:text-neon-red transition-colors uppercase leading-relaxed">{it}</li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Spotify Toggle */}
            <div className="mt-16 bg-black border border-neon-green p-8 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-neon-green"></div>
               <h3 className="text-neon-green font-ethnocentric text-sm mb-6 tracking-widest uppercase flex items-center justify-center gap-3"><PlayCircle size={20} /> Open_Audio_Node</h3>
               <button 
                 onClick={() => setShowSpotify(!showSpotify)}
                 className="inline-flex items-center gap-3 bg-neon-green text-black px-12 py-4 font-ethnocentric text-[10px] tracking-widest hover:bg-white transition-all"
               >
                 {showSpotify ? 'CLOSE_UPLINK' : 'ESTABLISH_AUDIO_RELAY'}
               </button>

               {showSpotify && (
                 <div className="mt-12 animate-zoom-in">
                    <iframe 
                      src="https://open.spotify.com/embed/playlist/692zjd1oBLg2iIWzXAfHyk?utm_source=generator"
                      className="w-full h-[450px] border-none rounded-2xl"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                 </div>
               )}
            </div>
          </section>

          {/* 08 HARDWARE */}
          <section id="hardware" className="scroll-mt-32 focusable-chunk">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
               <Cpu className="text-neon-cyan w-6 h-6 md:w-8 md:h-8" />
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">08 Hardware & Software</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-dark-teal/10 border-2 border-neon-cyan/30 p-10 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><Cpu size={128} /></div>
                <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
                  <h3 className="font-ethnocentric text-sm uppercase tracking-widest text-neon-cyan">PERSONAL_COMPUTER</h3>
                </div>
                <div className="space-y-4">
                  {HARDWARE_PC.map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:justify-between border-b border-white/5 pb-3">
                      <span className="text-[10px] text-neon-cyan font-bold font-mono uppercase tracking-widest shrink-0">{item.label}</span>
                      <span className="text-xs text-white font-mono md:text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-teal/10 border-2 border-neon-green/30 p-10 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><Laptop size={128} /></div>
                <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
                  <h3 className="font-ethnocentric text-sm uppercase tracking-widest text-neon-green">MOBILE_TERMINAL_03</h3>
                </div>
                <div className="space-y-4">
                  {HARDWARE_LAPTOP.map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:justify-between border-b border-white/5 pb-3">
                      <span className="text-[10px] text-neon-green font-bold font-mono uppercase tracking-widest shrink-0">{item.label}</span>
                      <span className="text-xs text-white font-mono md:text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 09 CARS */}
          <section id="cars" className="scroll-mt-32 focusable-chunk">
             <div className="flex items-center gap-4 mb-12 md:mb-16">
               <Car className="text-neon-cyan w-6 h-6 md:w-8 md:h-8" />
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">09 Combustion Engines</h2>
            </div>
            <p className="text-xs text-gray-400 font-mono mb-8 uppercase tracking-[0.5em]">// OH BOY, HERE WE GO.</p>

            <MediaSlider title="Hypercar_Class" items={CARS_HYPER} onItemClick={(it, idx) => openLightbox(it, idx, CARS_HYPER)} aspectRatio="square" cardWidth="w-[200px]" />
            <MediaSlider title="GT_Division" items={CARS_GT} onItemClick={(it, idx) => openLightbox(it, idx, CARS_GT)} accentColor="neon-green" aspectRatio="square" cardWidth="w-[200px]" />
            <MediaSlider title="Street_Legal_Units" items={CARS_STREET} onItemClick={(it, idx) => openLightbox(it, idx, CARS_STREET)} aspectRatio="square" cardWidth="w-[200px]" />

            <div className="mt-20 p-10 bg-dark-teal/10 border-2 border-neon-cyan/20 group">
               <h3 className="font-ethnocentric text-sm mb-12 text-white border-b border-white/10 pb-4 tracking-widest uppercase">RACING_BROADCASTS</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                  {RACING_BROADCASTS.map((r, idx) => (
                    <div key={idx} className="text-center group/race">
                       <div className="aspect-square border border-white/10 mb-3 bg-black flex items-center justify-center p-4 group-hover/race:border-neon-cyan transition-colors">
                          <img src={r.src} alt={r.title} className="max-w-full max-h-full object-contain group-hover/race:scale-110 transition-transform" />
                       </div>
                       <p className="text-[8px] font-bold font-mono text-neon-cyan uppercase tracking-widest">{r.title}</p>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          {/* 10 CREDITS */}
          <section id="credits" className="scroll-mt-32 focusable-chunk">
             <div className="flex items-center gap-4 mb-12 md:mb-16">
               <Award className="text-neon-cyan w-6 h-6 md:w-8 md:h-8" />
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">10 Credit Sequence</h2>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
               <div className="bg-dark-teal/10 border border-neon-cyan/30 p-8">
                  <h3 className="font-ethnocentric text-xs mb-8 text-white uppercase tracking-widest">TAGS</h3>
                  <ul className="space-y-6">
                    {TAGS.map((tag) => (
                      <li key={tag.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[10px] text-neon-cyan font-bold font-mono uppercase tracking-widest shrink-0">💻 {tag.label}</span>
                        <span className="text-xs text-white font-bold font-mono">{tag.value}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="lg:col-span-2 bg-dark-teal/10 border border-neon-cyan/30 p-8">
                  <h3 className="font-ethnocentric text-xs mb-8 text-white uppercase tracking-widest">CONTENTS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <ul className="space-y-3 text-xs text-neon-green font-mono">
                        {CONTENTS.left.map((c, i) => (
                           <li key={i}>{">"} {c}</li>
                        ))}
                     </ul>
                     <ul className="space-y-3 text-xs text-neon-green font-mono">
                        {CONTENTS.right.map((c, i) => (
                           <li key={i}>{">"} {c}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            <hr className="border-neon-cyan/20 mb-20" />

            <MediaSlider 
              title="CREDITS_&_COLLABORATORS" 
              items={CREDITS} 
              onItemClick={(it, idx) => openLightbox(it, idx, CREDITS)} 
              aspectRatio="square" 
              cardWidth="w-[220px]" 
            />

            {/* Gallery */}
            <div className="mt-20 p-10 bg-dark-teal/10 border-2 border-neon-cyan/30">
               <h3 className="font-ethnocentric text-sm mb-12 text-white border-b border-white/10 pb-4 tracking-widest uppercase">GALLERY_STREAMS</h3>
               <div className="flex flex-wrap justify-center gap-6">
                  {GALLERY.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img.src} 
                      alt={img.title} 
                      onClick={() => openLightbox(img, idx, GALLERY)}
                      className="h-64 object-contain border-2 border-neon-cyan/20 hover:border-neon-cyan transition-all cursor-pointer hover:scale-105" 
                    />
                  ))}
               </div>
            </div>
          </section>

          {/* 11 RELAY */}
          <section id="relay" className="scroll-mt-32 focusable-chunk">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
               <Send className="text-neon-cyan w-6 h-6 md:w-8 md:h-8" />
               <h2 className="text-xl md:text-4xl font-ethnocentric tracking-tighter uppercase">11 Feedback Relay</h2>
            </div>

            {/* Thank You Box */}
            <div className="relative overflow-hidden bg-dark-teal/20 border-2 border-neon-cyan p-12 md:p-24 text-center mb-24 group shadow-[0_0_50px_rgba(57,255,20,0.1)]">
               <div className="absolute inset-0 bg-[url('/Assets/Grid_Texture.png')] opacity-10"></div>
               <div className="relative z-10">
                 <h1 className="text-4xl md:text-7xl font-ethnocentric text-white mb-8 tracking-tighter leading-none glitch-text" data-text={`THANK_YOU_FOR_COMING`}>
                   THANK YOU FOR<br />
                   <span className="text-neon-cyan">COMING, {userData?.name.toUpperCase()}!</span>
                 </h1>
                 
                 <div className="max-w-4xl mx-auto space-y-12 animate-fade-in mt-16">
                    {userKey === 'prototype018' ? (
                       <p className="text-sm md:text-2xl text-neon-green font-mono uppercase tracking-[0.3em] animate-pulse">Welcome back, Axel. System is yours.</p>
                    ) : userKey === 'default' ? (
                       <div className="space-y-12">
                          <p className="text-xs md:text-lg text-gray-400 font-mono leading-relaxed uppercase tracking-widest">Also you can take a selfie with me! Just save this template and use it however you like! You can post it, don't forget to tag me :3</p>
                          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                            <div className="relative group/photo overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                              <img 
                                src="/Assets/Photocard_Debut.png" 
                                alt="Selfie Template" 
                                onClick={() => openLightbox({ src: "/Assets/Photocard_Debut.png", title: "Photocard Template" }, 0, [])}
                                className="w-full max-w-sm h-auto cursor-pointer group-hover/photo:scale-105 transition-transform duration-700" 
                              />
                              <div className="absolute top-4 right-4 bg-neon-cyan text-black px-3 py-1 text-[10px] uppercase">TEMPLATE_v1</div>
                            </div>
                            <div className="relative group/photo overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                              <img 
                                src="/Assets/Photocard_Debut_BG.png" 
                                alt="Selfie BG" 
                                onClick={() => openLightbox({ src: "/Assets/Photocard_Debut_BG.png", title: "Photocard Background" }, 0, [])}
                                className="w-full max-w-sm h-auto cursor-pointer group-hover/photo:scale-105 transition-transform duration-700" 
                              />
                               <div className="absolute top-4 right-4 bg-neon-cyan text-black px-3 py-1 text-[10px] uppercase">BACKGROUND_03</div>
                            </div>
                          </div>
                       </div>
                    ) : (
                       <div className="space-y-12">
                          <p className="text-xs md:text-lg text-gray-400 font-mono leading-relaxed uppercase tracking-widest">Anyway, take this photocard. It's a souvenir! You can post it, don't forget to tag me :3</p>
                          <div className="relative group/photo overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_30px_rgba(0,242,255,0.2)] inline-block">
                             <img 
                               src={userData?.img} 
                               alt="Souvenir" 
                               onClick={() => openLightbox({ src: userData?.img || '', title: "Special Souvenir" }, 0, [])}
                               className="w-full max-w-md h-auto cursor-pointer group-hover/photo:scale-105 transition-transform duration-700" 
                             />
                             <div className="absolute top-4 right-4 bg-neon-cyan text-black px-3 py-1 text-[10px] uppercase">SOUVENIR_EXCL</div>
                          </div>
                       </div>
                    )}
                 </div>
               </div>
            </div>

            <WishesForm />
          </section>

        </div>
        
        {/* Simple Footer for Debut */}
        <footer className="py-12 border-t border-white/5 text-center px-6">
           <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.5em]">©2022-2026 AXEL ZEED // ZERYUZ_CORP_PROTOCOLS</p>
        </footer>

      </main>

      <Lightbox 
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        title={lightbox.title}
        onPrev={lightbox.list.length > 1 ? () => navigateLightbox('prev') : undefined}
        onNext={lightbox.list.length > 1 ? () => navigateLightbox('next') : undefined}
        onClose={() => setLightbox({ ...lightbox, isOpen: false })}
      />

    </div>
  );
}
