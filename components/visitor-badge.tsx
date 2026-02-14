"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"

const VisitorBadge = () => {
  const [visitorCount, setVisitorCount] = useState<number>(75)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch('/api/visitors')
        const data = await response.json()
        
        setVisitorCount(data.count)
        setIsLoading(false)
        
        // Show badge with animation after data loads
        setTimeout(() => setIsVisible(true), 500)
      } catch (error) {
        console.error('Error fetching visitor count:', error)
        setIsLoading(false)
        setTimeout(() => setIsVisible(true), 500)
      }
    }

    trackVisitor()
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-900/95 backdrop-blur-md border border-gray-700 shadow-xl hover:scale-105 transition-transform duration-300">
        <Eye className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-semibold text-white">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            formatNumber(visitorCount)
          )}
        </span>
      </div>
    </div>
  )
}

export default VisitorBadge
