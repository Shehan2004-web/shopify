import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'large' | 'lead' | 'p' | 'small' | 'muted' | 'mono';
  useSerif?: boolean;
}

export const Typography = ({
  variant = 'p',
  useSerif = false,
  className,
  children,
  ...props
}: TypographyProps) => {
  const components = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    large: 'div',
    lead: 'p',
    p: 'p',
    small: 'small',
    muted: 'p',
    mono: 'span',
  } as const;

  const styles = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    large: 'text-xl font-bold',
    lead: 'text-xl text-brand-slate',
    p: 'leading-7',
    small: 'text-sm font-medium leading-none',
    muted: 'text-sm text-brand-slate',
    mono: 'font-mono text-sm tracking-tight',
  };

  const Component = components[variant];

  return (
    <Component
      className={cn(
        styles[variant],
        useSerif && 'font-serif tracking-normal',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
