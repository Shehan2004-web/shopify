'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  Search,
  ArrowRight,
  Check,
  ChevronRight,
  ChevronDown,
  Info,
  Truck,
  DollarSign,
  Gift,
} from 'lucide-react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

/* ── Types & Constants ────────────────────────────── */
type Phase = 'lookup' | 'select' | 'configure' | 'success';

interface Product {
  id: string;
  name: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Enterprise Performance Jacket',
    color: 'Green',
    quantity: 2,
    price: 189.0,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2672&auto=format&fit=crop',
  },
  {
    id: 'prod_2',
    name: 'Quantum Trail Shoes',
    color: 'Black',
    quantity: 1,
    price: 145.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop',
  },
];

const REASONS = [
  'Size too small',
  'Size too large',
  'Changed my mind',
  'Style not as expected',
  'Defective / Damaged',
  'Wrong item received',
];

/* ── Components ───────────────────────────────────── */

const ProgressSteps = ({ currentPhase }: { currentPhase: Phase }) => {
  const steps = [
    { id: 'lookup', label: 'Lookup' },
    { id: 'select', label: 'Select' },
    { id: 'configure', label: 'Configure' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {steps.map((step, idx) => {
        const isActive = step.id === currentPhase;
        const isPast = steps.findIndex(s => s.id === currentPhase) > idx;

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300',
                  isActive ? 'bg-brand-teal text-white ring-4 ring-brand-teal/20' : 
                  isPast ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-400'
                )}
              >
                {isPast ? <Check className="h-3 w-3" /> : idx + 1}
              </div>
              <span className={cn('text-[11px] font-bold uppercase tracking-wider', isActive ? 'text-neutral-900' : 'text-neutral-400')}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && <div className="h-px w-8 bg-neutral-100" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function ReturnPortalPage() {
  const [phase, setPhase] = React.useState<Phase>('lookup');
  const [orderId, setOrderId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState<Record<string, { selected: boolean; qty: number; reason: string }>>({});
  const [resolution, setResolution] = React.useState<'credit' | 'refund' | 'exchange' | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId === '#1001' && email === 'sample@user.com') {
      setPhase('select');
    } else {
      alert('Use Order #1001 and sample@user.com for the demo.');
    }
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: {
        selected: !prev[id]?.selected,
        qty: prev[id]?.qty || 1,
        reason: prev[id]?.reason || '',
      }
    }));
  };

  const updateQty = (id: string, qty: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], qty }
    }));
  };

  const updateReason = (id: string, reason: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], reason }
    }));
  };

  const selectedCount = Object.values(selectedItems).filter(i => i.selected).length;

  return (
    <div className="min-h-screen bg-[#fafbfc] selection:bg-brand-teal/10">
      {/* ── Sticky Header ──────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 flex items-center justify-center shadow-lg shadow-neutral-900/10">
              <Package className="h-4.5 w-4.5 text-brand-teal" />
            </div>
            <Typography useSerif variant="h3" className="text-lg font-black tracking-tight text-neutral-900">
              Shofiy<span className="text-brand-teal underline decoration-2 underline-offset-4">Returns</span>
            </Typography>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[12px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors">How it Works</button>
            <button className="text-[12px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors">Policies</button>
            <Button variant="outline" size="sm" className="h-9 rounded-lg px-4 font-bold border-neutral-200 text-[11px]">Contact Support</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <ProgressSteps currentPhase={phase} />

        <AnimatePresence mode="wait">
          {/* ── Phase 1: Lookup ─────────────────────── */}
          {phase === 'lookup' && (
            <motion.div
              key="lookup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-10">
                <Typography useSerif variant="h1" className="text-[36px] font-black text-neutral-900 leading-tight tracking-tight">
                  Start Your <span className="text-brand-teal">Return</span> or Exchange
                </Typography>
                <Typography variant="lead" className="mt-3 text-neutral-500 text-[15px] max-w-[320px] mx-auto">
                  Enter your order details below to lookup your purchase history.
                </Typography>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl shadow-neutral-200/50 p-8">
                <form onSubmit={handleLookup} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Typography variant="small" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 ml-1">Order Number</Typography>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-[13px] group-focus-within:text-brand-teal transition-colors">#</div>
                        <input
                          type="text"
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                          placeholder="1001"
                          className="h-12 w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 pl-9 pr-4 text-[13px] font-bold focus:border-brand-teal/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Typography variant="small" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 ml-1">Email Address</Typography>
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-brand-teal transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sample@user.com"
                          className="h-12 w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 text-[13px] font-bold focus:border-brand-teal/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl font-bold shadow-xl shadow-brand-primary/20 text-[13px] group">
                    Find My Order <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 opacity-60">
                    <ShieldCheck className="h-4 w-4 text-brand-teal" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Secure Lookup</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-60">
                    <RefreshCw className="h-4 w-4 text-brand-teal" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Instant Sync</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Phase 2: Select Items ────────────────── */}
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-8">
                  <div>
                    <Typography useSerif variant="h2" className="text-[28px] font-black text-neutral-900 leading-tight">
                      Select Items to <span className="text-brand-teal">Return</span>
                    </Typography>
                    <Typography variant="small" className="text-neutral-400 mt-1 font-medium">Order #1001 — Placed on May 12, 2026</Typography>
                  </div>

                  <div className="space-y-4">
                    {SAMPLE_PRODUCTS.map((product) => {
                      const isSelected = selectedItems[product.id]?.selected;
                      return (
                        <div
                          key={product.id}
                          onClick={() => toggleItem(product.id)}
                          className={cn(
                            'group relative bg-white rounded-3xl border transition-all duration-300 cursor-pointer p-5 flex items-center gap-5',
                            isSelected ? 'border-brand-teal shadow-xl shadow-brand-teal/5 ring-1 ring-brand-teal/50' : 'border-neutral-200 hover:border-neutral-300'
                          )}
                        >
                          <div className="h-24 w-24 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <Typography variant="small" className="text-[14px] font-bold text-neutral-900 truncate pr-4">{product.name}</Typography>
                              <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900">${product.price.toFixed(2)}</Typography>
                            </div>
                            <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">Color: {product.color}</Typography>

                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center justify-between"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center bg-neutral-50 rounded-xl p-1 border border-neutral-100">
                                  <button
                                    onClick={() => updateQty(product.id, Math.max(1, (selectedItems[product.id]?.qty || 1) - 1))}
                                    className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-neutral-400 hover:text-neutral-900"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center text-[12px] font-bold text-neutral-900">{selectedItems[product.id]?.qty}</span>
                                  <button
                                    onClick={() => updateQty(product.id, Math.min(product.quantity, (selectedItems[product.id]?.qty || 1) + 1))}
                                    className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-neutral-400 hover:text-neutral-900"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="h-6 w-6 rounded-full bg-brand-teal flex items-center justify-center">
                                  <Check className="h-3.5 w-3.5 text-white" />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full md:w-[320px]">
                  <div className="sticky top-24 space-y-4">
                    <div className="bg-[#0c2e2e] rounded-3xl p-6 shadow-2xl shadow-neutral-900/10 text-white">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-brand-teal" />
                        </div>
                        <div>
                          <Typography variant="small" className="text-[14px] font-bold">Return Summary</Typography>
                          <Typography variant="small" className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Selected {selectedCount} items</Typography>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8">
                        {Object.entries(selectedItems).filter(([, v]) => v.selected).map(([id, item]) => {
                          const product = SAMPLE_PRODUCTS.find(p => p.id === id);
                          return (
                            <div key={id} className="flex items-center justify-between">
                              <span className="text-[11px] font-medium text-white/60 truncate max-w-[140px]">{product?.name}</span>
                              <span className="text-[11px] font-mono font-bold text-white/90">x{item.qty}</span>
                            </div>
                          );
                        })}
                        {selectedCount === 0 && (
                          <div className="py-4 text-center border-2 border-dashed border-white/5 rounded-2xl">
                            <Typography variant="small" className="text-[11px] text-white/30">No items selected yet</Typography>
                          </div>
                        )}
                      </div>

                      <Button
                        disabled={selectedCount === 0}
                        onClick={() => setPhase('configure')}
                        variant="primary"
                        className="w-full h-11 rounded-2xl font-bold bg-brand-teal text-[#0c2e2e] hover:bg-brand-teal/90 disabled:opacity-20 transition-all text-[12px]"
                      >
                        Continue to Reasons
                      </Button>
                    </div>

                    <div className="bg-white rounded-3xl border border-neutral-200 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="h-3.5 w-3.5 text-brand-teal" />
                        <Typography variant="small" className="text-[11px] font-bold text-neutral-900">Return Policy</Typography>
                      </div>
                      <Typography variant="small" className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                        You have 30 days from delivery to initiate a return. Items must be in original condition.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Phase 3: Configure ──────────────────── */}
          {phase === 'configure' && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto space-y-10"
            >
              <div className="text-center mb-10">
                <Typography useSerif variant="h2" className="text-[32px] font-black text-neutral-900 tracking-tight">
                  Why are you <span className="text-brand-teal">Returning?</span>
                </Typography>
              </div>

              {Object.entries(selectedItems).filter(([, v]) => v.selected).map(([id]) => {
                const product = SAMPLE_PRODUCTS.find(p => p.id === id);
                return (
                  <div key={id} className="bg-white rounded-3xl border border-neutral-200 p-8 animate-fade-slide-up">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden bg-neutral-100 relative">
                        <Image src={product?.image || ''} alt={product?.name || 'Product'} fill className="object-cover" />
                      </div>
                      <div>
                        <Typography variant="small" className="text-[14px] font-bold text-neutral-900">{product?.name}</Typography>
                        <Typography variant="small" className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Returning {selectedItems[id].qty} items</Typography>
                      </div>
                    </div>

                    <div className="space-y-2">
                    <Typography variant="small" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 ml-1">Select Reason</Typography>
                    <div className="relative group">
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <select
                        value={selectedItems[id].reason}
                        onChange={(e) => updateReason(id, e.target.value)}
                        className="h-12 w-full appearance-none rounded-2xl border border-neutral-200 bg-neutral-50/50 px-5 text-[13px] font-bold focus:border-brand-teal/50 focus:bg-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="">Choose a reason...</option>
                        {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    </div>
                  </div>
                );
              })}

              <div className="space-y-6">
                <div className="text-center">
                  <Typography useSerif variant="h3" className="text-[24px] font-black text-neutral-900 tracking-tight">
                    How would you like your <span className="text-brand-teal">Refund?</span>
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Store Credit Card */}
                  <button
                    onClick={() => setResolution('credit')}
                    className={cn(
                      'relative p-6 rounded-[32px] border-2 text-left transition-all duration-300 group',
                      resolution === 'credit' ? 'border-brand-teal bg-white ring-8 ring-brand-teal/5 shadow-xl' : 'border-neutral-100 bg-white hover:border-neutral-200'
                    )}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn('h-10 w-10 rounded-2xl flex items-center justify-center transition-colors', resolution === 'credit' ? 'bg-brand-teal text-white' : 'bg-brand-teal/10 text-brand-teal')}>
                        <Gift className="h-5 w-5" />
                      </div>
                      <span className="px-2 py-1 rounded-full bg-brand-teal/10 text-[9px] font-black text-brand-teal uppercase tracking-widest">+ $10 BONUS</span>
                    </div>
                    <Typography variant="small" className="text-[15px] font-black text-neutral-900 leading-tight">Store Credit</Typography>
                    <Typography variant="small" className="text-[11px] text-neutral-500 mt-1 font-medium leading-relaxed">Instant credit to shop now. Best for exchange speed.</Typography>
                    {resolution === 'credit' && <div className="absolute bottom-6 right-6 h-6 w-6 rounded-full bg-brand-teal flex items-center justify-center text-white"><Check className="h-3 w-3" /></div>}
                  </button>

                  {/* Exchange Card */}
                  <button
                    onClick={() => setResolution('exchange')}
                    className={cn(
                      'relative p-6 rounded-[32px] border-2 text-left transition-all duration-300 group',
                      resolution === 'exchange' ? 'border-brand-primary bg-white ring-8 ring-brand-primary/5 shadow-xl' : 'border-neutral-100 bg-white hover:border-neutral-200'
                    )}
                  >
                    <div className="mb-6 h-10 w-10 rounded-2xl flex items-center justify-center bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <Typography variant="small" className="text-[15px] font-black text-neutral-900 leading-tight">Exchange Item</Typography>
                    <Typography variant="small" className="text-[11px] text-neutral-500 mt-1 font-medium leading-relaxed">Swap for a different size or color. Ships today.</Typography>
                    {resolution === 'exchange' && <div className="absolute bottom-6 right-6 h-6 w-6 rounded-full bg-brand-primary flex items-center justify-center text-white"><Check className="h-3 w-3" /></div>}
                  </button>

                  {/* Original Refund Card */}
                  <button
                    onClick={() => setResolution('refund')}
                    className={cn(
                      'relative p-6 rounded-[32px] border-2 text-left transition-all duration-300 group',
                      resolution === 'refund' ? 'border-brand-orange bg-white ring-8 ring-brand-orange/5 shadow-xl' : 'border-neutral-100 bg-white hover:border-neutral-200'
                    )}
                  >
                    <div className="mb-6 h-10 w-10 rounded-2xl flex items-center justify-center bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <Typography variant="small" className="text-[15px] font-black text-neutral-900 leading-tight">Standard Refund</Typography>
                    <Typography variant="small" className="text-[11px] text-neutral-500 mt-1 font-medium leading-relaxed">Back to your original payment method. 3-5 days.</Typography>
                    {resolution === 'refund' && <div className="absolute bottom-6 right-6 h-6 w-6 rounded-full bg-brand-orange flex items-center justify-center text-white"><Check className="h-3 w-3" /></div>}
                  </button>
                </div>
              </div>

              <div className="pt-10 flex flex-col items-center gap-4">
                <Button
                  disabled={!resolution || Object.values(selectedItems).filter(i => i.selected).some(i => !i.reason)}
                  onClick={() => setPhase('success')}
                  variant="primary"
                  className="h-14 px-12 rounded-[24px] font-black shadow-2xl shadow-brand-primary/20 text-[14px]"
                >
                  Submit My Return <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 opacity-40">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Free Shipping Labels</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Instant Auto-Approval</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Phase 4: Success ───────────────────── */}
          {phase === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="h-24 w-24 rounded-[32px] bg-brand-teal/10 flex items-center justify-center mx-auto mb-8 border border-brand-teal/20">
                <Check className="h-10 w-10 text-brand-teal" />
              </div>
              <Typography useSerif variant="h1" className="text-[42px] font-black text-neutral-900 leading-none tracking-tight">
                Return <span className="text-brand-teal">Confirmed!</span>
              </Typography>
              <Typography variant="lead" className="mt-4 text-neutral-500 text-[16px] max-w-sm mx-auto leading-relaxed">
                We&apos;ve sent your pre-paid shipping label to <span className="font-bold text-neutral-900">{email}</span>. Please drop off the items within 7 days.
              </Typography>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary"><Truck className="h-5 w-5" /></div>
                  <Typography variant="small" className="text-[12px] font-bold">Track Shipment</Typography>
                  <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">Coming soon</Typography>
                </div>
                <div className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal"><CreditCard className="h-5 w-5" /></div>
                  <Typography variant="small" className="text-[12px] font-bold">Store Credit</Typography>
                  <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">Will be ready tomorrow</Typography>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setPhase('lookup');
                  setOrderId('');
                  setEmail('');
                  setSelectedItems({});
                  setResolution(null);
                }}
                className="mt-12 h-11 px-8 rounded-xl font-bold border-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Back to Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Softgen Footer ────────────────────────── */}
      <footer className="py-12 border-t border-neutral-100 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-900">Powered by</span>
            <div className="h-6 w-px bg-neutral-300" />
            <Typography useSerif className="text-[14px] font-black text-neutral-900 tracking-tighter">Softgen Enterprise</Typography>
          </div>
          <div className="flex items-center gap-8 text-[11px] font-bold text-neutral-400">
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
