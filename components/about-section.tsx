"use client"

import { useState, useEffect, useRef } from "react"
import { Target, Eye, Heart, Lightbulb, Shield, Rocket, Globe } from "lucide-react"

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technologies and creative solutions",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Ensuring robust protection and privacy in every solution we deliver",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: Heart,
      title: "Excellence",
      description: "Committed to delivering the highest quality in everything we do",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Creating meaningful change that transforms businesses and communities",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <div className="flex items-center justify-center mb-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-orange-400">Nxt</span>
                <span className="text-green-400">Gen</span>
                <span className="text-blue-400">Sec</span>
              </h1>
            </div>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're pioneers of next-generation technology - from AI and quantum computing to blockchain and automation.
            While cybersecurity remains important, it's just one piece of our comprehensive innovation ecosystem that's
            transforming how businesses operate in the digital age.
          </p>
        </div>

        {/* Mission, Vision, Values Grid */}
        <div
          className={`grid lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Mission */}
          <div className="nxtgen-card p-8 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center h-full">
              <div className="p-4 rounded-full bg-blue-400/10 mb-6 relative">
                <Target className="w-8 h-8 text-blue-400" />
                <div className="absolute inset-0 rounded-full bg-blue-400/10 rotate-slow opacity-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">
                To accelerate humanity's technological evolution through groundbreaking AI, quantum solutions, and
                intelligent automation - creating a secure, innovative, and sustainable digital future for all.
              </p>
              <div className="mt-6">
                <div className="w-8 h-8 rounded-full bg-blue-400/10 border-2 border-blue-400/20 rotate-slow flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="nxtgen-card p-8 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center h-full">
              <div className="p-4 rounded-full bg-green-400/10 mb-6 relative">
                <Eye className="w-8 h-8 text-green-400" />
                <div className="absolute inset-0 rounded-full bg-green-400/10 rotate-slow opacity-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">
                A world where revolutionary technology is accessible to everyone - where AI, quantum computing, and
                smart automation empower every organization to achieve unprecedented innovation and growth.
              </p>
              <div className="mt-6">
                <div className="w-8 h-8 rounded-full bg-green-400/10 border-2 border-green-400/20 rotate-slow flex items-center justify-center">
                  <Globe className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Values Preview */}
          <div className="nxtgen-card p-8 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center h-full">
              <div className="p-4 rounded-full bg-orange-400/10 mb-6 relative">
                <Heart className="w-8 h-8 text-orange-400" />
                <div className="absolute inset-0 rounded-full bg-orange-400/10 rotate-slow opacity-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Our Values</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">
                Innovation, Security, Excellence, and Impact drive our mission to pioneer next-generation technologies.
                These principles guide our development of AI systems, quantum solutions, and transformative business
                tools.
              </p>
              <div className="mt-6">
                <div className="w-8 h-8 rounded-full bg-orange-400/10 border-2 border-orange-400/20 rotate-slow flex items-center justify-center">
                  <Heart className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Detailed */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Our <span className="gradient-text-orange">Core Values</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className={`nxtgen-card p-6 rounded-xl ${value.bgColor} ${value.borderColor} border backdrop-blur-sm`}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={`p-3 rounded-full ${value.bgColor} mb-4 relative`}>
                      <Icon className={`w-6 h-6 ${value.color}`} />
                      <div className={`absolute inset-0 rounded-full ${value.bgColor} rotate-slow opacity-20`}></div>
                    </div>
                    <h4 className={`text-lg font-bold ${value.color} mb-3`}>{value.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed flex-grow">{value.description}</p>
                    <div className="mt-4">
                      <div
                        className={`w-6 h-6 rounded-full ${value.bgColor} border-2 ${value.borderColor} rotate-slow flex items-center justify-center`}
                      >
                        <div className={`w-2 h-2 rounded-full ${value.color.replace("text-", "bg-")}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
