namespace AnalyticsDashboard.Models
{
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
