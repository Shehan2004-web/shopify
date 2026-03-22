'use client';

import * as React from 'react';
import { X, ArrowLeft, CheckCircle, Clock, Truck, CircleDot, Mail, MapPin, Download, ExternalLink, ShieldCheck, DollarSign, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  order: any | null; // using any to bypass strict type bindings quickly for UI build
  onClose: () => void;
}

export const OrderDetailsModal = ({ order, onClose }: Props) => {
  if (!order) return null;

  const isPaid = order.paymentStatus === 'paid';
  const isFulfilled = order.fulfillmentStatus === 'delivered' || order.fulfillmentStatus === 'dispatched';

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
              <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight leading-none font-mono">#{order.id}</h2>
              <span className="text-[12px] text-neutral-500 mt-0.5">{order.date}</span>
              
              <div className="flex gap-1.5 ml-2">
                 <span className={cn(
                   "px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md flex items-center gap-1",
                   order.paymentStatus === 'paid' ? "bg-emerald-100 text-emerald-800" :
                   order.paymentStatus === 'refunded' ? "bg-neutral-100 text-neutral-700" : "bg-amber-100 text-amber-800"
                 )}>
                   {order.paymentStatus === 'paid' ? <CheckCircle className="h-3 w-3" /> : order.paymentStatus === 'refunded' ? <ArrowLeft className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                   {order.paymentStatus}
                 </span>
                 <span className={cn(
                   "px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md flex items-center gap-1",
                   order.fulfillmentStatus === 'delivered' ? "bg-emerald-100 text-emerald-800" :
                   order.fulfillmentStatus === 'unfulfilled' ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"
                 )}>
                   {order.fulfillmentStatus === 'delivered' ? <CheckCircle className="h-3 w-3" /> : order.fulfillmentStatus === 'unfulfilled' ? <CircleDot className="h-3 w-3" /> : <Truck className="h-3 w-3" />}
                   {order.fulfillmentStatus}
                 </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="h-8 rounded-lg shadow-sm border-[#c9cccf] text-[13px]">
               <Mail className="h-3.5 w-3.5 mr-1.5" /> Contact
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

              {/* 1. Fulfillment Block */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#202223]">
                     {order.fulfillmentStatus === 'unfulfilled' ? <CircleDot className="h-5 w-5 text-amber-500" /> : <CheckCircle className="h-5 w-5 text-emerald-500" />}
                     <h2 className="text-[14px] font-semibold">{order.fulfillmentStatus === 'unfulfilled' ? 'Unfulfilled' : 'Fulfilled'}</h2>
                     <span className="text-[13px] text-neutral-500 ml-1">({order.items.reduce((s: number, i: any) => s + i.quantity, 0)})</span>
                  </div>
                  {order.fulfillmentStatus === 'unfulfilled' && (
                     <Button size="sm" className="h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-[13px]">Fulfill items</Button>
                  )}
                </div>
                
                <div className="p-4 flex flex-col gap-0 divide-y divide-[#e1e3e5]">
                  {order.items.map((item: any, idx: number) => (
                     <div key={idx} className="py-3 flex items-center gap-4 first:pt-0 last:pb-0">
                        <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center p-1 border border-neutral-200 shadow-sm relative">
                          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" alt="Product" className="object-cover rounded-sm mix-blend-multiply opacity-80" />
                          <span className="absolute -top-2 -right-2 bg-neutral-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{item.quantity}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-brand-primary hover:underline cursor-pointer inline-block leading-tight">{item.name}</p>
                          <p className="text-[12px] text-neutral-500 mt-0.5">SKU: {item.sku} • Medium</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-medium text-neutral-900">${item.price.toFixed(2)}</p>
                          <p className="text-[12px] text-neutral-500">x {item.quantity}</p>
                        </div>
                        <div className="w-20 text-right">
                          <p className="text-[14px] font-medium text-neutral-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                     </div>
                  ))}
                </div>
              </section>

              {/* 2. Payment Block */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     {isPaid ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <Clock className="h-5 w-5 text-amber-500" />}
                     <h2 className="text-[14px] font-semibold text-[#202223]">{isPaid ? 'Paid' : 'Payment pending'}</h2>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[13px] text-neutral-700">Subtotal</span>
                     <span className="text-[13px] font-medium text-neutral-900">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[13px] text-neutral-700">Shipping</span>
                     <span className="text-[13px] font-medium text-neutral-900">$12.00</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[13px] text-neutral-700">Tax (<span className="text-neutral-500">State</span>)</span>
                     <span className="text-[13px] font-medium text-neutral-900">$18.40</span>
                  </div>

                  <div className="border-t border-[#e1e3e5] pt-4 mt-2 px-2 flex justify-between items-center bg-neutral-50/50 -mx-4 pb-2 px-6">
                     <span className="text-[14px] font-bold text-neutral-900">Total</span>
                     <span className="text-[16px] font-bold text-neutral-900">${(order.totalAmount + 30.40).toFixed(2)}</span>
                  </div>
                  
                  {isPaid ? (
                     <div className="flex justify-between items-center border-t border-[#e1e3e5] pt-4 px-2">
                        <span className="text-[13px] text-neutral-700">Paid by customer</span>
                        <span className="text-[13px] font-bold text-neutral-900">${(order.totalAmount + 30.40).toFixed(2)}</span>
                     </div>
                  ) : (
                     <div className="bg-[#f9fafb] p-3 rounded-lg border border-[#e1e3e5] flex justify-between items-center mt-2">
                        <span className="text-[13px] text-neutral-700 font-medium">Balance due</span>
                        <span className="text-[18px] font-bold text-amber-600">${(order.totalAmount + 30.40).toFixed(2)}</span>
                     </div>
                  )}
                </div>
                
                {!isPaid && (
                   <div className="bg-[#f9fafb] p-4 border-t border-[#e1e3e5] flex gap-3">
                      <Button size="sm" className="h-8 rounded-lg shadow-sm bg-neutral-900 hover:bg-neutral-800 text-white text-[13px]">Collect payment</Button>
                      <Button variant="outline" size="sm" className="h-8 rounded-lg shadow-sm border-[#c9cccf] text-[13px]">Send invoice</Button>
                   </div>
                )}
              </section>

              {/* 3. Timeline */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Timeline</h2>
                
                <div className="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-[2px] before:bg-neutral-200">
                  
                  <div className="relative flex items-start gap-4 z-10 w-full mb-8">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-neutral-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-neutral-400">
                       <Mail className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium">Order confirmation email sent</p>
                        <p className="text-[12px] text-neutral-500 mt-0.5">Sent to {order.customer.email}</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">Today</span>
                  </div>

                  {isPaid && (
                     <div className="relative flex items-start gap-4 z-10 w-full mb-8">
                        <div className="w-5 h-5 mt-0.5 rounded-full bg-emerald-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-emerald-600">
                           <DollarSign className="h-3 w-3" />
                        </div>
                        <div className="flex-1 -mt-0.5">
                           <p className="text-[13px] text-neutral-900 font-medium">Payment of <span className="font-bold">${(order.totalAmount + 30.40).toFixed(2)}</span> was processed on Visa ending in 4242</p>
                           <p className="text-[12px] text-neutral-500 mt-0.5">Transaction ID: ch_3MqwV0E2... Gateway: Stripe</p>
                        </div>
                        <span className="text-[12px] text-neutral-400">Today</span>
                     </div>
                  )}

                  <div className="relative flex items-start gap-4 z-10 w-full">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-neutral-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-neutral-400">
                       <ShoppingCart className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium">Order placed by {order.customer.name}</p>
                        <p className="text-[12px] text-neutral-500 mt-0.5">Online Store checkout (Web)</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">{order.date}</span>
                  </div>

                </div>
              </section>

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">

              {/* Notes */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
                 <h2 className="text-[14px] font-semibold text-[#202223] flex justify-between items-center">
                    Notes
                    <button className="text-brand-primary font-normal text-[13px] hover:underline cursor-pointer">Edit</button>
                 </h2>
                 <p className="text-[13px] text-neutral-500 italic">No notes from customer</p>
              </section>
              
              {/* Customer */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 sticky top-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Customer</h2>
                  <ChevronRightIcon className="text-neutral-400 h-4 w-4" /> 
                </div>

                <div className="flex flex-col gap-4">
                   <p className="text-[13px] text-brand-primary font-medium hover:underline cursor-pointer">{order.customer.name}</p>
                   <p className="text-[12px] text-neutral-600 block">2 orders</p>
                   
                   <div className="flex flex-col gap-1.5 mt-2">
                      <p className="text-[13px] text-neutral-900 font-semibold flex items-center justify-between">
                         Contact information
                         <button className="text-brand-primary font-normal hover:underline cursor-pointer text-[12px]">Edit</button>
                      </p>
                      <p className="text-[13px] text-brand-primary hover:underline cursor-pointer relative pr-6 break-all">
                         {order.customer.email}
                      </p>
                      <p className="text-[13px] text-neutral-600">+1 415-555-0198</p>
                   </div>

                   <div className="flex flex-col gap-1.5 mt-2">
                      <p className="text-[13px] text-neutral-900 font-semibold flex items-center justify-between">
                         Shipping address
                         <button className="text-brand-primary font-normal hover:underline cursor-pointer text-[12px]">Edit</button>
                      </p>
                      <p className="text-[13px] text-neutral-600 leading-relaxed">
                         {order.customer.name}<br />
                         8829 Tech Parkway<br />
                         Austin, TX 78701<br />
                         United States
                      </p>
                      <a href="#" className="text-[13px] text-brand-primary hover:underline mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> View map</a>
                   </div>
                </div>
              </section>

              {/* Fraud Analysis */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                 <div className="p-4 flex items-center gap-3 bg-emerald-50">
                    <ShieldCheck className="h-6 w-6 text-emerald-600 self-start mt-0.5" />
                    <div>
                       <h2 className="text-[13px] font-bold text-emerald-900">Low risk of fraud</h2>
                       <p className="text-[12px] text-emerald-700 mt-1">Shopify's machine learning models classify this transaction as safe.</p>
                       <button className="text-[12px] text-emerald-800 font-bold hover:underline mt-2">View analysis</button>
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

// simple missing icon mock
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
)
