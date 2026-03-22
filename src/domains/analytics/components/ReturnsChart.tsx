'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';

const data = [
  { name: 'Jan', returns: 420, claims: 280, target: 350 },
  { name: 'Feb', returns: 310, claims: 200, target: 340 },
  { name: 'Mar', returns: 220, claims: 180, target: 330 },
  { name: 'Apr', returns: 295, claims: 250, target: 320 },
  { name: 'May', returns: 190, claims: 160, target: 310 },
  { name: 'Jun', returns: 250, claims: 220, target: 300 },
  { name: 'Jul', returns: 360, claims: 300, target: 290 },
  { name: 'Aug', returns: 460, claims: 350, target: 280 },
  { name: 'Sep', returns: 410, claims: 320, target: 270 },
  { name: 'Oct', returns: 520, claims: 400, target: 260 },
  { name: 'Nov', returns: 430, claims: 340, target: 250 },
  { name: 'Dec', returns: 620, claims: 480, target: 240 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-card-xl">
      <p className="text-[11px] font-bold text-neutral-500 mb-2">{label}</p>
      {payload.map((entry, idx: number) => (
        <div key={idx} className="flex items-center gap-2 mb-0.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[11px] text-neutral-600">{entry.name}:</span>
          <span className="text-[12px] font-mono font-bold text-neutral-900">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

type Period = 'week' | 'month' | 'year';

export const ReturnsTrendChart = () => {
  const [activePeriod, setActivePeriod] = React.useState<Period>('year');
  const periods: Period[] = ['week', 'month', 'year'];

  return (
    <Card className="col-span-1 lg:col-span-3 overflow-hidden border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
              Returns Trend
            </CardTitle>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
              </span>
              <Typography
                variant="small"
                className="text-[10px] font-bold uppercase tracking-wider text-status-success"
              >
                Live
              </Typography>
            </div>
          </div>
          <Typography
            variant="small"
            className="text-neutral-400 text-[11px] font-medium"
          >
            Return frequency and claims volume across global stores
          </Typography>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="hidden md:flex items-center gap-4 mr-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
              <Typography
                variant="small"
                className="text-[10px] font-semibold text-neutral-500"
              >
                Returns
              </Typography>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
              <Typography
                variant="small"
                className="text-[10px] font-semibold text-neutral-500"
              >
                Claims
              </Typography>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-0.5 w-4 bg-brand-orange/60 rounded-full" />
              <Typography
                variant="small"
                className="text-[10px] font-semibold text-neutral-500"
              >
                Target
              </Typography>
            </div>
          </div>

          {/* Period Toggle */}
          <div className="flex items-center rounded-xl bg-neutral-100 p-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`
                  px-3 py-1.5 text-[11px] font-semibold rounded-lg capitalize transition-all duration-200
                  ${
                    activePeriod === p
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }
                `}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="gradientReturns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5057f5" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#5057f5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradientClaims" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00b2a9" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#00b2a9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f2f4f7"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="returns"
                name="Returns"
                stroke="#5057f5"
                strokeWidth={2.5}
                fill="url(#gradientReturns)"
                animationDuration={2000}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#5057f5',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="claims"
                name="Claims"
                stroke="#00b2a9"
                strokeWidth={2}
                fill="url(#gradientClaims)"
                animationDuration={2200}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#00b2a9',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#ff5c26"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                strokeOpacity={0.5}
                dot={false}
                animationDuration={2400}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
