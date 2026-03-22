export interface AnalyticsData {
  views: number;
  conversions: number;
  revenue: number;
  period: 'daily' | 'weekly' | 'monthly';
}
