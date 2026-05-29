"use client";

import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { 
  Upload, 
  Download, 
  Trash2, 
  Check, 
  Sliders, 
  Users, 
  Type, 
  Image as ImageIcon, 
  Sparkles, 
  HelpCircle, 
  Plus, 
  AlertCircle, 
  RefreshCw, 
  FolderPlus,
  Eye,
  Settings,
  CaseSensitive,
  FileImage,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// --- Type Definitions ---
interface Guest {
  id: string;
  name: string;
  text1: string; // Passcode or Wish
  text2: string; // Additional custom message
  pfpUrl: string | null;
  pfpName: string | null;
  pfpStatus: 'matched' | 'manual' | 'missing';
}

interface ImageAsset {
  name: string;
  url: string;
  size: number;
  width?: number;
  height?: number;
}

interface FontStyle {
  x: number; // percentage
  y: number; // percentage
  fontSize: number; // in output resolution pixels
  color: string;
  glowColor: string;
  glowBlur: number;
  glowIntensity: number;
  shadowColor: string;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  letterSpacing: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'titlecase';
  textAlign: 'left' | 'center' | 'right';
  enabled: boolean;
}

interface PFPStyle {
  x: number; // percentage
  y: number; // percentage
  scale: number; // percentage of card width
  borderRadius: number; // % (50 for circle, 0 for square)
  borderWidth: number; // in output resolution pixels
  borderColor: string;
  glowColor: string;
  glowBlur: number;
  glowIntensity: number;
  enabled: boolean;
}

// --- Pre-defined Fonts list ---
const PRESET_FONTS = [
  'Ethnocentric',
  'Conthrax',
  'Orbitron',
  'Space Grotesk',
  'Inter',
  'Montserrat',
  'Impact',
  'sans-serif',
  'serif',
  'monospace'
];

// --- Default SVG Cyber Silhouette Base64 ---
const DEFAULT_SILHOUETTE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100%" height="100%" fill="%2305161a"/><circle cx="50" cy="38" r="18" fill="none" stroke="%2300f2ff" stroke-width="2.5" stroke-dasharray="2 1"/><circle cx="50" cy="38" r="14" fill="%2300f2ff" fill-opacity="0.15"/><path d="M20,82 C20,68 30,58 50,58 C70,58 80,68 80,82" fill="none" stroke="%2300f2ff" stroke-width="2.5"/><path d="M25,82 C25,72 34,63 50,63 C66,63 75,72 75,82" fill="%2300f2ff" fill-opacity="0.1"/><circle cx="50" cy="50" r="46" fill="none" stroke="%2300f2ff" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="5 5"/></svg>`;

// --- Accordion Component ---
const Accordion = ({ 
  icon: Icon, 
  title, 
  isOpen, 
  onToggle, 
  children 
}: { 
  icon: any; 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) => {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black/25 backdrop-blur-sm transition-all duration-300">
      <button 
        onClick={onToggle} 
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-neon-cyan" />
          <span className="text-xs font-ethnocentric tracking-widest text-white uppercase">{title}</span>
        </div>
        <ChevronRight size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90 text-neon-cyan' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-5 border-t border-white/5 bg-black/40 space-y-5 animate-fade-in text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

export default function InvitePage() {
  // --- States ---
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgWidth, setBgWidth] = useState<number>(1080);
  const [bgHeight, setBgHeight] = useState<number>(1080);
  const [aspectRatio, setAspectRatio] = useState<number>(1.0); // height / width

  // Layer Styles
  const [nameStyle, setNameStyle] = useState<FontStyle>({
    x: 50,
    y: 35,
    fontSize: 56,
    color: '#ffffff',
    glowColor: '#00f2ff',
    glowBlur: 20,
    glowIntensity: 2.0,
    shadowColor: 'rgba(0,0,0,0.85)',
    shadowX: 4,
    shadowY: 4,
    shadowBlur: 8,
    letterSpacing: 2,
    fontFamily: 'Ethnocentric',
    bold: true,
    italic: false,
    textTransform: 'uppercase',
    textAlign: 'center',
    enabled: true
  });

  const [text1Style, setText1Style] = useState<FontStyle>({
    x: 50,
    y: 48,
    fontSize: 32,
    color: '#00f2ff',
    glowColor: '#00f2ff',
    glowBlur: 10,
    glowIntensity: 1.2,
    shadowColor: 'rgba(0,0,0,0.85)',
    shadowX: 3,
    shadowY: 3,
    shadowBlur: 6,
    letterSpacing: 1,
    fontFamily: 'Conthrax',
    bold: false,
    italic: false,
    textTransform: 'uppercase',
    textAlign: 'center',
    enabled: true
  });

  const [text2Style, setText2Style] = useState<FontStyle>({
    x: 50,
    y: 58,
    fontSize: 24,
    color: '#cbd5e1',
    glowColor: '#000000',
    glowBlur: 0,
    glowIntensity: 0,
    shadowColor: 'rgba(0,0,0,0.85)',
    shadowX: 2,
    shadowY: 2,
    shadowBlur: 4,
    letterSpacing: 1,
    fontFamily: 'sans-serif',
    bold: false,
    italic: true,
    textTransform: 'none',
    textAlign: 'center',
    enabled: true
  });

  const [pfpStyle, setPfpStyle] = useState<PFPStyle>({
    x: 50,
    y: 75,
    scale: 18, // percentage of card width
    borderRadius: 50, // circle
    borderWidth: 4,
    borderColor: '#00f2ff',
    glowColor: '#00f2ff',
    glowBlur: 15,
    glowIntensity: 1.5,
    enabled: true
  });

  // Guest list & inputs
  const [rawText, setRawText] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(';');
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number>(0);

  // Zoom & Pan states
  const [zoom, setZoom] = useState<number>(1.0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [panState, setPanState] = useState({
    isPanning: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  });

  // Asset Pools & Custom Fonts
  const [assetPool, setAssetPool] = useState<ImageAsset[]>([]);
  const [matchTolerance, setMatchTolerance] = useState<'strict' | 'fuzzy'>('fuzzy');
  const [customFonts, setCustomFonts] = useState<string[]>([]);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);

  // Accordion Control
  const [activeAccordion, setActiveAccordion] = useState<string | null>('bg');

  // UI state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportCurrentName, setExportCurrentName] = useState<string>('');
  const [activePanelTab, setActivePanelTab] = useState<'editor' | 'roster'>('editor');

  // Dragging interaction state
  const [focusedLayer, setFocusedLayer] = useState<'name' | 'text1' | 'text2' | 'pfp' | null>(null);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    layer: 'name' | 'text1' | 'text2' | 'pfp' | null;
    offsetX: number;
    offsetY: number;
  }>({
    isDragging: false,
    layer: null,
    offsetX: 0,
    offsetY: 0
  });

  // DOM Refs
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontInputRef = useRef<HTMLInputElement>(null);
  const pfpInputRef = useRef<HTMLInputElement>(null);

  // Load standard Web fonts dynamically in document head
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@400;700&family=Inter:wght@400;700&family=Montserrat:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Parse Guest Roster whenever raw text or delimiter changes
  const handleParse = (text: string, delim: string) => {
    if (!text.trim()) {
      setGuestList([]);
      return;
    }

    setGuestList(prevList => {
      const lines = text.split('\n');
      const parsed: Guest[] = lines
        .map((line, idx) => {
          if (!line.trim()) return null;
          
          const parts = line.split(delim);
          const name = parts[0]?.trim() || `Guest_${idx + 1}`;
          const text1 = parts[1]?.trim() || '';
          const text2 = parts.slice(2).join(delim)?.trim() || '';

          const existingGuest = prevList.find(g => g.name === name);

          return {
            id: existingGuest?.id || `guest-${idx}-${Date.now()}`,
            name,
            text1,
            text2,
            pfpUrl: existingGuest?.pfpUrl || null,
            pfpName: existingGuest?.pfpName || null,
            pfpStatus: existingGuest?.pfpStatus || 'missing'
          };
        })
        .filter(Boolean) as Guest[];

      if (selectedGuestIndex >= parsed.length) {
        setSelectedGuestIndex(0);
      }
      return parsed;
    });
  };

  // Auto-Match images in asset pool
  useEffect(() => {
    if (guestList.length === 0 || assetPool.length === 0) return;

    setGuestList(prevList => {
      let changed = false;
      const updatedList = prevList.map(guest => {
        // If guest already has a manual association, skip auto-matching
        if (guest.pfpStatus === 'manual') return guest;

        // Sanitization utility
        const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const sanitizedGuestName = sanitize(guest.name);

        // Try to find matching image
        let matchedAsset = assetPool.find(asset => {
          const baseName = asset.name.substring(0, asset.name.lastIndexOf('.')) || asset.name;
          return sanitize(baseName) === sanitizedGuestName;
        });

        // Fuzzy match fallback
        if (!matchedAsset && matchTolerance === 'fuzzy') {
          matchedAsset = assetPool.find(asset => {
            const baseName = asset.name.substring(0, asset.name.lastIndexOf('.')) || asset.name;
            const sanitizedBase = sanitize(baseName);
            return sanitizedBase.includes(sanitizedGuestName) || sanitizedGuestName.includes(sanitizedBase);
          });
        }

        if (matchedAsset && guest.pfpUrl !== matchedAsset.url) {
          changed = true;
          return {
            ...guest,
            pfpUrl: matchedAsset.url,
            pfpName: matchedAsset.name,
            pfpStatus: 'matched' as const
          };
        }

        return guest;
      });

      return changed ? updatedList : prevList;
    });
  }, [assetPool, guestList.length, matchTolerance]);

  // Case transforms
  const applyCaseTransform = (mode: 'upper' | 'lower' | 'title') => {
    const titleCase = (str: string) => {
      return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    };

    setGuestList(prev => {
      const updatedList = prev.map(guest => {
        let newName = guest.name;
        if (mode === 'upper') newName = guest.name.toUpperCase();
        else if (mode === 'lower') newName = guest.name.toLowerCase();
        else if (mode === 'title') newName = titleCase(guest.name);
        return { ...guest, name: newName };
      });
      
      const updatedRaw = updatedList.map(guest => {
        const parts = [guest.name];
        if (guest.text1) parts.push(guest.text1);
        else if (guest.text2) parts.push('');
        if (guest.text2) parts.push(guest.text2);
        return parts.join(` ${delimiter} `);
      }).join('\n');
      
      setRawText(updatedRaw);
      return updatedList;
    });
  };

  // Template Upload Handler
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setBgImage(dataUrl);
        setBgWidth(img.naturalWidth || 1080);
        setBgHeight(img.naturalHeight || 1080);
        setAspectRatio(img.naturalHeight / img.naturalWidth);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Custom Font Upload Handler
  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fontName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const sanitizedFontName = fontName.replace(/[^a-zA-Z0-9]/g, '_'); // Safe font name
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const fontFace = new FontFace(sanitizedFontName, arrayBuffer);
      fontFace.load().then((loadedFace) => {
        document.fonts.add(loadedFace);
        setCustomFonts(prev => [...prev, sanitizedFontName]);
        
        // Auto assign newly loaded font to Name Layer
        setNameStyle(prev => ({ ...prev, fontFamily: sanitizedFontName }));
      }).catch(err => {
        console.error("Font loading error:", err);
        setUploadWarning("Failed to register font file. Make sure it is a valid TTF/OTF.");
        setTimeout(() => setUploadWarning(null), 5000);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  // Bulk PFP Dropper
  const handlePfpSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    processFiles(Array.from(files));
  };

  const processFiles = (files: File[]) => {
    const newAssets: ImageAsset[] = [];
    let oversizedCount = 0;

    files.forEach(file => {
      // Limit check: 4MB (4,194,304 bytes)
      if (file.size > 4194304) {
        oversizedCount++;
        return;
      }

      const url = URL.createObjectURL(file);
      
      // Load image to read resolution
      const img = new Image();
      img.onload = () => {
        const asset: ImageAsset = {
          name: file.name,
          url,
          size: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight
        };
        setAssetPool(prev => [...prev, asset]);
      };
      img.src = url;
    });

    if (oversizedCount > 0) {
      setUploadWarning(`${oversizedCount} images skipped because they exceed the 4MB limit.`);
      setTimeout(() => setUploadWarning(null), 6000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Manual image assignment
  const handleManualPfpAssign = (guestId: string, assetUrl: string, assetName: string) => {
    setGuestList(prev => prev.map(g => {
      if (g.id === guestId) {
        return {
          ...g,
          pfpUrl: assetUrl,
          pfpName: assetName,
          pfpStatus: 'manual' as const
        };
      }
      return g;
    }));
  };

  // Remove guest
  const handleDeleteGuest = (id: string) => {
    const newList = guestList.filter(g => g.id !== id);
    setGuestList(newList);
    if (selectedGuestIndex >= newList.length) {
      setSelectedGuestIndex(0);
    }

    // Sync raw Textarea
    const updatedRaw = newList.map(guest => {
      const parts = [guest.name];
      if (guest.text1) parts.push(guest.text1);
      else if (guest.text2) parts.push('');
      if (guest.text2) parts.push(guest.text2);
      return parts.join(` ${delimiter} `);
    }).join('\n');
    setRawText(updatedRaw);
  };

  // Clear all matched PFPs
  const handleClearPFPs = () => {
    setGuestList(prev => prev.map(g => ({
      ...g,
      pfpUrl: null,
      pfpName: null,
      pfpStatus: 'missing' as const
    })));
    setAssetPool([]);
  };

  // --- Drag and Drop Coordinates Handler ---
  const handleMouseDown = (e: React.MouseEvent, layer: 'name' | 'text1' | 'text2' | 'pfp') => {
    e.preventDefault();
    if (!previewContainerRef.current) return;
    setFocusedLayer(layer);
    const rect = previewContainerRef.current.getBoundingClientRect();

    let currentXPercent = 0;
    let currentYPercent = 0;

    if (layer === 'name') { currentXPercent = nameStyle.x; currentYPercent = nameStyle.y; }
    else if (layer === 'text1') { currentXPercent = text1Style.x; currentYPercent = text1Style.y; }
    else if (layer === 'text2') { currentXPercent = text2Style.x; currentYPercent = text2Style.y; }
    else if (layer === 'pfp') { currentXPercent = pfpStyle.x; currentYPercent = pfpStyle.y; }

    const xRel = e.clientX - rect.left;
    const yRel = e.clientY - rect.top;
    const unscaledX = xRel / zoom;
    const unscaledY = yRel / zoom;

    const baseWidth = previewBoxWidth;
    const baseHeight = previewBoxWidth * aspectRatio;

    const currentXPixels = (currentXPercent / 100) * baseWidth;
    const currentYPixels = (currentYPercent / 100) * baseHeight;

    setDragState({
      isDragging: true,
      layer,
      offsetX: unscaledX - currentXPixels,
      offsetY: unscaledY - currentYPixels
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.layer || !previewContainerRef.current) return;
    const rect = previewContainerRef.current.getBoundingClientRect();

    const xRel = e.clientX - rect.left;
    const yRel = e.clientY - rect.top;
    const unscaledX = xRel / zoom;
    const unscaledY = yRel / zoom;

    const newXPixels = unscaledX - dragState.offsetX;
    const newYPixels = unscaledY - dragState.offsetY;

    const baseWidth = previewBoxWidth;
    const baseHeight = previewBoxWidth * aspectRatio;

    let newXPercent = Math.max(0, Math.min(100, (newXPixels / baseWidth) * 100));
    let newYPercent = Math.max(0, Math.min(100, (newYPixels / baseHeight) * 100));

    newXPercent = Math.round(newXPercent * 10) / 10;
    newYPercent = Math.round(newYPercent * 10) / 10;

    if (dragState.layer === 'name') {
      setNameStyle(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    } else if (dragState.layer === 'text1') {
      setText1Style(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    } else if (dragState.layer === 'text2') {
      setText2Style(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    } else if (dragState.layer === 'pfp') {
      setPfpStyle(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    }
  };

  const handleMouseUp = () => {
    setDragState({ isDragging: false, layer: null, offsetX: 0, offsetY: 0 });
  };

  const handleScrollMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.focusable-chunk') || target.closest('select') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
      return;
    }
    if (!scrollContainerRef.current) return;
    setPanState({
      isPanning: true,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: scrollContainerRef.current.scrollLeft,
      scrollTop: scrollContainerRef.current.scrollTop
    });
  };

  const handleScrollMouseMove = (e: React.MouseEvent) => {
    if (!panState.isPanning || !scrollContainerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - panState.startX;
    const dy = e.clientY - panState.startY;
    scrollContainerRef.current.scrollLeft = panState.scrollLeft - dx;
    scrollContainerRef.current.scrollTop = panState.scrollTop - dy;
  };

  const handleScrollMouseUp = () => {
    setPanState(prev => ({ ...prev, isPanning: false }));
  };

  const handleAutoFit = () => {
    if (!scrollContainerRef.current) return;
    const containerWidth = scrollContainerRef.current.clientWidth - 48;
    if (containerWidth > 0) {
      const fitZoom = containerWidth / previewBoxWidth;
      setZoom(Math.max(0.4, Math.min(2.0, fitZoom)));
    }
  };

  useEffect(() => {
    handleAutoFit();
    window.addEventListener('resize', handleAutoFit);
    return () => window.removeEventListener('resize', handleAutoFit);
  }, [bgImage]);

  // Keyboard Nudge Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'SELECT') {
        return;
      }
      if (!focusedLayer) return;

      const nudge = e.shiftKey ? 2 : 0.5;
      
      const updateStyle = (setStyle: React.Dispatch<React.SetStateAction<any>>) => {
        setStyle((prev: any) => {
          let newX = prev.x;
          let newY = prev.y;
          if (e.key === 'ArrowUp') newY = Math.max(0, prev.y - nudge);
          else if (e.key === 'ArrowDown') newY = Math.min(100, prev.y + nudge);
          else if (e.key === 'ArrowLeft') newX = Math.max(0, prev.x - nudge);
          else if (e.key === 'ArrowRight') newX = Math.min(100, prev.x + nudge);
          else return prev;

          // Prevent default scrolling only if we actually handled the arrow key
          e.preventDefault();
          return { ...prev, x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 };
        });
      };

      if (focusedLayer === 'name') updateStyle(setNameStyle);
      else if (focusedLayer === 'text1') updateStyle(setText1Style);
      else if (focusedLayer === 'text2') updateStyle(setText2Style);
      else if (focusedLayer === 'pfp') updateStyle(setPfpStyle);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedLayer]);

  // --- Batch Export Engine Logic ---mobile compatibility
  const handleTouchStart = (e: React.TouchEvent, layer: 'name' | 'text1' | 'text2' | 'pfp') => {
    if (!previewContainerRef.current || e.touches.length === 0) return;
    setFocusedLayer(layer);
    const rect = previewContainerRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    let currentXPercent = 0;
    let currentYPercent = 0;

    if (layer === 'name') { currentXPercent = nameStyle.x; currentYPercent = nameStyle.y; }
    else if (layer === 'text1') { currentXPercent = text1Style.x; currentYPercent = text1Style.y; }
    else if (layer === 'text2') { currentXPercent = text2Style.x; currentYPercent = text2Style.y; }
    else if (layer === 'pfp') { currentXPercent = pfpStyle.x; currentYPercent = pfpStyle.y; }

    const xRel = touch.clientX - rect.left;
    const yRel = touch.clientY - rect.top;
    const unscaledX = xRel / zoom;
    const unscaledY = yRel / zoom;

    const baseWidth = previewBoxWidth;
    const baseHeight = previewBoxWidth * aspectRatio;

    const currentXPixels = (currentXPercent / 100) * baseWidth;
    const currentYPixels = (currentYPercent / 100) * baseHeight;

    setDragState({
      isDragging: true,
      layer,
      offsetX: unscaledX - currentXPixels,
      offsetY: unscaledY - currentYPixels
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.isDragging || !dragState.layer || !previewContainerRef.current || e.touches.length === 0) return;
    const rect = previewContainerRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    const xRel = touch.clientX - rect.left;
    const yRel = touch.clientY - rect.top;
    const unscaledX = xRel / zoom;
    const unscaledY = yRel / zoom;

    const newXPixels = unscaledX - dragState.offsetX;
    const newYPixels = unscaledY - dragState.offsetY;

    const baseWidth = previewBoxWidth;
    const baseHeight = previewBoxWidth * aspectRatio;

    let newXPercent = Math.max(0, Math.min(100, (newXPixels / baseWidth) * 100));
    let newYPercent = Math.max(0, Math.min(100, (newYPixels / baseHeight) * 100));

    newXPercent = Math.round(newXPercent * 10) / 10;
    newYPercent = Math.round(newYPercent * 10) / 10;

    if (dragState.layer === 'name') {
      setNameStyle(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    } else if (dragState.layer === 'text1') {
      setText1Style(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    } else if (dragState.layer === 'text2') {
      setText2Style(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    } else if (dragState.layer === 'pfp') {
      setPfpStyle(prev => ({ ...prev, x: newXPercent, y: newYPercent }));
    }
  };

  // --- Batch Export Engine Logic ---
  const handleBatchExport = async () => {
    if (guestList.length === 0) {
      setUploadWarning("Guest list is empty. Add guests before exporting.");
      setTimeout(() => setUploadWarning(null), 4000);
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    const zip = new JSZip();

    try {
      // Loop sequentially
      for (let i = 0; i < guestList.length; i++) {
        const guest = guestList[i];
        
        // Force synchronous React DOM flush to update the active render component
        flushSync(() => {
          setExportCurrentName(guest.name);
          setSelectedGuestIndex(i);
        });

        // Await paint sequence: 
        // 1. Programmatic wait for the images to load completely
        await new Promise<void>(resolve => {
          const exportCard = document.getElementById('export-card-render-active');
          if (!exportCard) return resolve();
          
          const bgImg = exportCard.querySelector('.export-bg-element') as HTMLImageElement | null;
          const pfpImg = exportCard.querySelector('.export-pfp-element') as HTMLImageElement | null;

          let bgLoaded = !bgImage; // if no bg image, count loaded
          let pfpLoaded = !guest.pfpUrl; // if no pfp image, count loaded

          const checkDone = () => {
            if (bgLoaded && pfpLoaded) {
              resolve();
            }
          };

          if (bgImg) {
            if (bgImg.complete) {
              bgLoaded = true;
            } else {
              bgImg.onload = () => { bgLoaded = true; checkDone(); };
              bgImg.onerror = () => { bgLoaded = true; checkDone(); };
            }
          }

          if (pfpImg && guest.pfpUrl) {
            if (pfpImg.complete) {
              pfpLoaded = true;
            } else {
              pfpImg.onload = () => { pfpLoaded = true; checkDone(); };
              pfpImg.onerror = () => { pfpLoaded = true; checkDone(); };
            }
          }

          checkDone();
          // Timeout limit safety
          setTimeout(resolve, 300);
        });

        // 2. Programmatic wait for Font Registry
        await document.fonts.ready;

        // 3. Take HTML snapshot
        const exportContainer = document.getElementById('export-card-render-active');
        if (exportContainer) {
          const canvas = await html2canvas(exportContainer, {
            useCORS: true,
            allowTaint: true,
            scale: 1, // Render at native template pixel dimensions
            backgroundColor: null,
            logging: false
          });

          // 4. Convert to Blob & Zip
          await new Promise<void>((resolveBlob) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const safeName = guest.name.replace(/[^a-zA-Z0-9_-]/g, '_');
                zip.file(`Invite_${safeName}.jpg`, blob);
              }
              resolveBlob();
            }, 'image/jpeg', 0.95);
          });
        }

        // Update progress bar
        setExportProgress(Math.round(((i + 1) / guestList.length) * 100));
      }

      // Generate ZIP and trigger save
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'Debut_Invitations.zip');
    } catch (error) {
      console.error("Batch compilation error:", error);
      alert("Something went wrong during card compilation.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setExportCurrentName('');
      // Restore selected guest back to first index
      setSelectedGuestIndex(0);
    }
  };

  // Select current active guest details
  const activeGuest = guestList[selectedGuestIndex] || {
    name: 'PREVIEW_NAME',
    text1: 'CUSTOM_TEXT_1',
    text2: 'CUSTOM_TEXT_2',
    pfpUrl: null,
    pfpStatus: 'missing'
  };

  // Math Helper: calculate preview style scaling based on preview box size
  const previewBoxWidth = 500; // Locked coordinate reference width
  const previewScale = previewBoxWidth / bgWidth;

  // Build the glowing typography text style
  const getTextStyle = (style: FontStyle) => {
    if (!style.enabled) return { display: 'none' };
    
    // Scale font size and parameters to high-res vs. preview
    // In preview container: values are scaled down.
    // In export container: values are 100% (raw high-res pixels).
    return {
      fontFamily: style.fontFamily,
      color: style.color,
      fontWeight: style.bold ? 'bold' : 'normal',
      fontStyle: style.italic ? 'italic' : 'normal',
      letterSpacing: `${style.letterSpacing}px`,
      textAlign: style.textAlign,
      textTransform: style.textTransform === 'titlecase' ? 'none' : style.textTransform, // titlecase logic in rendering
      textShadow: style.glowBlur > 0 
        ? `${style.shadowX}px ${style.shadowY}px ${style.shadowBlur}px ${style.shadowColor}, 0 0 ${style.glowBlur}px ${style.glowColor}`
        : `${style.shadowX}px ${style.shadowY}px ${style.shadowBlur}px ${style.shadowColor}`
    };
  };

  // Convert name strings for casing transforms
  const renderTextContent = (text: string, transform: 'none' | 'uppercase' | 'lowercase' | 'titlecase') => {
    if (!text) return '';
    if (transform === 'uppercase') return text.toUpperCase();
    if (transform === 'lowercase') return text.toLowerCase();
    if (transform === 'titlecase') {
      return text.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-[#020a0c] pt-24 pb-16 relative text-white" onMouseUp={handleMouseUp}>
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.02),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={20} className="text-neon-cyan animate-pulse" />
              <span className="text-[10px] font-ethnocentric text-neon-cyan tracking-[0.3em] uppercase">ROSTER SYSTEM</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-ethnocentric tracking-tighter text-white">
              Virtual Invitation Generator
            </h1>
            <p className="text-xs font-mono text-neon-cyan/70 tracking-widest uppercase mt-2">
              Technofuturistic Card Injection & Batch Compilation Terminal
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Active Roster</p>
              <p className="text-xs text-white font-mono uppercase">{guestList.length} Guests</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden md:block"></div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Asset Loadout</p>
              <p className="text-xs text-neon-green font-mono uppercase">{assetPool.length} PFPs</p>
            </div>
          </div>
        </div>

        {/* Global Warnings */}
        {uploadWarning && (
          <div className="mb-6 bg-red-950/40 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3 text-xs font-mono animate-shake">
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <span>{uploadWarning}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT PANEL - CONTROLS */}
          <div className="w-full lg:w-[480px] shrink-0 space-y-6 order-2 lg:order-1">
            
            {/* PANEL TABS */}
            <div className="flex border border-white/10 rounded-lg overflow-hidden w-full bg-black/40">
              <button
                onClick={() => setActivePanelTab('editor')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-ethnocentric tracking-wider transition-all ${activePanelTab === 'editor' ? 'bg-neon-cyan text-black' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
              >
                <Sliders size={14} />
                EDITOR CONTROLS
              </button>
              <button
                onClick={() => setActivePanelTab('roster')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-ethnocentric tracking-wider transition-all ${activePanelTab === 'roster' ? 'bg-neon-cyan text-black' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
              >
                <Users size={14} />
                ROSTER DATA ({guestList.length})
              </button>
            </div>

            {/* TAB: EDITOR CONTROLS */}
            {activePanelTab === 'editor' && (
              <div className="space-y-4">
                
                {/* 1. BACKGROUND ACCORDION */}
                <Accordion 
                  icon={FileImage} 
                  title="1. Template Background" 
                  isOpen={activeAccordion === 'bg'}
                  onToggle={() => setActiveAccordion(activeAccordion === 'bg' ? null : 'bg')}
                >
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed font-mono">
                      Upload a base invitation layout. The canvas aspect ratio will automatically resize to match the uploaded dimensions.
                    </p>
                    
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 hover:border-neon-cyan/40 transition-all duration-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={24} className="text-gray-400 mb-2 group-hover:text-neon-cyan" />
                          <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">Upload Template</p>
                          <p className="text-[10px] text-gray-500 font-mono mt-1">PNG, JPG or WEBP</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleBgUpload} 
                        />
                      </label>
                    </div>

                    {bgImage && (
                      <div className="p-3 bg-neon-cyan/5 border border-neon-cyan/20 rounded font-mono text-[10px] text-neon-cyan flex justify-between items-center">
                        <div>
                          <p className="font-bold">STATUS: TEMPLATE LOADED</p>
                          <p className="text-gray-400 mt-0.5">Dims: {bgWidth}x{bgHeight}px (Ratio: {aspectRatio.toFixed(3)})</p>
                        </div>
                        <button 
                          onClick={() => { setBgImage(null); setAspectRatio(1.0); }}
                          className="p-1.5 hover:bg-red-500/20 border border-red-500/30 rounded text-red-400 transition-colors"
                          title="Remove Background"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </Accordion>

                {/* 2. GUEST LIST PARSER ACCORDION */}
                <Accordion 
                  icon={Users} 
                  title="2. Name List" 
                  isOpen={activeAccordion === 'roster-parser'}
                  onToggle={() => setActiveAccordion(activeAccordion === 'roster-parser' ? null : 'roster-parser')}
                >
                  <div className="space-y-4 font-mono">
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-xs text-gray-400 uppercase">Column Delimiter:</span>
                      <select 
                        value={delimiter}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDelimiter(val);
                          handleParse(rawText, val);
                        }}
                        className="bg-black border border-white/20 text-neon-cyan rounded px-2 py-1 text-xs outline-none"
                      >
                        <option value=";">Semicolon ( ; )</option>
                        <option value="|">Pipe ( | )</option>
                        <option value=",">Comma ( , )</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-500 block mb-2 leading-relaxed">
                        Separate columns with delimiter. Format: [Name] {delimiter} [Custom Text 1] {delimiter} [Custom Text 2]. Text 2 is optional.
                      </span>
                      <textarea
                        value={rawText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRawText(val);
                          handleParse(val, delimiter);
                        }}
                        rows={6}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-xs text-neon-cyan/80 outline-none resize-none focus:border-neon-cyan/40 transition-colors font-mono leading-relaxed"
                        placeholder={`Sato ${delimiter} ACCESS_CODE: DOLL ${delimiter} Message goes here`}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 uppercase font-bold">Case Tools:</span>
                      <button 
                        onClick={() => applyCaseTransform('upper')}
                        className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded text-[9px] hover:bg-neon-cyan hover:text-black hover:border-neon-cyan font-bold transition-all"
                      >
                        ALL UPPER
                      </button>
                      <button 
                        onClick={() => applyCaseTransform('lower')}
                        className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded text-[9px] hover:bg-neon-cyan hover:text-black hover:border-neon-cyan font-bold transition-all"
                      >
                        all lower
                      </button>
                      <button 
                        onClick={() => applyCaseTransform('title')}
                        className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded text-[9px] hover:bg-neon-cyan hover:text-black hover:border-neon-cyan font-bold transition-all"
                      >
                        Title Case
                      </button>
                    </div>
                  </div>
                </Accordion>

                {/* 3. PFPs BULK ENGINE ACCORDION */}
                <Accordion 
                  icon={ImageIcon} 
                  title="3. Profile Picture" 
                  isOpen={activeAccordion === 'pfp-loader'}
                  onToggle={() => setActiveAccordion(activeAccordion === 'pfp-loader' ? null : 'pfp-loader')}
                >
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                      Drop all profile pictures here at once. The engine will parse the file names, sanitize extensions, and auto-match them against your parsed guests.
                    </p>

                    <div className="flex justify-between items-center gap-3">
                      <span className="text-xs text-gray-400 font-mono uppercase">Match Tolerance:</span>
                      <select 
                        value={matchTolerance}
                        onChange={(e) => setMatchTolerance(e.target.value as 'strict' | 'fuzzy')}
                        className="bg-black border border-white/20 text-neon-cyan rounded px-2 py-1 text-xs outline-none font-mono"
                      >
                        <option value="fuzzy">Fuzzy (Substring)</option>
                        <option value="strict">Strict (Exact Match)</option>
                      </select>
                    </div>

                    <div 
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => pfpInputRef.current?.click()}
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 hover:border-neon-cyan/40 transition-all duration-300"
                    >
                      <FolderPlus size={22} className="text-gray-400 mb-1" />
                      <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">Drop Profile Pictures</p>
                      <p className="text-[9px] text-gray-500 font-mono mt-0.5">Click to choose files (Max 4MB each)</p>
                      <input 
                        type="file" 
                        ref={pfpInputRef}
                        className="hidden" 
                        multiple 
                        accept="image/*" 
                        onChange={handlePfpSelection} 
                      />
                    </div>

                    {assetPool.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                          <span>UPLOADED ASSET POOL ({assetPool.length})</span>
                          <button 
                            onClick={handleClearPFPs} 
                            className="text-red-400 hover:text-red-300 font-bold uppercase transition-colors"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto p-1 border border-white/5 bg-black/40 rounded custom-scrollbar">
                          {assetPool.map((asset, index) => (
                            <div key={index} className="relative group aspect-square bg-[#05161a] rounded overflow-hidden border border-white/10 hover:border-neon-cyan transition-colors" title={asset.name}>
                              <img src={asset.url} alt="pool PFP" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[7px] text-neon-cyan break-all p-0.5 text-center font-mono">
                                  {asset.name.substring(0, 10)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Accordion>

                {/* 4. TYPOGRAPHY & LAYOUTS STYLING ACCORDION */}
                <Accordion 
                  icon={Type} 
                  title="4. Typography & Positioning" 
                  isOpen={activeAccordion === 'typography'}
                  onToggle={() => setActiveAccordion(activeAccordion === 'typography' ? null : 'typography')}
                >
                  <div className="space-y-6">
                    {/* CUSTOM FONTS IMPORT SECTION */}
                    <div className="border border-neon-cyan/20 bg-neon-cyan/5 rounded p-3 space-y-3 font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-neon-cyan font-bold uppercase">Dynamic Font Injector:</span>
                        <button 
                          onClick={() => fontInputRef.current?.click()}
                          className="px-2 py-1 bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan text-[9px] font-bold hover:bg-neon-cyan hover:text-black rounded transition-all"
                        >
                          + ADD TTF/OTF
                        </button>
                        <input 
                          type="file" 
                          ref={fontInputRef} 
                          className="hidden" 
                          accept=".ttf,.otf" 
                          onChange={handleFontUpload}
                        />
                      </div>
                      
                      {customFonts.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {customFonts.map((f, i) => (
                            <span key={i} className="text-[9px] bg-neon-cyan/20 border border-neon-cyan/40 px-1.5 py-0.5 rounded text-neon-cyan font-bold flex items-center gap-1">
                              <Check size={8} /> {f}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[9px] text-gray-500">No custom fonts injected in session.</p>
                      )}
                    </div>

                    {/* SELECT LAYER SUB-TABS */}
                    <div className="space-y-4">
                      {/* --- A. NAME LAYER STYLE --- */}
                      <div className="border-l-2 border-neon-cyan pl-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-ethnocentric tracking-widest text-white">Name Layer</span>
                          <input 
                            type="checkbox" 
                            checked={nameStyle.enabled} 
                            onChange={(e) => setNameStyle(prev => ({ ...prev, enabled: e.target.checked }))}
                            className="w-3 h-3 text-neon-cyan bg-black border-white/20 rounded focus:ring-0 cursor-pointer"
                          />
                        </div>
                        {nameStyle.enabled && (
                          <div className="space-y-3 font-mono text-[11px]">
                            {/* Font Select */}
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-gray-400">Font:</span>
                              <select 
                                value={nameStyle.fontFamily}
                                onChange={(e) => setNameStyle(prev => ({ ...prev, fontFamily: e.target.value }))}
                                className="bg-black border border-white/20 text-white rounded px-2 py-0.5 outline-none max-w-[160px]"
                              >
                                {PRESET_FONTS.concat(customFonts).map(f => (
                                  <option key={f} value={f}>{f}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Size slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-gray-400">
                                <span>Font Size ({nameStyle.fontSize}px)</span>
                                <span>12 - 160</span>
                              </div>
                              <input 
                                type="range" min="12" max="160" value={nameStyle.fontSize}
                                onChange={(e) => setNameStyle(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                              />
                            </div>

                            {/* Colors */}
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-gray-400 block mb-1">Color:</span>
                                <div className="flex items-center gap-1.5">
                                  <input type="color" value={nameStyle.color} onChange={(e) => setNameStyle(prev => ({ ...prev, color: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                                  <input type="text" value={nameStyle.color} onChange={(e) => setNameStyle(prev => ({ ...prev, color: e.target.value }))} className="bg-black border border-white/10 text-white px-1.5 py-0.5 rounded w-16 text-center text-[9px]" />
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-1">Glow Color:</span>
                                <div className="flex items-center gap-1.5">
                                  <input type="color" value={nameStyle.glowColor} onChange={(e) => setNameStyle(prev => ({ ...prev, glowColor: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                                  <input type="text" value={nameStyle.glowColor} onChange={(e) => setNameStyle(prev => ({ ...prev, glowColor: e.target.value }))} className="bg-black border border-white/10 text-white px-1.5 py-0.5 rounded w-16 text-center text-[9px]" />
                                </div>
                              </div>
                            </div>

                            {/* Glow & Letter Spacing */}
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              <div className="space-y-1">
                                <span className="text-[10px] text-gray-400">Glow Spread ({nameStyle.glowBlur}px)</span>
                                <input 
                                  type="range" min="0" max="60" value={nameStyle.glowBlur}
                                  onChange={(e) => setNameStyle(prev => ({ ...prev, glowBlur: parseInt(e.target.value) }))}
                                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-neon-cyan"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] text-gray-400">Spacing ({nameStyle.letterSpacing}px)</span>
                                <input 
                                  type="range" min="-5" max="30" value={nameStyle.letterSpacing}
                                  onChange={(e) => setNameStyle(prev => ({ ...prev, letterSpacing: parseInt(e.target.value) }))}
                                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-neon-cyan"
                                />
                              </div>
                            </div>

                            {/* Text Transforms & Alignment Toggles */}
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setNameStyle(prev => ({ ...prev, bold: !prev.bold }))}
                                  className={`px-2 py-0.5 border rounded text-[9px] font-bold ${nameStyle.bold ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan' : 'border-white/10 text-gray-500'}`}
                                >
                                  B
                                </button>
                                <button 
                                  onClick={() => setNameStyle(prev => ({ ...prev, italic: !prev.italic }))}
                                  className={`px-2 py-0.5 border rounded text-[9px] italic ${nameStyle.italic ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan' : 'border-white/10 text-gray-500'}`}
                                >
                                  I
                                </button>
                              </div>
                              <div className="flex gap-1">
                                {(['none', 'uppercase', 'titlecase'] as const).map(t => (
                                  <button 
                                    key={t}
                                    onClick={() => setNameStyle(prev => ({ ...prev, textTransform: t }))}
                                    className={`px-1.5 py-0.5 border rounded text-[8px] uppercase ${nameStyle.textTransform === t ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan' : 'border-white/10 text-gray-500'}`}
                                  >
                                    {t === 'titlecase' ? 'Title' : t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* --- B. CUSTOM TEXT 1 STYLE --- */}
                      <div className="border-l-2 border-neon-cyan pl-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-ethnocentric tracking-widest text-white">Text 1 Layer</span>
                          <input 
                            type="checkbox" 
                            checked={text1Style.enabled} 
                            onChange={(e) => setText1Style(prev => ({ ...prev, enabled: e.target.checked }))}
                            className="w-3 h-3 text-neon-cyan bg-black border-white/20 rounded focus:ring-0 cursor-pointer"
                          />
                        </div>
                        {text1Style.enabled && (
                          <div className="space-y-3 font-mono text-[11px]">
                            {/* Font Select */}
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-gray-400">Font:</span>
                              <select 
                                value={text1Style.fontFamily}
                                onChange={(e) => setText1Style(prev => ({ ...prev, fontFamily: e.target.value }))}
                                className="bg-black border border-white/20 text-white rounded px-2 py-0.5 outline-none max-w-[160px]"
                              >
                                {PRESET_FONTS.concat(customFonts).map(f => (
                                  <option key={f} value={f}>{f}</option>
                                ))}
                              </select>
                            </div>

                            {/* Size slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-gray-400">
                                <span>Font Size ({text1Style.fontSize}px)</span>
                                <span>8 - 120</span>
                              </div>
                              <input 
                                type="range" min="8" max="120" value={text1Style.fontSize}
                                onChange={(e) => setText1Style(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                              />
                            </div>

                            {/* Colors */}
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-gray-400 block mb-1">Color:</span>
                                <div className="flex items-center gap-1.5">
                                  <input type="color" value={text1Style.color} onChange={(e) => setText1Style(prev => ({ ...prev, color: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                                  <input type="text" value={text1Style.color} onChange={(e) => setText1Style(prev => ({ ...prev, color: e.target.value }))} className="bg-black border border-white/10 text-white px-1.5 py-0.5 rounded w-16 text-center text-[9px]" />
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-1">Glow Color:</span>
                                <div className="flex items-center gap-1.5">
                                  <input type="color" value={text1Style.glowColor} onChange={(e) => setText1Style(prev => ({ ...prev, glowColor: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                                  <input type="text" value={text1Style.glowColor} onChange={(e) => setText1Style(prev => ({ ...prev, glowColor: e.target.value }))} className="bg-black border border-white/10 text-white px-1.5 py-0.5 rounded w-16 text-center text-[9px]" />
                                </div>
                              </div>
                            </div>

                            {/* Glow & Letter Spacing */}
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              <div className="space-y-1">
                                <span className="text-[10px] text-gray-400">Glow Spread ({text1Style.glowBlur}px)</span>
                                <input 
                                  type="range" min="0" max="60" value={text1Style.glowBlur}
                                  onChange={(e) => setText1Style(prev => ({ ...prev, glowBlur: parseInt(e.target.value) }))}
                                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-neon-cyan"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] text-gray-400">Spacing ({text1Style.letterSpacing}px)</span>
                                <input 
                                  type="range" min="-5" max="30" value={text1Style.letterSpacing}
                                  onChange={(e) => setText1Style(prev => ({ ...prev, letterSpacing: parseInt(e.target.value) }))}
                                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-neon-cyan"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* --- C. CUSTOM TEXT 2 STYLE --- */}
                      <div className="border-l-2 border-neon-cyan pl-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-ethnocentric tracking-widest text-white">Text 2 Layer</span>
                          <input 
                            type="checkbox" 
                            checked={text2Style.enabled} 
                            onChange={(e) => setText2Style(prev => ({ ...prev, enabled: e.target.checked }))}
                            className="w-3 h-3 text-neon-cyan bg-black border-white/20 rounded focus:ring-0 cursor-pointer"
                          />
                        </div>
                        {text2Style.enabled && (
                          <div className="space-y-3 font-mono text-[11px]">
                            {/* Font Select */}
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-gray-400">Font:</span>
                              <select 
                                value={text2Style.fontFamily}
                                onChange={(e) => setText2Style(prev => ({ ...prev, fontFamily: e.target.value }))}
                                className="bg-black border border-white/20 text-white rounded px-2 py-0.5 outline-none max-w-[160px]"
                              >
                                {PRESET_FONTS.concat(customFonts).map(f => (
                                  <option key={f} value={f}>{f}</option>
                                ))}
                              </select>
                            </div>

                            {/* Size slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-gray-400">
                                <span>Font Size ({text2Style.fontSize}px)</span>
                                <span>8 - 120</span>
                              </div>
                              <input 
                                type="range" min="8" max="120" value={text2Style.fontSize}
                                onChange={(e) => setText2Style(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-gray-400 block mb-1">Color:</span>
                                <input type="color" value={text2Style.color} onChange={(e) => setText2Style(prev => ({ ...prev, color: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                              </div>
                              <div className="flex gap-2 items-end">
                                <button 
                                  onClick={() => setText2Style(prev => ({ ...prev, bold: !prev.bold }))}
                                  className={`px-2 py-0.5 border rounded text-[9px] font-bold ${text2Style.bold ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan' : 'border-white/10 text-gray-500'}`}
                                >
                                  B
                                </button>
                                <button 
                                  onClick={() => setText2Style(prev => ({ ...prev, italic: !prev.italic }))}
                                  className={`px-2 py-0.5 border rounded text-[9px] italic ${text2Style.italic ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan' : 'border-white/10 text-gray-500'}`}
                                >
                                  I
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* --- D. PROFILE PICTURE STYLE --- */}
                      <div className="border-l-2 border-neon-cyan pl-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-ethnocentric tracking-widest text-white">Profile Picture</span>
                          <input 
                            type="checkbox" 
                            checked={pfpStyle.enabled} 
                            onChange={(e) => setPfpStyle(prev => ({ ...prev, enabled: e.target.checked }))}
                            className="w-3 h-3 text-neon-cyan bg-black border-white/20 rounded focus:ring-0 cursor-pointer"
                          />
                        </div>
                        {pfpStyle.enabled && (
                          <div className="space-y-3 font-mono text-[11px]">
                            {/* Scale Slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-gray-400">
                                <span>PFP Diameter ({pfpStyle.scale}% width)</span>
                                <span>5 - 60</span>
                              </div>
                              <input 
                                type="range" min="5" max="60" value={pfpStyle.scale}
                                onChange={(e) => setPfpStyle(prev => ({ ...prev, scale: parseInt(e.target.value) }))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                              />
                            </div>

                            {/* Border Radius */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-gray-400">
                                <span>Border Rounding ({pfpStyle.borderRadius}%)</span>
                                <span>0 = Sq, 50 = Circle</span>
                              </div>
                              <input 
                                type="range" min="0" max="50" value={pfpStyle.borderRadius}
                                onChange={(e) => setPfpStyle(prev => ({ ...prev, borderRadius: parseInt(e.target.value) }))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                              />
                            </div>

                            {/* Border Options */}
                            <div className="grid grid-cols-2 gap-3 text-[10px]">
                              <div className="space-y-1">
                                <span className="text-gray-400 block">Border Width ({pfpStyle.borderWidth}px)</span>
                                <input 
                                  type="range" min="0" max="24" value={pfpStyle.borderWidth}
                                  onChange={(e) => setPfpStyle(prev => ({ ...prev, borderWidth: parseInt(e.target.value) }))}
                                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-neon-cyan"
                                />
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-1">Border Color:</span>
                                <input type="color" value={pfpStyle.borderColor} onChange={(e) => setPfpStyle(prev => ({ ...prev, borderColor: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                              </div>
                            </div>

                            {/* PFP Neon Glow */}
                            <div className="grid grid-cols-2 gap-3 text-[10px] mt-2">
                              <div className="space-y-1">
                                <span className="text-gray-400 block">Glow Spread ({pfpStyle.glowBlur}px)</span>
                                <input 
                                  type="range" min="0" max="60" value={pfpStyle.glowBlur}
                                  onChange={(e) => setPfpStyle(prev => ({ ...prev, glowBlur: parseInt(e.target.value) }))}
                                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-neon-cyan"
                                />
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-1">Glow Color:</span>
                                <input type="color" value={pfpStyle.glowColor} onChange={(e) => setPfpStyle(prev => ({ ...prev, glowColor: e.target.value }))} className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
            )}

            {/* TAB: ROSTER LIST */}
            {activePanelTab === 'roster' && (
              <div className="bg-black/25 border border-white/10 rounded-lg p-5 space-y-4 max-h-[700px] overflow-y-auto custom-scrollbar font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold uppercase">PARSED ROSTER ({guestList.length})</span>
                  <span className="text-[10px] text-gray-500 font-mono">DELIM: &quot;{delimiter}&quot;</span>
                </div>

                {guestList.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-white/5 rounded text-gray-500 font-mono">
                    No guests parsed. Fill out the Name List in Editor Controls.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {guestList.map((guest, idx) => (
                      <div 
                        key={guest.id} 
                        onClick={() => setSelectedGuestIndex(idx)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedGuestIndex === idx ? 'border-neon-cyan bg-neon-cyan/5 shadow-[0_0_15px_rgba(0,242,255,0.08)]' : 'border-white/10 hover:border-white/20 bg-white/5'}`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1 max-w-[240px]">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold bg-white/10 text-white px-1.5 py-0.5 rounded leading-none">#{idx + 1}</span>
                              <h4 className="text-white font-bold truncate leading-tight">{guest.name}</h4>
                            </div>
                            {guest.text1 && <p className="text-[10px] text-neon-cyan truncate">{guest.text1}</p>}
                            {guest.text2 && <p className="text-[9px] text-gray-400 truncate italic">{guest.text2}</p>}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* PFP matching badge status */}
                            {guest.pfpStatus === 'matched' && (
                              <span className="text-[8px] bg-green-500/10 border border-green-500/30 text-green-400 px-1.5 py-0.5 rounded uppercase font-bold" title={`Auto-Matched: ${guest.pfpName}`}>
                                AUTO OK
                              </span>
                            )}
                            {guest.pfpStatus === 'manual' && (
                              <span className="text-[8px] bg-blue-500/10 border border-blue-500/30 text-blue-400 px-1.5 py-0.5 rounded uppercase font-bold" title={`Manually Assigned: ${guest.pfpName}`}>
                                MANUAL
                              </span>
                            )}
                            {guest.pfpStatus === 'missing' && (
                              <span className="text-[8px] bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-1.5 py-0.5 rounded uppercase font-bold">
                                NO PFP
                              </span>
                            )}

                            {/* Dropdown override selector for PFP manual pairing */}
                            {assetPool.length > 0 && (
                              <select
                                onChange={(e) => {
                                  const selectedAsset = assetPool.find(a => a.url === e.target.value);
                                  if (selectedAsset) {
                                    handleManualPfpAssign(guest.id, selectedAsset.url, selectedAsset.name);
                                  }
                                }}
                                value={guest.pfpUrl || ""}
                                className="bg-black/80 border border-white/20 text-neon-cyan rounded py-0.5 px-1 text-[9px] outline-none max-w-[80px]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="" disabled>Link PFP</option>
                                {assetPool.map((asset, index) => (
                                  <option key={index} value={asset.url}>
                                    {asset.name.substring(0, 15)}
                                  </option>
                                ))}
                              </select>
                            )}

                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteGuest(guest.id); }}
                              className="p-1 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 rounded text-red-400 transition-colors"
                              title="Delete Row"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BATCH ZIP GENERATION TRIGGER */}
            <div className="border border-neon-cyan/30 rounded-lg p-5 bg-[#05161a]/80 shadow-[0_0_20px_rgba(0,242,255,0.15)] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Sliders size={20} className="text-neon-cyan" />
                <span className="text-xs font-ethnocentric tracking-widest text-white uppercase">Export Console</span>
              </div>
              <p className="text-xs font-mono text-gray-400 leading-relaxed">
                Compile all custom variations in your roster. An asynchronous export sequence will render cards in high definition, pack them inside a ZIP folder, and trigger a local download.
              </p>
              
              <button
                onClick={handleBatchExport}
                disabled={isExporting}
                className="w-full btn-custom flex items-center justify-center gap-2 hover:scale-100 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all text-xs"
              >
                <Download size={14} />
                {isExporting ? 'COMPILING ASSETS...' : 'BATCH GENERATE & DOWNLOAD'}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - LIVE EDITOR CANVAS PREVIEW */}
          <div className="flex-grow w-full flex flex-col gap-6 order-1 lg:order-2 lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar p-1">
            
            {/* CANVAS WRAPPER */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_#39ff14]"></div>
                    <span className="text-[10px] font-ethnocentric text-gray-400 tracking-wider">LIVE VIEWER FEED</span>
                  </div>
                  <span className="text-[9px] font-mono text-neon-cyan/70">
                    ⚡ TIP: DRAG ELEMENTS DIRECTLY ON CANVAS TO POSITION
                  </span>
                </div>

                {/* Dropdown switch active guest preview */}
                {guestList.length > 0 && (
                  <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
                    <span>Previewing:</span>
                    <select
                      value={selectedGuestIndex}
                      onChange={(e) => setSelectedGuestIndex(parseInt(e.target.value))}
                      className="bg-black border border-white/20 text-neon-cyan px-2 py-1 rounded outline-none text-xs font-bold"
                    >
                      {guestList.map((g, idx) => (
                        <option key={g.id} value={idx}>
                          #{idx + 1}: {g.name.substring(0, 18)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* ZOOM CONTROLLER */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-black/40 border border-white/10 rounded-lg font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 uppercase text-[9px] font-bold">Zoom:</span>
                  <button 
                    onClick={() => setZoom(prev => Math.max(0.4, Math.min(2.0, Math.round((prev - 0.1) * 10) / 10)))}
                    className="w-6 h-6 flex items-center justify-center bg-white/5 border border-white/10 rounded hover:bg-neon-cyan hover:text-black font-bold transition-all"
                  >
                    -
                  </button>
                  <span className="text-neon-cyan font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
                  <button 
                    onClick={() => setZoom(prev => Math.max(0.4, Math.min(2.0, Math.round((prev + 0.1) * 10) / 10)))}
                    className="w-6 h-6 flex items-center justify-center bg-white/5 border border-white/10 rounded hover:bg-neon-cyan hover:text-black font-bold transition-all"
                  >
                    +
                  </button>
                </div>
                <input 
                  type="range" 
                  min="0.4" 
                  max="2.0" 
                  step="0.05" 
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 max-w-[150px] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                />
                <button 
                  onClick={handleAutoFit}
                  className="px-3 py-1 bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan text-[10px] font-bold hover:bg-neon-cyan hover:text-black rounded transition-all"
                >
                  AUTO FIT
                </button>
              </div>

              {/* RENDER CANVAS CONTAINER */}
              <div 
                ref={scrollContainerRef}
                onMouseDown={handleScrollMouseDown}
                onMouseMove={handleScrollMouseMove}
                onMouseUp={handleScrollMouseUp}
                onMouseLeave={handleScrollMouseUp}
                className="w-full overflow-auto p-6 md:p-8 bg-black/40 border border-white/5 rounded-xl relative group shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] custom-scrollbar select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{ minHeight: '350px' }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03),transparent_70%)] pointer-events-none"></div>

                {/* THE ZOOM WRAPPER */}
                <div 
                  style={{
                    width: `${previewBoxWidth * zoom}px`,
                    height: `${previewBoxWidth * aspectRatio * zoom}px`,
                    position: 'relative',
                    flexShrink: 0
                  }}
                >
                  {/* THE CARD PREVIEW COMPONENT */}
                  <div 
                    ref={previewContainerRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onMouseUp={handleMouseUp}
                    onTouchEnd={handleMouseUp}
                    className="absolute left-0 top-0 overflow-hidden shadow-2xl transition-transform border border-white/10"
                    style={{
                      width: `${previewBoxWidth}px`,
                      height: `${previewBoxWidth * aspectRatio}px`,
                      backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                      backgroundColor: '#05161a',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: dragState.isDragging ? 'grabbing' : 'default',
                      userSelect: 'none',
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left'
                    }}
                  >
                    {/* Digital Tech background matrix grid if no background image is uploaded */}
                    {!bgImage && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-gray-600 font-mono pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <AlertCircle size={32} className="text-neon-cyan/40 mb-3" />
                        <p className="text-[10px] uppercase font-ethnocentric text-neon-cyan/50 tracking-widest">Awaiting Template Upload</p>
                        <p className="text-[9px] mt-1 opacity-70">DEFAULT CYBER LAYOUT ACTIVE</p>
                      </div>
                    )}

                    {/* ELEMENT: NAME LAYER */}
                    {nameStyle.enabled && (
                      <div 
                        onMouseDown={(e) => handleMouseDown(e, 'name')}
                        onTouchStart={(e) => handleTouchStart(e, 'name')}
                        className="absolute select-none focusable-chunk cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-neon-cyan/50 p-1.5 rounded transition-shadow"
                        style={{
                          left: `${nameStyle.x}%`,
                          top: `${nameStyle.y}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: `${nameStyle.fontSize * previewScale}px`,
                          zIndex: 25,
                          ...getTextStyle(nameStyle)
                        }}
                      >
                        {renderTextContent(activeGuest.name, nameStyle.textTransform)}
                      </div>
                    )}

                    {/* ELEMENT: TEXT 1 LAYER */}
                    {text1Style.enabled && activeGuest.text1 && (
                      <div 
                        onMouseDown={(e) => handleMouseDown(e, 'text1')}
                        onTouchStart={(e) => handleTouchStart(e, 'text1')}
                        className="absolute select-none focusable-chunk cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-neon-cyan/50 p-1.5 rounded transition-shadow"
                        style={{
                          left: `${text1Style.x}%`,
                          top: `${text1Style.y}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: `${text1Style.fontSize * previewScale}px`,
                          zIndex: 24,
                          ...getTextStyle(text1Style)
                        }}
                      >
                        {renderTextContent(activeGuest.text1, text1Style.textTransform)}
                      </div>
                    )}

                    {/* ELEMENT: TEXT 2 LAYER */}
                    {text2Style.enabled && activeGuest.text2 && (
                      <div 
                        onMouseDown={(e) => handleMouseDown(e, 'text2')}
                        onTouchStart={(e) => handleTouchStart(e, 'text2')}
                        className="absolute select-none focusable-chunk cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-neon-cyan/50 p-1.5 rounded transition-shadow"
                        style={{
                          left: `${text2Style.x}%`,
                          top: `${text2Style.y}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: `${text2Style.fontSize * previewScale}px`,
                          zIndex: 23,
                          ...getTextStyle(text2Style)
                        }}
                      >
                        {renderTextContent(activeGuest.text2, text2Style.textTransform)}
                      </div>
                    )}

                    {/* ELEMENT: PFP LAYER */}
                    {pfpStyle.enabled && activeGuest.pfpUrl && (
                      <div
                        onMouseDown={(e) => handleMouseDown(e, 'pfp')}
                        onTouchStart={(e) => handleTouchStart(e, 'pfp')}
                        className="absolute select-none cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-neon-cyan/50 p-1.5 rounded focusable-chunk"
                        style={{
                          left: `${pfpStyle.x}%`,
                          top: `${pfpStyle.y}%`,
                          transform: 'translate(-50%, -50%)',
                          width: `${pfpStyle.scale}%`,
                          aspectRatio: '1',
                          zIndex: 20,
                        }}
                      >
                        <div 
                          className="w-full h-full relative overflow-hidden transition-all duration-300"
                          style={{
                            borderRadius: `${pfpStyle.borderRadius}%`,
                            borderWidth: `${pfpStyle.borderWidth * previewScale}px`,
                            borderColor: pfpStyle.borderColor,
                            boxShadow: pfpStyle.glowBlur > 0 
                              ? `0 0 ${pfpStyle.glowBlur * previewScale}px ${pfpStyle.glowIntensity}px ${pfpStyle.glowColor}`
                              : 'none'
                          }}
                        >
                          <img 
                            src={activeGuest.pfpUrl} 
                            alt="preview avatar" 
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MANUAL INSTRUCTION AND DETAILS */}
        <div className="mt-8 bg-white/5 border border-neon-cyan/20 p-5 rounded-lg font-mono text-xs space-y-3 leading-relaxed">
          <h4 className="text-neon-cyan font-bold tracking-widest text-[11px] uppercase flex items-center gap-2">
            <HelpCircle size={14} /> Virtual Invitation Generator Manual Uplink
          </h4>
          <ol className="space-y-2 list-decimal list-inside text-gray-400 text-[11px]">
            <li>Paste your guest lineup separated by semicolon, pipe or commas in the <b className="text-white">Name List</b>.</li>
            <li>Upload an invitation card template base (PNG or JPG). The editor locks aspect ratios dynamically.</li>
            <li>Drop all profile pictures in <b className="text-white">Profile Picture</b>. The engine pairs files instantly by checking names.</li>
            <li>Review the roster list. Check the <b className="text-neon-green">AUTO OK</b> matching badge or manually bind PFPs to rows.</li>
            <li>Fine-tune positioning (dragging elements directly or using coordinates dials) and trigger the <b className="text-neon-cyan">BATCH GENERATE ZIP</b> array.</li>
          </ol>
        </div>

        {/* --- DISSOLVED OFF-SCREEN CARD CONTAINERS FOR CRISP BATCH RENDER EXPORTS --- */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
          {isExporting && activeGuest && (
            <div 
              id="export-card-render-active" 
              style={{
                width: `${bgWidth}px`,
                height: `${bgHeight}px`,
                backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                backgroundColor: '#05161a',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Background image tracker element for onload monitoring */}
              {bgImage && (
                <img 
                  src={bgImage} 
                  alt="bg" 
                  className="export-bg-element hidden" 
                />
              )}

              {/* NAME LAYER (HIGH-RES) */}
              {nameStyle.enabled && (
                <div 
                  style={{
                    position: 'absolute',
                    left: `${nameStyle.x}%`,
                    top: `${nameStyle.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${nameStyle.fontSize}px`,
                    zIndex: 25,
                    ...getTextStyle(nameStyle)
                  }}
                >
                  {renderTextContent(activeGuest.name, nameStyle.textTransform)}
                </div>
              )}

              {/* TEXT 1 LAYER (HIGH-RES) */}
              {text1Style.enabled && activeGuest.text1 && (
                <div 
                  style={{
                    position: 'absolute',
                    left: `${text1Style.x}%`,
                    top: `${text1Style.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${text1Style.fontSize}px`,
                    zIndex: 24,
                    ...getTextStyle(text1Style)
                  }}
                >
                  {renderTextContent(activeGuest.text1, text1Style.textTransform)}
                </div>
              )}

              {/* TEXT 2 LAYER (HIGH-RES) */}
              {text2Style.enabled && activeGuest.text2 && (
                <div 
                  style={{
                    position: 'absolute',
                    left: `${text2Style.x}%`,
                    top: `${text2Style.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${text2Style.fontSize}px`,
                    zIndex: 23,
                    ...getTextStyle(text2Style)
                  }}
                >
                  {renderTextContent(activeGuest.text2, text2Style.textTransform)}
                </div>
              )}

              {/* PFP LAYER (HIGH-RES) */}
              {pfpStyle.enabled && activeGuest.pfpUrl && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${pfpStyle.x}%`,
                    top: `${pfpStyle.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${pfpStyle.scale}%`,
                    aspectRatio: '1',
                    zIndex: 20,
                  }}
                >
                  <div 
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: `${pfpStyle.borderRadius}%`,
                      borderWidth: `${pfpStyle.borderWidth}px`,
                      borderColor: pfpStyle.borderColor,
                      boxShadow: pfpStyle.glowBlur > 0 
                        ? `0 0 ${pfpStyle.glowBlur}px ${pfpStyle.glowIntensity}px ${pfpStyle.glowColor}`
                        : 'none'
                    }}
                  >
                    <img 
                      src={activeGuest.pfpUrl} 
                      alt="high-res PFP" 
                      className="export-pfp-element w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- EXPORT PROGRESS MODAL WINDOW OVERLAY --- */}
        {isExporting && (
          <div className="fixed inset-0 z-50 bg-[#020a0c]/90 backdrop-blur-md flex flex-col justify-center items-center p-8 font-mono">
            <div className="max-w-md w-full border border-neon-cyan/30 rounded-xl p-8 bg-black/60 relative overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.25)] space-y-6 text-center animate-zoom-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan animate-pulse"></div>
              
              <RefreshCw size={44} className="text-neon-cyan animate-spin mx-auto mb-4" />
              
              <div className="space-y-2">
                <span className="text-[10px] text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded tracking-widest uppercase">Array Compilation Active</span>
                <h3 className="text-lg font-ethnocentric text-white tracking-widest uppercase">Virtual Invitation Exporter</h3>
              </div>

              <div className="space-y-4">
                {/* Progress bar */}
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/5 relative">
                  <div 
                    className="bg-gradient-to-r from-neon-cyan to-neon-green h-full rounded-full transition-all duration-200"
                    style={{ width: `${exportProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Progress: <b className="text-white">{exportProgress}%</b></span>
                  <span className="text-neon-green font-bold">COMPILING...</span>
                </div>
              </div>

              <div className="border border-white/5 rounded p-3 bg-white/5 text-xs text-left">
                <span className="text-gray-500 block uppercase text-[9px] font-bold">Current Asset:</span>
                <span className="text-neon-cyan font-bold truncate block mt-0.5">{exportCurrentName || 'Initializing pipeline...'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
