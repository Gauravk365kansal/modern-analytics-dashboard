# .NET MVC Analytics Dashboard - Complete Conversion Guide

## Project Structure

```
AnalyticsDashboard/
├── Controllers/
│   └── HomeController.cs
├── Models/
│   ├── DashboardViewModel.cs
│   ├── MetricData.cs
│   ├── Report.cs
│   ├── Insight.cs
│   └── CategoryDistribution.cs
├── Views/
│   ├── Home/
│   │   └── Index.cshtml
│   ├── Shared/
│   │   ├── _Layout.cshtml
│   │   ├── _MetricCard.cshtml
│   │   ├── _LineChart.cshtml
│   │   ├── _BarChart.cshtml
│   │   ├── _DonutChart.cshtml
│   │   ├── _KeyInsights.cshtml
│   │   └── _PerformanceOverview.cshtml
│   └── _ViewImports.cshtml
│   └── _ViewStart.cshtml
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   └── js/
│       └── charts.js
├── appsettings.json
└── Program.cs
```

## Step 1: Create New .NET MVC Project

Open Visual Studio or use CLI:
```bash
dotnet new mvc -n AnalyticsDashboard
cd AnalyticsDashboard
```

## Step 2: Install Required NuGet Packages

```bash
dotnet add package Newtonsoft.Json
```

For Supabase integration (optional):
```bash
dotnet add package supabase-csharp
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

---

## Controllers/HomeController.cs

```csharp
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

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private DashboardViewModel GetDashboardData()
        {
            // Mock data - Replace with actual data service/repository
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

    public class ErrorViewModel
    {
        public string? RequestId { get; set; }
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
```

---

## Models/DashboardViewModel.cs

```csharp
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
```

---

## Models/MetricData.cs

```csharp
namespace AnalyticsDashboard.Models
{
    public class MetricData
    {
        public int Value { get; set; }
        public int? Change { get; set; }
        public string? ChangeType { get; set; } // "increase", "decrease", "neutral"
        public string? Period { get; set; }
    }
}
```

---

## Models/Report.cs

```csharp
namespace AnalyticsDashboard.Models
{
    public class Report
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Views { get; set; }
        public int Downloads { get; set; }
        public DateTime LastRefreshed { get; set; }
        public string? Category { get; set; }
    }
}
```

---

## Models/Insight.cs

```csharp
namespace AnalyticsDashboard.Models
{
    public class Insight
    {
        public string Type { get; set; } // "info", "warning", "success", "alert"
        public string Message { get; set; }
        public string Icon { get; set; }
    }
}
```

---

## Models/CategoryDistribution.cs

```csharp
namespace AnalyticsDashboard.Models
{
    public class CategoryDistribution
    {
        public string Category { get; set; }
        public int Count { get; set; }
        public string Color { get; set; }
    }
}
```

---

## Views/_ViewImports.cshtml

```cshtml
@using AnalyticsDashboard
@using AnalyticsDashboard.Models
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

---

## Views/_ViewStart.cshtml

```cshtml
@{
    Layout = "_Layout";
}
```

---

## Views/Shared/_Layout.cshtml

```cshtml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Analytics Dashboard</title>
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body>
    <div class="min-h-screen">
        @RenderBody()
    </div>
    <script src="~/js/charts.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

---

## Views/Home/Index.cshtml

```cshtml
@model DashboardViewModel
@{
    ViewData["Title"] = "Analytics Dashboard";
}

<div class="dashboard-container">
    <div class="dashboard-wrapper">
        <header class="dashboard-header">
            <div class="header-content">
                <div class="header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"></path>
                        <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                </div>
                <h1>Analytics Dashboard</h1>
            </div>
            <p class="header-subtitle">Real-time insights into your report performance and engagement metrics</p>
        </header>

        <div class="metrics-grid-3">
            @await Html.PartialAsync("_MetricCard", new MetricCardViewModel
            {
                Title = "Total Reports Available",
                Value = Model.ReportsAvailable,
                Change = -5,
                ChangeType = "decrease",
                Period = "vs. last month",
                IconType = "file"
            })

            @await Html.PartialAsync("_MetricCard", new MetricCardViewModel
            {
                Title = "Total Visits",
                Value = Model.TotalVisits,
                Change = 12,
                ChangeType = "increase",
                Period = "Last 30 days",
                IconType = "eye"
            })

            @await Html.PartialAsync("_MetricCard", new MetricCardViewModel
            {
                Title = "Reports Refreshed",
                Value = Model.ReportsRefreshed24h,
                Change = 8,
                ChangeType = "increase",
                Period = "Last 24 hours",
                IconType = "calendar"
            })
        </div>

        <div class="metrics-grid-2">
            @await Html.PartialAsync("_MetricCard", new MetricCardViewModel
            {
                Title = "Reports Published (7 Days)",
                Value = Model.ReportsPublished7Days,
                Change = -15,
                ChangeType = "decrease",
                Period = "vs. previous week",
                Subtitle = "Weekly publication rate"
            })

            @await Html.PartialAsync("_MetricCard", new MetricCardViewModel
            {
                Title = "Reports Published (30 Days)",
                Value = Model.ReportsPublished30Days,
                Change = -58,
                ChangeType = "decrease",
                Period = "vs. previous month",
                Subtitle = "Monthly publication trend"
            })
        </div>

        <div class="metrics-grid-2">
            <div class="highlight-card highlight-card-blue">
                <div class="highlight-card-header">
                    <div>
                        <p class="highlight-card-title">Most Viewed Report</p>
                        <p class="highlight-card-subtitle">All-time leader</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </div>
                <h3 class="highlight-card-name">@Model.MostViewedReport.Name</h3>
                <div class="highlight-card-stats">
                    <span class="stat-views">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        @Model.MostViewedReport.Views views
                    </span>
                    <span class="stat-category">@Model.MostViewedReport.Category</span>
                </div>
            </div>

            <div class="highlight-card highlight-card-green">
                <div class="highlight-card-header">
                    <div>
                        <p class="highlight-card-title">Most Downloaded Report</p>
                        <p class="highlight-card-subtitle">Highest engagement</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                </div>
                <h3 class="highlight-card-name">@Model.MostDownloadedReport.Name</h3>
                <div class="highlight-card-stats">
                    <span class="stat-downloads">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                        @Model.MostDownloadedReport.Downloads downloads
                    </span>
                    <span class="stat-category">@Model.MostDownloadedReport.Category</span>
                </div>
            </div>
        </div>

        <div class="metrics-grid-2">
            @await Html.PartialAsync("_LineChart", Model.PublishedTrend)
            @await Html.PartialAsync("_BarChart", Model)
        </div>

        <div class="metrics-grid-2">
            @await Html.PartialAsync("_DonutChart", Model.CategoryDistribution)
            @await Html.PartialAsync("_KeyInsights", Model.Insights)
        </div>

        @await Html.PartialAsync("_PerformanceOverview", Model)
    </div>
</div>
```

---

## Views/Shared/_MetricCard.cshtml

```cshtml
@model MetricCardViewModel

<div class="metric-card">
    <div class="metric-card-header">
        <div>
            <h3 class="metric-card-title">@Model.Title</h3>
            @if (!string.IsNullOrEmpty(Model.Subtitle))
            {
                <p class="metric-card-subtitle">@Model.Subtitle</p>
            }
        </div>
        @if (!string.IsNullOrEmpty(Model.IconType))
        {
            <div class="metric-card-icon">
                @switch (Model.IconType)
                {
                    case "file":
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        </svg>
                        break;
                    case "eye":
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        break;
                    case "calendar":
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                        </svg>
                        break;
                }
            </div>
        }
    </div>
    <div class="metric-card-value">@Model.Value.ToString("N0")</div>
    @if (Model.Change.HasValue)
    {
        <div class="metric-card-change metric-change-@Model.ChangeType">
            <span class="change-arrow">
                @if (Model.ChangeType == "increase")
                {
                    <text>↑</text>
                }
                else if (Model.ChangeType == "decrease")
                {
                    <text>↓</text>
                }
            </span>
            <span>@Math.Abs(Model.Change.Value)% @Model.Period</span>
        </div>
    }
</div>

@{
    public class MetricCardViewModel
    {
        public string Title { get; set; }
        public int Value { get; set; }
        public int? Change { get; set; }
        public string ChangeType { get; set; }
        public string Period { get; set; }
        public string Subtitle { get; set; }
        public string IconType { get; set; }
    }
}
```

---

## Views/Shared/_LineChart.cshtml

```cshtml
@model List<TrendData>

<div class="chart-card">
    <h3 class="chart-title">Reports Published - Weekly Trend</h3>
    <canvas id="lineChart" width="400" height="200"></canvas>
</div>

@section Scripts {
    <script>
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: @Html.Raw(Newtonsoft.Json.JsonConvert.SerializeObject(Model.Select(x => x.Date))),
                datasets: [{
                    label: 'Reports Published',
                    data: @Html.Raw(Newtonsoft.Json.JsonConvert.SerializeObject(Model.Select(x => x.Count))),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    </script>
}
```

---

## Views/Shared/_BarChart.cshtml

```cshtml
@model DashboardViewModel

<div class="chart-card">
    <h3 class="chart-title">Publication Comparison</h3>
    <canvas id="barChart" width="400" height="200"></canvas>
</div>

@section Scripts {
    <script>
        const barCtx = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['7 Days', '30 Days'],
                datasets: [{
                    label: 'Reports Published',
                    data: [@Model.ReportsPublished7Days, @Model.ReportsPublished30Days],
                    backgroundColor: ['#3b82f6', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
}
```

---

## Views/Shared/_DonutChart.cshtml

```cshtml
@model List<CategoryDistribution>

<div class="chart-card">
    <h3 class="chart-title">Reports by Category</h3>
    <canvas id="donutChart" width="400" height="300"></canvas>
</div>

@section Scripts {
    <script>
        const donutCtx = document.getElementById('donutChart').getContext('2d');
        const donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: @Html.Raw(Newtonsoft.Json.JsonConvert.SerializeObject(Model.Select(x => x.Category))),
                datasets: [{
                    data: @Html.Raw(Newtonsoft.Json.JsonConvert.SerializeObject(Model.Select(x => x.Count))),
                    backgroundColor: @Html.Raw(Newtonsoft.Json.JsonConvert.SerializeObject(Model.Select(x => x.Color)))
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    </script>
}
```

---

## Views/Shared/_KeyInsights.cshtml

```cshtml
@model List<Insight>

<div class="insights-card">
    <h3 class="insights-title">Key Insights</h3>
    <div class="insights-list">
        @foreach (var insight in Model)
        {
            <div class="insight-item insight-@insight.Type">
                <div class="insight-icon">
                    @switch (insight.Type)
                    {
                        case "alert":
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                <path d="M12 9v4"></path>
                                <path d="M12 17h.01"></path>
                            </svg>
                            break;
                        case "success":
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            break;
                        case "info":
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                            break;
                        case "warning":
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" x2="12" y1="9" y2="13"></line>
                                <line x1="12" x2="12.01" y1="17" y2="17"></line>
                            </svg>
                            break;
                    }
                </div>
                <p class="insight-message">@insight.Message</p>
            </div>
        }
    </div>
</div>
```

---

## Views/Shared/_PerformanceOverview.cshtml

```cshtml
@model DashboardViewModel

<div class="performance-card">
    <h3 class="performance-title">Performance Overview</h3>

    <div class="performance-section">
        <div class="performance-section-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <h4>Top 5 Reports by Views</h4>
        </div>

        <div class="reports-list">
            @for (int i = 0; i < Model.TopReports.Take(5).Count(); i++)
            {
                var report = Model.TopReports[i];
                <div class="report-item">
                    <div class="report-item-content">
                        <div class="report-rank">@(i + 1)</div>
                        <div class="report-info">
                            <p class="report-name">@report.Name</p>
                            @if (!string.IsNullOrEmpty(report.Category))
                            {
                                <p class="report-category">@report.Category</p>
                            }
                        </div>
                    </div>
                    <div class="report-stats">
                        <div class="stat-group">
                            <div class="stat-value-views">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                @report.Views
                            </div>
                            <div class="stat-label">views</div>
                        </div>
                        <div class="stat-group">
                            <div class="stat-value-downloads">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" x2="12" y1="15" y2="3"></line>
                                </svg>
                                @report.Downloads
                            </div>
                            <div class="stat-label">downloads</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>

    <div class="performance-grid">
        <div class="performance-stat performance-stat-red">
            <div class="performance-stat-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                </svg>
                <h4>Zero Interaction</h4>
            </div>
            <p class="performance-stat-value">@Model.ReportsWithZeroViews</p>
            <p class="performance-stat-label">Reports with no views</p>
        </div>

        <div class="performance-stat performance-stat-green">
            <div class="performance-stat-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                </svg>
                <h4>Recently Updated</h4>
            </div>
            <p class="performance-stat-value">@Model.ReportsRefreshed24h</p>
            <p class="performance-stat-label">Refreshed in 24h</p>
        </div>
    </div>
</div>
```

---

## wwwroot/css/site.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;
    color: #1f2937;
}

.min-h-screen {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
}

.dashboard-container {
    background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
    min-height: 100vh;
    padding: 24px;
}

.dashboard-wrapper {
    max-width: 1600px;
    margin: 0 auto;
}

.dashboard-header {
    margin-bottom: 32px;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.header-icon {
    padding: 8px;
    background: #2563eb;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dashboard-header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
}

.header-subtitle {
    color: #6b7280;
    font-size: 1rem;
}

.metrics-grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
}

.metrics-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
}

.metric-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.metric-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.metric-card-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 4px;
}

.metric-card-subtitle {
    font-size: 0.75rem;
    color: #9ca3af;
}

.metric-card-icon {
    color: #3b82f6;
}

.metric-card-value {
    font-size: 2.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
}

.metric-card-change {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.875rem;
}

.metric-change-increase {
    color: #10b981;
}

.metric-change-decrease {
    color: #ef4444;
}

.change-arrow {
    font-size: 1.25rem;
    font-weight: 700;
}

.highlight-card {
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.highlight-card-blue {
    background: linear-gradient(to bottom right, #dbeafe, #c7d2fe);
    border: 1px solid #bfdbfe;
}

.highlight-card-green {
    background: linear-gradient(to bottom right, #d1fae5, #a7f3d0);
    border: 1px solid #6ee7b7;
}

.highlight-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.highlight-card-blue .highlight-card-header svg {
    color: #2563eb;
}

.highlight-card-green .highlight-card-header svg {
    color: #059669;
}

.highlight-card-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 4px;
}

.highlight-card-subtitle {
    font-size: 0.75rem;
    color: #6b7280;
}

.highlight-card-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
}

.highlight-card-stats {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.875rem;
}

.stat-views {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #2563eb;
    font-weight: 600;
}

.stat-downloads {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #059669;
    font-weight: 600;
}

.stat-category {
    color: #6b7280;
}

.chart-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.chart-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 16px;
}

canvas {
    max-height: 250px;
}

.insights-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.insights-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 16px;
}

.insights-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.insight-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid;
}

.insight-alert {
    background: #fef2f2;
    border-left-color: #ef4444;
}

.insight-success {
    background: #f0fdf4;
    border-left-color: #10b981;
}

.insight-info {
    background: #eff6ff;
    border-left-color: #3b82f6;
}

.insight-warning {
    background: #fffbeb;
    border-left-color: #f59e0b;
}

.insight-icon {
    flex-shrink: 0;
}

.insight-alert .insight-icon {
    color: #ef4444;
}

.insight-success .insight-icon {
    color: #10b981;
}

.insight-info .insight-icon {
    color: #3b82f6;
}

.insight-warning .insight-icon {
    color: #f59e0b;
}

.insight-message {
    font-size: 0.875rem;
    color: #4b5563;
    line-height: 1.6;
}

.performance-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.performance-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 24px;
}

.performance-section {
    margin-bottom: 24px;
}

.performance-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    color: #2563eb;
}

.performance-section-header h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
}

.reports-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.report-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: linear-gradient(to right, #eff6ff, transparent);
    border-radius: 8px;
    border: 1px solid #dbeafe;
    transition: background 0.2s;
}

.report-item:hover {
    background: linear-gradient(to right, #dbeafe, transparent);
}

.report-item-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
}

.report-rank {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.report-info {
    flex: 1;
    min-width: 0;
}

.report-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.report-category {
    font-size: 0.75rem;
    color: #6b7280;
}

.report-stats {
    display: flex;
    gap: 16px;
    flex-shrink: 0;
}

.stat-group {
    text-align: right;
}

.stat-value-views {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #2563eb;
    font-size: 0.875rem;
    font-weight: 700;
}

.stat-value-downloads {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #10b981;
    font-size: 0.875rem;
    font-weight: 700;
}

.stat-label {
    font-size: 0.75rem;
    color: #6b7280;
}

.performance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.performance-stat {
    padding: 16px;
    border-radius: 8px;
    border: 1px solid;
}

.performance-stat-red {
    background: linear-gradient(to bottom right, #fef2f2, #fed7aa);
    border-color: #fecaca;
}

.performance-stat-green {
    background: linear-gradient(to bottom right, #d1fae5, #a7f3d0);
    border-color: #6ee7b7;
}

.performance-stat-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.performance-stat-red .performance-stat-header svg {
    color: #dc2626;
}

.performance-stat-green .performance-stat-header svg {
    color: #059669;
}

.performance-stat-header h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
}

.performance-stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
}

.performance-stat-label {
    font-size: 0.75rem;
    color: #6b7280;
}

@media (max-width: 768px) {
    .metrics-grid-3,
    .metrics-grid-2 {
        grid-template-columns: 1fr;
    }

    .report-stats {
        flex-direction: column;
        gap: 4px;
    }
}
```

---

## wwwroot/js/charts.js

```javascript
// This file can be used for additional chart customizations
// Charts are initialized in the individual partial views

document.addEventListener('DOMContentLoaded', function() {
    // Global chart configurations
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        Chart.defaults.color = '#6b7280';
    }
});
```

---

## appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

---

## Instructions to Run

1. **Create the project:**
   ```bash
   dotnet new mvc -n AnalyticsDashboard
   cd AnalyticsDashboard
   ```

2. **Replace default files** with the code provided above

3. **Install dependencies:**
   ```bash
   dotnet add package Newtonsoft.Json
   ```

4. **Build the project:**
   ```bash
   dotnet build
   ```

5. **Run the application:**
   ```bash
   dotnet run
   ```

6. **Access in browser:**
   Navigate to `https://localhost:5001` or `http://localhost:5000`

---

## Optional: Supabase Integration

To connect to your Supabase database for real data:

1. Install Supabase package:
   ```bash
   dotnet add package supabase-csharp
   ```

2. Add to `appsettings.json`:
   ```json
   {
     "Supabase": {
       "Url": "YOUR_SUPABASE_URL",
       "Key": "YOUR_SUPABASE_ANON_KEY"
     }
   }
   ```

3. Create a service class to fetch real data from Supabase and replace the mock data in the controller.

---

## Notes

- All mock data is in the `HomeController.GetDashboardData()` method
- Charts use Chart.js CDN for simplicity
- The design closely matches your React application
- All styles are in a single CSS file for easy customization
- Responsive design works on mobile and desktop
- No API layer - direct controller to view rendering
