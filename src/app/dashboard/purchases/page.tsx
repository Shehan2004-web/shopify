'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card } from '@/shared/ui/atoms/Card';
import { Badge } from '@/shared/ui/atoms/Badge';
import { cn } from '@/shared/lib/utils';
import { CreateOrderModal } from '@/domains/purchases/components/CreateOrderModal';
import { OrderDetailsModal } from '@/domains/purchases/components/OrderDetailsModal';
import { usePurchaseOrders, usePurchaseMetrics } from '@/domains/purchases/hooks/usePurchaseQueries';
import type { PaymentStatus, FulfillmentStatus } from '@/domains/purchases/types';
import { type LucideIcon,
  Download,
  Plus,
  MoreVertical,
  DollarSign,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Check,
  CircleDot,
  Truck,
  XCircle,
  Clock,
  RotateCcw,
  FileText,
  Mail,
  Package,
  AlertCircle,
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
          <path d="M0 32 Q15 15, 30 25 T60 10 T100 20" stroke={iconColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </Card>
  );
};

/* ── Status Config ───────────────────────────────── */
const paymentConfig: Record<PaymentStatus, { label: string; variant: 'success' | 'warning' | 'neutral' | 'error' | 'info' | 'brand-teal' | 'brand-orange'; icon: LucideIcon }> = {
  paid: { label: 'Paid', variant: 'success', icon: Check },
  pending: { label: 'Pending', variant: 'warning', icon: Clock },
  refunded: { label: 'Refunded', variant: 'info', icon: RotateCcw },
};

const fulfillmentConfig: Record<FulfillmentStatus, { label: string; variant: 'success' | 'warning' | 'neutral' | 'error' | 'info' | 'brand-teal' | 'brand-orange'; icon: LucideIcon }> = {
  unfulfilled: { label: 'Unfulfilled', variant: 'error', icon: XCircle },
  processing: { label: 'Processing', variant: 'info', icon: CircleDot },
  dispatched: { label: 'Dispatched', variant: 'brand-teal', icon: Truck },
  delivered: { label: 'Delivered', variant: 'success', icon: Package },
};

/* ── Sort / Filter types ─────────────────────────── */
type SortField = 'date' | 'amount' | 'payment' | 'fulfillment' | null;
type SortDir = 'asc' | 'desc';

/* ── Orders Table ────────────────────────────────── */
const OrdersTable = () => {
  const { data: orders, isLoading } = usePurchaseOrders();
  const [search, setSearch] = React.useState('');
  const [paymentFilter, setPaymentFilter] = React.useState<PaymentStatus | null>(null);
  const [fulfillmentFilter, setFulfillmentFilter] = React.useState<FulfillmentStatus | null>(null);
  const [sortField, setSortField] = React.useState<SortField>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [actionOpen, setActionOpen] = React.useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = React.useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const toggleSort = (field: SortField) => {
    if (sortField === field) { setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }
    else { setSortField(field); setSortDir('desc'); }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
    return sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1 text-brand-primary" /> : <ChevronDown className="h-3 w-3 ml-1 text-brand-primary" />;
  };

  const filtered = React.useMemo(() => {
    if (!orders) return [];
    let result = [...orders];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((o) => o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.customer.email.toLowerCase().includes(q));
    }
    if (paymentFilter) result = result.filter((o) => o.paymentStatus === paymentFilter);
    if (fulfillmentFilter) result = result.filter((o) => o.fulfillmentStatus === fulfillmentFilter);
    if (sortField) {
      result.sort((a, b) => {
        let cmp = 0;
        if (sortField === 'date') cmp = a.date.localeCompare(b.date);
        if (sortField === 'amount') cmp = a.totalAmount - b.totalAmount;
        if (sortField === 'payment') cmp = a.paymentStatus.localeCompare(b.paymentStatus);
        if (sortField === 'fulfillment') cmp = a.fulfillmentStatus.localeCompare(b.fulfillmentStatus);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [orders, search, paymentFilter, fulfillmentFilter, sortField, sortDir]);

  const paymentStatuses: PaymentStatus[] = ['paid', 'pending', 'refunded'];
  const fulfillmentStatuses: FulfillmentStatus[] = ['unfulfilled', 'processing', 'dispatched', 'delivered'];

  return (
    <div className="flex flex-col gap-4 animate-fade-slide-up">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID or customer..."
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Payment filters */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mr-1">Payment:</span>
            <button onClick={() => setPaymentFilter(null)} className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', !paymentFilter ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
            {paymentStatuses.map((s) => (
              <button key={s} onClick={() => setPaymentFilter(paymentFilter === s ? null : s)}
                className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all capitalize', paymentFilter === s ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>
                {paymentConfig[s].label}
              </button>
            ))}
          </div>
          {/* Fulfillment filters */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mr-1">Fulfill:</span>
            <button onClick={() => setFulfillmentFilter(null)} className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', !fulfillmentFilter ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
            {fulfillmentStatuses.map((s) => (
              <button key={s} onClick={() => setFulfillmentFilter(fulfillmentFilter === s ? null : s)}
                className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', fulfillmentFilter === s ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>
                {fulfillmentConfig[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/60">
                <th className="px-5 py-3.5 w-[100px]"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Order ID</Typography></th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('date')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Date</Typography><SortIcon field="date" /></div>
                </th>
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Customer</Typography></th>
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Items</Typography></th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('amount')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Total</Typography><SortIcon field="amount" /></div>
                </th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('payment')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Payment</Typography><SortIcon field="payment" /></div>
                </th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('fulfillment')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Fulfillment</Typography><SortIcon field="fulfillment" /></div>
                </th>
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Actions</Typography></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>{[...Array(8)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 rounded-md animate-shimmer" /></td>)}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-neutral-400 text-[13px]">No orders found</td></tr>
              ) : (
                filtered.map((order, idx) => {
                  const pc = paymentConfig[order.paymentStatus];
                  const fc = fulfillmentConfig[order.fulfillmentStatus];
                  return (
                    <tr key={order.id} onClick={() => setSelectedOrder(order)} className={cn('group transition-colors duration-150 cursor-pointer hover:bg-brand-primary/[0.02]', idx !== filtered.length - 1 && 'border-b border-neutral-200/80')}>
                      {/* Order ID */}
                      <td className="px-5 py-3.5">
                        <Typography variant="small" className="font-mono font-bold text-neutral-900 text-[12px]">{order.id}</Typography>
                      </td>
                      {/* Date */}
                      <td className="px-5 py-3.5 text-[12px] text-neutral-500 font-medium font-mono">{order.date}</td>
                      {/* Customer */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[10px] font-bold flex-shrink-0">
                            {order.customer.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <Typography variant="small" className="font-semibold text-neutral-900 text-[13px] truncate block">{order.customer.name}</Typography>
                            <Typography variant="small" className="text-[10px] text-neutral-400 truncate block">{order.customer.email}</Typography>
                          </div>
                        </div>
                      </td>
                      {/* Items */}
                      <td className="px-5 py-3.5">
                        <Typography variant="small" className="text-[12px] text-neutral-600 font-medium">{order.itemsSummary}</Typography>
                        <Typography variant="small" className="text-[10px] text-neutral-400">{order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}</Typography>
                      </td>
                      {/* Total */}
                      <td className="px-5 py-3.5 text-[13px] font-mono font-bold text-neutral-900">${order.totalAmount.toFixed(2)}</td>
                      {/* Payment Status */}
                      <td className="px-5 py-3.5"><Badge dot icon={pc.icon} variant={pc.variant}>{pc.label}</Badge></td>
                      {/* Fulfillment Status */}
                      <td className="px-5 py-3.5"><Badge dot icon={fc.icon} variant={fc.variant}>{fc.label}</Badge></td>
                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="relative">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={(e) => { e.stopPropagation(); setActionOpen(actionOpen === order.id ? null : order.id); }}>
                            <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                          </Button>
                          {actionOpen === order.id && (
                            <div className="absolute right-0 top-8 z-50 w-44 rounded-xl bg-white border border-neutral-200 shadow-xl p-1.5 animate-fade-slide-up">
                              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                <FileText className="h-3.5 w-3.5 text-neutral-400" /> View Invoice
                              </button>
                              {order.fulfillmentStatus === 'unfulfilled' && (
                                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-emerald-700 hover:bg-emerald-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Check className="h-3.5 w-3.5" /> Mark as Fulfilled
                                </button>
                              )}
                              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                <Mail className="h-3.5 w-3.5 text-neutral-400" /> Contact Customer
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}

              {/* DOM Virtualization Placeholders */}
              {/* Hidden rows for virtual scroll pre-rendering */}
              <tr className="hidden"><td colSpan={8}>{/* VirtualPlaceholder: next batch pre-rendered here */}</td></tr>
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
          <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
            Showing {filtered.length} of {orders?.length || 0} orders
          </Typography>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Previous</Button>
            <div className="flex items-center gap-0.5">
              <button className="h-8 w-8 rounded-lg bg-brand-primary text-white text-[11px] font-bold">1</button>
              <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">2</button>
              <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">3</button>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Next</Button>
          </div>
        </div>
      </div>
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

/* ── Page ─────────────────────────────────────────── */
export default function PurchasesPage() {
  const { data: metrics, isLoading } = usePurchaseMetrics();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-2">
            <span>Dashboard</span><span>/</span><span className="text-neutral-600">Purchases</span>
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            Purchase{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">Management</span>
          </Typography>
          <Typography variant="lead" className="mt-1.5 text-[13px] font-medium text-neutral-500">
            Track orders, manage payments, and oversee fulfillment across all channels.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2.5 w-full md:flex md:w-auto md:items-center">
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)} variant="primary" size="sm" className="h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px] justify-center">
            <Plus className="mr-2 h-4 w-4" /> New Order
          </Button>
        </div>
      </div>

      {/* ═══ Metric Cards ══════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="p-5 border-none bg-white animate-pulse">
              <div className="h-3 w-24 bg-neutral-200 rounded mb-6" />
              <div className="h-8 w-32 bg-neutral-200 rounded mb-3" />
              <div className="h-3 w-20 bg-neutral-100 rounded" />
            </Card>
          ))
        ) : metrics ? (
          <>
            <MetricCard title="Today's Revenue" value={metrics.todayRevenue.toLocaleString()} trend={metrics.todayRevenueTrend} trendLabel="vs yesterday" icon={DollarSign} iconBg="#ecfdf3" iconColor="#12b76a" prefix="$" />
            <MetricCard title="Orders to Fulfill" value={metrics.ordersToFulfill.toString()} trend={metrics.ordersToFulfillTrend} trendLabel="vs yesterday" icon={ShoppingCart} iconBg="#fffaeb" iconColor="#f79009" />
            <MetricCard title="Average Order Value" value={metrics.aov.toFixed(2)} trend={metrics.aovTrend} trendLabel="vs last 7 days" icon={BarChart3} iconBg="#e8e9fe" iconColor="#5057f5" prefix="$" />
            <MetricCard title="Abandoned Carts" value={metrics.abandonedCarts.toString()} trend={metrics.abandonedCartsTrend} trendLabel="vs yesterday" icon={AlertCircle} iconBg="#fef2f2" iconColor="#ef4444" />
          </>
        ) : null}
      </div>

      {/* ═══ Quick Stats Row ═══════════════════════════ */}
      {metrics && (
        <div className="flex items-center gap-3 flex-wrap animate-fade-slide-up">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/50">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[12px] font-bold text-amber-700">{metrics.ordersToFulfill} Awaiting Fulfillment</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/50">
            <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[12px] font-bold text-emerald-700">${metrics.todayRevenue} Revenue Today</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200/50">
            <ShoppingCart className="h-3.5 w-3.5 text-red-500" />
            <span className="text-[12px] font-bold text-red-700">{metrics.abandonedCarts} Cart Abandons</span>
          </div>
        </div>
      )}

      {/* ═══ Orders Table ══════════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">
              Order History
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">
              Complete purchase records with payment and fulfillment tracking.
            </Typography>
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-neutral-200 self-start sm:self-auto">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <OrdersTable />
      </div>
      <CreateOrderModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
