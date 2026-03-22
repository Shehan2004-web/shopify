'use client';

import * as React from 'react';
import { X, Settings, Palette, Mail, Globe, Image as ImageIcon, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalEmailSettingsModal = ({ isOpen, onClose }: Props) => {
  const [activeTab, setActiveTab] = React.useState<'sender' | 'branding'>('sender');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#f4f6f8] rounded-[32px] shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden max-h-[85vh]">
        <header className="p-6 bg-white border-b border-neutral-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-[#0c2e2e] flex items-center justify-center text-white shadow-lg">
                <Settings className="h-5 w-5" />
             </div>
             <div>
                <h2 className="text-[18px] font-bold text-neutral-900 leading-none tracking-tight">Email System Settings</h2>
                <div className="flex items-center gap-2 mt-1.5">
                   <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">Channel Configuration</span>
                   <div className="h-1 w-1 bg-neutral-200 rounded-full" />
                   <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Online</span>
                </div>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-neutral-100 transition-all">
            <X className="h-5 w-5 text-neutral-400" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-12">
           <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-neutral-100 shadow-sm w-fit mb-8 mx-auto">
              <button 
                onClick={() => setActiveTab('sender')}
                className={cn(
                  "px-6 py-2 rounded-xl text-[12px] font-bold transition-all",
                  activeTab === 'sender' ? "bg-[#0c2e2e] text-white shadow-md shadow-neutral-900/10" : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                Sender Profile
              </button>
              <button 
                onClick={() => setActiveTab('branding')}
                className={cn(
                  "px-6 py-2 rounded-xl text-[12px] font-bold transition-all",
                  activeTab === 'branding' ? "bg-[#0c2e2e] text-white shadow-md shadow-neutral-900/10" : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                Global Branding
              </button>
           </div>

           <div className="max-w-[500px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {activeTab === 'sender' ? (
                <>
                   <section className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm space-y-5">
                      <div className="flex items-center gap-2 mb-2">
                         <Mail className="h-4 w-4 text-neutral-400" />
                         <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">Sender Credentials</h3>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">From Name</label>
                            <input type="text" defaultValue="Shopify Support" className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50/30 text-[14px] font-medium focus:bg-white focus:border-brand-primary outline-none transition-all" />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">From Email</label>
                            <input type="email" defaultValue="support@yourstore.com" className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50/30 text-[14px] font-medium focus:bg-white focus:border-brand-primary outline-none transition-all" />
                         </div>
                      </div>
                   </section>

                   <section className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm space-y-5">
                      <div className="flex items-center gap-2 mb-2">
                         <Globe className="h-4 w-4 text-neutral-400" />
                         <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">Domain Authentication</h3>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                         <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                            <Check className="h-3 w-3" />
                         </div>
                         <div>
                            <p className="text-[13px] font-bold text-emerald-900">Domain Verified</p>
                            <p className="text-[11px] text-emerald-700/70 mt-0.5">DKIM and SPF records are correctly configured on your DNS.</p>
                         </div>
                      </div>
                   </section>
                </>
              ) : (
                <>
                   <section className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm space-y-5">
                      <div className="flex items-center gap-2 mb-2">
                         <Palette className="h-4 w-4 text-neutral-400" />
                         <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">Primary Theme</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Brand Color</label>
                            <div className="flex gap-2">
                               <div className="h-11 w-11 rounded-xl bg-[#0c2e2e] border border-black/10 shrink-0 select-none" />
                               <input type="text" defaultValue="#0C2E2E" className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50/30 text-[14px] font-mono focus:bg-white outline-none" />
                            </div>
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Accent Color</label>
                            <div className="flex gap-2">
                               <div className="h-11 w-11 rounded-xl bg-[#12b76a] border border-black/10 shrink-0 select-none" />
                               <input type="text" defaultValue="#12B76A" className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50/30 text-[14px] font-mono focus:bg-white outline-none" />
                            </div>
                         </div>
                      </div>
                   </section>

                   <section className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm space-y-5">
                      <div className="flex items-center gap-2 mb-2">
                         <ImageIcon className="h-4 w-4 text-neutral-400" />
                         <h3 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">Email Logo</h3>
                      </div>
                      <div className="p-8 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-neutral-50 hover:border-brand-primary/30 transition-all">
                         <div className="h-12 w-32 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 text-[10px] font-black uppercase mb-3">LOGO PLACEHOLDER</div>
                         <p className="text-[12px] font-bold text-neutral-500">Click to upload new logo</p>
                         <p className="text-[10px] text-neutral-400 mt-1">Recommended size: 200x50px (PNG/SVG)</p>
                      </div>
                   </section>
                </>
              )}
           </div>
        </div>

        <footer className="p-6 bg-white border-t border-neutral-100 flex items-center justify-between flex-shrink-0">
           <button className="text-[12px] font-black text-neutral-400 uppercase tracking-[0.15em] hover:text-neutral-600 transition-colors">Reset to Default</button>
           <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="h-10 px-6 rounded-xl border-neutral-200 text-neutral-500 font-bold text-[12px] uppercase">Cancel</Button>
              <Button variant="primary" className="h-10 px-8 rounded-xl bg-[#0c2e2e] text-white font-bold text-[12px] uppercase shadow-xl shadow-neutral-900/10">Save Settings</Button>
           </div>
        </footer>
      </div>
    </div>
  );
};
