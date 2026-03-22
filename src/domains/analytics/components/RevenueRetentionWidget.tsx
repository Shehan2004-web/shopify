'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';

const data = [
  { name: 'Retained (Store Credit)', value: 68400, color: '#00b2a9' },
  { name: 'Retained (Exchanges)', value: 24500, color: '#2dd4bf' },
  { name: 'Lost (Refunds)', value: 32100, color: '#f43f5e' },
  { name: 'Lost (Other)', value: 8400, color: '#94a3b8' },
];

const RECOVERY_RATE = 74.2;

export const RevenueRetentionWidget = () => {
  return (
    <Card className="border-none bg-white shadow-xl shadow-black/[0.02] flex flex-col animate-fade-slide-up">
      <CardHeader className="pb-0">
        <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
          Net Revenue Retention
        </CardTitle>
        <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
          Revenue recovery vs. refund leakage
        </Typography>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center pt-4">
        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 backdrop-blur-md border border-neutral-100 p-3 rounded-xl shadow-xl">
                        <p className="text-[12px] font-bold text-neutral-900">{payload[0].name}</p>
                        <p className="text-[11px] font-mono text-neutral-500 mt-1">
                          ${(payload[0].value as number).toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[32px] font-black text-neutral-900 tracking-tighter leading-none">
              {RECOVERY_RATE}%
            </span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">
              Recovery Rate
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <div className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100/50">
            <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1">Retained</p>
            <p className="text-[18px] font-black text-neutral-900 tracking-tight">$92,900</p>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100/50">
            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Refunded</p>
            <p className="text-[18px] font-black text-neutral-900 tracking-tight">$40,500</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
