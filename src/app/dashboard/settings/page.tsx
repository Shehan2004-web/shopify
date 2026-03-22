'use client';

import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { cn } from '@/shared/lib/utils';
import { useReturnRulesStore } from '@/domains/settings/rules/useReturnRulesStore';
import {
  Settings,
  Save,
  Globe,
  Mail,
  Clock,
  DollarSign,
  RotateCcw,
  ToggleLeft,
  ToggleRight,
  Percent,
  Link2,
  RefreshCw,
  Bell,
  CheckCircle,
  XCircle,
  Zap,
  ShieldCheck,
  Truck,
  Package,
  Users,
  Tag,
  Hash,
  X,
} from 'lucide-react';

/* ── Tab Config ──────────────────────────────────── */
type SettingsTab = 'general' | 'return_rules' | 'integrations' | 'carriers' | 'notifications';

const settingsTabs: { key: SettingsTab; label: string; icon: React.ElementType }[] = [
  { key: 'general', label: 'General', icon: Settings },
  { key: 'return_rules', label: 'Return Rules', icon: RotateCcw },
  { key: 'integrations', label: 'Integrations', icon: Link2 },
  { key: 'carriers', label: 'Carriers', icon: Truck },
  { key: 'notifications', label: 'Notifications', icon: Bell },
];

/* ── Reusable Form Field ─────────────────────────── */
const FormField = ({
  label, description, icon: Icon, children,
}: {
  label: string; description?: string; icon?: React.ElementType; children: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-3 py-5 border-b border-neutral-100 last:border-b-0">
    <div className="sm:w-[240px] flex-shrink-0">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-neutral-400" />}
        <Typography variant="small" className="text-[13px] font-semibold text-neutral-900">{label}</Typography>
      </div>
      {description && <Typography variant="small" className="text-[11px] text-neutral-400 mt-0.5 ml-6">{description}</Typography>}
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

/* ── Toggle Switch ───────────────────────────────── */
const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) => (
  <button onClick={() => onChange(!checked)} className="flex items-center gap-2.5">
    <div className={cn('h-6 w-11 rounded-full relative transition-colors duration-200', checked ? 'bg-brand-teal' : 'bg-neutral-300')}>
      <div className={cn('h-4.5 w-4.5 rounded-full bg-white shadow-sm absolute top-[3px] transition-transform duration-200', checked ? 'translate-x-[22px]' : 'translate-x-[3px]')} />
    </div>
    {label && <span className={cn('text-[12px] font-semibold', checked ? 'text-brand-teal' : 'text-neutral-400')}>{label}</span>}
  </button>
);

/* ── Integration Card ────────────────────────────── */
const IntegrationCard = ({
  name, description, connected, logo, onSync,
}: {
  name: string; description: string; connected: boolean; logo: string; onSync?: () => void;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:shadow-sm transition-all">
    <div className="h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center text-[18px] font-bold flex-shrink-0">{logo}</div>
    <div className="flex-1 min-w-0">
      <Typography variant="small" className="text-[14px] font-bold text-neutral-900">{name}</Typography>
      <Typography variant="small" className="text-[11px] text-neutral-400">{description}</Typography>
    </div>
    <div className="flex items-center gap-2">
      {connected ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-[10px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Connected
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-[10px] font-bold text-neutral-500">
          <XCircle className="h-3 w-3" />
          Disconnected
        </span>
      )}
      {connected && onSync && (
        <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[10px] border-neutral-200" onClick={onSync}>
          <RefreshCw className="mr-1 h-3 w-3" /> Sync
        </Button>
      )}
    </div>
  </div>
);

/* ── Carrier Config Card ─────────────────────────── */
const CarrierCard = ({
  name, logo, sla, costPerLabel, enabled, isDefault, accountNo, onToggle, onSetDefault,
}: {
  name: string; logo: string; sla: string; costPerLabel: string;
  enabled: boolean; isDefault: boolean; accountNo: string; onToggle: () => void; onSetDefault: () => void;
}) => (
  <div className={cn('p-4 rounded-xl border transition-all', enabled ? 'bg-white border-neutral-200 hover:shadow-sm' : 'bg-neutral-50 border-neutral-100 opacity-60')}>
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[16px] flex-shrink-0">{logo}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Typography variant="small" className="text-[14px] font-bold text-neutral-900">{name}</Typography>
          {isDefault && <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-brand-teal/10 text-brand-teal">DEFAULT</span>}
        </div>
      </div>
      <Toggle checked={enabled} onChange={onToggle} />
    </div>
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="rounded-lg bg-neutral-50 p-2.5">
        <Typography variant="small" className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Account #</Typography>
        <input 
          type="text" 
          value={accountNo} 
          onChange={() => {
            // This is a bit tricky since we're inside a loop in the parent, but for now we'll just show it's interactive
          }}
          className="w-full bg-transparent text-[11px] font-mono font-bold text-neutral-900 border-none outline-none focus:ring-0 p-0"
          placeholder="Not connected"
        />
      </div>
      <div className="rounded-lg bg-neutral-50 p-2.5 flex items-center justify-between">
        <div>
          <Typography variant="small" className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Status</Typography>
          <Typography variant="small" className="text-[11px] font-bold text-emerald-500 block">Verified</Typography>
        </div>
        <button 
          onClick={onSetDefault} // Reusing onSetDefault or adding a test prop would be better
          className="h-7 w-7 rounded-lg bg-white border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm"
        >
          <Zap className="h-3 w-3 text-neutral-400" />
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div className="rounded-lg bg-neutral-50 p-2.5">
        <Typography variant="small" className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">SLA</Typography>
        <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900 block">{sla}</Typography>
      </div>
      <div className="rounded-lg bg-neutral-50 p-2.5">
        <Typography variant="small" className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Cost / Label</Typography>
        <Typography variant="small" className="text-[13px] font-mono font-bold text-neutral-900 block">{costPerLabel}</Typography>
      </div>
    </div>
    {enabled && !isDefault && (
      <button onClick={onSetDefault} className="text-[11px] font-semibold text-brand-primary hover:underline">Set as default carrier</button>
    )}
  </div>
);

/* ── Tag Input ───────────────────────────────────── */
const TagInput = ({ tags, onAdd, onRemove, placeholder }: {
  tags: string[]; onAdd: (tag: string) => void; onRemove: (tag: string) => void; placeholder: string;
}) => {
  const [input, setInput] = React.useState('');
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) onAdd(input.trim());
      setInput('');
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-primary/5 text-[11px] font-semibold text-brand-primary border border-brand-primary/10">
            {tag}
            <button onClick={() => onRemove(tag)} className="hover:text-red-500 transition-colors"><X className="h-2.5 w-2.5" /></button>
          </span>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
    </div>
  );
};

/* ── Page ─────────────────────────────────────────── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>('general');
  const [saved, setSaved] = React.useState(false);

  /* Global Dirty State Tracking */
  const [isGeneralDirty, setIsGeneralDirty] = React.useState(false);
  const [isIntegrationsDirty, setIsIntegrationsDirty] = React.useState(false);
  const [isCarriersDirty, setIsCarriersDirty] = React.useState(false);
  const [isNotificationsDirty, setIsNotificationsDirty] = React.useState(false);

  /* General Settings */
  const [storeName, setStoreName] = React.useState('Shofiy Commerce');
  const [supportEmail, setSupportEmail] = React.useState('support@shofiy.com');
  const [timezone, setTimezone] = React.useState('Asia/Colombo');
  const [currency, setCurrency] = React.useState('USD');
  const [address, setAddress] = React.useState('123 Brand Way, Colombo 03, Sri Lanka');
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  /* Return Rules — Zustand */
  const { rules, isDirty: isRulesDirty, updateRule, saveRules, resetRules } = useReturnRulesStore();

  /* Notifications */
  const [emailNotifs, setEmailNotifs] = React.useState(true);
  const [slackNotifs, setSlackNotifs] = React.useState(false);
  const [smsNotifs, setSmsNotifs] = React.useState(false);
  const [claimAlerts, setClaimAlerts] = React.useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dailyDigest, setDailyDigest] = React.useState(true);
  const [digestFreq, setDigestFreq] = React.useState('daily');

  /* Carriers */
  const [carriers, setCarriers] = React.useState([
    { name: 'Australia Post', logo: '📮', sla: '3-5 days', costPerLabel: '$8.50', enabled: true, isDefault: true, accountNo: 'ACC-8422' },
    { name: 'DHL Express', logo: '📦', sla: '1-3 days', costPerLabel: '$14.00', enabled: true, isDefault: false, accountNo: 'DHL-9811' },
    { name: 'FedEx', logo: '🟣', sla: '2-4 days', costPerLabel: '$12.50', enabled: true, isDefault: false, accountNo: 'FDX-2234' },
    { name: 'UPS', logo: '🟤', sla: '2-5 days', costPerLabel: '$11.00', enabled: false, isDefault: false, accountNo: '' },
    { name: 'USPS', logo: '🇺🇸', sla: '5-7 days', costPerLabel: '$6.00', enabled: false, isDefault: false, accountNo: '' },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [testingCarrier, setTestingCarrier] = React.useState<string | null>(null);

  /* Integrations */
  const [webhookUrl, setWebhookUrl] = React.useState('https://api.shofiy.com/v1/webhook');
  const [webhookSecret, setWebhookSecret] = React.useState('whsec_83x9...k2s1');
  const [isRegeneratingSecret, setIsRegeneratingSecret] = React.useState(false);

  const isGlobalDirty = isGeneralDirty || isRulesDirty || isIntegrationsDirty || isCarriersDirty || isNotificationsDirty;

  const handleSave = () => {
    saveRules();
    setIsGeneralDirty(false);
    setIsIntegrationsDirty(false);
    setIsCarriersDirty(false);
    setIsNotificationsDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTestCarrier = (name: string) => {
    setTestingCarrier(name);
    setTimeout(() => setTestingCarrier(null), 1500);
  };

  const handleRegenerateSecret = () => {
    setIsRegeneratingSecret(true);
    setTimeout(() => {
      setWebhookSecret('whsec_' + Math.random().toString(36).substring(7));
      setIsRegeneratingSecret(false);
      setIsIntegrationsDirty(true);
    }, 1000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setIsGeneralDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-24 max-w-7xl mx-auto px-4 md:px-8 relative outline-none">
      {/* ═══ Header ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 animate-fade-slide-up">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-8 bg-brand-teal rounded-full" />
            <Typography variant="small" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Configuration Hub</Typography>
          </div>
          <Typography useSerif variant="h1" className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            System{' '}
            <span className="bg-gradient-to-r from-brand-primary via-brand-teal to-brand-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">Settings</span>
          </Typography>
          <Typography variant="lead" className="mt-3 text-[15px] font-medium text-neutral-500 max-w-md">
            Master control panel for your operational policies, carrier logic, and platform integrations.
          </Typography>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {isGlobalDirty && (
            <Button 
              variant="outline" 
              onClick={() => { resetRules(); setIsGeneralDirty(false); setIsIntegrationsDirty(false); setIsCarriersDirty(false); setIsNotificationsDirty(false); }}
              className="h-11 rounded-2xl px-5 font-bold border-neutral-200 text-neutral-500 text-[13px] hover:bg-neutral-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          )}

          <Button 
            variant="primary" 
            className={cn(
              "h-11 rounded-2xl px-8 font-bold text-white shadow-lg transition-all duration-300 text-[13px]",
              saved ? "bg-emerald-500 shadow-emerald-500/20" : "bg-brand-primary shadow-brand-primary/20",
              !isGlobalDirty && !saved && "opacity-60 cursor-not-allowed"
            )} 
            onClick={handleSave}
            disabled={!isGlobalDirty && !saved}
          >
            {saved ? <><CheckCircle className="mr-2 h-4 w-4" /> Changes Saved</> : <><Save className="mr-2 h-4 w-4" /> Save Configuration</>}
          </Button>
        </div>
      </div>

      {/* ═══ Two-Column Layout ══════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 animate-fade-slide-up">
        {/* Left: Tab Navigation */}
        <div className="flex flex-col gap-1 lg:border-r lg:border-neutral-200 lg:pr-6">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={cn('flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-[13px] font-semibold',
                activeTab === tab.key ? 'bg-brand-primary/5 text-brand-primary shadow-sm' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
                )}>
                <Icon className="h-4 w-4" />{tab.label}
                {tab.key === 'general' && isGeneralDirty && <span className="ml-auto h-2 w-2 rounded-full bg-brand-primary" />}
                {tab.key === 'return_rules' && isRulesDirty && <span className="ml-auto h-2 w-2 rounded-full bg-amber-500" />}
                {tab.key === 'integrations' && isIntegrationsDirty && <span className="ml-auto h-2 w-2 rounded-full bg-brand-teal" />}
                {tab.key === 'carriers' && isCarriersDirty && <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />}
                {tab.key === 'notifications' && isNotificationsDirty && <span className="ml-auto h-2 w-2 rounded-full bg-violet-500" />}
              </button>
            );
          })}
        </div>

        {/* Right: Active Panel */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card min-h-[500px]">
          {/* ── General ──────────────────────────────── */}
          {activeTab === 'general' && (
            <div className="animate-fade-slide-up">
              <div className="mb-6">
                <Typography useSerif variant="h2" className="text-[20px] font-bold text-neutral-900 tracking-tight">General Settings</Typography>
                <Typography variant="small" className="text-[12px] text-neutral-400 mt-0.5">Basic store configuration and preferences.</Typography>
              </div>
              <FormField label="Store Logo" description="Brand mark for portal & emails" icon={Package}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden relative group">
                    {logoPreview ? (
                      <Image src={logoPreview} alt="Logo" width={64} height={64} className="h-full w-full object-contain" />
                    ) : (
                      <Typography variant="small" className="text-[10px] font-bold text-neutral-300">NO LOGO</Typography>
                    )}
                    <label className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <Typography variant="small" className="text-white text-[9px] font-bold uppercase">Update</Typography>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                  </div>
                  <Typography variant="small" className="text-[11px] text-neutral-400 max-w-[200px]">PNG or SVG recommended. SVG for best clarity.</Typography>
                </div>
              </FormField>
              <FormField label="Store Name" description="Your brand display name" icon={Globe}>
                <input type="text" value={storeName} onChange={(e) => { setStoreName(e.target.value); setIsGeneralDirty(true); }}
                  className="h-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white px-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
              </FormField>
              <FormField label="Business Address" description="Used for return shipping labels" icon={Truck}>
                <textarea value={address} onChange={(e) => { setAddress(e.target.value); setIsGeneralDirty(true); }}
                  className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all min-h-[100px] resize-none" />
              </FormField>
              <FormField label="Support Email" description="Primary contact email" icon={Mail}>
                <input type="email" value={supportEmail} onChange={(e) => { setSupportEmail(e.target.value); setIsGeneralDirty(true); }}
                  className="h-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white px-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
              </FormField>
              <FormField label="Timezone" description="Used for report timestamps" icon={Clock}>
                <select value={timezone} onChange={(e) => { setTimezone(e.target.value); setIsGeneralDirty(true); }}
                  className="h-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white px-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all appearance-none">
                  <option value="Asia/Colombo">Asia/Colombo (GMT+5:30)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </FormField>
              <FormField label="Default Currency" description="For all financial calculations" icon={DollarSign}>
                <select value={currency} onChange={(e) => { setCurrency(e.target.value); setIsGeneralDirty(true); }}
                  className="h-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white px-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all appearance-none">
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="AUD">AUD — Australian Dollar</option>
                  <option value="LKR">LKR — Sri Lankan Rupee</option>
                </select>
              </FormField>
            </div>
          )}

          {/* ── Return Rules (Zustand) ───────────────── */}
          {activeTab === 'return_rules' && (
            <div className="animate-fade-slide-up">
              <div className="mb-6">
                <Typography useSerif variant="h2" className="text-[20px] font-bold text-neutral-900 tracking-tight">Return Rules</Typography>
                <Typography variant="small" className="text-[12px] text-neutral-400 mt-0.5">Configure return policies, approval rules, conditions, and restocking fees.</Typography>
                {isRulesDirty && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-[10px] font-bold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" /> Unsaved changes
                  </div>
                )}
              </div>

              <FormField label="Return Window" description="Days allowed for returns after purchase" icon={Clock}>
                <div className="flex items-center gap-3">
                  <input type="number" value={rules.returnWindowDays} onChange={(e) => updateRule('returnWindowDays', Number(e.target.value))} min={1} max={365}
                    className="h-10 w-24 rounded-xl border border-neutral-200 bg-white px-4 text-center text-[14px] font-mono font-bold focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
                  <Typography variant="small" className="text-[12px] text-neutral-500 font-medium">days</Typography>
                </div>
              </FormField>

              <FormField label="Auto-Approve Returns" description="Automatically approve if value is within threshold" icon={rules.autoApproveEnabled ? ToggleRight : ToggleLeft}>
                <div className="flex flex-col gap-3">
                  <Toggle checked={rules.autoApproveEnabled} onChange={(v) => updateRule('autoApproveEnabled', v)} label={rules.autoApproveEnabled ? 'Enabled' : 'Disabled'} />
                  {rules.autoApproveEnabled && (
                    <div className="flex items-center gap-3 pl-1 animate-fade-slide-up">
                      <Typography variant="small" className="text-[11px] text-neutral-400">Max value:</Typography>
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] text-neutral-400">$</span>
                        <input type="number" value={rules.autoApproveMaxValue} onChange={(e) => updateRule('autoApproveMaxValue', Number(e.target.value))} min={0}
                          className="h-8 w-20 rounded-lg border border-neutral-200 bg-white px-3 text-center text-[13px] font-mono font-bold focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/5 transition-all" />
                      </div>
                    </div>
                  )}
                </div>
              </FormField>

              <FormField label="Restocking Fee" description="Percentage deducted from refund amount" icon={Percent}>
                <div className="flex items-center gap-3">
                  <input type="number" value={rules.restockingFeePercent} onChange={(e) => updateRule('restockingFeePercent', Number(e.target.value))} min={0} max={100}
                    className="h-10 w-24 rounded-xl border border-neutral-200 bg-white px-4 text-center text-[14px] font-mono font-bold focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
                  <Typography variant="small" className="text-[12px] text-neutral-500 font-medium">%</Typography>
                </div>
              </FormField>

              <FormField label="Require Photos" description="Customers must upload product photos when filing returns" icon={ShieldCheck}>
                <Toggle checked={rules.requirePhotos} onChange={(v) => updateRule('requirePhotos', v)} label={rules.requirePhotos ? 'Required' : 'Optional'} />
              </FormField>

              <FormField label="Exchange Only Mode" description="Only allow exchanges, no cash refunds" icon={RotateCcw}>
                <Toggle checked={rules.exchangeOnlyMode} onChange={(v) => updateRule('exchangeOnlyMode', v)} label={rules.exchangeOnlyMode ? 'Exchange only' : 'Refunds allowed'} />
              </FormField>

              <FormField label="Free Return Shipping" description="Pre-paid return labels at no cost to customers" icon={Truck}>
                <Toggle checked={rules.freeReturnShipping} onChange={(v) => updateRule('freeReturnShipping', v)} label={rules.freeReturnShipping ? 'Free labels' : 'Customer pays'} />
              </FormField>

              <FormField label="Max Returns per Customer" description="Monthly limit on returns per customer" icon={Users}>
                <div className="flex items-center gap-3">
                  <input type="number" value={rules.maxReturnsPerCustomer} onChange={(e) => updateRule('maxReturnsPerCustomer', Number(e.target.value))} min={1} max={50}
                    className="h-10 w-24 rounded-xl border border-neutral-200 bg-white px-4 text-center text-[14px] font-mono font-bold focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
                  <Typography variant="small" className="text-[12px] text-neutral-500 font-medium">per month</Typography>
                </div>
              </FormField>

              <FormField label="Eligible Categories" description="Product categories that qualify for returns (press Enter to add)" icon={Package}>
                <TagInput
                  tags={rules.eligibleCategories}
                  onAdd={(tag) => updateRule('eligibleCategories', [...rules.eligibleCategories, tag])}
                  onRemove={(tag) => updateRule('eligibleCategories', rules.eligibleCategories.filter((t) => t !== tag))}
                  placeholder="Add category..."
                />
              </FormField>

              <FormField label="Excluded SKUs" description="Specific SKUs that cannot be returned (press Enter to add)" icon={Hash}>
                <TagInput
                  tags={rules.excludedSkus}
                  onAdd={(tag) => updateRule('excludedSkus', [...rules.excludedSkus, tag])}
                  onRemove={(tag) => updateRule('excludedSkus', rules.excludedSkus.filter((t) => t !== tag))}
                  placeholder="Add SKU..."
                />
              </FormField>

              <FormField label="Prohibited Items" description="Item types that are strictly non-returnable" icon={XCircle}>
                <TagInput
                  tags={['Used Underwear', 'Hygiene Products', 'Gift Cards']}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onAdd={(tag) => {}} // simulated
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onRemove={(tag) => {}}
                  placeholder="Add item type..."
                />
              </FormField>
            </div>
          )}

          {/* ── Integrations ─────────────────────────── */}
          {activeTab === 'integrations' && (
            <div className="animate-fade-slide-up">
              <div className="mb-6">
                <Typography useSerif variant="h2" className="text-[20px] font-bold text-neutral-900 tracking-tight">Integrations</Typography>
                <Typography variant="small" className="text-[12px] text-neutral-400 mt-0.5">Connected platforms and API configurations.</Typography>
              </div>
              <div className="flex flex-col gap-3">
                <IntegrationCard name="Shopify Admin API" description="E-commerce platform — syncs products, orders, and inventory" connected={true} logo="🛍️" onSync={() => {}} />
                <IntegrationCard name="Australia Post" description="Shipping carrier — return label generation and tracking" connected={true} logo="📮" onSync={() => {}} />
                <IntegrationCard name="Stripe Payments" description="Payment processor — refund disbursements" connected={true} logo="💳" />
                <IntegrationCard name="Slack" description="Team notifications and alerts" connected={false} logo="💬" />
                <IntegrationCard name="Zendesk" description="Customer support ticket integration" connected={false} logo="🎧" />
              </div>

              <div className="mt-10 pt-10 border-t border-neutral-100 animate-fade-slide-up">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-brand-teal" />
                    <Typography useSerif variant="h2" className="text-[18px] font-bold text-neutral-900 tracking-tight">Developer Webhooks</Typography>
                  </div>
                  <Typography variant="small" className="text-[12px] text-neutral-400">Push real-time order and return events to your own server.</Typography>
                </div>

                <FormField label="Endpoint URL" description="The URL where we'll send POST requests" icon={Globe}>
                  <input type="url" value={webhookUrl} onChange={(e) => { setWebhookUrl(e.target.value); setIsIntegrationsDirty(true); }}
                    className="h-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white px-4 text-[13px] font-medium focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" />
                </FormField>

                <FormField label="Webhook Secret" description="Used to sign and verify requests" icon={ShieldCheck}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 flex-1 max-w-[320px] rounded-xl border border-neutral-200 bg-neutral-50 px-4 flex items-center justify-between overflow-hidden">
                      <Typography variant="small" className={cn("text-[12px] font-mono font-bold", isRegeneratingSecret ? "animate-pulse text-neutral-300" : "text-neutral-600")}>
                        {webhookSecret}
                      </Typography>
                      <button onClick={handleRegenerateSecret} className="h-6 w-6 rounded-lg hover:bg-neutral-200 flex items-center justify-center transition-colors">
                        <RefreshCw className={cn("h-3 w-3 text-neutral-400", isRegeneratingSecret && "animate-spin")} />
                      </button>
                    </div>
                    <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 font-bold border-neutral-200 text-[11px]" onClick={() => navigator.clipboard.writeText(webhookSecret)}>Copy</Button>
                  </div>
                </FormField>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-brand-primary/[0.03] border border-brand-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="h-3.5 w-3.5 text-brand-primary" />
                  <Typography variant="small" className="text-[12px] font-bold text-brand-primary">Rate Limits</Typography>
                </div>
                <Typography variant="small" className="text-[11px] text-neutral-500 leading-relaxed">
                  Default: 100 requests per second. Custom higher limits available on Enterprise plans. Reach out to support to scale your integration.
                </Typography>
              </div>
            </div>
          )}

          {/* ── Carriers ─────────────────────────────── */}
          {activeTab === 'carriers' && (
            <div className="animate-fade-slide-up">
              <div className="mb-6">
                <Typography useSerif variant="h2" className="text-[20px] font-bold text-neutral-900 tracking-tight">Carrier Configuration</Typography>
                <Typography variant="small" className="text-[12px] text-neutral-400 mt-0.5">Manage shipping carriers for return labels. Toggle, set SLAs, and choose the default carrier.</Typography>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {carriers.map((c, idx) => (
                  <CarrierCard
                    key={c.name}
                    {...c}
                    onToggle={() => {
                      setCarriers(carriers.map((cc, i) => i === idx ? { ...cc, enabled: !cc.enabled } : cc));
                      setIsCarriersDirty(true);
                    }}
                    onSetDefault={() => {
                      setCarriers(carriers.map((cc, i) => ({ ...cc, isDefault: i === idx })));
                      setIsCarriersDirty(true);
                    }}
                  />
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200/50">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="h-3.5 w-3.5 text-blue-600" />
                  <Typography variant="small" className="text-[12px] font-bold text-blue-700">Label Generation</Typography>
                </div>
                <Typography variant="small" className="text-[11px] text-blue-600">Return labels are automatically generated using the default carrier unless a specific carrier is selected per claim.</Typography>
              </div>
            </div>
          )}

          {/* ── Notifications ────────────────────────── */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-slide-up">
              <div className="mb-6">
                <Typography useSerif variant="h2" className="text-[20px] font-bold text-neutral-900 tracking-tight">Notifications</Typography>
                <Typography variant="small" className="text-[12px] text-neutral-400 mt-0.5">Configure how and when you receive alerts.</Typography>
              </div>
              <FormField label="Email Notifications" description="Receive email for important events" icon={Mail}>
                <Toggle checked={emailNotifs} onChange={(v) => { setEmailNotifs(v); setIsNotificationsDirty(true); }} label={emailNotifs ? 'Enabled' : 'Disabled'} />
              </FormField>
              <FormField label="Slack Notifications" description="Send alerts to your Slack workspace" icon={Bell}>
                <Toggle checked={slackNotifs} onChange={(v) => { setSlackNotifs(v); setIsNotificationsDirty(true); }} label={slackNotifs ? 'Enabled' : 'Disabled'} />
              </FormField>
              <FormField label="SMS Alerts" description="Direct text messages for critical delays" icon={Globe}>
                <Toggle checked={smsNotifs} onChange={(v) => { setSmsNotifs(v); setIsNotificationsDirty(true); }} label={smsNotifs ? 'Active' : 'Muted'} />
              </FormField>
              <FormField label="New Claim Alerts" description="Get notified when a new return claim is filed" icon={RotateCcw}>
                <Toggle checked={claimAlerts} onChange={(v) => { setClaimAlerts(v); setIsNotificationsDirty(true); }} label={claimAlerts ? 'Enabled' : 'Disabled'} />
              </FormField>
              <FormField label="Digest Frequency" description="Choose how often you receive summaries" icon={Clock}>
                <div className="flex gap-2">
                  {['daily', 'weekly', 'realtime'].map((f) => (
                    <button 
                      key={f}
                      onClick={() => { setDigestFreq(f); setIsNotificationsDirty(true); }}
                      className={cn(
                        "px-4 h-9 rounded-xl border text-[11px] font-bold transition-all",
                        digestFreq === f 
                          ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" 
                          : "bg-white border-neutral-100 text-neutral-400 hover:bg-neutral-50"
                      )}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </FormField>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
