"use client"

import { Eye } from "lucide-react"
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
      <div className="flex flex-col space-y-2 p-4 rounded-lg bg-gray-900/95 backdrop-blur-md border border-gray-700 shadow-xl hover:scale-105 transition-transform duration-300">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-blue-400" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Total Visits</span>
            <span className="text-lg font-bold text-white">
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
      </div>
    </div>
  )
}

export default VisitorBadge
