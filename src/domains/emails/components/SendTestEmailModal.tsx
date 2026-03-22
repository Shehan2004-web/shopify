'use client';

import * as React from 'react';
import { X, Send, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  triggers: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const SendTestEmailModal = ({ isOpen, onClose, triggers }: Props) => {
  const [email, setEmail] = React.useState('');
  const [selectedTrigger, setSelectedTrigger] = React.useState(triggers[0]?.id || '');
  const [isSending, setIsSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl animate-fade-slide-up overflow-hidden">
        <header className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Send className="h-5 w-5" />
             </div>
             <div>
                <h2 className="text-[16px] font-bold text-neutral-900 leading-none">Send Test Email</h2>
                <p className="text-[12px] text-neutral-400 mt-1">Preview your automation live</p>
             </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <X className="h-4 w-4 text-neutral-400" />
          </button>
        </header>

        <div className="p-6 space-y-5">
           {isSent ? (
             <div className="py-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 scale-110">
                   <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-[18px] font-bold text-neutral-900">Email Sent!</h3>
                <p className="text-[13px] text-neutral-500 mt-1">Check your inbox for the preview.</p>
             </div>
           ) : (
             <>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Recipient Email</label>
                   <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jason@shopify.com"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-[14px] focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Select Template</label>
                   <select 
                     value={selectedTrigger}
                     onChange={(e) => setSelectedTrigger(e.target.value)}
                     className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-[14px] focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all appearance-none cursor-pointer"
                   >
                     {triggers.map(t => (
                       <option key={t.id} value={t.id}>{t.name}</option>
                     ))}
                   </select>
                </div>

                <div className="pt-4 flex gap-3">
                   <Button variant="outline" onClick={onClose} className="flex-1 h-11 rounded-xl border-neutral-200 text-neutral-500 font-bold text-[13px]">Cancel</Button>
                   <Button 
                     variant="primary" 
                     onClick={handleSend}
                     disabled={!email || isSending}
                     className="flex-1 h-11 rounded-xl bg-brand-primary text-white font-bold text-[13px] shadow-lg shadow-brand-primary/20"
                   >
                     {isSending ? 'Sending...' : 'Send Now'}
                   </Button>
                </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};
