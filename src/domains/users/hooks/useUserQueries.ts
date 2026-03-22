'use client';

import { useQuery } from '@tanstack/react-query';
import type { AppUser, UserMetrics } from '../types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const USERS: AppUser[] = [
  { id: 'USR-001', name: 'Jason Reed', email: 'jason@shofiy.com', role: 'super_admin', department: 'Engineering', lastActive: '2 min ago', status: 'active', joinedAt: '2025-01-15' },
  { id: 'USR-002', name: 'Sarah Kim', email: 'sarah@shofiy.com', role: 'support_agent', department: 'Customer Support', lastActive: '15 min ago', status: 'active', joinedAt: '2025-03-22' },
  { id: 'USR-003', name: 'Michael Chen', email: 'michael@shofiy.com', role: 'logistics_manager', department: 'Operations', lastActive: '1 hour ago', status: 'active', joinedAt: '2025-05-10' },
  { id: 'USR-004', name: 'Emily Watson', email: 'emily@shofiy.com', role: 'financial_analyst', department: 'Finance', lastActive: '3 hours ago', status: 'active', joinedAt: '2025-06-01' },
  { id: 'USR-005', name: 'David Park', email: 'david@shofiy.com', role: 'support_agent', department: 'Customer Support', lastActive: '1 day ago', status: 'suspended', joinedAt: '2025-07-14' },
  { id: 'USR-006', name: 'Ana Rodriguez', email: 'ana@shofiy.com', role: 'logistics_manager', department: 'Operations', lastActive: '5 min ago', status: 'active', joinedAt: '2025-08-20' },
  { id: 'USR-007', name: 'Tom Baker', email: 'tom@shofiy.com', role: 'financial_analyst', department: 'Finance', lastActive: 'Never', status: 'invited', joinedAt: '2026-03-18' },
  { id: 'USR-008', name: 'Lisa Nguyen', email: 'lisa@shofiy.com', role: 'support_agent', department: 'Customer Support', lastActive: '30 min ago', status: 'active', joinedAt: '2025-09-05' },
  { id: 'USR-009', name: 'Chris Johnson', email: 'chris@shofiy.com', role: 'super_admin', department: 'Engineering', lastActive: '10 min ago', status: 'active', joinedAt: '2025-02-01' },
  { id: 'USR-010', name: 'Rachel Green', email: 'rachel@shofiy.com', role: 'logistics_manager', department: 'Operations', lastActive: 'Never', status: 'invited', joinedAt: '2026-03-19' },
];

const METRICS: UserMetrics = {
  totalActive: 7,
  pendingInvites: 2,
  securityAlerts: 1,
};

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<AppUser[]> => {
      await delay(500);
      return USERS;
    },
    staleTime: 30_000,
  });

export const useUserMetrics = () =>
  useQuery({
    queryKey: ['user-metrics'],
    queryFn: async (): Promise<UserMetrics> => {
      await delay(300);
      return METRICS;
    },
    staleTime: 60_000,
  });
