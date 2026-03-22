'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { useCustomerSegments } from '@/domains/analytics/hooks/useAnalyticsQueries';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (!active || !payload) return null;
  const total = payload.reduce((s, e) => s + e.value, 0);
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-card-xl">
      <p className="text-[11px] font-bold text-neutral-500 mb-2">{label} Customers</p>
      {payload.map((entry, idx: number) => (
        <div key={idx} className="flex items-center justify-between gap-6 mb-0.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-neutral-600">{entry.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-mono font-bold text-neutral-900">{entry.value}</span>
            <span className="text-[9px] text-neutral-400">({((entry.value / total) * 100).toFixed(0)}%)</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Skeleton = () => (
  <div className="animate-pulse h-[300px] bg-neutral-100 rounded-xl" />
);

export const CustomerSegmentsChart = () => {
  const { data, isLoading } = useCustomerSegments();

  return (
    <Card className="border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
            Customer Loyalty vs Returns
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
            Return frequency across customer tiers
          </Typography>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? <Skeleton /> : (
          <>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f4f7" />
                  <XAxis dataKey="segment" axisLine={false} tickLine={false} tick={{ fill: '#98a2b3', fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#98a2b3', fontSize: 11, fontWeight: 500 }} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="square"
                    iconSize={8}
                    wrapperStyle={{ paddingTop: 16, fontSize: 10, fontWeight: 600, color: '#667085' }}
                  />
                  <Bar dataKey="zeroReturns" name="0 Returns" stackId="a" fill="#12b76a" radius={[0, 0, 0, 0]} animationDuration={1000} />
                  <Bar dataKey="oneReturn" name="1 Return" stackId="a" fill="#f79009" radius={[0, 0, 0, 0]} animationDuration={1200} />
                  <Bar dataKey="twoReturns" name="2 Returns" stackId="a" fill="#ff5c26" radius={[0, 0, 0, 0]} animationDuration={1400} />
                  <Bar dataKey="threePlus" name="3+ Returns" stackId="a" fill="#f04438" radius={[4, 4, 0, 0]} animationDuration={1600} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {data.map((seg) => {
                const returnRate = (((seg.oneReturn + seg.twoReturns + seg.threePlus) / seg.total) * 100).toFixed(1);
                return (
                  <div key={seg.segment} className="rounded-xl bg-neutral-50 p-3 text-center">
                    <Typography variant="small" className="text-[11px] font-bold text-neutral-900">{seg.segment}</Typography>
                    <Typography variant="small" className="block text-[18px] font-mono font-bold text-neutral-900 mt-0.5">{returnRate}%</Typography>
                    <Typography variant="small" className="text-[9px] text-neutral-400">return rate</Typography>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
