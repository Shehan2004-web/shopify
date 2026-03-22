'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { cn } from '@/shared/lib/utils';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Chrome as Google, 
  ShoppingBag,
  Eye,
  EyeOff,
  CheckCircle2,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react';

/* ── Components ──────────────────────────────────── */

const FeatureItem = ({ icon: Icon, title, desc, delay }: { icon: React.ElementType, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-4"
  >
    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 shadow-inner backdrop-blur-md">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <Typography variant="small" className="text-[14px] font-bold text-white mb-0.5">{title}</Typography>
      <Typography variant="small" className="text-[12px] text-white/60 leading-relaxed">{desc}</Typography>
    </div>
  </motion.div>
);

const AuthInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  icon: Icon,
  value,
  onChange,
  showPasswordToggle = false
}: { 
  label: string; 
  type?: string; 
  placeholder: string; 
  icon: React.ElementType;
  value: string;
  onChange: (v: string) => void;
  showPasswordToggle?: boolean;
}) => {
  const [show, setShow] = React.useState(false);
  const isPassword = type === 'password';
  const finalType = isPassword ? (show ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 transition-all">
      <label className="text-[11px] font-black uppercase tracking-wider text-neutral-400 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-primary transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <input
          type={finalType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 bg-neutral-50/50 border border-neutral-200 rounded-xl pl-11 pr-12 text-[14px] font-medium transition-all focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none"
        />
        {showPasswordToggle && isPassword && (
          <button 
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────── */

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1200);
  };

  return (
    <main className="h-screen w-full flex bg-white font-sans selection:bg-brand-primary/10 selection:text-brand-primary overflow-hidden">
      {/* ── Left: Marketing / Visual ── */}
      <section 
        className="hidden lg:flex w-[45%] p-16 relative flex-col justify-between overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/login-bg.png)' }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-2xl">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <Typography useSerif className="text-[20px] font-black text-white tracking-tight">Shofiy</Typography>
          </div>

          <div className="max-w-md">
            <Typography useSerif className="text-[42px] font-black text-white leading-[1.1] mb-6 tracking-tight">
              Scale your business with <span className="text-brand-teal">intelligence.</span>
            </Typography>
            <Typography className="text-white/70 text-[16px] font-medium leading-relaxed mb-12">
              The all-in-one automation platform for modern e-commerce stores. Manage returns, logistics, and customer insights from a single glass-paneled dashboard.
            </Typography>

            <div className="flex flex-col gap-8">
              <FeatureItem 
                icon={TrendingUp} 
                title="Advanced Analytics" 
                desc="Real-time data visualization and predictive insights for your sales." 
                delay={0.1}
              />
              <FeatureItem 
                icon={Zap} 
                title="Automated Workflows" 
                desc="Reduce manual tasks by 60% with our smart return processing engine." 
                delay={0.2}
              />
              <FeatureItem 
                icon={Globe} 
                title="Global Scale" 
                desc="Integrated with 50+ international carriers and payments." 
                delay={0.3}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
           <Typography variant="small" className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">© 2026 Shofiy Inc.</Typography>
           <div className="flex gap-4 text-white/40 text-[11px] font-bold uppercase tracking-widest">
             <button className="hover:text-white transition-colors">Privacy</button>
             <span>•</span>
             <button className="hover:text-white transition-colors">Security</button>
           </div>
        </div>
      </section>

      {/* ── Right: Auth Form ── */}
      <section className="flex-1 flex items-center justify-center p-8 md:p-16 relative bg-[#fdfdfd]">
        <div className="w-full max-w-[380px] animate-fade-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-brand-primary flex items-center justify-center text-white">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <Typography useSerif className="text-[18px] font-black text-neutral-900 tracking-tight">Shofiy</Typography>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <Typography useSerif variant="h1" className="text-[34px] font-black text-neutral-900 tracking-tight mb-2">Sign in</Typography>
            <Typography className="text-[14px] text-neutral-500 font-medium">Welcome back! Please enter your details.</Typography>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <AuthInput 
              label="Email Address" 
              placeholder="name@company.com" 
              icon={Mail} 
              value={email}
              onChange={setEmail}
            />
            <AuthInput 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
              value={password}
              onChange={setPassword}
              showPasswordToggle
            />

            <div className="flex items-center justify-between -mt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20 cursor-pointer transition-all" />
                <span className="text-[12px] font-bold text-neutral-500 group-hover:text-neutral-700">Remember for 30 days</span>
              </label>
              <button type="button" className="text-[12px] font-bold text-brand-primary hover:underline transition-all">Forgot password?</button>
            </div>

            <Button 
              variant="primary" 
              className={cn(
                "h-12 rounded-xl font-black bg-neutral-900 text-white hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-neutral-900/5",
                isLoading && "opacity-80 pointer-events-none"
              )}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100" /></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black text-neutral-300 tracking-[0.2em]"><span className="bg-[#fdfdfd] px-4">OR</span></div>
            </div>

            <button type="button" className="h-11 rounded-xl border border-neutral-200 font-bold text-neutral-700 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3">
              <Google className="h-4 w-4 text-neutral-400" />
              <span className="text-[13px]">Sign in with Google</span>
            </button>
          </form>

          {/* Security Labels */}
          <div className="mt-16 pt-8 border-t border-neutral-100 flex items-center justify-center gap-6 opacity-30 grayscale">
             <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /><span className="text-[9px] font-bold uppercase tracking-widest">ISO 27001</span></div>
             <div className="h-4 w-[1px] bg-neutral-200" />
             <div className="flex items-center gap-1.5"><Zap className="h-4 w-4" /><span className="text-[9px] font-bold uppercase tracking-widest">Global CDN</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
