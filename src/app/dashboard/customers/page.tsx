'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card } from '@/shared/ui/atoms/Card';
import { cn } from '@/shared/lib/utils';
import { AddCustomerModal } from '@/domains/customers/components/AddCustomerModal';
import { CustomerProfileModal } from '@/domains/customers/components/CustomerProfileModal';
import { useCustomers, useCustomerMetrics } from '@/domains/customers/hooks/useCustomerQueries';
import type { CustomerSegment } from '@/domains/customers/types';
import {
  Download,
  Users,
  Crown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  MoreVertical,
  Mail,
  CreditCard,
  ShoppingBag,
  UserPlus,
  Activity,
} from 'lucide-react';

/* ── Metric Card ─────────────────────────────────── */
const MetricCard = ({
  title, value, trend, trendLabel, icon: Icon, iconBg, iconColor, prefix, suffix,
}: {
  title: string; value: string; trend: number; trendLabel: string;
  icon: React.ElementType; iconBg: string; iconColor: string;
  prefix?: string; suffix?: string;
}) => {
  const isPositive = trend > 0;
  const isNeutral = trend === 0;
  return (
    <Card className="p-5 border-none bg-white relative overflow-hidden animate-fade-slide-up">
      <div className="flex items-start justify-between mb-4">
        <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">{title}</Typography>
        <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
          <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
        </div>
      </div>
      <Typography variant="h3" className="text-[28px] font-mono font-bold tracking-tighter text-neutral-900">
        {prefix}{value}{suffix}
      </Typography>
      <div className="flex items-center gap-2 mt-2">
        <div className={`flex items-center gap-0.5 text-[11px] font-bold ${isNeutral ? 'text-neutral-400' : isPositive ? 'text-status-success' : 'text-status-error'}`}>
          {isNeutral ? <span>—</span> : isPositive ? <><TrendingUp className="h-3 w-3" /> +{trend}%</> : <><TrendingDown className="h-3 w-3" /> {trend}%</>}
        </div>
        <Typography variant="small" className="text-[10px] text-neutral-400">{trendLabel}</Typography>
      </div>
      <div className="absolute bottom-0 right-0 w-[100px] h-[40px] opacity-10">
        <svg viewBox="0 0 100 40" fill="none" className="h-full w-full">
          <path d="M0 28 Q20 8, 40 22 T70 12 T100 25" stroke={iconColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </Card>
  );
};

/* ── Segment Config ──────────────────────────────── */
const segmentConfig: Record<CustomerSegment, { label: string; bg: string; text: string; dot: string }> = {
  vip: { label: 'VIP', bg: '#f5f0ff', text: '#7c3aed', dot: 'bg-purple-500' },
  regular: { label: 'Regular', bg: '#dbeafe', text: '#1e40af', dot: 'bg-blue-500' },
  at_risk: { label: 'At Risk', bg: '#fff7ed', text: '#c2410c', dot: 'bg-orange-500' },
  inactive: { label: 'Inactive', bg: '#f3f4f6', text: '#6b7280', dot: 'bg-neutral-400' },
};

/* ── Page ─────────────────────────────────────────── */
export default function CustomersPage() {
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { data: metrics, isLoading: metricsLoading } = useCustomerMetrics();
  const [search, setSearch] = React.useState('');
  const [segmentFilter, setSegmentFilter] = React.useState<CustomerSegment | null>(null);
  const [actionOpen, setActionOpen] = React.useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const filtered = React.useMemo(() => {
    if (!customers) return [];
    let result = [...customers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    if (segmentFilter) result = result.filter((c) => c.segment === segmentFilter);
    return result;
  }, [customers, search, segmentFilter]);

  const segments: CustomerSegment[] = ['vip', 'regular', 'at_risk', 'inactive'];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-2">
            <span>Dashboard</span><span>/</span><span className="text-neutral-600">Customers</span>
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            Customer{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">Intelligence</span>
          </Typography>
          <Typography variant="lead" className="mt-1.5 text-[13px] font-medium text-neutral-500">
            Customer lifetime value, segmentation, and behavioral analytics.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2.5 w-full md:flex md:w-auto md:items-center">
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} variant="primary" size="sm" className="h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px] justify-center">
            <UserPlus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>

      {/* ═══ CRM Metrics ═══════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricsLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="p-5 border-none bg-white animate-pulse">
              <div className="h-3 w-24 bg-neutral-200 rounded mb-6" />
              <div className="h-8 w-32 bg-neutral-200 rounded mb-3" />
              <div className="h-3 w-20 bg-neutral-100 rounded" />
            </Card>
          ))
        ) : metrics ? (
          <>
            <MetricCard title="Total Customers" value={metrics.totalCustomers.toLocaleString()} trend={metrics.totalCustomersTrend} trendLabel="vs last 30 days" icon={Users} iconBg="#e8e9fe" iconColor="#5057f5" />
            <MetricCard title="Active VIP Members" value={metrics.activeVip.toString()} trend={metrics.activeVipTrend} trendLabel="vs last 30 days" icon={Crown} iconBg="#f5f0ff" iconColor="#7c3aed" />
            <MetricCard title="Avg Lifetime Value" value={metrics.avgClv.toLocaleString()} trend={metrics.avgClvTrend} trendLabel="vs last quarter" icon={DollarSign} iconBg="#ecfdf3" iconColor="#12b76a" prefix="$" />
            <MetricCard title="Churn Rate" value={metrics.churnRate.toFixed(1)} trend={metrics.churnRateTrend} trendLabel="vs last 30 days" icon={Activity} iconBg="#fef2f2" iconColor="#ef4444" suffix="%" />
          </>
        ) : null}
      </div>

      {/* ═══ Segment Summary ═══════════════════════════ */}
      {customers && (
        <div className="flex items-center gap-3 flex-wrap animate-fade-slide-up">
          {segments.map((seg) => {
            const cfg = segmentConfig[seg];
            const count = customers.filter((c) => c.segment === seg).length;
            return (
              <div key={seg} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border" style={{ backgroundColor: cfg.bg, borderColor: `${cfg.text}18` }}>
                <span className={cn('h-2 w-2 rounded-full', cfg.dot)} />
                <span className="text-[12px] font-bold" style={{ color: cfg.text }}>{count} {cfg.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ Customer Table ════════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">Customer Directory</Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">Complete customer database with lifetime value and segmentation.</Typography>
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-neutral-200 self-start sm:self-auto"><MoreVertical className="h-4 w-4" /></Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-slide-up">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..."
              className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mr-1">Segment:</span>
            <button onClick={() => setSegmentFilter(null)} className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', !segmentFilter ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
            {segments.map((s) => (
              <button key={s} onClick={() => setSegmentFilter(segmentFilter === s ? null : s)}
                className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', segmentFilter === s ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>
                {segmentConfig[s].label}
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
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Customer</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Orders</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Total Spent</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">CLV</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Last Active</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Segment</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Actions</Typography></th>
                </tr>
              </thead>
              <tbody>
                {customersLoading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i}>{[...Array(7)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 rounded-md animate-shimmer" /></td>)}</tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-neutral-400 text-[13px]">No customers found</td></tr>
                ) : (
                  filtered.map((customer, idx) => {
                    const sc = segmentConfig[customer.segment];
                    return (
                      <tr key={customer.id} onClick={() => setSelectedCustomer(customer)} className={cn('group transition-colors duration-150 cursor-pointer hover:bg-brand-primary/[0.02]', idx !== filtered.length - 1 && 'border-b border-neutral-200/80')}>
                        {/* Customer */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[11px] font-bold flex-shrink-0">
                              {customer.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div className="min-w-0">
                              <Typography variant="small" className="font-semibold text-neutral-900 text-[13px] truncate block">{customer.name}</Typography>
                              <Typography variant="small" className="text-[10px] text-neutral-400 truncate block">{customer.email}</Typography>
                            </div>
                          </div>
                        </td>
                        {/* Orders */}
                        <td className="px-5 py-3.5 text-[13px] font-mono font-bold text-neutral-900">{customer.totalOrders}</td>
                        {/* Total Spent */}
                        <td className="px-5 py-3.5 text-[13px] font-mono font-bold text-neutral-900">${customer.totalSpent.toLocaleString()}</td>
                        {/* CLV */}
                        <td className="px-5 py-3.5">
                          <Typography variant="small" className="text-[13px] font-mono font-bold text-emerald-600">${customer.clv.toLocaleString()}</Typography>
                        </td>
                        {/* Last Active */}
                        <td className="px-5 py-3.5 text-[12px] text-neutral-500 font-medium">{customer.lastActive}</td>
                        {/* Segment */}
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                            <span className={cn('h-1.5 w-1.5 rounded-full', sc.dot)} />
                            {sc.label}
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="relative">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={(e) => { e.stopPropagation(); setActionOpen(actionOpen === customer.id ? null : customer.id); }}>
                              <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                            </Button>
                            {actionOpen === customer.id && (
                              <div className="absolute right-0 top-8 z-50 w-48 rounded-xl bg-white border border-neutral-200 shadow-xl p-1.5 animate-fade-slide-up">
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <ShoppingBag className="h-3.5 w-3.5 text-neutral-400" /> Purchase History
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Mail className="h-3.5 w-3.5 text-neutral-400" /> Send Email
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-emerald-700 hover:bg-emerald-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <CreditCard className="h-3.5 w-3.5" /> Issue Store Credit
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
                {/* DOM Virtualization Placeholder */}
                <tr className="hidden"><td colSpan={7}>{/* VirtualPlaceholder: batch pre-render */}</td></tr>
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
            <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
              Showing {filtered.length} of {customers?.length || 0} customers
            </Typography>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Previous</Button>
              <div className="flex items-center gap-0.5">
                <button className="h-8 w-8 rounded-lg bg-brand-primary text-white text-[11px] font-bold">1</button>
                <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">2</button>
              </div>
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Next</Button>
            </div>
          </div>
        </div>
      </div>
      <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <CustomerProfileModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  );
}
