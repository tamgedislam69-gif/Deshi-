import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CategoryCircles } from './components/CategoryCircles';
import { FlashSaleTimer } from './components/FlashSaleTimer';
import { ProductGrid } from './components/ProductGrid';
import { CustomerReviews } from './components/CustomerReviews';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CODCheckoutModal } from './components/CODCheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { AdminDashboard } from './components/AdminDashboard';
import { ShopifyExporterModal } from './components/ShopifyExporterModal';
import { TrustBadgesAndFooter } from './components/TrustBadgesAndFooter';
import { LiveSalesPopup } from './components/LiveSalesPopup';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast, ToastMessage } from './components/Toast';

import { 
  CartItem, Order, OrderStatus, Product, ProductColor, TabType 
} from './types';
import { MOCK_PRODUCTS, INITIAL_MOCK_ORDERS } from './data/mockData';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('deshistore_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return MOCK_PRODUCTS;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('deshistore_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('deshistore_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_MOCK_ORDERS;
  });

  // Modals & Drawers State
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // COD Modal State
  const [codModalOpen, setCodModalOpen] = useState(false);
  const [directOrderProduct, setDirectOrderProduct] = useState<{ product: Product; color: ProductColor; size: string } | null>(null);

  // Post Order Modal State
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [trackingSearchQuery, setTrackingSearchQuery] = useState<string>('');

  // Shopify Exporter Modal State
  const [shopifyModalOpen, setShopifyModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('deshistore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('deshistore_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('deshistore_orders', JSON.stringify(orders));
  }, [orders]);

  // Show Toast Helper
  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    setToast({ id: Date.now().toString(), type, title, message });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, color: ProductColor, size: string) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity: 1
        }
      ];
    });

    showToast('success', 'কার্টে যোগ করা হয়েছে!', `${product.titleBn} আপনার শপিং কার্টে যুক্ত করা হয়েছে।`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('info', 'কার্ট থেকে সরিয়ে দেওয়া হয়েছে');
  };

  // Trigger COD Modal for direct single product or cart checkout
  const handleQuickOrder = (product: Product, color: ProductColor, size: string) => {
    setDirectOrderProduct({ product, color, size });
    setCodModalOpen(true);
  };

  const handleCartProceedCheckout = () => {
    setDirectOrderProduct(null);
    setCodModalOpen(true);
  };

  // Order Handlers
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    if (!directOrderProduct) {
      setCartItems([]); // clear cart if ordered from cart
    }
    setLatestOrder(newOrder);
    showToast('success', 'অর্ডার সফলভাবে কনফার্ম হয়েছে!', `অর্ডার ট্র্যাকিং আইডি: ${newOrder.id}`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const now = new Date();
          const timestamp = `${now.toLocaleDateString('en-GB')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          return {
            ...o,
            status: newStatus,
            history: [
              ...o.history,
              { status: newStatus, timestamp, note: note || `এডমিন স্ট্যাটাস আপডেট করেছেন: ${newStatus}` }
            ]
          };
        }
        return o;
      })
    );

    showToast('info', 'অর্ডার স্ট্যাটাস আপডেট হয়েছে', `${orderId} এর নতুন স্ট্যাটাস: ${newStatus}`);
  };

  const handleUpdateInternalNote = (orderId: string, note: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, internalNotes: note } : o))
    );
  };

  const handleAddNewProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast('success', 'নতুন পণ্য স্টোরে যোগ হয়েছে!', newProd.titleBn);
  };

  const handleTrackOrderFromModal = (orderId: string) => {
    setTrackingSearchQuery(orderId);
    setActiveTab('track_order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Hind_Siliguri',_'Plus_Jakarta_Sans',_sans-serif] pb-16 md:pb-0">
      
      {/* Top Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenShopifyModal={() => setShopifyModalOpen(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* View Switcher based on Active Tab */}
      <main className="flex-1">
        
        {/* TAB 1: Home View */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <HeroSlider
              onShopClick={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 500, behavior: 'smooth' });
              }}
              onTrackClick={() => setActiveTab('track_order')}
            />

            <CategoryCircles
              selectedCategory={selectedCategory}
              setSelectedCategory={(id) => {
                setSelectedCategory(id);
                setActiveTab('shop');
              }}
            />

            <FlashSaleTimer
              onShopClick={() => {
                setActiveTab('special_offers');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />

            <ProductGrid
              products={products}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTab={activeTab}
              onQuickOrder={handleQuickOrder}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            <CustomerReviews />
          </div>
        )}

        {/* TAB 2 & 3 & 4: Shop All / New Arrivals / Special Offers */}
        {(activeTab === 'shop' || activeTab === 'new_arrivals' || activeTab === 'special_offers') && (
          <ProductGrid
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            onQuickOrder={handleQuickOrder}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {/* TAB 5: Track Order View */}
        {activeTab === 'track_order' && (
          <OrderTrackingView
            orders={orders}
            initialSearchQuery={trackingSearchQuery}
            onGoToShop={() => setActiveTab('shop')}
          />
        )}

        {/* TAB 6: Admin Dashboard View */}
        {activeTab === 'admin' && (
          <AdminDashboard
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateInternalNote={handleUpdateInternalNote}
            onAddNewProduct={handleAddNewProduct}
          />
        )}

      </main>

      {/* Footer & Trust Badges */}
      <TrustBadgesAndFooter
        setActiveTab={setActiveTab}
        onOpenShopifyModal={() => setShopifyModalOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleCartProceedCheckout}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onQuickOrder={handleQuickOrder}
        onAddToCart={handleAddToCart}
      />

      {/* Cash on Delivery (COD) Checkout Modal */}
      <CODCheckoutModal
        isOpen={codModalOpen}
        onClose={() => {
          setCodModalOpen(false);
          setDirectOrderProduct(null);
        }}
        cartItems={cartItems}
        directProduct={directOrderProduct}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Post Checkout Order Confirmation Modal */}
      <OrderConfirmationModal
        order={latestOrder}
        onClose={() => setLatestOrder(null)}
        onTrackOrder={handleTrackOrderFromModal}
      />

      {/* Shopify Liquid Suite Exporter Modal */}
      <ShopifyExporterModal
        isOpen={shopifyModalOpen}
        onClose={() => setShopifyModalOpen(false)}
      />

      {/* Live Sales Notification Toast */}
      <LiveSalesPopup />

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
