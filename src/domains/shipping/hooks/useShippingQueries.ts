'use client';

import { useQuery } from '@tanstack/react-query';
import type { Shipment, ShippingMetrics } from '../types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ── Simulated Shipments ─────────────────────────── */
const SHIPMENTS: Shipment[] = [
  { id: 'SHP-001', trackingId: 'DHL-9284712834', carrier: 'DHL Express', customer: { name: 'Alice Johnson', email: 'alice@mail.com' }, origin: 'Los Angeles, CA', destination: 'New York, NY', eta: '2026-03-21', status: 'in_transit', weight: '1.2 kg', claimId: '#CLM-9283', createdAt: '2026-03-18', updatedAt: '2026-03-19' },
  { id: 'SHP-002', trackingId: 'FDX-5829174621', carrier: 'FedEx', customer: { name: 'Bob Smith', email: 'bob@mail.com' }, origin: 'Chicago, IL', destination: 'Miami, FL', eta: '2026-03-22', status: 'label_created', weight: '0.8 kg', claimId: '#CLM-9284', createdAt: '2026-03-18', updatedAt: '2026-03-18' },
  { id: 'SHP-003', trackingId: 'UPS-3948271635', carrier: 'UPS', customer: { name: 'Charlie Davis', email: 'charlie@mail.com' }, origin: 'Seattle, WA', destination: 'Denver, CO', eta: '2026-03-20', status: 'out_for_delivery', weight: '2.1 kg', createdAt: '2026-03-16', updatedAt: '2026-03-19' },
  { id: 'SHP-004', trackingId: 'AP-8271639482', carrier: 'Australia Post', customer: { name: 'Diana Prince', email: 'diana@mail.com' }, origin: 'Sydney, AU', destination: 'Melbourne, AU', eta: '2026-03-19', status: 'delivered', weight: '0.5 kg', claimId: '#CLM-9286', createdAt: '2026-03-15', updatedAt: '2026-03-19' },
  { id: 'SHP-005', trackingId: 'DHL-6271948362', carrier: 'DHL Express', customer: { name: 'Edward Norton', email: 'edward@mail.com' }, origin: 'San Francisco, CA', destination: 'Austin, TX', eta: '2026-03-20', status: 'exception', weight: '3.4 kg', claimId: '#CLM-9287', createdAt: '2026-03-16', updatedAt: '2026-03-19' },
  { id: 'SHP-006', trackingId: 'USPS-1948372615', carrier: 'USPS', customer: { name: 'Fiona Green', email: 'fiona@mail.com' }, origin: 'Boston, MA', destination: 'Philadelphia, PA', eta: '2026-03-21', status: 'in_transit', weight: '1.8 kg', claimId: '#CLM-9288', createdAt: '2026-03-17', updatedAt: '2026-03-19' },
  { id: 'SHP-007', trackingId: 'FDX-7362918475', carrier: 'FedEx', customer: { name: 'George Wilson', email: 'george@mail.com' }, origin: 'Dallas, TX', destination: 'Atlanta, GA', eta: '2026-03-22', status: 'in_transit', weight: '0.9 kg', claimId: '#CLM-9289', createdAt: '2026-03-17', updatedAt: '2026-03-19' },
  { id: 'SHP-008', trackingId: 'RM-5827163948', carrier: 'Royal Mail', customer: { name: 'Helen Park', email: 'helen@mail.com' }, origin: 'London, UK', destination: 'Manchester, UK', eta: '2026-03-20', status: 'delivered', weight: '0.6 kg', createdAt: '2026-03-14', updatedAt: '2026-03-18' },
  { id: 'SHP-009', trackingId: 'UPS-9182736451', carrier: 'UPS', customer: { name: 'Ian Cooper', email: 'ian@mail.com' }, origin: 'Portland, OR', destination: 'Phoenix, AZ', eta: '2026-03-23', status: 'label_created', weight: '2.3 kg', createdAt: '2026-03-18', updatedAt: '2026-03-18' },
  { id: 'SHP-010', trackingId: 'DHL-4725183694', carrier: 'DHL Express', customer: { name: 'Julia Adams', email: 'julia@mail.com' }, origin: 'Houston, TX', destination: 'Nashville, TN', eta: '2026-03-21', status: 'in_transit', weight: '1.5 kg', createdAt: '2026-03-17', updatedAt: '2026-03-19' },
];

const METRICS: ShippingMetrics = {
  activeShipments: 8,
  activeShipmentsTrend: 15.2,
  avgTransitDays: 2.4,
  avgTransitTrend: -8.3,
  totalCarrierCost: 3842,
  carrierCostTrend: 5.1,
  exceptions: 1,
  exceptionsTrend: -50,
};

/* ── Hooks ───────────────────────────────────────── */
export const useShipments = () =>
  useQuery({
    queryKey: ['shipments'],
    queryFn: async (): Promise<Shipment[]> => {
      await delay(600);
      return SHIPMENTS;
    },
    staleTime: 30_000,
  });

export const useShippingMetrics = () =>
  useQuery({
    queryKey: ['shipping-metrics'],
    queryFn: async (): Promise<ShippingMetrics> => {
      await delay(400);
      return METRICS;
    },
    staleTime: 60_000,
  });
