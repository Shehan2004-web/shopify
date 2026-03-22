'use client';

import * as React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';

const data = [
  { month: 'Jan', sales: 45000, returns: 4200 },
  { month: 'Feb', sales: 52000, returns: 4800 },
  { month: 'Mar', sales: 48000, returns: 5100 },
  { month: 'Apr', sales: 61000, returns: 5800 },
  { month: 'May', sales: 55000, returns: 6200 },
  { month: 'Jun', sales: 67000, returns: 7100 },
  { month: 'Jul', sales: 72000, returns: 6800 },
  { month: 'Aug', sales: 68000, returns: 7500 },
  { month: 'Sep', sales: 75000, returns: 8200 },
  { month: 'Oct', sales: 82000, returns: 8900 },
  { month: 'Nov', sales: 95000, returns: 10200 },
  { month: 'Dec', sales: 110000, returns: 12500 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const sales = payload[0].value;
    const returns = payload[1].value;
    const rate = ((returns / sales) * 100).toFixed(1);

    return (
      <div className="bg-white/90 backdrop-blur-md border border-neutral-200 p-4 rounded-2xl shadow-2xl shadow-black/10 min-w-[200px]">
        <Typography variant="small" className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-3 block">
          {label} Snapshot
        </Typography>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-neutral-200" />
              <span className="text-[13px] font-medium text-neutral-600">Shopify Sales</span>
            </div>
            <span className="text-[14px] font-black text-neutral-900">${sales.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#ff5c26]" />
              <span className="text-[13px] font-medium text-neutral-600">Returns Cost</span>
            </div>
            <span className="text-[14px] font-black text-[#ff5c26]">${returns.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-neutral-100 mt-2 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-neutral-400">Return Rate</span>
            <div className="px-2 py-0.5 bg-rose-50 rounded-lg border border-rose-100">
               <span className="text-[12px] font-black text-rose-600">{rate}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const SalesReturnsChart = () => {
  return (
    <Card className="border-none bg-white col-span-full animate-fade-slide-up overflow-hidden shadow-2xl shadow-black/[0.02]">
      <CardHeader className="pb-8 pt-6 px-4 sm:px-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <CardTitle className="text-[20px] font-black font-serif tracking-tight text-neutral-900 leading-tight">
              Shopify Sales vs. Returns Overlap
            </CardTitle>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm shadow-emerald-500/5 transition-all hover:scale-105 cursor-help group">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest group-hover:tracking-[0.15em] transition-all">Live Shopify Sync</span>
            </div>
          </div>
          <Typography variant="small" className="text-neutral-400 text-[12px] font-medium">
            Correlating total store revenue with return volume trends over the last 12 months.
          </Typography>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Total Sales</span>
              <span className="text-[18px] font-black text-neutral-900">$815,000</span>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Net Loss</span>
              <span className="text-[18px] font-black text-[#ff5c26]">$86,200</span>
           </div>
        </div>
      </CardHeader>
      <CardContent className="px-1 sm:px-4 pb-8">
        <div className="h-[300px] sm:h-[400px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f3f4f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f3f4f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5c26" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff5c26" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#e5e7eb" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                animationDuration={2000}
              />
              <Area 
                type="monotone" 
                dataKey="returns" 
                stroke="#ff5c26" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorReturns)" 
                animationDuration={2500}
              />

              <ReferenceLine y={100000} stroke="#f1f5f9" strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
