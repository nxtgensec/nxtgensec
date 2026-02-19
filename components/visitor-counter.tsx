"use client"

import { Eye, Users } from "lucide-react"
import { useVisitorStats } from "@/lib/hooks/useVisitorStats"

const VisitorCounter = () => {
  const { stats, loading, error } = useVisitorStats(5000)

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <Eye className="w-4 h-4" />
        <span className="text-sm text-red-400">Error loading visitors</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4 text-gray-400">
      <div className="flex items-center space-x-2">
        <Eye className="w-4 h-4" />
        <span className="text-sm">
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <span title="Total visitors till date">
              {formatNumber(stats.totalVisits)} total
            </span>
          )}
        </span>
      </div>
      
      <div className="border-r border-gray-600 h-4" />
      
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4" />
        <span className="text-sm">
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <span title="Unique visitors today">
              {formatNumber(stats.uniqueVisitsToday)} today
            </span>
          )}
        </span>
      </div>
}

export default VisitorCounter
