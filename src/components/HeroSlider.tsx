import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ShieldCheck, Truck, ArrowRight, Zap, RefreshCw, 
  Image as ImageIcon, Pause, Play, Sparkles
} from 'lucide-react';
import { HeroSlide, SliderTransitionEffect } from '../types';

interface HeroSliderProps {
  slides?: HeroSlide[];
  autoSlideSpeed?: number; // in seconds
  transitionEffect?: SliderTransitionEffect;
  showArrows?: boolean;
  showDots?: boolean;
  onShopClick: () => void;
  onTrackClick: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides = [], 
  autoSlideSpeed = 5, 
  transitionEffect = 'fade',
  showArrows = true,
  showDots = true,
  onShopClick, 
  onTrackClick 
}) => {
  const activeSlides = (slides || []).filter((s) => s.active);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const touchStartX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    if (activeSlides.length <= 1) return;
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const goToPrev = useCallback(() => {
    if (activeSlides.length <= 1) return;
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  }, [activeSlides.length]);

  // Auto-slide timer
  useEffect(() => {
    if (!isPlaying || activeSlides.length <= 1) return;
    const intervalMs = Math.max(2, autoSlideSpeed) * 1000;
    const timer = setInterval(() => {
      goToNext();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, activeSlides.length, autoSlideSpeed, goToNext]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) { // Threshold for swipe
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
  };

  if (activeSlides.length === 0) {
    return (
      <div className="bg-slate-950 text-slate-400 rounded-3xl p-8 text-center border border-slate-800 mx-4 my-4 shadow-xl">
        <ImageIcon className="w-10 h-10 mx-auto mb-3 text-slate-600" />
        <h4 className="text-base font-bold text-slate-200">কোনো সক্রিয় ব্যানার পাওয়া যায়নি</h4>
        <p className="text-xs text-slate-400 mt-1">এডমিন প্যানেলে "ব্যানার স্লাইডার ম্যানেজার" থেকে পছন্দমতো যত খুশি স্লাইড যোগ ও অন করুন।</p>
      </div>
    );
  }

  // Ensure safe index bound
  const safeIndex = currentSlide % activeSlides.length;

  // Bengali numerals helper
  const toBnDigit = (num: number) => {
    const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map((d) => digits[parseInt(d)] || d).join('');
  };

  return (
    <div 
      className="relative bg-slate-950 text-white overflow-hidden rounded-3xl shadow-2xl mx-4 sm:mx-6 my-4 border border-slate-800/90 group select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Frames with Configurable Transition Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeSlides.map((s, idx) => {
          const isActive = idx === safeIndex;
          
          // CSS class generator based on transition effect
          let transitionClasses = 'transition-all duration-700 ease-in-out absolute inset-0';
          
          if (transitionEffect === 'fade') {
            transitionClasses += isActive 
              ? ' opacity-35 scale-100 z-10' 
              : ' opacity-0 scale-105 z-0 pointer-events-none';
          } else if (transitionEffect === 'slide') {
            const isPrev = (safeIndex === 0 ? activeSlides.length - 1 : safeIndex - 1) === idx;
            if (isActive) {
              transitionClasses += ' opacity-35 translate-x-0 z-10 scale-100';
            } else if (slideDirection === 'next' ? isPrev : !isPrev) {
              transitionClasses += ' opacity-0 -translate-x-full z-0 scale-95';
            } else {
              transitionClasses += ' opacity-0 translate-x-full z-0 scale-95';
            }
          } else if (transitionEffect === 'zoom') {
            transitionClasses += isActive 
              ? ' opacity-40 scale-105 z-10' 
              : ' opacity-0 scale-125 z-0 pointer-events-none';
          } else if (transitionEffect === 'flip') {
            transitionClasses += isActive 
              ? ' opacity-35 scale-100 rotate-0 z-10' 
              : ' opacity-0 scale-90 -rotate-2 z-0 pointer-events-none';
          }

          return (
            <img
              key={s.id}
              src={s.image}
              alt={s.headingBn}
              className={`${transitionClasses} w-full h-full object-cover object-center`}
            />
          );
        })}

        {/* Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Main Slide Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-10 sm:py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[380px] sm:min-h-[420px]">
        {activeSlides.map((slide, idx) => {
          if (idx !== safeIndex) return null;

          return (
            <React.Fragment key={slide.id + '-content'}>
              <div className="max-w-2xl space-y-4 text-left transition-all duration-500 animate-fadeIn">
                {/* Top Promo Tag */}
                <div className="flex flex-wrap items-center gap-2">
                  {slide.badgeBn && (
                    <span className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      {slide.badgeBn}
                    </span>
                  )}
                  {slide.discountBadge && (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs px-3 py-1 rounded-full">
                      <Truck className="w-3.5 h-3.5" />
                      {slide.discountBadge}
                    </span>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {slide.headingBn}
                </h1>

                {/* Subheading */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                  {slide.subheadingBn}
                </p>

                {/* CTA Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onShopClick}
                    className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                  >
                    <span>{slide.ctaTextBn || '🛒 এখন অর্ডার করুন'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onTrackClick}
                    className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold px-5 py-3.5 rounded-2xl transition-all text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>{slide.secondaryCtaTextBn || 'বিস্তারিত দেখুন'}</span>
                  </button>
                </div>

                {/* Trust Guarantees */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    ১০০% অরিজিনাল কোয়ালিটি
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    ক্যাশ অন ডেলিভারি (COD)
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <RefreshCw className="w-4 h-4 text-sky-400" />
                    ৭ দিনের সহজ রিটার্ন
                  </span>
                </div>
              </div>

              {/* Floating Product Highlight Thumbnail Frame (Desktop) */}
              <div className="hidden lg:block relative shrink-0">
                <div className="w-72 h-80 rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl relative group bg-slate-900/80 backdrop-blur-md">
                  <img
                    src={slide.image}
                    alt={slide.headingBn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-white">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>বিশেষ আকর্ষণ</span>
                    </div>
                    <div className="text-xs font-medium text-slate-200 line-clamp-1">{slide.headingBn}</div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Top Controls Bar: Play/Pause Toggle & Slide Counter Badge */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {/* Slide Counter */}
        {activeSlides.length > 1 && (
          <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 font-mono font-bold text-xs px-3 py-1 rounded-full border border-slate-800 shadow-md">
            {toBnDigit(safeIndex + 1)} / {toBnDigit(activeSlides.length)}
          </span>
        )}

        {/* Auto-Slide Pause/Play Button */}
        {activeSlides.length > 1 && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white p-1.5 rounded-full border border-slate-800 transition-colors cursor-pointer shadow-md"
            title={isPlaying ? 'স্লাইড ফ্রিজ করুন (Pause)' : 'অটো স্লাইড চালু করুন (Play)'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        )}
      </div>

      {/* Navigation Arrows */}
      {showArrows && activeSlides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-800/80 backdrop-blur-md transition-all shadow-xl hidden sm:flex cursor-pointer items-center justify-center active:scale-90"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-800/80 backdrop-blur-md transition-all shadow-xl hidden sm:flex cursor-pointer items-center justify-center active:scale-90"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && activeSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80 shadow-lg">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSlideDirection(idx > safeIndex ? 'next' : 'prev');
                setCurrentSlide(idx);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === safeIndex 
                  ? 'w-7 bg-amber-500 shadow-md shadow-amber-500/50' 
                  : 'w-2.5 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
