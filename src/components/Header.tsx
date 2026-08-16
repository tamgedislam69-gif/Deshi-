import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Menu, X, Phone, ShieldCheck, 
  Code, PackageSearch, Sparkles, Flame, Home, LayoutGrid
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenShopifyModal: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  onOpenShopifyModal,
  selectedCategory,
  setSelectedCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-3 sm:px-6 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-400 font-bold px-2 py-0.5 rounded-full border border-rose-500/30 text-[11px]">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            LIVE
          </span>
          <span className="font-semibold text-slate-200 hidden xs:inline">
            সারাদেশে ক্যাশ অন ডেলিভারি (Cash on Delivery) এ অর্ডার করুন!
          </span>
          <span className="font-medium text-slate-300 xs:hidden text-[11px]">
            ক্যাশ অন ডেলিভারি সুবিধা
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300 text-xs">
          <a 
            href="https://wa.me/8801700000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            <span className="font-semibold text-[11px] sm:text-xs">+880 1700-000000</span>
          </a>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button 
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-600 flex items-center justify-center text-amber-400 font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              দে
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-amber-600">
                DeshiStore
              </span>
              <span className="block text-[10px] font-bold text-amber-600 tracking-wider uppercase -mt-1">
                Express COD
              </span>
            </div>
          </button>
        </div>

        {/* Center: Search Input */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য বা কোড খুঁজুন (e.g. Panjabi, Saree, DS-101)..."
              className="w-full bg-slate-100 focus:bg-white text-slate-900 text-sm font-medium pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions (Liquid Exporter, Track Order, Admin, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shopify Exporter Modal Trigger */}
          <button
            onClick={onOpenShopifyModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/80 transition-colors shadow-2xs"
            title="View & Export Shopify Liquid Code"
          >
            <Code className="w-4 h-4 text-amber-600" />
            <span>Liquid Export</span>
          </button>

          {/* Track Order Quick Nav Button */}
          <button
            onClick={() => handleTabClick('track_order')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'track_order'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PackageSearch className="w-4 h-4 text-amber-500" />
            <span>অর্ডার ট্র্যাকিং</span>
          </button>

          {/* Admin Dashboard Quick Nav Button */}
          <button
            onClick={() => handleTabClick('admin')}
            className={`hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>এডমিন প্যানেল</span>
          </button>

          {/* Floating Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold p-2.5 sm:px-4 sm:py-2.5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-xs font-black">কার্ট</span>
            <span className="bg-slate-950 text-amber-400 text-xs font-black px-2 py-0.5 rounded-full min-w-5 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Visible on Mobile screens) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্য বা কোড খুঁজুন (e.g. Panjabi, Saree)..."
            className="w-full bg-slate-100 text-slate-900 text-xs font-medium pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Navigation Tabs Row (Desktop) */}
      <div className="hidden lg:block bg-slate-50 border-t border-slate-200/60 py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>হোম পেজ</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('all');
                handleTabClick('shop');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'shop' && selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>সকল প্রোডাক্ট</span>
            </button>

            <button
              onClick={() => handleTabClick('new_arrivals')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'new_arrivals'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>নতুন কালেকশন</span>
            </button>

            <button
              onClick={() => handleTabClick('special_offers')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'special_offers'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>স্পেশাল অফার</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="text-emerald-600 font-extrabold flex items-center gap-1">
              ✓ ১০০% ক্যাশ অন ডেলিভারি
            </span>
            <span className="text-slate-300">|</span>
            <span>৭ দিনের সহজ রিটার্ন পলিসি</span>
          </div>
        </div>
      </div>

      {/* 4. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-5 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center">
                  দে
                </div>
                <span className="font-black text-lg text-slate-900">DeshiStore</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="py-4 space-y-1 flex-1">
              <button
                onClick={() => handleTabClick('home')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
              >
                <Home className="w-4 h-4 text-amber-500" />
                <span>হোম পেজ</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  handleTabClick('shop');
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
              >
                <LayoutGrid className="w-4 h-4 text-slate-500" />
                <span>সকল শপ প্রোডাক্ট</span>
              </button>

              <button
                onClick={() => handleTabClick('new_arrivals')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>নতুন কালেকশন</span>
              </button>

              <button
                onClick={() => handleTabClick('special_offers')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
              >
                <Flame className="w-4 h-4 text-rose-500" />
                <span>স্পেশাল অফার</span>
              </button>

              <div className="pt-3 my-2 border-t border-slate-100"></div>

              <button
                onClick={() => handleTabClick('track_order')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
              >
                <PackageSearch className="w-4 h-4 text-emerald-600" />
                <span>অর্ডার ট্র্যাকিং</span>
              </button>

              <button
                onClick={() => handleTabClick('admin')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
              >
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>এডমিন ড্যাশবোর্ড</span>
              </button>

              <button
                onClick={() => {
                  onOpenShopifyModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 mt-2"
              >
                <Code className="w-4 h-4 text-amber-600" />
                <span>Shopify Liquid Code Exporter</span>
              </button>
            </div>

            {/* Footer inside Drawer */}
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
              <p className="font-bold text-slate-800">হটলাইন সাপোর্ট:</p>
              <p className="font-semibold text-amber-600 text-sm">+880 1700-000000</p>
              <p>সকাল ৯টা - রাত ১১টা পর্যন্ত খোলা</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
