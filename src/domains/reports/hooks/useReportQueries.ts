'use client';

import { useQuery } from '@tanstack/react-query';
import type { ReportRow, ReportType } from '../types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FINANCIAL: ReportRow[] = [
  { id: 'RPT-001', orderId: '#ORD-8401', customer: 'Sophia Miller', date: '2026-03-19', timestamp: '09:14:22', value: 120.00, reason: 'Sale', status: 'Completed', carrier: '—', collection: 'Spring 2026' },
  { id: 'RPT-002', orderId: '#ORD-8402', customer: 'James Chen', date: '2026-03-19', timestamp: '10:32:45', value: 91.00, reason: 'Sale', status: 'Completed', carrier: '—', collection: 'Athletic' },
  { id: 'RPT-003', orderId: '#ORD-8403', customer: 'Olivia Brown', date: '2026-03-19', timestamp: '11:05:18', value: 245.00, reason: 'Sale', status: 'Pending', carrier: '—', collection: 'Electronics' },
  { id: 'RPT-004', orderId: '#ORD-8404', customer: 'Liam Wilson', date: '2026-03-18', timestamp: '14:22:33', value: 320.00, reason: 'Sale', status: 'Completed', carrier: '—', collection: 'Accessories' },
  { id: 'RPT-005', orderId: '#ORD-8405', customer: 'Emma Davis', date: '2026-03-18', timestamp: '16:48:12', value: -150.00, reason: 'Refund', status: 'Refunded', carrier: '—', collection: 'Electronics' },
  { id: 'RPT-006', orderId: '#ORD-8406', customer: 'Noah Taylor', date: '2026-03-18', timestamp: '09:55:41', value: 113.00, reason: 'Sale', status: 'Completed', carrier: '—', collection: 'Wellness' },
  { id: 'RPT-007', orderId: '#ORD-8407', customer: 'Ava Martinez', date: '2026-03-17', timestamp: '13:10:05', value: 1.00, reason: 'Subscription', status: 'Completed', carrier: '—', collection: 'Monthly Plan' },
  { id: 'RPT-008', orderId: '#ORD-8408', customer: 'William Garcia', date: '2026-03-17', timestamp: '15:20:33', value: 89.99, reason: 'Upsell', status: 'Completed', carrier: '—', collection: 'Premium Accessories' },
];

const REFUNDS: ReportRow[] = [
  { id: 'RPT-101', orderId: '#CLM-9283', customer: 'Alice Johnson', date: '2026-03-18', timestamp: '08:23:44', value: 120.00, reason: 'Defective', status: 'Approved', carrier: 'DHL Express', collection: 'Spring 2026' },
  { id: 'RPT-102', orderId: '#CLM-9284', customer: 'Bob Smith', date: '2026-03-18', timestamp: '09:12:05', value: 45.50, reason: 'Wrong Size', status: 'Pending', carrier: 'FedEx', collection: 'Athletic' },
  { id: 'RPT-103', orderId: '#CLM-9285', customer: 'Charlie Davis', date: '2026-03-17', timestamp: '14:33:28', value: 210.00, reason: 'Past Return Window', status: 'Denied', carrier: 'UPS', collection: 'Electronics' },
  { id: 'RPT-104', orderId: '#CLM-9286', customer: 'Diana Prince', date: '2026-03-17', timestamp: '11:44:56', value: 85.00, reason: 'Wrong Color', status: 'Approved', carrier: 'Australia Post', collection: 'Wellness' },
  { id: 'RPT-105', orderId: '#CLM-9287', customer: 'Edward Norton', date: '2026-03-16', timestamp: '16:21:09', value: 200.00, reason: 'Not as Described', status: 'Processing', carrier: 'DHL Express', collection: 'Electronics' },
  { id: 'RPT-106', orderId: '#CLM-9288', customer: 'Fiona Green', date: '2026-03-16', timestamp: '10:08:32', value: 320.00, reason: 'Quality Issue', status: 'Inspected', carrier: 'USPS', collection: 'Accessories' },
  { id: 'RPT-107', orderId: '#CLM-9289', customer: 'George Wilson', date: '2026-03-15', timestamp: '15:55:47', value: 68.00, reason: 'Changed Mind', status: 'Pending', carrier: 'FedEx', collection: 'Home' },
  { id: 'RPT-108', orderId: '#CLM-9290', customer: 'Hannah Abbott', date: '2026-03-15', timestamp: '09:30:11', value: 12.50, reason: 'Damaged', status: 'Approved', carrier: 'Royal Mail', collection: 'Global' },
];

const CARRIER_EXCEPTIONS: ReportRow[] = [
  { id: 'RPT-201', orderId: 'DHL-9284712834', customer: 'Edward Norton', date: '2026-03-19', timestamp: '06:45:12', value: 18.50, reason: 'Address Not Found', status: 'Exception', carrier: 'DHL Express', collection: '—' },
  { id: 'RPT-202', orderId: 'FDX-5829174621', customer: 'Bob Smith', date: '2026-03-18', timestamp: '12:30:44', value: 12.80, reason: 'Damaged in Transit', status: 'Investigation', carrier: 'FedEx', collection: '—' },
  { id: 'RPT-203', orderId: 'UPS-3948271635', customer: 'Charlie Davis', date: '2026-03-17', timestamp: '18:22:33', value: 22.10, reason: 'Delivery Refused', status: 'Returned', carrier: 'UPS', collection: '—' },
  { id: 'RPT-204', orderId: 'AP-8271639482', customer: 'Diana Prince', date: '2026-03-16', timestamp: '09:11:55', value: 8.90, reason: 'Weather Delay', status: 'Resolved', carrier: 'Australia Post', collection: '—' },
  { id: 'RPT-205', orderId: 'USPS-1948372615', customer: 'Fiona Green', date: '2026-03-15', timestamp: '14:05:28', value: 15.40, reason: 'Lost Package', status: 'Claim Filed', carrier: 'USPS', collection: '—' },
  { id: 'RPT-206', orderId: 'DH-1122334455', customer: 'Ian Wright', date: '2026-03-14', timestamp: '11:20:00', value: 45.00, reason: 'Customs Hold', status: 'Processing', carrier: 'DHL Global', collection: '—' },
];

const CUSTOMER_ACTIVITY: ReportRow[] = [
  { id: 'RPT-301', orderId: '—', customer: 'Sophia Miller', date: '2026-03-19', timestamp: '09:14:22', value: 8420, reason: 'Purchase', status: 'VIP', carrier: '—', collection: '47 orders' },
  { id: 'RPT-302', orderId: '—', customer: 'James Chen', date: '2026-03-18', timestamp: '10:32:45', value: 5680, reason: 'Purchase', status: 'VIP', carrier: '—', collection: '31 orders' },
  { id: 'RPT-303', orderId: '—', customer: 'Olivia Brown', date: '2026-03-19', timestamp: '11:05:18', value: 1890, reason: 'Browse', status: 'Regular', carrier: '—', collection: '12 orders' },
  { id: 'RPT-304', orderId: '—', customer: 'Emma Davis', date: '2026-02-18', timestamp: '15:22:00', value: 340, reason: 'Return', status: 'At Risk', carrier: '—', collection: '3 orders' },
  { id: 'RPT-305', orderId: '—', customer: 'Ava Martinez', date: '2026-01-20', timestamp: '08:44:10', value: 95, reason: 'Browse', status: 'Inactive', carrier: '—', collection: '1 order' },
  { id: 'RPT-306', orderId: '—', customer: 'Noah Taylor', date: '2026-03-19', timestamp: '09:55:41', value: 3950, reason: 'Purchase', status: 'VIP', carrier: '—', collection: '22 orders' },
  { id: 'RPT-307', orderId: '—', customer: 'Jack Sparrow', date: '2026-03-20', timestamp: '23:10:00', value: 0, reason: 'Login', status: 'Regular', carrier: '—', collection: '0 orders' },
];

const DATA_MAP: Record<ReportType, ReportRow[]> = {
  financial_summary: FINANCIAL,
  refund_claims: REFUNDS,
  carrier_exceptions: CARRIER_EXCEPTIONS,
  customer_activity: CUSTOMER_ACTIVITY,
};

export const useReportData = (type: ReportType) =>
  useQuery({
    queryKey: ['report-data', type],
    queryFn: async (): Promise<ReportRow[]> => {
      await delay(800);
      return DATA_MAP[type];
    },
    staleTime: 30_000,
  });
