'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { hour: '6am', approved: 12, pending: 5, denied: 2 },
  { hour: '8am', approved: 28, pending: 14, denied: 4 },
  { hour: '10am', approved: 45, pending: 22, denied: 8 },
  { hour: '12pm', approved: 62, pending: 18, denied: 6 },
  { hour: '2pm', approved: 55, pending: 25, denied: 10 },
  { hour: '4pm', approved: 48, pending: 20, denied: 7 },
  { hour: '6pm', approved: 35, pending: 15, denied: 5 },
  { hour: '8pm', approved: 20, pending: 8, denied: 3 },
];

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

export const HourlyActivityChart = () => {
  return (
    <Card className="border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
            Hourly Activity
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
            Claims processing distribution by hour
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: 'Approved', color: '#12b76a' },
            { label: 'Pending', color: '#f79009' },
            { label: 'Denied', color: '#f04438' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
              <Typography variant="small" className="text-[10px] font-semibold text-neutral-500">
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f4f7" />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }} width={32} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="approved" stackId="a" fill="#12b76a" radius={[0, 0, 0, 0]} animationDuration={1200} />
              <Bar dataKey="pending" stackId="a" fill="#f79009" radius={[0, 0, 0, 0]} animationDuration={1400} />
              <Bar dataKey="denied" stackId="a" fill="#f04438" radius={[4, 4, 0, 0]} animationDuration={1600} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
