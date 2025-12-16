"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Users,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Award,
  Code,
  Brain,
  Shield,
  Database,
  Zap,
  Target,
  Star,
  Upload,
  GraduationCap,
} from "lucide-react"

const InternshipsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("fresher")
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

  const fresherPrograms = [
    {
      id: 1,
      title: "Cybersecurity Training Program",
      department: "Security Operations",
      duration: "6 months",
      type: "Full-time Training + Internship",
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      requirements: ["Complete our Ethical Hacking course", "Basic programming knowledge", "Passion for cybersecurity"],
      benefits: [
        "Hands-on training",
        "Industry certification",
        "Guaranteed internship placement",
        "Job placement assistance",
      ],
    },
    {
      id: 2,
      title: "AI/ML Development Program",
      department: "Research & Development",
      duration: "8 months",
      type: "Training + Project Work",
      icon: Brain,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      requirements: ["Complete our AI & ML Security course", "Python programming skills", "Mathematics background"],
      benefits: ["Real AI project experience", "Research opportunities", "Publication support", "Industry connections"],
    },
    {
      id: 3,
      title: "Blockchain Developer Program",
      department: "Innovation Lab",
      duration: "5 months",
      type: "Training + Development",
      icon: Database,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
      requirements: ["Complete our Blockchain course", "Web development basics", "Understanding of cryptography"],
      benefits: ["DeFi project work", "Smart contract development", "Web3 expertise", "Startup opportunities"],
    },
  ]

  const experiencedPrograms = [
    {
      id: 1,
      title: "Senior Security Consultant",
      department: "Consulting Services",
      duration: "Project-based",
      type: "Contract/Full-time",
      icon: Target,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
      requirements: ["5+ years cybersecurity experience", "Industry certifications", "Client-facing experience"],
      benefits: ["High-impact projects", "Competitive compensation", "Flexible schedule", "Equity options"],
    },
    {
      id: 2,
      title: "Lead AI Researcher",
      department: "R&D Division",
      duration: "Long-term",
      type: "Full-time",
      icon: Brain,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/20",
      requirements: ["PhD or equivalent experience", "Published research", "AI security expertise"],
      benefits: ["Research leadership", "Conference speaking", "Patent opportunities", "Academic collaboration"],
    },
  ]

  const benefits = [
    {
      icon: Award,
      title: "Industry Certification",
      description: "Earn recognized certifications upon successful completion",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Mentorship Program",
      description: "Work directly with industry experts and senior professionals",
      color: "text-green-400",
    },
    {
      icon: Code,
      title: "Real Projects",
      description: "Contribute to actual client projects and open-source initiatives",
      color: "text-orange-400",
    },
    {
      icon: Briefcase,
      title: "Job Placement",
      description: "95% of our program graduates receive full-time job offers",
      color: "text-purple-400",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Development Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 text-center">
          <p className="text-yellow-500 font-medium">
            ⚠️ Career Programs are currently under development. We will notify you once they are available.
          </p>
        </div>

        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Career</span> Programs
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bridge the gap between learning and professional success. Choose your path based on your experience level
            and career goals.
          </p>
        </div>

        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gray-800 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("fresher")}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "fresher" ? "bg-green-600 text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              <GraduationCap size={18} />
              <span>Fresher Programs</span>
            </button>
            <button
              onClick={() => setActiveTab("experienced")}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "experienced" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              <Briefcase size={18} />
              <span>Experienced Professionals</span>
            </button>
          </div>
        </div>

        {activeTab === "fresher" && (
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Training-to-Employment Programs</h3>
              <p className="text-gray-300 max-w-xl mx-auto text-sm">
                Complete our courses first, then join our training programs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {fresherPrograms.map((program, index) => {
                const Icon = program.icon
                return (
                  <div
                    key={program.id}
                    className={`nxtgen-card rounded-xl ${program.bgColor} ${program.borderColor} border backdrop-blur-sm p-4`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${program.bgColor}`}>
                          <Icon className={`w-5 h-5 ${program.color}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{program.department}</div>
                        </div>
                      </div>

                      <h3 className={`text-lg font-bold ${program.color} mb-2`}>{program.title}</h3>

                      <div className="grid grid-cols-1 gap-1 mb-3 text-xs text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Briefcase size={12} />
                          <span>{program.type}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-200 mb-1">Prerequisites:</h4>
                        <div className="space-y-1">
                          {program.requirements.slice(0, 2).map((req) => (
                            <div key={req} className="flex items-center space-x-2 text-xs text-gray-300">
                              <CheckCircle size={10} className="text-green-400" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 flex-grow">
                        <h4 className="text-xs font-semibold text-gray-200 mb-1">Benefits:</h4>
                        <div className="space-y-1">
                          {program.benefits.slice(0, 2).map((benefit) => (
                            <div key={benefit} className="flex items-center space-x-2 text-xs text-gray-300">
                              <Star size={10} className="text-orange-400" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          className={`${program.color.replace("text-", "bg-").replace("400", "600")} hover:${program.color.replace("text-", "bg-").replace("400", "700")} text-white`}
                        >
                          Apply Now
                          <ArrowRight size={14} className="ml-1" />
                        </Button>

                        <div
                          className={`w-6 h-6 rounded-full ${program.bgColor} border-2 ${program.borderColor} rotate-slow flex items-center justify-center`}
                        >
                          <Zap className={`w-3 h-3 ${program.color}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === "experienced" && (
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Professional Opportunities</h3>
              <p className="text-gray-300 max-w-lg mx-auto text-sm">
                Submit your resume and CV. We'll review and contact you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {experiencedPrograms.map((program, index) => {
                const Icon = program.icon
                return (
                  <div
                    key={program.id}
                    className={`nxtgen-card rounded-xl ${program.bgColor} ${program.borderColor} border backdrop-blur-sm p-4`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${program.bgColor}`}>
                          <Icon className={`w-5 h-5 ${program.color}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{program.department}</div>
                        </div>
                      </div>

                      <h3 className={`text-lg font-bold ${program.color} mb-2`}>{program.title}</h3>

                      <div className="grid grid-cols-1 gap-1 mb-3 text-xs text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Briefcase size={12} />
                          <span>{program.type}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-200 mb-1">Requirements:</h4>
                        <div className="space-y-1">
                          {program.requirements.slice(0, 2).map((req) => (
                            <div key={req} className="flex items-center space-x-2 text-xs text-gray-300">
                              <CheckCircle size={10} className="text-green-400" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 flex-grow">
                        <h4 className="text-xs font-semibold text-gray-200 mb-1">Benefits:</h4>
                        <div className="space-y-1">
                          {program.benefits.slice(0, 2).map((benefit) => (
                            <div key={benefit} className="flex items-center space-x-2 text-xs text-gray-300">
                              <Star size={10} className="text-orange-400" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          className={`${program.color.replace("text-", "bg-").replace("400", "600")} hover:${program.color.replace("text-", "bg-").replace("400", "700")} text-white`}
                        >
                          Submit Resume
                          <Upload size={12} className="ml-1" />
                        </Button>

                        <div
                          className={`w-6 h-6 rounded-full ${program.bgColor} border-2 ${program.borderColor} rotate-slow flex items-center justify-center`}
                        >
                          <Zap className={`w-3 h-3 ${program.color}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Benefits */}
        <div
          className={`mb-20 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Program <span className="gradient-text">Benefits</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="nxtgen-card p-6 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm text-center"
                >
                  <div
                    className={`w-12 h-12 ${benefit.color.replace("text-", "bg-").replace("400", "400/10")} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h4 className={`text-lg font-bold ${benefit.color} mb-3`}>{benefit.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InternshipsSection