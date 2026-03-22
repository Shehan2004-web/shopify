/* ── Payment & Fulfillment ────────────────────────── */
export type PaymentStatus = 'paid' | 'pending' | 'refunded';
export type FulfillmentStatus = 'unfulfilled' | 'processing' | 'dispatched' | 'delivered';

/* ── Order Item ──────────────────────────────────── */
export interface OrderItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

/* ── Purchase Order ──────────────────────────────── */
export interface PurchaseOrder {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: OrderItem[];
  itemsSummary: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  shippingAddress?: string;
  trackingNumber?: string;
  createdAt: string;
}

/* ── Purchase Metrics ────────────────────────────── */
export interface PurchaseMetrics {
  todayRevenue: number;
  todayRevenueTrend: number;
  ordersToFulfill: number;
  ordersToFulfillTrend: number;
  aov: number;
  aovTrend: number;
  abandonedCarts: number;
  abandonedCartsTrend: number;
}
