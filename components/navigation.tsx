"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Shield, Code, Users, BookOpen, Briefcase, FileText, ChevronDown } from "lucide-react"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [learningDropdownOpen, setLearningDropdownOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home", icon: Shield },
    { id: "about", label: "About", icon: Code },
    { id: "learning", label: "Learning", icon: BookOpen, hasDropdown: true },
    { id: "approach", label: "Approach", icon: Briefcase },
    { id: "team", label: "Team", icon: Users },
    { id: "docs", label: "Docs", icon: FileText, isExternal: true },
  ]

  const learningOptions = [
    { label: "Development", url: "https://development.nxtgensec.org", icon: Code },
    { label: "Cybersecurity", url: "https://cybersecurity.nxtgensec.org", icon: Shield },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Include all sections that exist on the page (including courses which has dropdown)
      const sectionsToTrack = navItems.filter(item => !item.isExternal)
      const sections = sectionsToTrack.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          const sectionId = section.id
          const navItem = navItems.find(item => item.id === sectionId)
          if (navItem) {
            setActiveSection(navItem.id)
            // Update URL hash without scrolling
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, '', `#${sectionId}`)
            }
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleDocsClick = () => {
    window.open("https://docs.nxtgensec.org", "_blank")
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image src="/images/nxtgensec-logo.png" alt="NxtGenSec Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold">
              <span className="text-orange-400">Nxt</span>
              <span className="text-green-400">Gen</span>
              <span className="text-blue-400">Sec</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setLearningDropdownOpen(true)}
                      onMouseLeave={() => setLearningDropdownOpen(false)}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                          activeSection === item.id
                            ? "text-blue-400 bg-blue-400/10"
                            : "text-gray-300 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${learningDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {learningDropdownOpen && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 p-2">
                          <div className="flex gap-2">
                            {learningOptions.map((option, index) => {
                              const OptionIcon = option.icon
                              const isGreen = index === 0
                              return (
                                <a
                                  key={option.label}
                                  href={option.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`group flex flex-col items-center justify-center px-8 py-6 rounded-lg transition-all duration-300 w-[200px] ${
                                    isGreen
                                      ? 'bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50'
                                      : 'bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50'
                                  }`}
                                >
                                  <div className={`p-3 rounded-full mb-3 transition-all duration-300 ${
                                    isGreen
                                      ? 'bg-green-500/20 group-hover:bg-green-500/30'
                                      : 'bg-blue-500/20 group-hover:bg-blue-500/30'
                                  }`}>
                                    <OptionIcon className={`w-6 h-6 ${isGreen ? 'text-green-400' : 'text-blue-400'}`} />
                                  </div>
                                  <span className={`font-semibold text-sm ${
                                    isGreen ? 'text-green-400' : 'text-blue-400'
                                  } group-hover:text-white transition-colors`}>
                                    {option.label}
                                  </span>
                                  <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore →
                                  </span>
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }
                
                if (item.isExternal) {
                  return (
                    <button
                      key={item.id}
                      onClick={handleDocsClick}
                      className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  )
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      activeSection === item.id
                        ? "text-blue-400 bg-blue-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon
              
              if (item.hasDropdown) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setLearningDropdownOpen(!learningDropdownOpen)}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center justify-between text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${learningDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {learningDropdownOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {learningOptions.map((option) => {
                          const OptionIcon = option.icon
                          return (
                            <a
                              key={option.label}
                              href={option.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                              <OptionIcon className="w-4 h-4 mr-2" />
                              {option.label}
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              
              if (item.isExternal) {
                return (
                  <button
                    key={item.id}
                    onClick={handleDocsClick}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                )
              }
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-3 ${
                    activeSection === item.id
                      ? "text-blue-400 bg-blue-400/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
