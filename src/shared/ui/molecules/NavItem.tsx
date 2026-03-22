'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed?: boolean;
  badge?: number;
}

export const NavItem = ({ href, label, icon: Icon, collapsed, badge }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex items-center rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
        isActive
          ? 'bg-white/10 text-white shadow-sm'
          : 'text-white/40 hover:bg-white/5 hover:text-white/75',
        collapsed && 'justify-center px-2'
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#2dd4bf] shadow-[0_0_12px_rgba(45,212,191,0.4)]" />
      )}

      <Icon
        className={cn(
          'h-[18px] w-[18px] flex-shrink-0 transition-colors duration-200',
          isActive ? 'text-[#2dd4bf]' : 'text-white/30 group-hover:text-white/60',
          !collapsed && 'mr-3'
        )}
      />
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge && badge > 0 && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange/20 px-1.5 text-[10px] font-bold text-brand-orange">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
};
