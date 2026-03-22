'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { cn } from '@/shared/lib/utils';
import { useRefundClaims, useRefundMetrics } from '@/domains/refunds/hooks/useRefundQueries';
import type { ClaimStatus, ResolutionPreference, ShippingLabelStatus } from '@/domains/refunds/types';
import { Card } from '@/shared/ui/atoms/Card';
import {
  Search,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  DollarSign,
  CreditCard,
  Clock,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Tag,
  FileText,
  Truck,
  Download,
  Repeat,
  Gift,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  X,
} from 'lucide-react';
import { CreateReturnModal, ReviewReturnModal } from '@/domains/returns/components';

/* ── Resolution Config ───────────────────────────── */
const resolutionConfig: Record<ResolutionPreference, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  store_credit: { label: 'Store Credit', bg: '#e6faf9', text: '#0c9e8e', icon: CreditCard },
  exchange: { label: 'Exchange', bg: '#dbeafe', text: '#1e40af', icon: Repeat },
  refund: { label: 'Refund', bg: '#f3f4f6', text: '#6b7280', icon: DollarSign },
};

/* ── Shipping Label Config ───────────────────────── */
const labelConfig: Record<ShippingLabelStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  generated: { label: 'Generated', bg: '#ecfdf3', text: '#12b76a', icon: CheckCircle },
  delayed: { label: 'Delayed', bg: '#fef2f2', text: '#ef4444', icon: AlertTriangle },
  not_required: { label: 'Not Required', bg: '#f3f4f6', text: '#6b7280', icon: XCircle },
};

/* ── Status Config ───────────────────────────────── */
const statusConfig: Record<ClaimStatus, { bg: string; text: string; icon: React.ElementType }> = {
  Approved: { bg: '#ecfdf3', text: '#12b76a', icon: CheckCircle },
  Pending: { bg: '#fffaeb', text: '#f79009', icon: Clock },
  Denied: { bg: '#fef2f2', text: '#ef4444', icon: XCircle },
  Processing: { bg: '#e8e9fe', text: '#5057f5', icon: RefreshCw },
  Inspected: { bg: '#e6faf9', text: '#0c9e8e', icon: Eye },
};

/* ── Carrier Logos ───────────────────────────────── */
const carrierEmoji: Record<string, string> = {
  'DHL Express': '📦', 'FedEx': '🟣', 'UPS': '🟤', 'Australia Post': '📮', 'USPS': '🇺🇸',
};

/* ── Metric Card ─────────────────────────────────── */
const MetricCard = ({ title, value, trend, icon: Icon, iconBg, iconColor, prefix }: {
  title: string; value: string; trend: number; icon: React.ElementType; iconBg: string; iconColor: string; prefix?: string;
}) => (
  <Card className="p-5 border-none bg-white relative overflow-hidden animate-fade-slide-up">
    <div className="flex items-start justify-between mb-4">
      <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">{title}</Typography>
      <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
        <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
      </div>
    </div>
    <Typography variant="h3" className="text-[28px] font-mono font-bold tracking-tighter text-neutral-900">{prefix}{value}</Typography>
    <div className="flex items-center gap-2 mt-2">
      <span className={`flex items-center gap-0.5 text-[11px] font-bold ${trend >= 0 ? 'text-status-success' : 'text-status-error'}`}>
        {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{trend >= 0 ? '+' : ''}{trend}%
      </span>
      <Typography variant="small" className="text-[10px] text-neutral-400">vs last 30 days</Typography>
    </div>
  </Card>
);

type SortDir = 'asc' | 'desc';

/* ── Page ─────────────────────────────────────────── */
export default function ReturnsManagementPage() {
  const { data: claims, isLoading } = useRefundClaims();
  const { data: metrics, isLoading: metricsLoading } = useRefundMetrics();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<ClaimStatus | null>(null);
  const [sortField, setSortField] = React.useState<'date' | 'amount' | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [actionOpen, setActionOpen] = React.useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedReturnClaim, setSelectedReturnClaim] = React.useState<any | null>(null);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const filtered = React.useMemo(() => {
    if (!claims) return [];
    let result = [...claims];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.id.toLowerCase().includes(q) || c.customer.name.toLowerCase().includes(q) || c.items[0]?.name.toLowerCase().includes(q));
    }
    if (statusFilter) result = result.filter((c) => c.status === statusFilter);
    if (sortField) {
      result.sort((a, b) => {
        const cmp = sortField === 'amount' ? a.totalValue - b.totalValue : a.createdAt.localeCompare(b.createdAt);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [claims, search, statusFilter, sortField, sortDir]);

  const statuses: ClaimStatus[] = ['Approved', 'Pending', 'Denied', 'Processing', 'Inspected'];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-2">
            <span>Dashboard</span><span>/</span><span className="text-neutral-600">Returns</span>
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            Returns{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">Management</span>
          </Typography>
          <Typography variant="lead" className="mt-1.5 text-[13px] font-medium text-neutral-500">
            Process return claims with revenue retention and carrier integrations.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2.5 w-full md:flex md:w-auto md:items-center">
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <FileText className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setCreateModalOpen(true)} variant="primary" size="sm" className="h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px] justify-center">
            <Zap className="mr-2 h-4 w-4" /> New Claim
          </Button>
        </div>
      </div>

      {/* ═══ Metrics ═══════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricsLoading ? (
          [...Array(4)].map((_, i) => <Card key={i} className="p-5 border-none bg-white animate-pulse"><div className="h-3 w-24 bg-neutral-200 rounded mb-6" /><div className="h-8 w-20 bg-neutral-200 rounded" /></Card>)
        ) : metrics ? (
          <>
            <MetricCard title="Total Returns" value={metrics.totalReturns.toLocaleString()} trend={metrics.totalReturnsTrend} icon={RefreshCw} iconBg="#e6faf9" iconColor="#0c9e8e" />
            <MetricCard title="Revenue Saved" value={metrics.revenueSaved.toLocaleString()} trend={metrics.revenueSavedTrend} icon={DollarSign} iconBg="#ecfdf3" iconColor="#12b76a" prefix="$" />
            <MetricCard title="Active Credit Issued" value={metrics.activeCreditIssued.toLocaleString()} trend={metrics.activeCreditTrend} icon={CreditCard} iconBg="#e8e9fe" iconColor="#5057f5" prefix="$" />
            <MetricCard title="Processing Latency" value={`${metrics.avgProcessingDays} days`} trend={metrics.avgProcessingTrend} icon={Clock} iconBg="#fffaeb" iconColor="#f79009" />
          </>
        ) : null}
      </div>

      {/* ═══ Status Summary ════════════════════════════ */}
      {metrics && (
        <div className="flex items-center gap-4 flex-wrap animate-fade-slide-up">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600"><Clock className="h-3.5 w-3.5" />{metrics.pendingCount} Pending</div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600"><CheckCircle className="h-3.5 w-3.5" />{metrics.approvedCount} Approved</div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-500"><XCircle className="h-3.5 w-3.5" />{metrics.deniedCount} Denied</div>
          <div className="ml-auto text-[10px] text-neutral-400 font-medium">Audit log active — all actions recorded</div>
        </div>
      )}

      {/* ═══ Returns Table ═════════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">Return Claims</Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">Manage and process return requests with full audit trail.</Typography>
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-neutral-200 self-start sm:self-auto"><MoreVertical className="h-4 w-4" /></Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-slide-up">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, name, or item..."
              className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200" />
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setStatusFilter(null)} className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', !statusFilter ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatusFilter(statusFilter === s ? null : s)}
                className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', statusFilter === s ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card animate-fade-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Claim ID</Typography></th>
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Customer</Typography></th>
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Item</Typography></th>
                  <th className="px-4 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('date')}>
                    <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Date</Typography>
                    {sortField === 'date' ? sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1 text-brand-primary" /> : <ChevronDown className="h-3 w-3 ml-1 text-brand-primary" /> : <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />}</div>
                  </th>
                  <th className="px-4 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('amount')}>
                    <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Amount</Typography>
                    {sortField === 'amount' ? sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1 text-brand-primary" /> : <ChevronDown className="h-3 w-3 ml-1 text-brand-primary" /> : <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />}</div>
                  </th>
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Status</Typography></th>
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Resolution</Typography></th>
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Shipping Label</Typography></th>
                  <th className="px-4 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Actions</Typography></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => <tr key={i}>{[...Array(9)].map((_, j) => <td key={j} className="px-4 py-4"><div className="h-4 rounded-md animate-shimmer" /></td>)}</tr>)
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-neutral-400 text-[13px]">No claims found</td></tr>
                ) : (
                  filtered.map((claim, idx) => {
                    const sc = statusConfig[claim.status];
                    const res = claim.resolution ? resolutionConfig[claim.resolution] : null;
                    const lbl = claim.shippingLabel ? labelConfig[claim.shippingLabel] : null;
                    const StatusIcon = sc.icon;
                    return (
                      <tr key={claim.id} onClick={() => setSelectedReturnClaim(claim)} className={cn('group transition-colors duration-150 cursor-pointer hover:bg-brand-primary/[0.02]', idx !== filtered.length - 1 && 'border-b border-neutral-200/80')}>
                        <td className="px-4 py-3.5"><Typography variant="small" className="font-mono font-bold text-neutral-900 text-[12px]">{claim.id}</Typography></td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[10px] font-bold flex-shrink-0">
                              {claim.customer.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div className="min-w-0">
                              <Typography variant="small" className="font-semibold text-neutral-900 text-[12px] truncate block">{claim.customer.name}</Typography>
                              <Typography variant="small" className="text-[9px] text-neutral-400 truncate block">{claim.customer.email}</Typography>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <Typography variant="small" className="text-[12px] text-neutral-900 font-medium truncate block max-w-[140px]">{claim.items[0]?.name}</Typography>
                          <Typography variant="small" className="text-[9px] text-neutral-400">{claim.reason}</Typography>
                        </td>
                        <td className="px-4 py-3.5 text-[12px] font-mono text-neutral-500">{claim.createdAt}</td>
                        <td className="px-4 py-3.5 text-[13px] font-mono font-bold text-neutral-900">${claim.totalValue.toFixed(2)}</td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                            <StatusIcon className="h-3 w-3" />{claim.status}
                          </span>
                        </td>
                        {/* Resolution Preference */}
                        <td className="px-4 py-3.5">
                          {res ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ backgroundColor: res.bg, color: res.text }}>
                              <res.icon className="h-3 w-3" />{res.label}
                            </span>
                          ) : (
                            <span className="text-[10px] text-neutral-300">—</span>
                          )}
                        </td>
                        {/* Shipping Label Status */}
                        <td className="px-4 py-3.5">
                          {lbl ? (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold" style={{ backgroundColor: lbl.bg, color: lbl.text }}>
                                <lbl.icon className="h-2.5 w-2.5" />{lbl.label}
                              </span>
                              {claim.carrier && <span className="text-[10px]" title={claim.carrier}>{carrierEmoji[claim.carrier]}</span>}
                            </div>
                          ) : (
                            <span className="text-[10px] text-neutral-300">—</span>
                          )}
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="relative">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setActionOpen(actionOpen === claim.id ? null : claim.id)}>
                              <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                            </Button>
                            {actionOpen === claim.id && (
                              <div className="absolute right-0 top-8 z-50 w-52 rounded-xl bg-white border border-neutral-200 shadow-xl p-1.5 animate-fade-slide-up">
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={(e) => { e.stopPropagation(); setActionOpen(null); setSelectedReturnClaim(claim); }}>
                                  <Eye className="h-3.5 w-3.5 text-neutral-400" /> View Details
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-emerald-700 hover:bg-emerald-50 transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedReturnClaim(claim); setActionOpen(null); }}>
                                  <Gift className="h-3.5 w-3.5" /> Issue Store Credit
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-blue-700 hover:bg-blue-50 transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedReturnClaim(claim); setActionOpen(null); }}>
                                  <Repeat className="h-3.5 w-3.5" /> Propose Exchange
                                </button>
                                <div className="my-1 h-px bg-neutral-100" />
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Download className="h-3.5 w-3.5 text-neutral-400" /> Download Label
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Truck className="h-3.5 w-3.5 text-neutral-400" /> Carrier Sync Audit
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Tag className="h-3.5 w-3.5 text-neutral-400" /> Change Carrier
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
            <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">Showing {filtered.length} of {claims?.length || 0} claims</Typography>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Previous</Button>
              <button className="h-8 w-8 rounded-lg bg-brand-primary text-white text-[11px] font-bold">1</button>
              <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">2</button>
              <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">3</button>
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Modals ══════════════════════════════════ */}
      <CreateReturnModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
      <ReviewReturnModal claim={selectedReturnClaim} onClose={() => setSelectedReturnClaim(null)} />
    </div>
  );
}
