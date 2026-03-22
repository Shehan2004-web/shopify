'use client';

import * as React from 'react';
import { Card, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { cn } from '@/shared/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  sparklineData?: { value: number }[];
  accentColor?: 'primary' | 'teal' | 'orange' | 'secondary';
  className?: string;
}

const accents = {
  primary: {
    iconBg: 'bg-brand-primary/8',
    iconText: 'text-brand-primary',
    sparkStroke: '#5057f5',
    sparkFill: '#5057f5',
    glow: 'group-hover:shadow-glow-primary',
  },
  teal: {
    iconBg: 'bg-brand-teal/8',
    iconText: 'text-brand-teal',
    sparkStroke: '#00b2a9',
    sparkFill: '#00b2a9',
    glow: 'group-hover:shadow-glow-teal',
  },
  orange: {
    iconBg: 'bg-brand-orange/8',
    iconText: 'text-brand-orange',
    sparkStroke: '#ff5c26',
    sparkFill: '#ff5c26',
    glow: 'group-hover:shadow-glow-orange',
  },
  secondary: {
    iconBg: 'bg-brand-secondary/8',
    iconText: 'text-brand-secondary',
    sparkStroke: '#7c3aed',
    sparkFill: '#7c3aed',
    glow: 'group-hover:shadow-glow-primary',
  },
};

export const MetricCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  sparklineData,
  accentColor = 'primary',
  className,
}: MetricCardProps) => {
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';
  const accent = accents[accentColor];

  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <Card
      hoverable
      className={cn(
        'group overflow-hidden border-none bg-white relative',
        accent.glow,
        className
      )}
    >
      <CardContent className="p-5">
        {/* Top row: Title + Icon */}
        <div className="flex items-start justify-between mb-4">
          <Typography
            variant="small"
            className="text-neutral-500 font-semibold uppercase tracking-[0.12em] text-[10px]"
          >
            {title}
          </Typography>
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
              accent.iconBg
            )}
          >
            {Icon && <Icon className={cn('h-[18px] w-[18px]', accent.iconText)} />}
          </div>
        </div>

        {/* Value */}
        <Typography
          variant="h3"
          className="font-mono text-[28px] font-bold text-neutral-900 tracking-tighter animate-count-reveal"
        >
          {value}
        </Typography>

        {/* Bottom row: Change + Sparkline */}
        <div className="mt-3 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            {change && (
              <div
                className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold w-fit',
                  isNeutral
                    ? 'bg-neutral-100 text-neutral-500'
                    : isPositive
                    ? 'bg-status-success-bg text-status-success'
                    : 'bg-status-error-bg text-status-error'
                )}
              >
                <TrendIcon className="h-3 w-3" />
                {change}
              </div>
            )}
            <Typography variant="small" className="text-[10px] text-neutral-400 font-medium">
              vs last 30 days
            </Typography>
          </div>

          {sparklineData && (
            <div className="h-11 w-28 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`spark-${accentColor}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accent.sparkFill} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={accent.sparkFill} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={accent.sparkStroke}
                    fill={`url(#spark-${accentColor})`}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>

      {/* Subtle accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accent.sparkStroke}, transparent)` }}
      />
    </Card>
  );
};
