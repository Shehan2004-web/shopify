'use client';

import * as React from 'react';
import { X, Search, ChevronDown, Package, Plus, Check, Gift, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateReturnModal = ({ isOpen, onClose }: Props) => {
  const [returnQuantity, setReturnQuantity] = React.useState(1);
  const [resolution, setResolution] = React.useState<'refund' | 'exchange' | 'credit'>('refund');
  
  if (!isOpen) return null;

  const itemPrice = 120.00;
  const subtotal = itemPrice * returnQuantity;
  const bonus = resolution === 'credit' ? subtotal * 0.05 : 0;
  const total = subtotal + bonus;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Create Return</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Initiate a return for a customer order</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button 
              className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all"
            >
              Generate Shipping Label
            </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* 1. Order & Customer Info Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Find Order</h2>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search by order number (e.g. ORD-4921) or customer email..."
                    defaultValue="ORD-4921"
                    className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#c9cccf] text-[14px] text-[#202223] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded text-neutral-500">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#f4f6f8] rounded-lg border border-[#e1e3e5]">
                  <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[14px] font-bold">
                    AJ
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-neutral-900 truncate">Alice Johnson</p>
                    <p className="text-[12px] text-neutral-500 truncate">alice@mail.com • 3 lifetime orders</p>
                  </div>
                </div>
              </section>

              {/* 2. Eligible Items Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Eligible items</h2>
                  <span className="text-[12px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Within 30-day window</span>
                </div>
                
                <div className="p-4 border-b border-[#e1e3e5] flex items-start gap-4 hover:bg-neutral-50/50 transition-colors cursor-pointer">
                  <div className="h-4 w-4 rounded border-[#c9cccf] flex items-center justify-center bg-[#005bd3] flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div className="h-14 w-14 rounded-lg bg-neutral-100 flex items-center justify-center border border-neutral-200 flex-shrink-0 text-2xl shadow-sm">
                    🧥
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] font-bold text-neutral-900 text-brand-primary hover:underline">Urban Jacket Pro</p>
                      <p className="text-[13px] font-medium text-neutral-900">${itemPrice.toFixed(2)}</p>
                    </div>
                    <p className="text-[12px] text-neutral-500">SKU: UJP-001 • Size: M</p>
                  </div>
                </div>

                <div className="p-4 bg-[#f4f6f8] flex items-center justify-between">
                  <span className="text-[13px] text-neutral-700 font-medium">Return quantity</span>
                  <div className="flex items-center border border-[#c9cccf] rounded-lg bg-white overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setReturnQuantity(Math.max(0, returnQuantity - 1))}
                      className="px-3 h-8 text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100 font-bold border-r border-[#c9cccf]"
                    >
                      -
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center text-[13px] font-bold text-neutral-900 bg-white">
                      {returnQuantity}
                    </div>
                    <button 
                      onClick={() => setReturnQuantity(Math.min(1, returnQuantity + 1))}
                      className="px-3 h-8 text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100 font-bold border-l border-[#c9cccf]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </section>

              {/* 3. Return Reason */}
              {returnQuantity > 0 && (
                <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 animate-fade-in">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Return reason</h2>
                  <div className="relative">
                    <select className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] bg-white focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none appearance-none">
                      <option>Select a reason...</option>
                      <option>Size was too small</option>
                      <option>Size was too large</option>
                      <option>Item defective or damaged</option>
                      <option>Incorrect item sent</option>
                      <option>Changed mind</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </section>
              )}

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Resolution Options */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 sticky top-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Resolution Preference</h2>
                
                <div className="flex flex-col gap-2 mt-1">
                  <label 
                    onClick={() => setResolution('refund')}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      resolution === 'refund' ? "bg-blue-50/50 border-[#005bd3]" : "bg-white border-[#c9cccf] hover:border-neutral-400"
                    )}
                  >
                    <input type="radio" checked={resolution === 'refund'} readOnly className="mt-1" />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-neutral-900">Refund to original payment</span>
                      <span className="text-[12px] text-neutral-500 mt-0.5">Refund directly to Mastercard ending in 1234.</span>
                    </div>
                  </label>

                  <label 
                    onClick={() => setResolution('credit')}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      resolution === 'credit' ? "bg-blue-50/50 border-[#005bd3]" : "bg-white border-[#c9cccf] hover:border-neutral-400"
                    )}
                  >
                    <input type="radio" checked={resolution === 'credit'} readOnly className="mt-1" />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-neutral-900 flex items-center gap-1.5 border border-brand-primary text-brand-primary bg-brand-primary/5 px-1.5 py-0.5 rounded-md self-start">Store Credit <Gift className="h-3 w-3" /></span>
                      <span className="text-[12px] text-neutral-500 mt-1">Includes an automatic 5% bonus to incentivize retention.</span>
                    </div>
                  </label>
                  
                  <label 
                    onClick={() => setResolution('exchange')}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      resolution === 'exchange' ? "bg-blue-50/50 border-[#005bd3]" : "bg-white border-[#c9cccf] hover:border-neutral-400"
                    )}
                  >
                    <input type="radio" checked={resolution === 'exchange'} readOnly className="mt-1" />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-neutral-900">Exchange for another item</span>
                      <span className="text-[12px] text-neutral-500 mt-0.5">Customer will receive an exchange link via email.</span>
                    </div>
                  </label>
                </div>

                <div className="mt-3 pt-4 border-t border-[#e1e3e5] flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Return items value</span>
                    <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {bonus > 0 && (
                     <div className="flex justify-between items-center text-[13px]">
                       <span className="text-brand-primary font-medium">Store Credit Bonus</span>
                       <span className="font-bold text-brand-primary">+${bonus.toFixed(2)}</span>
                     </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-[#e1e3e5]">
                    <span className="text-[14px] font-bold text-neutral-900">Total Authorized</span>
                    <span className="text-[18px] font-bold text-neutral-900">${total.toFixed(2)}</span>
                  </div>
                </div>

              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
