'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export const PortalHero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center pt-12 pb-8 md:pt-20 md:pb-14 px-4"
    >
      {/* Logo placeholder */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-2xl bg-[#0c2e2e] shadow-xl shadow-[#0c2e2e]/15"
      >
        <div className="h-7 w-7 rounded-lg bg-[#2dd4bf] flex items-center justify-center">
          <Package className="h-4 w-4 text-[#0c2e2e]" />
        </div>
        <span className="text-[15px] font-bold text-white tracking-tight">
          <span className="text-[#2dd4bf]">Shofiy</span> Returns
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-[36px] md:text-[52px] font-black text-neutral-900 tracking-tight leading-[1.1] max-w-2xl mx-auto font-serif"
      >
        Initiate Your{' '}
        <span className="bg-gradient-to-r from-[#00b2a9] to-[#2dd4bf] bg-clip-text text-transparent">
          Return or Exchange
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-5 text-[15px] md:text-[17px] text-neutral-500 font-medium max-w-lg mx-auto leading-relaxed"
      >
        Hassle-free returns in 3 simple steps. Get your refund, exchange, or store credit instantly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-7"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ecfdf3] text-[#12b76a] text-[12px] font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a] animate-pulse" />
          Average processing time: 1.8 days
        </span>
      </motion.div>
    </motion.section>
  );
};
