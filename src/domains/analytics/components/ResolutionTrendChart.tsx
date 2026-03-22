'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', refund: 320, exchange: 180, credit: 120 },
  { month: 'Feb', refund: 280, exchange: 200, credit: 140 },
  { month: 'Mar', refund: 350, exchange: 170, credit: 110 },
  { month: 'Apr', refund: 290, exchange: 220, credit: 160 },
  { month: 'May', refund: 380, exchange: 190, credit: 130 },
  { month: 'Jun', refund: 340, exchange: 240, credit: 180 },
  { month: 'Jul', refund: 420, exchange: 210, credit: 150 },
  { month: 'Aug', refund: 390, exchange: 260, credit: 170 },
  { month: 'Sep', refund: 450, exchange: 230, credit: 190 },
  { month: 'Oct', refund: 480, exchange: 250, credit: 200 },
  { month: 'Nov', refund: 430, exchange: 270, credit: 220 },
  { month: 'Dec', refund: 520, exchange: 290, credit: 240 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-card-xl">
      <p className="text-[11px] font-bold text-neutral-500 mb-2">{label}</p>
      {payload.map((entry, idx: number) => (
        <div key={idx} className="flex items-center gap-2 mb-0.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[11px] text-neutral-600">{entry.name}:</span>
          <span className="text-[12px] font-mono font-bold text-neutral-900">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ResolutionTrendChart = () => {
  return (
    <Card className="col-span-1 lg:col-span-2 border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
            Resolution Trend
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
            Monthly resolution type breakdown over 12 months
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          {[
            { label: 'Refund', color: '#5057f5' },
            { label: 'Exchange', color: '#00b2a9' },
            { label: 'Store Credit', color: '#ff5c26' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <Typography variant="small" className="text-[10px] font-semibold text-neutral-500">
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f4f7" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="refund" name="Refund" stroke="#5057f5" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#5057f5', stroke: '#fff', strokeWidth: 2 }} animationDuration={2000} />
              <Line type="monotone" dataKey="exchange" name="Exchange" stroke="#00b2a9" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#00b2a9', stroke: '#fff', strokeWidth: 2 }} animationDuration={2200} />
              <Line type="monotone" dataKey="credit" name="Store Credit" stroke="#ff5c26" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#ff5c26', stroke: '#fff', strokeWidth: 2 }} animationDuration={2400} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
