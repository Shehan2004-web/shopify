'use client';

import * as React from 'react';
import { X, Search, ChevronDown, Banknote, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRefundModal = ({ isOpen, onClose }: Props) => {
  const [refundQuantity, setRefundQuantity] = React.useState(1);
  const [shippingRefund, setShippingRefund] = React.useState('0.00');
  
  if (!isOpen) return null;

  const itemPrice = 120.00;
  const subtotal = itemPrice * refundQuantity;
  const shipping = parseFloat(shippingRefund) || 0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Create Refund</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Select items to refund from order</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button 
              className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all"
            >
              Refund ${total.toFixed(2)}
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
                  <h2 className="text-[14px] font-semibold text-[#202223]">Order Details</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[12px] font-semibold rounded-md border border-neutral-200">#ORD-4921</span>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search orders or customers..."
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
                    <p className="text-[12px] text-neutral-500 truncate">alice@mail.com • 3 orders</p>
                  </div>
                  <button className="text-[13px] text-[#005bd3] font-medium hover:underline">View customer</button>
                </div>
              </section>

              {/* 2. Unfulfilled / Fulfilled Items Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Fulfilled items</h2>
                  <span className="text-[12px] text-neutral-500">1 item available</span>
                </div>
                
                <div className="p-4 border-b border-[#e1e3e5] flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                  <div className="h-14 w-14 rounded-lg bg-neutral-100 flex items-center justify-center border border-neutral-200 flex-shrink-0 text-2xl shadow-sm">
                    🧥
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1 pt-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] font-bold text-neutral-900 text-brand-primary hover:underline cursor-pointer">Urban Jacket Pro</p>
                      <p className="text-[13px] font-medium text-neutral-900">${itemPrice.toFixed(2)}</p>
                    </div>
                    <p className="text-[12px] text-neutral-500">SKU: UJP-001 • Size: M • Color: Camel</p>
                    <p className="text-[12px] text-neutral-500">1 fulfilled at Sri Lanka HQ</p>
                  </div>
                </div>

                <div className="p-4 bg-[#f4f6f8] flex items-center justify-between">
                  <span className="text-[13px] text-neutral-700 font-medium">Refund quantity</span>
                  <div className="flex items-center border border-[#c9cccf] rounded-lg bg-white overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setRefundQuantity(Math.max(0, refundQuantity - 1))}
                      className="px-3 h-8 text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100 font-bold border-r border-[#c9cccf]"
                    >
                      -
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center text-[13px] font-bold text-neutral-900 bg-white">
                      {refundQuantity}
                    </div>
                    <button 
                      onClick={() => setRefundQuantity(Math.min(1, refundQuantity + 1))}
                      className="px-3 h-8 text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100 font-bold border-l border-[#c9cccf]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </section>

              {/* 3. Return Reason */}
              {refundQuantity > 0 && (
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
                  
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-[13px] font-medium text-[#202223]">Return note (optional)</label>
                    <textarea 
                      placeholder="Add an internal note or context about this refund..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow resize-none"
                    />
                  </div>
                </section>
              )}

            </div>

            {/* ── Right Column (Narrow) ───────────────────── */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Summary Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4 sticky top-6">
                <h2 className="text-[14px] font-semibold text-[#202223]">Summary</h2>
                
                <div className="flex flex-col gap-2.5 border-b border-[#e1e3e5] pb-4">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Refund items</span>
                    <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-neutral-600">Taxes</span>
                    <span className="font-medium text-neutral-900">$0.00</span>
                  </div>
                </div>

                {/* Shipping Refund Input */}
                <div className="flex flex-col gap-2 pb-4 border-b border-[#e1e3e5]">
                  <div className="flex justify-between items-center text-[13px]">
                    <label className="font-medium text-[#202223]">Refund shipping</label>
                    <span className="text-neutral-500">(Max $15.00)</span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-neutral-500">$</div>
                    <input 
                      type="number" 
                      value={shippingRefund}
                      onChange={e => setShippingRefund(e.target.value)}
                      className="w-full h-9 pl-6 pr-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow text-right"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[14px] font-bold text-neutral-900">Refund total</span>
                  <span className="text-[18px] font-bold text-neutral-900">${total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-[12px] font-medium leading-snug tracking-tight">An email notification will be sent to the customer once this refund is processed.</span>
                </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
