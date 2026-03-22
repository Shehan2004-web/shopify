'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Package, ArrowRight, CheckCircle, 
  ArrowLeftRight, Star, RefreshCw, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

/* ── Constants & Visual Tokens ─────────────────── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const Navbar = () => (
  <nav className="relative z-50 bg-white border-b border-neutral-100 h-20">
    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 group">
           <div className="h-10 w-10 rounded-xl bg-neutral-900 flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
           </div>
           <span className="text-[22px] font-bold tracking-tight text-neutral-900">
             WdataClarity
           </span>
        </div>
        <div className="hidden md:flex items-center gap-8 ml-8">
           {['Features', 'How it Works', 'Pricing', 'Resources'].map(item => (
             <button key={item} className="text-[14px] font-semibold text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wider">{item}</button>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[14px] font-semibold text-neutral-600 hover:text-neutral-900 hidden sm:block">Sign In</button>
        <Link href="/login" className="h-11 px-6 rounded-full bg-neutral-900 text-white font-bold text-[14px] hover:bg-neutral-800 transition-all flex items-center gap-2 group shadow-lg shadow-neutral-900/10">
          Sign Up 
          <span className="flex items-center justify-start group-hover:translate-x-1 transition-transform">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  </nav>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-hidden font-sans">
      <Navbar />
      
      <main className="relative flex items-center pt-4 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-12">
            
            {/* ── Left Content ────── */}
            <div className="flex-[1.1] space-y-4 max-w-[580px]">
               <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 shadow-sm"
               >
                 <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ArrowLeftRight className="h-3.5 w-3.5 text-neutral-500" />
                 </motion.span>
                 <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Reduce response time by 85%</span>
               </motion.div>

               <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1, ease }}
                className="text-[48px] md:text-[64px] font-[900] tracking-tighter leading-[0.95]"
               >
                 The easiest way to <br/>
                 understand your <br/>
                 <span className="text-neutral-400">data</span>
               </motion.h1>

               <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease }}
                className="text-[17px] md:text-[18px] text-neutral-500 font-medium leading-relaxed"
               >
                 Find key clauses, extract data, and collaborate effortlessly. workflow with enterprise-grade AI that understands context and delivers
               </motion.p>

               {/* Value Prop Checkmarks */}
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 py-2"
               >
                  <div className="flex items-center gap-2 text-neutral-800">
                    <CheckCircle className="h-4 w-4 text-neutral-900" />
                    <span className="text-[13px] font-bold">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-800">
                    <CheckCircle className="h-4 w-4 text-neutral-900" />
                    <span className="text-[13px] font-bold">Free forever plan</span>
                  </div>
               </motion.div>

               {/* CTAs */}
               <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-2"
               >
                  <Link 
                    href="/login"
                    className="w-full sm:w-auto h-[56px] px-8 rounded-full bg-neutral-900 text-white font-bold text-[15px] hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] border-transparent"
                  >
                    Start Free Trial 
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button className="w-full sm:w-auto h-[56px] px-8 rounded-full border border-neutral-200 text-[15px] font-bold text-neutral-800 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 bg-white hover:border-neutral-300">
                     Book A Demo <ArrowRight className="h-4 w-4 text-neutral-400" />
                  </button>
               </motion.div>

               {/* Stats Footer (Bottom Left) */}
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-10 border-neutral-100 max-w-lg"
               >
                  {[
                    { val: '14+', label: 'Reduce analysis time' },
                    { val: '84%', label: 'Increase decision speed' },
                    { val: '48%', label: 'Average savings' },
                  ].map(stat => (
                    <div key={stat.label}>
                       <div className="text-[36px] font-black tracking-tighter text-neutral-900 leading-none mb-3">{stat.val}</div>
                       <div className="text-neutral-400 text-[10px] font-extrabold uppercase tracking-widest leading-tight w-2/3">{stat.label}</div>
                    </div>
                  ))}
               </motion.div>
            </div>

            {/* ── Right Content (Professional Imagery) ──── */}
            <div className="flex-1 relative w-full mt-16 lg:mt-0 flex justify-end">
               
               {/* Abstract decorative SVG vector */}
               <div className="absolute inset-0 -left-20 top-10 pointer-events-none z-0 flex items-center justify-center">
                 <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 scale-125">
                   <path d="M50 200C50 100 150 50 250 150C350 250 300 350 200 350C100 350 50 300 50 200Z" stroke="#84CC16" strokeWidth="1" strokeDasharray="4 4"/>
                   <path d="M100 200C100 150 150 100 200 150C250 200 250 250 200 250C150 250 100 250 100 200Z" stroke="#FBBF24" strokeWidth="1" strokeDasharray="4 4"/>
                   <circle cx="250" cy="150" r="4" fill="#84CC16" />
                   <circle cx="200" cy="350" r="4" fill="#FBBF24" />
                   <circle cx="100" cy="350" r="4" fill="#FBBF24" />
                 </svg>
               </div>

               <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 1.5, ease }}
                className="relative z-10 w-full max-w-[820px] aspect-[4/3] rounded-[48px] overflow-hidden bg-neutral-50"
               >
                 <Image 
                    src="/hero.png" 
                    alt="Analyze Data" 
                    fill 
                    priority
                    className="object-cover"
                 />
               </motion.div>

            </div>

          </div>
        </div>
      </main>

      {/* ── Logo Marquee ── */}
      <section className="border-y border-neutral-100 bg-neutral-50/50 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
           <p className="text-center text-[12px] font-extrabold text-neutral-400 uppercase tracking-widest">Trusted by innovative teams worldwide</p>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden items-center group relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div 
            className="flex items-center gap-16 md:gap-24 px-8 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
             {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 md:gap-24">
                  {['ACME Corp', 'Quantum', 'Echo Valley', 'Nebula', 'Velocity', 'Pinnacle'].map((logo, j) => (
                     <div key={`${i}-${j}`} className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 shadow-sm" />
                        <span className="text-xl font-black tracking-tight text-neutral-800">{logo}</span>
                     </div>
                  ))}
                </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features Bento Grid ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-[36px] md:text-[48px] font-black tracking-tighter leading-tight mb-5"
            >
              Powerful features to scale <br/> your operations.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 text-[18px] font-medium"
            >
              Everything you need to manage complex workflows, analyze data, and accelerate your time to market.
            </motion.p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main large block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-2 bg-neutral-50 rounded-[40px] p-10 border border-neutral-100 relative overflow-hidden group hover:shadow-lg transition-shadow"
            >
               <div className="relative z-10 max-w-sm">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                     <Star className="h-6 w-6 text-neutral-900" />
                  </div>
                  <h3 className="text-[26px] font-black mb-3">AI-Powered Analytics</h3>
                  <p className="text-neutral-500 font-medium leading-relaxed">Instantly discover trends and anomalies across your entire organization with enterprise-grade models.</p>
               </div>
               
               <div className="absolute right-[-10%] bottom-[-20%] w-[60%] h-[120%] bg-gradient-to-tl from-indigo-200/50 to-transparent rounded-[60px] transform rotate-12 group-hover:rotate-6 transition-transform duration-700 pointer-events-none" />
            </motion.div>

            {/* Small block 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-50 rounded-[40px] p-10 border border-neutral-100 relative overflow-hidden hover:shadow-lg transition-shadow"
            >
               <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  <RefreshCw className="h-6 w-6 text-neutral-900" />
               </div>
               <h3 className="text-[20px] font-black mb-3">Automated Workflows</h3>
               <p className="text-neutral-500 font-medium text-[15px] leading-relaxed">Create visual rule engines to trigger actions without code.</p>
            </motion.div>

            {/* Small block 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-50 rounded-[40px] p-10 border border-neutral-100 relative overflow-hidden hover:shadow-lg transition-shadow"
            >
               <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-neutral-900" />
               </div>
               <h3 className="text-[20px] font-black mb-3">Bank-Grade Security</h3>
               <p className="text-neutral-500 font-medium text-[15px] leading-relaxed">SOC2 Type II, GDPR compliant protocols built into the core.</p>
            </motion.div>

            {/* Wide block underneath */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-neutral-900 text-white rounded-[40px] p-10 relative overflow-hidden hover:shadow-xl shadow-neutral-900/20 transition-all group"
            >
               <div className="relative z-10 max-w-md">
                  <h3 className="text-[28px] font-black mb-3">Integrates with everything.</h3>
                  <p className="text-neutral-400 font-medium mb-8 leading-relaxed">Connect your existing tech stack in seconds. Over 200+ native integrations available.</p>
                  <button className="h-12 px-6 rounded-full border border-neutral-700 bg-transparent text-white font-bold hover:bg-white hover:text-neutral-900 transition-colors">
                     View App Directory
                  </button>
               </div>
               
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\' fill=\'%23ffffff\' fill-opacity=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }} />
            </motion.div>
         </div>
      </section>

      {/* ── "How it Works" Sticky Scroll ── */}
      <section className="bg-neutral-50/50 py-32 mt-10 border-t border-neutral-100">
         <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex flex-col lg:flex-row gap-20">
               
               {/* Left Sticky Content */}
               <div className="lg:w-1/3">
                  <div className="sticky top-32">
                     <motion.h2 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       className="text-[36px] md:text-[48px] font-black tracking-tighter leading-[1.05] mb-6"
                     >
                       Built for speed. <br/> Designed for scale.
                     </motion.h2>
                     <motion.p 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ delay: 0.1 }}
                       className="text-neutral-500 font-medium text-[18px] mb-12 leading-relaxed"
                     >
                       Our intelligent pipeline processes requests 10x faster than legacy systems, entirely without engineering effort.
                     </motion.p>
                     
                     <div className="space-y-8">
                        {['1. Connect your platform via API', '2. Define custom routing rules', '3. Let the AI agent do the heavy lifting'].map((step, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ opacity: 0, x: -20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true, margin: "-100px" }}
                             transition={{ delay: 0.2 + (i * 0.1) }}
                             className="flex gap-5 items-center group cursor-default"
                           >
                              <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-[14px] shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                                 {i + 1}
                              </div>
                              <span className="font-bold text-[16px] text-neutral-600 group-hover:text-neutral-900 transition-colors">{step}</span>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right Scrolling Visuals */}
               <div className="lg:w-2/3 space-y-24">
                  {[1, 2, 3].map((item, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 50, scale: 0.95 }}
                       whileInView={{ opacity: 1, y: 0, scale: 1 }}
                       viewport={{ once: true, margin: "-20%" }}
                       transition={{ duration: 0.6, ease }}
                       className="bg-white rounded-[48px] p-6 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-neutral-100"
                     >
                        <div className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-[32px] bg-neutral-50 border border-neutral-100 overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
                           {/* Decorative Dashboard mock UI inside */}
                           <div className="absolute top-4 left-4 right-4 h-12 border-b border-neutral-200 flex items-center gap-2 px-5 bg-white rounded-t-2xl shadow-sm">
                              <div className="flex gap-2">
                                 <div className="h-3 w-3 rounded-full bg-red-400" />
                                 <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                 <div className="h-3 w-3 rounded-full bg-green-400" />
                              </div>
                           </div>
                           <div className="absolute top-24 left-8 right-8 h-40 bg-white rounded-2xl shadow-lg shadow-neutral-900/5 border border-neutral-100 p-6">
                              <div className="h-5 w-1/3 bg-neutral-100 rounded-lg mb-6" />
                              <div className="space-y-4">
                                 <div className="h-3 w-full bg-neutral-50 rounded-full" />
                                 <div className="h-3 w-5/6 bg-neutral-50 rounded-full" />
                                 <div className="h-3 w-4/6 bg-neutral-50 rounded-full" />
                              </div>
                           </div>
                           
                           <div className="absolute inset-0 bg-neutral-900/0 hover:bg-neutral-900/5 transition-colors cursor-pointer" />
                        </div>
                     </motion.div>
                  ))}
               </div>

            </div>
         </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-neutral-900 text-white pt-48 pb-10 text-center relative overflow-hidden">
         <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full mix-blend-screen" />
         </div>
         <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center mb-32">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="h-20 w-20 rounded-3xl bg-white shadow-2xl flex items-center justify-center mb-10 text-neutral-900"
            >
               <Package className="h-10 w-10" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[56px] md:text-[80px] font-black tracking-tighter leading-[1.0] mb-8"
            >
              Ready to transform <br/> your workflow?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 text-[18px] md:text-[22px] font-medium max-w-2xl mx-auto mb-12"
            >
              Join 10,000+ modern teams already using WdataClarity to save time and extract deep insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
               <Link href="/login" className="flex items-center justify-center h-[64px] px-12 text-[18px] font-black rounded-full bg-white text-neutral-900 hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.15)]">
                  Start Your Free Trial
               </Link>
            </motion.div>
         </div>
         
         {/* Footer Links */}
         <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[12px] font-extrabold text-neutral-500 uppercase tracking-widest relative z-10 pt-10 border-t border-neutral-800">
            <span>© 2026 WdataClarity Logistics</span>
            <div className="flex gap-8 mt-6 sm:mt-0">
               <button className="hover:text-white transition-colors">Privacy</button>
               <button className="hover:text-white transition-colors">Terms of Service</button>
               <button className="hover:text-white transition-colors">Contact Support</button>
            </div>
         </div>
      </section>

    </div>
  );
}
