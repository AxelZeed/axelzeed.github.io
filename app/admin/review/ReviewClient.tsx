"use client";

import React, { useState } from 'react';
import { Shield, LayoutGrid, Square, ChevronLeft, ChevronRight, Hash, Lock, Trash2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface Wish {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

const WishCard = ({
  wish,
  index,
  isRevealed,
  onToggle,
  onDelete
}: {
  wish: Wish;
  index: number;
  isRevealed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="bg-[#05161a] border-2 border-neon-cyan/20 p-8 relative overflow-hidden group hover:border-neon-cyan/50 transition-all animate-fade-in">
      <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="text-[10px] text-neon-green font-mono uppercase tracking-widest block mb-2">// SENDER_IDENTIFIED</span>
          <h3 className="text-xl font-ethnocentric text-white tracking-tighter">{wish.name}</h3>
        </div>
        <div className="text-right flex items-center gap-6">
          <div>
            <div className="flex items-center gap-2 justify-end mb-2 text-neon-cyan">
              <Hash size={14} />
              <span className="text-sm font-ethnocentric">NODE_{index + 1}</span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono">{new Date(wish.created_at).toLocaleString()}</p>
          </div>
          <button 
            onClick={() => onDelete(wish.id)}
            className="p-3 border border-neon-red/30 text-neon-red/50 hover:text-neon-red hover:bg-neon-red/10 transition-all rounded"
            title="Delete Entry"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-lg text-gray-200 leading-relaxed font-sans whitespace-pre-wrap mb-10">
        {wish.message}
      </p>

      {wish.image_url && (
        <div className="mt-8 pt-8 border-t border-white/5">
          <div
            onClick={() => onToggle(wish.id)}
            className="relative cursor-pointer overflow-hidden border border-white/10 group/img"
          >
            <img
              src={wish.image_url}
              className={`w-full max-h-[500px] object-contain transition-all duration-1000 ${isRevealed ? 'blur-0' : 'blur-3xl grayscale'}`}
              alt="Attachment"
            />
            {!isRevealed && (
              <div className="absolute inset-0 bg-[#05333f]/80 flex flex-col items-center justify-center gap-4 text-center p-6">
                <Lock className="text-neon-red animate-pulse" size={40} />
                <div>
                  <p className="text-neon-red font-ethnocentric text-xs mb-2">!! ENCRYPTED_VISUAL_DETECTED !!</p>
                  <p className="text-[10px] text-neon-cyan font-mono border border-neon-cyan px-4 py-2 hover:bg-neon-cyan hover:text-black transition-all">CLICK_TO_DECRYPT_SIGNAL</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export function ReviewClient({ initialWishes }: { initialWishes: Wish[] }) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [viewMode, setViewMode] = useState<'single' | 'list'>('single');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedImages, setRevealedImages] = useState<Set<string>>(new Set());
  const supabase = createClient();

  const toggleImage = (id: string) => {
    setRevealedImages(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const navigate = (dir: number) => {
    setCurrentIndex(prev => {
      let next = prev + dir;
      if (next < 0) next = 0;
      if (next >= wishes.length) next = wishes.length - 1;
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('REALLY_DELETE_THIS_TRANSMISSION?')) return;

    const { error } = await supabase
      .from('wishes')
      .delete()
      .eq('id', id);

    if (!error) {
      setWishes(prev => prev.filter(w => w.id !== id));
      if (currentIndex >= wishes.length - 1 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 border-b border-neon-cyan/30 pb-12">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Shield className="text-neon-cyan" size={32} />
            <h1 className="text-3xl md:text-5xl font-ethnocentric tracking-tighter text-white">COMM_LINK</h1>
          </div>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">// DEBUT_WISHES_INCOMING_BUFFER</p>
        </div>

        <div className="flex bg-black/40 border border-white/10 p-1">
          <button
            onClick={() => setViewMode('single')}
            className={`px-6 py-3 flex items-center gap-3 text-[10px] font-ethnocentric tracking-widest transition-all ${viewMode === 'single' ? 'bg-neon-cyan text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Square size={14} />
            SINGLE_NODE
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-6 py-3 flex items-center gap-3 text-[10px] font-ethnocentric tracking-widest transition-all ${viewMode === 'list' ? 'bg-neon-cyan text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <LayoutGrid size={14} />
            BATCH_LIST
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {viewMode === 'single' ? (
          <div className="space-y-8">
            {wishes.length > 0 ? (
              <>
                <WishCard
                  wish={wishes[currentIndex]}
                  index={currentIndex}
                  isRevealed={revealedImages.has(wishes[currentIndex].id)}
                  onToggle={toggleImage}
                  onDelete={handleDelete}
                />

                {/* Navigation Bar */}
                <div className="bg-black/60 border border-neon-cyan/50 p-6 flex justify-between items-center">
                  <button
                    onClick={() => navigate(-1)}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-3 text-[10px] font-ethnocentric text-neon-cyan disabled:opacity-30 hover:translate-x-[-4px] transition-transform"
                  >
                    <ChevronLeft size={20} />
                    PREV_NODE
                  </button>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={currentIndex + 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) - 1;
                        if (!isNaN(val) && val >= 0 && val < wishes.length) setCurrentIndex(val);
                      }}
                      className="w-16 bg-black border border-neon-cyan/50 text-center py-2 text-neon-cyan font-ethnocentric text-sm outline-none"
                    />
                    <span className="text-gray-500 font-mono">//</span>
                    <span className="text-gray-400 font-ethnocentric text-sm">{wishes.length}</span>
                  </div>

                  <button
                    onClick={() => navigate(1)}
                    disabled={currentIndex === wishes.length - 1}
                    className="flex items-center gap-3 text-[10px] font-ethnocentric text-neon-cyan disabled:opacity-30 hover:translate-x-[4px] transition-transform"
                  >
                    NEXT_NODE
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-white/5">
                <p className="text-gray-600 font-mono uppercase tracking-widest">NO_TRANSMISSIONS_IN_BUFFER</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {[...wishes].map((wish, idx) => (
              <WishCard
                key={wish.id}
                wish={wish}
                index={idx}
                isRevealed={revealedImages.has(wish.id)}
                onToggle={toggleImage}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
