import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.offerPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">আপনার শপিং কার্ট</h3>
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-16 h-20 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                    {item.product.titleBn}
                  </h4>

                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>কালার: {item.selectedColor.nameBn}</span>
                    <span>•</span>
                    <span>সাইজ: {item.selectedSize}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-black text-amber-600">
                      ৳{(item.product.offerPrice * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-white border border-slate-300 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-slate-100 text-slate-700 rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-slate-100 text-slate-700 rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            /* Empty Cart View */
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">আপনার কার্ট খালি রয়েছে!</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                আমাদের আকর্ষণীয় কালেকশন থেকে আপনার পছন্দের পণ্যটি নির্বাচন করুন।
              </p>
              <button
                onClick={onClose}
                className="bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-amber-600 transition-colors cursor-pointer"
              >
                পণ্য কেনাকাটা শুরু করুন
              </button>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">ক্যাশ অন ডেলিভারি (COD) এ সরাসরি চেকআউট করুন!</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>পণ্যের মোট মূল্য (Subtotal):</span>
                <span className="font-bold text-slate-900">৳{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>কুরিয়ার ডেলিভারি চার্জ:</span>
                <span className="text-slate-500 text-[11px] font-semibold">(চেকআউটে নির্ধারিত হবে)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-slate-900">সর্বমোট (আনুমানিক):</span>
              <span className="text-xl font-black text-amber-600">৳{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-4 px-4 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer animate-pulse-ring"
            >
              <span>ক্যাশ অন ডেলিভারি চেকআউট করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>কোনো অগ্রিম পেমেন্টের ঝামেলা নেই</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
