export interface MediaItem {
  src: string;
  title: string;
  author?: string;
  desc?: string;
  songs?: string[];
  isStruck?: boolean;
}

export interface UserConfig {
  name: string;
  img: string;
  passcode: string;
}

export const USERS: Record<string, UserConfig> = {
  'prototype018': { name: 'Axel Zeed', img: '/Assets/Axel_Ver3.5.png', passcode: 'prototype018' },
  'scientist_001': { name: 'Zeryuz Researcher', img: '/Assets/Axel_Ver3.png', passcode: 'scientist_001' },
  'goddess': { name: 'Hiera', img: '/Assets/Photocard_Hiera.jpg', passcode: 'goddess' },
  'dragon': { name: 'Vikra', img: '/Assets/Photocard_Vikra.jpg', passcode: 'dragon' },
  'space': { name: 'Zack', img: '/Assets/Photocard_Zack.jpg', passcode: 'space' },
  'doll': { name: 'Sato', img: '/Assets/Photocard_Sato.jpg', passcode: 'doll' },
  'lavender': { name: 'Ay', img: '/Assets/Chibi_Ay.jpg', passcode: 'lavender' },
  'assassin': { name: 'Keyla', img: '/Assets/FN_Keyla.jpg', passcode: 'assassin' },
  'toilet': { name: 'Hanny', img: '/Assets/Placeholder.png', passcode: 'toilet' },
  'default': { name: 'Guest', img: '/Assets/Guest_Banner.jpg', passcode: '' }
};

export const PREFERENCES = {
  yay: ['Something tidy', 'Calm things', 'Something new', 'Nature', 'Spending time alone'],
  nah: ['Sudden changes', 'Under pressure', 'Jumpscare', 'Uncomfortable moist', 'Dirty', 'Tight space'],
  foods_like: ['Noodles', 'Sushi', 'Fried rice', 'Ayam goreng fried chicken', 'Chocolate', 'Water, Tea, Milk'],
  foods_dislike: ['Boiled yellow egg', 'Potato without processing', 'Cheese', 'Plain garlic', 'Twisted cluster bean (pete)', 'Archidendron pauciflorum (jengkol njir)', 'Too spicy food'],
  hobbies: ['Drawing', 'Editing', 'Rage Quit to Competitive Games', 'Reading News', 'Watching YT', 'Doom Scrolling Reels', 'Contemplating My Life Decision']
};

export const SEARCH_PROTOCOLS = [
  { 
    title: 'Bing', 
    src: '/Assets/Bing.png', 
    desc: "It's not that bad as people said, I use it as my daily driver. It has a reward system that I can redeem lmao. Overall Bing is a good search engine. Get out of here Google." 
  },
  { 
    title: 'Brave Search', 
    src: '/Assets/Brave.png', 
    desc: "Alternative to Bing since it is default from the Brave browser. Their UI is slick and straightforward." 
  },
  { 
    title: 'Kagi', 
    src: '/Assets/Kagi.png', 
    desc: "My favorite for its usefulness. If it's not because of the monthly limit, I will certainly make it my daily driver." 
  },
  { 
    title: 'Google', 
    src: '/Assets/Google.png', 
    desc: "It's the default, what do you expect? Ad cluttered and overall AI stuff that didn't add any value. Also get out of here.",
    isStruck: true
  }
];

export const WEB_BROWSERS = [
  { 
    title: 'Brave Browser', 
    src: '/Assets/Brave.png', 
    desc: "Damn good and light. The default adblock is ZAMNN GOOD. Blocks annoying ads on YT and Spotify. Works on Mobile too. God, I love this." 
  },
  { 
    title: 'Edge', 
    src: '/Assets/Edge.png', 
    desc: "Near perfect but has a lot of bloat features that made my laptop and pc dying. I will use it IF somehow Brave can't use specific Chrome features." 
  }
];

export const ANIME: MediaItem[] = [
  { title: 'Bocchi The Rock', src: '/Assets/Bocchi.jpg' },
  { title: 'Attack On Titan', src: '/Assets/AoT.jpg' },
  { title: 'Naruto', src: '/Assets/Naruto.jpg' },
  { title: 'Jojo Bizarre Adventure', src: '/Assets/Jojo.jpg' },
  { title: 'Evangelion', src: '/Assets/Evangelion.jpg' },
  { title: 'Tokyo Ghoul', src: '/Assets/Tokyo.jpg' },
  { title: 'Sword Art Online', src: '/Assets/SAO.jpg' },
  { title: 'Makoto Shinkai Movies', src: '/Assets/Tenki.jpg' },
  { title: 'Shigatsu wa Kimi no Uso', src: '/Assets/Shigatsu.jpg' },
  { title: 'Akame Ga Kill', src: '/Assets/Akame.jpg' },
  { title: 'Aldnoah Zero', src: '/Assets/Aldnoah.jpg' },
  { title: 'Seishun Buta Yarou', src: '/Assets/Seishun.jpg' },
  { title: 'Violet Evergarden', src: '/Assets/Violet.jpg' },
  { title: 'Kaguya Sama', src: '/Assets/Kaguya.jpg' },
  { title: 'One Punch Man', src: '/Assets/OPM.jpg' },
  { title: 'Shokugeki No Souma', src: '/Assets/Soma.jpg' },
  { title: 'Konosuba', src: '/Assets/Konosuba.jpg' },
  { title: 'High School DxD', src: '/Assets/DxD.jpg' },
  { title: 'Hyouka', src: '/Assets/Hyouka.jpg' },
  { title: 'Danshi Koukousei no Nichijou', src: '/Assets/Danshi.jpg' },
  { title: 'Tonikaku Kawaii', src: '/Assets/Tonikawa.jpg' },
  { title: 'Higehiro', src: '/Assets/Higehiro.jpg' },
  { title: 'Kimi Zero', src: '/Assets/KimiZero.jpg' },
  { title: 'Tamako Market', src: '/Assets/Tamako.jpg' },
  { title: 'Danmachi', src: '/Assets/Danmachi.jpg' },
  { title: 'Yofukashi no Uta', src: '/Assets/YofukashiNoUta.jpg' },
  { title: 'Netoge', src: '/Assets/Netoge.jpg' },
  { title: 'Boku no Hero Academia', src: '/Assets/BnHA.jpg' },
  { title: 'Monster Musume', src: '/Assets/MonMusu.jpg' },
  { title: 'Tomo chan wa onanoko', src: '/Assets/Tomo.jpg' },
  { title: 'Shikikomori San', src: '/Assets/Shikimori.jpg' },
  { title: 'Komi san', src: '/Assets/Komi.jpg' }
];

export const TV_SHOWS: MediaItem[] = [
  { title: 'Peaky Blinders', src: '/Assets/Peaky.jpg' },
  { title: 'Spongebob', src: '/Assets/Spongebob.jpg' },
  { title: 'The Mandalorian', src: '/Assets/Mandalorian.jpg' },
  { title: 'Wednesday', src: '/Assets/Wednesday.jpg' },
  { title: 'Boba Fett', src: '/Assets/Boba.jpg' },
  { title: 'Arcane', src: '/Assets/Arcane.jpg' },
  { title: 'Ultraman', src: '/Assets/Ultraman.jpg' },
  { title: 'Kamen Rider', src: '/Assets/Kamen.jpg' }
];

export const FILMS: MediaItem[] = [
  { title: 'Marvel Cinematic Universe', src: '/Assets/MCU.jpg' },
  { title: 'Star Wars', src: '/Assets/Star.jpg' },
  { title: 'Transformers', src: '/Assets/Transformers.jpg' },
  { title: 'Harry Potter', src: '/Assets/Harry.jpg' },
  { title: 'Fast and Furious', src: '/Assets/Fast.jpg' },
  { title: 'Pirates of The Caribbean', src: '/Assets/Pirates.jpg' },
  { title: 'John Wick', src: '/Assets/John.jpg' },
  { title: 'Monsterverse', src: '/Assets/Godzilla.jpg' },
  { title: 'Resident Evil Movies', src: '/Assets/RE.jpg' }
];

export const GAMES_COMBAT: MediaItem[] = [
  { title: 'FPS', src: '/Assets/Valorant.png', songs: ['Valorant', 'Call of Duty', 'Apex Legend', 'CS2', 'Point Blank', 'The Finals'] },
  { title: 'ACTION', src: '/Assets/RE.jpg', songs: ['Resident Evil (4-8)', 'Nier Automata', 'Warframe'] },
  { title: 'BATTLE ROYALE', src: '/Assets/Apex.png', songs: ['PUBGM', 'Apex Legend', 'Bloodstrike', 'Farlight 84', 'Eternal Returns'] }
];

export const GAMES_OPENWORLD: MediaItem[] = [
  { title: 'OPEN WORLD', src: '/Assets/GTA.png', songs: ['GTA Series (San Andreas, IV, V)', 'Far Cry (1-4)', 'Mafia 2', 'Just Cause (2,3)'] },
  { title: 'LEGO', src: '/Assets/Lego.png', songs: ['Marvel Superheroes', 'Batman / Star Wars', 'Avengers'] },
  { title: 'SANDBOX', src: '/Assets/Minecraft.png', songs: ['Minecraft', 'Terraria', 'Roblox', 'Heartopia', 'FNAF 1 / 2 / 3 / 4 / SL / Pizzeria Simulator'] },
  { title: 'RACING', src: '/Assets/Forza.png', songs: ['Forza Horizon 4 / 5', 'Real Racing 3', 'GT Manager', 'F1 Clash', 'Assetto Corsa / ACC', 'Project Cars 3', 'Gran Turismo 7', 'Forza Motorsport', 'Asphalt Legends', 'Need For Speed Series'] }
];

export const GAMES_STRATEGY: MediaItem[] = [
  { title: 'GACHA', src: '/Assets/Honkai.png', songs: ['Aether Gazer', 'Wuthering Waves', 'Honkai Star Rail', 'Echocalypse', 'NIKKE'] },
  { title: 'MOBA', src: '/Assets/ML.png', songs: ['Mobile Legends', 'Honor of Kings', 'AOV'] },
  { title: 'MILITARY MMO', src: '/Assets/War_Thunder.png', songs: ['World of Tanks', 'World of Warships', 'War Thunder'] },
  { title: 'COLLAB', src: '/Assets/Goose.png', songs: ['Magic Chess Go Go', 'Stumble Guys', 'Roblox', 'Goose Goose Duck', 'Pico Park', 'Crab Game'] }
];

export const MUSIC_JPOP: MediaItem[] = [
  { title: 'The Oral Cigarettes', src: '/Assets/Oral.jpg', songs: ['Miss Tail', 'Ones Again', 'Erase', 'Dikidandan', 'Rinka', 'Bug', 'Machinegun', 'Overnight', 'OD', 'Black Memory', '5150', 'Lips (Redone)', 'Shala La'] },
  { title: 'Back Number', src: '/Assets/BackNumber.jpg', songs: ['Fuyu to Haru', 'Emerald', 'To New Lovers', 'Velvet Poem', 'Happy End', 'Siren', 'Blue Amber', 'Suihesen', 'Happy Birthday', 'I Love You', 'Shiawase', 'Aoi Haru', 'Kaigan Doori'] },
  { title: 'Kenshi Yonezu', src: '/Assets/Kenshi.jpg', songs: ['Iris Out', 'Flamingo', 'Shinigami', 'Lemon', 'Haiiro to Ao', 'Uma to Shika', 'Kanden', 'Eine Kleine'] },
  { title: 'Phantom Siita', src: '/Assets/Phantom.jpg', songs: ['Hanabami', 'Just Wanna xxxx With You', 'Devilish Girl', 'Otomodachi', 'Zoku Zoku', 'Doppelganger'] },
  { title: 'Kanaria', src: '/Assets/Kanaria.jpg', songs: ['Brain', 'Rendezvous', 'Requiem', 'Envy Baby', 'Yoidoreshirazu'] },
  { title: 'Akasaki', src: '/Assets/Akasaki.jpg', songs: ['Bunny Girl', 'Roots', 'Tonight With You'] },
  { title: 'Masayaki Suzuki', src: '/Assets/Suzuki.jpg', songs: ['Abunaikioku', 'Megumi No Hito', 'Love Dramatic', 'Daddy Daddy Do', 'Giri Giri', 'Love is Show'] },
  { title: 'Ado', src: '/Assets/Ado.jpg', songs: ['RuLe', 'Backlight', 'Tot Musica', 'Villain (Cover)', 'Fleeting Lullaby', 'Gira Gira', 'Odo', 'Usseewa', 'Aishite'] },
  { title: 'Fuji Kaze', src: '/Assets/Fuji.jpg', songs: ['Matsuri', 'Shinunoga E-Wa', 'Kirari', 'Nan Nan'] },
  { title: 'Masaki Suda', src: '/Assets/Masaki.jpg', songs: ['Sayonara Elegy', 'Niji', 'Machigai Sagashi', 'Long Hope Philia'] },
  { title: 'Anri', src: '/Assets/Anri.jpg', songs: ["I Can't Stop The Loneliness", 'Remember Summer Days', 'Good Bye Boogie Dance', 'Shyness Boy', 'Last Summer Whisper', 'Driving My Love'] },
  { title: 'Eve', src: '/Assets/Eve.jpg', songs: ['Last Dance', 'Dark Night', 'Dramaturgy', 'Anoko Secret', 'Kakai Kitan'] },
  { title: 'Creepy Nuts', src: '/Assets/Nuts.jpg', songs: ['Daten', 'Yofukashi No Uta', 'Bling Bang Bang Born', 'Mirage', 'Nemure'] }
];

export const MUSIC_INTERNATIONAL: MediaItem[] = [
  { title: 'Imagine Dragon', src: '/Assets/Dragons.jpg', songs: ['Lonely', "Gods Don't Pray", 'Eyes Closed', 'Kids', 'Sharks', 'Bones'] },
  { title: 'Maneskin', src: '/Assets/Maneskin.jpg', songs: ['For Your Love', 'I Wanna Be Your Slave', 'The Driver', 'La Paura Del Buio', 'Gossip', 'Torna a Casa', 'Moriro da Re'] },
  { title: 'The Score', src: '/Assets/Score.jpg', songs: ['Stronger', 'Unstoppable', 'Only One', 'Revolution', 'The Fear', 'Glory'] },
  { title: 'Anya Nami', src: '/Assets/Anya.jpg', songs: ['Sadistic', 'Bread', 'Dirty Dream', 'Folk Rush'] },
  { title: 'TEYA', src: '/Assets/TEYA.jpg', songs: ['To-Do List', 'Talk That Talk', 'Behind The Scenes', 'Jail', 'Not Scared of Going Old'] },
  { title: 'Maroon 5', src: '/Assets/Maroon5.jpg', songs: ['Misery', 'This Love', 'Give A Little More', 'Maps', 'She Will Be Loved', 'Beautiful Mistake'] },
  { title: 'Sub Urban', src: '/Assets/SubUrban.jpg', songs: ['Bandit', 'Paramour', 'Inferno', 'Cradles', 'Freak', 'Cirque'] },
  { title: 'Engelbert Humperdick', src: '/Assets/Engelbert.jpg', songs: ['A Man Without Love', 'Spanish Eyes', 'Love Me With All of Your Heart', 'The Way It Used To Be', "Can't Take My Eyes Off You"] },
  { title: 'Rich Brian', src: '/Assets/Brian.jpg', songs: ['Act Up', 'History', '100 Degrees', 'Dat $tick', 'DOA', 'Love in My Pocket'] },
  { title: 'PINK GUY', src: '/Assets/Pink.jpg', songs: ['STFU', 'Nickelodeon Girls', 'Help', "She's So Nice", 'Friendzone Song'] },
  { title: 'Joji', src: '/Assets/Joji.jpg', songs: ['Glimpse of Us', 'Slow Dancing in The Dark'] },
  { title: 'Eminem', src: '/Assets/Eminem.jpg', songs: ['Without Me', 'Godzilla', 'Rap God', 'Real Slim Shady', 'Lose Yourself'] },
  { title: 'Michael Jackson', src: '/Assets/Michael.jpg', songs: ['Billie Jeans', 'Smooth Criminal', 'Beat It', 'Dangerous', 'Black and White', 'We Are The World'] },
  { title: 'BTS', src: '/Assets/BTS.png', songs: ['Mic Drop', 'Idol', 'Fake Love', 'Fire', 'Bulletproof', 'Cypher 4', 'Run BTS', 'DNA'] },
  { title: 'Blackpink', src: '/Assets/Blackpink.png', songs: ['Kill This Love', 'How You Like That', 'DDU-DU DDU-DU', 'Whistle'] }
];

export const MUSIC_ID: MediaItem[] = [
  { title: 'Noah', src: '/Assets/Noah.jpg', songs: ['Separuh Aku', 'Menghapus Jejakmu', 'Mungkin Nanti', 'Diatas Normal', 'Kupu Kupu Malam'] },
  { title: 'Wali', src: '/Assets/Wali.jpg', songs: ['Yank', 'Cari Jodoh', 'Baik Baik Sayang', 'Puaskah'] },
  { title: 'ST12', src: '/Assets/ST12.jpg', songs: ['Jangan Pernah Berubah', 'Saat Terakhir', 'Puspa', 'Isabella'] },
  { title: 'Armada', src: '/Assets/Armada.jpg', songs: ['Asal Kau Bahagia', 'Pergi Pagi Pulang Pagi', 'Harusnya Aku', 'Mau Dibawa Kemana'] },
  { title: 'D Bagindas', src: '/Assets/DBagindas.jpg', songs: ['Empat Mata', 'CINTA', 'Suka Sama Kamu'] }
];

export const HONORABLE_MENTIONS = [
  'Koyori: Sayonara Tender, Hitoribo Envy',
  'REISAI: Bathtub & Neon Titra',
  'Mabodofu: Shirogane',
  'Grandson: Dirty, Blood // Water',
  'AVIVA: Demon Mode, GRRRLS, Blame It On The Kids, Hushh, Rabbit Hole',
  'Eito: Kousui',
  'King GNU: Specialz, Hakujitsu',
  'XX:me: Escape, Torikago',
  'Houshou Marine: III, Paipai Mask, I\'m Your Treasure Box',
  'ABBA: Lay All Your Love On Me, Gimme! Gimme! Gimme!, Dancing Queen',
  'Linkin Park: Heavy, Heavy Is The Crown, The Emptiness Machine, In The End',
  'Super Junior: Mr. Simple',
  'Big Bang: Fantastic Baby, Bang Bang Bang',
  'Towa: Pumpfake, Tennessee, Sell Yo Soul, Move Mf, Transylvania',
  'Yuki Chiba: Team Tomodachi, Mamushi'
];

export const UMMM_SONGS = [
  'Cupcakke Remix', 'Yuno Miles Light Up Skechers', 'Soto Ayam Bu Karti', 'Bebek Goreng Hj Slamet',
  'Cat Loving - Dangdut at 25:00', 'Drake Poopy Pants', 'Chichi wo Moge', 'Let Get Retarded',
  'Vô Tư Remix - Anh Quân Idol x Quyền Hải Phòng', '李晓杰 - 老大 (DJ默涵版)', 'Yi Jian Mei / Xie Hua Piao Piao',
  'Super Idol', 'The Sticky Sweethearts - Shadow of Wiener, Pullin Out My Pubes, I Glued My Balls to My Butthole'
];

export const HARDWARE_PC = [
  { label: 'Processor', value: 'AMD Ryzen™ 3 3100 4 Cores 8 Thread' },
  { label: 'Graphics', value: 'AMD Radeon Graphics RX570 GDDR5 4GB' },
  { label: 'RAM', value: '32GB DDR4 2666MHz (2x16GB HyperX Fury Beast)' },
  { label: 'Display Screen', value: 'Xiaomi A27i 1080p 100Hz (Main), Xiaomi A24i 1080p 100Hz (Secondary)' },
  { label: 'Storage', value: '1x 512GB SSD NVMe M.2 Ovation 980 (200GB Win, 280GB Nobara, 20GB Shared)' },
  { label: 'Webcam', value: 'Eyesec 1080p' },
  { label: 'PSU', value: 'Aerocool United Power 500W' },
  { label: 'Case', value: 'Armaggeddon NimitZ N5' },
  { label: 'Game Controller', value: 'Rexus Gladius GX2' },
  { label: 'Mouse', value: 'Rexus Xierra X18 Rifle' },
  { label: 'Keyboard', value: 'Fantech Shikari K515' },
  { label: 'Pen Tablet', value: 'XP Pen Star G960S' }
];

export const HARDWARE_LAPTOP = [
  { label: 'Processor', value: 'AMD Ryzen™ 3-3250U (up to 3.5GHz)' },
  { label: 'Graphics', value: 'AMD Radeon Graphics Vega 3' },
  { label: 'Display Screen', value: '14 inch' },
  { label: 'RAM', value: '2x4GB DDR4 2400Mhz (total usable 6GB)' },
  { label: 'Storage', value: '256GB PCIe NVMe M.2 (Win 11), 1x 128GB Joyflash SATA (MX Linux)' },
  { label: 'Webcam', value: 'Acer webcam (640 x 480)' },
  { label: 'Audio Jack', value: '1 x 3.5mm headphone/speaker jack' },
  { label: 'Network', value: '10/100/1000 LAN' },
  { label: 'Wireless', value: 'Wireless 802.11ac' }
];

export const CARS_HYPER: MediaItem[] = [
  { title: 'BMW M Hybrid V8', src: '/Assets/BMW_M_Hybrid.png' },
  { title: 'Aston Martin Valkyrie', src: '/Assets/Aston_Valkyrie.png' },
  { title: 'Cadillac V-Series.R', src: '/Assets/Cadillac_VSeries.png' },
  { title: 'Alpine A424', src: '/Assets/Alpine_A424.png' },
  { title: 'Peugeot 9x8', src: '/Assets/Peugeot_9x8.png' },
  { title: 'Genesis GMR 001', src: '/Assets/Genesis_GMR001.png' },
  { title: 'Ford Hypercar', src: '/Assets/Ford_Hypercar.png' }
];

export const CARS_GT: MediaItem[] = [
  { title: 'BMW M4 GT3 Evo', src: '/Assets/BMW_M4_GT3.png' },
  { title: 'Ford Mustang GT3', src: '/Assets/Ford_Mustang_GT3.png' },
  { title: 'Mercedes AMG GT3', src: '/Assets/Mercedes_AMG.png' },
  { title: 'Toyota GR GT3', src: '/Assets/Toyota_GR_GT3.png' }
];

export const CARS_STREET: MediaItem[] = [
  { title: 'Mustang GT S650 Dark Horse', src: '/Assets/Ford_Mustang_S650.png' },
  { title: 'BMW M4 Competition', src: '/Assets/BMW_M4_Comp.png' },
  { title: 'Chevrolet Camaro ZL1 1LE', src: '/Assets/Chevrolet_Camaro_ZL1.png' },
  { title: 'Chevrolet Corvette ZR1', src: '/Assets/Chevrolet_Corvette_ZR1.png' },
  { title: 'Dodge Challenger SRT Demon 170', src: '/Assets/Dodge_Demon_170.png' },
  { title: 'Aston Martin Vulcan', src: '/Assets/Aston_Vulcan.png' },
  { title: 'Aston Martin DB 11', src: '/Assets/Aston_DB11.png' },
  { title: 'BMW 730li', src: '/Assets/BMW_730li.png' },
  { title: 'BMW 430i', src: '/Assets/BMW_430i.png' },
  { title: 'Toyota GR Yaris', src: '/Assets/Toyota_GR_Yaris.png' },
  { title: 'Honda Civic RS 2024', src: '/Assets/Honda_Civic_RS.png' },
  { title: 'Bugatti Bolide', src: '/Assets/Bugatti_Bolide.png' },
  { title: 'Koenigsegg Gemera', src: '/Assets/Koeniggseg_Gemera.png' }
];

export const RACING_BROADCASTS: MediaItem[] = [
  { title: 'WEC', src: '/Assets/WEC.png' },
  { title: 'IMSA', src: '/Assets/IMSA.png' },
  { title: 'ELMS', src: '/Assets/ELMS.png' },
  { title: 'ALMS', src: '/Assets/ALMS.png' },
  { title: 'DTM', src: '/Assets/DTM.png' },
  { title: 'NASCAR', src: '/Assets/Nascar.png' },
  { title: 'GT World (EU/Asia)', src: '/Assets/GTWorld.png' },
  { title: 'F1', src: '/Assets/F1.png' }
];

export const TAGS = [
  { label: 'General', value: '#AxelZeed' },
  { label: 'Live', value: '#AxeLive' },
  { label: 'Fanarts', value: '' },
  { label: 'Memes', value: '' },
  { label: 'Fanname', value: '' }
];

export const CONTENTS = {
  left: [
    'Gaming',
    'Discussion about AI',
    'Watchparty (Esport, Race, Film, etc)',
    'Weekly / Monthly AI News',
    'Tournament',
    'Maybe, just maybe, Karaoke',
    'Recurring Episodes: Zeed Archive'
  ],
  right: [
    'Gameshow: Vtuber 100, Who Wants to Be A Gazilionare, Guess Who, Two Truth One Lie, Who\'s The Impostor, Got Talent, Court Simulator, Hot Debate',
    'Get To Know (GTK)',
    'Podcast with Vtuber discussing something',
    'Lemme See Dat (LSD): Review / Tier List / React'
  ]
};

export const CREDITS: MediaItem[] = [
  { title: 'Live2D Models', author: '@axel_zeed', src: '/Assets/Credit_1.png' },
  { title: 'Rigging', author: '@axel_zeed', src: '/Assets/Credit_2.png' },
  { title: 'Stream Overlay', author: '@axel_zeed', src: '/Assets/Credit_3.png' },
  { title: 'Assets', author: '@axel_zeed', src: '/Assets/Credit_4.png' },
  { title: 'Logo', author: '@axel_zeed', src: '/Assets/Credit_5.png' },
  { title: 'Video Editing', author: '@axel_zeed', src: '/Assets/Credit_6.png' },
  { title: 'Stringer / Transition', author: '@axel_zeed', src: '/Assets/Credit_7.png' },
  { title: 'Thumbnail', author: '@axel_zeed', src: '/Assets/Credit_8.png' },
  { title: 'Schedule', author: '@axel_zeed', src: '/Assets/Credit_9.png' },
  { title: 'Opening / Ending', author: '@axel_zeed', src: '/Assets/Credit_10.png' },
  { title: 'Livechat CSS', author: '@axel_zeed', src: '/Assets/Credit_11.png' },
  { title: 'BGM', author: '@axel_zeed', src: '/Assets/Credit_12.png' }
];

export const GALLERY: MediaItem[] = [
  { title: 'Photo 1', src: '/Assets/Photo_Axel_1.png' },
  { title: 'Photo 2', src: '/Assets/Photo_Axel_2.png' },
  { title: 'Photo 3', src: '/Assets/Photo_Axel_3.png' },
  { title: 'Photo 4', src: '/Assets/Photo_Axel_4.png' },
  { title: 'Photo 5', src: '/Assets/Photo_Axel_5.png' }
];
