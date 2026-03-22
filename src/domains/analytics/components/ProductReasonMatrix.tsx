'use client';

import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';

const data = [
  { sku: 'TS-4091', 'Size Unfit': 400, 'Defective': 200, 'Changed Mind': 150 },
  { sku: 'DN-2012', 'Size Unfit': 100, 'Defective': 400, 'Changed Mind': 200 },
  { sku: 'JK-8821', 'Size Unfit': 150, 'Defective': 100, 'Changed Mind': 450 },
  { sku: 'SH-3021', 'Size Unfit': 300, 'Defective': 50, 'Changed Mind': 100 },
  { sku: 'HD-9901', 'Size Unfit': 50, 'Defective': 300, 'Changed Mind': 50 },
];

export const ProductReasonMatrix = () => {
  return (
    <Card className="border-none bg-white shadow-xl shadow-black/[0.02] flex flex-col animate-fade-slide-up">
      <CardHeader>
        <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
          Return Reasons by Top SKUs
        </CardTitle>
        <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
          Identifying manufacturing vs. sizing issues per product
        </Typography>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: -10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="sku" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
              width={70}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/90 backdrop-blur-md border border-neutral-100 p-3 rounded-xl shadow-xl">
                      <p className="text-[12px] font-black text-neutral-900 mb-2">{label}</p>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {payload.map((p: any) => (
                        <div key={p.name} className="flex items-center justify-between gap-4 mb-1 border-b border-neutral-50 pb-1 last:border-0">
                          <span className="text-[11px] font-medium text-neutral-500">{p.name}</span>
                          <span className="text-[11px] font-bold text-neutral-900">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="Size Unfit" stackId="a" fill="#facc15" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Defective" stackId="a" fill="#f43f5e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Changed Mind" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
