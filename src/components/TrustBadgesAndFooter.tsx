import React from 'react';
import { 
  Truck, ShieldCheck, RefreshCw, Headphones, Phone, MapPin, 
  Mail, Facebook, Instagram, Youtube, Heart, ExternalLink 
} from 'lucide-react';
import { TabType } from '../types';

interface TrustBadgesAndFooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenShopifyModal: () => void;
}

export const TrustBadgesAndFooter: React.FC<TrustBadgesAndFooterProps> = ({
  setActiveTab,
  onOpenShopifyModal
}) => {
  return (
    <footer className="bg-slate-950 text-white mt-16 border-t border-slate-800">
      
      {/* 1. Trust Badges Section */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-slate-400 mt-0.5">পণ্য হাতে বুঝে পেয়ে মূল্য দিন</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">১০০% অরিজিনাল কোয়ালিটি</h4>
              <p className="text-xs text-slate-400 mt-0.5">মানের ক্ষেত্রে শতভাগ নিশ্চয়তা</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">৭ দিনের সহজ রিটার্ন</h4>
              <p className="text-xs text-slate-400 mt-0.5">কোনো সমস্যা হলে দ্রুত পরিবর্তন</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">২৪/৭ হটলাইন সাপোর্ট</h4>
              <p className="text-xs text-slate-400 mt-0.5">সরাসরি কল বা হোয়াটসঅ্যাপ করুন</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              দে
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">DeshiStore</span>
              <span className="block text-[10px] font-bold text-amber-500 tracking-wider uppercase -mt-1">Express E-Commerce</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            বাংলাদেশের এক নম্বর বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম। আপনার পছন্দের পোশাক, টেক গ্যাজেট ও লেদার আইটেম ক্যাশ অন ডেলিভারিতে ক্রয় করুন।
          </p>

          <div className="flex items-center gap-3 text-slate-400 pt-1">
            <a href="#" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/50 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/50 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/50 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider text-amber-400">
            দ্রুত নেভিগেশন
          </h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                হোম পেজ
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition-colors cursor-pointer">
                সকল শপ প্রোডাক্ট
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('new_arrivals')} className="hover:text-amber-400 transition-colors cursor-pointer">
                নতুন কালেকশন
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('special_offers')} className="hover:text-amber-400 transition-colors cursor-pointer">
                স্পেশাল মেগা অফার
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('track_order')} className="hover:text-amber-400 transition-colors cursor-pointer">
                মাই অর্ডার / ট্র্যাকিং
              </button>
            </li>
          </ul>
        </div>

        {/* Developer & Shopify Section */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider text-amber-400">
            ডেভেলপার ও শপিফাই
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            This codebase is formatted for Liquid conversion and GitHub Theme pushing.
          </p>
          <button
            onClick={onOpenShopifyModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/40 transition-colors cursor-pointer"
          >
            <span>Shopify Liquid Exporter</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <div>
            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-xs text-slate-400 hover:text-white font-medium underline cursor-pointer"
            >
              এডমিন ড্যাশবোর্ড প্রবেশ করুন
            </button>
          </div>
        </div>

        {/* Contact Info & Address */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider text-amber-400">
            যোগাযোগ ও ঠিকানা
          </h4>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>লেভেল-৪, ব্লক-ডি, হাউস #১২, ধানমন্ডি, ঢাকা-১২০৯</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-slate-200">+880 1700-000000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>support@deshistore.com.bd</span>
            </div>
          </div>

          {/* Courier Partner Badges */}
          <div className="pt-2 border-t border-slate-900">
            <span className="text-[10px] font-bold text-slate-500 block mb-1">কুরিয়ার পার্টনার্স:</span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
              <span className="bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-amber-400">Pathao</span>
              <span className="bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-emerald-400">Steadfast</span>
              <span className="bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-rose-400">RedX Courier</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 DeshiStore E-Commerce Ltd. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Bangladeshi E-Commerce with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>

    </footer>
  );
};
