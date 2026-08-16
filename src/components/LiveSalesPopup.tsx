import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';

interface LiveSalesPopupProps {
  onQuickViewProduct?: (productId: string) => void;
}

const MOCK_LIVE_SALES = [
  { name: 'মোঃ তামজিদ ইসলাম', location: 'মিরপুর, ঢাকা', item: 'রয়্যাল হেরিটেজ পাঞ্জাবি', time: '২ মিনিট আগে', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=200' },
  { name: 'আরিফ আহমেদ', location: 'আগ্রাবাদ, চট্টগ্রাম', item: '১০০% পিওর লেদার ওয়ালেট', time: '৪ মিনিট আগে', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=200' },
  { name: 'নুসরাত জাহান', location: 'উত্তরা, ঢাকা', item: 'ঢাকাই জামদানি সুতি শাড়ি', time: '৬ মিনিট আগে', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=200' },
  { name: 'ড. মাহমুদুল হাসান', location: 'জিন্দাবাজার, সিলেট', item: 'ANC ওয়্যারলেস ইয়ারবাডস', time: '৮ মিনিট আগে', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200' },
];

export const LiveSalesPopup: React.FC<LiveSalesPopupProps> = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show popup after 3 seconds initial delay
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Loop interval: show for 6s, hide for 6s, cycle index
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MOCK_LIVE_SALES.length);
        setVisible(true);
      }, 5000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const currentSale = MOCK_LIVE_SALES[index];

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-30 max-w-xs sm:max-w-sm animate-slide-up transition-all duration-500">
      <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-2xl flex items-center gap-3 relative group">
        
        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1 shadow-md hover:bg-slate-800 transition-colors cursor-pointer text-[10px]"
          title="বন্ধ করুন"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Image Avatar */}
        <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <img src={currentSale.img} alt={currentSale.item} className="w-full h-full object-cover" />
          <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-0.5 rounded-tl-md">
            <CheckCircle2 className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Order Text Details */}
        <div className="space-y-0.5 flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-extrabold text-slate-900 truncate">
              {currentSale.name}
            </span>
            <span className="text-[9px] font-bold text-slate-400 shrink-0">{currentSale.time}</span>
          </div>
          <p className="text-[10px] font-bold text-amber-600 line-clamp-1">
            {currentSale.item}
          </p>
          <div className="flex items-center gap-1 text-[9px] text-slate-500 font-medium">
            <ShoppingBag className="w-2.5 h-2.5 text-emerald-600" />
            <span>{currentSale.location} • ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>

      </div>
    </div>
  );
};
