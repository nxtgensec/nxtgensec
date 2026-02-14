"use client"

import { useState, useEffect, useRef } from "react"
import { Linkedin, Mail, User } from "lucide-react"

const TeamSection = () => {
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

  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "ceo@nxtgensec.org",
      color: "blue",
    },
    {
      name: "Jane Smith",
      role: "CTO & Co-Founder",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "cto@nxtgensec.org",
      color: "green",
    },
    {
      name: "Mike Johnson",
      role: "Head of Security",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "security@nxtgensec.org",
      color: "orange",
    },
    {
      name: "Sarah Williams",
      role: "Head of Development",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "dev@nxtgensec.org",
      color: "purple",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        text: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        hover: "hover:border-blue-400",
      },
      green: {
        text: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        hover: "hover:border-green-400",
      },
      orange: {
        text: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        hover: "hover:border-orange-400",
      },
      purple: {
        text: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
        hover: "hover:border-purple-400",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

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
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind NxtGenSec, driving innovation and excellence in next-generation technology
          </p>
        </div>

        {/* Team Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {team.map((member, index) => {
            const colorClasses = getColorClasses(member.color)
            return (
              <div
                key={member.name}
                className={`nxtgen-card p-6 rounded-xl bg-gray-900/50 border ${colorClasses.border} ${colorClasses.hover} backdrop-blur-sm transition-all duration-500 hover:scale-105`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  {/* Avatar */}
                  <div className={`relative mb-4 p-1 rounded-full ${colorClasses.bg} border-2 ${colorClasses.border}`}>
                    <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                      <User className={`w-12 h-12 ${colorClasses.text}`} />
                    </div>
                    <div className={`absolute inset-0 rounded-full ${colorClasses.bg} rotate-slow opacity-20`}></div>
                  </div>

                  {/* Name & Role */}
                  <h3 className={`text-xl font-bold ${colorClasses.text} mb-2`}>{member.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{member.role}</p>

                  {/* Social Links */}
                  <div className="flex space-x-3 mt-auto">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${colorClasses.bg} ${colorClasses.text} hover:scale-110 transition-transform`}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className={`p-2 rounded-full ${colorClasses.bg} ${colorClasses.text} hover:scale-110 transition-transform`}
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
