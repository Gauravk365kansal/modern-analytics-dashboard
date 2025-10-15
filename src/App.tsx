import { BarChart3, FileText, Eye, Download, Calendar } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { LineChart } from './components/LineChart';
import { BarChart } from './components/BarChart';
import { DonutChart } from './components/DonutChart';
import { KeyInsights } from './components/KeyInsights';
import { PerformanceOverview } from './components/PerformanceOverview';
import { DashboardData, Insight } from './types/dashboard';

const mockData: DashboardData = {
  reportsAvailable: 305,
  reportsPublished7Days: 7,
  reportsPublished30Days: 33,
  totalVisits: 56,
  reportsWithZeroViews: 305,
  reportsRefreshed24h: 305,
  mostViewedReport: {
    id: '1',
    name: 'Q4 Sales Performance Report',
    views: 56,
    downloads: 23,
    lastRefreshed: '2025-10-15',
    category: 'Sales'
  },
  mostDownloadedReport: {
    id: '2',
    name: 'Marketing Campaign Analysis',
    views: 42,
    downloads: 56,
    lastRefreshed: '2025-10-14',
    category: 'Marketing'
  },
  dayWithMostViews: {
    date: 'Monday, Oct 14',
    views: 305
  },
  publishedTrend: [
    { date: 'Mon', count: 8 },
    { date: 'Tue', count: 12 },
    { date: 'Wed', count: 6 },
    { date: 'Thu', count: 15 },
    { date: 'Fri', count: 10 },
    { date: 'Sat', count: 4 },
    { date: 'Sun', count: 7 }
  ],
  topReports: [
    { id: '1', name: 'Q4 Sales Performance Report', views: 56, downloads: 23, lastRefreshed: '2025-10-15', category: 'Sales' },
    { id: '2', name: 'Marketing Campaign Analysis', views: 42, downloads: 56, lastRefreshed: '2025-10-14', category: 'Marketing' },
    { id: '3', name: 'Customer Satisfaction Survey Results', views: 38, downloads: 19, lastRefreshed: '2025-10-13', category: 'Customer Success' },
    { id: '4', name: 'Product Usage Analytics Dashboard', views: 34, downloads: 15, lastRefreshed: '2025-10-12', category: 'Product' },
    { id: '5', name: 'Financial Overview Q3', views: 29, downloads: 28, lastRefreshed: '2025-10-11', category: 'Finance' }
  ],
  categoryDistribution: [
    { category: 'Sales', count: 85, color: '#3b82f6' },
    { category: 'Marketing', count: 62, color: '#10b981' },
    { category: 'Finance', count: 48, color: '#f59e0b' },
    { category: 'Operations', count: 110, color: '#8b5cf6' }
  ]
};

const insights: Insight[] = [
  {
    type: 'alert',
    message: 'Report activity dropped by 58% compared to last month. Consider reviewing content relevance and distribution strategy.',
    icon: 'alert'
  },
  {
    type: 'success',
    message: 'Most engagement seen on Monday and Tuesday. Schedule important report releases on these days for maximum visibility.',
    icon: 'success'
  },
  {
    type: 'info',
    message: 'Top downloaded report: "Marketing Campaign Analysis" with 56 downloads. Content quality is resonating with users.',
    icon: 'info'
  },
  {
    type: 'warning',
    message: 'Average report age is 45 days. Consider implementing auto-refresh policies to keep data current.',
    icon: 'warning'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1600px] mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600">Real-time insights into your report performance and engagement metrics</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="Total Reports Available"
            metric={{ value: mockData.reportsAvailable, change: -5, changeType: 'decrease', period: 'vs. last month' }}
            icon={<FileText className="w-6 h-6" />}
          />

          <MetricCard
            title="Total Visits"
            metric={{ value: mockData.totalVisits, change: 12, changeType: 'increase', period: 'Last 30 days' }}
            icon={<Eye className="w-6 h-6" />}
          />

          <MetricCard
            title="Reports Refreshed"
            metric={{ value: mockData.reportsRefreshed24h, change: 8, changeType: 'increase', period: 'Last 24 hours' }}
            icon={<Calendar className="w-6 h-6" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MetricCard
            title="Reports Published (7 Days)"
            metric={{ value: mockData.reportsPublished7Days, change: -15, changeType: 'decrease', period: 'vs. previous week' }}
            subtitle="Weekly publication rate"
          />

          <MetricCard
            title="Reports Published (30 Days)"
            metric={{ value: mockData.reportsPublished30Days, change: -58, changeType: 'decrease', period: 'vs. previous month' }}
            subtitle="Monthly publication trend"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-md border border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Most Viewed Report</p>
                <p className="text-xs text-gray-500">All-time leader</p>
              </div>
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{mockData.mostViewedReport.name}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-blue-600 font-semibold">
                <Eye className="w-4 h-4" />
                {mockData.mostViewedReport.views} views
              </span>
              <span className="text-gray-500">{mockData.mostViewedReport.category}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 shadow-md border border-green-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Most Downloaded Report</p>
                <p className="text-xs text-gray-500">Highest engagement</p>
              </div>
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{mockData.mostDownloadedReport.name}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <Download className="w-4 h-4" />
                {mockData.mostDownloadedReport.downloads} downloads
              </span>
              <span className="text-gray-500">{mockData.mostDownloadedReport.category}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LineChart
            data={mockData.publishedTrend}
            title="Reports Published - Weekly Trend"
            color="#10b981"
          />

          <BarChart
            data={[
              { label: '7 Days', value: mockData.reportsPublished7Days, color: '#3b82f6' },
              { label: '30 Days', value: mockData.reportsPublished30Days, color: '#10b981' }
            ]}
            title="Publication Comparison"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DonutChart
            data={mockData.categoryDistribution.map(cat => ({
              ...cat,
              color: cat.color
            }))}
            title="Reports by Category"
          />

          <KeyInsights insights={insights} />
        </div>

        <PerformanceOverview
          topReports={mockData.topReports}
          zeroViewReports={mockData.reportsWithZeroViews}
          recentlyRefreshed={mockData.reportsRefreshed24h}
        />
      </div>
    </div>
  );
}

export default App;
