import { AnimationStyle } from './store';

export const generateCSS = (state: any) => {
  const {
    direction,
    messageSpacing,
    bubbleRadius,
    skewAngle,
    fontFamily,
    fontSizeName,
    fontSizeMessage,
    lineHeight,
    bgColor,
    textColor,
    neonGlow,
    showAvatar,
    avatarSize,
    ownerBg,
    ownerText,
    modBg,
    modText,
    memberBg,
    memberText,
    customBgImage,
    brandIcon,
  } = state;

  const skewReverse = -skewAngle;
  
  return `
/* ==========================================
   AXEL ZEED CUSTOM LIVE CHAT GENERATOR
   ========================================== */
@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@400;700;900&display=swap');

:root {
  --chat-bg: ${bgColor};
  --chat-text: ${textColor};
  --owner-bg: ${ownerBg};
  --owner-text: ${ownerText};
  --mod-bg: ${modBg};
  --mod-text: ${modText};
  --member-bg: ${memberBg};
  --member-text: ${memberText};
  --font-main: '${fontFamily}', sans-serif;
  --skew-angle: ${skewAngle}deg;
  --skew-reverse: ${skewReverse}deg;
}

body {
  background-color: transparent;
  overflow: hidden;
}

yt-live-chat-renderer {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer {
  background: var(--chat-bg) !important;
  margin: ${messageSpacing}px 12px !important;
  padding: 10px 16px !important;
  border-radius: ${bubbleRadius}px !important;
  transform: skewX(var(--skew-angle)) !important;
  ${neonGlow ? `box-shadow: 0 0 15px var(--chat-bg) !important;` : ''}
  transition: all 0.3s ease;
  overflow: visible !important;
  position: relative !important;
}

/* Brand Icon Implementation */
${brandIcon ? `
yt-live-chat-text-message-renderer::after {
  content: '';
  position: absolute;
  top: -5px;
  right: -5px;
  width: 24px;
  height: 24px;
  background: url('${brandIcon}') no-repeat center;
  background-size: contain;
  transform: skewX(var(--skew-reverse));
  z-index: 10;
  filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.5));
}
` : ''}

/* Counter-skew content */
yt-live-chat-text-message-renderer #author-photo,
yt-live-chat-text-message-renderer #content {
  transform: skewX(var(--skew-reverse)) !important;
}

yt-live-chat-text-message-renderer #author-photo {
  display: ${showAvatar ? 'block' : 'none'} !important;
  width: ${avatarSize}px !important;
  height: ${avatarSize}px !important;
  border-radius: 50% !important;
  margin-right: 12px !important;
}

yt-live-chat-text-message-renderer #author-name {
  color: var(--chat-text) !important;
  font-family: var(--font-main) !important;
  font-size: ${fontSizeName}px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  ${neonGlow ? `text-shadow: 0 0 5px var(--chat-text) !important;` : ''}
}

yt-live-chat-text-message-renderer #message {
  color: var(--chat-text) !important;
  font-family: var(--font-main) !important;
  font-size: ${fontSizeMessage}px !important;
  line-height: ${lineHeight} !important;
}

/* Role Specifics */
yt-live-chat-text-message-renderer[author-type="owner"] {
  background: var(--owner-bg) !important;
}
yt-live-chat-text-message-renderer[author-type="owner"] #author-name,
yt-live-chat-text-message-renderer[author-type="owner"] #message {
  color: var(--owner-text) !important;
  text-shadow: none !important;
}

yt-live-chat-text-message-renderer[author-type="moderator"] {
  background: var(--mod-bg) !important;
}
yt-live-chat-text-message-renderer[author-type="moderator"] #author-name,
yt-live-chat-text-message-renderer[author-type="moderator"] #message {
  color: var(--mod-text) !important;
  text-shadow: none !important;
}

yt-live-chat-text-message-renderer[author-type="member"] {
  background: var(--member-bg) !important;
}
yt-live-chat-text-message-renderer[author-type="member"] #author-name,
yt-live-chat-text-message-renderer[author-type="member"] #message {
  color: var(--member-text) !important;
  text-shadow: none !important;
}

${customBgImage ? `
yt-live-chat-text-message-renderer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('${customBgImage}');
  background-size: cover;
  opacity: 0.2;
  z-index: -1;
  border-radius: ${bubbleRadius}px;
}
` : ''}

/* Hide Unnecessary UI */
yt-live-chat-header-renderer,
yt-live-chat-message-input-renderer,
yt-live-chat-mode-change-message-renderer,
#action-buttons,
#timestamp {
  display: none !important;
}
  `.trim();
};
