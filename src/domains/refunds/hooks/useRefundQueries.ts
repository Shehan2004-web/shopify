'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { RefundClaim, RefundMetrics, ClaimStatus, BulkRefundAction } from '../types';

/* ── Simulated Claims Data ───────────────────────── */
const SIMULATED_CLAIMS: RefundClaim[] = [
  { id: '#CLM-9283', orderId: '#SHO-4821', customer: { name: 'Alice Johnson', email: 'alice@mail.com' }, items: [{ name: 'Urban Jacket Pro', sku: 'UJP-001', quantity: 1, price: 120 }], totalValue: 120, status: 'Approved', reason: 'Defective', createdAt: '2026-03-18', updatedAt: '2026-03-18', resolution: 'refund', shippingLabel: 'generated', carrier: 'DHL Express' },
  { id: '#CLM-9284', orderId: '#SHO-4822', customer: { name: 'Bob Smith', email: 'bob@mail.com' }, items: [{ name: 'Running Shoes V2', sku: 'RSV-002', quantity: 1, price: 45.5 }], totalValue: 45.5, status: 'Pending', reason: 'Wrong Size', createdAt: '2026-03-18', updatedAt: '2026-03-18', shippingLabel: 'delayed', carrier: 'FedEx' },
  { id: '#CLM-9285', orderId: '#SHO-4823', customer: { name: 'Charlie Davis', email: 'charlie@mail.com' }, items: [{ name: 'Wireless Earbuds', sku: 'WEB-003', quantity: 1, price: 210 }], totalValue: 210, status: 'Denied', reason: 'Past Return Window', createdAt: '2026-03-17', updatedAt: '2026-03-17', shippingLabel: 'not_required' },
  { id: '#CLM-9286', orderId: '#SHO-4824', customer: { name: 'Diana Prince', email: 'diana@mail.com' }, items: [{ name: 'Yoga Mat Elite', sku: 'YME-004', quantity: 1, price: 85 }], totalValue: 85, status: 'Approved', reason: 'Wrong Color', createdAt: '2026-03-17', updatedAt: '2026-03-17', resolution: 'exchange', shippingLabel: 'generated', carrier: 'Australia Post' },
  { id: '#CLM-9287', orderId: '#SHO-4825', customer: { name: 'Edward Norton', email: 'edward@mail.com' }, items: [{ name: 'Smart Watch Pro', sku: 'SWP-005', quantity: 1, price: 150 }, { name: 'Watch Band', sku: 'WB-005', quantity: 2, price: 25 }], totalValue: 200, status: 'Processing', reason: 'Not as Described', createdAt: '2026-03-16', updatedAt: '2026-03-16', shippingLabel: 'generated', carrier: 'UPS' },
  { id: '#CLM-9288', orderId: '#SHO-4826', customer: { name: 'Fiona Green', email: 'fiona@mail.com' }, items: [{ name: 'Leather Bag Mini', sku: 'LBM-006', quantity: 1, price: 320 }], totalValue: 320, status: 'Inspected', reason: 'Quality Issue', createdAt: '2026-03-16', updatedAt: '2026-03-16', resolution: 'store_credit', shippingLabel: 'generated', carrier: 'USPS' },
  { id: '#CLM-9289', orderId: '#SHO-4827', customer: { name: 'George Wilson', email: 'george@mail.com' }, items: [{ name: 'Desk Lamp RGB', sku: 'DLR-007', quantity: 1, price: 68 }], totalValue: 68, status: 'Pending', reason: 'Changed Mind', createdAt: '2026-03-15', updatedAt: '2026-03-15', shippingLabel: 'delayed', carrier: 'FedEx' },
  { id: '#CLM-9290', orderId: '#SHO-4828', customer: { name: 'Helen Park', email: 'helen@mail.com' }, items: [{ name: 'Silk Scarf Lux', sku: 'SSL-008', quantity: 1, price: 95 }], totalValue: 95, status: 'Approved', reason: 'Defective', createdAt: '2026-03-14', updatedAt: '2026-03-15', resolution: 'store_credit', shippingLabel: 'generated', carrier: 'DHL Express' },
  { id: '#CLM-9291', orderId: '#SHO-4829', customer: { name: 'Ian Cooper', email: 'ian@mail.com' }, items: [{ name: 'Bluetooth Speaker', sku: 'BTS-009', quantity: 1, price: 180 }], totalValue: 180, status: 'Pending', reason: 'Not as Described', createdAt: '2026-03-14', updatedAt: '2026-03-14', shippingLabel: 'not_required' },
  { id: '#CLM-9292', orderId: '#SHO-4830', customer: { name: 'Julia Adams', email: 'julia@mail.com' }, items: [{ name: 'Cashmere Sweater', sku: 'CSW-010', quantity: 1, price: 240 }], totalValue: 240, status: 'Processing', reason: 'Wrong Size', createdAt: '2026-03-13', updatedAt: '2026-03-14', resolution: 'exchange', shippingLabel: 'generated', carrier: 'Australia Post' },
];

const SIMULATED_METRICS: RefundMetrics = {
  totalReturns: 2845,
  totalReturnsTrend: 12.5,
  revenueSaved: 45290,
  revenueSavedTrend: 8.7,
  activeCreditIssued: 12840,
  activeCreditTrend: -2.4,
  avgProcessingDays: 1.2,
  avgProcessingTrend: 0,
  pendingCount: 3,
  approvedCount: 3,
  deniedCount: 1,
};

/* ── Simulated API delay (respects Shopify rate limits token) ── */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ── Hooks ───────────────────────────────────────── */
export const useRefundClaims = () => {
  return useQuery({
    queryKey: ['refund-claims'],
    queryFn: async (): Promise<RefundClaim[]> => {
      // Shopify rate limit: max 2 requests/sec → simulate 500ms
      await delay(600);
      return SIMULATED_CLAIMS;
    },
    staleTime: 30_000,
  });
};

export const useRefundMetrics = () => {
  return useQuery({
    queryKey: ['refund-metrics'],
    queryFn: async (): Promise<RefundMetrics> => {
      await delay(400);
      return SIMULATED_METRICS;
    },
    staleTime: 60_000,
  });
};

export const useUpdateClaimStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ claimId, status }: { claimId: string; status: ClaimStatus }) => {
      // Simulate Shopify Admin API call with rate-limit delay
      await delay(800);
      // Audit log entry would be stored server-side:
      // { adminUserId: currentUser.id, action: status === 'Approved' ? 'approve' : 'deny', timestamp: new Date().toISOString(), note }
      return { claimId, status };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['refund-claims'] });
      qc.invalidateQueries({ queryKey: ['refund-metrics'] });
    },
  });
};

export const useIssueStoreCredit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ claimId, amount }: { claimId: string; amount: number }) => {
      await delay(1000);
      return { claimId, amount, creditId: `SC-${Date.now()}` };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['refund-claims'] });
      qc.invalidateQueries({ queryKey: ['refund-metrics'] });
    },
  });
};

export const useBulkRefundAction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (action: BulkRefundAction) => {
      // Shopify rate limit: batch operations → simulate 1.5s
      await delay(1500);
      return { processedIds: action.claimIds, action: action.action };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['refund-claims'] });
      qc.invalidateQueries({ queryKey: ['refund-metrics'] });
    },
  });
};
