'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, ArrowRight, Lock } from 'lucide-react';

export const MockupForm = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 py-8 md:py-14"
    >
      <div className="max-w-md mx-auto">
        {/* Card */}
        <div className="relative rounded-3xl bg-white border border-neutral-200/80 p-8 shadow-card-xl overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#2dd4bf]/8 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#5057f5]/5 blur-2xl" />

          <div className="relative z-10">
            <div className="text-center mb-7">
              <h3 className="text-[20px] font-bold text-neutral-900 tracking-tight font-serif">
                Find Your Order
              </h3>
              <p className="text-[12px] text-neutral-500 font-medium mt-1">
                Enter your details to get started
              </p>
            </div>

            {/* Order Number Input */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-2">
                Order Number
              </label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="#SHO-12345"
                  readOnly
                  className="w-full h-12 rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 text-[14px] font-mono font-semibold text-neutral-400 cursor-default focus:outline-none focus:border-[#00b2a9]/40 focus:ring-4 focus:ring-[#00b2a9]/5 transition-all duration-200 placeholder:text-neutral-300"
                />
              </motion.div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  readOnly
                  className="w-full h-12 rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 text-[14px] font-medium text-neutral-400 cursor-default focus:outline-none focus:border-[#00b2a9]/40 focus:ring-4 focus:ring-[#00b2a9]/5 transition-all duration-200 placeholder:text-neutral-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00b2a9] to-[#2dd4bf] text-white font-bold text-[14px] shadow-lg shadow-[#00b2a9]/20 flex items-center justify-center gap-2 cursor-default transition-all duration-200"
            >
              Look Up Order
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <Lock className="h-3 w-3 text-neutral-400" />
              <span className="text-[10px] text-neutral-400 font-medium">
                Secure & encrypted. We never share your data.
              </span>
            </div>
          </div>
        </div>

        {/* Preview label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
            <span className="h-1 w-1 rounded-full bg-[#f79009]" />
            Conceptual Preview — Not live yet
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};
