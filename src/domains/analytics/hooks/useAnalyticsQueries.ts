'use client';

import { useQuery } from '@tanstack/react-query';

/* ── Simulated fetch helpers ─────────────────────── */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ── Revenue Recovery ────────────────────────────── */
export interface RevenueRecoveryData {
  totalRecovered: number;
  exchangeRevenue: number;
  storeCreditRevenue: number;
  refundLoss: number;
  recoveryRate: number;
  changeVsLastMonth: number;
}

const fetchRevenueRecovery = async (): Promise<RevenueRecoveryData> => {
  await delay(600);
  return {
    totalRecovered: 128450,
    exchangeRevenue: 72800,
    storeCreditRevenue: 55650,
    refundLoss: 45290,
    recoveryRate: 73.9,
    changeVsLastMonth: 8.4,
  };
};

export const useRevenueRecovery = () =>
  useQuery({ queryKey: ['analytics', 'revenue-recovery'], queryFn: fetchRevenueRecovery, staleTime: 30_000 });

/* ── Product Heatmap ─────────────────────────────── */
export interface ProductHeatmapItem {
  name: string;
  sku: string;
  sold: number;
  returned: number;
  returnRate: number;
  revenue: number;
  topReason: string;
}

const fetchProductHeatmap = async (): Promise<ProductHeatmapItem[]> => {
  await delay(800);
  return [
    { name: 'Urban Jacket Pro', sku: 'UJP-001', sold: 2840, returned: 412, returnRate: 14.5, revenue: 49280, topReason: 'Wrong Size' },
    { name: 'Wireless Earbuds X', sku: 'WEX-042', sold: 1920, returned: 245, returnRate: 12.8, revenue: 40320, topReason: 'Defective' },
    { name: 'Running Shoes V2', sku: 'RSV-118', sold: 3150, returned: 346, returnRate: 11.0, revenue: 94500, topReason: 'Wrong Size' },
    { name: 'Smart Watch Pro', sku: 'SWP-205', sold: 980, returned: 98, returnRate: 10.0, revenue: 147000, topReason: 'Not as Described' },
    { name: 'Leather Bag Mini', sku: 'LBM-077', sold: 1540, returned: 139, returnRate: 9.0, revenue: 49280, topReason: 'Quality Issue' },
  ];
};

export const useProductHeatmap = () =>
  useQuery({ queryKey: ['analytics', 'product-heatmap'], queryFn: fetchProductHeatmap, staleTime: 30_000 });

/* ── Customer Segments ───────────────────────────── */
export interface CustomerSegmentData {
  segment: string;
  zeroReturns: number;
  oneReturn: number;
  twoReturns: number;
  threePlus: number;
  total: number;
}

const fetchCustomerSegments = async (): Promise<CustomerSegmentData[]> => {
  await delay(700);
  return [
    { segment: 'VIP', zeroReturns: 620, oneReturn: 180, twoReturns: 45, threePlus: 12, total: 857 },
    { segment: 'Regular', zeroReturns: 2400, oneReturn: 890, twoReturns: 320, threePlus: 85, total: 3695 },
    { segment: 'New', zeroReturns: 1800, oneReturn: 540, twoReturns: 180, threePlus: 42, total: 2562 },
  ];
};

export const useCustomerSegments = () =>
  useQuery({ queryKey: ['analytics', 'customer-segments'], queryFn: fetchCustomerSegments, staleTime: 30_000 });

/* ── Financial Leakage ───────────────────────────── */
export interface FinancialLeakageData {
  totalShippingCost: number;
  returnShippingCost: number;
  restockingFees: number;
  recoveredRevenue: number;
  netLeakage: number;
  leakageRate: number;
  breakdown: { label: string; amount: number; pct: number; type: 'cost' | 'recovery' }[];
}

const fetchFinancialLeakage = async (): Promise<FinancialLeakageData> => {
  await delay(900);
  return {
    totalShippingCost: 34200,
    returnShippingCost: 18450,
    restockingFees: 4200,
    recoveredRevenue: 128450,
    netLeakage: 48450,
    leakageRate: 2.8,
    breakdown: [
      { label: 'Return Shipping', amount: 18450, pct: 38.1, type: 'cost' },
      { label: 'Original Shipping', amount: 15750, pct: 32.5, type: 'cost' },
      { label: 'Restocking & Inspection', amount: 8200, pct: 16.9, type: 'cost' },
      { label: 'Product Depreciation', amount: 6050, pct: 12.5, type: 'cost' },
      { label: 'Exchange Revenue', amount: 72800, pct: 56.7, type: 'recovery' },
      { label: 'Store Credit Used', amount: 38200, pct: 29.7, type: 'recovery' },
      { label: 'Restocking Fees', amount: 4200, pct: 3.3, type: 'recovery' },
      { label: 'Warranty Claims', amount: 13250, pct: 10.3, type: 'recovery' },
    ],
  };
};

export const useFinancialLeakage = () =>
  useQuery({ queryKey: ['analytics', 'financial-leakage'], queryFn: fetchFinancialLeakage, staleTime: 30_000 });
