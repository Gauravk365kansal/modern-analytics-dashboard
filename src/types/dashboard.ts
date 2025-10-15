export interface MetricData {
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  period?: string;
}

export interface Report {
  id: string;
  name: string;
  views: number;
  downloads: number;
  lastRefreshed: string;
  category?: string;
}

export interface DashboardData {
  reportsAvailable: number;
  reportsPublished7Days: number;
  reportsPublished30Days: number;
  totalVisits: number;
  mostViewedReport: Report;
  reportsWithZeroViews: number;
  reportsRefreshed24h: number;
  mostDownloadedReport: Report;
  dayWithMostViews: {
    date: string;
    views: number;
  };
  publishedTrend: { date: string; count: number }[];
  topReports: Report[];
  categoryDistribution: { category: string; count: number }[];
}

export interface Insight {
  type: 'info' | 'warning' | 'success' | 'alert';
  message: string;
  icon: string;
}
