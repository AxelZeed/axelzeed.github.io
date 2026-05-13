export const generateCSS = (state: any) => {
  const s = state;
  const nameFont = s.customFontName || s.fontFamilyName;
  const msgFont = s.customFontMessage || s.fontFamilyMessage;
  const hexToRgba = (hex: string, opacity: number) => {
    const clean = hex.replace('#', '');
    const normalized = clean.length === 3
      ? clean.split('').map((c: string) => c + c).join('')
      : clean;
    const r = parseInt(normalized.slice(0, 2), 16) || 0;
    const g = parseInt(normalized.slice(2, 4), 16) || 0;
    const b = parseInt(normalized.slice(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  // Build font imports
  const fonts = new Set([nameFont, msgFont]);
  const fontImports = Array.from(fonts)
    .map(f => `@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(f).replace(/%20/g, '+')}&display=swap');`)
    .join('\n');

  // Shape
  let shapeCSS = '';
  switch (s.shapePreset) {
    case 'skewed': shapeCSS = `transform: skewX(${s.skewAngle}deg) !important;`; break;
    case 'rounded': shapeCSS = `border-radius: ${s.bubbleRadius}px !important;`; break;
    case 'irregular': shapeCSS = `clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%) !important;`; break;
    case 'cute': shapeCSS = `border-radius: 60% 40% 60% 40% / 40% 60% 40% 60% !important;`; break;
    case 'custom_mask': shapeCSS = s.customMaskImage ? `-webkit-mask-image: url('${s.customMaskImage}'); mask-image: url('${s.customMaskImage}'); -webkit-mask-size: cover; mask-size: cover;` : ''; break;
    default: shapeCSS = `border-radius: ${s.bubbleRadius}px !important;`;
  }

  const outlineCSS = s.showOutline ? `-webkit-text-stroke: ${s.outlineSize}px ${s.outlineColor}; paint-order: stroke fill;` : '';
  const bubbleMaxWidth = `min(${s.bubbleMaxWidthPercent}%, calc(100% - 24px))`;
  const bubbleWidthCSS = s.useMaxWidth
    ? `width: ${bubbleMaxWidth} !important; max-width: ${bubbleMaxWidth} !important;`
    : `width: fit-content !important; max-width: ${bubbleMaxWidth} !important;`;
  const chatScale = Math.max((s.chatboxScale || 100) / 100, 0.1);
  const chatScaleWidth = `${(100 / chatScale).toFixed(4)}%`;
  const chatboxBg = hexToRgba(s.chatboxBgColor || '#000000', s.chatboxBgOpacity ?? 0);
  const chatboxBgEnabled = Boolean(s.chatboxBgEnabled && ((s.chatboxBgOpacity ?? 0) > 0 || s.chatboxBgImage));

  // Animation keyframes
  let animCSS = '';
  if (s.animateIn || s.animateOut) {
    const slideIn = s.slideDirection === 'left' ? 'translateX(-30px)' : s.slideDirection === 'right' ? 'translateX(30px)' : s.slideDirection === 'top' ? 'translateY(-20px)' : s.slideDirection === 'bottom' ? 'translateY(20px)' : '';
    animCSS = `
@keyframes chatIn { from { opacity:0; ${slideIn ? `transform:${slideIn};` : ''} } to { opacity:1; transform:none; } }
@keyframes chatOut { from { opacity:1; } to { opacity:0; } }`;
  }

  return `
/* ══════════════════════════════════════════
   AXEL ZEED CUSTOM LIVE CHAT GENERATOR v3.2
   ══════════════════════════════════════════ */
${fontImports}
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

${animCSS}

:root {
  --chat-bg: ${s.bgColor};
  --chat-text: ${s.textColor};
  --owner-bg: ${s.ownerBg};
  --owner-text: ${s.ownerText};
  --owner-name: ${s.ownerNameColor};
  --mod-bg: ${s.modBg};
  --mod-text: ${s.modText};
  --mod-name: ${s.modNameColor};
  --member-bg: ${s.memberBg};
  --member-text: ${s.memberText};
  --member-name: ${s.memberNameColor};
  --superchat-bg: ${s.superchatBg};
  --superchat-text: ${s.superchatText};
  --superchat-header-bg: ${s.superchatHeaderBg};
  --superchat-header-text: ${s.superchatHeaderText};
  --superchat-border: ${s.superchatBorderColor};
  --supersticker-bg: ${s.superstickerBg};
  --supersticker-text: ${s.superstickerText};
  --font-name: '${nameFont}', sans-serif;
  --font-msg: '${msgFont}', sans-serif;
}

/* ── Transparent Background ── */
body {
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
}

yt-live-chat-app,
yt-live-chat-renderer,
yt-live-chat-item-list-renderer {
  background: transparent !important;
}

yt-live-chat-renderer,
yt-live-chat-item-list-renderer,
yt-live-chat-item-list-renderer #item-scroller,
yt-live-chat-item-list-renderer #items {
  position: relative !important;
}

/* ── Overflow & Containment Fix ── */
yt-live-chat-text-message-renderer,
yt-live-chat-paid-message-renderer,
yt-live-chat-paid-sticker-renderer,
yt-live-chat-membership-item-renderer {
  overflow: visible !important;
  contain: none !important;
}

/* ── Hide Scrollbar & Chatbox Container ── */
yt-live-chat-item-list-renderer {
  overflow: hidden !important;
  padding: ${s.chatboxPadding}px !important;
  box-sizing: border-box !important;
  border-radius: ${s.chatboxBgRadius}px !important;
  background: ${chatboxBgEnabled ? chatboxBg : 'transparent'} !important;
  position: relative !important;
  isolation: isolate !important;
}
yt-live-chat-item-list-renderer #item-scroller {
  overflow: hidden !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  border-radius: inherit !important;
  background: transparent !important;
  position: relative !important;
  z-index: 2 !important;
}
yt-live-chat-item-list-renderer #items {
  overflow: visible !important;
  transform: scale(${chatScale}) !important;
  transform-origin: top left !important;
  width: ${chatScaleWidth} !important;
  position: relative !important;
  z-index: 2 !important;
}

/* Ensure every message bubble is above any chatbox background layer */
yt-live-chat-text-message-renderer,
yt-live-chat-paid-message-renderer,
yt-live-chat-paid-sticker-renderer,
yt-live-chat-membership-item-renderer {
  position: relative !important;
  z-index: 3 !important;
}

${chatboxBgEnabled && s.chatboxBgImage ? `
yt-live-chat-item-list-renderer::before {
  content: '';
  position: absolute;
  top: ${s.chatboxBgPosY}%;
  left: ${s.chatboxBgPosX}%;
  width: ${s.chatboxBgScale}%;
  height: ${s.chatboxBgScale}%;
  background: url('${s.chatboxBgImage}') no-repeat center !important;
  background-size: cover !important;
  transform: translate(-50%, -50%);
  opacity: ${s.chatboxBgOpacity};
  pointer-events: none;
  border-radius: inherit;
  z-index: 0 !important;
}` : ''}

/* ── Hide UI Chrome ── */
yt-live-chat-header-renderer,
#panel-pages,
yt-live-chat-message-input-renderer,
yt-live-chat-mode-change-message-renderer,
yt-live-chat-viewer-engagement-message-renderer,
yt-live-chat-server-error-message,
yt-live-chat-banner-manager,
yt-live-chat-restricted-participation-renderer,
yt-live-chat-ticker-renderer,
yt-live-chat-moderation-message-renderer,
yt-live-chat-auto-mod-message-renderer,
div#reaction-control-panel-overlay.yt-live-chat-renderer,
div#separator.yt-live-chat-renderer,
#menu {
  display: none !important;
}

/* ── Timestamps ── */
yt-live-chat-text-message-renderer #timestamp,
yt-live-chat-paid-sticker-renderer #timestamp,
yt-live-chat-paid-message-renderer #timestamp {
  display: ${s.showTimestamps ? 'inline' : 'none'} !important;
  ${s.showTimestamps ? `font-size: ${s.timestampFontSize}px !important; color: ${s.timestampColor} !important; font-family: var(--font-msg) !important;` : ''}
}

/* ══════ Message Container ══════ */
yt-live-chat-text-message-renderer {
  background-color: ${s.useBars ? 'transparent' : 'var(--chat-bg)'} !important;
  ${s.useBars ? `border-left: 4px solid var(--chat-text) !important; border-radius: 0 !important;` : ''}
  ${!s.useBars ? shapeCSS : ''}
  ${s.borderWidth > 0 && !s.useBars ? `border: ${s.borderWidth}px solid ${s.borderColor} !important;` : ''}
  ${s.neonGlow ? `filter: drop-shadow(0 0 ${s.glowIntensity}px ${s.glowColor}) !important;` : ''}
  ${bubbleWidthCSS}
  box-sizing: border-box !important;
  margin: ${s.messageSpacing + 10}px 12px ${s.messageSpacing}px 12px !important;
  margin-right: auto !important;
  padding: 12px 20px !important;
  position: relative !important;
  ${s.animateIn ? `animation: chatIn ${s.fadeInTime}ms ease-out !important; animation-fill-mode: both !important;` : ''}
}

${s.animateOut ? `
yt-live-chat-text-message-renderer {
  animation: chatIn ${s.fadeInTime}ms ease-out, chatOut ${s.fadeOutTime}ms ease-in ${s.waitTime}s forwards !important;
  animation-fill-mode: both !important;
}` : ''}

/* ── Counter-skew for content ── */
${s.shapePreset === 'skewed' ? `
yt-live-chat-text-message-renderer #author-photo,
yt-live-chat-text-message-renderer #content,
yt-live-chat-paid-message-renderer #author-photo,
yt-live-chat-paid-message-renderer #header,
yt-live-chat-paid-message-renderer #content,
yt-live-chat-paid-sticker-renderer #author-photo,
yt-live-chat-paid-sticker-renderer #content {
  transform: skewX(${-s.skewAngle}deg) !important;
}` : ''}

/* ── Content Container ── */
yt-live-chat-text-message-renderer #content,
yt-live-chat-paid-message-renderer #content,
yt-live-chat-paid-sticker-renderer #content {
  overflow: initial !important;
  position: relative !important;
  width: 100% !important;
  display: block !important;
}

/* ── Avatar ── */
yt-img-shadow#author-photo.yt-live-chat-text-message-renderer,
yt-img-shadow#author-photo.yt-live-chat-text-message-renderer img,
yt-live-chat-paid-message-renderer #author-photo,
yt-live-chat-paid-message-renderer #author-photo img,
yt-live-chat-paid-sticker-renderer #author-photo,
yt-live-chat-paid-sticker-renderer #author-photo img {
  display: ${s.showAvatar ? 'block' : 'none'} !important;
  width: ${s.avatarSize}px !important;
  height: ${s.avatarSize}px !important;
  border-radius: 50% !important;
  margin-right: 14px !important;
  background: linear-gradient(135deg, rgba(0, 242, 255, 0.45), rgba(255, 255, 255, 0.15)) !important;
  overflow: hidden !important;
  object-fit: cover !important;
}

yt-live-chat-text-message-renderer #author-photo img,
yt-live-chat-paid-message-renderer #author-photo img,
yt-live-chat-paid-sticker-renderer #author-photo img {
  display: ${s.showAvatar ? 'block' : 'none'} !important;
  width: ${s.avatarSize}px !important;
  height: ${s.avatarSize}px !important;
  object-fit: cover !important;
}

/* ── Author Name ── */
yt-live-chat-text-message-renderer #author-name,
yt-live-chat-paid-message-renderer #author-name,
yt-live-chat-paid-sticker-renderer #author-name {
  color: var(--chat-text) !important;
  font-family: var(--font-name) !important;
  font-size: ${s.fontSizeName}px !important;
  font-weight: ${s.fontWeightName} !important;
  ${s.lineHeightName > 0 ? `line-height: ${s.lineHeightName}px !important;` : ''}
  letter-spacing: ${s.letterSpacing}px !important;
  ${outlineCSS}
  ${s.showTextShadow ? `text-shadow: ${s.textShadowX}px ${s.textShadowY}px ${s.textShadowIntensity}px ${s.textShadowColor} !important;` : ''}
  ${s.nameOnNewLine ? 'display: block !important;' : ''}
}

${s.showColonAfterName ? `
yt-live-chat-text-message-renderer #author-name::after,
yt-live-chat-paid-message-renderer #author-name::after,
yt-live-chat-paid-sticker-renderer #author-name::after {
  content: ':';
}` : ''}

/* ── Badges ── */
yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer,
yt-live-chat-paid-message-renderer yt-live-chat-author-badge-renderer,
yt-live-chat-paid-sticker-renderer yt-live-chat-author-badge-renderer {
  display: ${s.showBadges ? 'inline-block' : 'none'} !important;
}

/* ── Message Text ── */
yt-live-chat-text-message-renderer #message,
yt-live-chat-text-message-renderer #message * {
  color: var(--chat-text) !important;
  font-family: var(--font-msg) !important;
  font-size: ${s.fontSizeMessage}px !important;
  line-height: ${s.lineHeight}em !important;
  text-align: ${s.textAlign} !important;
  letter-spacing: ${s.letterSpacing}px !important;
  ${outlineCSS}
  ${s.showTextShadow ? `text-shadow: ${s.textShadowX}px ${s.textShadowY}px ${s.textShadowIntensity}px ${s.textShadowColor} !important;` : ''}
}

yt-live-chat-text-message-renderer #message {
  display: block !important;
  width: 100% !important;
}

/* ── Deleted messages ── */
yt-live-chat-text-message-renderer[is-deleted],
yt-live-chat-membership-item-renderer[is-deleted] {
  display: none !important;
}

/* ══════ Role Styles ══════ */

/* Owner */
yt-live-chat-text-message-renderer[author-type="owner"] {
  background-color: ${s.useBars ? 'transparent' : 'var(--owner-bg)'} !important;
  ${s.useBars ? `border-left-color: var(--owner-name) !important;` : ''}
}
yt-live-chat-text-message-renderer[author-type="owner"] #author-name,
yt-live-chat-text-message-renderer #author-name[type="owner"],
yt-live-chat-text-message-renderer #author-name.owner {
  color: var(--owner-name) !important;
}
yt-live-chat-text-message-renderer[author-type="owner"] #message,
yt-live-chat-text-message-renderer[author-type="owner"] #message * {
  color: var(--owner-text) !important;
}

/* Moderator */
yt-live-chat-text-message-renderer[author-type="moderator"] {
  background-color: ${s.useBars ? 'transparent' : 'var(--mod-bg)'} !important;
  ${s.useBars ? `border-left-color: var(--mod-name) !important;` : ''}
}
yt-live-chat-text-message-renderer[author-type="moderator"] #author-name,
yt-live-chat-text-message-renderer #author-name[type="moderator"],
yt-live-chat-text-message-renderer #author-name.moderator {
  color: var(--mod-name) !important;
}
yt-live-chat-text-message-renderer[author-type="moderator"] #message,
yt-live-chat-text-message-renderer[author-type="moderator"] #message * {
  color: var(--mod-text) !important;
}

/* Member */
yt-live-chat-text-message-renderer[author-type="member"] {
  background-color: ${s.useBars ? 'transparent' : 'var(--member-bg)'} !important;
  ${s.useBars ? `border-left-color: var(--member-name) !important;` : ''}
}
yt-live-chat-text-message-renderer[author-type="member"] #author-name,
yt-live-chat-text-message-renderer #author-name[type="member"],
yt-live-chat-text-message-renderer #author-name.member {
  color: var(--member-name) !important;
}
yt-live-chat-text-message-renderer[author-type="member"] #message,
yt-live-chat-text-message-renderer[author-type="member"] #message * {
  color: var(--member-text) !important;
}

/* ══════ SuperChat ══════ */
yt-live-chat-paid-message-renderer {
  background-color: var(--superchat-bg) !important;
  ${s.useBars ? `border-left: 4px solid var(--superchat-border) !important; border-radius: 0 !important;` : shapeCSS}
  ${s.superchatBorderWidth > 0 ? `border: ${s.superchatBorderWidth}px solid var(--superchat-border) !important;` : ''}
  margin: ${s.messageSpacing + 10}px 12px ${s.messageSpacing}px 12px !important;
  margin-right: auto !important;
  padding: 12px 20px !important;
  position: relative !important;
  ${s.neonGlow ? `filter: drop-shadow(0 0 ${s.glowIntensity}px ${s.glowColor}) !important;` : ''}
  ${bubbleWidthCSS}
  box-sizing: border-box !important;
}
yt-live-chat-paid-message-renderer #header {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 0 8px 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
}
yt-live-chat-paid-message-renderer #header #author-name,
yt-live-chat-paid-message-renderer #header #author-name * {
  color: var(--superchat-header-text) !important;
  font-family: var(--font-name) !important;
  font-size: ${s.fontSizeName}px !important;
  font-weight: ${s.fontWeightName} !important;
  letter-spacing: ${s.letterSpacing}px !important;
}
yt-live-chat-paid-message-renderer #header yt-live-chat-author-chip {
  display: inline-flex !important;
  align-items: center !important;
  padding: 3px 8px !important;
  border-radius: 999px !important;
  background: var(--superchat-header-bg) !important;
}
yt-live-chat-paid-message-renderer #header #timestamp {
  color: var(--superchat-header-text) !important;
  opacity: 0.72 !important;
}
yt-live-chat-paid-message-renderer #content {
  display: block !important;
  width: 100% !important;
}
yt-live-chat-paid-message-renderer #content #message,
yt-live-chat-paid-message-renderer #content #message * {
  color: var(--superchat-text) !important;
  font-family: var(--font-msg) !important;
  font-size: ${s.fontSizeMessage}px !important;
  line-height: ${s.lineHeight}em !important;
  text-align: ${s.textAlign} !important;
  letter-spacing: ${s.letterSpacing}px !important;
  ${outlineCSS}
  ${s.showTextShadow ? `text-shadow: ${s.textShadowX}px ${s.textShadowY}px ${s.textShadowIntensity}px ${s.textShadowColor} !important;` : ''}
}
div#menu.yt-live-chat-paid-message-renderer,
div#gradient-container.yt-live-chat-paid-message-renderer,
div#creator-heart-button.yt-live-chat-paid-message-renderer,
div#footer.yt-live-chat-paid-message-renderer,
div#action-buttons.yt-live-chat-paid-message-renderer {
  display: none !important;
}
yt-live-chat-paid-message-renderer #card,
yt-live-chat-paid-sticker-renderer #card {
  box-shadow: none !important;
}

/* ══════ Super Sticker ══════ */
yt-live-chat-paid-sticker-renderer {
  background-color: var(--supersticker-bg) !important;
  ${s.useBars ? `border-left: 4px solid var(--supersticker-text) !important; border-radius: 0 !important;` : shapeCSS}
  margin: ${s.messageSpacing + 10}px 12px ${s.messageSpacing}px 12px !important;
  margin-right: auto !important;
  padding: 12px 20px !important;
  position: relative !important;
  ${s.neonGlow ? `filter: drop-shadow(0 0 ${s.glowIntensity}px ${s.glowColor}) !important;` : ''}
  ${bubbleWidthCSS}
  box-sizing: border-box !important;
}
yt-live-chat-paid-sticker-renderer #author-name {
  color: var(--supersticker-text) !important;
  font-family: var(--font-name) !important;
  font-size: ${s.fontSizeName}px !important;
  font-weight: ${s.fontWeightName} !important;
  letter-spacing: ${s.letterSpacing}px !important;
}
yt-live-chat-paid-sticker-renderer #timestamp {
  color: var(--supersticker-text) !important;
  opacity: 0.72 !important;
}
yt-live-chat-paid-sticker-renderer #content {
  display: block !important;
  width: 100% !important;
}
yt-live-chat-paid-sticker-renderer #content #message,
yt-live-chat-paid-sticker-renderer #content #message * {
  color: var(--supersticker-text) !important;
  font-family: var(--font-msg) !important;
  font-size: ${s.fontSizeMessage}px !important;
  line-height: ${s.lineHeight}em !important;
  text-align: ${s.textAlign} !important;
  letter-spacing: ${s.letterSpacing}px !important;
  ${outlineCSS}
  ${s.showTextShadow ? `text-shadow: ${s.textShadowX}px ${s.textShadowY}px ${s.textShadowIntensity}px ${s.textShadowColor} !important;` : ''}
}

/* ══════ Membership ══════ */
yt-live-chat-membership-item-renderer {
  background: linear-gradient(135deg, ${s.membershipGradientStart}, ${s.membershipGradientEnd}) !important;
  ${s.membershipBorderWidth > 0 ? `border: ${s.membershipBorderWidth}px solid ${s.membershipBorderColor} !important;` : ''}
  margin: ${s.messageSpacing + 10}px 12px ${s.messageSpacing}px 12px !important;
  margin-right: auto !important;
  ${bubbleWidthCSS}
  box-sizing: border-box !important;
}
yt-live-chat-membership-item-renderer #card {
  box-shadow: none !important;
}

/* ══════ Background Texture ══════ */
${s.customBgImage && s.bgTextureEnabled ? `
yt-live-chat-text-message-renderer,
yt-live-chat-paid-message-renderer,
yt-live-chat-paid-sticker-renderer {
  isolation: isolate !important;
}
yt-live-chat-text-message-renderer::before,
yt-live-chat-paid-message-renderer::before,
yt-live-chat-paid-sticker-renderer::before {
  content: '';
  position: absolute;
  top: ${s.bgPosY}%; left: ${s.bgPosX}%;
  width: ${s.bgScale}%; height: ${s.bgScale}%;
  background: url('${s.customBgImage}') no-repeat center;
  background-size: cover;
  transform: translate(-50%, -50%) rotate(${s.bgRotate}deg);
  opacity: ${s.bgOpacity};
  z-index: 0 !important;
  pointer-events: none;
  border-radius: inherit;
}
yt-live-chat-text-message-renderer #content,
yt-live-chat-text-message-renderer yt-img-shadow,
yt-live-chat-paid-message-renderer #card,
yt-live-chat-paid-message-renderer yt-img-shadow,
yt-live-chat-paid-sticker-renderer #card,
yt-live-chat-paid-sticker-renderer yt-img-shadow {
  position: relative !important;
  z-index: 1 !important;
}` : ''}

/* ══════ Brand Icon ══════ */
${s.brandIcon && s.logoEnabled ? `
yt-live-chat-text-message-renderer #content::after,
yt-live-chat-paid-message-renderer #content::after,
yt-live-chat-paid-sticker-renderer #content::after {
  content: '';
  position: absolute;
  top: ${s.logoPosY}%; left: ${s.logoPosX}%;
  width: ${s.logoScale}px; height: ${s.logoScale}px;
  background: url('${s.brandIcon}') no-repeat center;
  background-size: contain;
  transform: translate(-50%, -50%) rotate(${s.logoRotate}deg);
  opacity: ${s.logoOpacity};
  z-index: 10;
  pointer-events: none;
}` : ''}

/* ══════ Extra Assets ══════ */
${s.extraAssets?.map((a: any, i: number) => {
  // Map up to 4 extra assets to available unused pseudo-elements
  const pseudo = i === 0 ? 'yt-live-chat-text-message-renderer::after' :
                 i === 1 ? 'yt-live-chat-text-message-renderer #message::before' :
                 i === 2 ? 'yt-live-chat-text-message-renderer #message::after' :
                 i === 3 ? 'yt-live-chat-text-message-renderer #author-name::before' : '';
  if (!pseudo) return '';
  return `
${pseudo} {
  content: '';
  position: absolute;
  top: ${a.posY}%; left: ${a.posX}%;
  width: ${a.scale}px; height: ${a.scale}px;
  background: url('${a.src}') no-repeat center;
  background-size: contain;
  transform: translate(-50%, -50%) rotate(${a.rotate}deg);
  opacity: ${a.opacity};
  z-index: 20;
  pointer-events: none;
}`;
}).join('\n') || ''}

/* ══════ Emoji Size ══════ */
#message > img,
img.yt-live-chat-text-message-renderer {
  width: 28px !important;
  height: 28px !important;
  margin: 0 !important;
  padding: 0px 3px !important;
}

/* ══════ Misc Cleanup ══════ */
yt-live-chat-app {
  min-height: 0px;
  min-width: 0px;
  word-break: break-all;
}

.mention.style-scope {
  background-color: unset;
}

yt-live-chat-text-message-renderer a,
yt-live-chat-membership-item-renderer a {
  text-decoration: none !important;
}

yt-live-chat-upsell-dialog-renderer {
  display: none;
}
  `.trim();
};
