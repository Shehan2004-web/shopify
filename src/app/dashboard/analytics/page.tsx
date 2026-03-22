'use client';

import * as React from 'react';
import { AnalyticsStatsGrid } from '@/domains/analytics/components/AnalyticsStatsGrid';
import { ResolutionTrendChart } from '@/domains/analytics/components/ResolutionTrendChart';
import { TopReasonsChart } from '@/domains/analytics/components/TopReasonsChart';
import { HourlyActivityChart } from '@/domains/analytics/components/HourlyActivityChart';
import { ChannelPerformance } from '@/domains/analytics/components/ChannelPerformance';
import { BreakdownGraph } from '@/domains/analytics/components/BreakdownGraph';
import { RevenueRecoveryWidget } from '@/domains/analytics/components/RevenueRecoveryWidget';
import { ProductHeatmap } from '@/domains/analytics/components/ProductHeatmap';
import { CustomerSegmentsChart } from '@/domains/analytics/components/CustomerSegmentsChart';
import { FinancialLeakageSummary } from '@/domains/analytics/components/FinancialLeakageSummary';
import { SalesReturnsChart } from '@/domains/analytics/components/SalesReturnsChart';
import { RevenueRetentionWidget } from '@/domains/analytics/components/RevenueRetentionWidget';
import { ProductReasonMatrix } from '@/domains/analytics/components/ProductReasonMatrix';
import { OperationalLatencyChart } from '@/domains/analytics/components/OperationalLatencyChart';
import { FraudDetectionWidget } from '@/domains/analytics/components/FraudDetectionWidget';
import { GeospatialReturnDensity } from '@/domains/analytics/components/GeospatialReturnDensity';

import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card, CardContent } from '@/shared/ui/atoms/Card';
import { 
  Download, 
  Calendar, 
  ArrowRight,
  Zap,
  LayoutGrid
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 pb-12 animate-fade-in max-w-7xl w-full mx-auto xl:px-8">
      {/* ═══ Top Controls ═════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0c2e2e] flex items-center justify-center shadow-lg shadow-emerald-900/20">
             <LayoutGrid className="h-5 w-5 text-[#2dd4bf]" />
          </div>
          <div>
            <Typography variant="h2" className="text-[20px] font-black text-neutral-900 tracking-tight leading-none">
              Intelligence Command
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[11px] font-medium mt-1">
              Real-time reverse logistics & revenue recovery engine
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-lg border-neutral-200 text-[12px] font-bold px-3">
            <Calendar className="mr-2 h-3.5 w-3.5 text-neutral-400" /> Jan - Dec 2026
          </Button>
          <Button variant="orange" size="sm" className="h-9 rounded-lg shadow-lg shadow-brand-orange/10 text-[12px] font-bold px-4">
             <Download className="mr-2 h-3.5 w-3.5" /> Export Report
          </Button>
        </div>
      </div>

      {/* ═══ SECTION: Core Economics ════════════════ */}
      <RevenueRecoveryWidget />
      <AnalyticsStatsGrid />
      
      {/* ═══ SECTION: Performance & Retention (Composite Row) ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
         <div className="xl:col-span-1">
            <RevenueRetentionWidget />
         </div>
         <div className="xl:col-span-3">
            <SalesReturnsChart />
         </div>
      </div>

      {/* ═══ SECTION: Product & Operational Logic ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
         <ProductReasonMatrix />
         <OperationalLatencyChart />
         <TopReasonsChart />
      </div>

      {/* ═══ SECTION: Risk & Activity ═══════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
         <div className="xl:col-span-1">
            <FraudDetectionWidget />
         </div>
         <div className="xl:col-span-2">
            <ResolutionTrendChart />
         </div>
      </div>

      {/* ═══ SECTION: Distribution & Performance ══════ */}
      <div className="grid grid-cols-1 gap-6 items-start">
         <BreakdownGraph />
      </div>

      {/* ═══ SECTION: Heatmaps & Activity ═══════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
         <div className="xl:col-span-2">
            <ProductHeatmap />
         </div>
         <div className="xl:col-span-1 flex flex-col h-full">
            <HourlyActivityChart />
         </div>
      </div>

      {/* ═══ SECTION: Channel & Leakage Deep Dive ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
         <CustomerSegmentsChart />
         <FinancialLeakageSummary />
         <ChannelPerformance />
      </div>

      {/* ═══ SECTION: Global Logistics Heatmap (3D) ═ */}
      <GeospatialReturnDensity />

      {/* ═══ SECTION: Insights Hero ═════════════════ */}
      <Card className="border-none bg-gradient-to-r from-[#0c2e2e] to-[#113d3d] text-white overflow-hidden relative shadow-2xl shadow-emerald-950/20">
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-[#2dd4bf]/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg animate-pulse">
                <Zap className="h-8 w-8 text-[#2dd4bf]" />
              </div>
              <div>
                <Typography useSerif variant="h3" className="text-[22px] font-bold tracking-tight">
                  High-Priority Manufacturing Adjustment
                </Typography>
                <Typography variant="small" className="text-white/40 text-[13px] font-medium mt-1 uppercase tracking-widest">
                   manufacturing defect detected on TS-4091. Redesign reduces returns by 18%.
                </Typography>
              </div>
            </div>
            <Button
              className="bg-[#2dd4bf] text-[#0c2e2e] hover:bg-white rounded-xl font-black h-12 px-8 text-[13px] uppercase tracking-widest transition-all duration-300 shadow-xl shadow-emerald-500/20 active:scale-95"
            >
              Apply Strategy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#2dd4bf]/10 blur-3xl opacity-50" />
        <div className="absolute top-4 right-20 h-32 w-32 rounded-full bg-[#2dd4bf]/5 blur-2xl animate-float opacity-30" />
      </Card>
    </div>
  );
}
