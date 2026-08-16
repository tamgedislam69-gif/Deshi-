import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'মোঃ সাইফুর রহমান',
      location: 'মিরপুর, ঢাকা',
      rating: 5,
      date: '৩ দিন আগে',
      productName: 'রয়্যাল হেরিটেজ কম্বড কটন পাঞ্জাবি',
      comment: 'মাশাল্লাহ কাপড় খুবই সফট এবং সেলাই এর ফিনিশিং এক কথায় দারুণ। ২৪ ঘণ্টার মধ্যে ডেলিভারি পেয়েছি। কুরিয়ারম্যানের সামনে চেক করে টাকা দেওয়ার সুযোগটা সবচেয়ে ভালো লেগেছে!',
      verified: true,
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 2,
      name: 'তাহমিনা পারভীন',
      location: 'হালিশহর, চট্টগ্রাম',
      rating: 5,
      date: '৫ দিন আগে',
      productName: 'ঢাকাই জামদানি শাড়ি',
      comment: 'ছবিতে যেমন দেখেছি হুবহু তেমনই পেয়েছি। সুতার বুনন একদম নিখুঁত এবং পরতে ভীষণ কমফোর্টেবল। প্যাকেজিং অনেক সুন্দর ছিল। থ্যাংক ইউ!',
      verified: true,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 3,
      name: 'তানভীর আহমেদ',
      location: 'জিন্দাবাজার, সিলেট',
      rating: 5,
      date: '১ সপ্তাহ আগে',
      productName: '১০০% পিওর লেদার এক্সিকিউটিভ ওয়ালেট',
      comment: 'অরিজিনাল জেনুইন লেদার! ফিনিশিং চমৎকার, ৮টি কার্ড ও ক্যাশ সুন্দরভাবে ফিট করে। ৫ বছরের ওয়ারেন্টি কার্ড সাথে ছিল। ফুললি স্যাটিসফাইড।',
      verified: true,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-1 rounded-full border border-emerald-200">
          <Star className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
          <span>১০০% স্যাটিসফাইড কাস্টমার রিভিউ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          আমাদের সম্মানিত কাস্টমারদের মতামত
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
          সারাদেশের হাজারো সন্তুষ্ট গ্রাহকের বিশ্বাস ও ভালোলাগার অনুভূতি
        </p>

        {/* Rating Summary Pill */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm font-extrabold text-slate-900">৪.৯ / ৫.০ রেটিং</span>
          <span className="text-xs text-slate-500 font-bold">(১,২৪০+ ভেরিফাইড অর্ডার)</span>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between relative"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-100" />

            <div className="space-y-3 relative z-10">
              {/* Rating Stars & Verified badge */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ভেরিফাইড ক্রেতা
                  </span>
                )}
              </div>

              {/* Product Name */}
              <p className="text-xs font-black text-amber-600 uppercase tracking-wider">
                {rev.productName}
              </p>

              {/* Comment */}
              <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Customer Details & Image Thumbnail */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src={rev.image}
                alt={rev.productName}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
              />
              <div>
                <h4 className="text-xs font-black text-slate-900">{rev.name}</h4>
                <p className="text-[11px] text-slate-500 font-semibold">{rev.location} • {rev.date}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
