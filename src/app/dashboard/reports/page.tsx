'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { cn } from '@/shared/lib/utils';
import { useReportData } from '@/domains/reports/hooks/useReportQueries';
import type { ReportType } from '@/domains/reports/types';
import {
  FileText,
  Download,
  Search,
  Calendar,
  Filter,
  Play,
  ChevronDown,
  FileSpreadsheet,
  FileDown,
  ArrowUpDown,
  ChevronUp,
} from 'lucide-react';

/* ── Report Type Config ──────────────────────────── */
const reportTypes: { key: ReportType; label: string; description: string }[] = [
  { key: 'financial_summary', label: 'Financial Summary', description: 'Revenue, refunds, and net totals' },
  { key: 'refund_claims', label: 'Refund Claims', description: 'All return and refund claim details' },
  { key: 'carrier_exceptions', label: 'Carrier Exceptions', description: 'Delivery issues and carrier audits' },
  { key: 'customer_activity', label: 'Customer Activity', description: 'Customer engagement and CLV logs' },
];

/* ── Column headers per report type ──────────────── */
const columnMap: Record<ReportType, { key: string; label: string; sortable?: boolean }[]> = {
  financial_summary: [
    { key: 'orderId', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'timestamp', label: 'Time' },
    { key: 'value', label: 'Amount', sortable: true },
    { key: 'reason', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'collection', label: 'Collection' },
  ],
  refund_claims: [
    { key: 'orderId', label: 'Claim ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'timestamp', label: 'Processed At' },
    { key: 'value', label: 'Refund Value', sortable: true },
    { key: 'reason', label: 'Return Reason' },
    { key: 'status', label: 'Status' },
    { key: 'carrier', label: 'Carrier' },
  ],
  carrier_exceptions: [
    { key: 'orderId', label: 'Tracking ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'timestamp', label: 'Reported At' },
    { key: 'value', label: 'Cost', sortable: true },
    { key: 'reason', label: 'Exception Type' },
    { key: 'status', label: 'Resolution' },
    { key: 'carrier', label: 'Carrier' },
  ],
  customer_activity: [
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Last Active', sortable: true },
    { key: 'timestamp', label: 'Time' },
    { key: 'value', label: 'Total Spent', sortable: true },
    { key: 'reason', label: 'Activity' },
    { key: 'status', label: 'Segment' },
    { key: 'collection', label: 'Lifetime Orders' },
  ],
};

/* ── Status color helper ─────────────────────────── */
const getStatusStyle = (status: string): { bg: string; text: string } => {
  const s = status.toLowerCase();
  if (['completed', 'approved', 'resolved', 'delivered', 'vip'].includes(s)) return { bg: '#ecfdf3', text: '#12b76a' };
  if (['pending', 'label created', 'regular'].includes(s)) return { bg: '#fffaeb', text: '#f79009' };
  if (['denied', 'exception', 'at risk', 'refunded'].includes(s)) return { bg: '#fef2f2', text: '#ef4444' };
  if (['processing', 'investigation', 'in transit', 'inspected'].includes(s)) return { bg: '#e8e9fe', text: '#5057f5' };
  if (['returned', 'claim filed', 'inactive'].includes(s)) return { bg: '#f3f4f6', text: '#6b7280' };
  return { bg: '#f3f4f6', text: '#374151' };
};

/* ── Sort types ──────────────────────────────────── */
type SortDir = 'asc' | 'desc';

/* ── Schedule Report Modal ───────────────────────── */
interface ScheduleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleReportModal = ({ isOpen, onClose }: ScheduleReportModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[32px] border border-neutral-200 shadow-2xl p-8 animate-scale-up">
        <div className="flex items-center justify-between mb-6">
          <div className="h-12 w-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-brand-primary" />
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
            <Play className="h-4 w-4 text-neutral-400 rotate-90" /> {/* Using Play rotated as a close X-ish icon or just close */}
          </button>
        </div>
        
        <Typography useSerif variant="h2" className="text-2xl font-bold text-neutral-900 mb-2">Schedule Report</Typography>
        <Typography variant="small" className="text-neutral-500 mb-8">Receive automated updates directly in your inbox or Slack channel.</Typography>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Frequency</label>
            <select className="w-full h-11 px-4 rounded-xl border border-neutral-100 bg-neutral-50/50 text-[13px] font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none">
              <option>Every Day at 09:00 AM</option>
              <option>Every Monday</option>
              <option>1st of Every Month</option>
              <option>Real-time (Webhook)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Delivery Method</label>
            <div className="flex gap-2">
              <button className="flex-1 h-11 rounded-xl border-2 border-brand-primary bg-brand-primary/5 text-brand-primary text-[12px] font-bold flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" /> Email
              </button>
              <button className="flex-1 h-11 rounded-xl border border-neutral-100 bg-white text-neutral-400 text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors">
                <Play className="h-4 w-4" /> Webhook
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1 h-12 rounded-2xl font-bold border-neutral-200">Cancel</Button>
          <Button onClick={onClose} variant="primary" className="flex-1 h-12 rounded-2xl font-bold bg-brand-primary shadow-lg shadow-brand-primary/20">Set Schedule</Button>
        </div>
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────── */
export default function ReportsPage() {
  const [activeReport, setActiveReport] = React.useState<ReportType>('financial_summary');
  const [dateFrom, setDateFrom] = React.useState('2026-03-01');
  const [dateTo, setDateTo] = React.useState('2026-03-19');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [customerFilter, setCustomerFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [exportOpen, setExportOpen] = React.useState(false);
  
  // New States
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState(0);
  const [showExportToast, setShowExportToast] = React.useState<string | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const { data: rows, isLoading, refetch } = useReportData(activeReport);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Smooth progress simulation
    const interval = setInterval(() => {
      setGenerationProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 200);

    await refetch();
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationProgress(0);
    }, 600);
  };

  const handleExport = (format: string) => {
    setExportOpen(false);
    setShowExportToast(format);
    setTimeout(() => setShowExportToast(null), 4000);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const filtered = React.useMemo(() => {
    if (!rows) return [];
    let result = [...rows];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.orderId.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q));
    }
    if (statusFilter) result = result.filter((r) => r.status.toLowerCase() === statusFilter.toLowerCase());
    if (customerFilter) result = result.filter((r) => r.customer.toLowerCase().includes(customerFilter.toLowerCase()));
    if (dateFrom) result = result.filter((r) => r.date >= dateFrom);
    if (dateTo) result = result.filter((r) => r.date <= dateTo);
    if (sortField) {
      result.sort((a, b) => {
        const av = sortField === 'value' ? a.value : (a as unknown as Record<string, string | number>)[sortField] as string;
        const bv = sortField === 'value' ? b.value : (b as unknown as Record<string, string | number>)[sortField] as string;
        const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [rows, search, statusFilter, customerFilter, dateFrom, dateTo, sortField, sortDir]);

  const columns = columnMap[activeReport];

  return (
    <div className="flex flex-col gap-10 pb-24 max-w-7xl mx-auto px-4 md:px-8 relative">
      {/* ═══ Generating Overlay ════════════════════════ */}
      {isGenerating && (
        <div className="fixed inset-0 z-[150] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
          <div className="w-64 space-y-4 text-center">
            <div className="relative h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-brand-primary transition-all duration-300 ease-out shadow-[0_0_12px_rgba(80,87,245,0.4)]"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <Typography variant="small" className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">
              Compiling Data Structures... {Math.round(generationProgress)}%
            </Typography>
          </div>
        </div>
      )}

      {/* ═══ Export Notification ═══════════════════════ */}
      {showExportToast && (
        <div className="fixed bottom-8 right-8 z-[200] bg-neutral-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Download className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <Typography variant="small" className="text-white font-bold text-[13px]">Export Successful</Typography>
            <Typography variant="small" className="text-neutral-400 text-[11px]">Your {showExportToast} report has been generated.</Typography>
          </div>
        </div>
      )}

      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 bg-brand-teal rounded-full" />
            <Typography variant="small" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Analytical Lab</Typography>
          </div>
          <Typography useSerif variant="h1" className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Systems{' '}
            <span className="bg-gradient-to-r from-brand-primary via-brand-teal to-brand-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">Reports</span>
          </Typography>
          <Typography variant="lead" className="mt-3 text-[15px] font-medium text-neutral-500 max-w-md">
            Design, schedule, and distribute high-fidelity operational reports across your organization.
          </Typography>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsScheduleModalOpen(true)}
            className="h-11 rounded-2xl px-5 font-bold border-neutral-200 text-neutral-600 text-[13px] hover:bg-neutral-50 shadow-sm"
          >
            <Calendar className="mr-2 h-4 w-4" /> Schedule
          </Button>

          <div className="relative">
            <Button 
              variant="outline" 
              className="h-11 rounded-2xl px-6 font-bold border-neutral-200 text-neutral-800 text-[13px] hover:bg-neutral-50 shadow-sm" 
              onClick={() => setExportOpen(!exportOpen)}
            >
              <Download className="mr-2 h-4 w-4 opacity-50" /> Export As <ChevronDown className={cn("ml-2 h-3.5 w-3.5 transition-transform", exportOpen && "rotate-180")} />
            </Button>
            {exportOpen && (
              <div className="absolute right-0 top-13 z-50 w-56 rounded-[24px] bg-white border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 animate-scale-up origin-top-right">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => handleExport('PDF')}>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center"><FileDown className="h-4 w-4 text-red-500" /></div>
                    Portable Document (PDF)
                  </div>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => handleExport('CSV')}>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center"><FileText className="h-4 w-4 text-emerald-500" /></div>
                    Comma Separated (CSV)
                  </div>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => handleExport('Excel')}>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center"><FileSpreadsheet className="h-4 w-4 text-brand-primary" /></div>
                    Microsoft Excel (XLSX)
                  </div>
                </button>
              </div>
            )}
          </div>

          <Button 
            variant="primary" 
            className="h-11 rounded-2xl px-8 font-bold bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 text-[13px]" 
            onClick={handleGenerate}
          >
            <Play className="mr-2 h-4 w-4 fill-current" /> Generate
          </Button>
        </div>
      </div>

      {/* ═══ Report Type Selector ══════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-slide-up">
        {reportTypes.map((rt) => {
          const isActive = activeReport === rt.key;
          return (
            <button
              key={rt.key}
              onClick={() => { setActiveReport(rt.key); setSortField(null); }}
              className={cn(
                'group relative p-6 rounded-[28px] border text-left transition-all duration-300 overflow-hidden',
                isActive
                  ? 'bg-white border-brand-primary shadow-[0_20px_40px_rgba(80,87,245,0.08)] scale-[1.02]'
                  : 'bg-white border-neutral-100 hover:border-neutral-300'
              )}
            >
              {isActive && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary shrink-0" />
              )}
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "h-10 w-10 rounded-2xl flex items-center justify-center transition-colors",
                  isActive ? "bg-brand-primary/10" : "bg-neutral-50 group-hover:bg-neutral-100"
                )}>
                  {rt.key === 'financial_summary' && <FileSpreadsheet className={cn("h-5 w-5", isActive ? "text-brand-primary" : "text-neutral-400")} />}
                  {rt.key === 'refund_claims' && <ArrowUpDown className={cn("h-5 w-5", isActive ? "text-brand-primary" : "text-neutral-400")} />}
                  {rt.key === 'carrier_exceptions' && <Search className={cn("h-5 w-5", isActive ? "text-brand-primary" : "text-neutral-400")} />}
                  {rt.key === 'customer_activity' && <FileText className={cn("h-5 w-5", isActive ? "text-brand-primary" : "text-neutral-400")} />}
                </div>
                {isActive && <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />}
              </div>
              <Typography variant="small" className={cn('text-[15px] font-bold block mb-1', isActive ? 'text-neutral-900' : 'text-neutral-700')}>
                {rt.label}
              </Typography>
              <Typography variant="small" className="text-[11px] text-neutral-400 leading-relaxed">{rt.description}</Typography>
            </button>
          );
        })}
      </div>

      {/* ═══ Filters Panel ════════════════════════════ */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card animate-fade-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-neutral-400" />
          <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">Report Filters</Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Date From */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-[12px] font-mono focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/5 transition-all" />
            </div>
          </div>
          {/* Date To */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-[12px] font-mono focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/5 transition-all" />
            </div>
          </div>
          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-[12px] focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/5 transition-all appearance-none">
              <option value="">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
              <option value="Processing">Processing</option>
              <option value="Exception">Exception</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          {/* Customer */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Customer</label>
            <input type="text" value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)} placeholder="Filter by name..."
              className="h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-[12px] focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/5 transition-all" />
          </div>
          {/* Search */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Quick Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ID or name..."
                className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-[12px] focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/5 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Report Table ══════════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">
              {reportTypes.find((r) => r.key === activeReport)?.label}
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">
              {filtered.length} records • {dateFrom} to {dateTo}
            </Typography>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card animate-fade-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  {columns.map((col) => (
                    <th key={col.key} className={cn('px-5 py-3.5', col.sortable && 'cursor-pointer select-none')} onClick={() => col.sortable && toggleSort(col.key)}>
                      <div className="flex items-center">
                        <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">{col.label}</Typography>
                        {col.sortable && (
                          sortField === col.key
                            ? sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1 text-brand-primary" /> : <ChevronDown className="h-3 w-3 ml-1 text-brand-primary" />
                            : <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>{columns.map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 rounded-md animate-shimmer" /></td>)}</tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={columns.length} className="px-5 py-12 text-center text-neutral-400 text-[13px]">No records found for current filters</td></tr>
                ) : (
                  filtered.map((row, idx) => (
                    <tr key={row.id} className={cn('group transition-colors duration-150 hover:bg-brand-primary/[0.02]', idx !== filtered.length - 1 && 'border-b border-neutral-200/80')}>
                      {columns.map((col) => {
                        const val = (row as unknown as Record<string, string | number>)[col.key];
                        /* Status badge */
                        if (col.key === 'status') {
                          const ss = getStatusStyle(String(val));
                          return (
                            <td key={col.key} className="px-5 py-3.5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ backgroundColor: ss.bg, color: ss.text }}>
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ss.text }} />
                                {String(val)}
                              </span>
                            </td>
                          );
                        }
                        /* Value/Amount column */
                        if (col.key === 'value') {
                          const num = Number(val);
                          return (
                            <td key={col.key} className="px-5 py-3.5">
                              <span className={cn('text-[13px] font-mono font-bold', num < 0 ? 'text-red-500' : 'text-neutral-900')}>
                                {num < 0 ? '-' : ''}${Math.abs(num).toFixed(2)}
                              </span>
                            </td>
                          );
                        }
                        /* Customer column */
                        if (col.key === 'customer') {
                          return (
                            <td key={col.key} className="px-5 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[9px] font-bold flex-shrink-0">
                                  {String(val).split(' ').map((n) => n[0]).join('')}
                                </div>
                                <Typography variant="small" className="font-semibold text-neutral-900 text-[12px]">{String(val)}</Typography>
                              </div>
                            </td>
                          );
                        }
                        /* Timestamp */
                        if (col.key === 'timestamp') {
                          return <td key={col.key} className="px-5 py-3.5 text-[11px] font-mono text-neutral-400">{String(val)}</td>;
                        }
                        /* Order/Tracking ID */
                        if (col.key === 'orderId') {
                          return <td key={col.key} className="px-5 py-3.5"><Typography variant="small" className="font-mono font-bold text-neutral-900 text-[12px]">{String(val)}</Typography></td>;
                        }
                        /* Default */
                        return <td key={col.key} className="px-5 py-3.5 text-[12px] text-neutral-600 font-medium">{String(val)}</td>;
                      })}
                    </tr>
                  ))
                )}
                {/* DOM Virtualization Placeholder */}
                <tr className="hidden"><td colSpan={columns.length}>{/* VirtualPlaceholder */}</td></tr>
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50/50 border-t border-neutral-200">
            <Typography variant="small" className="text-[11px] text-neutral-400 font-medium text-center sm:text-left">
              {filtered.length} records total
            </Typography>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Previous</Button>
              <button className="h-8 w-8 rounded-lg bg-brand-primary text-white text-[11px] font-bold">1</button>
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Recent Reports Log ═══════════════════════ */}
      <section className="pt-6 animate-fade-slide-up">
        <div className="flex items-center justify-between mb-6 px-4">
          <Typography useSerif variant="h3" className="text-xl font-bold text-neutral-900 tracking-tight">Recent Activity Log</Typography>
          <Button variant="outline" size="sm" className="text-[11px] rounded-lg border-neutral-200">View History</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { type: 'Financial Summary', date: '2026-03-20', time: '14:22', size: '2.4 MB', format: 'PDF' },
            { type: 'Customer Activity', date: '2026-03-19', time: '09:15', size: '1.1 MB', format: 'Excel' },
            { type: 'Refund Claims', date: '2026-03-18', time: '16:48', size: '840 KB', format: 'CSV' },
          ].map((log, i) => (
            <div key={i} className="bg-neutral-50/50 border border-neutral-100 rounded-2xl p-4 flex items-center justify-between group hover:bg-white hover:border-brand-primary/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-neutral-400 group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <Typography variant="small" className="text-[13px] font-bold text-neutral-900 leading-tight">{log.type}</Typography>
                  <Typography variant="small" className="text-[10px] text-neutral-400 mt-0.5">{log.date} at {log.time}</Typography>
                </div>
              </div>
              <div className="text-right">
                <Typography variant="small" className="text-[10px] font-bold text-neutral-500 uppercase">{log.format}</Typography>
                <Typography variant="small" className="text-[9px] text-neutral-400">{log.size}</Typography>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ScheduleReportModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)} 
      />
    </div>
  );
}
