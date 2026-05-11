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
  
  // Assets
  customBgImage: string | null; // Base64
  brandIcon: string | null; // Base64
  
  // Actions
  setField: (field: keyof ChatState, value: any) => void;
  reset: () => void;
}

const initialState = {
  direction: 'vertical',
  messageSpacing: 8,
  bubbleRadius: 4,
  skewAngle: -4,
  fontFamily: 'Rubik',
  fontSizeName: 15,
  fontSizeMessage: 15,
  lineHeight: 1.3,
  bgColor: 'rgba(0, 0, 0, 0.8)',
  textColor: '#FFFFFF',
  neonGlow: false,
  showAvatar: true,
  avatarSize: 36,
  ownerBg: 'rgba(255, 230, 70, 1.0)',
  ownerText: '#1A1A2E',
  modBg: 'rgba(99, 31, 255, 1.0)',
  modText: '#FFFFFF',
  memberBg: 'rgba(0, 255, 173, 1.0)',
  memberText: '#1A1A2E',
  customBgImage: null,
  brandIcon: null,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}));
