'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

/* ── Radial Donut Data ─────────────────────────────── */
const radialData = [
  { name: 'Refund', value: 42, fill: '#5057f5' },
  { name: 'Exchange', value: 28, fill: '#00b2a9' },
  { name: 'Store Credit', value: 18, fill: '#ff5c26' },
  { name: 'Warranty', value: 12, fill: '#7c3aed' },
];

/* ── Stacked Bar Data (GreenBike-Style) ────────────── */
const weeklyData = [
  { day: 'Mon', refund: 45, exchange: 32, credit: 18, warranty: 12 },
  { day: 'Tue', refund: 55, exchange: 25, credit: 22, warranty: 8 },
  { day: 'Wed', refund: 38, exchange: 40, credit: 15, warranty: 14 },
  { day: 'Thu', refund: 62, exchange: 28, credit: 20, warranty: 10 },
  { day: 'Fri', refund: 48, exchange: 35, credit: 25, warranty: 15 },
  { day: 'Sat', refund: 30, exchange: 20, credit: 12, warranty: 6 },
  { day: 'Sun', refund: 22, exchange: 15, credit: 8, warranty: 4 },
];

const colors = ['#5057f5', '#00b2a9', '#ff5c26', '#7c3aed'];
const labels = ['Refund', 'Exchange', 'Store Credit', 'Warranty'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; dataKey: string; value: number }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 shadow-card-xl">
      <p className="text-[10px] font-bold text-neutral-500 mb-1.5">{label}</p>
      {payload.map((entry, idx: number) => (
        <div key={idx} className="flex items-center gap-2 mb-0.5">
          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-[10px] text-neutral-500 capitalize">{entry.dataKey}:</span>
          <span className="text-[11px] font-mono font-bold text-neutral-900">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const BreakdownGraph = () => {
  const total = radialData.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
            Claims Breakdown
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
            Category distribution & weekly performance
          </Typography>
        </div>
        {/* Legend */}
        <div className="hidden md:flex items-center gap-3">
          {labels.map((label, idx) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: colors[idx] }}
              />
              <Typography variant="small" className="text-[10px] font-semibold text-neutral-500">
                {label}
              </Typography>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-[350px]">
          {/* ── Radial Donut ──────────────────────── */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center">
            <div className="relative h-[240px] w-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={16}
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={8}
                    animationDuration={1800}
                    animationEasing="ease-in-out"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Typography variant="h3" className="font-mono text-[32px] font-bold text-neutral-900 tracking-tighter">
                  {total}%
                </Typography>
                <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
                  Resolution
                </Typography>
              </div>
            </div>

            {/* Stats under donut */}
            <div className="mt-6 grid grid-cols-2 gap-4 w-full">
              {radialData.map((item) => (
                <div key={item.name} className="text-center">
                  <Typography variant="small" className="text-[20px] font-mono font-bold text-neutral-900 block">
                    {item.value}%
                  </Typography>
                  <Typography variant="small" className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    {item.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* ── Stacked Bar Chart (GreenBike) ─────── */}
          <div className="col-span-1 md:col-span-8 h-full">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barGap={2} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f4f7" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }}
                    width={32}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="refund"
                    stackId="a"
                    fill="#5057f5"
                    radius={[0, 0, 0, 0]}
                    animationDuration={1200}
                  />
                  <Bar
                    dataKey="exchange"
                    stackId="a"
                    fill="#00b2a9"
                    radius={[0, 0, 0, 0]}
                    animationDuration={1400}
                  />
                  <Bar
                    dataKey="credit"
                    stackId="a"
                    fill="#ff5c26"
                    radius={[0, 0, 0, 0]}
                    animationDuration={1600}
                  />
                  <Bar
                    dataKey="warranty"
                    stackId="a"
                    fill="#7c3aed"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
