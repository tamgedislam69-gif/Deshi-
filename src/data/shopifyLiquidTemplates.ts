export interface LiquidTemplate {
  id: string;
  title: string;
  filename: string;
  description: string;
  code: string;
}

export const SHOPIFY_LIQUID_TEMPLATES: LiquidTemplate[] = [
  {
    id: 'announcement-bar',
    title: 'Top Announcement Bar',
    filename: 'sections/announcement-bar.liquid',
    description: 'Header ticker with live status indicator, phone shortcut, and delivery banner.',
    code: `{% comment %}
  DeshiStore Announcement Bar Section
  Compatible with Shopify Dawn & Custom Themes
{% endcomment %}

<div class="announcement-bar bg-slate-950 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-slate-800">
  <div class="flex items-center gap-2">
    {% if section.settings.show_live_badge %}
      <span class="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-400 font-semibold px-2 py-0.5 rounded-full border border-rose-500/30">
        <span class="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
        {{ section.settings.live_text | default: 'LIVE' }}
      </span>
    {% endif %}
    <span class="font-medium text-slate-300 hidden sm:inline">
      {{ section.settings.announcement_text }}
    </span>
  </div>

  <div class="flex items-center gap-4 text-slate-300">
    {% if section.settings.whatsapp_phone != blank %}
      <a href="https://wa.me/{{ section.settings.whatsapp_phone | replace: ' ', '' | replace: '+', '' }}" target="_blank" class="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
        <span class="font-semibold">{{ section.settings.whatsapp_phone }}</span>
      </a>
    {% endif %}
  </div>
</div>

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_live_badge",
      "label": "Show Live Indicator",
      "default": true
    },
    {
      "type": "text",
      "id": "live_text",
      "label": "Live Badge Text",
      "default": "LIVE SALE"
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement Banner Text",
      "default": "সারাদেশে ক্যাশ অন ডেলিভারি এবং ফ্রি শিপিং অফার!"
    },
    {
      "type": "text",
      "id": "whatsapp_phone",
      "label": "WhatsApp Hotline",
      "default": "+880 1700-000000"
    }
  ],
  "presets": [
    {
      "name": "Default Announcement Bar"
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'category-circles',
    title: 'Category Circles Section',
    filename: 'sections/category-circles.liquid',
    description: 'Round category icons/avatars with quick navigation links.',
    code: `{% comment %}
  DeshiStore Round Category Circles Section
{% endcomment %}

<div class="max-w-7xl mx-auto px-4 py-6">
  <div class="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-4">
    <h3 class="text-xs font-black uppercase tracking-wider text-slate-500">জনপ্রিয় ক্যাটাগরি</h3>
    <a href="/collections/all" class="text-xs font-bold text-amber-600 hover:underline">সব ক্যাটালগ &rarr;</a>
  </div>

  <div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
    {% for collection in collections limit: 6 %}
      <a href="{{ collection.url }}" class="flex flex-col items-center gap-2 shrink-0 group transition-transform hover:scale-105">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-slate-200 group-hover:border-amber-500 flex items-center justify-center shadow-md overflow-hidden p-1">
          {% if collection.image %}
            <img src="{{ collection.image | image_url: width: 200 }}" alt="{{ collection.title }}" class="w-full h-full object-cover rounded-full">
          {% else %}
            <span class="text-2xl">🛍️</span>
          {% endif %}
        </div>
        <span class="text-xs font-bold text-slate-800 group-hover:text-amber-600 text-center max-w-[85px] truncate">
          {{ collection.title }}
        </span>
      </a>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Category Circles",
  "presets": [{ "name": "Category Circles" }]
}
{% endschema %}`
  },
  {
    id: 'flash-sale',
    title: 'Flash Sale Countdown Section',
    filename: 'sections/flash-sale.liquid',
    description: 'Urgent countdown timer with stock bar and promo CTA.',
    code: `{% comment %}
  DeshiStore Flash Sale Section
{% endcomment %}

<div class="max-w-7xl mx-auto px-4 my-8">
  <div class="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
    <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
      <div class="space-y-2 text-center lg:text-left">
        <div class="inline-flex items-center gap-2 bg-rose-600 text-white font-black text-xs px-3.5 py-1 rounded-full shadow-lg">
          <span>🔥 ফ্ল্যাশ সেল - ৪০% পর্যন্ত ছাড়!</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {{ section.settings.heading | default: 'সীমিত সময়ের মেগা অফার' }}
        </h3>
        <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-md">
          {{ section.settings.subheading | default: 'অফারটি শেষ হওয়ার আগেই আপনার পছন্দের পণ্য ১-ক্লিকে ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন।' }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 bg-slate-900 border border-amber-500/40 rounded-2xl flex items-center justify-center text-xl font-black font-mono text-amber-400" id="timer-hours">05</div>
          <span class="text-[10px] font-bold text-slate-400 uppercase mt-1">ঘণ্টা</span>
        </div>
        <span class="text-xl font-bold text-amber-400 pb-4">:</span>
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 bg-slate-900 border border-amber-500/40 rounded-2xl flex items-center justify-center text-xl font-black font-mono text-amber-400" id="timer-minutes">42</div>
          <span class="text-[10px] font-bold text-slate-400 uppercase mt-1">মিনিট</span>
        </div>
        <span class="text-xl font-bold text-amber-400 pb-4">:</span>
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black font-mono shadow-inner animate-pulse" id="timer-seconds">19</div>
          <span class="text-[10px] font-bold text-rose-400 uppercase mt-1">সেকেন্ড</span>
        </div>
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Flash Sale Countdown",
  "presets": [{ "name": "Flash Sale Countdown" }]
}
{% endschema %}`
  },
  {
    id: 'customer-reviews',
    title: 'Customer Reviews Section',
    filename: 'sections/customer-reviews.liquid',
    description: 'Verified customer review grid with star ratings and social proof.',
    code: `{% comment %}
  DeshiStore Customer Reviews & Star Ratings
{% endcomment %}

<section class="max-w-7xl mx-auto px-4 py-12 space-y-8">
  <div class="text-center space-y-2">
    <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-1 rounded-full border border-emerald-200">
      <span>★ ১০০% স্যাটিসফাইড কাস্টমার রিভিউ</span>
    </div>
    <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">আমাদের সম্মানিত কাস্টমারদের মতামত</h2>
  </div>
</section>

{% schema %}
{
  "name": "Customer Reviews",
  "presets": [{ "name": "Customer Reviews" }]
}
{% endschema %}`
  },
  {
    id: 'product-card',
    title: 'Product Card Snippet',
    filename: 'snippets/product-card.liquid',
    description: 'High-conversion product card with BDT price, discount badge, SKU, color pickers, size pills, and COD CTA button.',
    code: `{% comment %}
  DeshiStore High-Conversion Product Card
  Usage: {% render 'product-card', product: product %}
{% endcomment %}

<div class="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
  <!-- Image Frame -->
  <div class="relative aspect-4/5 overflow-hidden bg-slate-100">
    <a href="{{ product.url }}">
      <img src="{{ product.featured_image | image_url: width: 600 }}" 
           alt="{{ product.title }}" 
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
    </a>
    
    <!-- Badges -->
    <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
      {% if product.compare_at_price > product.price %}
        {% assign discount = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price %}
        <span class="bg-rose-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
          {{ discount }}% ছাড়
        </span>
      {% endif %}
      {% if product.selected_or_first_available_variant.sku != blank %}
        <span class="bg-slate-900/80 backdrop-blur-md text-amber-300 font-mono text-[10px] px-2 py-0.5 rounded-md border border-amber-500/30">
          SKU: {{ product.selected_or_first_available_variant.sku }}
        </span>
      {% endif %}
    </div>
  </div>

  <!-- Content -->
  <div class="p-4 flex flex-col flex-1">
    <h3 class="font-bold text-slate-800 text-base line-clamp-2 hover:text-amber-600 transition-colors">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>

    <!-- Price -->
    <div class="mt-3 flex items-baseline gap-2">
      <span class="text-xl font-extrabold text-amber-600">
        ৳{{ product.price | money_without_currency }}
      </span>
      {% if product.compare_at_price > product.price %}
        <span class="text-xs text-slate-400 line-through font-medium">
          ৳{{ product.compare_at_price | money_without_currency }}
        </span>
      {% endif %}
    </div>

    <!-- Quick COD Button -->
    <div class="mt-4 pt-3 border-t border-slate-100 flex gap-2">
      <button type="button" 
              onclick="openCODModal('{{ product.selected_or_first_available_variant.id }}', '{{ product.title | escape }}', '{{ product.price | money_without_currency }}')"
              class="flex-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-sm py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer">
        <span>অর্ডার করুন</span>
      </button>
    </div>
  </div>
</div>`
  },
  {
    id: 'cod-checkout',
    title: 'Cash on Delivery (COD) Section',
    filename: 'sections/cod-checkout.liquid',
    description: 'Instant 1-Click COD order popup with Bangladeshi 11-digit mobile validation, embedded color/size swatches, discount coupon, and unselected delivery zone requirements.',
    code: `{% comment %}
  DeshiStore Cash on Delivery Section
{% endcomment %}

<div id="cod-checkout-modal" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
    <div class="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
      <div>
        <h2 class="text-lg font-extrabold text-amber-400">ক্যাশ অন ডেলিভারি ১-ক্লিক অর্ডার বক্স</h2>
        <p class="text-xs text-slate-400">পণ্য হাতে পেয়ে টাকা পরিশোধ করুন</p>
      </div>
      <button onclick="document.getElementById('cod-checkout-modal').classList.add('hidden')" class="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer">✕</button>
    </div>

    <form action="/cart/add" method="post" class="p-6 space-y-4 overflow-y-auto">
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
        <input type="text" required name="attributes[Customer Name]" placeholder="উদাহরণ: মোঃ তামজিদ ইসলাম" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর (১১ ডিজিট) *</label>
        <input type="tel" required name="attributes[Phone Number]" pattern="01[3-9][0-9]{8}" placeholder="01712345678" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">ডেলিভারি এলাকা নির্বাচন করুন *</label>
        <div class="grid grid-cols-2 gap-3">
          <label class="border border-slate-300 hover:border-amber-500 p-3 rounded-xl flex items-center justify-between cursor-pointer">
            <div>
              <span class="block text-xs font-bold text-slate-900">ঢাকা সিটির ভেতরে</span>
              <span class="text-xs font-semibold text-amber-600">৳৬০</span>
            </div>
            <input type="radio" required name="attributes[Delivery Zone]" value="Inside Dhaka" class="accent-amber-500" />
          </label>
          <label class="border border-slate-300 hover:border-amber-500 p-3 rounded-xl flex items-center justify-between cursor-pointer">
            <div>
              <span class="block text-xs font-bold text-slate-900">ঢাকা সিটির বাইরে</span>
              <span class="text-xs font-semibold text-amber-600">৳১২০</span>
            </div>
            <input type="radio" required name="attributes[Delivery Zone]" value="Outside Dhaka" class="accent-amber-500" />
          </label>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
        <textarea required name="attributes[Delivery Address]" rows="2" placeholder="বাসা নম্বর, রোড নম্বর, এলাকা, থানা ও জেলা" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
      </div>

      <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-4 px-6 rounded-2xl shadow-lg transition-all text-base flex items-center justify-center gap-2 cursor-pointer">
        <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
      </button>
    </form>
  </div>
</div>`
  }
];
