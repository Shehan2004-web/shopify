'use client';

import { useQuery } from '@tanstack/react-query';
import type { Customer, CustomerMetrics } from '../types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const CUSTOMERS: Customer[] = [
  { id: 'CUS-001', name: 'Sophia Miller', email: 'sophia@example.com', totalOrders: 47, totalSpent: 8420, lastActive: '2 hours ago', segment: 'vip', joinedAt: '2024-03-15', clv: 12500 },
  { id: 'CUS-002', name: 'James Chen', email: 'james@example.com', totalOrders: 31, totalSpent: 5680, lastActive: '1 day ago', segment: 'vip', joinedAt: '2024-06-22', clv: 8900 },
  { id: 'CUS-003', name: 'Olivia Brown', email: 'olivia@example.com', totalOrders: 12, totalSpent: 1890, lastActive: '3 hours ago', segment: 'regular', joinedAt: '2025-01-10', clv: 3200 },
  { id: 'CUS-004', name: 'Liam Wilson', email: 'liam@example.com', totalOrders: 8, totalSpent: 1240, lastActive: '5 days ago', segment: 'regular', joinedAt: '2025-04-18', clv: 2100 },
  { id: 'CUS-005', name: 'Emma Davis', email: 'emma@example.com', totalOrders: 3, totalSpent: 340, lastActive: '30 days ago', segment: 'at_risk', joinedAt: '2025-08-01', clv: 680 },
  { id: 'CUS-006', name: 'Noah Taylor', email: 'noah@example.com', totalOrders: 22, totalSpent: 3950, lastActive: '15 min ago', segment: 'vip', joinedAt: '2024-09-05', clv: 6400 },
  { id: 'CUS-007', name: 'Ava Martinez', email: 'ava@example.com', totalOrders: 1, totalSpent: 95, lastActive: '60 days ago', segment: 'inactive', joinedAt: '2025-10-20', clv: 190 },
  { id: 'CUS-008', name: 'William Garcia', email: 'william@example.com', totalOrders: 15, totalSpent: 2760, lastActive: '6 hours ago', segment: 'regular', joinedAt: '2025-02-14', clv: 4100 },
  { id: 'CUS-009', name: 'Isabella Lee', email: 'isabella@example.com', totalOrders: 5, totalSpent: 720, lastActive: '14 days ago', segment: 'at_risk', joinedAt: '2025-06-30', clv: 1200 },
  { id: 'CUS-010', name: 'Mason Kim', email: 'mason@example.com', totalOrders: 0, totalSpent: 0, lastActive: 'Never', segment: 'inactive', joinedAt: '2026-03-10', clv: 0 },
  { id: 'CUS-011', name: 'Charlotte Nguyen', email: 'charlotte@example.com', totalOrders: 28, totalSpent: 4320, lastActive: '1 hour ago', segment: 'vip', joinedAt: '2024-11-12', clv: 7200 },
  { id: 'CUS-012', name: 'Ethan Robinson', email: 'ethan@example.com', totalOrders: 9, totalSpent: 1580, lastActive: '2 days ago', segment: 'regular', joinedAt: '2025-05-25', clv: 2800 },
];

const METRICS: CustomerMetrics = {
  totalCustomers: 3842,
  totalCustomersTrend: 6.4,
  activeVip: 284,
  activeVipTrend: 12.8,
  avgClv: 4250,
  avgClvTrend: 8.1,
  churnRate: 3.2,
  churnRateTrend: -1.5,
};

export const useCustomers = () =>
  useQuery({
    queryKey: ['customers'],
    queryFn: async (): Promise<Customer[]> => {
      await delay(600);
      return CUSTOMERS;
    },
    staleTime: 30_000,
  });

export const useCustomerMetrics = () =>
  useQuery({
    queryKey: ['customer-metrics'],
    queryFn: async (): Promise<CustomerMetrics> => {
      await delay(400);
      return METRICS;
    },
    staleTime: 60_000,
  });
