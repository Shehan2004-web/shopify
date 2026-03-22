'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Printer, MapPin } from 'lucide-react';

const propositions = [
  {
    title: 'Instant Store Credit',
    description: 'Get your store credit immediately upon return approval — no waiting for refund processing.',
    icon: CreditCard,
    color: '#5057f5',
    bgColor: '#e8e9fe',
    stat: '< 24 hrs',
    statLabel: 'Credit issued',
  },
  {
    title: 'Easy Label Generation',
    description: 'One-click prepaid shipping labels sent directly to your email — print and drop off.',
    icon: Printer,
    color: '#00b2a9',
    bgColor: '#e6faf9',
    stat: '1-Click',
    statLabel: 'Label ready',
  },
  {
    title: 'Real-time Tracking',
    description: 'Track your return journey from shipment to resolution with live status updates.',
    icon: MapPin,
    color: '#f79009',
    bgColor: '#fffaeb',
    stat: 'Live',
    statLabel: 'Status updates',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const ValuePropositions = () => {
  return (
    <section className="px-4 py-8 md:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3">
          Why Choose Shofiy Returns
        </span>
        <h2 className="text-[26px] md:text-[34px] font-bold text-neutral-900 tracking-tight font-serif">
          Built for Speed & Simplicity
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {propositions.map((prop) => {
          const Icon = prop.icon;
          return (
            <motion.div
              key={prop.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group rounded-3xl bg-white border border-neutral-200/80 p-7 shadow-card hover:shadow-card-xl transition-shadow duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-5">
                <motion.div
                  whileHover={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: prop.bgColor, boxShadow: `0 6px 20px ${prop.color}10` }}
                >
                  <Icon className="h-5 w-5" style={{ color: prop.color }} />
                </motion.div>
                <div className="text-right">
                  <div className="text-[16px] font-mono font-black text-neutral-900">{prop.stat}</div>
                  <div className="text-[9px] text-neutral-400 font-medium">{prop.statLabel}</div>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-neutral-900 mb-2 tracking-tight">
                {prop.title}
              </h3>
              <p className="text-[12px] text-neutral-500 leading-relaxed font-medium">
                {prop.description}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-5 h-1 w-12 rounded-full opacity-30 group-hover:opacity-60 group-hover:w-16 transition-all duration-300"
                style={{ backgroundColor: prop.color }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
