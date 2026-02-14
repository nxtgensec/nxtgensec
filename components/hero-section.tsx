"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, Code, Brain, Building } from "lucide-react"

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const pillars = [
    {
      icon: Code,
      title: "Innovation & Tools",
      description:
        "Developing revolutionary AI systems, quantum solutions, blockchain platforms, and next-gen automation tools",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      icon: Building,
      title: "Business Transformation",
      description:
        "Revolutionizing enterprises with AI-driven processes, smart automation, and future-ready infrastructure",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: Users,
      title: "Talent Development",
      description: "Cultivating next-gen tech experts in AI, quantum computing, blockchain, and emerging technologies",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
    },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Main Hero Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-orange-400">Nxt</span>
                <span className="text-green-400">Gen</span>
                <span className="text-blue-400">Sec</span>
              </h1>
            </div>

            <div className="mb-6">
              <p className="text-2xl md:text-3xl font-semibold text-white mb-2">Securing Digital Assets</p>
            </div>

            <h2 className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
              Next Generation Security & Innovation Hub
            </h2>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of technology through AI, blockchain, quantum computing, and advanced automation. We
              create revolutionary solutions, transform businesses, and develop tomorrow's tech leaders - with security
              woven into everything we do.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={() => scrollToSection("about")}
                variant="outline"
                size="lg"
                className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 animate-pulse"
              >
                Learn More
                <Brain className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => window.open("https://docs.nxtgensec.org", "_blank")}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Documentation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Three Pillars */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
              Our <span className="gradient-text-orange">Three Pillars</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className={`nxtgen-card p-6 rounded-xl ${pillar.bgColor} ${pillar.borderColor} border backdrop-blur-sm transition-all duration-500 delay-${index * 100}`}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      <div className={`p-3 rounded-full ${pillar.bgColor} mb-4 relative`}>
                        <Icon className={`w-6 h-6 ${pillar.color}`} />
                        <div className={`absolute inset-0 rounded-full ${pillar.bgColor} rotate-slow opacity-20`}></div>
                      </div>

                      <h4 className={`text-lg font-bold ${pillar.color} mb-3`}>{pillar.title}</h4>

                      <p className="text-gray-300 text-sm leading-relaxed flex-grow">{pillar.description}</p>

                      {/* Rotating element at bottom */}
                      <div className="mt-4">
                        <div
                          className={`w-6 h-6 rounded-full ${pillar.bgColor} border-2 ${pillar.borderColor} rotate-slow flex items-center justify-center`}
                        >
                          <Zap className={`w-3 h-3 ${pillar.color}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
