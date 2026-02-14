import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen, Code, Shield, Rocket, Sparkles, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation - NxtGenSec",
  description: "Comprehensive guides and resources for NxtGenSec platform, including development and cybersecurity tracks.",
}

export default function DocsPage() {
  const latestUpdates = [
    {
      date: "February 2026",
      title: "Next.js 15 & React 19 Migration",
      description: "Upgraded to the latest Next.js 15.5.12 and React 19.2.4 with improved performance and new features.",
    },
    {
      date: "February 2026",
      title: "Enhanced Learning Platform",
      description: "Redesigned learning section with interactive cards and expandable course paths for better user experience.",
    },
    {
      date: "February 2026",
      title: "Team Section Launch",
      description: "Introduced our core team members with profiles and contact information.",
    },
    {
      date: "January 2026",
      title: "Security Updates",
      description: "Applied critical security patches and updated all dependencies to latest secure versions.",
    },
  ]

  const sections = [
    {
      title: "Getting Started",
      icon: Rocket,
      color: "blue",
      items: [
        { name: "Introduction", href: "#introduction" },
        { name: "Quick Start Guide", href: "#quick-start" },
        { name: "Installation", href: "#installation" },
      ],
    },
    {
      title: "Development",
      icon: Code,
      color: "green",
      items: [
        { name: "Development Track", href: "https://development.nxtgensec.org", external: true },
        { name: "API Reference", href: "#api" },
        { name: "Best Practices", href: "#best-practices" },
      ],
    },
    {
      title: "Cybersecurity",
      icon: Shield,
      color: "orange",
      items: [
        { name: "Cybersecurity Track", href: "https://cybersecurity.nxtgensec.org", external: true },
        { name: "Security Guidelines", href: "#security" },
        { name: "Compliance", href: "#compliance" },
      ],
    },
    {
      title: "Resources",
      icon: BookOpen,
      color: "purple",
      items: [
        { name: "Tutorials", href: "#tutorials" },
        { name: "FAQs", href: "#faqs" },
        { name: "Community", href: "#community" },
      ],
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      green: "text-green-400 bg-green-400/10 border-green-400/20",
      orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-orange-400">Nxt</span>
            <span className="text-green-400">Gen</span>
            <span className="text-blue-400">Sec</span> Documentation
          </h1>
          <p className="text-xl text-gray-400 mt-4">
            Comprehensive guides and resources for our platform
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Latest Development Updates */}
        <div className="mb-12 p-8 rounded-xl bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30">
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">Latest Development Updates</h2>
          </div>
          <p className="text-gray-300 mb-6 text-lg">
            Stay up to date with our latest platform improvements, features, and enhancements.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {latestUpdates.map((update, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-sm text-blue-400 font-semibold">{update.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{update.title}</h3>
                <p className="text-gray-400 text-sm">{update.description}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
            <BookOpen className="w-5 h-5 text-blue-400 mr-3" />
            <span className="text-gray-300 mr-2">For detailed development documentation, visit</span>
            <a
              href="https://development.nxtgensec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline"
            >
              development.nxtgensec.org
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => {
            const Icon = section.icon
            const colorClasses = getColorClasses(section.color)
            return (
              <div
                key={section.title}
                className={`p-6 rounded-xl border backdrop-blur-sm ${colorClasses}`}
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 mr-3" />
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors flex items-center"
                        >
                          {item.name}
                          <span className="ml-2 text-xs">↗</span>
                        </a>
                      ) : (
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 p-8 rounded-xl bg-gray-900 border border-gray-800 text-center">
          <h3 className="text-2xl font-bold mb-4">Documentation Coming Soon</h3>
          <p className="text-gray-400">
            We're working hard to bring you comprehensive documentation. Check back soon for detailed
            guides, tutorials, and API references.
          </p>
        </div>
      </div>
    </main>
  )
}
