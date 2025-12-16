"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  Send,
  MessageSquare,
  Clock,
  Linkedin,
  Twitter,
  Github,
  Zap,
  CheckCircle,
  Youtube,
  Instagram,
  MessageCircle,
  Globe,
} from "lucide-react"

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "demonxtgensec@gmail.com",
      secondary: "support@nxtgensec.org",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+1 (555) 123-4567",
      secondary: "Available 24/7",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Mon - Fri: 9:00 AM - 6:00 PM",
      secondary: "Sat - Sun: 10:00 AM - 4:00 PM",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/nxtgen-sec-7a267b374",
      label: "LinkedIn",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      icon: Twitter,
      href: "https://x.com/NxtgenSec",
      label: "X (Twitter)",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/nxtgensec",
      label: "Instagram",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@NxtGenSec",
      label: "YouTube",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      icon: MessageCircle,
      href: "https://t.me/nxtgensec",
      label: "Telegram",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: MessageSquare,
      href: "#",
      label: "WhatsApp Channel",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Github,
      href: "https://github.com/nxtgensec",
      label: "GitHub",
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
    },
    {
      icon: Globe,
      href: "https://nxtgensec.org",
      label: "Website",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with next-generation technology? Have questions about our courses or career
            programs? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="nxtgen-card p-8 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-400/10">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400">Send us a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Rotating element */}
              <div className="flex justify-center mt-6">
                <div className="w-8 h-8 rounded-full bg-blue-400/10 border-2 border-blue-400/20 rotate-slow flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div
                    key={info.title}
                    className={`nxtgen-card p-6 rounded-xl ${info.bgColor} ${info.borderColor} border backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${info.bgColor}`}>
                        <Icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div className="flex-grow">
                        <h4 className={`text-lg font-bold ${info.color} mb-1`}>{info.title}</h4>
                        <p className="text-gray-300 text-sm">{info.primary}</p>
                        <p className="text-gray-400 text-xs">{info.secondary}</p>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full ${info.bgColor} border-2 ${info.borderColor} rotate-slow flex items-center justify-center`}
                      >
                        <div className={`w-2 h-2 rounded-full ${info.color.replace("text-", "bg-")}`}></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-6 text-center">Connect With Us</h4>
              <div className="grid grid-cols-4 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg ${social.bgColor} border border-gray-700 ${social.color} hover:scale-110 transition-all duration-300 flex flex-col items-center text-center group`}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {social.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="mt-8 nxtgen-card p-6 rounded-xl bg-green-400/10 border border-green-400/20 backdrop-blur-sm text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-green-400 mb-2">Quick Response Guarantee</h4>
              <p className="text-gray-300 text-sm">
                We respond to all inquiries within 24 hours during business days. For urgent matters, please call us
                directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
