import React from 'react';
import { 
  Truck, ShieldCheck, RefreshCw, Headphones, Phone, MapPin, 
  Mail, Facebook, Youtube, ExternalLink, MessageSquare 
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
      
      {/* 1. 4 Feature Cards Grid */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">ফ্রি ডেলিভারি</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                সর্বোচ্চ ২৪ থেকে ৭২ ঘণ্টার মধ্যে প্রোডাক্ট হাতে পেয়ে যাবেন
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">ইনস্ট্যান্ট রিটার্ন সুবিধা</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                প্রোডাক্ট পছন্দ না হলে সাথে সাথে রিটার্ন করতে পারবেন
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">এক টাকাও অগ্রিম করতে হবে না</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                প্রোডাক্ট হাতে পেয়ে খুলে দেখে তারপর পেমেন্ট করতে পারবেন
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">২৪ ঘণ্টাই সাপোর্ট</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                যেকোনো সমস্যায় ২৪ ঘণ্টায় আমাদের গ্রাহক সহায়তা রয়েছে
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Links & Google Maps Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: আমাদের সাথে সংযুক্ত থাকুন + Google Map */}
        <div className="space-y-4">
          <h4 className="font-black text-sm text-white uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
            আমাদের সাথে সংযুক্ত থাকুন
          </h4>

          {/* Embedded Google Map (Fixed to stay inside site without external redirects) */}
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md relative group select-none">
            <iframe
              title="RichMan Style Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430132!2d90.4193!3d23.7508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888372d1005%3A0xf2ef07010f3684a0!2sKhilgaon%2C%20Dhaka%201219!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
            ></iframe>
            <div className="absolute inset-0 bg-slate-950/20 flex flex-col justify-end p-3 pointer-events-auto">
              <div className="bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-slate-100 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>খিলগাঁও আউটলেট, ঢাকা-১২১৯</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30 font-bold">
                  ওপেন প্রতিদিন
                </span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/8801348070130"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-sm"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-colors shadow-sm"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-sm"
              title="TikTok"
            >
              <span className="font-extrabold text-xs">d</span>
            </a>
          </div>
        </div>

        {/* Column 2: গুরুত্বপূর্ণ লিংক */}
        <div className="space-y-4">
          <h4 className="font-black text-sm text-white uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
            গুরুত্বপূর্ণ লিংক
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
            <li>
              <button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <span>&rarr;</span> <span>Terms & Conditions</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <span>&rarr;</span> <span>Contact us</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <span>&rarr;</span> <span>About Us</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('track_order')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <span>&rarr;</span> <span>Track Your Order</span>
              </button>
            </li>
            <li>
              <button onClick={onOpenShopifyModal} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-400 cursor-pointer">
                <span>&rarr;</span> <span>Shopify Liquid Code Exporter</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: যেকোনো প্রয়োজনে যোগাযোগ করুন */}
        <div className="space-y-4">
          <h4 className="font-black text-sm text-white uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
            যেকোনো প্রয়োজনে যোগাযোগ করুন
          </h4>
          <div className="space-y-3 text-xs text-slate-300">
            <a
              href="https://wa.me/8801348070130"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 px-3 py-2 rounded-xl font-bold hover:bg-emerald-600/30 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Click to chat with us!</span>
            </a>

            <div className="flex items-center gap-2 font-bold text-slate-200">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Call Us-01348070130</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Support@richman.style</span>
            </div>

            <div className="flex items-start gap-2 text-slate-400 text-[11px] pt-1">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>তালতলা মার্কেট সংলগ্ন, খিলগাঁও, ঢাকা ১২১৯</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 text-center text-xs text-slate-400 font-medium">
        <p>© Copyright 2026-2027. RichMan.Style All Rights Reserved.</p>
      </div>

    </footer>
  );
};
