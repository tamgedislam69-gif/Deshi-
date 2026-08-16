import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = 'https://wa.me/8801700000000?text=আসসালামু%20আলাইকুম!%20আমি%20প্রোডাক্ট%20অর্ডার%20সংক্রান্ত%20তথ্য%20জানতে%20চাই।';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 group border-2 border-white/20"
      title="হোয়াটসঅ্যাপে সরাসরি মেসেজ দিন"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
      </div>
      <div className="text-left text-xs leading-tight">
        <span className="block text-[10px] text-emerald-100 font-medium">২৪/৭ অনলাইন সহায়তায়</span>
        <span>হোয়াটসঅ্যাপ চ্যাট</span>
      </div>
    </a>
  );
};
