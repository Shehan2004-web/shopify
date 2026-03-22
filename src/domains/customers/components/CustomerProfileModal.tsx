'use client';

import * as React from 'react';
import { X, ArrowLeft, Mail, MapPin, ShoppingCart, Activity, ShieldAlert, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  customer: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClose: () => void;
}

export const CustomerProfileModal = ({ customer, onClose }: Props) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-1.5 -ml-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight leading-none">{customer.name}</h2>
              <span className="text-[12px] text-neutral-500 mt-0.5">{customer.email}</span>
              
              <div className="flex gap-1.5 ml-2">
                 <span className={cn(
                   "px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md flex items-center gap-1",
                   customer.segment === 'vip' ? "bg-purple-100 text-purple-800" :
                   customer.segment === 'at_risk' ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                 )}>
                   {customer.segment.replace('_', ' ')}
                 </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="h-8 rounded-lg shadow-sm border-[#c9cccf] text-[13px]">
               Edit
             </Button>
             <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors ml-2">
               <X className="h-5 w-5" />
             </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* 1. LTV Metric Cards Inline */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5">
                    <p className="text-[12px] text-neutral-500 font-medium mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:border-b-2 after:border-dashed after:border-neutral-300 w-fit cursor-help">Total Spent</p>
                    <p className="text-[24px] font-mono font-bold text-neutral-900">${customer.totalSpent.toLocaleString()}</p>
                 </div>
                 <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5">
                    <p className="text-[12px] text-neutral-500 font-medium mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:border-b-2 after:border-dashed after:border-neutral-300 w-fit cursor-help">Orders</p>
                    <p className="text-[24px] font-mono font-bold text-neutral-900">{customer.totalOrders}</p>
                 </div>
                 <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                       <Activity className="h-12 w-12 text-blue-600" />
                    </div>
                    <p className="text-[12px] text-neutral-500 font-medium mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:border-b-2 after:border-dashed after:border-neutral-300 w-fit cursor-help">Est. C.L.V.</p>
                    <p className="text-[24px] font-mono font-bold text-emerald-600">${customer.clv.toLocaleString()}</p>
                 </div>
              </div>

              {/* 2. Order History Miniature */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Recent Orders</h2>
                  <Button variant="ghost" size="sm" className="text-brand-primary text-[13px] font-medium h-8 hover:bg-brand-primary/10">View all</Button>
                </div>
                
                <div className="flex flex-col gap-0 divide-y divide-[#e1e3e5]">
                   <div className="p-4 flex items-center justify-between hover:bg-[#f9fafb] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="bg-neutral-100 p-2 rounded-lg border border-neutral-200">
                           <ShoppingCart className="text-neutral-600 h-5 w-5" />
                         </div>
                         <div>
                            <p className="text-[13px] font-bold text-neutral-900 border-b border-transparent hover:border-brand-primary inline-block">#ORD-1092</p>
                            <p className="text-[12px] text-neutral-500 mt-0.5">{customer.lastActive}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <span className="px-2 py-0.5 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 rounded">Paid</span>
                         </div>
                         <div className="text-right">
                            <span className="px-2 py-0.5 text-[10px] uppercase font-bold text-blue-700 bg-blue-100 rounded">Fulfilled</span>
                         </div>
                         <div className="w-20 text-right">
                            <p className="text-[14px] font-medium text-neutral-900">$184.00</p>
                         </div>
                         <ChevronRight className="h-4 w-4 text-neutral-400" />
                      </div>
                   </div>

                   <div className="p-4 flex items-center justify-between hover:bg-[#f9fafb] cursor-pointer transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="bg-neutral-100 p-2 rounded-lg border border-neutral-200">
                           <ShoppingCart className="text-neutral-600 h-5 w-5" />
                         </div>
                         <div>
                            <p className="text-[13px] font-bold text-neutral-900 border-b border-transparent hover:border-brand-primary inline-block">#ORD-0842</p>
                            <p className="text-[12px] text-neutral-500 mt-0.5">Jan 12, 2026</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <span className="px-2 py-0.5 text-[10px] uppercase font-bold text-amber-700 bg-amber-100 rounded">Refunded</span>
                         </div>
                         <div className="text-right">
                            <span className="px-2 py-0.5 text-[10px] uppercase font-bold text-neutral-600 bg-neutral-100 rounded">Returned</span>
                         </div>
                         <div className="w-20 text-right">
                            <p className="text-[14px] font-medium text-neutral-400 line-through">$120.00</p>
                         </div>
                         <ChevronRight className="h-4 w-4 text-neutral-400" />
                      </div>
                   </div>
                </div>
              </section>

              {/* 3. CRM Timeline */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Interaction Timeline</h2>
                
                <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-[2px] before:bg-neutral-200">
                  
                  <div className="relative flex items-start gap-4 z-10 w-full mb-8">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-neutral-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-neutral-400">
                       <Mail className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium cursor-pointer hover:underline inline-block">Support ticket opened</p>
                        <p className="text-[12px] text-neutral-500 mt-0.5">Customer requested tracking update for #ORD-1092.</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">{customer.lastActive}</span>
                  </div>

                  <div className="relative flex items-start gap-4 z-10 w-full mb-8">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-blue-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-blue-600">
                        <CreditCard className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium">Store Credit Issued</p>
                        <p className="text-[12px] text-neutral-500 mt-0.5">$120.00 added to account balance from Return #RET-004.</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">Feb 10, 2026</span>
                  </div>

                  <div className="relative flex items-start gap-4 z-10 w-full">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-primary/10 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-brand-primary">
                       <ShoppingCart className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium">First order placed</p>
                        <p className="text-[12px] text-neutral-500 mt-0.5">Order #ORD-0842 placed via Online Store checkout.</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">Jan 12, 2026</span>
                  </div>

                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">

              {customer.segment === 'at_risk' && (
                 <section className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-4 flex gap-3 animate-pulse">
                    <ShieldAlert className="h-5 w-5 text-red-600 shrink-0" />
                    <div>
                       <h3 className="text-[13px] font-bold text-red-900">High Churn Risk</h3>
                       <p className="text-[12px] text-red-700 mt-1">Has not ordered in 90+ days following a return. Proactive engagement recommended.</p>
                       <button className="text-[12px] font-bold text-red-800 hover:underline mt-2">View retention playbook</button>
                    </div>
                 </section>
              )}
              
              {/* Customer Info */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 sticky top-6">
                <div className="flex items-center justify-between mb-2 border-b border-[#e1e3e5] pb-2">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Profile</h2>
                  <button className="text-brand-primary font-normal text-[12px] hover:underline cursor-pointer">Edit</button>
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex flex-col gap-1">
                      <p className="text-[12px] text-neutral-500 font-medium">Email address</p>
                      <p className="text-[13px] text-brand-primary hover:underline cursor-pointer relative pr-6 break-all">
                         {customer.email}
                      </p>
                   </div>

                   <div className="flex flex-col gap-1 mt-1">
                      <p className="text-[12px] text-neutral-500 font-medium">Phone number</p>
                      <p className="text-[13px] text-neutral-900">+1 415-555-0198</p>
                   </div>
                   
                   <div className="flex flex-col gap-1 mt-1">
                      <p className="text-[12px] text-neutral-500 font-medium">Email Marketing</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                         <span className="text-[13px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">Subscribed</span>
                      </div>
                   </div>

                   <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-[#e1e3e5]">
                      <p className="text-[12px] text-neutral-500 font-medium">Default address</p>
                      <p className="text-[13px] text-neutral-800 leading-relaxed mt-1">
                         {customer.name}<br />
                         8829 Tech Parkway<br />
                         Austin, TX 78701<br />
                         United States
                      </p>
                      <a href="#" className="text-[13px] text-brand-primary hover:underline mt-1 flex items-center gap-1 w-fit"><MapPin className="h-3 w-3" /> View map</a>
                   </div>
                </div>
              </section>

              {/* Tags */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
                 <h2 className="text-[14px] font-semibold text-[#202223] flex justify-between items-center">
                    Tags
                    <button className="text-brand-primary font-normal text-[12px] hover:underline cursor-pointer">Manage</button>
                 </h2>
                 <div className="flex gap-2 flex-wrap">
                    {customer.segment === 'vip' && <span className="text-[12px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">VIP <X className="h-3 w-3" /></span>}
                    <span className="text-[12px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full flex items-center gap-1">Wholesale <X className="h-3 w-3" /></span>
                    <span className="text-[12px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full flex items-center gap-1">SpringSale <X className="h-3 w-3" /></span>
                 </div>
              </section>
              
              {/* Internal Notes */}
              <section className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-4 flex flex-col gap-2 relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-xl" />
                 <h2 className="text-[13px] font-bold text-amber-900 flex justify-between items-center">
                    Agent Notes
                    <button className="text-amber-700 font-normal text-[12px] hover:underline cursor-pointer">Edit</button>
                 </h2>
                 <p className="text-[12px] text-amber-800 leading-relaxed italic">
                    &quot;Customer previously had issues with sizing. Ensure 30-day return policy is highlighted in further comms.&quot;
                 </p>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
