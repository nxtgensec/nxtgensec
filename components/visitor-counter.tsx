"use client"

import { Eye } from "lucide-react"
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
    <div className="flex items-center space-x-2 text-gray-400">
      <Eye className="w-4 h-4" />
      <span className="text-sm">
        {loading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          <span>{formatNumber(stats.totalVisits)} visitors</span>
        )}
      </span>
    </div>
  )
}

export default VisitorCounter
