import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickOrder: (product: Product, color: ProductColor, size: string) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickOrder,
  onAddToCart,
  onQuickView
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [hoveredImage, setHoveredImage] = useState<string>(product.images[0]);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* 1. Image Frame */}
      <div className="relative aspect-4/5 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={hoveredImage || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              -{product.discountPercent}% ছাড়
            </span>
          )}
          <span className="bg-slate-900/90 text-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30 backdrop-blur-xs">
            SKU: {product.sku}
          </span>
        </div>

        {/* Quick View Button on Image Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute right-2.5 top-2.5 z-10 p-2 rounded-xl bg-white/90 hover:bg-slate-900 hover:text-white text-slate-700 shadow-md backdrop-blur-xs transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Multiple Image Thumbnails Hover Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-slate-950/60 p-1 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setHoveredImage(img)}
                className={`w-2 h-2 rounded-full ${hoveredImage === img ? 'bg-amber-400' : 'bg-slate-400'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-1 text-xs mb-1">
          <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider line-clamp-1">
            {product.categoryBn}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200 shrink-0">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="font-bold text-[11px] text-amber-900">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onQuickView(product)} 
          className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer leading-snug min-h-[2.5rem]"
        >
          {product.titleBn}
        </h3>

        {/* Price Tag */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-black text-amber-600">
            ৳{product.offerPrice.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.offerPrice && (
            <span className="text-xs text-slate-400 line-through font-semibold">
              ৳{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="mt-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>কালার: {selectedColor.nameBn}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center relative cursor-pointer ${
                    selectedColor.name === color.name ? 'ring-2 ring-amber-500 ring-offset-1 border-slate-900 scale-110' : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.nameBn}
                >
                  {selectedColor.name === color.name && (
                    <Check className={`w-3 h-3 ${color.hex === '#ffffff' || color.hex === '#f8fafc' || color.hex === '#fef08a' ? 'text-slate-900' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection Pills */}
        {product.sizes.length > 0 && (
          <div className="mt-2.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              সাইজ: {selectedSize}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTAs: Order Now (Primary COD) + Add to Cart (Secondary) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          {/* Direct Order Button (অর্ডার করুন) */}
          <button
            onClick={() => onQuickOrder(product, selectedColor, selectedSize)}
            className="flex-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>অর্ডার করুন</span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product, selectedColor, selectedSize)}
            className="bg-slate-100 hover:bg-slate-900 hover:text-white active:scale-95 text-slate-800 p-2.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center cursor-pointer"
            title="কার্টে যোগ করুন"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
