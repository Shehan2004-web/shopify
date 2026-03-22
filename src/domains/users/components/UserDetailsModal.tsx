'use client';

import * as React from 'react';
import { X, ArrowLeft, Mail, Shield, ShieldCheck, Clock, Key, Trash2, Lock, History, MapPin, Activity } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/atoms/Button';

interface Props {
  user: any | null;
  onClose: () => void;
}

export const UserDetailsModal = ({ user, onClose }: Props) => {
  if (!user) return null;

  const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin',
    support_agent: 'Support Agent',
    logistics_manager: 'Logistics Manager',
    financial_analyst: 'Financial Analyst',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    suspended: 'bg-red-100 text-red-800 border-red-200',
    invited: 'bg-amber-100 text-amber-800 border-amber-200',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-1.5 -ml-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">{user.name}</h2>
                <span className={cn(
                  "px-2 py-0.5 text-[10px] font-bold rounded-md border",
                  statusColors[user.status] || 'bg-neutral-100 text-neutral-800'
                )}>
                  {user.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[12px] text-neutral-500 mt-1">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="h-8 rounded-xl border-[#c9cccf] text-[13px] font-semibold">
               Edit Profile
             </Button>
             <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors ml-2">
               <X className="h-5 w-5" />
             </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Column: Security & Activity */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">
              
              {/* Profile Card */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
                <div className="flex items-start gap-6">
                   <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[24px] font-bold flex-shrink-0 border-4 border-white shadow-md">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                   </div>
                   <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#f0e8fe] text-[#7c3aed]">
                          {roleLabels[user.role] || user.role}
                        </span>
                        <span className="text-[12px] text-neutral-400 font-medium">• {user.department}</span>
                      </div>
                      <p className="text-[14px] text-neutral-600 leading-relaxed mb-4">
                        Member since August 12, 2025. This user has full administrative privileges over the engineering department.
                      </p>
                      <div className="flex gap-6">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Last Login</span>
                            <span className="text-[13px] font-semibold text-neutral-900">{user.lastActive}</span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Device</span>
                            <span className="text-[13px] font-semibold text-neutral-900">MacBook Pro (Chrome)</span>
                         </div>
                      </div>
                   </div>
                </div>
              </section>

              {/* Security Alerts */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-[14px] font-semibold text-[#202223]">Security & Access</h2>
                </div>
                <div className="p-5 flex flex-col gap-4">
                   <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 bg-[#f9fafb]">
                      <div className="flex items-center gap-3">
                         <Key className="h-5 w-5 text-neutral-400" />
                         <div>
                            <p className="text-[13px] font-semibold text-neutral-900">Two-factor authentication</p>
                            <p className="text-[12px] text-neutral-500 mt-0.5">Protect account with a security code.</p>
                         </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">ENABLED</span>
                   </div>
                   
                   <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 bg-[#f9fafb]">
                      <div className="flex items-center gap-3">
                         <Lock className="h-5 w-5 text-neutral-400" />
                         <div>
                            <p className="text-[13px] font-semibold text-neutral-900">Account login</p>
                            <p className="text-[12px] text-neutral-500 mt-0.5">Last password change: 2 months ago.</p>
                         </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 border-[#c9cccf] text-[12px]">Reset password</Button>
                   </div>
                </div>
              </section>

              {/* Activity Timeline */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5 flex flex-col gap-6">
                <h2 className="text-[14px] font-semibold text-[#202223] flex items-center gap-2">
                   <History className="h-5 w-5 text-neutral-400" />
                   Activity Timeline
                </h2>
                
                <div className="relative pl-3 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-[2px] before:bg-neutral-200">
                  <div className="relative flex items-start gap-4 z-10 w-full">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-primary/10 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-brand-primary">
                       <Activity className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium">Updated shipping settings</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Changed carrier priority for Northeast zone.</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">2 min ago</span>
                  </div>

                  <div className="relative flex items-start gap-4 z-10 w-full">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-neutral-100 outline outline-4 outline-white flex flex-shrink-0 items-center justify-center text-neutral-400">
                       <Clock className="h-3 w-3" />
                     </div>
                     <div className="flex-1 -mt-0.5">
                        <p className="text-[13px] text-neutral-900 font-medium">Logged in</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Device: Chrome OS, Austin TX.</p>
                     </div>
                     <span className="text-[12px] text-neutral-400">1 hour ago</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Profile Info & Actions */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              
              {/* Department Info */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3 sticky top-6">
                <h2 className="text-[14px] font-semibold text-[#202223] border-b border-[#e1e3e5] pb-2">Organizational Info</h2>
                <div className="space-y-4">
                   <div>
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Department</p>
                      <p className="text-[13px] font-medium text-neutral-900 mt-1">{user.department}</p>
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Office Location</p>
                      <div className="flex items-center gap-1.5 mt-1">
                         <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                         <span className="text-[13px] font-medium text-neutral-900 tracking-tight">HQ - Austin, TX</span>
                      </div>
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Direct Manager</p>
                      <div className="flex items-center gap-2 mt-2">
                         <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold">MR</div>
                         <span className="text-[13px] font-medium text-neutral-900">Melissa Reed</span>
                      </div>
                   </div>
                </div>
              </section>

              {/* Quick Actions */}
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
                 <h2 className="text-[14px] font-semibold text-[#202223] border-b border-[#e1e3e5] pb-2">Admin Actions</h2>
                 <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-start h-9 rounded-lg border-neutral-200 text-neutral-700 font-medium text-[13px]">
                       <Mail className="h-4 w-4 mr-2.5 text-neutral-400" /> Send Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-9 rounded-lg border-neutral-200 text-neutral-700 font-medium text-[13px]">
                       <Key className="h-4 w-4 mr-2.5 text-neutral-400" /> Edit Permissions
                    </Button>
                    <div className="h-px bg-neutral-100 my-1" />
                    <Button variant="outline" className="w-full justify-start h-9 rounded-lg border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 font-medium text-[13px]">
                       <Trash2 className="h-4 w-4 mr-2.5" /> Revoke Access
                    </Button>
                 </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
