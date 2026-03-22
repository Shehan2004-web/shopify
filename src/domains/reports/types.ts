/* ── Report Type ──────────────────────────────────── */
export type ReportType = 'financial_summary' | 'refund_claims' | 'carrier_exceptions' | 'customer_activity';

/* ── Report Row ──────────────────────────────────── */
export interface ReportRow {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  timestamp: string;
  value: number;
  reason: string;
  status: string;
  carrier: string;
  collection: string;
}

/* ── Report Filters ──────────────────────────────── */
export interface ReportFilters {
  reportType: ReportType;
  dateFrom: string;
  dateTo: string;
  status: string;
  customer: string;
  collection: string;
}
