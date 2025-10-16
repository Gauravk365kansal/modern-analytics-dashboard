# Analytics Dashboard - .NET MVC Application

A professional analytics dashboard built with ASP.NET Core MVC, displaying report performance metrics, charts, and insights.

## Features

- Metric cards showing key statistics
- Interactive charts (Line, Bar, Donut) using Chart.js
- Top reports performance overview
- Key insights with visual indicators
- Responsive design
- Static data (ready to integrate with database)

## Project Structure

```
AnalyticsDashboard/
├── Controllers/
│   └── HomeController.cs          # Main controller with static data
├── Models/
│   ├── DashboardViewModel.cs      # Main view model
│   ├── Report.cs                  # Report model
│   ├── Insight.cs                 # Insight model
│   ├── CategoryDistribution.cs    # Category model
│   ├── MetricCardViewModel.cs     # Metric card model
│   └── ErrorViewModel.cs          # Error model
├── Views/
│   ├── Home/
│   │   └── Index.cshtml           # Main dashboard view
│   ├── Shared/
│   │   ├── _Layout.cshtml         # Main layout
│   │   ├── _MetricCard.cshtml     # Metric card partial
│   │   ├── _LineChart.cshtml      # Line chart partial
│   │   ├── _BarChart.cshtml       # Bar chart partial
│   │   ├── _DonutChart.cshtml     # Donut chart partial
│   │   ├── _KeyInsights.cshtml    # Insights partial
│   │   └── _PerformanceOverview.cshtml # Performance partial
│   ├── _ViewImports.cshtml        # Global imports
│   └── _ViewStart.cshtml          # Layout configuration
├── wwwroot/
│   ├── css/
│   │   └── site.css               # All styles
│   └── js/
│       └── charts.js              # Chart configuration
├── Properties/
│   └── launchSettings.json        # Launch configuration
├── Program.cs                     # Application entry point
├── appsettings.json              # App configuration
└── AnalyticsDashboard.csproj     # Project file
```

## Requirements

- .NET 8.0 SDK or later
- Visual Studio 2022 or Visual Studio Code

## Setup Instructions

### Option 1: Using Visual Studio

1. Open Visual Studio 2022
2. Click "Create a new project"
3. Select "ASP.NET Core Web App (Model-View-Controller)"
4. Name it "AnalyticsDashboard"
5. Select .NET 8.0
6. Replace all default files with the files from this project
7. Press F5 to run

### Option 2: Using Command Line

1. Create a new directory:
   ```bash
   mkdir AnalyticsDashboard
   cd AnalyticsDashboard
   ```

2. Copy all files from the `dotnet-mvc` folder into this directory

3. Restore dependencies:
   ```bash
   dotnet restore
   ```

4. Build the project:
   ```bash
   dotnet build
   ```

5. Run the application:
   ```bash
   dotnet run
   ```

6. Open your browser and navigate to:
   - HTTP: http://localhost:5000
   - HTTPS: https://localhost:5001

## Data

All data is currently static and defined in the `HomeController.GetDashboardData()` method. To integrate with a database:

1. Install Entity Framework Core:
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   ```

2. Create a DbContext class
3. Replace the static data in `GetDashboardData()` with database queries
4. Update connection string in `appsettings.json`

## Technologies Used

- ASP.NET Core 8.0 MVC
- C# 12
- Razor Views
- Chart.js 4.4.0 (via CDN)
- CSS3 with custom styling
- Responsive Grid Layout

## Customization

### Changing Data

Edit the `GetDashboardData()` method in `Controllers/HomeController.cs` to modify the displayed data.

### Styling

Edit `wwwroot/css/site.css` to customize colors, fonts, and layout.

### Adding New Features

1. Add new models in the `Models` folder
2. Update the controller action methods
3. Create new views or partial views
4. Update the routing in `Program.cs` if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is provided as-is for educational and development purposes.
