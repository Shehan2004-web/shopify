/* ── User Role ────────────────────────────────────── */
export type UserRole = 'super_admin' | 'support_agent' | 'logistics_manager' | 'financial_analyst';
export type UserStatus = 'active' | 'suspended' | 'invited';

/* ── User ─────────────────────────────────────────── */
export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department: string;
  lastActive: string;
  status: UserStatus;
  joinedAt: string;
}

/* ── User Metrics ────────────────────────────────── */
export interface UserMetrics {
  totalActive: number;
  pendingInvites: number;
  securityAlerts: number;
}
