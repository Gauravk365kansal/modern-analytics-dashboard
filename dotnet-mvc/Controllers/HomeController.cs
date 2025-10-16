using Microsoft.AspNetCore.Mvc;
using AnalyticsDashboard.Models;
using System.Diagnostics;

namespace AnalyticsDashboard.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var viewModel = GetDashboardData();
            return View(viewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private DashboardViewModel GetDashboardData()
        {
            var viewModel = new DashboardViewModel
            {
                ReportsAvailable = 305,
                ReportsPublished7Days = 7,
                ReportsPublished30Days = 33,
                TotalVisits = 56,
                ReportsWithZeroViews = 305,
                ReportsRefreshed24h = 305,

                MostViewedReport = new Report
                {
                    Id = "1",
                    Name = "Q4 Sales Performance Report",
                    Views = 56,
                    Downloads = 23,
                    LastRefreshed = DateTime.Parse("2025-10-15"),
                    Category = "Sales"
                },

                MostDownloadedReport = new Report
                {
                    Id = "2",
                    Name = "Marketing Campaign Analysis",
                    Views = 42,
                    Downloads = 56,
                    LastRefreshed = DateTime.Parse("2025-10-14"),
                    Category = "Marketing"
                },

                DayWithMostViews = new DayViewData
                {
                    Date = "Monday, Oct 14",
                    Views = 305
                },

                PublishedTrend = new List<TrendData>
                {
                    new TrendData { Date = "Mon", Count = 8 },
                    new TrendData { Date = "Tue", Count = 12 },
                    new TrendData { Date = "Wed", Count = 6 },
                    new TrendData { Date = "Thu", Count = 15 },
                    new TrendData { Date = "Fri", Count = 10 },
                    new TrendData { Date = "Sat", Count = 4 },
                    new TrendData { Date = "Sun", Count = 7 }
                },

                TopReports = new List<Report>
                {
                    new Report { Id = "1", Name = "Q4 Sales Performance Report", Views = 56, Downloads = 23, LastRefreshed = DateTime.Parse("2025-10-15"), Category = "Sales" },
                    new Report { Id = "2", Name = "Marketing Campaign Analysis", Views = 42, Downloads = 56, LastRefreshed = DateTime.Parse("2025-10-14"), Category = "Marketing" },
                    new Report { Id = "3", Name = "Customer Satisfaction Survey Results", Views = 38, Downloads = 19, LastRefreshed = DateTime.Parse("2025-10-13"), Category = "Customer Success" },
                    new Report { Id = "4", Name = "Product Usage Analytics Dashboard", Views = 34, Downloads = 15, LastRefreshed = DateTime.Parse("2025-10-12"), Category = "Product" },
                    new Report { Id = "5", Name = "Financial Overview Q3", Views = 29, Downloads = 28, LastRefreshed = DateTime.Parse("2025-10-11"), Category = "Finance" }
                },

                CategoryDistribution = new List<CategoryDistribution>
                {
                    new CategoryDistribution { Category = "Sales", Count = 85, Color = "#3b82f6" },
                    new CategoryDistribution { Category = "Marketing", Count = 62, Color = "#10b981" },
                    new CategoryDistribution { Category = "Finance", Count = 48, Color = "#f59e0b" },
                    new CategoryDistribution { Category = "Operations", Count = 110, Color = "#8b5cf6" }
                },

                Insights = new List<Insight>
                {
                    new Insight
                    {
                        Type = "alert",
                        Message = "Report activity dropped by 58% compared to last month. Consider reviewing content relevance and distribution strategy.",
                        Icon = "alert"
                    },
                    new Insight
                    {
                        Type = "success",
                        Message = "Most engagement seen on Monday and Tuesday. Schedule important report releases on these days for maximum visibility.",
                        Icon = "success"
                    },
                    new Insight
                    {
                        Type = "info",
                        Message = "Top downloaded report: \"Marketing Campaign Analysis\" with 56 downloads. Content quality is resonating with users.",
                        Icon = "info"
                    },
                    new Insight
                    {
                        Type = "warning",
                        Message = "Average report age is 45 days. Consider implementing auto-refresh policies to keep data current.",
                        Icon = "warning"
                    }
                }
            };

            return viewModel;
        }
    }
}
