import React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { EmailLog } from '../types';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Search, Filter, History } from 'lucide-react';

interface EmailLogsTableProps {
  logs: EmailLog[] | undefined;
  isLoading: boolean;
}

export const EmailLogsTable: React.FC<EmailLogsTableProps> = ({ logs, isLoading }) => {
  return (
    <div className="bg-white rounded-[40px] border border-neutral-200 overflow-hidden shadow-sm">
      <div className="p-8 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
            <History className="h-5 w-5" />
          </div>
          <div>
            <Typography variant="h3" className="text-[18px] font-bold text-neutral-900">Delivery Status Logs</Typography>
            <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">Real-time update on automated communications</Typography>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <input type="text" placeholder="Search recipients..." className="h-10 pl-9 pr-4 bg-neutral-50 border border-neutral-100 rounded-xl text-[12px] font-medium focus:outline-none focus:border-brand-teal transition-all" />
          </div>
          <button className="h-10 px-4 flex items-center gap-2 rounded-xl border border-neutral-100 bg-white text-[12px] font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50">
              <th className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100">Date & Time</th>
              <th className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100">Recipient Email</th>
              <th className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100">Event Trigger</th>
              <th className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100">Delivery Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={4} className="px-8 py-8 h-16 bg-neutral-50/20" />
                </tr>
              ))
            ) : (
              logs?.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <Typography variant="small" className="text-[13px] font-bold text-neutral-900">
                      {format(new Date(log.sentAt), 'MMM dd, yyyy')}
                    </Typography>
                    <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
                      {format(new Date(log.sentAt), 'hh:mm a')}
                    </Typography>
                  </td>
                  <td className="px-8 py-5">
                    <Typography variant="small" className="text-[13px] font-bold text-neutral-600 group-hover:text-brand-teal transition-colors underline decoration-transparent group-hover:decoration-brand-teal underline-offset-4">
                      {log.recipient}
                    </Typography>
                  </td>
                  <td className="px-8 py-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-lg">
                       <div className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                       <span className="text-[11px] font-black uppercase text-neutral-600 tracking-tighter">{log.triggerName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {log.status === 'delivered' ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Delivered</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                        <XCircle className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Bounced</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-8 bg-neutral-50/30 flex items-center justify-between">
        <Typography variant="small" className="text-[12px] text-neutral-400 font-medium italic">Showing last {logs?.length} automated events.</Typography>
        <button className="text-[12px] font-bold text-brand-teal hover:underline underline-offset-4">View All Logs ↗</button>
      </div>
    </div>
  );
};
