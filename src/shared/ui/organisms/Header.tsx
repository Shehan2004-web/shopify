'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/shared/ui/atoms/Button';
import {
  Search,
  Bell,
  Command,
  CalendarDays,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  HelpCircle,
  Package,
  RefreshCw,
  Truck,
  CreditCard,
  Users,
  BarChart3,
  FileText,
  LayoutDashboard,
  Menu,
} from 'lucide-react';
import { useUIStore } from '@/shared/store/useUIStore';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Badge } from '@/shared/ui/atoms/Badge';
import { cn } from '@/shared/lib/utils';

/* ── Route → Page Name Map ───────────────────────── */
const routeMap: Record<string, { breadcrumb: string; title: string; icon: React.ElementType }> = {
  '/dashboard': { breadcrumb: 'Overview', title: 'Dashboard Overview', icon: LayoutDashboard },
  '/dashboard/analytics': { breadcrumb: 'Analytics', title: 'Analytics & Insights', icon: BarChart3 },
  '/dashboard/products': { breadcrumb: 'Products', title: 'Product Management', icon: Package },
  '/dashboard/refunds': { breadcrumb: 'Refunds', title: 'Refund Management', icon: RefreshCw },
  '/dashboard/returns': { breadcrumb: 'Returns', title: 'Returns Management', icon: RefreshCw },
  '/dashboard/shipping': { breadcrumb: 'Shipping', title: 'Shipping & Logistics', icon: Truck },
  '/dashboard/purchases': { breadcrumb: 'Purchases', title: 'Purchases & Orders', icon: CreditCard },
  '/dashboard/customers': { breadcrumb: 'Customers', title: 'Customer Intelligence', icon: Users },
  '/dashboard/users': { breadcrumb: 'Users', title: 'User Management', icon: Users },
  '/dashboard/reports': { breadcrumb: 'Reports', title: 'Systems Reports', icon: FileText },
  '/dashboard/settings': { breadcrumb: 'Settings', title: 'System Settings', icon: Settings },
  '/dashboard/help': { breadcrumb: 'Help', title: 'Help Center', icon: HelpCircle },
};

/* ── Global Search Items ─────────────────────────── */
const searchItems = [
  { label: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard, category: 'Pages' },
  { label: 'Analytics & Insights', href: '/dashboard/analytics', icon: BarChart3, category: 'Pages' },
  { label: 'Product Management', href: '/dashboard/products', icon: Package, category: 'Pages' },
  { label: 'Refund Management', href: '/dashboard/refunds', icon: RefreshCw, category: 'Pages' },
  { label: 'Shipping & Logistics', href: '/dashboard/shipping', icon: Truck, category: 'Pages' },
  { label: 'Purchases & Orders', href: '/dashboard/purchases', icon: CreditCard, category: 'Pages' },
  { label: 'Customer Intelligence', href: '/dashboard/customers', icon: Users, category: 'Pages' },
  { label: 'User Management', href: '/dashboard/users', icon: Users, category: 'Pages' },
  { label: 'Systems Reports', href: '/dashboard/reports', icon: FileText, category: 'Pages' },
  { label: 'System Settings', href: '/dashboard/settings', icon: Settings, category: 'Pages' },
  { label: 'Help Center', href: '/dashboard/help', icon: HelpCircle, category: 'Pages' },
];

/* ── Notification Items ──────────────────────────── */
const notifications = [
  { id: 1, title: 'New refund claim filed', description: 'Order #ORD-8401 — $120.00', time: '2 min ago', unread: true, type: 'refund' as const },
  { id: 2, title: 'Shipment delivered', description: 'DHL-9284712834 to Edward Norton', time: '15 min ago', unread: true, type: 'shipping' as const },
  { id: 3, title: 'Auto-approved return', description: 'Order #ORD-8399 — Wrong Size', time: '1 hour ago', unread: false, type: 'refund' as const },
  { id: 4, title: 'Carrier exception alert', description: 'FDX-5829174621 — Damaged in Transit', time: '3 hours ago', unread: false, type: 'alert' as const },
  { id: 5, title: 'New VIP customer', description: 'Charlotte Nguyen reached VIP tier', time: '5 hours ago', unread: false, type: 'customer' as const },
];

const notifTypeColor: Record<string, { bg: string; text: string }> = {
  refund: { bg: '#f5f0ff', text: '#7c3aed' },
  shipping: { bg: '#e6faf9', text: '#00b2a9' },
  alert: { bg: '#fef2f2', text: '#ef4444' },
  customer: { bg: '#e8e9fe', text: '#5057f5' },
};

/* ── Page ─────────────────────────────────────────── */
export const Header = () => {
  const pathname = usePathname();
  const currentRoute = routeMap[pathname] || routeMap['/dashboard'];
  const { toggleSidebar } = useUIStore();

  /* Search */
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchRef = React.useRef<HTMLDivElement>(null);

  const searchResults = React.useMemo(() => {
    if (!searchQuery) return searchItems;
    const q = searchQuery.toLowerCase();
    return searchItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [searchQuery]);

  /* Notification */
  const [notifOpen, setNotifOpen] = React.useState(false);
  const notifRef = React.useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  /* User Profile */
  const [userOpen, setUserOpen] = React.useState(false);
  const userRef = React.useRef<HTMLDivElement>(null);

  /* Today's date */
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  /* Click outside handler */
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Keyboard shortcut — Cmd/Ctrl + K */
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between border-b border-neutral-200 bg-white/80 px-4 md:px-8 backdrop-blur-xl">
      {/* ═══ Left: Dynamic Breadcrumb + Title ═════════ */}
      <div className="flex items-center gap-2 md:gap-3">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 hover:bg-brand-teal/10 hover:text-brand-teal transition-colors"
        >
          <Menu className="h-[22px] w-[22px]" />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <Typography variant="small" className="text-[11px] text-neutral-400">Dashboard</Typography>
            <span className="text-neutral-300 text-[10px]">/</span>
            <Typography variant="small" className="text-[11px] text-neutral-600 font-semibold">{currentRoute.breadcrumb}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography useSerif variant="h3" className="text-[15px] md:text-lg font-bold text-neutral-900 line-clamp-1">{currentRoute.title}</Typography>
            {pathname === '/dashboard' && <Badge variant="brand-teal" className="text-[9px] py-0 px-1.5 font-bold hidden md:inline-flex">LIVE</Badge>}
          </div>
        </div>
      </div>

      {/* ═══ Right: Actions ═══════════════════════════ */}
      <div className="flex items-center gap-3">
        {/* ── Global Search ──────────────────────────── */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => { setSearchOpen(!searchOpen); setNotifOpen(false); setUserOpen(false); }}
            className="hidden lg:flex items-center gap-3 h-10 w-72 rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 text-sm text-neutral-400 hover:border-brand-primary/30 hover:bg-white transition-all duration-200 group"
          >
            <Search className="h-4 w-4 text-neutral-400 group-hover:text-brand-primary transition-colors" />
            <span className="flex-1 text-left text-[13px]">Search...</span>
            <kbd className="flex items-center gap-0.5 rounded-md border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 shadow-xs">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl bg-white border border-neutral-200 shadow-2xl p-2 animate-fade-slide-up z-50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages, actions..."
                  className="h-10 w-full rounded-xl bg-neutral-50 pl-10 pr-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
                />
              </div>
              <div className="max-h-[280px] overflow-y-auto">
                <Typography variant="small" className="px-3 py-1.5 text-[9px] font-bold text-neutral-400 uppercase tracking-[0.12em]">Pages</Typography>
                {searchResults.length === 0 ? (
                  <div className="px-3 py-6 text-center text-neutral-400 text-[12px]">No results found</div>
                ) : (
                  searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors',
                          pathname === item.href ? 'bg-brand-primary/5 text-brand-primary' : 'text-neutral-700 hover:bg-neutral-50'
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Date Indicator ─────────────────────────── */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 h-10 text-[12px] text-neutral-500 font-medium">
          <CalendarDays className="h-3.5 w-3.5 text-neutral-400" />
          <span>{today}</span>
        </div>

        <div className="h-6 w-px bg-neutral-200" />

        {/* ── Notification Bell + Dropdown ────────────── */}
        <div ref={notifRef} className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl relative hover:bg-brand-primary/5 hover:text-brand-primary"
            onClick={() => { setNotifOpen(!notifOpen); setSearchOpen(false); setUserOpen(false); }}
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[8px] font-bold text-white">{unreadCount}</span>
              </span>
            )}
          </Button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl bg-white border border-neutral-200 shadow-2xl p-2 animate-fade-slide-up z-50">
              <div className="flex items-center justify-between px-3 py-2">
                <Typography variant="small" className="text-[13px] font-bold text-neutral-900">Notifications</Typography>
                <button className="text-[10px] font-semibold text-brand-primary hover:underline">Mark all read</button>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((notif) => {
                  const tc = notifTypeColor[notif.type];
                  return (
                    <button
                      key={notif.id}
                      onClick={() => setNotifOpen(false)}
                      className={cn(
                        'w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-colors hover:bg-neutral-50',
                        notif.unread && 'bg-brand-primary/[0.02]'
                      )}
                    >
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: tc.bg }}>
                        <Bell className="h-3.5 w-3.5" style={{ color: tc.text }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Typography variant="small" className={cn('text-[12px] font-semibold truncate', notif.unread ? 'text-neutral-900' : 'text-neutral-600')}>
                            {notif.title}
                          </Typography>
                          {notif.unread && <span className="h-1.5 w-1.5 rounded-full bg-brand-primary flex-shrink-0" />}
                        </div>
                        <Typography variant="small" className="text-[11px] text-neutral-400 truncate block">{notif.description}</Typography>
                        <Typography variant="small" className="text-[10px] text-neutral-300 mt-0.5">{notif.time}</Typography>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-neutral-100 mt-1 pt-1">
                <button className="w-full px-3 py-2 rounded-xl text-[12px] font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors text-center">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-neutral-200" />

        {/* ── User Profile + Dropdown ────────────────── */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => { setUserOpen(!userOpen); setSearchOpen(false); setNotifOpen(false); }}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-neutral-50 transition-colors duration-200 group"
          >
            <div className="relative h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-brand-teal to-brand-primary flex items-center justify-center text-[11px] font-bold text-white shadow-md">
              JR
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-status-success ring-2 ring-white" />
            </div>
            <div className="hidden md:block text-left">
              <Typography variant="small" className="block text-[13px] font-semibold text-neutral-900 leading-tight">Jason Reed</Typography>
              <Typography variant="small" className="block text-[10px] text-neutral-400 leading-tight">jason@shofiy.com · Manager</Typography>
            </div>
            <ChevronDown className={cn('h-3.5 w-3.5 text-neutral-400 hidden md:block transition-transform duration-200', userOpen && 'rotate-180')} />
          </button>

          {userOpen && (
            <div className="absolute right-0 top-14 w-56 rounded-2xl bg-white border border-neutral-200 shadow-2xl p-2 animate-fade-slide-up z-50">
              {/* User Info */}
              <div className="px-3 py-2.5 mb-1">
                <Typography variant="small" className="text-[13px] font-bold text-neutral-900 block">Jason Reed</Typography>
                <Typography variant="small" className="text-[11px] text-neutral-400">jason@shofiy.com</Typography>
              </div>
              <div className="h-px bg-neutral-100 mb-1" />
              {/* Menu Items */}
              <Link href="/dashboard/users" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <User className="h-4 w-4 text-neutral-400" /> My Profile
              </Link>
              <Link href="/dashboard/settings" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <Settings className="h-4 w-4 text-neutral-400" /> Settings
              </Link>
              <Link href="/dashboard/help" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <HelpCircle className="h-4 w-4 text-neutral-400" /> Help Center
              </Link>
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <ShieldCheck className="h-4 w-4 text-neutral-400" /> Security
              </button>
              <div className="h-px bg-neutral-100 my-1" />
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
