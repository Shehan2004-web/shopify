'use client';

import * as React from 'react';
import { MetricCard } from '@/shared/ui/molecules/MetricCard';
import { ShoppingBag, DollarSign, Wallet, Clock } from 'lucide-react';

const sparkUp = [
  { value: 12 }, { value: 18 }, { value: 14 }, { value: 22 }, { value: 19 }, { value: 28 }, { value: 25 }, { value: 32 },
];
const sparkDown = [
  { value: 30 }, { value: 25 }, { value: 28 }, { value: 20 }, { value: 22 }, { value: 18 }, { value: 15 }, { value: 12 },
];
const sparkFlat = [
  { value: 14 }, { value: 16 }, { value: 15 }, { value: 14 }, { value: 16 }, { value: 15 }, { value: 14 }, { value: 15 },
];
const sparkRevenue = [
  { value: 20 }, { value: 25 }, { value: 18 }, { value: 30 }, { value: 28 }, { value: 35 }, { value: 42 }, { value: 45 },
];

export const MetricsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 stagger-children">
      <MetricCard
        title="Total Claims"
        value="2,845"
        change="+12.5%"
        trend="up"
        icon={ShoppingBag}
        accentColor="primary"
        sparklineData={sparkUp}
      />
      <MetricCard
        title="Revenue Saved"
        value="$45,290"
        change="+8.7%"
        trend="up"
        icon={DollarSign}
        accentColor="teal"
        sparklineData={sparkRevenue}
      />
      <MetricCard
        title="Active Credit Issued"
        value="$12,840"
        change="-2.4%"
        trend="down"
        icon={Wallet}
        accentColor="orange"
        sparklineData={sparkDown}
      />
      <MetricCard
        title="Processing Latency"
        value="1.2 days"
        change="0.0%"
        trend="neutral"
        icon={Clock}
        accentColor="secondary"
        sparklineData={sparkFlat}
      />
    </div>
  );
};
