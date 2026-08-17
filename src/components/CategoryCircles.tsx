import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoryCirclesProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

export const CategoryCircles: React.FC<CategoryCirclesProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const categoryImages: Record<string, string> = {
    all: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400',
    combo_offers: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400',
    jogger_pants: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=400',
    cargo_pants: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=400',
    mens_fashion: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=400',
    womens_fashion: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
    gadgets: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400',
    footwear_leather: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-4">
        <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
          জনপ্রিয় ক্যাটাগরি
        </h3>
        <button 
          onClick={() => setSelectedCategory('all')} 
          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
        >
          <span>সব দেখুন</span>
          <span>&rarr;</span>
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.slice(1).map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const bgImg = categoryImages[cat.id] || categoryImages.all;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-2 group cursor-pointer transition-all ${
                isSelected ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {/* Image Frame with rounded border */}
              <div
                className={`w-full aspect-square rounded-2xl overflow-hidden border-2 bg-slate-100 relative shadow-xs transition-all ${
                  isSelected
                    ? 'border-rose-600 ring-2 ring-rose-500/20'
                    : 'border-slate-200/90 group-hover:border-rose-400'
                }`}
              >
                <img 
                  src={bgImg} 
                  alt={cat.nameBn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              {/* Pill with Category Name & Black Count Badge */}
              <div className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs border transition-colors ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-rose-50 text-rose-700 border-rose-200/70 group-hover:bg-rose-100'
              }`}>
                <span className="text-[11px] font-extrabold truncate max-w-[80px]">
                  {cat.nameBn}
                </span>
                <span className={`text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white text-rose-600' : 'bg-slate-950 text-white'
                }`}>
                  {cat.count ?? 0}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
