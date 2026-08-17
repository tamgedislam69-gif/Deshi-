import React, { useState } from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
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

        {/* Category Badge / Combo Tag if applicable */}
        {product.category === 'combo_offers' && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="bg-slate-950/90 text-amber-300 font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow-md border border-amber-500/30 backdrop-blur-xs">
              ২ পিস কম্বো অফার
            </span>
          </div>
        )}

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

        {/* CTAs: Order Now (Primary COD) + Add to Cart (Secondary) */}
        <div className="mt-[auto] pt-3 border-t border-slate-100 flex items-center gap-2">
          {/* Direct Order Button (🛒 অর্ডার করুন) */}
          <button
            onClick={() => onQuickOrder(product, product.colors[0], product.sizes[0])}
            className="flex-1 bg-slate-950 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>🛒</span>
            <span>অর্ডার করুন</span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product, product.colors[0], product.sizes[0])}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer"
            title="কার্টে যোগ করুন"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
