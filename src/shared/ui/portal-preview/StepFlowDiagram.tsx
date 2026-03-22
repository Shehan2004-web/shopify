'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Identify Order',
    description: 'Enter your order number and email address to locate your purchase.',
    icon: Search,
    color: '#5057f5',
    bgColor: '#e8e9fe',
  },
  {
    number: '02',
    title: 'Select Items',
    description: 'Choose which items you want to return and select a reason.',
    icon: ShoppingBag,
    color: '#00b2a9',
    bgColor: '#e6faf9',
  },
  {
    number: '03',
    title: 'Choose Resolution',
    description: 'Pick refund, exchange, or store credit — and get your shipping label.',
    icon: CheckCircle,
    color: '#12b76a',
    bgColor: '#ecfdf3',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const StepFlowDiagram = () => {
  return (
    <section className="px-4 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">
          How it works
        </span>
        <h2 className="text-[26px] md:text-[34px] font-bold text-neutral-900 tracking-tight font-serif">
          Three Simple Steps
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative"
      >
        {/* Connector lines (desktop only) */}
        <div className="hidden md:block absolute top-[72px] left-[calc(33.33%-12px)] right-[calc(33.33%-12px)] h-[2px]">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-full bg-gradient-to-r from-[#5057f5]/20 via-[#00b2a9]/20 to-[#12b76a]/20 origin-left"
          />
        </div>

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-card hover:shadow-card-xl transition-shadow duration-300"
            >
              {/* Step circle */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative mb-5"
              >
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300"
                  style={{ backgroundColor: step.bgColor, boxShadow: `0 8px 25px ${step.color}15` }}
                >
                  <Icon className="h-7 w-7" style={{ color: step.color }} />
                </div>
                <div
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
              </motion.div>

              <h3 className="text-[18px] font-bold text-neutral-900 mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed font-medium">
                {step.description}
              </p>

              {/* Arrow connector on mobile */}
              {idx < steps.length - 1 && (
                <div className="md:hidden mt-4 text-neutral-300">
                  <ArrowRight className="h-5 w-5 rotate-90" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
