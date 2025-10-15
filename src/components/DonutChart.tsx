import { useState } from 'react';

interface DonutData {
  category: string;
  count: number;
  color: string;
}

interface DonutChartProps {
  data: DonutData[];
  title: string;
}

export function DonutChart({ data, title }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.count, 0);

  let currentAngle = -90;
  const segments = data.map((item) => {
    const percentage = (item.count / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle
    };
  });

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', x, y,
      'Z'
    ].join(' ');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

      <div className="flex items-center gap-6">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#f3f4f6" strokeWidth="20" />

            {segments.map((segment, index) => {
              const isHovered = hoveredIndex === index;
              const radius = isHovered ? 92 : 90;

              return (
                <path
                  key={index}
                  d={describeArc(100, 100, radius, segment.startAngle, segment.endAngle)}
                  fill={segment.color}
                  className="transition-all duration-300 cursor-pointer"
                  style={{ opacity: isHovered ? 1 : 0.85 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}

            <circle cx="100" cy="100" r="60" fill="white" />

            <text
              x="100"
              y="95"
              textAnchor="middle"
              className="text-2xl font-bold"
              fill="#1f2937"
            >
              {total}
            </text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="text-xs"
              fill="#6b7280"
            >
              Total
            </text>
          </svg>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                hoveredIndex === index ? 'bg-gray-50' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-gray-700">{segment.category}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{segment.count}</div>
                <div className="text-xs text-gray-500">{segment.percentage.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
