'use client';

import * as React from 'react';
import { Card, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { TrendingUp, TrendingDown, Minus, CheckCircle, XCircle, RotateCcw, Percent, DollarSign, Timer } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface AnalyticsStatProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const stats: AnalyticsStatProps[] = [
  { title: 'Approval Rate', value: '87.4%', change: '+3.2%', trend: 'up', subtitle: 'Last 30 days', icon: CheckCircle, color: '#12b76a', bgColor: '#ecfdf3' },
  { title: 'Avg Resolution Time', value: '1.8 days', change: '-0.4d', trend: 'up', subtitle: 'Improved', icon: Timer, color: '#00b2a9', bgColor: '#e6faf9' },
  { title: 'Denial Rate', value: '5.2%', change: '-1.1%', trend: 'up', subtitle: 'Reducing', icon: XCircle, color: '#f04438', bgColor: '#fef3f2' },
  { title: 'Return Rate', value: '3.8%', change: '+0.2%', trend: 'down', subtitle: 'Of total orders', icon: RotateCcw, color: '#f79009', bgColor: '#fffaeb' },
  { title: 'Refund Amount', value: '$45.2K', change: '+8.7%', trend: 'down', subtitle: 'This month', icon: DollarSign, color: '#5057f5', bgColor: '#e8e9fe' },
  { title: 'SLA Compliance', value: '96.1%', change: '+1.5%', trend: 'up', subtitle: 'On-time rate', icon: Percent, color: '#7c3aed', bgColor: '#f3f0ff' },
];

export const AnalyticsStatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
      {stats.map((stat) => {
        const TrendIcon = stat.trend === 'neutral' ? Minus : stat.trend === 'up' ? TrendingUp : TrendingDown;
        const isPositiveTrend = (stat.trend === 'up' && !stat.title.includes('Denial') && !stat.title.includes('Refund Amount')) ||
                                 (stat.trend === 'down' && (stat.title.includes('Denial')));
        return (
          <Card key={stat.title} hoverable className="border-none bg-white group overflow-hidden relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                </div>
              </div>
              <Typography variant="h3" className="font-mono text-[22px] font-bold text-neutral-900 tracking-tighter animate-count-reveal">
                {stat.value}
              </Typography>
              <Typography variant="small" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mt-1 block">
                {stat.title}
              </Typography>
              <div className="mt-2 flex items-center gap-1">
                <div className={cn(
                  'flex items-center gap-0.5 text-[10px] font-bold',
                  isPositiveTrend ? 'text-status-success' : 'text-status-error'
                )}>
                  <TrendIcon className="h-2.5 w-2.5" />
                  {stat.change}
                </div>
                <Typography variant="small" className="text-[9px] text-neutral-400">
                  {stat.subtitle}
                </Typography>
              </div>
            </CardContent>
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
            />
          </Card>
        );
      })}
    </div>
  );
};
