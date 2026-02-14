"use client"

import { useState, useEffect, useRef } from "react"
import { Brain, Shield, Target, Users, Lightbulb, Zap, CheckCircle, Code, Database, Network, Lock } from "lucide-react"

const ProjectsSection = () => {
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

  const approaches = [
    {
      id: 1,
      title: "AI-First Security Approach",
      description:
        "We integrate artificial intelligence at the core of every security solution, enabling predictive threat detection and automated response systems.",
      icon: Brain,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      features: ["Machine Learning Models", "Predictive Analytics", "Automated Response", "Continuous Learning"],
    },
    {
      id: 2,
      title: "Zero-Trust Architecture",
      description:
        "Our security philosophy assumes no implicit trust, verifying every transaction and access request regardless of location or user credentials.",
      icon: Shield,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      features: ["Identity Verification", "Micro-segmentation", "Least Privilege Access", "Continuous Monitoring"],
    },
    {
      id: 3,
      title: "Quantum-Ready Solutions",
      description:
        "We build systems that are prepared for the quantum computing era, implementing post-quantum cryptography and quantum-safe protocols.",
      icon: Lock,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
      features: [
        "Post-Quantum Crypto",
        "Quantum Key Distribution",
        "Future-Proof Algorithms",
        "Quantum Threat Assessment",
      ],
    },
    {
      id: 4,
      title: "Human-Centric Design",
      description:
        "Technology should empower people, not complicate their lives. We design intuitive interfaces that make advanced security accessible to everyone.",
      icon: Users,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
      features: ["User Experience Focus", "Intuitive Interfaces", "Accessibility First", "Training Integration"],
    },
  ]

  const innovations = [
    {
      title: "Adaptive Threat Intelligence",
      description: "Our AI systems learn from global threat patterns and adapt defenses in real-time",
      icon: Target,
    },
    {
      title: "Blockchain-Verified Security",
      description: "Immutable security logs and decentralized verification for ultimate transparency",
      icon: Database,
    },
    {
      title: "Edge Computing Security",
      description: "Distributed security processing that works even when disconnected from central systems",
      icon: Network,
    },
    {
      title: "Quantum-Safe Encryption",
      description: "Next-generation cryptography that remains secure against quantum computer attacks",
      icon: Lock,
    },
  ]

  const trustFactors = [
    {
      title: "8+ Months of Innovation",
      description:
        "Our journey started in November 2024, and after much modification, we've evolved into a comprehensive next-gen tech company by August 2025.",
      icon: Lightbulb,
      color: "text-blue-400",
    },
    {
      title: "Research-Driven Development",
      description: "Every solution is backed by extensive research and testing in our innovation labs.",
      icon: Brain,
      color: "text-green-400",
    },
    {
      title: "Industry Partnerships",
      description: "We collaborate with leading technology companies and research institutions worldwide.",
      icon: Users,
      color: "text-orange-400",
    },
    {
      title: "Open Source Commitment",
      description: "We contribute to the security community through open-source tools and research publications.",
      icon: Code,
      color: "text-purple-400",
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
            Our <span className="gradient-text">Approach</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We don't just build solutions – we pioneer innovative approaches that redefine what's possible in
            cybersecurity and technology. Here's how we work and why you can trust us with your most critical
            challenges.
          </p>
        </div>

        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Our <span className="gradient-text-orange">Unique Approaches</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {approaches.map((approach, index) => {
              const Icon = approach.icon
              return (
                <div
                  key={approach.id}
                  className={`nxtgen-card rounded-xl ${approach.bgColor} ${approach.borderColor} border backdrop-blur-sm p-6`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg ${approach.bgColor}`}>
                      <Icon className={`w-6 h-6 ${approach.color}`} />
                    </div>
                    <h3 className={`text-xl font-bold ${approach.color}`}>{approach.title}</h3>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{approach.description}</p>

                  <div className="space-y-2 mb-4">
                    {approach.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <div
                      className={`w-8 h-8 rounded-full ${approach.bgColor} border-2 ${approach.borderColor} rotate-slow flex items-center justify-center`}
                    >
                      <Zap className={`w-4 h-4 ${approach.color}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Innovation Highlights */}
        <div
          className={`mb-20 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Innovation <span className="gradient-text">Highlights</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovations.map((innovation, index) => {
              const Icon = innovation.icon
              return (
                <div
                  key={innovation.title}
                  className="nxtgen-card p-6 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm text-center"
                >
                  <div className="w-12 h-12 bg-blue-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-400 mb-3">{innovation.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{innovation.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Trust & Credibility */}
        <div
          className={`mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Why <span className="gradient-text-orange">Trust Us</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFactors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <div
                  key={factor.title}
                  className="nxtgen-card p-6 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm text-center"
                >
                  <div
                    className={`w-12 h-12 ${factor.color.replace("text-", "bg-").replace("400", "400/10")} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${factor.color}`} />
                  </div>
                  <h4 className={`text-lg font-bold ${factor.color} mb-3`}>{factor.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{factor.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
