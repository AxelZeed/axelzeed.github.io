import { create } from 'zustand';

export type ShapePreset = 'rectangle' | 'skewed' | 'rounded' | 'irregular' | 'cute' | 'custom_mask';
export type ChatPresetName = 'custom' | 'neon_command' | 'ghost_glass' | 'hazard_core' | 'signal_bars' | 'cyberpunk_red' | 'midnight_vapor' | 'frost_archive' | 'bio_synth' | 'vintage_terminal' | 'royal_guard';

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
  activePreset: ChatPresetName;
  // Layout
  direction: 'vertical' | 'horizontal';
  messageSpacing: number;
  bubbleMaxWidthPercent: number;
  bubbleRadius: number;
  skewAngle: number;
  shapePreset: ShapePreset;
  customMaskImage: string | null;
  useMaxWidth: boolean;
  chatboxPadding: number;
  chatboxScale: number;
  previewBgEnabled: boolean;
  chatboxBgColor: string;
  chatboxBgOpacity: number;
  chatboxBgRadius: number;
  chatboxBgEnabled: boolean;
  chatboxBgImage: string | null;
  chatboxBgScale: number;
  chatboxBgPosX: number;
  chatboxBgPosY: number;
  
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
  previewBgColor: string;
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
  applyPreset: (preset: ChatPresetName) => void;
  addExtraAsset: (src: string) => void;
  updateExtraAsset: (id: string, updates: Partial<ExtraAsset>) => void;
  removeExtraAsset: (id: string) => void;
  reset: () => void;
}

export const CHAT_PRESETS: Record<Exclude<ChatPresetName, 'custom'>, { label: string; values: Partial<ChatState> }> = {
  neon_command: {
    label: 'Neon Command',
    values: {
      useBars: false,
      useMaxWidth: true,
      bubbleMaxWidthPercent: 88,
      shapePreset: 'rounded',
      bubbleRadius: 16,
      bgColor: '#102b36',
      textColor: '#d9f7ff',
      fontFamilyName: 'Orbitron',
      fontFamilyMessage: 'Rajdhani',
      fontWeightName: 800,
      letterSpacing: 0.25,
      neonGlow: true,
      glowColor: '#10e6ff',
      glowIntensity: 14,
      showTextShadow: true,
      textShadowColor: 'rgba(0,0,0,0.35)',
      textShadowIntensity: 6,
      textShadowX: 0,
      textShadowY: 1,
      borderWidth: 1,
      borderColor: '#1e5d73',
      ownerBg: '#2c3944',
      ownerText: '#f2f7ff',
      ownerNameColor: '#ffd54a',
      modBg: '#202f5f',
      modText: '#eff4ff',
      modNameColor: '#72a8ff',
      memberBg: '#123942',
      memberText: '#ecffff',
      memberNameColor: '#44f2d1',
      superchatBg: '#1a3d56',
      superchatText: '#f6fbff',
      superchatHeaderBg: '#25b8dc',
      superchatHeaderText: '#03131a',
      superchatBorderColor: '#7cecff',
      superchatBorderWidth: 2,
      superstickerBg: '#4d1d6c',
      superstickerText: '#ffe8ff',
      membershipGradientStart: '#0d7d7d',
      membershipGradientEnd: '#4cf0d2',
      membershipBorderColor: '#9afcff',
      membershipBorderWidth: 1,
    }
  },
  ghost_glass: {
    label: 'Ghost Glass',
    values: {
      useBars: false,
      useMaxWidth: true,
      bubbleMaxWidthPercent: 84,
      shapePreset: 'rounded',
      bubbleRadius: 24,
      bgColor: '#e7f7fb',
      textColor: '#18343d',
      fontFamilyName: 'Space Mono',
      fontFamilyMessage: 'IBM Plex Mono',
      fontWeightName: 700,
      letterSpacing: 0,
      neonGlow: true,
      glowColor: '#7ff0ff',
      glowIntensity: 8,
      showTextShadow: false,
      borderWidth: 1,
      borderColor: '#8dd9eb',
      ownerBg: '#f7efe3',
      ownerText: '#3b2f19',
      ownerNameColor: '#b07a12',
      modBg: '#edf2ff',
      modText: '#213153',
      modNameColor: '#5970d8',
      memberBg: '#e8fbf3',
      memberText: '#18392f',
      memberNameColor: '#2ca77e',
      superchatBg: '#fff1d4',
      superchatText: '#4f3200',
      superchatHeaderBg: '#f2b84b',
      superchatHeaderText: '#2b1800',
      superchatBorderColor: '#e4c88d',
      superchatBorderWidth: 1,
      superstickerBg: '#ffd7ea',
      superstickerText: '#67284c',
      membershipGradientStart: '#d9fff4',
      membershipGradientEnd: '#9de7d0',
      membershipBorderColor: '#7ccdb4',
      membershipBorderWidth: 1,
    }
  },
  hazard_core: {
    label: 'Hazard Core',
    values: {
      useBars: false,
      useMaxWidth: true,
      bubbleMaxWidthPercent: 86,
      shapePreset: 'skewed',
      skewAngle: -8,
      bgColor: '#2b2c31',
      textColor: '#fff5c2',
      fontFamilyName: 'Teko',
      fontFamilyMessage: 'Barlow',
      fontWeightName: 900,
      letterSpacing: 0.35,
      neonGlow: true,
      glowColor: '#ffd400',
      glowIntensity: 12,
      showTextShadow: true,
      textShadowColor: 'rgba(0,0,0,0.45)',
      textShadowIntensity: 5,
      textShadowX: 0,
      textShadowY: 1,
      borderWidth: 1,
      borderColor: '#5d5b4d',
      ownerBg: '#584600',
      ownerText: '#fff8d6',
      ownerNameColor: '#ffe45e',
      modBg: '#2f3446',
      modText: '#f0f3ff',
      modNameColor: '#8fb0ff',
      memberBg: '#213631',
      memberText: '#e9fff4',
      memberNameColor: '#5ff3b8',
      superchatBg: '#4e2c00',
      superchatText: '#fff1da',
      superchatHeaderBg: '#ff9f1c',
      superchatHeaderText: '#251100',
      superchatBorderColor: '#ffcf73',
      superchatBorderWidth: 2,
      superstickerBg: '#6b1414',
      superstickerText: '#ffe5d6',
      membershipGradientStart: '#4b531c',
      membershipGradientEnd: '#a0be3b',
      membershipBorderColor: '#d5f26a',
      membershipBorderWidth: 1,
    }
  },
  signal_bars: {
    label: 'Signal Bars',
    values: {
      useBars: true,
      useMaxWidth: false,
      bubbleMaxWidthPercent: 72,
      shapePreset: 'rectangle',
      bubbleRadius: 0,
      bgColor: '#09161c',
      textColor: '#dffbff',
      fontFamilyName: 'Audiowide',
      fontFamilyMessage: 'Exo 2',
      fontWeightName: 700,
      letterSpacing: 0,
      neonGlow: true,
      glowColor: '#00f2ff',
      glowIntensity: 10,
      showTextShadow: false,
      borderWidth: 0,
      ownerBg: '#0f1a1f',
      ownerText: '#fef7d7',
      ownerNameColor: '#ffd54a',
      modBg: '#111a2c',
      modText: '#f1f4ff',
      modNameColor: '#69a7ff',
      memberBg: '#0a1f1f',
      memberText: '#e8fffb',
      memberNameColor: '#37eac6',
      superchatBg: '#1b2f38',
      superchatText: '#f5fbff',
      superchatHeaderBg: '#0fd3ff',
      superchatHeaderText: '#041319',
      superchatBorderColor: '#7feeff',
      superchatBorderWidth: 0,
      superstickerBg: '#2f173d',
      superstickerText: '#fce8ff',
      membershipGradientStart: '#0e5d64',
      membershipGradientEnd: '#00d8a4',
      membershipBorderColor: '#6bffdf',
      membershipBorderWidth: 0,
    }
  },
  cyberpunk_red: {
    label: 'Cyberpunk Red',
    values: {
      useBars: false,
      useMaxWidth: true,
      shapePreset: 'skewed',
      skewAngle: -10,
      bgColor: '#080000',
      textColor: '#ff2a2a',
      fontFamilyName: 'Orbitron',
      fontFamilyMessage: 'Barlow',
      fontWeightName: 900,
      letterSpacing: 0.5,
      neonGlow: true,
      glowColor: '#ff0000',
      glowIntensity: 15,
      showTextShadow: true,
      borderWidth: 2,
      borderColor: '#3a0000',
      ownerBg: '#330000',
      ownerText: '#ff9999',
      ownerNameColor: '#ff0000',
      modBg: '#000000',
      modText: '#ff2a2a',
      modNameColor: '#ff5555',
    }
  },
  midnight_vapor: {
    label: 'Midnight Vapor',
    values: {
      useBars: false,
      useMaxWidth: true,
      shapePreset: 'rounded',
      bubbleRadius: 20,
      bgColor: '#1a0b2e',
      textColor: '#ff00ff',
      fontFamilyName: 'Audiowide',
      fontFamilyMessage: 'Rajdhani',
      fontWeightName: 700,
      letterSpacing: 0.2,
      neonGlow: true,
      glowColor: '#bc13fe',
      glowIntensity: 12,
      showTextShadow: true,
      borderWidth: 1,
      borderColor: '#4a148c',
      ownerBg: '#2e004f',
      ownerText: '#ffccff',
      ownerNameColor: '#e040fb',
      modBg: '#0d001a',
      modText: '#ff00ff',
      modNameColor: '#d500f9',
    }
  },
  frost_archive: {
    label: 'Frost Archive',
    values: {
      useBars: false,
      useMaxWidth: true,
      shapePreset: 'rounded',
      bubbleRadius: 12,
      bgColor: '#e0f7fa',
      textColor: '#006064',
      fontFamilyName: 'Space Mono',
      fontFamilyMessage: 'IBM Plex Mono',
      fontWeightName: 700,
      letterSpacing: 0,
      neonGlow: true,
      glowColor: '#b2ebf2',
      glowIntensity: 10,
      showTextShadow: false,
      borderWidth: 1,
      borderColor: '#80deea',
      ownerBg: '#ffffff',
      ownerText: '#004d40',
      ownerNameColor: '#00838f',
    }
  },
  bio_synth: {
    label: 'Bio-Synth',
    values: {
      useBars: false,
      useMaxWidth: true,
      shapePreset: 'skewed',
      skewAngle: -5,
      bgColor: '#0a1a0a',
      textColor: '#39ff14',
      fontFamilyName: 'Teko',
      fontFamilyMessage: 'Ubuntu',
      fontWeightName: 600,
      letterSpacing: 0.1,
      neonGlow: true,
      glowColor: '#39ff14',
      glowIntensity: 15,
      showTextShadow: true,
      borderWidth: 1,
      borderColor: '#1a3a1a',
      ownerBg: '#003300',
      ownerText: '#ccffcc',
      ownerNameColor: '#76ff03',
    }
  },
  vintage_terminal: {
    label: 'Vintage Terminal',
    values: {
      useBars: true,
      useMaxWidth: true,
      shapePreset: 'rectangle',
      bgColor: '#000000',
      textColor: '#ffb000',
      fontFamilyName: 'Fira Code',
      fontFamilyMessage: 'JetBrains Mono',
      fontWeightName: 400,
      letterSpacing: 0,
      neonGlow: true,
      glowColor: '#ffb000',
      glowIntensity: 8,
      showTextShadow: false,
      borderWidth: 0,
      ownerNameColor: '#ffffff',
    }
  },
  royal_guard: {
    label: 'Royal Guard',
    values: {
      useBars: false,
      useMaxWidth: true,
      shapePreset: 'rounded',
      bubbleRadius: 15,
      bgColor: '#0a0a0a',
      textColor: '#ffd700',
      fontFamilyName: 'Playfair Display',
      fontFamilyMessage: 'Montserrat',
      fontWeightName: 700,
      letterSpacing: 0.1,
      neonGlow: true,
      glowColor: '#ffd700',
      glowIntensity: 10,
      showTextShadow: true,
      borderWidth: 1,
      borderColor: '#333333',
      ownerBg: '#1a1a1a',
      ownerText: '#ffffff',
      ownerNameColor: '#ffcc00',
    }
  }
};

const initialState: Omit<ChatState, 'setField' | 'setSimRole' | 'setSimFreq' | 'applyPreset' | 'addExtraAsset' | 'updateExtraAsset' | 'removeExtraAsset' | 'reset'> = {
  activePreset: 'custom',
  direction: 'vertical',
  messageSpacing: 12,
  bubbleMaxWidthPercent: 86,
  bubbleRadius: 10,
  skewAngle: -5,
  shapePreset: 'rectangle',
  customMaskImage: null,
  useMaxWidth: true,
  chatboxPadding: 24,
  chatboxScale: 100,
  previewBgEnabled: true,
  chatboxBgColor: '#041215',
  chatboxBgOpacity: 0,
  chatboxBgRadius: 28,
  chatboxBgEnabled: false,
  chatboxBgImage: null,
  chatboxBgScale: 100,
  chatboxBgPosX: 50,
  chatboxBgPosY: 50,
  
  // Names
  fontFamilyName: 'Orbitron',
  customFontName: '',
  fontSizeName: 16,
  lineHeightName: 0,
  fontWeightName: 800,
  showBadges: true,
  showColonAfterName: false,
  nameOnNewLine: false,
  
  // Messages
  fontFamilyMessage: 'Rajdhani',
  customFontMessage: '',
  fontSizeMessage: 16,
  lineHeight: 1.25,
  letterSpacing: 0.2,
  textAlign: 'left',
  
  // Outline
  showOutline: false,
  outlineSize: 2,
  outlineColor: '#000000',
  
  // Glow
  neonGlow: true,
  glowColor: '#00f2ff',
  glowIntensity: 12,
  
  // Shadow
  showTextShadow: true,
  textShadowColor: 'rgba(0,0,0,0.35)',
  textShadowIntensity: 6,
  textShadowX: 0,
  textShadowY: 1,
  
  bgColor: '#102b36',
  textColor: '#d9f7ff',
  previewBgColor: '#020a0c',
  showAvatar: true,
  avatarSize: 40,
  
  // Timestamps
  showTimestamps: false,
  timestampFontSize: 12,
  timestampColor: '#999999',
  
  // Border
  borderWidth: 1,
  borderColor: '#1e5d73',
  
  // Backgrounds
  useBars: false,
  
  // Animation
  animateIn: true,
  fadeInTime: 200,
  animateOut: false,
  waitTime: 30,
  fadeOutTime: 200,
  slideDirection: 'none',
  
  ownerBg: '#2c3944',
  ownerText: '#f2f7ff',
  ownerNameColor: '#ffd54a',
  modBg: '#202f5f',
  modText: '#eff4ff',
  modNameColor: '#72a8ff',
  memberBg: '#123942',
  memberText: '#ecffff',
  memberNameColor: '#44f2d1',
  superchatBg: '#1a3d56',
  superchatText: '#f6fbff',
  superchatHeaderBg: '#25b8dc',
  superchatHeaderText: '#03131a',
  superchatBorderColor: '#7cecff',
  superchatBorderWidth: 2,
  superstickerBg: '#4d1d6c',
  superstickerText: '#ffe8ff',
  
  membershipGradientStart: '#0d7d7d',
  membershipGradientEnd: '#4cf0d2',
  membershipBorderColor: '#9afcff',
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

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({
    ...state,
    [field]: value,
    ...(field === 'activePreset' ? {} : { activePreset: 'custom' })
  })),
  setSimRole: (role, enabled) => set((state) => ({
    simEnabledRoles: { ...state.simEnabledRoles, [role]: enabled },
    activePreset: 'custom'
  })),
  setSimFreq: (role, freq) => set((state) => ({
    simRoleFrequencies: { ...state.simRoleFrequencies, [role]: freq },
    activePreset: 'custom'
  })),
  applyPreset: (preset) => set((state) => {
    if (preset === 'custom') {
      return { ...state, activePreset: 'custom' };
    }
    return {
      ...state,
      ...CHAT_PRESETS[preset].values,
      activePreset: preset
    };
  }),
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
    ],
    activePreset: 'custom'
  })),
  updateExtraAsset: (id, updates) => set((state) => ({
    extraAssets: state.extraAssets.map(a => a.id === id ? { ...a, ...updates } : a),
    activePreset: 'custom'
  })),
  removeExtraAsset: (id) => set((state) => ({
    extraAssets: state.extraAssets.filter(a => a.id !== id),
    activePreset: 'custom'
  })),
  reset: () => set(initialState),
}));
