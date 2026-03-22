'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card } from '@/shared/ui/atoms/Card';
import { ClaimsTable } from '@/domains/refunds/components/ClaimsTable';
import { CreateRefundModal } from '@/domains/refunds/components/CreateRefundModal';
import { useRefundMetrics } from '@/domains/refunds/hooks/useRefundQueries';
import {
  Download,
  Plus,
  MoreVertical,
  RotateCcw,
  DollarSign,
  CreditCard,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Filter,
} from 'lucide-react';

/* ── Metric Card Component ───────────────────────── */
const MetricCard = ({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  iconBg,
  iconColor,
  prefix,
  suffix,
}: {
  title: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  prefix?: string;
  suffix?: string;
}) => {
  const isPositive = trend > 0;
  const isNeutral = trend === 0;
  return (
    <Card className="p-5 border-none bg-white relative overflow-hidden group animate-fade-slide-up">
      <div className="flex items-start justify-between mb-4">
        <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">
          {title}
        </Typography>
        <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
          <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
        </div>
      </div>
      <Typography variant="h3" className="text-[28px] font-mono font-bold tracking-tighter text-neutral-900">
        {prefix}{value}{suffix}
      </Typography>
      <div className="flex items-center gap-2 mt-2">
        <div className={`flex items-center gap-0.5 text-[11px] font-bold ${isNeutral ? 'text-neutral-400' : isPositive ? 'text-status-success' : 'text-status-error'}`}>
          {isNeutral ? (
            <span>—</span>
          ) : isPositive ? (
            <><TrendingUp className="h-3 w-3" /> +{trend}%</>
          ) : (
            <><TrendingDown className="h-3 w-3" /> {trend}%</>
          )}
        </div>
        <Typography variant="small" className="text-[10px] text-neutral-400">{trendLabel}</Typography>
      </div>
      {/* Sparkline placeholder */}
      <div className="absolute bottom-0 right-0 w-[100px] h-[40px] opacity-10">
        <svg viewBox="0 0 100 40" fill="none" className="h-full w-full">
          <path d="M0 35 Q15 20, 25 28 T50 15 T75 22 T100 5" stroke={iconColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </Card>
  );
};

/* ── Page ─────────────────────────────────────────── */
export default function RefundsPage() {
  const { data: metrics, isLoading } = useRefundMetrics();
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Breadcrumb + Header ═══════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-neutral-600">Refunds</span>
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            Refund{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">
              Management
            </span>
          </Typography>
          <Typography variant="lead" className="mt-1.5 text-[13px] font-medium text-neutral-500">
            Review, approve, and manage return claims across all your stores.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2.5 w-full md:flex md:w-auto md:items-center">
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px] justify-center">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} variant="primary" size="sm" className="col-span-2 md:col-span-1 h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px] justify-center">
            <Plus className="mr-2 h-4 w-4" /> New Claim
          </Button>
        </div>
      </div>

      {/* ═══ Metrics Cards ═════════════════════════════ */}
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
            <MetricCard
              title="Total Returns"
              value={metrics.totalReturns.toLocaleString()}
              trend={metrics.totalReturnsTrend}
              trendLabel="vs last 30 days"
              icon={RotateCcw}
              iconBg="#e8e9fe"
              iconColor="#5057f5"
            />
            <MetricCard
              title="Revenue Saved"
              value={metrics.revenueSaved.toLocaleString()}
              trend={metrics.revenueSavedTrend}
              trendLabel="vs last 30 days"
              icon={DollarSign}
              iconBg="#e6faf9"
              iconColor="#00b2a9"
              prefix="$"
            />
            <MetricCard
              title="Active Credit Issued"
              value={metrics.activeCreditIssued.toLocaleString()}
              trend={metrics.activeCreditTrend}
              trendLabel="vs last 30 days"
              icon={CreditCard}
              iconBg="#fffaeb"
              iconColor="#f79009"
              prefix="$"
            />
            <MetricCard
              title="Processing Latency"
              value={metrics.avgProcessingDays.toFixed(1)}
              trend={metrics.avgProcessingTrend}
              trendLabel="vs last 30 days"
              icon={Clock}
              iconBg="#f0e8fe"
              iconColor="#7c3aed"
              suffix=" days"
            />
          </>
        ) : null}
      </div>

      {/* ═══ Quick Status Summary ══════════════════════ */}
      {metrics && (
        <div className="flex items-center gap-3 flex-wrap animate-fade-slide-up">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/50">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[12px] font-bold text-amber-700">{metrics.pendingCount} Pending</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/50">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[12px] font-bold text-emerald-700">{metrics.approvedCount} Approved</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200/50">
            <XCircle className="h-3.5 w-3.5 text-red-500" />
            <span className="text-[12px] font-bold text-red-700">{metrics.deniedCount} Denied</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
            <FileText className="h-3 w-3" />
            Audit log active — all actions recorded
          </div>
        </div>
      )}

      {/* ═══ Claims Table ══════════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">
              Refund Claims
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">
              Manage and process return requests with full audit trail.
            </Typography>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-neutral-200">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ClaimsTable />
      </div>

      <CreateRefundModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}
