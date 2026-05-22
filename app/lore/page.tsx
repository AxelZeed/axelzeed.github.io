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
  "Haunted", "Semi-Professional", "Over-Scoped", "Extremely Rich", "Extremely Poor",
  "Aura Farmer", "Based", "Delulu", "Sus", "Max-Level", "Unspoken", "Looksmaxxing", "Vibe-Checked", "Gaslit", "Girlboss", "Sigma"
];

const roles_en = [
  "Librarian", "Barista", "Necromancer", "Mall Security", "Mecha-Pilot", "Freelance Assassin", "Professional Guinea Pig",
  "Gacha Addict", "Shift Manager", "Sleepless Artist", "Courier", "Arcade Champion", "Bounty Hunter", "Board Game Master",
  "Math Tutor", "Cult Leader", "Fashion Designer", "Racing Driver", "Office Worker", "Cat Girl", "Street Food Vendor",
  "Professional Sleeper", "Pillow Tester", "Professional Stand-In", "Window Cleaner", "Underground Garlic Merchant",
  "Subway Musician", "Unemployed Wizard", "Fake Doctor", "Elevator Music Conductor", "Professional Apologizer",
  "Gooner", "Edgelord", "Discord Kitten", "iPad Baby", "Faded Ahh CEO", "Professional Hater", "Keyboard Warrior", "Yapper"
];

const objects_en = [
  "Left Arm", "Sleep Schedule", "Common Sense", "5-Star Gacha Pull", "Last Brain Cell", "Plate of Fried Rice",
  "Mac & Cheese", "Jengkol", "Pete", "Missing Underwear", "Office Chair", "Leaky Rooftop", "Bottle of Matcha",
  "Emotional Support Mozzarella", "Fake Gold Tooth", "Half-Eaten Sausage", "Golden Slipper", "Wet Cardboard Box",
  "Broken Umbrella", "Moldy Sandwich", "A single AA battery", "A crushed soda can", "The concept of Tuesday",
  "A store receipt from 2018", "A single AirPod", "A half-melted ice cube", "A plastic fork", "A dusty VHS tape",
  "An expired coupon",
  "Invisible Boat Mobile", "Death Star", "Krabby Patty", "Michael Jackson", "Roblox Parkour Map", "Suspicious Browser History"
];

const incidents_en = [
  "a baking accident", "a leaky kitchen pipe", "an argument with a local goose", "a board game rage quit",
  "a legendary shitting session", "an unhandled confession rejection", "an exploding meteor", "a flying shark tornado",
  "a 24-hour karaoke stream", "a sudden neighborhood blackout", "a burning building", "an encounter with an aggressive stray dog",
  "a sneeze that ripped their pants", "getting stuck in a revolving door", "an aggressive sales pitch",
  "a failed high-five", "stubbing their pinky toe", "swallowing a bug", "getting a new iPhone",
  "getting Rizzed", "failing a vibe check", "losing their gooning streak", "getting cancelled on Twitter", "trying to out-pizza the hut", "posting cringe"
];

const locations_en = [
  "the Backrooms", "the Bermuda Triangle", "the Eiffel Tower", "a local internet cafe", "a Tupperware container",
  "the bottom of an empty Khong Guan biscuit tin", "a local traditional market", "a cramped elevator", "a giant soup pot",
  "a dynamic parking lot", "a sketchy treehouse", "a bouncy castle", "a crowded commuter train", "a local bar",
  "a forgotten browser tab", "the inside of a vending machine", "a public restroom mirror", "a dusty storage unit",
  "a crowded waiting room", "an abandoned cinema", "a haunted Minecraft server",
  "Ohio", "Tilted Towers", "a random Discord server", "the TikTok FYP", "a Roblox obby"
];

const entities_en = [
  "the local neighborhood watch", "a gang of stray cats", "the local water company", "a living box of apple juice",
  "a sketchy ice cream seller", "an angry customer", "a swarm of giant butterflies", "a herd of unpaid sheep",
  "a group of judgmental neighborhood aunties", "the Batman", "a rogue mannequin", "a flock of angry pigeons",
  "the spirit of a broken printer", "a group of aggressive salesmen", "the president of the United States", "a sentient Wi-Fi signal",
  "a judgmental mannequin", "a living box of apple juice", "a real-life anime villain"
];

const actions_en = [
  "out-pizza the hut", "achieve 100% sync rate with a toaster", "perform a frame-perfect parry", "break the fourth wall",
  "consume radioactive energy drinks", "rant about anime endings", "scream in lowercase", "accidentally mute themselves during an argument",
  "cook instant noodles without water", "slip on a banana peel", "tetris-pack a car trunk perfectly", "swallow a whole ice cube",
  "lose an argument to a mirror", "blink in Morse code", "open a bag of chips completely silently",
  "argue with an automated voice", "step on a Lego", "trip over literally nothing"
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
  "Berhantu", "Setengah Mateng", "Gak Punya Akhlak", "Kebanyakan Gaya",
  "Asli Ngawi", "Cegil", "FOMO", "Starboy", "Red Flag", "Menyala", "Ilmu Padi", "Puh Sepuh", "Pick-Me", "Paling Edgy", "Agak Laen"
];

const roles_id = [
  "Penjaga Perpus", "Barista", "Dukun Santet", "Satpam Mall", "Pilot Robot", "Pembunuh Bayaran", "Kelinci Percobaan",
  "Penggacha Ampas", "Manajer Shift", "Seniman Setengah Mati", "Kurir Paket", "Ahli Kubur", "Pemburu Jengkol", "Master Board Game",
  "Guru Les Matematika", "Pemimpin Sekte", "Desainer Baju", "Pembalap Liar", "Budak Korporat", "Kucing Garong", "Abang Gorengan",
  "Tukang Tidur Profesional", "Penguji Kasur", "Pemain Figuran", "Tukang Gosip Keliling", "Juragan Sawit",
  "Pengamen Rock", "Penyihir Pengangguran", "Dokter Palsu", "Konduktor Kereta Mainan", "Spesialis Minta Maaf",
  "Mas Ambatukam", "Admin Judol", "Bocil Epep", "Kang Seblak", "Kang Galon", "Suhu", "Sadboy", "Ketua Jomok", "Beban Keluarga"
];

const objects_id = [
  "Tangan Kiri", "Jam Tidur", "Akal Sehat", "Karakter Bintang 5", "Sel Otak Terakhir", "Sepiring Nasi Goreng",
  "Makaroni Keju", "Jengkol Mentah", "Pete", "Celana Dalam Yang Ilang", "Kursi Kantor", "Atap Bocor", "Sebotol Matcha",
  "Keju Mozzarella Basi", "Gigi Emas Palsu", "Sosis Sisa Semalem", "Sandal Swallow Emas", "Kardus Basah",
  "Payung Rusak", "Roti Jamuran", "Baterai ABC Karatan", "Kaleng Sprite Penyok", "Tupperware Emak",
  "Nota Fotokopi Tahun 2015", "AirPod Kiri Doang", "Es Batu Setengah Cair", "Garpu Plastik Lemes", "Kaset VHS Berdebu",
  "Kupon Diskon Kedaluwarsa",
  "Ayam Goreng Fried Chicken", "Es Teh Solo", "Akun Smurf", "Sendal Jepit Putus", "Kopi Kenangan", "Teh Matcha", "Sempak Emas", "Helm Bogo"
];

const incidents_id = [
  "Gagal Bikin Kue", "Pipa Dapur Bocor", "Berantem Sama Angsa Pak Somat", "Ngamuk Pas Main Board Game",
  "Berak Brutal", "Ditolak Pas Nembak Gebetan", "Meteor Jatoh", "Tornado Hiu Terbang", "Live Karaoke 24 Jam",
  "Mati Lampu Satu Kampung", "Kebakaran Gedung", "Dikejar Anjing Budukan",
  "Bersin Kekencengan Sampai Celana Robek", "Kejepit Pintu Otomatis Mall", "Ditawarin Investasi Bodong",
  "Gagal Interview Kerja", "Jari Kelingking Kaki Kepentok Meja", "Ga Sengaja Nelan Lalat",
  "kena mental", "di-ghosting pas sayang-sayangnya", "ketahuan pake pinjol", "disleding emak", "ditunjuk jadi petugas SPPG", "nyangkut di mobil MBG"
];

const locations_id = [
  "Ruangan Backrooms", "Segitiga Bermuda", "Menara Eiffel", "Warnet Pengap", "Tupperware Emak",
  "Kaleng Khong Guan Isi Rengginang", "Pasar di Gunung", "Lift Jatoh", "Panci Kuah Bakso", "Parkiran Mall",
  "Rumah Pohon Angker", "Bawah Kasur", "Ditengah Konvoi Persib", "Kantor Kelurahan",
  "WC Gelap Belum Disiram", "Didalem AC", "Toilet Umum Pom Bensin", "Gudang Bawah Tanah",
  "Ruang Tunggu BPJS", "Bioskop Tua Terbengkalai",
  "Lahan Sawit", "Warung Nasi Cumi Hitam Pak Kris", "Tongkrongan Jomok", "Kosan Temen", "Bawah Jembatan", "Pos Ronda"
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

// Hashing and Seeded PRNG Logic
function cyrb128(str: string): [number, number, number, number] {
  let h1 = 1779033703, h2 = 3024733165, h3 = 3362453611, h4 = 502494848;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

function sfc32(a: number, b: number, c: number, d: number): () => number {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  }
}

function getPRNG(seedStr: string): () => number {
  const seed = cyrb128(seedStr);
  return sfc32(seed[0], seed[1], seed[2], seed[3]);
}

const getSeededRandom = (arr: any[], prng: () => number) => {
  return arr[Math.floor(prng() * arr.length)];
};

// RPG Stats Definitions
interface RpgStats {
  absurdity: number;
  threat: number;
  chaos: number;
  uniqueness: number;
  aura: number;
  survival: number;
}

function generateRpgStats(seedStr: string): RpgStats {
  const absurdity = Math.round(getPRNG(seedStr + "_Absurdity")() * 100);
  const threat = Math.round(getPRNG(seedStr + "_Threat")() * 100);
  const chaos = Math.round(getPRNG(seedStr + "_Chaos")() * 100);
  const uniqueness = Math.round(getPRNG(seedStr + "_Uniqueness")() * 100);
  const aura = Math.round(getPRNG(seedStr + "_Aura")() * 100);
  const survival = Math.round(getPRNG(seedStr + "_Survival")() * 100);
  return { absurdity, threat, chaos, uniqueness, aura, survival };
}

// Synergy Verdict Variations
const synergyVerdicts_en = [
  { max: 20, text: "Mortal Enemies. Keep them separated before they actually throw hands." },
  { max: 20, text: "Negative Aura energy. They literally flashbang each other's vibe on sight." },
  { max: 20, text: "Absolute ops. The universe is actively praying for their immediate downfall." },
  { max: 20, text: "Mutual destruction is coming. Someone please check their weapons." },

  { max: 40, text: "Awkward Coworkers. They fight over the last slice of pizza." },
  { max: 40, text: "Strictly professional (they talk mad trash behind each other's back)." },
  { max: 40, text: "Major side-eye vibes. The silence between them is actually deafening." },
  { max: 40, text: "NPC interaction. They both just want to run away from the conversation." },

  { max: 60, text: "Aggressive co-existence. They'll survive, but with minor psychological injuries." },
  { max: 60, text: "Perfect dynamic for a sitcom, but terrible for real-life sanity." },
  { max: 60, text: "They share exactly one brain cell and it's currently on standby mode." },
  { max: 60, text: "Mid-tier alliance. They will team up only if there is free food involved." },

  { max: 80, text: "Chaotic Duo. They definitely hide bodies together on the weekend." },
  { max: 80, text: "Unspoken telepathy. They can communicate entirely in deep fried memes." },
  { max: 80, text: "Partner in crime. They are a literal public hazard when unsupervised." },
  { max: 80, text: "Max level besties. Loud enough to wake up an ancient eldritch god." },

  { max: 100, text: "Unstoppable Force. Just pack your bags and move from Earth at this point." },
  { max: 100, text: "Main character energy squared. Everyone is just a background NPC." },
  { max: 100, text: "Infinite Aura. They are literally the exact same disaster." },
  { max: 100, text: "International Fugitive. They are wanted in 20 countries." },
];

const synergyVerdicts_id = [
  { max: 20, text: "Mending dipisah, pasti gelud terus demi validasi netizen." },
  { max: 20, text: "Energi toxic-nya tembus layar. Udah kayak liat turnamen adu mekanik." },
  { max: 20, text: "Fix musuh bebuyutan. Baru papasan aja batinnya udah saling nge-report." },
  { max: 20, text: "Dua-duanya ego setinggi gedung DPR, mending jangan disatuin." },

  { max: 40, text: "Agak awkward dikit. Ada aja masalah yang didebatin." },
  { max: 40, text: "Vibenya dingin bet. Ngobrol cuma pas mau pinjem kabel charger." },
  { max: 40, text: "Saling gengsi tingkat kabupaten. Pengen akrab tapi gengsinya setinggi langit." },
  { max: 40, text: "Interaksi batin yang macet. Komunikasi pake bahasa isyarat karena bingung mau ngomong apa." },

  { max: 60, text: "Duo setengah mateng. Kadang kompak, kadang bikin elus dada sepanjang hari." },
  { max: 60, text: "Cocok jadi temen kosan ampas yang suka maling indomie satu sama lain." },
  { max: 60, text: "Satu frekuensi tapi jaringannya lemot. Kalo ngobrol loading nya agak lama." },
  { max: 60, text: "Baru akur kalo ada gratisan. Kompak kalo dua duanya sama sama pengen sesuatu." },

  { max: 80, text: "Duo paling gelo. Gabisa dipisahin, sekali bareng langsung bikin panitia kelabakan." },
  { max: 80, text: "Udah kaya Thomas Alfa Edi Sound. Saking berisiknya udah jadi Horeg." },
  { max: 80, text: "Dua orang stress bareng. Sekali kumpul langsung bubar acara." },
  { max: 80, text: "Udah sehati sejiwa. Gausah ngomong lagi tinggal baca pikiran masing masing." },

  { max: 100, text: "Nempel mulu, kalo kurang salah satu pasti dunia berasa ga lengkap." },
  { max: 100, text: "Saking sering nempel udah dikira kembar.." },
  { max: 100, text: "Udah kaya paket Happy Meals, pasti munculnya berdua mulu.." },
];

function getSynergyVerdict(loreA: string, loreB: string, percentage: number, lang: 'en' | 'id'): string {
  const isEn = lang === 'en';
  const verdicts = isEn ? synergyVerdicts_en : synergyVerdicts_id;

  let max = 100;
  if (percentage <= 20) { max = 20; }
  else if (percentage <= 40) { max = 40; }
  else if (percentage <= 60) { max = 60; }
  else if (percentage <= 80) { max = 80; }
  else { max = 100; }

  const candidates = verdicts.filter(v => v.max === max);
  const prng = getPRNG(loreA + "+" + loreB + "_verdict");
  const verdictObj = getSeededRandom(candidates, prng);

  return verdictObj.text;
}

export default function LoreRandomizer() {
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [mode, setMode] = useState<'solo' | 'synergy'>('solo');

  // States for Solo & Subject A
  const [nameA, setNameA] = useState('');
  const [loreA, setLoreA] = useState('');
  const [statsA, setStatsA] = useState<RpgStats | null>(null);
  const [slotsA, setSlotsA] = useState<string[]>(["[----------]", "[----------]", "[----------]", "[----------]"]);

  // States for Subject B
  const [nameB, setNameB] = useState('');
  const [loreB, setLoreB] = useState('');
  const [statsB, setStatsB] = useState<RpgStats | null>(null);
  const [slotsB, setSlotsB] = useState<string[]>(["[----------]", "[----------]", "[----------]", "[----------]"]);

  // Synergy States
  const [synergyPercentage, setSynergyPercentage] = useState<number>(0);
  const [synergyVerdict, setSynergyVerdict] = useState<string>('');

  const [isSpinning, setIsSpinning] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);
  const exportSynergyRef = useRef<HTMLDivElement>(null);

  const resetState = (selectedLang: 'en' | 'id') => {
    setIsRevealed(false);
    setSlotsA(["[----------]", "[----------]", "[----------]", "[----------]"]);
    setSlotsB(["[----------]", "[----------]", "[----------]", "[----------]"]);
    setLoreA("");
    setLoreB("");
    setStatsA(null);
    setStatsB(null);
    setSynergyPercentage(0);
    setSynergyVerdict("");
  };

  const generateLore = (prng: () => number) => {
    const isEn = lang === 'en';
    const blueprints = isEn ? blueprints_en : blueprints_id;
    const themes = isEn ? themes_en : themes_id;
    const roles = isEn ? roles_en : roles_id;
    const objects = isEn ? objects_en : objects_id;
    const incidents = isEn ? incidents_en : incidents_id;
    const locations = isEn ? locations_en : locations_id;
    const entities = isEn ? entities_en : entities_id;
    const actions = isEn ? actions_en : actions_id;

    let blueprint = getSeededRandom(blueprints, prng);

    blueprint = blueprint.replace(/\[Theme\]/g, () => getSeededRandom(themes, prng));
    blueprint = blueprint.replace(/\[Role\]/g, () => getSeededRandom(roles, prng));
    blueprint = blueprint.replace(/\[Object\]/g, () => getSeededRandom(objects, prng));
    blueprint = blueprint.replace(/\[Incident\]/g, () => getSeededRandom(incidents, prng));
    blueprint = blueprint.replace(/\[Location\]/g, () => getSeededRandom(locations, prng));
    blueprint = blueprint.replace(/\[Entity\]/g, () => getSeededRandom(entities, prng));
    blueprint = blueprint.replace(/\[Action\]/g, () => getSeededRandom(actions, prng));

    if (isEn) {
      blueprint = blueprint.replace(/\bA\s+([AEIOUaeiou])/g, "An $1");
    }

    return blueprint;
  };

  const handleStart = () => {
    if (mode === 'solo' && !nameA.trim()) return;
    if (mode === 'synergy' && (!nameA.trim() || !nameB.trim())) return;
    if (isSpinning) return;

    setIsSpinning(true);
    setIsRevealed(false);

    // Dynamic Seed Generation via Local Salt
    const salt = Math.floor(Math.random() * 1000000);

    // Subject A calculation
    const prngA = getPRNG(nameA.trim() + "_" + salt);
    const generatedLoreA = generateLore(prngA);
    const generatedStatsA = generateRpgStats(nameA.trim() + "_" + salt);
    setLoreA(generatedLoreA);
    setStatsA(generatedStatsA);

    // Subject B calculation (if Synergy Mode)
    let prngB = () => 0.5;
    if (mode === 'synergy') {
      prngB = getPRNG(nameB.trim() + "_" + salt);
      const generatedLoreB = generateLore(prngB);
      const generatedStatsB = generateRpgStats(nameB.trim() + "_" + salt);
      setLoreB(generatedLoreB);
      setStatsB(generatedStatsB);

      // Synergy calculation (Based on generated lores)
      const synergyVal = getPRNG(generatedLoreA + "+" + generatedLoreB)();
      const pct = Math.round(synergyVal * 100);
      setSynergyPercentage(pct);
      setSynergyVerdict(getSynergyVerdict(generatedLoreA, generatedLoreB, pct, lang));
    }

    const duration = 1500;
    const intervalTime = 50;
    const totalTicks = duration / intervalTime;
    let ticks = 0;

    const allWords = lang === 'en' ? allWords_en : allWords_id;
    const finalPrngA = getPRNG(nameA.trim() + "_" + salt + "_slots");
    const finalPrngB = getPRNG(nameB.trim() + "_" + salt + "_slots");

    const interval = setInterval(() => {
      ticks++;

      const newSlotsA = [...slotsA];
      const newSlotsB = [...slotsB];

      for (let i = 0; i < 4; i++) {
        const stopTick = (i + 1) * (totalTicks / 4);
        if (ticks < stopTick) {
          newSlotsA[i] = getSeededRandom(allWords, finalPrngA);
          if (mode === 'synergy') {
            newSlotsB[i] = getSeededRandom(allWords, finalPrngB);
          }
        } else {
          newSlotsA[i] = "DONE";
          if (mode === 'synergy') {
            newSlotsB[i] = "DONE";
          }
        }
      }
      setSlotsA(newSlotsA);
      if (mode === 'synergy') {
        setSlotsB(newSlotsB);
      }

      if (ticks >= totalTicks) {
        clearInterval(interval);
        const successSlots = ["[SYSTEM]", "[LORE]", "[GENERATED]", "[SUCCESS]"];
        setSlotsA(successSlots);
        if (mode === 'synergy') {
          setSlotsB(successSlots);
        }
        setIsSpinning(false);
        setIsRevealed(true);
      }
    }, intervalTime);
  };

  const handleDownload = async () => {
    const activeRef = mode === 'solo' ? exportRef : exportSynergyRef;
    if (!activeRef.current) return;

    await document.fonts.ready;

    try {
      const canvas = await html2canvas(activeRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      const filename = mode === 'solo'
        ? `${nameA.replace(/\s+/g, '_')}_lore.jpg`
        : `${nameA.replace(/\s+/g, '_')}_x_${nameB.replace(/\s+/g, '_')}_synergy.jpg`;

      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Copy text to clipboard
      const shareText = mode === 'solo'
        ? `Somehow i get this lore: ${loreA}. Why dont you try it yourself at axelzeed.xyz/lore!`
        : `Subject ${nameA} & ${nameB} Synergy is evaluated at ${synergyPercentage}%! Verdict: ${synergyVerdict}. Try it at axelzeed.xyz/lore!`;

      await navigator.clipboard.writeText(shareText);

    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  const handleXShare = () => {
    const shareText = mode === 'solo'
      ? `Somehow i get this lore: ${loreA}. Why dont you try it yourself at axelzeed.xyz/lore!`
      : `Subject ${nameA} & ${nameB} Synergy evaluated at ${synergyPercentage}%! Verdict: ${synergyVerdict}. Try it at axelzeed.xyz/lore!`;

    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const statsConfig = [
    { label: 'Absurdity Level', key: 'absurdity', color: 'from-[#ff0055] to-[#ff5500]', shadow: 'shadow-[#ff0055]/30' },
    { label: 'Threat to Society', key: 'threat', color: 'from-[#ff3131] to-[#ff9900]', shadow: 'shadow-[#ff3131]/30' },
    { label: 'Chaos Index', key: 'chaos', color: 'from-[#b000ff] to-[#ff00f0]', shadow: 'shadow-[#b000ff]/30' },
    { label: 'Uniqueness', key: 'uniqueness', color: 'from-[#00f2ff] to-[#00ffaa]', shadow: 'shadow-[#00f2ff]/30' },
    { label: 'Aura / Rizz', key: 'aura', color: 'from-[#ffd700] to-[#ffaa00]', shadow: 'shadow-[#ffd700]/30' },
    { label: 'Survival Rate', key: 'survival', color: 'from-[#39ff14] to-[#00ff66]', shadow: 'shadow-[#39ff14]/30' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative flex flex-col items-center">
      <h1 className="section-header-tech glitch-text mb-6 text-center text-3xl sm:text-4xl md:text-5xl">
        THE ABSURD LORE GENERATOR
      </h1>

      {/* Mode Selector and Language Selector Header Grid */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-2xl gap-4 mb-6 relative z-20">
        {/* Solo / Synergy Selector */}
        <div className="bg-black/60 border border-[#00f2ff]/30 rounded-full p-1 flex gap-1 relative overflow-hidden">
          <button
            onClick={() => { setMode('solo'); resetState(lang); }}
            disabled={isSpinning}
            className={`px-4 py-1.5 rounded-full font-ethnocentric text-[10px] tracking-wider transition-all duration-300 relative z-10 disabled:opacity-50 ${mode === 'solo' ? 'text-black font-black bg-neon-cyan' : 'text-neon-cyan/60 hover:text-neon-cyan'}`}
          >
            SOLO LORE
          </button>
          <button
            onClick={() => { setMode('synergy'); resetState(lang); }}
            disabled={isSpinning}
            className={`px-4 py-1.5 rounded-full font-ethnocentric text-[10px] tracking-wider transition-all duration-300 relative z-10 disabled:opacity-50 ${mode === 'synergy' ? 'text-black font-black bg-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.4)]' : 'text-[#ff00ff]/60 hover:text-[#ff00ff]'}`}
          >
            SYNERGY MATCHER
          </button>
        </div>

        {/* Language Selector Toggle */}
        <div className="bg-black/60 border border-neon-cyan/30 rounded-full p-1 flex gap-1 relative overflow-hidden">
          <button
            onClick={() => { setLang('en'); resetState('en'); }}
            disabled={isSpinning}
            className={`px-4 py-1.5 rounded-full font-ethnocentric text-[10px] tracking-wider transition-all duration-300 relative z-10 disabled:opacity-50 ${lang === 'en' ? 'text-black font-black bg-neon-cyan' : 'text-neon-cyan/60 hover:text-neon-cyan'}`}
          >
            ENGLISH
          </button>
          <button
            onClick={() => { setLang('id'); resetState('id'); }}
            disabled={isSpinning}
            className={`px-4 py-1.5 rounded-full font-ethnocentric text-[10px] tracking-wider transition-all duration-300 relative z-10 disabled:opacity-50 ${lang === 'id' ? 'text-black font-black bg-neon-cyan' : 'text-neon-cyan/60 hover:text-neon-cyan'}`}
          >
            INDONESIA
          </button>
        </div>
      </div>

      <div className={`main-content-box w-full ${mode === 'solo' ? 'max-w-2xl' : 'max-w-5xl'} p-6 sm:p-8 flex flex-col items-center gap-6 relative z-10 transition-all duration-300`}>

        {/* Dynamic Inputs depending on mode */}
        {mode === 'solo' ? (
          <div className="w-full flex flex-col gap-2">
            <label className="text-neon-cyan font-ethnocentric text-xs">[ENTER_NAME]</label>
            <input
              type="text"
              value={nameA}
              onChange={(e) => setNameA(e.target.value)}
              disabled={isSpinning}
              placeholder="Your Username / VTuber Name"
              className="w-full bg-black/50 border-2 border-neon-cyan/50 text-white p-4 focus:outline-none focus:border-neon-cyan font-conthrax transition-all focus:shadow-[0_0_15px_rgba(0,242,255,0.3)] disabled:opacity-50"
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-neon-cyan font-ethnocentric text-xs">[SUBJECT_A_NAME]</label>
              <input
                type="text"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                disabled={isSpinning}
                placeholder="First Username"
                className="w-full bg-black/50 border-2 border-neon-cyan/50 text-white p-4 focus:outline-none focus:border-neon-cyan font-conthrax transition-all focus:shadow-[0_0_15px_rgba(0,242,255,0.3)] disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#ff00ff] font-ethnocentric text-xs">[SUBJECT_B_NAME]</label>
              <input
                type="text"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                disabled={isSpinning}
                placeholder="Second Username"
                className="w-full bg-black/50 border-2 border-[#ff00ff]/50 text-white p-4 focus:outline-none focus:border-[#ff00ff] font-conthrax transition-all focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {/* Viewport Slots (Dynamic layout based on mode) */}
        {mode === 'solo' ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 tech-border p-3 bg-black/80">
            {slotsA.map((slot, i) => (
              <div key={i} className="h-16 flex items-center justify-center border border-[#00f2ff]/20 bg-[#05161a]/80 overflow-hidden relative">
                <span className={`text-center px-1 font-conthrax text-xs ${isSpinning ? 'text-[#ff3131] blur-[1px]' : 'text-neon-cyan'}`}>
                  {slot}
                </span>
                {isSpinning && <div className="absolute inset-0 bg-[#00f2ff]/5 animate-pulse-slow"></div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-neon-cyan text-[9px] font-ethnocentric text-center">[A_DATALINK]</span>
              <div className="grid grid-cols-4 gap-1.5 tech-border p-2 bg-black/80">
                {slotsA.map((slot, i) => (
                  <div key={i} className="h-12 flex items-center justify-center border border-[#00f2ff]/20 bg-[#05161a]/80 overflow-hidden relative">
                    <span className={`text-center px-1 font-conthrax text-[9px] sm:text-[10px] ${isSpinning ? 'text-[#ff3131] blur-[0.5px]' : 'text-neon-cyan'}`}>
                      {slot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[#ff00ff] text-[9px] font-ethnocentric text-center">[B_DATALINK]</span>
              <div className="grid grid-cols-4 gap-1.5 border border-[#ff00ff]/30 p-2 bg-black/80">
                {slotsB.map((slot, i) => (
                  <div key={i} className="h-12 flex items-center justify-center border border-[#ff00ff]/20 bg-[#1a0516]/80 overflow-hidden relative">
                    <span className={`text-center px-1 font-conthrax text-[9px] sm:text-[10px] ${isSpinning ? 'text-[#ff3131] blur-[0.5px]' : 'text-[#ff00ff]'}`}>
                      {slot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={(mode === 'solo' && !nameA.trim()) || (mode === 'synergy' && (!nameA.trim() || !nameB.trim())) || isSpinning}
          className={`btn-custom w-full ${mode === 'solo' ? 'max-w-xs' : 'max-w-md'} text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:scale-100 disabled:hover:bg-neon-cyan transition-all duration-300`}

        >
          {isSpinning
            ? '[PROCESSING]'
            : (mode === 'solo'
              ? '[RANDOMIZE LORE]'
              : '[EVALUATE SYNERGY]'
            )
          }
        </button>

        <hr></hr>

        {/* Dynamic Transmission Output Box */}
        {isRevealed && (
          <div className="w-full animate-slide-up flex flex-col gap-6">

            {mode === 'solo' ? (
              // Solo Display
              <div className="w-full flex flex-col gap-6">
                <div className="tech-border p-6 bg-black/90 relative">
                  <div className="absolute -top-3 left-4 bg-black px-2 text-neon-cyan text-xs font-ethnocentric">
                    [TRANSMISSION_RECEIVED]
                  </div>
                  <p className="text-md sm:text-lg md:text-xl text-white font-conthrax leading-relaxed">
                    <span className="text-neon-green font-bold">{nameA}</span>: {loreA}
                  </p>
                </div>

                {/* RPG Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#00f2ff]/20 pt-6">
                  {statsConfig.map((stat) => {
                    const val = statsA ? statsA[stat.key as keyof RpgStats] : 0;
                    return (
                      <div key={stat.key} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-conthrax">
                          <span className="text-gray-400">{stat.label}</span>
                          <span className="text-neon-cyan font-bold">{val}%</span>
                        </div>
                        <div className="h-3 w-full bg-black/80 border border-[#00f2ff]/10 rounded-sm overflow-hidden p-[1px]">
                          <div
                            className={`h-full bg-gradient-to-r ${stat.color} shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-out`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Synergy Display
              <div className="w-full flex flex-col gap-6">
                {/* Lores Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subject A */}
                  <div className="tech-border p-5 bg-black/95 relative flex flex-col justify-between">
                    <div className="absolute -top-3 left-4 bg-black px-2 text-neon-cyan text-xs font-ethnocentric">
                      [SUBJECT_A_LOG]
                    </div>
                    <p className="text-sm sm:text-base text-gray-100 font-conthrax leading-relaxed mb-4">
                      <span className="text-neon-cyan font-bold">{nameA}</span>: {loreA}
                    </p>

                    <div className="grid grid-cols-2 gap-2 border-t border-[#00f2ff]/10 pt-3 mt-2">
                      {statsConfig.map(stat => {
                        const val = statsA ? statsA[stat.key as keyof RpgStats] : 0;
                        return (
                          <div key={stat.key} className="flex flex-col gap-0.5">
                            <div className="flex justify-between text-[9px] font-conthrax">
                              <span className="text-gray-500 truncate">{stat.label.split(' ')[0]}</span>
                              <span className="text-neon-cyan font-bold">{val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black border border-[#00f2ff]/10 rounded-sm overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${stat.color}`} style={{ width: `${val}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject B */}
                  <div className="border border-[#ff00ff]/30 p-5 bg-black/95 relative flex flex-col justify-between">
                    <div className="absolute -top-3 left-4 bg-black px-2 text-[#ff00ff] text-xs font-ethnocentric">
                      [SUBJECT_B_LOG]
                    </div>
                    <p className="text-sm sm:text-base text-gray-100 font-conthrax leading-relaxed mb-4">
                      <span className="text-[#ff00ff] font-bold">{nameB}</span>: {loreB}
                    </p>

                    <div className="grid grid-cols-2 gap-2 border-t border-[#ff00ff]/10 pt-3 mt-2">
                      {statsConfig.map(stat => {
                        const val = statsB ? statsB[stat.key as keyof RpgStats] : 0;
                        return (
                          <div key={stat.key} className="flex flex-col gap-0.5">
                            <div className="flex justify-between text-[9px] font-conthrax">
                              <span className="text-gray-500 truncate">{stat.label.split(' ')[0]}</span>
                              <span className="text-[#ff00ff] font-bold">{val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black border border-[#ff00ff]/10 rounded-sm overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${stat.color}`} style={{ width: `${val}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Center Synergy Percentage Badge and Verdict */}
                <div className="w-full flex flex-col items-center border border-[#ffd700]/30 bg-black/70 p-5 rounded-md relative overflow-hidden gap-4">
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"></div>
                  <span className="text-[#ffd700] font-ethnocentric text-xs tracking-wider">[SYNERGY_EVALUATION]</span>

                  <div className="flex flex-col md:flex-row items-center gap-5 w-full justify-center">
                    <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-2 border-dashed border-[#ffd700] bg-black/90">
                      <div className="flex flex-col items-center justify-center font-ethnocentric">
                        <span className="text-[8px] text-neon-cyan/50 tracking-wider">MATCH</span>
                        <span className="text-2xl text-white font-bold tracking-tighter drop-shadow-[0_0_8px_#ffd700]">{synergyPercentage}%</span>
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="bg-black/90 border border-l-4 border-l-[#ffd700] border-[#00f2ff]/20 p-4 rounded-r-md">
                        <span className="text-[9px] font-ethnocentric text-neon-cyan block mb-1">[VERDICT]</span>
                        <p className="text-sm sm:text-base text-gray-100 font-conthrax leading-relaxed italic text-left">
                          "{synergyVerdict}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sharing buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-conthrax transition-all duration-300 text-sm sm:text-base"
              >
                <Download size={18} />
                Download Card
              </button>

              <button
                onClick={handleXShare}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-conthrax transition-all duration-300 text-sm sm:text-base"
              >
                <Share2 size={18} />
                Share on X
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Solo Export Container - Exactly 1200x600 as per spec */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          ref={exportRef}
          className="relative w-[1200px] h-[600px] bg-black overflow-hidden flex flex-col justify-between p-12 border-4 border-[#00f2ff]"
          style={{ fontFamily: 'Conthrax, sans-serif' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets/Card_Randomizer_Solo.jpg"
              alt="Card Background"
              className="w-full h-full object-cover opacity-80"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/95"></div>
          </div>

          {/* Top Row: Branding */}
          <div className="relative z-10 flex justify-between items-center border-b border-[#00f2ff]/30 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border-2 border-[#00f2ff] bg-[#00f2ff]/20 flex items-center justify-center">
                <span className="text-[#00f2ff] font-bold text-2xl" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>AZ</span>
              </div>
              <div>
                <p className="text-[10px] text-[#00f2ff] tracking-widest font-ethnocentric" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>
                  SUBJECT LOG
                </p>
                <p className="text-3xl text-white font-bold tracking-wider">{nameA}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neon-green/60 font-mono tracking-widest bg-neon-green/5 px-3 py-1 border border-neon-green/10">
                STABLE_BUILD_REV_2.0.0
              </span>
            </div>
          </div>

          {/* Middle Body: Split layout for Lore and Stats */}
          <div className="relative z-10 grid grid-cols-12 gap-8 my-auto items-center">
            {/* Lore Column */}
            <div className="col-span-7 bg-black/80 border-l-4 border-[#39ff14] p-6 backdrop-blur-sm">
              <span className="text-[9px] font-ethnocentric text-neon-cyan block mb-2">[TRANSMISSION_LORE]</span>
              <p className="text-xl text-gray-100 leading-relaxed">
                {loreA}
              </p>
            </div>

            {/* Stats Column */}
            <div className="col-span-5 bg-black/85 border border-[#00f2ff]/20 p-5 backdrop-blur-sm flex flex-col gap-3">
              <span className="text-[9px] font-ethnocentric text-[#ffd700] block mb-1">[TACTICAL_EVALUATION]</span>
              {statsConfig.map((stat) => {
                const val = statsA ? statsA[stat.key as keyof RpgStats] : 0;
                return (
                  <div key={stat.key} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] font-conthrax">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="text-neon-cyan font-bold">{val}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-black border border-[#00f2ff]/10 rounded-sm overflow-hidden p-[0.5px]">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.color}`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="relative z-10 flex justify-between items-center border-t border-[#00f2ff]/30 pt-4">
            <p className="text-md text-[#00f2ff]" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>
              axelzeed.xyz/lore
            </p>
            <p className="text-[12px] text-gray-400 font-mono">
              LORE GENERATION INITIATIVE V2.0
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Synergy Export Container - Exactly 1200x900 as per spec */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          ref={exportSynergyRef}
          className="relative w-[1200px] h-[900px] bg-black overflow-hidden flex flex-col justify-between p-12 border-4 border-[#ff00ff]"
          style={{ fontFamily: 'Conthrax, sans-serif' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets/Card_Randomizer_Synergy.jpg"
              alt="Card Background"
              className="w-full h-full object-cover opacity-80"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/95"></div>
          </div>

          {/* Top Row: Dual branding */}
          <div className="relative z-10 flex justify-between items-center border-b border-[#ffd700]/30 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-22 h-14 border-2 border-[#ffd700] bg-[#ffd700]/20 flex items-center justify-center">
                <span className="text-[#ffd700] font-bold text-2xl" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>SYN</span>
              </div>
              <div>
                <p className="text-[10px] text-[#ffd700] tracking-widest font-ethnocentric" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>
                  COGNITIVE SYNERGY REPORT
                </p>
                <p className="text-3xl text-white font-bold tracking-wider">
                  {nameA} <span className="text-[#ffd700]">&amp;</span> {nameB}
                </p>
              </div>
            </div>
            <div className="text-right self-start mt-2">
              <span className="text-[10px] text-[#ffd700]/70 font-mono tracking-widest bg-[#ffd700]/5 px-3 py-1 border border-[#ffd700]/15" style={{ paddingBottom: '18px' }}>
                SYNERGY_ENGINE_ACTIVE
              </span>
            </div>
          </div>

          {/* Middle Body: Side-by-side lores & synergy score */}
          <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
            {/* Name A Lore */}
            <div className="col-span-5 bg-black/80 border-l-4 border-[#00f2ff] p-5 backdrop-blur-sm h-[450px] flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-ethnocentric text-neon-cyan block mb-2">{nameA} LOG</span>
                <p className="text-[15px] text-gray-200 leading-relaxed">
                  {loreA}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-[#00f2ff]/10 pt-3 mt-2">
                {statsConfig.map(stat => {
                  const val = statsA ? statsA[stat.key as keyof RpgStats] : 0;
                  return (
                    <div key={stat.key} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px] font-conthrax">
                        <span className="text-gray-500 truncate" style={{ paddingBottom: '10px' }}>{stat.label.split(' ')[0]}</span>
                        <span className="text-neon-cyan font-bold">{val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black border border-[#00f2ff]/10 rounded-sm overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${stat.color}`} style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Synergy Center Column */}
            <div className="col-span-2 flex flex-col items-center justify-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-dashed border-[#ffd700] bg-black">
                <span className="text-2xl text-white font-bold font-conthrax relative -top-1" style={{ paddingBottom: '18px' }}>{synergyPercentage}%</span>
              </div>
              <span className="text-[9px] font-ethnocentric text-center text-[#ffd700] tracking-wider">MATCH RATE</span>
            </div>

            {/* Name B Lore */}
            <div className="col-span-5 bg-black/80 border-l-4 border-[#ff00ff] p-5 backdrop-blur-sm h-[450px] flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-ethnocentric text-[#ff00ff] block mb-2">{nameB} LOG</span>
                <p className="text-[15px] text-gray-200 leading-relaxed">
                  {loreB}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-[#ff00ff]/10 pt-3 mt-2">
                {statsConfig.map(stat => {
                  const val = statsB ? statsB[stat.key as keyof RpgStats] : 0;
                  return (
                    <div key={stat.key} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px] font-conthrax">
                        <span className="text-gray-500 truncate" style={{ paddingBottom: '15px' }}>{stat.label.split(' ')[0]}</span>
                        <span className="text-[#ff00ff] font-bold">{val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black border border-[#ff00ff]/10 rounded-sm overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${stat.color}`} style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Verdict Bar */}
          <div className="relative z-10 bg-black/95 border border-l-4 border-l-[#ffd700] border-[#00f2ff]/20 p-4 rounded-r-md mx-auto w-full">
            <span className="text-[9px] font-ethnocentric text-[#ffd700] block mb-1">[FINAL_SYNERGY_VERDICT]</span>
            <p className="text-md text-white font-conthrax leading-relaxed italic text-center">
              "{synergyVerdict}"
            </p>
          </div>

          {/* Bottom Footer */}
          <div className="relative z-10 flex justify-between items-center border-t border-[#00f2ff]/30 pt-4">
            <p className="text-md text-[#00f2ff]" style={{ fontFamily: 'Ethnocentric, sans-serif' }}>
              axelzeed.xyz/lore
            </p>
            <p className="text-[12px] text-gray-400 font-mono">
              LORE SYNERGY ENGINE V2.0
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}
