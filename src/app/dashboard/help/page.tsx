'use client';

import * as React from 'react';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import {
  Search,
  Headphones,
  BookOpen,
  Activity,
  ArrowRight,
  ExternalLink,
  Mail,
  Globe,
  Shield,
  Server,
  CheckCircle,
  Layers,
} from 'lucide-react';

/* ── Support Card ────────────────────────────────── */
const SupportCard = ({
  icon: Icon, iconBg, iconColor, title, description, cta, ctaVariant = 'outline',
}: {
  icon: React.ElementType; iconBg: string; iconColor: string;
  title: string; description: string; cta: string;
  ctaVariant?: 'outline' | 'primary';
}) => (
  <div className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col">
    <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: iconBg }}>
      <Icon className="h-6 w-6" style={{ color: iconColor }} />
    </div>
    <Typography useSerif variant="h3" className="text-[17px] font-bold text-neutral-900 tracking-tight mb-2">{title}</Typography>
    <Typography variant="small" className="text-[12px] text-neutral-500 leading-relaxed flex-1 mb-5">{description}</Typography>
    <Button variant={ctaVariant as 'outline' | 'primary'} size="sm" className="h-9 rounded-xl px-4 text-[12px] font-semibold w-fit">
      {cta} <ArrowRight className="ml-2 h-3.5 w-3.5 opacity-60" />
    </Button>
  </div>
);

/* ── Page ─────────────────────────────────────────── */
export default function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ═══ Hero Section ══════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden animate-fade-slide-up">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c2e2e] via-[#0a3a3a] to-[#0c4040]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #2dd4bf 0%, transparent 50%), radial-gradient(circle at 80% 50%, #5057f5 0%, transparent 50%)' }} />

        <div className="relative px-8 py-14 text-center">
          <Typography useSerif variant="h1" className="text-[34px] font-black text-white tracking-tight mb-3">
            How can we{' '}
            <span className="bg-gradient-to-r from-[#2dd4bf] to-[#5057f5] bg-clip-text text-transparent">help you</span>
            {' '}today?
          </Typography>
          <Typography variant="lead" className="text-[14px] text-white/50 font-medium mb-8 max-w-md mx-auto">
            Search our documentation, contact support, or check system diagnostics.
          </Typography>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation, guides, FAQs..."
              className="h-12 w-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 pl-12 pr-5 text-[14px] text-white placeholder:text-white/30 font-medium focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/30 focus:border-[#2dd4bf]/40 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ═══ Support Options ═══════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-slide-up">
        <SupportCard
          icon={Headphones}
          iconBg="#e8e9fe"
          iconColor="#5057f5"
          title="Priority Support"
          description="Direct access to your dedicated Softgen engineering team. Get expert assistance with integrations, custom configurations, and urgent issues."
          cta="Create Support Ticket"
          ctaVariant="primary"
        />
        <SupportCard
          icon={BookOpen}
          iconBg="#e6faf9"
          iconColor="#00b2a9"
          title="Knowledge Base"
          description="Read comprehensive integration guides, API documentation, best practices, and step-by-step tutorials for every feature."
          cta="Browse Documentation"
        />
        <SupportCard
          icon={Activity}
          iconBg="#fffaeb"
          iconColor="#f79009"
          title="System Diagnostics"
          description="Check real-time Shopify API sync status, webhook health, carrier API connections, and system performance metrics."
          cta="Run Diagnostics"
        />
      </div>

      {/* ═══ Quick Links ═══════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-slide-up">
        {[
          { label: 'Getting Started Guide', icon: BookOpen },
          { label: 'API Reference', icon: Server },
          { label: 'Webhook Setup', icon: Activity },
          { label: 'Security & Compliance', icon: Shield },
        ].map((link) => (
          <button key={link.label} className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 bg-white text-left hover:shadow-sm hover:border-neutral-300 transition-all">
            <link.icon className="h-4 w-4 text-neutral-400 flex-shrink-0" />
            <Typography variant="small" className="text-[12px] font-semibold text-neutral-700">{link.label}</Typography>
            <ExternalLink className="h-3 w-3 text-neutral-300 ml-auto flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* ═══ System Information ════════════════════════ */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card animate-fade-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <Server className="h-4 w-4 text-neutral-400" />
          <Typography variant="small" className="text-neutral-400 font-bold uppercase tracking-[0.12em] text-[10px]">System Information</Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vendor Details */}
          <div className="space-y-5">
            <div>
              <Typography variant="small" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Developed By</Typography>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] flex items-center justify-center shadow-lg shadow-[#14b8a6]/20">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Typography variant="small" className="text-[14px] font-bold text-neutral-900">Softgen Enterprise Solutions</Typography>
                  <Typography variant="small" className="text-[11px] text-neutral-400">Premium SaaS Development</Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="small" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Contact</Typography>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-neutral-400" />
                  <Typography variant="small" className="text-[12px] text-brand-primary font-medium">support@softgen.lk</Typography>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="h-3.5 w-3.5 text-neutral-400" />
                  <Typography variant="small" className="text-[12px] text-brand-primary font-medium">www.softgen.lk</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Version & License */}
          <div className="space-y-5">
            <div>
              <Typography variant="small" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">System Version</Typography>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/50">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[12px] font-bold text-emerald-700">Up to date</span>
                </span>
              </div>
              <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900 mt-2 block">Release Version: 1.0.0-MVP</Typography>
              <Typography variant="small" className="text-[11px] text-neutral-400 font-mono">Build 2026.03 • Next.js 14.2</Typography>
            </div>

            <div>
              <Typography variant="small" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">License</Typography>
              <div className="flex items-center gap-2.5">
                <Shield className="h-3.5 w-3.5 text-brand-primary" />
                <Typography variant="small" className="text-[12px] text-neutral-700 font-medium">Licensed to: <span className="font-bold text-neutral-900">Shofiy Commerce Pty Ltd</span></Typography>
              </div>
              <Typography variant="small" className="text-[11px] text-neutral-400 mt-1 ml-6 block">Enterprise License • Valid until Dec 2027</Typography>
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <Typography variant="small" className="text-[10px] text-neutral-400">© 2026 Softgen Enterprise Solutions. All rights reserved.</Typography>
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </div>
  );
}
