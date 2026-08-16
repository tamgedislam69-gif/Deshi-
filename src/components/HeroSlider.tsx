import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  badgeBn: string;
  heading: string;
  headingBn: string;
  subheading: string;
  subheadingBn: string;
  image: string;
  ctaText: string;
  ctaTextBn: string;
  secondaryCtaText: string;
  secondaryCtaTextBn: string;
  discountBadge: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'GRAND FESTIVE SALE',
    badgeBn: 'গ্র্যান্ড ডিসকাউন্ট মেলা ২০২৬',
    heading: 'Royal Panjabi & Traditional Silk Collection',
    headingBn: 'রয়্যাল পাঞ্জাবি ও প্রিমিয়াম ঢাকাই জামদানি কালেকশন',
    subheading: 'Get up to 40% OFF on 100% genuine cotton panjabis and sarees with instant Cash on Delivery across Bangladesh.',
    subheadingBn: 'সারাদেশে ক্যাশ অন ডেলিভারিতে অরিজিনাল কটন পাঞ্জাবি ও তাঁতের জামদানি শাড়িতে পাচ্ছেন সর্বোচ্চ ৪০% ছাড়!',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Shop Collection',
    ctaTextBn: 'অর্ডার করুন',
    secondaryCtaText: 'Track Order',
    secondaryCtaTextBn: 'ট্র্যাক করুন',
    discountBadge: '৪০% পর্যন্ত ছাড়'
  },
  {
    id: 2,
    badge: 'NEW TECH & GADGETS',
    badgeBn: 'লেটেস্ট গ্যাজেট স্পেশাল',
    heading: 'Smart Watches & Crystal ANC Wireless Earbuds',
    headingBn: 'স্মার্টওয়াচ ও নয়েজ ক্যান্সেলেশন ওয়্যারলেস ইয়ারবাডস',
    subheading: 'Premium audio gadgets and smartwatch wearables with 1-Year Official Warranty & Fast Courier Delivery.',
    subheadingBn: '৩৬ ঘণ্টা ব্যাটারি লাইফ, এইচডি অলওয়েজ-অন ডিসপ্লে ও ১ বছরের ওয়ারেন্টি সহ অরিজিনাল টেক গ্যাজেট।',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Explore Tech',
    ctaTextBn: 'গ্যাজেট দেখুন',
    secondaryCtaText: 'View Offers',
    secondaryCtaTextBn: 'অফার দেখুন',
    discountBadge: 'ফ্রি শিপিং'
  },
  {
    id: 3,
    badge: '100% GENUINE LEATHER',
    badgeBn: '১০০% অরিজিনাল লেদার',
    heading: 'Executive Wallets & Professional Laptop Bags',
    headingBn: 'এক্সিকিউটিভ চামড়ার ওয়ালেট ও অফিস ব্যাগ',
    subheading: 'Full grain cow leather accessories engineered for durability, RFID protection, and executive styling.',
    subheadingBn: '৫ বছরের লেদার ওয়ারেন্টি সহ ১০০% অরিজিনাল কাঁচা চামড়ার ওয়ালেট ও ব্যাগ। ক্যাশ অন ডেলিভারি!',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Buy Leather Goods',
    ctaTextBn: 'লেদার আইটেম',
    secondaryCtaText: 'Explore All',
    secondaryCtaTextBn: 'সব দেখুন',
    discountBadge: 'ক্যাশ অন ডেলিভারি'
  }
];

interface HeroSliderProps {
  onShopClick: () => void;
  onTrackClick: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopClick, onTrackClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden rounded-3xl shadow-xl mx-4 sm:mx-6 my-4 border border-slate-800">
      {/* Background Image Frame with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.heading}
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 sm:py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl space-y-4 text-left">
          {/* Top Promo Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              {slide.badgeBn}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs px-3 py-1 rounded-full">
              <Truck className="w-3.5 h-3.5" />
              {slide.discountBadge}
            </span>
          </div>

          {/* Heading */}
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
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 text-sm sm:text-base animate-pulse-ring cursor-pointer"
            >
              <span>{slide.ctaTextBn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTrackClick}
              className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold px-5 py-3.5 rounded-2xl transition-all text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>{slide.secondaryCtaTextBn}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              ১০০% অরিজিনাল গ্যারান্টি
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Truck className="w-4 h-4 text-emerald-400" />
              ক্যাশ অন ডেলিভারি (COD)
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <RefreshCw className="w-4 h-4 text-sky-400" />
              ৭ দিনের রিটার্ন পলিসি
            </span>
          </div>
        </div>

        {/* Floating Product Highlight Frame (Desktop) */}
        <div className="hidden lg:block relative shrink-0">
          <div className="w-72 h-80 rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl relative group bg-slate-900">
            <img
              src={slide.image}
              alt="Highlight product"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-white">
              <div className="text-xs font-bold text-amber-400">হট ডিল অফার</div>
              <div className="text-xs font-medium text-slate-200 line-clamp-1">{slide.heading}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-xs transition-colors hidden sm:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-xs transition-colors hidden sm:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
