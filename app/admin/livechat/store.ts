import { create } from 'zustand';

export type AnimationStyle = 'fade' | 'slide' | 'bounce' | 'glitch' | 'pop';

interface ChatState {
  // Layout
  direction: 'vertical' | 'horizontal';
  messageSpacing: number;
  bubbleRadius: number;
  skewAngle: number;
  
  // Typography
  fontFamily: string;
  fontSizeName: number;
  fontSizeMessage: number;
  lineHeight: number;
  
  // Visuals
  bgColor: string;
  textColor: string;
  neonGlow: boolean;
  showAvatar: boolean;
  avatarSize: number;
  
  // Roles
  ownerBg: string;
  ownerText: string;
  modBg: string;
  modText: string;
  memberBg: string;
  memberText: string;
  superchatBg: string;
  superchatText: string;
  
  // Assets & Image Customization
  customBgImage: string | null;
  bgImageOpacity: number;
  bgImagePositionX: number;
  bgImagePositionY: number;
  bgImageSkewX: number;
  bgImageSkewY: number;
  brandIcon: string | null;
  liveChatAssetIndex: number; // 0-5 for livechat_n.png
  
  // App State
  isLivePreviewEnabled: boolean;
  
  // Actions
  setField: (field: keyof ChatState, value: any) => void;
  reset: () => void;
}

const initialState: Omit<ChatState, 'setField' | 'reset'> = {
  direction: 'vertical',
  messageSpacing: 12,
  bubbleRadius: 40,
  skewAngle: -5,
  fontFamily: 'Rubik',
  fontSizeName: 16,
  fontSizeMessage: 16,
  lineHeight: 1.2,
  bgColor: 'rgba(0, 242, 255, 0.8)',
  textColor: '#FFFFFF',
  neonGlow: true,
  showAvatar: true,
  avatarSize: 40,
  ownerBg: 'rgba(255, 230, 70, 1.0)',
  ownerText: '#1A1A2E',
  modBg: 'rgba(99, 31, 255, 1.0)',
  modText: '#FFFFFF',
  memberBg: 'rgba(0, 255, 173, 1.0)',
  memberText: '#1A1A2E',
  superchatBg: 'rgba(255, 115, 0, 1.0)',
  superchatText: '#FFFFFF',
  customBgImage: null,
  bgImageOpacity: 0.3,
  bgImagePositionX: 50,
  bgImagePositionY: 50,
  bgImageSkewX: 0,
  bgImageSkewY: 0,
  brandIcon: null,
  liveChatAssetIndex: 0,
  isLivePreviewEnabled: true,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}));
