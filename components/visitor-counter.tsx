"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(100)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch('/api/visitors')
        const data = await response.json()
        
        setVisitorCount(data.count)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching visitor count:', error)
        setIsLoading(false)
      }
    }

    trackVisitor()
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <Eye className="w-4 h-4" />
      <span className="text-sm">
        {isLoading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          <span>{formatNumber(visitorCount)} visitors</span>
        )}
      </span>
    </div>
  )
}

export default VisitorCounter
