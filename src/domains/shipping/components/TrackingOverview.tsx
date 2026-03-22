'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { useShipments } from '@/domains/shipping/hooks/useShippingQueries';
import { Tag, Truck, MapPin, CheckCircle } from 'lucide-react';

const stages = [
  { key: 'label_created', label: 'Label Created', icon: Tag, color: '#f79009', bg: '#fffaeb' },
  { key: 'in_transit', label: 'In Transit', icon: Truck, color: '#5057f5', bg: '#e8e9fe' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, color: '#00b2a9', bg: '#e6faf9' },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle, color: '#12b76a', bg: '#ecfdf3' },
];

export const TrackingOverview = () => {
  const { data: shipments, isLoading } = useShipments();

  const stageCounts = React.useMemo(() => {
    if (!shipments) return stages.map((s) => ({ ...s, count: 0 }));
    return stages.map((s) => ({
      ...s,
      count: shipments.filter((sh) => sh.status === s.key).length,
    }));
  }, [shipments]);

  const total = stageCounts.reduce((sum, s) => sum + s.count, 0);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 animate-pulse">
        <div className="h-4 w-40 bg-neutral-200 rounded mb-6" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-neutral-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card animate-fade-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h3" useSerif className="text-[17px] font-bold tracking-tight text-neutral-900">
            Live Tracking Overview
          </Typography>
          <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
            Shipment flow across logistics stages
          </Typography>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/50">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700">LIVE</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-neutral-100 mb-6">
        {stageCounts.map((stage) => {
          const pct = total > 0 ? (stage.count / total) * 100 : 0;
          return (
            <div
              key={stage.key}
              className="transition-all duration-700 ease-out first:rounded-l-full last:rounded-r-full"
              style={{ width: `${pct}%`, backgroundColor: stage.color }}
              title={`${stage.label}: ${stage.count}`}
            />
          );
        })}
      </div>

      {/* Stage Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stageCounts.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.key}>
              <div className="group relative rounded-xl border border-neutral-200/60 p-4 hover:shadow-md hover:border-neutral-300 transition-all duration-200 cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: stage.bg }}>
                    <Icon className="h-4 w-4" style={{ color: stage.color }} />
                  </div>
                  <Typography variant="h3" className="text-[24px] font-mono font-black tracking-tighter" style={{ color: stage.color }}>
                    {stage.count}
                  </Typography>
                </div>
                <Typography variant="small" className="text-[11px] font-semibold text-neutral-600 block">
                  {stage.label}
                </Typography>
                <Typography variant="small" className="text-[9px] text-neutral-400">
                  {total > 0 ? Math.round((stage.count / total) * 100) : 0}% of active
                </Typography>
              </div>
              {/* Arrow connector */}
              {idx < stageCounts.length - 1 && (
                <div className="hidden md:flex items-center justify-center -mx-3 col-span-0" style={{ width: 0 }}>
                  {/* Connector rendered via gap spacing */}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
