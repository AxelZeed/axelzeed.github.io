"use client";

import React from 'react';

interface NoteGroup {
  title: string;
  items: string[];
}

interface PriceRow {
  service: string;
  idr: string;
  usd: string;
}

const PriceTable: React.FC<{ title: string; rows: PriceRow[]; noteGroups?: NoteGroup[]; isBundle?: boolean }> = ({ title, rows, noteGroups, isBundle }) => (
  <section className={`mb-12 p-6 border-l-4 ${isBundle ? 'border-neon-green bg-neon-green/5' : 'border-neon-cyan bg-black/30'} transition-all hover:translate-x-2`}
  >
    <h2 className={`text-xl font-ethnocentric mb-6 ${isBundle ? 'text-neon-green' : 'text-neon-cyan'}`}>{title.toUpperCase()}</h2>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-neon-cyan/20 bg-neon-cyan/10">
            <th className="py-3 px-4 text-neon-green text-xs font-bold tracking-widest">SERVICE</th>
            <th className="py-3 px-4 text-neon-green text-xs font-bold tracking-widest">PRICE (IDR)</th>
            <th className="py-3 px-4 text-neon-green text-xs font-bold tracking-widest">PRICE (USD)</th>
          </tr>
        </thead>
        <tbody className="text-[10px] sm:text-xs md:text-sm">
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-2 px-2 sm:py-3 sm:px-4 text-gray-200 font-bold whitespace-normal sm:whitespace-nowrap">{row.service}</td>
              <td className="py-2 px-2 sm:py-3 sm:px-4 text-neon-cyan">{row.idr}</td>
              <td className="py-2 px-2 sm:py-3 sm:px-4 text-neon-cyan">{row.usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {noteGroups && noteGroups.length > 0 && (
      <div className="pt-4 border-t border-dashed border-neon-cyan/30 space-y-4">
        {noteGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <p className="text-xs text-neon-cyan mb-2 font-bold tracking-tighter">// {group.title.toUpperCase()}:</p>
            <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
              {group.items.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default function PricePage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 md:py-20 relative z-10 max-w-5xl">
      <div className="main-content-box p-4 sm:p-6 md:p-12 animate-fade-in" style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}>
        <h1 className="glitch-text text-2xl sm:text-3xl md:text-5xl font-ethnocentric mb-8 md:mb-12 text-center tracking-tighter">
          SERVICE PRICING
        </h1>

        <PriceTable
          title="Illustrations"
          rows={[
            { service: "Headshot", idr: "120K - 180K", usd: "$10 - $12" },
            { service: "Bust Up", idr: "180K - 240K", usd: "$12 - $15" },
            { service: "Half Body", idr: "240K - 270K", usd: "$15 - $17" },
            { service: "Upper Thigh", idr: "280K - 320K", usd: "$18 - $20" },
            { service: "Full Body", idr: "330K - 380K", usd: "$20 - $24" },
            { service: "Extra Character (Full Body Only)", idr: "300K - 360K each", usd: "$18 - $24 each" },
            { service: "Character Sheet", idr: "380K - 440K", usd: "$24 - $28" },
            { service: "Additional Assets", idr: "30K - 120K", usd: "$2 - $8" },
            { service: "Simple Background", idr: "50K - 120K", usd: "$4 - $8" },
          ]}
          noteGroups={[
            {
              title: "WHAT YOU WILL GET",
              items: [
                "JPG / PNG file for all of the necessary parts.",
                "Canvas ratio & size is customizable."
              ]
            }
          ]}
        />

        <PriceTable
          title="Emotes"
          rows={[
            { service: "1 Emote", idr: "40K", usd: "$3" },
            { service: "6 Emotes", idr: "220K", usd: "$15" },
            { service: "12 Emotes", idr: "450K", usd: "$30" },
          ]}
          noteGroups={[
            {
              title: "WHAT YOU WILL GET",
              items: [
                "JPG / PNG file for all of the necessary parts.",
                "Canvas ratio & size is customizable."
              ]
            }
          ]}
        />

        <PriceTable
          title="Live2D Models (Art Only)"
          rows={[
            { service: "Bust Up", idr: "300K - 500K", usd: "$20 - $35" },
            { service: "Half Body", idr: "550K - 800K", usd: "$35 - $50" },
            { service: "Full Body", idr: "850K - 1100K", usd: "$50 - $65" },
            { service: "Extra Character Sheet", idr: "220K - 380K each", usd: "$15 - $25 each" },
            { service: "Extra Expression", idr: "80K each", usd: "$6 each" },
            { service: "Arm Toggle", idr: "140K each", usd: "$10 each" },
            { service: "Additional Assets", idr: "70K each", usd: "$5 each" },
            { service: "Extra Outfit", idr: "150K - 280K each", usd: "$10 - $16 each" },
            { service: "Extra Hair", idr: "160K - 310K each", usd: "$10 - $18 each" },
          ]}
          noteGroups={[
            {
              title: "WHAT YOU WILL GET",
              items: [
                "PSD file containing all ready-to-rig parts.",
                "Canvas ratio usually (3000x7000).",
                "This service is creating ready-to-rig ONLY VTuber model."
              ]
            }
          ]}
        />

        <PriceTable
          title="Live2D Rigging"
          rows={[
            { service: "Bust Up", idr: "300K - 500K", usd: "$20 - $35" },
            { service: "Half Body", idr: "550K - 800K", usd: "$35 - $50" },
            { service: "Full Body", idr: "850K - 1100K", usd: "$50 - $65" },
            { service: "Extra Expression", idr: "80K each", usd: "$6 each" },
            { service: "Arm Toggle", idr: "140K each", usd: "$10 each" },
            { service: "Additional Assets", idr: "70K each", usd: "$5 each" },
            { service: "Extra Outfit", idr: "150K - 280K each", usd: "$10 - $16 each" },
            { service: "Extra Hair", idr: "160K - 310K each", usd: "$10 - $18 each" },
          ]}
          noteGroups={[
            {
              title: "WHAT YOU WILL GET",
              items: [
                "Ready to use ZIP file containing all files necessary for running the model.",
                "Fixing errors or bugs is free at any point.",
                "I provide VTube Studio set-up assistance free of charge. Just contact me if you need any help.",
                "I do not provide editable Live2D files (.cmo3)."
              ]
            },
            {
              title: "LIVE2D RIGGING DETAILS",
              items: [
                "Head and Body X, Y, Z (Left & Right Movement, Up & Down Movement, Lean Side to Side Movement).",
                "Full Face Tracking (Eyes, Brows, Nose, Mouth, Ears).",
                "Physics for All Parts (Hair, Clothes, Body, etc.).",
                "Breathing (Idle Movement).",
                "Simple Toggles (Unlimited On/Off for additional parts such as accessories on/off, hair on/off, clothes on/off, etc.).",
                "Free 4 Base Expression (You can choose yourself)."
              ]
            },
            {
              title: "NOTE",
              items: [
                "This service is creating ready-to-use only vtuber model based on ready-to-rig model that you have.",
                "This service is only rig your model. If you want to create the vtuber model, you can check my other services.",
                "File must be in high resolution with properly cut and named layers.",
                "Please make sure your artist is willing to communicate and make changes if necessary."
              ]
            }
          ]}
        />

        <PriceTable
          isBundle
          title="Full Bundle (Art + Rig)"
          rows={[
            { service: "Bust Up Bundle", idr: "1100K - 1350K", usd: "$70 - $85" },
            { service: "Half Body Bundle", idr: "1400K - 1600K", usd: "$90 - $105" },
            { service: "Full Body Bundle", idr: "1700K - 2100K", usd: "$110 - $140" },
            { service: "Extra Character Sheet", idr: "220K - 380K", usd: "$20 - $30" },
            { service: "Extra Expression", idr: "150K each", usd: "$11 each" },
            { service: "Arm Toggle", idr: "250K each", usd: "$18 each" },
            { service: "Additional Assets", idr: "140K each", usd: "$12 each" },
            { service: "Extra Outfit", idr: "250K - 400K each", usd: "$18 - $28 each" },
            { service: "Extra Hair", idr: "300K - 420K each", usd: "$20 - $30 each" },
          ]}
          noteGroups={[
            {
              title: "LIVE2D RIGGING DETAILS",
              items: [
                "Head and Body X, Y, Z (Left & Right Movement, Up & Down Movement, Lean Side to Side Movement).",
                "Full Face Tracking (Eyes, Brows, Nose, Mouth, Ears).",
                "Physics for All Parts (Hair, Clothes, Body, etc.).",
                "Breathing (Idle Movement).",
                "Simple Toggles (Unlimited On/Off for additional parts such as accessories on/off, hair on/off, clothes on/off, etc.).",
                "Free 5 Base Expression (You can choose yourself)."
              ]
            },
            {
              title: "RECOMMENDED: BEST INTEGRATION AND FUTURE UPDATES",
              items: [
                "This service is creating ready-to-use vtuber model and the rigging itself in one service.",
                "This service is recommended if you want to create your own vtuber model from scratch with a good model update integration in the future.",
                "You can do a lot of customization to your model in this service with cheaper prices compared to Live2D Model only or Live2D Rigging only."
              ]
            }
          ]}
        />

        <PriceTable
          title="Stream Overlay (Static)"
          rows={[
            { service: "1 Overlay", idr: "150K - 200K", usd: "$9 - $12" },
            { service: "Package #1 (Opening + Ending)", idr: "270K - 370K", usd: "$16 - $22" },
            { service: "Package #2 (Freetalk + Gaming)", idr: "270K - 370K", usd: "$16 - $22" },
            { service: "Package #3 (All Four)", idr: "480K - 650K", usd: "$28 - $38" },
          ]}
          noteGroups={[
            {
              title: "WHAT YOU WILL GET",
              items: [
                "JPG / PNG file for all necessary parts.",
                "16:9 ratio, customizable size."
              ]
            }
          ]}
        />

        <PriceTable
          title="Editing (Shorts / MV)"
          rows={[
            { service: "30 Second (Minimum)", idr: "60K", usd: "$6" },
            { service: "1 Minute", idr: "110K", usd: "$11" }
          ]}
          noteGroups={[
            {
              title: "WHAT YOU WILL GET",
              items: [
                "MP4 File containing the edited video.",
                "Video resolution is 1920x1080 (1080p) with 30fps."
              ]
            }
          ]}
        />

        <div className="mt-12 p-8 bg-black/50 border border-neon-green text-center" style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}>
          <h4 className="text-neon-green font-ethnocentric mb-4 tracking-widest">ACCEPTED_PAYMENT_CHANNELS</h4>
          <p className="text-gray-300 text-sm tracking-[0.2em]">
            PAYPAL // GOPAY // DANA // OVO // SHOPEEPAY // TRAKTEERID
          </p>
        </div>
      </div>
    </div>
  );
}
