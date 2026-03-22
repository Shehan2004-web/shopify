'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { Card } from '@/shared/ui/atoms/Card';
import { cn } from '@/shared/lib/utils';
import { InviteUserModal } from '@/domains/users/components/InviteUserModal';
import { UserDetailsModal } from '@/domains/users/components/UserDetailsModal';
import { useUsers, useUserMetrics } from '@/domains/users/hooks/useUserQueries';
import type { UserRole, UserStatus } from '@/domains/users/types';
import {
  UserPlus,
  Users,
  Mail,
  Shield,
  Search,
  MoreVertical,
  Key,
  Lock,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

/* ── Role Config ─────────────────────────────────── */
const roleConfig: Record<UserRole, { label: string; bg: string; text: string }> = {
  super_admin: { label: 'Super Admin', bg: '#f0e8fe', text: '#7c3aed' },
  support_agent: { label: 'Support Agent', bg: '#dbeafe', text: '#1e40af' },
  logistics_manager: { label: 'Logistics Manager', bg: '#e6faf9', text: '#0c9e8e' },
  financial_analyst: { label: 'Financial Analyst', bg: '#fffaeb', text: '#92400e' },
};

/* ── Status Config ───────────────────────────────── */
const statusStyle: Record<UserStatus, { dot: string; label: string; labelColor: string }> = {
  active: { dot: 'bg-emerald-500', label: 'Active', labelColor: 'text-emerald-700' },
  suspended: { dot: 'bg-red-500', label: 'Suspended', labelColor: 'text-red-600' },
  invited: { dot: 'bg-amber-400', label: 'Invited', labelColor: 'text-amber-600' },
};

/* ── Page ─────────────────────────────────────────── */
export default function UsersPage() {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: metrics, isLoading: metricsLoading } = useUserMetrics();
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<UserRole | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<UserStatus | null>(null);
  const [actionOpen, setActionOpen] = React.useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);

  const filtered = React.useMemo(() => {
    if (!users) return [];
    let result = [...users];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q));
    }
    if (roleFilter) result = result.filter((u) => u.role === roleFilter);
    if (statusFilter) result = result.filter((u) => u.status === statusFilter);
    return result;
  }, [users, search, roleFilter, statusFilter]);

  const roles: UserRole[] = ['super_admin', 'support_agent', 'logistics_manager', 'financial_analyst'];
  const statuses: UserStatus[] = ['active', 'suspended', 'invited'];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-2">
            <span>Dashboard</span><span>/</span><span className="text-neutral-600">Users</span>
          </div>
          <Typography useSerif variant="h1" className="text-[32px] font-black text-neutral-900 tracking-tight">
            User{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">Management</span>
          </Typography>
          <Typography variant="lead" className="mt-1.5 text-[13px] font-medium text-neutral-500">
            Manage team access, roles, and permissions across your organization.
          </Typography>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-semibold border-neutral-200 text-[13px]">
            <Shield className="mr-2 h-4 w-4" /> Audit Log
          </Button>
          <Button onClick={() => setIsInviteModalOpen(true)} variant="primary" size="sm" className="h-10 rounded-xl px-4 font-semibold shadow-lg shadow-brand-primary/15 text-[13px]">
            <UserPlus className="mr-2 h-4 w-4" /> Invite User
          </Button>
        </div>
      </div>

      {/* ═══ RBAC Metrics ══════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {metricsLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="p-5 border-none bg-white animate-pulse">
              <div className="h-3 w-24 bg-neutral-200 rounded mb-6" />
              <div className="h-8 w-20 bg-neutral-200 rounded mb-3" />
              <div className="h-3 w-16 bg-neutral-100 rounded" />
            </Card>
          ))
        ) : metrics ? (
          <>
            <Card className="p-5 border-none bg-white animate-fade-slide-up relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">Total Active Users</Typography>
                <div className="h-9 w-9 rounded-xl bg-[#ecfdf3] flex items-center justify-center"><Users className="h-4.5 w-4.5 text-[#12b76a]" /></div>
              </div>
              <Typography variant="h3" className="text-[28px] font-mono font-bold tracking-tighter text-neutral-900">{metrics.totalActive}</Typography>
              <Typography variant="small" className="text-[10px] text-emerald-600 font-bold mt-1">All systems operational</Typography>
            </Card>
            <Card className="p-5 border-none bg-white animate-fade-slide-up relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">Pending Invites</Typography>
                <div className="h-9 w-9 rounded-xl bg-[#fffaeb] flex items-center justify-center"><Mail className="h-4.5 w-4.5 text-[#f79009]" /></div>
              </div>
              <Typography variant="h3" className="text-[28px] font-mono font-bold tracking-tighter text-neutral-900">{metrics.pendingInvites}</Typography>
              <Typography variant="small" className="text-[10px] text-amber-600 font-bold mt-1">Awaiting acceptance</Typography>
            </Card>
            <Card className="p-5 border-none bg-white animate-fade-slide-up relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">Security Alerts</Typography>
                <div className="h-9 w-9 rounded-xl bg-[#fef2f2] flex items-center justify-center"><AlertTriangle className="h-4.5 w-4.5 text-[#ef4444]" /></div>
              </div>
              <Typography variant="h3" className="text-[28px] font-mono font-bold tracking-tighter text-neutral-900">{metrics.securityAlerts}</Typography>
              <Typography variant="small" className="text-[10px] text-red-600 font-bold mt-1">Requires review</Typography>
            </Card>
          </>
        ) : null}
      </div>

      {/* ═══ User Directory ════════════════════════════ */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <Typography useSerif variant="h2" className="text-[22px] font-bold text-neutral-900 tracking-tight">User Directory</Typography>
            <Typography variant="small" className="text-neutral-400 text-[12px] mt-0.5">Complete team roster with role-based access control.</Typography>
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-neutral-200"><MoreVertical className="h-4 w-4" /></Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 animate-fade-slide-up">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, or department..."
              className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[13px] focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all duration-200" />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Role filters */}
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mr-1">Role:</span>
              <button onClick={() => setRoleFilter(null)} className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', !roleFilter ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
              {roles.map((r) => (
                <button key={r} onClick={() => setRoleFilter(roleFilter === r ? null : r)}
                  className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', roleFilter === r ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>
                  {roleConfig[r].label.split(' ')[0]}
                </button>
              ))}
            </div>
            {/* Status filters */}
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mr-1">Status:</span>
              <button onClick={() => setStatusFilter(null)} className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all', !statusFilter ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>All</button>
              {statuses.map((s) => (
                <button key={s} onClick={() => setStatusFilter(statusFilter === s ? null : s)}
                  className={cn('px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all capitalize', statusFilter === s ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100')}>
                  {statusStyle[s].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card animate-fade-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">User</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Role</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Department</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Last Active</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Status</Typography></th>
                  <th className="px-5 py-3.5"><Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">Actions</Typography></th>
                </tr>
              </thead>
              <tbody>
                {usersLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>{[...Array(6)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 rounded-md animate-shimmer" /></td>)}</tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-neutral-400 text-[13px]">No users found</td></tr>
                ) : (
                  filtered.map((user, idx) => {
                    const rc = roleConfig[user.role];
                    const ss = statusStyle[user.status];
                    return (
                      <tr key={user.id} onClick={() => setSelectedUser(user)} className={cn('group transition-colors duration-150 cursor-pointer hover:bg-brand-primary/[0.02]', idx !== filtered.length - 1 && 'border-b border-neutral-200/80')}>
                        {/* User */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-teal/10 flex items-center justify-center text-brand-primary text-[11px] font-bold flex-shrink-0 relative">
                              {user.name.split(' ').map((n) => n[0]).join('')}
                              <span className={cn('absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white', ss.dot)} />
                            </div>
                            <div className="min-w-0">
                              <Typography variant="small" className="font-semibold text-neutral-900 text-[13px] truncate block">{user.name}</Typography>
                              <Typography variant="small" className="text-[10px] text-neutral-400 truncate block">{user.email}</Typography>
                            </div>
                          </div>
                        </td>
                        {/* Role */}
                        <td className="px-5 py-3.5">
                          <span className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ backgroundColor: rc.bg, color: rc.text }}>
                            {rc.label}
                          </span>
                        </td>
                        {/* Department */}
                        <td className="px-5 py-3.5">
                          <Typography variant="small" className="text-[12px] text-neutral-600 font-medium">{user.department}</Typography>
                        </td>
                        {/* Last Active */}
                        <td className="px-5 py-3.5 text-[12px] text-neutral-500 font-medium">{user.lastActive}</td>
                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            {/* Toggle */}
                            <button className={cn('h-5 w-9 rounded-full relative transition-colors duration-200', user.status === 'active' ? 'bg-emerald-500' : user.status === 'suspended' ? 'bg-red-400' : 'bg-amber-400')}>
                              <div className={cn('h-3.5 w-3.5 rounded-full bg-white shadow-sm absolute top-[3px] transition-transform duration-200', user.status === 'active' ? 'translate-x-[18px]' : 'translate-x-[3px]')} />
                            </button>
                            <span className={cn('text-[11px] font-semibold', ss.labelColor)}>{ss.label}</span>
                          </div>
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="relative">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={(e) => { e.stopPropagation(); setActionOpen(actionOpen === user.id ? null : user.id); }}>
                              <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                            </Button>
                            {actionOpen === user.id && (
                              <div className="absolute right-0 top-8 z-50 w-48 rounded-xl bg-white border border-neutral-200 shadow-xl p-1.5 animate-fade-slide-up">
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Key className="h-3.5 w-3.5 text-neutral-400" /> Edit Permissions
                                </button>
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Lock className="h-3.5 w-3.5 text-neutral-400" /> Reset Password
                                </button>
                                <div className="my-1 h-px bg-neutral-100" />
                                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors" onClick={() => setActionOpen(null)}>
                                  <Trash2 className="h-3.5 w-3.5" /> Revoke Access
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between p-4 bg-neutral-50/50 border-t border-neutral-200">
            <Typography variant="small" className="text-[11px] text-neutral-400 font-medium">
              Showing {filtered.length} of {users?.length || 0} users
            </Typography>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Previous</Button>
              <button className="h-8 w-8 rounded-lg bg-brand-primary text-white text-[11px] font-bold">1</button>
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] border-neutral-200">Next</Button>
            </div>
          </div>
        </div>
      </div>
      <InviteUserModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
      <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
