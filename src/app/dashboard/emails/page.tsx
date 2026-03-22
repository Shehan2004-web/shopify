'use client';

import React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { EmailMetrics } from '@/domains/emails/components/EmailMetrics';
import { EmailTriggerList } from '@/domains/emails/components/EmailTriggerList';
import { EmailTemplateEditor } from '@/domains/emails/components/EmailTemplateEditor';
import { EmailLogsTable } from '@/domains/emails/components/EmailLogsTable';
import { SendTestEmailModal } from '@/domains/emails/components/SendTestEmailModal';
import { GlobalEmailSettingsModal } from '@/domains/emails/components/GlobalEmailSettingsModal';
import { useEmailTriggers, useEmailLogs, useEmailMetrics } from '@/domains/emails/hooks/useEmailQueries';
import { EmailTrigger } from '@/domains/emails/types';
import { Mail, Sparkles, Send, History } from 'lucide-react';
import { Button } from '@/shared/ui/atoms/Button';

export default function EmailDashboardPage() {
  const { data: triggers, isLoading: triggersLoading } = useEmailTriggers();
  const { data: logs, isLoading: logsLoading } = useEmailLogs();
  const { data: metrics, isLoading: metricsLoading } = useEmailMetrics();

  const [selectedTriggerId, setSelectedTriggerId] = React.useState<string | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);

  const selectedTrigger = React.useMemo(() => {
    return triggers?.find(t => t.id === selectedTriggerId) || null;
  }, [triggers, selectedTriggerId]);

  const handleSaveTemplate = (data: Partial<EmailTrigger>) => {
    console.log('Saving template for:', selectedTriggerId, data);
    // Show a small toast or just close
  };

  return (
    <div className="space-y-12 pb-24 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Typography variant="small" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md">Automated Systems</Typography>
            <Sparkles className="h-3 w-3 text-amber-500" />
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            Email &{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">Communications</span>
          </Typography>
          <Typography variant="small" className="text-neutral-500 font-medium mt-1">Design and manage automated customer touchpoints across the lifecycle.</Typography>
        </div>
        
        <div className="flex items-center gap-3">
           <Button onClick={() => setIsTestModalOpen(true)} variant="outline" className="h-10 px-5 rounded-xl border-neutral-200 text-neutral-600 font-bold text-[13px] hover:bg-neutral-50 shadow-sm">
             <Send className="h-4 w-4 mr-2" /> Send Test
           </Button>
           <Button onClick={() => setIsSettingsModalOpen(true)} variant="primary" className="h-10 px-6 rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/15 font-bold text-[13px]">
             <Mail className="h-4 w-4 mr-2" /> Global Settings
           </Button>
        </div>
      </div>

      {/* Metrics Section */}
      <EmailMetrics metrics={metrics} isLoading={metricsLoading} />

      {/* Trigger List (Full Width) */}
      <section className="space-y-6">
         <div className="px-1 flex items-center justify-between">
           <div>
              <Typography useSerif variant="h2" className="text-xl font-bold text-neutral-900 tracking-tight">Event Triggers</Typography>
              <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">Click a row to edit the associated email template.</Typography>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-teal/5 rounded-xl border border-brand-teal/10">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Automation Active</span>
           </div>
         </div>
         <div className="bg-white rounded-[32px] border border-neutral-200 shadow-card overflow-hidden animate-fade-slide-up">
            <EmailTriggerList 
              triggers={triggers} 
              selectedId={selectedTriggerId} 
              onSelect={setSelectedTriggerId} 
              isLoading={triggersLoading} 
            />
         </div>
      </section>

      {/* Delivery Logs */}
      <section className="pt-4 space-y-6">
        <Typography variant="h3" className="text-xl font-bold text-neutral-900 px-1 flex items-center gap-3">
          <History className="h-5 w-5 text-neutral-300" /> Delivery History
        </Typography>
        <div className="bg-white rounded-[32px] border border-neutral-200 shadow-card overflow-hidden animate-fade-slide-up delay-75">
          <EmailLogsTable logs={logs} isLoading={logsLoading} />
        </div>
      </section>

      {/* Modals */}
      <EmailTemplateEditor 
        trigger={selectedTrigger} 
        isOpen={!!selectedTriggerId}
        onClose={() => setSelectedTriggerId(null)}
        onSave={handleSaveTemplate} 
      />

      <SendTestEmailModal 
        isOpen={isTestModalOpen} 
        onClose={() => setIsTestModalOpen(false)} 
        triggers={triggers || []} 
      />

      <GlobalEmailSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
      />
    </div>
  );
}
