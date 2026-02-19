"use client"

import { Eye, Users } from "lucide-react"
import { useVisitorStats } from "@/lib/hooks/useVisitorStats"

const VisitorBadge = () => {
  const { stats, loading, error } = useVisitorStats(5000)

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        !loading && !error ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex flex-col space-y-3 p-4 rounded-lg bg-gray-900/95 backdrop-blur-md border border-gray-700 shadow-xl hover:scale-105 transition-transform duration-300 min-w-max">
        {/* Total Visits */}
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-blue-400" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Total visits</span>
            <span className="text-sm font-semibold text-white">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : error ? (
                <span className="text-red-400">Error</span>
              ) : (
                formatNumber(stats.totalVisits)
              )}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700" />

        {/* Today's Unique Visits */}
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-green-400" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Today's unique</span>
            <span className="text-sm font-semibold text-white">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : error ? (
                <span className="text-red-400">Error</span>
              ) : (
                formatNumber(stats.uniqueVisitsToday)
              )}
            </span>
          </div>
        </div>

        {/* Badge indicator */}
        {stats.isNewVisitorToday && (
          <div className="text-xs text-center text-yellow-400 font-medium">
            New visitor! 👋
          </div>
        )}
      </div>
    </div>
  )
}

export default VisitorBadge
