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

    <!-- Dynamic Options Preview (Color & Size) -->
    {% for option in product.options_with_values %}
      {% assign downcased_option = option.name | downcase %}
      {% if downcased_option contains 'color' or downcased_option contains 'কালার' or downcased_option contains 'রং' %}
        <div class="mt-2 flex items-center gap-1.5">
          <span class="text-[10px] text-slate-400 font-bold uppercase">কালার:</span>
          <div class="flex items-center gap-1">
            {% for value in option.values limit: 4 %}
              <span class="w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-200 inline-block" title="{{ value }}"></span>
            {% endfor %}
            {% if option.values.size > 4 %}
              <span class="text-[9px] text-slate-500 font-bold">+{{ option.values.size | minus: 4 }}</span>
            {% endif %}
          </div>
        </div>
      {% elsif downcased_option contains 'size' or downcased_option contains 'সাইজ' %}
        <div class="mt-1.5 flex items-center gap-1">
          <span class="text-[10px] text-slate-400 font-bold uppercase">সাইজ:</span>
          <div class="flex items-center gap-1">
            {% for value in option.values limit: 4 %}
              <span class="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border border-slate-200">{{ value }}</span>
            {% endfor %}
          </div>
        </div>
      {% endif %}
    {% endfor %}

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
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </div>
</div>`
  },
  {
    id: 'main-product',
    title: 'Product Single Page Section',
    filename: 'sections/main-product.liquid',
    description: 'Full Product Page template with color swatches, size selector pills, inventory status, WhatsApp button, and Cash on Delivery instant order form.',
    code: `{% comment %}
  DeshiStore Main Product Section
  Reads Shopify Product, Variants, Colors, Sizes, Description, and Images
{% endcomment %}

<div class="max-w-7xl mx-auto px-4 py-8">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
    
    <!-- Image Gallery -->
    <div class="space-y-4">
      <div class="aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
        <img id="main-product-image" 
             src="{{ product.featured_image | image_url: width: 1000 }}" 
             alt="{{ product.title }}" 
             class="w-full h-full object-cover" />
      </div>

      {% if product.images.size > 1 %}
        <div class="flex gap-3 overflow-x-auto pb-2">
          {% for image in product.images %}
            <button onclick="document.getElementById('main-product-image').src='{{ image | image_url: width: 1000 }}'"
                    class="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-amber-500 transition-colors shrink-0">
              <img src="{{ image | image_url: width: 200 }}" class="w-full h-full object-cover" />
            </button>
          {% endfor %}
        </div>
      {% endif %}
    </div>

    <!-- Product Details & Variant Picker -->
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">{{ product.title }}</h1>
        {% if product.selected_or_first_available_variant.sku != blank %}
          <span class="text-xs font-mono text-slate-500 mt-1 block">SKU: {{ product.selected_or_first_available_variant.sku }}</span>
        {% endif %}
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-3">
        <span class="text-3xl font-black text-amber-600">৳{{ product.price | money_without_currency }}</span>
        {% if product.compare_at_price > product.price %}
          <span class="text-lg text-slate-400 line-through">৳{{ product.compare_at_price | money_without_currency }}</span>
          {% assign save_amount = product.compare_at_price | minus: product.price %}
          <span class="bg-rose-100 text-rose-700 font-bold text-xs px-2.5 py-1 rounded-full">৳{{ save_amount | money_without_currency }} সেভ</span>
        {% endif %}
      </div>

      <!-- Shopify Dynamic Variant Selectors (Color / Size) -->
      <form action="/cart/add" method="post" id="add-to-cart-form" class="space-y-5">
        <input type="hidden" name="id" id="selected-variant-id" value="{{ product.selected_or_first_available_variant.id }}" />

        {% for option in product.options_with_values %}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {{ option.name }}: <span class="text-amber-600" id="selected-{{ option.name | handle }}">{{ option.selected_value }}</span>
            </label>
            <div class="flex flex-wrap gap-2">
              {% for value in option.values %}
                <button type="button" 
                        onclick="selectVariantOption('{{ option.name | handle }}', '{{ value | escape }}')"
                        class="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:border-amber-500 transition-all">
                  {{ value }}
                </button>
              {% endfor %}
            </div>
          </div>
        {% endfor %}

        <!-- Quantity & Order CTA Buttons -->
        <div class="pt-4 border-t border-slate-200 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" 
                    onclick="openCODModal('{{ product.selected_or_first_available_variant.id }}', '{{ product.title | escape }}', '{{ product.price | money_without_currency }}')"
                    class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 rounded-2xl text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span>অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
            </button>

            {% if section.settings.whatsapp_number != blank %}
              <a href="https://wa.me/{{ section.settings.whatsapp_number }}?text=Hello,%20I%20want%20to%20order%20{{ product.title | url_encode }}" 
                 target="_blank"
                 class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-base shadow-md flex items-center justify-center gap-2">
                <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার</span>
              </a>
            {% endif %}
          </div>
        </div>
      </form>

      <!-- Product Description -->
      <div class="pt-6 border-t border-slate-200 text-slate-700 text-sm leading-relaxed">
        <h3 class="font-bold text-slate-900 text-base mb-2">পণ্যের বিবরণ:</h3>
        <div class="prose max-w-none">{{ product.description }}</div>
      </div>

    </div>

  </div>
</div>

{% schema %}
{
  "name": "Main Product Section",
  "settings": [
    {
      "type": "text",
      "id": "whatsapp_number",
      "label": "WhatsApp Hotline Number",
      "default": "8801700000000"
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'cod-checkout',
    title: 'Cash on Delivery (COD) Section',
    filename: 'sections/cod-checkout.liquid',
    description: 'Instant 1-Click COD order popup with Bangladeshi 11-digit mobile validation, embedded color/size swatches, discount coupon, and unselected delivery zone requirements.',
    code: `{% comment %}
  DeshiStore Cash on Delivery Section
  Includes Delivery Rate Switcher (Dhaka: ৳60 / Outside Dhaka: ৳120) with no preselection and Promo Coupon
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
      
      <!-- Embedded Product Variant Pickers (Color & Size) -->
      <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
        <p class="text-xs font-bold text-slate-800">অর্ডারের পণ্য, কালার ও সাইজ পছন্দ করুন:</p>
        
        {% for option in product.options_with_values %}
          <div class="text-xs">
            <span class="font-bold text-slate-600">{{ option.name }}:</span>
            <select name="options[{{ option.name | escape }}]" class="ml-2 bg-white px-2 py-1 rounded border border-slate-300 font-bold text-slate-800">
              {% for value in option.values %}
                <option value="{{ value | escape }}">{{ value }}</option>
              {% endfor %}
            </select>
          </div>
        {% endfor %}
      </div>

      <!-- Coupon Discount Code Field -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">ডিসকাউন্ট কুপন কোড (Promo Code)</label>
        <div class="flex gap-2">
          <input type="text" id="discount-code-input" placeholder="DESHI10 বা WELCOME100" class="flex-1 px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          <button type="button" onclick="applyPromoDiscount()" class="bg-slate-900 text-amber-400 font-bold px-3 py-2 rounded-xl text-xs">এপ্লাই</button>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
        <input type="text" required name="attributes[Customer Name]" placeholder="উদাহরণ: মোঃ তামজিদ ইসলাম" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর (১১ ডিজিট) *</label>
        <input type="tel" required name="attributes[Phone Number]" pattern="01[3-9][0-9]{8}" placeholder="01712345678" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
          <span>ডেলিভারি এলাকা নির্বাচন করুন *</span>
          <span class="text-[10px] text-amber-600 font-bold">আগে সিলেক্ট করা নেই</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <label class="border border-slate-300 hover:border-amber-500 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all">
            <div>
              <span class="block text-xs font-bold text-slate-900">ঢাকা সিটির ভেতরে</span>
              <span class="text-xs font-semibold text-amber-600">৳{{ section.settings.charge_inside_dhaka }}</span>
            </div>
            <input type="radio" required name="attributes[Delivery Zone]" value="Inside Dhaka" class="accent-amber-500" />
          </label>
          <label class="border border-slate-300 hover:border-amber-500 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all">
            <div>
              <span class="block text-xs font-bold text-slate-900">ঢাকা সিটির বাইরে</span>
              <span class="text-xs font-semibold text-amber-600">৳{{ section.settings.charge_outside_dhaka }}</span>
            </div>
            <input type="radio" required name="attributes[Delivery Zone]" value="Outside Dhaka" class="accent-amber-500" />
          </label>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
        <textarea required name="attributes[Delivery Address]" rows="2" placeholder="বাসা নম্বর, রোড নম্বর, এলাকা, থানা ও জেলা" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
      </div>

      <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold py-4 px-6 rounded-2xl shadow-lg transition-all text-base flex items-center justify-center gap-2 cursor-pointer">
        <span>অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
      </button>
    </form>
  </div>
</div>

{% schema %}
{
  "name": "COD Checkout Settings",
  "settings": [
    {
      "type": "number",
      "id": "charge_inside_dhaka",
      "label": "Inside Dhaka Shipping Fee (BDT)",
      "default": 60
    },
    {
      "type": "number",
      "id": "charge_outside_dhaka",
      "label": "Outside Dhaka Shipping Fee (BDT)",
      "default": 120
    }
  ]
}
{% endschema %}`
  },
  {
    id: 'schema-settings',
    title: 'Global Theme Schema Settings JSON',
    filename: 'config/settings_schema.json',
    description: 'Shopify Customizer schema definition for store brand colors, delivery rates, and phone numbers.',
    code: `{
  "name": "DeshiStore Theme Settings",
  "settings": [
    {
      "type": "header",
      "content": "Store Branding"
    },
    {
      "type": "text",
      "id": "store_name",
      "label": "Store Brand Name",
      "default": "DeshiStore"
    },
    {
      "type": "color",
      "id": "primary_cta_color",
      "label": "Primary CTA Color (Amber/Gold)",
      "default": "#f59e0b"
    },
    {
      "type": "header",
      "content": "Delivery & COD Rates"
    },
    {
      "type": "number",
      "id": "fee_inside_dhaka",
      "label": "Inside Dhaka Delivery Fee (৳)",
      "default": 60
    },
    {
      "type": "number",
      "id": "fee_outside_dhaka",
      "label": "Outside Dhaka Delivery Fee (৳)",
      "default": 120
    }
  ]
}`
  }
];

