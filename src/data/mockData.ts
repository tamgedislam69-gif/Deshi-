import { Product, DistrictInfo, Order, HeroSlide, SiteSettings } from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  enableLiveSalesPopup: false, // Disabled as requested
  enableFlashSaleTimer: false, // Disabled as requested
  autoSlideSpeed: 5,
  slideTransitionEffect: 'fade',
  showSliderArrows: true,
  showSliderDots: true,
  storeName: 'SHOP MIX ONLINE BD',
  announcementText: 'ফ্রি ডেলিভারি অফার পেতে এখনই অর্ডার করুন!',
  showAnnouncementBar: true,
  whatsappHotline: '01771357329',
  showHotline: true,
  storeTagline: 'RichMan.Style',
  searchPlaceholder: 'পণ্য বা সেটিংস খুঁজুন...',
  showSearchBar: true,
  headerBgColor: '#0f172a',
  headerTextColor: '#ffffff',
  headerAccentColor: '#f59e0b',
  announcementBgColor: '#020617',
  announcementTextColor: '#f8fafc',
  headerGradientMode: true,
  headerGradientCss: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
  headerCustomCss: '',
  headerPaddingSize: 'medium',
  headerFontSize: 'medium',
  headerSecondaryText: 'অফিসিয়াল ফ্ল্যাগশিপ ই-স্টোর',
  headerBadgeText: 'LIVE',
  stickyHeader: true,
  showLiveBadge: true,
  deliveryFeeInsideDhaka: 60,
  deliveryFeeOutsideDhaka: 120,
  outletAddressBn: 'খিলগাঁও আউটলেট, ঢাকা-১২১৯। প্রতিদিন খোলা।',
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badgeBn: 'CARGO JOGGER PREMIUM QUALITY',
    headingBn: '৬ পকেট প্রিমিয়াম স্ট্রেচ কার্গো জগার্স প্যান্ট',
    subheadingBn: 'ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! ১০০% কটন ও ২% স্প্যান্ডেক্স ফ্যাব্রিক। ২ পিস কম্বো মাত্র ১৫৯৯ টাকা!',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1200',
    ctaTextBn: '🛒 এখন অর্ডার করুন',
    secondaryCtaTextBn: 'বিস্তারিত দেখুন',
    discountBadge: '৳ ৮৯৯ / ২ পিস ৳১৫৯৯',
    active: true,
    linkCategory: 'combo_offers'
  },
  {
    id: 'slide-2',
    badgeBn: 'গ্র্যান্ড ডিসকাউন্ট মেলা ২০২৬',
    headingBn: 'রয়্যাল পাঞ্জাবি ও প্রিমিয়াম ঢাকাই জামদানি কালেকশন',
    subheadingBn: 'সারাদেশে ক্যাশ অন ডেলিভারিতে অরিজিনাল কটন পাঞ্জাবি ও তাঁতের জামদানি শাড়িতে পাচ্ছেন সর্বোচ্চ ৪০% ছাড়!',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200',
    ctaTextBn: 'অর্ডার করুন',
    secondaryCtaTextBn: 'ট্র্যাক করুন',
    discountBadge: '৪০% পর্যন্ত ছাড়',
    active: true,
    linkCategory: 'mens_fashion'
  },
  {
    id: 'slide-3',
    badgeBn: 'লেটেস্ট গ্যাজেট স্পেশাল',
    headingBn: 'স্মার্টওয়াচ ও নয়েজ ক্যান্সেলেশন ওয়্যারলেস ইয়ারবাডস',
    subheadingBn: '৩৬ ঘণ্টা ব্যাটারি লাইফ, এইচডি অলওয়েজ-অন ডিসপ্লে ও ১ বছরের ওয়ারেন্টি সহ অরিজিনাল টেক গ্যাজেট।',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200',
    ctaTextBn: 'গ্যাজেট দেখুন',
    secondaryCtaTextBn: 'অফার দেখুন',
    discountBadge: 'ফ্রি শিপিং',
    active: true,
    linkCategory: 'gadgets'
  }
];

export const BANGLADESHI_DISTRICTS: DistrictInfo[] = [
  {
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    thanas: ['Dhanmondi (ধানমন্ডি)', 'Gulshan (গুলশান)', 'Uttara (উত্তরা)', 'Mirpur (মিরপুর)', 'Banani (বনানী)', 'Mohammadpur (মোহাম্মদপুর)', 'Badda (বাড্ডা)', 'Tejgaon (তেজগাঁও)', 'Old Dhaka (পুরান ঢাকা)', 'Savār (সাভার)', 'Keraniganj (কেরানীগঞ্জ)']
  },
  {
    name: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    thanas: ['Kotwali (কোতোয়ালি)', 'Panchlaish (পাঁচলাইশ)', 'Agrabad (আগ্রাবাদ)', 'Halishahar (হালিশহর)', 'Double Mooring (ডাবল মুরিং)', 'Hathazari (হাটহাজারী)']
  },
  {
    name: 'Sylhet',
    nameBn: 'সিলেট',
    thanas: ['Zindabazar (জিন্দাবাজার)', 'Srimangal (শ্রীমঙ্গল)', 'Jal witness (জেল রোড)', 'Shah Poran (শাহ পরান)', 'Beanibazar (বিয়ানীবাজার)']
  },
  {
    name: 'Cumilla',
    nameBn: 'কুমিল্লা',
    thanas: ['Kandirpar (কান্দিরপাড়)', 'Kotwali (কোতোয়ালি)', 'Laksham (লাকসাম)', 'Daudkandi (দাউদকান্দি)']
  },
  {
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    thanas: ['Boalia (বোয়ালিয়া)', 'Rajpara (রাজপাড়া)', 'Motihar (মতিহার)', 'Paba (পবা)']
  },
  {
    name: 'Khulna',
    nameBn: 'খুলনা',
    thanas: ['Sonadanga (সোনাডাঙ্গা)', 'Khalishpur (খালিশপুর)', 'Daulatpur (দৌলতপুর)', 'Kotwali (কোতোয়ালি)']
  },
  {
    name: 'Barishal',
    nameBn: 'বরিশাল',
    thanas: ['Sadat Tola (সদর)', 'Gournadi (গৌরনদী)', 'Bakerganj (বাকেরগঞ্জ)']
  },
  {
    name: 'Rangpur',
    nameBn: 'রংপুর',
    thanas: ['Kotwali (কোতোয়ালি)', 'Tajhat (tajhat)', 'Mithapukur (মিঠাপুকুর)']
  },
  {
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    thanas: ['Kotwali (কোতোয়ালি)', 'Muktagacha (মুক্তাগাছা)', 'Trishal (ত্রিশাল)']
  },
  {
    name: 'Narayanganj',
    nameBn: 'নারায়ণগঞ্জ',
    thanas: ['Sadar (সদর)', 'Siddhirganj (সিদ্ধিরগঞ্জ)', 'Fatullah (ফতুল্লা)', 'Rupganj (রূপগঞ্জ)']
  },
  {
    name: 'Gazipur',
    nameBn: 'গাজীপুর',
    thanas: ['Sadar (সদর)', 'Tongi (টঙ্গী)', 'Board Bazar (বোর্ড বাজার)', 'Konabari (কোনাবাড়ী)']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', nameBn: 'সকল পণ্য', count: 24, icon: '🔥' },
  { id: 'combo_offers', name: 'Combo Offer', nameBn: 'কম্বো অফার', count: 15, icon: '🩳' },
  { id: 'jogger_pants', name: 'Joggers Pant', nameBn: 'জগার প্যান্ট', count: 6, icon: '👖' },
  { id: 'cargo_pants', name: 'Cargo Pants', nameBn: 'কার্গো প্যান্ট', count: 8, icon: '👖' },
  { id: 'mens_fashion', name: "Men's Fashion", nameBn: 'পুরুষের পোশাক', count: 12, icon: '👔' },
  { id: 'womens_fashion', name: "Women's Collection", nameBn: 'নারীদের ফ্যাশন', count: 8, icon: '👗' },
  { id: 'gadgets', name: 'Gadgets & Tech', nameBn: 'গ্যাজেট ও টেক', count: 10, icon: '🎧' },
  { id: 'footwear_leather', name: 'Leather & Accessories', nameBn: 'লেদার ও অ্যাকসেসরিজ', count: 6, icon: '👞' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-cargo-2pc-01',
    sku: 'RM-CRG-2PC',
    title: '2 Pcs 6 Pocket Cargo Jogger Pants Combo',
    titleBn: '২ পিস ৬ পকেট কার্গো জগার্স প্যান্ট',
    category: 'combo_offers',
    categoryBn: 'কম্বো অফার',
    originalPrice: 2500,
    offerPrice: 1599,
    discountPercent: 36,
    rating: 4.9,
    reviewsCount: 384,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Olive Green & Khaki', nameBn: 'অলিভ গ্রিন ও খাকি', hex: '#3f6212' },
      { name: 'Black & Navy Blue', nameBn: 'ব্ল্যাক ও নেভি ব্লু', hex: '#0f172a' },
      { name: 'Khaki & Charcoal', nameBn: 'খাকি ও চারকোল', hex: '#78350f' },
      { name: 'Light Gray & Navy', nameBn: 'লাইট গ্রে ও নেভি', hex: '#64748b' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    description: 'Premium quality 6-pocket cargo jogger pants combo. 98% Cotton + 2% Spandex blend for ultimate comfort, stretchability and style.',
    descriptionBn: 'আধুনিক লুক, আরামদায়ক ফিট এবং দৈনন্দিন ব্যবহারের জন্য কার্যকর কার্গো ডিজাইন—সবকিছু একসাথে। প্রিমিয়াম ৯৮% কটন ও ২% স্প্যান্ডেক্স কাপড়।',
    inStock: true,
    isNewArrival: true,
    isSpecialOffer: true,
    tags: ['Best Seller', '2 Pcs Combo', 'Cargo Joggers', 'Free Delivery']
  },
  {
    id: 'prod-cargo-single-01',
    sku: 'RM-CRG-SGL',
    title: 'Premium Stretchable Cargo Jogger Pant (Single)',
    titleBn: '৬ পকেট প্রিমিয়াম স্ট্রেচ কার্গো জগার্স প্যান্ট',
    category: 'jogger_pants',
    categoryBn: 'জগার প্যান্ট',
    originalPrice: 1250,
    offerPrice: 899,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 196,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Military Olive', nameBn: 'মিলিটারি অলিভ', hex: '#3f6212' },
      { name: 'Jet Black', nameBn: 'জেট ব্ল্যাক', hex: '#09090b' },
      { name: 'Desert Khaki', nameBn: 'ডেজার্ট খাকি', hex: '#b45309' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    description: 'Single piece premium cargo jogger pant with YKK zipper, drawstrings elastic waist and tapered jogger cuff.',
    descriptionBn: 'নিচের ইলাস্টিক কাফ প্যান্টকে স্মার্ট টেপার্ড লুক দেয় এবং জুতোর সঙ্গে সুন্দরভাবে মানিয়ে যায়। এ-গ্রেড ওয়াইকেকে জিপার ও পরিপাটি স্টিচিং।',
    inStock: true,
    isNewArrival: true,
    isSpecialOffer: true,
    tags: ['Single Pant', 'Cargo Jogger']
  },
  {
    id: 'prod-101',
    sku: 'DS-PNJ-2026',
    title: 'Royal Heritage Slim Fit Cotton Panjabi',
    titleBn: 'রয়্যাল হেরিটেজ প্রিমিয়াম কটিন স্লিম ফিট পাঞ্জাবি',
    category: 'mens_fashion',
    categoryBn: 'পুরুষের পোশাক',
    originalPrice: 2450,
    offerPrice: 1650,
    discountPercent: 33,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Royal White', nameBn: 'রয়্যাল হোয়াইট', hex: '#ffffff' },
      { name: 'Midnight Navy', nameBn: 'মিডনাইট নেভি', hex: '#1e293b' },
      { name: 'Olive Green', nameBn: 'অলিভ গ্রিন', hex: '#3f6212' },
      { name: 'Golden Cream', nameBn: 'গোল্ডেন ক্রিম', hex: '#fef08a' }
    ],
    sizes: ['M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    description: 'Elevate your festive look with 100% pure combed breathable cotton fabric featuring exquisite thread embroidery on the collar and placket.',
    descriptionBn: '১০০% পিওর প্রিমিয়াম কম্বড কটন ফ্যাব্রিক দিয়ে তৈরি। কলার এবং প্লেকেটে সুক্ষ্ম থ্রেড এমব্রয়ডারি ওয়ার্ক, অত্যন্ত আরামদায়ক ও ট্রেন্ডি স্লিম ফিট কাটিং।',
    inStock: true,
    isNewArrival: true,
    isSpecialOffer: true,
    tags: ['Best Seller', 'Eid Special', 'Cotton Panjabi']
  },
  {
    id: 'prod-102',
    sku: 'DS-JMD-309',
    title: 'Handloom Dhakai Jamdani Soft Cotton Saree',
    titleBn: 'প্রিমিয়াম হ্যান্ডলুম ঢাকাই জামদানি সফট কটন শাড়ি',
    category: 'womens_fashion',
    categoryBn: 'নারীদের ফ্যাশন',
    originalPrice: 4200,
    offerPrice: 2850,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Crimson Red & Gold', nameBn: 'লাল ও সোনালী', hex: '#dc2626' },
      { name: 'Emerald Green', nameBn: 'পান্না সবুজ', hex: '#047857' },
      { name: 'Pastel Pink', nameBn: 'প্যাস্টেল পিঙ্ক', hex: '#f472b6' }
    ],
    sizes: ['12 Haat (Standard Free Size)'],
    description: 'Authentic 80-count soft weave Dhakai Jamdani saree crafted by traditional weavers in Narayanganj. Soft skin-friendly feel with matching blouse piece.',
    descriptionBn: 'নারায়ণগঞ্জের তাঁতিদের হাতে বোনা ট্র্যাডিশনাল ৮০ কাউন্ট ঢাকাই জামদানি শাড়ি। নরম সুতা দিয়ে তৈরি, পরতে অত্যন্ত আরামদায়ক। সাথে রানিং ব্লাউজ পিস রয়েছে।',
    inStock: true,
    isNewArrival: true,
    tags: ['Traditional', 'Saree', 'Jamdani']
  },
  {
    id: 'prod-103',
    sku: 'DS-TWS-900',
    title: 'Pro Sound Wireless ANC Earbuds (36h Battery)',
    titleBn: 'প্রো সাউন্ড ওয়্যারলেস ANC ইয়ারবাডস (৩৬ ঘণ্টা ব্যাকআপ)',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট ও টেক',
    originalPrice: 2800,
    offerPrice: 1490,
    discountPercent: 47,
    rating: 4.7,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Black', nameBn: 'ম্যাট ব্ল্যাক', hex: '#0f172a' },
      { name: 'Glossy White', nameBn: 'গ্লসি হোয়াইট', hex: '#f8fafc' }
    ],
    sizes: ['Standard'],
    description: 'Features Active Noise Cancellation (ANC), Quad Mic for crystal clear calling, IPX5 Splashproof rating, and Type-C Fast Charging.',
    descriptionBn: 'এক্টিভ নয়েজ ক্যান্সেলেশন (ANC), স্ফটিকের মতো স্পষ্ট এইচডি কলিংয়ের জন্য কোয়াড মাইক্রোফোন, ৩৬ ঘণ্টার দীর্ঘ ব্যাটারি ব্যাকআপ এবং টাইপ-সি ফাস্ট চার্জিং।',
    inStock: true,
    isSpecialOffer: true,
    tags: ['TWS', 'ANC', 'Fast Charge']
  },
  {
    id: 'prod-104',
    sku: 'DS-LTH-012',
    title: 'Full Grain Leather Bifold Executive Wallet',
    titleBn: '১০০% পিওর লেদার এক্সিকিউটিভ বাইফোল্ড ওয়ালেট',
    category: 'footwear_leather',
    categoryBn: 'লেদার ও অ্যাকসেসরিজ',
    originalPrice: 1600,
    offerPrice: 990,
    discountPercent: 38,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Rich Tan Brown', nameBn: 'রিচ ট্যান ব্রাউন', hex: '#78350f' },
      { name: 'Classic Black', nameBn: 'ক্লাসিক ব্ল্যাক', hex: '#18181b' }
    ],
    sizes: ['Standard Bifold'],
    description: 'Crafted from 100% genuine full grain cow leather with RFID blocking protection, 8 card slots, and dual currency compartments.',
    descriptionBn: '১০০% অরিজিনাল কাঁচা চামড়া (Full Grain Cow Leather) দিয়ে তৈরি। এতে রয়েছে ৮টি কার্ড স্লট, ২ টি ক্যাশ চেম্বার এবং RFID ব্লকিং নিরাপত্তা। ৫ বছরের লেদার গ্যারান্টি!',
    inStock: true,
    tags: ['Genuine Leather', 'RFID Protected', 'Gift Box']
  },
  {
    id: 'prod-105',
    sku: 'DS-WCH-880',
    title: 'Chronograph Stainless Steel Luxury Watch for Men',
    titleBn: 'ক্রোনোগ্রাফ স্টেইনলেস স্টিল লাক্সারি ওয়াচ',
    category: 'mens_fashion',
    categoryBn: 'পুরুষের পোশাক',
    originalPrice: 3500,
    offerPrice: 2190,
    discountPercent: 37,
    rating: 4.8,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Silver Blue Dial', nameBn: 'সিলভার ব্লু ডায়াল', hex: '#2563eb' },
      { name: 'Gold Emerald', nameBn: 'গোল্ড এমারেল্ড', hex: '#047857' },
      { name: 'All Black Edition', nameBn: 'অল ব্ল্যাক এডিশন', hex: '#020617' }
    ],
    sizes: ['Adjustable Bracelet'],
    description: 'Japanese quartz movement with working sub-dials, scratch-resistant sapphire crystal glass, and 30m water resistance rating.',
    descriptionBn: 'জাপানিজ কোয়ার্টজ মুভমেন্ট, ওয়ার্কিং ক্রোনোগ্রাফ সাব-ডায়াল, স্ক্র্যাচ-রেজিস্ট্যান্ট ক্রিস্টাল গ্লাস এবং ৩০ মিটার ওয়াটার রেজিস্ট্যান্ট ওয়াচ।',
    inStock: true,
    isNewArrival: true,
    tags: ['Luxury Watch', 'Waterproof']
  },
  {
    id: 'prod-106',
    sku: 'DS-SLW-405',
    title: 'Designer Ready-to-Wear Cotton Salwar Suit Set',
    titleBn: 'ডিজাইনার রেডি-টু-ওয়্যার থ্রি-পিস সুতি সালোয়ার স্যুট',
    category: 'womens_fashion',
    categoryBn: 'নারীদের ফ্যাশন',
    originalPrice: 3200,
    offerPrice: 2250,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Teal Green', nameBn: 'টিল গ্রিন', hex: '#0d9488' },
      { name: 'Maroon Gold', nameBn: 'মেরুন গোল্ড', hex: '#881337' },
      { name: 'Mustard Yellow', nameBn: 'মাস্টার্ড ইয়েলো', hex: '#eab308' }
    ],
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    description: '3-Piece set includes stitched Kurti kameez, comfortable salwar pant, and long chiffon dupatta with delicate foil print detailing.',
    descriptionBn: 'সেলাই করা সুতি কামিজ, সালোয়ার প্যান্ট এবং দীর্ঘ সফট শিফন ওড়না সহ থ্রি-পিস সেট। ফ্যাব্রিক মোলায়েন এবং দীর্ঘস্থায়ী রঙের নিশ্চয়তা।',
    inStock: true,
    isSpecialOffer: true,
    tags: ['3-Piece', 'Cotton Salwar', 'Ready To Wear']
  },
  {
    id: 'prod-107',
    sku: 'DS-SMW-500',
    title: 'Ultra HD AMOLED Smart Watch with BT Calling',
    titleBn: 'আল্ট্রা এইচডি AMOLED ব্লুটুথ কলিং স্মার্টওয়াচ',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট ও টেক',
    originalPrice: 3900,
    offerPrice: 2490,
    discountPercent: 36,
    rating: 4.8,
    reviewsCount: 173,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Graphite Black', nameBn: 'গ্রাফাইট ব্ল্যাক', hex: '#18181b' },
      { name: 'Ocean Blue', nameBn: 'ওশান ব্লু', hex: '#0284c7' },
      { name: 'Silver Grey', nameBn: 'সিলভার গ্রে', hex: '#94a3b8' }
    ],
    sizes: ['Standard Curved Display'],
    description: '1.96-inch AMOLED display with Always-On screen, 100+ sport modes, Heart Rate & SpO2 monitors, and zinc alloy metal body.',
    descriptionBn: '১.৯৬ ইঞ্চি ব্রাইট AMOLED ডিসপ্লে, সার্বক্ষণিক অলওয়েজ-অন মোড, সরাসরি ঘড়ি দিয়ে কথা বলার সুবিধা (BT Calling), ১০০টির বেশি স্পোর্টস মোড এবং মেটাল বডি।',
    inStock: true,
    isNewArrival: true,
    tags: ['Smartwatch', 'AMOLED', 'BT Calling']
  },
  {
    id: 'prod-108',
    sku: 'DS-BAG-601',
    title: 'Premium Leather Convertible Office Laptop Bag',
    titleBn: 'প্রিমিয়াম জেনুইন লেদার অফিস ল্যাপটপ ব্যাগ',
    category: 'footwear_leather',
    categoryBn: 'লেদার ও অ্যাকসেসরিজ',
    originalPrice: 4800,
    offerPrice: 3350,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Dark Brown', nameBn: 'ভিন্টেজ ডার্ক ব্রাউন', hex: '#451a03' },
      { name: 'Sleek Black', nameBn: 'স্লিক ব্ল্যাক', hex: '#09090b' }
    ],
    sizes: ['Fits up to 15.6" Laptop'],
    description: 'Padded laptop sleeve compartment, waterproof brass YKK zippers, heavy-duty adjustable shoulder strap, and multiple organizer pockets.',
    descriptionBn: '১৫.৬ ইঞ্চি ল্যাপটপ প্যাডেড সেফটি স্লট, আসল ওয়াইকেকে মেটাল জিপার, ওয়াটার-রেজিস্ট্যান্ট টেকসই চামড়া। অফিস ও বিজনেস ট্রাভেলের জন্য পারফেক্ট।',
    inStock: true,
    tags: ['Office Bag', 'Laptop Bag', 'Genuine Leather']
  }
];

export const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-1001',
    createdAt: '2026-08-16 10:15 AM',
    customer: {
      fullName: 'Tanvir Hossain',
      mobileNumber: '01712345678',
      deliveryZone: 'inside_dhaka',
      address: 'House #42, Road #11, Block D',
      district: 'Dhaka',
      thana: 'Dhanmondi (ধানমন্ডি)',
      orderNote: 'Please call before delivery'
    },
    items: [
      {
        id: 'cart-1',
        product: MOCK_PRODUCTS[0],
        selectedColor: MOCK_PRODUCTS[0].colors[1],
        selectedSize: 'L (42)',
        quantity: 1
      }
    ],
    subtotal: 1650,
    deliveryFee: 60,
    totalAmount: 1710,
    status: 'In Courier',
    paymentMethod: 'Cash on Delivery',
    trackingCourier: 'Pathao Courier',
    trackingId: 'PTH-8849201',
    internalNotes: 'Customer requested delivery after 3 PM.',
    history: [
      { status: 'Pending', timestamp: '2026-08-16 10:15 AM', note: 'Order placed via Cash on Delivery' },
      { status: 'Confirmed', timestamp: '2026-08-16 11:00 AM', note: 'Verified phone number via call' },
      { status: 'In Courier', timestamp: '2026-08-16 02:30 PM', note: 'Handed over to Pathao Express' }
    ]
  },
  {
    id: '#ORD-1002',
    createdAt: '2026-08-16 11:45 AM',
    customer: {
      fullName: 'Nusrat Jahan',
      mobileNumber: '01898765432',
      deliveryZone: 'outside_dhaka',
      address: 'Near Agrabad Access Road, Cinema Palace Area',
      district: 'Chattogram',
      thana: 'Agrabad (আগ্রাবাদ)',
      orderNote: 'Gift packing if possible'
    },
    items: [
      {
        id: 'cart-2',
        product: MOCK_PRODUCTS[1],
        selectedColor: MOCK_PRODUCTS[1].colors[0],
        selectedSize: '12 Haat (Standard Free Size)',
        quantity: 1
      }
    ],
    subtotal: 2850,
    deliveryFee: 120,
    totalAmount: 2970,
    status: 'Confirmed',
    paymentMethod: 'Cash on Delivery',
    trackingCourier: 'Steadfast Courier',
    internalNotes: 'Confirmed by Admin Nusrat on WhatsApp.',
    history: [
      { status: 'Pending', timestamp: '2026-08-16 11:45 AM', note: 'Order submitted online' },
      { status: 'Confirmed', timestamp: '2026-08-16 12:10 PM', note: 'Order confirmed with customer' }
    ]
  },
  {
    id: '#ORD-1003',
    createdAt: '2026-08-16 12:30 PM',
    customer: {
      fullName: 'Dr. Mahmudur Rahman',
      mobileNumber: '01511223344',
      deliveryZone: 'inside_dhaka',
      address: 'Flat 4B, Green Road Doctor Colony',
      district: 'Dhaka',
      thana: 'Tejgaon (তেজগাঁও)',
      orderNote: ''
    },
    items: [
      {
        id: 'cart-3',
        product: MOCK_PRODUCTS[2],
        selectedColor: MOCK_PRODUCTS[2].colors[0],
        selectedSize: 'Standard',
        quantity: 2
      }
    ],
    subtotal: 2980,
    deliveryFee: 60,
    totalAmount: 3040,
    status: 'Pending',
    paymentMethod: 'Cash on Delivery',
    internalNotes: 'Awaiting phone confirmation call.',
    history: [
      { status: 'Pending', timestamp: '2026-08-16 12:30 PM', note: 'New COD order received' }
    ]
  }
];
