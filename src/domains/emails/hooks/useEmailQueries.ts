import { useQuery } from '@tanstack/react-query';
import { EmailTrigger, EmailLog, EmailMetrics } from '../types';

const MOCK_TRIGGERS: EmailTrigger[] = [
  {
    id: 'return_initiated',
    name: 'Return Initiated',
    description: 'Sent when a customer starts a return request.',
    isActive: true,
    subject: "We've received your return request for Order {{order_id}}",
    body: `<h1>Return Request Received</h1>
<p>Hi {{customer_name}},</p>
<p>We're just letting you know that we've received your return request for <b>Order {{order_id}}</b>. Our team is currently reviewing the details to ensure everything is in line with our policy.</p>
<h3>What happens next?</h3>
<p>You’ll receive another email within 24-48 hours once your request is approved. At that point, we’ll provide you with detailed instructions on how to send your items back to us.</p>
<p>Thank you for your patience!</p>
<p>Best regards,<br/>The {{store_name}} Team</p>`,
  },
  {
    id: 'return_approved',
    name: 'Return Approved',
    description: 'Sent when a return request is approved by staff.',
    isActive: true,
    subject: 'Your return for Order {{order_id}} has been approved!',
    body: `<h1>Your Return is Approved!</h1>
<p>Great news, {{customer_name}}!</p>
<p>Your return request for <b>Order {{order_id}}</b> has been officially approved. You're now ready to send your items back to us.</p>
<h3>Next Steps:</h3>
<ol>
  <li>Pack your items securely in the original packaging if possible.</li>
  <li>Use the link below to download and print your prep-paid shipping label.</li>
  <li>Drop off the package at any authorized shipping center.</li>
</ol>
<p><a href="#">Download Shipping Label</a></p>
<p>Once we receive and inspect your return, we will process your refund of <b>{{refund_amount}}</b> or issue store credit as requested.</p>
<p>Best,<br/>The {{store_name}} Team</p>`,
  },
  {
    id: 'return_rejected',
    name: 'Return Rejected',
    description: 'Sent when a return request does not meet our policies.',
    isActive: false,
    subject: 'Update regarding your return request for Order {{order_id}}',
    body: `<h1>Update on your Return Request</h1>
<p>Hi {{customer_name}},</p>
<p>Thank you for your patience while we reviewed your return request for <b>Order {{order_id}}</b>.</p>
<p>Unfortunately, we are unable to approve your request at this time for the following reason:</p>
<blockquote style="border-left: 4px solid #fecaca; padding-left: 16px; color: #ef4444; font-style: italic;">
  {{rejection_reason}}
</blockquote>
<p>We understand this might be disappointing. If you believe there has been a mistake or if you'd like to provide more information, please feel free to reply to this email or contact our support team.</p>
<p>Sincerely,<br/>The {{store_name}} Team</p>`,
  },
  {
    id: 'credit_issued',
    name: 'Store Credit Issued',
    description: 'Sent when store credit is added to a customer account.',
    isActive: true,
    subject: 'Your Store Credit for Order {{order_id}} is ready! 🎁',
    body: `<h1>Your Store Credit is Ready!</h1>
<p>Hi {{customer_name}},</p>
<p>Your return has been processed, and we've issued <b>{{refund_amount}}</b> in store credit to your account!</p>
<p>You can use this credit on any future purchase at {{store_name}}. Simply enter the code below at checkout:</p>
<div style="background: #f8fafc; padding: 24px; border-radius: 16px; border: 2px dashed #cbd5e1; text-align: center; font-family: monospace; font-size: 24px; font-weight: 900; color: #0c2e2e; margin: 24px 0;">
  {{credit_code}}
</div>
<p>Happy shopping!</p>
<p>Best,<br/>The {{store_name}} Team</p>`,
  },
];

const MOCK_LOGS: EmailLog[] = [
  { id: 'log_1', sentAt: '2026-03-21T10:30:00Z', recipient: 'alex.smith@gmail.com', triggerName: 'Return Initiated', status: 'delivered' },
  { id: 'log_2', sentAt: '2026-03-21T09:15:00Z', recipient: 'sarah.j@outlook.com', triggerName: 'Return Approved', status: 'delivered' },
  { id: 'log_3', sentAt: '2026-03-20T16:45:00Z', recipient: 'mike.ross@yahoo.com', triggerName: 'Store Credit Issued', status: 'bounced' },
  { id: 'log_4', sentAt: '2026-03-20T14:20:00Z', recipient: 'emma.w@icloud.com', triggerName: 'Return Rejected', status: 'delivered' },
  { id: 'log_5', sentAt: '2026-03-20T11:05:00Z', recipient: 'john.doe@company.com', triggerName: 'Return Approved', status: 'delivered' },
];

const MOCK_METRICS: EmailMetrics = {
  totalSent: 12845,
  openRate: 68.4,
  bounceRate: 1.2,
  sentChange: 12.5,
  openChange: 2.1,
  bounceChange: -0.4,
};

export const useEmailTriggers = () => {
  return useQuery({
    queryKey: ['email-triggers'],
    queryFn: async () => MOCK_TRIGGERS,
  });
};

export const useEmailLogs = () => {
  return useQuery({
    queryKey: ['email-logs'],
    queryFn: async () => MOCK_LOGS,
  });
};

export const useEmailMetrics = () => {
  return useQuery({
    queryKey: ['email-metrics'],
    queryFn: async () => MOCK_METRICS,
  });
};
