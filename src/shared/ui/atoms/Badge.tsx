import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { LucideIcon, Check, X, Clock, AlertCircle, Info, Zap } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand-teal' | 'brand-orange';
  dot?: boolean;
  icon?: LucideIcon;
  pulse?: boolean;
}

const variantConfig = {
  success: {
    bg: 'bg-[#ecfdf3]',
    text: 'text-[#027a48]',
    border: 'border-[#abefc6]',
    dotColor: 'bg-[#12b76a]',
    defaultIcon: Check,
  },
  warning: {
    bg: 'bg-[#fffaeb]',
    text: 'text-[#b54708]',
    border: 'border-[#fedf89]',
    dotColor: 'bg-[#f79009]',
    defaultIcon: Clock,
  },
  error: {
    bg: 'bg-[#fef3f2]',
    text: 'text-[#b42318]',
    border: 'border-[#fecdca]',
    dotColor: 'bg-[#f04438]',
    defaultIcon: X,
  },
  info: {
    bg: 'bg-[#f0f9ff]',
    text: 'text-[#026aa2]',
    border: 'border-[#b9e6fe]',
    dotColor: 'bg-[#0086c9]',
    defaultIcon: Info,
  },
  neutral: {
    bg: 'bg-[#f9fafb]',
    text: 'text-[#344054]',
    border: 'border-[#eaecf0]',
    dotColor: 'bg-[#667085]',
    defaultIcon: AlertCircle,
  },
  'brand-teal': {
    bg: 'bg-[#f0fdf9]',
    text: 'text-[#00b2a9]',
    border: 'border-[#99f6e4]',
    dotColor: 'bg-[#00b2a9]',
    defaultIcon: Zap,
  },
  'brand-orange': {
    bg: 'bg-[#fff7ed]',
    text: 'text-[#ff5c26]',
    border: 'border-[#ffedd5]',
    dotColor: 'bg-[#ff5c26]',
    defaultIcon: AlertCircle,
  },
};

const Badge = ({
  className,
  variant = 'neutral',
  dot = false,
  icon: CustomIcon,
  pulse = false,
  children,
  ...props
}: BadgeProps) => {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-[3px] text-[11px] font-semibold transition-all duration-200',
        config.bg,
        config.text,
        config.border,
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative mr-1.5">
          <span className={cn('block h-1.5 w-1.5 rounded-full', config.dotColor)} />
          {pulse && (
            <span
              className={cn(
                'absolute inset-0 h-1.5 w-1.5 animate-ping rounded-full opacity-75',
                config.dotColor
              )}
            />
          )}
        </span>
      )}
      {CustomIcon && (
        <CustomIcon className="mr-1 h-3 w-3" />
      )}
      {children}
    </div>
  );
};

export { Badge };
