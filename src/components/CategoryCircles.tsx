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
  const circleIcons: Record<string, string> = {
    all: '🔥',
    mens_fashion: '👔',
    womens_fashion: '👗',
    gadgets: '🎧',
    footwear_leather: '👞',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          জনপ্রিয় ক্যাটাগরি
        </h3>
        <span className="text-[11px] font-bold text-amber-600">সব ক্যাটালগ &rarr;</span>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-2 shrink-0 group cursor-pointer transition-all ${
                isSelected ? 'scale-105' : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-md border-2 transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-600 ring-4 ring-amber-500/20 shadow-amber-500/30'
                    : 'bg-white text-slate-800 border-slate-200 group-hover:border-amber-400 group-hover:bg-amber-50'
                }`}
              >
                <span>{circleIcons[cat.id] || '🛍️'}</span>
              </div>
              <span
                className={`text-xs font-bold text-center max-w-[80px] line-clamp-1 ${
                  isSelected ? 'text-amber-600 font-extrabold' : 'text-slate-700'
                }`}
              >
                {cat.nameBn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
