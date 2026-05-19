"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

// English Data Pool
const themes_en = [
  "Magical Girl", "Sleep-Deprived", "Deep-Fried", "Sentient", "Biblically-Accurate", "Y2K-Era", "Feral", "Over-Caffeinated",
  "Eldritch", "Unpaid", "Bootleg", "Radioactive", "Cursed", "High-Fantasy", "Post-Apocalyptic", "Extremely Loud",
  "Slipper-Wielding", "Low-Battery", "Highly Suspicious", "Permanently Confused", "Dangerously Polite",
  "Low-Resolution", "Gluten-Free", "Tax-Evading", "Emotionally Constipated", "As Seen On TV", "Microwave-Safe",
  "Haunted", "Semi-Professional", "Over-Scoped"
];

const roles_en = [
  "Librarian", "Barista", "Necromancer", "Mall Security", "Mecha-Pilot", "Freelance Assassin", "Professional Guinea Pig",
  "Gacha Addict", "Shift Manager", "Sleepless Artist", "Courier", "Arcade Champion", "Bounty Hunter", "Board Game Master",
  "Math Tutor", "Cult Leader", "Fashion Designer", "Racing Driver", "Office Worker", "Cat Girl", "Street Food Vendor",
  "Professional Sleeper", "Pillow Tester", "Professional Stand-In", "Window Cleaner", "Underground Garlic Merchant",
  "Subway Musician", "Unemployed Wizard", "Fake Doctor", "Elevator Music Conductor", "Professional Apologizer"
];

const objects_en = [
  "Left Arm", "Sleep Schedule", "Common Sense", "5-Star Gacha Pull", "Last Brain Cell", "Plate of Fried Rice",
  "Mac & Cheese", "Jengkol", "Pete", "Missing Underwear", "Office Chair", "Leaky Rooftop", "Bottle of Matcha",
  "Emotional Support Mozzarella", "Fake Gold Tooth", "Half-Eaten Sausage", "Golden Slipper", "Wet Cardboard Box",
  "Broken Umbrella", "Moldy Sandwich", "A single AA battery", "A crushed soda can", "The concept of Tuesday",
  "A store receipt from 2018", "A single AirPod", "A half-melted ice cube", "A plastic fork", "A dusty VHS tape",
  "An expired coupon"
];

const incidents_en = [
  "a baking accident", "a leaky kitchen pipe", "an argument with a local goose", "a board game rage quit",
  "a legendary shitting session", "an unhandled confession rejection", "an exploding meteor", "a flying shark tornado",
  "a 24-hour karaoke stream", "a sudden neighborhood blackout", "a burning building", "an encounter with an aggressive stray dog",
  "a sneeze that ripped their pants", "getting stuck in a revolving door", "an aggressive sales pitch",
  "a failed high-five", "stubbing their pinky toe", "swallowing a bug"
];

const locations_en = [
  "the Backrooms", "the Bermuda Triangle", "the Eiffel Tower", "a local internet cafe", "a Tupperware container",
  "the bottom of an empty Khong Guan biscuit tin", "a local traditional market", "a cramped elevator", "a giant soup pot",
  "a dynamic parking lot", "a sketchy treehouse", "a bouncy castle", "a crowded commuter train", "a local DMV",
  "a forgotten browser tab", "the inside of a vending machine", "a public restroom mirror", "a dusty storage unit",
  "a crowded waiting room", "an abandoned cinema"
];

const entities_en = [
  "the local neighborhood watch", "a gang of stray cats", "the local water company", "a living box of apple juice",
  "a sketchy ice cream seller", "an angry customer", "a swarm of giant butterflies", "a herd of unpaid sheep",
  "a group of judgmental neighborhood aunties", "the Tax Office", "a rogue mannequin", "a flock of angry pigeons",
  "the spirit of a broken printer", "a group of aggressive salesmen", "the HOA president", "a sentient Wi-Fi signal",
  "a judgmental mannequin"
];

const actions_en = [
  "out-pizza the hut", "achieve 100% sync rate with a toaster", "perform a frame-perfect parry", "break the fourth wall",
  "consume radioactive energy drinks", "rant about anime endings", "scream in lowercase", "accidentally mute themselves during an argument",
  "cook instant noodles without water", "slip on a banana peel", "tetris-pack a car trunk perfectly", "swallow a whole ice cube",
  "lose an argument to a mirror", "blink in Morse code", "open a bag of chips completely silently",
  "argue with an automated voice", "step on a Lego"
];

const blueprints_en = [
  "A [Theme] [Role] who lost their [Object] in [Incident].",
  "A cursed [Object] that gained sentience and now works as a [Role] to pay off [Entity].",
  "Summoned to [Location] to defeat [Entity], but got distracted by [Object] and became a full-time [Role].",
  "A [Theme] [Role] who accidentally dropped their [Object] into [Location] while running away from [Incident].",
  "Currently wanted by [Entity] for illegally smuggling [Object] inside [Location].",
  "A [Theme] [Role] whose friends constantly dare them to [Action] until they turn into [Object].",
  "Blessed with the ability to control [Object], but every time they try to use it, they [Action].",
  "Mistaken for a god by a pack of [Entity] because they managed to [Action] using only [Object].",
  "A painfully average [Role] who hides a dark secret: they are actually a [Theme] [Entity].",
  "A deep-fried [Role] who barely survived [Incident] and now travels across [Location] searching for [Object].",
  "Expelled from [Location] for accidentally flirting with [Entity], now surviving entirely on [Object].",
  "A [Theme] [Role] who tried to bribe [Entity] with [Object] but ended up causing [Incident]."
];

// Indonesian Data Pool
const themes_id = [
  "Magical Girl", "Kurang Tidur", "Garing Banget", "Punya Perasaan", "Meresahkan", "Estetik Y2K", "Mode Reog", "Kebanyakan Nyawit",
  "Fossil Kuno", "Magang Nggak Digaji", "Hoak Parah", "Radioaktif", "Terkutuk", "Fantasi Kerajaan", "Udah Kiamat", "Bacot Banget",
  "Berpakaian Sandal Swallow", "Lowbat", "Mencurigakan", "Linglung Abadi", "Terlalu Sopan",
  "Kualitas 3GP", "Bebas Lemak", "Nunggak Pajak", "Mati Rasa", "Spek Onta Arab", "Bisa Masuk Microwave",
  "Berhantu", "Setengah Mateng", "Gak Punya Akhlak", "Kebanyakan Gaya"
];

const roles_id = [
  "Penjaga Perpus", "Barista", "Dukun Santet", "Satpam Mall", "Pilot Robot", "Pembunuh Bayaran", "Kelinci Percobaan",
  "Penggacha Ampas", "Manajer Shift", "Seniman Setengah Mati", "Kurir Paket", "Ahli Kubur", "Pemburu Jengkol", "Master Board Game",
  "Guru Les Matematika", "Pemimpin Sekte", "Desainer Baju", "Pembalap Liar", "Budak Korporat", "Kucing Garong", "Abang Gorengan",
  "Tukang Tidur Profesional", "Penguji Kasur", "Pemain Figuran", "Tukang Gosip Keliling", "Juragan Sawit",
  "Pengamen Rock", "Penyihir Pengangguran", "Dokter Palsu", "Konduktor Kereta Mainan", "Spesialis Minta Maaf"
];

const objects_id = [
  "Tangan Kiri", "Jam Tidur", "Akal Sehat", "Karakter Bintang 5", "Sel Otak Terakhir", "Sepiring Nasi Goreng",
  "Makaroni Keju", "Jengkol Mentah", "Pete", "Celana Dalam Yang Ilang", "Kursi Kantor", "Atap Bocor", "Sebotol Matcha",
  "Keju Mozzarella Basi", "Gigi Emas Palsu", "Sosis Sisa Semalem", "Sandal Swallow Emas", "Kardus Basah",
  "Payung Rusak", "Roti Jamuran", "Baterai ABC Karatan", "Kaleng Sprite Penyok", "Tupperware Emak",
  "Nota Fotokopi Tahun 2015", "AirPod Kiri Doang", "Es Batu Setengah Cair", "Garpu Plastik Lemes", "Kaset VHS Berdebu",
  "Kupon Diskon Kedaluwarsa"
];

const incidents_id = [
  "Gagal Bikin Kue", "Pipa Dapur Bocor", "Berantem Sama Angsa Pak Somat", "Ngamuk Pas Main Board Game",
  "Berak Brutal", "Ditolak Pas Nembak Gebetan", "Meteor Jatoh", "Tornado Hiu Terbang", "Live Karaoke 24 Jam",
  "Mati Lampu Satu Kampung", "Kebakaran Gedung", "Dikejar Anjing Budukan",
  "Bersin Kekencengan Sampai Celana Robek", "Kejepit Pintu Otomatis Mall", "Ditawarin Investasi Bodong",
  "Gagal Interview Kerja", "Jari Kelingking Kaki Kepentok Meja", "Ga Sengaja Nelan Lalat"
];

const locations_id = [
  "Ruangan Backrooms", "Segitiga Bermuda", "Menara Eiffel", "Warnet Pengap", "Tupperware Emak",
  "Kaleng Khong Guan Isi Rengginang", "Pasar di Gunung", "Lift Jatoh", "Panci Kuah Bakso", "Parkiran Mall",
  "Rumah Pohon Angker", "Bawah Kasur", "Ditengah Konvoi Persib", "Kantor Kelurahan",
  "WC Gelap Belum Disiram", "Didalem AC", "Toilet Umum Pom Bensin", "Gudang Bawah Tanah",
  "Ruang Tunggu BPJS", "Bioskop Tua Terbengkalai"
];

const entities_id = [
  "Bapak-Bapak Ronda", "Geng Kucing Oren", "Petugas PDAM", "Kotak Susu Basi", "Mamang Es Krim Keliling",
  "Pembeli Ngamuk", "Kecoa Raksasa", "Gerombolan Domba Birahi", "Perkumpulan Ibu-Ibu Julid",
  "Petugas Pajak Bawa Golok", "Manekin Hidup", "Merpati Lagi Kawin", "Ayam Kampus Belum Bayar UKT",
  "Sales Panci Keliling", "Mamang Garox", "Ayam Penyet Matcha", "Vtuber Tukang Drama"
];

const actions_id = [
  "By One sama Kurir", "Soulmate sama Jam Dinding", "Lari dari Kenyataan", "Menembus Dimensi Lain",
  "Minum Sawit Dosis Tinggi", "Bilang Orang Desa ga Pake Dollar", "Teriak Pake Huruf Kecil",
  "Di-mute Pas Lagi Debat", "Masak Mie Ga Pake Air", "Kepleset Kulit Pisang",
  "Main Tetris di Alat Tes Kehamilan", "Nelen Es Batu Bulet-Bulet", "Kalah Debat Sama John Cena",
  "Kedip-Kedip Pakai Kode Morse", "Buka Tutup Kaleng Pake Gigi", "Berantem Sama CS Steam",
  "Gak Sengaja Nginjek Lego"
];

const blueprints_id = [
  "Seorang [Role] [Theme] yang kehilangan [Object] saat [Incident].",
  "Sebuah [Object] terkutuk yang tiba-tiba hidup dan sekarang kerja jadi [Role] demi melunasi utang ke [Entity].",
  "Dilempar ke [Location] buat mengalahkan [Entity], tapi malah salfok sama [Object] dan berakhir jadi [Role] full-time.",
  "Seorang [Role] [Theme] yang nggak sengaja menjatuhkan [Object]-nya ke dalam [Location] pas lagi kabur dari [Incident].",
  "Lagi jadi buronan [Entity] gara-gara ketahuan menyelundupkan [Object] ke dalam [Location].",
  "Seorang [Role] [Theme] yang keseringan ditantang temannya buat [Action] sampai akhirnya berubah jadi [Object].",
  "Diberkati kekuatan buat mengendalikan [Object], tapi tiap kali kekuatannya dipakai, dia malah [Action].",
  "Disembah kayak dewa sama segerombolan [Entity] gara-gara berhasil [Action] cuma bermodalkan [Object].",
  "Seorang [Role] yang keliatannya biasa aja, tapi aslinya punya rahasia gelap: dia adalah jelmaan [Entity] [Theme].",
  "Seorang [Role] ampas yang berhasil selamat dari [Incident] dan sekarang luntang-lantung di [Location] demi mencari [Object].",
  "Diusir dari [Location] gara-gara nggak sengaja kedip matain [Entity], sekarang bertahan hidup cuma modal [Object].",
  "Seorang [Role] [Theme] yang mencoba menyuap [Entity] pakai [Object] tapi malah memicu terjadinya [Incident]."
];

const allWords_en = [...themes_en, ...roles_en, ...objects_en, ...incidents_en, ...locations_en, ...entities_en, ...actions_en];
const allWords_id = [...themes_id, ...roles_id, ...objects_id, ...incidents_id, ...locations_id, ...entities_id, ...actions_id];

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function LoreRandomizer() {
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [name, setName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [slots, setSlots] = useState<string[]>(["[----------]", "[----------]", "[----------]", "[----------]"]);
  const [finalLore, setFinalLore] = useState("");
  const exportRef = useRef<HTMLDivElement>(null);

  const resetState = (selectedLang: 'en' | 'id') => {
    setIsRevealed(false);
    setSlots(["[----------]", "[----------]", "[----------]", "[----------]"]);
    setFinalLore("");
  };

  const generateLore = () => {
    const isEn = lang === 'en';
    const blueprints = isEn ? blueprints_en : blueprints_id;
    const themes = isEn ? themes_en : themes_id;
    const roles = isEn ? roles_en : roles_id;
    const objects = isEn ? objects_en : objects_id;
    const incidents = isEn ? incidents_en : incidents_id;
    const locations = isEn ? locations_en : locations_id;
    const entities = isEn ? entities_en : entities_id;
    const actions = isEn ? actions_en : actions_id;

    let blueprint = getRandom(blueprints);

    // Tag replacement
    blueprint = blueprint.replace(/\[Theme\]/g, () => getRandom(themes));
    blueprint = blueprint.replace(/\[Role\]/g, () => getRandom(roles));
    blueprint = blueprint.replace(/\[Object\]/g, () => getRandom(objects));
    blueprint = blueprint.replace(/\[Incident\]/g, () => getRandom(incidents));
    blueprint = blueprint.replace(/\[Location\]/g, () => getRandom(locations));
    blueprint = blueprint.replace(/\[Entity\]/g, () => getRandom(entities));
    blueprint = blueprint.replace(/\[Action\]/g, () => getRandom(actions));

    // Grammar Check: 'A' vs 'An' before a vowel (Only applicable to English)
    if (isEn) {
      blueprint = blueprint.replace(/\bA\s+([AEIOUaeiou])/g, "An $1");
    }

    return blueprint;
  };

  const handleStart = () => {
    if (!name.trim() || isSpinning) return;

    setIsSpinning(true);
    setIsRevealed(false);

    const lore = generateLore();
    setFinalLore(lore);

    const duration = 1500;
    const intervalTime = 50;
    const totalTicks = duration / intervalTime;
    let ticks = 0;

    const allWords = lang === 'en' ? allWords_en : allWords_id;

    const interval = setInterval(() => {
      ticks++;

      const newSlots = [...slots];
      for (let i = 0; i < 4; i++) {
        // Sequentially stop slots from left to right
        const stopTick = (i + 1) * (totalTicks / 4);
        if (ticks < stopTick) {
          newSlots[i] = getRandom(allWords);
        } else {
          newSlots[i] = lang === 'en' ? "DONE" : "SELESAI";
        }
      }
      setSlots(newSlots);

      if (ticks >= totalTicks) {
        clearInterval(interval);
        setSlots(lang === 'en'
          ? ["[SYSTEM]", "[LORE]", "[GENERATED]", "[SUCCESS]"]
          : ["[SISTEM]", "[LORE]", "[TERBENTUK]", "[SUKSES]"]
        );
        setIsSpinning(false);
        setIsRevealed(true);
      }
    }, intervalTime);
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;

    // Ensure fonts are loaded
    await document.fonts.ready;

    try {
      const canvas = await html2canvas(exportRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      const link = document.createElement('a');
      link.download = `${name.replace(/\s+/g, '_')}_lore.jpg`;
      link.href = dataUrl;
      link.click();

      // Copy text to clipboard
      const shareText = `Somehow i get this lore : ${finalLore}. Why dont you try it yourself at axelzeed.xyz/lore_randomizer!`;
      await navigator.clipboard.writeText(shareText);
      alert(lang === 'en'
        ? "Image downloaded and share text copied to clipboard!"
        : "Gambar berhasil diunduh dan teks berbagi disalin ke papan klip!"
      );

    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  const handleXShare = () => {
    const text = `Somehow i get this lore : ${finalLore}. Why dont you try it yourself at axelzeed.xyz/lore_randomizer!`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative flex flex-col items-center">
      <h1 className="section-header-tech glitch-text mb-8 text-center text-4xl">
        {lang === 'en' ? 'The Absurd Lore Randomizer' : 'Pengacak Lore Absurd'}
      </h1>

      {/* Language Selector Toggle */}
      <div className="flex justify-end w-full max-w-2xl mb-4 relative z-20">
        <div className="bg-black/60 border border-neon-cyan/30 rounded-full p-1 flex gap-1 relative overflow-hidden">
          <button
            onClick={() => { setLang('en'); resetState('en'); }}
            className={`px-4 py-1.5 rounded-full font-ethnocentric text-xs tracking-wider transition-all duration-300 relative z-10 ${lang === 'en' ? 'text-black font-black' : 'text-neon-cyan/60 hover:text-neon-cyan'}`}
          >
            ENGLISH
          </button>
          <button
            onClick={() => { setLang('id'); resetState('id'); }}
            className={`px-4 py-1.5 rounded-full font-ethnocentric text-xs tracking-wider transition-all duration-300 relative z-10 ${lang === 'id' ? 'text-black font-black' : 'text-neon-cyan/60 hover:text-neon-cyan'}`}
          >
            INDONESIA
          </button>
          <div
            className="absolute top-1 bottom-1 bg-neon-cyan rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,242,255,0.5)]"
            style={{
              left: lang === 'en' ? '4px' : 'calc(50% + 2px)',
              width: 'calc(50% - 6px)'
            }}
          />
        </div>
      </div>

      <div className="main-content-box w-full max-w-2xl p-8 flex flex-col items-center gap-8 relative z-10">
        <div className="w-full flex flex-col gap-2">
          <label className="text-neon-cyan font-ethnocentric text-sm">[ENTER_NAME]</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSpinning}
            placeholder={lang === 'en' ? "Your Username / VTuber Name" : "Username Anda / Nama VTuber"}
            className="w-full bg-black/50 border-2 border-neon-cyan/50 text-white p-4 focus:outline-none focus:border-neon-cyan font-conthrax transition-all focus:shadow-[0_0_15px_rgba(0,242,255,0.3)] disabled:opacity-50"
          />
        </div>

        {/* Viewport Slots */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 tech-border p-4 bg-black/80">
          {slots.map((slot, i) => (
            <div key={i} className="h-20 flex items-center justify-center border border-[#00f2ff]/20 bg-[#05161a]/80 overflow-hidden relative">
              <span className={`text-center px-2 font-conthrax text-sm ${isSpinning ? 'text-[#ff3131] blur-[1px]' : 'text-neon-cyan'}`}>
                {slot}
              </span>
              {isSpinning && <div className="absolute inset-0 bg-[#00f2ff]/5 animate-pulse-slow"></div>}
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          disabled={!name.trim() || isSpinning}
          className="btn-custom w-full max-w-xs text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:scale-100 disabled:hover:bg-neon-cyan"
        >
          {isSpinning
            ? (lang === 'en' ? '[PROCESSING]' : '[MEMPROSES]')
            : (lang === 'en' ? '[RANDOMIZE]' : '[ACAK_LORE]')
          }
        </button>

        {/* Transmission Output Box */}
        {isRevealed && (
          <div className="w-full animate-slide-up flex flex-col gap-6">
            <div className="tech-border p-6 bg-black/90 relative">
              <div className="absolute -top-3 left-4 bg-black px-2 text-neon-cyan text-xs font-ethnocentric">
                {lang === 'en' ? '[TRANSMISSION_RECEIVED]' : '[TRANSMISI_DITERIMA]'}
              </div>
              <p className="text-lg md:text-xl text-white font-conthrax leading-relaxed">
                <span className="text-neon-green font-bold">{name}</span>: {finalLore}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-conthrax transition-all duration-300"
              >
                <Download size={20} />
                {lang === 'en' ? 'Download Image' : 'Unduh Gambar'}
              </button>

              <button
                onClick={handleXShare}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-conthrax transition-all duration-300"
              >
                <Share2 size={20} />
                {lang === 'en' ? 'Share on X' : 'Bagikan ke X'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Export Layout - Exactly 1200x600 as per user's image */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          ref={exportRef}
          className="relative w-[1200px] h-[600px] bg-black overflow-hidden flex flex-col justify-center px-16"
          style={{ fontFamily: 'Conthrax, sans-serif' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets/Randomizer_Card.jpg"
              alt="Card Background"
              className="w-full h-full object-cover opacity-80"
              crossOrigin="anonymous"
            />
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-16 h-16 border-2 border-[#00f2ff] bg-[#00f2ff]/20 flex items-center justify-center">
                <span className="text-[#00f2ff] font-bold text-2xl" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>AZ</span>
              </div>
              <div>
                <p className="text-xl text-[#00f2ff]" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>
                  {lang === 'en' ? 'SUBJECT LOG' : 'LOG SUBJEK'}
                </p>
                <p className="text-4xl text-white font-bold tracking-wider">{name}</p>
              </div>
            </div>

            <div className="bg-black/70 border-l-4 border-[#39ff14] p-8 mt-4 backdrop-blur-sm max-w-4xl">
              <p className="text-3xl text-gray-100 leading-relaxed">
                {finalLore}
              </p>
            </div>

            <div className="absolute bottom-12 left-16 right-16 flex justify-between items-center border-t border-[#00f2ff]/30 pt-4">
              <p className="text-lg text-[#00f2ff]" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>
                axelzeed.xyz/lore_randomizer
              </p>
              <p className="text-md text-gray-400">
                {lang === 'en' ? 'LORE GENERATION INITIATIVE' : 'INISIATIF GENERASI LORE'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
