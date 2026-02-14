"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Code, BookOpen, Award, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

const CoursesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
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

  const tracks = [
    {
      id: "development",
      title: "Development",
      icon: Code,
      color: "green",
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-500",
      description: "Master modern software development from fundamentals to advanced architectures",
      enrollUrl: "https://development.nxtgensec.org",
      paths: [
        {
          level: "Beginner",
          title: "Foundation Path",
          description: "Programming basics, web fundamentals, Git, and databases",
          courses: ["Python/JavaScript Basics", "HTML/CSS/Web Fundamentals", "Git & Version Control", "Database Fundamentals"],
        },
        {
          level: "Intermediate",
          title: "Full-Stack Path",
          description: "Modern frameworks, backend development, and API integration",
          courses: ["React/Next.js", "Node.js/Django/Express", "SQL/NoSQL Databases", "API Development"],
        },
        {
          level: "Advanced",
          title: "Expert Path",
          description: "System architecture, AI/ML, blockchain, and DevOps mastery",
          courses: ["System Architecture", "AI & ML Development", "Blockchain & Smart Contracts", "Advanced DevOps"],
        },
      ],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: Shield,
      color: "blue",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-900/20 to-cyan-900/20",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500",
      description: "Protect systems and data from cyber threats with comprehensive security training",
      enrollUrl: "https://cybersecurity.nxtgensec.org",
      paths: [
        {
          level: "Beginner",
          title: "Foundation Path",
          description: "Network fundamentals, OS security, Linux essentials, and cybersecurity basics",
          courses: ["Computer Networks", "Operating Systems Security", "Linux Essentials", "Cybersecurity Fundamentals"],
        },
        {
          level: "Intermediate",
          title: "Practitioner Path",
          description: "Web security, penetration testing, forensics, and network testing",
          courses: ["Web App Security (OWASP)", "Penetration Testing", "Digital Forensics", "Network Pen Testing"],
        },
        {
          level: "Advanced",
          title: "Expert Path",
          description: "Advanced pen testing, red teaming, cloud security, and threat hunting",
          courses: ["Advanced Pen Testing", "Red Teaming", "Cloud Security & DevSecOps", "Threat Hunting & SOC"],
        },
      ],
    },
  ]

  const handleEnroll = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const toggleExpand = (trackId: string) => {
    setExpandedCard(expandedCard === trackId ? null : trackId)
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
            Our <span className="gradient-text">Learning Tracks</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose your path and master the skills that matter. Each track offers three progressive levels from beginner to expert.
          </p>
        </div>

        {/* Two Cards Side by Side */}
        <div
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {tracks.map((track) => {
            const Icon = track.icon
            const isExpanded = expandedCard === track.id

            return (
              <div
                key={track.id}
                className={`nxtgen-card rounded-2xl border-2 ${track.borderColor} ${track.hoverBorder} bg-gradient-to-br ${track.bgGradient} backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] overflow-hidden`}
              >
                {/* Card Header */}
                <div className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${track.gradient} shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white text-center mb-4">{track.title}</h3>
                  <p className="text-gray-300 text-center mb-8 leading-relaxed">{track.description}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button
                      onClick={() => handleEnroll(track.enrollUrl)}
                      className={`flex-1 bg-gradient-to-r ${track.gradient} hover:opacity-90 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-105`}
                    >
                      Enroll Now
                    </Button>
                    <Button
                      onClick={() => toggleExpand(track.id)}
                      variant="outline"
                      className={`flex-1 border-2 ${track.borderColor} text-${track.color}-400 hover:bg-${track.color}-400/10 font-semibold py-6 text-lg transition-all duration-300`}
                    >
                      {isExpanded ? (
                        <>
                          Hide Paths <ChevronUp className="ml-2 w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Know More <ChevronDown className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expandable Content - 3 Paths */}
                {isExpanded && (
                  <div className="px-8 pb-8 space-y-6 animate-in slide-in-from-top duration-500">
                    <div className="border-t border-gray-700 pt-6">
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                        <BookOpen className={`mr-2 text-${track.color}-400`} />
                        Three Progressive Learning Paths
                      </h4>

                      <div className="space-y-4">
                        {track.paths.map((path, index) => (
                          <div
                            key={index}
                            className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                          >
                            <div className="flex items-start mb-4">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${track.gradient} flex items-center justify-center mr-4 flex-shrink-0`}>
                                <span className="text-white font-bold">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <Award className={`w-5 h-5 text-${track.color}-400 mr-2`} />
                                  <h5 className="text-lg font-bold text-white">{path.level} Level</h5>
                                </div>
                                <p className={`text-${track.color}-400 font-semibold mb-2`}>{path.title}</p>
                                <p className="text-gray-400 text-sm mb-4">{path.description}</p>

                                {/* Course List */}
                                <div className="grid grid-cols-1 gap-2">
                                  {path.courses.map((course, courseIndex) => (
                                    <div key={courseIndex} className="flex items-center text-sm">
                                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                      <span className="text-gray-300">{course}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Learning Journey */}
        <div
          className={`mt-20 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Your <span className="gradient-text-orange">Learning Journey</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-400/20">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold text-blue-400 mb-3">1. Learn</h4>
              <p className="text-gray-300">Master cutting-edge technologies through comprehensive courses</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400/20">
                <Code className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-green-400 mb-3">2. Practice</h4>
              <p className="text-gray-300">Apply skills in real-world projects and hands-on labs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-400/20">
                <Award className="w-8 h-8 text-orange-400" />
              </div>
              <h4 className="text-xl font-bold text-orange-400 mb-3">3. Certify</h4>
              <p className="text-gray-300">Earn industry-recognized certifications and advance your career</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
