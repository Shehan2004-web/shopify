'use client';

import * as React from 'react';
import { ProductTable } from '@/domains/products/components/ProductTable';
import { AddProductModal } from '@/domains/products/components/AddProductModal';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card, CardContent } from '@/shared/ui/atoms/Card';
import {
  Plus,
  Download,
  BarChart3,
  Package,
  AlertTriangle,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Page Header ═════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <Typography
            useSerif
            variant="h1"
            className="text-[32px] font-black text-neutral-900 tracking-tight"
          >
            Products
          </Typography>
          <Typography
            variant="lead"
            className="mt-1.5 text-[13px] font-medium text-neutral-500"
          >
            Manage inventory, pricing, and product catalog synced with Shopify.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2.5 w-full md:flex md:w-auto md:items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px]"
          >
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* ═══ Quick Stats Row ═════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        <Card hoverable className="border-none bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-[#e8e9fe] flex items-center justify-center">
                <Package className="h-4 w-4 text-[#5057f5]" />
              </div>
            </div>
            <Typography variant="h3" className="font-mono text-[22px] font-bold text-neutral-900 tracking-tighter">
              10
            </Typography>
            <Typography variant="small" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mt-0.5">
              Total Products
            </Typography>
          </CardContent>
        </Card>

        <Card hoverable className="border-none bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-[#ecfdf3] flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-[#12b76a]" />
              </div>
            </div>
            <Typography variant="h3" className="font-mono text-[22px] font-bold text-neutral-900 tracking-tighter">
              1,013
            </Typography>
            <Typography variant="small" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mt-0.5">
              Total Inventory
            </Typography>
          </CardContent>
        </Card>

        <Card hoverable className="border-none bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-[#fffaeb] flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-[#f79009]" />
              </div>
            </div>
            <Typography variant="h3" className="font-mono text-[22px] font-bold text-neutral-900 tracking-tighter">
              3
            </Typography>
            <Typography variant="small" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mt-0.5">
              Low Stock Items
            </Typography>
          </CardContent>
        </Card>

        <Card hoverable className="border-none bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-[#fef3f2] flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-[#f04438]" />
              </div>
            </div>
            <Typography variant="h3" className="font-mono text-[22px] font-bold text-neutral-900 tracking-tighter">
              2
            </Typography>
            <Typography variant="small" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 mt-0.5">
              Out of Stock
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* ═══ Product Table ═══════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Typography
              useSerif
              variant="h2"
              className="text-[22px] font-bold text-neutral-900 tracking-tight"
            >
              Product Catalog
            </Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">
              Click on price or inventory cells to edit inline. Use checkboxes for bulk operations.
            </Typography>
          </div>
        </div>
        <ProductTable />
      </div>

      {/* ═══ Shopify Integration Banner ══════════════ */}
      <Card className="border-none bg-gradient-to-r from-[#0c2e2e] to-[#0a2828] text-white overflow-hidden relative animate-fade-slide-up">
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Typography useSerif variant="h3" className="text-[20px] font-bold tracking-tight">
                Shopify Admin API Connected
              </Typography>
              <Typography variant="small" className="text-white/40 text-[12px] font-medium mt-1">
                Products sync automatically every 15 minutes. Use the Sync button for manual refresh.
              </Typography>
            </div>
            <Button
              variant="ghost"
              className="bg-white/10 text-white hover:bg-white/15 rounded-xl font-semibold h-10 px-5 text-[13px] border border-white/5 transition-all duration-200 flex-shrink-0"
            >
              API Settings
              <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </div>
        </CardContent>
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#2dd4bf]/10 blur-3xl" />
      </Card>

      {/* ═══ Modals ══════════════════════════════════ */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
