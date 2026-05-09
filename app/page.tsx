import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 md:py-20 relative">

      {/* Intro Section */}
      <section className="main-content-box p-4 sm:p-6 md:p-12 mb-12 md:mb-20 animate-fade-in max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-green rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="/Assets/Main-Page-Intro.jpg"
                alt="Axel Zeed"
                className="relative w-full max-w-md shadow-[0_0_30px_rgba(0,242,255,0.15)] transition-transform duration-500 hover:scale-105"
                style={{ clipPath: 'polygon(0 8px, 100% 0, 100% calc(100% - 8px), 0 100%)' }}
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <div className="badge-system mb-6">
              WARNING: SYSTEM_EVOLUTION_IN_PROGRESS
            </div>

            <h1 className="glitch-text text-3xl sm:text-4xl md:text-6xl font-ethnocentric mb-6 tracking-tighter">
              AXEL ZEED
            </h1>

            <p className="description-text-legacy text-sm sm:text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
              Greetings! I am Axel Zeed. Lead Researcher and Scientist Vtuber from Zeryuz Corp.
              I specialize in <span className="text-neon-cyan">HMV technology</span> and digital soul virtualization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              <Link href="/portfolio" className="btn-custom text-[10px] sm:text-xs text-center">
                PORTFOLIO
              </Link>
              <a href="https://vgen.co/axel_zeed" target="_blank" rel="noopener noreferrer" className="btn-custom bg-white text-black hover:bg-gray-200 text-center text-[10px] sm:text-xs">
                VGEN
              </a>
              <Link href="/debut" className="btn-custom bg-[#198754] text-white hover:bg-[#157347] text-center text-[10px] sm:text-xs">
                DEBUT PAGE
              </Link>
              <Link href="/zeryuz" className="btn-custom bg-[#dc3545] text-white hover:bg-[#bb2d3b] text-center text-[10px] sm:text-xs">
                ZERYUZ CORP
              </Link>
            </div>

            {/* Trakteer Button */}
            <div className="trakteer-wrapper-legacy mx-auto lg:mx-0 max-w-[280px]">
              <a
                href="https://trakteer.id/axel-zeed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full p-3 bg-[#058F8B] hover:bg-[#047773] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src="https://mirror-uploads.trakteer.id/images/units/uic-SWpH0zd6mkJfiwOfSWMkzMNITxjxEWv41774500402.png"
                  alt="Trakteer"
                  className="h-10 mr-3"
                />
                <span className="text-white font-bold font-sans">Find Me in Trakteer</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ref Sheet Section */}
      <section className="animate-fade-in max-w-6xl mx-auto" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-header-tech text-base sm:text-xl md:text-2xl">00 SUBJECT REF SHEET</h2>

        <div className="relative group overflow-hidden border-2 border-neon-cyan/30 bg-dark-teal/80 p-2 shadow-[0_0_40px_rgba(0,242,255,0.1)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
          <img
            src="/Assets/Vtuber_Axel_3_5.jpg"
            alt="Axel Zeed 3.5 Ref Sheet"
            className="w-full h-auto opacity-95 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="bg-[#05161a] border-t border-neon-cyan/20 p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-[10px] sm:text-xs md:text-sm text-neon-cyan font-ethnocentric tracking-[0.1em] sm:tracking-[0.2em]">MODEL DESIGNATION: PROTOTYPE 018</span>
            <span className="text-[10px] md:text-xs text-neon-green/60 font-mono tracking-widest bg-neon-green/5 px-3 py-1 border border-neon-green/10">
              STABLE_BUILD_REV_3.5.0
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
