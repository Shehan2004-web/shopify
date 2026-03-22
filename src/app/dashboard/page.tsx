'use client';

import * as React from 'react';
import { MetricsSection } from '@/domains/analytics/components/MetricsSection';
import { ReturnsTrendChart } from '@/domains/analytics/components/ReturnsChart';
import { BreakdownGraph } from '@/domains/analytics/components/BreakdownGraph';
import { ClaimsTable } from '@/domains/refunds/components/ClaimsTable';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import {
  Download,
  Share2,
  Plus,
  MoreVertical,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { RevenueRecoveryWidget } from '@/domains/analytics/components/RevenueRecoveryWidget';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Welcome Section ═════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <Typography
            useSerif
            variant="h1"
            className="text-[32px] font-black text-neutral-900 tracking-tight"
          >
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">
              Rakibul
            </span>{' '}
            👋
          </Typography>
          <Typography
            variant="lead"
            className="mt-1.5 text-[13px] font-medium text-neutral-500"
          >
            Here&apos;s a quick overview of your store performance and recent
            activities.
          </Typography>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px]"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button
            variant="orange"
            size="sm"
            className="h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-orange/20 text-[13px]"
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* ═══ KPI Section ═════════════════════════════ */}
      <MetricsSection />

      {/* ═══ Revenue Recovery Hub (Retention Strategy) ══ */}
      <RevenueRecoveryWidget />

      {/* ═══ Primary Analytics Row ═══════════════════ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <ReturnsTrendChart />

        {/* Return Status Breakdown Chart */}
        <Card className="col-span-1 lg:col-span-2 border-none bg-white animate-fade-slide-up">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
                Return Status Breakdown
              </CardTitle>
              <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
                Resolution distribution for current period
              </Typography>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* SVG Donut Chart */}
              <div className="relative h-[200px] w-[200px] flex-shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  {/* Restock - 68% */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e8e9fe" strokeWidth="16" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#5057f5" strokeWidth="16" strokeDasharray="213.6 314.16" strokeLinecap="round" className="transition-all duration-1000" />
                  {/* Refurbish - 16% */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#00b2a9" strokeWidth="16" strokeDasharray="50.3 314.16" strokeDashoffset="-213.6" strokeLinecap="round" />
                  {/* Discard - 10% */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#ff5c26" strokeWidth="16" strokeDasharray="31.4 314.16" strokeDashoffset="-263.9" strokeLinecap="round" />
                  {/* Donate - 6% */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#7c3aed" strokeWidth="16" strokeDasharray="18.8 314.16" strokeDashoffset="-295.3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Typography variant="h3" className="font-mono text-[28px] font-bold text-neutral-900 tracking-tighter">
                    2,845
                  </Typography>
                  <Typography variant="small" className="text-[10px] text-neutral-400 font-medium">
                    Total Returns
                  </Typography>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Restock', pct: '68%', count: '1,935', color: '#5057f5' },
                  { label: 'Refurbish', pct: '16%', count: '455', color: '#00b2a9' },
                  { label: 'Discard', pct: '10%', count: '284', color: '#ff5c26' },
                  { label: 'Donate', pct: '6%', count: '171', color: '#7c3aed' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex items-baseline gap-2 min-w-0">
                      <Typography variant="small" className="text-[12px] font-semibold text-neutral-700 w-[72px]">
                        {item.label}
                      </Typography>
                      <Typography variant="small" className="text-[14px] font-mono font-bold text-neutral-900">
                        {item.pct}
                      </Typography>
                      <Typography variant="small" className="text-[10px] text-neutral-400">
                        ({item.count})
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ Secondary Analytics Row ════════════════ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BreakdownGraph />


        {/* Right column: Account Health + Quick Actions */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Account Health */}
          <Card className="flex-1 p-5 border-none animate-fade-slide-up">
            <Typography
              variant="small"
              className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]"
            >
              Account Health
            </Typography>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <Typography
                  variant="h3"
                  className="text-[32px] font-mono font-bold tracking-tighter text-neutral-900 animate-count-reveal"
                >
                  98.4%
                </Typography>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                  <Typography
                    variant="small"
                    className="text-[10px] text-status-success font-bold"
                  >
                    Excellent Standing
                  </Typography>
                </div>
              </div>
              {/* SVG Progress Ring */}
              <div className="relative h-16 w-16">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#f2f4f7"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#00b2a9"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    strokeDashoffset="4"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-brand-teal" />
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-5 border-none bg-white animate-fade-slide-up">
            <Typography
              variant="small"
              className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px] mb-4"
            >
              Quick Actions
            </Typography>
            <div className="flex flex-col gap-2.5">
              <Button
                variant="primary"
                className="w-full h-11 rounded-xl font-semibold text-[13px] justify-start shadow-lg shadow-brand-primary/15"
              >
                <Plus className="mr-2.5 h-4 w-4" />
                Create New Claim
                <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
              </Button>
              <Button
                variant="approve"
                className="w-full h-11 rounded-xl font-semibold text-[13px] justify-start"
              >
                <Sparkles className="mr-2.5 h-4 w-4" />
                Batch Approve
                <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl font-semibold text-[13px] justify-start border-neutral-200 text-neutral-600"
              >
                <Download className="mr-2.5 h-4 w-4" />
                Download Report
                <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* ═══ Refunds Section ═════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography
              useSerif
              variant="h2"
              className="text-[22px] font-bold text-neutral-900 tracking-tight"
            >
              Recent Refund Claims
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">
              Manage and review your store&apos;s return requests in real-time.
            </Typography>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="primary"
              size="sm"
              className="h-9 rounded-xl px-4 text-[12px]"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> New Claim
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl border-neutral-200"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ClaimsTable />
      </div>
    </div>
  );
}
