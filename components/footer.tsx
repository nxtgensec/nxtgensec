"use client"

import Image from "next/image"
import {
  Mail,
  ArrowUp,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Youtube,
  Instagram,
  MessageCircle,
  MessageSquare,
} from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "learning", label: "Learning" },
    { id: "approach", label: "Approach" },
    { id: "team", label: "Team" },
  ]

  const developmentServices = [
    { label: "Full-Stack Web Development", href: "#" },
    { label: "Mobile App Development", href: "#" },
    { label: "AI & Automation Integration", href: "#" },
  ]

  const securityServices = [
    { label: "Penetration Testing (VAPT)", href: "#" },
    { label: "SOC Monitoring", href: "#" },
    { label: "Cloud Security & Hardening", href: "#" },
  ]

  const footerLinks = {
    learning: [
      { label: "Development Track", href: "https://development.nxtgensec.org", external: true },
      { label: "Cybersecurity Track", href: "https://cybersecurity.nxtgensec.org", external: true },
      { label: "Documentation", href: "https://docs.nxtgensec.org", external: true },
    ],
    resources: [
      { label: "Blog", href: "#", disabled: true },
      { label: "Case Studies", href: "#", disabled: true },
      { label: "Whitepapers", href: "#", disabled: true },
      { label: "Community Forum", href: "#", disabled: true },
    ],
  }

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/nxtgen-sec-7a267b374",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    { icon: Twitter, href: "https://x.com/NxtgenSec", label: "X (Twitter)", color: "hover:text-cyan-400" },
    { icon: Instagram, href: "https://instagram.com/nxtgensec", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Youtube, href: "https://youtube.com/@NxtGenSec", label: "YouTube", color: "hover:text-red-400" },
    { icon: MessageCircle, href: "https://t.me/nxtgensec", label: "Telegram", color: "hover:text-blue-500" },
    { icon: MessageSquare, href: "#", label: "WhatsApp Channel", color: "hover:text-green-500" },
    { icon: Github, href: "https://github.com/nxtgensec", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Globe, href: "https://nxtgensec.org", label: "Website", color: "hover:text-green-400" },
  ]

  return (
    <footer className="border-t border-gray-800 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src="/images/nxtgensec-logo.png"
                  alt="NxtGenSec Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-2xl font-bold"><span className="text-orange-400">Nxt</span><span className="text-green-400">Gen</span><span className="text-blue-400">Sec</span></span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Leading innovation in next-generation technology and security solutions. We build cutting-edge tools,
                transform businesses, and develop the talent that will shape tomorrow's digital landscape.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">support@nxtgensec.org</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 justify-start">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Navigation */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services - Combined Development & Security */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Services</h4>
                  
                  {/* Development Services */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-green-400 mb-2">Development</h5>
                    <ul className="space-y-2">
                      {developmentServices.map((service) => (
                        <li key={service.label}>
                          <a
                            href={service.href}
                            className="text-gray-400 hover:text-green-400 transition-colors text-sm block"
                          >
                            {service.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Security Services */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-blue-400 mb-2">Security</h5>
                    <ul className="space-y-2">
                      {securityServices.map((service) => (
                        <li key={service.label}>
                          <a
                            href={service.href}
                            className="text-gray-400 hover:text-blue-400 transition-colors text-sm block"
                          >
                            {service.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* More Services Link */}
                  <div className="pt-2 border-t border-gray-800">
                    <a
                      href="https://nxtgensec.org/#approach"
                      className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-semibold flex items-center"
                    >
                      View All Services →
                    </a>
                  </div>
                </div>

                {/* Learning & Resources */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Learning</h4>
                  <ul className="space-y-2 mb-6">
                    {footerLinks.learning.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                        >
                          {link.label}
                          {link.external && <span className="ml-1 text-xs">↗</span>}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
                  <ul className="space-y-2">
                    {footerLinks.resources.map((link) => (
                      <li key={link.label}>
                        <div className="group relative">
                          <span className="text-gray-600 text-sm cursor-not-allowed">
                            {link.label}
                          </span>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            Coming Soon
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 NxtGenSec. All rights reserved. | Pioneering the future of technology and security.
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <span className="text-sm">Back to Top</span>
              <div className="p-2 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

