'use client';

import * as React from 'react';
import { Badge } from '@/shared/ui/atoms/Badge';
import { Typography } from '@/shared/ui/atoms/Typography';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';
import { type LucideIcon,
  Search,
  ArrowUpDown,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Clock,
  Eye,
  Package,
} from 'lucide-react';
import { ReviewRefundModal } from './ReviewRefundModal';

/* ── Claim Types ─────────────────────────────────── */
export interface Claim {
  id: string;
  customer: string;
  email: string;
  item: string;
  date: string;
  amount: string;
  status: 'Approved' | 'Pending' | 'Denied' | 'Processing' | 'Inspected';
  reason: string;
}

const claims: Claim[] = [
  { id: '#CLM-9283', customer: 'Alice Johnson', email: 'alice@mail.com', item: 'Urban Jacket Pro', date: '2026-03-18', amount: '$120.00', status: 'Approved', reason: 'Defective' },
  { id: '#CLM-9284', customer: 'Bob Smith', email: 'bob@mail.com', item: 'Running Shoes V2', date: '2026-03-18', amount: '$45.50', status: 'Pending', reason: 'Wrong Size' },
  { id: '#CLM-9285', customer: 'Charlie Davis', email: 'charlie@mail.com', item: 'Wireless Earbuds', date: '2026-03-17', amount: '$210.00', status: 'Denied', reason: 'Past Return Window' },
  { id: '#CLM-9286', customer: 'Diana Prince', email: 'diana@mail.com', item: 'Yoga Mat Elite', date: '2026-03-17', amount: '$85.00', status: 'Approved', reason: 'Wrong Color' },
  { id: '#CLM-9287', customer: 'Edward Norton', email: 'edward@mail.com', item: 'Smart Watch Pro', date: '2026-03-16', amount: '$150.00', status: 'Processing', reason: 'Not as Described' },
  { id: '#CLM-9288', customer: 'Fiona Green', email: 'fiona@mail.com', item: 'Leather Bag Mini', date: '2026-03-16', amount: '$320.00', status: 'Inspected', reason: 'Quality Issue' },
  { id: '#CLM-9289', customer: 'George Wilson', email: 'george@mail.com', item: 'Desk Lamp RGB', date: '2026-03-15', amount: '$68.00', status: 'Pending', reason: 'Changed Mind' },
];

/* ── Status Badge Mapping ─────────────────────────── */
const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand-teal' | 'brand-orange'; icon: LucideIcon; pulse?: boolean }> = {
  Approved: { variant: 'success', icon: Check },
  Pending: { variant: 'warning', icon: Clock, pulse: true },
  Denied: { variant: 'error', icon: X },
  Processing: { variant: 'info', icon: Package, pulse: true },
  Inspected: { variant: 'brand-teal', icon: Eye },
};

type SortField = 'date' | 'amount' | 'status' | null;
type SortDir = 'asc' | 'desc';

/* ── Virtualization placeholder rows ──────────────── */
const VirtualPlaceholder = () => (
  <tr>
    {[...Array(7)].map((_, i) => (
      <td key={i} className="px-5 py-4">
        <div className="h-4 rounded-md animate-shimmer" />
      </td>
    ))}
  </tr>
);

export const ClaimsTable = () => {
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = React.useState<Claim | null>(null);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="h-3 w-3 ml-1 text-brand-primary" />
    ) : (
      <ChevronDown className="h-3 w-3 ml-1 text-brand-primary" />
    );
  };

  /* Filter & Sort claims */
  const filteredClaims = React.useMemo(() => {
    let result = [...claims];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c.id.toLowerCase().includes(q) || c.customer.toLowerCase().includes(q) || c.item.toLowerCase().includes(q)
      );
    }

    if (activeFilter) {
      result = result.filter((c) => c.status === activeFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        let cmp = 0;
        if (sortField === 'date') cmp = a.date.localeCompare(b.date);
        if (sortField === 'amount') cmp = parseFloat(a.amount.replace('$', '')) - parseFloat(b.amount.replace('$', ''));
        if (sortField === 'status') cmp = a.status.localeCompare(b.status);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [search, sortField, sortDir, activeFilter]);

  const statuses = ['Approved', 'Pending', 'Denied', 'Processing', 'Inspected'];

  return (
    <div className="flex flex-col gap-4 animate-fade-slide-up">
      {/* ── Toolbar ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, name, or item..."
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveFilter(null)}
            className={cn(
              'px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-200',
              !activeFilter
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-500 hover:bg-neutral-100'
            )}
          >
            All
          </button>
          {statuses.map((s) => {
            return (
              <button
                key={s}
                onClick={() => setActiveFilter(activeFilter === s ? null : s)}
                className={cn(
                  'px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-200',
                  activeFilter === s
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-500 hover:bg-neutral-100'
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Table ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/60">
                <th className="px-5 py-3.5 w-[110px]">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Claim ID
                  </Typography>
                </th>
                <th className="px-5 py-3.5">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Customer
                  </Typography>
                </th>
                <th className="px-5 py-3.5">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Item
                  </Typography>
                </th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('date')}>
                  <div className="flex items-center">
                    <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                      Date
                    </Typography>
                    <SortIcon field="date" />
                  </div>
                </th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('amount')}>
                  <div className="flex items-center">
                    <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                      Amount
                    </Typography>
                    <SortIcon field="amount" />
                  </div>
                </th>
                <th className="px-5 py-3.5 cursor-pointer select-none" onClick={() => toggleSort('status')}>
                  <div className="flex items-center">
                    <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                      Status
                    </Typography>
                    <SortIcon field="status" />
                  </div>
                </th>
                <th className="px-5 py-3.5">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim, idx) => {
                return (
                  <tr
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className={cn(
                      'group transition-colors duration-150 hover:bg-brand-primary/[0.02] cursor-pointer',
                      idx !== filteredClaims.length - 1 && 'border-b border-neutral-200/80'
                    )}
                  >
                    {/* ID */}
                    <td className="px-5 py-3.5">
                      <Typography
                        variant="small"
                        className="font-mono font-bold text-neutral-900 text-[12px]"
                      >
                        {claim.id}
                      </Typography>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[10px] font-bold flex-shrink-0">
                          {claim.customer.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <Typography variant="small" className="font-semibold text-neutral-900 text-[13px] truncate block">
                            {claim.customer}
                          </Typography>
                          <Typography variant="small" className="text-[10px] text-neutral-400 truncate block">
                            {claim.email}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    {/* Item */}
                    <td className="px-5 py-3.5">
                      <Typography variant="small" className="text-[12px] text-neutral-600 font-medium">
                        {claim.item}
                      </Typography>
                      <Typography variant="small" className="text-[10px] text-neutral-400">
                        {claim.reason}
                      </Typography>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 text-[12px] text-neutral-500 font-medium">{claim.date}</td>

                    {/* Amount */}
                    <td className="px-5 py-3.5 text-[13px] font-mono font-bold text-neutral-900">{claim.amount}</td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <Badge
                        dot
                        pulse={statusConfig[claim.status].pulse}
                        icon={statusConfig[claim.status].icon}
                        variant={statusConfig[claim.status].variant}
                      >
                        {claim.status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {claim.status === 'Pending' && (
                          <>
                            <Button variant="approve" size="sm" className="h-7 rounded-lg px-2.5 text-[10px]">
                              <Check className="mr-1 h-3 w-3" /> Approve
                            </Button>
                            <Button variant="deny" size="sm" className="h-7 rounded-lg px-2.5 text-[10px]">
                              <X className="mr-1 h-3 w-3" /> Deny
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg"
                        >
                          <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* DOM Virtualization Placeholders */}
              <VirtualPlaceholder />
              <VirtualPlaceholder />
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
          <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
            Showing {filteredClaims.length} of {claims.length} claims
          </Typography>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">
              Previous
            </Button>
            <div className="flex items-center gap-0.5">
              <button className="h-8 w-8 rounded-lg bg-brand-primary text-white text-[11px] font-bold">1</button>
              <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">2</button>
              <button className="h-8 w-8 rounded-lg text-neutral-500 text-[11px] font-medium hover:bg-neutral-100 transition-colors">3</button>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">
              Next
            </Button>
          </div>
        </div>
      </div>
      
      <ReviewRefundModal claim={selectedClaim} onClose={() => setSelectedClaim(null)} />
    </div>
  );
};
