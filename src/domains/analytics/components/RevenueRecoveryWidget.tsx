'use client';

import * as React from 'react';
import { Card, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { useRevenueRecovery } from '@/domains/analytics/hooks/useAnalyticsQueries';
import { TrendingUp, Repeat, CreditCard, DollarSign, ShieldCheck } from 'lucide-react';

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 w-32 bg-neutral-200 rounded-lg" />
    <div className="h-12 w-48 bg-neutral-200 rounded-lg" />
    <div className="grid grid-cols-3 gap-4 mt-4">
      {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-neutral-100 rounded-xl" />)}
    </div>
  </div>
);

export const RevenueRecoveryWidget = () => {
  const { data, isLoading } = useRevenueRecovery();

  if (isLoading || !data) {
    return (
      <Card className="col-span-full border-none bg-white animate-fade-slide-up">
        <CardContent className="p-6"><Skeleton /></CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full border-none bg-white overflow-hidden relative animate-fade-slide-up group">
      <CardContent className="p-6 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-9 w-9 rounded-xl bg-[#e6faf9] flex items-center justify-center">
                <ShieldCheck className="h-[18px] w-[18px] text-[#00b2a9]" />
              </div>
              <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Net Revenue Recovery
              </Typography>
            </div>
            <div className="flex items-baseline gap-3">
              <Typography variant="h1" className="font-mono text-[42px] font-black text-neutral-900 tracking-tighter animate-count-reveal">
                ${(data.totalRecovered / 1000).toFixed(1)}K
              </Typography>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ecfdf3]">
                <TrendingUp className="h-3 w-3 text-[#12b76a]" />
                <Typography variant="small" className="text-[12px] font-bold text-[#12b76a]">
                  +{data.changeVsLastMonth}%
                </Typography>
              </div>
            </div>
            <Typography variant="small" className="text-neutral-400 text-[12px] font-medium mt-1">
              Revenue saved through exchanges & store credits vs direct refunds
            </Typography>
          </div>

          {/* Recovery Rate Ring */}
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20">
              <svg className="h-20 w-20 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f2f4f7" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#00b2a9" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${data.recoveryRate * 2.51} 251`} className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Typography variant="h3" className="font-mono text-[18px] font-bold text-neutral-900">{data.recoveryRate}%</Typography>
                <Typography variant="small" className="text-[8px] text-neutral-400">Recovery</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#e6faf9] to-[#f0fcfb] p-4 border border-[#00b2a9]/10">
            <div className="flex items-center gap-2 mb-2">
              <Repeat className="h-4 w-4 text-[#00b2a9]" />
              <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#00b2a9]/60">
                Exchange Revenue
              </Typography>
            </div>
            <Typography variant="h3" className="font-mono text-[24px] font-bold text-neutral-900 tracking-tighter">
              ${(data.exchangeRevenue / 1000).toFixed(1)}K
            </Typography>
            <div className="mt-2 h-1.5 rounded-full bg-[#00b2a9]/10 overflow-hidden">
              <div className="h-full rounded-full bg-[#00b2a9] transition-all duration-1000" style={{ width: `${(data.exchangeRevenue / data.totalRecovered) * 100}%` }} />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#e8e9fe] to-[#f0f0ff] p-4 border border-[#5057f5]/10">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-[#5057f5]" />
              <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5057f5]/60">
                Store Credit Revenue
              </Typography>
            </div>
            <Typography variant="h3" className="font-mono text-[24px] font-bold text-neutral-900 tracking-tighter">
              ${(data.storeCreditRevenue / 1000).toFixed(1)}K
            </Typography>
            <div className="mt-2 h-1.5 rounded-full bg-[#5057f5]/10 overflow-hidden">
              <div className="h-full rounded-full bg-[#5057f5] transition-all duration-1000" style={{ width: `${(data.storeCreditRevenue / data.totalRecovered) * 100}%` }} />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#fef3f2] to-[#fff5f4] p-4 border border-[#f04438]/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-[#f04438]" />
              <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f04438]/60">
                Refund Loss
              </Typography>
            </div>
            <Typography variant="h3" className="font-mono text-[24px] font-bold text-neutral-900 tracking-tighter">
              -${(data.refundLoss / 1000).toFixed(1)}K
            </Typography>
            <div className="mt-2 h-1.5 rounded-full bg-[#f04438]/10 overflow-hidden">
              <div className="h-full rounded-full bg-[#f04438] transition-all duration-1000" style={{ width: `${(data.refundLoss / data.totalRecovered) * 100}%` }} />
            </div>
          </div>
        </div>
      </CardContent>

      {/* Decorative */}
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#00b2a9]/5 blur-3xl group-hover:bg-[#00b2a9]/8 transition-all duration-500" />
    </Card>
  );
};
