/* ── Customer Segment ─────────────────────────────── */
export type CustomerSegment = 'vip' | 'regular' | 'at_risk' | 'inactive';

/* ── Customer ────────────────────────────────────── */
export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastActive: string;
  segment: CustomerSegment;
  joinedAt: string;
  clv: number;
}

/* ── Customer Metrics ────────────────────────────── */
export interface CustomerMetrics {
  totalCustomers: number;
  totalCustomersTrend: number;
  activeVip: number;
  activeVipTrend: number;
  avgClv: number;
  avgClvTrend: number;
  churnRate: number;
  churnRateTrend: number;
}
