export type EmailStatus = 'delivered' | 'bounced' | 'pending';

export interface EmailTrigger {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  subject: string;
  body: string;
}

export interface EmailLog {
  id: string;
  sentAt: string;
  recipient: string;
  triggerName: string;
  status: EmailStatus;
}

export interface EmailMetrics {
  totalSent: number;
  openRate: number;
  bounceRate: number;
  sentChange: number;
  openChange: number;
  bounceChange: number;
}
