"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  label: string;
}

const illustrations: GalleryImage[] = [
  { src: "/Assets/FN_Cubplushy.jpg", label: "@cubplushy" },
  { src: "/Assets/FN_Adogavo.jpg", label: "@adogavo_" },
  { src: "/Assets/FN_Thana.jpg", label: "@ThanaKusuma" },
  { src: "/Assets/FN_Weiss.jpg", label: "@weissvulpes" },
  { src: "/Assets/FN_Eliza.jpg", label: "@eliza_hemlock" },
  { src: "/Assets/FN_Keyla.jpg", label: "@KeylaEstella" },
  { src: "/Assets/FN_Khoi.jpg", label: "@Khoi_ist" },
  { src: "/Assets/FN_Mochi.jpg", label: "@MomochiSereluna" },
  { src: "/Assets/FN_Pastel.jpg", label: "@NoirpastelVT" },
  { src: "/Assets/FN_Vikra_0.jpg", label: "@vikrary" },
  { src: "/Assets/FN_Vikra_1.jpg", label: "@vikrary" },
  { src: "/Assets/FN_Axel_1.jpg", label: "@axel_zeed" },
];

const chibis: GalleryImage[] = [
  { src: "/Assets/Chibi_Ay.jpg", label: "@AyRakyou" },
  { src: "/Assets/Chibi_Gum.jpg", label: "@gum_pandu" },
  { src: "/Assets/Chibi_Miichan.jpg", label: "@michan_9029" },
  { src: "/Assets/Chibi_Lea_Zack.jpg", label: "@LeaLestariVT & @TahtoneZ" },
];

const emotes: GalleryImage[] = [
  { src: "/Assets/Emotes_Axel.jpg", label: "@axel_zeed" },
  { src: "/Assets/Emotes_Zack.jpg", label: "@TahtoneZ" },
  { src: "/Assets/Emotes_Kaito.jpg", label: "@KaitoVixenVTT" },
  { src: "/Assets/Emotes_Lunaos.jpg", label: "@CeleztialStarlight" },
];

const live2dModels: GalleryImage[] = [
  { src: "/Assets/Vtuber_Axel_3_5.jpg", label: "@axel_zeed" },
  { src: "/Assets/Vtuber_Axel_3.jpg", label: "@axel_zeed" },
  { src: "/Assets/Vtuber_Vikra_3.jpg", label: "@vikrary" },
  { src: "/Assets/Vtuber_Vikra_1.jpg", label: "@vikrary" },
  { src: "/Assets/Vtuber_Vikra_2.jpg", label: "@vikrary" },
  { src: "/Assets/Vtuber_Zack.jpg", label: "@TahtoneZ" },
  { src: "/Assets/Vtuber_Axel_1.jpg", label: "@axel_zeed" },
  { src: "/Assets/Vtuber_Axel_2.jpg", label: "@axel_zeed" },
  { src: "/Assets/Vtuber_Vikra_0.jpg", label: "@vikrary" },
  { src: "/Assets/Vtuber_Mamssky.jpg", label: "@hanifwic" },
  { src: "/Assets/Vtuber_Axel_0.jpg", label: "@axel_zeed" },
];

const overlays: GalleryImage[] = [
  { src: "/Assets/Overlay_Opening_2.jpg", label: "Opening Overlay 2" },
  { src: "/Assets/Overlay_Ending_2.jpg", label: "Ending Overlay 2" },
  { src: "/Assets/Overlay_Freetalk_2.jpg", label: "Freetalk Overlay 2" },
  { src: "/Assets/Overlay_Gaming_2.jpg", label: "Gaming Overlay 2" },
  { src: "/Assets/Overlay_Stinger_2.jpg", label: "Stinger 2" },
  { src: "/Assets/Overlay_Opening.jpg", label: "Opening Overlay" },
  { src: "/Assets/Overlay_Ending.jpg", label: "Ending Overlay" },
  { src: "/Assets/Overlay_Freetalk.jpg", label: "Freetalk Overlay" },
  { src: "/Assets/Overlay_Gaming.jpg", label: "Gaming Overlay" },
  { src: "/Assets/Overlay_Stinger.jpg", label: "Stinger" },
];

const GalleryItem: React.FC<{
  image: GalleryImage;
  onClick: () => void;
}> = ({ image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="gallery-item-wrapper group relative overflow-hidden border border-neon-cyan bg-dark-teal/40 transition-all duration-300 hover:scale-[1.02] hover:-skew-x-1 hover:border-neon-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] cursor-pointer mb-4 break-inside-avoid"
      style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}
    >
      <img
        src={image.src}
        alt={image.label}
        className="w-full h-auto transition-all duration-700 brightness-90 grayscale-[0.1] group-hover:scale-110 group-hover:brightness-105 group-hover:grayscale-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <ZoomIn className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(0,242,255,0.8)]" />
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent text-neon-cyan font-bold text-center py-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[10px] md:text-xs">
        {image.label}
      </div>
    </div>
  );
};

const VideoCard: React.FC<{ src: string; title: string }> = ({ src, title }) => (
  <div className="p-1 border border-neon-cyan bg-black/50 transition-all duration-300 hover:border-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] h-full mb-4 break-inside-avoid"
    style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}>
    <div className="aspect-video relative overflow-hidden">
      <iframe
        src={src}
        title={title}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
    <div className="p-2 text-center text-xs font-bold text-gray-400">{title}</div>
  </div>
);

const TestimonialCard: React.FC<{ src: string; author: string; quote: string }> = ({ src, author, quote }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 bg-dark-teal/85 backdrop-blur-md border-2 border-neon-cyan p-4 sm:p-6 transition-all duration-300 hover:border-neon-green hover:translate-x-2 mb-6"
    style={{ clipPath: 'polygon(0 1%, 100% 0, 99% 99%, 1% 100%)' }}>
    <img src={src} alt={author} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-neon-cyan object-cover shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="italic text-gray-200 text-sm md:text-base border-l-2 border-neon-green pl-4 mb-3 leading-relaxed">
        "{quote}"
      </p>
      <h5 className="text-neon-cyan font-bold text-sm md:text-base">— {author}</h5>
    </div>
  </div>
);

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<{ index: number; category: GalleryImage[] } | null>(null);

  const openLightbox = (index: number, category: GalleryImage[]) => {
    setSelectedImage({ index, category });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback(() => {
    if (!selectedImage) return;
    setSelectedImage(prev => {
      if (!prev) return null;
      const nextIndex = (prev.index + 1) % prev.category.length;
      return { ...prev, index: nextIndex };
    });
  }, [selectedImage]);

  const prevImage = useCallback(() => {
    if (!selectedImage) return;
    setSelectedImage(prev => {
      if (!prev) return null;
      const nextIndex = (prev.index - 1 + prev.category.length) % prev.category.length;
      return { ...prev, index: nextIndex };
    });
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, nextImage, prevImage]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 md:py-20 relative z-10">
      {/* Illustrations */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">01_ILLUSTRATIONS</h2>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {illustrations.map((img, idx) => (
            <GalleryItem key={idx} image={img} onClick={() => openLightbox(idx, illustrations)} />
          ))}
        </div>
      </section>

      {/* Chibi */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">02_CHIBI</h2>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {chibis.map((img, idx) => (
            <GalleryItem key={idx} image={img} onClick={() => openLightbox(idx, chibis)} />
          ))}
        </div>
      </section>

      {/* Emotes */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">03_EMOTES</h2>
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {emotes.map((img, idx) => (
            <GalleryItem key={idx} image={img} onClick={() => openLightbox(idx, emotes)} />
          ))}
        </div>
      </section>

      {/* Live2D Models */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">04_LIVE2D_MODELS</h2>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {live2dModels.map((img, idx) => (
            <GalleryItem key={idx} image={img} onClick={() => openLightbox(idx, live2dModels)} />
          ))}
        </div>
      </section>

      {/* Live2D Rigging */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">05_LIVE2D_RIGGING_SHOWCASE</h2>
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          <VideoCard src="https://www.youtube.com/embed/AAvkUHuw-oQ?si=Omupp7B4Z-osGgpc" title="Axel Zeed 3.5 Showcase" />
          <VideoCard src="https://www.youtube.com/embed/fBEN56Y2MHg" title="Axel Zeed 3.0 Showcase" />
          <VideoCard src="https://www.youtube.com/embed/7SaOdRmF6Yc?si=L9Lm61Yss8dRaUWZ" title="Vikra Outfit 1 Showcase" />
          <VideoCard src="https://www.youtube.com/embed/Ya0IGeL8yRk?si=v8AUl95gEc4LXoCJ" title="Ay Rakyou Showcase" />
          <VideoCard src="https://www.youtube.com/embed/xajLwTLzJcQ?si=h3omNTirNKx_0u0t" title="Satoptato Showcase" />
          <VideoCard src="https://www.youtube.com/embed/kP1HZi5JvLQ" title="Zack Silver Showcase" />
          <VideoCard src="https://www.youtube.com/embed/T6OxmS9ubv8" title="Vikra Showcase" />
          <VideoCard src="https://www.youtube.com/embed/o5IdBsvARno" title="Axel Zeed 2.0 Showcase" />
        </div>
      </section>

      {/* Stream Overlays */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">06_STREAM_OVERLAYS</h2>
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {overlays.map((img, idx) => (
            <GalleryItem key={idx} image={img} onClick={() => openLightbox(idx, overlays)} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20 animate-fade-in">
        <h2 className="section-header-tech mb-8">07_TESTIMONIALS</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <TestimonialCard
            src="/Assets/Testimonial_1.jpg"
            author="Vikra (@vikrary)"
            quote="Best papa 10/10, good workaround time and once you become his child you cannot go back because his service includes ✨model integration✨ highly recommended!"
          />
          <TestimonialCard
            src="/Assets/Testimonial_3.jpg"
            author="Zack Silver (@TahtoneZ)"
            quote="All the things, all the stars!!!!! Fair price and explained the whole process. Answered all my questions that I had and was completely open to what I was asking. Axel and I were in 'almost' constant communication (12-hour time difference, it was midnight for him when it was noon for me!!) He gave me regular updates and previews of the commission and was super receptive to feedback (and also put my mind at ease when I felt like I was asking too much XD) He also understood my weird way descriptions and/or wants, so also a plus. Even said he could put his own spin on things and have fun with it!! Axel finished my commission in a very quick amount of time and completely understood his timeline, even when I said he could take his time."
          />
          <TestimonialCard
            src="/Assets/Testimonial_2.jpg"
            author="Sato (@satoptato)"
            quote="I am delighted to have chosen Axel Zeed as my collaborator in Myrrth Sato's first ever rigged model. It was a quick one but everything was sufficient and well-done to stream with. I, as the representative of the Famtato lab farm, recommend Papa to father more Vtubers. 10000/10, balding cured ✨🐝"
          />
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-neon-cyan transition-colors z-10"
          >
            <X size={32} className="md:w-10 md:h-10" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-neon-cyan transition-colors z-10 bg-black/20 p-2 rounded-full"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-neon-cyan transition-colors z-10 bg-black/20 p-2 rounded-full"
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.category[selectedImage.index].src} 
              alt={selectedImage.category[selectedImage.index].label}
              className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain shadow-[0_0_50px_rgba(0,242,255,0.2)] border border-white/10"
            />
            <div className="text-center">
              <p className="text-neon-cyan font-ethnocentric text-sm md:text-xl tracking-wider">
                {selectedImage.category[selectedImage.index].label}
              </p>
              <p className="text-white/40 text-[10px] mt-1">
                {selectedImage.index + 1} / {selectedImage.category.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
