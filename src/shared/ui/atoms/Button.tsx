import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'teal' | 'orange' | 'deny' | 'approve';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm shadow-brand-primary/20',
      secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-sm shadow-brand-secondary/20',
      teal: 'bg-brand-teal text-white hover:bg-brand-teal/90 shadow-sm shadow-brand-teal/20',
      orange: 'bg-brand-orange text-white hover:bg-brand-orange/90 shadow-sm shadow-brand-orange/20',
      outline: 'border border-[#e2e4e8] text-brand-slate hover:bg-gray-50',
      ghost: 'text-brand-slate hover:bg-gray-50',
      approve: 'bg-[#ecfdf3] text-[#027a48] hover:bg-[#d1fadf] font-bold border border-[#abefc6]',
      deny: 'bg-[#fef3f2] text-[#b42318] hover:bg-[#fee4e2] font-bold border border-[#fecdca]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
