export type DeliveryZone = 'inside_dhaka' | 'outside_dhaka';

export interface ProductColor {
  name: string;
  nameBn: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  titleBn: string;
  category: string;
  categoryBn: string;
  originalPrice: number;
  offerPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  descriptionBn: string;
  inStock: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + color + size)
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  deliveryZone: DeliveryZone;
  address: string;
  district: string;
  thana: string;
  orderNote?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'In Courier' | 'Delivered' | 'Cancelled';

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string; // e.g. #ORD-1002
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'Cash on Delivery';
  trackingCourier?: string; // Pathao Courier / Steadfast Courier / RedX
  trackingId?: string;
  internalNotes?: string;
  history: OrderStatusHistory[];
}

export interface DistrictInfo {
  name: string;
  nameBn: string;
  thanas: string[];
}

export type TabType = 'home' | 'shop' | 'new_arrivals' | 'special_offers' | 'track_order' | 'admin' | 'shopify_export';
