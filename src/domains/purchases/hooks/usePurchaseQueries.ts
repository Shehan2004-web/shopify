'use client';

import { useQuery } from '@tanstack/react-query';
import type { PurchaseOrder, PurchaseMetrics } from '../types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ORDERS: PurchaseOrder[] = [
  { id: '#ORD-8401', date: '2026-03-19', customer: { name: 'Sophia Miller', email: 'sophia@mail.com' }, items: [{ name: 'Urban Jacket Pro', sku: 'UJP-001', quantity: 1, price: 120 }], itemsSummary: 'Urban Jacket Pro', totalAmount: 120, paymentStatus: 'paid', fulfillmentStatus: 'unfulfilled', createdAt: '2026-03-19' },
  { id: '#ORD-8402', date: '2026-03-19', customer: { name: 'James Chen', email: 'james@mail.com' }, items: [{ name: 'Running Shoes V2', sku: 'RSV-002', quantity: 2, price: 45.5 }], itemsSummary: 'Running Shoes V2 ×2', totalAmount: 91, paymentStatus: 'paid', fulfillmentStatus: 'processing', createdAt: '2026-03-19' },
  { id: '#ORD-8403', date: '2026-03-19', customer: { name: 'Olivia Brown', email: 'olivia@mail.com' }, items: [{ name: 'Wireless Earbuds', sku: 'WEB-003', quantity: 1, price: 210 }, { name: 'Charging Case', sku: 'CC-003', quantity: 1, price: 35 }], itemsSummary: 'Wireless Earbuds + 1 more', totalAmount: 245, paymentStatus: 'pending', fulfillmentStatus: 'unfulfilled', createdAt: '2026-03-19' },
  { id: '#ORD-8404', date: '2026-03-18', customer: { name: 'Liam Wilson', email: 'liam@mail.com' }, items: [{ name: 'Leather Bag Mini', sku: 'LBM-006', quantity: 1, price: 320 }], itemsSummary: 'Leather Bag Mini', totalAmount: 320, paymentStatus: 'paid', fulfillmentStatus: 'dispatched', trackingNumber: 'DHL-9284712834', createdAt: '2026-03-18' },
  { id: '#ORD-8405', date: '2026-03-18', customer: { name: 'Emma Davis', email: 'emma@mail.com' }, items: [{ name: 'Smart Watch Pro', sku: 'SWP-005', quantity: 1, price: 150 }], itemsSummary: 'Smart Watch Pro', totalAmount: 150, paymentStatus: 'refunded', fulfillmentStatus: 'unfulfilled', createdAt: '2026-03-18' },
  { id: '#ORD-8406', date: '2026-03-18', customer: { name: 'Noah Taylor', email: 'noah@mail.com' }, items: [{ name: 'Yoga Mat Elite', sku: 'YME-004', quantity: 1, price: 85 }, { name: 'Yoga Block Set', sku: 'YBS-004', quantity: 1, price: 28 }], itemsSummary: 'Yoga Mat Elite + 1 more', totalAmount: 113, paymentStatus: 'paid', fulfillmentStatus: 'dispatched', trackingNumber: 'FDX-5829174621', createdAt: '2026-03-18' },
  { id: '#ORD-8407', date: '2026-03-17', customer: { name: 'Ava Martinez', email: 'ava@mail.com' }, items: [{ name: 'Silk Scarf Lux', sku: 'SSL-008', quantity: 3, price: 95 }], itemsSummary: 'Silk Scarf Lux ×3', totalAmount: 285, paymentStatus: 'paid', fulfillmentStatus: 'delivered', createdAt: '2026-03-17' },
  { id: '#ORD-8408', date: '2026-03-17', customer: { name: 'William Garcia', email: 'william@mail.com' }, items: [{ name: 'Desk Lamp RGB', sku: 'DLR-007', quantity: 1, price: 68 }], itemsSummary: 'Desk Lamp RGB', totalAmount: 68, paymentStatus: 'pending', fulfillmentStatus: 'unfulfilled', createdAt: '2026-03-17' },
  { id: '#ORD-8409', date: '2026-03-16', customer: { name: 'Isabella Lee', email: 'isabella@mail.com' }, items: [{ name: 'Cashmere Sweater', sku: 'CSW-010', quantity: 1, price: 240 }], itemsSummary: 'Cashmere Sweater', totalAmount: 240, paymentStatus: 'paid', fulfillmentStatus: 'processing', createdAt: '2026-03-16' },
  { id: '#ORD-8410', date: '2026-03-16', customer: { name: 'Mason Kim', email: 'mason@mail.com' }, items: [{ name: 'Bluetooth Speaker', sku: 'BTS-009', quantity: 1, price: 180 }, { name: 'Speaker Stand', sku: 'SS-009', quantity: 1, price: 45 }], itemsSummary: 'Bluetooth Speaker + 1 more', totalAmount: 225, paymentStatus: 'paid', fulfillmentStatus: 'dispatched', trackingNumber: 'UPS-3948271635', createdAt: '2026-03-16' },
  { id: '#ORD-8411', date: '2026-03-15', customer: { name: 'Charlotte Nguyen', email: 'charlotte@mail.com' }, items: [{ name: 'Smart Watch Pro', sku: 'SWP-005', quantity: 1, price: 150 }], itemsSummary: 'Smart Watch Pro', totalAmount: 150, paymentStatus: 'paid', fulfillmentStatus: 'delivered', createdAt: '2026-03-15' },
  { id: '#ORD-8412', date: '2026-03-15', customer: { name: 'Ethan Robinson', email: 'ethan@mail.com' }, items: [{ name: 'Running Shoes V2', sku: 'RSV-002', quantity: 1, price: 45.5 }, { name: 'Sport Socks', sku: 'SS-002', quantity: 3, price: 12 }], itemsSummary: 'Running Shoes V2 + 1 more', totalAmount: 81.5, paymentStatus: 'paid', fulfillmentStatus: 'processing', createdAt: '2026-03-15' },
];

const METRICS: PurchaseMetrics = {
  todayRevenue: 456,
  todayRevenueTrend: 22.4,
  ordersToFulfill: 4,
  ordersToFulfillTrend: -12,
  aov: 174.5,
  aovTrend: 5.8,
  abandonedCarts: 23,
  abandonedCartsTrend: 8.2,
};

export const usePurchaseOrders = () =>
  useQuery({
    queryKey: ['purchase-orders'],
    queryFn: async (): Promise<PurchaseOrder[]> => {
      await delay(600);
      return ORDERS;
    },
    staleTime: 30_000,
  });

export const usePurchaseMetrics = () =>
  useQuery({
    queryKey: ['purchase-metrics'],
    queryFn: async (): Promise<PurchaseMetrics> => {
      await delay(400);
      return METRICS;
    },
    staleTime: 60_000,
  });
