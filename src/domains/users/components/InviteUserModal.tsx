'use client';

import * as React from 'react';
import { UserPlus, Shield, Check, Info } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteUserModal = ({ isOpen, onClose }: Props) => {
  const [selectedRole, setSelectedRole] = React.useState('support_agent');

  if (!isOpen) return null;

  const roles = [
    { id: 'super_admin', name: 'Super Admin', description: 'Full access to all features and settings.' },
    { id: 'support_agent', name: 'Support Agent', description: 'Can manage orders, returns, and customers.' },
    { id: 'logistics_manager', name: 'Logistics Manager', description: 'Can manage shipping and inventory.' },
    { id: 'financial_analyst', name: 'Financial Analyst', description: 'Can view reports and financial data.' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Invite User</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Add a new member to your team</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all">
              Send Invitation
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Column: Details */}
            <div className="w-full lg:w-[62%] flex flex-col gap-6">
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5]">
                  <h2 className="text-[14px] font-semibold text-[#202223]">User Details</h2>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Full name</label>
                      <input type="text" placeholder="e.g. John Doe" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Email address</label>
                      <input type="email" placeholder="john@example.com" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-neutral-700 mb-1.5 block">Department</label>
                    <input type="text" placeholder="e.g. Engineering, Support" className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:outline-none" />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5]">
                  <h2 className="text-[14px] font-semibold text-[#202223]">Select Role</h2>
                </div>
                <div className="p-4 grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <label 
                      key={role.id} 
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                        selectedRole === role.id ? "border-[#005bd3] bg-[#f0f7ff] shadow-sm" : "border-[#e1e3e5] hover:border-[#c9cccf] bg-white"
                      )}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className={cn(
                        "mt-1 rotate-0 transition-transform flex-shrink-0 h-4 w-4 rounded-full border flex items-center justify-center",
                        selectedRole === role.id ? "border-[#005bd3] bg-[#005bd3]" : "border-[#c9cccf]"
                      )}>
                        {selectedRole === role.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#202223]">{role.name}</p>
                        <p className="text-[12px] text-neutral-500 mt-0.5">{role.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Information */}
            <div className="w-full lg:w-[38%] flex flex-col gap-6">
              <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-brand-primary" />
                  <h2 className="text-[14px] font-semibold text-[#202223]">Permissions Preview</h2>
                </div>
                <p className="text-[12px] text-neutral-500 mb-4">The <span className="font-bold text-neutral-900">{roles.find(r => r.id === selectedRole)?.name}</span> role includes the following permissions:</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-medium text-neutral-900">Order Management</p>
                      <p className="text-[11px] text-neutral-500">View, edit, and fulfill orders.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-medium text-neutral-900">Customer Support</p>
                      <p className="text-[11px] text-neutral-500">Manage returns and refunds.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-medium text-neutral-900">Product Management</p>
                      <p className="text-[11px] text-neutral-500">View and list new products.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                  <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    Once the invitation is sent, the user will receive an email to set up their password and join the organization.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
