'use client';

import * as React from 'react';
import { Clock, Tag, Check, ArrowLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

export interface Claim {
  id: string;
  customer: string;
  email: string;
  item: string;
  date: string;
  amount: string;
  status: 'Approved' | 'Pending' | 'Denied' | 'Processing' | 'Inspected';
  reason: string;
}

interface Props {
  claim: Claim | null;
  onClose: () => void;
}

export const ReviewRefundModal = ({ claim, onClose }: Props) => {
  const [isRestockChecked, setIsRestockChecked] = React.useState(true);

  if (!claim) return null;

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
              </div>
              <p className="text-[12px] text-neutral-500 mt-1">{claim.date} at 14:32 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {claim.status === 'Pending' && (
              <>
                <button className="px-4 h-9 rounded-xl border border-neutral-200 bg-white text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                  Deny Return
                </button>
                <button className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all">
                  Approve Return
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
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* 1. Return Items Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between bg-white">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Return items</h2>
                  <span className="text-[13px] font-medium text-neutral-600">Original order: <a href="#" className="text-brand-primary hover:underline">#ORD-4921</a></span>
                </div>
                
                <div className="p-4 flex items-start gap-4">
                  <div className="h-16 w-16 rounded-lg bg-neutral-100 flex flex-col items-center justify-center border border-neutral-200 flex-shrink-0 shadow-sm relative overflow-hidden group">
                     <span className="text-3xl relative z-10">📦</span>
                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex justify-between items-start">
                      <p className="text-[14px] font-bold text-brand-primary hover:underline cursor-pointer">{claim.item}</p>
                      <p className="text-[14px] font-bold text-neutral-900">{claim.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-[11px] font-bold tracking-wider rounded border border-neutral-200">QTY 1</span>
                    </div>
                    <div className="mt-3 bg-red-50/50 border border-red-100 rounded-lg p-3">
                       <p className="text-[12px] font-semibold text-red-800 flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> Return Reason</p>
                       <p className="text-[13px] text-red-900 mt-1">{claim.reason}</p>
                       <p className="text-[12px] text-red-700/80 mt-1.5 italic">&quot;The item was slightly damaged on arrival, specifically the zipper.&quot; - Customer</p>
                    </div>
                  </div>
                </div>

                {claim.status === 'Pending' && (
                  <div className="p-4 bg-[#f4f6f8] border-t border-[#e1e3e5] flex items-center gap-3">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isRestockChecked}
                        onChange={(e) => setIsRestockChecked(e.target.checked)}
                        className="h-4 w-4 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3] cursor-pointer" 
                      />
                      <span className="text-[13px] text-[#202223] font-medium">Restock returned item</span>
                    </label>
                  </div>
                )}
              </section>

              {/* 2. Timeline Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Timeline</h2>
                
                <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-neutral-200">
                  
                  {/* Event 1 */}
                  <div className="relative flex items-start justify-between">
                     <div className="flex items-start gap-4 z-10">
                       <div className="w-5 h-5 rounded-full bg-brand-primary outline outline-4 outline-white flex items-center justify-center mt-0.5">
                         <div className="w-2 h-2 rounded-full bg-white" />
                       </div>
                       <div>
                         <p className="text-[13px] font-bold text-neutral-900">Return requested</p>
                         <p className="text-[12px] text-neutral-500 mt-0.5">Return initiated by Alice Johnson via portal.</p>
                       </div>
                     </div>
                     <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2">Today, 14:32</span>
                  </div>

                  {claim.status === 'Approved' && (
                    <div className="relative flex items-start justify-between">
                       <div className="flex items-start gap-4 z-10">
                         <div className="w-5 h-5 rounded-full bg-green-500 outline outline-4 outline-white flex items-center justify-center mt-0.5">
                           <Check className="h-3 w-3 text-white" />
                         </div>
                         <div>
                           <p className="text-[13px] font-bold text-neutral-900">Return approved</p>
                           <p className="text-[12px] text-neutral-500 mt-0.5">Approved by system auto-rule #4.</p>
                         </div>
                       </div>
                       <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2">Today, 14:35</span>
                    </div>
                  )}

                  {claim.status === 'Pending' && (
                     <div className="relative flex items-start justify-between">
                       <div className="flex items-start gap-4 z-10">
                         <div className="w-5 h-5 rounded-full bg-amber-400 outline outline-4 outline-white flex items-center justify-center mt-0.5">
                           <Clock className="h-3 w-3 text-white" />
                         </div>
                         <div>
                           <p className="text-[13px] font-bold text-amber-600">Manual review required</p>
                           <p className="text-[12px] text-neutral-500 mt-0.5">Waiting for staff action.</p>
                         </div>
                       </div>
                    </div>
                  )}

                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Actions/Summary Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4 sticky top-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Financials</h2>
                
                <div className="flex flex-col gap-2.5 border-b border-[#e1e3e5] pb-4">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Expected Refund</span>
                    <span className="font-bold text-neutral-900">{claim.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Original Shipping</span>
                    <span className="font-medium text-neutral-500 line-through">$10.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[14px] font-bold text-neutral-900">Total Liability</span>
                  <span className="text-[18px] font-bold text-brand-primary">{claim.amount}</span>
                </div>

                <Button variant="outline" className="w-full mt-2 font-semibold h-9 rounded-xl border-neutral-200">
                   Issue Store Credit Instead
                </Button>
              </section>

              {/* Customer Info */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
                <h2 className="text-[14px] font-semibold text-[#202223] flex items-center justify-between">
                  Customer
                  <button className="text-[13px] text-brand-primary hover:underline font-medium">Edit</button>
                </h2>
                
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[14px] font-bold">
                    {claim.customer.split(' ').map((n) => n[0]).join('')}
                   </div>
                   <div>
                     <p className="text-[13px] font-bold text-[#005bd3] hover:underline cursor-pointer">{claim.customer}</p>
                     <p className="text-[12px] font-medium text-neutral-500 mt-0.5">3 orders</p>
                   </div>
                </div>

                <div className="mt-2 pt-4 border-t border-[#e1e3e5]">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Contact Information</h3>
                  <a href={`mailto:${claim.email}`} className="text-[13px] text-[#005bd3] hover:underline font-medium break-all">{claim.email}</a>
                  <p className="text-[13px] text-neutral-600 mt-1">+94 77 123 4567</p>
                </div>

                <div className="mt-1 pt-4 border-t border-[#e1e3e5]">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Shipping Address</h3>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">
                    Alice Johnson<br/>
                    142 Ward Place<br/>
                    Colombo 00700<br/>
                    Sri Lanka
                  </p>
                  <a href="#" className="text-[13px] text-[#005bd3] hover:underline font-medium mt-2 inline-block">View map</a>
                </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
