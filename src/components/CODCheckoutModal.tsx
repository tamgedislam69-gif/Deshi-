import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Phone, User, Truck, AlertCircle, ShoppingBag } from 'lucide-react';
import { CartItem, CustomerDetails, DeliveryZone, Order, Product, ProductColor } from '../types';
import { BANGLADESHI_DISTRICTS } from '../data/mockData';

interface CODCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  directProduct?: { product: Product; color: ProductColor; size: string } | null;
  onOrderSuccess: (order: Order) => void;
}

export const CODCheckoutModal: React.FC<CODCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  directProduct,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  // Prepare active order items list
  const activeItems: CartItem[] = directProduct
    ? [
        {
          id: `direct-${directProduct.product.id}`,
          product: directProduct.product,
          selectedColor: directProduct.color,
          selectedSize: directProduct.size,
          quantity: 1
        }
      ]
    : cartItems;

  const [itemSelections, setItemSelections] = useState<{
    [id: string]: { quantity: number; color: ProductColor; size: string };
  }>(() => {
    const initial: { [id: string]: { quantity: number; color: ProductColor; size: string } } = {};
    activeItems.forEach((item) => {
      initial[item.id] = {
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize
      };
    });
    return initial;
  });

  // Form State - NO pre-selected default zone or district
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const [mobileError, setMobileError] = useState('');
  const [zoneError, setZoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update thana dropdown when district changes
  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    setZoneError('');
    const found = BANGLADESHI_DISTRICTS.find((d) => d.name === distName);
    if (found && found.thanas.length > 0) {
      setSelectedThana(found.thanas[0]);
    } else {
      setSelectedThana('');
    }

    if (distName === 'Dhaka') {
      setDeliveryZone('inside_dhaka');
    } else if (distName !== '') {
      setDeliveryZone('outside_dhaka');
    } else {
      setDeliveryZone(null);
    }
  };

  const handleSelectZone = (zone: DeliveryZone) => {
    setDeliveryZone(zone);
    setZoneError('');
    if (zone === 'inside_dhaka') {
      setSelectedDistrict('Dhaka');
      setSelectedThana('Dhanmondi (ধানমন্ডি)');
    } else if (selectedDistrict === 'Dhaka' || !selectedDistrict) {
      setSelectedDistrict('Chattogram');
      setSelectedThana('Agrabad (আগ্রাবাদ)');
    }
  };

  // Calculations
  const subtotal = activeItems.reduce((acc, item) => {
    const sel = itemSelections[item.id] || { quantity: item.quantity };
    return acc + item.product.offerPrice * sel.quantity;
  }, 0);

  const deliveryFee = deliveryZone === 'inside_dhaka' ? 60 : deliveryZone === 'outside_dhaka' ? 120 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Validate Bangladeshi Mobile Number
  const validateMobile = (num: string): boolean => {
    const cleaned = num.replace(/\D/g, '');
    const regex = /^01[3-9]\d{8}$/;
    if (!regex.test(cleaned)) {
      setMobileError('সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return false;
    }
    setMobileError('');
    return true;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryZone) {
      setZoneError('দয়া করে ঢাকা সিটি অথবা জেলা ডেলিভারি এলাকা পছন্দ করুন!');
      return;
    }

    if (!validateMobile(mobileNumber)) {
      return;
    }

    if (!fullName.trim() || !address.trim()) {
      alert('দয়া করে আপনার নাম ও সম্পূর্ণ ডেলিভারি ঠিকানা পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('en-GB')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const finalItems: CartItem[] = activeItems.map((item) => {
        const sel = itemSelections[item.id] || { quantity: item.quantity, color: item.selectedColor, size: item.selectedSize };
        return {
          ...item,
          quantity: sel.quantity,
          selectedColor: sel.color,
          selectedSize: sel.size
        };
      });

      const newOrder: Order = {
        id: orderId,
        createdAt: formattedDate,
        customer: {
          fullName,
          mobileNumber,
          deliveryZone: deliveryZone || 'inside_dhaka',
          address,
          district: selectedDistrict || 'Dhaka',
          thana: selectedThana || 'Dhanmondi',
          orderNote
        },
        items: finalItems,
        subtotal,
        deliveryFee,
        totalAmount: grandTotal,
        status: 'Pending',
        paymentMethod: 'Cash on Delivery',
        trackingCourier: deliveryZone === 'inside_dhaka' ? 'Pathao Express' : 'Steadfast Courier',
        history: [
          {
            status: 'Pending',
            timestamp: formattedDate,
            note: 'ক্যাশ অন ডেলিভারি অর্ডার প্লেস করা হয়েছে'
          }
        ]
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-4 max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase">
                ১-ক্লিক দ্রুত অর্ডার
              </span>
              <span className="text-xs text-amber-400 font-bold">ক্যাশ অন ডেলিভারি</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
              অর্ডারটি কনফার্ম করতে তথ্য দিন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmitOrder} className="p-5 overflow-y-auto space-y-5">
          
          {/* Order Summary Item Box with Embedded Color & Size Selectors */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>অর্ডারের পণ্য, কালার ও সাইজ নির্বাচন ({activeItems.length})</span>
            </h4>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {activeItems.map((item) => {
                const currentSel = itemSelections[item.id] || {
                  quantity: item.quantity,
                  color: item.selectedColor,
                  size: item.selectedSize
                };

                return (
                  <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs space-y-2.5 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-14 h-16 object-cover rounded-xl border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">{item.product.titleBn}</p>
                        <p className="text-amber-600 font-black text-sm mt-0.5">
                          ৳{item.product.offerPrice.toLocaleString('en-IN')} × {currentSel.quantity}
                        </p>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setItemSelections({
                              ...itemSelections,
                              [item.id]: { ...currentSel, quantity: Math.max(1, currentSel.quantity - 1) }
                            })
                          }
                          className="px-2.5 py-1 font-black text-slate-700 hover:bg-white rounded-lg cursor-pointer text-sm"
                        >
                          -
                        </button>
                        <span className="px-2 font-black text-slate-900 text-xs">{currentSel.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setItemSelections({
                              ...itemSelections,
                              [item.id]: { ...currentSel, quantity: currentSel.quantity + 1 }
                            })
                          }
                          className="px-2.5 py-1 font-black text-slate-700 hover:bg-white rounded-lg cursor-pointer text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Embedded Color & Size Pickers inside the Order Box */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/60 p-2 rounded-xl">
                      {/* Color Picker */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          কালার: <span className="text-amber-600">{currentSel.color.nameBn}</span>
                        </span>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {item.product.colors.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() =>
                                setItemSelections({
                                  ...itemSelections,
                                  [item.id]: { ...currentSel, color: c }
                                })
                              }
                              className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                                currentSel.color.name === c.name ? 'ring-2 ring-amber-500 border-white scale-110' : 'border-slate-300'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.nameBn}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Size Picker */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          সাইজ: <span className="text-amber-600">{currentSel.size}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          {item.product.sizes.map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() =>
                                setItemSelections({
                                  ...itemSelections,
                                  [item.id]: { ...currentSel, size: sz }
                                })
                              }
                              className={`px-2 py-0.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                                currentSel.size === sz
                                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Delivery Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              গ্রাহকের ডেলিভারি সম্পর্কিত তথ্য
            </h4>

            {/* Customer Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                আপনার নাম (Full Name) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="উদাহরণ: মোঃ তামজিদ ইসলাম"
                  className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Mobile Number with 11 Digit Validation */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                মোবাইল নম্বর (১১ ডিজিট) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    if (mobileError) validateMobile(e.target.value);
                  }}
                  onBlur={(e) => validateMobile(e.target.value)}
                  placeholder="01712345678"
                  className={`w-full bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none ${
                    mobileError 
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                      : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {mobileError && (
                <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{mobileError}</span>
                </p>
              )}
            </div>

            {/* Delivery Zone Selection (NOT preselected initially) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                <span>ডেলিভারি এলাকা নির্বাচন করুন *</span>
                {!deliveryZone && (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    আগে সিলেক্ট করা নেই
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectZone('inside_dhaka')}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all text-left ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-amber-500 bg-amber-50/90 text-slate-900 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-300 bg-slate-50 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-extrabold text-slate-900">ঢাকা সিটির ভেতরে</span>
                    <span className="text-[11px] font-bold text-amber-600">ডেলিভারি চার্জ: ৳৬০</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryZone === 'inside_dhaka' ? 'border-amber-500 bg-amber-500' : 'border-slate-400'}`}>
                    {deliveryZone === 'inside_dhaka' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectZone('outside_dhaka')}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all text-left ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-amber-500 bg-amber-50/90 text-slate-900 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-300 bg-slate-50 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-extrabold text-slate-900">ঢাকা সিটির বাইরে</span>
                    <span className="text-[11px] font-bold text-amber-600">ডেলিভারি চার্জ: ৳১২০</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryZone === 'outside_dhaka' ? 'border-amber-500 bg-amber-500' : 'border-slate-400'}`}>
                    {deliveryZone === 'outside_dhaka' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </button>
              </div>

              {zoneError && (
                <p className="text-[11px] font-bold text-rose-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{zoneError}</span>
                </p>
              )}
            </div>

            {/* District & Thana Selection Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  জেলা (District) *
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs font-bold p-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="">-- জেলা নির্বাচন করুন --</option>
                  {BANGLADESHI_DISTRICTS.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.nameBn} ({d.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  থানা / উপজেলা (Thana/Upazila) *
                </label>
                <select
                  value={selectedThana}
                  onChange={(e) => setSelectedThana(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs font-bold p-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="">-- থানা নির্বাচন করুন --</option>
                  {BANGLADESHI_DISTRICTS.find((d) => d.name === selectedDistrict)?.thanas.map((th) => (
                    <option key={th} value={th}>
                      {th}
                    </option>
                  )) || <option value="">অন্যান্য থানা</option>}
                </select>
              </div>
            </div>

            {/* Full Detailed Address */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                সম্পূর্ণ ঠিকানা (রোড, বাসা নং, এলাকা) *
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="উদাহরণ: বাসা #১২, রোড #৪, সেক্টর #৭, উত্তরা, ঢাকা"
                  className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs font-medium p-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                অর্ডার নোট / বিশেষ নির্দেশিকা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="যেমন: বিকেলে ডেলিভারি দেবেন"
                className="w-full bg-slate-50 text-slate-900 text-xs font-medium p-2 rounded-xl border border-slate-200"
              />
            </div>

          </div>

          {/* Pricing Breakdown Summary */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800">
            <div className="flex justify-between text-xs text-slate-300">
              <span>পণ্যমূল্য (Subtotal):</span>
              <span className="font-bold text-white">৳{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-300">
              <span>কুরিয়ার চার্জ:</span>
              <span className="font-bold text-amber-400">
                {deliveryZone ? `৳${deliveryFee}` : 'এলাকা সিলেক্ট করুন'}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-amber-300">সর্বমোট প্রদেয় বিল:</span>
              <span className="text-2xl font-black text-amber-400">
                ৳{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 text-center pt-1 font-medium flex items-center justify-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>পণ্য হাতে বুঝে পেয়ে কুরিয়ার ডেলিভারিম্যানকে টাকা পরিশোধ করবেন</span>
            </p>
          </div>

          {/* Submit Pulsing Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-xl transition-all text-base animate-pulse-ring flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>অর্ডার প্রসেস হচ্ছে...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 fill-slate-950/20" />
                <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
