"use client"

import { useEffect, useState } from "react"
import { Shield, Code, Brain, Database, Network, Zap } from "lucide-react"

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const floatingIcons = [
    { Icon: Shield, delay: 0, size: 24, color: "text-blue-400/20" },
    { Icon: Code, delay: 1, size: 20, color: "text-green-400/20" },
    { Icon: Brain, delay: 2, size: 28, color: "text-orange-400/20" },
    { Icon: Database, delay: 3, size: 22, color: "text-purple-400/20" },
    { Icon: Network, delay: 4, size: 26, color: "text-cyan-400/20" },
    { Icon: Zap, delay: 5, size: 18, color: "text-indigo-400/20" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingIcons.map((item, index) => {
        const Icon = item.Icon
        return (
          <div
            key={index}
            className={`absolute ${item.color} animate-float`}
            style={{
              left: `${20 + index * 15}%`,
              top: `${10 + index * 12}%`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${8 + index}s`,
            }}
          >
            <Icon size={item.size} />
          </div>
        )
      })}
    </div>
  )
}

export default FloatingElements
