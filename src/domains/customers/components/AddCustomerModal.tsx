'use client';

import * as React from 'react';
import { X, UserPlus, Globe, Check, AlertCircle, Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCustomerModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Add Customer</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Create a new CRM profile</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all">
              Save Customer
            </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* 1. Overview */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5]">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Customer Overview</h2>
                </div>
                
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                     <div className="flex-1">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">First name</label>
                       <input type="text" placeholder="Jane" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                     <div className="flex-1">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Last name</label>
                       <input type="text" placeholder="Doe" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Email address</label>
                    <input type="email" placeholder="jane.doe@example.com" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Phone number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                  </div>

                  <div className="mt-2 pt-4 border-t border-[#e1e3e5]">
                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3]" defaultChecked />
                        <span className="text-[13px] text-neutral-800">Customer agreed to receive marketing emails.</span>
                     </label>
                     <p className="text-[12px] text-neutral-500 mt-1.5 pl-7">You should only send marketing emails to customers who explicitly agreed to receive them.</p>
                  </div>
                  <div className="mt-1">
                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3]" />
                        <span className="text-[13px] text-neutral-800">Customer agreed to receive SMS marketing messages.</span>
                     </label>
                  </div>
                </div>
              </section>

              {/* 2. Address */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5]">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Default Address</h2>
                </div>
                
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Country/region</label>
                    <select className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none bg-white">
                       <option>United States</option>
                       <option>Canada</option>
                       <option>United Kingdom</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                     <div className="flex-1">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">First name</label>
                       <input type="text" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                     <div className="flex-1">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Last name</label>
                       <input type="text" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Company <span className="text-neutral-400 font-normal">(optional)</span></label>
                    <input type="text" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Address</label>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                       <input type="text" placeholder="Start typing to search..." className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Apartment, suite, etc. <span className="text-neutral-400 font-normal">(optional)</span></label>
                    <input type="text" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                  </div>

                  <div className="flex gap-4">
                     <div className="flex-[2]">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">City</label>
                       <input type="text" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                     <div className="flex-[1]">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">State</label>
                       <select className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none bg-white">
                          <option>Texas</option>
                          <option>California</option>
                          <option>New York</option>
                       </select>
                     </div>
                     <div className="flex-[1]">
                       <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">ZIP code</label>
                       <input type="text" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                     </div>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Notes */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
                 <h2 className="text-[14px] font-semibold text-[#202223]">Notes</h2>
                 <p className="text-[12px] text-neutral-500 mb-1">Add notes about your customer.</p>
                 <textarea 
                   rows={3} 
                   className="w-full p-3 rounded-lg border border-[#c9cccf] text-[13px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none resize-none"
                 />
              </section>
              
              {/* Tags */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
                 <h2 className="text-[14px] font-semibold text-[#202223]">Tags</h2>
                 <input type="text" placeholder="Find or create tags" className="w-full h-8 px-3 rounded-lg border border-[#c9cccf] text-[13px] focus:border-[#005bd3] focus:outline-none bg-neutral-50" />
                 <p className="text-[12px] text-neutral-500">Tags can be used to categorize customers into groups.</p>
              </section>

              {/* Tax Settings */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden flex flex-col">
                 <div className="p-4 border-b border-[#e1e3e5]">
                   <h2 className="text-[14px] font-semibold text-[#202223]">Tax Exemptions</h2>
                 </div>
                 <div className="p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                       <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3]" />
                       <div>
                         <span className="text-[13px] text-neutral-800 font-medium">Collect tax</span>
                         <p className="text-[12px] text-neutral-500 mt-1">If unchecked, taxes will not be charged to this customer's orders.</p>
                       </div>
                    </label>
                 </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
