'use client';

import * as React from 'react';
import { ArrowLeft, Truck, CheckCircle, Package, MapPin, Clock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  shipment: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClose: () => void;
}

export const TrackPackageModal = ({ shipment, onClose }: Props) => {
  if (!shipment) return null;

  const isDelivered = shipment.status === 'delivered';

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
                <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none uppercase font-mono">{shipment.trackingId}</h2>
                <span className={cn(
                  "px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md flex items-center gap-1",
                  shipment.status === 'delivered' ? "bg-green-100 text-green-800" :
                  shipment.status === 'exception' ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                )}>
                  {shipment.status.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md bg-neutral-100 text-neutral-600">
                  {shipment.carrier}
                </span>
              </div>
              <p className="text-[12px] text-neutral-500 mt-1">Origin: {shipment.origin} • Destination: {shipment.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onClose} className="px-5 h-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-[13px] font-semibold shadow-sm transition-all">
               Close View
             </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[63%] flex flex-col gap-6">

              {/* 1. Map Placeholder */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden relative h-64 flex items-center justify-center bg-blue-50/30">
                 {/* Decorative Map BG */}
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                 <div className="absolute top-1/2 left-1/4 h-3 w-3 rounded-full bg-brand-primary shadow-[0_0_0_4px_rgba(0,0,255,0.1)] -translate-y-1/2" />
                 <div className="absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)] -translate-y-1/2" />
                 <svg className="absolute top-1/2 left-1/4 w-1/2 h-2 -translate-y-1/2" preserveAspectRatio="none">
                    <path d="M 0 4 Q 50 -10 100 4" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                 </svg>
                 <div className="absolute right-4 bottom-4 bg-white/90 backdrop-blur border border-neutral-200 px-3 py-1.5 rounded-lg shadow-sm">
                   <p className="text-[11px] font-bold text-neutral-600 flex items-center gap-1.5"><Truck className="h-3 w-3" /> Live GPS Tracking</p>
                 </div>
              </section>

              {/* 2. Routing Timeline */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Routing History</h2>
                
                <div className="relative pl-3 space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-neutral-200">
                  
                  {isDelivered && (
                    <div className="relative flex items-start justify-between">
                       <div className="flex items-start gap-4 z-10 w-full md:w-1/2 md:pr-8 md:justify-end">
                         <div className="text-right hidden md:block mt-0.5">
                           <p className="text-[13px] font-bold text-neutral-900">Delivered</p>
                           <p className="text-[12px] text-neutral-500">Left at front door.</p>
                         </div>
                         <div className="w-5 h-5 rounded-full bg-emerald-500 outline outline-4 outline-white flex items-center justify-center mt-0.5">
                           <CheckCircle className="h-3 w-3 text-white" />
                         </div>
                       </div>
                       <div className="md:hidden ml-4 pb-2 z-10 bg-white">
                           <p className="text-[13px] font-bold text-neutral-900">Delivered</p>
                           <p className="text-[12px] text-neutral-500">Left at front door.</p>
                       </div>
                       <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2 md:pl-0 md:w-1/2 md:text-left md:pl-8 pt-0.5">Yesterday, 2:14 PM</span>
                    </div>
                  )}

                  <div className="relative flex items-start justify-between">
                     <div className="flex items-start gap-4 z-10 w-full md:w-1/2 md:pr-8 md:justify-end">
                       <div className="text-right hidden md:block mt-0.5">
                         <p className="text-[13px] font-bold text-brand-primary">Out for Delivery</p>
                         <p className="text-[12px] text-neutral-500">{shipment.destination}</p>
                       </div>
                       <div className="w-5 h-5 rounded-full bg-brand-primary outline outline-4 outline-white flex items-center justify-center mt-0.5 text-white">
                         <Truck className="h-3 w-3" />
                       </div>
                     </div>
                     <div className="md:hidden ml-4 pb-2 z-10 bg-white">
                         <p className="text-[13px] font-bold text-brand-primary">Out for Delivery</p>
                         <p className="text-[12px] text-neutral-500">{shipment.destination}</p>
                     </div>
                     <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2 md:pl-0 md:w-1/2 md:text-left md:pl-8 pt-0.5">Yesterday, 8:02 AM</span>
                  </div>

                  <div className="relative flex items-start justify-between">
                     <div className="flex items-start gap-4 z-10 w-full md:w-1/2 md:pr-8 md:justify-end">
                       <div className="text-right hidden md:block mt-0.5">
                         <p className="text-[13px] font-bold text-neutral-900">Arrived at Hub</p>
                         <p className="text-[12px] text-neutral-500">Regional Sort Facility, OH</p>
                       </div>
                       <div className="w-5 h-5 rounded-full bg-neutral-400 outline outline-4 outline-white flex items-center justify-center mt-0.5 text-white">
                         <MapPin className="h-3 w-3" />
                       </div>
                     </div>
                     <div className="md:hidden ml-4 pb-2 z-10 bg-white">
                         <p className="text-[13px] font-bold text-neutral-900">Arrived at Hub</p>
                         <p className="text-[12px] text-neutral-500">Regional Sort Facility, OH</p>
                     </div>
                     <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2 md:pl-0 md:w-1/2 md:text-left md:pl-8 pt-0.5">2 days ago, 11:45 PM</span>
                  </div>

                  <div className="relative flex items-start justify-between">
                     <div className="flex items-start gap-4 z-10 w-full md:w-1/2 md:pr-8 md:justify-end">
                       <div className="text-right hidden md:block mt-0.5">
                         <p className="text-[13px] font-bold text-neutral-900">Label Created</p>
                         <p className="text-[12px] text-neutral-500">Carrier notified to pick up.</p>
                       </div>
                       <div className="w-5 h-5 rounded-full bg-neutral-300 outline outline-4 outline-white flex items-center justify-center mt-0.5 text-neutral-600">
                         <Package className="h-3 w-3" />
                       </div>
                     </div>
                     <div className="md:hidden ml-4 pb-2 z-10 bg-white">
                         <p className="text-[13px] font-bold text-neutral-900">Label Created</p>
                         <p className="text-[12px] text-neutral-500">Carrier notified to pick up.</p>
                     </div>
                     <span className="text-[12px] text-neutral-400 font-medium z-10 bg-white pl-2 md:pl-0 md:w-1/2 md:text-left md:pl-8 pt-0.5">3 days ago, 9:20 AM</span>
                  </div>

                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[37%] flex flex-col gap-6">

              {/* Snapshot */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-4 sticky top-6">
                <h2 className="text-[14px] font-semibold text-[#202223] flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-primary" /> Delivery Snapshot
                </h2>
                
                <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Est. Delivery</p>
                      <p className="text-[14px] font-mono font-bold text-neutral-900 mt-0.5">{shipment.eta}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Transit Time</p>
                      <p className="text-[14px] font-mono font-bold text-neutral-900 mt-0.5">4 Days</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Service Type</p>
                      <p className="text-[13px] font-bold text-neutral-900 mt-0.5">{shipment.carrier} Ground</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Weight</p>
                      <p className="text-[14px] font-mono font-bold text-neutral-900 mt-0.5">{shipment.weight}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-[#e1e3e5]">
                   <p className="text-[12px] font-semibold text-neutral-900">Customer Support Context</p>
                   <p className="text-[12px] text-neutral-600 leading-relaxed">
                     The shipment is proceeding on schedule. No exceptions reported. Expected to arrive within the origin SLA.
                   </p>
                </div>
              </section>

              {/* Customer Contact */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
                <h2 className="text-[14px] font-semibold text-[#202223] flex items-center justify-between">
                  Customer Profile
                  <button className="text-[13px] text-brand-primary hover:underline font-medium">Message</button>
                </h2>
                
                <div className="flex items-center gap-3 border-b border-[#e1e3e5] pb-4">
                   <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[14px] font-bold flex-shrink-0">
                    {shipment.customer.name.split(' ').map((n: string) => n[0]).join('')}
                   </div>
                   <div className="min-w-0">
                     <p className="text-[13px] font-bold text-[#005bd3] hover:underline cursor-pointer truncate">{shipment.customer.name}</p>
                     <p className="text-[12px] font-medium text-neutral-500 mt-0.5 truncate">{shipment.customer.email}</p>
                   </div>
                </div>
                
                <div className="flex items-center justify-between">
                   <Button variant="outline" size="sm" className="w-full text-[12px] h-8">View Associated Claim</Button>
                </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
