'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Badge } from '@/shared/ui/atoms/Badge';
import { Button } from '@/shared/ui/atoms/Button';
import { cn } from '@/shared/lib/utils';
import { useProducts, useSyncProducts, useUpdateProduct, useBulkUpdateProducts } from '@/domains/products/hooks/useProductQueries';
import { ProductDetailsModal } from '@/domains/products/components/ProductDetailsModal';
import type { Product, StockStatus } from '@/domains/products/types';
import type { LucideIcon } from 'lucide-react';
import {
  Search,
  RefreshCw,
  Check,
  X,
  Package,
  ChevronDown,
  Pencil,
  Loader2,
  CheckSquare,
  Square,
  MinusSquare,
  Eye,
} from 'lucide-react';

/* ── Status Config ───────────────────────────────── */
const statusMap: Record<StockStatus, { label: string; variant: 'success' | 'warning' | 'error'; icon: LucideIcon }> = {
  in_stock: { label: 'In Stock', variant: 'success', icon: Check },
  low_stock: { label: 'Low Stock', variant: 'warning', icon: Package },
  out_of_stock: { label: 'Out of Stock', variant: 'error', icon: X },
};

const collections = ['All', 'Outerwear', 'Footwear', 'Electronics', 'Fitness', 'Accessories', 'Home Office'];

/* ── Inline Edit Cell ────────────────────────────── */
const InlineEditCell = ({
  value,
  prefix = '',
  productId,
  field,
  onSave,
  isSaving,
}: {
  value: number;
  prefix?: string;
  productId: string;
  field: 'price' | 'inventory';
  onSave: (id: string, field: 'price' | 'inventory', val: number) => void;
  isSaving: boolean;
}) => {
  const [editing, setEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value.toString());
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = () => {
    const num = parseFloat(editValue);
    if (!isNaN(num) && num >= 0) {
      onSave(productId, field, num);
    }
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        {prefix && <span className="text-[12px] text-neutral-400">{prefix}</span>}
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false); }}
          className="h-7 w-20 rounded-lg border border-brand-primary/40 bg-white px-2 text-[13px] font-mono font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          min={0}
          step={field === 'price' ? 0.01 : 1}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => { setEditValue(value.toString()); setEditing(true); }}
      className="group/edit flex items-center gap-1.5 rounded-lg px-2 py-1 -mx-2 transition-colors hover:bg-neutral-50"
      disabled={isSaving}
    >
      <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900">
        {prefix}{field === 'price' ? value.toFixed(2) : value.toLocaleString()}
      </Typography>
      <Pencil className="h-3 w-3 text-neutral-300 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
    </button>
  );
};

/* ── Skeleton Rows ───────────────────────────────── */
const SkeletonRow = () => (
  <tr>
    {[...Array(7)].map((_, i) => (
      <td key={i} className="px-4 py-3.5">
        <div className="h-4 rounded-md bg-neutral-100 animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
      </td>
    ))}
  </tr>
);

/* ═══ MAIN COMPONENT ═════════════════════════════ */
export const ProductTable = () => {
  const { data: products, isLoading } = useProducts();
  const syncMutation = useSyncProducts();
  const updateMutation = useUpdateProduct();
  const bulkMutation = useBulkUpdateProducts();

  const [search, setSearch] = React.useState('');
  const [collection, setCollection] = React.useState('All');
  const [stockFilter, setStockFilter] = React.useState<StockStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [showBulkPanel, setShowBulkPanel] = React.useState(false);
  const [viewProduct, setViewProduct] = React.useState<Product | null>(null);

  /* Filter products */
  const filtered = React.useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false;
      }
      if (collection !== 'All' && p.collection !== collection) return false;
      if (stockFilter !== 'all' && p.status !== stockFilter) return false;
      return true;
    });
  }, [products, search, collection, stockFilter]);

  /* Selection logic */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  };

  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < filtered.length;

  /* Save handler */
  const handleInlineSave = (id: string, field: 'price' | 'inventory', value: number) => {
    updateMutation.mutate({ id, field, value });
  };

  /* Bulk action */
  const handleBulkUpdate = (field: 'price' | 'inventory', value: number) => {
    bulkMutation.mutate({ productIds: Array.from(selectedIds), field, value });
    setSelectedIds(new Set());
    setShowBulkPanel(false);
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-slide-up">
      {/* ── Toolbar ─────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or SKU..."
              className="h-10 w-64 rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200"
            />
          </div>

          {/* Collection Filter */}
          <div className="relative">
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="h-10 appearance-none rounded-xl border border-neutral-200 bg-white pl-3 pr-9 text-[12px] font-semibold text-neutral-600 focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 cursor-pointer"
            >
              {collections.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-1">
            {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStockFilter(s)}
                className={cn(
                  'px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all duration-200',
                  stockFilter === s
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-500 hover:bg-neutral-100'
                )}
              >
                {s === 'all' ? 'All' : statusMap[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 mr-2">
              <Typography variant="small" className="text-[11px] font-bold text-brand-primary">
                {selectedIds.size} selected
              </Typography>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg px-3 text-[11px] border-neutral-200"
                onClick={() => setShowBulkPanel(!showBulkPanel)}
              >
                <Pencil className="mr-1 h-3 w-3" /> Bulk Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg px-2 text-[11px] text-neutral-400"
                onClick={() => setSelectedIds(new Set())}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl px-4 text-[12px] font-semibold border-neutral-200"
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
          >
            <RefreshCw className={cn('mr-2 h-4 w-4', syncMutation.isPending && 'animate-spin')} />
            {syncMutation.isPending ? 'Syncing...' : 'Sync Shopify'}
          </Button>
        </div>
      </div>

      {/* ── Bulk Edit Panel ─────────────────────────── */}
      {showBulkPanel && selectedIds.size > 0 && (
        <BulkEditPanel
          count={selectedIds.size}
          onUpdate={handleBulkUpdate}
          onClose={() => setShowBulkPanel(false)}
          isPending={bulkMutation.isPending}
        />
      )}

      {/* ── Table ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/60">
                <th className="px-4 py-3.5 w-[44px]">
                  <button onClick={toggleAll} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    {allSelected ? <CheckSquare className="h-4 w-4 text-brand-primary" /> : someSelected ? <MinusSquare className="h-4 w-4 text-brand-primary" /> : <Square className="h-4 w-4" />}
                  </button>
                </th>
                <th className="px-4 py-3.5">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Product</Typography>
                </th>
                <th className="px-4 py-3.5 w-[100px]">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">SKU</Typography>
                </th>
                <th className="px-4 py-3.5 w-[100px]">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Collection</Typography>
                </th>
                <th className="px-4 py-3.5 w-[120px]">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Price</Typography>
                </th>
                <th className="px-4 py-3.5 w-[100px]">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Inventory</Typography>
                </th>
                <th className="px-4 py-3.5 w-[120px]">
                  <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Status</Typography>
                </th>
                <th className="px-4 py-3.5 w-[60px]">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Package className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                    <Typography variant="small" className="text-neutral-400 text-[13px]">No products match your filters</Typography>
                  </td>
                </tr>
              ) : (
                filtered.map((product, idx) => {
                  const stCfg = statusMap[product.status];
                  const isSelected = selectedIds.has(product.id);
                  return (
                    <tr
                      key={product.id}
                      className={cn(
                        'group transition-colors duration-150',
                        isSelected ? 'bg-brand-primary/[0.03]' : 'hover:bg-neutral-50/50',
                        idx !== filtered.length - 1 && 'border-b border-neutral-200/80'
                      )}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <button onClick={() => toggleSelect(product.id)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                          {isSelected ? <CheckSquare className="h-4 w-4 text-brand-primary" /> : <Square className="h-4 w-4" />}
                        </button>
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[20px] flex-shrink-0">
                            {product.image}
                          </div>
                          <div className="min-w-0">
                            <Typography variant="small" className="font-semibold text-neutral-900 text-[13px] truncate block">
                              {product.name}
                            </Typography>
                            <Typography variant="small" className="text-[10px] text-neutral-400">{product.vendor} · {product.weight}</Typography>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-3">
                        <Typography variant="small" className="font-mono text-[12px] font-semibold text-neutral-600">{product.sku}</Typography>
                      </td>

                      {/* Collection */}
                      <td className="px-4 py-3">
                        <Typography variant="small" className="text-[12px] text-neutral-600">{product.collection}</Typography>
                      </td>

                      {/* Price (Inline Edit) */}
                      <td className="px-4 py-3">
                        <InlineEditCell
                          value={product.price}
                          prefix="$"
                          productId={product.id}
                          field="price"
                          onSave={handleInlineSave}
                          isSaving={updateMutation.isPending}
                        />
                        {product.compareAtPrice && (
                          <Typography variant="small" className="text-[10px] text-neutral-400 line-through ml-2">
                            ${product.compareAtPrice.toFixed(2)}
                          </Typography>
                        )}
                      </td>

                      {/* Inventory (Inline Edit) */}
                      <td className="px-4 py-3">
                        <InlineEditCell
                          value={product.inventory}
                          productId={product.id}
                          field="inventory"
                          onSave={handleInlineSave}
                          isSaving={updateMutation.isPending}
                        />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <Badge dot variant={stCfg.variant} icon={stCfg.icon} pulse={product.status === 'low_stock'}>
                          {stCfg.label}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setViewProduct(product)}
                          className="text-neutral-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-colors p-1.5 rounded-lg flex items-center justify-center"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
          <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
            Showing {filtered.length} of {products?.length ?? 0} products
          </Typography>
          <Typography variant="small" className="text-[10px] text-neutral-400">
            Last synced: {products?.[0]?.lastSynced ? new Date(products[0].lastSynced).toLocaleTimeString() : '—'}
          </Typography>
        </div>
      </div>

      <ProductDetailsModal 
        product={viewProduct} 
        onClose={() => setViewProduct(null)} 
      />
    </div>
  );
};

/* ── Bulk Edit Panel ─────────────────────────────── */
const BulkEditPanel = ({
  count,
  onUpdate,
  onClose,
  isPending,
}: {
  count: number;
  onUpdate: (field: 'price' | 'inventory', value: number) => void;
  onClose: () => void;
  isPending: boolean;
}) => {
  const [field, setField] = React.useState<'price' | 'inventory'>('price');
  const [value, setValue] = React.useState('');

  return (
    <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.02] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-slide-up">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
          <Pencil className="h-4 w-4 text-brand-primary" />
        </div>
        <Typography variant="small" className="text-[12px] font-semibold text-neutral-700">
          Bulk edit {count} product{count > 1 ? 's' : ''}
        </Typography>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <select
          value={field}
          onChange={(e) => setField(e.target.value as 'price' | 'inventory')}
          className="h-8 rounded-lg border border-neutral-200 bg-white px-2 text-[11px] font-semibold"
        >
          <option value="price">Set Price</option>
          <option value="inventory">Set Inventory</option>
        </select>
        <div className="relative">
          {field === 'price' && <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400">$</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field === 'price' ? '0.00' : '0'}
            className={cn(
              'h-8 w-24 rounded-lg border border-neutral-200 bg-white text-[12px] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20',
              field === 'price' ? 'pl-5 pr-2' : 'px-2'
            )}
            min={0}
            step={field === 'price' ? 0.01 : 1}
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          className="h-8 rounded-lg px-3 text-[11px]"
          onClick={() => { const n = parseFloat(value); if (!isNaN(n) && n >= 0) onUpdate(field, n); }}
          disabled={isPending || !value}
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Check className="h-3 w-3 mr-1" />}
          Apply
        </Button>
      </div>

      <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
