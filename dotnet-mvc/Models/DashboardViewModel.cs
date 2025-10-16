namespace AnalyticsDashboard.Models
{
    public class DashboardViewModel
    {
        public int ReportsAvailable { get; set; }
        public int ReportsPublished7Days { get; set; }
        public int ReportsPublished30Days { get; set; }
        public int TotalVisits { get; set; }
        public Report MostViewedReport { get; set; }
        public int ReportsWithZeroViews { get; set; }
        public int ReportsRefreshed24h { get; set; }
        public Report MostDownloadedReport { get; set; }
        public DayViewData DayWithMostViews { get; set; }
        public List<TrendData> PublishedTrend { get; set; }
        public List<Report> TopReports { get; set; }
        public List<CategoryDistribution> CategoryDistribution { get; set; }
        public List<Insight> Insights { get; set; }
    }

    public class DayViewData
    {
        public string Date { get; set; }
        public int Views { get; set; }
    }

    public class TrendData
    {
        public string Date { get; set; }
        public int Count { get; set; }
    }
}
