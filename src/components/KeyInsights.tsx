import { AlertCircle, TrendingUp, Calendar, Award } from 'lucide-react';
import { Insight } from '../types/dashboard';

interface KeyInsightsProps {
  insights: Insight[];
}

export function KeyInsights({ insights }: KeyInsightsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Award className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          text: 'text-green-900'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          text: 'text-yellow-900'
        };
      case 'alert':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          text: 'text-red-900'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          text: 'text-blue-900'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">Key Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const styles = getStyles(insight.type);

          return (
            <div
              key={index}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className={`${styles.icon} mt-0.5`}>
                  {getIcon(insight.type)}
                </div>
                <p className={`text-sm font-medium ${styles.text} flex-1`}>
                  {insight.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
