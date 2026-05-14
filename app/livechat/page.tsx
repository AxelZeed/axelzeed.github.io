"use client";

import React, { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { MockChat } from './components/MockChat';
import { useChatStore } from './store';
import { generateCSS } from './utils';
import { Copy, Check, ExternalLink, Code, Terminal, BookOpen, Layers, Type, Palette, Image, Film, Zap, ChevronRight } from 'lucide-react';

/* ─── Docs Section Component ─── */
const DocSection = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 transition-colors text-left">
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-neon-cyan" />
          <span className="text-sm font-ethnocentric tracking-widest text-white">{title}</span>
        </div>
        <ChevronRight size={16} className={`text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div className="p-6 bg-black/30 space-y-4">{children}</div>}
    </div>
  );
};

const DocItem = ({ label, desc }: { label: string; desc: string }) => (
  <div className="flex gap-4 border-l-2 border-neon-cyan/30 pl-4">
    <div className="min-w-[180px]">
      <span className="text-[10px] font-mono font-bold text-neon-cyan uppercase tracking-widest bg-neon-cyan/10 px-2 py-0.5 rounded">{label}</span>
    </div>
    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const DocNote = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded p-4 text-xs text-neon-cyan/80 font-mono leading-relaxed">{children}</div>
);

/* ─── Documentation Page ─── */
const DocsPage = () => (
  <div className="max-w-4xl mx-auto space-y-6 pb-16">
    {/* Intro */}
    <div className="bg-white/5 border border-white/10 rounded-lg p-8">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen size={20} className="text-neon-cyan" />
        <h2 className="text-lg font-ethnocentric tracking-widest text-white">DOCUMENTATION</h2>
        <span className="text-[9px] font-mono text-neon-cyan/60 bg-neon-cyan/10 px-2 py-0.5 rounded uppercase tracking-widest">v1.0-ALPHA</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        LIVECHAT_MODDER generates a custom CSS file that is injected into OBS Browser Source to style your YouTube Live Chat overlay.
        Every setting in the Control Panel maps directly to a CSS rule in the output. This document explains what each control does.
      </p>
      <DocNote>
        🛠 HOW IT WORKS: Configure → Copy CSS → OBS Browser Source → Properties → Paste into "Custom CSS" → OK. No coding needed.
      </DocNote>
    </div>

    {/* Layout & Behavior */}
    <DocSection icon={Layers} title="LAYOUT & BEHAVIOR">
      <DocItem label="Use_Bars_Style" desc="Switches all chat bubbles from filled background boxes to a minimalist left-border bar style. Great for a clean, subtitle-like overlay." />
      <DocItem label="Chatbox_BG_Enabled" desc="Enables a semi-transparent background panel behind the entire chat list. Useful for readability on complex stream backgrounds." />
      <DocItem label="Bubble_Max_Width_%" desc="Sets the maximum width of each chat bubble as a percentage of the container. Lower values keep messages narrow; 100% stretches them edge-to-edge." />
      <DocItem label="Shape_Preset" desc="Changes the visual shape of all chat bubbles. RECTANGLE = sharp corners. ROUNDED = smooth corners. SKEWED = parallelogram tilt. IRREGULAR = notched polygon. CUTE_BUBBLE = organic blob shape. CUSTOM_MASK = use your own image mask." />
      <DocItem label="Message_Spacing" desc="Controls the vertical gap (in pixels) between each chat message bubble." />
      <DocItem label="Chatbox_Padding" desc="Adds inner padding around the entire chat list container. Useful when using Chatbox BG to create breathing room." />
      <DocItem label="Chatbox_Scale_%" desc="Scales the entire chat message area up or down. At 100% it is normal size; 120% makes everything larger for visibility." />
      <DocItem label="Chatbox_Radius" desc="The corner radius of the chatbox background container (not the bubbles). Only visible when Chatbox BG is enabled." />
      <DocItem label="Border_Radius" desc="The corner rounding of each individual chat bubble. Only available in RECTANGLE or ROUNDED shape modes." />
      <DocItem label="Skew_Angle" desc="Adjusts the tilt angle (in degrees) when SKEWED shape is selected. Negative = leans left, positive = leans right." />
      <DocItem label="Border_Width" desc="Thickness of the outline border around each chat bubble. Set to 0 to remove borders entirely." />
      <DocItem label="Border_Color" desc="The color of the bubble border outline. Appears when Border_Width is greater than 0." />
      <DocItem label="Chatbox_BG" desc="The solid fill color of the chatbox background panel." />
      <DocItem label="BG_Opacity" desc="How transparent the chatbox background color is. 0 = fully invisible, 1 = fully opaque." />
      <DocItem label="Chatbox_BG_Scale" desc="Scales the chatbox background image. 100% fits the container; higher values zoom in." />
      <DocItem label="Chatbox_BG_Pos_X/Y" desc="Horizontally and vertically repositions the chatbox background image within its container." />
    </DocSection>

    {/* Typography */}
    <DocSection icon={Type} title="TYPOGRAPHY">
      <p className="text-xs text-gray-500 mb-2">Channel names and message text each have independent font settings.</p>
      <DocItem label="Font_Family_Name" desc="The Google Font used for the chatter's display name. Changes the author label above each message." />
      <DocItem label="Custom_Font_Override" desc="Type any Google Font name here to use it instead of the dropdown selection. Must be an exact Google Fonts name (e.g. 'Space Grotesk')." />
      <DocItem label="Font_Size_Name" desc="The point size of the author name text in pixels." />
      <DocItem label="Font_Weight_Name" desc="The boldness of the author name. 400 = regular, 700 = bold, 900 = heavy." />
      <DocItem label="Show_Badges" desc="Toggles role badges (crown, wrench, star icons) next to the author name." />
      <DocItem label="Colon_After_Name" desc="Appends a colon ':' after the author name, mimicking a traditional chat log style." />
      <DocItem label="Name_On_New_Line" desc="Forces the author name to appear on its own line above the message body." />
      <DocItem label="Font_Family_Message" desc="The Google Font used for the message body text." />
      <DocItem label="Font_Size_Message" desc="The point size of the message body text in pixels." />
      <DocItem label="Line_Height" desc="The spacing multiplier between lines of text within a message. Higher values add more breathing room between lines." />
      <DocItem label="Letter_Spacing" desc="Increases or decreases the spacing between individual characters (in pixels). Adds style to bold display fonts." />
      <DocItem label="Text_Align" desc="Aligns the message body text: LEFT, CENTER, RIGHT, or JUSTIFY." />
      <DocItem label="Show_Timestamps" desc="Toggles the time-of-message timestamp (e.g. '12:34') next to each chat bubble." />
      <DocItem label="Timestamp_Font_Size" desc="The size of the timestamp text in pixels." />
      <DocItem label="Timestamp_Color" desc="The color of the timestamp text." />
    </DocSection>

    {/* Colors */}
    <DocSection icon={Palette} title="COLORS & ROLE STYLING">
      <DocNote>💡 Each role has its own background, text, and name colors. This lets you highlight Owners, Mods, and Members differently from regular viewers.</DocNote>
      <DocItem label="Bubble_BG / Text_Color" desc="The default background and text color for regular viewer (public) chat messages." />
      <DocItem label="Owner_BG / Text / Name" desc="Colors for messages sent by the channel Owner (you). The name color highlights the owner's username." />
      <DocItem label="Mod_BG / Text / Name" desc="Colors for messages sent by channel Moderators." />
      <DocItem label="Member_BG / Text / Name" desc="Colors for messages sent by channel Members (subscribers)." />
      <DocItem label="SuperChat_BG / Text" desc="Background and body text colors for Super Chat donation messages." />
      <DocItem label="SuperChat_Header_BG/Text" desc="Colors for the header chip area on SuperChat messages (shows the donor's name and amount)." />
      <DocItem label="SuperChat_Border" desc="Border color applied to SuperChat message bubbles." />
      <DocItem label="SuperSticker_BG / Text" desc="Background and text colors for Super Sticker messages." />
      <DocItem label="Membership_Gradient" desc="Start and end colors for the gradient background on membership milestone messages." />
      <DocItem label="Membership_Border" desc="Border color applied around membership celebration messages." />
    </DocSection>

    {/* Effects */}
    <DocSection icon={Zap} title="OUTLINE & EFFECTS">
      <DocItem label="Show_Outline" desc="Enables a text stroke/outline drawn around all letters. Good for contrast on bright or busy backgrounds." />
      <DocItem label="Outline_Size" desc="The thickness of the text outline in pixels." />
      <DocItem label="Outline_Color" desc="The color of the text outline stroke." />
      <DocItem label="Neon_Glow" desc="Applies a drop-shadow glow effect to the entire chat bubble. Creates a cyberpunk neon aesthetic." />
      <DocItem label="Glow_Color" desc="The color of the neon glow effect." />
      <DocItem label="Glow_Intensity" desc="How strong (in pixels) the neon glow spreads outward from the bubble." />
      <DocItem label="Text_Shadow" desc="Toggle to enable/disable a subtle shadow behind text for readability." />
      <DocItem label="Shadow_Color" desc="The color of the text shadow." />
      <DocItem label="Shadow_Intensity" desc="The blur radius of the text shadow." />
      <DocItem label="Shadow_X / Shadow_Y" desc="Horizontally and vertically offsets the text shadow position." />
    </DocSection>

    {/* Animation */}
    <DocSection icon={Film} title="ANIMATION">
      <DocItem label="Animate_In" desc="Enables a fade-in animation when each new message appears in the chat." />
      <DocItem label="Fade_In_Time" desc="Duration of the fade-in animation in milliseconds. Lower = snappier." />
      <DocItem label="Animate_Out" desc="Enables a fade-out animation that removes messages after a set time. Useful for floating overlay modes." />
      <DocItem label="Wait_Time" desc="How many seconds a message stays on screen before the fade-out animation begins." />
      <DocItem label="Fade_Out_Time" desc="Duration of the fade-out animation in milliseconds." />
      <DocItem label="Slide_Direction" desc="Adds a slide effect to the fade-in animation. Messages can slide in from LEFT, RIGHT, TOP, or BOTTOM." />
      <DocItem label="Show_Avatar" desc="Toggles the circular profile picture shown to the left of each message." />
      <DocItem label="Avatar_Size" desc="The diameter of each avatar circle in pixels." />
    </DocSection>

    {/* Asset Manager */}
    <DocSection icon={Image} title="ASSET MANAGER">
      <DocNote>📁 Assets are uploaded and base64-encoded locally — nothing is sent to any server. Base64 images are embedded directly in your CSS.</DocNote>
      <DocItem label="BG_TEXTURE" desc="Upload an image to tile or overlay on top of each individual chat bubble background. Use low opacity for a subtle texture effect." />
      <DocItem label="BG_Opacity" desc="How transparent the per-bubble texture image is. Lower = more subtle." />
      <DocItem label="BG_Scale" desc="How large the texture image is drawn on each bubble (as a percentage of the bubble size)." />
      <DocItem label="BG_Pos_X / Pos_Y" desc="Repositions the texture image horizontally and vertically on the bubble." />
      <DocItem label="BRAND_LOGO" desc="Upload your channel logo or watermark. It appears as an overlay on each chat bubble's content area." />
      <DocItem label="Logo_Opacity / Scale" desc="Controls the size and transparency of your brand logo." />
      <DocItem label="Logo_Pos_X / Pos_Y" desc="Positions the logo within the chat bubble. 95% X / 5% Y places it in the top-right corner." />
      <DocItem label="Logo_Rotation" desc="Rotates the logo image by degrees." />
      <DocItem label="EXTRA_ASSETS" desc="Upload up to 4 additional decorative images. Each gets its own opacity, scale, position, and rotation controls. They render as overlays on the chat using CSS pseudo-elements." />
      <DocItem label="Trash_Icon" desc="Deletes the asset from the current config and clears the file input so the same file can be re-selected." />
    </DocSection>

    {/* Live Sim */}
    <DocSection icon={Terminal} title="LIVE SIMULATION CONTROLS">
      <DocItem label="Play / Pause" desc="Starts or pauses the automated message simulation in the preview. Useful for locking the preview to inspect a specific state." />
      <DocItem label="INTERVAL Slider" desc="Controls how frequently new messages appear. Drag toward FAST for rapid messages, SLOW for infrequent ones. Range: 500ms to 10 seconds." />
      <DocItem label="Role Toggles (✓/○)" desc="Enable or disable each role from appearing in the simulation. Turn off all but 'owner' to preview only your own message style." />
      <DocItem label="LOW / MED / HIGH Buttons" desc="Sets the weighted frequency for each role. HIGH means that role appears much more often than LOW roles in the random feed." />
      <DocItem label="Refresh Button" desc="Resets the simulation back to the 2 initial seed messages and clears the feed." />
      <DocItem label="Role Catalog Tab" desc="Shows a static snapshot of one message from every role type (Owner, Moderator, Member, SuperChat, SuperSticker, Public). Use this to check all role colors at once." />
    </DocSection>

    {/* OBS Usage */}
    <div className="bg-white/5 border border-neon-cyan/20 rounded-lg p-8">
      <h3 className="text-sm font-ethnocentric tracking-widest text-neon-cyan mb-6">OBS DEPLOYMENT GUIDE</h3>
      <ol className="space-y-4">
        {[
          ['Step 1 — Get Your Chat URL', 'Go to your YouTube live stream. Click the "..." menu → "Open Chat Popout". Copy the URL (e.g. youtube.com/live_chat?v=XXXXX).'],
          ['Step 2 — Add Browser Source in OBS', 'In OBS, click "+" under Sources → "Browser Source". Set URL to your chat popout URL. Set width/height to match your overlay area.'],
          ['Step 3 — Copy the CSS', 'In LIVECHAT_MODDER, configure your style then click "COPY_TO_CLIPBOARD" to copy the generated CSS.'],
          ['Step 4 — Paste into OBS', 'In the Browser Source properties, find the "Custom CSS" text field. Clear its contents and paste your copied CSS.'],
          ['Step 5 — Apply & Test', 'Click OK. Right-click the Browser Source → "Refresh". Your styled chat should appear. Adjust settings and re-copy/paste anytime.'],
        ].map(([step, desc]) => (
          <div key={step} className="flex gap-4">
            <span className="text-[9px] font-mono font-bold text-neon-cyan bg-neon-cyan/10 px-2 py-1 h-fit rounded whitespace-nowrap">{step}</span>
            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </ol>
    </div>
  </div>
);

/* ─── Main Page ─── */
export default function LiveChatGenerator() {
  const state = useChatStore();
  const [copied, setCopied] = useState(false);
  const [mainTab, setMainTab] = useState<'generator' | 'docs'>('generator');

  const cssOutput = generateCSS(state);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020a0c] pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={24} className="text-neon-cyan" />
              <span className="text-[10px] font-ethnocentric text-neon-cyan tracking-[0.3em] uppercase">SYSTEM_UTILITY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-ethnocentric tracking-tighter text-white mb-2">
              LIVECHAT_MODDER
            </h1>
            <p className="text-xs font-mono text-neon-cyan tracking-widest uppercase opacity-70">
              Advanced CSS Injection Framework for Virtual Overlays
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Target_Platform</p>
              <p className="text-[10px] text-white font-mono uppercase">YouTube_Live_Chat</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden md:block"></div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Build_Version</p>
              <p className="text-[10px] text-neon-green font-mono uppercase">v1.0-ALPHA</p>
            </div>
          </div>
        </div>

        {/* Main Tab Bar */}
        <div className="flex border border-white/10 rounded-lg overflow-hidden mb-10 w-fit">
          {([['generator', 'GENERATOR', Code], ['docs', 'DOCUMENTATION', BookOpen]] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setMainTab(id)}
              className={`flex items-center gap-2 px-8 py-4 text-[10px] font-ethnocentric tracking-widest transition-all ${mainTab === id ? 'bg-neon-cyan text-black' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* GENERATOR TAB */}
        {mainTab === 'generator' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Controls sidebar */}
            <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] overflow-y-auto border border-white/5 shadow-2xl rounded-lg custom-scrollbar">
              <ControlPanel />
            </div>

            {/* Preview & Export */}
            <div className="flex-1 flex flex-col gap-8 w-full">
              {/* Live Preview */}
              <div className="bg-black/40 border border-white/5 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03),transparent_70%)] pointer-events-none"></div>
                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#00ff00]"></div>
                  <span className="text-[10px] font-ethnocentric text-gray-500 tracking-widest uppercase">LIVE_RENDER_UPLINK</span>
                </div>
                <div className="p-12">
                  <div className="max-w-2xl mx-auto">
                    <MockChat />
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 pointer-events-none opacity-10">
                  <Code size={160} className="text-white" />
                </div>
              </div>

              {/* Export Panel */}
              <div className="h-72 bg-[#05161a] border border-neon-cyan/20 rounded-lg flex flex-col overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-neon-cyan/10 bg-[#041215] flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Code size={18} className="text-neon-cyan" />
                    <span className="text-[10px] font-ethnocentric tracking-[0.2em] text-white">COMPILED_CSS_BUFFER</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-6 py-3 text-[10px] font-ethnocentric transition-all ${copied ? 'bg-neon-green text-black' : 'bg-neon-cyan text-black hover:scale-105 active:scale-95'}`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'UPLINK_SUCCESS' : 'COPY_TO_CLIPBOARD'}
                  </button>
                </div>
                <div className="flex-1 p-5 bg-black/60 relative group">
                  <textarea
                    readOnly
                    value={cssOutput}
                    className="w-full h-full bg-transparent font-mono text-[11px] text-neon-cyan/70 resize-none outline-none custom-scrollbar leading-relaxed"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[8px] font-mono text-gray-600 bg-black/80 px-2 py-1 border border-white/5 uppercase">Read_Only_Stream</p>
                  </div>
                </div>
              </div>

              {/* Footer Hint */}
              <div className="flex items-center gap-4 text-gray-600 bg-white/5 p-4 rounded border border-white/5">
                <ExternalLink size={16} />
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] leading-relaxed">
                  Usage Instruction: Copy the Compiled Buffer &gt; Open OBS Browser Source &gt; Properties &gt; Paste into &quot;Custom CSS&quot; box. Restart cache if needed. See DOCUMENTATION tab for full guide.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DOCS TAB */}
        {mainTab === 'docs' && <DocsPage />}

      </div>
    </div>
  );
}
