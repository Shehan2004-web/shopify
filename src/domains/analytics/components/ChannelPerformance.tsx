'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Badge } from '@/shared/ui/atoms/Badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const channels = [
  { name: 'Online Store', returns: 1420, rate: '4.2%', trend: 'down' as const, change: '-0.3%', revenue: '$22,840', topReason: 'Wrong Size' },
  { name: 'Amazon', returns: 680, rate: '5.1%', trend: 'up' as const, change: '+0.8%', revenue: '$11,200', topReason: 'Not as Described' },
  { name: 'Shopify POS', returns: 340, rate: '2.1%', trend: 'down' as const, change: '-0.5%', revenue: '$4,800', topReason: 'Defective' },
  { name: 'eBay', returns: 245, rate: '6.8%', trend: 'up' as const, change: '+1.2%', revenue: '$3,920', topReason: 'Quality Issue' },
  { name: 'Wholesale', returns: 160, rate: '1.4%', trend: 'down' as const, change: '-0.1%', revenue: '$2,530', topReason: 'Changed Mind' },
];

export const ChannelPerformance = () => {
  return (
    <Card className="border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
            Channel Performance
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
            Return metrics by sales channel
          </Typography>
        </div>
      </CardHeader>
      <CardContent className="px-1 sm:px-6">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/60">
                <th className="px-4 py-3">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Channel</Typography>
                </th>
                <th className="px-4 py-3">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Returns</Typography>
                </th>
                <th className="px-4 py-3">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Rate</Typography>
                </th>
                <th className="px-4 py-3">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Trend</Typography>
                </th>
                <th className="px-4 py-3">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Revenue Impact</Typography>
                </th>
                <th className="px-4 py-3">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Top Reason</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {channels.map((ch, idx) => (
                <tr key={ch.name} className={cn(
                  'group hover:bg-neutral-50/50 transition-colors',
                  idx !== channels.length - 1 && 'border-b border-neutral-200/80'
                )}>
                  <td className="px-4 py-3">
                    <Typography variant="small" className="text-[13px] font-semibold text-neutral-900">{ch.name}</Typography>
                  </td>
                  <td className="px-4 py-3">
                    <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900">{ch.returns.toLocaleString()}</Typography>
                  </td>
                  <td className="px-4 py-3">
                    <Typography variant="small" className="text-[13px] font-mono font-semibold text-neutral-700">{ch.rate}</Typography>
                  </td>
                  <td className="px-4 py-3">
                    <div className={cn(
                      'flex items-center gap-1 text-[11px] font-bold',
                      ch.trend === 'down' ? 'text-status-success' : 'text-status-error'
                    )}>
                      {ch.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                      {ch.change}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900">{ch.revenue}</Typography>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="neutral" className="text-[10px]">{ch.topReason}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
