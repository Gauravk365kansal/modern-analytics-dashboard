import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricData } from '../types/dashboard';

interface MetricCardProps {
  title: string;
  metric: MetricData;
  icon?: React.ReactNode;
  subtitle?: string;
}

export function MetricCard({ title, metric, icon, subtitle }: MetricCardProps) {
  const getTrendColor = () => {
    if (!metric.changeType) return 'text-gray-500';
    switch (metric.changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getTrendIcon = () => {
    if (!metric.changeType) return null;
    switch (metric.changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getBgGradient = () => {
    if (!metric.changeType) return 'from-gray-50 to-gray-100';
    switch (metric.changeType) {
      case 'increase':
        return 'from-green-50 to-emerald-100';
      case 'decrease':
        return 'from-red-50 to-rose-100';
      default:
        return 'from-yellow-50 to-amber-100';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getBgGradient()} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {icon && <div className="text-gray-400 opacity-70">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">{metric.value.toLocaleString()}</h3>
        </div>

        {metric.change !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor()} font-semibold text-sm`}>
            {getTrendIcon()}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        )}
      </div>

      {metric.period && (
        <p className="text-xs text-gray-500 mt-2">{metric.period}</p>
      )}
    </div>
  );
}
