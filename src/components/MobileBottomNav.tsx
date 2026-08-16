import React from 'react';
import { Home, ShoppingBag, Search, MessageSquare, ShoppingCart } from 'lucide-react';
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
  const whatsappUrl = 'https://wa.me/8801700000000?text=Hello,%20I%20want%20to%20order';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-slate-300 py-2 px-3 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 text-center">
        
        {/* Home */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 cursor-pointer transition-colors ${
            activeTab === 'home' ? 'text-amber-400 font-bold' : 'hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">হোম</span>
        </button>

        {/* Shop All */}
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
          <span className="text-[10px]">শপ</span>
        </button>

        {/* Track Order */}
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
          <span className="text-[10px]">ট্র্যাকিং</span>
        </button>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">চ্যাট</span>
        </a>

        {/* Cart Drawer Button */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 py-1 text-amber-400 hover:text-amber-300 cursor-pointer transition-colors relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">কার্ট</span>
        </button>

      </div>
    </div>
  );
};
