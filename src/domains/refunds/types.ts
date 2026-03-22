/* ── Refund Claim ────────────────────────────────── */
export type ClaimStatus = 'Approved' | 'Pending' | 'Denied' | 'Processing' | 'Inspected';
export type ResolutionPreference = 'refund' | 'exchange' | 'store_credit';
export type ShippingLabelStatus = 'generated' | 'delayed' | 'not_required';
export type CarrierName = 'DHL Express' | 'FedEx' | 'UPS' | 'Australia Post' | 'USPS';

export interface RefundClaim {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: {
    name: string;
    sku: string;
    quantity: number;
    price: number;
  }[];
  totalValue: number;
  status: ClaimStatus;
  reason: string;
  createdAt: string;
  updatedAt: string;
  resolution?: ResolutionPreference;
  trackingNumber?: string;
  shippingLabel?: ShippingLabelStatus;
  carrier?: CarrierName;
  /* Audit Log token — stores admin actions */
  auditLog?: AuditEntry[];
}

/* ── Audit Log ───────────────────────────────────── */
export interface AuditEntry {
  adminUserId: string;
  action: 'approve' | 'deny' | 'issue_credit' | 'escalate' | 'comment';
  timestamp: string;
  note?: string;
}

/* ── Refund Metrics ──────────────────────────────── */
export interface RefundMetrics {
  totalReturns: number;
  totalReturnsTrend: number;
  revenueSaved: number;
  revenueSavedTrend: number;
  activeCreditIssued: number;
  activeCreditTrend: number;
  avgProcessingDays: number;
  avgProcessingTrend: number;
  pendingCount: number;
  approvedCount: number;
  deniedCount: number;
}

/* ── Filters ─────────────────────────────────────── */
export interface RefundFilters {
  status: ClaimStatus | null;
  search: string;
  dateRange: { from: string; to: string } | null;
  sortField: 'date' | 'amount' | 'status' | null;
  sortDir: 'asc' | 'desc';
}

/* ── Bulk Action ─────────────────────────────────── */
export interface BulkRefundAction {
  claimIds: string[];
  action: 'approve' | 'deny' | 'issue_credit';
  note?: string;
}

/* Legacy re-export for backward compat */
export interface Refund {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
