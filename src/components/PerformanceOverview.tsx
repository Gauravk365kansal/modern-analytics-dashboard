import { Eye, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Report } from '../types/dashboard';

interface PerformanceOverviewProps {
  topReports: Report[];
  zeroViewReports: number;
  recentlyRefreshed: number;
}

export function PerformanceOverview({ topReports, zeroViewReports, recentlyRefreshed }: PerformanceOverviewProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance Overview</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-gray-700">Top 5 Reports by Views</h4>
          </div>

          <div className="space-y-2">
            {topReports.slice(0, 5).map((report, index) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 transition-all duration-200 border border-blue-100"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{report.name}</p>
                    {report.category && (
                      <p className="text-xs text-gray-500">{report.category}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Eye className="w-3 h-3" />
                      <span className="text-sm font-bold">{report.views}</span>
                    </div>
                    <div className="text-xs text-gray-500">views</div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <Download className="w-3 h-3" />
                      <span className="text-sm font-bold">{report.downloads}</span>
                    </div>
                    <div className="text-xs text-gray-500">downloads</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h4 className="text-sm font-semibold text-gray-700">Zero Interaction</h4>
            </div>
            <p className="text-2xl font-bold text-gray-900">{zeroViewReports}</p>
            <p className="text-xs text-gray-600 mt-1">Reports with no views</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-semibold text-gray-700">Recently Updated</h4>
            </div>
            <p className="text-2xl font-bold text-gray-900">{recentlyRefreshed}</p>
            <p className="text-xs text-gray-600 mt-1">Refreshed in 24h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
