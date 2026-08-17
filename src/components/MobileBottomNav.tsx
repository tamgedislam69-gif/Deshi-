import React from 'react';
import { Home, ShoppingBag, Search, MessageSquare, User } from 'lucide-react';
import { TabType } from '../types';

interface MobileBottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const whatsappUrl = 'https://wa.me/8801348070130?text=Hello,%20I%20want%20to%20order';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-slate-300 py-1.5 px-2 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 text-center items-center">
        
        {/* 1. প্রোডাক্ট দেখুন */}
        <button
          onClick={() => {
            setActiveTab('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 cursor-pointer transition-colors ${
            activeTab === 'shop' ? 'text-amber-400 font-bold' : 'hover:text-white'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium">প্রোডাক্ট দেখুন</span>
        </button>

        {/* 2. ট্র্যাকিং */}
        <button
          onClick={() => {
            setActiveTab('track_order');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 cursor-pointer transition-colors ${
            activeTab === 'track_order' ? 'text-amber-400 font-bold' : 'hover:text-white'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">ট্র্যাকিং</span>
        </button>

        {/* 3. Center Elevated Floating Home Button */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center -mt-5 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-600 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-xl ring-4 ring-slate-950/80">
            <Home className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold text-amber-400 mt-0.5">হোম</span>
        </button>

        {/* 4. হোয়াটসঅ্যাপ */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium">হোয়াটসঅ্যাপ</span>
        </a>

        {/* 5. একাউন্ট / Cart Drawer */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 py-1 text-slate-300 hover:text-white cursor-pointer transition-colors relative"
        >
          <div className="relative">
            <User className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">একাউন্ট</span>
        </button>

      </div>
    </div>
  );
};
