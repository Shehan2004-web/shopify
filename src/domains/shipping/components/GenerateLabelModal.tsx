'use client';

import * as React from 'react';
import { Search, ArrowRight, Printer, AlertTriangle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateLabelModal = ({ isOpen, onClose }: Props) => {
  const [selectedCarrier, setSelectedCarrier] = React.useState<'usps' | 'ups' | 'fedex' | null>(null);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Generate Label</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Create a reverse shipping label for a return claim</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button 
              className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCarrier}
            >
              Purchase & Print Label
            </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* 1. Claim Lookup */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Associated Claim</h2>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search by Claim ID (e.g. #CLM-8192)..."
                    defaultValue="CLM-8192"
                    className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#c9cccf] text-[14px] text-[#202223] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow"
                  />
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-[#e1e3e5]">
                   <div className="flex justify-between items-start">
                     <div>
                       <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Return Origin (Customer)</p>
                       <p className="text-[13px] font-bold text-neutral-900">David Martinez</p>
                       <p className="text-[12px] text-neutral-600">8829 Tech Parkway<br/>Austin, TX 78701<br/>United States</p>
                     </div>
                     <div className="flex items-center text-neutral-400 px-4">
                        <ArrowRight className="h-5 w-5" />
                     </div>
                     <div className="text-right">
                       <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Destination (Warehouse)</p>
                       <p className="text-[13px] font-bold text-neutral-900">Shofiy Returns Hub</p>
                       <p className="text-[12px] text-neutral-600">100 Logistics Blvd<br/>Columbus, OH 43215<br/>United States</p>
                     </div>
                   </div>
                </div>
              </section>

              {/* 2. Package Details */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5]">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Package Details</h2>
                </div>
                
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex gap-4">
                     <div className="flex-1">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Weight (lbs)</label>
                       <input type="number" defaultValue="2.4" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                     <div className="flex-[2] grid grid-cols-3 gap-3">
                       <div>
                         <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Length (in)</label>
                         <input type="number" defaultValue="14" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                       </div>
                       <div>
                         <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Width (in)</label>
                         <input type="number" defaultValue="10" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                       </div>
                       <div>
                         <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Height (in)</label>
                         <input type="number" defaultValue="4" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                       </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200 mt-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <p className="text-[12px] text-amber-800 font-medium">Dimensional weight calculation applies. Carrier will bill based on 3.2 lbs volumetric weight.</p>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Carrier Rates */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 sticky top-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Carrier Rates</h2>
                  <span className="text-[11px] font-bold text-neutral-400">Negotiated</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label 
                    onClick={() => setSelectedCarrier('usps')}
                    className={cn(
                      "flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      selectedCarrier === 'usps' ? "bg-blue-50/50 border-[#005bd3]" : "bg-white border-[#c9cccf] hover:border-neutral-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={selectedCarrier === 'usps'} readOnly className="mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-neutral-900 flex items-center gap-1.5">USPS Priority Mail</span>
                        <span className="text-[11px] text-neutral-500 mt-0.5">2-3 Business Days</span>
                      </div>
                    </div>
                    <span className="text-[14px] font-bold text-neutral-900">$8.45</span>
                  </label>

                  <label 
                    onClick={() => setSelectedCarrier('ups')}
                    className={cn(
                      "flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      selectedCarrier === 'ups' ? "bg-blue-50/50 border-[#005bd3]" : "bg-white border-[#c9cccf] hover:border-neutral-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={selectedCarrier === 'ups'} readOnly className="mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-neutral-900">UPS Ground</span>
                        <span className="text-[11px] text-neutral-500 mt-0.5">3-5 Business Days</span>
                      </div>
                    </div>
                    <span className="text-[14px] font-bold text-neutral-900">$11.20</span>
                  </label>
                  
                  <label 
                    onClick={() => setSelectedCarrier('fedex')}
                    className={cn(
                      "flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      selectedCarrier === 'fedex' ? "bg-blue-50/50 border-[#005bd3]" : "bg-white border-[#c9cccf] hover:border-neutral-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={selectedCarrier === 'fedex'} readOnly className="mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-neutral-900">FedEx 2Day</span>
                        <span className="text-[11px] text-neutral-500 mt-0.5">2 Business Days</span>
                      </div>
                    </div>
                    <span className="text-[14px] font-bold text-neutral-900">$18.90</span>
                  </label>
                </div>

                <div className="mt-3 pt-4 border-t border-[#e1e3e5] flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Base Rate</span>
                    <span className="font-medium text-neutral-900">
                       {selectedCarrier === 'usps' ? '$8.45' : selectedCarrier === 'ups' ? '$11.20' : selectedCarrier === 'fedex' ? '$18.90' : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Insurance (up to $200)</span>
                    <span className="font-medium text-neutral-900">{selectedCarrier ? '$1.50' : '—'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#e1e3e5]">
                    <span className="text-[14px] font-bold text-neutral-900">Total Charged</span>
                    <span className="text-[18px] font-bold text-neutral-900">
                      {selectedCarrier === 'usps' ? '$9.95' : selectedCarrier === 'ups' ? '$12.70' : selectedCarrier === 'fedex' ? '$20.40' : '$0.00'}
                    </span>
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
