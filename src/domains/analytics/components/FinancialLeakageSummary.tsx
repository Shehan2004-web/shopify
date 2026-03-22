'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { useFinancialLeakage } from '@/domains/analytics/hooks/useAnalyticsQueries';
import { TrendingDown, ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="h-28 bg-neutral-100 rounded-xl" />
      <div className="h-28 bg-neutral-100 rounded-xl" />
    </div>
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => <div key={i} className="h-8 bg-neutral-100 rounded-lg" />)}
    </div>
  </div>
);

export const FinancialLeakageSummary = () => {
  const { data, isLoading } = useFinancialLeakage();

  if (isLoading || !data) {
    return (
      <Card className="border-none bg-white animate-fade-slide-up">
        <CardContent className="p-6"><Skeleton /></CardContent>
      </Card>
    );
  }

  const costItems = data.breakdown.filter((b) => b.type === 'cost');
  const recoveryItems = data.breakdown.filter((b) => b.type === 'recovery');
  const totalCost = costItems.reduce((s, i) => s + i.amount, 0);
  const totalRecovery = recoveryItems.reduce((s, i) => s + i.amount, 0);

  return (
    <Card className="border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-3">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight leading-tight pr-2">
            Financial Leakage Summary
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium mt-1">
            Shipping costs vs recovered revenue breakdown
          </Typography>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fef3f2] self-start md:self-auto flex-shrink-0">
          <TrendingDown className="h-3 w-3 text-[#f04438]" />
          <Typography variant="small" className="text-[11px] font-bold text-[#f04438]">
            {data.leakageRate}% leakage
          </Typography>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {/* Top Summary: Cost vs Recovery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl bg-gradient-to-br from-[#fef3f2] to-[#fff8f7] p-4 border border-[#f04438]/10 flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <div className="flex items-center gap-2 mb-0 sm:mb-2">
              <ArrowDown className="h-3.5 w-3.5 text-[#f04438]" />
              <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f04438]/60">
                Total Costs
              </Typography>
            </div>
            <Typography variant="h3" className="font-mono text-[22px] sm:text-[24px] font-bold text-neutral-900 tracking-tighter">
              -${(totalCost / 1000).toFixed(1)}K
            </Typography>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#ecfdf3] to-[#f5fdf8] p-4 border border-[#12b76a]/10 flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <div className="flex items-center gap-2 mb-0 sm:mb-2">
              <ArrowUp className="h-3.5 w-3.5 text-[#12b76a]" />
              <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#12b76a]/60">
                Total Recovery
              </Typography>
            </div>
            <Typography variant="h3" className="font-mono text-[22px] sm:text-[24px] font-bold text-neutral-900 tracking-tighter">
              +${(totalRecovery / 1000).toFixed(1)}K
            </Typography>
          </div>
        </div>

        {/* Stacked Visual Bar */}
        <div className="mb-6">
          <div className="flex gap-0.5 h-3 rounded-full overflow-hidden">
            <div className="bg-[#12b76a] transition-all duration-1000" style={{ width: `${(totalRecovery / (totalRecovery + totalCost)) * 100}%` }} />
            <div className="bg-[#f04438] transition-all duration-1000" style={{ width: `${(totalCost / (totalRecovery + totalCost)) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <Typography variant="small" className="text-[9px] font-bold text-[#12b76a]">
              Recovery {((totalRecovery / (totalRecovery + totalCost)) * 100).toFixed(0)}%
            </Typography>
            <Typography variant="small" className="text-[9px] font-bold text-[#f04438]">
              Costs {((totalCost / (totalRecovery + totalCost)) * 100).toFixed(0)}%
            </Typography>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          {/* Costs Column */}
          <div>
            <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3 block">
              Cost Breakdown
            </Typography>
            <div className="space-y-2.5">
              {costItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#f04438]" />
                    <Typography variant="small" className="text-[12px] text-neutral-600">{item.label}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Typography variant="small" className="text-[12px] font-mono font-bold text-neutral-900">
                      ${(item.amount / 1000).toFixed(1)}K
                    </Typography>
                    <Typography variant="small" className="text-[9px] text-neutral-400 w-[32px] text-right">
                      {item.pct}%
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Column */}
          <div>
            <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3 block">
              Recovery Sources
            </Typography>
            <div className="space-y-2.5">
              {recoveryItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" />
                    <Typography variant="small" className="text-[12px] text-neutral-600">{item.label}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Typography variant="small" className="text-[12px] font-mono font-bold text-neutral-900">
                      ${(item.amount / 1000).toFixed(1)}K
                    </Typography>
                    <Typography variant="small" className="text-[9px] text-neutral-400 w-[32px] text-right">
                      {item.pct}%
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Net Impact */}
        <div className="mt-6 rounded-xl bg-neutral-50 p-4 flex items-center justify-between">
          <div>
            <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Net Revenue Impact
            </Typography>
            <Typography variant="h3" className="font-mono text-[22px] font-bold text-[#12b76a] tracking-tighter mt-0.5">
              +${((totalRecovery - totalCost) / 1000).toFixed(1)}K
            </Typography>
          </div>
          <DollarSign className="h-8 w-8 text-neutral-200" />
        </div>
      </CardContent>
    </Card>
  );
};
