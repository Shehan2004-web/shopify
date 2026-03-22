import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

const Card = ({ className, hoverable = false, glass = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white shadow-card',
        hoverable &&
          'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
        glass && 'glass border-white/20',
        className
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'text-lg font-bold leading-none tracking-tight text-neutral-900',
      className
    )}
    {...props}
  />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent };
