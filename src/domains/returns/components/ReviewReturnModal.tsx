'use client';

import * as React from 'react';
import { CheckCircle, ArrowLeft, Truck, Gift, Repeat, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  claim: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClose: () => void;
}

export const ReviewReturnModal = ({ claim, onClose }: Props) => {
  if (!claim) return null;

  const isStoreCredit = claim.resolution === 'store_credit';
  const isExchange = claim.resolution === 'exchange';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1.5 -ml-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Return {claim.id}</h2>
                <span className={cn(
                  "px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md",
                  claim.status === 'Approved' && "bg-green-100 text-green-800",
                  claim.status === 'Pending' && "bg-amber-100 text-amber-800",
                  claim.status === 'Denied' && "bg-red-100 text-red-800",
                  claim.status === 'Processing' && "bg-blue-100 text-blue-800",
                  claim.status === 'Inspected' && "bg-teal-100 text-teal-800",
                )}>
                  {claim.status}
                </span>
                {claim.shippingLabel && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md bg-neutral-100 text-neutral-600 flex items-center gap-1">
                    <Truck className="h-3 w-3" /> {claim.carrier || 'Label Generated'}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-neutral-500 mt-1">{claim.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {claim.status === 'Pending' && (
              <>
                <button className="px-4 h-9 rounded-xl border border-neutral-200 bg-white text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                  Deny
                </button>
                <button className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Approve Return
                </button>
              </>
             )}
             {claim.status !== 'Pending' && (
                <button onClick={onClose} className="px-5 h-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-[13px] font-semibold shadow-sm transition-all">
                  Close View
                </button>
             )}
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[63%] flex flex-col gap-6">

              {/* 1. Returned Items Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between bg-white">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Return items</h2>
                  <span className="text-[13px] font-medium text-neutral-600">Original order: <a href="#" className="text-brand-primary hover:underline font-bold">#ORD-{(claim.id.replace(/\D/g,'') || '102') + '09'}</a></span>
                </div>
                
                {claim.items.map((item: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <div key={i} className="p-4 flex items-start gap-4 border-b border-neutral-50">
                    <div className="h-16 w-16 rounded-lg bg-neutral-100 flex flex-col items-center justify-center border border-neutral-200 flex-shrink-0 shadow-sm">
                       <span className="text-3xl relative z-10">📦</span>
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex justify-between items-start">
                        <p className="text-[14px] font-bold text-brand-primary hover:underline cursor-pointer">{item.name}</p>
                        <p className="text-[14px] font-bold text-neutral-900">${(claim.totalValue / claim.items.length).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-[11px] font-bold tracking-wider rounded border border-neutral-200">QTY {item.quantity}</span>
                      </div>
                      <div className="mt-3 bg-neutral-50 border border-[#e1e3e5] rounded-lg p-3">
                         <p className="text-[12px] font-semibold text-neutral-600">Return Reason</p>
                         <p className="text-[13px] text-neutral-900 mt-0.5">{claim.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* 2. Tracking & Timeline Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Timeline & Tracking</h2>
                
                <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-neutral-200">
                  
                  <div className="relative flex items-start justify-between">
                     <div className="flex items-start gap-4 z-10">
                       <div className="w-5 h-5 rounded-full bg-neutral-300 outline outline-4 outline-white flex items-center justify-center mt-0.5" />
                       <div>
                         <p className="text-[13px] font-bold text-neutral-900">Return requested</p>
                         <p className="text-[12px] text-neutral-500 mt-0.5">Requested resolution: <span className="font-bold">{claim.resolution}</span></p>
                       </div>
                     </div>
                     <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2">{claim.createdAt}</span>
                  </div>

                  {claim.shippingLabel && claim.status !== 'Denied' && (
                     <div className="relative flex items-start justify-between">
                       <div className="flex items-start gap-4 z-10">
                         <div className="w-5 h-5 rounded-full bg-brand-primary outline outline-4 outline-white flex items-center justify-center mt-0.5 text-white">
                           <Truck className="h-3 w-3" />
                         </div>
                         <div>
                           <p className="text-[13px] font-bold text-brand-primary">Shipping label generated</p>
                           <p className="text-[12px] text-neutral-500 mt-0.5">Carrier: {claim.carrier} • Cost: $8.50</p>
                           <button className="mt-2 px-3 py-1.5 text-[11px] font-bold border border-brand-primary/30 text-brand-primary rounded-md hover:bg-brand-primary/5 transition-colors">Download Label</button>
                         </div>
                       </div>
                    </div>
                  )}

                  {claim.status === 'Inspected' && (
                    <div className="relative flex items-start justify-between">
                       <div className="flex items-start gap-4 z-10">
                         <div className="w-5 h-5 rounded-full bg-emerald-500 outline outline-4 outline-white flex items-center justify-center mt-0.5">
                           <CheckCircle className="h-3 w-3 text-white" />
                         </div>
                         <div>
                           <p className="text-[13px] font-bold text-neutral-900">Items received & Inspected</p>
                           <p className="text-[12px] text-emerald-600 font-medium mt-0.5">Approved for restock.</p>
                         </div>
                       </div>
                    </div>
                  )}

                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow, CLV heavy) ───────────────────── */}
            <div className="w-full lg:w-[37%] flex flex-col gap-6">

              {/* 1. CLV Impact Analysis (Migrated from inline modal) */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-4 sticky top-6">
                <h2 className="text-[14px] font-semibold text-[#202223] flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-brand-primary" /> CLV Impact Analysis
                </h2>
                
                <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Customer CLV</p>
                      <p className="text-[16px] font-mono font-bold text-neutral-900 mt-0.5">$4,250</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Lifetime Orders</p>
                      <p className="text-[16px] font-mono font-bold text-neutral-900 mt-0.5">22</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Retention Prob.</p>
                      <p className="text-[16px] font-mono font-bold text-emerald-600 mt-0.5">87%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Revenue at Risk</p>
                      <p className="text-[16px] font-mono font-bold text-amber-600 mt-0.5">${claim.totalValue?.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Recommendations based on status/resolution */}
                {claim.status === 'Pending' && (
                  <>
                    {isStoreCredit ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="flex items-center gap-2 mb-2"><Gift className="h-4 w-4 text-emerald-600" /><p className="text-[13px] font-bold text-emerald-800">Highly Recommended</p></div>
                        <p className="text-[11px] text-emerald-600 leading-relaxed">Customer requested store credit. Approving instantly will maximize their 87% retention probability. Expected future value recovery is high.</p>
                      </div>
                    ) : isExchange ? (
                      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-center gap-2 mb-2"><Repeat className="h-4 w-4 text-blue-600" /><p className="text-[13px] font-bold text-blue-800">Retain Revenue</p></div>
                        <p className="text-[11px] text-blue-600 leading-relaxed">Customer requested an exchange. 100% of revenue will be retained. Expedited processing recommended due to VIP status.</p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2"><Info className="h-4 w-4 text-amber-600" /><p className="text-[13px] font-bold text-amber-800">Recommendation</p></div>
                        <p className="text-[11px] text-amber-700 leading-relaxed">Consider offering a <strong>5% Store Credit Bonus</strong> instead of a direct refund to prevent capital leakage from this top-tier customer.</p>
                        <Button variant="outline" size="sm" className="w-full h-8 mt-1 border-amber-300 text-amber-800 hover:bg-amber-100 bg-white text-[11px]">Propose Bonus Credit</Button>
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#e1e3e5]">
                  <span className="text-[14px] font-bold text-neutral-900">Total Auth. Value</span>
                  <span className="text-[18px] font-bold text-neutral-900">${claim.totalValue?.toFixed(2)}</span>
                </div>
              </section>

              {/* Customer Contact */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
                <h2 className="text-[14px] font-semibold text-[#202223] flex items-center justify-between">
                  Customer
                  <button className="text-[13px] text-brand-primary hover:underline font-medium">Edit</button>
                </h2>
                
                <div className="flex items-center gap-3 border-b border-[#e1e3e5] pb-4">
                   <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[14px] font-bold flex-shrink-0">
                    {claim.customer.name.split(' ').map((n: string) => n[0]).join('')}
                   </div>
                   <div className="min-w-0">
                     <p className="text-[13px] font-bold text-[#005bd3] hover:underline cursor-pointer truncate">{claim.customer.name}</p>
                     <p className="text-[12px] font-medium text-neutral-500 mt-0.5 truncate">{claim.customer.email}</p>
                   </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Shipping Information</h3>
                  <p className="text-[13px] text-neutral-700 leading-relaxed">
                    {claim.customer.name}<br/>
                    142 Ward Place<br/>
                    Colombo 00700<br/>
                    Sri Lanka
                  </p>
                </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
