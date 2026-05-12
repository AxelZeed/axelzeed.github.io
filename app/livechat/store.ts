import { create } from 'zustand';

export type ShapePreset = 'rectangle' | 'skewed' | 'rounded' | 'irregular' | 'cute' | 'custom_mask';

export interface ExtraAsset {
  id: string;
  src: string;
  opacity: number;
  posX: number;
  posY: number;
  rotate: number;
  scale: number;
}

// Comprehensive Google Fonts list
export const GOOGLE_FONTS = [
  // Sans-serif
  'Rubik', 'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Nunito',
  'Raleway', 'Ubuntu', 'Outfit', 'Manrope', 'Work Sans', 'DM Sans', 'Quicksand',
  'Josefin Sans', 'Comfortaa', 'Kanit', 'Barlow', 'Exo 2', 'Prompt', 'Sarabun',
  'Noto Sans', 'Source Sans 3', 'Mukta', 'Hind', 'Cabin', 'Karla', 'Libre Franklin',
  'Archivo', 'Overpass', 'Signika', 'Asap', 'Catamaran', 'Varela Round',
  // Display / Stylized
  'Orbitron', 'Rajdhani', 'Audiowide', 'Bungee', 'Press Start 2P', 'Silkscreen',
  'Monoton', 'Black Ops One', 'Creepster', 'Rammetto One', 'Bungee Shade',
  'Nabla', 'Righteous', 'Russo One', 'Teko', 'Jura', 'Electrolize',
  'Share Tech Mono', 'Major Mono Display', 'Nova Mono',
  // Serif
  'Playfair Display', 'Merriweather', 'Lora', 'EB Garamond', 'Crimson Text',
  'Libre Baskerville', 'Cormorant Garamond', 'Bitter', 'Spectral',
  // Handwriting / Script
  'Pacifico', 'Dancing Script', 'Caveat', 'Satisfy', 'Great Vibes', 'Kalam',
  'Indie Flower', 'Amatic SC', 'Shadows Into Light', 'Sacramento',
  // Monospace
  'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Space Mono', 'IBM Plex Mono',
  'Roboto Mono', 'Ubuntu Mono', 'Inconsolata',
  // CJK / Special
  'Noto Sans JP', 'Noto Sans KR', 'Noto Sans TC',
  // Chat-specific popular fonts
  'Changa One', 'Imprima', 'Baloo 2', 'Fredoka', 'Bubblegum Sans',
  'Chewy', 'Boogaloo', 'Luckiest Guy', 'Titan One', 'Bangers',
  'Permanent Marker', 'Patrick Hand', 'Gloria Hallelujah',
];

interface ChatState {
  // Layout
  direction: 'vertical' | 'horizontal';
  messageSpacing: number;
  bubbleRadius: number;
  skewAngle: number;
  shapePreset: ShapePreset;
  customMaskImage: string | null;
  useMaxWidth: boolean;
  
  // Typography — Names
  fontFamilyName: string;
  customFontName: string;
  fontSizeName: number;
  lineHeightName: number;
  fontWeightName: number;
  showBadges: boolean;
  showColonAfterName: boolean;
  nameOnNewLine: boolean;
  
  // Typography — Messages
  fontFamilyMessage: string;
  customFontMessage: string;
  fontSizeMessage: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  
  // Text Outline / Stroke
  showOutline: boolean;
  outlineSize: number;
  outlineColor: string;
  
  // Effects — Glow
  neonGlow: boolean;
  glowColor: string;
  glowIntensity: number;
  
  // Effects — Text Shadow
  showTextShadow: boolean;
  textShadowColor: string;
  textShadowIntensity: number;
  textShadowX: number;
  textShadowY: number;
  
  // Visuals
  bgColor: string;
  textColor: string;
  showAvatar: boolean;
  avatarSize: number;
  
  // Timestamps
  showTimestamps: boolean;
  timestampFontSize: number;
  timestampColor: string;
  
  // Border
  borderWidth: number;
  borderColor: string;
  
  // Backgrounds
  useBars: boolean;
  
  // Animation
  animateIn: boolean;
  fadeInTime: number;
  animateOut: boolean;
  waitTime: number;
  fadeOutTime: number;
  slideDirection: 'none' | 'left' | 'right' | 'top' | 'bottom';
  
  // Roles
  ownerBg: string;
  ownerText: string;
  ownerNameColor: string;
  modBg: string;
  modText: string;
  modNameColor: string;
  memberBg: string;
  memberText: string;
  memberNameColor: string;
  superchatBg: string;
  superchatText: string;
  superchatHeaderBg: string;
  superchatHeaderText: string;
  superchatBorderColor: string;
  superchatBorderWidth: number;
  superstickerBg: string;
  superstickerText: string;
  
  // Membership
  membershipGradientStart: string;
  membershipGradientEnd: string;
  membershipBorderColor: string;
  membershipBorderWidth: number;
  
  // Assets & Image Customization
  customBgImage: string | null;
  bgTextureEnabled: boolean;
  bgOpacity: number;
  bgPosX: number;
  bgPosY: number;
  bgRotate: number;
  bgScale: number;
  
  brandIcon: string | null;
  logoEnabled: boolean;
  logoOpacity: number;
  logoPosX: number;
  logoPosY: number;
  logoRotate: number;
  logoScale: number;
  
  extraAssets: ExtraAsset[];

  // Simulation Controls
  isSimPaused: boolean;
  simSpeed: number;
  simEnabledRoles: { [key: string]: boolean };
  simRoleFrequencies: { [key: string]: number };
  
  // Actions
  setField: (field: keyof ChatState, value: any) => void;
  setSimRole: (role: string, enabled: boolean) => void;
  setSimFreq: (role: string, freq: number) => void;
  addExtraAsset: (src: string) => void;
  updateExtraAsset: (id: string, updates: Partial<ExtraAsset>) => void;
  removeExtraAsset: (id: string) => void;
  applyPreset: (presetName: string) => void;
  reset: () => void;
}

const initialState: Omit<ChatState, 'setField' | 'setSimRole' | 'setSimFreq' | 'addExtraAsset' | 'updateExtraAsset' | 'removeExtraAsset' | 'applyPreset' | 'reset'> = {
  direction: 'vertical',
  messageSpacing: 12,
  bubbleRadius: 10,
  skewAngle: -5,
  shapePreset: 'rectangle',
  customMaskImage: null,
  useMaxWidth: true,
  
  // Names
  fontFamilyName: 'Rubik',
  customFontName: '',
  fontSizeName: 16,
  lineHeightName: 0,
  fontWeightName: 900,
  showBadges: true,
  showColonAfterName: false,
  nameOnNewLine: false,
  
  // Messages
  fontFamilyMessage: 'Rubik',
  customFontMessage: '',
  fontSizeMessage: 16,
  lineHeight: 1.2,
  letterSpacing: 0,
  textAlign: 'left',
  
  // Outline
  showOutline: false,
  outlineSize: 2,
  outlineColor: '#000000',
  
  // Glow
  neonGlow: true,
  glowColor: '#00f2ff',
  glowIntensity: 10,
  
  // Shadow
  showTextShadow: true,
  textShadowColor: '#000000',
  textShadowIntensity: 2,
  textShadowX: 2,
  textShadowY: 2,
  
  bgColor: '#00f2ff',
  textColor: '#FFFFFF',
  showAvatar: true,
  avatarSize: 40,
  
  // Timestamps
  showTimestamps: false,
  timestampFontSize: 12,
  timestampColor: '#999999',
  
  // Border
  borderWidth: 0,
  borderColor: '#000000',
  
  // Backgrounds
  useBars: false,
  
  // Animation
  animateIn: true,
  fadeInTime: 200,
  animateOut: false,
  waitTime: 30,
  fadeOutTime: 200,
  slideDirection: 'none',
  
  ownerBg: '#ffe646',
  ownerText: '#1A1A2E',
  ownerNameColor: '#ffe646',
  modBg: '#631fff',
  modText: '#FFFFFF',
  modNameColor: '#5e84fd',
  memberBg: '#00ffad',
  memberText: '#1A1A2E',
  memberNameColor: '#00ffad',
  superchatBg: '#ff7300',
  superchatText: '#FFFFFF',
  superchatHeaderBg: '#1A1A2E',
  superchatHeaderText: '#FFFFFF',
  superchatBorderColor: '#1A1A2E',
  superchatBorderWidth: 4,
  superstickerBg: '#ff3c3c',
  superstickerText: '#FFFFFF',
  
  membershipGradientStart: '#00C853',
  membershipGradientEnd: '#5AE1A0',
  membershipBorderColor: '#000000',
  membershipBorderWidth: 1,
  
  customBgImage: null,
  bgTextureEnabled: true,
  bgOpacity: 0.3,
  bgPosX: 50,
  bgPosY: 50,
  bgRotate: 0,
  bgScale: 100,
  
  brandIcon: null,
  logoEnabled: true,
  logoOpacity: 1,
  logoPosX: 95,
  logoPosY: 5,
  logoRotate: 0,
  logoScale: 100,
  
  extraAssets: [],

  isSimPaused: false,
  simSpeed: 4000,
  simEnabledRoles: {
    owner: true,
    moderator: true,
    member: true,
    superchat: true,
    supersticker: true,
    default: true
  },
  simRoleFrequencies: {
    owner: 3,
    moderator: 3,
    member: 3,
    superchat: 3,
    supersticker: 3,
    default: 3
  }
};

export const PRESETS: { [key: string]: Partial<ChatState> } = {
  'Cyber_Neon': {
    fontFamilyName: 'Orbitron',
    fontFamilyMessage: 'Rajdhani',
    bgColor: 'rgba(0, 242, 255, 0.2)',
    textColor: '#ffffff',
    neonGlow: true,
    glowColor: '#00f2ff',
    glowIntensity: 15,
    shapePreset: 'skewed',
    skewAngle: -10,
    ownerNameColor: '#ff00ff',
    modNameColor: '#00f2ff',
    memberNameColor: '#00ffad',
    bubbleRadius: 4,
    borderWidth: 1,
    borderColor: '#00f2ff',
  },
  'Retro_Terminal': {
    fontFamilyName: 'Press Start 2P',
    fontFamilyMessage: 'Share Tech Mono',
    bgColor: '#000000',
    textColor: '#00ff00',
    neonGlow: false,
    shapePreset: 'rectangle',
    showAvatar: false,
    fontSizeName: 12,
    fontSizeMessage: 14,
    showBadges: false,
    borderWidth: 2,
    borderColor: '#00ff00',
    messageSpacing: 2,
  },
  'Kawaii_Bubble': {
    fontFamilyName: 'Fredoka',
    fontFamilyMessage: 'Quicksand',
    bgColor: '#ffe6f2',
    textColor: '#ff66b2',
    neonGlow: true,
    glowColor: '#ff66b2',
    glowIntensity: 5,
    shapePreset: 'rounded',
    bubbleRadius: 25,
    ownerNameColor: '#ff1a8c',
    modNameColor: '#ff1a8c',
    memberNameColor: '#ff1a8c',
    borderWidth: 3,
    borderColor: '#ffb3d9',
  },
  'Glass_Minimalist': {
    fontFamilyName: 'Inter',
    fontFamilyMessage: 'Inter',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    textColor: '#ffffff',
    neonGlow: false,
    shapePreset: 'rectangle',
    bubbleRadius: 0,
    borderWidth: 0,
    messageSpacing: 10,
    showTextShadow: true,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowIntensity: 4,
  }
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setSimRole: (role, enabled) => set((state) => ({
    simEnabledRoles: { ...state.simEnabledRoles, [role]: enabled }
  })),
  setSimFreq: (role, freq) => set((state) => ({
    simRoleFrequencies: { ...state.simRoleFrequencies, [role]: freq }
  })),
  addExtraAsset: (src) => set((state) => ({
    extraAssets: [
      ...state.extraAssets,
      {
        id: Math.random().toString(36).substr(2, 9),
        src,
        opacity: 1,
        posX: 50,
        posY: 50,
        rotate: 0,
        scale: 100,
      }
    ]
  })),
  updateExtraAsset: (id, updates) => set((state) => ({
    extraAssets: state.extraAssets.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  removeExtraAsset: (id) => set((state) => ({
    extraAssets: state.extraAssets.filter(a => a.id !== id)
  })),
  applyPreset: (presetName) => set((state) => ({ ...state, ...PRESETS[presetName] })),
  reset: () => set(initialState),
}));
