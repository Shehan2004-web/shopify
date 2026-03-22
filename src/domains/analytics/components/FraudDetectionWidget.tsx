'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { AlertTriangle, User, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const highRiskCustomers = [
  { email: 'sarah.j@outlook.com', rate: 72.4, ltv: -450.00, flag: 'Wardrober' },
  { email: 'alex.smith@gmail.com', rate: 68.2, ltv: -220.50, flag: 'Serial Returner' },
  { email: 'mike.ross@yahoo.com', rate: 64.0, ltv: -115.00, flag: 'Abuse Policy' },
  { email: 'emma.w@icloud.com', rate: 61.5, ltv: -84.20, flag: 'High Frequency' },
];

export const FraudDetectionWidget = () => {
  return (
    <Card className="border-none bg-white shadow-xl shadow-black/[0.02] flex flex-col animate-fade-slide-up">
      <CardHeader className="pb-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight text-neutral-900 leading-tight pr-2">
            Fraud & Abuse Scoring
          </CardTitle>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg border border-amber-100 flex-shrink-0">
            <AlertTriangle className="h-3 w-3 text-amber-500" />
            <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest leading-none">High Alert</span>
          </div>
        </div>
        <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
          Identifying wardrobers & repeat policy bypass attempts
        </Typography>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="flex flex-col">
          {highRiskCustomers.map((customer, idx) => (
            <div 
              key={customer.email} 
              className={cn(
                "px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors",
                idx === 0 && "bg-amber-50/20"
              )}
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="h-9 w-9 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-300 shadow-sm flex-shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[12px] font-bold text-neutral-900 truncate pr-2">{customer.email}</span>
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-0.5 truncate">{customer.flag}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 self-end sm:self-auto pl-12 sm:pl-0">
                <div className="flex flex-col items-start sm:items-end">
                  <div className="flex items-center gap-1 text-rose-500 mb-0.5">
                    <TrendingDown className="h-3 w-3" />
                    <span className="text-[13px] font-black">{customer.rate}%</span>
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">Return Rate</span>
                </div>
                <div className="flex flex-col items-end w-[70px] sm:w-[80px]">
                  <div className="flex items-center gap-0.5 text-neutral-900 mb-0.5">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-[13px] font-black">{customer.ltv.toFixed(0)}</span>
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter text-right">LTV Impact</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-neutral-50/50 flex items-center justify-center">
          <button className="text-[11px] font-black text-brand-teal uppercase tracking-widest hover:underline">
            View Fraud Command Center
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
