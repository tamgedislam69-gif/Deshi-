import React, { useState, useMemo } from 'react';
import { 
  Filter, ArrowUpDown, LayoutGrid, List, Sparkles, 
  Flame, CheckCircle2, SearchX 
} from 'lucide-react';
import { Product, ProductColor, TabType } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockData';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: TabType;
  onQuickOrder: (product: Product, color: ProductColor, size: string) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  activeTab,
  onQuickOrder,
  onAddToCart,
  onQuickView
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products based on category, search query, and tab context
  const filteredProducts = useMemo(() => {
    return (products || []).filter((p) => {
      // 1. Tab filter
      if (activeTab === 'new_arrivals' && !p.isNewArrival) return false;
      if (activeTab === 'special_offers' && !p.isSpecialOffer) return false;

      // 2. Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // 3. Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTitleBn = p.titleBn.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesTag = p.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTitleBn && !matchesSku && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.offerPrice - b.offerPrice;
      if (sortBy === 'price_high') return b.offerPrice - a.offerPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [products, selectedCategory, searchQuery, activeTab, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* 1. Header Title & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            {activeTab === 'new_arrivals' ? (
              <span className="flex items-center gap-1.5 font-bold text-amber-600 text-sm">
                <Sparkles className="w-4 h-4" /> নতুন কালেকশন
              </span>
            ) : activeTab === 'special_offers' ? (
              <span className="flex items-center gap-1.5 font-bold text-rose-600 text-sm">
                <Flame className="w-4 h-4" /> স্পেশাল ডিসকাউন্ট অফার
              </span>
            ) : (
              <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                পণ্য ক্যাটালগ
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {activeTab === 'new_arrivals' 
              ? 'লেটেস্ট নিউ অ্যারাইভাল প্রোডাক্ট' 
              : activeTab === 'special_offers' 
              ? 'সীমিত সময়ের মেগা সেল ডিসকাউন্ট' 
              : 'সবচেয়ে জনপ্রিয় পণ্যসমূহ'}
          </h2>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.nameBn}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Control Bar (Results Count, Sort Dropdown, View Toggles) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span className="bg-slate-100 text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200">
            {filteredProducts.length} টি পণ্য পাওয়া গেছে
          </span>
          {searchQuery && (
            <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
              খুঁজছেন: "{searchQuery}"
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none font-bold text-slate-800 cursor-pointer"
            >
              <option value="featured">ফিচার্ড (Featured)</option>
              <option value="price_low">দাম: কম থেকে বেশি</option>
              <option value="price_high">দাম: বেশি থেকে কম</option>
              <option value="rating">সেরা রেটিং</option>
            </select>
          </div>

          {/* Grid/List Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickOrder={onQuickOrder}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-2xs max-w-md mx-auto my-12 space-y-4">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">কোনো পণ্য পাওয়া যায়নি!</h3>
          <p className="text-xs text-slate-500">
            আপনার অনুসন্ধান সংক্রান্ত কোনো পণ্য এই মুহূর্তে নেই। দয়া করে অন্য কোনো ক্যাটাগরি বা কিওয়ার্ড দিয়ে চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-amber-600 transition-colors cursor-pointer"
          >
            সব পণ্য দেখুন
          </button>
        </div>
      )}
    </div>
  );
};
