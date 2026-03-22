'use client';

import * as React from 'react';
import { X, Search, Package, ArrowRight, Printer, CheckCircle, Clock, Truck, CircleDot, AlertCircle, ShoppingCart, DollarSign, Mail, MapPin } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrderModal = ({ isOpen, onClose }: Props) => {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string | null>('Olivia Rhye');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Create order</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Draft a custom order or invoice</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all">
              Collect payment
            </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

            {/* ── Left Column (Wide) ────────────────────── */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* 1. Products Block */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] flex flex-col">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Products</h2>
                  <Button variant="ghost" size="sm" className="text-brand-primary text-[13px] font-medium h-8 hover:bg-brand-primary/10">Browse custom products</Button>
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder="Search products..."
                      className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#c9cccf] text-[14px] text-[#202223] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow"
                    />
                  </div>

                  {/* Mock Product Items in Cart */}
                  <div className="border border-[#c9cccf] rounded-lg mt-2 divide-y divide-[#e1e3e5]">
                     <div className="p-3 flex items-center justify-between hover:bg-neutral-50">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center p-1 border border-neutral-200">
                             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" alt="Product" className="object-cover rounded-sm mix-blend-multiply" />
                           </div>
                           <div>
                             <p className="text-[13px] font-bold text-neutral-900 border-b border-transparent hover:border-neutral-900 cursor-pointer inline-block leading-tight">Nike Air Max 270</p>
                             <p className="text-[12px] text-neutral-500 mt-0.5">Medium • White/Black</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center border border-[#c9cccf] rounded-md overflow-hidden bg-white">
                             <button className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">-</button>
                             <input type="text" value="1" readOnly className="w-8 h-7 text-center text-[13px] font-medium border-x border-[#c9cccf] outline-none" />
                             <button className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">+</button>
                           </div>
                           <span className="text-[13px] font-semibold text-neutral-900 w-16 text-right">$150.00</span>
                           <button className="text-neutral-400 hover:text-red-600"><X className="h-4 w-4" /></button>
                        </div>
                     </div>

                     <div className="p-3 flex items-center justify-between hover:bg-neutral-50">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center p-1 border border-neutral-200">
                             <img src="https://images.unsplash.com/photo-1572635196237-14b3f281501f?w=100&q=80" alt="Product" className="object-cover rounded-sm mix-blend-multiply" />
                           </div>
                           <div>
                             <p className="text-[13px] font-bold text-neutral-900 border-b border-transparent hover:border-neutral-900 cursor-pointer inline-block leading-tight">Essential Crewneck</p>
                             <p className="text-[12px] text-neutral-500 mt-0.5">Large • Heather Grey</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center border border-[#c9cccf] rounded-md overflow-hidden bg-white">
                             <button className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">-</button>
                             <input type="text" value="2" readOnly className="w-8 h-7 text-center text-[13px] font-medium border-x border-[#c9cccf] outline-none" />
                             <button className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">+</button>
                           </div>
                           <span className="text-[13px] font-semibold text-neutral-900 w-16 text-right">$110.00</span>
                           <button className="text-neutral-400 hover:text-red-600"><X className="h-4 w-4" /></button>
                        </div>
                     </div>
                  </div>
                </div>
              </section>

              {/* 2. Payment Block */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5]">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Payment</h2>
                  <p className="text-[12px] text-neutral-500 mt-0.5">Add a discount or custom shipping fee</p>
                </div>
                
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[13px] text-neutral-700">Subtotal</span>
                     <span className="text-[13px] font-medium text-neutral-900">2 items</span>
                     <span className="text-[13px] font-medium text-neutral-900">$260.00</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                     <button className="text-[13px] text-brand-primary font-medium hover:underline">Add discount</button>
                     <span className="text-[13px] text-neutral-900">—</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                     <button className="text-[13px] text-brand-primary font-medium hover:underline">Add shipping</button>
                     <span className="text-[13px] text-neutral-900">—</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                     <button className="text-[13px] text-brand-primary font-medium hover:underline flex items-center gap-1">Estimated tax <AlertCircle className="h-3 w-3" /></button>
                     <span className="text-[13px] text-neutral-900">Calculated</span>
                  </div>

                  <div className="border-t border-[#e1e3e5] pt-4 mt-2 px-2 flex justify-between items-center">
                     <span className="text-[14px] font-bold text-neutral-900">Total</span>
                     <span className="text-[18px] font-bold text-neutral-900">$260.00</span>
                  </div>
                </div>
                
                <div className="bg-[#f9fafb] p-4 border-t border-[#e1e3e5] flex justify-end gap-3">
                   <Button variant="outline" size="sm" className="h-8 rounded-lg shadow-sm border-[#c9cccf] text-[13px]">Send invoice</Button>
                   <Button size="sm" className="h-8 rounded-lg shadow-sm bg-neutral-900 hover:bg-neutral-800 text-white text-[13px]">Mark as paid</Button>
                </div>
              </section>

              {/* 3. Timeline (Draft Phase) */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-4">
                 <h2 className="text-[14px] font-semibold text-[#202223]">Timeline</h2>
                 <div className="relative pl-3 space-y-4 before:absolute before:inset-0 before:ml-5 before:h-full before:w-[2px] before:bg-neutral-200">
                    <div className="relative flex items-center gap-4 z-10 w-full">
                       <div className="w-5 h-5 rounded-full bg-neutral-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-neutral-400">
                         <CircleDot className="h-3 w-3" />
                       </div>
                       <p className="text-[13px] text-neutral-600">Draft created by <span className="font-medium text-neutral-900">Jason Reed</span></p>
                       <span className="ml-auto text-[12px] text-neutral-400">Just now</span>
                    </div>
                 </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Customer */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 sticky top-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Customer</h2>
                  <button onClick={() => setSelectedCustomer(null)} className="text-[34px] p-1 -mr-1 -mt-2 text-neutral-400 font-light hover:text-neutral-600">&times;</button>
                </div>

                {!selectedCustomer ? (
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                     <input 
                       type="text" 
                       placeholder="Find or create a customer"
                       className="w-full h-8 pl-8 pr-3 rounded-md border border-[#c9cccf] text-[13px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow bg-neutral-50"
                     />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                     <p className="text-[13px] text-brand-primary font-medium hover:underline cursor-pointer">{selectedCustomer}</p>
                     
                     <div className="flex flex-col gap-1.5">
                        <p className="text-[13px] text-neutral-900 font-semibold flex items-center justify-between">
                           Contact information
                           <button className="text-brand-primary font-normal hover:underline cursor-pointer">Edit</button>
                        </p>
                        <p className="text-[13px] text-brand-primary hover:underline cursor-pointer">olivia@rhye.com</p>
                        <p className="text-[13px] text-neutral-600">+1 415-555-0198</p>
                     </div>

                     <div className="flex flex-col gap-1.5 mt-2">
                        <p className="text-[13px] text-neutral-900 font-semibold flex items-center justify-between">
                           Shipping address
                           <button className="text-brand-primary font-normal hover:underline cursor-pointer">Edit</button>
                        </p>
                        <p className="text-[13px] text-neutral-600 leading-relaxed">
                           Olivia Rhye<br />
                           8829 Tech Parkway<br />
                           Apt 4B<br />
                           Austin, TX 78701<br />
                           United States
                        </p>
                     </div>

                     <div className="flex flex-col gap-1.5 mt-2">
                        <p className="text-[13px] text-neutral-900 font-semibold flex items-center justify-between">
                           Billing address
                           <button className="text-brand-primary font-normal hover:underline cursor-pointer">Edit</button>
                        </p>
                        <p className="text-[13px] text-neutral-500 italic">Same as shipping address</p>
                     </div>
                  </div>
                )}
              </section>

              {/* Tags */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
                 <h2 className="text-[14px] font-semibold text-[#202223]">Tags</h2>
                 <input type="text" placeholder="Find or create tags" className="w-full h-8 px-3 rounded-md border border-[#c9cccf] text-[13px] focus:border-[#005bd3] focus:outline-none bg-neutral-50" />
                 <div className="flex gap-2">
                    <span className="text-[12px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full flex items-center gap-1">VIP <X className="h-3 w-3" /></span>
                    <span className="text-[12px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full flex items-center gap-1">Wholesale <X className="h-3 w-3" /></span>
                 </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
