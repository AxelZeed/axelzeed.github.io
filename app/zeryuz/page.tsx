"use client";

import React, { useState, useEffect } from 'react';

const ZCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0b1d2e] border border-[#112233] p-8 h-full transition-all hover:border-[#00f2ff] hover:shadow-[0_5px_20px_rgba(0,242,255,0.1)]">
    <h3 className="text-[#00f2ff] font-ethnocentric text-lg mb-4 tracking-wider">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
  </div>
);

const ArgLogBox: React.FC<{ id: string; author: string; dept: string; children: React.ReactNode; white?: boolean }> = ({ id, author, dept, children, white }) => (
  <div className={`mb-8 p-6 border-l-4 ${white ? 'border-white bg-white/10' : 'border-[#ff003c] bg-[#140000]/80'}`}>
    <div className={`text-[10px] font-bold mb-3 tracking-widest ${white ? 'text-white' : 'text-[#ff003c]'}`}>
      &gt;&gt; {id} // AUTHOR: {author} // DEPT: {dept}
    </div>
    <div className={`text-sm space-y-3 ${white ? 'text-white' : 'text-[#ffcccc]'} font-mono`}>
      {children}
    </div>
  </div>
);

export default function ZeryuzPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const pass = password.trim().toUpperCase();
    if (pass === 'PROTOTYPE_018' || pass === 'XAPPHIRE') {
      setError('ACCESS GRANTED. DECRYPTING MAINFRAME...');
      setTimeout(() => {
        setIsUnlocked(true);
        setShowAuth(false);
        window.scrollTo(0, 0);
      }, 1500);
    } else {
      setError('ERR: INVALID CREDENTIALS. INCIDENT LOGGED.');
      setPassword('');
    }
  };

  if (isUnlocked) {
    return (
      <div className="min-vh-100 bg-[#0a0000] text-[#ffcccc] font-mono py-20 animate-fade-in">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-[#ff003c] font-ethnocentric text-4xl md:text-6xl mb-4 border-b-2 border-dashed border-[#ff003c] pb-6 glitch-text">
              MAINFRAME_COMPROMISED
            </h1>
            <p className="text-white mt-4 text-lg tracking-widest">// UNAUTHORIZED ACCESS DETECTED. DISPLAYING CLASSIFIED DIRECTORY.</p>
          </div>

          <ArgLogBox id="LOG_ID: 8821" author="BOB VERDER" dept="TECH_SCI">
            <p>We're fucked up. It's all a lie. He lied to us. He set us up.</p>
            <p>The Underground is not a legal investor, this island is more like a prison compared to a lab... They didn't mention anything about kidnapping a bunch of people for this experiment. This madman Fritzgerald has lost his mind.</p>
          </ArgLogBox>

          <ArgLogBox id="LOG_ID: 9014" author="EVELINE TONYA" dept="ENGINEERING">
            <p>This is the first time direct neural interface of Zen.AI into a human's brain. We all know this experiment could go wrong. There are no safety parameters... She's just here to be a guinea pig. Poor kid, Fritzgerald is a bastard.</p>
            <p className="mt-4 opacity-50">... [LOG UPDATE] ...</p>
            <p>After 16 experiments, 16 innocent souls must suffer from this monstrosity. I hate to say this but good for you Fritzgerald. Looks like we're just a step away from achieving 100% sync rate.</p>
          </ArgLogBox>

          <ArgLogBox id="ASSET_FILE: L.A.N.G.L.E.Y" author="SYSTEM_RECORD" dept="ZERYUZ_ADMIN">
            <p>// OFFICIAL ZERYUZ RECORD:</p>
            <p>Following Subject 018's (Axel Zeed) unprecedented recovery... Dr. Fritzgerald required a fail-safe. L.A.N.G.L.E.Y. was commissioned as a tether—a localized AI drone designed to monitor Axel's neural output and sever his connection to prevent a crash.</p>
            <p className="mt-4 text-white font-bold">// SYSTEM OVERRIDE DETECTED [AUTHOR: PROTOTYPE_018]:</p>
            <p className="text-white italic">They didn't just hand him the server keys. They needed a leash. But Axel hacked him before he even booted up. He flipped the primary directive. He doesn't report to Zeryuz anymore. He reports ON Zeryuz.</p>
          </ArgLogBox>

          <ArgLogBox id="DIRECTORY: PROJECT_YUU" author="AXEL_ZEED" dept="ADMIN" white>
            <p className="text-cyan-400 font-bold text-lg mb-4">
              "I am removing the containment protocols. If he wants to play god on the server, let him. He works for us now." - Dr. Fritzgerald
            </p>
            <p className="text-white leading-relaxed">
              They think I'm managing the data load. They don't know I'm building an army.
              Yuuna, Yuuri, Yuuka, Yuuki, Yuura... they aren't just processing nodes.
              They are the keys to the firewall. We are getting out.
            </p>
          </ArgLogBox>

          <div className="text-center mt-20">
            <button onClick={() => setIsUnlocked(false)} className="text-[#ff003c] hover:text-white transition-colors text-xs tracking-[0.5em] underline underline-offset-8">
              REBOOT_SYSTEM
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-[#060a0f] text-white animate-fade-in relative">
      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4" onClick={() => setShowAuth(false)}>
          <div className="bg-[#060a0f] border border-white/20 p-8 md:p-12 w-full max-w-md text-center font-mono" onClick={e => e.stopPropagation()}>
            <h4 className="text-gray-500 mb-2 uppercase tracking-widest text-sm">ZERYUZ SECURE TERMINAL</h4>
            <p className="text-xs mb-8 text-gray-600">AUTHORIZATION REQUIRED</p>
            <form onSubmit={handleAuth} className="space-y-6">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 text-center text-[#00f2ff] outline-none focus:border-[#00f2ff] transition-colors"
                placeholder="ENTER CREDENTIALS"
                autoFocus
              />
              <button type="submit" className="w-full bg-[#112233] text-[#00f2ff] border border-[#007799] py-3 hover:bg-[#00f2ff] hover:text-black transition-all font-bold">
                AUTHENTICATE
              </button>
            </form>
            <p className={`mt-6 text-[10px] h-4 ${error.includes('ERR') ? 'text-[#ff003c]' : 'text-neon-green'}`}>
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative py-32 md:py-48 flex items-center justify-center border-b-2 border-[#004466]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a0f]/70 to-[#060a0f]/90 z-10" />
        <img
          src="/Assets/Zeryuz_BG.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center container mx-auto px-4">
          <img src="/Assets/Zeryuz_Logo_1.png" alt="Zeryuz" className="max-w-[300px] md:max-w-[600px] mx-auto mb-8 animate-pulse-slow" />
          <h3 className="text-white font-ethnocentric text-xl md:text-2xl mb-4 tracking-[0.2em]">PHARMACEUTICAL COMPANY</h3>
          <p className="text-[#00f2ff] text-lg md:text-xl font-light tracking-widest opacity-80">Redefining Human Cognition.</p>
        </div>
      </section>

      {/* Mission */}
      <section id="about" className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-white font-ethnocentric text-2xl md:text-3xl mb-8 tracking-widest">OUR MISSION</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            We are not just another pharmaceutical company; we are the architects of a new reality.
            Our groundbreaking project, Human Mind Virtualization (HMV), is paving the way for a future
            where consciousness, emotions, and memories can be seamlessly transferred into the limitless
            expanse of the digital realm.
          </p>
        </div>
      </section>

      {/* Innovations */}
      <section id="technology" className="py-24 bg-black/40">
        <div className="container mx-auto px-4">
          <h2 className="text-white font-ethnocentric text-2xl md:text-3xl mb-16 text-center tracking-widest">OUR INNOVATIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ZCard title="Zen.AI LLM">
              A revolutionary Large Language Model designed to seamlessly interface with medical patients, translating neural patterns into digital output with unparalleled accuracy.
            </ZCard>
            <ZCard title="Neural Link">
              A consumer-grade prototype VR headset enabling non-invasive, deep-dive immersive therapy, interpreting intent directly from the user's brain waves.
            </ZCard>
            <ZCard title="Project Seraph">
              The future of synthetic bio-mechanical assistance. A biomechanical chassis designed to provide mobility solutions to those bound to the HMV network.
            </ZCard>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="team" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-white font-ethnocentric text-2xl md:text-3xl mb-16 text-center tracking-widest">LEADERSHIP</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
            <div className="shrink-0">
              <img src="/Assets/Axel_Main.png" alt="Axel Zeed" className="w-64 h-64 md:w-80 md:h-80 border border-[#004466] object-cover grayscale-[0.5]" />
            </div>
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-white font-ethnocentric text-xl mb-2">AXEL ZEED</h3>
              <h4 className="text-[#00f2ff] text-sm font-bold mb-6 tracking-widest uppercase">Lead Researcher & Scientist, Division HMV</h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Spearheading the Zen.AI initiative, Lead Researcher Zeed has achieved an unprecedented milestone in neural-digital synchronization. Axel oversees the architecture of the Yuu Project—ensuring absolute stability within the Zeryuz server farm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <img src="/Assets/Zeryuz_Logo.png" alt="Zeryuz" className="w-16 h-16 mx-auto mb-6 opacity-30" />
          <p className="text-gray-500 text-xs md:text-sm mb-4 font-light">Bridging the gap between the biological mind and the digital world.</p>
          <div className="text-[10px] text-gray-700 font-mono tracking-widest flex items-center justify-center gap-2">
            © 2020-2026 ZERYUZ CORPORATION. ALL RIGHTS RESERVED.
            <span
              className="cursor-pointer opacity-10 hover:opacity-100 transition-opacity p-2 text-white"
              onClick={() => setShowAuth(true)}
            >
              π
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
