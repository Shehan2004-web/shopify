import React from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/shared/ui/atoms/Switch';
import { Typography } from '@/shared/ui/atoms/Typography';
import { EmailTrigger } from '../types';
import { cn } from '@/shared/lib/utils';
import { ChevronRight, Settings2 } from 'lucide-react';

interface EmailTriggerListProps {
  triggers: EmailTrigger[] | undefined;
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

export const EmailTriggerList: React.FC<EmailTriggerListProps> = ({ triggers, selectedId, onSelect, isLoading }) => {
  if (isLoading) return <div className="space-y-3 animate-pulse">{[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-neutral-50 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Settings2 className="h-4 w-4 text-brand-teal" />
        <Typography variant="small" className="font-black uppercase tracking-widest text-neutral-500 text-[11px]">Event Triggers</Typography>
      </div>

      {triggers?.map((trigger) => (
        <motion.div
          key={trigger.id}
          initial={false}
          whileHover={{ x: 4 }}
          onClick={() => onSelect(trigger.id)}
          className={cn(
            "p-3.5 rounded-[24px] border-2 transition-all cursor-pointer group flex items-start justify-between gap-3",
            selectedId === trigger.id 
              ? "border-brand-teal bg-white shadow-xl shadow-brand-teal/5 ring-4 ring-brand-teal/5" 
              : "border-transparent bg-neutral-50 hover:bg-white hover:border-neutral-200"
          )}
        >
          <div className="flex-1 min-w-0">
            <Typography variant="small" className={cn("text-[13px] font-black block mb-0.5 transition-colors tracking-tight", selectedId === trigger.id ? "text-brand-teal" : "text-neutral-900 group-hover:text-brand-teal")}>
              {trigger.name}
            </Typography>
            <Typography variant="small" className="text-[10px] text-neutral-400 font-bold leading-tight truncate group-hover:whitespace-normal transition-all uppercase tracking-widest">
              {trigger.description}
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
            <Switch checked={trigger.isActive} />
            <ChevronRight className={cn("h-3.5 w-3.5 transition-all opacity-0 group-hover:opacity-100", selectedId === trigger.id ? "text-brand-teal opacity-100" : "text-neutral-300")} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
