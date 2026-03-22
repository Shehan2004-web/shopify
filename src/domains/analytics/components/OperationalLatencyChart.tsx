'use client';

import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';

const data = [
  { day: 'Mon', transit: 18, inspection: 8, resolution: 4 },
  { day: 'Tue', transit: 24, inspection: 12, resolution: 6 },
  { day: 'Wed', transit: 22, inspection: 14, resolution: 8 },
  { day: 'Thu', transit: 20, inspection: 10, resolution: 12 },
  { day: 'Fri', transit: 26, inspection: 18, resolution: 20 },
  { day: 'Sat', transit: 30, inspection: 22, resolution: 18 },
  { day: 'Sun', transit: 28, inspection: 14, resolution: 10 },
];

export const OperationalLatencyChart = () => {
  return (
    <Card className="border-none bg-white shadow-xl shadow-black/[0.02] flex flex-col animate-fade-slide-up">
      <CardHeader>
        <CardTitle className="text-[17px] font-bold font-serif tracking-tight text-neutral-900">
          Average Resolution Latency
        </CardTitle>
        <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
          Operational bottlenecks & SLA performance (Hours)
        </Typography>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              unit="h"
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/90 backdrop-blur-md border border-neutral-100 p-3 rounded-xl shadow-xl">
                      <p className="text-[12px] font-black text-neutral-900 mb-2">{label} Metrics</p>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {payload.map((p: any) => (
                        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                            <span className="text-[11px] font-medium text-neutral-500">{p.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-neutral-900">{p.value}h</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={24} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'right', value: '24h SLA', fill: '#f43f5e', fontSize: 10, fontWeight: 900 }} />
            <Line type="monotone" dataKey="transit" stroke="#94a3b8" strokeWidth={3} dot={false} strokeDasharray="5 5" name="Transit" />
            <Line type="monotone" dataKey="inspection" stroke="#00b2a9" strokeWidth={3} dot={false} name="Inspection" />
            <Line type="monotone" dataKey="resolution" stroke="#ff5c26" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} name="Resolution" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
