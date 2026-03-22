'use client';

import * as React from 'react';
import { Sidebar } from '@/shared/ui/organisms/Sidebar';
import { Header } from '@/shared/ui/organisms/Header';
import { useUIStore } from '@/shared/store/useUIStore';
import { cn } from '@/shared/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef9f6] via-[#f3faf8] to-[#f0f7f4]">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col min-w-0 w-full relative transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'pl-0 md:pl-[260px]' : 'pl-0 md:pl-[72px]'
        )}
      >
        <Header />
        <main className="p-4 md:p-8 min-w-0 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
