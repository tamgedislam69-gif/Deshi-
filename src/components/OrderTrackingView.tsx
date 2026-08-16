import React, { useState, useEffect } from 'react';
import { 
  Search, PackageSearch, CheckCircle2, Clock, Truck, 
  MapPin, Phone, AlertCircle, ShoppingBag, ArrowRight 
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingViewProps {
  orders: Order[];
  initialSearchQuery?: string;
  onGoToShop: () => void;
}

const ORDER_STEPS: { status: OrderStatus; labelBn: string; descBn: string }[] = [
  { status: 'Pending', labelBn: 'অর্ডার গৃহিত', descBn: 'আপনার ক্যাশ অন ডেলিভারি অর্ডারটি সিস্টেমে যুক্ত হয়েছে' },
  { status: 'Confirmed', labelBn: 'অর্ডার কনফার্মড', descBn: 'ফোনে কল দিয়ে আপনার ঠিকানা ও পণ্য যাচাই করা হয়েছে' },
  { status: 'In Courier', labelBn: 'কুরিয়ারে হস্তান্তরিত', descBn: 'পণ্যটি কুরিয়ার পার্টনারের (Pathao/Steadfast) কাছে জমা দেওয়া হয়েছে' },
  { status: 'Delivered', labelBn: 'সফলভাবে ডেলিভার্ড', descBn: 'পণ্য ডেলিভারিম্যান আপনাকে বুঝিয়ে দিয়েছে এবং বিল পরিশোধ করা হয়েছে' }
];

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  initialSearchQuery = '',
  onGoToShop
}) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setQuery(initialSearchQuery);
      handleSearch(initialSearchQuery);
    }
  }, [initialSearchQuery, orders]);

  const handleSearch = (searchTerm: string) => {
    const cleaned = searchTerm.trim().toLowerCase();
    if (!cleaned) return;

    setHasSearched(true);
    const found = orders.find((o) => {
      const matchId = o.id.toLowerCase().includes(cleaned);
      const matchPhone = o.customer.mobileNumber.includes(cleaned);
      return matchId || matchPhone;
    });

    setSearchedOrder(found || null);
  };

  const getStepStatusIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'Pending': return 0;
      case 'Confirmed': return 1;
      case 'In Courier': return 2;
      case 'Delivered': return 3;
      case 'Cancelled': return -1;
      default: return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Search Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <PackageSearch className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            লাইভ অর্ডার ট্র্যাকিং ও স্ট্যাটাস
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            আপনার ১১ ডিজিটের মোবাইল নম্বর অথবা অর্ডার কোড (যেমন: <span className="font-mono font-bold text-amber-400">#ORD-1001</span>) দিয়ে লাইভ ডেলিভারি স্ট্যাটাস দেখুন।
          </p>

          {/* Search Input Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }} 
            className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="01712345678 অথবা #ORD-1001"
                className="w-full bg-slate-900 text-white text-xs sm:text-sm font-bold pl-10 pr-4 py-3.5 rounded-2xl border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer shrink-0"
            >
              ট্র্যাক করুন
            </button>
          </form>
        </div>
      </div>

      {/* Result Section */}
      {searchedOrder ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6 animate-fade-in">
          
          {/* Top Order ID & Current Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                অর্ডার আইডি
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {searchedOrder.id}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                তারিখ: {searchedOrder.createdAt}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-4 py-1.5 rounded-full font-black text-xs border shadow-xs ${
                searchedOrder.status === 'Delivered' 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                  : searchedOrder.status === 'In Courier'
                  ? 'bg-sky-100 text-sky-800 border-sky-300'
                  : searchedOrder.status === 'Confirmed'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : searchedOrder.status === 'Cancelled'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}>
                বর্তমান স্ট্যাটাস: {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* Visual Step Timeline */}
          {searchedOrder.status !== 'Cancelled' ? (
            <div className="py-4 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                ডেলিভারি প্রগ্রেস ট্র্যাকার (Timeline)
              </h3>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute left-[12%] right-[12%] top-6 h-1 bg-slate-200 -z-0">
                  <div
                    className="h-full bg-amber-500 transition-all duration-700"
                    style={{
                      width: `${(Math.max(0, getStepStatusIndex(searchedOrder.status)) / (ORDER_STEPS.length - 1)) * 100}%`
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                  {ORDER_STEPS.map((step, idx) => {
                    const currentIndex = getStepStatusIndex(searchedOrder.status);
                    const isCompleted = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div
                        key={step.status}
                        className={`p-4 rounded-2xl border transition-all flex md:flex-col items-center gap-3 text-left md:text-center ${
                          isCurrent
                            ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-500/20 shadow-md'
                            : isCompleted
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            isCompleted
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        <div>
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                            {step.labelBn}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {step.descBn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-rose-50 text-rose-800 rounded-2xl border border-rose-200 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>এই অর্ডারটি বাতিল (Cancelled) করা হয়েছে। অধিক তথ্যের জন্য হটলাইনে ফোন করুন।</span>
            </div>
          )}

          {/* Customer & Items Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-200">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                গ্রাহকের নাম ও ঠিকানা
              </span>
              <div className="font-extrabold text-slate-900">{searchedOrder.customer.fullName}</div>
              <div className="text-slate-700 font-semibold">{searchedOrder.customer.mobileNumber}</div>
              <div className="text-slate-600">
                {searchedOrder.customer.address}, {searchedOrder.customer.thana}, {searchedOrder.customer.district}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                কুরিয়ার ও বিল তথ্য
              </span>
              <div className="text-slate-800 font-semibold">
                কুরিয়ার পার্টনার: <span className="font-bold text-slate-900">{searchedOrder.trackingCourier}</span>
              </div>
              <div className="text-slate-800 font-semibold">
                মোট বিল: <span className="font-black text-amber-600 text-sm">৳{searchedOrder.totalAmount.toLocaleString('en-IN')}</span> (ক্যাশ অন ডেলিভারি)
              </div>
            </div>
          </div>

          {/* History Event Log */}
          {searchedOrder.history && searchedOrder.history.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                টাইমলাইন হিস্ট্রি লগ
              </h4>
              <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                {searchedOrder.history.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-none">
                    <span className="font-bold text-slate-800">{h.status}: {h.note}</span>
                    <span className="text-slate-400 text-[11px] font-mono">{h.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : hasSearched ? (
        /* Not Found Box */
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-2xs max-w-md mx-auto space-y-3">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">অর্ডার খুঁজে পাওয়া যায়নি!</h3>
          <p className="text-xs text-slate-500">
            দয়া করে সঠিক মোবাইল নম্বর অথবা অর্ডার কোড লিখে পুনরায় চেষ্টা করুন।
          </p>
        </div>
      ) : (
        /* Prompt Box with Professional Recent Orders List */
        <div className="space-y-6 max-w-2xl mx-auto">
          {orders.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-500" />
                  <span>সাম্প্রতিক অর্ডারসমূহ (Quick Order List)</span>
                </h3>
                <span className="text-xs text-slate-500 font-bold">{orders.length} টি অর্ডার পাওয়া গেছে</span>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => {
                      setSearchedOrder(ord);
                      setQuery(ord.id);
                      setHasSearched(true);
                    }}
                    className="p-3.5 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-xs text-slate-900 group-hover:text-amber-700">
                          {ord.id}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">({ord.createdAt})</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">
                        {ord.customer.fullName} • {ord.customer.mobileNumber}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        পণ্য: {ord.items.map(i => i.product.titleBn).join(', ')}
                      </p>
                    </div>

                    <div className="text-right shrink-0 space-y-1">
                      <span className="text-xs font-black text-amber-600 block">
                        ৳{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 text-center border border-slate-200/80 shadow-2xs space-y-3">
            <ShoppingBag className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">নতুন পণ্য কেনাকাটা করতে চান?</h3>
            <button
              onClick={onGoToShop}
              className="bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs hover:bg-amber-600 transition-colors cursor-pointer shadow-md"
            >
              পণ্য দেখতে শপে যান
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
