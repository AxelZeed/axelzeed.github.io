"use client";
import React, { useState, useRef } from 'react';
import { useChatStore, ShapePreset, GOOGLE_FONTS, CHAT_PRESETS } from '../store';
import { Type, Layout, Palette, Image as ImageIcon, ChevronDown, ChevronUp, RefreshCcw, Sparkles, Plus, Trash2, AlignLeft, AlignCenter, AlignRight, AlignJustify, Eye, EyeOff, Film } from 'lucide-react';

const Acc: React.FC<{ t: string; icon: any; children: React.ReactNode; open?: boolean }> = ({ t, icon: I, children, open = false }) => {
  const [o, setO] = useState(open);
  return (<div className="border-b border-white/5"><button onClick={() => setO(!o)} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"><div className="flex items-center gap-3"><I size={18} className="text-neon-cyan" /><span className="text-[10px] font-ethnocentric tracking-widest">{t.toUpperCase()}</span></div>{o ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>{o && <div className="p-5 bg-black/20 space-y-4">{children}</div>}</div>);
};
const Lbl = ({ c }: { c: string }) => <label className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 block">{c}</label>;
const Rng = ({ l, v, mn, mx, s, fn }: { l: string; v: number; mn: number; mx: number; s?: number; fn: (n: number) => void }) => (<div><div className="flex justify-between mb-1"><span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">{l}</span><span className="text-[10px] font-mono text-neon-cyan">{v}</span></div><input type="range" min={mn} max={mx} step={s || 1} value={v} onChange={e => fn(Number(e.target.value))} className="w-full accent-neon-cyan" /></div>);
const Tog = ({ l, v, fn }: { l: string; v: boolean; fn: () => void }) => (<div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-white/10" onClick={fn}><span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{l}</span><input type="checkbox" checked={v} readOnly className="w-4 h-4 accent-neon-cyan pointer-events-none" /></div>);

export const ControlPanel = () => {
  const s = useChatStore();
  const chatboxBgInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const up = (e: React.ChangeEvent<HTMLInputElement>, f: 'customBgImage' | 'brandIcon' | 'customMaskImage' | 'chatboxBgImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        alert("⚠️ FILE OVERSIZE EXCEEDED: Limit images to under 2.5MB to prevent OBS performance lag.");
        if (e.target) e.target.value = '';
        return;
      }
      const r = new FileReader();
      r.onloadend = () => { if (typeof r.result === 'string') s.setField(f, r.result); };
      r.readAsDataURL(file);
    }
  };
  const upX = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        alert("⚠️ FILE OVERSIZE EXCEEDED: Limit images to under 2.5MB to prevent OBS performance lag.");
        if (e.target) e.target.value = '';
        return;
      }
      const r = new FileReader();
      r.onloadend = () => s.addExtraAsset(r.result as string);
      r.readAsDataURL(file);
      e.target.value = '';
    }
  };
  const hex = (v: string | undefined | null) => { if (!v) return '#000000'; if (v.startsWith('#')) return v; return '#000000'; };
  const sel = "w-full bg-black/40 border border-white/10 p-3 text-xs font-mono outline-none focus:border-neon-cyan text-white";

  return (
    <div className="flex flex-col h-full bg-[#05161a] border-r border-neon-cyan/20">
      <div className="p-5 border-b border-neon-cyan/10 flex justify-between items-center bg-[#041215] shrink-0">
        <h2 className="text-sm font-ethnocentric tracking-tighter text-neon-cyan flex items-center gap-2"><Sparkles size={16} />CONFIG TERMINAL</h2>
        <button onClick={() => s.reset()} className="p-2 hover:bg-white/5 rounded text-gray-500 hover:text-white"><RefreshCcw size={14} /></button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">

        <div className="p-5 border-b border-white/5 bg-black/20">
          <p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest mb-3">// PRESETS</p>
          <select value={s.activePreset} onChange={e => s.applyPreset(e.target.value as any)} className={sel}>
            <option value="custom">CUSTOM CURRENT</option>
            {Object.entries(CHAT_PRESETS).map(([key, preset]) => (
              <option key={key} value={key}>{preset.label.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* ═══ LAYOUT ═══ */}
        <Acc t="Layout & Behavior" icon={Layout} open={true}>
          <div className="space-y-4">
            <Tog l="Always Max Width" v={s.useMaxWidth} fn={() => s.setField('useMaxWidth', !s.useMaxWidth)} />
            <Tog l="Use Bars Style" v={s.useBars} fn={() => s.setField('useBars', !s.useBars)} />
            <Tog l="Chatbox BG Enabled" v={s.chatboxBgEnabled} fn={() => s.setField('chatboxBgEnabled', !s.chatboxBgEnabled)} />
            <Rng l="Bubble Max Width %" v={s.bubbleMaxWidthPercent} mn={40} mx={100} fn={n => s.setField('bubbleMaxWidthPercent', n)} />
            <div><Lbl c="Shape Preset" /><select value={s.shapePreset} onChange={e => s.setField('shapePreset', e.target.value as ShapePreset)} className={sel}><option value="rectangle">RECTANGLE</option><option value="skewed">SKEWED</option><option value="rounded">ROUNDED</option><option value="irregular">IRREGULAR</option><option value="cute">CUTE BUBBLE</option><option value="custom_mask">CUSTOM MASK</option></select></div>
            <Rng l="Message Spacing" v={s.messageSpacing} mn={0} mx={100} fn={n => s.setField('messageSpacing', n)} />
            <Rng l="Chatbox Padding" v={s.chatboxPadding} mn={0} mx={80} fn={n => s.setField('chatboxPadding', n)} />
            <Rng l="Chatbox Scale %" v={s.chatboxScale} mn={50} mx={150} fn={n => s.setField('chatboxScale', n)} />
            <Rng l="Chatbox Radius" v={s.chatboxBgRadius} mn={0} mx={60} fn={n => s.setField('chatboxBgRadius', n)} />
            {s.shapePreset !== 'skewed' && s.shapePreset !== 'irregular' && s.shapePreset !== 'cute' && s.shapePreset !== 'custom_mask' && <Rng l="Border Radius" v={s.bubbleRadius} mn={0} mx={100} fn={n => s.setField('bubbleRadius', n)} />}
            {s.shapePreset === 'skewed' && <Rng l="Skew Angle" v={s.skewAngle} mn={-45} mx={45} fn={n => s.setField('skewAngle', n)} />}
            <Rng l="Border Width" v={s.borderWidth} mn={0} mx={20} fn={n => s.setField('borderWidth', n)} />
            {s.borderWidth > 0 && <div><Lbl c="Border Color" /><input type="color" value={hex(s.borderColor)} onChange={e => s.setField('borderColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div>}
            <div className="grid grid-cols-2 gap-3">
              <div><Lbl c="Chatbox BG" /><input type="color" value={hex(s.chatboxBgColor)} onChange={e => s.setField('chatboxBgColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div>
              <Rng l="BG Opacity" v={s.chatboxBgOpacity} mn={0} mx={1} s={0.05} fn={n => s.setField('chatboxBgOpacity', n)} />
            </div>
          </div>
        </Acc>

        {/* ═══ TYPOGRAPHY ═══ */}
        <Acc t="Typography" icon={Type}>
          <div className="space-y-5">
            <p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// CHANNEL NAMES</p>
            <div><Lbl c="Font Family Name" /><select value={s.fontFamilyName} onChange={e => s.setField('fontFamilyName', e.target.value)} className={sel}>{GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
            <div><Lbl c="Custom Font Override" /><input type="text" value={s.customFontName} onChange={e => s.setField('customFontName', e.target.value)} placeholder="Paste Google Font name..." className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white placeholder-gray-600" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Lbl c="Size" /><input type="number" value={s.fontSizeName} onChange={e => s.setField('fontSizeName', parseInt(e.target.value) || 12)} className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white" /></div>
              <div><Lbl c="Weight" /><input type="number" value={s.fontWeightName} onChange={e => s.setField('fontWeightName', parseInt(e.target.value) || 400)} min={100} max={900} step={100} className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white" /></div>
            </div>
            <Rng l="Line Height Name" v={s.lineHeightName} mn={0} mx={50} fn={n => s.setField('lineHeightName', n)} />
            <Tog l="Show Badges" v={s.showBadges} fn={() => s.setField('showBadges', !s.showBadges)} />
            <Tog l="Colon After Name" v={s.showColonAfterName} fn={() => s.setField('showColonAfterName', !s.showColonAfterName)} />
            <Tog l="Name On New Line" v={s.nameOnNewLine} fn={() => s.setField('nameOnNewLine', !s.nameOnNewLine)} />

            <div className="border-t border-white/5 pt-4" />
            <p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// MESSAGES</p>
            <div><Lbl c="Font Family Msg" /><select value={s.fontFamilyMessage} onChange={e => s.setField('fontFamilyMessage', e.target.value)} className={sel}>{GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
            <div><Lbl c="Custom Font Override" /><input type="text" value={s.customFontMessage} onChange={e => s.setField('customFontMessage', e.target.value)} placeholder="Paste Google Font name..." className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white placeholder-gray-600" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Lbl c="Size" /><input type="number" value={s.fontSizeMessage} onChange={e => s.setField('fontSizeMessage', parseInt(e.target.value) || 12)} className="w-full bg-black/40 border border-white/10 p-2 text-xs font-mono text-white" /></div>
              <Rng l="Line Height" v={s.lineHeight} mn={0.8} mx={3} s={0.1} fn={n => s.setField('lineHeight', n)} />
            </div>
            <Rng l="Letter Spacing" v={s.letterSpacing} mn={-5} mx={20} s={0.5} fn={n => s.setField('letterSpacing', n)} />
            <div><Lbl c="Text Alignment" /><div className="flex bg-black/40 border border-white/10 rounded overflow-hidden">{[{ id: 'left', I: AlignLeft }, { id: 'center', I: AlignCenter }, { id: 'right', I: AlignRight }, { id: 'justify', I: AlignJustify }].map(b => <button key={b.id} onClick={() => s.setField('textAlign', b.id as any)} className={`flex-1 p-3 flex justify-center transition-colors ${s.textAlign === b.id ? 'bg-neon-cyan text-black' : 'text-gray-500 hover:text-white'}`}><b.I size={16} /></button>)}</div></div>

            <div className="border-t border-white/5 pt-4" />
            <p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// TIMESTAMPS</p>
            <Tog l="Show Timestamps" v={s.showTimestamps} fn={() => s.setField('showTimestamps', !s.showTimestamps)} />
            {s.showTimestamps && <><Rng l="Timestamp Size" v={s.timestampFontSize} mn={8} mx={24} fn={n => s.setField('timestampFontSize', n)} /><div><Lbl c="Timestamp Color" /><input type="color" value={hex(s.timestampColor)} onChange={e => s.setField('timestampColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div></>}

            <div className="border-t border-white/5 pt-4" />
            <p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// AVATAR</p>
            <Tog l="Show Avatar" v={s.showAvatar} fn={() => s.setField('showAvatar', !s.showAvatar)} />
            {s.showAvatar && <Rng l="Avatar Size" v={s.avatarSize} mn={16} mx={80} fn={n => s.setField('avatarSize', n)} />}
          </div>
        </Acc>

        {/* ═══ EFFECTS ═══ */}
        <Acc t="Outline & Effects" icon={Sparkles}>
          <div className="space-y-5">
            <div className="p-4 border border-white/5 bg-black/20 rounded space-y-3">
              <div className="flex justify-between items-center"><p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// TEXT OUTLINE</p><button onClick={() => s.setField('showOutline', !s.showOutline)}>{s.showOutline ? <Eye size={14} className="text-neon-cyan" /> : <EyeOff size={14} className="text-gray-600" />}</button></div>
              {s.showOutline && <><Rng l="Outline Size" v={s.outlineSize} mn={0} mx={10} fn={n => s.setField('outlineSize', n)} /><div><Lbl c="Outline Color" /><input type="color" value={hex(s.outlineColor)} onChange={e => s.setField('outlineColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div></>}
            </div>
            <div className="p-4 border border-white/5 bg-black/20 rounded space-y-3">
              <div className="flex justify-between items-center"><p className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// NEON GLOW</p><button onClick={() => s.setField('neonGlow', !s.neonGlow)}>{s.neonGlow ? <Eye size={14} className="text-neon-cyan" /> : <EyeOff size={14} className="text-gray-600" />}</button></div>
              {s.neonGlow && <div className="grid grid-cols-2 gap-3"><div><Lbl c="Glow Color" /><input type="color" value={hex(s.glowColor)} onChange={e => s.setField('glowColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div><Rng l="Intensity" v={s.glowIntensity} mn={0} mx={50} fn={n => s.setField('glowIntensity', n)} /></div>}
            </div>
            <div className="p-4 border border-white/5 bg-black/20 rounded space-y-3">
              <div className="flex justify-between items-center"><p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">// TEXT SHADOW</p><button onClick={() => s.setField('showTextShadow', !s.showTextShadow)}>{s.showTextShadow ? <Eye size={14} className="text-neon-cyan" /> : <EyeOff size={14} className="text-gray-600" />}</button></div>
              {s.showTextShadow && <><div className="grid grid-cols-2 gap-3"><div><Lbl c="Color" /><input type="color" value={hex(s.textShadowColor)} onChange={e => s.setField('textShadowColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div><Rng l="Blur" v={s.textShadowIntensity} mn={0} mx={20} fn={n => s.setField('textShadowIntensity', n)} /></div>
              <div className="grid grid-cols-2 gap-3"><Rng l="Offset X" v={s.textShadowX} mn={-20} mx={20} fn={n => s.setField('textShadowX', n)} /><Rng l="Offset Y" v={s.textShadowY} mn={-20} mx={20} fn={n => s.setField('textShadowY', n)} /></div></>}
            </div>
          </div>
        </Acc>

        {/* ═══ ANIMATION ═══ */}
        <Acc t="Animation" icon={Film}>
          <div className="space-y-4">
            <Tog l="Animate In" v={s.animateIn} fn={() => s.setField('animateIn', !s.animateIn)} />
            {s.animateIn && <Rng l="Fade In Time ms" v={s.fadeInTime} mn={50} mx={2000} s={50} fn={n => s.setField('fadeInTime', n)} />}
            <Tog l="Animate Out" v={s.animateOut} fn={() => s.setField('animateOut', !s.animateOut)} />
            {s.animateOut && <><Rng l="Wait Time sec" v={s.waitTime} mn={1} mx={120} fn={n => s.setField('waitTime', n)} /><Rng l="Fade Out ms" v={s.fadeOutTime} mn={50} mx={2000} s={50} fn={n => s.setField('fadeOutTime', n)} /></>}
            <div><Lbl c="Slide Direction" /><select value={s.slideDirection} onChange={e => s.setField('slideDirection', e.target.value as any)} className={sel}><option value="none">NONE</option><option value="left">LEFT</option><option value="right">RIGHT</option><option value="top">TOP</option><option value="bottom">BOTTOM</option></select></div>
          </div>
        </Acc>

        {/* ═══ ROLES ═══ */}
        <Acc t="Role Customization" icon={Palette}>
          <div className="space-y-5">
            {[
              { id: 'supersticker', l: 'SUPERSTICKER', c: 'text-red-500', bg: 'superstickerBg', tx: 'superstickerText' },
              { id: 'superchat', l: 'SUPERCHAT', c: 'text-yellow-500', bg: 'superchatBg', tx: 'superchatText' },
              { id: 'owner', l: 'OWNER', c: 'text-neon-green', bg: 'ownerBg', tx: 'ownerText', nc: 'ownerNameColor' },
              { id: 'mod', l: 'MODERATOR', c: 'text-neon-cyan', bg: 'modBg', tx: 'modText', nc: 'modNameColor' },
              { id: 'member', l: 'MEMBER', c: 'text-neon-green', bg: 'memberBg', tx: 'memberText', nc: 'memberNameColor' },
              { id: 'default', l: 'GLOBAL', c: 'text-gray-400', bg: 'bgColor', tx: 'textColor' },
            ].map(r => (
              <div key={r.id} className="p-4 border border-white/5 bg-black/20 rounded">
                <p className={`text-[9px] ${r.c} font-bold mb-3 uppercase tracking-widest`}>// {r.l}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div><Lbl c="BG" /><input type="color" value={hex((s as any)[r.bg])} onChange={e => s.setField(r.bg as any, e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div>
                  <div><Lbl c="Text" /><input type="color" value={hex((s as any)[r.tx])} onChange={e => s.setField(r.tx as any, e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div>
                  {r.nc && <div><Lbl c="Name" /><input type="color" value={hex((s as any)[r.nc])} onChange={e => s.setField(r.nc as any, e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div>}
                </div>
              </div>
            ))}
            <div className="p-4 border border-white/5 bg-black/20 rounded space-y-3">
              <p className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest">// SUPERCHAT HEADER</p>
              <div className="grid grid-cols-2 gap-3"><div><Lbl c="Header BG" /><input type="color" value={hex(s.superchatHeaderBg)} onChange={e => s.setField('superchatHeaderBg', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div><div><Lbl c="Header Text" /><input type="color" value={hex(s.superchatHeaderText)} onChange={e => s.setField('superchatHeaderText', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div></div>
              <Rng l="Border Width" v={s.superchatBorderWidth} mn={0} mx={10} fn={n => s.setField('superchatBorderWidth', n)} />
              <div><Lbl c="Border Color" /><input type="color" value={hex(s.superchatBorderColor)} onChange={e => s.setField('superchatBorderColor', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div>
            </div>
            <div className="p-4 border border-white/5 bg-black/20 rounded space-y-3">
              <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest">// MEMBERSHIP</p>
              <div className="grid grid-cols-2 gap-3"><div><Lbl c="Gradient Start" /><input type="color" value={hex(s.membershipGradientStart)} onChange={e => s.setField('membershipGradientStart', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div><div><Lbl c="Gradient End" /><input type="color" value={hex(s.membershipGradientEnd)} onChange={e => s.setField('membershipGradientEnd', e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" /></div></div>
              <Rng l="Border Width" v={s.membershipBorderWidth} mn={0} mx={10} fn={n => s.setField('membershipBorderWidth', n)} />
            </div>
          </div>
        </Acc>

        {/* ═══ ASSETS ═══ */}
        <Acc t="Asset Manager" icon={ImageIcon}>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// CHATBOX BACKGROUND</span><button onClick={() => { s.setField('chatboxBgImage', null); if(chatboxBgInputRef.current) chatboxBgInputRef.current.value=''; }} className="text-neon-red"><Trash2 size={14} /></button></div>
              <input ref={chatboxBgInputRef} type="file" accept="image/*" onChange={e => up(e, 'chatboxBgImage')} className="text-xs text-gray-400" />
              {s.chatboxBgImage && <div className="p-3 bg-white/5 border border-white/10 rounded space-y-3"><div className="grid grid-cols-2 gap-3"><Rng l="Opacity" v={s.chatboxBgOpacity} mn={0} mx={1} s={0.05} fn={n => s.setField('chatboxBgOpacity', n)} /><Rng l="Scale" v={s.chatboxBgScale} mn={20} mx={250} fn={n => s.setField('chatboxBgScale', n)} /></div><div className="grid grid-cols-2 gap-3"><Rng l="Pos X" v={s.chatboxBgPosX} mn={0} mx={100} fn={n => s.setField('chatboxBgPosX', n)} /><Rng l="Pos Y" v={s.chatboxBgPosY} mn={0} mx={100} fn={n => s.setField('chatboxBgPosY', n)} /></div></div>}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// BG TEXTURE</span><div className="flex gap-2"><button onClick={() => s.setField('bgTextureEnabled', !s.bgTextureEnabled)}>{s.bgTextureEnabled ? <Eye size={14} className="text-neon-cyan" /> : <EyeOff size={14} className="text-gray-600" />}</button><button onClick={() => { s.setField('customBgImage', null); if(bgInputRef.current) bgInputRef.current.value=''; }} className="text-neon-red"><Trash2 size={14} /></button></div></div>
              <input ref={bgInputRef} type="file" accept="image/*" onChange={e => up(e, 'customBgImage')} className="text-xs text-gray-400" />
              {s.customBgImage && <div className="p-3 bg-white/5 border border-white/10 rounded space-y-3"><div className="grid grid-cols-2 gap-3"><Rng l="Opacity" v={s.bgOpacity} mn={0} mx={1} s={0.1} fn={n => s.setField('bgOpacity', n)} /><Rng l="Scale" v={s.bgScale} mn={10} mx={200} fn={n => s.setField('bgScale', n)} /></div><div className="grid grid-cols-2 gap-3"><Rng l="Pos X" v={s.bgPosX} mn={0} mx={100} fn={n => s.setField('bgPosX', n)} /><Rng l="Pos Y" v={s.bgPosY} mn={0} mx={100} fn={n => s.setField('bgPosY', n)} /></div></div>}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// BRAND LOGO</span><div className="flex gap-2"><button onClick={() => s.setField('logoEnabled', !s.logoEnabled)}>{s.logoEnabled ? <Eye size={14} className="text-neon-cyan" /> : <EyeOff size={14} className="text-gray-600" />}</button><button onClick={() => { s.setField('brandIcon', null); if(logoInputRef.current) logoInputRef.current.value=''; }} className="text-neon-red"><Trash2 size={14} /></button></div></div>
              <input ref={logoInputRef} type="file" accept="image/*" onChange={e => up(e, 'brandIcon')} className="text-xs text-gray-400" />
              {s.brandIcon && <div className="p-3 bg-white/5 border border-white/10 rounded space-y-3"><div className="grid grid-cols-2 gap-3"><Rng l="Opacity" v={s.logoOpacity} mn={0} mx={1} s={0.1} fn={n => s.setField('logoOpacity', n)} /><Rng l="Scale" v={s.logoScale} mn={10} mx={200} fn={n => s.setField('logoScale', n)} /></div><div className="grid grid-cols-2 gap-3"><Rng l="Pos X" v={s.logoPosX} mn={0} mx={100} fn={n => s.setField('logoPosX', n)} /><Rng l="Pos Y" v={s.logoPosY} mn={0} mx={100} fn={n => s.setField('logoPosY', n)} /></div><Rng l="Rotation" v={s.logoRotate} mn={0} mx={360} fn={n => s.setField('logoRotate', n)} /></div>}
            </div>
            <div className="space-y-3 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center"><span className="text-[9px] text-neon-cyan font-bold uppercase tracking-widest">// EXTRA ASSETS</span><label className="cursor-pointer bg-white/5 p-2 rounded hover:bg-white/10"><Plus size={14} /><input type="file" accept="image/*" onChange={upX} className="hidden" /></label></div>
              {s.extraAssets.map((a: any) => (<div key={a.id} className="p-3 bg-black/40 border border-white/5 rounded space-y-3"><div className="flex justify-between items-center"><img src={a.src} className="h-8 w-auto object-contain" alt="" /><button onClick={() => s.removeExtraAsset(a.id)} className="text-neon-red"><Trash2 size={14} /></button></div><div className="grid grid-cols-2 gap-3"><Rng l="Opacity" v={a.opacity} mn={0} mx={1} s={0.1} fn={n => s.updateExtraAsset(a.id, { opacity: n })} /><Rng l="Scale" v={a.scale} mn={10} mx={300} fn={n => s.updateExtraAsset(a.id, { scale: n })} /></div><div className="grid grid-cols-2 gap-3"><Rng l="Pos X" v={a.posX} mn={0} mx={100} fn={n => s.updateExtraAsset(a.id, { posX: n })} /><Rng l="Pos Y" v={a.posY} mn={0} mx={100} fn={n => s.updateExtraAsset(a.id, { posY: n })} /></div><Rng l="Rotation" v={a.rotate} mn={0} mx={360} fn={n => s.updateExtraAsset(a.id, { rotate: n })} /></div>))}
            </div>
          </div>
        </Acc>
      </div>
    </div>
  );
};
