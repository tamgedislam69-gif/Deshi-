import React, { useState, useEffect } from 'react';
import { Clock, Zap, Flame } from 'lucide-react';

interface FlashSaleTimerProps {
  onShopClick?: () => void;
}

export const FlashSaleTimer: React.FC<FlashSaleTimerProps> = ({ onShopClick }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 }; // reset loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Title & Badge */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg">
              <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>ফ্ল্যাশ সেল - ৪০% পর্যন্ত ছাড়!</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
              <span>সীমিত সময়ের মেগা অফার</span>
              <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md">
              অফারটি শেষ হওয়ার আগেই আপনার পছন্দের পণ্য ১-ক্লিকে ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন।
            </p>
          </div>

          {/* Center: Live Countdown Timer Boxes */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-800/90 border border-amber-500/40 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black font-mono text-amber-400 shadow-inner">
                {formatTwoDigits(timeLeft.hours)}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">ঘণ্টা</span>
            </div>
            <span className="text-xl font-bold text-amber-400 pb-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-800/90 border border-amber-500/40 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black font-mono text-amber-400 shadow-inner">
                {formatTwoDigits(timeLeft.minutes)}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">মিনিট</span>
            </div>
            <span className="text-xl font-bold text-amber-400 pb-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black font-mono shadow-inner animate-pulse">
                {formatTwoDigits(timeLeft.seconds)}
              </div>
              <span className="text-[10px] font-bold text-rose-400 uppercase mt-1">সেকেন্ড</span>
            </div>
          </div>

          {/* Right: Stock Progress Bar & CTA */}
          <div className="space-y-3 w-full lg:w-auto text-center lg:text-right">
            <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 space-y-1.5 max-w-xs mx-auto lg:mx-0">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>স্টক বিক্রি হয়েছে:</span>
                <span className="text-amber-400 font-extrabold">৮৪%</span>
              </div>
              <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full w-[84%] rounded-full animate-pulse"></div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium text-left">⚡ মাত্র ১৮টি স্টক বাকি আছে!</p>
            </div>

            {onShopClick && (
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-xl transition-all cursor-pointer"
              >
                অফারের পণ্যসমূহ দেখুন &rarr;
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
