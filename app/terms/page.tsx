"use client";

import React from 'react';

const TermsSection: React.FC<{ title: string; children: React.ReactNode; borderColor?: string }> = ({ title, children, borderColor }) => (
  <section
    className={`mb-8 md:mb-12 p-4 sm:p-6 md:p-8 bg-black/40 border-2 ${borderColor || 'border-neon-cyan/30'} transition-all hover:bg-black/60 hover:border-neon-cyan relative`}
    style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}
  >
    <h2 className="section-header-tech mb-8 inline-block">{title.toUpperCase()}</h2>
    <div className="text-gray-300 space-y-4">
      {children}
    </div>
  </section>
);

const ProtocolList: React.FC<{ items: string[]; type?: 'accept' | 'restrict' }> = ({ items, type }) => (
  <ul className="space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
        <span className={type === 'restrict' ? 'text-neon-red' : 'text-neon-green'}>
          {type === 'restrict' ? '!' : '>'}
        </span>
        <span className="leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

export default function TermsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 md:py-20 relative z-10 max-w-6xl">
      <div className="main-content-box p-4 sm:p-6 md:p-12 animate-fade-in" style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 100%, 1% 99%)' }}>
        <h1 className="glitch-text text-2xl sm:text-3xl md:text-5xl font-ethnocentric mb-8 md:mb-12 text-center tracking-tighter">
          TERMS OF SERVICE
        </h1>

        {/* 01 GENERAL INFORMATION */}
        <TermsSection title="01_General_Information">
          <div className="text-neon-cyan font-bold leading-relaxed mb-6 space-y-2 text-sm">
            <p>// By commissioning Me, you agree to these neural-binding terms. Violations result in immediate blacklisting from future commission.</p>
            <p>// Base prices are starting points. Final complexity dictates total credit consumption.</p>
            <p>// For pricing details, contact me via:</p>
            <div className="pl-4 mt-2 font-mono text-white">
              <p>X : @axel_zeed</p>
              <p>IG : @axel_zeed</p>
              <p>DC : axelzeed</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-neon-green/5 border border-neon-green rounded-sm">
              <h3 className="text-neon-green font-bold mb-4 tracking-widest text-sm">ACCEPTED_PROTOCOLS</h3>
              <ProtocolList items={[
                "Female / Male (Young, Adult)",
                "Humanoid characters (Human, Elf, etc.)",
                "Simple objects & weapons",
                "NSFW (Nudity) & Slight gore"
              ]} />
            </div>
            <div className="p-6 bg-neon-red/5 border border-neon-red rounded-sm">
              <h3 className="text-neon-red font-bold mb-4 tracking-widest text-sm">RESTRICTED_DATA</h3>
              <ProtocolList type="restrict" items={[
                "Mecha & Armor",
                "Furry / Animals & Elderly characters",
                "AI-generated images",
                "NFT / Crypto-related content"
              ]} />
            </div>
          </div>
        </TermsSection>

        {/* 02 ILLUSTRATION USAGE */}
        <TermsSection title="02_Illustration_Usage">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Terms of Use</h3>
              <p className="text-xs text-neon-cyan mb-2 font-bold">// Non-Commercial</p>
              <ul className="text-xs text-gray-400 space-y-2 mb-4 list-disc pl-4">
                <li>Crediting me is optional but highly appreciated (@axel_zeed on social media).</li>
                <li>You may not resell or claim the artwork as your own.</li>
                <li>I may showcase the artwork/WIPs unless requested otherwise.</li>
                <li>NFTs, cryptocurrency, AI training, and other commercial exploitation are prohibited.</li>
              </ul>
              <p className="text-xs text-neon-red mb-2 font-bold">// Commercial: 2x Rate</p>
              <ul className="text-xs text-gray-400 space-y-2 mb-4 list-disc pl-4">
                <li>Prices are 2x the non-commercial rate.</li>
                <li>You must credit me (@axel_zeed on social media) wherever the artwork is used.</li>
                <li>You may not claim ownership of the artwork.</li>
                <li>I reserve the right to showcase the final work, but WIPs will remain private unless requested otherwise.</li>
              </ul>
              <p className="text-xs text-neon-red font-bold">// No reselling. No AI training allowed.</p>
            </div>
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Payment & Revisions</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>50% deposit required upfront before any works begin and after the commission details are finalized.</li>
                <li>After approval of the sketch and WIP, the remaining 50% must be paid before I continue.</li>
                <li>Unlimited revisions during the sketch phase.</li>
                <li>Two free minor revisions after sketch approval (lineart, coloring).</li>
                <li>Major changes (pose, character design, composition) incur additional fees.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Deadline</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>Completion time: 1 - 3 weeks (depending on complexity).</li>
                <li>Projects are handled based on my Trello waiting list.</li>
                <li>Faster delivery is available at +1.5x the final price.</li>
                <li>If the client fails to respond to updates for 14 consecutive days without prior notice, the commission will be paused. After 30 days of no contact, the project is considered abandoned. No refunds will be issued for abandoned projects, and resuming the work will require a restart fee (extra 50% payment).</li>
              </ul>
              <div className="mt-4">
                <span className="text-xs text-neon-cyan font-bold tracking-widest cursor-pointer hover:underline">View_Trello_Queue &gt;</span>
              </div>
            </div>
          </div>
        </TermsSection>

        {/* 03 LIVE2D MODEL & RIGGING */}
        <TermsSection title="03_Live2D_Model_Rigging" borderColor="border-neon-cyan">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Terms of Use</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>Live2D models are commercial by default. No extra commercial fees.</li>
                <li>Proper crediting (@axel_zeed) is required on all platforms.</li>
                <li>You own the model's IP, but I may use it for portfolio and promotional purposes.</li>
                <li>Reselling the model file is prohibited without permission.</li>
                <li>NFTs, cryptocurrency, and AI training usage are prohibited.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Payment & Revisions</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>50% deposit required upfront before any works begin and after the commission details are finalized.</li>
                <li>Final 50% payment is required after approving the sketch and WIP.</li>
                <li>Live2D Models: Unlimited revisions during the sketch phase.</li>
                <li>Two free minor revisions (lineart, coloring).</li>
                <li>Live2D Rigging: Three free minor revisions (movement tweaks, small details).</li>
                <li>Major changes (pose, design, rigging) incur extra fees.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Deadline</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>Completion time: 2 - 8 weeks, depending on complexity.</li>
                <li>Faster delivery available at +1.5x the final price.</li>
                <li>If the client fails to respond to updates for 14 consecutive days without prior notice, the commission will be paused. After 30 days of no contact, the project is considered abandoned. No refunds will be issued for abandoned projects, and resuming the work will require a restart fee (extra 50% payment).</li>
              </ul>
              <p className="text-xs text-neon-cyan mt-4 font-bold">// Deadline: 2 - 8 weeks per subject.</p>
            </div>
          </div>
        </TermsSection>

        {/* 04 STREAM OVERLAY */}
        <TermsSection title="04_Stream_Overlay" borderColor="border-neon-cyan">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Terms of Use & Payment</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>Overlays are commercial by default (no extra fees).</li>
                <li>Proper credit (@axel_zeed) is required.</li>
                <li>Reselling overlays is prohibited without permission.</li>
                <li>NFTs, cryptocurrency, and AI training usage are prohibited.</li>
                <li>To protect your debut/rebrand, WIPs and final products will not be posted publicly until 30 days after completion, unless you give me permission to post earlier.</li>
                <li>50% deposit required upfront, final 50% after draft approval.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-neon-green font-bold mb-4 text-sm uppercase">Revisions & Deadline</h3>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>Unlimited revisions during the rough draft phase.</li>
                <li>Two free minor revisions after draft approval.</li>
                <li>Major changes (concept or composition) incur extra fees.</li>
                <li>Completion time: 1 - 2 weeks, depending on order size.</li>
                <li>Faster delivery available at +1.5x the final price.</li>
                <li>If the client fails to respond to updates for 14 consecutive days without prior notice, the commission will be paused. After 30 days of no contact, the project is considered abandoned. No refunds will be issued for abandoned projects, and resuming the work will require a restart fee (extra 50% payment).</li>
              </ul>
            </div>
          </div>
        </TermsSection>

        {/* 05 REFUND POLICY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="p-8 border-2 border-neon-red bg-neon-red/5" style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}>
            <h2 className="section-header-tech mb-6 !bg-neon-red/20 inline-block">05_REFUND_POLICY</h2>
            <ProtocolList type="restrict" items={[
              "Full refund is only available if the sketching/production phase has not yet begun.",
              "Deposits are non-refundable once work begins.",
              "Partial refunds may be granted based on progress.",
              "I reserve right to terminate if TOS is breached."
            ]} />
          </section>
          <div className="p-8 border-2 border-neon-green bg-neon-green/5 flex flex-col justify-center items-center text-center" style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}>
            <h4 className="text-neon-green font-ethnocentric text-2xl mb-4 glitch-text">SYSTEM_READY</h4>
            <p className="text-gray-400 text-sm mb-2">Feel free to contact me.</p>
            <p className="text-neon-cyan font-mono text-xs">axelzeed // 2026</p>
          </div>
        </div>

        {/* 06 CONTACT */}
        <TermsSection title="06_Contact_Communication">
          <div className="flex flex-wrap gap-4 mt-2">
            <a href="https://twitter.com/axel_zeed" target="_blank" className="btn-custom text-xs !py-2">X_@AXEL_ZEED</a>
            <a href="https://www.instagram.com/axel_zeed/" target="_blank" className="btn-custom text-xs !py-2">IG_@AXEL_ZEED</a>
            <a href="#" className="btn-custom text-xs !py-2">DC_AXELZEED</a>
          </div>
          <p className="text-xs text-gray-500 mt-6">// Please review these terms carefully before commissioning. Contact me if you have any questions.</p>
        </TermsSection>
      </div>
    </div>
  );
}

