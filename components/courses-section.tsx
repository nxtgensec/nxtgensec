"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Code,
  BookOpen,
  Award,
  CheckCircle,
  Zap,
  Cloud,
  Network,
  Cpu,
  Database,
  Globe,
  ChevronDown,
  ChevronUp,
  Gift,
  Map,
  Users,
} from "lucide-react"

const CoursesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTrack, setActiveTrack] = useState("") // "cybersecurity" or "development"
  const [activeLevel, setActiveLevel] = useState("") // "beginner", "intermediate", or "advanced"
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)
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
    { id: "cybersecurity", label: "Cybersecurity Track", icon: Shield, color: "text-blue-400" },
    { id: "development", label: "Development Track", icon: Code, color: "text-green-400" },
  ]

  const levels = [
    { 
      id: "beginner", 
      label: "Beginner", 
      description: "Designed for absolute beginners to build a strong foundation.",
      icon: BookOpen
    },
    { 
      id: "intermediate", 
      label: "Intermediate", 
      description: "For learners who understand fundamentals and want hands-on skills.",
      icon: Users
    },
    { 
      id: "advanced", 
      label: "Advanced", 
      description: "Deep expertise for professional roles.",
      icon: Award
    },
  ]

  const learningPaths = {
    cybersecurity: {
      beginner: {
        title: "Beginner Cybersecurity Path",
        description: "Start your cybersecurity journey with fundamental concepts and essential skills",
        courses: [
          "Computer Networks Fundamentals",
          "Operating Systems Security",
          "Linux Essentials for Security",
          "Cybersecurity Fundamentals"
        ],
        bonus: {
          title: "Free Resources Worth ₹50,000",
          description: "Get access to premium cybersecurity tools, eBooks, video courses, and certification vouchers",
          items: [
            "CompTIA Security+ Study Materials",
            "Wireshark Certification Prep Course",
            "Ethical Hacking Toolkit Collection",
            "Cybersecurity Career Guide eBook"
          ]
        },
        formUrl: "https://forms.gle/uDbfDoeEcdJGyhvA7"
      },
      intermediate: {
        title: "Intermediate Cybersecurity Path",
        description: "Advance your skills with hands-on techniques and real-world applications",
        courses: [
          "Web Application Security (OWASP Top 10)",
          "Penetration Testing Essentials",
          "Digital Forensics & Incident Response",
          "Network Penetration Testing"
        ],
        bonus: {
          title: "Professional Toolkit Worth ₹75,000",
          description: "Access advanced tools and resources for intermediate practitioners",
          items: [
            "Metasploit Pro License (6 months)",
            "Burp Suite Professional Trial Extension",
            "CISSP Practice Test Collection",
            "Cloud Security Hands-on Labs Access"
          ]
        },
        formUrl: "https://forms.gle/ckV6gc43eN9twyiQA"
      },
      advanced: {
        title: "Advanced Cybersecurity Path",
        description: "Master professional skills for expert-level positions",
        courses: [
          "Advanced Penetration Testing & Exploit Development",
          "Red Teaming & Adversary Simulation",
          "Cloud Security & DevSecOps",
          "Threat Hunting & SOC Operations"
        ],
        bonus: {
          title: "Expert Resources Worth ₹1,00,000",
          description: "Premium resources for advanced cybersecurity professionals",
          items: [
            "OSCP Exam Voucher",
            "Advanced Malware Analysis Course",
            "Threat Intelligence Platform Access",
            "Red Team Operations Manual"
          ]
        },
        formUrl: "https://forms.gle/b9Xp64DH6kmUUiEq6"
      }
    },
    development: {
      beginner: {
        title: "Beginner Development Path",
        description: "Start your programming journey with essential concepts and skills",
        courses: [
          "Programming Basics (Python/JavaScript)",
          "HTML, CSS, and Web Fundamentals",
          "Git & Version Control",
          "Database Fundamentals"
        ],
        bonus: {
          title: "Free Resources Worth ₹50,000",
          description: "Get access to premium development tools, courses, and resources",
          items: [
            "Full Stack Web Development Course",
            "GitHub Student Developer Pack",
            "VS Code Power User Guide",
            "Programming Interview Preparation Kit"
          ]
        },
        formUrl: "https://forms.gle/nyZmo5Ajf1GHCzXP6"
      },
      intermediate: {
        title: "Intermediate Development Path",
        description: "Build real-world applications with modern frameworks and tools",
        courses: [
          "Frontend Development (React / Next.js)",
          "Backend Development (Node.js / Django / Express)",
          "Database Design & SQL/NoSQL",
          "API Development & Integration"
        ],
        bonus: {
          title: "Professional Toolkit Worth ₹75,000",
          description: "Access advanced tools and resources for intermediate developers",
          items: [
            "Cloud Hosting Credits ($100)",
            "Advanced React Course Access",
            "Docker Mastery Course",
            "DevOps Fundamentals Certification Prep"
          ]
        },
        formUrl: "https://forms.gle/FbepgCvRDxxXfPAV9"
      },
      advanced: {
        title: "Advanced Development Path",
        description: "Master enterprise-level development and cutting-edge technologies",
        courses: [
          "Full-Stack Development & System Architecture",
          "AI & Machine Learning Development",
          "Blockchain & Smart Contracts",
          "Advanced DevOps & Automation"
        ],
        bonus: {
          title: "Expert Resources Worth ₹1,00,000",
          description: "Premium resources for advanced developers and architects",
          items: [
            "Kubernetes Certification Voucher",
            "Machine Learning Engineering Course",
            "Cloud Solutions Architect Training",
            "Enterprise Software Design Patterns Guide"
          ]
        },
        formUrl: "https://forms.gle/TuEkXyXm48Ct5XUX6"
      }
    }
  }

  const handleEnrollClick = (track: string, level: string) => {
    const path = learningPaths[track as keyof typeof learningPaths][level as keyof typeof learningPaths.cybersecurity]
    if (path && path.formUrl) {
      window.open(path.formUrl, "_blank")
    }
  }

  const currentPath = activeTrack && activeLevel ? learningPaths[activeTrack as keyof typeof learningPaths][activeLevel as keyof typeof learningPaths.cybersecurity] : null

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Learning Paths</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive step-by-step learning paths designed to take you from beginner to expert in cybersecurity and development.
            Each path includes structured courses, hands-on projects, and valuable bonus resources.
          </p>
        </div>

        {/* Track Selection */}
        <div
          className={`flex justify-center gap-6 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {tracks.map((track) => {
            const Icon = track.icon
            return (
              <button
                key={track.id}
                onClick={() => {
                  setActiveTrack(activeTrack === track.id ? "" : track.id)
                  setActiveLevel("") // Reset level when changing track
                }}
                className={`flex flex-col items-center p-8 rounded-2xl transition-all duration-300 ${
                  activeTrack === track.id
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/50 shadow-xl"
                    : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                }`}
              >
                <Icon size={40} className={`${track.color} mb-4`} />
                <h3 className="text-2xl font-bold text-white mb-2">{track.label}</h3>
                <p className="text-gray-400 text-center">
                  {track.id === "cybersecurity" 
                    ? "Protect systems and data from cyber threats" 
                    : "Build innovative software and applications"}
                </p>
              </button>
            )
          })}
        </div>

        {/* Level Selection */}
        {activeTrack && (
          <div
            className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {levels.map((level) => {
              const Icon = level.icon
              return (
                <div
                  key={level.id}
                  onClick={() => setActiveLevel(activeLevel === level.id ? "" : level.id)}
                  className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeLevel === level.id
                      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/50 shadow-xl"
                      : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Icon size={24} className="text-green-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">{level.label}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{level.description}</p>
                  <div className="flex items-center text-blue-400">
                    <Map size={16} className="mr-2" />
                    <span>View Learning Path</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!activeTrack && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-300 mb-4">Select a Learning Track</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose either Cybersecurity or Development to explore our comprehensive learning paths designed to take you from
              beginner to expert.
            </p>
          </div>
        )}

        {/* Learning Path Display */}
        {currentPath && (
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{currentPath.title}</h3>
                  <p className="text-gray-300 text-lg">{currentPath.description}</p>
                </div>
                <Button 
                  onClick={() => handleEnrollClick(activeTrack, activeLevel)}
                  size="lg"
                  className="mt-4 md:mt-0 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
                >
                  Enroll in This Path
                </Button>
              </div>

              {/* Courses in Path */}
              <div className="mb-12">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BookOpen className="mr-2 text-blue-400" />
                  Courses Included in This Path
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentPath.courses.map((course, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <span className="text-blue-400 font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-200 font-medium">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus Section */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30 p-6">
                <div className="flex items-start mb-4">
                  <Gift className="text-yellow-400 mr-3 mt-1" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{currentPath.bonus.title}</h4>
                    <p className="text-gray-300">{currentPath.bonus.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 mt-6">
                  {currentPath.bonus.items.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-purple-900/20 rounded-lg">
                      <CheckCircle className="text-green-400 mr-3 flex-shrink-0" size={16} />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Journey */}
        <div
          className={`mt-20 transition-all duration-1000 delay-600 ${
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
              <p className="text-gray-300">Master cutting-edge technologies through our comprehensive courses</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400/20">
                <Code className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-green-400 mb-3">2. Practice</h4>
              <p className="text-gray-300">Apply your skills in real-world projects and hands-on labs</p>
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