'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card } from '@/shared/ui/atoms/Card';
import { Badge } from '@/shared/ui/atoms/Badge';
import { cn } from '@/shared/lib/utils';
import { TrackingOverview } from '@/domains/shipping/components/TrackingOverview';
import { GenerateLabelModal } from '@/domains/shipping/components/GenerateLabelModal';
import { TrackPackageModal } from '@/domains/shipping/components/TrackPackageModal';
import { useShipments, useShippingMetrics } from '@/domains/shipping/hooks/useShippingQueries';
import { type LucideIcon,
  
  MoreVertical,
  Truck,
  Clock,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Eye,
  Tag,
  Printer,
  MapPin,
  Filter,
  ExternalLink,
} from 'lucide-react';
import type { ShipmentStatus } from '@/domains/shipping/types';

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
          <path d="M0 30 Q20 10, 35 22 T65 8 T100 18" stroke={iconColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </Card>
  );
};

/* ── Status Config ───────────────────────────────── */
const statusConfig: Record<ShipmentStatus, { label: string; variant: 'info' | 'warning' | 'success' | 'error' | 'brand-teal' | 'neutral'; icon: LucideIcon; pulse?: boolean }> = {
  label_created: { label: 'Label Created', variant: 'warning', icon: Tag },
  in_transit: { label: 'In Transit', variant: 'info', icon: Truck, pulse: true },
  out_for_delivery: { label: 'Out for Delivery', variant: 'brand-teal', icon: MapPin, pulse: true },
  delivered: { label: 'Delivered', variant: 'success', icon: Eye },
  exception: { label: 'Exception', variant: 'error', icon: AlertTriangle },
  returned: { label: 'Returned', variant: 'neutral', icon: Truck },
};

/* ── Carrier badge colors ────────────────────────── */
const carrierColors: Record<string, { bg: string; text: string }> = {
  'DHL Express': { bg: '#fff3cd', text: '#856404' },
  'FedEx': { bg: '#ede9fe', text: '#5b21b6' },
  'UPS': { bg: '#fef3c7', text: '#92400e' },
  'Australia Post': { bg: '#fce7f3', text: '#9d174d' },
  'USPS': { bg: '#dbeafe', text: '#1e40af' },
  'Royal Mail': { bg: '#fee2e2', text: '#991b1b' },
};

/* ── Sort types ──────────────────────────────────── */
type SortField = 'eta' | 'carrier' | 'status' | null;
type SortDir = 'asc' | 'desc';

/* ── Shipments Table ─────────────────────────────── */
const ShipmentsTable = () => {
  const { data: shipments, isLoading } = useShipments();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<ShipmentStatus | null>(null);
  const [sortField, setSortField] = React.useState<SortField>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [selectedTrackingShipment, setSelectedTrackingShipment] = React.useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const toggleSort = (field: SortField) => {
    if (sortField === field) { setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }
    else { setSortField(field); setSortDir('desc'); }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
    return sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1 text-brand-primary" /> : <ChevronDown className="h-3 w-3 ml-1 text-brand-primary" />;
  };

  const filtered = React.useMemo(() => {
    if (!shipments) return [];
    let result = [...shipments];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.trackingId.toLowerCase().includes(q) || s.customer.name.toLowerCase().includes(q) || s.carrier.toLowerCase().includes(q));
    }
    if (statusFilter) result = result.filter((s) => s.status === statusFilter);
    if (sortField) {
      result.sort((a, b) => {
        let cmp = 0;
        if (sortField === 'eta') cmp = a.eta.localeCompare(b.eta);
        if (sortField === 'carrier') cmp = a.carrier.localeCompare(b.carrier);
        if (sortField === 'status') cmp = a.status.localeCompare(b.status);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [shipments, search, statusFilter, sortField, sortDir]);

  const allStatuses: ShipmentStatus[] = ['label_created', 'in_transit', 'out_for_delivery', 'delivered', 'exception'];

  return (
    <div className="flex flex-col gap-4 animate-fade-slide-up">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracking ID, customer, carrier..."
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setStatusFilter(null)} className={cn('px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-200', !statusFilter ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
          {allStatuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(statusFilter === s ? null : s)}
              className={cn('px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-200', statusFilter === s ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:bg-neutral-100')}>
              {statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/60">
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Tracking ID</Typography></th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('carrier')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Carrier</Typography><SortIcon field="carrier" /></div>
                </th>
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Customer</Typography></th>
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Route</Typography></th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('eta')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">ETA</Typography><SortIcon field="eta" /></div>
                </th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('status')}>
                  <div className="flex items-center"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Status</Typography><SortIcon field="status" /></div>
                </th>
                <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Actions</Typography></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 rounded-md animate-shimmer" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-neutral-400 text-[13px]">No shipments found</td></tr>
              ) : (
                filtered.map((shipment, idx) => {
                  const sc = statusConfig[shipment.status];
                  const cc = carrierColors[shipment.carrier] || { bg: '#f3f4f6', text: '#374151' };
                  return (
                    <tr key={shipment.id} onClick={() => setSelectedTrackingShipment(shipment)} className={cn('group transition-colors duration-150 cursor-pointer hover:bg-brand-primary/[0.02]', idx !== filtered.length - 1 && 'border-b border-neutral-200/80')}>
                      {/* Tracking ID */}
                      <td className="px-5 py-3.5">
                        <Typography variant="small" className="font-mono font-bold text-neutral-900 text-[12px]">{shipment.trackingId.slice(0, 16)}</Typography>
                        <Typography variant="small" className="text-[9px] text-neutral-400 block">{shipment.weight}</Typography>
                      </td>
                      {/* Carrier */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold" style={{ backgroundColor: cc.bg, color: cc.text }}>
                          {shipment.carrier}
                        </span>
                      </td>
                      {/* Customer */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[10px] font-bold flex-shrink-0">
                            {shipment.customer.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <Typography variant="small" className="font-semibold text-neutral-900 text-[13px] truncate block">{shipment.customer.name}</Typography>
                            <Typography variant="small" className="text-[10px] text-neutral-400 truncate block">{shipment.customer.email}</Typography>
                          </div>
                        </div>
                      </td>
                      {/* Route */}
                      <td className="px-5 py-3.5">
                        <Typography variant="small" className="text-[11px] text-neutral-600 font-medium">{shipment.origin}</Typography>
                        <Typography variant="small" className="text-[9px] text-neutral-400 flex items-center gap-1">→ {shipment.destination}</Typography>
                      </td>
                      {/* ETA */}
                      <td className="px-5 py-3.5 text-[12px] text-neutral-500 font-medium font-mono">{shipment.eta}</td>
                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <Badge dot pulse={sc.pulse} icon={sc.icon} variant={sc.variant}>{sc.label}</Badge>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button variant="ghost" size="sm" className="h-7 rounded-lg px-2.5 text-[10px]">
                            <MapPin className="mr-1 h-3 w-3" /> Track
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                            <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
          <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
            Showing {filtered.length} of {shipments?.length || 0} shipments
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
      <TrackPackageModal shipment={selectedTrackingShipment} onClose={() => setSelectedTrackingShipment(null)} />
    </div>
  );
};

/* ── Page ─────────────────────────────────────────── */
export default function ShippingPage() {
  const { data: metrics, isLoading } = useShippingMetrics();
  const [isGenerateModalOpen, setIsGenerateModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-2">
            <span>Dashboard</span><span>/</span><span className="text-neutral-600">Shipping</span>
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            Reverse{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">Logistics</span>
          </Typography>
          <Typography variant="lead" className="mt-1.5 text-[13px] font-medium text-neutral-500">
            Monitor return shipments, carrier performance, and delivery exceptions.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2.5 w-full md:flex md:w-auto md:items-center">
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button onClick={() => setIsGenerateModalOpen(true)} variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <Printer className="mr-2 h-4 w-4" /> Generate Label
          </Button>
          <Button variant="primary" size="sm" className="col-span-2 md:col-span-1 h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px] justify-center">
            <ExternalLink className="mr-2 h-4 w-4" /> Track Package
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
            <MetricCard title="Active Shipments" value={metrics.activeShipments.toString()} trend={metrics.activeShipmentsTrend} trendLabel="vs last 30 days" icon={Truck} iconBg="#e8e9fe" iconColor="#5057f5" />
            <MetricCard title="Avg Transit Time" value={metrics.avgTransitDays.toFixed(1)} trend={metrics.avgTransitTrend} trendLabel="vs last 30 days" icon={Clock} iconBg="#e6faf9" iconColor="#00b2a9" suffix=" days" />
            <MetricCard title="Total Carrier Costs" value={metrics.totalCarrierCost.toLocaleString()} trend={metrics.carrierCostTrend} trendLabel="vs last 30 days" icon={DollarSign} iconBg="#fffaeb" iconColor="#f79009" prefix="$" />
            <MetricCard title="Delivery Exceptions" value={metrics.exceptions.toString()} trend={metrics.exceptionsTrend} trendLabel="vs last 30 days" icon={AlertTriangle} iconBg="#fef2f2" iconColor="#ef4444" />
          </>
        ) : null}
      </div>

      {/* ═══ Live Tracking Overview ════════════════════ */}
      <TrackingOverview />

      {/* ═══ Active Shipments Table ════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">
              Active Shipments
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">
              Real-time tracking for all return shipments.
            </Typography>
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-neutral-200 self-start sm:self-auto">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <ShipmentsTable />
      </div>
      <GenerateLabelModal isOpen={isGenerateModalOpen} onClose={() => setIsGenerateModalOpen(false)} />
    </div>
  );
}
