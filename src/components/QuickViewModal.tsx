import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, ShoppingBag, ArrowRight, Ruler, Flame } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { SizeGuideModal } from './SizeGuideModal';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onQuickOrder: (product: Product, color: ProductColor, size: string) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onQuickOrder,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
        <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-8 max-h-[90vh]">
          
          {/* Modal Header */}
          <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                প্রোডাক্ট ডিটেইলস
              </span>
              <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                    -{product.discountPercent}% ছাড়
                  </span>
                )}
              </div>

              {/* Thumbnail Switcher */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Controls */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Rating & Stock Urgency */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviewsCount})</span>
                  </div>

                  {/* Stock Urgency Alert */}
                  <div className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-rose-200">
                    <Flame className="w-3 h-3 text-rose-600 fill-rose-600 animate-pulse" />
                    <span>মাত্র ৫টি স্টকে বাকি!</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-black text-slate-900 leading-snug">
                  {product.titleBn}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-amber-600">
                    ৳{product.offerPrice.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.offerPrice && (
                    <span className="text-sm text-slate-400 line-through font-semibold">
                      ৳{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {product.descriptionBn}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      পছন্দের কালার নির্বাচন করুন: <span className="text-amber-600 font-extrabold">{selectedColor.nameBn}</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                            selectedColor.name === color.name
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-slate-300" 
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.nameBn}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector with Size Chart Trigger */}
                {product.sizes.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        সাইজ বেছে নিন: <span className="text-amber-600 font-extrabold">{selectedSize}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setSizeGuideOpen(true)}
                        className="text-amber-600 hover:text-amber-700 font-bold text-xs flex items-center gap-1 cursor-pointer underline"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>সাইজ চার্ট</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                              : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trust highlights */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-1.5 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>ঢাকা সিটি ৳৬০ | ঢাকার বাইরে ৳১২০</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে চেক করে পেমেন্ট</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onQuickOrder(product, selectedColor, selectedSize);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-3 px-4 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>অর্ডার করুন (Cash on Delivery)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold p-3 rounded-2xl transition-all cursor-pointer"
                  title="কার্টে যোগ করুন"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        categoryName={product.categoryBn}
      />
    </>
  );
};
