'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Badge } from '@/shared/ui/atoms/Badge';
import { useProductHeatmap } from '@/domains/analytics/hooks/useAnalyticsQueries';
import { AlertTriangle, Package } from 'lucide-react';

const heatColor = (rate: number) => {
  if (rate >= 13) return { bg: '#fef3f2', border: '#f04438', text: '#f04438', intensity: 'Critical' };
  if (rate >= 11) return { bg: '#fffaeb', border: '#f79009', text: '#f79009', intensity: 'High' };
  if (rate >= 9) return { bg: '#fffaeb', border: '#f79009', text: '#dc6803', intensity: 'Medium' };
  return { bg: '#ecfdf3', border: '#12b76a', text: '#12b76a', intensity: 'Low' };
};

const Skeleton = () => (
  <div className="animate-pulse space-y-3">
    {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-16 bg-neutral-100 rounded-xl" />)}
  </div>
);

export const ProductHeatmap = () => {
  const { data, isLoading } = useProductHeatmap();

  return (
    <Card className="border-none bg-white animate-fade-slide-up">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-[17px] font-bold font-serif tracking-tight">
            Product Return Heatmap
          </CardTitle>
          <Typography variant="small" className="text-neutral-400 text-[11px] font-medium">
            Top 5 products with highest return rates vs sales volume
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-6 rounded-full bg-gradient-to-r from-[#12b76a] via-[#f79009] to-[#f04438]" />
            <Typography variant="small" className="text-[9px] text-neutral-400">Low → Critical</Typography>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? <Skeleton /> : (
          <div className="space-y-3">
            {data.map((product, idx) => {
              const heat = heatColor(product.returnRate);
              return (
                <div
                  key={product.sku}
                  className="group flex items-center gap-4 rounded-xl border p-3 transition-all duration-200 hover:shadow-sm"
                  style={{ borderColor: `${heat.border}20`, backgroundColor: `${heat.bg}40` }}
                >
                  {/* Rank */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-[12px] font-mono font-bold text-neutral-500 border border-neutral-200 shadow-xs">
                    #{idx + 1}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Typography variant="small" className="text-[13px] font-semibold text-neutral-900 truncate">
                        {product.name}
                      </Typography>
                      <Typography variant="small" className="text-[10px] font-mono text-neutral-400">
                        {product.sku}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <Typography variant="small" className="text-[10px] text-neutral-500">
                        <Package className="inline h-2.5 w-2.5 mr-0.5" />
                        {product.sold.toLocaleString()} sold
                      </Typography>
                      <Typography variant="small" className="text-[10px] text-neutral-500">
                        {product.returned} returned
                      </Typography>
                      <Badge variant="neutral" className="text-[9px]">{product.topReason}</Badge>
                    </div>
                  </div>

                  {/* Return Rate Heat Indicator */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Visual Bar */}
                    <div className="w-24 h-2 rounded-full bg-neutral-100 overflow-hidden hidden md:block">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${product.returnRate * 6}%`, backgroundColor: heat.border }}
                      />
                    </div>

                    {/* Rate Badge */}
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-mono font-bold"
                      style={{ backgroundColor: heat.bg, color: heat.text }}
                    >
                      {product.returnRate >= 12 && <AlertTriangle className="h-3 w-3" />}
                      {product.returnRate}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
