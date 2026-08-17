import React, { useState } from 'react';
import { 
  ShieldCheck, Phone, MessageSquare, Download, Printer, Plus, 
  Search, Filter, Save, FileText, CheckCircle2, Clock, Truck, 
  AlertCircle, DollarSign, Package, User, ExternalLink, X,
  Image as ImageIcon, Settings, Trash2, Edit3, Eye, EyeOff,
  ArrowUp, ArrowDown, Sliders, Layers, Sparkles, Code, Copy, Check
} from 'lucide-react';
import { Order, OrderStatus, Product, HeroSlide, SiteSettings } from '../types';
import { SHOPIFY_LIQUID_TEMPLATES, LiquidTemplate } from '../data/shopifyLiquidTemplates';

interface AdminDashboardProps {
  orders: Order[];
  heroSlides: HeroSlide[];
  siteSettings: SiteSettings;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  onUpdateInternalNote: (orderId: string, note: string) => void;
  onAddNewProduct: (product: Product) => void;
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders = [],
  heroSlides = [],
  siteSettings,
  onUpdateOrderStatus,
  onUpdateInternalNote,
  onAddNewProduct,
  onUpdateHeroSlides,
  onUpdateSiteSettings,
}) => {
  const [adminTab, setAdminTab] = useState<'orders' | 'banners' | 'shopify_customizer' | 'settings'>('orders');
  const [selectedLiquid, setSelectedLiquid] = useState<LiquidTemplate>(SHOPIFY_LIQUID_TEMPLATES[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Customizer inputs state
  const [storeName, setStoreName] = useState(siteSettings.storeName || 'SHOP MIX ONLINE BD');
  const [announcementText, setAnnouncementText] = useState(siteSettings.announcementText || 'ফ্রি ডেলিভারি অফার পেতে এখনই অর্ডার করুন!');
  const [whatsappHotline, setWhatsappHotline] = useState(siteSettings.whatsappHotline || '01771357329');
  const [searchPlaceholder, setSearchPlaceholder] = useState(siteSettings.searchPlaceholder || 'পণ্য বা সেটিংস খুঁজুন...');
  const [storeTagline, setStoreTagline] = useState(siteSettings.storeTagline || 'RichMan.Style');
  const [headerSecondaryText, setHeaderSecondaryText] = useState(siteSettings.headerSecondaryText || 'অফিসিয়াল ফ্ল্যাগশিপ ই-স্টোর');
  const [headerBadgeText, setHeaderBadgeText] = useState(siteSettings.headerBadgeText || 'LIVE');
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(siteSettings.showAnnouncementBar !== false);
  const [showHotline, setShowHotline] = useState(siteSettings.showHotline !== false);
  const [showSearchBar, setShowSearchBar] = useState(siteSettings.showSearchBar !== false);
  const [showLiveBadge, setShowLiveBadge] = useState(siteSettings.showLiveBadge !== false);
  const [stickyHeader, setStickyHeader] = useState(siteSettings.stickyHeader !== false);

  // Advanced Styling & Color States
  const [headerBgColor, setHeaderBgColor] = useState(siteSettings.headerBgColor || '#0f172a');
  const [headerTextColor, setHeaderTextColor] = useState(siteSettings.headerTextColor || '#ffffff');
  const [headerAccentColor, setHeaderAccentColor] = useState(siteSettings.headerAccentColor || '#f59e0b');
  const [announcementBgColor, setAnnouncementBgColor] = useState(siteSettings.announcementBgColor || '#020617');
  const [announcementTextColor, setAnnouncementTextColor] = useState(siteSettings.announcementTextColor || '#f8fafc');
  const [headerGradientMode, setHeaderGradientMode] = useState(siteSettings.headerGradientMode !== false);
  const [headerGradientCss, setHeaderGradientCss] = useState(siteSettings.headerGradientCss || 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)');
  const [headerCustomCss, setHeaderCustomCss] = useState(siteSettings.headerCustomCss || '');
  const [headerPaddingSize, setHeaderPaddingSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>(siteSettings.headerPaddingSize || 'medium');
  const [headerFontSize, setHeaderFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>(siteSettings.headerFontSize || 'medium');
  const [feeInside, setFeeInside] = useState(siteSettings.deliveryFeeInsideDhaka || 60);
  const [feeOutside, setFeeOutside] = useState(siteSettings.deliveryFeeOutsideDhaka || 120);
  const [outletAddress, setOutletAddress] = useState(siteSettings.outletAddressBn || 'খিলগাঁও আউটলেট, ঢাকা-১২১৯');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>((orders && orders[0]) || null);
  const [noteText, setNoteText] = useState<string>(selectedOrder?.internalNotes || '');
  
  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOfferPrice, setNewOfferPrice] = useState('');
  const [newCategory, setNewCategory] = useState('mens_fashion');
  const [newCategoryBn, setNewCategoryBn] = useState('পুরুষের পোশাক');

  // Banner Modal State
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroSlide | null>(null);
  const [bannerHeading, setBannerHeading] = useState('');
  const [bannerSubheading, setBannerSubheading] = useState('');
  const [bannerBadge, setBannerBadge] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerCta, setBannerCta] = useState('🛒 এখন অর্ডার করুন');
  const [bannerDiscountBadge, setBannerDiscountBadge] = useState('');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = order.customer.fullName.toLowerCase().includes(q);
      const matchPhone = order.customer.mobileNumber.includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const inCourierCount = orders.filter((o) => o.status === 'In Courier').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setNoteText(order.internalNotes || '');
  };

  const handleSaveNote = () => {
    if (!selectedOrder) return;
    onUpdateInternalNote(selectedOrder.id, noteText);
    alert('অভ্যন্তরীণ নোট সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleExportCSV = () => {
    const csvHeader = 'Order ID,Date,Customer Name,Phone,Zone,District,Status,Total BDT\n';
    const csvRows = orders.map(
      (o) => `"${o.id}","${o.createdAt}","${o.customer.fullName}","${o.customer.mobileNumber}","${o.customer.deliveryZone}","${o.customer.district}","${o.status}",${o.totalAmount}`
    ).join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeshiStore_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const orig = parseFloat(newPrice) || 1000;
    const off = parseFloat(newOfferPrice) || orig * 0.8;
    const disc = Math.round(((orig - off) / orig) * 100);

    const created: Product = {
      id: `prod-custom-${Date.now()}`,
      sku: `DS-NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      titleBn: newTitleBn || newTitle,
      category: newCategory,
      categoryBn: newCategoryBn,
      originalPrice: orig,
      offerPrice: off,
      discountPercent: disc,
      rating: 5.0,
      reviewsCount: 1,
      images: [
        'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800'
      ],
      colors: [
        { name: 'Standard White', nameBn: 'স্ট্যান্ডার্ড হোয়াইট', hex: '#ffffff' },
        { name: 'Dark Navy', nameBn: 'ডার্ক নেভি', hex: '#1e293b' }
      ],
      sizes: ['M', 'L', 'XL'],
      description: 'Newly added custom store item.',
      descriptionBn: 'নতুন কাস্টম স্টোর প্রোডাক্ট।',
      inStock: true,
      isNewArrival: true
    };

    onAddNewProduct(created);
    setShowAddProductModal(false);
    alert('নতুন পণ্য সফলভাবে স্টোরে আপলোড করা হয়েছে!');
  };

  // Banner Handlers
  const handleOpenNewBannerModal = () => {
    setEditingBanner(null);
    setBannerHeading('');
    setBannerSubheading('');
    setBannerBadge('');
    setBannerImage('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1200');
    setBannerCta('🛒 এখন অর্ডার করুন');
    setBannerDiscountBadge('মেগা অফার');
    setShowBannerModal(true);
  };

  const handleOpenEditBannerModal = (slide: HeroSlide) => {
    setEditingBanner(slide);
    setBannerHeading(slide.headingBn);
    setBannerSubheading(slide.subheadingBn);
    setBannerBadge(slide.badgeBn);
    setBannerImage(slide.image);
    setBannerCta(slide.ctaTextBn);
    setBannerDiscountBadge(slide.discountBadge);
    setShowBannerModal(true);
  };

  const handleSaveBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerHeading.trim() || !bannerImage.trim()) return;

    if (editingBanner) {
      // Edit existing slide
      const updated = heroSlides.map((s) =>
        s.id === editingBanner.id
          ? {
              ...s,
              headingBn: bannerHeading,
              subheadingBn: bannerSubheading,
              badgeBn: bannerBadge,
              image: bannerImage,
              ctaTextBn: bannerCta,
              discountBadge: bannerDiscountBadge,
            }
          : s
      );
      onUpdateHeroSlides(updated);
    } else {
      // Create new slide
      const newSlide: HeroSlide = {
        id: `slide-${Date.now()}`,
        headingBn: bannerHeading,
        subheadingBn: bannerSubheading,
        badgeBn: bannerBadge || 'মেগা অফার',
        image: bannerImage,
        ctaTextBn: bannerCta || '🛒 এখন অর্ডার করুন',
        secondaryCtaTextBn: 'বিস্তারিত দেখুন',
        discountBadge: bannerDiscountBadge || 'অফার চলছে',
        active: true,
      };
      onUpdateHeroSlides([...heroSlides, newSlide]);
    }

    setShowBannerModal(false);
  };

  const handleToggleBannerActive = (slideId: string) => {
    const updated = heroSlides.map((s) =>
      s.id === slideId ? { ...s, active: !s.active } : s
    );
    onUpdateHeroSlides(updated);
  };

  const handleDeleteBanner = (slideId: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ব্যানারটি মুছে ফেলতে চান?')) {
      const updated = heroSlides.filter((s) => s.id !== slideId);
      onUpdateHeroSlides(updated);
    }
  };

  const handleMoveSlideUp = (index: number) => {
    if (index === 0) return;
    const updated = [...heroSlides];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onUpdateHeroSlides(updated);
  };

  const handleMoveSlideDown = (index: number) => {
    if (index === heroSlides.length - 1) return;
    const updated = [...heroSlides];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onUpdateHeroSlides(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Admin Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              এডমিন কন্ট্রোল প্যানেল
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            ই-কমার্স ব্যাকএন্ড ও ব্যানার স্লাইডার কন্ট্রোল
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            অর্ডার ট্র্যাকিং, আনলিমিটেড ব্যানার স্লাইডার ও সাইট সেটিংস পরিবর্তন করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>CSV ডাটা এক্সপোর্ট</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setAdminTab('orders')}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            adminTab === 'orders'
              ? 'bg-slate-950 text-amber-400 shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>অর্ডারসমূহ ({orders.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('banners')}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            adminTab === 'banners'
              ? 'bg-slate-950 text-amber-400 shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>ব্যানার স্লাইডার ম্যানেজার ({heroSlides.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('shopify_customizer')}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            adminTab === 'shopify_customizer'
              ? 'bg-slate-950 text-amber-400 shadow-md ring-2 ring-amber-500/30'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Code className="w-4 h-4 text-amber-500" />
          <span>শপিফাই কাস্টমাইজার ও লিকুইড কোড (Shopify Suite)</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            adminTab === 'settings'
              ? 'bg-slate-950 text-amber-400 shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>পপআপ ও সাইট সেটিংস</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                সর্বমোট সেলস (BDT)
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-600">
                ৳{totalRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] font-semibold text-slate-400">মোট {totalOrdersCount} টি অর্ডার</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                পেন্ডিং অর্ডার
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                {pendingCount}
              </div>
              <span className="text-[10px] font-bold text-amber-600">কনফার্মেশনের অপেক্ষায়</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                কুরিয়ারে আছে (In Courier)
              </span>
              <div className="text-xl sm:text-2xl font-black text-sky-600">
                {inCourierCount}
              </div>
              <span className="text-[10px] font-semibold text-slate-400">Pathao / Steadfast</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                ডেলিভার্ড সম্পন্ন
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600">
                {deliveredCount}
              </div>
              <span className="text-[10px] font-bold text-emerald-700">ক্যাশ রিসিভড</span>
            </div>
          </div>

          {/* Main Admin Two Column Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Order List Table & Filters */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
              
              {/* Filter Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-extrabold text-sm text-slate-900">অর্ডার তালিকা ({filteredOrders.length})</h3>

                  {/* Status Filter Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {['All', 'Pending', 'Confirmed', 'In Courier', 'Delivered', 'Cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                          statusFilter === st
                            ? 'bg-slate-900 text-amber-400 shadow-2xs'
                            : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="অর্ডার নম্বর, নাম বা ফোন দিয়ে ফিল্টার করুন..."
                    className="w-full bg-white text-xs font-medium pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto flex-1 max-h-[500px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="p-3">অর্ডার আইডি</th>
                      <th className="p-3">গ্রাহক</th>
                      <th className="p-3">ডেলিভারি এরিয়া</th>
                      <th className="p-3">বিল</th>
                      <th className="p-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => handleSelectOrder(order)}
                          className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                            selectedOrder?.id === order.id ? 'bg-amber-50 border-l-4 border-amber-500 font-bold' : ''
                          }`}
                        >
                          <td className="p-3 font-mono font-bold text-slate-900">
                            {order.id}
                            <span className="block text-[10px] text-slate-400 font-normal">{order.createdAt}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{order.customer.fullName}</span>
                            <span className="text-slate-500">{order.customer.mobileNumber}</span>
                          </td>
                          <td className="p-3 text-slate-700 font-medium">
                            {order.customer.district} ({order.customer.deliveryZone === 'inside_dhaka' ? 'ঢাকা' : 'বাইরে'})
                          </td>
                          <td className="p-3 font-black text-amber-600">
                            ৳{order.totalAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              order.status === 'Delivered' 
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'In Courier'
                                ? 'bg-sky-100 text-sky-800'
                                : order.status === 'Confirmed'
                                ? 'bg-amber-100 text-amber-800'
                                : order.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          কোনো অর্ডার পাওয়া যায়নি!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right Column: Order Details Inspector & Admin Internal Notes */}
            {selectedOrder ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-5 space-y-5 flex flex-col">
                
                {/* Header Inspector */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      অর্ডার ইন্সপেক্টর
                    </span>
                    <span className="text-lg font-black font-mono text-slate-900">{selectedOrder.id}</span>
                  </div>

                  {/* Status Updater Dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">স্ট্যাটাস আপডেট:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => onUpdateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                      className="bg-amber-50 border-2 border-amber-400 font-extrabold text-amber-900 text-xs py-1.5 px-2.5 rounded-xl cursor-pointer focus:outline-none"
                    >
                      <option value="Pending">Pending (পেন্ডিং)</option>
                      <option value="Confirmed">Confirmed (কনফার্মড)</option>
                      <option value="In Courier">In Courier (কুরিয়ারে)</option>
                      <option value="Delivered">Delivered (ডেলিভার্ড)</option>
                      <option value="Cancelled">Cancelled (বাতিল)</option>
                    </select>
                  </div>
                </div>

                {/* Quick WhatsApp & Call Action Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/88${selectedOrder.customer.mobileNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>হোয়াটসঅ্যাপ মেসেজ</span>
                  </a>

                  <a
                    href={`tel:${selectedOrder.customer.mobileNumber}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold p-2.5 rounded-xl text-xs border border-slate-300 transition-colors"
                    title="Direct Phone Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                {/* Customer Details Box */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    কাস্টমার তথ্য
                  </span>
                  <div className="font-bold text-slate-900">{selectedOrder.customer.fullName}</div>
                  <div className="text-slate-700 font-semibold">{selectedOrder.customer.mobileNumber}</div>
                  <div className="text-slate-600">
                    {selectedOrder.customer.address}, {selectedOrder.customer.thana}, {selectedOrder.customer.district}
                  </div>
                  {selectedOrder.customer.orderNote && (
                    <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] mt-1 font-medium">
                      নোট: "{selectedOrder.customer.orderNote}"
                    </div>
                  )}
                </div>

                {/* Items Box */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    অর্ডারকৃত পণ্য তালিকা
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {selectedOrder.items.map((it, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{it.product.titleBn}</div>
                          <div className="text-[10px] text-slate-500">{it.selectedColor.nameBn} | {it.selectedSize}</div>
                        </div>
                        <div className="font-extrabold text-amber-600">
                          ৳{it.product.offerPrice} × {it.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Internal Notes Area */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>এডমিন ইন্টারনাল প্রাইভেট নোট (Admin Internal Note)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="অর্ডার ডেলিভারির বিশেষ তথ্য বা ফলোআপ নোট লিখুন..."
                    className="w-full bg-slate-50 focus:bg-white text-xs p-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>নোট সেভ করুন</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400">
                তালিকা থেকে একটি অর্ডার সিলেক্ট করুন
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 2: UNLIMITED HERO BANNER SLIDER MANAGER */}
      {adminTab === 'banners' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-2xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-500" />
                <span>হোমপেজ ব্যানার স্লাইডার ম্যানেজার</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                এখানে আনলিমিটেড ব্যানার তৈরি, স্লাইড পজিশন রি-অর্ডার, ট্রানজিশন এনিমেশন ও নেভিগেশন সেটিংস কনফিগার করুন।
              </p>
            </div>

            <button
              onClick={handleOpenNewBannerModal}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ব্যানার যোগ করুন</span>
            </button>
          </div>

          {/* Quick Slider Control Settings Panel */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>স্লাইডার এনিমেশন ও ডিসপ্লে কনফিগারেশন</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Transition Effect Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">ট্রানজিশন ইফেক্ট:</label>
                <select
                  value={siteSettings.slideTransitionEffect || 'fade'}
                  onChange={(e) =>
                    onUpdateSiteSettings({
                      ...siteSettings,
                      slideTransitionEffect: e.target.value as any,
                    })
                  }
                  className="w-full bg-slate-800 text-white font-bold p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="fade">✨ ফেইড (Fade Crossfade)</option>
                  <option value="slide">➡️ স্লাইড (Slide Left/Right)</option>
                  <option value="zoom">🔍 জুম-ইন (Zoom In Scale)</option>
                  <option value="flip">🔄 থ্রিডি ফ্লিপ (3D Depth Flip)</option>
                </select>
              </div>

              {/* Auto Slide Speed */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">অটো স্লাইড স্পিড:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={siteSettings.autoSlideSpeed || 5}
                    onChange={(e) =>
                      onUpdateSiteSettings({
                        ...siteSettings,
                        autoSlideSpeed: parseInt(e.target.value) || 5,
                      })
                    }
                    className="w-full bg-slate-800 text-amber-400 font-mono font-extrabold p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-slate-400 font-bold shrink-0">সেকেন্ড</span>
                </div>
              </div>

              {/* Navigation Arrows Toggle */}
              <div className="space-y-1.5 flex flex-col justify-between">
                <label className="font-bold text-slate-300 block">নেভিগেশন এরো (Arrows):</label>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteSettings({
                      ...siteSettings,
                      showSliderArrows: !siteSettings.showSliderArrows,
                    })
                  }
                  className={`w-full py-2.5 px-3 rounded-xl font-extrabold flex items-center justify-between border cursor-pointer transition-colors ${
                    siteSettings.showSliderArrows !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <span>{siteSettings.showSliderArrows !== false ? 'দৃশ্যমান (On)' : 'লুকানো (Off)'}</span>
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Pagination Dots Toggle */}
              <div className="space-y-1.5 flex flex-col justify-between">
                <label className="font-bold text-slate-300 block">প্যাজিনেশন ডট (Dots):</label>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteSettings({
                      ...siteSettings,
                      showSliderDots: !siteSettings.showSliderDots,
                    })
                  }
                  className={`w-full py-2.5 px-3 rounded-xl font-extrabold flex items-center justify-between border cursor-pointer transition-colors ${
                    siteSettings.showSliderDots !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <span>{siteSettings.showSliderDots !== false ? 'দৃশ্যমান (On)' : 'লুকানো (Off)'}</span>
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Banners Grid List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>মোট ব্যানার স্লাইড: ({heroSlides.length}টি)</span>
              <span className="text-slate-500 font-normal">সক্রিয় স্লাইডগুলো স্বয়ংক্রিয়ভাবে হোমপেজে দেখাবে</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`rounded-2xl border transition-all overflow-hidden bg-slate-900 text-white flex flex-col justify-between shadow-md relative ${
                    slide.active ? 'border-amber-500/50 ring-2 ring-amber-500/20' : 'border-slate-800 opacity-60'
                  }`}
                >
                  {/* Image Banner Preview */}
                  <div className="h-44 w-full relative bg-slate-950">
                    <img
                      src={slide.image}
                      alt={slide.headingBn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    <span className="absolute top-2 left-2 bg-slate-950/90 backdrop-blur-xs text-amber-400 font-mono font-extrabold text-[10px] px-2.5 py-1 rounded-md border border-slate-800 shadow-md">
                      পজিশন #{idx + 1}
                    </span>

                    {/* Order Control Buttons */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 z-10">
                      <button
                        onClick={() => handleMoveSlideUp(idx)}
                        disabled={idx === 0}
                        className="bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white p-1.5 rounded-lg border border-slate-800 disabled:opacity-30 cursor-pointer transition-colors"
                        title="উপরে সরান"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveSlideDown(idx)}
                        disabled={idx === heroSlides.length - 1}
                        className="bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white p-1.5 rounded-lg border border-slate-800 disabled:opacity-30 cursor-pointer transition-colors"
                        title="নিচে সরান"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleBannerActive(slide.id)}
                      className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center gap-1 border cursor-pointer shadow-md ${
                        slide.active
                          ? 'bg-emerald-500/90 text-white border-emerald-400'
                          : 'bg-rose-500/90 text-white border-rose-400'
                      }`}
                    >
                      {slide.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{slide.active ? 'সক্রিয়' : 'বন্ধ'}</span>
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      {slide.badgeBn && (
                        <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                          {slide.badgeBn}
                        </span>
                      )}
                      <h4 className="font-extrabold text-sm text-white line-clamp-1">
                        {slide.headingBn}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {slide.subheadingBn}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditBannerModal(slide)}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 border border-slate-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>এডিট</span>
                      </button>

                      <button
                        onClick={() => handleDeleteBanner(slide.id)}
                        className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-bold p-2 rounded-xl text-xs border border-rose-500/30 cursor-pointer"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SITE SETTINGS & POPUP CONTROLS */}
      {adminTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-2xs max-w-3xl">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-500" />
              <span>পপআপ ও ডিসপ্লে সেটিংস</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              স্টোরের পপআপ নোটিফিকেশন, মেগা অফার কাউন্টডাউন ও ব্যানার অটো-স্লাইড স্পিড কন্ট্রোল করুন।
            </p>
          </div>

          <div className="space-y-5 text-xs">
            {/* Setting 1: Live Sales Popup Toggle */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-extrabold text-sm text-slate-900 block">
                  ১. অটোমেটিক সেলস পপআপ নোটিফিকেশন (Fake Live Sales Popup)
                </span>
                <p className="text-slate-600 leading-snug">
                  অন থাকলে স্ক্রিনের নিচে কিছুক্ষণ পর পর কাস্টমারদের কেনাকাটার পপআপ দেখাবে। (বর্তমানে আপনার নির্দেশনায় বন্ধ রয়েছে)
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onUpdateSiteSettings({
                    ...siteSettings,
                    enableLiveSalesPopup: !siteSettings.enableLiveSalesPopup,
                  })
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  siteSettings.enableLiveSalesPopup ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    siteSettings.enableLiveSalesPopup ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting 2: Flash Sale Timer Toggle */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-extrabold text-sm text-slate-900 block">
                  ২. সীমিত সময়ের মেগা অফার ও ঘড়ির কাউন্টডাউন টাইমার (Flash Sale Countdown)
                </span>
                <p className="text-slate-600 leading-snug">
                  অন থাকলে হোমপেজে টিক-টক ঘড়ির কাউন্টডাউন টাইমার দেখাবে। (বর্তমানে আপনার নির্দেশনায় বন্ধ রাখা হয়েছে)
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onUpdateSiteSettings({
                    ...siteSettings,
                    enableFlashSaleTimer: !siteSettings.enableFlashSaleTimer,
                  })
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  siteSettings.enableFlashSaleTimer ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    siteSettings.enableFlashSaleTimer ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting 3: Banner Slider Speed */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="font-extrabold text-sm text-slate-900 block">
                ৩. ব্যানার স্লাইড হওয়ার সময় (সেকেন্ডে):
              </label>
              <p className="text-slate-600 leading-snug">
                কত সেকেন্ড পর পর ব্যানার ছবিগুলো স্বয়ংক্রিয়ভাবে স্লাইড হবে।
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={siteSettings.autoSlideSpeed}
                  onChange={(e) =>
                    onUpdateSiteSettings({
                      ...siteSettings,
                      autoSlideSpeed: parseInt(e.target.value) || 5,
                    })
                  }
                  className="w-28 p-2.5 rounded-xl border border-slate-300 font-extrabold text-slate-900 focus:outline-none focus:border-amber-500 bg-white"
                />
                <span className="font-bold text-slate-700">সেকেন্ড</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: SHOPIFY THEME EDITOR & CUSTOMIZER SUITE */}
      {adminTab === 'shopify_customizer' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Banner */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Shopify Theme Customizer & Liquid Engine
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                শপিফাই কাস্টমাইজেশন ও লিকুইড কোড সিংক সেন্টার
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                এই প্যানেল থেকে আপনি সরাসরি অনলাইন স্টোর এর ব্যানার, টেক্সট, হেডার সাইজ, ফন্ট সাইজ, আনলিমিটেড কালার ও গ্র্যাডিয়েন্ট পরিবর্তন করতে পারবেন।
              </p>
            </div>

            <button
              onClick={() => {
                onUpdateSiteSettings({
                  ...siteSettings,
                  storeName,
                  announcementText,
                  whatsappHotline,
                  searchPlaceholder,
                  storeTagline,
                  headerSecondaryText,
                  headerBadgeText,
                  showAnnouncementBar,
                  showHotline,
                  showSearchBar,
                  showLiveBadge,
                  stickyHeader,
                  headerBgColor,
                  headerTextColor,
                  headerAccentColor,
                  announcementBgColor,
                  announcementTextColor,
                  headerGradientMode,
                  headerGradientCss,
                  headerCustomCss,
                  headerPaddingSize,
                  headerFontSize,
                  deliveryFeeInsideDhaka: Number(feeInside),
                  deliveryFeeOutsideDhaka: Number(feeOutside),
                  outletAddressBn: outletAddress
                });
                alert('হেডার কাস্টমাইজেশন সেভ করা হয়েছে!');
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তনসমূহ সেভ ও লাইভ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Live Customizer Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-5 shadow-2xs">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-500" />
                    <span>অনলাইন স্টোর কাস্টমাইজার (Theme Controls)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Shopify Admin &gt; Online Store &gt; Customize এর মতো স্টোর কনফিগার করুন
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                
                {/* Setting 1: Store Name & Text Customizer */}
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="font-extrabold text-slate-900 block text-xs">
                    ১. স্টোরের নাম ও টেক্সট কাস্টমাইজেশন (Store Name & Texts)
                  </label>
                  
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">স্টোরের নাম (Primary Title):</span>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 font-bold focus:border-amber-500 focus:outline-none text-xs"
                      placeholder="SHOP MIX ONLINE BD"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">ট্যাগলাইন (Tagline):</span>
                      <input
                        type="text"
                        value={storeTagline}
                        onChange={(e) => setStoreTagline(e.target.value)}
                        className="w-full bg-white p-2 rounded-xl border border-slate-300 font-medium focus:border-amber-500 focus:outline-none text-xs"
                        placeholder="RichMan.Style"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">দ্বিতীয় সাব-টেক্সট:</span>
                      <input
                        type="text"
                        value={headerSecondaryText}
                        onChange={(e) => setHeaderSecondaryText(e.target.value)}
                        className="w-full bg-white p-2 rounded-xl border border-slate-300 font-medium focus:border-amber-500 focus:outline-none text-xs"
                        placeholder="অফিসিয়াল ফ্ল্যাগশিপ ই-স্টোর"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">লাইভ ব্যাজ টেক্সট (e.g. LIVE / HOT / OFFER):</span>
                    <input
                      type="text"
                      value={headerBadgeText}
                      onChange={(e) => setHeaderBadgeText(e.target.value)}
                      className="w-full bg-white p-2 rounded-xl border border-slate-300 font-bold focus:border-amber-500 focus:outline-none text-xs"
                      placeholder="LIVE"
                    />
                  </div>
                </div>

                {/* Setting 2: Header Height / Banner Size */}
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="font-extrabold text-slate-900 block">
                    ২. হেডারের উচ্চতা ও সাইজ (Header Height / Size)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
                    {[
                      { id: 'small', label: 'স্মল (চিকন)' },
                      { id: 'medium', label: 'নরমাল' },
                      { id: 'large', label: 'লার্জ (চওড়া)' },
                      { id: 'xlarge', label: 'বিশাল (XL)' },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setHeaderPaddingSize(sz.id as any)}
                        className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                          headerPaddingSize === sz.id
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {sz.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Setting 3: Font Size Customization */}
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="font-extrabold text-slate-900 block">
                    ৩. লেখার সাইজ (Header Font Size)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
                    {[
                      { id: 'small', label: 'ছোট' },
                      { id: 'medium', label: 'মাঝারি' },
                      { id: 'large', label: 'বড়' },
                      { id: 'xlarge', label: 'অনেক বড়' },
                    ].map((fs) => (
                      <button
                        key={fs.id}
                        type="button"
                        onClick={() => setHeaderFontSize(fs.id as any)}
                        className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                          headerFontSize === fs.id
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {fs.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Setting 4: Unlimited Colors & Multi-Color Gradient */}
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-900 block">
                      ৪. ব্যাকগ্রাউন্ড কালার ও ২-৪ কালার গ্র্যাডিয়েন্ট
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-amber-600">
                      <input 
                        type="checkbox" 
                        checked={headerGradientMode} 
                        onChange={(e) => setHeaderGradientMode(e.target.checked)}
                        className="rounded accent-amber-500 w-3.5 h-3.5"
                      />
                      <span>মাল্টি-কালার গ্র্যাডিয়েন্ট অন</span>
                    </label>
                  </div>

                  {headerGradientMode ? (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 block">গ্র্যাডিয়েন্ট স্টাইল প্রি-সেট সিলেক্ট করুন:</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setHeaderGradientCss('linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)')}
                          className="p-2 rounded-xl text-white text-left border border-slate-700 shadow-xs cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)' }}
                        >
                          ডার্ক নাইটস (৩ কালার)
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeaderGradientCss('linear-gradient(90deg, #0f172a 0%, #312e81 33%, #581c87 66%, #831843 100%)')}
                          className="p-2 rounded-xl text-white text-left border border-slate-700 shadow-xs cursor-pointer"
                          style={{ background: 'linear-gradient(90deg, #0f172a 0%, #312e81 33%, #581c87 66%, #831843 100%)' }}
                        >
                          রয়েল ৪-কালার স্পেকট্রাম
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeaderGradientCss('linear-gradient(135deg, #064e3b 0%, #022c22 50%, #78350f 100%)')}
                          className="p-2 rounded-xl text-white text-left border border-slate-700 shadow-xs cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 50%, #78350f 100%)' }}
                        >
                          ইমারেল্ড গোল্ডেন লক্স
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeaderGradientCss('linear-gradient(135deg, #4c0519 0%, #881337 50%, #450a0a 100%)')}
                          className="p-2 rounded-xl text-white text-left border border-slate-700 shadow-xs cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #450a0a 100%)' }}
                        >
                          রোজ ভেলভেট রেড
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block mt-2 mb-1">কাস্টম CSS গ্র্যাডিয়েন্ট ফিল্ড:</span>
                        <input
                          type="text"
                          value={headerGradientCss}
                          onChange={(e) => setHeaderGradientCss(e.target.value)}
                          className="w-full bg-white p-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                          placeholder="linear-gradient(...)"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block mb-1">হেডার ব্যাকগ্রাউন্ড:</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={headerBgColor}
                            onChange={(e) => setHeaderBgColor(e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                          />
                          <input 
                            type="text" 
                            value={headerBgColor}
                            onChange={(e) => setHeaderBgColor(e.target.value)}
                            className="w-full bg-white p-1.5 rounded-xl border border-slate-300 font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block mb-1">হেডার টেক্সট কালার:</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={headerTextColor}
                            onChange={(e) => setHeaderTextColor(e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                          />
                          <input 
                            type="text" 
                            value={headerTextColor}
                            onChange={(e) => setHeaderTextColor(e.target.value)}
                            className="w-full bg-white p-1.5 rounded-xl border border-slate-300 font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">অ্যাকসেন্ট কালার:</span>
                      <input 
                        type="color" 
                        value={headerAccentColor}
                        onChange={(e) => setHeaderAccentColor(e.target.value)}
                        className="w-full h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">এনাউন্সমেন্ট ব্যাকগ্রাউন্ড:</span>
                      <input 
                        type="color" 
                        value={announcementBgColor}
                        onChange={(e) => setAnnouncementBgColor(e.target.value)}
                        className="w-full h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">এনাউন্সমেন্ট টেক্সট:</span>
                      <input 
                        type="color" 
                        value={announcementTextColor}
                        onChange={(e) => setAnnouncementTextColor(e.target.value)}
                        className="w-full h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Setting 5: Announcement Bar */}
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-900 block">
                      ৫. টপ এনাউন্সমেন্ট বার (Announcement Text)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-amber-600">
                      <input 
                        type="checkbox" 
                        checked={showAnnouncementBar} 
                        onChange={(e) => setShowAnnouncementBar(e.target.checked)}
                        className="rounded accent-amber-500 w-3.5 h-3.5"
                      />
                      <span>দেখান (ON)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-300 font-medium focus:border-amber-500 focus:outline-none"
                    placeholder="ফ্রি ডেলিভারি অফার পেতে এখনই অর্ডার করুন!"
                  />
                </div>

                {/* Setting 6: WhatsApp Hotline Number */}
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-900 block">
                      ৬. হটলাইন ফোন নম্বর (Hotline Phone)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-amber-600">
                      <input 
                        type="checkbox" 
                        checked={showHotline} 
                        onChange={(e) => setShowHotline(e.target.checked)}
                        className="rounded accent-amber-500 w-3.5 h-3.5"
                      />
                      <span>দেখান (ON)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={whatsappHotline}
                    onChange={(e) => setWhatsappHotline(e.target.value)}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-300 font-bold focus:border-amber-500 focus:outline-none"
                    placeholder="01771357329"
                  />
                </div>

                {/* Setting 7: Search Placeholder */}
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-900 block">
                      ৭. সার্চ বার প্লেসহোল্ডার (Search Placeholder)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-amber-600">
                      <input 
                        type="checkbox" 
                        checked={showSearchBar} 
                        onChange={(e) => setShowSearchBar(e.target.checked)}
                        className="rounded accent-amber-500 w-3.5 h-3.5"
                      />
                      <span>দেখান (ON)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={searchPlaceholder}
                    onChange={(e) => setSearchPlaceholder(e.target.value)}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-300 font-medium focus:border-amber-500 focus:outline-none"
                    placeholder="পণ্য বা সেটিংস খুঁজুন..."
                  />
                </div>

                {/* Setting 8: Custom CSS Area */}
                <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="font-extrabold text-slate-900 block">
                    ৮. কাস্টম সিএসএস (Custom Header CSS)
                  </label>
                  <textarea
                    rows={3}
                    value={headerCustomCss}
                    onChange={(e) => setHeaderCustomCss(e.target.value)}
                    className="w-full bg-white p-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                    placeholder="header { box-shadow: 0 10px 30px rgba(0,0,0,0.5); }"
                  />
                </div>

                {/* Setting 9: Header Feature Toggles */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="font-extrabold text-slate-900 block">
                    ৯. হেডার ফিচার ও লেআউট অন/অফ (Toggles)
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700">
                    <label className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 cursor-pointer hover:border-amber-400">
                      <input 
                        type="checkbox" 
                        checked={showLiveBadge} 
                        onChange={(e) => setShowLiveBadge(e.target.checked)}
                        className="rounded accent-amber-500 w-4 h-4"
                      />
                      <span>[{headerBadgeText}] ব্যাজ দেখান</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 cursor-pointer hover:border-amber-400">
                      <input 
                        type="checkbox" 
                        checked={stickyHeader} 
                        onChange={(e) => setStickyHeader(e.target.checked)}
                        className="rounded accent-amber-500 w-4 h-4"
                      />
                      <span>স্টিকি হেডার অন</span>
                    </label>
                  </div>
                </div>

                {/* Setting 10: Delivery Charges */}
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="font-extrabold text-slate-900 block">
                    ১০. ক্যাশ অন ডেলিভারি চার্জ (BDT)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">ঢাকা সিটি ভেতরে:</span>
                      <input
                        type="number"
                        value={feeInside}
                        onChange={(e) => setFeeInside(Number(e.target.value))}
                        className="w-full bg-white p-2 rounded-xl border border-slate-300 font-bold focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">ঢাকার বাইরে:</span>
                      <input
                        type="number"
                        value={feeOutside}
                        onChange={(e) => setFeeOutside(Number(e.target.value))}
                        className="w-full bg-white p-2 rounded-xl border border-slate-300 font-bold focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Setting 11: Outlet Address */}
                <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="font-extrabold text-slate-900 block">
                    ১১. ফুটারে আউটলেট ও দোকানের ঠিকানা
                  </label>
                  <textarea
                    rows={2}
                    value={outletAddress}
                    onChange={(e) => setOutletAddress(e.target.value)}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-300 font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onUpdateSiteSettings({
                      ...siteSettings,
                      storeName,
                      announcementText,
                      whatsappHotline,
                      searchPlaceholder,
                      storeTagline,
                      headerSecondaryText,
                      headerBadgeText,
                      showAnnouncementBar,
                      showHotline,
                      showSearchBar,
                      showLiveBadge,
                      stickyHeader,
                      headerBgColor,
                      headerTextColor,
                      headerAccentColor,
                      announcementBgColor,
                      announcementTextColor,
                      headerGradientMode,
                      headerGradientCss,
                      headerCustomCss,
                      headerPaddingSize,
                      headerFontSize,
                      deliveryFeeInsideDhaka: Number(feeInside),
                      deliveryFeeOutsideDhaka: Number(feeOutside),
                      outletAddressBn: outletAddress
                    });
                    alert('হেডার কাস্টমাইজেশন সফলভাবে সেভ হয়েছে!');
                  }}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-amber-400 font-extrabold py-3.5 px-4 rounded-2xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>হেডার কাস্টমাইজেশন সেভ ও প্রয়োগ করুন</span>
                </button>
              </div>
            </div>

            {/* Right Column: Liquid Code Inspector Suite (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-2xs flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <Code className="w-4 h-4 text-amber-500" />
                      <span>Shopify Liquid Code Exporter Suite</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Shopify Theme-এ ইম্পোর্ট করার জন্য লিকুইড সেকশন কোড
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedLiquid.code);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2500);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 transition-all"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'কপি হয়েছে!' : 'কোড কপি করুন'}</span>
                  </button>
                </div>

                {/* File Template Buttons Grid */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {SHOPIFY_LIQUID_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedLiquid(tmpl)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer shrink-0 ${
                        selectedLiquid.id === tmpl.id
                          ? 'bg-slate-950 text-amber-400 border-slate-950 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tmpl.filename}
                    </button>
                  ))}
                </div>

                {/* Selected File Details */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-900 block">{selectedLiquid.filename}</span>
                    <span className="text-[11px] text-slate-500">{selectedLiquid.description}</span>
                  </div>
                </div>

                {/* Code Viewer Block */}
                <div className="bg-slate-950 text-amber-300/90 rounded-2xl p-4 font-mono text-[11px] overflow-x-auto max-h-[340px] border border-slate-800 shadow-inner leading-relaxed">
                  <pre>{selectedLiquid.code}</pre>
                </div>
              </div>

              {/* Instructions Guide Footer */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1 mt-2">
                <span className="font-extrabold flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>শপিফাই কাস্টমাইজ গাইড (How to Use in Shopify):</span>
                </span>
                <p className="text-[11px] text-amber-900/90 font-medium leading-relaxed">
                  ১. শপিফাই এডমিনে গিয়ে <strong className="text-amber-950">Online Store &gt; Themes &gt; Edit Code</strong> পেজে যান। <br />
                  ২. উপরের নির্বাচিত ফাইলের নামে একটি নতুন সেকশন/স্নিপেট বানিয়ে এই কোডটি পেস্ট করে দিন। <br />
                  ৩. এরপর <strong className="text-amber-950">Online Store &gt; Customize</strong> কাস্টমাইজারে গেলেই নতুন এই লেআউট এবং অপশনগুলো সরাসরি পেয়ে যাবেন!
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Add / Edit Banner Slide Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-4 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingBanner ? 'ব্যানার স্লাইড এডিট করুন' : 'নতুন ব্যানার স্লাইড যোগ করুন'}
              </h3>
              <button onClick={() => setShowBannerModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBannerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">শিরোনাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={bannerHeading}
                  onChange={(e) => setBannerHeading(e.target.value)}
                  placeholder="যেমন: ৬ পকেট প্রিমিয়াম স্ট্রেচ কার্গো জগার্স প্যান্ট"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ছোট বিবরণ (বাংলা)</label>
                <textarea
                  rows={2}
                  value={bannerSubheading}
                  onChange={(e) => setBannerSubheading(e.target.value)}
                  placeholder="যেমন: ফ্রি ডেলিভারি! ২ পিস কম্বো মাত্র ১৫৯৯ টাকা!"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ছবির লিংক (Image URL) *</label>
                <input
                  type="url"
                  required
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
                
                {/* Quick Sample Image Presets */}
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block">কুইক প্রিসেট ইমেজ সিলেক্ট করুন:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'কার্গো প্যান্ট', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1200' },
                      { name: 'প্রিমিয়াম পাঞ্জাবি', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200' },
                      { name: 'স্মার্টওয়াচ', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200' },
                      { name: 'সিল্ক শাড়ি', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200' },
                      { name: 'ইয়ারবাডস', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1200' },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setBannerImage(preset.url)}
                        className="bg-slate-100 hover:bg-amber-100 hover:text-amber-900 hover:border-amber-300 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200 cursor-pointer transition-colors"
                      >
                        📷 {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {bannerImage && (
                  <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative">
                    <img src={bannerImage} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-2 bg-slate-950/80 text-amber-400 font-mono text-[9px] px-1.5 py-0.5 rounded">
                      লাইভ প্রিভিউ
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">প্রোমো ট্যাগ</label>
                  <input
                    type="text"
                    value={bannerBadge}
                    onChange={(e) => setBannerBadge(e.target.value)}
                    placeholder="যেমন: CARGO JOGGER"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">অফার লেবেল</label>
                  <input
                    type="text"
                    value={bannerDiscountBadge}
                    onChange={(e) => setBannerDiscountBadge(e.target.value)}
                    placeholder="যেমন: ২ পিস ৳১৫৯৯"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">বাটন টেক্সট</label>
                <input
                  type="text"
                  value={bannerCta}
                  onChange={(e) => setBannerCta(e.target.value)}
                  placeholder="যেমন: 🛒 এখন অর্ডার করুন"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl shadow-md transition-all text-xs cursor-pointer mt-2"
              >
                {editingBanner ? 'পরিবর্তন সংরক্ষণ করুন' : 'নতুন ব্যানার স্লাইড সেভ করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">স্টোরে নতুন পণ্য যোগ করুন</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">পণ্য নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  placeholder="যেমন: প্রিমিয়াম সিল্ক কটন শাড়ি"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">পণ্য নাম (English) *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Premium Silk Cotton Saree"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মূল দাম (৳)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="2500"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">অফার দাম (৳)</label>
                  <input
                    type="number"
                    required
                    value={newOfferPrice}
                    onChange={(e) => setNewOfferPrice(e.target.value)}
                    placeholder="1800"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl shadow-md transition-all text-xs cursor-pointer mt-2"
              >
                পণ্যটি পাবলিশ করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

