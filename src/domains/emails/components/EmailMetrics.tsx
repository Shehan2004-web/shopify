import React from 'react';
import { Mail, BarChart3, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { EmailMetrics as IEmailMetrics } from '../types';
import { cn } from '@/shared/lib/utils';

interface EmailMetricsProps {
  metrics: IEmailMetrics | undefined;
  isLoading: boolean;
}

export const EmailMetrics: React.FC<EmailMetricsProps> = ({ metrics, isLoading }) => {
  const stats = [
    {
      label: 'Total Emails Sent',
      value: metrics?.totalSent.toLocaleString() || '0',
      change: metrics?.sentChange || 0,
      icon: Mail,
      color: 'text-brand-teal',
      bg: 'bg-brand-teal/10',
    },
    {
      label: 'Avg. Open Rate',
      value: `${metrics?.openRate}%` || '0%',
      change: metrics?.openChange || 0,
      icon: BarChart3,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Delivery Failure',
      value: `${metrics?.bounceRate}%` || '0%',
      change: metrics?.bounceChange || 0,
      icon: AlertCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        return (
          <Card key={idx} className="p-6 border-neutral-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300", stat.bg)}>
                <Icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full",
                isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              )}>
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</Typography>
            <Typography variant="h2" className="text-2xl font-black text-neutral-900">{isLoading ? '---' : stat.value}</Typography>
            
            <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-neutral-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 border border-neutral-100" />
          </Card>
        );
      })}
    </div>
  );
};
