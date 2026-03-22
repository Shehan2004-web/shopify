/* ── Shipping Status ─────────────────────────────── */
export type ShipmentStatus = 'label_created' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception' | 'returned';

export type CarrierName = 'DHL Express' | 'FedEx' | 'UPS' | 'Australia Post' | 'USPS' | 'Royal Mail';

/* ── Shipment ────────────────────────────────────── */
export interface Shipment {
  id: string;
  trackingId: string;
  carrier: CarrierName;
  customer: {
    name: string;
    email: string;
  };
  origin: string;
  destination: string;
  eta: string;
  status: ShipmentStatus;
  weight: string;
  claimId?: string;
  createdAt: string;
  updatedAt: string;
}

/* ── Shipping Metrics ────────────────────────────── */
export interface ShippingMetrics {
  activeShipments: number;
  activeShipmentsTrend: number;
  avgTransitDays: number;
  avgTransitTrend: number;
  totalCarrierCost: number;
  carrierCostTrend: number;
  exceptions: number;
  exceptionsTrend: number;
}

/* ── Tracking Stage ──────────────────────────────── */
export interface TrackingStage {
  label: string;
  count: number;
  color: string;
  icon: string;
}

/* ── Legacy compat ───────────────────────────────── */
export interface ShippingUpdate {
  trackingNumber: string;
  carrier: string;
  status: 'shipped' | 'in-transit' | 'delivered';
  estimatedDelivery: string;
}
