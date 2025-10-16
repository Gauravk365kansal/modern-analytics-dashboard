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
