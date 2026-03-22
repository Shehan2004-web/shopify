'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ReturnsPreviewPage() {
  const [orderNumber, setOrderNumber] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800 flex flex-col items-center">
      
      {/* ── Wide Banner Image ── */}
      <div className="w-full h-[400px] md:h-[500px] relative">
         <Image 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2762&auto=format&fit=crop"
            alt="Fashion Banner"
            fill
            className="object-cover object-top"
            priority
         />
      </div>

      {/* ── Content Card (Overlapping) ── */}
      <div className="w-full max-w-[900px] px-0 md:px-6 relative -mt-32 md:-mt-48 mb-20 z-10">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white px-6 py-12 md:p-16 w-full text-center"
         >
            <h1 className="text-[22px] font-bold text-[#5a5953] mb-5 tracking-wide">
               Returns Center
            </h1>
            
            <p className="text-[14px] text-[#6b6a65] leading-[1.6] max-w-3xl mx-auto mb-8 font-medium">
              Returns must be received in original condition - unworn, unwashed with tags 
              attached. Items stained with makeup or tanning products will not be accepted, 
              please take care when trying on your garments. We reserve the right to reject 
              a return if it is not in original condition. For all faulty claims, please contact 
              customercare@example.com directly.
            </p>

            <div className="mb-10">
               <a href="#" className="text-[12px] font-bold text-[#d0bfb9] hover:text-[#bca7a1] transition-colors uppercase tracking-wider">
                  View Full Policy
               </a>
            </div>

            <div className="max-w-[480px] mx-auto space-y-4">
               <div>
                 <input 
                   type="text" 
                   value={orderNumber}
                   onChange={e => setOrderNumber(e.target.value)}
                   placeholder="Order Number"
                   className="w-full h-12 px-4 border border-[#e5e5e5] focus:outline-none focus:border-[#c4c4c4] text-[14px] text-[#5a5953] placeholder:text-[#a3a3a3] transition-colors bg-white rounded-none"
                 />
               </div>
               <div>
                 <input 
                   type="email" 
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="Email"
                   className="w-full h-12 px-4 border border-[#e5e5e5] focus:outline-none focus:border-[#c4c4c4] text-[14px] text-[#5a5953] placeholder:text-[#a3a3a3] transition-colors bg-white rounded-none"
                 />
               </div>
               
               <button className="w-full h-[52px] bg-[#deb9b4] hover:bg-[#d0a59e] text-white font-bold text-[14px] transition-colors rounded-none mt-2">
                  Find Your Order
               </button>
            </div>
         </motion.div>
      </div>

    </div>
  );
}
