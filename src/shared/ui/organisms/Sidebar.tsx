'use client';

import * as React from 'react';
import { NavItem } from '@/shared/ui/molecules/NavItem';
import { useUIStore } from '@/shared/store/useUIStore';
import { cn } from '@/shared/lib/utils';
import {
  LayoutDashboard,
  RefreshCw,
  BarChart3,
  Truck,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Package,
  Layers,
  CreditCard,
  PieChart,
  UsersRound,
  Mail,
} from 'lucide-react';
import { Typography } from '@/shared/ui/atoms/Typography';

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  const sections = [
    {
      title: 'Main',
      items: [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/dashboard/products', label: 'Products', icon: Package },
      ],
    },
    {
      title: 'Operations',
      items: [
        { href: '/dashboard/refunds', label: 'Refunds', icon: RefreshCw },
        { href: '/dashboard/returns', label: 'Returns', icon: RefreshCw },
        { href: '/dashboard/shipping', label: 'Shipping', icon: Truck },
        { href: '/dashboard/purchases', label: 'Purchases', icon: CreditCard },
        { href: '/dashboard/customers', label: 'Customers', icon: UsersRound },
        { href: '/dashboard/users', label: 'Users', icon: UserCheck },
      ],
    },
    {
      title: 'System',
      items: [
        { href: '/dashboard/emails', label: 'Emails', icon: Mail },
        { href: '/dashboard/reports', label: 'Reports', icon: PieChart },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
        { href: '/dashboard/help', label: 'Help Center', icon: HelpCircle },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div 
        className={cn(
          'fixed inset-0 z-30 bg-[#0c2e2e]/60 backdrop-blur-sm transition-opacity duration-300 md:hidden', 
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )} 
        onClick={toggleSidebar} 
      />

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
          isSidebarOpen 
            ? 'translate-x-0 w-[260px]' 
            : '-translate-x-full md:translate-x-0 w-[260px] md:w-[72px]',
          'bg-gradient-to-b from-[#0c2e2e] via-[#0a2a2a] to-[#071e1e] text-white shadow-2xl md:shadow-none'
        )}
      >
      <div className="flex h-full flex-col">
        {/* ── Logo ──────────────────────────────────── */}
        <div className="flex h-[72px] items-center px-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] shadow-lg shadow-[#14b8a6]/30">
              <Layers className="h-[18px] w-[18px] text-white" />
            </div>
            {isSidebarOpen && (
              <Typography
                useSerif
                variant="h3"
                className="text-lg font-bold text-white tracking-tight"
              >
                shofiy<span className="text-[#2dd4bf]">.</span>
              </Typography>
            )}
          </div>
        </div>

        {/* ── Navigation ──────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
          {sections.map((section, idx) => (
            <div key={section.title} className={cn('mt-7', idx === 0 && 'mt-3')}>
              {isSidebarOpen && (
                <Typography
                  variant="small"
                  className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/25"
                >
                  {section.title}
                </Typography>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    collapsed={!isSidebarOpen}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── User + Collapse ─────────────────────── */}
        <div className="p-3 border-t border-white/5">
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl p-2.5',
              'hover:bg-white/5 transition-colors cursor-pointer',
              !isSidebarOpen && 'justify-center px-0'
            )}
          >
            <div className="relative h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] flex items-center justify-center text-[11px] font-bold text-white shadow-lg">
              JR
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-status-success ring-2 ring-[#0a2a2a]" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <Typography variant="small" className="block font-bold text-white/90 truncate text-[13px]">
                  Jason Reed
                </Typography>
                <Typography variant="small" className="block text-[10px] text-white/30 truncate">
                  Manager
                </Typography>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="mt-2 flex w-full items-center justify-center rounded-lg py-2 text-white/25 hover:bg-white/5 hover:text-white/50 transition-all"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
    </>
  );
};
