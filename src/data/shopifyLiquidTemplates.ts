export interface LiquidTemplate {
  id: string;
  title: string;
  filename: string;
  description: string;
  code: string;
}

export const SHOPIFY_LIQUID_TEMPLATES: LiquidTemplate[] = [
  {
    id: 'theme-layout',
    title: 'Shopify Main Layout (Theme.liquid)',
    filename: 'layout/theme.liquid',
    description: 'Shopify Theme-এর মূল লেআউট ফাইল। Tailwind CSS, ফন্ট এবং হেডার/ফুটারে ডাইনামিক সেকশন লোড করার কোড।',
    code: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#0f172a">
    <link rel="canonical" href="{{ canonical_url }}">

    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {{ content_for_header }}

    <!-- Tailwind CSS CDN for Ultra-Fast Modern Styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: {
                50: '#fffbeb',
                400: '#fbbf24',
                500: '#f59e0b',
                600: '#d97706',
                950: '#020617',
              }
            }
          }
        }
      }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
      body {
        font-family: 'Hind Siliguri', sans-serif;
        background-color: #f8fafc;
        color: #0f172a;
      }
    </style>
  </head>

  <body class="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
    {% section 'announcement-bar' %}
    {% section 'header' %}

    <main id="MainContent" class="flex-grow focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}
    {% section 'cod-checkout-modal' %}

    <!-- Shopify Theme Customizer Active Event Sync -->
    <script>
      window.Shopify = window.Shopify || {};
      if (Shopify.designMode) {
        console.log('Shopify Theme Editor (Customizer) Active');
      }
    </script>
  </body>
</html>`
  },
  {
    id: 'header-section',
    title: 'Shopify Header & Navigation',
    filename: 'sections/header.liquid',
    description: 'Shopify Theme Customizer-এর জন্য পূর্ণাঙ্গ হেডার, লোগো, এনাউন্সমেন্ট বার, সার্চ বার, হটলাইন ও কাস্টম CSS সেটিংস।',
    code: `{% comment %}
  RichMan / DeshiStore Fully Customizable Shopify Header
{% endcomment %}

{% if section.settings.show_announcement %}
  <div class="bg-slate-950 text-white text-xs py-2 px-4 sm:px-6 flex flex-wrap justify-between items-center border-b border-slate-800">
    <div class="flex items-center gap-2">
      {% if section.settings.show_live_badge %}
        <span class="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-400 font-bold px-2 py-0.5 rounded-full border border-rose-500/30 text-[11px]">
          <span class="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
          LIVE
        </span>
      {% endif %}
      <span class="font-semibold text-slate-200">
        {{ section.settings.announcement_text }}
      </span>
    </div>

    {% if section.settings.show_hotline and section.settings.hotline_phone != blank %}
      <div class="flex items-center gap-3 text-slate-300 text-xs">
        <a href="tel:{{ section.settings.hotline_phone }}" class="flex items-center gap-1.5 hover:text-amber-400 font-bold bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          <span>📞 {{ section.settings.hotline_phone }}</span>
        </a>
      </div>
    {% endif %}
  </div>
{% endif %}

<header class="{% if section.settings.sticky_header %}sticky top-0{% endif %} z-40 text-white border-b border-slate-800/90 shadow-xl" style="background-color: {{ section.settings.header_bg_color | default: '#0f172a' }}; color: {{ section.settings.header_text_color | default: '#ffffff' }};">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
    
    <!-- Brand Logo / Store Name -->
    <a href="{{ routes.root_url }}" class="flex items-center gap-2 group">
      {% if section.settings.logo != blank %}
        <img src="{{ section.settings.logo | image_url: width: 300 }}" alt="{{ shop.name }}" class="h-10 w-auto object-contain">
      {% else %}
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
          {{ section.settings.store_name | default: shop.name | slice: 0, 1 | uppercase }}
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5">
            <span class="font-black text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
              {{ section.settings.store_name | default: shop.name }}
            </span>
            {% if section.settings.show_live_badge %}
              <span class="bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                LIVE
              </span>
            {% endif %}
          </div>
          {% if section.settings.sub_tagline != blank %}
            <span class="text-[9px] font-bold text-amber-400 tracking-widest uppercase -mt-0.5">
              {{ section.settings.sub_tagline }}
            </span>
          {% endif %}
        </div>
      {% endif %}
    </a>

    <!-- Search Input Bar -->
    {% if section.settings.show_search %}
      <div class="hidden md:flex flex-1 max-w-md relative">
        <form action="{{ routes.search_url }}" method="get" class="w-full relative">
          <input type="text" name="q" placeholder="{{ section.settings.search_placeholder }}" class="w-full bg-slate-900 text-white text-xs font-medium pl-9 pr-4 py-2.5 rounded-2xl border border-slate-700 focus:border-amber-500 focus:outline-none">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </form>
      </div>
    {% endif %}

    <!-- Navigation Menu (Desktop) -->
    <nav class="hidden lg:flex items-center gap-6 text-xs font-extrabold uppercase tracking-wider">
      {% for link in linklists[section.settings.menu].links %}
        <a href="{{ link.url }}" class="hover:text-amber-400 transition-colors py-1">
          {{ link.title }}
        </a>
      {% endfor %}
    </nav>

    <!-- Header Actions & Cart -->
    <div class="flex items-center gap-3">
      <a href="{{ routes.cart_url }}" class="relative bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2.5 rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
        <span>🛒</span>
        <span class="hidden sm:inline text-xs uppercase tracking-wider">কার্ট</span>
        <span class="bg-slate-950 text-amber-400 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">
          {{ cart.item_count }}
        </span>
      </a>
    </div>

  </div>
</header>

{% if section.settings.custom_css != blank %}
  <style>
    {{ section.settings.custom_css }}
  </style>
{% endif %}

{% schema %}
{
  "name": "Header",
  "settings": [
    {
      "type": "text",
      "id": "store_name",
      "label": "Store Name",
      "default": "SHOP MIX ONLINE BD"
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement Text",
      "default": "ফ্রি ডেলিভারি অফার পেতে এখনই অর্ডার করুন!"
    },
    {
      "type": "text",
      "id": "hotline_phone",
      "label": "Hotline Number",
      "default": "01771357329"
    },
    {
      "type": "text",
      "id": "search_placeholder",
      "label": "Search Placeholder Text",
      "default": "পণ্য বা সেটিংস খুঁজুন..."
    },
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Show Announcement Bar",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_hotline",
      "label": "Show Hotline Number",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_search",
      "label": "Show Search Bar",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_live_badge",
      "label": "Show LIVE Badge",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "sticky_header",
      "label": "Enable Sticky Header",
      "default": true
    },
    {
      "type": "text",
      "id": "sub_tagline",
      "label": "Brand Tagline",
      "default": "RichMan.Style"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Store Logo Image"
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Main Navigation Menu",
      "default": "main-menu"
    },
    {
      "type": "color",
      "id": "header_bg_color",
      "label": "Header Background Color",
      "default": "#0f172a"
    },
    {
      "type": "color",
      "id": "header_text_color",
      "label": "Header Text Color",
      "default": "#ffffff"
    },
    {
      "type": "textarea",
      "id": "custom_css",
      "label": "Custom CSS",
      "default": "/* Custom CSS Styles */"
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'hero-banner-section',
    title: 'Shopify Hero Slider Banner',
    filename: 'sections/hero-banner.liquid',
    description: 'Shopify Theme Customizer-এ আনলিমিটেড ব্যানার তৈরি, ট্রানজিশন ইফেক্ট ও ডাইনামিক স্লাইড সেটিংস।',
    code: `{% comment %}
  RichMan Hero Banner Slider Section
{% endcomment %}

<div class="relative bg-slate-950 text-white overflow-hidden rounded-3xl shadow-2xl mx-4 sm:mx-6 my-4 border border-slate-800/90 group"
     data-autospeed="{{ section.settings.auto_slide_speed }}">
  
  <div class="relative min-h-[380px] sm:min-h-[420px] flex items-center">
    {% for block in section.blocks %}
      <div class="hero-slide-item {% unless forloop.first %}hidden{% endunless %} w-full p-6 sm:p-12" {{ block.shopify_attributes }}>
        {% if block.settings.image != blank %}
          <div class="absolute inset-0 z-0">
            <img src="{{ block.settings.image | image_url: width: 1400 }}" alt="{{ block.settings.heading }}" class="w-full h-full object-cover opacity-35">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>
        {% endif %}

        <div class="relative z-10 max-w-2xl space-y-4">
          {% if block.settings.badge != blank %}
            <span class="inline-block bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">
              {{ block.settings.badge }}
            </span>
          {% endif %}

          <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {{ block.settings.heading }}
          </h1>

          <p class="text-slate-300 text-sm sm:text-base max-w-xl">
            {{ block.settings.subheading }}
          </p>

          <div class="pt-3 flex flex-wrap items-center gap-3">
            <a href="{{ block.settings.cta_link | default: '/collections/all' }}" 
               class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg transition-all text-sm sm:text-base">
              {{ block.settings.cta_text | default: '🛒 এখন অর্ডার করুন' }}
            </a>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>

</div>

{% schema %}
{
  "name": "Hero Slider Banner",
  "settings": [
    {
      "type": "range",
      "id": "auto_slide_speed",
      "label": "Auto Slide Speed (Seconds)",
      "min": 2,
      "max": 10,
      "step": 1,
      "default": 5
    },
    {
      "type": "select",
      "id": "transition_effect",
      "label": "Slide Transition Animation",
      "options": [
        { "value": "fade", "label": "Fade Crossfade" },
        { "value": "slide", "label": "Slide Left/Right" },
        { "value": "zoom", "label": "Zoom In" }
      ],
      "default": "fade"
    }
  ],
  "blocks": [
    {
      "type": "slide",
      "name": "Banner Slide",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Banner Slide Image"
        },
        {
          "type": "text",
          "id": "badge",
          "label": "Promo Badge",
          "default": "স্পেশাল অফার"
        },
        {
          "type": "text",
          "id": "heading",
          "label": "Slide Main Title",
          "default": "প্রিমিয়াম কোয়ালিটি ড্রপ শোল্ডার টি-শার্ট"
        },
        {
          "type": "textarea",
          "id": "subheading",
          "label": "Subheading / Description",
          "default": "১০০% কটন ফেব্রিক্সের স্টাইলিশ কালেকশন। দ্রুত হোম ডেলিভারিতে পান।"
        },
        {
          "type": "text",
          "id": "cta_text",
          "label": "Button Label",
          "default": "🛒 অর্ডার করুন"
        },
        {
          "type": "url",
          "id": "cta_link",
          "label": "Button Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero Slider Banner",
      "blocks": [
        { "type": "slide" },
        { "type": "slide" }
      ]
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'product-grid-section',
    title: 'Shopify Product Catalog Grid',
    filename: 'sections/product-grid.liquid',
    description: 'Shopify Collections ও Product Grid কাস্টমাইজেশন সেকশন।',
    code: `{% comment %}
  RichMan Product Catalog Grid Section
{% endcomment %}

<section class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
    <div>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        {{ section.settings.section_title | default: 'আমাদের সেরা কালেকশন' }}
      </h2>
      <p class="text-xs text-slate-500 mt-1">
        {{ section.settings.section_subtitle | default: 'পছন্দের পণ্যটি বেছে নিয়ে সরাসরি ১-ক্লিকে অর্ডার কনফার্ম করুন' }}
      </p>
    </div>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {% assign selected_collection = collections[section.settings.collection] %}
    {% if selected_collection != blank %}
      {% for product in selected_collection.products limit: section.settings.products_to_show %}
        {% render 'product-card', product: product %}
      {% endfor %}
    {% else %}
      {% for product in collections.all.products limit: section.settings.products_to_show %}
        {% render 'product-card', product: product %}
      {% endfor %}
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Product Grid",
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "label": "Section Title",
      "default": "আমাদের সেরা কালেকশন"
    },
    {
      "type": "text",
      "id": "section_subtitle",
      "label": "Section Subtitle",
      "default": "পছন্দের পণ্যটি বেছে নিয়ে সরাসরি ১-ক্লিকে অর্ডার কনফার্ম করুন"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Shopify Collection"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 4,
      "max": 24,
      "step": 2,
      "default": 8,
      "label": "Products to Show"
    }
  ],
  "presets": [
    {
      "name": "Product Grid"
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'product-card-snippet',
    title: 'Shopify Product Card Snippet',
    filename: 'snippets/product-card.liquid',
    description: 'Shopify Product Card - BDT প্রাইস, ক্যাশ অন ডেলিভারি ১-ক্লিক অর্ডার বাটনসহ।',
    code: `{% comment %}
  RichMan / DeshiStore Product Card
{% endcomment %}

<div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
  
  <div class="relative aspect-4/5 overflow-hidden bg-slate-100">
    <a href="{{ product.url }}">
      <img src="{{ product.featured_image | image_url: width: 600 }}" alt="{{ product.title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
    </a>
  </div>

  <div class="p-4 flex flex-col flex-1 justify-between">
    <div>
      <h3 class="font-extrabold text-slate-800 text-sm line-clamp-2 hover:text-amber-600 transition-colors">
        <a href="{{ product.url }}">{{ product.title }}</a>
      </h3>

      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-lg font-black text-amber-600">
          ৳{{ product.price | money_without_currency }}
        </span>
        {% if product.compare_at_price > product.price %}
          <span class="text-xs text-slate-400 line-through">
            ৳{{ product.compare_at_price | money_without_currency }}
          </span>
        {% endif %}
      </div>
    </div>

    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
      <button type="button" 
              onclick="openCODModal('{{ product.selected_or_first_available_variant.id }}', '{{ product.title | escape }}', '{{ product.price | money_without_currency }}', '{{ product.featured_image | image_url: width: 300 }}')"
              class="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer">
        <span>🛒</span>
        <span>অর্ডার করুন</span>
      </button>
    </div>
  </div>

</div>`
  },
  {
    id: 'cod-checkout-modal',
    title: 'Shopify Cash on Delivery (COD) Checkout Popup',
    filename: 'sections/cod-checkout-modal.liquid',
    description: '১-ক্লিক ক্যাশ অন ডেলিভারি অর্ডার পপআপ উইন্ডো (১১ ডিজিট মোবাইল ভ্যালিডেশন, থানা/জেলা সিলেক্টর)।',
    code: `{% comment %}
  RichMan Cash on Delivery (COD) 1-Click Order Section
{% endcomment %}

<div id="cod-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs hidden items-center justify-center p-4 overflow-y-auto">
  <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
    
    <div class="bg-slate-950 text-white p-5 flex justify-between items-center border-b border-slate-800">
      <div>
        <h3 class="text-lg font-black text-amber-400 flex items-center gap-2">
          <span>🛒 ক্যাশ অন ডেলিভারি ১-ক্লিক অর্ডার</span>
        </h3>
        <p class="text-xs text-slate-400 mt-0.5">অর্ডার কনফার্ম করতে নিচের তথ্যগুলো দিয়ে সাবমিট করুন</p>
      </div>
      <button type="button" onclick="closeCODModal()" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
    </div>

    <form action="/cart/add" method="post" id="cod-order-form" class="p-6 space-y-4 overflow-y-auto">
      <input type="hidden" name="id" id="cod-variant-id">

      <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
        <img id="cod-product-img" src="" class="w-12 h-12 object-cover rounded-xl border border-slate-200">
        <div>
          <span id="cod-product-title" class="font-bold text-xs text-slate-900 block line-clamp-1"></span>
          <span id="cod-product-price" class="text-xs font-black text-amber-600 block"></span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">আপনার নাম *</label>
        <input type="text" required name="attributes[Customer Name]" placeholder="উদাহরণ: মোঃ তামজিদ ইসলাম" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none">
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">১১ ডিজিটের মোবাইল নম্বর *</label>
        <input type="tel" required name="attributes[Phone Number]" pattern="01[3-9][0-9]{8}" placeholder="01712345678" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none">
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">ডেলিভারি এলাকা *</label>
        <div class="grid grid-cols-2 gap-3">
          <label class="border border-slate-300 p-3 rounded-xl flex items-center justify-between cursor-pointer hover:border-amber-500">
            <div>
              <span class="block text-xs font-bold text-slate-900">ঢাকা সিটি</span>
              <span class="text-xs font-black text-amber-600">৳{{ section.settings.fee_inside | default: 60 }}</span>
            </div>
            <input type="radio" required name="attributes[Delivery Zone]" value="Inside Dhaka" class="accent-amber-500">
          </label>
          <label class="border border-slate-300 p-3 rounded-xl flex items-center justify-between cursor-pointer hover:border-amber-500">
            <div>
              <span class="block text-xs font-bold text-slate-900">ঢাকার বাইরে</span>
              <span class="text-xs font-black text-amber-600">৳{{ section.settings.fee_outside | default: 120 }}</span>
            </div>
            <input type="radio" required name="attributes[Delivery Zone]" value="Outside Dhaka" class="accent-amber-500">
          </label>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
        <textarea required name="attributes[Delivery Address]" rows="2" placeholder="বাসা/রোড নম্বর, এলাকা, থানা ও জেলা" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
      </div>

      <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer">
        <span>🛒 অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
      </button>
    </form>

  </div>
</div>

<script>
  function openCODModal(variantId, title, price, imgUrl) {
    document.getElementById('cod-variant-id').value = variantId;
    document.getElementById('cod-product-title').innerText = title;
    document.getElementById('cod-product-price').innerText = '৳' + price;
    document.getElementById('cod-product-img').src = imgUrl || '';
    document.getElementById('cod-modal').classList.remove('hidden');
    document.getElementById('cod-modal').classList.add('flex');
  }

  function closeCODModal() {
    document.getElementById('cod-modal').classList.add('hidden');
    document.getElementById('cod-modal').classList.remove('flex');
  }
</script>

{% schema %}
{
  "name": "COD Checkout Popup",
  "settings": [
    {
      "type": "number",
      "id": "fee_inside",
      "label": "Delivery Fee Inside Dhaka (BDT)",
      "default": 60
    },
    {
      "type": "number",
      "id": "fee_outside",
      "label": "Delivery Fee Outside Dhaka (BDT)",
      "default": 120
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'footer-section',
    title: 'Shopify Footer & Map Section',
    filename: 'sections/footer.liquid',
    description: 'Shopify Theme Customizer-এর জন্য ফুটার, ম্যাপ লোকেশন ও কপিরাইট সেটিংস।',
    code: `{% comment %}
  RichMan / DeshiStore Footer Section
{% endcomment %}

<footer class="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div class="space-y-3">
      <h3 class="font-black text-lg text-amber-400">{{ shop.name }}</h3>
      <p class="text-xs text-slate-400 leading-relaxed">
        {{ section.settings.about_text | default: 'আমরা দিচ্ছি ১০০% অরিজিনাল কোয়ালিটিসম্পন্ন প্রিমিয়াম ক্লথিং। ক্যাশ অন ডেলিভারিতে সারাদেশে দ্রুত হোম ডেলিভারি।' }}
      </p>
    </div>

    <div class="space-y-3">
      <h4 class="font-bold text-sm text-white">আউটলেট লোকেশন</h4>
      <p class="text-xs text-slate-400">
        {{ section.settings.outlet_address | default: 'খিলগাঁও আউটলেট, ঢাকা-১২১৯। প্রতিদিন খোলা।' }}
      </p>
    </div>

    <div class="space-y-3">
      <h4 class="font-bold text-sm text-white">কাস্টমার সাপোর্ট</h4>
      <p class="text-xs text-amber-400 font-bold">
        হটলাইন: {{ section.settings.hotline | default: '01700-000000' }}
      </p>
    </div>

  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>&copy; {{ 'now' | date: '%Y' }} {{ shop.name }}. All Rights Reserved. Powered by Shopify.</p>
  </div>
</footer>

{% schema %}
{
  "name": "Footer Section",
  "settings": [
    {
      "type": "textarea",
      "id": "about_text",
      "label": "About Store Description"
    },
    {
      "type": "text",
      "id": "outlet_address",
      "label": "Outlet Address Text",
      "default": "খিলগাঁও আউটলেট, ঢাকা-১২১৯"
    },
    {
      "type": "text",
      "id": "hotline",
      "label": "Support Hotline Number",
      "default": "01700-000000"
    }
  ]
}
{% endschema %}`
  }
];
