'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';

const reasons = [
  { label: 'Defective Product', count: 845, pct: 29.7, color: '#5057f5' },
  { label: 'Wrong Size', count: 612, pct: 21.5, color: '#00b2a9' },
  { label: 'Not as Described', count: 498, pct: 17.5, color: '#ff5c26' },
  { label: 'Changed Mind', count: 384, pct: 13.5, color: '#7c3aed' },
  { label: 'Quality Issue', count: 278, pct: 9.8, color: '#f79009' },
  { label: 'Other', count: 228, pct: 8.0, color: '#98a2b3' },
];

const maxCount = Math.max(...reasons.map((r) => r.count));

export const TopReasonsChart = () => {
  return (
    <Card className="border-none bg-white animate-fade-slide-up">
      <CardHeader className="pb-4">
        <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
          Top Return Reasons
        </CardTitle>
        <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
          Most common reasons for product returns
        </Typography>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {reasons.map((reason, idx) => (
            <div key={reason.label} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: reason.color }}
                  />
                  <Typography variant="small" className="text-[12px] font-semibold text-neutral-700">
                    {reason.label}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Typography variant="small" className="text-[12px] font-mono font-bold text-neutral-900">
                    {reason.count.toLocaleString()}
                  </Typography>
                  <Typography variant="small" className="text-[10px] text-neutral-400 w-[36px] text-right">
                    {reason.pct}%
                  </Typography>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(reason.count / maxCount) * 100}%`,
                    backgroundColor: reason.color,
                    animationDelay: `${idx * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
